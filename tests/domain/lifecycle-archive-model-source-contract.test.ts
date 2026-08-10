import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects M3.6's own source-level invariants — see
 * docs/implementation/M3.6_LIFECYCLE_ARCHIVE_MODEL.md for the full audit.
 * Follows the same raw-source-text pattern as the M3.1–M3.5 source
 * contract tests.
 */

const source = readFileSync(
  join(process.cwd(), "src", "domain", "records", "LifecycleArchiveModel.ts"),
  "utf-8",
);
const stripped = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

describe("M3.6 lifecycle and archive model — source contract", () => {
  it("imports nothing from React or src/components — a domain module, not a presentation module", () => {
    expect(stripped).not.toMatch(/from ["']react["']/);
    expect(stripped).not.toMatch(/from ["']@\/components/);
    expect(stripped).not.toMatch(/:\s*ReactNode\b/);
  });

  it("does not define a generic, unqualified `status` field anywhere", () => {
    expect(stripped).not.toMatch(/\bstatus\??:\s/);
  });

  it("does not add an `isArchived` boolean field to any record shape — archived is always derived from lifecycle", () => {
    expect(stripped).not.toMatch(/isArchived\??:\s*boolean/);
    expect(stripped).toContain("export function isArchived(");
  });

  it("does not define one universal mega lifecycle enum merging district vocabularies", () => {
    // Lab/Products/Research/Art vocabulary values should never co-occur inside this module — they remain owned by DistrictExtensions.ts (M3.2), untouched here.
    for (const districtValue of [
      "framed",
      "stabilized",
      "forthcoming",
      "sold-out",
      "reconstructed",
      "emulated",
    ]) {
      expect(stripped).not.toContain(`"${districtValue}"`);
    }
  });

  it("does not couple lifecycle to visibility or curatorial inclusion in any conditional expression", () => {
    expect(stripped).not.toMatch(/lifecycle[\s\S]{0,40}(?:===|==|\?)[\s\S]{0,40}visibility/);
    expect(stripped).not.toMatch(/visibility[\s\S]{0,40}(?:===|==|\?)[\s\S]{0,40}lifecycle/);
    expect(stripped).not.toMatch(
      /lifecycle[\s\S]{0,40}(?:===|==|\?)[\s\S]{0,40}curatorialInclusion/,
    );
  });

  it("does not couple completion to publication, or Products commercial state to visibility", () => {
    expect(stripped).not.toMatch(/"complete"[\s\S]{0,40}(?:===|==|\?)[\s\S]{0,40}visibility/);
    expect(stripped).not.toMatch(/commercialState[\s\S]{0,40}(?:===|==|\?)[\s\S]{0,40}visibility/);
  });

  it("implements no Search or Index logic", () => {
    expect(stripped).not.toMatch(/function\s+(search|buildIndex|rankResults)/i);
  });

  it("never mutates canonical route or ownerDistrict based on archive state", () => {
    expect(stripped).not.toMatch(/\bownerDistrict\s*=(?!=)/);
    expect(stripped).not.toMatch(/resolveCanonicalRoute\([^)]*\)\s*=/);
    expect(stripped).not.toContain("/archive/");
  });

  it("never deletes or filters relationships based solely on archive state", () => {
    expect(stripped).not.toMatch(/relationships\s*=\s*\[\]/);
    expect(stripped).not.toMatch(/\.relationships\.filter/);
  });

  it("reuses M3.1's isPubliclyDiscoverable rather than re-implementing public-discovery logic", () => {
    expect(stripped).toMatch(
      /import\s*\{[^}]*isPubliclyDiscoverable[^}]*\}\s*from\s*["']\.\/registry["']/,
    );
  });

  it("exports the public API this package requires", () => {
    expect(stripped).toContain("export function isArchived");
    expect(stripped).toContain("export function isPublicArchiveEligible");
    expect(stripped).toContain("export function selectPublicArchive");
    expect(stripped).toContain("export function selectPublicComprehensiveView");
    expect(stripped).toContain("export function toPublicSafeProjection");
    expect(stripped).toContain("export function createInternalPublicationRegistry");
  });
});
