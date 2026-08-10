import { afterEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import {
  isDocumentHidden,
  prefersReducedMotion,
  shouldPreferLowerCost,
  shouldRunEnvironmentalMotion,
  useReducedMotion,
} from "./capability";

type Listener = (event: MediaQueryListEvent) => void;

function mockMatchMedia(initialMatches: boolean) {
  const listeners = new Set<Listener>();
  const mql = {
    matches: initialMatches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn((_: string, listener: Listener) => listeners.add(listener)),
    removeEventListener: vi.fn((_: string, listener: Listener) => listeners.delete(listener)),
  };
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => mql),
  );
  return {
    mql,
    fire(matches: boolean) {
      mql.matches = matches;
      for (const listener of listeners) listener({ matches } as MediaQueryListEvent);
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("prefersReducedMotion (M4.2)", () => {
  it("returns false when matchMedia reports no preference", () => {
    mockMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });

  it("returns true when matchMedia reports a reduced-motion preference", () => {
    mockMatchMedia(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("returns false (SSR-safe default) when matchMedia is unavailable", () => {
    vi.stubGlobal("matchMedia", undefined);
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe("useReducedMotion (M4.2)", () => {
  it("reflects the current preference after mount", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("updates live when the preference changes", () => {
    const { fire } = mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => fire(true));
    expect(result.current).toBe(true);
  });

  it("unsubscribes on unmount", () => {
    const { mql } = mockMatchMedia(false);
    const { unmount } = renderHook(() => useReducedMotion());
    expect(mql.addEventListener).toHaveBeenCalledTimes(1);
    unmount();
    expect(mql.removeEventListener).toHaveBeenCalledTimes(1);
  });
});

describe("shouldPreferLowerCost (M4.2)", () => {
  it("is true whenever reduced motion is preferred", () => {
    mockMatchMedia(true);
    expect(shouldPreferLowerCost()).toBe(true);
  });

  it("is true when the Network Information API reports saveData, even without reduced motion", () => {
    mockMatchMedia(false);
    vi.stubGlobal("navigator", { connection: { saveData: true } });
    expect(shouldPreferLowerCost()).toBe(true);
  });

  it("is false when neither signal is present", () => {
    mockMatchMedia(false);
    expect(shouldPreferLowerCost()).toBe(false);
  });
});

describe("isDocumentHidden (M4.2)", () => {
  it("reflects document.visibilityState", () => {
    expect(isDocumentHidden()).toBe(false);
    Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
    expect(isDocumentHidden()).toBe(true);
    Object.defineProperty(document, "visibilityState", { value: "visible", configurable: true });
  });
});

describe("shouldRunEnvironmentalMotion (M4.2 §B6 contract)", () => {
  it("is true when motion is fully allowed (no reduced motion, no lower-cost preference, document visible)", () => {
    mockMatchMedia(false);
    expect(shouldRunEnvironmentalMotion()).toBe(true);
  });

  it("is false when reduced motion is preferred", () => {
    mockMatchMedia(true);
    expect(shouldRunEnvironmentalMotion()).toBe(false);
  });

  it("is false when the document is hidden, even with no other restriction", () => {
    mockMatchMedia(false);
    Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
    expect(shouldRunEnvironmentalMotion()).toBe(false);
    Object.defineProperty(document, "visibilityState", { value: "visible", configurable: true });
  });
});
