import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Shared application shell CSS contract — M3.7.
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.7 — Global navigation:
 * complete district navigation, utilities access, active district state,
 * direct entry, and orientation plane"). See
 * docs/implementation/M3.7_GLOBAL_NAVIGATION.md for the full audit,
 * including the responsive-wrapping resolution this suite verifies at the
 * source level (component-behavior coverage lives in
 * `src/components/shell/GlobalNav.test.tsx`).
 */

const STYLES_DIR = join(process.cwd(), "src", "styles");

function readStyle(file: string): string {
  return readFileSync(join(STYLES_DIR, file), "utf-8");
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Shell CSS contract (M3.7)", () => {
  const css = stripComments(readStyle("shell.css"));

  it("uses only the already-approved 768px/1024px breakpoint vocabulary — no invented breakpoint", () => {
    const approvedBreakpoints = new Set(["768px", "1024px"]);
    const matches = css.matchAll(/@media\s*\(min-width:\s*([^)]+)\)/g);
    let matchCount = 0;
    for (const match of matches) {
      matchCount += 1;
      expect(approvedBreakpoints.has(match[1].trim())).toBe(true);
    }
    expect(matchCount).toBeGreaterThan(0);
  });

  it("the compact (default, mobile-first) header layout stacks Primary and Utilities as two separate blocks — no interleaving", () => {
    const headerRule = /\.global-header\s*\{([^}]*)\}/.exec(css);
    expect(headerRule).not.toBeNull();
    expect(headerRule![1]).toMatch(/flex-direction:\s*column/);
  });

  it("the single-row layout only applies at 768px and above — never below", () => {
    const desktopBlock = /@media \(min-width: 768px\) \{\s*\.global-header\s*\{([^}]*)\}/.exec(css);
    expect(desktopBlock).not.toBeNull();
    expect(desktopBlock![1]).toMatch(/flex-direction:\s*row/);
  });

  it("neither nav list is ever hidden via display/visibility — every district and utility stays reachable at every width", () => {
    expect(css).not.toMatch(/display:\s*none/);
    expect(css).not.toMatch(/visibility:\s*hidden/);
  });

  it("no :hover rule exists anywhere in the shell — no essential navigation depends on hover", () => {
    expect(css).not.toMatch(/:hover/);
  });

  it("nav lists remain free to wrap internally at any width (no nowrap/fixed-width constraint reintroduced)", () => {
    const navListRule = /\.global-nav-list,\s*\n?\.global-utilities-list\s*\{([^}]*)\}/.exec(css);
    expect(navListRule).not.toBeNull();
    expect(navListRule![1]).toMatch(/flex-wrap:\s*wrap/);
  });

  it("focus-visible outline styling is present and not motion-dependent (no transition/animation in shell.css)", () => {
    expect(css).toMatch(/:focus-visible/);
    expect(css).not.toMatch(/transition|animation|@keyframes/);
  });
});
