"use client";

import { useState } from "react";
import {
  CITATION_STYLES,
  formatCitation,
  type CitationStyle,
  type Publication,
} from "@/lib/publications";

/** Citation formats with a copy button, one style at a time. */
export default function CitationBox({ publication }: { publication: Publication }) {
  const [style, setStyle] = useState<CitationStyle>("APA");
  const [copied, setCopied] = useState(false);
  const citation = formatCitation(publication, style);

  async function copy() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions or a non-secure origin; the
      // text stays selectable so the reader can copy it by hand.
      setCopied(false);
    }
  }

  return (
    <div className="border border-border bg-obsidian-light">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <div className="flex flex-wrap gap-px bg-border">
          {CITATION_STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              aria-pressed={style === s}
              className={`px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                style === s
                  ? "bg-gold text-obsidian"
                  : "bg-obsidian text-text-secondary hover:text-arch-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="px-4 py-1.5 text-xs font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors"
        >
          {copied ? "Copied" : "Copy citation"}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-words font-sans">
        {citation}
      </pre>
    </div>
  );
}
