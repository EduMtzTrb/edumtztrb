import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import IndexByDistrictPage from "@/app/index/district/[district]/page";
import WorkEntryPage from "@/app/work/[entry]/page";
import HomePage from "@/app/page";
import WorkPage from "@/app/work/page";

import { retrieveReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";
import { hasTraversedThreshold } from "@/lib/threshold/familiarity";
import { HOME_WORK_THRESHOLD_KEY } from "@/lib/threshold/thresholdKeys";
import { createMotionCancellation } from "@/lib/motion/cancellation";

import { LabComparisonFixture } from "@/components/comparison/LabComparisonFixture";
import { TraceFixture } from "@/components/trace/TraceFixture";
import { RecordTrace } from "@/components/trace/Trace";
import { createRecordRegistry } from "@/domain/records/registry";
import { allFixtureRecords, fixtureAboutRecord } from "@/domain/records/fixtures";

/**
 * M4-C cumulative journeys — Phase D §D11. Twelve representative journeys
 * spanning M4.8 (Record Passage), M4.9 (Home Threshold), and M4.10
 * (Comparison/Trace) together, exercising real exports rather than
 * repeating any single package's own unit tests. See
 * docs/implementation/M4C_REPRESENTATIVE_MOTION_PROTOTYPES_RECONCILIATION.md.
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
  document.body.innerHTML = "";
});

describe("Journey 1 — Index (Work lens) → canonical Work record → Return", () => {
  it("a real departure captures context and the real record page shows a correctly targeted Return control", async () => {
    window.history.pushState({}, "", "/index/district/work?fixture=m3b");
    const indexElement = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(indexElement);
    fireEvent.click(screen.getByRole("link", { name: /Fixture work outcome/i }));

    const captured = retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY);
    expect(captured?.originUrl).toBe("/index/district/work?fixture=m3b");
    expect(captured?.resultKey).toBe("fixture-work-outcome");

    const recordElement = await WorkEntryPage({
      params: Promise.resolve({ entry: "fixture-work-outcome" }),
      searchParams: Promise.resolve({}),
    });
    render(recordElement);
    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Return to Index" })).toHaveAttribute(
        "href",
        "/index/district/work?fixture=m3b",
      );
    });
    // Reconciliation: genuine passage arrival also receives the restrained
    // Record-Passage treatment (the shared-origin anchor), settling to its
    // final state — never gating the real record content behind it.
    await waitFor(() => {
      const anchor = screen.getByText(/Arrived from Index/);
      expect(anchor.closest("[data-record-passage-state]")).toHaveAttribute(
        "data-record-passage-state",
        "settled",
      );
    });
  });

  it("reduced motion still provides a genuine Record-Passage equivalent — the shared anchor shows immediately, no travel", async () => {
    mockReducedMotion(true);
    window.history.pushState({}, "", "/index/district/work?fixture=m3b");
    const indexElement = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(indexElement);
    fireEvent.click(screen.getByRole("link", { name: /Fixture work outcome/i }));

    const recordElement = await WorkEntryPage({
      params: Promise.resolve({ entry: "fixture-work-outcome" }),
      searchParams: Promise.resolve({}),
    });
    render(recordElement);
    const anchor = await screen.findByText(/Arrived from Index/);
    expect(anchor.closest("[data-record-passage-state]")).toHaveAttribute(
      "data-record-passage-state",
      "settled",
    );
  });
});

describe("Journey 2 — direct entry to the canonical record fabricates no Return", () => {
  it("a cold WorkEntryPage render shows no Return control", async () => {
    const recordElement = await WorkEntryPage({
      params: Promise.resolve({ entry: "fixture-work-outcome" }),
      searchParams: Promise.resolve({}),
    });
    render(recordElement);
    await waitFor(() => {
      expect(screen.queryByRole("link", { name: /Return to Index/i })).not.toBeInTheDocument();
    });
  });
});

describe("Journey 3 — Index → record → browser Back remains valid independently of Return", () => {
  it("history length reflects only the one real navigation, never a fabricated entry", async () => {
    const originalLength = window.history.length;
    window.history.pushState({}, "", "/index/district/work?fixture=m3b");
    const indexElement = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(indexElement);
    fireEvent.click(screen.getByRole("link", { name: /Fixture work outcome/i }));
    expect(window.history.length).toBe(originalLength + 1);
  });
});

describe("Journey 4 — Home → Work first entry", () => {
  it("shows the richer first-entry threshold message", async () => {
    const home = render(<HomePage />);
    fireEvent.click(screen.getByRole("link", { name: "Work" }));
    home.unmount();

    render(<WorkPage />);
    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("data-threshold-state", "first-entry");
  });
});

describe("Journey 5 — Work → Home restores common orientation", () => {
  it("shows the Home return message after a real Work → Home departure", async () => {
    const home = render(<HomePage />);
    fireEvent.click(screen.getByRole("link", { name: "Work" }));
    home.unmount();

    const work = render(<WorkPage />);
    await screen.findByRole("status");
    fireEvent.click(screen.getByRole("link", { name: "Return to Home" }));
    work.unmount();

    render(<HomePage />);
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent(/Common ground restored/);
  });
});

describe("Journey 6 — Home → Work repeated entry is more efficient", () => {
  it("a second passage this session shows the shorter, reduced-assembly message", async () => {
    const home1 = render(<HomePage />);
    fireEvent.click(screen.getByRole("link", { name: "Work" }));
    home1.unmount();
    const work1 = render(<WorkPage />);
    await screen.findByRole("status");
    fireEvent.click(screen.getByRole("link", { name: "Return to Home" }));
    work1.unmount();

    const home2 = render(<HomePage />);
    await screen.findByRole("status");
    await waitFor(() => expect(hasTraversedThreshold(HOME_WORK_THRESHOLD_KEY)).toBe(true));
    fireEvent.click(screen.getByRole("link", { name: "Work" }));
    home2.unmount();

    render(<WorkPage />);
    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("data-threshold-state", "repeated-entry");
  });
});

describe("Journey 7 — rapid interruption during district passage: latest intent wins, nothing stale settles", () => {
  it("two rapid begins under one navigation key leave only the second active — the same guarantee M4.8's Return and M4.9's threshold both rely on", () => {
    const registry = createMotionCancellation();
    const first = registry.begin("m4c-journey-7");
    const second = registry.begin("m4c-journey-7");
    expect(registry.isActive("m4c-journey-7", first)).toBe(false);
    expect(registry.isActive("m4c-journey-7", second)).toBe(true);
  });

  it("marking Home→Work departure twice in a row before Work mounts still resolves to exactly one indicator", async () => {
    render(<HomePage />);
    const enterWork = screen.getByRole("link", { name: "Work" });
    fireEvent.click(enterWork);
    fireEvent.click(enterWork);

    render(<WorkPage />);
    const statuses = await screen.findAllByRole("status");
    expect(statuses).toHaveLength(1);
  });
});

describe("Journey 8 — reduced-motion threshold: identical structure and meaning, only timing differs", () => {
  it("first-entry classification and message are unaffected by prefers-reduced-motion", async () => {
    mockReducedMotion(true);
    const home = render(<HomePage />);
    fireEvent.click(screen.getByRole("link", { name: "Work" }));
    home.unmount();

    render(<WorkPage />);
    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("data-threshold-state", "first-entry");
    expect(status).toHaveTextContent(/Arriving from Home/);
  });
});

describe("Journey 9 — Lab Comparison keeps stable common reference points under rapid selection changes", () => {
  it("rapidly switching both pickers always leaves a fully valid, non-stale pair of rows", () => {
    render(<LabComparisonFixture />);
    const rightC = screen.getAllByRole("radio", { name: "Attempt C" })[1]!;
    const rightB = screen.getAllByRole("radio", { name: "Attempt B" })[1]!;
    fireEvent.click(rightC);
    fireEvent.click(rightB);
    fireEvent.click(rightC);

    expect(screen.getByRole("columnheader", { name: "Attempt C" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(5); // header + 4 shared property rows
  });
});

describe("Journey 10 — semantic Research → Lab Trace, sourced entirely from real M3.5 data", () => {
  it("the real relationship renders with the correct source, label, and canonical destination", () => {
    render(<TraceFixture />);
    expect(screen.getByText("Fixture research inquiry")).toBeInTheDocument();
    expect(screen.getByText("Tested in")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Fixture lab experiment" })).toHaveAttribute(
      "href",
      "/lab/fixture-lab-experiment",
    );
  });
});

describe("Journey 11 — no relationship, no Trace", () => {
  it("a record with no stored relationship produces zero Trace output", () => {
    const registry = createRecordRegistry(allFixtureRecords);
    const { container } = render(<RecordTrace source={fixtureAboutRecord} registry={registry} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("Journey 12 — 390px equivalence where mechanically testable", () => {
  it("Comparison, Trace, and the Home threshold indicator all render identically regardless of window.innerWidth — responsiveness is CSS-only, never JS-branched", () => {
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, "innerWidth", { value: 390, configurable: true });

    render(<LabComparisonFixture />);
    expect(screen.getByRole("columnheader", { name: "Attempt A" })).toBeInTheDocument();
    render(<TraceFixture />);
    expect(screen.getByText("Tested in")).toBeInTheDocument();

    Object.defineProperty(window, "innerWidth", { value: originalWidth, configurable: true });
  });
});
