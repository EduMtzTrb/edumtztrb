import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Index model source contract — M3.10. See docs/implementation/M3.10_INDEX.md. */

function readSource(file: string): string {
  return readFileSync(join(process.cwd(), "src", "domain", "records", file), "utf-8");
}

describe("IndexModel.ts source contract (M3.10)", () => {
  const src = readSource("IndexModel.ts");

  it("has no React/component import — domain logic only", () => {
    expect(src).not.toMatch(/from ["']react["']/);
    expect(src).not.toMatch(/\.tsx["']/);
  });

  it("reuses M3.6's selectPublicComprehensiveView — never a second public-eligibility implementation", () => {
    expect(src).toMatch(
      /import\s*\{[^}]*selectPublicComprehensiveView[^}]*\}\s*from\s*"\.\/LifecycleArchiveModel"/,
    );
    expect(src).not.toMatch(/import\s*\{[^}]*isPubliclyDiscoverable/);
  });

  it("reuses M3.3's resolveCanonicalRoute — never a second, independently computed route", () => {
    expect(src).toMatch(
      /import\s*\{[^}]*resolveCanonicalRoute[^}]*\}\s*from\s*"\.\/RouteResolver"/,
    );
  });

  it("has no Search-owned ranking/scoring function", () => {
    expect(src).not.toMatch(/export function \w*(rank|score)/i);
  });

  it("has no Filter/Search UI logic and no URL/query-string parsing", () => {
    expect(src).not.toMatch(/searchParams|URLSearchParams|useSearchParams/);
  });

  it("exports exactly the query function and its result/entry/lens types", () => {
    expect(src).toMatch(/export function queryIndex/);
    expect(src).toMatch(/export interface IndexResult/);
    expect(src).toMatch(/export interface IndexEntry/);
    expect(src).toMatch(/export interface IndexLensQuery/);
  });
});

describe("devFixtureSource.ts source contract (M3.10/M3.12)", () => {
  const src = readSource("devFixtureSource.ts");

  it("gates the fixture corpus behind NODE_ENV !== production, not client-trusted input alone", () => {
    expect(src).toMatch(/process\.env\.NODE_ENV\s*!==\s*["']production["']/);
  });

  it("has no React/component import — domain logic only", () => {
    expect(src).not.toMatch(/from ["']react["']/);
  });
});
