import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CitationBox from "@/components/CitationBox";
import {
  PUBLICATIONS,
  getPublication,
  TYPE_LABEL,
  DISTINCTION_LABEL,
  COMPETITION_LABEL,
  JOURNAL_NAME,
  PUBLISHER,
  formatPublishedDate,
} from "@/lib/publications";

export function generateStaticParams() {
  return PUBLICATIONS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getPublication(id);
  if (!p) return { title: `Record not found | ${JOURNAL_NAME}` };
  return {
    title: `${p.title} | ${JOURNAL_NAME}`,
    description: p.abstract.slice(0, 160),
  };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getPublication(id);
  if (!p) notFound();

  const meta: [string, string][] = [
    ["Record ID", p.id],
    ["Type", TYPE_LABEL[p.type]],
    ["Published", formatPublishedDate(p.publishedAt)],
    ...(p.competition
      ? ([["Source", COMPETITION_LABEL[p.competition]]] as [string, string][])
      : []),
    ...(p.volume ? ([["Volume", String(p.volume)]] as [string, string][]) : []),
    ...(p.issue ? ([["Issue", String(p.issue)]] as [string, string][]) : []),
    ...(p.pages ? ([["Pages", p.pages]] as [string, string][]) : []),
    ...(p.school ? ([["Institution", p.school]] as [string, string][]) : []),
    ...(p.chapter ? ([["IES Chapter", p.chapter]] as [string, string][]) : []),
    ...(p.country ? ([["Country", p.country]] as [string, string][]) : []),
    ...(p.doi ? ([["DOI", p.doi]] as [string, string][]) : []),
    ["Publisher", PUBLISHER],
  ];

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href="/journal"
              className="text-xs font-bold text-gold hover:text-gold-dark transition-colors"
            >
              &larr; All records
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  p.type === "journal"
                    ? "bg-gold text-obsidian"
                    : "border border-border text-text-secondary"
                }`}
              >
                {TYPE_LABEL[p.type]}
              </span>
              {p.distinction && (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-gold/50 text-gold">
                  {DISTINCTION_LABEL[p.distinction]}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-arch-white leading-tight max-w-4xl">
              {p.title}
            </h1>
            <p className="mt-5 text-lg text-text-secondary">{p.authors.join(", ")}</p>

            <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Abstract + citation */}
              <div className="lg:col-span-7">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5">
                  Abstract
                </h2>
                <p className="text-base text-text-secondary leading-relaxed whitespace-pre-line">
                  {p.abstract}
                </p>

                {p.keywords && p.keywords.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-3">
                      Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {p.keywords.map((k) => (
                        <span
                          key={k}
                          className="px-3 py-1 text-xs text-text-secondary border border-border"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5">
                    Cite this record
                  </h2>
                  <CitationBox publication={p} />
                </div>
              </div>

              {/* Download + metadata */}
              <div className="lg:col-span-5">
                <div className="border border-border bg-obsidian-light p-6">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5">
                    Full text
                  </h2>
                  {p.pdf ? (
                    <>
                      <a
                        href={p.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-6 py-4 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
                      >
                        Download PDF
                      </a>
                      <p className="mt-3 text-xs text-text-muted text-center">
                        Opens in a new tab. Free to read and share with attribution.
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-text-secondary leading-relaxed">
                      The full text for this record is not yet posted. Email{" "}
                      <a
                        href="mailto:ies.economicsociety@gmail.com"
                        className="text-gold hover:text-gold-dark transition-colors"
                      >
                        ies.economicsociety@gmail.com
                      </a>{" "}
                      to request a copy.
                    </p>
                  )}
                </div>

                <div className="mt-8">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-4">
                    Record details
                  </h2>
                  <table className="w-full">
                    <tbody className="divide-y divide-border">
                      {meta.map(([label, value]) => (
                        <tr key={label}>
                          <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap text-sm align-top">
                            {label}
                          </td>
                          <td className="py-2.5 text-arch-white text-sm break-words">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
