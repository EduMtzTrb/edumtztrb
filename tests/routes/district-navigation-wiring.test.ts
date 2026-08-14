import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * District navigation wiring — M3.8 / M5.0.
 *
 * Originally (M3.8) confirmed each district's own `layout.tsx` directly
 * composed `DistrictNav` with its correct district prop. M5.0 replaced the
 * six duplicated `layout.tsx` bodies with one shared `DistrictShell`
 * (`src/components/shell/DistrictShell.tsx`, unit-tested by
 * `DistrictShell.test.tsx` for the actual `DistrictNav`/`data-district`
 * composition and rendered behavior) — this file now confirms the wiring
 * one level up: every district layout hands `DistrictShell` its own,
 * correct district value, with no per-district fork of the shell itself.
 */

const APP_DIR = join(process.cwd(), "src", "app");

const DISTRICTS = ["work", "research", "lab", "art", "products", "about"] as const;

function readLayout(district: string): string {
  return readFileSync(join(APP_DIR, district, "layout.tsx"), "utf-8");
}

describe("District layout wiring (M3.8/M5.0)", () => {
  it("every district layout imports DistrictShell from the shared shell location", () => {
    for (const district of DISTRICTS) {
      const source = readLayout(district);
      expect(source).toMatch(
        /import\s*\{\s*DistrictShell\s*\}\s*from\s*"@\/components\/shell\/DistrictShell"/,
      );
    }
  });

  it('every district layout renders <DistrictShell district="..."> with its own, correct district value', () => {
    for (const district of DISTRICTS) {
      const source = readLayout(district);
      expect(source).toMatch(new RegExp(`<DistrictShell district="${district}">`));
    }
  });

  it("no district layout hand-rolls its own data-district wrapper or DistrictNav — DistrictShell is the single shared composition root", () => {
    for (const district of DISTRICTS) {
      const source = readLayout(district);
      expect(source).not.toMatch(/data-district=/);
      expect(source).not.toMatch(/DistrictNav/);
    }
  });
});
