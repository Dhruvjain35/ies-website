import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "School Partnership | International Economic Society",
};

export default function PartnershipPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Header */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <span className="text-xs font-bold text-gold tracking-widest uppercase">For Schools</span>
            <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-arch-white leading-tight max-w-4xl">
              School Partnership Proposal
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              As economic forces continue to shape the global landscape, the
              need for informed, engaged, and globally aware students has never
              been greater. IES offers schools a credible, well-governed, and
              future-oriented platform to meet this need.
            </p>
          </div>
        </section>

        {/* Benefits — alternating full-width rows */}
        <section className="bg-obsidian-light py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-12">
              Benefits to Your School
            </h2>
            <div className="space-y-0 divide-y divide-border">
              {[
                {
                  title: "Academic Enrichment",
                  points: [
                    "Encourages critical thinking and discussion-based learning",
                    "Supports interdisciplinary connections between economics, civics, history, and global studies",
                    "Provides structured academic programming beyond the standard curriculum",
                  ],
                },
                {
                  title: "Leadership Development",
                  points: [
                    "Provides structured leadership roles for students",
                    "Develops organizational, communication, and management skills",
                    "Builds experience in event planning, outreach, and team coordination",
                  ],
                },
                {
                  title: "Global Connectivity",
                  points: [
                    "Connects your school to an international student network",
                    "Enables cross-cultural dialogue on economic and policy topics",
                    "Participation in the Global Student Economy Brief publication",
                  ],
                },
                {
                  title: "Low-Burden Implementation",
                  points: [
                    "Student-led model minimizes faculty workload",
                    "Zero cost with no membership fees or funding requirements",
                    "Full operational support from IES international team",
                  ],
                },
              ].map((item) => (
                <div key={item.title} className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 first:pt-0">
                  <div className="lg:col-span-4">
                    <h3 className="text-lg font-semibold text-arch-white">{item.title}</h3>
                  </div>
                  <div className="lg:col-span-7 lg:col-start-6">
                    <ul className="space-y-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="w-1 h-1 bg-gold mt-2 shrink-0" />
                          <span className="text-sm text-text-secondary leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty + Resources — side by side */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-6">
                  Faculty Advisor Role
                </h2>
                <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                  <p>
                    Each chapter operates under the supervision of a faculty advisor,
                    in accordance with school policies. The advisor&apos;s role is
                    supervisory rather than managerial. IES is specifically designed
                    to minimize the workload placed on faculty advisors.
                  </p>
                  <p>The faculty advisor may:</p>
                </div>
                <ul className="mt-4 space-y-3">
                  {[
                    "Ensure compliance with school guidelines",
                    "Provide guidance when needed",
                    "Serve as an administrative point of contact",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1 h-1 bg-gold mt-2 shrink-0" />
                      <span className="text-sm text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:border-l lg:border-border lg:pl-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-6">
                  Resources & Operations
                </h2>
                <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                  <p>
                    IES operates through a decentralized model in which chapters
                    manage local programming while adhering to international
                    guidelines. The organization relies on collaboration, shared
                    documentation, and digital communication platforms.
                  </p>
                  <p>
                    Start-up resource requirements are minimal and primarily include
                    organizational documentation, digital infrastructure, and
                    administrative coordination. IES is designed to be financially
                    sustainable without reliance on membership fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CSR — accent callout */}
        <section className="bg-obsidian-light py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="border-l-2 border-gold pl-6 max-w-3xl">
              <h2 className="font-serif text-xl font-bold text-arch-white mb-4">
                Corporate Social Responsibility
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                As part of its commitment to corporate social responsibility, IES
                prioritizes equitable access to economic education, student voice,
                and global awareness. The Society actively seeks to reduce barriers
                to participation and encourages engagement with diverse perspectives,
                reinforcing its role as a socially responsible educational initiative.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                By supporting IES, schools empower students not only to understand
                the world they are inheriting, but to participate in it thoughtfully
                and responsibly.
              </p>
            </div>
          </div>
        </section>

        {/* CTA — left-aligned */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
              Partner With IES
            </h2>
            <p className="max-w-lg text-text-secondary mb-8">
              Interested in hosting an IES chapter at your school? Contact us
              or have a student apply to start a chapter.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="px-6 py-3 text-sm font-semibold text-obsidian bg-gold hover:bg-gold-dark transition-colors duration-200"
              >
                Start a Chapter
              </Link>
              <a
                href="mailto:ies.economicsociety@gmail.com"
                className="px-6 py-3 text-sm font-medium text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
