"use client";

import { useEffect, useSyncExternalStore } from "react";

import {
  clearThresholdArrival,
  hasTraversedThreshold,
  markThresholdTraversed,
  peekThresholdArrival,
} from "@/lib/threshold/familiarity";
import { HOME_WORK_THRESHOLD_KEY } from "@/lib/threshold/thresholdKeys";

/**
 * ThresholdIndicator — M4.9. The arrival-side half of the Home-threshold
 * prototype. Renders nothing on direct/cold entry (§B9: "no Return
 * control pretending Index was previously visited," the same law applied
 * here to threshold passage) — only a genuine departure from the paired
 * `ThresholdLink` produces a visible indicator.
 *
 * Built on `useSyncExternalStore` (the same SSR-safe pattern M4.2's
 * `useReducedMotion` and M4.8's `RecordReturnControl` already
 * established) with a side-effect-free snapshot function — the actual
 * state mutation (consuming the arrival flag, marking the threshold
 * traversed) happens in a plain `useEffect` that calls no React state
 * setter, so it does not trigger this repository's
 * `react-hooks/set-state-in-effect` rule.
 *
 * First entry shows a richer, two-clause message (§B5); repeated entry
 * shows a shorter, single-clause one — "reduced assembly," one of this
 * task's own explicitly acceptable forms of repeated-entry efficiency
 * (§B6). The CSS transition duration also drops one tier between the two
 * states (`focus.css`-adjacent discipline: existing, already-approved
 * M4.1 tokens only, no new tier invented) — see
 * docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md for the audit of
 * why no new "District Passage" token was introduced.
 */
export type ThresholdEntryState = "direct" | "first-entry" | "repeated-entry";

interface ThresholdIndicatorProps {
  arrivalKey: string;
  /** The richer, first-entry message. */
  label: string;
  /** The shorter, repeated-entry message — reduced assembly, not a replay of `label`. */
  repeatedLabel: string;
}

function subscribe(): () => void {
  return () => {};
}

function getServerSnapshot(): ThresholdEntryState {
  return "direct";
}

export function ThresholdIndicator({ arrivalKey, label, repeatedLabel }: ThresholdIndicatorProps) {
  const snapshot = useSyncExternalStore(
    subscribe,
    (): ThresholdEntryState => {
      if (!peekThresholdArrival(arrivalKey)) return "direct";
      return hasTraversedThreshold(HOME_WORK_THRESHOLD_KEY) ? "repeated-entry" : "first-entry";
    },
    getServerSnapshot,
  );

  useEffect(() => {
    if (snapshot === "direct") return;
    clearThresholdArrival(arrivalKey);
    markThresholdTraversed(HOME_WORK_THRESHOLD_KEY);
  }, [snapshot, arrivalKey]);

  if (snapshot === "direct") return null;

  return (
    <p data-threshold-state={snapshot} role="status">
      {snapshot === "first-entry" ? label : repeatedLabel}
    </p>
  );
}
