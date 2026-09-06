import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageBand from "@/components/ImageBand";
import { VIDEO_LENGTH_LABEL, PRIZE_POOL } from "@/lib/competition";

export const metadata = {
  title: "EPR Sample Case | International Economic Society",
  description:
    "A practice case for the IES Economic Policy Recommendation: the mortgage lock-in problem, advising the U.S. Department of the Treasury.",
};

const figures: [string, string][] = [
  ["Outstanding mortgages below 4%", "≈ 55% of all US mortgages"],
  ["Current 30-year fixed rate", "≈ 6.8%"],
  ["Monthly payment, $400k loan at 3%", "≈ $1,690"],
  ["Same loan at 6.8%", "≈ $2,610"],
  ["Existing-home sales, annualised", "≈ 4.1m — near a 30-year low"],
  ["Median existing-home price", "≈ $415,000"],
  ["Interstate migration rate", "Lowest in the post-war record"],
];

const approaches = [
  {
    title: "Make the rate portable",
    text: "Let a borrower carry an existing rate to a new property. Removes the penalty on moving directly. Ask who absorbs the loss on the below-market loan, and what it does to the mortgage-backed securities the loan sits inside.",
  },
  {
    title: "Change the tax treatment of moving",
    text: "The capital gains exclusion on a primary residence has not been indexed since 1997. Raising or indexing it lowers the tax cost of selling. Ask whether the binding constraint is really the tax bill or the interest rate.",
  },
  {
    title: "Condition federal money on local supply",
    text: "Zoning is set locally, so Washington cannot rezone anything. It can attach conditions to the transport and housing money it already sends. Ask how long supply takes to respond, and whether the leverage is real.",
  },
  {
    title: "Support first-time buyers directly",
    text: "A credit or rate buydown aimed at buyers locked out of the market. Ask the hard question honestly: with supply this tight, how much of the subsidy ends up in the price rather than in the buyer's pocket?",
  },
  {
    title: "Recommend no new policy",
    text: "Argue the distortion unwinds on its own as rates normalise and the low-rate stock ages out, and that intervening now risks locking in a worse structure. A well-argued case for restraint is a legitimate recommendation.",
  },
];

const strong = [
  "Names a mechanism, not a goal. “Improve affordability” is an aim; “reduce the effective cost of moving by X” is a policy.",
  "States who pays. Every recommendation has someone bearing the cost — taxpayers, lenders, existing owners, future buyers.",
  "Meets the strongest objection to its own proposal, rather than the weakest.",
  "Knows when a subsidy is capitalised into the price of the thing it subsidises.",
  "Says what it would take to conclude the policy had failed.",
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
              The household that cannot afford to move
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              A practice case for the Economic Policy Recommendation, written to the
              same shape as a live theme. Work it end to end and you will have
              rehearsed the whole event.
            </p>
            <div className="mt-8 border-l-2 border-gold pl-5">
              <p className="text-xs uppercase tracking-widest text-text-muted">
                You are advising
              </p>
              <p className="mt-1.5 font-serif text-xl font-bold text-arch-white">
                The U.S. Department of the Treasury, Office of Economic Policy
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ImageBand
            src="/images/fed-eccles.jpg"
            alt="The Marriner S. Eccles Federal Reserve Board building in Washington, D.C."
            caption="The Marriner S. Eccles Building, Washington, D.C. — the rate decisions behind this case are taken here; the policy response you are asked for is not."
            credit="Public domain."
            aspect="aspect-[21/9]"
            priority
          />
        </div>

        {/* The situation */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-6">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-6">
                  The situation
                </h2>
                <div className="space-y-5 text-base text-text-secondary leading-relaxed">
                  <p>
                    Between 2020 and 2022, tens of millions of American households
                    borrowed or refinanced at thirty-year fixed rates near three
                    percent. Rates have since roughly doubled.
                  </p>
                  <p>
                    A family paying three percent who wants to move — for a job, for
                    space, for a parent who needs care — must give up that loan and
                    take a new one at close to seven, on a house that costs more than
                    the one they are leaving. For many the honest answer is that they
                    cannot afford to move, even though they can afford their current
                    home comfortably.
                  </p>
                  <p>
                    So they stay. And because they stay, the house they would have
                    sold never reaches the market.
                  </p>
                </div>

                <h3 className="mt-12 text-sm font-bold text-text-muted mb-4">
                  Why this is an economics problem
                </h3>
                <div className="space-y-4 text-base text-text-secondary leading-relaxed">
                  <p>
                    <strong className="text-arch-white">The old rate is an asset.</strong>{" "}
                    Keeping it has value; moving forfeits it. That forfeited value
                    behaves exactly like a tax on moving — except no one collects it
                    and Congress never voted for it.
                  </p>
                  <p>
                    <strong className="text-arch-white">Higher rates were meant to cool prices.</strong>{" "}
                    They suppressed demand, as intended. They also suppressed supply,
                    which was not intended, because the same people who would buy are
                    the people who would sell. Prices did not fall the way the textbook
                    diagram suggests.
                  </p>
                  <p>
                    <strong className="text-arch-white">Labour stops moving with it.</strong>{" "}
                    A worker who will not relocate for a better-matched job is a worker
                    in a less productive position than the one available. Multiplied
                    across an economy, that is a real efficiency loss, not just a
                    housing inconvenience.
                  </p>
                  <p>
                    <strong className="text-arch-white">The cost falls unevenly.</strong>{" "}
                    Existing owners hold a valuable loan and a rising asset. First-time
                    buyers face high prices and high rates at once, having had the
                    chance to lock in neither.
                  </p>
                </div>
              </div>

              {/* Figures + constraints */}
              <div className="lg:col-span-5 lg:col-start-8">
                <h3 className="text-sm font-bold text-text-muted mb-4">
                  Scenario figures
                </h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {figures.map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-3 pr-4 text-text-muted text-sm align-top">
                          {label}
                        </td>
                        <td className="py-3 text-arch-white text-sm text-right whitespace-nowrap">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-xs text-text-muted leading-relaxed">
                  Figures are approximate and provided for the exercise. If you use a
                  number in your presentation, cite it from a primary source —
                  Freddie Mac, the Census Bureau, the Federal Reserve, or the National
                  Association of Realtors.
                </p>

                <div className="mt-10 border border-gold/40 bg-obsidian-light p-6">
                  <h3 className="text-sm font-bold text-gold mb-4">Your constraints</h3>
                  <ul className="space-y-3 text-sm text-text-secondary leading-relaxed">
                    {[
                      "Federal instruments only. Zoning is set by cities and states — you cannot rezone anything.",
                      "Ten-year cost under $50 billion, or fund it explicitly.",
                      "Standing up within eighteen months.",
                      "One recommendation. Not a list of five things worth doing.",
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

        {/* Approaches */}
        <section className="bg-obsidian-light border-y border-border py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                  Directions you could take
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  These are starting points, not a menu. There is no answer the judges
                  are waiting to hear — every one of these has been argued seriously by
                  economists, and every one has a cost someone has to wear. Taking a
                  direction not listed here is entirely fair.
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="border-t border-border">
                  {approaches.map((a, i) => (
                    <div key={a.title} className="flex items-start gap-5 border-b border-border py-6">
                      <span className="text-xs font-bold text-gold mt-1 shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-arch-white">
                          {a.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                          {a.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What strong entries do + deliverable */}
        <section className="py-16 sm:py-20">
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
