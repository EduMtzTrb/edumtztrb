"use client";

import { useRef, useState } from "react";

import { createMotionCancellation } from "@/lib/motion/cancellation";
import {
  captureReturnContext,
  restoreFocusByKey,
  restoreScroll,
  retrieveReturnContext,
  type ReturnContext,
} from "@/lib/return/returnMemory";
import styles from "./ReturnMemoryFixture.module.css";

const FIXTURE_KEY = "motion-fixture:return-memory";
const registry = createMotionCancellation();

/**
 * M4-B development review fixture — M4.6 §C12. Demonstrates capture,
 * cold-entry (no fake memory), Return restoring the *captured* state even
 * after the live fixture state has since changed, and rapid re-Return
 * resolving to only the latest intent — composing M4.2's real
 * `createMotionCancellation` directly, the same discipline M4.3's
 * `InterruptionDemo` established for local feedback, applied here to a
 * genuinely async restoration (simulating the post-navigation layout
 * readiness §C7 requires accounting for). Development-only, same
 * `?motion-fixture=m4b` gate — see `src/lib/motion/fixtureGate.ts` and
 * `src/app/contact/page.tsx`.
 */
export function ReturnMemoryFixture() {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState("No context captured yet — try Return now (cold entry).");
  const [restored, setRestored] = useState<ReturnContext | null>(null);
  const intentCount = useRef(0);

  function handleCapture() {
    captureReturnContext(FIXTURE_KEY, {
      originUrl: `/index?fixture=m3b&expanded=${expanded}`,
      parentDistrict: "work",
      selectedRecordId: "fixture-record-7",
      resultKey: "fixture-result-3",
      scrollY: typeof window !== "undefined" ? window.scrollY : 0,
      originControlKey: "return-fixture-origin",
      comparisonState: { left: "fixture-a", right: "fixture-b" },
      galleryPosition: 2,
      expandedIds: expanded ? ["fixture-section"] : [],
    });
    setStatus('Captured. Try toggling "expanded" below, then Return — the old value restores.');
  }

  function handleReturn() {
    const context = retrieveReturnContext(FIXTURE_KEY);
    if (!context) {
      setStatus("No captured context — nothing to return to (cold entry, not fabricated).");
      setRestored(null);
      return;
    }

    const id = ++intentCount.current;
    const signal = registry.begin(FIXTURE_KEY);
    setStatus(`Returning… (intent #${id})`);

    const settle = () => {
      // A superseded signal must never overwrite the latest state (§C11).
      if (!registry.isActive(FIXTURE_KEY, signal)) return;
      restoreScroll(context.scrollY);
      restoreFocusByKey(context.originControlKey);
      setRestored(context);
      setStatus(`Returned — intent #${id} settled.`);
    };
    // Simulates waiting for post-navigation content/layout readiness before
    // restoring scroll/focus (§C7) — never an animated/smooth scroll itself.
    window.setTimeout(settle, 300);
  }

  return (
    <div className={styles.returnFixtureRoot}>
      <p>
        Fixture: not real navigation. Current live state — expanded:{" "}
        <strong>{String(expanded)}</strong>.
      </p>
      <button type="button" onClick={() => setExpanded((value) => !value)}>
        Toggle expanded (changes live state, not the captured one)
      </button>
      <button type="button" data-return-origin-key="return-fixture-origin" onClick={handleCapture}>
        Capture current state
      </button>
      <button type="button" onClick={handleReturn}>
        Return (click rapidly to test cancellation)
      </button>
      <p role="status">{status}</p>
      {restored && (
        <>
          <dl>
            <dt>Restored originUrl</dt>
            <dd>{restored.originUrl}</dd>
            <dt>Restored expandedIds</dt>
            <dd>{JSON.stringify(restored.expandedIds)}</dd>
            <dt>Restored selectedRecordId</dt>
            <dd>{restored.selectedRecordId}</dd>
          </dl>
          {/* A plain, native <a href> — real navigation, not a history.pushState
              trick, so Back afterward behaves like any ordinary link (M4.7 §D6). */}
          <a href={restored.originUrl}>Go to captured origin</a>
        </>
      )}
    </div>
  );
}
