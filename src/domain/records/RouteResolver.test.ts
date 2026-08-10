import { describe, expect, it } from "vitest";

import { createRecordId, createSlug } from "./CanonicalRecord";
import type { CanonicalRecordBase } from "./CanonicalRecord";
import {
  allFixtureRecords,
  fixtureAboutRecord,
  fixtureArtRecord,
  fixtureLabRecord,
  fixtureProductRecord,
  fixtureResearchRecord,
  fixtureWorkRecord,
} from "./fixtures";
import { isDirectlyAccessible, isPubliclyDiscoverable } from "./registry";
import {
  buildCanonicalRouteRegistry,
  RESERVED_ROUTE_SEGMENTS,
  resolveCanonicalRoute,
} from "./RouteResolver";

describe("resolveCanonicalRoute — every fixture resolves", () => {
  it.each([
    [fixtureWorkRecord, "/work/fixture-work-outcome"],
    [fixtureResearchRecord, "/research/fixture-research-inquiry"],
    [fixtureLabRecord, "/lab/fixture-lab-experiment"],
    [fixtureArtRecord, "/art/fixture-artwork"],
    [fixtureProductRecord, "/products/fixture-product-offer"],
    [fixtureAboutRecord, "/about/profile"],
  ] as const)("resolves the expected route", (record, expected) => {
    expect(resolveCanonicalRoute(record)).toBe(expected);
  });
});

describe("District route correctness", () => {
  it("Work route uses /work/{slug}", () => {
    expect(resolveCanonicalRoute(fixtureWorkRecord)).toBe("/work/fixture-work-outcome");
  });
  it("Research route uses /research/{slug}", () => {
    expect(resolveCanonicalRoute(fixtureResearchRecord)).toBe("/research/fixture-research-inquiry");
  });
  it("Lab route uses /lab/{slug}", () => {
    expect(resolveCanonicalRoute(fixtureLabRecord)).toBe("/lab/fixture-lab-experiment");
  });
  it("Art route uses /art/{slug}", () => {
    expect(resolveCanonicalRoute(fixtureArtRecord)).toBe("/art/fixture-artwork");
  });
  it("Product route uses /products/{slug}", () => {
    expect(resolveCanonicalRoute(fixtureProductRecord)).toBe("/products/fixture-product-offer");
  });
  it("About route always resolves to the one fixed /about/profile route", () => {
    expect(resolveCanonicalRoute(fixtureAboutRecord)).toBe("/about/profile");
  });
  it("About route ignores the record's own slug entirely", () => {
    const differentSlug: CanonicalRecordBase = {
      ...fixtureAboutRecord,
      slug: createSlug("something-else"),
    };
    expect(resolveCanonicalRoute(differentSlug)).toBe("/about/profile");
  });
  it("throws for an About record with an unrecognized content type rather than guessing a route", () => {
    const unresolvable: CanonicalRecordBase = { ...fixtureAboutRecord, contentType: "essay" };
    expect(() => resolveCanonicalRoute(unresolvable)).toThrow(/no approved route mapping exists/);
  });
});

describe("Duplicate routes / duplicate IDs rejected", () => {
  it("builds a registry from the fixture set with no collisions", () => {
    const registry = buildCanonicalRouteRegistry(allFixtureRecords);
    expect(registry.size).toBe(allFixtureRecords.length);
  });

  it("rejects a reserved-segment slug collision (Work)", () => {
    const colliding: CanonicalRecordBase = { ...fixtureWorkRecord, slug: createSlug("selected") };
    expect(() => resolveCanonicalRoute(colliding)).toThrow(/reserved "work" route segment/);
  });

  it("rejects a reserved-segment slug collision (Research)", () => {
    const colliding: CanonicalRecordBase = {
      ...fixtureResearchRecord,
      slug: createSlug("archive"),
    };
    expect(() => resolveCanonicalRoute(colliding)).toThrow(/reserved "research" route segment/);
  });

  it("rejects two About records — both would resolve to the same /about/profile route", () => {
    const secondAboutRecord: CanonicalRecordBase = {
      ...fixtureAboutRecord,
      id: createRecordId("fixture-about-002"),
      slug: createSlug("fixture-profile-two"),
    };
    expect(() => buildCanonicalRouteRegistry([fixtureAboutRecord, secondAboutRecord])).toThrow(
      /Duplicate canonical route "\/about\/profile"/,
    );
  });

  it("same slug across different owner districts does not collide (district prefix differs)", () => {
    const workWithSlug: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      slug: createSlug("shared-slug"),
    };
    const artWithSlug: CanonicalRecordBase = {
      ...fixtureArtRecord,
      slug: createSlug("shared-slug"),
    };
    const registry = buildCanonicalRouteRegistry([workWithSlug, artWithSlug]);
    expect(registry.size).toBe(2);
    expect(registry.has("/work/shared-slug" as never)).toBe(true);
    expect(registry.has("/art/shared-slug" as never)).toBe(true);
  });
});

describe("Temporary context never changes canonical route", () => {
  const variants: Array<[string, Partial<CanonicalRecordBase>]> = [
    ["lifecycle", { lifecycle: "archived" }],
    ["visibility", { visibility: "private" }],
    ["curatorialInclusion", { curatorialInclusion: "excluded" }],
    ["disciplines", { disciplines: ["Fixture Discipline"] }],
    ["themes", { themes: ["Fixture Theme"] }],
    ["featured", { featured: true }],
  ];

  it.each(variants)("route is invariant when %s changes", (_label, patch) => {
    const original = resolveCanonicalRoute(fixtureWorkRecord);
    const patched: CanonicalRecordBase = { ...fixtureWorkRecord, ...patch };
    expect(resolveCanonicalRoute(patched)).toBe(original);
  });

  it("Lab success/failure state never mutates the route", () => {
    const original = resolveCanonicalRoute(fixtureLabRecord);
    const succeeded: CanonicalRecordBase = { ...fixtureLabRecord, lifecycle: "complete" };
    expect(resolveCanonicalRoute(succeeded)).toBe(original);
  });

  it("Product availability never mutates the route", () => {
    const original = resolveCanonicalRoute(fixtureProductRecord);
    const discontinued: CanonicalRecordBase = { ...fixtureProductRecord, lifecycle: "archived" };
    expect(resolveCanonicalRoute(discontinued)).toBe(original);
  });
});

describe("Archive invariance", () => {
  it("an archived Work record keeps the plain /work/{slug} route — never /work/archive/{slug}", () => {
    const archived: CanonicalRecordBase = { ...fixtureWorkRecord, lifecycle: "archived" };
    expect(resolveCanonicalRoute(archived)).toBe("/work/fixture-work-outcome");
    expect(resolveCanonicalRoute(archived)).not.toContain("archive");
  });
});

describe("Grouping/lens/filter routes are never canonical destinations", () => {
  it("no resolved route ever equals a reserved (grouping) segment path", () => {
    for (const record of allFixtureRecords) {
      if (record.ownerDistrict === "about") continue;
      const route = resolveCanonicalRoute(record);
      const reserved = RESERVED_ROUTE_SEGMENTS[record.ownerDistrict];
      for (const segment of reserved) {
        expect(route).not.toBe(`/${record.ownerDistrict}/${segment}`);
      }
    }
  });

  it("no resolved route ever starts with /index — global discovery routes are never canonical", () => {
    for (const record of allFixtureRecords) {
      expect(resolveCanonicalRoute(record).startsWith("/index")).toBe(false);
    }
  });
});

describe("No query string, hash, or non-identity fragment", () => {
  it("resolved routes contain no query string, hash, or extra path segments beyond district/slug", () => {
    for (const record of allFixtureRecords) {
      const route = resolveCanonicalRoute(record);
      expect(route).not.toContain("?");
      expect(route).not.toContain("#");
      if (record.ownerDistrict !== "about") {
        expect(route.split("/").filter(Boolean)).toHaveLength(2);
      }
    }
  });
});

describe("Route identity versus public-delivery authorization", () => {
  it("a private, excluded record still has a well-defined canonical route", () => {
    const privateRecord: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      visibility: "private",
      curatorialInclusion: "excluded",
    };
    expect(resolveCanonicalRoute(privateRecord)).toBe("/work/fixture-work-outcome");
    expect(isPubliclyDiscoverable(privateRecord)).toBe(false);
    expect(isDirectlyAccessible(privateRecord)).toBe(false);
  });

  it("route resolution and delivery-eligibility are independent function calls, never combined in one pass", () => {
    expect(resolveCanonicalRoute(fixtureWorkRecord)).toBeTruthy();
    expect(isPubliclyDiscoverable(fixtureWorkRecord)).toBe(true);
  });
});

describe("Direct-entry readiness", () => {
  it("a resolved route is a plain string usable independently of any navigation history", () => {
    const route = resolveCanonicalRoute(fixtureWorkRecord);
    expect(typeof route).toBe("string");
    expect(JSON.parse(JSON.stringify({ route })).route).toBe(route);
  });
});
