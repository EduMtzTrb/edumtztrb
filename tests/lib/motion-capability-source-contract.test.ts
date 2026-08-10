import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/** Motion capability/cancellation source contract — M4.2. See docs/implementation/M4.2_REDUCED_MOTION_CAPABILITY.md. */

function readSource(file: string): string {
  return readFileSync(join(process.cwd(), "src", "lib", "motion", file), "utf-8");
}

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("capability.ts source contract (M4.2)", () => {
  const rawSrc = readSource("capability.ts");
  // Checks below scan executable code only (comments stripped) — this
  // module's own doc comments legitimately name the exact signals it
  // deliberately avoids, so a literal full-source match would
  // false-positive against its own explanatory prose.
  const src = stripComments(rawSrc);

  it("never reads device/hardware-fingerprinting signals", () => {
    expect(src).not.toMatch(/userAgent|hardwareConcurrency|deviceMemory|getBattery|platform\b/);
  });

  it("reads exactly the two documented conservative signals: prefers-reduced-motion and Network Information saveData", () => {
    expect(src).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(src).toMatch(/saveData/);
  });

  it("never performs continuous FPS/performance sampling", () => {
    expect(src).not.toMatch(/requestAnimationFrame|performance\.now/);
  });

  it("guards every browser global access for SSR safety", () => {
    expect(src).toMatch(
      /typeof window\s*===\s*["']undefined["']|typeof window !== ["']undefined["']/,
    );
    expect(src).toMatch(/typeof document\s*===\s*["']undefined["']/);
    expect(src).toMatch(/typeof navigator\s*===\s*["']undefined["']/);
  });

  it("uses useSyncExternalStore with a fixed-literal server snapshot — no hydration mismatch, no setState-in-effect", () => {
    expect(src).toMatch(/useSyncExternalStore/);
    expect(src).toMatch(/getServerSnapshot\(\)[^{]*\{\s*return false;/);
  });

  it("subscribes and unsubscribes the media-query listener (no leaked listener)", () => {
    expect(src).toMatch(/addEventListener\("change"/);
    expect(src).toMatch(/removeEventListener\("change"/);
  });
});

describe("cancellation.ts source contract (M4.2)", () => {
  const src = readSource("cancellation.ts");

  it("has no React/component import — a dependency-free primitive", () => {
    expect(src).not.toMatch(/from ["']react["']/);
  });

  it("uses only the native AbortController — no external cancellation/animation library", () => {
    expect(src).toMatch(/new AbortController\(\)/);
  });

  it("does not export an app-wide singleton registry — scope stays with the consumer", () => {
    expect(src).not.toMatch(/export const \w+ = createMotionCancellation\(\)/);
  });
});

describe("No animation/motion library dependency was added (M4.2)", () => {
  it("package.json is unaffected by any known animation library", () => {
    const pkg = readFileSync(join(process.cwd(), "package.json"), "utf-8");
    expect(pkg).not.toMatch(/framer-motion|gsap|react-spring|motion-dom|anime\.js|lottie/i);
  });
});

function collectCssFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectCssFiles(full));
    else if (entry.name.endsWith(".css")) files.push(full);
  }
  return files;
}

describe("No second prefers-reduced-motion rule was introduced (M4.2 reconciliation)", () => {
  it("exactly one @media (prefers-reduced-motion...) rule exists across every stylesheet (src/app + src/styles, recursive) — the pre-existing M1 rule, unduplicated", () => {
    const files = [
      join(process.cwd(), "src", "app", "globals.css"),
      ...collectCssFiles(join(process.cwd(), "src", "styles")),
    ];
    let occurrences = 0;
    for (const file of files) {
      const content = stripComments(readFileSync(file, "utf-8"));
      occurrences += (content.match(/@media\s*\(prefers-reduced-motion/g) ?? []).length;
    }
    expect(occurrences).toBe(1);
  });
});
