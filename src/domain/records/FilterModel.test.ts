import { describe, expect, it } from "vitest";

import {
  activeCriteriaEntries,
  applyFilterCriteria,
  buildRemoveHref,
  buildResetHref,
  buildToggleHref,
  describeCriteria,
  distinctContentTypes,
  distinctDistricts,
  isFilterActive,
  parseFilterCriteria,
} from "./FilterModel";
import { queryIndex } from "./IndexModel";
import { allFixtureRecords, fixtureArtRecord, fixtureWorkRecord } from "./fixtures";
import { resolveCanonicalRoute } from "./RouteResolver";

const baseResult = queryIndex(allFixtureRecords);

describe("Filter model (M3.11)", () => {
  it("parses only known filter keys, ignoring everything else (e.g. fixture)", () => {
    const criteria = parseFilterCriteria({ district: "work", fixture: "m3b", q: "test" });
    expect(criteria).toEqual({ district: "work", contentType: undefined });
  });

  it("isFilterActive is false with no criteria and true with any criterion set", () => {
    expect(isFilterActive({})).toBe(false);
    expect(isFilterActive({ district: "work" })).toBe(true);
    expect(isFilterActive({ contentType: "artwork" })).toBe(true);
  });

  it("applyFilterCriteria with no criteria returns every entry unchanged (same order)", () => {
    const result = applyFilterCriteria(baseResult.entries, {});
    expect(result).toEqual(baseResult.entries);
  });

  it("a single criterion narrows to matching records only", () => {
    const result = applyFilterCriteria(baseResult.entries, { district: "art" });
    expect(result.every((entry) => entry.record.ownerDistrict === "art")).toBe(true);
    expect(result.map((e) => e.record.id)).toContain(fixtureArtRecord.id);
  });

  it("combined (district + contentType) criteria are AND-ed, not OR-ed", () => {
    const result = applyFilterCriteria(baseResult.entries, {
      district: "art",
      contentType: "project",
    });
    expect(result).toHaveLength(0);
  });

  it("combined matching criteria correctly narrow together", () => {
    const result = applyFilterCriteria(baseResult.entries, {
      district: "work",
      contentType: "project",
    });
    expect(result.map((e) => e.record.id)).toEqual([fixtureWorkRecord.id]);
  });

  it("never reorders — filtering only removes, it does not resort", () => {
    const ids = baseResult.entries.map((e) => e.record.id);
    const filteredIds = applyFilterCriteria(baseResult.entries, {}).map((e) => e.record.id);
    expect(filteredIds).toEqual(ids);
  });

  it("never mutates canonical route or record identity", () => {
    const result = applyFilterCriteria(baseResult.entries, { district: "work" });
    for (const entry of result) {
      expect(entry.route).toBe(resolveCanonicalRoute(entry.record));
    }
  });

  it("distinctDistricts/distinctContentTypes only list values actually present in the given entries", () => {
    const districts = distinctDistricts(baseResult.entries);
    const types = distinctContentTypes(baseResult.entries);
    expect(districts).toContain("work");
    expect(districts).toContain("art");
    expect(types).toContain("project");
    expect(new Set(districts).size).toBe(districts.length);
  });

  it("activeCriteriaEntries reflects exactly the set criteria, in a stable order", () => {
    expect(activeCriteriaEntries({})).toEqual([]);
    expect(activeCriteriaEntries({ district: "work" })).toEqual([["district", "work"]]);
    expect(activeCriteriaEntries({ district: "work", contentType: "project" })).toEqual([
      ["district", "work"],
      ["contentType", "project"],
    ]);
  });

  it("buildToggleHref applies a criterion when inactive", () => {
    const href = buildToggleHref("/index", {}, "district", "work");
    expect(href).toBe("/index?district=work");
  });

  it("buildToggleHref removes a criterion when already active (true toggle)", () => {
    const href = buildToggleHref("/index", { district: "work" }, "district", "work");
    expect(href).toBe("/index");
  });

  it("buildToggleHref preserves other parameters, including fixture and other filters", () => {
    const href = buildToggleHref(
      "/index",
      { fixture: "m3b", contentType: "project" },
      "district",
      "work",
    );
    const params = new URLSearchParams(href.split("?")[1]);
    expect(params.get("fixture")).toBe("m3b");
    expect(params.get("contentType")).toBe("project");
    expect(params.get("district")).toBe("work");
  });

  it("buildRemoveHref removes exactly one criterion, preserving everything else", () => {
    const href = buildRemoveHref(
      "/index",
      { district: "work", contentType: "project", fixture: "m3b" },
      "district",
    );
    const params = new URLSearchParams(href.split("?")[1]);
    expect(params.has("district")).toBe(false);
    expect(params.get("contentType")).toBe("project");
    expect(params.get("fixture")).toBe("m3b");
  });

  it("buildResetHref clears every filter criterion while preserving non-filter parameters", () => {
    const href = buildResetHref("/index", {
      district: "work",
      contentType: "project",
      fixture: "m3b",
    });
    const params = new URLSearchParams(href.split("?")[1] ?? "");
    expect(params.has("district")).toBe(false);
    expect(params.has("contentType")).toBe(false);
    expect(params.get("fixture")).toBe("m3b");
  });

  it("buildResetHref returns the bare pathname when nothing but filters were set", () => {
    const href = buildResetHref("/index", { district: "work" });
    expect(href).toBe("/index");
  });

  it("an empty entry set filters to an empty result without error", () => {
    expect(applyFilterCriteria([], { district: "work" })).toEqual([]);
  });

  it("describeCriteria returns undefined when nothing is active, and a readable string when criteria are set", () => {
    expect(describeCriteria({})).toBeUndefined();
    expect(describeCriteria({ district: "work" })).toBe("district: work");
    expect(describeCriteria({ district: "work", contentType: "project" })).toBe(
      "district: work, contentType: project",
    );
  });
});
