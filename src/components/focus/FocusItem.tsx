"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

import { useFocusRegion } from "./FocusRegion";

export interface FocusItemProps {
  /** Unique within the enclosing FocusRegion. */
  focusKey: string;
  /** Accessible label for this item — used to build the control's name. */
  label: string;
  /** Always-visible content, present regardless of focus state. */
  summary: ReactNode;
  /**
   * The concentrated content — rendered only while this item is active.
   * Genuine additional content, never a zoomed/enlarged copy of `summary`
   * (§A3: "the focused object should not suddenly become theatrical").
   */
  detail: ReactNode;
}

/**
 * FocusItem — M4.4. One item within a `FocusRegion`: a single control
 * toggles this item between neutral/active/receding, doubling as both the
 * opening trigger and the exit affordance. Because it is the same DOM node
 * throughout, DOM focus never has to jump anywhere on open or move back
 * anywhere on close (§A5's "meaningful focus target" is simply this
 * control itself) — no focus-trap, no detached-node risk, no modal
 * semantics. Native `<button>` activation already covers keyboard
 * (Enter/Space) and touch/pointer (tap/click) identically (§A5/§A6).
 */
export function FocusItem({ focusKey, label, summary, detail }: FocusItemProps) {
  const region = useFocusRegion();
  const active = region.isActive(focusKey);
  const receding = region.isReceding(focusKey);
  const controlRef = useRef<HTMLButtonElement>(null);

  const state = active ? "active" : receding ? "receding" : "neutral";

  function handleToggle() {
    if (active) {
      region.close();
    } else {
      region.open(focusKey, controlRef.current);
    }
  }

  return (
    <div data-focus-state={state}>
      {summary}
      {active && detail}
      <button type="button" ref={controlRef} onClick={handleToggle} aria-expanded={active}>
        {active ? `Exit focus: ${label}` : `Focus: ${label}`}
      </button>
    </div>
  );
}
