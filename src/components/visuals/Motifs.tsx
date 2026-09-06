/**
 * Economics-themed SVG motifs used as tile artwork.
 *
 * All geometry is deterministic — no Math.random — because these render during
 * the static prerender and any variation between server and client would be a
 * hydration mismatch. Each motif fills its container and is decorative only.
 */

type MotifProps = { className?: string; fit?: "slice" | "meet" };

const wrap = (className?: string) =>
  `absolute inset-0 h-full w-full ${className ?? ""}`;

const par = (fit: "slice" | "meet" = "slice") => `xMidYMid ${fit}`;

/** Dotted globe with arcing trade routes. */
export function TradeArcs({ className, fit }: MotifProps) {
  const dots: [number, number][] = [];
  for (let r = 0; r < 11; r++) {
    for (let c = 0; c < 22; c++) {
      const x = 20 + c * 17;
      const y = 30 + r * 17;
      // Carve a rough landmass silhouette out of the grid.
      const dx = (c - 10.5) / 10.5;
      const dy = (r - 5) / 5;
      const d = dx * dx * 0.8 + dy * dy;
      if (d < 0.95 && (c * 7 + r * 5) % 3 !== 0) dots.push([x, y]);
    }
  }
  return (
    <svg viewBox="0 0 400 230" preserveAspectRatio={par(fit)} className={wrap(className)} aria-hidden="true">
      <rect width="400" height="230" fill="#141414" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="#C5A059" opacity={0.22 + ((i * 13) % 7) * 0.03} />
      ))}
      <path d="M70 150 Q 200 30 330 110" stroke="#C5A059" strokeWidth="1.2" fill="none" opacity="0.75" />
      <path d="M95 70 Q 210 180 320 80" stroke="#C5A059" strokeWidth="0.9" fill="none" opacity="0.45" />
      <circle cx="70" cy="150" r="3.5" fill="#C5A059" />
      <circle cx="330" cy="110" r="3.5" fill="#C5A059" />
      <circle cx="95" cy="70" r="2.5" fill="#C5A059" opacity="0.7" />
      <circle cx="320" cy="80" r="2.5" fill="#C5A059" opacity="0.7" />
    </svg>
  );
}

/** Area chart with gridlines — the generic "series" motif. */
export function GrowthCurve({ className, fit }: MotifProps) {
  const pts = [8, 22, 17, 38, 31, 52, 47, 70, 63, 88, 96];
  const path = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${20 + i * 36} ${200 - v * 1.75}`)
    .join(" ");
  return (
    <svg viewBox="0 0 400 230" preserveAspectRatio={par(fit)} className={wrap(className)} aria-hidden="true">
      <rect width="400" height="230" fill="#141414" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" x2="400" y1={40 + i * 40} y2={40 + i * 40} stroke="#2A2A2A" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={20 + i * 52} x2={20 + i * 52} y1="0" y2="230" stroke="#222222" strokeWidth="1" />
      ))}
      <path d={`${path} L 380 230 L 20 230 Z`} fill="#C5A059" opacity="0.12" />
      <path d={path} stroke="#C5A059" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
      {pts.map((v, i) => (
        <circle key={i} cx={20 + i * 36} cy={200 - v * 1.75} r="2.6" fill="#C5A059" />
      ))}
    </svg>
  );
}

/** Supply and demand crossing — the policy motif. */
export function SupplyDemand({ className, fit }: MotifProps) {
  return (
    <svg viewBox="0 0 400 230" preserveAspectRatio={par(fit)} className={wrap(className)} aria-hidden="true">
      <rect width="400" height="230" fill="#141414" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`h${i}`} x1="40" x2="370" y1={30 + i * 34} y2={30 + i * 34} stroke="#222222" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={`v${i}`} x1={55 + i * 52} x2={55 + i * 52} y1="20" y2="200" stroke="#222222" strokeWidth="1" />
      ))}
      <line x1="40" y1="200" x2="370" y2="200" stroke="#2A2A2A" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="200" stroke="#2A2A2A" strokeWidth="1.5" />
      <path d="M60 190 Q 200 150 350 45" stroke="#C5A059" strokeWidth="2.2" fill="none" />
      <path d="M60 45 Q 200 150 350 190" stroke="#A8A49E" strokeWidth="2" fill="none" opacity="0.7" />
      <circle cx="205" cy="118" r="5" fill="#C5A059" />
      <circle cx="205" cy="118" r="11" fill="none" stroke="#C5A059" strokeWidth="1" opacity="0.5" />
      <line x1="205" y1="118" x2="205" y2="200" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <line x1="40" y1="118" x2="205" y2="118" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

/** Ranked bars — the competition/results motif. */
export function RankedBars({ className, fit }: MotifProps) {
  const bars = [56, 92, 74, 120, 88, 140, 104, 68, 116, 80];
  return (
    <svg viewBox="0 0 400 230" preserveAspectRatio={par(fit)} className={wrap(className)} aria-hidden="true">
      <rect width="400" height="230" fill="#141414" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="0" x2="400" y1={50 + i * 44} y2={50 + i * 44} stroke="#222222" strokeWidth="1" />
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={24 + i * 36}
          y={196 - h}
          width="20"
          height={h}
          fill="#C5A059"
          opacity={h > 115 ? 0.95 : 0.3 + (h / 140) * 0.35}
        />
      ))}
      <line x1="0" y1="196" x2="400" y2="196" stroke="#2A2A2A" strokeWidth="1.5" />
    </svg>
  );
}

/** Stacked pages — the journal motif. */
export function JournalPages({ className, fit }: MotifProps) {
  return (
    <svg viewBox="0 0 400 230" preserveAspectRatio={par(fit)} className={wrap(className)} aria-hidden="true">
      <rect width="400" height="230" fill="#141414" />
      <rect x="128" y="44" width="150" height="160" fill="#1A1A1A" stroke="#2A2A2A" transform="rotate(-7 203 124)" />
      <rect x="136" y="38" width="150" height="160" fill="#1C1C1C" stroke="#2A2A2A" transform="rotate(-2.5 211 118)" />
      <rect x="144" y="34" width="150" height="162" fill="#1F1F1F" stroke="#C5A059" strokeOpacity="0.45" />
      <rect x="160" y="52" width="70" height="4" fill="#C5A059" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x="160" y={70 + i * 13} width={i % 3 === 2 ? 78 : 118} height="3" fill="#3A3A3A" />
      ))}
      <rect x="160" y="176" width="46" height="3" fill="#C5A059" opacity="0.6" />
    </svg>
  );
}

/** Concentric network — the chapters/community motif. */
export function ChapterNetwork({ className, fit }: MotifProps) {
  const nodes: [number, number][] = [
    [200, 115], [120, 70], [285, 78], [96, 158], [305, 155],
    [200, 42], [200, 190], [60, 112], [345, 112],
  ];
  return (
    <svg viewBox="0 0 400 230" preserveAspectRatio={par(fit)} className={wrap(className)} aria-hidden="true">
      <rect width="400" height="230" fill="#141414" />
      {[46, 74, 102].map((r) => (
        <circle key={r} cx="200" cy="115" r={r} fill="none" stroke="#2A2A2A" strokeWidth="1" />
      ))}
      {nodes.slice(1).map(([x, y], i) => (
        <line key={i} x1="200" y1="115" x2={x} y2={y} stroke="#C5A059" strokeWidth="0.9" opacity="0.32" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 7 : 4} fill="#C5A059" opacity={i === 0 ? 1 : 0.75} />
      ))}
    </svg>
  );
}

export const MOTIFS = {
  trade: TradeArcs,
  growth: GrowthCurve,
  policy: SupplyDemand,
  ranked: RankedBars,
  journal: JournalPages,
  network: ChapterNetwork,
} as const;

export type MotifName = keyof typeof MOTIFS;
