"use client";

import { useRef, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/lib/motion/capability";
import { retrieveReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

/**
 * RecordPassageArrival — M4.8 reconciliation. Gives the Index → canonical
 * record journey a genuine, restrained Record Passage treatment
 * (`ANIMATION_SYSTEM.md` §5.2/§9.5), not just navigation + Return memory.
 *
 * GENUINE-PASSAGE DETECTION, NOT FABRICATION — reuses the exact check
 * `RecordReturnControl` already established: a real captured Return
 * context whose `resultKey` matches this exact record's slug. A cold or
 * direct entry (no capture, or a capture belonging to a different
 * record) renders `children` completely unwrapped — no anchor, no data
 * attribute, no motion of any kind. Detected via `useSyncExternalStore`
 * (the same SSR-safe pattern `RecordReturnControl`/`ThresholdIndicator`
 * already established) — the snapshot is side-effect-free, so it never
 * triggers this repository's `react-hooks/set-state-in-effect` rule.
 *
 * A REAL, VISIBLE TWO-FRAME TRANSITION, WITHOUT SETSTATE-IN-EFFECT —
 * mounting a brand-new DOM node already at its final CSS values produces
 * no visible transition in any browser (there is no prior value to
 * animate from, without relying on `@starting-style`, which this
 * repository does not use — see M4.5's own documented reasoning).
 * Sequencing "arriving → settled" one frame later would normally need an
 * effect calling `setState`, exactly the pattern this repository's own
 * ESLint config flags. Instead, a ref callback — which React invokes
 * synchronously during the commit phase, not as a passive effect —
 * mutates the DOM attribute directly via `setAttribute` and schedules the
 * one-frame-later flip via `requestAnimationFrame`. No React state is
 * involved in the sequencing at all, so there is nothing for the lint
 * rule to flag, and nothing for a later, unrelated re-render to fight
 * over (the initial JSX attribute and the ref callback's first write
 * always agree).
 *
 * NO NAVIGATION DELAY — the canonical route's real content (`children`)
 * is always rendered immediately and completely; only the small anchor's
 * own presentation is ever conditional. Nothing here gates access to the
 * record itself.
 *
 * REDUCED MOTION — consumes M4.2's centralized `useReducedMotion()`
 * directly (no component-local `matchMedia`). When active, the anchor
 * mounts straight at "settled" and the ref callback does nothing further
 * — the "arriving" visual values never apply at all. The shared anchor
 * itself is still shown immediately — "Passage → concise replacement
 * preserving shared anchors" (§28), not an absence of Passage.
 */
export interface RecordPassageArrivalProps {
  entrySlug: string;
  recordTitle: string;
  children: ReactNode;
}

function hasGenuinePassage(entrySlug: string): boolean {
  const captured = retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY);
  return captured !== null && captured.resultKey === entrySlug;
}

function subscribe(): () => void {
  return () => {};
}

function getServerSnapshot(): boolean {
  return false;
}

export function RecordPassageArrival({
  entrySlug,
  recordTitle,
  children,
}: RecordPassageArrivalProps) {
  const reducedMotion = useReducedMotion();
  const genuinePassage = useSyncExternalStore(
    subscribe,
    () => hasGenuinePassage(entrySlug),
    getServerSnapshot,
  );
  const settling = useRef(false);

  function attachArrivalNode(node: HTMLDivElement | null) {
    if (!node || reducedMotion || settling.current) return;
    settling.current = true;
    requestAnimationFrame(() => {
      node.setAttribute("data-record-passage-state", "settled");
    });
  }

  if (!genuinePassage) {
    return <>{children}</>;
  }

  return (
    <div ref={attachArrivalNode} data-record-passage-state={reducedMotion ? "settled" : "arriving"}>
      <p className="record-passage-anchor" role="status">
        {`Arrived from Index — ${recordTitle}`}
      </p>
      {children}
    </div>
  );
}
