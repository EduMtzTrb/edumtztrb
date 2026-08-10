import { describe, expect, it } from "vitest";

import { queryIndex } from "./IndexModel";
import { selectPublicComprehensiveView } from "./LifecycleArchiveModel";
import { resolveCanonicalRoute } from "./RouteResolver";
import {
  allFixtureRecords,
  fixtureArtRecord,
  fixtureUnpublishedWorkRecord,
  fixtureWorkRecord,
} from "./fixtures";
import type { CanonicalRecordBase } from "./CanonicalRecord";

describe("Index query layer (M3.10)", () => {
  it("with no lens, returns exactly M3.6's own selectPublicComprehensiveView set — the same shared public source, never a second one", () => {
    const expected = selectPublicComprehensiveView(allFixtureRecords);
    const result = queryIndex(allFixtureRecords);
    expect(result.entries.map((entry) => entry.record.id).sort()).toEqual(
      expected.map((record) => record.id).sort(),
    );
    expect(result.count).toBe(expected.length);
  });

  it("every publicly eligible fixture is present", () => {
    const result = queryIndex(allFixtureRecords);
    const ids = result.entries.map((entry) => entry.record.id);
    expect(ids).toContain(fixtureWorkRecord.id);
    expect(ids).toContain(fixtureArtRecord.id);
  });

  it("private/excluded records are absent from ordinary Index results", () => {
    const result = queryIndex(allFixtureRecords);
    const ids = result.entries.map((entry) => entry.record.id);
    expect(ids).not.toContain(fixtureUnpublishedWorkRecord.id);
  });

  it("a public archived record remains included — Index draws no lifecycle distinction", () => {
    const archived: CanonicalRecordBase = { ...fixtureWorkRecord, lifecycle: "archived" };
    const records = [...allFixtureRecords.filter((r) => r.id !== fixtureWorkRecord.id), archived];
    const result = queryIndex(records);
    expect(result.entries.map((entry) => entry.record.id)).toContain(fixtureWorkRecord.id);
  });

  it("an unlisted record is absent from ordinary Index results (not publicly discoverable)", () => {
    const unlisted: CanonicalRecordBase = { ...fixtureWorkRecord, visibility: "unlisted" };
    const records = [...allFixtureRecords.filter((r) => r.id !== fixtureWorkRecord.id), unlisted];
    const result = queryIndex(records);
    expect(result.entries.map((entry) => entry.record.id)).not.toContain(fixtureWorkRecord.id);
  });

  it("district lens narrows to exactly that district's public records", () => {
    const result = queryIndex(allFixtureRecords, { dimension: "district", value: "art" });
    expect(result.entries.every((entry) => entry.record.ownerDistrict === "art")).toBe(true);
    expect(result.entries.map((entry) => entry.record.id)).toContain(fixtureArtRecord.id);
  });

  it("content-type lens narrows correctly", () => {
    const result = queryIndex(allFixtureRecords, { dimension: "content-type", value: "artwork" });
    expect(result.entries.every((entry) => entry.record.contentType === "artwork")).toBe(true);
  });

  it("an unknown/unmatched lens value produces a correctly empty result, not an error", () => {
    const result = queryIndex(allFixtureRecords, {
      dimension: "district",
      value: "nonexistent-district",
    });
    expect(result.entries).toHaveLength(0);
    expect(result.count).toBe(0);
    expect(result.lens).toEqual({ dimension: "district", value: "nonexistent-district" });
  });

  it("an empty record set produces a correctly empty result", () => {
    const result = queryIndex([]);
    expect(result.entries).toHaveLength(0);
    expect(result.count).toBe(0);
  });

  it("each entry's route is exactly M3.3's own resolveCanonicalRoute output — never a second, independently computed route", () => {
    const result = queryIndex(allFixtureRecords);
    for (const entry of result.entries) {
      expect(entry.route).toBe(resolveCanonicalRoute(entry.record));
    }
  });

  it("no duplicate records appear in one result", () => {
    const result = queryIndex(allFixtureRecords);
    const ids = result.entries.map((entry) => entry.record.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("count always matches entries.length", () => {
    const result = queryIndex(allFixtureRecords, { dimension: "year", value: "2026" });
    expect(result.count).toBe(result.entries.length);
  });

  it("ordering is deterministic (title, then ID) — not a relevance ranking", () => {
    const first = queryIndex(allFixtureRecords);
    const second = queryIndex(allFixtureRecords);
    expect(first.entries.map((e) => e.record.id)).toEqual(second.entries.map((e) => e.record.id));
    const titles = first.entries.map((e) => e.record.title);
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
  });
});
