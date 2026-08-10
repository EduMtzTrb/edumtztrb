import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M2.5 action-controls contract in src/styles/controls.css —
 * DESIGN_SYSTEM.md v1.1 §25-29, §101. See
 * docs/implementation/M2.5_ACTION_CONTROLS.md for the full reasoning.
 *
 * Source-text checks only, consistent with the other token-contract
 * suites — this repository has no browser test runner. The button/link
 * semantic boundary itself is protected at the type level (Action.tsx,
 * ActionLink.tsx) and exercised in Action.test.tsx / ActionLink.test.tsx;
 * this file protects only the shared stylesheet those components consume.
 */

const controlsCss = readFileSync(join(process.cwd(), "src", "styles", "controls.css"), "utf-8");

describe("Action controls contract (DESIGN_SYSTEM.md v1.1 §25-29)", () => {
  it("defines all three action levels, plus route/utility and inline link treatments", () => {
    expect(controlsCss).toContain(".action-primary");
    expect(controlsCss).toContain(".action-secondary");
    expect(controlsCss).toContain(".action-tertiary");
    expect(controlsCss).toContain(".link {");
    expect(controlsCss).toContain(".link-inline {");
  });

  it("defines default, hover, pressed, focus-visible, disabled, and loading states (§28 button invariant)", () => {
    expect(controlsCss).toMatch(/:hover/);
    expect(controlsCss).toMatch(/:active/);
    expect(controlsCss).toMatch(/:focus-visible/);
    expect(controlsCss).toMatch(/:disabled/);
    expect(controlsCss).toMatch(/\[aria-busy="true"\]/);
  });

  it('focus-visible reuses the shell\'s exact focus mechanism, not a newly invented one (§25 "may not redefine focus behavior")', () => {
    const shellCss = readFileSync(join(process.cwd(), "src", "styles", "shell.css"), "utf-8");
    const shellFocusRule = shellCss.match(/:focus-visible[^{]*\{([^}]*)\}/)?.[1]?.trim();
    const controlsFocusRule = controlsCss.match(/:focus-visible[^{]*\{([^}]*)\}/)?.[1]?.trim();
    expect(shellFocusRule).toBeTruthy();
    expect(controlsFocusRule).toBe(shellFocusRule);
  });

  it("does not implement Signal anywhere — no chromatic value or class exists for it in this file", () => {
    expect(controlsCss.toLowerCase()).not.toMatch(/\.signal\b|--signal|--color-signal/);
  });

  it("does not introduce a card/panel pattern — no box-shadow, no backdrop-filter", () => {
    expect(controlsCss).not.toContain("box-shadow");
    expect(controlsCss).not.toContain("backdrop-filter");
  });

  it("does not force uppercase text (no invented shouting-label convention)", () => {
    expect(controlsCss).not.toMatch(/text-transform:\s*uppercase/);
  });

  it("does not define a district-specific control", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(controlsCss.toLowerCase()).not.toContain(`.${district}-`);
    }
  });

  it("uses only var(--...) values — no hard-coded color (comment prose mentioning one elsewhere is fine)", () => {
    expect(controlsCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(controlsCss).not.toMatch(/rgb\(|hsl\(/);
  });

  it("M4.3: every transition declaration uses only motion tokens — no raw duration/easing, no @keyframes animation", () => {
    const transitionDeclarations =
      controlsCss.match(/transition(?:-duration)?\s*:\s*[^;]+;/g) ?? [];
    expect(transitionDeclarations.length).toBeGreaterThan(0);
    for (const declaration of transitionDeclarations) {
      expect(declaration).toMatch(/var\(--motion-/);
      expect(declaration).not.toMatch(/\b\d+m?s\b/);
    }
    expect(controlsCss).not.toMatch(/@keyframes|animation\s*:|animation-name\s*:/);
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
      expect(controlsCss).not.toContain(`--${token}`);
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
      expect(controlsCss).not.toContain(`var(--${token})`);
    }
  });

  it("meets the 44px minimum hit area for buttons and route/utility links (§29)", () => {
    const sharedGeometryRule = controlsCss.match(
      /\.action-primary,[\s\S]*?\.link\s*\{([^}]*)\}/,
    )?.[1];
    expect(sharedGeometryRule).toMatch(/min-height:\s*44px/);
  });
});
