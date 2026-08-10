import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Cross-cutting responsive verification — M2.12.
 * Authority: IMPLEMENTATION_PLAN.md §7 (M2.12 — "Verify recomposition
 * rather than simple scaling"). See
 * docs/implementation/M2.12_RESPONSIVE_PRIMITIVE_VERIFICATION.md for the
 * full verification matrix and methodology.
 *
 * This suite runs source-level evidence checks across every M2.2–M2.11
 * stylesheet at once, rather than duplicating per-package assertions each
 * package's own contract test already makes. It exists specifically to
 * catch cross-cutting regressions (an invented breakpoint, a hover rule
 * that gates content, a large fixed pixel width) that no single package's
 * own test would necessarily see, because each one only reads its own
 * file.
 */

const STYLES_DIR = join(process.cwd(), "src", "styles");

const RESPONSIVE_RELEVANT_FILES = [
  "layout.css",
  "primitives.css",
  "controls.css",
  "selection.css",
  "records.css",
  "media.css",
  "metadata.css",
  "form.css",
  "state.css",
];

function readStyle(file: string): string {
  return readFileSync(join(STYLES_DIR, file), "utf-8");
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Breakpoint consistency (M2.12)", () => {
  it("every @media (min-width) breakpoint across M2 stylesheets is one of the two already-established values (768px, 1024px) — no invented breakpoint", () => {
    const approvedBreakpoints = new Set(["768px", "1024px"]);
    for (const file of RESPONSIVE_RELEVANT_FILES) {
      const css = stripComments(readStyle(file));
      const matches = css.matchAll(/@media\s*\(min-width:\s*([^)]+)\)/g);
      for (const match of matches) {
        const value = match[1].trim();
        expect(
          approvedBreakpoints.has(value),
          `${file} uses an unapproved breakpoint: ${value}`,
        ).toBe(true);
      }
    }
  });
});

describe("No hover-only essential content (M2.12)", () => {
  it("every :hover rule across M2 stylesheets is opacity-only — hover never toggles display/visibility/content", () => {
    for (const file of RESPONSIVE_RELEVANT_FILES) {
      const css = stripComments(readStyle(file));
      const hoverRules = css.matchAll(/[^{}]*:hover[^{}]*\{([^}]*)\}/g);
      for (const match of hoverRules) {
        const body = match[1];
        expect(body, `${file} has a :hover rule with unexpected properties: ${body}`).toMatch(
          /^\s*opacity:\s*0\.\d+;\s*$/,
        );
        expect(body).not.toMatch(/display\s*:|visibility\s*:|content\s*:/);
      }
    }
  });
});

describe("No large fixed pixel widths outside known decorative markers (M2.12)", () => {
  it("no style rule sets a fixed width above 44px on a layout container", () => {
    // Known, deliberate small fixed-size decorative markers (checkbox box,
    // radio dot, filter-toggle marker) are allowed — these are shape
    // indicators, not layout containers that could overflow a narrow
    // viewport. Anything larger, unconditional, and non-relative would be
    // a genuine responsive hazard.
    const allowedSelectors = [
      ".checkbox-box",
      ".radio-dot",
      ".filter-toggle-marker",
      ".radio-dot::after",
    ];
    for (const file of RESPONSIVE_RELEVANT_FILES) {
      const css = stripComments(readStyle(file));
      const rules = css.matchAll(/([^{}]+)\{([^}]*)\}/g);
      for (const [, selector, body] of rules) {
        const widthMatch = body.match(/(?<!min-|max-)width:\s*(\d+)px/);
        if (!widthMatch) continue;
        const px = Number(widthMatch[1]);
        if (px <= 44) continue;
        const isAllowed = allowedSelectors.some((allowed) => selector.includes(allowed));
        expect(
          isAllowed,
          `${file}: selector "${selector.trim()}" sets a fixed width of ${px}px`,
        ).toBe(true);
      }
    }
  });
});

describe("Focus-visible outline consistency (M2.12)", () => {
  it("every :focus-visible rule across M2 stylesheets uses outline (never box-shadow, which could be clipped by overflow:hidden ancestors differently)", () => {
    for (const file of RESPONSIVE_RELEVANT_FILES) {
      const css = stripComments(readStyle(file));
      const focusRules = css.matchAll(/[^{}]*:focus-visible[^{}]*\{([^}]*)\}/g);
      for (const match of focusRules) {
        const body = match[1];
        expect(body, `${file} has a :focus-visible rule not using outline: ${body}`).toMatch(
          /outline\s*:/,
        );
      }
    }
  });
});

describe("Segmented view recomposes rather than clips (M2.12 correction)", () => {
  it("selection.css's segmented-view-options wraps instead of relying on overflow:hidden alone", () => {
    const css = readStyle("selection.css");
    const match = css.match(/\.segmented-view-options\s*\{([^}]*)\}/);
    expect(match?.[1]).toMatch(/flex-wrap:\s*wrap/);
  });
});
