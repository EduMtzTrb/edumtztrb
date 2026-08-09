import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M2.4 core-visual-primitives contract in
 * src/styles/primitives.css — DESIGN_SYSTEM.md v1.1 §16-§19. See
 * docs/implementation/M2.4_CORE_VISUAL_PRIMITIVES.md for the full
 * reasoning behind every primitive (and every deliberate omission).
 *
 * Source-text checks only, consistent with the other token-contract
 * suites — this repository has no browser test runner.
 */

const primitivesCss = readFileSync(join(process.cwd(), "src", "styles", "primitives.css"), "utf-8");

describe("Core visual primitives contract (DESIGN_SYSTEM.md v1.1 §16-§19)", () => {
  it("defines Plane, structural line, hierarchy line, and Frame", () => {
    expect(primitivesCss).toContain(".plane {");
    expect(primitivesCss).toContain(".line-structural {");
    expect(primitivesCss).toContain(".line-hierarchy {");
    expect(primitivesCss).toContain(".frame {");
  });

  it("does not define a Field or Void primitive — already expressed elsewhere (body, .composition, .field-interval)", () => {
    expect(primitivesCss).not.toMatch(/^\.field\s*\{/m);
    expect(primitivesCss).not.toMatch(/^\.void\s*\{/m);
  });

  it("does not implement Signal — no chromatic value or class exists for it anywhere in this file", () => {
    expect(primitivesCss.toLowerCase()).not.toMatch(/\.signal\b|--signal|--color-signal/);
  });

  it("Plane and Frame use only already-resolved tokens, never a hard-coded color or hex value", () => {
    // Every color/line/radius/spacing value must come from var(--...); no
    // literal hex codes, rgb(), or hsl() anywhere in this file.
    expect(primitivesCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(primitivesCss).not.toMatch(/rgb\(|hsl\(/);
  });

  it("does not introduce a card pattern — no box-shadow, no glassmorphism-style transparency", () => {
    expect(primitivesCss).not.toContain("box-shadow");
    expect(primitivesCss).not.toContain("backdrop-filter");
    expect(primitivesCss).not.toMatch(/opacity:\s*0\.\d/);
  });

  it("does not define a district-specific primitive", () => {
    const districts = ["work", "research", "lab", "art", "products", "about", "home"];
    for (const district of districts) {
      expect(primitivesCss.toLowerCase()).not.toContain(`.${district}-`);
    }
  });

  it("does not reintroduce any retired token name", () => {
    const retired = [
      "line-standard",
      "surface-1",
      "surface-2",
      "color-district-accent",
      "font-primary",
      "font-technical",
    ];
    for (const token of retired) {
      expect(primitivesCss).not.toContain(`--${token}`);
    }
  });

  it("Frame uses a heavier weight than the structural line (a Frame is a more decisive boundary)", () => {
    expect(primitivesCss).toContain("var(--line-structural)"); // Frame
    expect(primitivesCss).toContain("var(--line-hairline)"); // Structural line
  });
});
