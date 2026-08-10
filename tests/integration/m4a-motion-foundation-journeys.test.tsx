import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { Checkbox } from "@/components/selection/Checkbox";
import { FilterToggle } from "@/components/selection/FilterToggle";
import { InterruptionDemo } from "@/components/motion/InterruptionDemo";
import { createMotionCancellation } from "@/lib/motion/cancellation";
import { prefersReducedMotion } from "@/lib/motion/capability";
import IndexPage from "@/app/index/page";
import SearchPage from "@/app/search/page";
import WorkPage from "@/app/work/page";

/**
 * M4-A cumulative integration journeys — Phase D §D9. Exercises the real
 * token → capability → consumer chain together, across M4.1/M4.2/M4.3
 * package boundaries, rather than repeating any single package's own unit
 * tests. Mirrors the M3B journeys file's role for Milestone 3. See
 * docs/implementation/M4A_MOTION_FOUNDATIONS_RECONCILIATION.md.
 */

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
    fire(matches: boolean) {
      mql.matches = matches;
      for (const listener of listeners) listener({ matches } as MediaQueryListEvent);
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Journey 1 — real consumers still function with M4.3 motion CSS applied", () => {
  it("Checkbox and FilterToggle (M2.6, both gained transitions in M4.3) still toggle state correctly", () => {
    const onCheckboxChange = vi.fn();
    render(<Checkbox label="Include archived" onChange={onCheckboxChange} />);
    const checkbox = screen.getByRole("checkbox", { name: "Include archived" });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(onCheckboxChange).toHaveBeenCalledTimes(1);

    function ControlledToggle() {
      return <FilterToggle selected={true}>District: Work</FilterToggle>;
    }
    render(<ControlledToggle />);
    const toggle = screen.getByRole("button", { name: "District: Work" });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Journey 2 — reduced motion (M4.2) is read correctly by a real M4.3 consumer end-to-end", () => {
  it("with no preference, a triggered interaction settles only after the nonessential delay", () => {
    mockMatchMedia(false);
    vi.useFakeTimers();
    render(<InterruptionDemo />);
    fireEvent.click(screen.getByRole("button", { name: /trigger motion/i }));
    expect(screen.getByText(/intent #1 started/i)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByText(/intent #1 settled/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("with reduced motion preferred, the same interaction settles immediately — no timer wait required", () => {
    mockMatchMedia(true);
    render(<InterruptionDemo />);
    fireEvent.click(screen.getByRole("button", { name: /trigger motion/i }));
    // No fake timers, no advance — settles synchronously.
    expect(screen.getByText(/intent #1 settled/i)).toBeInTheDocument();
  });
});

describe("Journey 3 — rapid user intent (M4.2 cancellation) always resolves to a stable final state", () => {
  it("five rapid begins under one key leave exactly one active signal — the last one issued", () => {
    const registry = createMotionCancellation();
    const signals = Array.from({ length: 5 }, () => registry.begin("journey-key"));
    for (let i = 0; i < signals.length - 1; i++) {
      expect(registry.isActive("journey-key", signals[i]!)).toBe(false);
      expect(signals[i]!.aborted).toBe(true);
    }
    expect(registry.isActive("journey-key", signals[signals.length - 1]!)).toBe(true);
  });

  it("rapid re-triggers on a real consumer resolve to only the latest intent's message", () => {
    mockMatchMedia(false);
    vi.useFakeTimers();
    render(<InterruptionDemo />);
    const trigger = screen.getByRole("button", { name: /trigger motion/i });
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByText(/intent #3 settled/i)).toBeInTheDocument();
    expect(screen.queryByText(/intent #1 settled/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/intent #2 settled/i)).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});

describe("Journey 4 — token chain integrity: --motion- consumption is confined to audited consumers", () => {
  function collectCssFiles(dir: string): string[] {
    const entries = readdirSync(dir, { withFileTypes: true });
    let files: string[] = [];
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) files = files.concat(collectCssFiles(full));
      else if (entry.name.endsWith(".css")) files.push(full);
    }
    return files;
  }

  // [M4.4/M4.5 reconciliation] This M4-A-era assertion originally listed
  // only M4.3's consumers (controls/selection/form.css). M4.4 — Focus +
  // Recession (focus.css) and M4.5 — Overlay Mechanics (overlay.css,
  // whose backdrop reuses --motion-recession-overlay rather than a new
  // value) are both authorized, audited, source-contract-tested new
  // territory (see docs/implementation/M4.4_FOCUS_RECESSION.md and
  // M4.5_OVERLAY_MECHANICS.md) — added here rather than left to silently
  // fail, the same reconciliation discipline M4.3 applied to the M2-era
  // "no transition" CSS contracts.
  it("only motion.css (declaration) and its audited real consumers (controls/selection/form/focus/overlay.css) reference --motion- tokens", () => {
    const styleFiles = collectCssFiles(join(process.cwd(), "src", "styles"));
    const globalsPath = join(process.cwd(), "src", "app", "globals.css");
    const allFiles = [...styleFiles, globalsPath];

    const permittedBasenames = new Set([
      "motion.css",
      "controls.css",
      "selection.css",
      "form.css",
      "focus.css",
      "overlay.css",
    ]);

    for (const file of allFiles) {
      const basename = file.split(/[\\/]/).pop()!;
      const source = readFileSync(file, "utf-8");
      const referencesMotionToken = /--motion-/.test(source);
      if (referencesMotionToken) {
        expect(
          permittedBasenames.has(basename),
          `unexpected --motion- reference in ${file} — audited consumers are controls.css/selection.css/form.css/focus.css/overlay.css only`,
        ).toBe(true);
      }
    }
  });
});

describe("Journey 5 — M1–M3 regression: real M3-B routes are unaffected by M4.1–M4.3", () => {
  it("Work district root, Index, and Search all still render their identifying heading", async () => {
    render(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Work" })).toBeInTheDocument();

    const indexElement = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
    render(indexElement);
    expect(screen.getByRole("heading", { level: 1, name: "Index" })).toBeInTheDocument();

    const searchElement = await SearchPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
    render(searchElement);
    expect(screen.getByRole("heading", { level: 1, name: "Search" })).toBeInTheDocument();
  });
});

describe("Journey 6 — capability model composes cleanly (token → capability → consumer, one flow)", () => {
  it("prefersReducedMotion (M4.2) and createMotionCancellation (M4.2) combine without conflict in one consumer-shaped flow", () => {
    mockMatchMedia(true);
    const registry = createMotionCancellation();
    const signal = registry.begin("combined-flow");
    const shouldSkipDelay = prefersReducedMotion();
    expect(shouldSkipDelay).toBe(true);
    expect(registry.isActive("combined-flow", signal)).toBe(true);
  });
});
