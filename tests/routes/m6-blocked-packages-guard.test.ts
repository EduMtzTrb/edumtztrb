import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * M6-A — Blocked-package guard. M6.2 (Legal/Admin) and M6.3 (Language) are
 * both `Blocked` — see docs/implementation/M6_UTILITIES_READINESS.md. This
 * suite protects that fact mechanically: no legal route, no i18n
 * infrastructure, and no language switcher exists anywhere in the
 * repository, so a future task cannot silently assume either package was
 * quietly activated.
 */
describe("M6.2 — Legal/Admin stays Blocked (no fabricated route/content)", () => {
  it("no /legal (or any admin/legal) top-level route exists under src/app", () => {
    const appDir = join(process.cwd(), "src", "app");
    const topLevel = readdirSync(appDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    for (const name of topLevel) {
      expect(name.toLowerCase()).not.toMatch(/legal|privacy|terms|admin/);
    }
  });

  it("no fabricated legal/privacy/terms content string exists in any real route file", () => {
    const appDir = join(process.cwd(), "src", "app");
    const forbidden = [/privacy policy/i, /terms of service/i, /terms and conditions/i];
    for (const file of walk(appDir)) {
      if (!file.endsWith(".tsx") || file.endsWith(".test.tsx")) continue;
      const source = readFileSync(file, "utf-8");
      for (const pattern of forbidden) {
        expect(source).not.toMatch(pattern);
      }
    }
  });
});

describe("M6.3 — Language stays Blocked / Not Activated (no i18n infrastructure)", () => {
  it("no locale-segment route (e.g. src/app/[locale]) exists anywhere under src/app", () => {
    const appDir = join(process.cwd(), "src", "app");
    for (const file of walk(appDir)) {
      expect(file).not.toMatch(/\[locale\]/);
    }
  });

  it("no i18n/locale configuration directory exists at the repository root or under src", () => {
    expect(existsSync(join(process.cwd(), "i18n"))).toBe(false);
    expect(existsSync(join(process.cwd(), "src", "i18n"))).toBe(false);
    expect(existsSync(join(process.cwd(), "messages"))).toBe(false);
  });

  it("no language-switcher component exists anywhere in src/components", () => {
    const componentsDir = join(process.cwd(), "src", "components");
    for (const file of walk(componentsDir)) {
      expect(file.toLowerCase()).not.toMatch(/languageswitch|localeswitch|language-switch/);
    }
  });
});

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}
