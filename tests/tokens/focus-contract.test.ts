import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Focus + Recession contract — M4.4. Source-level evidence for the
 * requirements jsdom cannot verify visually: token-only motion, no
 * district-specific selector, no scale/zoom/blur, no accidental M4.5
 * modal mechanics. See docs/implementation/M4.4_FOCUS_RECESSION.md.
 */

const focusCss = readFileSync(join(process.cwd(), "src", "styles", "focus.css"), "utf-8");
const focusRegionSource = readFileSync(
  join(process.cwd(), "src", "components", "focus", "FocusRegion.tsx"),
  "utf-8",
);
const focusItemSource = readFileSync(
  join(process.cwd(), "src", "components", "focus", "FocusItem.tsx"),
  "utf-8",
);

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("Focus + Recession CSS contract (M4.4)", () => {
  it("every transition declaration references only motion tokens", () => {
    const css = stripComments(focusCss);
    const declarations = css.match(/transition(?:-duration)?\s*:\s*[^;]+;/g) ?? [];
    expect(declarations.length).toBeGreaterThan(0);
    for (const declaration of declarations) {
      expect(declaration).toMatch(/var\(--motion-/);
      expect(declaration).not.toMatch(/\b\d+m?s\b/);
    }
  });

  it("uses the Focus duration/easing tier — --motion-duration-deliberate, not Feedback/State-Change tokens", () => {
    expect(focusCss).toContain("var(--motion-duration-deliberate)");
    expect(focusCss).not.toContain("--motion-duration-immediate");
    expect(focusCss).not.toContain("--motion-duration-fast");
    expect(focusCss).not.toContain("--motion-duration-standard");
  });

  it("recession is opacity only — no transform/scale/zoom/blur/perspective anywhere", () => {
    const css = stripComments(focusCss);
    expect(css).not.toMatch(/transform\s*:/);
    expect(css).not.toMatch(/scale\(/);
    expect(css).not.toMatch(/zoom\s*:/);
    expect(css).not.toMatch(/blur\(/);
    expect(css).not.toMatch(/perspective/);
  });

  it("no @keyframes or named animation — a one-time settle, never a loop", () => {
    expect(focusCss).not.toMatch(/@keyframes/);
    expect(focusCss).not.toMatch(/animation(?:-name)?\s*:/);
  });

  it("does not reference a district-specific selector", () => {
    const css = stripComments(focusCss).toLowerCase();
    for (const district of ["work-", "research-", "lab-", "art-", "products-", "about-", "home-"]) {
      expect(css, `focus.css contains a "${district}" selector`).not.toContain(`.${district}`);
    }
  });

  it("recession magnitude is a consumer-supplied custom property, resolving to an M4.1 recession token by default", () => {
    expect(focusCss).toContain("var(--focus-recession-opacity, var(--motion-recession-focus))");
  });

  it("is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/focus.css");
  });
});

describe("Focus is not routing / not modal — source contract (M4.4 §A2, §A5)", () => {
  it("never imports next/navigation or a router, and never references canonical record/route modules", () => {
    for (const source of [focusRegionSource, focusItemSource]) {
      expect(source).not.toMatch(/from ["']next\/navigation["']/);
      expect(source).not.toMatch(/useRouter|usePathname|redirect\(/);
      expect(source).not.toMatch(/domain\/records/);
    }
  });

  it("implements no modal semantics — no role=dialog, aria-modal, focus-trap keydown handler, or backdrop", () => {
    for (const source of [focusRegionSource, focusItemSource]) {
      const stripped = stripComments(source);
      expect(stripped).not.toMatch(/role=["']dialog["']/);
      expect(stripped).not.toMatch(/aria-modal/);
      expect(stripped).not.toMatch(/onKeyDown/);
      expect(stripped).not.toMatch(/backdrop/i);
      expect(stripped).not.toMatch(/inert/);
    }
  });

  it("no tabIndex={-1} is applied anywhere — nothing is deliberately removed from tab order", () => {
    for (const source of [focusRegionSource, focusItemSource]) {
      expect(source).not.toMatch(/tabIndex/);
    }
  });
});
