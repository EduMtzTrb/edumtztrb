import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Filter model source contract — M3.11. See docs/implementation/M3.11_FILTERS.md. */

function readSource(file: string): string {
  return readFileSync(join(process.cwd(), "src", "domain", "records", file), "utf-8");
}

describe("FilterModel.ts source contract (M3.11)", () => {
  const src = readSource("FilterModel.ts");

  it("has no React/component import — domain logic only", () => {
    expect(src).not.toMatch(/from ["']react["']/);
    expect(src).not.toMatch(/\.tsx["']/);
  });

  it("never mutates a record — only reads CanonicalRecordBase fields", () => {
    expect(src).not.toMatch(/\.ownerDistrict\s*=(?!=)/);
    expect(src).not.toMatch(/\.contentType\s*=(?!=)/);
  });

  it("never constructs or references a canonical route literal — route identity stays M3.3's own concern", () => {
    expect(src).not.toMatch(/`\/(?:work|research|lab|art|products|about)\//);
  });

  it("exports the expected pure functions", () => {
    for (const name of [
      "parseFilterCriteria",
      "isFilterActive",
      "applyFilterCriteria",
      "activeCriteriaEntries",
      "describeCriteria",
      "distinctDistricts",
      "distinctContentTypes",
      "buildToggleHref",
      "buildRemoveHref",
      "buildResetHref",
    ]) {
      expect(src).toMatch(new RegExp(`export function ${name}`));
    }
  });
});
