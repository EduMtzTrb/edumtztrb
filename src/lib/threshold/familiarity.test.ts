import { afterEach, describe, expect, it, vi } from "vitest";

import {
  clearThresholdArrival,
  hasTraversedThreshold,
  markThresholdDeparture,
  markThresholdTraversed,
  peekThresholdArrival,
} from "./familiarity";

afterEach(() => {
  window.sessionStorage.clear();
});

describe("familiarity (M4.9 §B7)", () => {
  it("a threshold starts untraversed", () => {
    expect(hasTraversedThreshold("home-work")).toBe(false);
  });

  it("markThresholdTraversed persists for the rest of the session", () => {
    markThresholdTraversed("home-work");
    expect(hasTraversedThreshold("home-work")).toBe(true);
  });

  it("peekThresholdArrival starts false and does not mutate anything", () => {
    expect(peekThresholdArrival("home-work:to-work")).toBe(false);
    expect(peekThresholdArrival("home-work:to-work")).toBe(false);
  });

  it("markThresholdDeparture sets a pending arrival, readable by peek without consuming it", () => {
    markThresholdDeparture("home-work:to-work");
    expect(peekThresholdArrival("home-work:to-work")).toBe(true);
    expect(peekThresholdArrival("home-work:to-work")).toBe(true);
  });

  it("clearThresholdArrival consumes the pending arrival", () => {
    markThresholdDeparture("home-work:to-work");
    clearThresholdArrival("home-work:to-work");
    expect(peekThresholdArrival("home-work:to-work")).toBe(false);
  });

  it("is genuinely session-scoped — backed by sessionStorage, never localStorage", () => {
    const localStorageSpy = vi.spyOn(window.localStorage, "setItem");
    markThresholdTraversed("home-work");
    markThresholdDeparture("home-work:to-work");
    expect(localStorageSpy).not.toHaveBeenCalled();
    localStorageSpy.mockRestore();
  });

  it("uses a storage namespace entirely separate from M4.6 Return memory", () => {
    markThresholdTraversed("home-work");
    markThresholdDeparture("home-work:to-work");
    const keys: string[] = [];
    for (let i = 0; i < window.sessionStorage.length; i++) {
      keys.push(window.sessionStorage.key(i)!);
    }
    for (const key of keys) {
      expect(key).not.toMatch(/^m4-return-memory:/);
    }
  });
});
