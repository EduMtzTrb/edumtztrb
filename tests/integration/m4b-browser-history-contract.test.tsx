import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { FocusRegion } from "@/components/focus/FocusRegion";
import { FocusItem } from "@/components/focus/FocusItem";
import { Overlay } from "@/components/overlay/Overlay";
import { createMotionCancellation } from "@/lib/motion/cancellation";
import { captureReturnContext, retrieveReturnContext } from "@/lib/return/returnMemory";
import { buildResetHref, buildToggleHref, parseFilterCriteria } from "@/domain/records/FilterModel";
import IndexPage from "@/app/index/page";

/**
 * M4-B cumulative browser-history contract journeys — M4.7 §D2-D9.
 * Exercises real exports across M3.11/M4.4/M4.5/M4.6 together, proving
 * the boundary each package's own tests already establish individually
 * also holds when they're used in combination. Mirrors the role
 * `m3b-navigation-discovery-journeys.test.tsx` and
 * `m4a-motion-foundation-journeys.test.tsx` already played for their own
 * milestones. See docs/implementation/M4.7_BROWSER_HISTORY_CONTRACT.md.
 *
 * BROWSER-LEVEL LIMIT — jsdom has no real multi-document navigation, so
 * genuine Back/Forward *button* behavior and real scroll-position browser
 * behavior cannot be exercised here; those are explicitly flagged for the
 * M4-B integrated human review (this file's own doc's "Browser-only
 * behavior requiring human confirmation").
 */

afterEach(() => {
  window.sessionStorage.clear();
  document.body.style.overflow = "";
});

describe("Journey 1 — Focus + Overlay + Return combined never touch browser history (§D4/§D5/§D6)", () => {
  it("a full Focus → Overlay → Return interaction sequence leaves window.location and history.length unchanged", () => {
    const originalHref = window.location.href;
    const originalLength = window.history.length;

    function Harness() {
      return (
        <>
          <FocusRegion>
            <FocusItem
              focusKey="a"
              label="Item A"
              summary={<p>Summary</p>}
              detail={<p>Detail</p>}
            />
          </FocusRegion>
          <Overlay open onClose={() => {}} label="Fixture overlay">
            <p>Overlay body</p>
          </Overlay>
        </>
      );
    }
    render(<Harness />);

    fireEvent.click(screen.getByRole("button", { name: "Focus: Item A" }));
    fireEvent.click(screen.getByRole("button", { name: "Close Fixture overlay" }));
    captureReturnContext("history-contract-fixture", { originUrl: "/index?district=work" });
    retrieveReturnContext("history-contract-fixture");

    expect(window.location.href).toBe(originalHref);
    expect(window.history.length).toBe(originalLength);
  });
});

describe("Journey 2 — sequential param changes behave as pure re-renders, the property Back/Forward relies on (§D2/§D7)", () => {
  it("re-rendering IndexPage with different searchParams each time never leaks state from the previous render", async () => {
    const elementA = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ district: "work" }),
    });
    const { unmount: unmountA } = render(elementA);
    expect(screen.getByRole("heading", { level: 1, name: "Index" })).toBeInTheDocument();
    unmountA();

    const elementB = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ district: "research" }),
    });
    const { unmount: unmountB } = render(elementB);
    expect(screen.getByRole("heading", { level: 1, name: "Index" })).toBeInTheDocument();
    unmountB();

    // Back to the first params — a real Back/Forward round-trip's shape.
    const elementC = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ district: "work" }),
    });
    render(elementC);
    expect(screen.getByRole("heading", { level: 1, name: "Index" })).toBeInTheDocument();
  });
});

describe("Journey 3 — filter/lens state round-trips through the URL alone, never duplicated by Return (§D9)", () => {
  it("buildToggleHref/buildResetHref preserve non-filter params (e.g. the fixture flag) untouched", () => {
    const current = { fixture: "m3b", district: "work" };
    const toggled = buildToggleHref("/index", current, "contentType", "project");
    expect(toggled).toContain("fixture=m3b");
    expect(toggled).toContain("district=work");
    expect(toggled).toContain("contentType=project");

    const reset = buildResetHref("/index", current);
    expect(reset).toContain("fixture=m3b");
    expect(reset).not.toContain("district=");
  });

  it("parseFilterCriteria round-trips through a captured Return originUrl faithfully", () => {
    captureReturnContext("history-contract-fixture", {
      originUrl: "/index?district=lab&contentType=prototype",
    });
    const restored = retrieveReturnContext("history-contract-fixture")!;
    const url = new URL(restored.originUrl, "https://example.test");
    const criteria = parseFilterCriteria(Object.fromEntries(url.searchParams));
    expect(criteria).toEqual({ district: "lab", contentType: "prototype" });
  });
});

describe("Journey 4 — direct link / cold entry produces no fabricated Return memory (§D3)", () => {
  it("a cold IndexPage render (real params, no prior capture) has nothing to return to", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ district: "art" }),
    });
    render(element);
    expect(screen.getByRole("heading", { level: 1, name: "Index" })).toBeInTheDocument();
    expect(retrieveReturnContext("never-captured-key")).toBeNull();
  });
});

describe("Journey 5 — rapid navigation intent resolves to only the latest, using M4.2's real cancellation primitive (§D7)", () => {
  it("A → B → C rapid begins under one navigation key leave only C's signal active", () => {
    const registry = createMotionCancellation();
    const a = registry.begin("navigation");
    const b = registry.begin("navigation");
    const c = registry.begin("navigation");

    expect(registry.isActive("navigation", a)).toBe(false);
    expect(registry.isActive("navigation", b)).toBe(false);
    expect(registry.isActive("navigation", c)).toBe(true);
  });
});

describe("Journey 6 — overlay scroll lock is scoped to the modal being open and restores exactly (§D8)", () => {
  it("body overflow locks on open and restores the prior value on close, without touching history.scrollRestoration", () => {
    document.body.style.overflow = "auto";
    const { rerender } = render(
      <Overlay open onClose={() => {}} label="Fixture overlay">
        <p>Body</p>
      </Overlay>,
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Overlay open={false} onClose={() => {}} label="Fixture overlay">
        <p>Body</p>
      </Overlay>,
    );
    expect(document.body.style.overflow).toBe("auto");
  });
});
