import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Home-Threshold Prototype contract — M4.9. Source-level evidence for
 * what jsdom cannot verify: token-only motion, no new duration tier, no
 * dramatic transform/scale, no environmental loop.
 *
 * Calibrated after a failed real-browser human review (see
 * docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md "Human Review —
 * Calibration Required" / "Root Cause"). The corrected `.world-trace`
 * architecture legitimately uses `translateX` — a cheap, composited,
 * approved operation — to reposition a persistent structural element
 * across the real route change; this file's "no transform" assertion is
 * updated accordingly to permit translation while continuing to forbid
 * scale/rotate/skew/perspective/blur/zoom.
 */

const thresholdCss = readFileSync(join(process.cwd(), "src", "styles", "threshold.css"), "utf-8");

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("Threshold CSS contract (M4.9)", () => {
  it("every transition declaration references only motion tokens", () => {
    const css = stripComments(thresholdCss);
    const declarations = css.match(/transition(?:-duration)?\s*:\s*[^;]+;/g) ?? [];
    expect(declarations.length).toBeGreaterThan(0);
    for (const declaration of declarations) {
      expect(declaration).toMatch(/var\(--motion-/);
      expect(declaration).not.toMatch(/\b\d+m?s\b/);
    }
  });

  it("first entry uses the spatial (largest non-ambient) duration tier, repeated entry uses a shorter one", () => {
    expect(thresholdCss).toMatch(
      /\[data-threshold-state="first-entry"\][^}]*var\(--motion-duration-spatial\)/,
    );
    expect(thresholdCss).toMatch(
      /\[data-threshold-state="repeated-entry"\][^}]*var\(--motion-duration-standard\)/,
    );
  });

  it("does not invent a new duration/easing/recession token — only tokens M4.1 already declared", () => {
    const css = stripComments(thresholdCss);
    expect(css).not.toMatch(/--motion-duration-(district|threshold|world)/);
    expect(css).not.toMatch(/:\s*\d+m?s\b/);
  });

  it("only translation is used for transform — no scale/zoom/blur/perspective/rotate/skew", () => {
    const css = stripComments(thresholdCss);
    const transformValues = [...css.matchAll(/transform\s*:\s*([^;]+);/g)].map((m) => m[1]);
    expect(transformValues.length).toBeGreaterThan(0);
    for (const value of transformValues) {
      expect(value).toMatch(/^translateX\(/);
    }
    expect(css).not.toMatch(/scale\(/);
    expect(css).not.toMatch(/zoom\s*:/);
    expect(css).not.toMatch(/blur\(/);
    expect(css).not.toMatch(/perspective/);
    expect(css).not.toMatch(/rotate\(/);
    expect(css).not.toMatch(/skew\(/);
  });

  it("no @keyframes or named animation — no environmental loop", () => {
    expect(thresholdCss).not.toMatch(/@keyframes/);
    expect(thresholdCss).not.toMatch(/animation(?:-name)?\s*:/);
  });

  it("is imported by globals.css", () => {
    const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8");
    expect(globals).toContain("../styles/threshold.css");
  });

  describe(".world-trace — persistent shared spatial trace (calibration)", () => {
    it("declares a stable base state and distinct home/work positions", () => {
      expect(thresholdCss).toMatch(/\.world-trace-segment\s*{[^}]*transform:\s*translateX\(0\)/);
      expect(thresholdCss).toMatch(
        /\[data-trace-position="home"\][^}]*transform:\s*translateX\(0\)/,
      );
      expect(thresholdCss).toMatch(
        /\[data-trace-position="work"\][^}]*transform:\s*translateX\(calc\(100% - 96px\)\)/,
      );
    });

    it("first entry (default mode) and repeated entry (data-trace-mode=repeated) resolve to different durations", () => {
      expect(thresholdCss).toMatch(
        /\.world-trace-segment\s*{[^}]*transition:\s*[^}]*var\(--motion-duration-spatial\)/,
      );
      expect(thresholdCss).toMatch(
        /\[data-trace-mode="repeated"\]\s*\.world-trace-segment\s*{[^}]*var\(--motion-duration-standard\)/,
      );
    });

    it("repeated entry also resolves to a shorter travel distance than first entry, not merely a shorter duration", () => {
      expect(thresholdCss).toMatch(
        /\[data-trace-mode="repeated"\]\[data-trace-position="work"\][^}]*transform:\s*translateX\(calc\(75% - 72px\)\)/,
      );
    });

    it("only transform and opacity are transitioned — cheap, composited properties, no layout thrash", () => {
      const css = stripComments(thresholdCss);
      const traceBlockMatch = css.match(/\.world-trace-segment\s*{([^}]+)}/);
      expect(traceBlockMatch).not.toBeNull();
      const transitionDeclaration = traceBlockMatch![1].match(/transition:\s*([^;]+);/);
      expect(transitionDeclaration).not.toBeNull();
      const properties = transitionDeclaration![1]
        .split(",")
        .map((part) => part.trim().split(/\s+/)[0]);
      for (const property of properties) {
        expect(["transform", "opacity"]).toContain(property);
      }
    });

    it("shortens travel distance at the existing compact breakpoint rather than increasing motion on small screens", () => {
      const mediaBlockMatch = thresholdCss.match(/@media \(max-width: 767px\)\s*{([\s\S]+)}\s*$/);
      expect(mediaBlockMatch).not.toBeNull();
      expect(mediaBlockMatch![1]).toMatch(/translateX\(calc\(60% - 58px\)\)/);
      expect(mediaBlockMatch![1]).toMatch(/translateX\(calc\(45% - 43px\)\)/);
    });
  });
});
