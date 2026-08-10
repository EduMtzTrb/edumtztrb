import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M2.6 selection/filter-controls contract in
 * src/styles/selection.css — IMPLEMENTATION_PLAN.md §7 (M2.6), and
 * DESIGN_SYSTEM.md v1.1 §21.1, §31/§85, §65, §96, §101. See
 * docs/implementation/M2.6_SELECTION_FILTER_CONTROLS.md for the full audit
 * and reasoning.
 *
 * Source-text checks only, consistent with the other token-contract
 * suites — this repository has no browser test runner. Semantic/behavioral
 * coverage (roles, keyboard behavior, checked/selected DOM state) lives in
 * each component's own *.test.tsx alongside src/components/selection/.
 */

const selectionCss = readFileSync(join(process.cwd(), "src", "styles", "selection.css"), "utf-8");

function ruleBody(css: string, selector: string): string {
  // Accepts a selector with or without a trailing "{" — either way, the
  // brace-matching below is added exactly once.
  const cleaned = selector.replace(/\s*\{\s*$/, "");
  const escaped = cleaned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? "";
}

describe("Selection/filter controls contract (IMPLEMENTATION_PLAN.md §7, M2.6)", () => {
  it("defines all required control families", () => {
    for (const selector of [
      ".tab-list",
      ".tab {",
      ".segmented-view",
      ".segmented-option-label",
      ".filter-toggle",
      ".checkbox {",
      ".checkbox-box",
      ".radio {",
      ".radio-dot",
      ".select {",
      ".status-tag",
      ".removable-filter",
      ".visually-hidden-input",
    ]) {
      expect(selectionCss).toContain(selector);
    }
  });

  it('protects the M2.6 governing rule — "Selected state must use more than color alone" — every selected/checked rule pairs a color change with a non-color channel', () => {
    expect(ruleBody(selectionCss, '.tab[aria-selected="true"]')).toMatch(/font-weight/);
    expect(ruleBody(selectionCss, '.filter-toggle[aria-pressed="true"]')).toMatch(/font-weight/);
    expect(
      ruleBody(selectionCss, ".segmented-option-input:checked + .segmented-option-label"),
    ).toMatch(/font-weight/);
    // Checkbox/radio: checked state reveals an explicit shape (the ::after
    // checkmark/dot goes from opacity 0 to 1) — a shape channel, not color.
    expect(selectionCss).toContain(".checkbox-box::after");
    expect(ruleBody(selectionCss, ".visually-hidden-input:checked + .checkbox-box::after")).toMatch(
      /opacity:\s*1/,
    );
    expect(selectionCss).toContain(".radio-dot::after");
    expect(ruleBody(selectionCss, ".visually-hidden-input:checked + .radio-dot::after")).toMatch(
      /opacity:\s*1/,
    );
  });

  it("does not implement Signal anywhere — no chromatic value or class exists for it in this file", () => {
    expect(selectionCss.toLowerCase()).not.toMatch(/\.signal\b|--signal|--color-signal/);
  });

  it("[M2.12 responsive correction] segmented-view options wrap rather than clip at narrow widths", () => {
    // .segmented-view-options uses overflow:hidden for its rounded-corner
    // clipping; without flex-wrap, options with enough combined width
    // (many segments, or long labels) would be cut off rather than
    // recomposed at compact viewports. Regression test for the fix
    // documented in docs/implementation/M2.12_RESPONSIVE_PRIMITIVE_VERIFICATION.md.
    expect(ruleBody(selectionCss, ".segmented-view-options")).toMatch(/flex-wrap:\s*wrap/);
  });

  it("does not make pill/capsule geometry the dominant control language", () => {
    // --radius-circle is permitted only for the genuine circular radio-dot
    // marker (the dot and its filled inner ::after) — not for any
    // button/toggle/tag/chip control surface.
    const circleUses = selectionCss.match(/var\(--radius-circle\)/g) ?? [];
    expect(circleUses.length).toBeGreaterThan(0);
    expect(ruleBody(selectionCss, ".radio-dot {")).toContain("var(--radius-circle)");
    for (const surface of [
      ".filter-toggle {",
      ".removable-filter {",
      ".status-tag {",
      ".select {",
    ]) {
      expect(ruleBody(selectionCss, surface)).not.toContain("--radius-circle");
    }
  });

  it("does not force uppercase text (no invented shouting-label convention)", () => {
    expect(selectionCss).not.toMatch(/text-transform:\s*uppercase/);
  });

  it("does not introduce a card/panel pattern — no box-shadow, no backdrop-filter", () => {
    expect(selectionCss).not.toContain("box-shadow");
    expect(selectionCss).not.toContain("backdrop-filter");
  });

  it("does not define a district-specific control", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(selectionCss.toLowerCase()).not.toContain(`.${district}-`);
    }
  });

  it("uses only var(--...) values — no hard-coded color, no transition/animation property", () => {
    expect(selectionCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(selectionCss).not.toMatch(/rgb\(|hsl\(/);
    expect(selectionCss).not.toMatch(/(?:^|\s)(?:transition|animation)\s*:/);
  });

  it("does not reintroduce any retired token name", () => {
    const retired = [
      "line-standard",
      "surface-1",
      "surface-2",
      "color-district-accent",
      "font-primary",
      "font-technical",
    ];
    for (const token of retired) {
      expect(selectionCss).not.toContain(`--${token}`);
    }
  });

  it("does not reference an unresolved token (color-disabled, surface-overlay, or any unresolved opacity role)", () => {
    const unresolved = [
      "color-disabled",
      "surface-overlay",
      "opacity-full-authority",
      "opacity-supporting",
      "opacity-latent",
      "opacity-recessed-context",
    ];
    for (const token of unresolved) {
      expect(selectionCss).not.toContain(`var(--${token})`);
    }
  });

  it("does not mint a new selected-control-surface token — reuses already-resolved neutrals directly (§101)", () => {
    // Matches only an actual custom-property *declaration* (name followed
    // by a colon) — the file's header comment discusses this decision in
    // prose and legitimately names the token it chose not to add.
    expect(selectionCss).not.toMatch(
      /--(?:control-surface|selected-control-surface|color-selected)\s*:/,
    );
  });

  it("meets the 44px minimum hit area for the primary interactive controls", () => {
    for (const selector of [".tab {", ".filter-toggle {", ".checkbox {", ".radio {", ".select {"]) {
      expect(ruleBody(selectionCss, selector)).toMatch(/min-height:\s*44px/);
    }
  });

  it("every interactive family exposes a focus-visible rule reusing the shared outline mechanism", () => {
    const shellCss = readFileSync(join(process.cwd(), "src", "styles", "shell.css"), "utf-8");
    const shellFocusRule = shellCss.match(/:focus-visible[^{]*\{([^}]*)\}/)?.[1]?.trim();
    expect(shellFocusRule).toBeTruthy();

    // Standalone controls (own box-model, external margin available) reuse
    // the shared rule byte-for-byte, same as M2.5's controls.css.
    const exactMatchSelectors = [
      ".tab:focus-visible",
      ".filter-toggle:focus-visible",
      ".visually-hidden-input:focus-visible + .checkbox-box",
      ".visually-hidden-input:focus-visible + .radio-dot",
      ".select:focus-visible",
    ];
    for (const selector of exactMatchSelectors) {
      const rule = ruleBody(selectionCss, selector).trim();
      expect(rule, `expected a focus-visible rule for ${selector}`).toBe(shellFocusRule);
    }

    // Segmented options sit flush against each other with no external
    // margin, so this one control uses the same weight/color with an
    // inward (negative) offset instead of the standard outward one —
    // documented in docs/implementation/M2.6_SELECTION_FILTER_CONTROLS.md.
    const segmentedFocusRule = ruleBody(
      selectionCss,
      ".segmented-option-input:focus-visible + .segmented-option-label",
    ).trim();
    expect(segmentedFocusRule).toContain("outline: var(--line-emphasis) solid var(--color-focus)");
    expect(segmentedFocusRule).toContain("outline-offset: -2px");
  });
});

describe("No stale token references remain in selection.css", () => {
  it("selection.css is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/selection.css");
  });
});
