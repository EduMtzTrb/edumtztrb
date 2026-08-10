import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Native-history audit — M4.7 §D1. "Native browser scrolling, Back/
 * Forward, keyboard navigation, focus, direct URLs, touch input,
 * interruption, and latest user intent remain baseline behavior...
 * enhancement must not replace reliable native behavior." Confirms, across
 * the entire `src/` tree, that no custom history stack, manual scroll-
 * restoration override, or `useRouter`-driven navigation exists anywhere
 * — every route transition in this repository goes through Next.js's own
 * `<Link>` component untouched. See
 * docs/implementation/M4.7_BROWSER_HISTORY_CONTRACT.md.
 */

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

function collectSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(collectSourceFiles(full));
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const srcFiles = collectSourceFiles(join(process.cwd(), "src"));

describe("Native-history audit (M4.7 §D1)", () => {
  it("no file calls history.pushState/replaceState/back or sets history.scrollRestoration", () => {
    const violations: string[] = [];
    for (const file of srcFiles) {
      const stripped = stripComments(readFileSync(file, "utf-8"));
      if (/history\.(pushState|replaceState|back)\s*\(/.test(stripped)) violations.push(file);
      if (/scrollRestoration\s*=/.test(stripped)) violations.push(file);
    }
    expect(violations).toEqual([]);
  });

  it("no file imports useRouter from next/navigation — every navigation goes through <Link>", () => {
    const violations: string[] = [];
    for (const file of srcFiles) {
      const stripped = stripComments(readFileSync(file, "utf-8"));
      if (/\buseRouter\b/.test(stripped)) violations.push(file);
    }
    expect(violations).toEqual([]);
  });

  it("no file registers a popstate listener — no custom Back/Forward interception exists", () => {
    const violations: string[] = [];
    for (const file of srcFiles) {
      const stripped = stripComments(readFileSync(file, "utf-8"));
      if (/addEventListener\(\s*["']popstate["']/.test(stripped)) violations.push(file);
    }
    expect(violations).toEqual([]);
  });

  it("Focus (M4.4) and Overlay (M4.5) never reference window.location or the History API at all", () => {
    const focusSource = stripComments(
      readFileSync(join(process.cwd(), "src", "components", "focus", "FocusRegion.tsx"), "utf-8"),
    );
    const overlaySource = stripComments(
      readFileSync(join(process.cwd(), "src", "components", "overlay", "Overlay.tsx"), "utf-8"),
    );
    for (const source of [focusSource, overlaySource]) {
      expect(source).not.toMatch(/window\.location/);
      expect(source).not.toMatch(/\bhistory\./);
    }
  });

  it("Return (M4.6) never reads or writes browser history — a data lookup only", () => {
    const returnSource = stripComments(
      readFileSync(join(process.cwd(), "src", "lib", "return", "returnMemory.ts"), "utf-8"),
    );
    expect(returnSource).not.toMatch(/\bhistory\./);
  });
});
