import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

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
                  The official research publication of the International Economic Society.
                  Each edition features the top five papers from the GRP competition,
                  selected for originality, analytical rigor, and clarity of argument.
                </p>
              </div>
            </div>
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
                  title: "GRP Competition",
                  description: "Students submit original research papers through the Global Research Paper competition.",
                },
                {
                  step: "02",
                  title: "Review & Evaluation",
                  description: "All submissions are evaluated on originality, depth of analysis, use of evidence, and writing quality.",
                },
                {
                  step: "03",
                  title: "Top 5 Selected",
                  description: "The five highest-scoring papers are selected for publication in that edition of the IES Journal.",
                },
                {
                  step: "04",
                  title: "Publication",
                  description: "Selected papers are published in the Journal and distributed across the IES global network.",
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
                  Papers featured in the IES Journal are selected based on the
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

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
              Get Featured
            </h2>
            <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-8">
              The path to the IES Journal starts with the Global Research Paper
              competition. Submit your original research through your chapter and
              compete for a spot in the next edition.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/competitions"
                className="inline-block px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors duration-200"
              >
                View Competitions
              </Link>
              <Link
                href="/apply"
                className="inline-block px-6 py-3 text-sm text-text-secondary hover:text-arch-white border border-border hover:border-text-muted transition-colors duration-200"
              >
                Start a Chapter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
