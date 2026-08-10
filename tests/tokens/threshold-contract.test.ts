import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Home-Threshold Prototype contract — M4.9. Source-level evidence for
 * what jsdom cannot verify: token-only motion, no new duration tier, no
 * dramatic transform/scale, no environmental loop.
 */

const thresholdCss = readFileSync(join(process.cwd(), "src", "styles", "threshold.css"), "utf-8");

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Threshold CSS contract (M4.9)", () => {
  it("every transition declaration references only motion tokens", () => {
    const css = stripComments(thresholdCss);
    const declarations = css.match(/transition(?:-duration)?\s*:\s*[^;]+;/g) ?? [];
    expect(declarations.length).toBeGreaterThan(0);
    for (const declaration of declarations) {
      expect(declaration).toMatch(/var\(--motion-/);
      expect(declaration).not.toMatch(/\b\d+m?s\b/);
    }
  });

  it("first entry uses the spatial (largest non-ambient) duration tier, repeated entry uses a shorter one", () => {
    expect(thresholdCss).toMatch(
      /\[data-threshold-state="first-entry"\][^}]*var\(--motion-duration-spatial\)/,
    );
    expect(thresholdCss).toMatch(
      /\[data-threshold-state="repeated-entry"\][^}]*var\(--motion-duration-standard\)/,
    );
  });

  it("does not invent a new duration/easing/recession token — only tokens M4.1 already declared", () => {
    const css = stripComments(thresholdCss);
    expect(css).not.toMatch(/--motion-duration-(district|threshold|world)/);
    expect(css).not.toMatch(/:\s*\d+m?s\b/);
  });

  it("no transform/scale/zoom/blur/perspective — opacity only, same restrained channel as M4.4/M4.5", () => {
    const css = stripComments(thresholdCss);
    expect(css).not.toMatch(/transform\s*:/);
    expect(css).not.toMatch(/scale\(/);
    expect(css).not.toMatch(/zoom\s*:/);
    expect(css).not.toMatch(/blur\(/);
    expect(css).not.toMatch(/perspective/);
  });

  it("no @keyframes or named animation — no environmental loop", () => {
    expect(thresholdCss).not.toMatch(/@keyframes/);
    expect(thresholdCss).not.toMatch(/animation(?:-name)?\s*:/);
  });

  it("is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/threshold.css");
  });
});
