import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import EprRegistrationCta from "@/components/EprRegistrationCta";
import SectionArt from "@/components/SectionArt";
import {
  OPENS_AT,
  DEADLINE_AT,
  COMPETITION_ENDS_AT,
  PRIZES,
  PRIZE_POOL,
  VIDEO_LENGTH_LABEL,
  VIDEO_MIN_MINUTES,
  VIDEO_MAX_MINUTES,
  formatDate,
  formatDateTime,
} from "@/lib/competition";

export const metadata = {
  title: "Competitions | International Economic Society",
};

export default function CompetitionsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Header — large statement with quick-nav pills */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <span className="text-xs font-bold text-gold tracking-widest uppercase">Compete</span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-arch-white leading-tight max-w-3xl">
              Four events. Every cycle. Open to all chapters.
            </h1>
            <p className="mt-4 text-sm text-text-muted">
              Now running —{" "}
              <span className="text-arch-white font-medium">
                EPR registration {formatDate(OPENS_AT)} – {formatDate(DEADLINE_AT)}
              </span>
              , ${PRIZE_POOL} in prizes. GEC, GRP, and Essay Competition dates:{" "}
              <span className="text-arch-white font-medium">TBD</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { label: "GEC", sub: "Individual", href: "#gec" },
                { label: "EPR", sub: "Policy Video", href: "#epr" },
                { label: "GRP", sub: "Research", href: "#grp" },
                { label: "ESSAY", sub: "Argument", href: "#essay" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex items-center gap-2 px-4 py-2.5 border border-border hover:border-gold/40 transition-colors">
                  <span className="text-sm font-bold text-arch-white">{item.label}</span>
                  <span className="text-xs text-text-muted">{item.sub}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* GEC — spotlight banner style */}
        <section id="gec" className="bg-obsidian-light scroll-mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
            {/* Banner header */}
            <div className="border-l-2 border-gold pl-6 mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs font-bold text-gold">Individual</span>
                <span className="text-xs text-text-muted">50 Questions</span>
                <span className="text-xs text-text-muted">75 Minutes</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white">
                Global Economics Challenge (GEC)
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-12">
              The GEC is IES&apos;s flagship individual assessment. Every question is
              scenario-based, with no definitions or memorization. Students apply economic
              reasoning to situations drawn from international markets, public policy,
              and global trade.
            </p>

            <SectionArt band="ticker" className="mb-12" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-sm font-bold text-text-muted mb-4">Format</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {[
                      ["Questions", "50 multiple-choice"],
                      ["Duration", "75 minutes"],
                      ["Style", "Real-world scenario application"],
                      ["Administration", "Proctored exam conditions"],
                      ["Scoring", "1 point per question, out of 50"],
                      ["Tiebreaker", "Time of completion"],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{label}</td>
                        <td className="py-2.5 text-arch-white">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-sm font-bold text-text-muted mb-4">Awards</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {[
                      ["1st Place", "Gold Trophy + Certificate"],
                      ["2nd Place", "Silver Trophy + Certificate"],
                      ["3rd Place", "Bronze Trophy + Certificate"],
                      ["4th–10th", "Medal + Certificate"],
                    ].map(([place, award]) => (
                      <tr key={place}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{place}</td>
                        <td className="py-2.5 text-arch-white">{award}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 space-y-1 text-text-secondary">
                  <p><strong className="text-arch-white">Perfect Score Award:</strong> any participant achieving 50/50</p>
                  <p><strong className="text-arch-white">Chapter Champion:</strong> highest scorer from each chapter</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-text-secondary">
              <strong className="text-text-muted">Eligibility:</strong> Active IES chapter members currently enrolled in high school. No prior economics coursework required.
            </div>
          </div>
        </section>

        {/* EPR — offset content with right-heavy layout */}
        <section id="epr" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left: header + format */}
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-gold">Individual or Team</span>
                  <span className="text-xs text-text-muted">1–4 Participants</span>
                  <span className="text-xs text-text-muted">Recorded Video</span>
                  <span className="px-2 py-0.5 text-xs font-bold text-obsidian bg-gold">
                    ${PRIZE_POOL} in prizes
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
                  Economic Policy Recommendation (EPR)
                </h2>
                <p className="text-base text-text-secondary leading-relaxed mb-10">
                  The EPR is IES&apos;s flagship policy event. Entrants answer an
                  announced theme with a policy of their own design, then record a
                  video presentation delivering it over a Google Slides deck. Enter
                  alone or as a team of up to four — the same rubric applies either way.
                </p>

                <SectionArt band="policy" aspect="aspect-[5/2]" className="mb-10" />

                <h3 className="text-sm font-bold text-text-muted mb-4">Format</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {[
                      ["Participants", "Individual, or a team of 2–4"],
                      ["Deliverable", "Recorded video presentation"],
                      ["Slides", "Google Slides deck, visible throughout"],
                      ["Length", VIDEO_LENGTH_LABEL],
                      ["Speaking", "Every team member must present"],
                      ["Submission", "Unlisted video link + slide link"],
                      ["Theme", "Announced in advance, same for all entrants"],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{label}</td>
                        <td className="py-2.5 text-arch-white">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right: criteria + awards */}
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="bg-obsidian-light p-8 mb-8">
                  <h3 className="text-sm font-bold text-text-muted mb-4">Judging Criteria</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-text-secondary">
                    {[
                      "Economic reasoning & accuracy",
                      "Strength of policy argument",
                      "Use of real-world evidence",
                      "Feasibility of proposed policy",
                      "Clarity of delivery on camera",
                      "Quality and design of the deck",
                    ].map((c) => (
                      <div key={c} className="flex items-center gap-2.5">
                        <span className="w-1 h-1 bg-gold shrink-0 rounded-full" />
                        <span className="text-sm">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-text-muted mb-4">Prizes</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {PRIZES.map((p) => (
                      <tr key={p.place}>
                        <td className="py-3 pr-4 text-text-muted whitespace-nowrap">{p.place}</td>
                        <td className="py-3">
                          <span
                            className={
                              p.cash
                                ? "font-serif text-xl font-bold text-gold"
                                : "text-arch-white"
                            }
                          >
                            {p.award}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-sm text-text-muted">
                  ${PRIZE_POOL} in cash awarded per cycle. Team prizes are paid to the
                  team and split at the team&apos;s discretion.
                </p>
                <div className="mt-4 space-y-1 text-text-secondary">
                  <p><strong className="text-arch-white">Best Argument Award:</strong> strongest policy argument</p>
                  <p><strong className="text-arch-white">Best Delivery Award:</strong> most compelling presentation on camera</p>
                  <p><strong className="text-arch-white">Chapter Champion:</strong> highest-scoring entry per chapter</p>
                </div>
              </div>
            </div>

            {/* Submission requirements */}
            <div className="mt-14 bg-obsidian-light border border-border p-8 sm:p-10">
              <h3 className="text-sm font-bold text-gold tracking-[0.2em] uppercase mb-8">
                How to Submit
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Build the deck",
                    text: "A Google Slides presentation carrying your policy: the problem, your recommendation, the evidence, and the trade-offs you accept.",
                  },
                  {
                    title: "Record the video",
                    text: "Screen-record the deck with your audio over it. Faces on camera are welcome but not required — the deck must be readable the whole way through.",
                  },
                  {
                    title: `Keep it to ${VIDEO_LENGTH_LABEL}`,
                    text: `Under ${VIDEO_MIN_MINUTES}:00 is under length and scored down; anything past ${VIDEO_MAX_MINUTES}:00 is not watched. Every member of a team must speak for a meaningful portion.`,
                  },
                  {
                    title: "Submit two links",
                    text: "An unlisted YouTube or Drive video link and a view-access Slides link, both set so anyone with the link can open them.",
                  },
                ].map((step, i) => (
                  <div key={step.title}>
                    <span className="text-xs font-bold text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <h4 className="mt-2 text-sm font-semibold text-arch-white">{step.title}</h4>
                    <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 pt-6 border-t border-border text-sm text-text-secondary">
                Submission instructions and the upload form are emailed to every
                registrant when the theme is released. Entries are judged on the
                recording alone — there is no live session to attend, so entrants in
                any timezone compete on equal terms.
              </p>
            </div>

            <div className="mt-8 text-text-secondary">
              <strong className="text-text-muted">Eligibility:</strong> Open to high school students worldwide, entering individually or in teams of 2–4. Team members do not need to attend the same school. Chapter membership is not required, though chapter members are eligible for the Chapter Champion award. All work must be original and free of AI-generated content.
            </div>

            {/* Registration CTA — phase-aware */}
            <EprRegistrationCta />
          </div>
        </section>

        {/* GRP — wide layout with callout box for paper structure */}
        <section id="grp" className="bg-obsidian-light scroll-mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs font-bold text-gold">Research</span>
              <span className="text-xs text-text-muted">Individual or Pair</span>
              <span className="text-xs text-text-muted">Written Paper</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
              IES Global Research Paper (GRP)
            </h2>
            <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-12">
              The GRP is IES&apos;s research and writing event. Each cycle features a
              specific country, and participants write a paper on any economic topic
              connected to that nation. The GRP rewards depth of research, quality of argument, and
              strength of academic writing.
            </p>

            <SectionArt band="globe" className="mb-12" />

            {/* Three-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Format */}
              <div>
                <h3 className="text-sm font-bold text-text-muted mb-4">Format</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {[
                      ["Participants", "Individual or team of 2"],
                      ["Word count", "2,000 words max"],
                      ["Theme", "Featured country per cycle"],
                      ["Topic", "Open (any economic subject)"],
                      ["Sources", "Min 5, MLA/APA/Chicago"],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm">{label}</td>
                        <td className="py-2.5 text-arch-white text-sm">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paper structure callout */}
              <div className="bg-obsidian border border-border p-6">
                <h3 className="text-sm font-bold text-gold mb-4">Paper Structure</h3>
                <div className="space-y-3">
                  {[
                    "Title page with name(s), chapter, and paper title",
                    "Abstract (150 words max)",
                    "Introduction, body with citations, conclusion",
                    "References: minimum 5 credible sources",
                  ].map((item, i) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-gold mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Judging */}
              <div>
                <h3 className="text-sm font-bold text-text-muted mb-4">Judging Criteria</h3>
                <div className="space-y-2 text-text-secondary mb-6">
                  {[
                    "Quality and relevance of research",
                    "Depth of economic analysis",
                    "Strength and clarity of argument",
                    "Use and accuracy of evidence",
                    "Structure and academic writing quality",
                    "Originality of topic or approach",
                  ].map((c) => (
                    <div key={c} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 bg-gold shrink-0 rounded-full" />
                      <span className="text-sm">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Awards row */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <h3 className="text-sm font-bold text-text-muted mb-4">Awards</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {[
                      ["1st Place", "Gold Trophy + Certificate"],
                      ["2nd Place", "Silver Trophy + Certificate"],
                      ["3rd Place", "Bronze Trophy + Certificate"],
                      ["4th–5th", "Medal + Certificate"],
                    ].map(([place, award]) => (
                      <tr key={place}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{place}</td>
                        <td className="py-2.5 text-arch-white">{award}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 space-y-1 text-text-secondary">
                <p><strong className="text-arch-white">Published in the IES Journal:</strong> top 5 papers are featured in the official IES Journal</p>
                <p><strong className="text-arch-white">Niche Research Award:</strong> most unique or underrepresented topic</p>
                <p><strong className="text-arch-white">Outstanding Writing Award:</strong> highest quality academic writing</p>
                <p><strong className="text-arch-white">Chapter Champion:</strong> highest-scoring submission per chapter</p>
              </div>
            </div>

            <div className="mt-8 text-text-secondary">
              <strong className="text-text-muted">Eligibility:</strong> Active IES chapter members currently enrolled in high school. Individual or team of 2 from the same chapter. All work must be original and free of AI-generated content.
            </div>
          </div>
        </section>

        {/* Essay Competition — stacked bands, distinct from the three above */}
        <section id="essay" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs font-bold text-gold">Individual</span>
              <span className="text-xs text-text-muted">1,200 Words</span>
              <span className="text-xs text-text-muted">Single Prompt</span>
              <span className="px-2 py-0.5 text-xs font-bold text-obsidian bg-gold">New</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
              IES Essay Competition (IEC)
            </h2>
            <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-12">
              The IEC is IES&apos;s argument event. Every participant answers the same
              prompt on a contested economic question, takes a position, and defends
              it in 1,200 words. Where the GRP rewards depth of research, the IEC
              rewards the quality of the reasoning itself. Essays are anonymized
              before they reach the judging panel.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Format */}
              <div className="lg:col-span-4">
                <h3 className="text-sm font-bold text-text-muted mb-4">Format</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {[
                      ["Participants", "Individual entry"],
                      ["Word count", "1,200 words max"],
                      ["Prompt", "One prompt, same for all"],
                      ["Sources", "Optional, cited if used"],
                      ["Registration opens", formatDateTime(OPENS_AT)],
                      ["Entries close", formatDateTime(DEADLINE_AT)],
                      ["Competition ends", formatDate(COMPETITION_ENDS_AT)],
                      ["Entries", "One per participant"],
                      ["Judging", "Anonymized, panel-scored"],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm">{label}</td>
                        <td className="py-2.5 text-arch-white text-sm">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Submission requirements */}
              <div className="lg:col-span-4">
                <h3 className="text-sm font-bold text-text-muted mb-4">Submission Requirements</h3>
                <div className="space-y-3">
                  {[
                    "PDF or DOCX, submitted by the deadline in the prompt email",
                    "12pt body text, double-spaced, numbered pages",
                    "Word count excludes the title, citations, and bibliography",
                    "No name anywhere in the document — use the entry ID we email you",
                    "MLA, APA, or Chicago, applied consistently throughout",
                    "Entirely original work, free of AI-generated content",
                  ].map((item, i) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-gold mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div className="lg:col-span-4">
                <h3 className="text-sm font-bold text-text-muted mb-4">Awards</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {[
                      ["1st Place", "Gold Trophy + Certificate"],
                      ["2nd Place", "Silver Trophy + Certificate"],
                      ["3rd Place", "Bronze Trophy + Certificate"],
                      ["4th–10th", "Medal + Certificate"],
                    ].map(([place, award]) => (
                      <tr key={place}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm">{place}</td>
                        <td className="py-2.5 text-arch-white text-sm">{award}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 space-y-1 text-text-secondary text-sm">
                  <p><strong className="text-arch-white">Best Counterargument:</strong> strongest engagement with the opposing case</p>
                  <p><strong className="text-arch-white">Published in the IES Journal:</strong> top 3 essays are featured</p>
                  <p><strong className="text-arch-white">Chapter Champion:</strong> highest scorer from each chapter</p>
                </div>
              </div>
            </div>

            {/* Scoring rubric — weighted, on a contrasting panel */}
            <div className="mt-14 bg-obsidian-light border border-border p-8 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
                <h3 className="text-sm font-bold text-gold tracking-[0.2em] uppercase">
                  Scoring Rubric
                </h3>
                <span className="text-sm text-text-muted">100 points total</span>
              </div>
              <div className="space-y-5">
                {[
                  ["Economic reasoning", 25, "Is the analysis correct, and does it use economic logic rather than assertion?"],
                  ["Thesis and position", 20, "Is there one clear claim, stated early and held throughout?"],
                  ["Counterargument", 20, "Is the strongest opposing case represented fairly and answered?"],
                  ["Evidence", 15, "Is the evidence accurate, relevant, and honestly characterized?"],
                  ["Structure and prose", 15, "Does the essay read clearly and move in a deliberate order?"],
                  ["Originality", 5, "Does the argument show independent thought?"],
                ].map(([criterion, weight, detail]) => (
                  <div key={criterion as string}>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <span className="text-sm font-semibold text-arch-white">{criterion}</span>
                      <span className="text-sm font-bold text-gold shrink-0">{weight} pts</span>
                    </div>
                    <div className="h-1 w-full bg-obsidian mb-2">
                      <div className="h-full bg-gold/60" style={{ width: `${weight}%` }} />
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 pt-6 border-t border-border text-sm text-text-secondary">
                Each essay is scored independently by two judges. Scores within 10 points
                are averaged; a wider gap goes to a third judge, whose score is final.
                Essays over the word limit are scored on the first 1,200 words only.
              </p>
            </div>

            <div className="mt-8 text-text-secondary">
              <strong className="text-text-muted">Eligibility:</strong> Open to any high school student. Unlike the GEC, EPR, and GRP, chapter membership is <span className="text-arch-white">not required</span> to enter — though chapter members remain eligible for the Chapter Champion award. All work must be original and free of AI-generated content.
            </div>

            {/* Sample prompts — illustrative, the live prompt is not published */}
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h3 className="text-sm font-bold text-gold tracking-[0.2em] uppercase mb-4">
                  Sample Prompts
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  The live prompt is not published in advance. These are the shape of
                  question to expect: contested, answerable from either side, and
                  impossible to resolve by looking something up.
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="border-t border-border">
                  {[
                    "Central banks have targeted 2% inflation for three decades. Should that target be higher?",
                    "Does industrial policy do more good than harm in developing economies?",
                    "A country discovers a large resource windfall. Is a sovereign wealth fund the responsible use of it?",
                  ].map((prompt, i) => (
                    <div key={prompt} className="flex items-start gap-5 border-b border-border py-6">
                      <span className="text-xs font-bold text-gold mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-serif text-lg text-arch-white leading-snug">{prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Not the active cycle — EPR is the event currently open */}
            <div className="mt-10 border border-border bg-obsidian-light p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-sm font-bold text-arch-white">Not the current cycle</p>
                <p className="mt-1.5 text-sm text-text-secondary max-w-xl">
                  The Essay Competition is not the event currently accepting entries.
                  The EPR is open this cycle — dates and registration are above.
                </p>
              </div>
              <Link
                href="/competitions#epr"
                className="shrink-0 px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
              >
                Go to the EPR
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <p className="text-text-secondary">Dates, themes, and platform details are announced to chapters ahead of each cycle.</p>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/apply"
                  className="px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                >
                  Start a Chapter
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 text-sm text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                >
                  Essay Competition
                </Link>
                <Link
                  href="/journal"
                  className="px-6 py-3 text-sm text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
                >
                  IES Journal
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
