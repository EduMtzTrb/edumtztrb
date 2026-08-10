"use client";

import { useRef, useState } from "react";

import { Action } from "@/components/controls/Action";
import { useReducedMotion } from "@/lib/motion/capability";
import { createMotionCancellation } from "@/lib/motion/cancellation";

const registry = createMotionCancellation();
const KEY = "motion-fixture:interruption-demo";

/**
 * The C21-required interruption demonstration: start motion, trigger a
 * second intent before the first completes, and prove the latest intent
 * wins — obsolete motion never settles late and overwrites the current
 * state. Composes M4.2's real `createMotionCancellation`/`useReducedMotion`
 * directly, not a simulated stand-in.
 */
export function InterruptionDemo() {
  const [status, setStatus] = useState("idle — click to begin");
  const reduced = useReducedMotion();
  const intentCount = useRef(0);

  function trigger() {
    const id = ++intentCount.current;
    const signal = registry.begin(KEY);
    setStatus(`intent #${id} started…`);

    const settle = () => {
      // A superseded signal must never overwrite the latest state.
      if (!registry.isActive(KEY, signal)) return;
      setStatus(`intent #${id} settled — latest intent won`);
    };

    if (reduced) {
      // Reduced motion bypasses the nonessential delay entirely.
      settle();
    } else {
      window.setTimeout(settle, 400);
    }
  }

  return (
    <div>
      <Action level="secondary" onClick={trigger}>
        Trigger motion (click rapidly to test interruption)
      </Action>
      <p role="status">{status}</p>
    </div>
  );
}
