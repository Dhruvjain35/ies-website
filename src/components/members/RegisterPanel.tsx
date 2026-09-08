"use client";

/**
 * The account-aware half of a competition's own registration page.
 *
 * A member sees the entry form with everything the account already knows left
 * out of it. A visitor sees the join flow in place, because sending somebody to
 * a different page to make an account and then asking them to find their way
 * back is exactly the sort of thing that loses an entry.
 */

import Link from "next/link";
import { getCompetition } from "@/lib/competition";
import { useMembers } from "@/lib/members";
import EntryForm from "./EntryForm";
import JoinFlow from "./JoinFlow";
import { RedeemCode } from "./DeviceLink";

export default function RegisterPanel({ slug }: { slug: string }) {
  const api = useMembers();
  const { state } = api;
  const competition = getCompetition(slug);

  if (!competition) return null;

  if (state.status === "unconfigured") {
    return (
      <p className="text-sm text-text-secondary leading-relaxed">
        The membership database is not configured on this deployment, so entries
        cannot be recorded here yet.{" "}
        {slug === "epr" && (
          <>
            The standalone EPR form at{" "}
            <Link href="/register" className="text-gold">
              /register
            </Link>{" "}
            still works.
          </>
        )}
      </p>
    );
  }

  if (state.status === "loading") {
    return (
      <div aria-live="polite">
        <div className="h-px w-24 bg-gold animate-pulse" />
        <p className="mt-6 text-sm text-text-muted">Checking your membership</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div>
        <p className="text-sm text-red-400">{state.message}</p>
        <button
          type="button"
          onClick={() => void api.refresh()}
          className="mt-5 px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  if (state.status === "member") {
    const entry = state.entries.find((e) => e.slug === slug);
    return (
      <div>
        <p className="text-sm text-text-muted mb-8">
          Entering as{" "}
          <span className="text-arch-white">{state.profile.name}</span>,{" "}
          {state.profile.institution}. Recorded against member{" "}
          {String(state.profile.memberNo).padStart(4, "0")}.{" "}
          <Link
            href="/members"
            className="text-gold hover:text-gold-dark transition-colors"
          >
            Your other entries
          </Link>
        </p>
        <EntryForm
          competition={competition}
          entry={entry}
          busy={api.busy}
          onEnroll={(input) => api.enroll({ slug, ...input })}
          onWithdraw={() => api.withdraw(slug)}
        />
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-text-secondary leading-relaxed mb-10">
        Entries run through an IES membership, which is free and takes about a
        minute. Answer these and the {competition.short} form opens straight
        after, with your details already in it.
      </p>
      <JoinFlow onJoin={api.join} busy={api.busy} />
      <div className="mt-12 border-t border-border pt-8">
        <RedeemCode redeemCode={api.redeemCode} busy={api.busy} />
      </div>
    </div>
  );
}
