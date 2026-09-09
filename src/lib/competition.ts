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

/** Video presentation length. Under the minimum is scored down; past the
 *  maximum is not watched. */
export const VIDEO_MIN_MINUTES = 6;
export const VIDEO_MAX_MINUTES = 8;
export const VIDEO_LENGTH_LABEL = `${VIDEO_MIN_MINUTES}\u2013${VIDEO_MAX_MINUTES} minutes`;

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

// ---------------------------------------------------------------------------
// The full catalogue
//
// The constants above stay pointed at the EPR because the landing page, the
// countdown, the /register form and the signup API all read them directly.
// Everything below describes all three events, with the EPR entry reusing the
// same instants so a date can never be true in one place and false in another.
//
// Daylight saving matters here. US Central runs on -05:00 until 1 November
// 2026 and -06:00 after it, so a cycle that crosses that boundary carries a
// different offset on each side. GEC and GRP both cross it.
// ---------------------------------------------------------------------------

export type CompetitionSlug = "gec" | "epr" | "grp";

/** A field a competition asks for that is not already on the member profile. */
export interface ExtraField {
  key: string;
  label: string;
  kind: "text" | "textarea" | "select";
  required: boolean;
  placeholder?: string;
  options?: string[];
  help?: string;
  /** Only shown once the entrant has said they are entering as a team. */
  teamOnly?: boolean;
}

/** How an event handles group entries, or null if it is strictly solo. */
export interface TeamRule {
  min: number;
  max: number;
  soloLabel: string;
  groupLabel: string;
  nameLabel: string;
  memberLabel: string;
}

export interface Competition {
  slug: CompetitionSlug;
  short: string;
  name: string;
  /** One short noun phrase for chips and table cells. */
  kind: string;
  /** A single sentence, used on cards and at the top of the register page. */
  summary: string;
  opensAt: Date;
  closesAt: Date;
  endsAt: Date;
  /** What the third date actually means for this event. */
  endsLabel: string;
  /** Deliverable in a handful of words, for the dashboard row. */
  deliverable: string;
  team: TeamRule | null;
  facts: [string, string][];
  extras: ExtraField[];
  /** Prize line for the card. Kept short on purpose. */
  prizeLine: string;
  /** Where the long-form rules live. */
  detailsHref: string;
}

const GEC_OPENS = new Date("2026-09-01T09:00:00-05:00");
const GEC_CLOSES = new Date("2026-11-21T23:59:00-06:00");
const GEC_ENDS = new Date("2026-12-06T23:59:00-06:00");

const GRP_OPENS = new Date("2026-10-05T09:00:00-05:00");
const GRP_CLOSES = new Date("2027-01-16T23:59:00-06:00");
const GRP_ENDS = new Date("2027-02-27T23:59:00-06:00");

/** The country the GRP cycle is written about. Changes every cycle. */
export const GRP_FEATURED_COUNTRY = "Vietnam";

export const COMPETITIONS: Competition[] = [
  {
    slug: "gec",
    short: "GEC",
    name: "Global Economics Challenge",
    kind: "Individual exam",
    summary:
      "Fifty scenario questions in seventy-five minutes, sat under proctored conditions. Nothing on it can be answered from memory.",
    opensAt: GEC_OPENS,
    closesAt: GEC_CLOSES,
    endsAt: GEC_ENDS,
    endsLabel: "Exam day",
    deliverable: "75-minute proctored exam",
    team: null,
    facts: [
      ["Questions", "50 multiple-choice"],
      ["Duration", "75 minutes"],
      ["Style", "Real-world scenario application"],
      ["Administration", "Proctored exam conditions"],
      ["Scoring", "1 point per question, out of 50"],
      ["Tiebreaker", "Time of completion"],
    ],
    extras: [
      {
        key: "sitting",
        label: "Preferred sitting",
        kind: "select",
        required: true,
        options: [
          "Morning, 9:00 AM local time",
          "Afternoon, 2:00 PM local time",
          "Evening, 6:00 PM local time",
        ],
        help: "Every sitting uses the same paper. Pick whichever suits your timezone.",
      },
      {
        key: "proctor",
        label: "Proctor name and email",
        kind: "text",
        required: true,
        placeholder: "Ms Alvarez, alvarez@school.edu",
        help: "A teacher, librarian, or chapter advisor who can invigilate. We write to them directly with the paper.",
      },
    ],
    prizeLine: "Trophies to the top three, medals through tenth",
    detailsHref: "/competitions#gec",
  },
  {
    slug: "epr",
    short: COMPETITION_SHORT,
    name: COMPETITION_NAME,
    kind: "Policy video",
    summary:
      "Answer the announced theme with a policy of your own design, then argue for it on camera over a slide deck.",
    opensAt: OPENS_AT,
    closesAt: DEADLINE_AT,
    endsAt: COMPETITION_ENDS_AT,
    endsLabel: "Judging ends",
    deliverable: `${VIDEO_LENGTH_LABEL} recorded video`,
    team: {
      min: 2,
      max: 4,
      soloLabel: "On my own",
      groupLabel: "With a team of 2 to 4",
      nameLabel: "Team name",
      memberLabel: "Team member",
    },
    facts: [
      ["Participants", "Individual, or a team of 2 to 4"],
      ["Deliverable", "Recorded video presentation"],
      ["Slides", "Google Slides deck, visible throughout"],
      ["Length", VIDEO_LENGTH_LABEL],
      ["Speaking", "Every team member must present"],
      ["Submission", "Unlisted video link and slide link"],
    ],
    extras: [
      {
        key: "angle",
        label: "Policy area you are leaning towards",
        kind: "textarea",
        required: false,
        placeholder: "Housing, trade, labour, monetary policy, anything at all",
        help: "Optional, and not binding. It only helps us assign judges with the right background.",
      },
    ],
    prizeLine: `$${PRIZE_POOL} in cash across the top three`,
    detailsHref: "/competitions#epr",
  },
  {
    slug: "grp",
    short: "GRP",
    name: "Global Research Paper",
    kind: "Written paper",
    summary: `Two thousand words on any economic question you like, so long as it runs through this cycle's country: ${GRP_FEATURED_COUNTRY}.`,
    opensAt: GRP_OPENS,
    closesAt: GRP_CLOSES,
    endsAt: GRP_ENDS,
    endsLabel: "Papers due",
    deliverable: "2,000-word paper",
    team: {
      min: 2,
      max: 2,
      soloLabel: "On my own",
      groupLabel: "With one co-author",
      nameLabel: "Pair name",
      memberLabel: "Co-author",
    },
    facts: [
      ["Participants", "Individual or a pair"],
      ["Word count", "2,000 words maximum"],
      ["Featured country", GRP_FEATURED_COUNTRY],
      ["Topic", "Open, any economic subject"],
      ["Sources", "Minimum 5, MLA, APA or Chicago"],
      ["Abstract", "150 words maximum"],
    ],
    extras: [
      {
        key: "topic",
        label: "Working topic",
        kind: "textarea",
        required: false,
        placeholder: `What about ${GRP_FEATURED_COUNTRY} are you circling?`,
        help: "Optional. Change it as often as you like right up to the deadline.",
      },
    ],
    prizeLine: "Top five published in the IES Journal",
    detailsHref: "/competitions#grp",
  },
];

export const COMPETITION_SLUGS = COMPETITIONS.map((c) => c.slug);

export function getCompetition(slug: string): Competition | undefined {
  return COMPETITIONS.find((c) => c.slug === slug);
}

/** Which stage a specific event is in, using its own three instants. */
export function phaseOf(c: Competition, now: Date | number = Date.now()): Phase {
  const t = typeof now === "number" ? now : now.getTime();
  if (t < c.opensAt.getTime()) return "upcoming";
  if (t < c.closesAt.getTime()) return "open";
  if (t < c.endsAt.getTime()) return "competition";
  return "closed";
}

/** The next instant that matters for an event, or null once it is over. */
export function nextTransitionOf(
  c: Competition,
  now: Date | number = Date.now(),
): Date | null {
  switch (phaseOf(c, now)) {
    case "upcoming":
      return c.opensAt;
    case "open":
      return c.closesAt;
    case "competition":
      return c.endsAt;
    default:
      return null;
  }
}

/** Short status words for a competition row. Deliberately plain. */
export const PHASE_WORD: Record<Phase, string> = {
  upcoming: "Opens soon",
  open: "Taking entries",
  competition: "Entries closed",
  closed: "Cycle finished",
};
