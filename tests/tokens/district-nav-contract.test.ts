import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * District navigation CSS contract — M3.8. See
 * docs/implementation/M3.8_DISTRICT_NAVIGATION.md.
 */

const STYLES_DIR = join(process.cwd(), "src", "styles");

function readStyle(file: string): string {
  return readFileSync(join(STYLES_DIR, file), "utf-8");
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("District nav CSS contract (M3.8)", () => {
  const css = stripComments(readStyle("district-nav.css"));
  const shellCss = stripComments(readStyle("shell.css"));

  it("uses its own class names, never the global nav's class names — global and district navigation stay visually distinguishable", () => {
    expect(css).toMatch(/\.district-nav-list/);
    expect(css).not.toMatch(/\.global-nav-list/);
    expect(css).not.toMatch(/\.global-utilities-list/);
    expect(shellCss).not.toMatch(/\.district-nav-list/);
  });

  it("never hides an item and never depends on hover, motion, or an invented breakpoint", () => {
    expect(css).not.toMatch(/display:\s*none/);
    expect(css).not.toMatch(/visibility:\s*hidden/);
    expect(css).not.toMatch(/:hover/);
    expect(css).not.toMatch(/transition|animation|@keyframes/);
    const matches = css.matchAll(/@media\s*\(min-width:\s*([^)]+)\)/g);
    for (const match of matches) {
      expect(["768px", "1024px"]).toContain(match[1].trim());
    }
  });

  it("links wrap freely and meet the 44px touch-target minimum", () => {
    expect(css).toMatch(/flex-wrap:\s*wrap/);
    expect(css).toMatch(/min-height:\s*44px/);
  });

  it("focus-visible styling is present, reusing the shared focus token", () => {
    expect(css).toMatch(/:focus-visible/);
    expect(css).toMatch(/var\(--color-focus\)/);
  });

  it("introduces no new design token — reuses existing Color/Spacing/Geometry tokens only", () => {
    expect(css).not.toMatch(/--[a-z-]+:\s*(?!var\()[^;]+;/);
  });
});
