import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M2.7 record-family contract in src/styles/records.css —
 * IMPLEMENTATION_PLAN.md §7 (M2.7), DESIGN_SYSTEM.md v1.1 §34.1, §15,
 * §16.7. See docs/implementation/M2.7_RECORD_FAMILY.md for the full audit
 * and reasoning.
 *
 * Source-text checks only, consistent with the other token-contract
 * suites — this repository has no browser test runner. Semantic/
 * behavioral coverage lives in each component's own *.test.tsx alongside
 * src/components/records/.
 */

const recordsCss = readFileSync(join(process.cwd(), "src", "styles", "records.css"), "utf-8");

// This file's own header/section comments legitimately discuss, in prose,
// classes and properties the code deliberately does NOT use (".card",
// ".plane"/".frame", "aspect-ratio", "object-fit", etc.) — exactly the kind
// of explanatory text this project's CSS files consistently carry. Negative
// assertions below run against the comment-stripped code only, so a prose
// mention of what was avoided can never itself trip the check meant to
// detect that avoidance failing.
const recordsCode = recordsCss.replace(/\/\*[\s\S]*?\*\//g, "");

function ruleBody(css: string, selector: string): string {
  const cleaned = selector.replace(/\s*\{\s*$/, "");
  const escaped = cleaned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? "";
}

describe("Record family contract (IMPLEMENTATION_PLAN.md §7, M2.7)", () => {
  it("defines all five record families", () => {
    for (const selector of [
      ".record-portal",
      ".record-media",
      ".record-index",
      ".record-editorial",
      ".record-product",
    ]) {
      expect(recordsCss).toContain(selector);
    }
  });

  it("does not use one generic card class as the universal container (§34.1)", () => {
    expect(recordsCode).not.toMatch(/\.record-card\b/);
    expect(recordsCode).not.toMatch(/\.card\b/);
  });

  it("does not implement Signal anywhere", () => {
    expect(recordsCode.toLowerCase()).not.toMatch(/\.signal\b|--signal|--color-signal/);
  });

  it("does not use a card shadow or glassmorphism", () => {
    expect(recordsCode).not.toContain("box-shadow");
    expect(recordsCode).not.toContain("backdrop-filter");
  });

  it("does not introduce a giant or capsule radius — no border-radius at all in this file", () => {
    // Records are not permitted to become "cards": no family in this file
    // defines its own border-radius (M2.4/M2.6 already established the one
    // shared restrained radius elsewhere; records don't need a box at all
    // by default).
    expect(recordsCode).not.toMatch(/border-radius/);
    expect(recordsCode).not.toContain("--radius-circle");
  });

  it("does not force uppercase text", () => {
    expect(recordsCode).not.toMatch(/text-transform:\s*uppercase/);
  });

  it("does not default any record to Functional Mono typography", () => {
    expect(recordsCode).not.toMatch(/font-mono-functional|type-mono/);
  });

  it("does not force a universal aspect ratio or crop on any media slot", () => {
    expect(recordsCode).not.toMatch(/aspect-ratio/);
    expect(recordsCode).not.toMatch(/object-fit/);
  });

  it("does not apply a dramatic hover transform/scale — hover is opacity-only, matching M2.5/M2.6", () => {
    expect(recordsCode).not.toMatch(/transform\s*:/);
    expect(recordsCode).not.toMatch(/(?:^|\s)(?:transition|animation)\s*:/);
    for (const hoverSelector of [
      ".record-portal-link:hover",
      ".record-media-link:hover",
      ".record-index-link:hover",
      ".record-editorial-link:hover",
      ".record-product-link:hover",
    ]) {
      const rule = ruleBody(recordsCss, hoverSelector);
      expect(rule, `expected an opacity-only hover rule for ${hoverSelector}`).toMatch(
        /opacity:\s*0\.\d+/,
      );
    }
  });

  it("does not apply an all-record Frame/Plane treatment — no .frame/.plane reference", () => {
    expect(recordsCode).not.toMatch(/\.frame\b|\.plane\b/);
  });

  it("Index Record uses a shared divider between rows, not a repeated per-row box", () => {
    expect(recordsCode).toContain(".record-index + .record-index");
    const rowRule = ruleBody(recordsCode, ".record-index-link");
    expect(rowRule).not.toMatch(/\bborder\s*:/);
  });

  it("does not reuse M2.5/M2.6 action/selection classes as record styling", () => {
    for (const selector of [
      ".action-primary",
      ".action-secondary",
      ".action-tertiary",
      ".filter-toggle",
      ".segmented-",
      ".tab {",
      ".tab-list",
    ]) {
      expect(recordsCode).not.toContain(selector);
    }
  });

  it("does not define a district-specific record", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(recordsCode.toLowerCase()).not.toContain(`.${district}-`);
    }
  });

  it("does not introduce a Product-specific accent color — no hard-coded color anywhere", () => {
    expect(recordsCode).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(recordsCode).not.toMatch(/rgb\(|hsl\(/);
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
      expect(recordsCode).not.toContain(`--${token}`);
    }
  });

  it("does not reference an unresolved token", () => {
    const unresolved = [
      "color-disabled",
      "surface-overlay",
      "opacity-full-authority",
      "opacity-supporting",
      "opacity-latent",
      "opacity-recessed-context",
    ];
    for (const token of unresolved) {
      expect(recordsCode).not.toContain(`var(--${token})`);
    }
  });

  it("every record link exposes a focus-visible rule reusing the shared outline mechanism", () => {
    const shellCss = readFileSync(join(process.cwd(), "src", "styles", "shell.css"), "utf-8");
    const shellFocusRule = shellCss.match(/:focus-visible[^{]*\{([^}]*)\}/)?.[1]?.trim();
    expect(shellFocusRule).toBeTruthy();

    const exactMatchSelectors = [
      ".record-portal-link:focus-visible",
      ".record-media-link:focus-visible",
      ".record-editorial-link:focus-visible",
      ".record-product-link:focus-visible",
    ];
    for (const selector of exactMatchSelectors) {
      const rule = ruleBody(recordsCss, selector).trim();
      expect(rule, `expected a focus-visible rule for ${selector}`).toBe(shellFocusRule);
    }

    // Index rows sit flush against shared dividers with no external margin
    // (same reasoning as M2.6's segmented option) — inward offset instead.
    const indexFocusRule = ruleBody(recordsCss, ".record-index-link:focus-visible").trim();
    expect(indexFocusRule).toContain("outline: var(--line-emphasis) solid var(--color-focus)");
    expect(indexFocusRule).toContain("outline-offset: -2px");
  });
});

describe("No stale token references remain in records.css", () => {
  it("records.css is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/records.css");
  });
});
