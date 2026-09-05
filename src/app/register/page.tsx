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

const requirements = [
  ["Participants", "Individual entry"],
  ["Word count", "1,200 words max"],
  ["Prompt", "Announced ahead of each cycle"],
  ["Sources", "Optional, cited if used"],
  ["Submission", "Emailed after registration closes"],
];

export default function RegisterPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setStatus("submitting");
    const data = new FormData(form);
    const success = await submitToWeb3Forms({
      subject: "IES Essay Competition Registration",
      from_name: data.get("name") as string,
      "Participant Name": data.get("name") as string,
      "Email": data.get("email") as string,
      "School / Institution": data.get("institution") as string,
      "IES Chapter": (data.get("chapter") as string) || "Not affiliated / none listed",
      "Grade / Year": data.get("year") as string,
      "Country": data.get("country") as string,
      "Working Title or Angle": (data.get("angle") as string) || "Not provided",
      "Original Work Confirmed": data.get("original") ? "Yes" : "No",
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
              Register
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-arch-white leading-tight max-w-3xl">
              IES Essay Competition
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              One prompt. Twelve hundred words. Register below and the prompt,
              deadline, and submission instructions are emailed to you when the
              cycle opens.
            </p>
            <p className="mt-4 text-sm text-text-muted">
              Registration deadline: <span className="text-arch-white font-medium">TBD</span>
            </p>
          </div>
        </section>

        {/* Form + requirements */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                  Registration Form
                </h2>

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

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full px-8 py-4 text-sm font-semibold text-obsidian bg-gold hover:bg-gold-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Submitting..." : "Register for the Essay Competition"}
                  </button>
                </form>

                {status === "success" && (
                  <p className="mt-4 text-sm text-green-400">
                    You are registered. The prompt and submission instructions will
                    be emailed to you when the cycle opens.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 text-sm text-red-400">
                    Something went wrong. Please try again or email us directly at ies.economicsociety@gmail.com.
                  </p>
                )}
                {status === "idle" && (
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
      </main>
      <Footer />
    </>
  );
}
