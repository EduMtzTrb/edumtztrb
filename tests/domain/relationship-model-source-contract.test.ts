import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects M3.5's own source-level invariants — see
 * docs/implementation/M3.5_RELATIONSHIP_MODEL.md for the full audit.
 * Follows the same raw-source-text pattern as the M3.1–M3.4 source
 * contract tests.
 */

const source = readFileSync(
  join(process.cwd(), "src", "domain", "records", "RelationshipModel.ts"),
  "utf-8",
);
const stripped = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

describe("M3.5 relationship model — source contract", () => {
  it("imports nothing from React or src/components — a domain module, not a presentation module", () => {
    expect(stripped).not.toMatch(/from ["']react["']/);
    expect(stripped).not.toMatch(/from ["']@\/components/);
    expect(stripped).not.toMatch(/:\s*ReactNode\b/);
  });

  it("declares exactly the six approved stored relationship types, no more", () => {
    const matches =
      stripped.match(
        /"related-to"|"derived-from"|"informed-by"|"tested-in"|"developed-into"|"commercialized-as"/g,
      ) ?? [];
    const distinctTypes = new Set(matches);
    expect(distinctTypes.size).toBe(6);
  });

  it("does not define an uncontrolled relationship-type string vocabulary", () => {
    expect(stripped).not.toMatch(/type:\s*string(?!\s*&)/);
  });

  it("never embeds a target canonical record inside a relationship — reference by ID only", () => {
    expect(stripped).not.toMatch(/target:\s*CanonicalRecordBase/);
    expect(stripped).not.toMatch(/embeddedTarget/i);
  });

  it("never copies a route literal into stored relationship data — routes are always resolved fresh via RouteResolver", () => {
    expect(stripped).not.toMatch(/targetRoute\s*[:=]\s*["'`]\//);
    expect(stripped).toContain("resolveCanonicalRoute");
  });

  it("never imports the classification model — classification overlap cannot auto-generate a relationship", () => {
    expect(stripped).not.toMatch(/from ["']\.\/ClassificationModel["']/);
  });

  it("never mutates ownerDistrict — relationships cannot change canonical ownership", () => {
    expect(stripped).not.toMatch(/\bownerDistrict\s*=(?!=)/);
    expect(stripped).not.toMatch(/\.ownerDistrict\s*=(?!=)/);
  });

  it("contains no visual/Trace/Signal/CSS code", () => {
    expect(stripped).not.toMatch(/\.css["']/);
    expect(stripped).not.toMatch(/\bSignal\b/);
    expect(stripped).not.toMatch(/\bTrace\b/);
    expect(stripped).not.toMatch(/className/);
  });

  it("implements no generic recommendation model — labels are derived from the stored type, not similarity scoring", () => {
    expect(stripped).not.toMatch(/function\s+(recommend|suggestSimilar|rankBySimilarity)/i);
  });

  it("implements no Search or Index logic", () => {
    expect(stripped).not.toMatch(/function\s+(search|buildIndex|rankResults)/i);
  });

  it("exports the resolution, validation, and query functions this package requires", () => {
    expect(stripped).toContain("export function resolveRelationship");
    expect(stripped).toContain("export function validateRelationships");
    expect(stripped).toContain("export function listIncomingRelationships");
    expect(stripped).toContain("export function listOutgoingRelationships");
    expect(stripped).toContain("export function deriveRelationshipLabel");
  });
});
