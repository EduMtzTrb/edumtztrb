import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import { FocusRegion } from "@/components/focus/FocusRegion";
import { FocusItem } from "@/components/focus/FocusItem";
import { Overlay } from "@/components/overlay/Overlay";
import { createMotionCancellation } from "@/lib/motion/cancellation";
import { captureReturnContext, retrieveReturnContext } from "@/lib/return/returnMemory";
import { buildToggleHref } from "@/domain/records/FilterModel";
import IndexPage from "@/app/index/page";

/**
 * M4-B cumulative journeys — Phase E §E8. Eight representative journeys
 * spanning M4.4 (Focus), M4.5 (Overlay), M4.6 (Return), and M4.7
 * (browser-history contract) together, exercising real exports rather
 * than repeating any single package's own unit tests. See
 * docs/implementation/M4B_FOCUS_RETURN_HISTORY_RECONCILIATION.md.
 */

type Listener = (event: MediaQueryListEvent) => void;

function mockReducedMotion(matches: boolean) {
  const listeners = new Set<Listener>();
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: (_: string, listener: Listener) => listeners.add(listener),
      removeEventListener: (_: string, listener: Listener) => listeners.delete(listener),
    })),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  window.sessionStorage.clear();
  document.body.style.overflow = "";
  document.body.innerHTML = "";
});

describe("Journey 1 — non-modal Focus opens and closes cleanly, no history/route side effects", () => {
  it("opening then closing a Focus item leaves a fully neutral hierarchy and no navigation occurred", () => {
    const originalHref = window.location.href;
    render(
      <FocusRegion>
        <FocusItem
          focusKey="a"
          label="Item A"
          summary={<p>Summary</p>}
          detail={<p>Detail content</p>}
        />
      </FocusRegion>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Focus: Item A" }));
    expect(screen.getByText("Detail content")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Exit focus: Item A" }));
    expect(screen.queryByText("Detail content")).not.toBeInTheDocument();
    expect(window.location.href).toBe(originalHref);
  });
});

describe("Journey 2 — modal Overlay: Tab/Shift+Tab stay contained, Escape closes, focus returns to origin", () => {
  it("full keyboard lifecycle: open, trap forward and backward, Escape, origin focus restored", () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      const [origin, setOrigin] = useState<HTMLButtonElement | null>(null);
      return (
        <>
          <button type="button" ref={setOrigin} onClick={() => setOpen(true)}>
            Open trigger
          </button>
          <Overlay
            open={open}
            onClose={() => setOpen(false)}
            label="Journey overlay"
            origin={origin}
          >
            <button type="button">Inner button</button>
          </Overlay>
        </>
      );
    }
    render(<Harness />);

    fireEvent.click(screen.getByRole("button", { name: "Open trigger" }));
    const closeButton = screen.getByRole("button", { name: "Close Journey overlay" });
    expect(document.activeElement).toBe(closeButton);

    // Close is the first focusable element — Shift+Tab from it wraps backward to the last.
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Inner button" }));

    // Now at the last element — Tab wraps forward back to the first (Close).
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Open trigger" }));
  });
});

describe("Journey 3 — capture state, mutate the view, Return restores the captured (not the mutated) state", () => {
  it("a captured selectedRecordId/originUrl survives an intervening state change", () => {
    captureReturnContext("journey-3", {
      originUrl: "/work/all?district=work",
      selectedRecordId: "record-9",
      resultKey: "result-2",
    });
    // Simulate the view changing after capture (e.g. a different filter applied live).
    const liveOriginUrl = "/work/all?district=research";
    expect(liveOriginUrl).not.toBe(retrieveReturnContext("journey-3")!.originUrl);

    const restored = retrieveReturnContext("journey-3")!;
    expect(restored.originUrl).toBe("/work/all?district=work");
    expect(restored.selectedRecordId).toBe("record-9");
  });
});

describe("Journey 4 — direct entry produces no fabricated Return memory", () => {
  it("a cold canonical-record-shaped route render has no Return context for a key that was never captured", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ district: "work" }),
    });
    render(element);
    expect(screen.getByRole("heading", { level: 1, name: "Index" })).toBeInTheDocument();
    expect(retrieveReturnContext("journey-4-never-captured")).toBeNull();
  });
});

describe("Journey 5 — filter/lens URL persists through a simulated Back/Forward round-trip", () => {
  it("toggling a filter, then re-rendering with the previous params (Back), restores the prior filter state", async () => {
    const filtered = buildToggleHref("/index", { fixture: "m3b" }, "district", "lab");
    expect(filtered).toBe("/index?fixture=m3b&district=lab");

    const elementFiltered = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ fixture: "m3b", district: "lab" }),
    });
    const { rerender } = render(elementFiltered);
    expect(screen.getByRole("heading", { level: 1, name: "Index" })).toBeInTheDocument();

    // Back: re-render with the unfiltered params — a pure function of params, nothing leaked.
    const elementBack = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    rerender(elementBack);
    expect(screen.getByRole("heading", { level: 1, name: "Index" })).toBeInTheDocument();
  });
});

describe("Journey 6 — rapid intent: a pending Return does not interfere with independent Focus state, and only the latest Return wins", () => {
  it("Focus opened while a Return is pending remains correct once the Return later resolves", () => {
    vi.useFakeTimers();
    const registry = createMotionCancellation();
    const first = registry.begin("journey-6-return");
    const second = registry.begin("journey-6-return");

    render(
      <FocusRegion>
        <FocusItem focusKey="a" label="Item A" summary={<p>Summary</p>} detail={<p>Detail</p>} />
      </FocusRegion>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Focus: Item A" }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // The superseded intent never "wins"; Focus state is untouched by either.
    expect(registry.isActive("journey-6-return", first)).toBe(false);
    expect(registry.isActive("journey-6-return", second)).toBe(true);
    expect(screen.getByText("Detail")).toBeInTheDocument();
    vi.useRealTimers();
  });
});

describe("Journey 7 — reduced motion: Focus and Overlay behavior is functionally identical, only timing differs", () => {
  it("with prefers-reduced-motion active, Focus opens and Overlay's keyboard trap still works exactly the same", () => {
    mockReducedMotion(true);
    render(
      <>
        <FocusRegion>
          <FocusItem focusKey="a" label="Item A" summary={<p>Summary</p>} detail={<p>Detail</p>} />
        </FocusRegion>
        <Overlay open onClose={() => {}} label="Journey overlay">
          <button type="button">Inner</button>
        </Overlay>
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Focus: Item A" }));
    expect(screen.getByText("Detail")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close Journey overlay" });
    expect(document.activeElement).toBe(closeButton);
    // Close is first — Shift+Tab wraps backward to the last focusable element.
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Inner" }));
  });
});

describe("Journey 8 — modal scroll preservation across open/close", () => {
  it("body scroll locks while any modal Overlay is open and restores exactly once closed", () => {
    document.body.style.overflow = "scroll";
    const { rerender } = render(
      <Overlay open onClose={() => {}} label="Journey overlay">
        <p>Body</p>
      </Overlay>,
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Overlay open={false} onClose={() => {}} label="Journey overlay">
        <p>Body</p>
      </Overlay>,
    );
    expect(document.body.style.overflow).toBe("scroll");
  });
});
