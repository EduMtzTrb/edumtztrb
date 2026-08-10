import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Trace contract — M4.10 §C12. Source-level evidence: no new line/color
 * token invented, layout only, no decorative-network motion.
 */

const traceCss = readFileSync(join(process.cwd(), "src", "styles", "trace.css"), "utf-8");
const traceSource = readFileSync(
  join(process.cwd(), "src", "components", "trace", "Trace.tsx"),
  "utf-8",
);

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("Trace CSS contract (M4.10)", () => {
  it("declares no @keyframes/animation/transition — no decorative motion", () => {
    const css = stripComments(traceCss);
    expect(css).not.toMatch(/@keyframes/);
    expect(css).not.toMatch(/animation\s*:/);
    expect(css).not.toMatch(/transition\s*:/);
  });

  it("does not invent a new line-relationship-trace token value", () => {
    expect(traceCss).not.toMatch(/--line-relationship-trace\s*:/);
  });

  it("does not hard-code color", () => {
    expect(traceCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(traceCss).not.toMatch(/rgb\(|hsl\(/);
  });

  it("is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/trace.css");
  });
});

describe("Trace.tsx reuses the existing resolved line-structural primitive (M2.4), not a new token", () => {
  it("applies the .line-structural class directly", () => {
    expect(stripComments(traceSource)).toMatch(/className=["']trace line-structural["']/);
  });
});
