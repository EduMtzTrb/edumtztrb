import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { RecordPassageArrival } from "./RecordPassageArrival";
import { captureReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

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
});

describe("RecordPassageArrival (M4.8 reconciliation)", () => {
  it("cold/direct entry (no genuine passage capture) renders children completely unwrapped", () => {
    render(
      <RecordPassageArrival
        entrySlug="fixture-work-outcome"
        recordTitle="Work — fixture-work-outcome"
      >
        <p>Real record content</p>
      </RecordPassageArrival>,
    );
    expect(screen.getByText("Real record content")).toBeInTheDocument();
    expect(screen.queryByText(/Arrived from Index/)).not.toBeInTheDocument();
  });

  it("a capture belonging to a different record does not receive the passage treatment", () => {
    captureReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY, {
      originUrl: "/index/district/work?fixture=m3b",
      resultKey: "a-different-record",
    });
    render(
      <RecordPassageArrival
        entrySlug="fixture-work-outcome"
        recordTitle="Work — fixture-work-outcome"
      >
        <p>Real record content</p>
      </RecordPassageArrival>,
    );
    expect(screen.getByText("Real record content")).toBeInTheDocument();
    expect(screen.queryByText(/Arrived from Index/)).not.toBeInTheDocument();
  });

  it("genuine passage arrival shows the shared-origin anchor, and content remains immediately present", async () => {
    captureReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY, {
      originUrl: "/index/district/work?fixture=m3b",
      resultKey: "fixture-work-outcome",
    });
    render(
      <RecordPassageArrival
        entrySlug="fixture-work-outcome"
        recordTitle="Work — fixture-work-outcome"
      >
        <p>Real record content</p>
      </RecordPassageArrival>,
    );
    // Content is never gated behind the passage animation — present in the same render.
    expect(screen.getByText("Real record content")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText("Arrived from Index — Work — fixture-work-outcome"),
      ).toBeInTheDocument();
    });
  });

  it("mounts at 'arriving' and settles to 'settled' one frame later", async () => {
    captureReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY, {
      originUrl: "/index/district/work?fixture=m3b",
      resultKey: "fixture-work-outcome",
    });
    render(
      <RecordPassageArrival
        entrySlug="fixture-work-outcome"
        recordTitle="Work — fixture-work-outcome"
      >
        <p>Real record content</p>
      </RecordPassageArrival>,
    );
    const wrapper = (await screen.findByText("Real record content")).closest(
      "[data-record-passage-state]",
    )!;
    // Real rAF is asynchronous — the attribute settles within one frame.
    await waitFor(() => expect(wrapper).toHaveAttribute("data-record-passage-state", "settled"));
  });

  it("under reduced motion, mounts directly at 'settled' — the 'arriving' visual values never apply", async () => {
    mockReducedMotion(true);
    captureReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY, {
      originUrl: "/index/district/work?fixture=m3b",
      resultKey: "fixture-work-outcome",
    });
    render(
      <RecordPassageArrival
        entrySlug="fixture-work-outcome"
        recordTitle="Work — fixture-work-outcome"
      >
        <p>Real record content</p>
      </RecordPassageArrival>,
    );
    const wrapper = (await screen.findByText("Real record content")).closest(
      "[data-record-passage-state]",
    )!;
    expect(wrapper).toHaveAttribute("data-record-passage-state", "settled");
  });
});
