import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Computed WCAG 2.2 contrast verification — M2.12.
 * Authority: IMPLEMENTATION_PLAN.md §7 (M2.12); this task's own §C7
 * ("Re-audit representative compositions for WCAG 2.2 AA contrast... Use
 * computed values/tests where possible. Do not claim certification beyond
 * what is tested"). See
 * docs/implementation/M2.12_RESPONSIVE_PRIMITIVE_VERIFICATION.md "Contrast"
 * for the full table this test's output feeds.
 *
 * Implements the actual WCAG relative-luminance/contrast-ratio formula
 * (not an approximation) against the real hex values declared in
 * src/styles/tokens/color.css and the real opacity multipliers declared in
 * src/styles/tokens/opacity.css — reading the source files directly so
 * this test can't silently drift from what's actually shipped. This
 * covers representative text/background pairs actually used by M2.5–M2.11
 * (primary text, secondary/metadata text, latent metadata, focus,
 * error, success). Disabled-state opacity is deliberately not asserted
 * against the AA floor: WCAG 1.4.3/1.4.11 exempt inactive ("disabled")
 * UI components from contrast minimums, the same reasoning
 * src/styles/tokens/opacity.css's own header already documents for why
 * `--opacity-disabled` (0.5) was chosen without a 4.5:1 constraint.
 */

function readTokenFile(file: string): string {
  return readFileSync(join(process.cwd(), "src", "styles", "tokens", file), "utf-8");
}

function extractHex(css: string, tokenName: string): string {
  const match = css.match(new RegExp(`--${tokenName}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  if (!match) throw new Error(`Token --${tokenName} not found or not a direct hex value`);
  return match[1];
}

function extractOpacity(css: string, tokenName: string): number {
  const match = css.match(new RegExp(`--${tokenName}:\\s*([\\d.]+)\\s*;`));
  if (!match) throw new Error(`Opacity token --${tokenName} not found`);
  return Number(match[1]);
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

/** WCAG relative luminance (sRGB). */
function relativeLuminance([r, g, b]: [number, number, number]): number {
  const channel = (c: number) => {
    const srgb = c / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio between two colors. */
function contrastRatio(a: [number, number, number], b: [number, number, number]): number {
  const [l1, l2] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Alpha-blends `fg` at `opacity` over solid `bg` (the same math CSS `opacity` performs against a solid background). */
function blend(
  fg: [number, number, number],
  bg: [number, number, number],
  opacity: number,
): [number, number, number] {
  return [
    Math.round(bg[0] + opacity * (fg[0] - bg[0])),
    Math.round(bg[1] + opacity * (fg[1] - bg[1])),
    Math.round(bg[2] + opacity * (fg[2] - bg[2])),
  ];
}

const colorCss = readTokenFile("color.css");
const opacityCss = readTokenFile("opacity.css");

const field = hexToRgb(extractHex(colorCss, "color-void-1000"));
const lightText = hexToRgb(extractHex(colorCss, "color-light-text"));
const mist300 = hexToRgb(extractHex(colorCss, "color-mist-300"));
const focusOnDark = hexToRgb(extractHex(colorCss, "color-focus-on-dark"));
const errorOnDark = hexToRgb(extractHex(colorCss, "color-error-on-dark"));
const successOnDark = hexToRgb(extractHex(colorCss, "color-success-on-dark"));
const opacityLatent = extractOpacity(opacityCss, "opacity-latent");

const AA_NORMAL_TEXT = 4.5;
const AA_NON_TEXT = 3.0;

describe("WCAG 2.2 AA contrast — computed, against real token values (M2.12)", () => {
  it("primary text (--color-light-text) on the field meets 4.5:1", () => {
    expect(contrastRatio(lightText, field)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("secondary/metadata text (--color-mist-300) on the field meets 4.5:1", () => {
    expect(contrastRatio(mist300, field)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("latent metadata text (--color-mist-300 at --opacity-latent) on the field meets 4.5:1", () => {
    const blended = blend(mist300, field, opacityLatent);
    expect(contrastRatio(blended, field)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("focus outline (--color-focus-on-dark) on the field meets the 3:1 non-text floor", () => {
    expect(contrastRatio(focusOnDark, field)).toBeGreaterThanOrEqual(AA_NON_TEXT);
  });

  it("error text/heading (--color-error-on-dark) on the field meets 4.5:1", () => {
    expect(contrastRatio(errorOnDark, field)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("success text/heading (--color-success-on-dark) on the field meets 4.5:1", () => {
    expect(contrastRatio(successOnDark, field)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("action control borders (--color-mist-300, Secondary/text-field/select border) meet the 3:1 non-text floor", () => {
    // Same token as secondary text above, re-asserted explicitly against
    // the non-text floor since it's also used as a border color
    // (controls.css/selection.css/form.css) — a different WCAG success
    // criterion (1.4.11) than body text (1.4.3).
    expect(contrastRatio(mist300, field)).toBeGreaterThanOrEqual(AA_NON_TEXT);
  });
});
