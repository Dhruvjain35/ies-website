"use client";

import Link from "next/link";
import CompetitionCountdown from "./CompetitionCountdown";
import { useCompetitionPhase } from "@/hooks/useCompetitionPhase";
import {
  OPENS_AT,
  DEADLINE_AT,
  COMPETITION_ENDS_AT,
  formatShort,
  formatDate,
  type Phase,
} from "@/lib/competition";

const MILESTONES = [
  { at: OPENS_AT, label: "Registration opens", phasesDone: ["open", "competition", "closed"] },
  { at: DEADLINE_AT, label: "Entries close", phasesDone: ["competition", "closed"] },
  { at: COMPETITION_ENDS_AT, label: "Competition ends", phasesDone: ["closed"] },
] as const;

const COUNTDOWN_LABEL: Record<Phase, string> = {
  upcoming: "Registration opens in",
  open: "Entries close in",
  competition: "Competition ends in",
  closed: "This cycle has ended",
};

const CTA: Record<Phase, { label: string; href: string; primary: boolean }> = {
  upcoming: { label: "See the rules and prepare", href: "/competitions#essay", primary: false },
  open: { label: "Register now", href: "/register", primary: true },
  competition: { label: "View competition details", href: "/competitions#essay", primary: false },
  closed: { label: "Join IES for the next cycle", href: "/join", primary: true },
};

export default function EssayCompetitionFeature() {
  const state = useCompetitionPhase();
  const phase = state?.phase ?? "upcoming";
  const cta = CTA[phase];

  return (
    <section className="relative border-y border-border bg-obsidian-light overflow-hidden">
      {/* Soft gold wash, kept behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/[0.07] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — the pitch */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 text-xs font-bold text-obsidian bg-gold">
                {state
                  ? phase === "open"
                    ? "Now open"
                    : phase === "upcoming"
                      ? "Opens September 12"
                      : phase === "competition"
                        ? "In progress"
                        : "Cycle closed"
                  : "2026 Cycle"}
              </span>
              <span className="text-xs font-bold text-gold tracking-widest uppercase">
                Inaugural Cycle
              </span>
            </div>

            <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-arch-white leading-[1.1]">
              The IES Essay
              <br />
              Competition
            </h2>

            <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
              One prompt on a contested economic question. Twelve hundred words to
              take a position and defend it. Open to any high school student in the
              world — no chapter required.
            </p>

            {/* Timeline */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-5">
                {MILESTONES.map((m, i) => {
                  const done = (m.phasesDone as readonly string[]).includes(phase);
                  return (
                    <div key={m.label} className="flex items-center gap-2 flex-1 last:flex-none">
                      <span
                        className={`h-2 w-2 rounded-full shrink-0 transition-colors ${
                          state && done ? "bg-gold" : "bg-border"
                        }`}
                      />
                      {i < MILESTONES.length - 1 && (
                        <span
                          className={`h-px flex-1 transition-colors ${
                            state && done ? "bg-gold/50" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <dl className="grid grid-cols-3 gap-4">
                {MILESTONES.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs uppercase tracking-widest text-text-muted">
                      {m.label}
                    </dt>
                    <dd className="mt-1.5 font-serif text-lg sm:text-xl font-bold text-arch-white">
                      {formatShort(m.at)}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-text-muted">
                All times US Central. Competition runs two weeks, closing{" "}
                {formatDate(COMPETITION_ENDS_AT)}.
              </p>
            </div>
          </div>

          {/* Right — countdown + CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="border border-border bg-obsidian p-6 sm:p-8">
              <p className="text-xs font-bold tracking-widest uppercase text-text-muted mb-5">
                {state ? COUNTDOWN_LABEL[phase] : "Countdown"}
              </p>

              {phase === "closed" && state ? (
                <p className="font-serif text-2xl text-arch-white leading-snug">
                  Results are sent to participants by email.
                </p>
              ) : (
                <CompetitionCountdown parts={state?.parts ?? null} />
              )}

              <Link
                href={cta.href}
                className={`mt-7 block w-full text-center px-6 py-4 text-sm font-bold transition-colors ${
                  cta.primary
                    ? "text-obsidian bg-gold hover:bg-gold-dark"
                    : "text-arch-white border border-border hover:border-gold/50"
                }`}
              >
                {cta.label}
              </Link>

              <p className="mt-4 text-xs text-text-muted text-center">
                {phase === "open"
                  ? "Free to enter. Registration takes a minute."
                  : phase === "upcoming"
                    ? "Registration opens 9:00 AM CT on September 12."
                    : phase === "competition"
                      ? "Entries are closed for this cycle."
                      : "The next cycle is announced to members first."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
