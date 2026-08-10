import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Direct-entry CSS contract — M3.13. See docs/implementation/M3.13_DIRECT_ENTRY_ORIENTATION.md. */

const STYLES_DIR = join(process.cwd(), "src", "styles");

function readStyle(file: string): string {
  return readFileSync(join(STYLES_DIR, file), "utf-8");
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Direct-entry CSS contract (M3.13)", () => {
  const css = stripComments(readStyle("direct-entry.css"));

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
});
