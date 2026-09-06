/**
 * Wide band artwork, drawn at 3:1 to match the section bands exactly.
 *
 * The tile motifs are 1.74:1 — stretched across a full-width band they either
 * crop through the middle of the composition or letterbox with dead space on
 * both sides. These are composed for the wide format instead, so they fill it.
 * Geometry is deterministic for the same hydration reason as Motifs.
 */

const VB = "0 0 1200 400";
const cls = "absolute inset-0 h-full w-full";

/** Long market series with a moving average — the general economics band. */
export function TickerBand() {
  const bars = Array.from({ length: 48 }, (_, i) => {
    const t = i / 47;
    const trend = 120 + t * 130;
    const swing = Math.sin(i * 0.9) * 34 + Math.sin(i * 0.37) * 26;
    return { x: 40 + i * 24, h: Math.max(26, trend + swing - 60) };
  });
  const avg = bars.map((b, i) => `${i === 0 ? "M" : "L"} ${b.x + 6} ${340 - b.h * 0.86}`).join(" ");
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className={cls} aria-hidden="true">
      <rect width="1200" height="400" fill="#141414" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" x2="1200" y1={70 + i * 68} y2={70 + i * 68} stroke="#212121" strokeWidth="1" />
      ))}
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={340 - b.h} width="12" height={b.h} fill="#C5A059" opacity={0.14 + (b.h / 300) * 0.4} />
      ))}
      <path d={avg} stroke="#C5A059" strokeWidth="2.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="0" y1="340" x2="1200" y2="340" stroke="#2A2A2A" strokeWidth="1.5" />
    </svg>
  );
}

/** World dot-matrix with trade routes — the global band. */
export function GlobeBand() {
  const dots: [number, number, number][] = [];
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 60; c++) {
      const x = 20 + c * 20;
      const y = 40 + r * 24;
      const dx = (c - 29.5) / 29.5;
      const dy = (r - 6.5) / 6.5;
      if (dx * dx * 0.9 + dy * dy < 0.92 && (c * 5 + r * 11) % 4 !== 0) {
        dots.push([x, y, 0.14 + ((c * 7 + r * 3) % 6) * 0.055]);
      }
    }
  }
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className={cls} aria-hidden="true">
      <rect width="1200" height="400" fill="#141414" />
      {dots.map(([x, y, o], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill="#C5A059" opacity={o} />
      ))}
      <path d="M180 280 Q 480 90 780 200" stroke="#C5A059" strokeWidth="1.6" fill="none" opacity="0.8" />
      <path d="M300 130 Q 640 320 980 170" stroke="#C5A059" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M120 190 Q 400 60 640 130" stroke="#C5A059" strokeWidth="1" fill="none" opacity="0.35" />
      {[[180, 280], [780, 200], [300, 130], [980, 170], [120, 190]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="#C5A059" />
          <circle cx={x} cy={y} r="12" fill="none" stroke="#C5A059" strokeWidth="1" opacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

/** Repeated supply/demand crosses — the policy band. */
export function PolicyBand() {
  const panels = [140, 420, 700, 980];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className={cls} aria-hidden="true">
      <rect width="1200" height="400" fill="#141414" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1="0" x2="1200" y1={50 + i * 60} y2={50 + i * 60} stroke="#1F1F1F" strokeWidth="1" />
      ))}
      {panels.map((cx, i) => {
        const emphasis = i === 1;
        return (
          <g key={cx} opacity={emphasis ? 1 : 0.42}>
            <line x1={cx - 90} y1="300" x2={cx + 90} y2="300" stroke="#2A2A2A" strokeWidth="1.5" />
            <line x1={cx - 90} y1="110" x2={cx - 90} y2="300" stroke="#2A2A2A" strokeWidth="1.5" />
            <path d={`M${cx - 78} 288 Q ${cx} 240 ${cx + 78} 130`} stroke="#C5A059" strokeWidth="2.2" fill="none" />
            <path d={`M${cx - 78} 130 Q ${cx} 240 ${cx + 78} 288`} stroke="#A8A49E" strokeWidth="1.8" fill="none" opacity="0.65" />
            <circle cx={cx} cy="212" r={emphasis ? 6 : 4} fill="#C5A059" />
            {emphasis && <circle cx={cx} cy="212" r="14" fill="none" stroke="#C5A059" strokeWidth="1" opacity="0.5" />}
          </g>
        );
      })}
    </svg>
  );
}

/** Shelf of journal spines — the publication band. */
export function ArchiveBand() {
  const spines = Array.from({ length: 22 }, (_, i) => ({
    x: 40 + i * 52,
    h: 150 + ((i * 37) % 5) * 26,
    gold: i % 4 === 1,
  }));
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className={cls} aria-hidden="true">
      <rect width="1200" height="400" fill="#141414" />
      {spines.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={330 - s.h} width="34" height={s.h} fill={s.gold ? "#C5A059" : "#1E1E1E"} opacity={s.gold ? 0.85 : 1} stroke="#2A2A2A" />
          <rect x={s.x + 7} y={330 - s.h + 18} width="20" height="3" fill={s.gold ? "#141414" : "#3A3A3A"} />
          <rect x={s.x + 7} y={330 - s.h + 27} width="13" height="3" fill={s.gold ? "#141414" : "#333333"} />
        </g>
      ))}
      <line x1="0" y1="332" x2="1200" y2="332" stroke="#C5A059" strokeWidth="2" opacity="0.45" />
    </svg>
  );
}

/** Linked chapter nodes across the width — the network band. */
export function NetworkBand() {
  const nodes: [number, number, number][] = [
    [90, 250, 5], [230, 140, 7], [370, 280, 5], [510, 170, 6], [650, 260, 9],
    [790, 130, 6], [930, 250, 5], [1070, 165, 7], [300, 330, 4], [860, 330, 4],
  ];
  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [1, 3], [3, 5], [4, 8], [4, 9], [2, 8], [6, 9],
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className={cls} aria-hidden="true">
      <rect width="1200" height="400" fill="#141414" />
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#C5A059" strokeWidth="1" opacity="0.28" />
      ))}
      {nodes.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#C5A059" opacity={r > 6 ? 1 : 0.7} />
          {r > 6 && <circle cx={x} cy={y} r={r + 10} fill="none" stroke="#C5A059" strokeWidth="1" opacity="0.3" />}
        </g>
      ))}
    </svg>
  );
}

export const BANDS = {
  ticker: TickerBand,
  globe: GlobeBand,
  policy: PolicyBand,
  archive: ArchiveBand,
  network: NetworkBand,
} as const;

export type BandName = keyof typeof BANDS;
