import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AnimatedStats from "@/components/AnimatedStats";
import EssayCompetitionFeature from "@/components/EssayCompetitionFeature";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <EssayCompetitionFeature />
        <AnimatedStats />

        {/* About / Mission — asymmetric layout with image */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="text-xs font-bold text-gold tracking-widest uppercase">About IES</span>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-arch-white mb-6">
                  We&apos;re not just an economics club.
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  IES connects high school students across 12 countries through
                  weekly chapter meetings, international competitions, and a
                  peer-reviewed research journal. No tuition, no prerequisites,
                  no gatekeeping — just students learning economics together.
                </p>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Our chapters run 30–40 minute sessions covering everything from
                  fiscal policy to behavioral economics. Top researchers get published
                  in the <Link href="/journal" className="text-gold hover:underline font-semibold">IES Journal</Link>,
                  and every member can compete in three international events each cycle.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/programs"
                    className="px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                  >
                    Our Programs
                  </Link>
                  <Link
                    href="/journal"
                    className="px-6 py-3 text-sm font-bold text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                  >
                    Read the Journal
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="overflow-hidden">
                  <Image
                    src="/IES_IMAGE1.jpg"
                    alt="IES chapter meeting in session"
                    width={700}
                    height={467}
                    className="w-full h-auto object-cover"
                    quality={85}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitions — horizontal featured card + 2-col grid */}
        <section className="bg-obsidian-light py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold text-gold tracking-widest uppercase">Compete</span>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-arch-white">
                  Three Events. Every Cycle.
                </h2>
              </div>
              <Link href="/competitions" className="text-sm font-bold text-gold hover:underline shrink-0">
                View all competitions &rarr;
              </Link>
            </div>

            {/* Featured competition */}
            <Link
              href="/competitions"
              className="group block border border-border p-8 sm:p-10 mb-6 hover:border-gold/40 transition-colors bg-obsidian"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-gold">Individual</span>
                    <span className="text-xs text-text-muted">·</span>
                    <span className="text-xs text-text-muted">50 Questions</span>
                    <span className="text-xs text-text-muted">·</span>
                    <span className="text-xs text-text-muted">Online</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-arch-white group-hover:text-gold transition-colors">
                    Global Economics Challenge (GEC)
                  </h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-2xl">
                    Scenario-based assessment testing economic reasoning across international
                    markets, public policy, and global trade. Trophies, medals, and certificates for top performers.
                  </p>
                </div>
                <span className="text-sm font-bold text-gold group-hover:translate-x-1 transition-transform">Learn more &rarr;</span>
              </div>
            </Link>

            {/* Two smaller competition cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/competitions"
                className="group border border-border p-8 hover:border-gold/40 transition-colors bg-obsidian"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-gold">Team</span>
                  <span className="text-xs text-text-muted">·</span>
                  <span className="text-xs text-text-muted">2–4 Members</span>
                  <span className="text-xs text-text-muted">·</span>
                  <span className="text-xs text-text-muted">Live Presentation</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-arch-white group-hover:text-gold transition-colors">
                  Economic Policy Recommendation (EPR)
                </h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  Develop and deliver a policy proposal to a virtual judging panel.
                  Online format accessible to chapters worldwide.
                </p>
              </Link>
              <Link
                href="/competitions"
                className="group border border-border p-8 hover:border-gold/40 transition-colors bg-obsidian"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-gold">Research</span>
                  <span className="text-xs text-text-muted">·</span>
                  <span className="text-xs text-text-muted">Individual or Pair</span>
                  <span className="text-xs text-text-muted">·</span>
                  <span className="text-xs text-text-muted">Written Paper</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-arch-white group-hover:text-gold transition-colors">
                  Global Research Paper (GRP)
                </h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  Write a research paper on any economic topic connected to the cycle&apos;s
                  featured country. Top 5 published in the IES Journal.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* What chapters actually do — different layout: left list, not cards */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              <div className="lg:col-span-2">
                <span className="text-xs font-bold text-gold tracking-widest uppercase">Programs</span>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-arch-white mb-6">
                  What Chapters Actually Do
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  30–40 minute sessions, every week or two. Student-led,
                  discussion-driven, no lectures. Here&apos;s a typical chapter semester:
                </p>
                <Link
                  href="/programs"
                  className="inline-block px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                >
                  View All Programs
                </Link>
              </div>
              <div className="lg:col-span-3 space-y-0 divide-y divide-border">
                {[
                  {
                    title: "Moderated Discussion Forums",
                    text: "A chapter officer introduces a topic — inflation, trade wars, central bank policy — and facilitates a structured group debate. Members build positions through evidence-based reasoning.",
                  },
                  {
                    title: "Case-Based Economic Challenges",
                    text: "Small teams analyze a real economic scenario (market disruption, fiscal crisis, policy decision) and present a response to the chapter. Think consulting, but for econ.",
                  },
                  {
                    title: "Country & Region Spotlights",
                    text: "Deep dives into a single country's economy: GDP composition, trade relationships, labor markets, monetary policy. Members research and present findings.",
                  },
                  {
                    title: "Economics Education Sessions",
                    text: "Foundational lessons on supply & demand, comparative advantage, behavioral economics — adapted to your chapter's level. No prior coursework required.",
                  },
                ].map((item, i) => (
                  <div key={item.title} className="py-6 first:pt-0">
                    <div className="flex items-start gap-4">
                      <span className="text-sm font-bold text-gold mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h3 className="font-bold text-arch-white mb-1.5">{item.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Where our chapters are — social proof with real names */}
        <section className="bg-obsidian-light py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white">
                Chapters Worldwide
              </h2>
              <p className="mt-3 text-sm text-text-secondary">
                From Birmingham to Dhaka, our chapters operate in schools across 5 continents.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {[
                "Birmingham, UK", "Glasgow, UK", "Delhi, India", "Abu Dhabi, UAE",
                "Dubai, UAE", "Dhaka, Bangladesh", "Bacau, Romania", "Miami, US",
                "Denver, US", "Lyon, France", "Ottawa, Canada", "Accra, Ghana",
                "Casablanca, Morocco", "Addis Ababa, Ethiopia", "Karachi, Pakistan", "Aktau, Kazakhstan",
              ].map((ch) => (
                <span key={ch} className="text-sm text-text-muted px-3 py-1.5 border border-border/50 rounded-full">
                  {ch}
                </span>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/impact" className="text-sm font-bold text-gold hover:underline">
                View the full chapter map &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* How to start — numbered steps, not generic cards */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-gold tracking-widest uppercase">Get Started</span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-arch-white mb-4">
                Start a Chapter in 4 Steps
              </h2>
              <p className="text-text-secondary">
                It&apos;s free. No funding required, no guest speakers needed, no prerequisites.
                Just a group of students interested in economics.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Apply Online",
                  text: "Fill out the chapter application with your school name and a brief statement of interest. Takes about 5 minutes.",
                },
                {
                  step: "2",
                  title: "Get Approved",
                  text: "Our executive board reviews applications and responds within two weeks with next steps.",
                },
                {
                  step: "3",
                  title: "Set Up",
                  text: "Recruit members, find a faculty advisor, and schedule your first meeting. We provide all materials.",
                },
                {
                  step: "4",
                  title: "Start Running Sessions",
                  text: "Use our discussion guides, case studies, and country spotlights to run weekly meetings at your school.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-gold text-gold font-bold text-sm mb-4">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-arch-white mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3.5 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
              >
                Apply Now — It&apos;s Free
              </Link>
              <span className="text-sm text-text-muted">Applications reviewed within 2 weeks</span>
            </div>
          </div>
        </section>

        {/* Join IES — full-width band, the lowest-friction way in */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold text-gold tracking-widest uppercase">
                  No chapter required
                </span>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-arch-white leading-tight">
                  Join IES from anywhere.
                </h2>
                <p className="mt-5 text-base text-text-secondary leading-relaxed max-w-2xl">
                  Your school does not need a chapter for you to be part of the
                  network. Join the Discord, register as a member, and you can enter
                  the Essay Competition on your own.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/join"
                  className="flex-1 text-center px-6 py-4 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                >
                  Join IES &amp; the Discord
                </Link>
                <Link
                  href="/register"
                  className="flex-1 text-center px-6 py-4 text-sm text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                >
                  Register for the Essay Competition
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA — more direct, less generic */}
        <section className="bg-obsidian-light py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/apply"
                className="group border border-border p-8 hover:border-gold/40 transition-colors bg-obsidian"
              >
                <h3 className="font-serif text-xl font-bold text-arch-white group-hover:text-gold transition-colors mb-2">
                  Start a Chapter
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Free to launch. We provide branding, curriculum, and ongoing support
                  for your school&apos;s economics club.
                </p>
                <span className="text-sm font-bold text-gold">Apply now &rarr;</span>
              </Link>
              <Link
                href="/apply"
                className="group border border-border p-8 hover:border-gold/40 transition-colors bg-obsidian"
              >
                <h3 className="font-serif text-xl font-bold text-arch-white group-hover:text-gold transition-colors mb-2">
                  Growth Internship
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Coming Soon. We will not review applications just yet.
                  Check back later for updates.
                </p>
                <span className="text-sm font-bold text-gold">Coming soon &rarr;</span>
              </Link>
              <Link
                href="/partnership"
                className="group border border-border p-8 hover:border-gold/40 transition-colors bg-obsidian"
              >
                <h3 className="font-serif text-xl font-bold text-arch-white group-hover:text-gold transition-colors mb-2">
                  School Partnerships
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Partner with IES to bring structured economics programming
                  to your institution.
                </p>
                <span className="text-sm font-bold text-gold">Get in touch &rarr;</span>
              </Link>
              <Link
                href="/register"
                className="group border border-border p-8 hover:border-gold/40 transition-colors bg-obsidian"
              >
                <h3 className="font-serif text-xl font-bold text-arch-white group-hover:text-gold transition-colors mb-2">
                  Essay Competition
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  One prompt, 1,200 words. Open to any high school student,
                  chapter or not.
                </p>
                <span className="text-sm font-bold text-gold">Register &rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
