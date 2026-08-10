import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Index results CSS contract — M3.10. See docs/implementation/M3.10_INDEX.md. */

const STYLES_DIR = join(process.cwd(), "src", "styles");

function readStyle(file: string): string {
  return readFileSync(join(STYLES_DIR, file), "utf-8");
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Index results CSS contract (M3.10)", () => {
  const css = stripComments(readStyle("index-results.css"));

  it("never hides content and never depends on hover, motion, or an invented breakpoint", () => {
    expect(css).not.toMatch(/display:\s*none/);
    expect(css).not.toMatch(/visibility:\s*hidden/);
    expect(css).not.toMatch(/:hover/);
    expect(css).not.toMatch(/transition|animation|@keyframes/);
    expect(css).not.toMatch(/@media/);
  });

  it("introduces no new design token — reuses existing tokens only", () => {
    expect(css).not.toMatch(/--[a-z-]+:\s*(?!var\()[^;]+;/);
  });

  it("does not redefine .record-index — reuses M2.7's IndexRecord/records.css unchanged", () => {
    expect(css).not.toMatch(/\.record-index\b/);
  });
});
