import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import IndexByDistrictPage from "@/app/index/district/[district]/page";
import WorkEntryPage from "@/app/work/[entry]/page";
import { retrieveReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

/**
 * M4.8 — the real, end-to-end representative journey: Index → canonical
 * Work record → Return, exercised through the actual page components and
 * canonical route resolver (§A2 — "the actual proof must use the real
 * application routing," never fully simulated inside a /contact fixture).
 * See docs/implementation/M4.8_RECORD_PASSAGE_PROTOTYPE.md.
 */

afterEach(() => {
  window.sessionStorage.clear();
  window.history.pushState({}, "", "/");
});

describe("Real journey — Index (Work lens) → canonical Work record → Return", () => {
  it("departing from the real Index-district-work route captures Return context for the real canonical record", async () => {
    window.history.pushState({}, "", "/index/district/work?fixture=m3b");

    const indexElement = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(indexElement);

    const recordLink = screen.getByRole("link", { name: /Fixture work outcome/i });
    expect(recordLink).toHaveAttribute("href", "/work/fixture-work-outcome");
    fireEvent.click(recordLink);

    const captured = retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY);
    expect(captured).not.toBeNull();
    expect(captured?.originUrl).toBe("/index/district/work?fixture=m3b");
    expect(captured?.resultKey).toBe("fixture-work-outcome");
  });

  it("the real canonical record route then shows a genuine Return control pointing back at the captured Index URL", async () => {
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

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Return to Index" })).toHaveAttribute(
        "href",
        "/index/district/work?fixture=m3b",
      );
    });
  });

  it("a direct/cold entry to the same canonical record — no prior Index visit — shows no fabricated Return control", async () => {
    const recordElement = await WorkEntryPage({
      params: Promise.resolve({ entry: "fixture-work-outcome" }),
      searchParams: Promise.resolve({}),
    });
    render(recordElement);

    await waitFor(() => {
      expect(screen.queryByRole("link", { name: /Return to Index/i })).not.toBeInTheDocument();
    });
    // M3.13's structural orientation remains the fallback — the record is still usable.
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("browser Back remains independently valid — Return does not create or depend on a history entry", async () => {
    const originalLength = window.history.length;
    window.history.pushState({}, "", "/index/district/work?fixture=m3b");
    const indexElement = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(indexElement);
    fireEvent.click(screen.getByRole("link", { name: /Fixture work outcome/i }));

    // Capturing Return context is a sessionStorage write only — history length
    // is exactly what the one real pushState above produced, nothing more.
    expect(window.history.length).toBe(originalLength + 1);
  });

  it("arriving back at the captured Index URL restores scroll and clears the capture (no stale restoration on a later, unrelated visit)", async () => {
    window.history.pushState({}, "", "/index/district/work?fixture=m3b");
    const indexElement = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    const { unmount } = render(indexElement);
    fireEvent.click(screen.getByRole("link", { name: /Fixture work outcome/i }));
    unmount();

    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    // Real navigation back to the exact captured URL (still on it — pushState above didn't change).
    const returnElement = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(returnElement);

    await waitFor(() => expect(scrollToSpy).toHaveBeenCalled());
    expect(retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY)).toBeNull();
    scrollToSpy.mockRestore();
  });
});
