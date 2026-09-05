"use client";

import Link from "next/link";
import CompetitionCountdown from "./CompetitionCountdown";
import { useCompetitionPhase } from "@/hooks/useCompetitionPhase";
import { PHASE_COPY, formatDateTime, OPENS_AT, DEADLINE_AT } from "@/lib/competition";

/** Registration call-to-action for the essay section, tracking the live phase. */
export default function EssayRegistrationCta() {
  const state = useCompetitionPhase();
  const phase = state?.phase ?? null;
  const isOpen = phase === "open";

  return (
    <div className="mt-10 border border-gold/40 bg-obsidian-light p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-xl">
          <p className="text-sm font-bold text-arch-white">
            {phase ? PHASE_COPY[phase].heading : "Registration"}
          </p>
          <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
            {phase
              ? PHASE_COPY[phase].body
              : `Registration opens ${formatDateTime(OPENS_AT)} and closes ${formatDateTime(DEADLINE_AT)}.`}
          </p>
        </div>

        <div className="shrink-0 lg:w-72">
          {phase !== "closed" && (
            <div className="mb-4">
              <CompetitionCountdown parts={state?.parts ?? null} size="sm" />
            </div>
          )}
          <Link
            href={isOpen ? "/register" : phase === "closed" ? "/join" : "/register"}
            className={`block w-full text-center px-6 py-3 text-sm font-bold transition-colors ${
              isOpen
                ? "text-obsidian bg-gold hover:bg-gold-dark"
                : "text-arch-white border border-border hover:border-gold/50"
            }`}
          >
            {isOpen
              ? "Register now"
              : phase === "upcoming"
                ? "See registration details"
                : phase === "closed"
                  ? "Join IES for the next cycle"
                  : "Registration closed"}
          </Link>
        </div>
      </div>
    </div>
  );
}
