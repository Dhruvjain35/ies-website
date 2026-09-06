# Competition signup backend setup

The active cycle is the **Economic Policy Recommendation (EPR)**.

Signups POST to `/api/epr-signup`, which writes a row to Google Sheets and
sends an email notification through Web3Forms.

**The email path already works.** Google Sheets needs three environment
variables before rows will appear in the spreadsheet. Until then the endpoint
still accepts registrations and reports `recorded: { sheet: false, email: true }`
— nothing is lost, it just isn't in the sheet yet.

## The schedule

| Milestone | When (US Central) |
| --- | --- |
| Registration opens | 12 September 2026, 9:00 AM |
| Entries close | 3 October 2026, 11:59 PM |
| Judging ends | 17 October 2026, 11:59 PM |

These live in `src/lib/competition.ts` and are the single source of truth — the
landing page countdown, the competitions page, the registration form, and the
API window check all read from them. Change the dates there and everything
follows.

The window is enforced **server-side**. Before 12 September the API returns 403
regardless of what the browser sends, so a stale page or a direct `curl` cannot
register early. The form itself does not render outside the window.

Both dates fall inside US Central Daylight Time, hence the `-05:00` offset in
that file. A future cycle crossing the November DST change must use `-06:00`.

## Connecting the Google Sheet

1. **Create a service account**
   - Go to <https://console.cloud.google.com/> → create or pick a project.
   - Enable the **Google Sheets API** for it
     (APIs & Services → Library → "Google Sheets API" → Enable).
   - APIs & Services → Credentials → Create Credentials → **Service account**.
     Any name works, e.g. `ies-signups`. No roles are needed.

2. **Create a key**
   - Open the service account → **Keys** → Add key → Create new key → **JSON**.
   - A `.json` file downloads. It contains `client_email` and `private_key`.
   - Treat this file as a password. Do not commit it.

3. **Share the sheet with the service account**
   - Open the [signups spreadsheet](https://docs.google.com/spreadsheets/d/1npnsqRojIS3Nu0db8iyi-sEYNUu12Xn5Y2vJFmP8b7M/edit).
   - Share → paste the `client_email` from the JSON → give it **Editor** → Send.
   - This step is the one people forget. Without it every write returns 403.

4. **Set the environment variables in Vercel**

   Project → Settings → Environment Variables, for Production and Preview:

   | Name | Value |
   | --- | --- |
   | `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON |
   | `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON, entire value including the `BEGIN`/`END` lines |
   | `GOOGLE_SHEET_ID` | `1npnsqRojIS3Nu0db8iyi-sEYNUu12Xn5Y2vJFmP8b7M` |

   Paste the private key exactly as it appears in the JSON. Both the real-newline
   form and the `\n`-escaped form are handled.

5. **Redeploy** so the new variables are picked up.

## Verifying it works

```
curl https://www.internationaleconomicsociety.org/api/epr-signup
```

Returns the authoritative phase and whether Sheets is wired up:

```json
{ "phase": "upcoming", "serverTime": "...", "sheets": true }
```

`"sheets": true` means the three variables are present. A real end-to-end write
can only be confirmed once the window opens on 12 September, since the API
refuses entries before then.

## The table

The header row is written automatically on the first signup, then bolded,
shaded, and frozen. Thirteen columns, A through M:

| Col | Field |
| --- | --- |
| A | Timestamp (CT) |
| B | Entry Type — `Individual` or `Team` |
| C | Team Name (`—` for individuals) |
| D | Size — 1 for an individual, 2–4 for a team |
| E | Primary Contact |
| F | Email |
| G | School / Institution |
| H | Grade / Year |
| I | Country |
| J | IES Chapter |
| K | Team Members (comma separated) |
| L | Policy Area / Angle |
| M | Source |

Duplicate emails are rejected before the write — a repeat registration returns a
friendly "already registered" instead of adding a second row. The check is
case-insensitive and reads column F.

## If something goes wrong

Signups are never dropped silently. The endpoint only returns an error when
*both* the sheet write and the email failed, and in that case the participant is
told to email `ies.economicsociety@gmail.com` directly.

Failures are logged to the Vercel function logs with the `[epr-signup]`
prefix. The usual cause is step 3 — the sheet not shared with the service
account.
