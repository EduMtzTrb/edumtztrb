import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M5.0 Part B shared district composition contract —
 * DESIGN_SYSTEM.md v1.1 §11 (Governing compositional grammar), §11.8
 * (Dominant and peripheral fields), §69 (Shared district rule). See
 * docs/implementation/M5.0_SHARED_DISTRICT_SHELL.md "Part B."
 *
 * Source-text checks only, consistent with tests/tokens/grid-contract.test.ts
 * and the rest of this directory — this repository has no browser test
 * runner, so structural CSS guarantees are protected at the source level.
 */

const compositionCss = readFileSync(
  join(process.cwd(), "src", "styles", "district-composition.css"),
  "utf-8",
);
const districtNavCss = readFileSync(
  join(process.cwd(), "src", "styles", "district-nav.css"),
  "utf-8",
);

describe("District composition contract (DESIGN_SYSTEM.md v1.1 §11)", () => {
  it("reuses the exact same column-count tokens as .composition — one shared axis, not a second grid system", () => {
    expect(compositionCss).toContain("var(--grid-compact-4)");
    expect(compositionCss).toContain("var(--grid-medium-8)");
    expect(compositionCss).toContain("var(--grid-wide-12)");
  });

  it("reuses the exact same gutter tokens as .composition", () => {
    expect(compositionCss).toContain("var(--gutter-compact)");
    expect(compositionCss).toContain("var(--gutter-medium)");
    expect(compositionCss).toContain("var(--gutter-wide)");
  });

  it("introduces no new breakpoint — only the two already-approved 768px/1024px queries", () => {
    const breakpoints = [...compositionCss.matchAll(/min-width:\s*(\d+)px/g)].map((m) => m[1]);
    expect(new Set(breakpoints)).toEqual(new Set(["768", "1024"]));
  });

  it("defines all three approved density states, each assigning both primary and peripheral roles", () => {
    for (const density of ["concentrated", "moderate", "dense"]) {
      expect(compositionCss).toContain(`[data-density="${density}"] .district-field-primary`);
      expect(compositionCss).toContain(`[data-density="${density}"] .district-field-peripheral`);
    }
  });

  it("does not mint a new CSS custom property — every value is either a literal grid-column/row-gap or an existing token", () => {
    expect(compositionCss).not.toMatch(/:root\s*\{/);
    expect(compositionCss).not.toMatch(/--district-/);
  });

  it("contains no per-district selector or district name — the field is district-agnostic", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(compositionCss.toLowerCase()).not.toContain(`[data-district="${district}"]`);
      expect(compositionCss.toLowerCase()).not.toContain(`.${district}-`);
    }
  });

  it("contains no motion, transition, or animation — this is a static structural contract only", () => {
    expect(compositionCss).not.toMatch(/transition|animation|transform/);
  });

  it("reuses only pre-approved, WCAG-verified color tokens for peripheral latency — no new color, palette, or Signal declaration", () => {
    // No hardcoded color literal anywhere — every color value must be an
    // existing custom property, never a hex/rgb/hsl value invented here.
    expect(compositionCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(compositionCss).not.toMatch(/\brgb\(|\brgba\(|\bhsl\(/);
    expect(compositionCss.toLowerCase()).not.toMatch(/--signal/);
    expect(compositionCss).not.toMatch(/--color-district-/);
    // The only two color-bearing declarations in the file reuse the exact
    // pairing already WCAG-verified for the Metadata Rail's own Latent tier
    // (src/styles/tokens/opacity.css) — never a value invented for this file.
    expect(compositionCss).toContain("color: var(--color-mist-300);");
    expect(compositionCss).toContain("opacity: var(--opacity-latent);");
  });

  it("peripheral latency (color + opacity) is a property of the role itself, not gated behind any [data-density=...] selector", () => {
    expect(compositionCss).toMatch(
      /\.district-field-peripheral\s*\{\s*color:\s*var\(--color-mist-300\);\s*opacity:\s*var\(--opacity-latent\);\s*\}/,
    );
  });

  it("the field opens with a hairline threshold reusing the existing hairline/graphite tokens — bounding the void above it, not merely shrinking it", () => {
    expect(compositionCss).toContain(
      "border-block-start: var(--line-hairline) solid var(--color-graphite-700);",
    );
  });

  it("concentrated's primary zone is itself offset off the left edge at both medium and wide — genuine asymmetry, not merely less content flush at column 1", () => {
    const concentratedPrimaryOffsets = [
      ...compositionCss.matchAll(
        /\[data-density="concentrated"\]\s*\.district-field-primary\s*\{\s*grid-column:\s*(\d+)\s*\/\s*span\s*\d+;/g,
      ),
    ].map((m) => m[1]);
    expect(concentratedPrimaryOffsets).toHaveLength(2); // medium + wide
    for (const start of concentratedPrimaryOffsets) {
      expect(start).not.toBe("1");
    }
  });

  it("moderate stays a flush split at both medium and wide, in contrast with concentrated's offset — two genuinely distinct spatial signatures", () => {
    const moderatePrimaryOffsets = [
      ...compositionCss.matchAll(
        /\[data-density="moderate"\]\s*\.district-field-primary\s*\{\s*grid-column:\s*(\d+)\s*\/\s*span\s*\d+;/g,
      ),
    ].map((m) => m[1]);
    expect(moderatePrimaryOffsets).toHaveLength(2);
    for (const start of moderatePrimaryOffsets) {
      expect(start).toBe("1");
    }
  });

  it("dense preserves a one-column selective-offset gap between primary and peripheral at both medium and wide", () => {
    const denseRule =
      /\[data-density="dense"\]\s*\.district-field-primary\s*\{\s*grid-column:\s*1\s*\/\s*span\s*(\d+);\s*\}\s*\.district-field\[data-density="dense"\]\s*\.district-field-peripheral\s*\{\s*grid-column:\s*(\d+)\s*\/\s*span\s*\d+;/g;
    const matches = [...compositionCss.matchAll(denseRule)];
    expect(matches).toHaveLength(2); // medium + wide
    for (const [, primarySpan, peripheralStart] of matches) {
      // peripheral starts exactly one column after primary's span ends
      // (primary occupies columns 1..span, so span+2 is the one-gap start).
      expect(Number(peripheralStart)).toBe(Number(primarySpan) + 2);
    }
  });

  it("district-nav.css now shares the same responsive margin tokens as .composition — navigation and content share one edge", () => {
    expect(districtNavCss).toContain("var(--margin-compact)");
    expect(districtNavCss).toContain("var(--margin-medium)");
    expect(districtNavCss).toContain("var(--margin-wide)");
  });

  it("never uses the CSS order property — visual placement can never diverge from DOM/reading order at any breakpoint", () => {
    expect(compositionCss).not.toMatch(/\border\s*:/);
  });

  it("below the wide breakpoint, both roles span the full row and stack in DOM order — no compact-mode override exists", () => {
    // Only the wide (1024px) block may assign a partial grid-column span;
    // outside it, .district-field-primary/.district-field-peripheral keep
    // the shared `grid-column: 1 / -1` rule they're both declared with.
    const wideBlockStart = compositionCss.indexOf("@media (min-width: 1024px)");
    const beforeWide = compositionCss.slice(0, wideBlockStart);
    expect(beforeWide).toContain(
      ".district-field-primary,\n.district-field-peripheral {\n  grid-column: 1 / -1;",
    );
  });
});
