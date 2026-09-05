"use client";

import { useEffect, useState } from "react";
import { getPhase, nextTransition, countdownParts, type Phase } from "@/lib/competition";

export type PhaseState = {
  phase: Phase;
  /** Milliseconds until the next transition; 0 once the cycle is over. */
  remaining: number;
  parts: ReturnType<typeof countdownParts>;
};

/**
 * Phase + live countdown, resolved on the client only.
 *
 * Returns null on the server and on the first client render. Pages are
 * statically prerendered, so their HTML is frozen at build time — deriving the
 * phase during render would bake in whatever it was when the site was built and
 * mismatch on hydration. Callers render a neutral state while this is null.
 */
export function useCompetitionPhase(): PhaseState | null {
  const [state, setState] = useState<PhaseState | null>(null);

  useEffect(() => {
    const tick = () => {
      const next = nextTransition();
      const remaining = next ? next.getTime() - Date.now() : 0;
      setState({ phase: getPhase(), remaining, parts: countdownParts(remaining) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}
