import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects M3.2's own source-level invariants — see
 * docs/implementation/M3.2_DISTRICT_EXTENSIONS.md for the full audit.
 * Follows the same pattern as tests/domain/records-source-contract.test.ts
 * (M3.1): raw source-text checks against the domain module, not its
 * compiled behavior.
 */

const DOMAIN_DIR = join(process.cwd(), "src", "domain", "records");

function readSource(file: string): string {
  return readFileSync(join(DOMAIN_DIR, file), "utf-8");
}

const source = readSource("DistrictExtensions.ts");
// Comments legitimately discuss, in prose, the patterns this file avoids
// (e.g. "never a duplicate field here") — strip them before negative
// assertions, exactly as M2's CSS contract tests and M3.1's own source
// contract test do.
const stripped = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

function extractInterfaceBody(text: string, name: string): string {
  const match = text.match(new RegExp(`export interface ${name}\\s*\\{([\\s\\S]*?)\\n\\}`));
  if (!match) throw new Error(`interface ${name} not found in source`);
  return match[1] ?? "";
}

const EXTENSION_INTERFACES = [
  "WorkExtension",
  "ResearchExtension",
  "LabExtension",
  "ArtExtension",
  "ProductsExtension",
  "AboutExtension",
];

describe("M3.2 district extensions — source contract", () => {
  it("imports nothing from React or src/components — a domain contract, not a presentation module", () => {
    expect(stripped).not.toMatch(/from ["']react["']/);
    expect(stripped).not.toMatch(/from ["']@\/components/);
    expect(stripped).not.toMatch(/import[^;]*ReactNode/);
    expect(stripped).not.toMatch(/:\s*ReactNode\b/);
  });

  it("defines exactly the six approved district extension interfaces — no Home extension anywhere", () => {
    for (const name of EXTENSION_INTERFACES) {
      expect(stripped).toContain(`export interface ${name}`);
    }
    expect(stripped).not.toMatch(/HomeExtension/);
    expect(stripped.toLowerCase()).not.toMatch(/["']home["']\s*:/);
  });

  it("no single god-object interface holds every district's fields at once", () => {
    expect(stripped).not.toMatch(/districtData/i);
    expect(stripped).not.toMatch(/AllDistrictFields/);
    // Each extension interface stays small — a rough, effective proxy that
    // no interface silently absorbed every other district's fields too.
    for (const name of EXTENSION_INTERFACES) {
      const body = extractInterfaceBody(stripped, name);
      const fieldCount = (body.match(/^\s*[a-zA-Z]+\??:/gm) ?? []).length;
      expect(fieldCount).toBeLessThan(16);
    }
  });

  it("no extension interface redefines a universal identity or state field owned by CanonicalRecordBase", () => {
    const universalFields = [
      "id",
      "slug",
      "title",
      "ownerDistrict",
      "visibility",
      "curatorialInclusion",
      "lifecycle",
      "authorship",
    ];
    for (const name of EXTENSION_INTERFACES) {
      const body = extractInterfaceBody(stripped, name);
      for (const field of universalFields) {
        expect(body).not.toMatch(new RegExp(`\\b${field}\\??:`));
      }
    }
  });

  it("no extension interface duplicates the universal media or relationships arrays", () => {
    for (const name of EXTENSION_INTERFACES) {
      const body = extractInterfaceBody(stripped, name);
      expect(body).not.toMatch(/\bmedia\??:/);
      expect(body).not.toMatch(/\brelationships\??:/);
    }
  });

  it("does not define an uncontrolled tag cloud anywhere", () => {
    expect(stripped).not.toMatch(/\btags\??:\s*string\[\]/);
  });

  it("no commercial field leaks into Work, Research, Lab, or Art extensions — Products owns commercial truth exclusively", () => {
    const forbidden = [
      "price",
      "checkout",
      "cart",
      "stock",
      "tax",
      "discount",
      "inventory",
      "subscription",
      "payment",
    ];
    for (const name of ["WorkExtension", "ResearchExtension", "LabExtension", "ArtExtension"]) {
      const body = extractInterfaceBody(stripped, name).toLowerCase();
      for (const field of forbidden) {
        expect(body).not.toContain(`${field}:`);
        expect(body).not.toContain(`${field}?:`);
      }
    }
  });

  it("Art's edition note is restrained (no price/stock field) — the canonical artwork record never owns commercial truth", () => {
    const body = extractInterfaceBody(stripped, "ArtExtension");
    expect(body).not.toMatch(/\bprice\??:/);
    expect(body).not.toMatch(/\bstock\??:/);
  });

  it("no checkout/cart/payment/tax runtime logic exists anywhere in the module — descriptive data only", () => {
    expect(stripped).not.toMatch(/function\s+(checkout|processPayment|calculateTax|addToCart)/i);
  });

  it("implements a real generic owner→extension mapping, not per-district duplicated ad hoc unions", () => {
    expect(stripped).toContain("ExtensionForDistrict");
    expect(stripped).toContain("Extract<");
    expect(stripped).toContain("DistrictRecord<");
  });

  it("every extension carries its own literal discriminant, enabling runtime owner/extension correlation checks", () => {
    for (const name of EXTENSION_INTERFACES) {
      const body = extractInterfaceBody(stripped, name);
      expect(body).toMatch(/readonly extensionFor:\s*"[a-z]+"/);
    }
  });

  it("validateDistrictRecord and assertValidDistrictRecord are exported (real validation, not documentation only)", () => {
    expect(stripped).toContain("export function validateDistrictRecord");
    expect(stripped).toContain("export function assertValidDistrictRecord");
  });
});
