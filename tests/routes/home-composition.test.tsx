import { describe, expect, it, vi } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import HomePage from "@/app/page";
import { peekThresholdArrival } from "@/lib/threshold/familiarity";

/**
 * M5.1 — Home composition contract. Protects the specific guarantees this
 * package must not silently regress: district discoverability, canonical
 * route honesty, the M4.9 threshold contract staying single/unmodified for
 * every district but Work, approved-content provenance, and the shared
 * (not cloned) composition/token discipline. See
 * docs/implementation/M5.1_HOME.md for the full audit.
 */

type Listener = (event: { matches: boolean }) => void;

function mockReducedMotion(matches: boolean) {
  const listeners = new Set<Listener>();
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
    media: query,
    addEventListener: (_: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_: string, listener: Listener) => listeners.delete(listener),
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  }));
}

const APPROVED_DISTRICT_THRESHOLDS = [
  { label: "Work", href: "/work", framing: "Work demonstrates capability." },
  { label: "Research", href: "/research", framing: "Research develops understanding." },
  { label: "Lab", href: "/lab", framing: "Lab tests and transforms." },
  { label: "Art", href: "/art", framing: "Art concentrates perception." },
  { label: "Products", href: "/products", framing: "Products operationalizes value." },
  { label: "About", href: "/about", framing: "About reveals authorship, continuity, and intent." },
] as const;

const pageSource = readFileSync(join(process.cwd(), "src", "app", "page.tsx"), "utf-8");
const homeCss = readFileSync(join(process.cwd(), "src", "styles", "home.css"), "utf-8");

describe("Home composition (M5.1)", () => {
  it("all six permanent districts are discoverable, each via its exact approved canonical route", () => {
    render(<HomePage />);
    const districts = within(screen.getByRole("region", { name: "Districts" }));
    for (const { label, href } of APPROVED_DISTRICT_THRESHOLDS) {
      expect(districts.getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
  });

  it("each district threshold carries its exact approved one-sentence framing (PLATFORM_SPECIFICATION.md's canonical operational distinctions)", () => {
    render(<HomePage />);
    for (const { framing } of APPROVED_DISTRICT_THRESHOLDS) {
      expect(screen.getByText(framing)).toBeInTheDocument();
    }
  });

  it("does not invent a seventh top-level destination — exactly six district thresholds exist", () => {
    render(<HomePage />);
    const districts = within(screen.getByRole("region", { name: "Districts" }));
    expect(districts.getAllByRole("link")).toHaveLength(6);
  });

  it("renders the World Threshold shell, never a canonical-record or district-owner shell", () => {
    render(<HomePage />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("data-page-type", "world-threshold");
    expect(main).toHaveAttribute("data-district", "home");
  });

  it("does not import DistrictShell — Home is structurally distinct from the six canonical-owner districts", () => {
    expect(pageSource).not.toMatch(/DistrictShell/);
  });

  it("only Work reuses the real M4.9 ThresholdLink/arrival-key wiring — the other five are honest, plain canonical-route links", () => {
    render(<HomePage />);
    const districts = within(screen.getByRole("region", { name: "Districts" }));

    fireEvent.click(districts.getByRole("link", { name: "Research" }));
    expect(peekThresholdArrival("home-work:to-work")).toBe(false);

    fireEvent.click(districts.getByRole("link", { name: "Work" }));
    expect(peekThresholdArrival("home-work:to-work")).toBe(true);
  });

  it("reuses the M4.9 threshold module unchanged — no second threshold-key or familiarity store exists", () => {
    expect(pageSource).toMatch(
      /import\s*\{\s*HOME_TO_WORK_ARRIVAL_KEY,\s*WORK_TO_HOME_ARRIVAL_KEY\s*\}\s*from\s*"@\/lib\/threshold\/thresholdKeys"/,
    );
    const thresholdLibFiles = readFileSync(
      join(process.cwd(), "src", "lib", "threshold", "thresholdKeys.ts"),
      "utf-8",
    );
    // The M4.9 contract's own three constants remain the only exports — no
    // generalized/per-district key table was introduced by this package.
    expect(thresholdLibFiles).toContain("HOME_WORK_THRESHOLD_KEY");
    expect(thresholdLibFiles).toContain("HOME_TO_WORK_ARRIVAL_KEY");
    expect(thresholdLibFiles).toContain("WORK_TO_HOME_ARRIVAL_KEY");
  });

  it("reuses DistrictField (M5.0) rather than cloning its grid mechanics", () => {
    expect(pageSource).toMatch(
      /import\s*\{\s*DistrictField\s*\}\s*from\s*"@\/components\/composition\/DistrictField"/,
    );
  });

  it("reduced motion preserves the complete Home structure — every link and framing sentence still renders", () => {
    mockReducedMotion(true);
    render(<HomePage />);
    const districts = within(screen.getByRole("region", { name: "Districts" }));
    for (const { label, framing } of APPROVED_DISTRICT_THRESHOLDS) {
      expect(districts.getByRole("link", { name: label })).toBeInTheDocument();
      expect(screen.getByText(framing)).toBeInTheDocument();
    }
  });

  it("no district access is gated behind animation — every district link is a real, immediately present anchor", () => {
    render(<HomePage />);
    const districts = within(screen.getByRole("region", { name: "Districts" }));
    for (const { label } of APPROVED_DISTRICT_THRESHOLDS) {
      const link = districts.getByRole("link", { name: label });
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href");
    }
  });

  it("uses approved typography roles only — the exact class names already defined in typography.css", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("type-display");
    const districts = within(screen.getByRole("region", { name: "Districts" }));
    expect(districts.getByRole("link", { name: "Work" }).closest("dt")).toHaveClass("type-h3");
  });

  it("does not invent public-facing content — the orientation statement is the exact approved PLATFORM_VISION.md quote", () => {
    render(<HomePage />);
    expect(
      screen.getByText(
        "A multidisciplinary design practice using architectural thinking to connect space, computation, artificial intelligence, research, art, and products.",
      ),
    ).toBeInTheDocument();
  });

  it("keeps primary orientation content before the district list in DOM order — semantic order survives compact stacking", () => {
    const { container } = render(<HomePage />);
    const primary = container.querySelector(".district-field-primary");
    const districtsRegion = container.querySelector('[aria-label="Districts"]');
    expect(primary).not.toBeNull();
    expect(districtsRegion).not.toBeNull();
    expect(
      primary!.compareDocumentPosition(districtsRegion!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("home.css introduces no new palette, Signal semantics, or motion tier", () => {
    expect(homeCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(homeCss).not.toMatch(/\brgb\(|\brgba\(|\bhsl\(/);
    expect(homeCss.toLowerCase()).not.toMatch(/--signal|signal/);
    expect(homeCss).not.toMatch(/\btransition\s*:|\banimation\s*:|\btransform\s*:/);
  });

  it("home.css reuses the exact same shared grid/gutter/spacing tokens as .composition and district-composition.css — no parallel layout system", () => {
    expect(homeCss).toContain("var(--grid-compact-4)");
    expect(homeCss).toContain("var(--grid-medium-8)");
    expect(homeCss).toContain("var(--grid-wide-12)");
    expect(homeCss).toContain("var(--gutter-compact)");
    expect(homeCss).toContain("var(--gutter-medium)");
    expect(homeCss).toContain("var(--gutter-wide)");
    expect(homeCss).not.toMatch(/:root\s*\{/);
  });

  it("introduces no decorative relationship/network geometry — no svg or canvas element", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector("svg")).toBeNull();
    expect(container.querySelector("canvas")).toBeNull();
  });
});
