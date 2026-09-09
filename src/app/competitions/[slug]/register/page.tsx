import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RegisterPanel from "@/components/members/RegisterPanel";
import {
  COMPETITIONS,
  PHASE_WORD,
  formatDate,
  formatDateTime,
  getCompetition,
  phaseOf,
} from "@/lib/competition";

export function generateStaticParams() {
  return COMPETITIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const competition = getCompetition(slug);
  if (!competition) {
    return { title: "Not found | International Economic Society" };
  }
  return {
    title: `${competition.name} registration | International Economic Society`,
    description: competition.summary,
  };
}

export default async function CompetitionRegisterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const competition = getCompetition(slug);
  if (!competition) notFound();

  // The phase shown here is the server's reading at render time. The module
  // checks again on every write, so a cached page cannot let anyone in early.
  const phase = phaseOf(competition);

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* The brief */}
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-gold tracking-widest uppercase">
                    {competition.short}
                  </span>
                  <span
                    className={`px-2.5 py-1 text-xs font-bold ${
                      phase === "open"
                        ? "text-obsidian bg-gold"
                        : "text-text-secondary border border-border"
                    }`}
                  >
                    {PHASE_WORD[phase]}
                  </span>
                </div>
                <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-arch-white leading-tight">
                  {competition.name}
                </h1>
                <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                  {competition.summary}
                </p>

                <table className="mt-10 w-full">
                  <tbody className="divide-y divide-border">
                    {competition.facts.map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm align-top">
                          {label}
                        </td>
                        <td className="py-2.5 text-arch-white text-sm">{value}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm align-top">
                        Registration opens
                      </td>
                      <td className="py-2.5 text-arch-white text-sm">
                        {formatDateTime(competition.opensAt)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm align-top">
                        Entries close
                      </td>
                      <td className="py-2.5 text-arch-white text-sm">
                        {formatDateTime(competition.closesAt)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm align-top">
                        {competition.endsLabel}
                      </td>
                      <td className="py-2.5 text-arch-white text-sm">
                        {formatDate(competition.endsAt)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p className="mt-6 text-sm text-gold">{competition.prizeLine}</p>

                <div className="mt-8 flex flex-wrap gap-5 text-sm">
                  <Link
                    href={competition.detailsHref}
                    className="text-text-secondary hover:text-arch-white underline underline-offset-4 decoration-border hover:decoration-gold transition-colors"
                  >
                    Full rules and judging
                  </Link>
                  <Link
                    href="/members"
                    className="text-text-secondary hover:text-arch-white underline underline-offset-4 decoration-border hover:decoration-gold transition-colors"
                  >
                    All your entries
                  </Link>
                </div>

                {slug === "epr" && (
                  <p className="mt-8 text-xs text-text-muted leading-relaxed border-t border-border pt-6">
                    Entering here records the entry against your IES membership.
                    The older standalone form at{" "}
                    <Link href="/register" className="text-gold">
                      /register
                    </Link>{" "}
                    writes to the organisers&apos; spreadsheet instead and needs
                    no account. Use one or the other, not both.
                  </p>
                )}
              </div>

              {/* The form */}
              <div className="lg:col-span-6 lg:col-start-7">
                <RegisterPanel slug={competition.slug} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
