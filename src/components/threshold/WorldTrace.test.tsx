import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { WorldTrace } from "./WorldTrace";
import { markThresholdDeparture, markThresholdTraversed } from "@/lib/threshold/familiarity";
import {
  HOME_TO_WORK_ARRIVAL_KEY,
  HOME_WORK_THRESHOLD_KEY,
  WORK_TO_HOME_ARRIVAL_KEY,
} from "@/lib/threshold/thresholdKeys";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

function renderAt(pathname: string) {
  vi.mocked(usePathname).mockReturnValue(pathname);
  return render(<WorldTrace />);
}

afterEach(() => {
  window.sessionStorage.clear();
});

describe("WorldTrace (M4.9 calibration)", () => {
  it('resolves the root route as data-trace-position="home"', () => {
    renderAt("/");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "home");
  });

  it('resolves /work as data-trace-position="work"', () => {
    renderAt("/work");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "work");
  });

  it('resolves a nested canonical Work record (/work/some-project) as data-trace-position="work"', () => {
    renderAt("/work/some-project");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "work");
  });

  it('resolves an unrelated district (e.g. /research) as data-trace-position="elsewhere" — not a general route manager', () => {
    renderAt("/research");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "elsewhere");
  });

  it('defaults to data-trace-mode="first" when the Home <-> Work threshold has never been traversed this session', () => {
    renderAt("/work");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-mode", "first");
  });

  it('reads data-trace-mode="repeated" once the threshold has already been traversed this session', () => {
    markThresholdTraversed(HOME_WORK_THRESHOLD_KEY);
    renderAt("/work");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-mode", "repeated");
  });

  it("always renders its structural wrapper and segment — never conditionally mounts based on position", () => {
    for (const pathname of ["/", "/work", "/research", "/about", "/lab"]) {
      const { unmount } = renderAt(pathname);
      expect(document.querySelector(".world-trace")).toBeInTheDocument();
      expect(document.querySelector(".world-trace-segment")).toBeInTheDocument();
      unmount();
    }
  });

  it("marks its visual segment aria-hidden — it is a structural cue, not primary content", () => {
    renderAt("/");
    const segment = document.querySelector(".world-trace-segment");
    expect(segment).toHaveAttribute("aria-hidden", "true");
  });

  it("re-renders in place with a new position when the pathname prop changes, rather than unmounting", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    const { rerender } = render(<WorldTrace />);
    const traceBefore = document.querySelector(".world-trace");
    expect(traceBefore).toHaveAttribute("data-trace-position", "home");

    vi.mocked(usePathname).mockReturnValue("/work");
    rerender(<WorldTrace />);
    const traceAfter = document.querySelector(".world-trace");
    expect(traceAfter).toBe(traceBefore);
    expect(traceAfter).toHaveAttribute("data-trace-position", "work");
  });
});

describe("WorldTrace scope — Home <-> Work only, never any-route <-> Work (pre-review integrity audit)", () => {
  it('a genuine Home -> Work departure (real "Enter Work" click) activates the threshold passage', () => {
    markThresholdDeparture(HOME_TO_WORK_ARRIVAL_KEY);
    renderAt("/work");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "work");
    expect(trace).toHaveAttribute("data-trace-active", "true");
  });

  it('a genuine Work -> Home departure (real "Return to Home" click) activates the threshold passage', () => {
    markThresholdDeparture(WORK_TO_HOME_ARRIVAL_KEY);
    renderAt("/");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "home");
    expect(trace).toHaveAttribute("data-trace-active", "true");
  });

  it("Research -> Work (no Home departure was ever marked) does not fabricate an active Home-threshold passage", () => {
    vi.mocked(usePathname).mockReturnValue("/research");
    const { rerender } = render(<WorldTrace />);

    vi.mocked(usePathname).mockReturnValue("/work");
    rerender(<WorldTrace />);
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "work");
    expect(trace).not.toHaveAttribute("data-trace-active");
  });

  it("About -> Work (no Home departure was ever marked) does not fabricate an active Home-threshold passage", () => {
    vi.mocked(usePathname).mockReturnValue("/about");
    const { rerender } = render(<WorldTrace />);

    vi.mocked(usePathname).mockReturnValue("/work");
    rerender(<WorldTrace />);
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "work");
    expect(trace).not.toHaveAttribute("data-trace-active");
  });

  it("Work -> Research (no Return-to-Home departure was marked) does not fabricate an active Work-threshold passage", () => {
    vi.mocked(usePathname).mockReturnValue("/work");
    const { rerender } = render(<WorldTrace />);

    vi.mocked(usePathname).mockReturnValue("/research");
    rerender(<WorldTrace />);
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "elsewhere");
    expect(trace).not.toHaveAttribute("data-trace-active");
  });

  it("Work -> About (no Return-to-Home departure was marked) does not fabricate an active Home-threshold passage", () => {
    vi.mocked(usePathname).mockReturnValue("/work");
    const { rerender } = render(<WorldTrace />);

    vi.mocked(usePathname).mockReturnValue("/about");
    rerender(<WorldTrace />);
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "elsewhere");
    expect(trace).not.toHaveAttribute("data-trace-active");
  });

  it("cold, direct entry at /work (fresh session, no departure ever marked) resolves the stable Work position with no active passage", () => {
    renderAt("/work");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "work");
    expect(trace).not.toHaveAttribute("data-trace-active");
  });

  it("browser Back into /work from an unrelated route (no departure marked) fabricates no Home origin", () => {
    vi.mocked(usePathname).mockReturnValue("/lab");
    const { rerender } = render(<WorldTrace />);

    vi.mocked(usePathname).mockReturnValue("/work");
    rerender(<WorldTrace />);
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "work");
    expect(trace).not.toHaveAttribute("data-trace-active");
  });

  it("a stale departure flag left over from an earlier, unrelated session moment does not leak into an unrelated district", () => {
    markThresholdDeparture(HOME_TO_WORK_ARRIVAL_KEY);
    renderAt("/research");
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "elsewhere");
    expect(trace).not.toHaveAttribute("data-trace-active");
  });
});
