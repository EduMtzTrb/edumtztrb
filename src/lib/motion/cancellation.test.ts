import { describe, expect, it } from "vitest";

import { createMotionCancellation } from "./cancellation";

describe("createMotionCancellation (M4.2)", () => {
  it("motion can start: begin() returns a fresh, non-aborted signal", () => {
    const registry = createMotionCancellation();
    const signal = registry.begin("hover:card-1");
    expect(signal.aborted).toBe(false);
    expect(registry.isActive("hover:card-1", signal)).toBe(true);
  });

  it("later intent cancels/replaces obsolete motion under the same key", () => {
    const registry = createMotionCancellation();
    const first = registry.begin("press:button-1");
    const second = registry.begin("press:button-1");

    expect(first.aborted).toBe(true);
    expect(second.aborted).toBe(false);
  });

  it("obsolete motion cannot overwrite the final latest state — isActive is false for a superseded signal", () => {
    const registry = createMotionCancellation();
    const first = registry.begin("selected:tab-1");
    registry.begin("selected:tab-1");

    expect(registry.isActive("selected:tab-1", first)).toBe(false);
  });

  it("cancellation leaves a deterministic stable state: only the latest signal is ever active", () => {
    const registry = createMotionCancellation();
    const key = "loading:panel-1";
    const signals = [registry.begin(key), registry.begin(key), registry.begin(key)];
    const activeCount = signals.filter((s) => registry.isActive(key, s)).length;
    expect(activeCount).toBe(1);
    expect(registry.isActive(key, signals[signals.length - 1])).toBe(true);
  });

  it("cancel() aborts the active motion under a key without starting a new one", () => {
    const registry = createMotionCancellation();
    const signal = registry.begin("success:form-1");
    registry.cancel("success:form-1");
    expect(signal.aborted).toBe(true);
    expect(registry.isActive("success:form-1", signal)).toBe(false);
  });

  it("independent keys never interfere with each other", () => {
    const registry = createMotionCancellation();
    const a = registry.begin("hover:a");
    const b = registry.begin("hover:b");
    expect(a.aborted).toBe(false);
    expect(b.aborted).toBe(false);
    expect(registry.isActive("hover:a", a)).toBe(true);
    expect(registry.isActive("hover:b", b)).toBe(true);
  });

  it("reduced motion may bypass nonessential animation entirely — a consumer can skip straight to isActive-gated final state with zero intermediate frames", () => {
    // Demonstrates the pattern a real M4.3 consumer uses: under reduced
    // motion, apply the final state immediately, still gated by isActive
    // so a rapid second intent still wins.
    const registry = createMotionCancellation();
    const key = "state-change:demo";
    let finalState: string | undefined;

    function applyReduced(value: string) {
      const signal = registry.begin(key);
      // No animation frame awaited — immediate under reduced motion.
      if (registry.isActive(key, signal)) finalState = value;
    }

    applyReduced("first");
    applyReduced("second");
    expect(finalState).toBe("second");
  });
});
