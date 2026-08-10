import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M2.10 form-family contract in src/styles/form.css —
 * IMPLEMENTATION_PLAN.md §7 (M2.10), DESIGN_SYSTEM.md v1.1 §33. See
 * docs/implementation/M2.10_FORM_FAMILY.md for the full audit and
 * reasoning.
 *
 * Source-text checks only, consistent with the other token-contract
 * suites — this repository has no browser test runner. Semantic/
 * behavioral coverage lives in src/components/form/*.test.tsx.
 */

const formCss = readFileSync(join(process.cwd(), "src", "styles", "form.css"), "utf-8");

// Comment-stripped before any negative assertion (lesson carried over from
// M2.6/M2.7/M2.8/M2.9: this file's own header prose legitimately discusses
// what it deliberately does NOT use).
const formCode = formCss.replace(/\/\*[\s\S]*?\*\//g, "");

function ruleBody(css: string, selector: string): string {
  const cleaned = selector.replace(/\s*\{\s*$/, "");
  const escaped = cleaned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? "";
}

describe("Form family contract (IMPLEMENTATION_PLAN.md §7, M2.10)", () => {
  it("defines the field anatomy classes", () => {
    for (const selector of [
      ".form-field",
      ".form-label",
      ".form-required",
      ".form-guidance",
      ".text-field",
      ".textarea-field",
      ".form-error",
      ".form-confirmation",
    ]) {
      expect(formCode).toContain(selector);
    }
  });

  it("does not implement label-via-placeholder — no ::placeholder rule exists", () => {
    expect(formCode).not.toMatch(/::placeholder/);
  });

  it("does not use a generic card, box-shadow, backdrop-filter, or capsule radius", () => {
    expect(formCode).not.toMatch(/\.card\b/);
    expect(formCode).not.toContain("box-shadow");
    expect(formCode).not.toContain("backdrop-filter");
    expect(formCode).not.toContain("--radius-circle");
    expect(formCode).toContain("var(--radius-control)");
  });

  it("does not implement Signal anywhere", () => {
    expect(formCode.toLowerCase()).not.toMatch(/\.signal\b|--signal|--color-signal/);
  });

  it("does not define a district-specific form selector", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(formCode.toLowerCase()).not.toContain(`.${district}-`);
    }
  });

  it("does not force uppercase text and does not default to Functional Mono", () => {
    expect(formCode).not.toMatch(/text-transform:\s*uppercase/);
    expect(formCode).not.toMatch(/font-mono-functional|type-mono/);
  });

  it("does not recalibrate typography — no font-family or font-size declared", () => {
    expect(formCode).not.toMatch(/font-family\s*:/);
    expect(formCode).not.toMatch(/font-size\s*:/);
  });

  it("does not introduce a second spacing scale — every gap uses var(--space-*)", () => {
    const gapDeclarations = formCode.match(/gap\s*:\s*[^;]+;/g) ?? [];
    expect(gapDeclarations.length).toBeGreaterThan(0);
    for (const declaration of gapDeclarations) {
      expect(declaration).toMatch(/var\(--space-\d+\)/);
    }
  });

  it("does not introduce unauthorized animation/transition", () => {
    expect(formCode).not.toMatch(/(?:^|\s)(?:transition|animation)\s*:/);
  });

  it("does not reference a still-unresolved or retired token", () => {
    const retired = [
      "line-standard",
      "surface-1",
      "surface-2",
      "color-district-accent",
      "font-primary",
      "font-technical",
    ];
    for (const token of retired) {
      expect(formCode).not.toContain(`--${token}`);
    }
    const unresolved = [
      "color-disabled",
      "surface-overlay",
      "opacity-full-authority",
      "opacity-supporting",
      "opacity-recessed-context",
    ];
    for (const token of unresolved) {
      expect(formCode).not.toContain(`var(--${token})`);
    }
  });

  it("reuses the already-resolved functional semantic colors for error/confirmation — no new color", () => {
    expect(formCode).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(formCode).not.toMatch(/rgb\(|hsl\(/);
    expect(ruleBody(formCss, ".form-error")).toContain("var(--color-error)");
    expect(ruleBody(formCss, ".form-confirmation")).toContain("var(--color-success)");
  });

  it("error is more than a color change — border color plus a real error-text class exists", () => {
    expect(
      ruleBody(formCss, '.text-field[aria-invalid="true"],\n.textarea-field[aria-invalid="true"]'),
    ).toMatch(/border-color/);
    expect(formCode).toContain(".form-error");
  });

  it("reuses --opacity-disabled for disabled fields — no second disabled model", () => {
    const disabledRule = ruleBody(formCss, ".text-field:disabled,\n.textarea-field:disabled");
    expect(disabledRule).toContain("var(--opacity-disabled)");
  });

  it("every field control exposes a focus-visible rule reusing the shared outline mechanism", () => {
    const shellCss = readFileSync(join(process.cwd(), "src", "styles", "shell.css"), "utf-8");
    const shellFocusRule = shellCss.match(/:focus-visible[^{]*\{([^}]*)\}/)?.[1]?.trim();
    expect(shellFocusRule).toBeTruthy();
    const fieldFocusRule = ruleBody(
      formCss,
      ".text-field:focus-visible,\n.textarea-field:focus-visible",
    ).trim();
    expect(fieldFocusRule).toBe(shellFocusRule);
  });
});

describe("No stale token references remain in form.css", () => {
  it("form.css is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/form.css");
  });
});
