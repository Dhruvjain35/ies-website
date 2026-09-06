"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PUBLICATIONS,
  TYPE_LABEL,
  DISTINCTION_LABEL,
  COMPETITION_LABEL,
  formatPublishedDate,
  type PublicationType,
} from "@/lib/publications";

type Filter = "all" | PublicationType;
type Sort = "newest" | "oldest";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All records" },
  { key: "journal", label: "Journal" },
  { key: "archive", label: "Archive" },
];

export default function PublicationBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PUBLICATIONS.filter((p) => filter === "all" || p.type === filter)
      .filter((p) => {
        if (!q) return true;
        const haystack = [
          p.title,
          p.id,
          p.abstract,
          p.school ?? "",
          p.chapter ?? "",
          ...(p.keywords ?? []),
          ...p.authors,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) =>
        sort === "newest"
          ? b.publishedAt.localeCompare(a.publishedAt)
          : a.publishedAt.localeCompare(b.publishedAt),
      );
  }, [query, filter, sort]);

  const isEmptyLibrary = PUBLICATIONS.length === 0;

  return (
    <div>
      {/* Controls — hidden while there is nothing to control */}
      {!isEmptyLibrary && (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
          <div className="flex gap-px bg-border shrink-0">
            {FILTERS.map((f) => {
              const count =
                f.key === "all"
                  ? PUBLICATIONS.length
                  : PUBLICATIONS.filter((p) => p.type === f.key).length;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={filter === f.key}
                  className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
                    filter === f.key
                      ? "bg-gold text-obsidian"
                      : "bg-obsidian-light text-text-secondary hover:text-arch-white"
                  }`}
                >
                  {f.label}
                  <span className="ml-2 text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          <label htmlFor="pub-search" className="sr-only">
            Search records
          </label>
          <input
            id="pub-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, keyword, or record ID"
            className="flex-1 bg-transparent border border-border px-4 py-2.5 text-sm text-arch-white placeholder:text-text-muted focus:border-gold focus:outline-none transition-colors"
          />

          <label htmlFor="pub-sort" className="sr-only">
            Sort records
          </label>
          <select
            id="pub-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="bg-obsidian-light border border-border px-4 py-2.5 text-sm text-arch-white focus:border-gold focus:outline-none transition-colors shrink-0"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      )}

      {/* Empty library — no records have been published at all */}
      {isEmptyLibrary && (
        <div className="border border-border bg-obsidian-light p-10 sm:p-14 text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-gold">
            No records yet
          </p>
          <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-arch-white">
            The archive opens with the first cycle
          </h3>
          <p className="mt-5 mx-auto max-w-xl text-sm text-text-secondary leading-relaxed">
            The IES Journal has not published its first record. Papers and policy
            work from the current competition cycle will be deposited here once
            judging is complete, each with a downloadable PDF and a citation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
            >
              Enter the current competition
            </Link>
            <Link
              href="/competitions"
              className="px-6 py-3 text-sm text-text-secondary border border-border hover:text-arch-white hover:border-text-muted transition-colors"
            >
              How work gets published
            </Link>
          </div>
        </div>
      )}

      {/* Records exist, but this query matched none */}
      {!isEmptyLibrary && results.length === 0 && (
        <div className="border border-border p-10 text-center">
          <p className="text-sm text-text-secondary">
            No records match{" "}
            <span className="text-arch-white">
              {query ? `“${query}”` : "this filter"}
            </span>
            .
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="mt-4 text-xs font-bold text-gold hover:text-gold-dark transition-colors"
          >
            Clear search and filters
          </button>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <>
          <p className="text-xs text-text-muted mb-6">
            {results.length} {results.length === 1 ? "record" : "records"}
          </p>
          <div className="border-t border-border">
            {results.map((p, i) => (
              <article key={p.id} className="border-b border-border py-8">
                <div className="flex flex-col lg:flex-row lg:gap-8">
                  <span className="hidden lg:block text-xs font-bold text-text-muted pt-1 tabular-nums shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
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
                      {p.competition && (
                        <span className="text-[10px] uppercase tracking-wider text-text-muted">
                          {COMPETITION_LABEL[p.competition]}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-arch-white leading-snug">
                      <Link
                        href={`/journal/${p.id}`}
                        className="hover:text-gold transition-colors"
                      >
                        {p.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-sm text-text-secondary">
                      {p.authors.join(", ")}
                      {p.school && <span className="text-text-muted"> · {p.school}</span>}
                    </p>

                    <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {p.abstract}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-muted">
                      <span className="tabular-nums">{p.id}</span>
                      <span>{formatPublishedDate(p.publishedAt)}</span>
                      <Link
                        href={`/journal/${p.id}`}
                        className="font-bold text-gold hover:text-gold-dark transition-colors"
                      >
                        Open record &rarr;
                      </Link>
                      {p.pdf && (
                        <a
                          href={p.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-gold hover:text-gold-dark transition-colors"
                        >
                          PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
