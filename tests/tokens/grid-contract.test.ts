import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M2.3 grid/layout contract in src/styles/layout.css —
 * DESIGN_SYSTEM.md v1.1 §14 (Shared grid system). See
 * docs/implementation/M2.3_SPACING_GRID.md for the calibration rationale.
 *
 * This suite checks source text, not rendered/computed CSS — consistent
 * with tests/tokens/token-contract.test.ts's approach, since this
 * repository has no browser test runner.
 */

const layoutCss = readFileSync(join(process.cwd(), "src", "styles", "layout.css"), "utf-8");

describe("Grid/layout contract (DESIGN_SYSTEM.md v1.1 §14)", () => {
  it("defines the three approved layout primitives", () => {
    expect(layoutCss).toContain(".composition {");
    expect(layoutCss).toContain(".field-interval {");
    expect(layoutCss).toContain(".measure {");
  });

  it(".composition uses the approved column counts, one breakpoint each", () => {
    expect(layoutCss).toContain("var(--grid-compact-4)");
    expect(layoutCss).toContain("var(--grid-medium-8)");
    expect(layoutCss).toContain("var(--grid-wide-12)");
  });

  it(".composition uses the calibrated margin/gutter tokens, one breakpoint each", () => {
    expect(layoutCss).toContain("var(--margin-compact)");
    expect(layoutCss).toContain("var(--margin-medium)");
    expect(layoutCss).toContain("var(--margin-wide)");
    expect(layoutCss).toContain("var(--gutter-compact)");
    expect(layoutCss).toContain("var(--gutter-medium)");
    expect(layoutCss).toContain("var(--gutter-wide)");
  });

  it("wide and ultra-wide both stay at 12 columns — no fourth column-count breakpoint exists", () => {
    // Only three @media blocks: medium (768px) and wide (1024px) column
    // changes, plus the reduced-motion query in globals.css (not this
    // file). A fourth grid-template-columns rule would mean a column
    // count was added past 12, which v1.1 §14 does not approve.
    const columnRuleCount = (layoutCss.match(/grid-template-columns:/g) ?? []).length;
    expect(columnRuleCount).toBe(3);
  });

  it("composition is capped at the approved maximum and centers itself (ultra-wide gains field, not columns)", () => {
    expect(layoutCss).toContain("max-width: var(--composition-max)");
    expect(layoutCss).toContain("margin-inline: auto");
  });

  it("does not define a district-specific grid, margin, or gutter", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(layoutCss.toLowerCase()).not.toContain(`.${district}-grid`);
      expect(layoutCss.toLowerCase()).not.toContain(`--${district}-margin`);
      expect(layoutCss.toLowerCase()).not.toContain(`--${district}-gutter`);
    }
  });

  it("does not reintroduce a 256px architectural-void ceiling", () => {
    // field-interval must be able to exceed space-12 (256px) — this only
    // checks the literal string doesn't reappear as a hard cap in this file.
    expect(layoutCss).not.toMatch(/field-interval[\s\S]*?256px/);
  });
});
