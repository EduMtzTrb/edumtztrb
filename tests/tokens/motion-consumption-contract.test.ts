import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Cross-cutting motion-consumption verification — M4.3. Runs source-level
 * evidence checks across every stylesheet M4.3 touched at once, the same
 * cross-cutting discipline `tests/tokens/responsive-verification.test.ts`
 * (M2.12) already established for breakpoints/hover. See
 * docs/implementation/M4.3_LOCAL_INTERACTION_STATES.md for the full audit.
 */

const STYLES_DIR = join(process.cwd(), "src", "styles");

const MOTION_CONSUMING_FILES = ["controls.css", "selection.css", "form.css"];

function readStyle(file: string): string {
  return readFileSync(join(STYLES_DIR, file), "utf-8");
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Motion-token consumption (M4.3)", () => {
  it("every transition declaration across every M4.3-touched stylesheet references only motion tokens — no raw duration/easing literal", () => {
    for (const file of MOTION_CONSUMING_FILES) {
      const css = stripComments(readStyle(file));
      const declarations = css.match(/transition(?:-duration)?\s*:\s*[^;]+;/g) ?? [];
      expect(declarations.length, `${file} has no transition declaration`).toBeGreaterThan(0);
      for (const declaration of declarations) {
        expect(declaration, `${file}: ${declaration}`).toMatch(/var\(--motion-/);
        expect(declaration, `${file}: ${declaration}`).not.toMatch(/\b\d+m?s\b/);
      }
    }
  });

  it("no stylesheet anywhere in src/styles introduces @keyframes or a named animation — M4.3 is transitions only, no choreographed/looping motion", () => {
    for (const file of MOTION_CONSUMING_FILES) {
      const css = stripComments(readStyle(file));
      expect(css, file).not.toMatch(/@keyframes/);
      expect(css, file).not.toMatch(/animation(?:-name)?\s*:/);
    }
  });

  it("no focus-visible rule gained a transition — focus must remain immediately visible, never delayed", () => {
    for (const file of MOTION_CONSUMING_FILES) {
      const css = stripComments(readStyle(file));
      const focusBlocks = css.matchAll(/:focus-visible[^{]*\{([^}]*)\}/g);
      for (const match of focusBlocks) {
        expect(match[1], `${file} focus-visible block: ${match[1]}`).not.toMatch(/transition/);
      }
    }
  });

  it("no hover rule combines more than two dominant visual changes (ANIMATION_SYSTEM.md §16: hover/Approach maximum two)", () => {
    for (const file of MOTION_CONSUMING_FILES) {
      const css = stripComments(readStyle(file));
      const hoverBlocks = css.matchAll(/:hover[^{]*\{([^}]*)\}/g);
      for (const match of hoverBlocks) {
        const declarationCount = (match[1].match(/[a-z-]+\s*:/g) ?? []).length;
        expect(declarationCount, `${file} :hover block: ${match[1]}`).toBeLessThanOrEqual(2);
      }
    }
  });

  it("press (:active) transitions use the immediate duration token — feedback begins immediately", () => {
    const controls = stripComments(readStyle("controls.css"));
    const activeBlocks = controls.matchAll(/:active[^{]*\{([^}]*)\}/g);
    let checked = 0;
    for (const match of activeBlocks) {
      if (match[1].includes("transition-duration")) {
        expect(match[1]).toMatch(/var\(--motion-duration-immediate\)/);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(0);
  });

  it("no district-specific motion rule exists in any consuming stylesheet", () => {
    for (const file of MOTION_CONSUMING_FILES) {
      const css = readStyle(file).toLowerCase();
      for (const district of ["work-", "research-", "lab-", "art-", "products-", "about-"]) {
        expect(css, `${file} contains a "${district}" selector`).not.toContain(`.${district}`);
      }
    }
  });
});
