import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Breadcrumb CSS contract — M3.9. See docs/implementation/M3.9_BREADCRUMB_ORIENTATION.md. */

const STYLES_DIR = join(process.cwd(), "src", "styles");

function readStyle(file: string): string {
  return readFileSync(join(STYLES_DIR, file), "utf-8");
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Breadcrumb CSS contract (M3.9)", () => {
  const css = stripComments(readStyle("breadcrumb.css"));

  it("uses its own class names, distinct from global/district navigation", () => {
    expect(css).toMatch(/\.breadcrumb-list/);
    expect(css).not.toMatch(/\.global-nav-list|\.global-utilities-list|\.district-nav-list/);
  });

  it("never hides an item and never depends on hover-only content, motion, or an invented breakpoint", () => {
    expect(css).not.toMatch(/display:\s*none/);
    expect(css).not.toMatch(/visibility:\s*hidden/);
    expect(css).not.toMatch(/:hover/);
    expect(css).not.toMatch(/transition|animation|@keyframes/);
    expect(css).not.toMatch(/@media/);
  });

  it("focus-visible styling is present, reusing the shared focus token", () => {
    expect(css).toMatch(/:focus-visible/);
    expect(css).toMatch(/var\(--color-focus\)/);
  });

  it("the current item's non-color visual cue is not color alone (font-weight change present)", () => {
    expect(css).toMatch(/aria-current="page"\]\s*\{[^}]*font-weight/);
  });

  it("introduces no new design token — reuses existing tokens only", () => {
    expect(css).not.toMatch(/--[a-z-]+:\s*(?!var\()[^;]+;/);
  });
});
