"use client";

/**
 * The registration form for any one competition.
 *
 * There is one of these rather than three, because the three events differ in
 * about six ways and every one of them is already described in the catalogue:
 * whether teams are allowed, how large, what a team is called, and what extra
 * questions the event asks. The same component therefore serves the GEC, the
 * EPR and the GRP, and a fourth event would need no new form.
 *
 * A member who has already entered sees their answers filled in and the button
 * reading "Save changes", because amending an entry and making one are the same
 * operation on the server and should not be two different screens here.
 */

import { useState } from "react";
import type { Competition } from "@/lib/competition";
import { phaseOf, formatDateTime, PHASE_WORD } from "@/lib/competition";
import type { EntryView } from "@/lib/members";
import { extrasOf } from "@/lib/members";
import { inputClass, labelClass } from "@/lib/web3forms";

interface Props {
  competition: Competition;
  entry: EntryView | undefined;
  busy: boolean;
  onEnroll: (input: {
    entryType: "individual" | "team";
    teamName: string;
    teammates: string[];
    extras: Record<string, string>;
  }) => Promise<void>;
  onWithdraw: () => Promise<void>;
}

export default function EntryForm({
  competition,
  entry,
  busy,
  onEnroll,
  onWithdraw,
}: Props) {
  const team = competition.team;
  const existingExtras = extrasOf(entry);

  const [entryType, setEntryType] = useState<"individual" | "team">(
    entry?.entryType === "team" ? "team" : "individual",
  );
  const [teamName, setTeamName] = useState(entry?.teamName ?? "");
  const [teammates, setTeammates] = useState<string[]>(() => {
    const seed = entry?.teammates ?? [];
    const min = team ? team.min - 1 : 0;
    return seed.length >= min ? [...seed] : [...seed, ...Array(min - seed.length).fill("")];
  });
  const [extras, setExtras] = useState<Record<string, string>>(existingExtras);
  const [error, setError] = useState("");
  // What the last save actually did, not what the current state implies:
  // after a first entry succeeds, `entry` is already populated by the time this
  // renders, so reading it here would tell a new entrant their entry was
  // "updated".
  const [saved, setSaved] = useState<null | "created" | "updated">(null);
  const [confirmingWithdraw, setConfirmingWithdraw] = useState(false);

  const phase = phaseOf(competition);
  const isTeam = entryType === "team";
  const maxTeammates = team ? team.max - 1 : 0;

  function setTeammate(i: number, value: string) {
    setTeammates((prev) => prev.map((t, idx) => (idx === i ? value : t)));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(null);
    const wasEntered = Boolean(entry);

    const filled = teammates.map((t) => t.trim()).filter(Boolean);
    if (isTeam && !teamName.trim()) {
      setError(`Give the ${team?.nameLabel.toLowerCase()} something to be called.`);
      return;
    }
    if (isTeam && team && filled.length < team.min - 1) {
      setError(
        `Name ${team.min - 1 === 1 ? "your co-author" : `at least ${team.min - 1} other members`}.`,
      );
      return;
    }
    for (const field of competition.extras) {
      if (field.required && !(extras[field.key] ?? "").trim()) {
        setError(`${field.label} is needed.`);
        return;
      }
    }

    try {
      await onEnroll({
        entryType,
        teamName: isTeam ? teamName.trim() : "",
        teammates: isTeam ? filled : [],
        extras,
      });
      setSaved(wasEntered ? "updated" : "created");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // Outside the window there is nothing to fill in, so say where things stand
  // and stop. The server refuses these anyway; this is just not pretending.
  if (phase !== "open") {
    return (
      <div className="border border-border p-6">
        <p className="text-sm font-semibold text-arch-white">
          {PHASE_WORD[phase]}
        </p>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {phase === "upcoming"
            ? `Entries open ${formatDateTime(competition.opensAt)}. Nothing to do until then, and we will email you when it opens.`
            : phase === "competition"
              ? `Entries closed ${formatDateTime(competition.closesAt)}. ${competition.endsLabel} is ${formatDateTime(competition.endsAt)}.`
              : "This cycle is finished. The next one is announced to members first."}
        </p>
        {entry && (
          <p className="mt-4 text-sm text-gold">
            You are entered
            {entry.entryType === "team" && entry.teamName
              ? ` as ${entry.teamName}`
              : ""}
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      {team && (
        <fieldset>
          <legend className={labelClass}>How are you entering?</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(
              [
                ["individual", team.soloLabel],
                ["team", team.groupLabel],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setEntryType(value)}
                aria-pressed={entryType === value}
                className={`px-5 py-3.5 text-sm text-left border transition-colors ${
                  entryType === value
                    ? "border-gold text-arch-white bg-gold/5"
                    : "border-border text-text-secondary hover:border-text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {isTeam && team && (
        <>
          <div>
            <label htmlFor={`${competition.slug}-team`} className={labelClass}>
              {team.nameLabel}
            </label>
            <input
              id={`${competition.slug}-team`}
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className={inputClass}
              placeholder="Whatever you want to be called"
            />
          </div>

          <div>
            <span className={labelClass}>
              {team.memberLabel}
              {team.max > 2 ? "s" : ""}
            </span>
            <p className="-mt-1 mb-3 text-xs text-text-muted">
              Everyone except you. They do not need to be at your school, or in
              your country.
            </p>
            <div className="space-y-3">
              {teammates.map((value, i) => (
                <input
                  key={i}
                  value={value}
                  onChange={(e) => setTeammate(i, e.target.value)}
                  className={inputClass}
                  aria-label={`${team.memberLabel} ${i + 1}`}
                  placeholder={`${team.memberLabel} ${i + 1}`}
                />
              ))}
            </div>
            {teammates.length < maxTeammates && (
              <button
                type="button"
                onClick={() => setTeammates((prev) => [...prev, ""])}
                className="mt-3 text-sm text-gold hover:text-gold-dark transition-colors"
              >
                Add another
              </button>
            )}
          </div>
        </>
      )}

      {competition.extras.map((field) => (
        <div key={field.key}>
          <label htmlFor={`${competition.slug}-${field.key}`} className={labelClass}>
            {field.label}
            {!field.required && (
              <span className="text-text-muted normal-case"> (optional)</span>
            )}
          </label>
          {field.kind === "select" ? (
            <select
              id={`${competition.slug}-${field.key}`}
              value={extras[field.key] ?? ""}
              onChange={(e) =>
                setExtras((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              className={inputClass}
            >
              <option value="">Choose one</option>
              {(field.options ?? []).map((option) => (
                <option key={option} value={option} className="bg-obsidian">
                  {option}
                </option>
              ))}
            </select>
          ) : field.kind === "textarea" ? (
            <textarea
              id={`${competition.slug}-${field.key}`}
              rows={3}
              value={extras[field.key] ?? ""}
              onChange={(e) =>
                setExtras((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              className={`${inputClass} resize-none`}
              placeholder={field.placeholder}
            />
          ) : (
            <input
              id={`${competition.slug}-${field.key}`}
              value={extras[field.key] ?? ""}
              onChange={(e) =>
                setExtras((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              className={inputClass}
              placeholder={field.placeholder}
            />
          )}
          {field.help && (
            <p className="mt-2 text-xs text-text-muted leading-relaxed">
              {field.help}
            </p>
          )}
        </div>
      ))}

      {error && <p className="text-sm text-red-400">{error}</p>}
      {saved && !error && (
        <p className="text-sm text-green-400">
          {saved === "updated" ? "Entry updated." : "You are entered."}{" "}
          Everything here can be changed until entries close.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={busy}
          className="px-8 py-3.5 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy
            ? "Saving..."
            : entry
              ? "Save changes"
              : `Enter the ${competition.short}`}
        </button>

        {entry &&
          (confirmingWithdraw ? (
            <span className="flex items-center gap-3 text-sm">
              <span className="text-text-secondary">Withdraw this entry?</span>
              <button
                type="button"
                onClick={async () => {
                  setConfirmingWithdraw(false);
                  try {
                    await onWithdraw();
                  } catch (err) {
                    setError(
                      err instanceof Error ? err.message : "Something went wrong.",
                    );
                  }
                }}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Yes, withdraw
              </button>
              <button
                type="button"
                onClick={() => setConfirmingWithdraw(false)}
                className="text-text-muted hover:text-arch-white transition-colors"
              >
                Keep it
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingWithdraw(true)}
              className="text-sm text-text-muted hover:text-arch-white transition-colors"
            >
              Withdraw
            </button>
          ))}
      </div>
    </form>
  );
}
