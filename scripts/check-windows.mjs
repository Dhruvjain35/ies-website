#!/usr/bin/env node
/**
 * The competition dates exist twice: as `new Date(...)` in
 * src/lib/competition.ts, which every page renders from, and as integer
 * microseconds in spacetime/src/lib.rs, which the module enforces entries
 * against. Two copies of a date is how a site ends up telling a student
 * registration is open while the server refuses the entry.
 *
 * This compares them and fails the build if they have drifted. It reads both
 * files as text rather than importing them, so it needs no toolchain: the Rust
 * side cannot be imported from Node at all, and the TypeScript side would drag
 * in a bundler for three regexes.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Which TypeScript constant holds each instant of each cycle. */
const MAP = {
  gec: ["GEC_OPENS", "GEC_CLOSES", "GEC_ENDS"],
  epr: ["OPENS_AT", "DEADLINE_AT", "COMPETITION_ENDS_AT"],
  grp: ["GRP_OPENS", "GRP_CLOSES", "GRP_ENDS"],
};

const ts = readFileSync(join(root, "src/lib/competition.ts"), "utf8");
const rs = readFileSync(join(root, "spacetime/src/lib.rs"), "utf8");

const dates = {};
for (const m of ts.matchAll(/(\w+)\s*=\s*new Date\("([^"]+)"\)/g)) {
  dates[m[1]] = m[2];
}

const cycles = {};
for (const m of rs.matchAll(
  /slug:\s*"(\w+)",\s*opens_at:\s*(\d+),\s*closes_at:\s*(\d+),\s*ends_at:\s*(\d+),/g,
)) {
  cycles[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])];
}

const problems = [];

for (const [slug, names] of Object.entries(MAP)) {
  const rust = cycles[slug];
  if (!rust) {
    problems.push(`spacetime/src/lib.rs has no cycle for "${slug}"`);
    continue;
  }
  names.forEach((name, i) => {
    const iso = dates[name];
    if (!iso) {
      problems.push(`src/lib/competition.ts has no constant ${name}`);
      return;
    }
    const expected = Date.parse(iso) * 1000;
    if (!Number.isFinite(expected)) {
      problems.push(`${name} is not a parseable date: ${iso}`);
      return;
    }
    if (expected !== rust[i]) {
      problems.push(
        `${slug}.${["opens_at", "closes_at", "ends_at"][i]}: ` +
          `competition.ts says ${iso} (${expected}), lib.rs says ${rust[i]}`,
      );
    }
  });
}

for (const slug of Object.keys(cycles)) {
  if (!MAP[slug]) problems.push(`lib.rs has cycle "${slug}" that the site does not know about`);
}

if (problems.length) {
  console.error("Competition windows have drifted:\n");
  for (const p of problems) console.error(`  ${p}`);
  console.error("\nFix one side, then republish the module so the server agrees.");
  process.exit(1);
}

console.log(
  `Competition windows agree across both sources (${Object.keys(cycles).length} cycles).`,
);
