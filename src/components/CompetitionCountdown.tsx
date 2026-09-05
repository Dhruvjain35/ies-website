"use client";

import { countdownParts } from "@/lib/competition";

type Props = {
  parts: ReturnType<typeof countdownParts> | null;
  size?: "sm" | "lg";
};

const UNITS = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Minutes"],
  ["seconds", "Seconds"],
] as const;

/** Four-unit countdown. Renders dashes until the client resolves the time. */
export default function CompetitionCountdown({ parts, size = "lg" }: Props) {
  const big = size === "lg";
  return (
    <div className={`grid grid-cols-4 ${big ? "gap-3 sm:gap-4" : "gap-2"}`}>
      {UNITS.map(([key, label]) => (
        <div
          key={key}
          className={`border border-border bg-obsidian text-center ${
            big ? "px-2 py-4 sm:py-5" : "px-2 py-3"
          }`}
        >
          <div
            className={`font-serif font-bold text-gold tabular-nums leading-none ${
              big ? "text-3xl sm:text-4xl lg:text-5xl" : "text-xl sm:text-2xl"
            }`}
          >
            {parts ? String(parts[key]).padStart(2, "0") : "––"}
          </div>
          <div
            className={`mt-2 uppercase tracking-widest text-text-muted ${
              big ? "text-[10px] sm:text-xs" : "text-[10px]"
            }`}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
