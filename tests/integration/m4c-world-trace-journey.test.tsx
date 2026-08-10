import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { AppShell } from "@/components/shell/AppShell";
import HomePage from "@/app/page";
import WorkPage from "@/app/work/page";
import ResearchPage from "@/app/research/page";
import { markThresholdTraversed } from "@/lib/threshold/familiarity";
import { HOME_WORK_THRESHOLD_KEY } from "@/lib/threshold/thresholdKeys";

/**
 * M4.9 calibration — proves the corrected fix mechanically: `WorldTrace`
 * is mounted once inside `AppShell`, the one layout level that genuinely
 * survives Home <-> Work navigation, and the SAME DOM node repositions in
 * response to the real destination content changing — not a fresh node
 * appearing already at its final value. This is exactly the failure mode
 * the first real-browser review exposed (see
 * docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md "Root Cause"), and
 * exactly what jsdom's plain rendering cannot otherwise catch.
 */

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

afterEach(() => {
  window.sessionStorage.clear();
});

describe("WorldTrace persists across a real Home <-> Work navigation (AppShell-level)", () => {
  it("the same .world-trace node survives a Home -> Work route change and updates position in place", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    const { rerender } = render(
      <AppShell>
        <HomePage />
      </AppShell>,
    );
    const traceAtHome = document.querySelector(".world-trace");
    expect(traceAtHome).toHaveAttribute("data-trace-position", "home");

    vi.mocked(usePathname).mockReturnValue("/work");
    rerender(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );
    const traceAtWork = document.querySelector(".world-trace");

    expect(traceAtWork).toBe(traceAtHome);
    expect(traceAtWork).toHaveAttribute("data-trace-position", "work");
    expect(screen.getByRole("heading", { level: 1, name: "Work" })).toBeInTheDocument();
  });

  it("first Home -> Work crossing resolves data-trace-mode=first; a later crossing resolves data-trace-mode=repeated", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    const { rerender } = render(
      <AppShell>
        <HomePage />
      </AppShell>,
    );

    vi.mocked(usePathname).mockReturnValue("/work");
    rerender(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );
    expect(document.querySelector(".world-trace")).toHaveAttribute("data-trace-mode", "first");

    markThresholdTraversed(HOME_WORK_THRESHOLD_KEY);
    vi.mocked(usePathname).mockReturnValue("/");
    rerender(
      <AppShell>
        <HomePage />
      </AppShell>,
    );

    vi.mocked(usePathname).mockReturnValue("/work");
    rerender(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );
    expect(document.querySelector(".world-trace")).toHaveAttribute("data-trace-mode", "repeated");
  });

  it("destination content is immediately present alongside the trace — no blocking transition curtain", () => {
    vi.mocked(usePathname).mockReturnValue("/work");
    render(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Work" })).toBeInTheDocument();
    expect(document.querySelector(".world-trace")).toBeInTheDocument();
  });

  it("only one .world-trace exists at a time — the trace is shared shell-level structure, not duplicated per page", () => {
    vi.mocked(usePathname).mockReturnValue("/work");
    render(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );
    expect(document.querySelectorAll(".world-trace")).toHaveLength(1);
  });
});

describe("WorldTrace scope — real genuine crossing vs. real fabricated crossing (pre-review integrity audit)", () => {
  it('a real click on "Enter Work" from Home activates the trace at Work', () => {
    vi.mocked(usePathname).mockReturnValue("/");
    const { rerender } = render(
      <AppShell>
        <HomePage />
      </AppShell>,
    );
    fireEvent.click(screen.getByRole("link", { name: "Enter Work" }));

    vi.mocked(usePathname).mockReturnValue("/work");
    rerender(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );
    expect(document.querySelector(".world-trace")).toHaveAttribute("data-trace-active", "true");
  });

  it('a real click on "Return to Home" from Work activates the trace at Home', () => {
    vi.mocked(usePathname).mockReturnValue("/work");
    const { rerender } = render(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );
    fireEvent.click(screen.getByRole("link", { name: "Return to Home" }));

    vi.mocked(usePathname).mockReturnValue("/");
    rerender(
      <AppShell>
        <HomePage />
      </AppShell>,
    );
    expect(document.querySelector(".world-trace")).toHaveAttribute("data-trace-active", "true");
  });

  it("navigating from Research into Work without going through Home's threshold link fabricates no active passage", () => {
    vi.mocked(usePathname).mockReturnValue("/research");
    const { rerender } = render(
      <AppShell>
        <ResearchPage />
      </AppShell>,
    );

    vi.mocked(usePathname).mockReturnValue("/work");
    rerender(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "work");
    expect(trace).not.toHaveAttribute("data-trace-active");
    expect(screen.getByRole("heading", { level: 1, name: "Work" })).toBeInTheDocument();
  });

  it("leaving Work for Research without clicking Return to Home fabricates no active passage", () => {
    vi.mocked(usePathname).mockReturnValue("/work");
    const { rerender } = render(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );

    vi.mocked(usePathname).mockReturnValue("/research");
    rerender(
      <AppShell>
        <ResearchPage />
      </AppShell>,
    );
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "elsewhere");
    expect(trace).not.toHaveAttribute("data-trace-active");
  });

  it("cold direct entry at /work through the real AppShell fabricates no active passage", () => {
    vi.mocked(usePathname).mockReturnValue("/work");
    render(
      <AppShell>
        <WorkPage />
      </AppShell>,
    );
    const trace = document.querySelector(".world-trace");
    expect(trace).toHaveAttribute("data-trace-position", "work");
    expect(trace).not.toHaveAttribute("data-trace-active");
  });
});
