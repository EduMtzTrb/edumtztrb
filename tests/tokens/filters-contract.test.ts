import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Filters CSS contract — M3.11. See docs/implementation/M3.11_FILTERS.md. */

const STYLES_DIR = join(process.cwd(), "src", "styles");

function readStyle(file: string): string {
  return readFileSync(join(STYLES_DIR, file), "utf-8");
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Filters CSS contract (M3.11)", () => {
  const css = stripComments(readStyle("filters.css"));

  it("never hides content and never depends on hover, motion, or an invented breakpoint", () => {
    expect(css).not.toMatch(/display:\s*none/);
    expect(css).not.toMatch(/visibility:\s*hidden/);
    expect(css).not.toMatch(/:hover/);
    expect(css).not.toMatch(/transition|animation|@keyframes/);
    expect(css).not.toMatch(/@media/);
  });

  it("the active option's cue is not color alone (font-weight change present)", () => {
    expect(css).toMatch(/aria-current="true"\]\s*\{[^}]*font-weight/);
  });

  it("focus-visible is present and touch targets meet the 44px minimum", () => {
    expect(css).toMatch(/:focus-visible/);
    expect(css).toMatch(/min-height:\s*44px/);
  });

  it("introduces no new design token — reuses existing tokens only", () => {
    expect(css).not.toMatch(/--[a-z-]+:\s*(?!var\()[^;]+;/);
  });
});
