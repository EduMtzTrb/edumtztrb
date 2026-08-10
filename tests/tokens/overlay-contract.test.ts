import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Overlay Mechanics contract — M4.5. Source-level evidence for what jsdom
 * cannot verify: no second recession mechanism, no entrance/exit
 * animation, no district selector, reuse of M2.4's Plane/Frame surface,
 * and that Overlay is not a destination. See
 * docs/implementation/M4.5_OVERLAY_MECHANICS.md.
 */

const overlayCss = readFileSync(join(process.cwd(), "src", "styles", "overlay.css"), "utf-8");
const overlaySource = readFileSync(
  join(process.cwd(), "src", "components", "overlay", "Overlay.tsx"),
  "utf-8",
);

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("Overlay CSS contract (M4.5)", () => {
  it("declares no transition, @keyframes, or animation of its own — the only motion is inherited from focus.css's [data-focus-state] rule", () => {
    const css = stripComments(overlayCss);
    expect(css).not.toMatch(/transition\s*:/);
    expect(css).not.toMatch(/@keyframes/);
    expect(css).not.toMatch(/animation\s*:/);
  });

  it("does not introduce transform/scale/zoom/blur/perspective — no dramatic entrance", () => {
    const css = stripComments(overlayCss);
    expect(css).not.toMatch(/transform\s*:/);
    expect(css).not.toMatch(/scale\(/);
    expect(css).not.toMatch(/zoom\s*:/);
    expect(css).not.toMatch(/blur\(/);
    expect(css).not.toMatch(/perspective/);
  });

  it("does not reference a district-specific selector", () => {
    const css = stripComments(overlayCss).toLowerCase();
    for (const district of ["work-", "research-", "lab-", "art-", "products-", "about-", "home-"]) {
      expect(css, `overlay.css contains a "${district}" selector`).not.toContain(`.${district}`);
    }
  });

  it("does not invent a new surface/border/radius value — no hard-coded color, only existing tokens", () => {
    expect(overlayCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(overlayCss).not.toMatch(/rgb\(|hsl\(/);
  });

  it("does not define a new --layer-* token — the six-token layer-order model remains a separate, unresolved Design-System calibration", () => {
    expect(overlayCss).not.toMatch(/--layer-[a-z-]+\s*:/);
  });

  it("is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/overlay.css");
  });
});

describe("Overlay panel reuses M2.4's Plane + Frame — no second surface primitive", () => {
  it("Overlay.tsx applies the existing plane/frame classes to its panel, not a new overlay-specific surface class", () => {
    expect(overlaySource).toMatch(/className=["']plane frame["']/);
  });
});

describe("Overlay is not a destination — source contract (M4.5 §B1)", () => {
  it("never imports next/navigation, a router, or canonical-record/route modules", () => {
    const stripped = stripComments(overlaySource);
    expect(stripped).not.toMatch(/from ["']next\/navigation["']/);
    expect(stripped).not.toMatch(/useRouter|usePathname|redirect\(/);
    expect(stripped).not.toMatch(/domain\/records/);
  });

  it("never touches window.location or history directly", () => {
    const stripped = stripComments(overlaySource);
    expect(stripped).not.toMatch(/window\.location/);
    expect(stripped).not.toMatch(/history\.(push|replace)State/);
  });
});
