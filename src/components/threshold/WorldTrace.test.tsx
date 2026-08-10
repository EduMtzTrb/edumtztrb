import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { WorldTrace } from "./WorldTrace";
import { markThresholdTraversed } from "@/lib/threshold/familiarity";
import { HOME_WORK_THRESHOLD_KEY } from "@/lib/threshold/thresholdKeys";

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
