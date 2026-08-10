import { afterEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";

import { IndexPassageRestoration } from "./IndexPassageRestoration";
import { captureReturnContext, retrieveReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

afterEach(() => {
  window.sessionStorage.clear();
});

describe("IndexPassageRestoration (M4.8)", () => {
  it("does nothing when no context was ever captured", async () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<IndexPassageRestoration />);
    await waitFor(() => expect(scrollToSpy).not.toHaveBeenCalled());
    scrollToSpy.mockRestore();
  });

  it("does nothing, and leaves the capture intact, when the captured originUrl does not match the current URL", async () => {
    captureReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY, {
      originUrl: "/index/district/work?fixture=m3b&sort=recent",
      scrollY: 500,
    });
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<IndexPassageRestoration />);
    await waitFor(() => expect(scrollToSpy).not.toHaveBeenCalled());
    expect(retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY)).not.toBeNull();
    scrollToSpy.mockRestore();
  });

  it("restores scroll and clears the capture when the current URL matches exactly", async () => {
    const currentUrl = window.location.pathname + window.location.search;
    captureReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY, {
      originUrl: currentUrl,
      scrollY: 777,
    });
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<IndexPassageRestoration />);

    await waitFor(() => {
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 777, behavior: "auto" });
    });
    expect(retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY)).toBeNull();
    scrollToSpy.mockRestore();
  });
});
