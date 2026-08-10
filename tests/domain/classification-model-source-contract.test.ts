import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects M3.4's own source-level invariants — see
 * docs/implementation/M3.4_CLASSIFICATION_MODEL.md for the full audit.
 * Follows the same raw-source-text pattern as the M3.1–M3.3 source
 * contract tests.
 */

const source = readFileSync(
  join(process.cwd(), "src", "domain", "records", "ClassificationModel.ts"),
  "utf-8",
);
const stripped = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

describe("M3.4 classification model — source contract", () => {
  it("imports nothing from React or src/components — a domain module, not a presentation module", () => {
    expect(stripped).not.toMatch(/from ["']react["']/);
    expect(stripped).not.toMatch(/from ["']@\/components/);
    expect(stripped).not.toMatch(/:\s*ReactNode\b/);
  });

  it("does not define an uncontrolled tag cloud anywhere", () => {
    expect(stripped).not.toMatch(/\btags\??:\s*string\[\]/);
  });

  it("ClassificationDimension is a closed literal union, not an open string map", () => {
    expect(stripped).toMatch(/export type ClassificationDimension =/);
    expect(stripped).not.toMatch(/ClassificationDimension\s*=\s*string\b/);
    expect(stripped).not.toMatch(/Record<string,\s*ClassificationTerm/);
  });

  it("never constructs a canonical route or imports the route resolver — classification and route resolution stay separate modules", () => {
    expect(stripped).not.toMatch(/from ["']\.\/RouteResolver["']/);
    expect(stripped).not.toMatch(/resolveCanonicalRoute/);
    expect(stripped).not.toMatch(/canonicalRoute/i);
  });

  it("never mutates ownerDistrict — classification cannot change canonical ownership", () => {
    expect(stripped).not.toMatch(/\bownerDistrict\s*=(?!=)/);
    expect(stripped).not.toMatch(/\.ownerDistrict\s*=(?!=)/);
  });

  it("implements no Search or Filter UI/query logic", () => {
    expect(stripped).not.toMatch(/function\s+(search|rankResults|applyFilter|renderFilter)/i);
    expect(stripped).not.toMatch(/URLSearchParams/);
  });

  it("does not maintain a second, parallel Search/Index vocabulary — one catalog mechanism only", () => {
    const catalogFunctionMatches = stripped.match(/export function create\w*Catalog/g) ?? [];
    expect(catalogFunctionMatches.length).toBe(1);
  });

  it("state facets stay a small, precisely named set — never a giant generic status taxonomy", () => {
    expect(stripped).toMatch(
      /StateFacetSource\s*=\s*"lifecycle"\s*\|\s*"visibility"\s*\|\s*"curatorialInclusion"/,
    );
    expect(stripped).not.toMatch(/\bstatus\??:\s/);
  });

  it("does not auto-generate theme or discipline terms — every term is explicit, hand-authored data", () => {
    expect(stripped).not.toMatch(/function\s+(generateTheme|inventTerm|autoClassify)/i);
  });

  it("exposes exactly the five approved global lens dimensions, never more", () => {
    expect(stripped).toMatch(
      /APPROVED_GLOBAL_LENS_DIMENSIONS[\s\S]{0,40}=\s*\[\s*"district",\s*"content-type",\s*"discipline",\s*"theme",\s*"year",?\s*\]/,
    );
  });
});
