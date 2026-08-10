import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M2.8 media-family contract in src/styles/media.css —
 * IMPLEMENTATION_PLAN.md §7 (M2.8), DESIGN_SYSTEM.md v1.1 §37, §38, §40,
 * §41, §42, §43, §45, §102. See docs/implementation/M2.8_MEDIA_FAMILY.md
 * for the full audit and reasoning.
 *
 * Source-text checks only, consistent with the other token-contract
 * suites — this repository has no browser test runner. Semantic/
 * behavioral coverage lives in each component's own *.test.tsx alongside
 * src/components/media/.
 */

const mediaCss = readFileSync(join(process.cwd(), "src", "styles", "media.css"), "utf-8");

// This file's own header/section comments legitimately discuss, in prose,
// classes and properties the code deliberately does NOT use — the same
// class of explanatory text every prior M2 stylesheet carries. Negative
// assertions below run against the comment-stripped code only (lesson
// carried over from M2.6/M2.7: a prose mention of what was avoided must
// never itself trip the check meant to detect that avoidance failing).
const mediaCode = mediaCss.replace(/\/\*[\s\S]*?\*\//g, "");

function ruleBody(css: string, selector: string): string {
  const cleaned = selector.replace(/\s*\{\s*$/, "");
  const escaped = cleaned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? "";
}

describe("Media family contract (IMPLEMENTATION_PLAN.md §7, M2.8)", () => {
  it("defines all nine confirmed media families", () => {
    for (const selector of [
      ".media-figure",
      ".media-caption",
      ".media-gallery-sequence",
      ".media-comparison-pair",
      ".media-comparison-matrix",
      ".media-document-plate",
      ".media-video",
      ".media-artwork-viewer",
      ".media-product-media-set",
    ]) {
      expect(mediaCode).toContain(selector);
    }
  });

  it("does not use a generic card class anywhere", () => {
    expect(mediaCode).not.toMatch(/\.card\b/);
  });

  it("does not use a card shadow or glassmorphism", () => {
    expect(mediaCode).not.toContain("box-shadow");
    expect(mediaCode).not.toContain("backdrop-filter");
  });

  it("does not introduce a giant or capsule radius — no border-radius anywhere in this file", () => {
    expect(mediaCode).not.toMatch(/border-radius/);
    expect(mediaCode).not.toContain("--radius-circle");
  });

  it("does not implement Signal anywhere", () => {
    expect(mediaCode.toLowerCase()).not.toMatch(/\.signal\b|--signal|--color-signal/);
  });

  it("does not define a district-specific media selector", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(mediaCode.toLowerCase()).not.toContain(`.${district}-`);
    }
  });

  it("does not introduce a Product-specific accent color — no hard-coded color anywhere", () => {
    expect(mediaCode).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(mediaCode).not.toMatch(/rgb\(|hsl\(/);
  });

  it("does not force a universal aspect ratio or crop on any media slot", () => {
    expect(mediaCode).not.toMatch(/aspect-ratio/);
    expect(mediaCode).not.toMatch(/object-fit/);
    expect(mediaCode).not.toMatch(/object-position/);
  });

  it("does not apply a dramatic hover transform, and introduces no transition/animation", () => {
    expect(mediaCode).not.toMatch(/transform\s*:/);
    expect(mediaCode).not.toMatch(/(?:^|\s)(?:transition|animation)\s*:/);
    expect(mediaCode).not.toMatch(/:hover/);
  });

  it("does not fake browser chrome or paper texture — no pseudo-elements, no background-image", () => {
    expect(mediaCode).not.toMatch(/::before|::after/);
    expect(mediaCode).not.toMatch(/content\s*:/);
    expect(mediaCode).not.toMatch(/background-image/);
  });

  it("applies .frame (via className, not a CSS rule) only to Document Plate — no other primitive's component source references it", () => {
    const mediaComponentsDir = join(process.cwd(), "src", "components", "media");
    const otherComponents = [
      "Figure.tsx",
      "ArtworkViewer.tsx",
      "GallerySequence.tsx",
      "ComparisonPair.tsx",
      "ComparisonMatrix.tsx",
      "ProductMediaSet.tsx",
      "VideoFrame.tsx",
      "Caption.tsx",
    ];
    for (const file of otherComponents) {
      const source = readFileSync(join(mediaComponentsDir, file), "utf-8");
      expect(source, `${file} should not apply .frame/.plane`).not.toMatch(
        /className=".*\b(?:frame|plane)\b/,
      );
    }
    const documentPlateSource = readFileSync(
      join(mediaComponentsDir, "DocumentPlate.tsx"),
      "utf-8",
    );
    expect(documentPlateSource).toMatch(/className="media-document-plate frame"/);
  });

  it("does not introduce a second spacing scale — every gap/margin/padding uses var(--space-*)", () => {
    const spacingProperties =
      mediaCode.match(/(?:gap|margin[a-z-]*|padding[a-z-]*)\s*:\s*[^;]+;/g) ?? [];
    expect(spacingProperties.length).toBeGreaterThan(0);
    for (const declaration of spacingProperties) {
      expect(declaration).toMatch(/var\(--space-\d+\)|^\s*(?:margin|padding)\s*:\s*0\s*;/);
    }
  });

  it("does not recalibrate typography — no font-family or font-size declared in this file", () => {
    expect(mediaCode).not.toMatch(/font-family\s*:/);
    expect(mediaCode).not.toMatch(/font-size\s*:/);
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
      expect(mediaCode).not.toContain(`--${token}`);
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
      expect(mediaCode).not.toContain(`var(--${token})`);
    }
  });

  it("introduces no custom :focus-visible rule — no interactive custom control exists yet to need one", () => {
    expect(mediaCode).not.toMatch(/:focus-visible/);
  });

  it("does not gate caption/credit visibility behind hover", () => {
    expect(ruleBody(mediaCss, ".media-caption")).not.toMatch(
      /display:\s*none|visibility:\s*hidden/,
    );
    expect(ruleBody(mediaCss, ".media-credit")).not.toMatch(/display:\s*none|visibility:\s*hidden/);
  });
});

describe("No stale token references remain in media.css", () => {
  it("media.css is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/media.css");
  });
});
