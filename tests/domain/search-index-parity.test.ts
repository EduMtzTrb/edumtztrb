import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { queryIndex } from "@/domain/records/IndexModel";
import { searchRecords } from "@/domain/records/SearchModel";
import { allFixtureRecords, fixtureUnpublishedWorkRecord } from "@/domain/records/fixtures";
import type { CanonicalRecordBase } from "@/domain/records/CanonicalRecord";

/**
 * Direct Search/Index corpus-parity test — this task's own §F1: "Search
 * and Index MUST consume the same public canonical source. Add a direct
 * parity test." Non-negotiable per Gate M3 acceptance criterion 4.
 */
describe("Search/Index corpus parity (M3.12 §F1)", () => {
  it("every record Index considers public is also reachable through Search, and vice versa", () => {
    const indexIds = new Set(queryIndex(allFixtureRecords).entries.map((e) => e.record.id));

    for (const record of allFixtureRecords) {
      const searchHit = searchRecords(allFixtureRecords, record.title).entries.some(
        (e) => e.record.id === record.id,
      );
      expect(searchHit, `Index/Search disagree on public eligibility for "${record.id}"`).toBe(
        indexIds.has(record.id),
      );
    }
  });

  it("a private/excluded record is absent from both Index and Search — same boundary, not two", () => {
    const indexIds = queryIndex(allFixtureRecords).entries.map((e) => e.record.id);
    const searchIds = searchRecords(
      allFixtureRecords,
      fixtureUnpublishedWorkRecord.title,
    ).entries.map((e) => e.record.id);
    expect(indexIds).not.toContain(fixtureUnpublishedWorkRecord.id);
    expect(searchIds).not.toContain(fixtureUnpublishedWorkRecord.id);
  });

  it("an archived-but-public record is reachable through both Index and Search identically", () => {
    const archived: CanonicalRecordBase = {
      ...allFixtureRecords[0],
      lifecycle: "archived",
    };
    const records = [...allFixtureRecords.slice(1), archived];

    const indexHit = queryIndex(records).entries.some((e) => e.record.id === archived.id);
    const searchHit = searchRecords(records, archived.title).entries.some(
      (e) => e.record.id === archived.id,
    );
    expect(indexHit).toBe(true);
    expect(searchHit).toBe(true);
  });

  it("both consume the identical M3.6 selectPublicComprehensiveView source, confirmed at the source level", () => {
    const recordsDir = join(process.cwd(), "src", "domain", "records");
    const indexSrc = readFileSync(join(recordsDir, "IndexModel.ts"), "utf-8");
    const searchSrc = readFileSync(join(recordsDir, "SearchModel.ts"), "utf-8");
    expect(indexSrc).toMatch(/selectPublicComprehensiveView/);
    expect(searchSrc).toMatch(/selectPublicComprehensiveView/);
  });
});
