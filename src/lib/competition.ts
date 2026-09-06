/**
 * Single source of truth for the active competition cycle — currently the
 * Economic Policy Recommendation (EPR).
 *
 * All three instants fall inside US Central Daylight Time in 2026 (DST runs
 * 8 Mar – 1 Nov 2026), so the fixed -05:00 offset is correct for each. If a
 * future cycle straddles the November DST boundary, these must be written with
 * the offset that applies on that date rather than copied forward.
 */

/** Registration opens — 12 Sep 2026, 9:00 AM Central. */
export const OPENS_AT = new Date("2026-09-12T09:00:00-05:00");

/** Registration closes — 3 Oct 2026, 11:59 PM Central. */
export const DEADLINE_AT = new Date("2026-10-03T23:59:00-05:00");

/** Competition window ends — two weeks after the deadline, 17 Oct 2026. */
export const COMPETITION_ENDS_AT = new Date("2026-10-17T23:59:00-05:00");

/** The event this cycle's schedule, countdown and registration belong to. */
export const COMPETITION_NAME = "Economic Policy Recommendation";
export const COMPETITION_SHORT = "EPR";

/** Prize table — read by the landing page, the competitions page and the rules. */
export const PRIZES: { place: string; award: string; cash: boolean }[] = [
  { place: "1st Place", award: "$300", cash: true },
  { place: "2nd Place", award: "$200", cash: true },
  { place: "3rd Place", award: "$100", cash: true },
  { place: "4th Place", award: "Certificate of Distinction", cash: false },
  { place: "5th Place", award: "Certificate of Distinction", cash: false },
];

/** Total cash on the table, derived so it cannot drift from PRIZES. */
export const PRIZE_POOL = PRIZES.filter((p) => p.cash).reduce(
  (sum, p) => sum + Number(p.award.replace(/[^0-9]/g, "")),
  0,
);

export type Phase = "upcoming" | "open" | "competition" | "closed";

/** Which stage of the cycle a given instant falls in. */
export function getPhase(now: Date | number = Date.now()): Phase {
  const t = typeof now === "number" ? now : now.getTime();
  if (t < OPENS_AT.getTime()) return "upcoming";
  if (t < DEADLINE_AT.getTime()) return "open";
  if (t < COMPETITION_ENDS_AT.getTime()) return "competition";
  return "closed";
}

/** True only while the form should accept entries. */
export function isRegistrationOpen(now: Date | number = Date.now()): boolean {
  return getPhase(now) === "open";
}

/** The instant the current phase gives way to the next, or null at the end. */
export function nextTransition(now: Date | number = Date.now()): Date | null {
  switch (getPhase(now)) {
    case "upcoming":
      return OPENS_AT;
    case "open":
      return DEADLINE_AT;
    case "competition":
      return COMPETITION_ENDS_AT;
    default:
      return null;
  }
}

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const DATE_TIME_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const SHORT_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  month: "short",
  day: "numeric",
});

/** "October 3, 2026" */
export const formatDate = (d: Date) => DATE_FMT.format(d);
/** "October 3 at 11:59 PM" */
export const formatDateTime = (d: Date) => `${DATE_TIME_FMT.format(d)} CT`;
/** "Oct 3" */
export const formatShort = (d: Date) => SHORT_FMT.format(d);

/** Milliseconds broken into whole days/hours/minutes/seconds, floored at zero. */
export function countdownParts(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isZero: clamped === 0,
  };
}

/** Headline copy per phase, so the page and the API agree on what they say. */
export const PHASE_COPY: Record<
  Phase,
  { label: string; heading: string; body: string }
> = {
  upcoming: {
    label: "Opens soon",
    heading: "Registration opens September 12",
    body: `Registration for the IES ${COMPETITION_NAME} opens ${formatDateTime(
      OPENS_AT,
    )}. Entries close ${formatDateTime(DEADLINE_AT)}.`,
  },
  open: {
    label: "Now open",
    heading: "Registration is open",
    body: `Entries close ${formatDateTime(
      DEADLINE_AT,
    )}. The policy theme is emailed to every registrant when the competition window begins.`,
  },
  competition: {
    label: "In progress",
    heading: "Registration has closed",
    body: `Entries closed ${formatDateTime(
      DEADLINE_AT,
    )}. Video submissions are due and judging runs through ${formatDate(COMPETITION_ENDS_AT)}.`,
  },
  closed: {
    label: "Closed",
    heading: "This cycle has ended",
    body: "The current cycle is complete. Results are sent to participants by email, and the next cycle is announced to IES members first.",
  },
};
