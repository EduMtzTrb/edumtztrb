import { describe, expect, it } from "vitest";

import { createRecordId, createSlug } from "./CanonicalRecord";
import type { CanonicalRecordBase } from "./CanonicalRecord";
import { allFixtureRecords, fixtureWorkRecord } from "./fixtures";
import {
  assertRelationshipsResolve,
  createRecordRegistry,
  isDirectlyAccessible,
  isPubliclyDiscoverable,
} from "./registry";

describe("createRecordRegistry — Gate M3.1 'Duplicate IDs are rejected'", () => {
  it("builds a registry from a valid, unique-ID fixture set", () => {
    const registry = createRecordRegistry(allFixtureRecords);
    expect(registry.size).toBe(allFixtureRecords.length);
  });

  it("throws on a genuine duplicate ID", () => {
    const duplicate: CanonicalRecordBase = { ...fixtureWorkRecord };
    expect(() => createRecordRegistry([fixtureWorkRecord, duplicate])).toThrow(
      /Duplicate canonical record ID/,
    );
  });
});

describe("assertRelationshipsResolve — Gate M3.1 'Every relationship resolves'", () => {
  it("passes for the fixture set, where every relationship target exists", () => {
    expect(() => assertRelationshipsResolve(allFixtureRecords)).not.toThrow();
  });

  it("throws when a relationship references a target ID that isn't in the record set", () => {
    const brokenRecord: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      id: createRecordId("fixture-broken-001"),
      slug: createSlug("fixture-broken"),
      relationships: [{ targetId: createRecordId("fixture-does-not-exist"), type: "related-to" }],
    };
    expect(() => assertRelationshipsResolve([brokenRecord])).toThrow(
      /unresolved relationship target/,
    );
  });
});

describe("isPubliclyDiscoverable / isDirectlyAccessible — IA §7.3 eligibility rules", () => {
  it("included + public is publicly discoverable regardless of lifecycle", () => {
    for (const lifecycle of ["complete", "failed", "speculative", "archived"] as const) {
      expect(
        isPubliclyDiscoverable({ curatorialInclusion: "included", visibility: "public" }),
      ).toBe(true);
      void lifecycle; // lifecycle is deliberately irrelevant to this predicate — IA §7.3
    }
  });

  it("included + unlisted is not publicly discoverable but is directly accessible", () => {
    const record = { curatorialInclusion: "included", visibility: "unlisted" } as const;
    expect(isPubliclyDiscoverable(record)).toBe(false);
    expect(isDirectlyAccessible(record)).toBe(true);
  });

  it("private is neither publicly discoverable nor directly accessible", () => {
    const record = { curatorialInclusion: "included", visibility: "private" } as const;
    expect(isPubliclyDiscoverable(record)).toBe(false);
    expect(isDirectlyAccessible(record)).toBe(false);
  });

  it("excluded is neither publicly discoverable nor directly accessible, even if visibility is public", () => {
    const record = { curatorialInclusion: "excluded", visibility: "public" } as const;
    expect(isPubliclyDiscoverable(record)).toBe(false);
    expect(isDirectlyAccessible(record)).toBe(false);
  });
});
