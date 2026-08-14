import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import HomePage from "@/app/page";
import WorkPage from "@/app/work/page";
import { hasTraversedThreshold } from "@/lib/threshold/familiarity";
import { HOME_WORK_THRESHOLD_KEY } from "@/lib/threshold/thresholdKeys";

/**
 * M4.9 — the real Home -> Work -> Home journey, including repeated-entry
 * efficiency, using the actual page components (not a /contact fixture).
 * See docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md.
 */

afterEach(() => {
  window.sessionStorage.clear();
});

describe("Real journey — Home → Work (first entry) → Home → Work (repeated entry)", () => {
  it("first Home → Work passage shows the richer first-entry indicator", async () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole("link", { name: "Work" }));

    render(<WorkPage />);
    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("data-threshold-state", "first-entry");
    expect(status).toHaveTextContent(/Arriving from Home/);
  });

  it("Work → Home restores common orientation, then a second Home → Work passage is classified as repeated entry", async () => {
    const first = render(<HomePage />);
    fireEvent.click(screen.getByRole("link", { name: "Work" }));
    first.unmount();

    const toWork = render(<WorkPage />);
    await screen.findByRole("status");
    fireEvent.click(screen.getByRole("link", { name: "Return to Home" }));
    toWork.unmount();

    const toHome = render(<HomePage />);
    const homeStatus = await screen.findByRole("status");
    expect(homeStatus).toHaveTextContent(/Common ground restored/);
    await waitFor(() => expect(hasTraversedThreshold(HOME_WORK_THRESHOLD_KEY)).toBe(true));
    fireEvent.click(screen.getByRole("link", { name: "Work" }));
    toHome.unmount();

    render(<WorkPage />);
    const repeatedStatus = await screen.findByRole("status");
    expect(repeatedStatus).toHaveAttribute("data-threshold-state", "repeated-entry");
    expect(repeatedStatus).not.toHaveTextContent(/part of the same platform/);
  });
});

describe("Direct access — no fabricated Home passage", () => {
  it("visiting Work directly (no prior Home departure) shows no threshold indicator, and the district remains fully usable", () => {
    render(<WorkPage />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Work" })).toBeInTheDocument();
    // GlobalNav-independent: the district's own content/links remain reachable.
    expect(screen.getByRole("link", { name: "Return to Home" })).toBeInTheDocument();
  });
});

describe("Rapid navigation — latest intent, no stale threshold state", () => {
  it("marking departure twice in a row before the destination mounts still resolves cleanly to one indicator", async () => {
    render(<HomePage />);
    const enterWork = screen.getByRole("link", { name: "Work" });
    fireEvent.click(enterWork);
    fireEvent.click(enterWork);

    render(<WorkPage />);
    const statuses = await screen.findAllByRole("status");
    expect(statuses).toHaveLength(1);
  });
});
