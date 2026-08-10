import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects the M3.1 universal canonical-record contract's source-level
 * invariants — this task's own §41 ("source contract"). See
 * docs/implementation/M3.1_UNIVERSAL_CANONICAL_RECORD_CONTRACT.md for the
 * full audit and reasoning.
 *
 * Source-text checks, consistent with this repository's existing
 * tests/tokens/*-contract.test.ts suites — but here protecting a
 * TypeScript domain module rather than a CSS stylesheet.
 */

const DOMAIN_DIR = join(process.cwd(), "src", "domain", "records");

function readSource(file: string): string {
  return readFileSync(join(DOMAIN_DIR, file), "utf-8");
}

const contractSource = readSource("CanonicalRecord.ts");
const registrySource = readSource("registry.ts");
const allSource = [contractSource, registrySource].join("\n");

describe("M3.1 canonical-record contract — source contract", () => {
  it("imports nothing from React or src/components — a domain contract, not a presentation module", () => {
    expect(allSource).not.toMatch(/from ["']react["']/);
    expect(allSource).not.toMatch(/from ["']@\/components/);
    // A real `ReactNode` field/import would appear right after `import`
    // or as a type annotation (`: ReactNode`); the module's own comments
    // legitimately discuss, in prose, why no ReactNode exists here — this
    // checks actual usage, not every mention of the word.
    expect(allSource).not.toMatch(/import[^;]*ReactNode/);
    expect(allSource).not.toMatch(/:\s*ReactNode\b/);
  });

  it("does not define an all-optional universal record interface — the required identity/state fields on CanonicalRecordBase are non-optional", () => {
    const requiredFields = [
      "id: CanonicalRecordId",
      "slug: CanonicalSlug",
      "title: string",
      "ownerDistrict: CanonicalOwnerDistrict",
      "contentType: CanonicalContentType",
      "curatorialInclusion: CuratorialInclusion",
      "visibility: Visibility",
      "lifecycle: Lifecycle",
      "summary: string",
      "authorship: Authorship",
    ];
    for (const field of requiredFields) {
      expect(contractSource).toContain(field);
    }
  });

  it("does not contain a generic, unqualified `status` field (IA §14.5/§6.3)", () => {
    // Matches a field declaration named exactly `status`, not words that
    // merely contain "status" as a substring (there are none here, but
    // this keeps the check precise rather than a blunt string search).
    expect(contractSource).not.toMatch(/\bstatus\??:\s/);
  });

  it("does not contain a separate `archive`/`archived` field (IA §14.4 — archive is lifecycle: archived)", () => {
    expect(contractSource).not.toMatch(/\barchive\??:\s/);
    expect(contractSource).not.toMatch(/\barchived\??:\s/);
  });

  it("does not embed a district accent/color or any UI class name anywhere in the domain contract", () => {
    expect(allSource.toLowerCase()).not.toMatch(/district-accent|color-signal|classname/);
  });

  it("does not couple completion to publication — no logic anywhere derives visibility/inclusion from lifecycle", () => {
    // The only legitimate places `lifecycle` and `visibility`/
    // `curatorialInclusion` appear together are the type declarations
    // themselves (as independent, sibling fields) — never inside a
    // conditional/derivation. A crude but effective structural proxy:
    // no `if`/ternary/derivation keyword appears anywhere near a
    // `lifecycle` reference in this module at all, since neither file
    // contains any conditional logic referencing `lifecycle`.
    expect(allSource).not.toMatch(/lifecycle[\s\S]{0,40}(?:===|==|\?)[\s\S]{0,40}visibility/);
    expect(allSource).not.toMatch(/visibility[\s\S]{0,40}(?:===|==|\?)[\s\S]{0,40}lifecycle/);
  });

  it("does not define an untyped generic relationship array — relationships are CanonicalRelationshipReference[], never string[]", () => {
    expect(contractSource).not.toMatch(/relationships\??:\s*string\[\]/);
    expect(contractSource).toContain("relationships?: CanonicalRelationshipReference[]");
  });

  it("does not include any discipline/technology as a canonical owner district", () => {
    const forbiddenOwners = ["architecture", '"ai"', "bim", "software", "art-tech", "computation"];
    const ownerDistrictLine =
      contractSource.match(/export type CanonicalOwnerDistrict =[^;]+;/)?.[0] ?? "";
    for (const forbidden of forbiddenOwners) {
      expect(ownerDistrictLine.toLowerCase()).not.toContain(forbidden.toLowerCase());
    }
  });

  it("does not define Product-specific commercial fields (price, availability, discount, etc.) on the base contract — that is M3.2's district-extension territory", () => {
    const forbiddenCommercialFields = [
      "price",
      "availability",
      "discount",
      "priceBasis",
      "edition",
      "license",
      "inventory",
      "cart",
      "checkout",
    ];
    for (const field of forbiddenCommercialFields) {
      expect(contractSource.toLowerCase()).not.toContain(`${field.toLowerCase()}:`);
      expect(contractSource.toLowerCase()).not.toContain(`${field.toLowerCase()}?:`);
    }
  });

  it("does not define any UI opacity/tier/presentation-weight field — those are M2.9's presentation-tier concept, not canonical truth", () => {
    expect(contractSource).not.toMatch(/\btier\??:\s/);
    expect(contractSource).not.toMatch(/opacity/i);
  });

  it("does not store a computed canonical URL/href — only `slug` is stored; canonical route construction is M3.3's", () => {
    expect(contractSource).not.toMatch(/\bhref\??:\s/);
    expect(contractSource).not.toMatch(/canonicalUrl/);
    expect(contractSource).not.toMatch(/canonicalRoute\??:\s/);
  });

  it("does not define district-specific extension fields (Work/Research/Lab/Art-only data) on the base contract", () => {
    // "role" and "method" are deliberately excluded from this list: both
    // are ambiguous substrings of legitimate universal fields
    // (Authorship.role), so only the more clearly district-specific
    // terms are checked here.
    for (const field of ["medium", "dimensions", "client", "deliverable", "hypothesis"]) {
      expect(contractSource.toLowerCase()).not.toContain(`${field}:`);
    }
  });
});
