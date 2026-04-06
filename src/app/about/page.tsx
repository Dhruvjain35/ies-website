import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "About | International Economic Society",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Full-width intro with large typography */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <span className="text-xs font-bold text-gold tracking-widest uppercase">About IES</span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-arch-white leading-[1.1] max-w-4xl">
              A global network built by students, for students.
            </h1>
          </div>
        </section>

        {/* Horizontal fact strip */}
        <section className="border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[
                ["Structure", "Student-led academic org"],
                ["Core Activity", "Discussion-based education"],
                ["Scope", "12 countries, 5 continents"],
                ["Age Range", "14\u201318 (high school)"],
                ["Cost", "Free \u2014 $0 to join or start"],
              ].map(([label, value]) => (
                <div key={label} className="py-5 sm:px-6 first:sm:pl-0 last:sm:pr-0">
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-sm text-arch-white font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Description with left gold accent */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-7 lg:col-start-1">
                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
                  IES is an international network of independent, student-run
                  high school chapters focused on understanding how global
                  economic systems, policies, and events affect everyday life
                  across countries and communities.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 border-l-2 border-gold pl-6">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Unlike traditional economics clubs, IES emphasizes accessibility,
                  real-world application, and cross-border collaboration. No prerequisites,
                  no fees, no exclusivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three differentiators as tall cards */}
        <section className="bg-obsidian-light py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                {
                  num: "01",
                  title: "Accessibility First",
                  text: "No prior coursework, no funding, no guest speakers required. Designed for every school, in every country.",
                },
                {
                  num: "02",
                  title: "Institutional Structure",
                  text: "Unified international framework with local autonomy. Consistent, credible, and scalable across borders.",
                },
                {
                  num: "03",
                  title: "International Reach",
                  text: "16 chapters across 12 countries on 5 continents. Real cross-border collaboration, not just a name.",
                },
              ].map((item) => (
                <div key={item.num} className="bg-obsidian p-8 lg:p-12">
                  <span className="text-xs font-bold text-gold tracking-widest">{item.num}</span>
                  <h3 className="mt-4 text-lg font-bold text-arch-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why IES Exists & How It Works — zigzag layout */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Why */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-arch-white leading-tight">
                  Why IES Exists
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 space-y-5 text-text-secondary leading-relaxed">
                <p>
                  Economic decisions influence everything from global stability to
                  local opportunity, yet most high school students never get the
                  chance to explore these ideas in a structured, accessible way.
                  Existing programs tend to emphasize technical theory, competition
                  rankings, or exclusivity — limiting who actually participates.
                </p>
                <p>
                  IES was founded by a team of secondary school students who saw
                  this gap firsthand. They built an organization where any student,
                  at any school, in any country could start a chapter and begin
                  engaging with economics through discussion, not memorization.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-16 border-t border-border" />

            {/* How — reversed layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-6 space-y-5 text-text-secondary leading-relaxed order-2 lg:order-1">
                <p>
                  Each chapter is student-led, faculty-advised, and built around
                  in-person, discussion-based programming. Sessions cover real-world
                  topics — trade policy, inflation, labor markets, development — and
                  emphasize participation over lecturing.
                </p>
                <p>
                  Chapters operate locally while contributing to shared international
                  initiatives: competitions across three formats, a peer-reviewed
                  research journal, and regular cross-border programming. The model
                  balances local autonomy with international consistency.
                </p>
                <p>
                  No tuition, no application fees, no prerequisites. IES is
                  specifically designed to minimize barriers — for students starting
                  chapters, for members joining them, and for faculty advisors
                  supervising them.
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-arch-white leading-tight">
                  How It Works
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* CTA — full-width accent band */}
        <section className="bg-obsidian-light">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-arch-white">Join the network</h2>
                <p className="mt-1 text-sm text-text-secondary">Start a chapter at your school or explore partnership opportunities.</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/apply"
                  className="px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                >
                  Start a Chapter
                </Link>
                <Link
                  href="/partnership"
                  className="px-6 py-3 text-sm font-medium text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                >
                  School Partnership
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
