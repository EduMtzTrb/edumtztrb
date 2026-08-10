import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Record Passage contract — M4.8 reconciliation. Source-level evidence:
 * token-only motion, no new tier, stays below M4.9's District-Passage
 * tier, no prohibited movement pattern.
 */

const recordPassageCss = readFileSync(
  join(process.cwd(), "src", "styles", "record-passage.css"),
  "utf-8",
);

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Record Passage CSS contract (M4.8 reconciliation)", () => {
  it("every transition declaration references only motion tokens", () => {
    const css = stripComments(recordPassageCss);
    const declarations = css.match(/transition(?:-duration)?\s*:\s*[^;]+;/g) ?? [];
    expect(declarations.length).toBeGreaterThan(0);
    for (const declaration of declarations) {
      expect(declaration).toMatch(/var\(--motion-/);
      expect(declaration).not.toMatch(/\b\d+m?s\b/);
    }
  });

  it("uses the deliberate duration tier (same as Focus) — never the spatial tier M4.9 already claimed for District Passage", () => {
    const css = stripComments(recordPassageCss);
    expect(css).toContain("var(--motion-duration-deliberate)");
    expect(css).not.toContain("--motion-duration-spatial");
    expect(css).not.toContain("--motion-duration-ambient");
  });

  it("uses only already-declared M4.1 tokens — no new duration/easing/distance/recession value", () => {
    expect(recordPassageCss).toContain("var(--motion-distance-record)");
    expect(recordPassageCss).toContain("var(--motion-recession-subtle)");
    expect(recordPassageCss).toContain("var(--motion-ease-move)");
    expect(recordPassageCss).not.toMatch(/--motion-[a-z-]+\s*:/); // no new token *declared* in this file
  });

  it("the restrained translation stays within the approved distance token — no large/cinematic movement", () => {
    expect(recordPassageCss).toMatch(/translateY\(calc\(-1 \* var\(--motion-distance-record\)\)\)/);
    expect(recordPassageCss).not.toMatch(/translateX/);
    expect(recordPassageCss).not.toMatch(/scale\(/);
    expect(recordPassageCss).not.toMatch(/perspective/);
    expect(recordPassageCss).not.toMatch(/rotate/);
  });

  it("no @keyframes or named animation — a one-time settle, never a loop", () => {
    expect(recordPassageCss).not.toMatch(/@keyframes/);
    expect(recordPassageCss).not.toMatch(/animation(?:-name)?\s*:/);
  });

  it("does not reference a district-specific selector", () => {
    const css = stripComments(recordPassageCss).toLowerCase();
    for (const district of ["work-", "research-", "lab-", "art-", "products-", "about-", "home-"]) {
      expect(css, `record-passage.css contains a "${district}" selector`).not.toContain(
        `.${district}`,
      );
    }
  });

  it("is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/record-passage.css");
  });
});
