import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Motion token contract — M4.1. Transcribed directly from
 * ANIMATION_SYSTEM.md §31 ("Motion Tokens" — the six recommended token
 * families and their exact names) and §4 (Motion Hierarchy — the approved
 * duration ordering) — not derived from reading `motion.css`, so this test
 * can actually detect an accidentally renamed/deleted token, the same
 * "don't self-confirm" discipline `tests/tokens/token-contract.test.ts`
 * (M2.1) already established. See
 * docs/implementation/M4.1_MOTION_TOKENS.md for the full audit.
 */

const STYLES_DIR = join(process.cwd(), "src", "styles");
const TOKENS_DIR = join(STYLES_DIR, "tokens");

function readMotionCss(): string {
  return readFileSync(join(TOKENS_DIR, "motion.css"), "utf-8");
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function tokenValue(css: string, name: string): string {
  const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(css);
  if (!match) throw new Error(`Token --${name} not found`);
  return match[1].trim();
}

const REQUIRED_TOKENS = [
  // Duration
  "motion-duration-immediate",
  "motion-duration-fast",
  "motion-duration-standard",
  "motion-duration-deliberate",
  "motion-duration-spatial",
  "motion-duration-ambient",
  // Easing
  "motion-ease-enter",
  "motion-ease-exit",
  "motion-ease-move",
  "motion-ease-progress",
  // Distance
  "motion-distance-micro",
  "motion-distance-component",
  "motion-distance-record",
  "motion-depth-near",
  "motion-depth-district",
  // Recession
  "motion-recession-subtle",
  "motion-recession-focus",
  "motion-recession-overlay",
  // Stagger
  "motion-stagger-tight",
  "motion-stagger-standard",
  "motion-stagger-group",
  // Environment
  "motion-environment-amplitude-low",
  "motion-environment-speed-slow",
  "motion-environment-presence-low",
];

describe("Motion token contract (M4.1)", () => {
  const raw = readMotionCss();
  const css = stripComments(raw);

  it("declares every required semantic token from ANIMATION_SYSTEM.md §31", () => {
    for (const name of REQUIRED_TOKENS) {
      expect(css, `missing --${name}`).toMatch(new RegExp(`--${name}:`));
    }
  });

  it("declares no duplicate token (each name appears exactly once)", () => {
    for (const name of REQUIRED_TOKENS) {
      const matches = css.match(new RegExp(`--${name}:`, "g")) ?? [];
      expect(matches.length, `--${name} declared ${matches.length} times`).toBe(1);
    }
  });

  it("duration hierarchy is strictly monotonic: immediate < fast < standard < deliberate < spatial << ambient", () => {
    const ms = (name: string) => parseFloat(tokenValue(css, name));
    const immediate = ms("motion-duration-immediate");
    const fast = ms("motion-duration-fast");
    const standard = ms("motion-duration-standard");
    const deliberate = ms("motion-duration-deliberate");
    const spatial = ms("motion-duration-spatial");
    const ambient = ms("motion-duration-ambient");

    expect(immediate).toBeLessThan(fast);
    expect(fast).toBeLessThan(standard);
    expect(standard).toBeLessThan(deliberate);
    expect(deliberate).toBeLessThan(spatial);
    // "<<" — ambient must be dramatically larger, not just incrementally larger.
    expect(ambient).toBeGreaterThan(spatial * 5);
  });

  it("stagger hierarchy is monotonic and stays short (tight < standard < group, all under 100ms)", () => {
    const ms = (name: string) => parseFloat(tokenValue(css, name));
    const tight = ms("motion-stagger-tight");
    const standard = ms("motion-stagger-standard");
    const group = ms("motion-stagger-group");
    expect(tight).toBeLessThan(standard);
    expect(standard).toBeLessThan(group);
    expect(group).toBeLessThan(100);
  });

  it("no easing token contains spring/bounce/overshoot behavior", () => {
    for (const name of [
      "motion-ease-enter",
      "motion-ease-exit",
      "motion-ease-move",
      "motion-ease-progress",
    ]) {
      const value = tokenValue(css, name);
      expect(value.toLowerCase()).not.toMatch(/spring|bounce|elastic|overshoot/);

      if (value.startsWith("cubic-bezier")) {
        const parts = /cubic-bezier\(([^)]+)\)/.exec(value)?.[1].split(",").map(Number);
        expect(parts, `${name} cubic-bezier args`).toHaveLength(4);
        const [, y1, , y2] = parts!;
        // A cubic-bezier curve can only overshoot [0,1] (produce a bounce/
        // spring-like effect) when a Y control point lies outside [0, 1].
        expect(y1, `${name} y1 in range`).toBeGreaterThanOrEqual(0);
        expect(y1, `${name} y1 in range`).toBeLessThanOrEqual(1);
        expect(y2, `${name} y2 in range`).toBeGreaterThanOrEqual(0);
        expect(y2, `${name} y2 in range`).toBeLessThanOrEqual(1);
      } else {
        expect(value).toBe("linear");
      }
    }
  });

  it("every duration/stagger token is a valid, non-negative millisecond or second value", () => {
    for (const name of REQUIRED_TOKENS.filter(
      (n) =>
        n.includes("duration") || n.includes("stagger") || n === "motion-environment-speed-slow",
    )) {
      const value = tokenValue(css, name);
      expect(value).toMatch(/^\d+(\.\d+)?(ms|s)$/);
      expect(parseFloat(value)).toBeGreaterThan(0);
    }
  });

  it("every distance/depth token is a valid restrained value (no large-scale movement)", () => {
    const micro = parseFloat(tokenValue(css, "motion-distance-micro"));
    const component = parseFloat(tokenValue(css, "motion-distance-component"));
    const record = parseFloat(tokenValue(css, "motion-distance-record"));
    expect(micro).toBeLessThan(component);
    expect(component).toBeLessThan(record);
    // Restrained: even the largest current distance token stays well under
    // a scale that would read as cinematic/large-scale movement.
    expect(record).toBeLessThanOrEqual(64);

    const depthNear = parseFloat(tokenValue(css, "motion-depth-near"));
    const depthDistrict = parseFloat(tokenValue(css, "motion-depth-district"));
    expect(depthNear).toBeGreaterThan(0);
    expect(depthNear).toBeLessThan(depthDistrict);
    // Restrained: depth deltas stay far from a "large global zoom."
    expect(depthDistrict).toBeLessThan(0.2);
  });

  it("recession/environment-presence tokens are valid opacity-range values (0–1)", () => {
    for (const name of [
      "motion-recession-subtle",
      "motion-recession-focus",
      "motion-recession-overlay",
      "motion-environment-presence-low",
    ]) {
      const value = parseFloat(tokenValue(css, name));
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThanOrEqual(1);
    }
    // Recession hierarchy: subtle keeps the most presence, overlay the least.
    const subtle = parseFloat(tokenValue(css, "motion-recession-subtle"));
    const focus = parseFloat(tokenValue(css, "motion-recession-focus"));
    const overlay = parseFloat(tokenValue(css, "motion-recession-overlay"));
    expect(subtle).toBeGreaterThan(focus);
    expect(focus).toBeGreaterThan(overlay);
  });

  it("environment amplitude stays low (px value, restrained)", () => {
    const amplitude = parseFloat(tokenValue(css, "motion-environment-amplitude-low"));
    expect(amplitude).toBeGreaterThan(0);
    expect(amplitude).toBeLessThanOrEqual(16);
  });

  it("no district-specific motion token exists anywhere in the file", () => {
    for (const district of ["work", "research", "lab", "art", "products", "about", "home"]) {
      expect(raw.toLowerCase()).not.toMatch(new RegExp(`--motion-${district}-`));
    }
  });

  it("no environmental animation (@keyframes / animation-name) exists in motion.css — token foundation only", () => {
    expect(css).not.toMatch(/@keyframes/);
    expect(css).not.toMatch(/animation-name\s*:/);
  });

  it("no Focus/Overlay/Return implementation file exists yet — recession stays token-only", () => {
    const shellFiles = readdirSync(join(process.cwd(), "src", "components", "shell"));
    for (const file of shellFiles) {
      expect(file).not.toMatch(/^Focus|^Overlay|^Return|^Modal/i);
    }
  });

  it("no other stylesheet gained a raw (non-token) transition/animation duration or cubic-bezier value", () => {
    const otherFiles = readdirSync(STYLES_DIR).filter(
      (f) => f.endsWith(".css") && f !== "motion.css",
    );
    for (const file of otherFiles) {
      const content = stripComments(readFileSync(join(STYLES_DIR, file), "utf-8"));
      const rawDurations = content.match(/(?:transition|animation)[a-z-]*:\s*[^;]*\d+m?s/gi) ?? [];
      expect(rawDurations, `${file} contains a raw motion duration: ${rawDurations}`).toHaveLength(
        0,
      );
      expect(content, `${file} contains a raw cubic-bezier()`).not.toMatch(/cubic-bezier\(/);
    }
  });
});
