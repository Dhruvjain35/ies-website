"use client";

/**
 * Editing the details given at signup. The same reducer that created the
 * membership saves the edit, so there is nothing here the join flow did not
 * already ask.
 */

import { useState } from "react";
import type { MemberApi, Profile } from "@/lib/members";
import { inputClass, labelClass } from "@/lib/web3forms";

const FIELDS: [keyof Profile & string, string][] = [
  ["name", "Full name"],
  ["email", "Email"],
  ["institution", "School or institution"],
  ["year", "Grade or year"],
  ["country", "Country"],
  ["chapter", "IES chapter"],
  ["discord", "Discord username"],
];

export default function ProfileEditor({
  profile,
  api,
}: {
  profile: Profile;
  api: MemberApi;
}) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(FIELDS.map(([key]) => [key, String(profile[key] ?? "")])),
  );
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  if (!editing) {
    return (
      <div className="border border-border p-6">
        <h3 className="text-sm font-bold text-arch-white">Your details</h3>
        <dl className="mt-5 space-y-2.5">
          {FIELDS.map(([key, label]) => (
            <div key={key} className="flex gap-4 text-sm">
              <dt className="text-text-muted w-40 shrink-0">{label}</dt>
              <dd className="text-arch-white break-words min-w-0">
                {String(profile[key] ?? "") || "Not given"}
              </dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="mt-6 text-sm text-gold hover:text-gold-dark transition-colors"
        >
          Change these
        </button>
      </div>
    );
  }

  return (
    <form
      className="border border-border p-6 step-in"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        setSaved(false);
        try {
          await api.join({
            name: values.name,
            email: values.email,
            institution: values.institution,
            year: values.year,
            country: values.country,
            chapter: values.chapter,
            discord: values.discord,
            interests: profile.interests,
          });
          setSaved(true);
          setEditing(false);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      }}
    >
      <h3 className="text-sm font-bold text-arch-white mb-5">Your details</h3>
      <div className="space-y-5">
        {FIELDS.map(([key, label]) => (
          <div key={key}>
            <label htmlFor={`profile-${key}`} className={labelClass}>
              {label}
            </label>
            <input
              id={`profile-${key}`}
              value={values[key] ?? ""}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [key]: e.target.value }))
              }
              className={inputClass}
            />
          </div>
        ))}
      </div>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {saved && <p className="mt-4 text-sm text-green-400">Saved.</p>}
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={api.busy}
          className="px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors disabled:opacity-50"
        >
          {api.busy ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="px-4 py-3 text-sm text-text-muted hover:text-arch-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
