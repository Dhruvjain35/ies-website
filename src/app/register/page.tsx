"use client";

import { useRef, useState, FormEvent } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { inputClass, labelClass, type FormStatus } from "@/lib/web3forms";
import CompetitionCountdown from "@/components/CompetitionCountdown";
import { useCompetitionPhase } from "@/hooks/useCompetitionPhase";
import {
  OPENS_AT,
  DEADLINE_AT,
  COMPETITION_ENDS_AT,
  PHASE_COPY,
  formatDateTime,
  formatDate,
} from "@/lib/competition";

const requirements: [string, string][] = [
  ["Participants", "Individual entry"],
  ["Word count", "1,200 words max"],
  ["Registration opens", formatDateTime(OPENS_AT)],
  ["Entries close", formatDateTime(DEADLINE_AT)],
  ["Competition ends", formatDate(COMPETITION_ENDS_AT)],
  ["Sources", "Optional, cited if used"],
];

/** Illustrative only — the live prompt is emailed to registrants when the cycle opens. */
const samplePrompts = [
  "Central banks have targeted 2% inflation for three decades. Should that target be higher?",
  "Does industrial policy do more good than harm in developing economies?",
  "A country discovers a large resource windfall. Is a sovereign wealth fund the responsible use of it?",
];

const faqs = [
  {
    q: "Do I need to be in an IES chapter?",
    a: "No. The Essay Competition is the one IES event open to any high school student, whether or not their school has a chapter. Chapter members are additionally eligible for the Chapter Champion award.",
  },
  {
    q: "Is there an entry fee?",
    a: "No. Registration and entry are free.",
  },
  {
    q: "When do I get the prompt?",
    a: "The prompt is emailed to every registrant the day the cycle opens. You then have two weeks to submit.",
  },
  {
    q: "Can I submit more than one essay?",
    a: "One entry per participant. If you submit twice, we score the earlier submission.",
  },
  {
    q: "Do I have to cite sources?",
    a: "Sources are optional — the IEC is an argument event, not a research event. If you do use sources, cite them consistently in MLA, APA, or Chicago. Citations do not count toward the 1,200 words.",
  },
  {
    q: "How is it judged?",
    a: "Essays are anonymized, then scored by two judges against a 100-point rubric. Scores within 10 points are averaged; a wider gap goes to a third judge, whose score is final.",
  },
  {
    q: "Can I use AI to write or edit it?",
    a: "No. Submissions must be entirely your own original work, free of AI-generated content. This is the same standard the GRP holds.",
  },
  {
    q: "What happens if I go over the word limit?",
    a: "Essays over 1,200 words are scored on the first 1,200 words only. Nothing past that is read.",
  },
];

export default function RegisterPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const state = useCompetitionPhase();
  const phase = state?.phase ?? null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setStatus("submitting");
    setMessage("");
    const data = new FormData(form);

    try {
      const res = await fetch("/api/essay-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          institution: data.get("institution"),
          year: data.get("year"),
          country: data.get("country"),
          chapter: data.get("chapter"),
          angle: data.get("angle"),
          original: data.get("original") === "on",
          company: data.get("company"), // honeypot
        }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("success");
        setMessage(json.message ?? "You are registered.");
        if (!json.duplicate) form.reset();
      } else {
        setStatus("error");
        setMessage(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage(
        "We could not reach the server. Please check your connection and try again.",
      );
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Header — status and countdown track the live phase */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-gold tracking-widest uppercase">
                    Register
                  </span>
                  {phase && (
                    <span
                      className={`px-2.5 py-1 text-xs font-bold ${
                        phase === "open"
                          ? "text-obsidian bg-gold"
                          : "text-text-secondary border border-border"
                      }`}
                    >
                      {PHASE_COPY[phase].label}
                    </span>
                  )}
                </div>
                <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-arch-white leading-tight">
                  IES Essay Competition
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
                  One prompt. Twelve hundred words. Registrants receive the prompt,
                  the deadline, and submission instructions by email when the
                  competition window opens.
                </p>
                <p className="mt-5 text-sm text-text-secondary">
                  {phase ? PHASE_COPY[phase].body : PHASE_COPY.upcoming.body}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="border border-border bg-obsidian-light p-6">
                  <p className="text-xs font-bold tracking-widest uppercase text-text-muted mb-4">
                    {phase === "upcoming"
                      ? "Registration opens in"
                      : phase === "open"
                        ? "Entries close in"
                        : phase === "competition"
                          ? "Competition ends in"
                          : phase === "closed"
                            ? "Cycle complete"
                            : "Countdown"}
                  </p>
                  {phase === "closed" ? (
                    <p className="font-serif text-xl text-arch-white">
                      Results are sent to participants by email.
                    </p>
                  ) : (
                    <CompetitionCountdown parts={state?.parts ?? null} size="sm" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form + requirements */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form — only mounted while the window is actually open */}
              <div>
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                  {phase === "open" ? "Registration Form" : "Registration"}
                </h2>

                {phase === null && (
                  <div className="border border-border p-8 space-y-3 animate-pulse">
                    <div className="h-3 w-32 bg-obsidian-lighter" />
                    <div className="h-3 w-52 bg-obsidian-lighter" />
                  </div>
                )}

                {phase !== null && phase !== "open" && (
                  <div className="border border-border bg-obsidian-light p-8">
                    <h3 className="font-serif text-2xl font-bold text-arch-white mb-3">
                      {PHASE_COPY[phase].heading}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {PHASE_COPY[phase].body}
                    </p>
                    {phase === "upcoming" && (
                      <>
                        <div className="border-t border-border pt-6 mb-6">
                          <CompetitionCountdown parts={state?.parts ?? null} size="sm" />
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed mb-6">
                          The form below goes live automatically at{" "}
                          <span className="text-arch-white">{formatDateTime(OPENS_AT)}</span>.
                          Nothing to do until then — join the Discord and we will
                          announce it there the moment it opens.
                        </p>
                      </>
                    )}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/join"
                        className="px-5 py-2.5 text-xs font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                      >
                        Join IES
                      </Link>
                      <Link
                        href="/competitions#essay"
                        className="px-5 py-2.5 text-xs text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                      >
                        Read the rules
                      </Link>
                    </div>
                  </div>
                )}

                {phase === "open" && (
                <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="re-name" className={labelClass}>Full Name</label>
                    <input id="re-name" name="name" type="text" required className={inputClass} placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label htmlFor="re-email" className={labelClass}>Email</label>
                    <input id="re-email" name="email" type="email" required className={inputClass} placeholder="name@school.edu" />
                  </div>
                  <div>
                    <label htmlFor="re-institution" className={labelClass}>School / Institution</label>
                    <input id="re-institution" name="institution" type="text" required className={inputClass} placeholder="Your school or institution" />
                  </div>
                  <div>
                    <label htmlFor="re-chapter" className={labelClass}>
                      IES Chapter <span className="text-text-muted normal-case">(optional)</span>
                    </label>
                    <input id="re-chapter" name="chapter" type="text" className={inputClass} placeholder="Your chapter name, if you have one" />
                  </div>
                  <div>
                    <label htmlFor="re-year" className={labelClass}>Grade / Year</label>
                    <input id="re-year" name="year" type="text" required className={inputClass} placeholder="e.g. Grade 11, Year 12" />
                  </div>
                  <div>
                    <label htmlFor="re-country" className={labelClass}>Country</label>
                    <input id="re-country" name="country" type="text" required className={inputClass} placeholder="Your country" />
                  </div>
                  <div>
                    <label htmlFor="re-angle" className={labelClass}>
                      Working Title or Angle <span className="text-text-muted normal-case">(optional)</span>
                    </label>
                    <textarea id="re-angle" name="angle" rows={3} className={`${inputClass} resize-none`} placeholder="If you already have a direction in mind, describe it briefly..." />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      id="re-original"
                      name="original"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 shrink-0 accent-gold"
                    />
                    <label htmlFor="re-original" className="text-sm text-text-secondary leading-relaxed">
                      I confirm my submission will be entirely my own original work,
                      free of AI-generated content.
                    </label>
                  </div>

                  {/* Honeypot — hidden from people, tempting to bots */}
                  <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="re-company">Company</label>
                    <input id="re-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full px-8 py-4 text-sm font-semibold text-obsidian bg-gold hover:bg-gold-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Submitting..." : "Register for the Essay Competition"}
                  </button>
                </form>
                )}

                {phase === "open" && status === "success" && (
                  <p className="mt-4 text-sm text-green-400" role="status">
                    {message} The prompt and submission instructions will be emailed
                    to you when the competition window opens.
                  </p>
                )}
                {phase === "open" && status === "error" && (
                  <p className="mt-4 text-sm text-red-400" role="alert">
                    {message}
                  </p>
                )}
                {phase === "open" && status === "idle" && (
                  <p className="mt-4 text-xs text-text-muted">
                    Registration is free. You will receive a confirmation email.
                  </p>
                )}
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                  What You Are Signing Up For
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-8">
                  The Essay Competition is IES&apos;s argument event. You are given a
                  single prompt on a contested economic question and asked to take a
                  position and defend it. Unlike the GRP, it rewards clarity of
                  reasoning over volume of research.
                </p>

                <h3 className="text-sm font-bold text-text-muted mb-4">Requirements</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {requirements.map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm">{label}</td>
                        <td className="py-2.5 text-arch-white text-sm">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-10 border border-border p-6">
                  <h3 className="text-sm font-bold text-arch-white mb-2">
                    Not in a chapter yet?
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    You can still register. Chapter affiliation is optional for the
                    Essay Competition, though chapter members are eligible for the
                    Chapter Champion award.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/join"
                      className="px-5 py-2.5 text-xs font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                    >
                      Join IES
                    </Link>
                    <Link
                      href="/competitions#essay"
                      className="px-5 py-2.5 text-xs text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                    >
                      Full competition details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sample prompts */}
        <section className="bg-obsidian-light border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                  Sample Prompts
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  The live prompt is not published in advance. These are the shape of
                  question to expect: contested, answerable from either side, and
                  impossible to resolve by looking something up.
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="border-t border-border">
                  {samplePrompts.map((prompt, i) => (
                    <div key={prompt} className="flex items-start gap-5 border-b border-border py-6">
                      <span className="text-xs font-bold text-gold mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-serif text-lg text-arch-white leading-snug">
                        {prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                  Questions
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Anything not covered here, email{" "}
                  <a
                    href="mailto:ies.economicsociety@gmail.com"
                    className="text-gold hover:text-gold-dark transition-colors"
                  >
                    ies.economicsociety@gmail.com
                  </a>
                  .
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="border-t border-border">
                  {faqs.map((faq, i) => (
                    <div key={faq.q} className="border-b border-border">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex items-center justify-between w-full py-4 text-left gap-4 group"
                        aria-expanded={openFaq === i}
                      >
                        <span className="text-sm font-medium text-arch-white group-hover:text-gold transition-colors duration-200">
                          {faq.q}
                        </span>
                        <span className="text-text-muted text-lg leading-none shrink-0">
                          {openFaq === i ? "−" : "+"}
                        </span>
                      </button>
                      {openFaq === i && (
                        <p className="pb-4 text-sm text-text-secondary leading-relaxed">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
