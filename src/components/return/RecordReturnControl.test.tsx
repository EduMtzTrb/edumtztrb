import { afterEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { RecordReturnControl } from "./RecordReturnControl";
import { captureReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

afterEach(() => {
  window.sessionStorage.clear();
});

describe("RecordReturnControl (M4.8 §A9)", () => {
  it("cold entry (no capture at all) renders nothing", async () => {
    render(<RecordReturnControl entrySlug="fixture-work-outcome" />);
    await waitFor(() => {
      expect(screen.queryByRole("link", { name: /Return to Index/i })).not.toBeInTheDocument();
    });
  });

  it("a capture for a different record renders nothing — never a fabricated Return for this entry", async () => {
    captureReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY, {
      originUrl: "/index/district/work?fixture=m3b",
      resultKey: "a-different-record",
    });
    render(<RecordReturnControl entrySlug="fixture-work-outcome" />);
    await waitFor(() => {
      expect(screen.queryByRole("link", { name: /Return to Index/i })).not.toBeInTheDocument();
    });
  });

  it("a matching capture renders a real link to the captured origin", async () => {
    captureReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY, {
      originUrl: "/index/district/work?fixture=m3b",
      resultKey: "fixture-work-outcome",
      scrollY: 640,
    });
    render(<RecordReturnControl entrySlug="fixture-work-outcome" />);
    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Return to Index" })).toHaveAttribute(
        "href",
        "/index/district/work?fixture=m3b",
      );
    });
  });
});
