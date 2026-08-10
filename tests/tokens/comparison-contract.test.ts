import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Comparison contract — M4.10 §C6. Source-level evidence: no motion of
 * any kind anywhere in this file (deliberate — comparison must be usable
 * while completely still), and the responsive scroll-container discipline
 * exists rather than a destructive stack.
 */

const comparisonCss = readFileSync(join(process.cwd(), "src", "styles", "comparison.css"), "utf-8");

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Comparison CSS contract (M4.10)", () => {
  it("declares no transition, @keyframes, or animation anywhere — no continuous motion during comparison", () => {
    const css = stripComments(comparisonCss);
    expect(css).not.toMatch(/transition\s*:/);
    expect(css).not.toMatch(/@keyframes/);
    expect(css).not.toMatch(/animation\s*:/);
  });

  it("provides a horizontal-scroll container rather than a destructive stack at narrow widths", () => {
    expect(comparisonCss).toMatch(/\.comparison-scroll\s*\{[^}]*overflow-x:\s*auto/);
  });

  it("does not hard-code color — uses only existing tokens", () => {
    expect(comparisonCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(comparisonCss).not.toMatch(/rgb\(|hsl\(/);
  });

  it("is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/comparison.css");
  });
});
