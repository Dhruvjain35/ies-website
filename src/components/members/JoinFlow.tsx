"use client";

/**
 * Joining IES, one question at a time.
 *
 * The same eight fields as the old flat form, asked in sequence rather than
 * stacked in a column. Enter moves forward, the last two questions are
 * skippable, and nothing is written until the end, so backing out costs
 * nothing. The point is that a fourteen year old on a phone sees one thing to
 * do at a time instead of a wall of labels.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { JoinInput } from "@/lib/members";

interface Question {
  key: keyof JoinInput;
  /** The question itself, in plain words. */
  ask: string;
  /** One line under it, when the question needs it. */
  note?: string;
  placeholder: string;
  type?: "text" | "email";
  required: boolean;
}

const QUESTIONS: Question[] = [
  {
    key: "name",
    ask: "What should we call you?",
    placeholder: "Your full name",
    required: true,
  },
  {
    key: "email",
    ask: "Where should results and prompts go?",
    note: "One address, one membership. We write about competitions, the journal, and your chapter, and nothing else.",
    placeholder: "you@school.edu",
    type: "email",
    required: true,
  },
  {
    key: "institution",
    ask: "Where do you study?",
    placeholder: "Your school or institution",
    required: true,
  },
  {
    key: "year",
    ask: "What year are you in?",
    placeholder: "Grade 11, Year 12, first year",
    required: true,
  },
  {
    key: "country",
    ask: "And which country?",
    note: "Competitions are judged on the recording alone, so a timezone is never a disadvantage.",
    placeholder: "Your country",
    required: true,
  },
  {
    key: "chapter",
    ask: "Are you in an IES chapter?",
    note: "Leave it blank if there is not one at your school. You can still enter everything.",
    placeholder: "Your chapter, if you have one",
    required: false,
  },
  {
    key: "discord",
    ask: "Your Discord username?",
    note: "Only so we can match you to the server. Skip it if you would rather not.",
    placeholder: "username",
    required: false,
  },
];

const BLANK: JoinInput = {
  name: "",
  email: "",
  institution: "",
  year: "",
  country: "",
  chapter: "",
  discord: "",
  interests: "",
};

export default function JoinFlow({
  onJoin,
  busy,
}: {
  onJoin: (input: JoinInput) => Promise<void>;
  busy: boolean;
}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<JoinInput>(BLANK);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const q = QUESTIONS[step];
  const last = step === QUESTIONS.length - 1;
  const current = (values[q.key] ?? "").toString();

  // Focus follows the question, so the keyboard never has to be re-summoned.
  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const answered = useMemo(
    () => QUESTIONS.filter((question) => (values[question.key] ?? "").toString().trim()),
    [values],
  );

  function set(key: keyof JoinInput, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  async function advance() {
    if (q.required && !current.trim()) {
      setError("This one is needed to carry on.");
      return;
    }
    if (q.key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(current.trim())) {
      setError("That address does not look quite right.");
      return;
    }
    if (!last) {
      setStep((s) => s + 1);
      return;
    }
    try {
      await onJoin(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div>
      {/* Progress. Deliberately quiet: a count, not a bar racing to fill. */}
      <div className="flex items-center gap-2 mb-10">
        {QUESTIONS.map((question, i) => (
          <span
            key={question.key}
            className={`h-px flex-1 transition-colors duration-300 ${
              i <= step ? "bg-gold" : "bg-border"
            }`}
          />
        ))}
        <span className="ml-3 text-xs text-text-muted tabular-nums shrink-0">
          {step + 1} of {QUESTIONS.length}
        </span>
      </div>

      <div key={q.key} className="step-in">
        <label
          htmlFor={`join-${q.key}`}
          className="block font-serif text-2xl sm:text-3xl font-bold text-arch-white leading-snug"
        >
          {q.ask}
        </label>
        {q.note && (
          <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-lg">
            {q.note}
          </p>
        )}

        <input
          id={`join-${q.key}`}
          ref={inputRef}
          type={q.type ?? "text"}
          value={current}
          autoComplete={
            q.key === "email" ? "email" : q.key === "name" ? "name" : "off"
          }
          onChange={(e) => set(q.key, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void advance();
            }
            if (e.key === "Escape" && step > 0) setStep((s) => s - 1);
          }}
          placeholder={q.placeholder}
          className="mt-8 w-full bg-transparent border-b border-border focus:border-gold px-0 py-3 text-lg text-arch-white placeholder:text-text-muted focus:outline-none focus:ring-0 transition-colors"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => void advance()}
            disabled={busy}
            className="px-8 py-3.5 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? "Joining..." : last ? "Join IES" : "Continue"}
          </button>

          {!q.required && !last && (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="text-sm text-text-muted hover:text-arch-white transition-colors"
            >
              Skip this
            </button>
          )}

          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-sm text-text-muted hover:text-arch-white transition-colors"
            >
              Back
            </button>
          )}
        </div>

        <p className="mt-6 text-xs text-text-muted">
          Press Enter to continue. Membership is free and nothing is written
          until the last question.
        </p>
      </div>

      {/* What has been said so far, so the sequence never feels like a black box. */}
      {answered.length > 0 && (
        <div className="mt-12 border-t border-border pt-6">
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-4">
            So far
          </h3>
          <dl className="space-y-2">
            {answered.map((question) => (
              <div key={question.key} className="flex gap-4 text-sm">
                <dt className="text-text-muted w-32 shrink-0">
                  {question.ask.replace(/\?$/, "")}
                </dt>
                <dd className="text-arch-white">
                  {(values[question.key] ?? "").toString()}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
