"use client";

/**
 * The whole member surface at one address.
 *
 * There is no separate sign-in page, because there is nothing to sign in with:
 * the browser either holds a membership or it does not, and this page can tell
 * which within a second of loading. A visitor gets the join flow, a member gets
 * their competitions. Same URL either way, so a link to /members is safe to
 * send to anybody.
 */

import Link from "next/link";
import {
  COMPETITIONS,
  PHASE_WORD,
  formatDate,
  phaseOf,
} from "@/lib/competition";
import { useMembers } from "@/lib/members";
import JoinFlow from "./JoinFlow";
import MemberDashboard from "./MemberDashboard";
import { RedeemCode } from "./DeviceLink";

export default function MemberArea() {
  const api = useMembers();
  const { state } = api;

  if (state.status === "unconfigured") {
    return (
      <Notice title="The member area is not switched on yet">
        This deployment has no membership database configured. Competition
        details and the standalone EPR form still work; ask whoever runs the site
        to set <code className="text-gold">NEXT_PUBLIC_STDB_MODULE</code>.
      </Notice>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="py-20" aria-live="polite">
        <div className="h-px w-24 bg-gold animate-pulse" />
        <p className="mt-6 text-sm text-text-muted">Looking for your membership</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <Notice title="We could not reach the membership database">
        {state.message}
        <button
          type="button"
          onClick={() => void api.refresh()}
          className="mt-6 block px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
        >
          Try again
        </button>
      </Notice>
    );
  }

  if (state.status === "member") {
    return (
      <MemberDashboard
        profile={state.profile}
        entries={state.entries}
        api={api}
      />
    );
  }

  // Guest.
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-6">
        <span className="text-xs font-bold text-gold tracking-widest uppercase">
          Membership
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-arch-white leading-tight">
          Join IES
        </h1>
        <p className="mt-6 text-lg text-text-secondary leading-relaxed">
          Membership is free, takes about a minute, and is the only thing between
          you and every competition we run. You do not need a chapter at your
          school, and you do not need to be in any particular country.
        </p>

        <div className="mt-12 border-t border-border pt-12">
          <JoinFlow onJoin={api.join} busy={api.busy} />
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <RedeemCode redeemCode={api.redeemCode} busy={api.busy} />
        </div>
      </div>

      {/* What membership is actually for. */}
      <div className="lg:col-span-5 lg:col-start-8">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
          What you get access to
        </h2>
        <div className="border-t border-border">
          {COMPETITIONS.map((competition) => {
            const phase = phaseOf(competition);
            const count = api.counts.find((c) => c.slug === competition.slug);
            return (
              <div key={competition.slug} className="border-b border-border py-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-bold text-arch-white">
                    {competition.short}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold ${
                      phase === "open"
                        ? "text-obsidian bg-gold"
                        : "text-text-muted border border-border"
                    }`}
                  >
                    {PHASE_WORD[phase]}
                  </span>
                </div>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {competition.summary}
                </p>
                <p className="mt-2 text-xs text-text-muted">
                  {phase === "open"
                    ? `Entries close ${formatDate(competition.closesAt)}`
                    : `Opens ${formatDate(competition.opensAt)}`}
                  {". "}
                  {competition.prizeLine}
                  {count && count.people > 0 ? `. ${count.people} entered` : ""}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-text-secondary leading-relaxed">
          Already know what you are entering? Every competition has its own page,
          linked from{" "}
          <Link
            href="/competitions"
            className="text-gold hover:text-gold-dark transition-colors"
          >
            Competitions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function Notice({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-xl border border-border p-8">
      <h1 className="font-serif text-2xl font-bold text-arch-white">{title}</h1>
      <div className="mt-4 text-sm text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
