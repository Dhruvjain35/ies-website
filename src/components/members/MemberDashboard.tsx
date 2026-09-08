"use client";

/**
 * What a signed-in member sees: who they are, and every competition with its
 * current state and its form already open to the right place.
 *
 * Registration happens here rather than on a separate page because the account
 * already knows the member's name, school, year and country. Asking again on a
 * form of its own would be the rigid version of this. Each competition still
 * has its own address for sharing, and that page renders the same form.
 */

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  COMPETITIONS,
  PHASE_WORD,
  formatDate,
  formatDateTime,
  phaseOf,
} from "@/lib/competition";
import type { EntryView, MemberApi, Profile } from "@/lib/members";
import EntryForm from "./EntryForm";
import { IssueCode } from "./DeviceLink";
import ProfileEditor from "./ProfileEditor";

export default function MemberDashboard({
  profile,
  entries,
  api,
}: {
  profile: Profile;
  entries: EntryView[];
  api: MemberApi;
}) {
  // `/members?c=grp` opens straight onto that competition, so a link can point
  // at one event without needing a page of its own. Read through the router
  // rather than from `window`, which would differ between the server render and
  // the first client render.
  const wanted = useSearchParams().get("c");
  const [open, setOpen] = useState<string | null>(
    wanted && COMPETITIONS.some((c) => c.slug === wanted) ? wanted : null,
  );
  const [signingOut, setSigningOut] = useState(false);

  const entered = entries.length;

  return (
    <div className="space-y-16">
      {/* Who you are */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-gold tracking-widest uppercase">
              Member {String(profile.memberNo).padStart(4, "0")}
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-arch-white leading-tight">
              {profile.name}
            </h1>
            <p className="mt-3 text-text-secondary">
              {[profile.institution, profile.year, profile.country]
                .filter(Boolean)
                .join(", ")}
              {profile.chapter ? `, ${profile.chapter} chapter` : ""}
            </p>
          </div>
          <p className="text-sm text-text-muted">
            {entered === 0
              ? "Not entered in anything yet"
              : `Entered in ${entered} of ${COMPETITIONS.length}`}
          </p>
        </div>
      </section>

      {/* The competitions */}
      <section>
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
          Competitions
        </h2>

        <div className="border-t border-border">
          {COMPETITIONS.map((competition) => {
            const phase = phaseOf(competition);
            const entry = entries.find((e) => e.slug === competition.slug);
            const isOpen = open === competition.slug;
            const count = api.counts.find((c) => c.slug === competition.slug);

            return (
              <div key={competition.slug} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : competition.slug)}
                  aria-expanded={isOpen}
                  className="w-full py-7 text-left group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-bold text-arch-white">
                          {competition.short}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {competition.name}
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
                        {entry && (
                          <span className="px-2 py-0.5 text-xs font-bold text-gold border border-gold/40">
                            {entry.entryType === "team" && entry.teamName
                              ? entry.teamName
                              : "Entered"}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-text-muted">
                        {competition.deliverable}
                        {". "}
                        {phase === "open"
                          ? `Entries close ${formatDate(competition.closesAt)}`
                          : phase === "upcoming"
                            ? `Opens ${formatDate(competition.opensAt)}`
                            : `${competition.endsLabel} ${formatDate(competition.endsAt)}`}
                        {count && count.people > 0
                          ? `. ${count.people} entered so far`
                          : ""}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm text-text-muted group-hover:text-gold transition-colors">
                      {isOpen ? "Close" : entry ? "Change" : "Open"}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="step-in pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-7">
                      <p className="text-base text-text-secondary leading-relaxed mb-8">
                        {competition.summary}
                      </p>
                      <EntryForm
                        competition={competition}
                        entry={entry}
                        busy={api.busy}
                        onEnroll={(input) =>
                          api.enroll({ slug: competition.slug, ...input })
                        }
                        onWithdraw={() => api.withdraw(competition.slug)}
                      />
                    </div>

                    <div className="lg:col-span-4 lg:col-start-9">
                      <h3 className="text-sm font-bold text-text-muted mb-4">
                        The shape of it
                      </h3>
                      <table className="w-full">
                        <tbody className="divide-y divide-border">
                          {competition.facts.map(([label, value]) => (
                            <tr key={label}>
                              <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm align-top">
                                {label}
                              </td>
                              <td className="py-2.5 text-arch-white text-sm">
                                {value}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm align-top">
                              {competition.endsLabel}
                            </td>
                            <td className="py-2.5 text-arch-white text-sm">
                              {formatDateTime(competition.endsAt)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="mt-4 text-sm text-gold">
                        {competition.prizeLine}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-4 text-sm">
                        <Link
                          href={competition.detailsHref}
                          className="text-text-secondary hover:text-arch-white underline underline-offset-4 decoration-border hover:decoration-gold transition-colors"
                        >
                          Full rules
                        </Link>
                        <Link
                          href={`/competitions/${competition.slug}/register`}
                          className="text-text-secondary hover:text-arch-white underline underline-offset-4 decoration-border hover:decoration-gold transition-colors"
                        >
                          Shareable page
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Your details */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProfileEditor profile={profile} api={api} />
        <div className="space-y-6">
          <IssueCode issueCode={api.issueCode} busy={api.busy} />
          <div className="border border-border p-6">
            <h3 className="text-sm font-bold text-arch-white">Leave IES</h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              Deletes your membership and withdraws every entry. There is no way
              back from it.
            </p>
            {signingOut ? (
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                <span className="text-text-secondary">
                  Delete the membership and all {entered} entries?
                </span>
                <button
                  type="button"
                  onClick={() => void api.signOut()}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Yes, delete it
                </button>
                <button
                  type="button"
                  onClick={() => setSigningOut(false)}
                  className="text-text-muted hover:text-arch-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSigningOut(true)}
                className="mt-5 text-sm text-text-muted hover:text-arch-white transition-colors"
              >
                Delete my membership
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
