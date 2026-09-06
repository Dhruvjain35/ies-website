"use client";

import { useRef, useState, FormEvent } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  submitToWeb3Forms,
  inputClass,
  labelClass,
  type FormStatus,
} from "@/lib/web3forms";

/** IES Discord server invite. Update here if the invite is ever regenerated. */
const DISCORD_INVITE = "https://discord.gg/vjfGycbtw";

const discordChannels = [
  {
    name: "Competition prep",
    text: "Practice questions, past GEC scenarios, and study groups forming ahead of each cycle.",
  },
  {
    name: "Research & writing",
    text: "Feedback on drafts, source recommendations, and help narrowing a topic before you submit.",
  },
  {
    name: "Chapter leaders",
    text: "A working channel for chapter presidents to compare notes on events, recruitment, and turnout.",
  },
  {
    name: "Announcements",
    text: "Prompts, deadlines, and results posted the moment they go live.",
  },
];

const steps = [
  {
    title: "Join the Discord",
    text: "The fastest way in. No application, no waiting on review — you are in the network immediately.",
  },
  {
    title: "Register as a member",
    text: "Add your details so we can send you competition cycles, journal calls, and chapter news by email.",
  },
  {
    title: "Compete or start a chapter",
    text: "Enter the EPR alone or with a team of 2–4, or bring IES to your school as a full chapter.",
  },
];

export default function JoinPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setStatus("submitting");
    const data = new FormData(form);
    const success = await submitToWeb3Forms({
      subject: "IES Membership Signup",
      from_name: data.get("name") as string,
      "Name": data.get("name") as string,
      "Email": data.get("email") as string,
      "School / Institution": data.get("institution") as string,
      "Grade / Year": data.get("year") as string,
      "Country": data.get("country") as string,
      "Discord Username": (data.get("discord") as string) || "Not provided",
      "Interests": (data.get("interests") as string) || "Not provided",
    });
    if (success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Header */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <span className="text-xs font-bold text-gold tracking-widest uppercase">
              Get Involved
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-arch-white leading-tight max-w-3xl">
              Join IES
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              You do not need a chapter at your school to be part of IES. Join the
              Discord, register as a member, and you can compete from anywhere.
            </p>
          </div>
        </section>

        {/* Discord — full-width accent panel */}
        <section className="bg-obsidian-light border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left: the pitch + CTA */}
              <div className="lg:col-span-5">
                <div className="border-l-2 border-gold pl-6">
                  <span className="text-xs font-bold text-gold tracking-widest uppercase">
                    Step One
                  </span>
                  <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-arch-white">
                    The IES Discord
                  </h2>
                </div>
                <p className="mt-8 text-base text-text-secondary leading-relaxed">
                  Every student in the network is here. It is where prompts drop,
                  where teams find their fourth member, and where a draft gets read
                  by someone in another country before it gets judged.
                </p>
                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 px-8 py-4 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.65 12.65 0 0 0-.617-1.25.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.891a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z" />
                  </svg>
                  Join the Discord Server
                </a>
                <p className="mt-4 text-xs text-text-muted">
                  Free and open. Opens Discord in a new tab.
                </p>
              </div>

              {/* Right: what's inside */}
              <div className="lg:col-span-6 lg:col-start-7">
                <h3 className="text-sm font-bold text-text-muted mb-6">
                  What is inside
                </h3>
                <div className="border-t border-border">
                  {discordChannels.map((channel) => (
                    <div key={channel.name} className="border-b border-border py-5">
                      <div className="flex items-baseline gap-3">
                        <span className="text-gold text-sm font-bold shrink-0">#</span>
                        <div>
                          <h4 className="text-sm font-semibold text-arch-white">
                            {channel.name}
                          </h4>
                          <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                            {channel.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Membership signup */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                <div className="border-l-2 border-gold pl-6 mb-8">
                  <span className="text-xs font-bold text-gold tracking-widest uppercase">
                    Step Two
                  </span>
                  <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-arch-white">
                    Register as a Member
                  </h2>
                </div>

                <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="jn-name" className={labelClass}>Full Name</label>
                    <input id="jn-name" name="name" type="text" required className={inputClass} placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label htmlFor="jn-email" className={labelClass}>Email</label>
                    <input id="jn-email" name="email" type="email" required className={inputClass} placeholder="name@school.edu" />
                  </div>
                  <div>
                    <label htmlFor="jn-institution" className={labelClass}>School / Institution</label>
                    <input id="jn-institution" name="institution" type="text" required className={inputClass} placeholder="Your school or institution" />
                  </div>
                  <div>
                    <label htmlFor="jn-year" className={labelClass}>Grade / Year</label>
                    <input id="jn-year" name="year" type="text" required className={inputClass} placeholder="e.g. Grade 11, Year 12" />
                  </div>
                  <div>
                    <label htmlFor="jn-country" className={labelClass}>Country</label>
                    <input id="jn-country" name="country" type="text" required className={inputClass} placeholder="Your country" />
                  </div>
                  <div>
                    <label htmlFor="jn-discord" className={labelClass}>
                      Discord Username <span className="text-text-muted normal-case">(optional)</span>
                    </label>
                    <input id="jn-discord" name="discord" type="text" className={inputClass} placeholder="So we can match you to the server" />
                  </div>
                  <div>
                    <label htmlFor="jn-interests" className={labelClass}>
                      What are you most interested in? <span className="text-text-muted normal-case">(optional)</span>
                    </label>
                    <textarea id="jn-interests" name="interests" rows={3} className={`${inputClass} resize-none`} placeholder="Competitions, research, starting a chapter, the journal..." />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full px-8 py-4 text-sm font-semibold text-obsidian bg-gold hover:bg-gold-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Submitting..." : "Register as an IES Member"}
                  </button>
                </form>

                {status === "success" && (
                  <p className="mt-4 text-sm text-green-400">
                    You are on the list. Watch your inbox for the next competition
                    cycle, and join the Discord above if you have not already.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 text-sm text-red-400">
                    Something went wrong. Please try again or email us directly at ies.economicsociety@gmail.com.
                  </p>
                )}
                {status === "idle" && (
                  <p className="mt-4 text-xs text-text-muted">
                    Membership is free. We only email about competitions, the
                    journal, and chapter news.
                  </p>
                )}
              </div>

              {/* How it works */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                  How Joining Works
                </h3>
                <div className="space-y-8">
                  {steps.map((step, i) => (
                    <div key={step.title} className="flex items-start gap-5">
                      <span className="text-xs font-bold text-gold mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-arch-white">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 border border-border p-6">
                  <h4 className="text-sm font-bold text-arch-white mb-2">
                    Want to bring IES to your school?
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Chapters get branding, an operational playbook, mentorship, and
                    a place on the global platform.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/apply"
                      className="px-5 py-2.5 text-xs font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                    >
                      Start a Chapter
                    </Link>
                    <Link
                      href="/register"
                      className="px-5 py-2.5 text-xs text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                    >
                      EPR Competition
                    </Link>
                  </div>
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
