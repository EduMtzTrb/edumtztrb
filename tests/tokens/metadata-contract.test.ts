import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M2.9 metadata-rail contract in src/styles/metadata.css —
 * IMPLEMENTATION_PLAN.md §7 (M2.9), DESIGN_SYSTEM.md v1.1 §22, §34.2, §97.
 * See docs/implementation/M2.9_METADATA_RAIL.md for the full audit and
 * reasoning.
 *
 * Source-text checks only, consistent with the other token-contract
 * suites — this repository has no browser test runner. Semantic/
 * behavioral coverage lives in src/components/metadata/*.test.tsx.
 */

const metadataCss = readFileSync(join(process.cwd(), "src", "styles", "metadata.css"), "utf-8");

// Comment-stripped before any negative assertion — this file's own header
// prose legitimately discusses classes/properties it deliberately does NOT
// use (lesson carried over from M2.6/M2.7/M2.8).
const metadataCode = metadataCss.replace(/\/\*[\s\S]*?\*\//g, "");

function ruleBody(css: string, selector: string): string {
  const cleaned = selector.replace(/\s*\{\s*$/, "");
  const escaped = cleaned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? "";
}

describe("Metadata rail contract (IMPLEMENTATION_PLAN.md §7, M2.9)", () => {
  it("defines the rail, item, label/value, and group classes", () => {
    for (const selector of [
      ".metadata-rail",
      ".metadata-item",
      ".metadata-label",
      ".metadata-value",
      ".metadata-group",
    ]) {
      expect(metadataCode).toContain(selector);
    }
  });

  it("implements real compact-screen reflow — one column by default, two columns from 768px (the same breakpoint layout.css already uses)", () => {
    expect(ruleBody(metadataCss, ".metadata-rail")).toContain("grid-template-columns: 1fr");
    expect(metadataCode).toContain("@media (min-width: 768px)");
    const wideBlock = metadataCss.match(
      /@media \(min-width: 768px\) \{\s*\.metadata-rail \{([^}]*)\}/,
    )?.[1];
    expect(wideBlock).toContain("grid-template-columns: max-content 1fr");
  });

  it("flattens item wrappers via display: contents rather than breaking grid alignment", () => {
    expect(ruleBody(metadataCss, ".metadata-item")).toContain("display: contents");
  });

  it("differentiates the Primary/Latent tiers via already-resolved tokens, not a new color", () => {
    const primaryRule = ruleBody(
      metadataCss,
      '.metadata-item[data-tier="primary"] .metadata-value',
    );
    expect(primaryRule).toContain("var(--color-light-text)");
    const latentRule = ruleBody(metadataCss, '.metadata-item[data-tier="latent"] .metadata-value');
    expect(latentRule).toContain("var(--opacity-latent)");
  });

  it("does not use a generic card, box-shadow, backdrop-filter, or capsule radius", () => {
    expect(metadataCode).not.toMatch(/\.card\b/);
    expect(metadataCode).not.toContain("box-shadow");
    expect(metadataCode).not.toContain("backdrop-filter");
    expect(metadataCode).not.toMatch(/border-radius/);
    expect(metadataCode).not.toContain("--radius-circle");
  });

  it("does not implement Signal or a metadata status color taxonomy", () => {
    expect(metadataCode.toLowerCase()).not.toMatch(/\.signal\b|--signal|--color-signal/);
  });

  it("does not define a district-specific metadata selector", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(metadataCode.toLowerCase()).not.toContain(`.${district}-`);
    }
  });

  it("does not hard-code a color — every color reference is var(--...)", () => {
    expect(metadataCode).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(metadataCode).not.toMatch(/rgb\(|hsl\(/);
  });

  it("does not force uppercase text", () => {
    expect(metadataCode).not.toMatch(/text-transform:\s*uppercase/);
  });

  it("does not introduce a second spacing scale — every gap uses var(--space-*)", () => {
    const gapDeclarations = metadataCode.match(/(?:column-gap|row-gap)\s*:\s*[^;]+;/g) ?? [];
    expect(gapDeclarations.length).toBeGreaterThan(0);
    for (const declaration of gapDeclarations) {
      expect(declaration).toMatch(/var\(--space-\d+\)/);
    }
  });

  it("does not recalibrate typography — no font-family or font-size, no new font", () => {
    expect(metadataCode).not.toMatch(/font-family\s*:/);
    expect(metadataCode).not.toMatch(/font-size\s*:/);
  });

  it("does not hide metadata behind hover and does not truncate by default", () => {
    expect(metadataCode).not.toMatch(/:hover/);
    expect(metadataCode).not.toMatch(/text-overflow|white-space:\s*nowrap|overflow:\s*hidden/);
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
      expect(metadataCode).not.toContain(`--${token}`);
    }
  });

  it("does not reference a still-unresolved token", () => {
    const unresolved = [
      "color-disabled",
      "surface-overlay",
      "opacity-full-authority",
      "opacity-supporting",
      "opacity-recessed-context",
    ];
    for (const token of unresolved) {
      expect(metadataCode).not.toContain(`var(--${token})`);
    }
  });
});

describe("Metadata rail — opacity-latent resolution", () => {
  it("--opacity-latent is resolved (M2.9's own responsibility) with a real value", () => {
    const opacityCss = readFileSync(
      join(process.cwd(), "src", "styles", "tokens", "opacity.css"),
      "utf-8",
    );
    expect(opacityCss).toMatch(/--opacity-latent:\s*0\.\d+;/);
  });
});

describe("No stale token references remain in metadata.css", () => {
  it("metadata.css is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/metadata.css");
  });
});
