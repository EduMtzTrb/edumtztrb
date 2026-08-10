import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M2.11 shared-static-states contract in src/styles/state.css
 * — IMPLEMENTATION_PLAN.md §7 (M2.11), DESIGN_SYSTEM.md v1.1 §21, §86. See
 * docs/implementation/M2.11_SHARED_STATIC_STATES.md for the full audit and
 * reasoning.
 *
 * Source-text checks only, consistent with the other token-contract
 * suites — this repository has no browser test runner. Semantic/
 * behavioral coverage lives in src/components/state/*.test.tsx.
 */

const stateCss = readFileSync(join(process.cwd(), "src", "styles", "state.css"), "utf-8");

// Comment-stripped before any negative assertion (lesson carried over from
// M2.6 onward: this file's own header prose legitimately discusses what it
// deliberately does NOT use).
const stateCode = stateCss.replace(/\/\*[\s\S]*?\*\//g, "");

function ruleBody(css: string, selector: string): string {
  const cleaned = selector.replace(/\s*\{\s*$/, "");
  const escaped = cleaned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? "";
}

describe("Shared static states contract (IMPLEMENTATION_PLAN.md §7, M2.11)", () => {
  it("defines the shared foundation and loading classes", () => {
    for (const selector of [
      ".static-state",
      ".static-state-heading",
      ".static-state-explanation",
      ".static-state-action",
      ".loading-state",
    ]) {
      expect(stateCode).toContain(selector);
    }
  });

  it("does not implement Signal anywhere", () => {
    expect(stateCode.toLowerCase()).not.toMatch(/\.signal\b|--signal|--color-signal/);
  });

  it("does not build a hue-per-state badge taxonomy — color is applied to exactly two states (error, success)", () => {
    const colorRules =
      stateCode.match(/\.static-state-[a-z-]+ \.static-state-heading\s*\{[^}]*color:[^}]*\}/g) ??
      [];
    expect(colorRules.length).toBe(2);
    expect(stateCode).toContain(".static-state-error .static-state-heading");
    expect(stateCode).toContain(".static-state-success .static-state-heading");
  });

  it("does not use a generic card, box-shadow, backdrop-filter, or capsule/pill radius", () => {
    expect(stateCode).not.toMatch(/\.card\b/);
    expect(stateCode).not.toContain("box-shadow");
    expect(stateCode).not.toContain("backdrop-filter");
    expect(stateCode).not.toMatch(/border-radius/);
    expect(stateCode).not.toContain("--radius-circle");
  });

  it("does not define a district-specific selector", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(stateCode.toLowerCase()).not.toContain(`.${district}-`);
    }
  });

  it("does not implement fake skeleton/shimmer content — no pseudo-elements, no background-image, no gradient", () => {
    expect(stateCode).not.toMatch(/::before|::after/);
    // Anchored so it doesn't false-positive on `.loading-state`'s own
    // legitimate `justify-content:` declaration.
    expect(stateCode).not.toMatch(/(?:^|\s)content\s*:/);
    expect(stateCode).not.toMatch(/background-image|gradient/);
  });

  it("does not introduce animation/transition choreography", () => {
    expect(stateCode).not.toMatch(/(?:^|\s)(?:transition|animation)\s*:/);
  });

  it("does not hard-code a color — every color reference is var(--...), reusing already-resolved functional colors", () => {
    expect(stateCode).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(stateCode).not.toMatch(/rgb\(|hsl\(/);
    expect(ruleBody(stateCss, ".static-state-error .static-state-heading")).toContain(
      "var(--color-error)",
    );
    expect(ruleBody(stateCss, ".static-state-success .static-state-heading")).toContain(
      "var(--color-success)",
    );
  });

  it("does not introduce a second spacing scale — every gap uses var(--space-*)", () => {
    const gapDeclarations = stateCode.match(/(?:gap|margin-block-start)\s*:\s*[^;]+;/g) ?? [];
    expect(gapDeclarations.length).toBeGreaterThan(0);
    for (const declaration of gapDeclarations) {
      expect(declaration).toMatch(/var\(--space-\d+\)/);
    }
  });

  it("does not recalibrate typography — no font-family or font-size declared", () => {
    expect(stateCode).not.toMatch(/font-family\s*:/);
    expect(stateCode).not.toMatch(/font-size\s*:/);
  });

  it("does not reference a retired or still-unresolved token", () => {
    const retired = [
      "line-standard",
      "surface-1",
      "surface-2",
      "color-district-accent",
      "font-primary",
      "font-technical",
    ];
    for (const token of retired) {
      expect(stateCode).not.toContain(`--${token}`);
    }
    const unresolved = [
      "color-disabled",
      "surface-overlay",
      "opacity-full-authority",
      "opacity-supporting",
      "opacity-recessed-context",
    ];
    for (const token of unresolved) {
      expect(stateCode).not.toContain(`var(--${token})`);
    }
  });
});

describe("No stale token references remain in state.css", () => {
  it("state.css is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/state.css");
  });
});
