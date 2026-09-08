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

---

# Member accounts and the other two competitions

The EPR form above is the standalone path: no account, straight into the
spreadsheet. Alongside it there is now a membership system covering all three
competitions, backed by SpacetimeDB rather than Sheets.

| Address | What it is |
| --- | --- |
| `/members` | Join, and then every competition in one place |
| `/competitions/gec/register` | The GEC on its own page, shareable |
| `/competitions/epr/register` | The EPR through a membership |
| `/competitions/grp/register` | The GRP on its own page, shareable |
| `/register` | The original standalone EPR form, unchanged |

## The three cycles

Dates live in `src/lib/competition.ts` and are mirrored as integers in
`spacetime/src/lib.rs`, which is what actually refuses a late entry.
`npm run check:windows` compares them and runs automatically before every build,
so the two cannot drift apart unnoticed. **Changing a date means editing both and
republishing the module**, otherwise the site and the server will disagree.

| | Registration opens | Entries close | Then |
| --- | --- | --- | --- |
| GEC | 1 Sep 2026, 9:00 AM CT | 21 Nov 2026, 11:59 PM CT | Exam day 6 Dec 2026 |
| EPR | 12 Sep 2026, 9:00 AM CT | 3 Oct 2026, 11:59 PM CT | Judging ends 17 Oct 2026 |
| GRP | 5 Oct 2026, 9:00 AM CT | 16 Jan 2027, 11:59 PM CT | Papers due 27 Feb 2027 |

The GEC and GRP dates were chosen to sit either side of the EPR rather than on
top of it. They are placeholders in the sense that nobody has committed to them
publicly yet, and real in the sense that the site and the server both enforce
them today. The GRP featured country is Vietnam, set by `GRP_FEATURED_COUNTRY`.

Note that GEC and GRP cross the end of US daylight saving on 1 November 2026, so
their opening instants are written `-05:00` and their closing instants `-06:00`.

## What an account is

A membership is a SpacetimeDB identity, and the token proving it lives in the
member's browser. That is why joining is seven questions with no password and no
confirmation email, and it is also why a second device cannot simply be logged
into: the member generates an eight character code under "Sign in on another
device", and types it into the other one within fifteen minutes. The code works
once.

Deleting a membership from the dashboard withdraws every entry with it, and
cannot be undone.

## Privacy

Members and entries are **private** tables. A SpacetimeDB table marked `public`
can be read by any client that subscribes to it, and row-level security is not
yet enforced by the host, so a filter would have been decoration over a leak of
every member's email address. The only way to read an account is the
`my_account` procedure, which returns rows belonging to the caller and takes no
argument for whose account to fetch. Only `tally` (headcounts) and `window` (the
schedule) are public, and neither carries a name.

## Deploying the module

```bash
cd spacetime
spacetime login
spacetime publish --server maincloud <module-name>     # first time
cd .. && spacetime generate --lang typescript --out-dir src/module_bindings --module-path spacetime
```

Put the module name in `NEXT_PUBLIC_STDB_MODULE`, in `.env.local` locally and in
the host's environment variables for production. Without it the member area
renders a plain notice saying it is not switched on, and the rest of the site is
unaffected.

Republish after any change to `spacetime/src/`, and regenerate the bindings
whenever a table, reducer or procedure changes shape. `--delete-data` on publish
wipes every membership, so keep it for setup only.
