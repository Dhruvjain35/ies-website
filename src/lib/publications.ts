/**
 * The IES Journal record store.
 *
 * Two tracks, following the convention used by student research journals:
 *   journal  — selected papers that have been through editorial review
 *   archive  — the wider record of research produced through IES competitions
 *
 * There are no records yet. Adding one means appending an entry to
 * PUBLICATIONS below and dropping its PDF in public/publications/.
 * Everything else — browsing, filtering, the record page, citations — is
 * derived from that entry.
 */

export const JOURNAL_NAME = "The IES Journal";
export const PUBLISHER = "International Economic Society";

/**
 * Set once an ISSN is actually registered with the ISSN Centre. Left null
 * deliberately — an ISSN is an assigned identifier and must not be invented.
 */
export const ISSN: string | null = null;

export type PublicationType = "journal" | "archive";
export type Distinction = "distinguished" | "outstanding" | null;
export type SourceCompetition = "GRP" | "EPR" | null;

export type Publication = {
  /** Stable record id, e.g. IES-J-2026-0001 or IES-RA-2026-0001. */
  id: string;
  type: PublicationType;
  title: string;
  /** Full names as written, e.g. "Ada Lovelace". Order is authorship order. */
  authors: string[];
  school?: string;
  chapter?: string;
  country?: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  abstract: string;
  keywords?: string[];
  /** Which competition the work came from, when it came from one. */
  competition?: SourceCompetition;
  volume?: number;
  issue?: number;
  pages?: string;
  /** Path under /public, e.g. /publications/IES-J-2026-0001.pdf */
  pdf?: string;
  /** Registered DOI, once one exists. Never fabricate. */
  doi?: string;
  distinction?: Distinction;
};

/** No records yet — the journal opens with its first competition cycle. */
export const PUBLICATIONS: Publication[] = [];

export const TYPE_LABEL: Record<PublicationType, string> = {
  journal: "Journal Publication",
  archive: "Research Archive",
};

export const DISTINCTION_LABEL: Record<
  Exclude<Distinction, null>,
  string
> = {
  distinguished: "Distinguished Article",
  outstanding: "Outstanding Article",
};

export const COMPETITION_LABEL: Record<
  Exclude<SourceCompetition, null>,
  string
> = {
  GRP: "Global Research Paper",
  EPR: "Economic Policy Recommendation",
};

export const getPublication = (id: string) =>
  PUBLICATIONS.find((p) => p.id === id);

export const countByType = (type: PublicationType) =>
  PUBLICATIONS.filter((p) => p.type === type).length;

/** Year component of the publication date, as a string. */
export const yearOf = (p: Publication) => p.publishedAt.slice(0, 4);

/** "12 March 2026" — the site reads en-GB style dates elsewhere in prose. */
export function formatPublishedDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/* ------------------------------------------------------------------ */
/* Citations                                                           */
/* ------------------------------------------------------------------ */

/** Splits "Ada King Lovelace" into { family: "Lovelace", given: ["Ada","King"] }. */
function splitName(full: string): { family: string; given: string[] } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { family: parts[0], given: [] };
  return { family: parts[parts.length - 1], given: parts.slice(0, -1) };
}

const initials = (given: string[]) =>
  given.map((g) => `${g[0].toUpperCase()}.`).join(" ");

/** "Lovelace, A. B." */
const apaName = (full: string) => {
  const { family, given } = splitName(full);
  return given.length ? `${family}, ${initials(given)}` : family;
};

/** APA joins authors with ", " and an ampersand before the last. */
function apaAuthors(authors: string[]): string {
  const names = authors.map(apaName);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]}, & ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}`;
}

/** MLA inverts only the first author, and uses "et al." past three. */
function mlaAuthors(authors: string[]): string {
  if (authors.length === 0) return "";
  const { family, given } = splitName(authors[0]);
  const first = given.length ? `${family}, ${given.join(" ")}` : family;
  if (authors.length === 1) return first;
  if (authors.length > 3) return `${first}, et al.`;
  const rest = authors.slice(1);
  if (rest.length === 1) return `${first}, and ${rest[0]}`;
  return `${first}, ${rest.slice(0, -1).join(", ")}, and ${rest[rest.length - 1]}`;
}

/** Chicago inverts the first author and spells the rest out in full. */
function chicagoAuthors(authors: string[]): string {
  if (authors.length === 0) return "";
  const { family, given } = splitName(authors[0]);
  const first = given.length ? `${family}, ${given.join(" ")}` : family;
  if (authors.length === 1) return first;
  const rest = authors.slice(1);
  if (rest.length === 1) return `${first}, and ${rest[0]}`;
  return `${first}, ${rest.slice(0, -1).join(", ")}, and ${rest[rest.length - 1]}`;
}

const volumeIssue = (p: Publication) => {
  if (!p.volume) return "";
  return p.issue ? `${p.volume}(${p.issue})` : `${p.volume}`;
};

const withPeriod = (s: string) => (s.endsWith(".") ? s : `${s}.`);

export type CitationStyle = "APA" | "MLA" | "Chicago" | "BibTeX";
export const CITATION_STYLES: CitationStyle[] = ["APA", "MLA", "Chicago", "BibTeX"];

export function formatCitation(p: Publication, style: CitationStyle): string {
  const year = yearOf(p);
  const doi = p.doi ? ` https://doi.org/${p.doi}` : "";

  switch (style) {
    case "APA": {
      const authors = apaAuthors(p.authors);
      const vi = volumeIssue(p);
      const tail = [vi, p.pages].filter(Boolean).join(", ");
      return `${withPeriod(authors)} (${year}). ${withPeriod(p.title)} ${JOURNAL_NAME}${
        tail ? `, ${tail}` : ""
      }.${doi}`.trim();
    }
    case "MLA": {
      const authors = mlaAuthors(p.authors);
      const bits = [JOURNAL_NAME];
      if (p.volume) bits.push(`vol. ${p.volume}`);
      if (p.issue) bits.push(`no. ${p.issue}`);
      bits.push(year);
      if (p.pages) bits.push(`pp. ${p.pages}`);
      return `${withPeriod(authors)} "${withPeriod(p.title)}" ${bits.join(", ")}.${doi}`.trim();
    }
    case "Chicago": {
      const authors = chicagoAuthors(p.authors);
      let ref = `${withPeriod(authors)} "${withPeriod(p.title)}" ${JOURNAL_NAME}`;
      if (p.volume) ref += ` ${p.volume}`;
      if (p.issue) ref += `, no. ${p.issue}`;
      ref += ` (${year})`;
      if (p.pages) ref += `: ${p.pages}`;
      return `${ref}.${doi}`.trim();
    }
    case "BibTeX": {
      const { family } = splitName(p.authors[0] ?? "IES");
      const key = `${family.toLowerCase().replace(/[^a-z]/g, "")}${year}`;
      const lines = [
        `@article{${key},`,
        `  title   = {${p.title}},`,
        `  author  = {${p.authors.join(" and ")}},`,
        `  journal = {${JOURNAL_NAME}},`,
        `  year    = {${year}},`,
      ];
      if (p.volume) lines.push(`  volume  = {${p.volume}},`);
      if (p.issue) lines.push(`  number  = {${p.issue}},`);
      if (p.pages) lines.push(`  pages   = {${p.pages}},`);
      if (p.doi) lines.push(`  doi     = {${p.doi}},`);
      lines.push(`  publisher = {${PUBLISHER}},`);
      lines.push(`  note    = {${p.id}}`);
      lines.push(`}`);
      return lines.join("\n");
    }
  }
}
