import { createSign } from "node:crypto";

/**
 * Minimal Google Sheets append client.
 *
 * Uses a service account directly against the Sheets REST API — signing the
 * JWT here rather than pulling in `googleapis`, which is tens of megabytes and
 * would dominate cold start for a single append per signup.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export const SHEET_HEADERS = [
  "Timestamp (CT)",
  "Name",
  "Email",
  "School / Institution",
  "Grade / Year",
  "Country",
  "IES Chapter",
  "Working Title or Angle",
  "Source",
] as const;

export type SignupRow = {
  timestamp: string;
  name: string;
  email: string;
  institution: string;
  year: string;
  country: string;
  chapter: string;
  angle: string;
  source: string;
};

type Credentials = {
  clientEmail: string;
  privateKey: string;
  sheetId: string;
};

/** Reads credentials from the environment, or null when not configured. */
export function getCredentials(): Credentials | null {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim();
  if (!clientEmail || !rawKey || !sheetId) return null;

  // Vercel stores the key as a single line with escaped newlines; PEM needs real ones.
  const privateKey = rawKey.includes("\\n")
    ? rawKey.replace(/\\n/g, "\n")
    : rawKey;

  return { clientEmail, privateKey, sheetId };
}

export const isSheetsConfigured = () => getCredentials() !== null;

const base64url = (input: Buffer | string) =>
  (typeof input === "string" ? Buffer.from(input) : input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

// Cached across invocations — Fluid Compute reuses instances, so this saves a
// token exchange on most requests. Refreshed a minute before actual expiry.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(creds: Credentials): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: creds.clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat,
      exp,
    }),
  );

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  signer.end();
  const signature = base64url(signer.sign(creds.privateKey));
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Google token exchange failed (${res.status}): ${await res.text()}`,
    );
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return data.access_token;
}

async function sheetsFetch(
  creds: Credentials,
  path: string,
  init: RequestInit = {},
) {
  const token = await getAccessToken(creds);
  const res = await fetch(`${SHEETS_API}/${creds.sheetId}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Sheets API ${res.status} on ${path}: ${await res.text()}`);
  }
  return res.json();
}

// The tab name is read once rather than assumed to be "Sheet1" — a renamed tab
// would otherwise make every append fail with a parse error.
let cachedTabName: string | null = null;

async function getTabName(creds: Credentials): Promise<string> {
  if (cachedTabName) return cachedTabName;
  const meta = (await sheetsFetch(
    creds,
    "?fields=sheets.properties.title",
  )) as { sheets?: { properties?: { title?: string } }[] };
  cachedTabName = meta.sheets?.[0]?.properties?.title ?? "Sheet1";
  return cachedTabName;
}

/** Writes the header row and freezes it if the sheet is empty. Idempotent. */
async function ensureHeaderRow(creds: Credentials, tab: string): Promise<void> {
  const existing = (await sheetsFetch(
    creds,
    `/values/${encodeURIComponent(`${tab}!A1:I1`)}`,
  )) as { values?: string[][] };

  if (existing.values?.[0]?.length) return;

  await sheetsFetch(
    creds,
    `/values/${encodeURIComponent(`${tab}!A1`)}?valueInputOption=RAW`,
    { method: "PUT", body: JSON.stringify({ values: [[...SHEET_HEADERS]] }) },
  );

  // Bold + freeze the header so the table stays readable as rows accumulate.
  await sheetsFetch(creds, ":batchUpdate", {
    method: "POST",
    body: JSON.stringify({
      requests: [
        {
          repeatCell: {
            range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                textFormat: { bold: true },
                backgroundColor: { red: 0.95, green: 0.95, blue: 0.95 },
              },
            },
            fields: "userEnteredFormat(textFormat,backgroundColor)",
          },
        },
        {
          updateSheetProperties: {
            properties: { sheetId: 0, gridProperties: { frozenRowCount: 1 } },
            fields: "gridProperties.frozenRowCount",
          },
        },
      ],
    }),
  });
}

/** Case-insensitive check against the email column. */
export async function isDuplicateEmail(email: string): Promise<boolean> {
  const creds = getCredentials();
  if (!creds) return false;
  const tab = await getTabName(creds);
  const res = (await sheetsFetch(
    creds,
    `/values/${encodeURIComponent(`${tab}!C2:C`)}`,
  )) as { values?: string[][] };
  const target = email.trim().toLowerCase();
  return (res.values ?? []).some((r) => r[0]?.trim().toLowerCase() === target);
}

/** Appends one signup. Throws if the API rejects it, so the caller can fall back. */
export async function appendSignup(row: SignupRow): Promise<void> {
  const creds = getCredentials();
  if (!creds) throw new Error("Google Sheets is not configured");

  const tab = await getTabName(creds);
  await ensureHeaderRow(creds, tab);

  await sheetsFetch(
    creds,
    `/values/${encodeURIComponent(`${tab}!A:I`)}:append` +
      `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({
        values: [
          [
            row.timestamp,
            row.name,
            row.email,
            row.institution,
            row.year,
            row.country,
            row.chapter,
            row.angle,
            row.source,
          ],
        ],
      }),
    },
  );
}
