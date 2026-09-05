"use client";

import { useState, useRef, FormEvent } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  submitToWeb3Forms,
  inputClass,
  labelClass,
  type FormStatus,
} from "@/lib/web3forms";

const supportItems = [
  {
    title: "Branding & Identity Kit",
    content:
      "Official IES branding materials, chapter logos, letterheads, and social media templates for a professional, unified presence from day one.",
  },
  {
    title: "Operational Playbook",
    content:
      "A comprehensive guide covering chapter governance, event planning, member recruitment strategies, and best practices from our most successful chapters.",
  },
  {
    title: "Research & Programming Resources",
    content:
      "Access to curated economic research databases, speaker networks, case study libraries, and structured programming frameworks for workshops and symposia.",
  },
  {
    title: "Mentorship Network",
    content:
      "Connect with experienced chapter leaders and faculty advisors who provide ongoing guidance on academic programming and organizational development.",
  },
  {
    title: "Global Platform & Recognition",
    content:
      "Feature your chapter on the IES global platform, participate in inter-chapter events, and gain recognition within our international network.",
  },
];

export default function ApplyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"chapter" | "internship">("chapter");
  const [chapterStatus, setChapterStatus] = useState<FormStatus>("idle");
  const [internStatus, setInternStatus] = useState<FormStatus>("idle");
  const chapterRef = useRef<HTMLFormElement>(null);
  const internRef = useRef<HTMLFormElement>(null);

  async function handleChapterSubmit(e: FormEvent) {
    e.preventDefault();
    const form = chapterRef.current;
    if (!form) return;
    setChapterStatus("submitting");
    const data = new FormData(form);
    const success = await submitToWeb3Forms({
      subject: "IES Chapter Application",
      from_name: data.get("name") as string,
      "Applicant Name": data.get("name") as string,
      "Email": data.get("email") as string,
      "School / Institution": data.get("institution") as string,
      "Country": data.get("country") as string,
      "Statement of Purpose": data.get("purpose") as string,
    });
    if (success) {
      setChapterStatus("success");
      form.reset();
    } else {
      setChapterStatus("error");
    }
  }

  async function handleInternSubmit(e: FormEvent) {
    e.preventDefault();
    const form = internRef.current;
    if (!form) return;
    setInternStatus("submitting");
    const data = new FormData(form);
    const success = await submitToWeb3Forms({
      subject: "IES Growth Internship Application",
      from_name: data.get("name") as string,
      "Applicant Name": data.get("name") as string,
      "Email": data.get("email") as string,
      "School / Institution": data.get("institution") as string,
      "Grade / Year": data.get("year") as string,
      "Country": data.get("country") as string,
      "Motivation": data.get("motivation") as string,
      "Relevant Experience": data.get("experience") as string,
    });
    if (success) {
      setInternStatus("success");
      form.reset();
    } else {
      setInternStatus("error");
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-arch-white leading-tight max-w-3xl">
              Apply to IES
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              Start an IES chapter at your school or apply for the IES Growth
              Internship program. All applications are sent to our team for review.
            </p>

            <div className="mt-10 flex gap-px bg-border max-w-md">
              <button
                onClick={() => setActiveTab("chapter")}
                className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                  activeTab === "chapter"
                    ? "bg-gold text-obsidian"
                    : "bg-obsidian-light text-text-secondary hover:text-arch-white"
                }`}
              >
                Start a Chapter
              </button>
              <button
                onClick={() => setActiveTab("internship")}
                className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                  activeTab === "internship"
                    ? "bg-gold text-obsidian"
                    : "bg-obsidian-light text-text-secondary hover:text-arch-white"
                }`}
              >
                Growth Internship
              </button>
            </div>

            {/* School Partnership Proposal PDF */}
            <div className="mt-8 border border-border p-5 max-w-md flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-arch-white">School Partnership Proposal</p>
                <p className="text-xs text-text-muted mt-1">Share this document with your school administration</p>
              </div>
              <a
                href="/IES_School_Partnership_Proposal.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-2 text-xs font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
              >
                View PDF
              </a>
            </div>
          </div>
        </section>

        {activeTab === "chapter" && (
          <section className="border-t border-border py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                    Chapter Application
                  </h2>

                  <form ref={chapterRef} className="space-y-6" onSubmit={handleChapterSubmit}>
                    <div>
                      <label htmlFor="ch-name" className={labelClass}>Full Name</label>
                      <input id="ch-name" name="name" type="text" required className={inputClass} placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label htmlFor="ch-email" className={labelClass}>Email</label>
                      <input id="ch-email" name="email" type="email" required className={inputClass} placeholder="name@school.edu" />
                    </div>
                    <div>
                      <label htmlFor="ch-institution" className={labelClass}>School / Institution</label>
                      <input id="ch-institution" name="institution" type="text" required className={inputClass} placeholder="Your school or institution" />
                    </div>
                    <div>
                      <label htmlFor="ch-country" className={labelClass}>Country</label>
                      <input id="ch-country" name="country" type="text" required className={inputClass} placeholder="Country of your institution" />
                    </div>
                    <div>
                      <label htmlFor="ch-purpose" className={labelClass}>Statement of Purpose</label>
                      <textarea id="ch-purpose" name="purpose" rows={4} required className={`${inputClass} resize-none`} placeholder="Describe your vision for an IES chapter at your school..." />
                    </div>
                    <button
                      type="submit"
                      disabled={chapterStatus === "submitting"}
                      className="w-full px-8 py-4 text-sm font-semibold text-obsidian bg-gold hover:bg-gold-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {chapterStatus === "submitting" ? "Submitting..." : "Submit Chapter Application"}
                    </button>
                  </form>
                  {chapterStatus === "success" && (
                    <p className="mt-4 text-sm text-green-400">
                      Application submitted successfully. We will review it and get back to you within 5-7 business days.
                    </p>
                  )}
                  {chapterStatus === "error" && (
                    <p className="mt-4 text-sm text-red-400">
                      Something went wrong. Please try again or email us directly at ies.economicsociety@gmail.com.
                    </p>
                  )}
                  {chapterStatus === "idle" && (
                    <p className="mt-4 text-xs text-text-muted">
                      Applications are reviewed within 5-7 business days.
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                    What You Receive
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-8">
                    Every approved chapter receives comprehensive institutional
                    support designed to ensure sustainable growth and meaningful impact.
                  </p>
                  <div className="border-t border-border">
                    {supportItems.map((item, i) => (
                      <div key={item.title} className="border-b border-border">
                        <button
                          onClick={() => setOpenIndex(openIndex === i ? null : i)}
                          className="flex items-center justify-between w-full py-4 text-left group"
                          aria-expanded={openIndex === i}
                        >
                          <span className="text-sm font-medium text-arch-white group-hover:text-gold transition-colors duration-200">
                            {item.title}
                          </span>
                          <span className="text-text-muted text-lg leading-none">
                            {openIndex === i ? "−" : "+"}
                          </span>
                        </button>
                        {openIndex === i && (
                          <p className="pb-4 text-sm text-text-secondary leading-relaxed">
                            {item.content}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "internship" && (
          <section id="internship" className="border-t border-border py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                  IES Growth Internship
                </h2>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-arch-white mb-6">
                  Coming Soon
                </h3>
                <p className="text-base text-text-secondary leading-relaxed mb-4">
                  The IES Growth Internship is not yet accepting applications.
                  We will not review applications at this time.
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  Please check back later for updates on when applications open.
                  In the meantime, feel free to explore other ways to get involved with IES.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
