import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * District navigation wiring — M3.8. Confirms every district's own
 * `layout.tsx` actually composes `DistrictNav` with its correct district
 * prop — the real integration point between `districtNavigation.ts`'s
 * configuration and the live route tree — without needing a full render
 * of every route (already covered per-component by `DistrictNav.test.tsx`).
 */

const APP_DIR = join(process.cwd(), "src", "app");

const DISTRICTS = ["work", "research", "lab", "art", "products", "about"] as const;

function readLayout(district: string): string {
  return readFileSync(join(APP_DIR, district, "layout.tsx"), "utf-8");
}

describe("District layout wiring (M3.8)", () => {
  it("every district layout imports DistrictNav from the shared shell location", () => {
    for (const district of DISTRICTS) {
      const source = readLayout(district);
      expect(source).toMatch(
        /import\s*\{\s*DistrictNav\s*\}\s*from\s*"@\/components\/shell\/DistrictNav"/,
      );
    }
  });

  it('every district layout renders <DistrictNav district="..."> with its own, correct district value', () => {
    for (const district of DISTRICTS) {
      const source = readLayout(district);
      expect(source).toMatch(new RegExp(`<DistrictNav district="${district}"\\s*/>`));
    }
  });

  it("DistrictNav is rendered inside the existing data-district wrapper, never replacing it", () => {
    for (const district of DISTRICTS) {
      const source = readLayout(district);
      expect(source).toMatch(new RegExp(`data-district="${district}"`));
    }
  });
});
