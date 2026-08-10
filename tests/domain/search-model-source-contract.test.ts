import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Search model source contract — M3.12. See docs/implementation/M3.12_SEARCH.md. */

function readSource(file: string): string {
  return readFileSync(join(process.cwd(), "src", "domain", "records", file), "utf-8");
}

describe("SearchModel.ts source contract (M3.12)", () => {
  const src = readSource("SearchModel.ts");

  it("has no React/component import — domain logic only", () => {
    expect(src).not.toMatch(/from ["']react["']/);
    expect(src).not.toMatch(/\.tsx["']/);
  });

  it("reuses M3.6's selectPublicComprehensiveView — the same source Index uses, never a second one", () => {
    expect(src).toMatch(
      /import\s*\{[^}]*selectPublicComprehensiveView[^}]*\}\s*from\s*"\.\/LifecycleArchiveModel"/,
    );
  });

  it("reuses M3.3's resolveCanonicalRoute — never a second, independently computed route", () => {
    expect(src).toMatch(
      /import\s*\{[^}]*resolveCanonicalRoute[^}]*\}\s*from\s*"\.\/RouteResolver"/,
    );
  });

  it("has no dependency on a search-engine/indexing package (package.json unaffected)", () => {
    const pkg = readFileSync(join(process.cwd(), "package.json"), "utf-8");
    expect(pkg).not.toMatch(/lunr|elasticlunr|fuse\.js|algolia|meilisearch|flexsearch/i);
  });

  it("never reads internal publication state — only public CanonicalRecordBase fields", () => {
    expect(src).not.toMatch(/internalPublicationState|InternalPublicationRecord/);
  });

  it("exports exactly the expected search function and result/entry types", () => {
    expect(src).toMatch(/export function searchRecords/);
    expect(src).toMatch(/export interface SearchResult\b/);
    expect(src).toMatch(/export interface SearchResultEntry/);
  });
});
