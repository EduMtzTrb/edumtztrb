"use client";

import { useState } from "react";

import { RadioGroup, type RadioOption } from "@/components/selection/RadioGroup";
import { Comparison, type ComparisonRow } from "./Comparison";
import { captureReturnContext, retrieveReturnContext } from "@/lib/return/returnMemory";

const COMPARISON_RETURN_KEY = "m4.10-lab-comparison";

interface Attempt {
  name: string;
  input: string;
  method: string;
  result: string;
  status: string;
}

const ATTEMPTS: Record<string, Attempt> = {
  "attempt-a": {
    name: "Attempt A",
    input: "Baseline dataset",
    method: "Method 1",
    result: "Partial success",
    status: "Stable",
  },
  "attempt-b": {
    name: "Attempt B",
    input: "Augmented dataset",
    method: "Method 2",
    result: "Full success",
    status: "Stable",
  },
  "attempt-c": {
    name: "Attempt C",
    input: "Baseline dataset",
    method: "Method 2",
    result: "Failed",
    status: "Unstable",
  },
};

const ATTEMPT_OPTIONS: RadioOption[] = Object.entries(ATTEMPTS).map(([value, attempt]) => ({
  value,
  label: attempt.name,
}));

function isComparisonState(value: unknown): value is { left: string; right: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { left?: unknown }).left === "string" &&
    typeof (value as { right?: unknown }).right === "string"
  );
}

/**
 * LabComparisonFixture — M4.10 §C2. Fixture-labeled Lab experiment
 * attempts (never real experiment claims) compared across a fixed,
 * shared schema (input/method/result/status) — the same rows for either
 * side, guaranteed by `Comparison`'s own table structure.
 *
 * Demonstrates M4.6's `comparisonState` field with a real consumer for
 * the first time (§C7) — Save writes the current pair via
 * `captureReturnContext`; Restore reads it back through the same,
 * unmodified `retrieveReturnContext`. No second comparison store exists.
 */
export function LabComparisonFixture() {
  const [left, setLeft] = useState("attempt-a");
  const [right, setRight] = useState("attempt-b");
  const [status, setStatus] = useState("No saved comparison yet.");

  function handleSave() {
    captureReturnContext(COMPARISON_RETURN_KEY, {
      originUrl: window.location.pathname + window.location.search,
      comparisonState: { left, right },
    });
    setStatus(`Saved: comparing ${ATTEMPTS[left]!.name} vs ${ATTEMPTS[right]!.name}.`);
  }

  function handleRestore() {
    const saved = retrieveReturnContext(COMPARISON_RETURN_KEY);
    if (!saved || !isComparisonState(saved.comparisonState)) {
      setStatus("No saved comparison to restore.");
      return;
    }
    const { left: savedLeft, right: savedRight } = saved.comparisonState;
    setLeft(savedLeft);
    setRight(savedRight);
    setStatus(`Restored: comparing ${ATTEMPTS[savedLeft]!.name} vs ${ATTEMPTS[savedRight]!.name}.`);
  }

  const rows: ComparisonRow[] = [
    { label: "Input", left: ATTEMPTS[left]!.input, right: ATTEMPTS[right]!.input },
    { label: "Method", left: ATTEMPTS[left]!.method, right: ATTEMPTS[right]!.method },
    { label: "Result", left: ATTEMPTS[left]!.result, right: ATTEMPTS[right]!.result },
    { label: "Status", left: ATTEMPTS[left]!.status, right: ATTEMPTS[right]!.status },
  ];

  return (
    <div>
      <p>Fixture: not a real experiment record.</p>
      <RadioGroup
        label="Left attempt"
        name="comparison-left"
        value={left}
        onChange={setLeft}
        options={ATTEMPT_OPTIONS}
      />
      <RadioGroup
        label="Right attempt"
        name="comparison-right"
        value={right}
        onChange={setRight}
        options={ATTEMPT_OPTIONS}
      />
      <Comparison
        leftHeading={ATTEMPTS[left]!.name}
        rightHeading={ATTEMPTS[right]!.name}
        rows={rows}
      />
      <button type="button" className="action-secondary type-label" onClick={handleSave}>
        Save this comparison
      </button>
      <button type="button" className="action-tertiary type-label" onClick={handleRestore}>
        Restore saved comparison
      </button>
      <p role="status">{status}</p>
    </div>
  );
}
