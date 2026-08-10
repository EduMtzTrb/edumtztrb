import { describe, expect, it } from "vitest";

import { searchRecords } from "./SearchModel";
import { resolveCanonicalRoute } from "./RouteResolver";
import {
  allFixtureRecords,
  fixtureArtRecord,
  fixtureLabRecord,
  fixtureUnpublishedWorkRecord,
  fixtureWorkRecord,
} from "./fixtures";
import type { CanonicalRecordBase } from "./CanonicalRecord";

describe("Search query model (M3.12)", () => {
  it("an empty query returns a correctly empty result with query preserved as ''", () => {
    const result = searchRecords(allFixtureRecords, "   ");
    expect(result.query).toBe("");
    expect(result.entries).toHaveLength(0);
    expect(result.count).toBe(0);
  });

  it("an exact title match ranks first and reports 'Exact title match'", () => {
    const result = searchRecords(allFixtureRecords, fixtureWorkRecord.title);
    expect(result.entries[0].record.id).toBe(fixtureWorkRecord.id);
    expect(result.entries[0].matchReason).toBe("Exact title match");
  });

  it("a partial title match is found and reported", () => {
    const result = searchRecords(allFixtureRecords, "artwork");
    expect(result.entries.map((e) => e.record.id)).toContain(fixtureArtRecord.id);
    expect(result.entries[0].matchReason).toMatch(/title/i);
  });

  it("a summary-text match is found when no title matches", () => {
    const result = searchRecords(allFixtureRecords, "failed but remains public");
    const match = result.entries.find((e) => e.record.id === fixtureLabRecord.id);
    expect(match).toBeDefined();
    expect(match!.matchReason).toBe("Summary match");
  });

  it("private/excluded records never appear in search results, regardless of query", () => {
    const result = searchRecords(allFixtureRecords, fixtureUnpublishedWorkRecord.title);
    expect(result.entries.map((e) => e.record.id)).not.toContain(fixtureUnpublishedWorkRecord.id);
  });

  it("an archived-but-public record remains searchable", () => {
    const archived: CanonicalRecordBase = { ...fixtureWorkRecord, lifecycle: "archived" };
    const records = [...allFixtureRecords.filter((r) => r.id !== fixtureWorkRecord.id), archived];
    const result = searchRecords(records, fixtureWorkRecord.title);
    expect(result.entries.map((e) => e.record.id)).toContain(fixtureWorkRecord.id);
  });

  it("a query with no match anywhere returns a correctly empty (non-error) result", () => {
    const result = searchRecords(allFixtureRecords, "zzz-no-such-fixture-content-zzz");
    expect(result.entries).toHaveLength(0);
    expect(result.query).toBe("zzz-no-such-fixture-content-zzz");
  });

  it("query matching is case-insensitive and trims whitespace", () => {
    const result = searchRecords(allFixtureRecords, `  ${fixtureWorkRecord.title.toUpperCase()}  `);
    expect(result.entries.map((e) => e.record.id)).toContain(fixtureWorkRecord.id);
  });

  it("every entry's route is exactly M3.3's own resolveCanonicalRoute output", () => {
    const result = searchRecords(allFixtureRecords, "fixture");
    for (const entry of result.entries) {
      expect(entry.route).toBe(resolveCanonicalRoute(entry.record));
    }
  });

  it("no duplicate records appear in one result", () => {
    const result = searchRecords(allFixtureRecords, "fixture");
    const ids = result.entries.map((e) => e.record.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("relationship-context match: a record is findable via a public related record's title when nothing else matches", () => {
    // fixture-research-001 has no "artwork" in its own title/summary/discipline/theme,
    // but is related (tested-in) to fixture-lab-001 — use a query that only the
    // relationship target's title contains, to isolate the relationship-context path.
    const uniqueTerm = "outcome"; // present only in fixtureWorkRecord's title, which fixtureLabRecord relates to via developed-into
    const result = searchRecords(allFixtureRecords, uniqueTerm);
    const relationshipMatch = result.entries.find((e) => e.record.id === fixtureLabRecord.id);
    expect(relationshipMatch).toBeDefined();
    expect(relationshipMatch!.matchReason).toMatch(/Related to/);
  });

  it("ranking never mutates a record's ownerDistrict or identity", () => {
    const before = allFixtureRecords.map((r) => ({ id: r.id, ownerDistrict: r.ownerDistrict }));
    searchRecords(allFixtureRecords, "fixture");
    const after = allFixtureRecords.map((r) => ({ id: r.id, ownerDistrict: r.ownerDistrict }));
    expect(after).toEqual(before);
  });

  it("deterministic ordering — running the same query twice yields the same order", () => {
    const first = searchRecords(allFixtureRecords, "fixture");
    const second = searchRecords(allFixtureRecords, "fixture");
    expect(first.entries.map((e) => e.record.id)).toEqual(second.entries.map((e) => e.record.id));
  });
});
