import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Protects M3.3's own source-level invariants — see
 * docs/implementation/M3.3_CANONICAL_ROUTE_RESOLVER.md for the full audit.
 * Follows the same raw-source-text pattern as
 * tests/domain/records-source-contract.test.ts (M3.1) and
 * tests/domain/district-extensions-source-contract.test.ts (M3.2).
 */

const source = readFileSync(
  join(process.cwd(), "src", "domain", "records", "RouteResolver.ts"),
  "utf-8",
);
const stripped = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

function extractFunctionBody(text: string, name: string): string {
  const start = text.indexOf(`function ${name}(`);
  if (start === -1) throw new Error(`function ${name} not found`);
  const braceStart = text.indexOf("{", start);
  let depth = 0;
  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === "{") depth++;
    if (text[i] === "}") depth--;
    if (depth === 0) return text.slice(braceStart, i + 1);
  }
  throw new Error(`unterminated function body for ${name}`);
}

describe("M3.3 canonical-route resolver — source contract", () => {
  it("imports nothing from React or src/components — a domain module, not a presentation module", () => {
    expect(stripped).not.toMatch(/from ["']react["']/);
    expect(stripped).not.toMatch(/from ["']@\/components/);
    expect(stripped).not.toMatch(/:\s*ReactNode\b/);
  });

  it("has no dependency on a browser session, history, or global — pure identity-in, route-out", () => {
    expect(stripped).not.toMatch(/\bwindow\./);
    expect(stripped).not.toMatch(/\bdocument\./);
    expect(stripped).not.toMatch(/\bhistory\./);
    expect(stripped).not.toMatch(/\blocalStorage\b/);
    expect(stripped).not.toMatch(/\bsessionStorage\b/);
  });

  it("resolveCanonicalRoute reads only ownerDistrict, slug, and contentType — no temporary/state field can influence the resolved route", () => {
    const body = extractFunctionBody(stripped, "resolveCanonicalRoute");
    for (const forbidden of [
      "visibility",
      "curatorialInclusion",
      "lifecycle",
      "disciplines",
      "themes",
      "featured",
      "editorial",
      "date",
    ]) {
      expect(body).not.toMatch(new RegExp(`record\\.${forbidden}\\b`));
    }
  });

  it("never constructs a query string, hash, or search-parameter fragment", () => {
    expect(stripped).not.toMatch(/[`"']\?[a-zA-Z]/);
    expect(stripped).not.toContain("URLSearchParams");
    expect(stripped).not.toMatch(/[`"']#[a-zA-Z]/);
  });

  it("never embeds a relationship or duplicates relationship-target data — routes are computed from identity alone", () => {
    expect(stripped).not.toMatch(/\brelationships\b/);
  });

  it("exports the resolver, the registry builder, and the reserved-segment table", () => {
    expect(stripped).toContain("export function resolveCanonicalRoute");
    expect(stripped).toContain("export function buildCanonicalRouteRegistry");
    expect(stripped).toContain("export const RESERVED_ROUTE_SEGMENTS");
  });

  it("reserved-segment table matches the approved route families exactly (spot-checked)", () => {
    expect(stripped).toMatch(/work:\s*\["selected",\s*"all",\s*"practice",\s*"collections"\]/);
    expect(stripped).toMatch(/research:\s*\[\s*"current"/);
    expect(stripped).toMatch(
      /lab:\s*\["active",\s*"prototypes",\s*"tools",\s*"studies",\s*"archive"\]/,
    );
    expect(stripped).toMatch(/art:\s*\[\s*"selected"/);
    expect(stripped).toMatch(/products:\s*\[\s*"featured"/);
  });

  it("does not build or wire any real Next.js route/page file — resolution only", () => {
    expect(stripped).not.toMatch(/next\/navigation/);
    expect(stripped).not.toMatch(/generateStaticParams/);
  });
});
