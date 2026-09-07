import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionArt from "@/components/SectionArt";
import { VIDEO_LENGTH_LABEL, PRIZE_POOL } from "@/lib/competition";

export const metadata = {
  title: "EPR Sample Case | International Economic Society",
  description:
    "A practice case for the IES Economic Policy Recommendation: the federal minimum wage as a price floor, presented to the U.S. Department of Labor.",
};

const situation: [string, string][] = [
  ["Federal minimum wage", "$7.25 — unchanged since July 2009"],
  ["Real value at its 1968 peak", "≈ $13.50 in today's dollars"],
  ["States at the federal floor", "20"],
  ["Highest state floor", "≈ $17.50"],
  ["US median hourly wage", "≈ $23.50"],
  ["Median hourly wage, Mississippi", "≈ $17.80"],
  ["Median hourly wage, Massachusetts", "≈ $29.90"],
  ["Hourly workers at or below $7.25", "≈ 1% of the hourly workforce"],
];

const dimensions = [
  {
    title: "Earnings",
    text: "A binding floor raises the wage of everyone who keeps their hours. That is the whole point, and it is a real gain worth defending.",
  },
  {
    title: "Access to work",
    text: "If the floor sits above what an employer will pay for an hour of low-experience labour, some of those hours stop being offered. Who loses them matters more than how many.",
  },
  {
    title: "Long-run cost",
    text: "Employers can absorb a floor through prices, hours, scheduling, or automation. Each shifts the cost somewhere different, and some of those shifts take years to appear.",
  },
  {
    title: "Equity",
    text: "Most minimum-wage earners are not teenagers, and most poor households have no one earning the minimum because they are not working at all. A wage floor cannot reach them.",
  },
  {
    title: "Regional fairness",
    text: "$15 is a different policy in Jackson than in Boston. A national number binds hard in low-wage states and does nothing in high-wage ones.",
  },
];

const options = [
  {
    title: "Raise the uniform federal floor",
    text: "Pick a national number and phase it in. Simple to legislate and to explain, and it reaches the low-wage states nothing else reaches. The bite is severe where median wages are lowest — exactly where the political case is strongest.",
  },
  {
    title: "Index the floor to local wages",
    text: "Set the floor as a share of each area's median wage — half, say — so it adjusts automatically to local conditions. Economically tidy. Ask how a worker is meant to plan around a wage that moves with a statistic, and what happens at county lines.",
  },
  {
    title: "Expand the Earned Income Tax Credit instead",
    text: "Raise take-home pay through the tax code rather than the wage. Reaches poor households more precisely and does not price anyone out of a job. It is paid by taxpayers rather than employers, and some of it is captured by employers as lower pre-tax wages.",
  },
  {
    title: "Subsidise the wage directly",
    text: "Government pays part of the hourly cost for low-wage workers, so the worker gets more without the employer paying more. Splits the difference between the two above. Ask what it costs, and what stops it becoming a permanent subsidy to low-wage business models.",
  },
  {
    title: "Leave the federal floor alone",
    text: "Thirty states and many cities have already moved past $7.25, and the federal minimum now binds for around one percent of hourly workers. Argue that the states are doing this better than Washington can, and that the binding constraint is elsewhere.",
  },
];

const strong = [
  "Explains what a price floor does before arguing about this one — and says plainly when it binds and when it does not.",
  "Engages the monopsony argument honestly. If employers have wage-setting power, a floor can raise pay without cutting jobs. That is a real finding, and it has limits.",
  "Distinguishes the number from the design. Phase-in length, indexation, and regional variation change the effect more than the headline figure.",
  "Names who pays: consumers through prices, workers through hours, employers through margin, or taxpayers through the tax code.",
  "Says what evidence would show the policy had failed, and when you would know.",
];

export default function SampleCasePage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href="/competitions#epr"
              className="text-xs font-bold text-gold hover:text-gold-dark transition-colors"
            >
              &larr; Back to the EPR
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 text-xs font-bold text-obsidian bg-gold">
                Sample case
              </span>
              <span className="text-xs text-text-muted">
                Practice material — not the live theme
              </span>
            </div>
            <h1 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-arch-white leading-tight max-w-4xl">
              A floor under the lowest wage
            </h1>
            <div className="mt-8 border-l-2 border-gold pl-5">
              <p className="text-xs uppercase tracking-widest text-text-muted">
                You are presenting to
              </p>
              <p className="mt-1.5 font-serif text-xl font-bold text-arch-white">
                The U.S. Department of Labor, Office of the Chief Economist
              </p>
            </div>
          </div>
        </section>

        {/* The prompt itself */}
        <section className="border-y border-border bg-obsidian-light py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-6">
              The prompt
            </h2>
            <p className="max-w-4xl text-lg sm:text-xl text-arch-white leading-relaxed font-serif">
              The federal minimum wage has not moved since 2009, and proposals to
              raise it have revived debate over the wage floor — a price floor that
              can lift earnings for low-paid workers but may also reduce the hours
              employers offer, push costs into consumer prices, or accelerate
              automation. Policymakers must weigh these effects against how any
              approach would affect earnings, access to work, long-run costs, equity,
              and the very different labour markets of a country where the median
              wage in one state is nearly double that in another. Your team is
              presenting to officials at the Department of Labor. Explain the economic
              impacts of a wage floor, weigh the alternatives to raising it, and offer
              a clear path forward.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
          <SectionArt band="policy" />
        </div>

        {/* Situation + economics */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-6">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-6">
                  The economics you are expected to explain
                </h2>
                <div className="space-y-5 text-base text-text-secondary leading-relaxed">
                  <p>
                    A minimum wage is a price floor on labour. Set below what the
                    market already pays, it does nothing at all. Set above it, and the
                    quantity of labour employers want falls while the quantity workers
                    want to supply rises. The textbook calls the gap unemployment.
                  </p>
                  <p>
                    The textbook is not the whole story, and a strong presentation
                    says so. Where a few employers dominate hiring in a town, they can
                    hold wages below what an extra hour of work is worth to them. In
                    that case a floor can raise pay <em>and</em> employment at the same
                    time. This is not a loophole; it is a well-documented finding with
                    a well-documented ceiling on how far it stretches.
                  </p>
                  <p>
                    Employers who cannot cut wages have other margins. They can raise
                    prices, cut scheduled hours, tighten staffing, hire more
                    experienced workers for the same money, or buy a machine. Each of
                    those moves the cost onto a different group, and only some of them
                    show up in the unemployment rate.
                  </p>
                  <p>
                    Then there is the question a national number cannot dodge. The same
                    floor is a modest adjustment in one state and a large shock in
                    another. What matters is not the dollar figure but the{" "}
                    <strong className="text-arch-white">bite</strong> — the floor as a
                    share of the local median wage.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <h3 className="text-sm font-bold text-text-muted mb-4">The situation</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {situation.map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-3 pr-4 text-text-muted text-sm align-top">
                          {label}
                        </td>
                        <td className="py-3 text-arch-white text-sm text-right">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-xs text-text-muted leading-relaxed">
                  Figures are approximate and provided for the exercise. If you use a
                  number in your presentation, cite it from the Bureau of Labor
                  Statistics or the Department of Labor directly.
                </p>

                <div className="mt-10 border border-gold/40 bg-obsidian-light p-6">
                  <h3 className="text-sm font-bold text-gold mb-4">Your constraints</h3>
                  <ul className="space-y-3 text-sm text-text-secondary leading-relaxed">
                    {[
                      "Federal policy only. You cannot legislate for a single state.",
                      "One recommendation, not a list of things worth doing.",
                      "If it costs money, say where the money comes from.",
                      "It must survive a change of administration — no policy that only works if everyone agrees with you.",
                    ].map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <span className="w-1 h-1 bg-gold shrink-0 rounded-full mt-2" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dimensions to weigh */}
        <section className="bg-obsidian-light border-y border-border py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              What your recommendation has to weigh
            </h2>
            <p className="max-w-2xl text-sm text-text-secondary leading-relaxed mb-12">
              A recommendation that only counts the gains is not a recommendation. The
              panel is looking for all five of these, handled honestly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {dimensions.map((d, i) => (
                <div key={d.title}>
                  <span className="text-xs font-bold text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-arch-white">{d.title}</h3>
                  <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                    {d.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Options */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                  Options on the table
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Starting points, not a menu. Every one of these has been argued
                  seriously by economists and every one costs somebody something.
                  There is no answer the judges are waiting to hear, and a direction
                  not listed here is entirely fair.
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="border-t border-border">
                  {options.map((o, i) => (
                    <div key={o.title} className="flex items-start gap-5 border-b border-border py-6">
                      <span className="text-xs font-bold text-gold mt-1 shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-arch-white">
                          {o.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                          {o.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strong entries + deliverable */}
        <section className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-6">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-6">
                  What separates a strong recommendation
                </h2>
                <div className="space-y-4">
                  {strong.map((s) => (
                    <div key={s} className="flex items-start gap-3">
                      <span className="w-1 h-1 bg-gold shrink-0 rounded-full mt-2.5" />
                      <p className="text-base text-text-secondary leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <div className="border border-border p-6">
                  <h3 className="text-sm font-bold text-arch-white mb-3">
                    Deliver it as you would in the competition
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    A {VIDEO_LENGTH_LABEL} recorded video over a Google Slides deck,
                    presenting one policy and defending it. Individual, or a team of
                    two to four with every member speaking.
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    The live theme is released to registrants when the competition
                    window opens and is never published in advance. This case is here
                    so the format is familiar before it arrives.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/register"
                      className="px-5 py-2.5 text-xs font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                    >
                      Register for the EPR
                    </Link>
                    <Link
                      href="/competitions#epr"
                      className="px-5 py-2.5 text-xs text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                    >
                      Rules and rubric
                    </Link>
                  </div>
                  <p className="mt-5 text-xs text-text-muted">
                    ${PRIZE_POOL} in cash prizes across the top three.
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
