import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import PublicationBrowser from "@/components/PublicationBrowser";
import {
  PUBLICATIONS,
  ISSN,
  PUBLISHER,
  countByType,
} from "@/lib/publications";

export const metadata = {
  title: "Journal | International Economic Society",
};

export default function JournalPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Editorial header — image left, text right */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <Image
                  src="/gold.png"
                  alt="IES Journal Logo"
                  width={400}
                  height={400}
                  className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
                  preload
                />
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-arch-white leading-tight">
                  The IES Journal
                </h1>
                <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                  The official research publication of the International Economic
                  Society: an open archive of the research produced through IES
                  competitions, and a publication venue for student academic papers
                  in economics.
                </p>
                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                  {[
                    ["Records", String(PUBLICATIONS.length)],
                    ["Journal publications", String(countByType("journal"))],
                    ["Archive records", String(countByType("archive"))],
                    ["Publisher", PUBLISHER],
                    ...(ISSN ? [["Online ISSN", ISSN] as [string, string]] : []),
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[10px] uppercase tracking-widest text-text-muted">
                        {label}
                      </dt>
                      <dd className="mt-1 font-serif text-lg font-bold text-arch-white tabular-nums">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#records"
                    className="px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                  >
                    Browse records
                  </a>
                  <Link
                    href="#submit"
                    className="px-6 py-3 text-sm text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                  >
                    Publish with us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Records — the archive itself */}
        <section id="records" className="scroll-mt-24 border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white">
                  Records
                </h2>
                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Every record is free to read, downloadable as a PDF, and carries a
                  citation in four formats. Records fall into two tracks.
                </p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-l-2 border-gold pl-4">
                  <h3 className="text-sm font-bold text-arch-white">Journal Publication</h3>
                  <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                    Papers selected through editorial review, published with a volume
                    and issue.
                  </p>
                </div>
                <div className="border-l-2 border-border pl-4">
                  <h3 className="text-sm font-bold text-arch-white">Research Archive</h3>
                  <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                    The wider public record of work produced through IES competitions,
                    preserved and citable.
                  </p>
                </div>
              </div>
            </div>

            <PublicationBrowser />
          </div>
        </section>

        {/* About — two-column editorial */}
        <section className="bg-obsidian-light py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-6">
                  About the Journal
                </h2>
                <p className="text-base text-text-secondary leading-relaxed">
                  The IES Journal serves as a platform for exceptional student
                  research in economics. It recognizes the highest-caliber work
                  produced through the GRP competition and provides winners with a
                  formal publication credit that reflects the quality of their
                  analysis.
                </p>
              </div>
              <div className="lg:border-l lg:border-border lg:pl-12 lg:pt-12">
                <p className="text-base text-text-secondary leading-relaxed">
                  Published periodically, each edition compiles five research papers
                  that address pressing economic questions spanning topics such as
                  trade policy, monetary systems, development economics, market
                  structures, and fiscal strategy. The Journal is distributed across
                  the IES network and made available to all chapters worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Selection Process — horizontal timeline */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-12">
              Selection Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Competition or submission",
                  description: "Work arrives either from an IES competition — the GRP, EPR, or Essay Competition — or is submitted directly by a student author.",
                },
                {
                  step: "02",
                  title: "Editorial review",
                  description: "Every record is screened for originality and citation integrity, then evaluated on analysis, evidence, and writing quality.",
                },
                {
                  step: "03",
                  title: "Track assigned",
                  description: "The strongest papers are selected for Journal Publication with a volume and issue. The rest enter the Research Archive as a citable public record.",
                },
                {
                  step: "04",
                  title: "Deposited",
                  description: "The record goes live with a permanent ID, a downloadable PDF, and a citation, free for anyone to read.",
                },
              ].map((item, i) => (
                <div key={item.step} className="relative">
                  {/* Connector line */}
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-border -translate-x-4" />
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-gold text-gold font-bold text-sm shrink-0">
                      {item.step}
                    </span>
                    <div className="hidden lg:block flex-1 h-px bg-border" />
                  </div>
                  <h3 className="text-sm font-bold text-arch-white mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evaluation & Author Benefits — side by side */}
        <section className="bg-obsidian-light py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Criteria */}
              <div className="lg:col-span-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
                  Evaluation Criteria
                </h2>
                <p className="text-base text-text-secondary leading-relaxed mb-8">
                  Records selected for Journal Publication are assessed against the
                  following criteria, consistent with the GRP competition rubric.
                </p>
                <div className="space-y-3">
                  {[
                    "Clear and well-defined research question",
                    "Sound application of economic theory",
                    "Use of data, case studies, or empirical evidence",
                    "Logical structure and coherent argumentation",
                    "Original perspective or novel analysis",
                    "Professional writing and proper citations",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 bg-gold shrink-0 rounded-full mt-1.5" />
                      <span className="text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author benefits */}
              <div className="lg:col-span-5 lg:col-start-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
                  For Published Authors
                </h2>
                <p className="text-base text-text-secondary leading-relaxed mb-8">
                  Students whose papers are selected receive:
                </p>
                <div className="space-y-6">
                  {[
                    {
                      title: "Publication Credit",
                      description: "A formal publication in the IES Journal, recognized across our international network of chapters.",
                    },
                    {
                      title: "Certificate of Recognition",
                      description: "An official certificate acknowledging their achievement as a top GRP researcher.",
                    },
                    {
                      title: "Global Distribution",
                      description: "Their work is shared with IES chapters and members in over 12 countries worldwide.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="border-l-2 border-gold pl-4">
                      <h3 className="text-sm font-bold text-arch-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Submissions */}
        <section id="submit" className="scroll-mt-24 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
                  Publish with us
                </h2>
                <p className="text-base text-text-secondary leading-relaxed">
                  There are two routes into the Journal. Both are free, and neither
                  requires your school to have an IES chapter.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/register"
                    className="px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                  >
                    Enter the current competition
                  </Link>
                  <a
                    href="mailto:ies.economicsociety@gmail.com?subject=IES%20Journal%20submission"
                    className="px-6 py-3 text-sm text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                  >
                    Submit a paper
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7 space-y-8">
                <div className="border border-border p-6">
                  <span className="text-xs font-bold text-gold">01</span>
                  <h3 className="mt-2 text-sm font-bold text-arch-white">
                    Through a competition
                  </h3>
                  <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                    Work entered into the GRP, EPR, or Essay Competition is considered
                    for the Journal automatically once judging closes. Nothing extra to
                    submit — entering is enough.
                  </p>
                </div>
                <div className="border border-border p-6">
                  <span className="text-xs font-bold text-gold">02</span>
                  <h3 className="mt-2 text-sm font-bold text-arch-white">
                    Direct submission
                  </h3>
                  <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                    Independent economics research can be sent to us directly. Email
                    the paper as a PDF with an abstract of 150 words or fewer, your
                    school, and your country. We reply to every submission.
                  </p>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    Work must be original, your own, and free of AI-generated content.
                    Papers already published elsewhere are welcome in the Research
                    Archive, with the original venue credited.
                  </p>
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
