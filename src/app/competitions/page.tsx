import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

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
            <p className="mt-4 text-sm text-text-muted">Competition dates: <span className="text-arch-white font-medium">TBD</span></p>
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { label: "GEC", sub: "Individual", href: "#gec" },
                { label: "EPR", sub: "Team", href: "#epr" },
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
                  <span className="text-xs font-bold text-gold">Team</span>
                  <span className="text-xs text-text-muted">2–4 Members</span>
                  <span className="text-xs text-text-muted">Live Presentation</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-arch-white mb-4">
                  Economic Policy Recommendation (EPR)
                </h2>
                <p className="text-base text-text-secondary leading-relaxed mb-10">
                  The EPR is IES&apos;s team presentation event. Teams of 2–4 develop and
                  deliver a policy proposal responding to an announced theme, presenting
                  live to a virtual judging panel.
                </p>

                <h3 className="text-sm font-bold text-text-muted mb-4">Format</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {[
                      ["Team size", "2–4 members"],
                      ["Presentation", "8 minutes maximum"],
                      ["Q&A", "Judges may question any team member"],
                      ["Visual aid", "Slide deck or screen-shared material"],
                      ["Platform", "Online video conferencing"],
                      ["Theme", "Announced in advance, same for all teams"],
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
                      "Team cohesion & delivery",
                      "Response to judges' questions",
                    ].map((c) => (
                      <div key={c} className="flex items-center gap-2.5">
                        <span className="w-1 h-1 bg-gold shrink-0 rounded-full" />
                        <span className="text-sm">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

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
                <div className="mt-4 space-y-1 text-text-secondary">
                  <p><strong className="text-arch-white">Best Argument Award:</strong> strongest policy argument</p>
                  <p><strong className="text-arch-white">Best Delivery Award:</strong> most confident presentation style</p>
                  <p><strong className="text-arch-white">Chapter Champion:</strong> highest-scoring team per chapter</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-text-secondary">
              <strong className="text-text-muted">Eligibility:</strong> Teams of 2–4 active IES chapter members from the same chapter, currently enrolled in high school. Stable internet connection required.
            </div>
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
              rewards the quality of the reasoning itself.
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
                      ["Window", "Two weeks from release"],
                      ["Submission", "Anonymized before judging"],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm">{label}</td>
                        <td className="py-2.5 text-arch-white text-sm">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Judging */}
              <div className="lg:col-span-4">
                <h3 className="text-sm font-bold text-text-muted mb-4">Judging Criteria</h3>
                <div className="space-y-2 text-text-secondary">
                  {[
                    "Clarity of the central thesis",
                    "Rigor of the economic reasoning",
                    "Engagement with the counterargument",
                    "Accuracy of evidence used",
                    "Structure and prose quality",
                    "Independence of thought",
                  ].map((c) => (
                    <div key={c} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 bg-gold shrink-0 rounded-full" />
                      <span className="text-sm">{c}</span>
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
                  <p><strong className="text-arch-white">Chapter Champion:</strong> highest scorer from each chapter</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-text-secondary">
              <strong className="text-text-muted">Eligibility:</strong> Open to any high school student. Unlike the GEC, EPR, and GRP, chapter membership is <span className="text-arch-white">not required</span> to enter — though chapter members remain eligible for the Chapter Champion award. All work must be original and free of AI-generated content.
            </div>

            {/* Registration CTA */}
            <div className="mt-10 border border-gold/40 bg-obsidian-light p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-sm font-bold text-arch-white">Registration is open</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Register now and the prompt, deadline, and submission instructions are emailed to you when the cycle opens.
                </p>
              </div>
              <Link
                href="/register"
                className="shrink-0 px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
              >
                Register for the Essay Competition
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
