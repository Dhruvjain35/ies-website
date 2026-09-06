import { NextResponse } from "next/server";
import {
  getPhase,
  DEADLINE_AT,
  OPENS_AT,
  formatDateTime,
  COMPETITION_NAME,
} from "@/lib/competition";
import { appendSignup, isDuplicateEmail, isSheetsConfigured } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "9f893dcc-01bd-4e27-94ed-0c4247683a35";

const MAX = {
  name: 120,
  email: 200,
  institution: 200,
  year: 60,
  country: 80,
  chapter: 120,
  teamName: 120,
  angle: 1200,
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_TEAM = 2;
const MAX_TEAM = 4;

type Payload = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function validate(body: Payload) {
  const isTeam = str(body.entryType).toLowerCase() === "team";

  const fields = {
    entryType: isTeam ? "Team" : "Individual",
    name: str(body.name),
    email: str(body.email),
    institution: str(body.institution),
    year: str(body.year),
    country: str(body.country),
    chapter: str(body.chapter),
    teamName: isTeam ? str(body.teamName) : "",
    angle: str(body.angle),
  };

  // Members arrive as an array from the form; tolerate a newline-separated string.
  const rawMembers = Array.isArray(body.members)
    ? body.members
    : str(body.members).split("\n");
  const members = rawMembers.map((m) => str(m)).filter(Boolean);

  const errors: string[] = [];
  for (const key of ["name", "email", "institution", "year", "country"] as const) {
    if (!fields[key]) errors.push(`${key} is required`);
  }
  if (fields.email && !EMAIL_RE.test(fields.email)) errors.push("email is not valid");
  for (const [key, limit] of Object.entries(MAX)) {
    if ((fields[key as keyof typeof fields] ?? "").length > limit) {
      errors.push(`${key} is too long`);
    }
  }

  if (isTeam) {
    if (!fields.teamName) errors.push("team name is required");
    if (members.length < MIN_TEAM || members.length > MAX_TEAM) {
      errors.push(`a team must have between ${MIN_TEAM} and ${MAX_TEAM} members`);
    }
    if (members.some((m) => m.length > MAX.name)) errors.push("a member name is too long");
  }

  if (body.original !== true) errors.push("original work must be confirmed");

  // Individual entries are recorded as a team of one so the column stays numeric.
  const size = isTeam ? members.length : 1;

  return { fields, members, size, isTeam, errors };
}

/** Best-effort per-instance throttle. Not a security boundary, just spam friction. */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 500) {
    for (const [k, v] of recent) if (!v.some((t) => now - t < WINDOW_MS)) recent.delete(k);
  }
  return hits.length > MAX_PER_WINDOW;
}

/** Notification path. Also the safety net when Sheets is down or unconfigured. */
async function sendToWeb3Forms(
  f: Record<string, string>,
  members: string[],
  size: number,
): Promise<boolean> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `IES ${COMPETITION_NAME} Registration — ${f.entryType}`,
        from_name: f.name,
        "Entry Type": f.entryType,
        "Team Name": f.teamName || "—",
        Size: String(size),
        "Primary Contact": f.name,
        Email: f.email,
        "School / Institution": f.institution,
        "Grade / Year": f.year,
        Country: f.country,
        "IES Chapter": f.chapter || "Not affiliated / none listed",
        "Team Members": members.length ? members.join(", ") : "—",
        "Policy Area / Angle": f.angle || "Not provided",
      }),
    });
    const json = await res.json();
    return json.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot — a real browser leaves this empty because it is visually hidden.
  if (str(body.company)) {
    return NextResponse.json({ ok: true, message: "Registered." });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  // The window is enforced here, not in the browser, so a stale page or a direct
  // POST cannot register outside it.
  const phase = getPhase();
  if (phase === "upcoming") {
    return NextResponse.json(
      {
        ok: false,
        phase,
        error: `Registration does not open until ${formatDateTime(OPENS_AT)}.`,
      },
      { status: 403 },
    );
  }
  if (phase !== "open") {
    return NextResponse.json(
      {
        ok: false,
        phase,
        error: `Registration closed on ${formatDateTime(DEADLINE_AT)}.`,
      },
      { status: 403 },
    );
  }

  const { fields, members, size, errors } = validate(body);
  if (errors.length) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", details: errors },
      { status: 422 },
    );
  }

  const timestamp = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date());

  let sheetOk = false;
  let duplicate = false;

  if (isSheetsConfigured()) {
    try {
      if (await isDuplicateEmail(fields.email)) {
        duplicate = true;
      } else {
        await appendSignup({
          timestamp,
          entryType: fields.entryType,
          teamName: fields.teamName || "—",
          size: String(size),
          name: fields.name,
          email: fields.email,
          institution: fields.institution,
          year: fields.year,
          country: fields.country,
          chapter: fields.chapter || "—",
          members: members.length ? members.join(", ") : "—",
          angle: fields.angle || "—",
          source: "website",
        });
        sheetOk = true;
      }
    } catch (err) {
      console.error("[epr-signup] Sheets append failed:", err);
    }
  }

  if (duplicate) {
    return NextResponse.json({
      ok: true,
      duplicate: true,
      message:
        "This email is already registered. One entry per participant — we have yours.",
    });
  }

  // Always mirror to Web3Forms: it is the notification, and the backstop if the
  // Sheets write above threw or was never configured.
  const mailOk = await sendToWeb3Forms(fields, members, size);

  if (!sheetOk && !mailOk) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not record your registration. Please email ies.economicsociety@gmail.com and we will add you manually.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    recorded: { sheet: sheetOk, email: mailOk },
    message: "You are registered.",
  });
}

/** Lets the page read the authoritative phase instead of trusting the client clock. */
export async function GET() {
  return NextResponse.json(
    { phase: getPhase(), serverTime: new Date().toISOString(), sheets: isSheetsConfigured() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
