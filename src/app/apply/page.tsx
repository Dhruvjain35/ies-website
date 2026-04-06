"use client";

import { useState, useRef, FormEvent } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const WEB3FORMS_KEY = "9f893dcc-01bd-4e27-94ed-0c4247683a35";

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

type FormStatus = "idle" | "submitting" | "success" | "error";

async function submitToWeb3Forms(formData: Record<string, string>): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        ...formData,
      }),
    });
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
}

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

  const inputClass =
    "w-full bg-transparent border border-border px-4 py-3 text-sm text-arch-white placeholder:text-text-muted focus:border-gold focus:ring-0 focus:outline-none transition-colors duration-200";
  const labelClass =
    "block text-xs font-medium tracking-wider uppercase text-text-secondary mb-2";

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                    IES Growth Internship Application
                  </h2>

                  <form ref={internRef} className="space-y-6" onSubmit={handleInternSubmit}>
                    <div>
                      <label htmlFor="in-name" className={labelClass}>Full Name</label>
                      <input id="in-name" name="name" type="text" required className={inputClass} placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label htmlFor="in-email" className={labelClass}>Email</label>
                      <input id="in-email" name="email" type="email" required className={inputClass} placeholder="name@school.edu" />
                    </div>
                    <div>
                      <label htmlFor="in-institution" className={labelClass}>School / Institution</label>
                      <input id="in-institution" name="institution" type="text" required className={inputClass} placeholder="Your school or institution" />
                    </div>
                    <div>
                      <label htmlFor="in-year" className={labelClass}>Grade / Year</label>
                      <input id="in-year" name="year" type="text" required className={inputClass} placeholder="e.g. Grade 11, Year 12" />
                    </div>
                    <div>
                      <label htmlFor="in-country" className={labelClass}>Country</label>
                      <input id="in-country" name="country" type="text" required className={inputClass} placeholder="Your country" />
                    </div>
                    <div>
                      <label htmlFor="in-motivation" className={labelClass}>Why do you want to join?</label>
                      <textarea id="in-motivation" name="motivation" rows={4} required className={`${inputClass} resize-none`} placeholder="Describe your interest in the IES Growth Internship..." />
                    </div>
                    <div>
                      <label htmlFor="in-experience" className={labelClass}>Relevant Experience</label>
                      <textarea id="in-experience" name="experience" rows={3} required className={`${inputClass} resize-none`} placeholder="Describe any relevant leadership, economics, or organizational experience..." />
                    </div>
                    <button
                      type="submit"
                      disabled={internStatus === "submitting"}
                      className="w-full px-8 py-4 text-sm font-semibold text-obsidian bg-gold hover:bg-gold-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {internStatus === "submitting" ? "Submitting..." : "Submit Internship Application"}
                    </button>
                  </form>
                  {internStatus === "success" && (
                    <p className="mt-4 text-sm text-green-400">
                      Application submitted successfully. We will review it and get back to you within 5-7 business days.
                    </p>
                  )}
                  {internStatus === "error" && (
                    <p className="mt-4 text-sm text-red-400">
                      Something went wrong. Please try again or email us directly at ies.economicsociety@gmail.com.
                    </p>
                  )}
                  {internStatus === "idle" && (
                    <p className="mt-4 text-xs text-text-muted">
                      Applications are reviewed within 5-7 business days.
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
                    About the Growth Internship
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    The IES Growth Internship is designed for motivated students
                    who want to contribute to the expansion and development of
                    the International Economic Society at the international level.
                  </p>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Chapter Development",
                        text: "Support new chapters through onboarding, mentorship, and strategic guidance as they establish their presence.",
                      },
                      {
                        title: "International Coordination",
                        text: "Work with chapter leaders across countries to facilitate inter-chapter collaboration and shared initiatives.",
                      },
                      {
                        title: "Communications & Outreach",
                        text: "Help expand IES's reach through digital communications, partnership outreach, and brand development.",
                      },
                      {
                        title: "Interview Process",
                        text: "If your application is accepted, you will be invited to an interview to determine if you are the right fit for the role.",
                      },
                    ].map((item) => (
                      <div key={item.title}>
                        <h3 className="text-sm font-semibold text-arch-white">{item.title}</h3>
                        <p className="mt-1 text-sm text-text-secondary leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
