import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Programs | International Economic Society",
};

export default function ProgramsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Header — two column with stats on the right */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-2">
                <span className="text-xs font-bold text-gold tracking-widest uppercase">Programs</span>
                <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-arch-white leading-tight">
                  Chapter Programming
                </h1>
                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Every IES chapter delivers regular, structured programming designed
                  to build economic literacy and analytical thinking. Sessions are
                  student-led, discussion-driven, and open to members at all levels.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-6 lg:border-l lg:border-border lg:pl-12">
                {[
                  ["30\u201340 min", "per session"],
                  ["Weekly / biweekly", "frequency"],
                  ["No prerequisites", "open to all"],
                ].map(([big, small]) => (
                  <div key={big}>
                    <p className="text-lg font-bold text-arch-white">{big}</p>
                    <p className="text-xs text-text-muted uppercase tracking-wide">{small}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Session formats — 2x2 card grid */}
        <section className="bg-obsidian-light py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
              Session Formats
            </h2>
            <p className="text-text-secondary max-w-2xl mb-10">
              Chapters rotate through these formats to keep programming varied and engaging.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {[
                {
                  num: "01",
                  title: "Moderated Discussion Forums",
                  text: "A chapter officer introduces a topic \u2014 inflation, trade wars, central bank policy \u2014 and facilitates a structured group debate. Members examine multiple perspectives and build positions through evidence-based reasoning.",
                },
                {
                  num: "02",
                  title: "Case-Based Economic Challenges",
                  text: "Small teams analyze a real-world scenario (market disruption, fiscal crisis, policy decision) and present a response. Teams compare approaches and get feedback from the chapter.",
                },
                {
                  num: "03",
                  title: "Panel-Style Discussions",
                  text: "A small group prepares positions on an economic question and presents to the chapter, followed by open Q&A. Develops public speaking, argumentation, and thinking under pressure.",
                },
                {
                  num: "04",
                  title: "Country & Region Spotlights",
                  text: "Deep dives into one country\u2019s economy: GDP composition, trade relationships, labor markets, monetary policy. Members research and present findings, connecting local conditions to global trends.",
                },
              ].map((item) => (
                <div key={item.num} className="bg-obsidian p-8 lg:p-10">
                  <span className="text-xs font-bold text-gold tracking-widest">{item.num}</span>
                  <h3 className="mt-3 text-lg font-bold text-arch-white mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topics — categorized groups, not flat cloud */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
                Topics Covered
              </h2>
              <p className="text-text-secondary">
                Adapted to each chapter&apos;s level. No prior coursework required.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  category: "Markets & Fundamentals",
                  topics: ["Supply & Demand", "Market Failure", "Public Goods", "Externalities", "Comparative Advantage"],
                },
                {
                  category: "Policy & Institutions",
                  topics: ["Fiscal Policy", "Monetary Policy", "Central Banking", "Interest Rates", "Inflation"],
                },
                {
                  category: "Global & Applied",
                  topics: ["International Trade", "Exchange Rates", "Balance of Payments", "Development Economics", "Income Inequality", "Behavioral Economics", "Labor Markets", "Unemployment"],
                },
              ].map((group) => (
                <div key={group.category}>
                  <h3 className="text-xs font-bold text-gold tracking-widest uppercase mb-4">{group.category}</h3>
                  <div className="space-y-2">
                    {group.topics.map((topic) => (
                      <p key={topic} className="text-sm text-text-secondary">{topic}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* School outreach — full-width accent band */}
        <section className="bg-obsidian-light py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4">
                <h3 className="text-xs font-bold text-gold tracking-widest uppercase mb-2">School Outreach</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Beyond regular meetings, chapters actively engage their
                  school communities.
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Classroom presentations on economic topics",
                  "Info sessions for prospective members",
                  "School-approved digital communications",
                  "Collaboration with other academic clubs",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 bg-gold shrink-0 rounded-full mt-1.5" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <p className="text-text-secondary">Want to run these programs at your school?</p>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/apply"
                  className="px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                >
                  Start a Chapter
                </Link>
                <Link
                  href="/competitions"
                  className="px-6 py-3 text-sm text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                >
                  View Competitions
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
