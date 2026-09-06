"use client";

import { useRef, useState, FormEvent } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CompetitionCountdown from "@/components/CompetitionCountdown";
import { useCompetitionPhase } from "@/hooks/useCompetitionPhase";
import { inputClass, labelClass, type FormStatus } from "@/lib/web3forms";
import {
  OPENS_AT,
  DEADLINE_AT,
  COMPETITION_ENDS_AT,
  PRIZES,
  PRIZE_POOL,
  VIDEO_LENGTH_LABEL,
  VIDEO_MIN_MINUTES,
  VIDEO_MAX_MINUTES,
  PHASE_COPY,
  formatDateTime,
  formatDate,
} from "@/lib/competition";

const MIN_TEAM = 2;
const MAX_TEAM = 4;

const requirements: [string, string][] = [
  ["Participants", "Individual, or a team of 2–4"],
  ["Deliverable", `Recorded video, ${VIDEO_LENGTH_LABEL}`],
  ["Slides", "Google Slides deck, visible throughout"],
  ["Registration opens", formatDateTime(OPENS_AT)],
  ["Entries close", formatDateTime(DEADLINE_AT)],
  ["Judging ends", formatDate(COMPETITION_ENDS_AT)],
];

const faqs = [
  {
    q: "Can I enter on my own?",
    a: "Yes. The EPR accepts individual entries and teams of 2 to 4. The rubric and the prizes are the same either way — a solo entry is judged against team entries on the strength of the policy and the presentation, not on headcount.",
  },
  {
    q: "Do team members have to be from the same school?",
    a: "No. Teams can be formed across schools, chapters, and countries. Register once per team, with one person as the primary contact.",
  },
  {
    q: "Do I need to be in an IES chapter?",
    a: "No. The EPR is open to any high school student. Chapter members are additionally eligible for the Chapter Champion award.",
  },
  {
    q: "What exactly do I submit?",
    a: "Two links: an unlisted video of your presentation, and your Google Slides deck with view access. The submission form is emailed to registrants when the theme is released.",
  },
  {
    q: "How long can the video be?",
    a: `Between ${VIDEO_MIN_MINUTES} and ${VIDEO_MAX_MINUTES} minutes. Judges stop watching at ${VIDEO_MAX_MINUTES}:00, so anything after that is not scored, and an entry under ${VIDEO_MIN_MINUTES}:00 is treated as under length and marked down. Aim to land comfortably inside the window rather than at either edge.`,
  },
  {
    q: "Does every team member have to speak?",
    a: "Yes. Each member must present a meaningful portion of the video. Judges score delivery across the whole team, not one presenter.",
  },
  {
    q: "Do we have to be on camera?",
    a: "No. Faces on camera are welcome but optional. What matters is that the Google Slides deck is readable for the whole video and the audio is clear.",
  },
  {
    q: "How are the cash prizes paid?",
    a: `First place receives $300, second $200, and third $100 — $${PRIZE_POOL} per cycle. Fourth and fifth receive a Certificate of Distinction. A team prize is paid to the team and split at the team's discretion.`,
  },
  {
    q: "Is there an entry fee?",
    a: "No. Registration and entry are free.",
  },
  {
    q: "Can we use AI to write it?",
    a: "No. The policy, the script, and the deck must be your own original work, free of AI-generated content.",
  },
];

export default function RegisterPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [entryType, setEntryType] = useState<"individual" | "team">("individual");
  const [members, setMembers] = useState<string[]>(["", ""]);
  const formRef = useRef<HTMLFormElement>(null);
  const state = useCompetitionPhase();
  const phase = state?.phase ?? null;

  const setMember = (i: number, value: string) =>
    setMembers((prev) => prev.map((m, idx) => (idx === i ? value : m)));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setStatus("submitting");
    setMessage("");
    const data = new FormData(form);

    try {
      const res = await fetch("/api/epr-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryType,
          teamName: data.get("teamName"),
          members: entryType === "team" ? members.map((m) => m.trim()).filter(Boolean) : [],
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
        if (!json.duplicate) {
          form.reset();
          setMembers(["", ""]);
          setEntryType("individual");
        }
      } else {
        setStatus("error");
        setMessage(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please check your connection and try again.");
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
                  Economic Policy Recommendation
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
                  Design a policy for the announced theme and make the case for it in an
                  {VIDEO_LENGTH_LABEL} video over a Google Slides deck. Enter alone or
                  with a team of up to four.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {PRIZES.filter((p) => p.cash).map((p) => (
                    <div key={p.place} className="border border-gold/30 px-5 py-3">
                      <div className="font-serif text-2xl font-bold text-gold leading-none">
                        {p.award}
                      </div>
                      <div className="mt-1.5 text-[10px] uppercase tracking-widest text-text-muted">
                        {p.place}
                      </div>
                    </div>
                  ))}
                  <div className="border border-border px-5 py-3 flex flex-col justify-center">
                    <div className="text-sm font-semibold text-arch-white leading-tight">
                      Certificates
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-text-muted">
                      4th &amp; 5th
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary">
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
                          ? "Judging ends in"
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
                        href="/competitions#epr"
                        className="px-5 py-2.5 text-xs text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                      >
                        Read the rules
                      </Link>
                    </div>
                  </div>
                )}

                {phase === "open" && (
                  <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                    {/* Entry type */}
                    <div>
                      <span className={labelClass}>Entry Type</span>
                      <div className="flex gap-px bg-border">
                        {(["individual", "team"] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setEntryType(t)}
                            aria-pressed={entryType === t}
                            className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                              entryType === t
                                ? "bg-gold text-obsidian"
                                : "bg-obsidian-light text-text-secondary hover:text-arch-white"
                            }`}
                          >
                            {t === "individual" ? "Individual" : "Team of 2–4"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {entryType === "team" && (
                      <>
                        <div>
                          <label htmlFor="re-teamName" className={labelClass}>Team Name</label>
                          <input id="re-teamName" name="teamName" type="text" required className={inputClass} placeholder="What your team is called" />
                        </div>
                        <div>
                          <span className={labelClass}>
                            Team Members{" "}
                            <span className="text-text-muted normal-case">
                              ({members.length} of {MAX_TEAM})
                            </span>
                          </span>
                          <div className="space-y-3">
                            {members.map((m, i) => (
                              <div key={i} className="flex gap-2">
                                <input
                                  aria-label={`Team member ${i + 1} full name`}
                                  type="text"
                                  required
                                  value={m}
                                  onChange={(e) => setMember(i, e.target.value)}
                                  className={inputClass}
                                  placeholder={`Member ${i + 1} full name`}
                                />
                                {members.length > MIN_TEAM && (
                                  <button
                                    type="button"
                                    onClick={() => setMembers(members.filter((_, idx) => idx !== i))}
                                    aria-label={`Remove member ${i + 1}`}
                                    className="shrink-0 px-4 border border-border text-text-muted hover:text-arch-white hover:border-text-muted transition-colors"
                                  >
                                    −
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          {members.length < MAX_TEAM && (
                            <button
                              type="button"
                              onClick={() => setMembers([...members, ""])}
                              className="mt-3 text-xs font-bold text-gold hover:text-gold-dark transition-colors"
                            >
                              + Add another member
                            </button>
                          )}
                          <p className="mt-3 text-xs text-text-muted">
                            Every member listed must speak in the video. Members may come
                            from different schools or countries.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="pt-2 border-t border-border">
                      <p className="text-xs uppercase tracking-widest text-text-muted mt-6 mb-4">
                        {entryType === "team" ? "Primary contact" : "Your details"}
                      </p>
                    </div>

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
                      <label htmlFor="re-year" className={labelClass}>Grade / Year</label>
                      <input id="re-year" name="year" type="text" required className={inputClass} placeholder="e.g. Grade 11, Year 12" />
                    </div>
                    <div>
                      <label htmlFor="re-country" className={labelClass}>Country</label>
                      <input id="re-country" name="country" type="text" required className={inputClass} placeholder="Your country" />
                    </div>
                    <div>
                      <label htmlFor="re-chapter" className={labelClass}>
                        IES Chapter <span className="text-text-muted normal-case">(optional)</span>
                      </label>
                      <input id="re-chapter" name="chapter" type="text" className={inputClass} placeholder="Your chapter name, if you have one" />
                    </div>
                    <div>
                      <label htmlFor="re-angle" className={labelClass}>
                        Policy Area You Are Drawn To <span className="text-text-muted normal-case">(optional)</span>
                      </label>
                      <textarea id="re-angle" name="angle" rows={3} className={`${inputClass} resize-none`} placeholder="Trade, housing, monetary policy, development... helps us balance the judging panel." />
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
                        I confirm the policy, script, and deck will be entirely our own
                        original work, free of AI-generated content.
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
                      {status === "submitting"
                        ? "Submitting..."
                        : entryType === "team"
                          ? "Register our team"
                          : "Register for the EPR"}
                    </button>
                  </form>
                )}

                {phase === "open" && status === "success" && (
                  <p className="mt-4 text-sm text-green-400" role="status">
                    {message} The theme and submission instructions will be emailed to
                    you when the competition window opens.
                  </p>
                )}
                {phase === "open" && status === "error" && (
                  <p className="mt-4 text-sm text-red-400" role="alert">
                    {message}
                  </p>
                )}
                {phase === "open" && status === "idle" && (
                  <p className="mt-4 text-xs text-text-muted">
                    Free to enter. One registration per entrant or team.
                  </p>
                )}
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                  What You Are Signing Up For
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-8">
                  The EPR asks for a policy, not an essay. You are given an economic
                  theme, you design a response to it, and you defend that response on
                  camera. Because it is recorded rather than presented live, entrants in
                  every timezone compete on equal terms.
                </p>

                <h3 className="text-sm font-bold text-text-muted mb-4">At a glance</h3>
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

                <h3 className="text-sm font-bold text-text-muted mt-10 mb-4">Prizes</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {PRIZES.map((p) => (
                      <tr key={p.place}>
                        <td className="py-3 pr-4 text-text-muted whitespace-nowrap text-sm">{p.place}</td>
                        <td className="py-3">
                          <span className={p.cash ? "font-serif text-xl font-bold text-gold" : "text-arch-white text-sm"}>
                            {p.award}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-10 border border-border p-6">
                  <h3 className="text-sm font-bold text-arch-white mb-2">
                    Read the full rules first
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Submission format, judging criteria, and the {VIDEO_LENGTH_LABEL}{" "}
                    limit are set out in full on the competitions page.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/competitions#epr"
                      className="px-5 py-2.5 text-xs font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                    >
                      EPR rules
                    </Link>
                    <Link
                      href="/join"
                      className="px-5 py-2.5 text-xs text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                    >
                      Join IES
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-obsidian-light border-t border-border py-16 sm:py-20">
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
