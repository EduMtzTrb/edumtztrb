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
  fixtureUnpublishedWorkRecord,
  fixtureWorkRecord,
} from "./fixtures";

describe("CanonicalRecordBase — shared contract", () => {
  it("requires id, slug, title, ownerDistrict, contentType, and the three state dimensions", () => {
    for (const record of allFixtureRecords) {
      expect(record.id).toBeTruthy();
      expect(record.slug).toBeTruthy();
      expect(record.title).toBeTruthy();
      expect(record.ownerDistrict).toBeTruthy();
      expect(record.contentType).toBeTruthy();
      expect(record.curatorialInclusion).toBeTruthy();
      expect(record.visibility).toBeTruthy();
      expect(record.lifecycle).toBeTruthy();
      expect(record.summary).toBeTruthy();
      expect(record.authorship.primary.name).toBeTruthy();
    }
  });

  it("stores no generic `status` field anywhere on any fixture (IA §14.5/§6.3)", () => {
    for (const record of allFixtureRecords) {
      expect(Object.prototype.hasOwnProperty.call(record, "status")).toBe(false);
    }
  });

  it("stores no separate `archive` field — archive is lifecycle: archived (IA §14.4)", () => {
    for (const record of allFixtureRecords) {
      expect(Object.prototype.hasOwnProperty.call(record, "archive")).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(record, "archived")).toBe(false);
    }
  });

  it("is fully JSON-serializable — no function, ReactNode, or class instance anywhere", () => {
    for (const record of allFixtureRecords) {
      const roundTripped = JSON.parse(JSON.stringify(record));
      expect(roundTripped.id).toBe(record.id);
      expect(roundTripped.title).toBe(record.title);
      for (const value of Object.values(record)) {
        expect(typeof value).not.toBe("function");
      }
    }
  });

  it("keeps editorial timestamps nested and separate from public-facing fields", () => {
    const recordWithEditorial: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      editorial: { createdAt: "2026-01-01", updatedAt: "2026-01-02" },
    };
    expect(recordWithEditorial.editorial?.createdAt).toBe("2026-01-01");
    // Verifies the nesting is real, not a flattened top-level field.
    expect(Object.prototype.hasOwnProperty.call(recordWithEditorial, "createdAt")).toBe(false);
  });
});

describe("Ownership — one fixture per approved canonical-owner district", () => {
  it.each([
    ["work", fixtureWorkRecord],
    ["research", fixtureResearchRecord],
    ["lab", fixtureLabRecord],
    ["art", fixtureArtRecord],
    ["products", fixtureProductRecord],
    ["about", fixtureAboutRecord],
  ] as const)("%s fixture has the correct ownerDistrict discriminant", (district, record) => {
    expect(record.ownerDistrict).toBe(district);
  });

  it("every fixture's owner is one of the six approved canonical-owner districts (Home excluded)", () => {
    const approvedOwners = new Set(["work", "research", "lab", "art", "products", "about"]);
    for (const record of allFixtureRecords) {
      expect(approvedOwners.has(record.ownerDistrict)).toBe(true);
    }
  });
});

describe("Public-state logic (IA §6.1 curatorial threshold)", () => {
  it("a failed Lab experiment may remain public — completion is not a precondition for visibility", () => {
    expect(fixtureLabRecord.lifecycle).toBe("failed");
    expect(fixtureLabRecord.visibility).toBe("public");
    expect(fixtureLabRecord.curatorialInclusion).toBe("included");
  });

  it("complete work may remain unpublished — completion does not imply visibility", () => {
    expect(fixtureUnpublishedWorkRecord.lifecycle).toBe("complete");
    expect(fixtureUnpublishedWorkRecord.visibility).toBe("private");
    expect(fixtureUnpublishedWorkRecord.curatorialInclusion).toBe("excluded");
  });

  it("the three state dimensions vary independently across the fixture set — no observed coupling", () => {
    const lifecycles = new Set(allFixtureRecords.map((r) => r.lifecycle));
    const visibilities = new Set(allFixtureRecords.map((r) => r.visibility));
    // If lifecycle mechanically determined visibility, this fixture set
    // (which deliberately varies both) would show a 1:1 correlation;
    // asserting more than one distinct lifecycle coexists with more than
    // one distinct visibility is a concrete, if partial, guard against
    // that collapse.
    expect(lifecycles.size).toBeGreaterThan(1);
    expect(visibilities.size).toBeGreaterThan(1);
  });
});

describe("Relationships", () => {
  it("preserves the exact directional example from IA §5.4: Research —tested-in→ Lab —developed-into→ Work", () => {
    const researchToLab = fixtureResearchRecord.relationships?.find(
      (r) => r.targetId === fixtureLabRecord.id,
    );
    expect(researchToLab?.type).toBe("tested-in");

    const labToWork = fixtureLabRecord.relationships?.find(
      (r) => r.targetId === fixtureWorkRecord.id,
    );
    expect(labToWork?.type).toBe("developed-into");

    const workToResearch = fixtureWorkRecord.relationships?.find(
      (r) => r.targetId === fixtureResearchRecord.id,
    );
    expect(workToResearch?.type).toBe("informed-by");
  });

  it("a relationship reference stores only a target ID — never an embedded copy of the target record", () => {
    const relationship = fixtureLabRecord.relationships?.[0];
    expect(relationship).toBeDefined();
    expect(typeof relationship?.targetId).toBe("string");
    expect(Object.prototype.hasOwnProperty.call(relationship, "target")).toBe(false);
  });

  it("uses only the approved v1.0 relationship vocabulary across every fixture", () => {
    const approved = new Set([
      "related-to",
      "derived-from",
      "informed-by",
      "tested-in",
      "developed-into",
      "commercialized-as",
    ]);
    for (const record of allFixtureRecords) {
      for (const relationship of record.relationships ?? []) {
        expect(approved.has(relationship.type)).toBe(true);
      }
    }
  });
});

describe("Media / accessibility", () => {
  it("an informative media reference carries required alt text", () => {
    const media = fixtureArtRecord.media?.[0];
    expect(media).toBeDefined();
    expect(media?.accessibility.role).toBe("informative");
    if (media?.accessibility.role === "informative") {
      expect(media.accessibility.altText).toBeTruthy();
    }
  });

  it("distinguishes artwork from documentation (PLATFORM_SPECIFICATION.md §30)", () => {
    expect(fixtureArtRecord.media?.[0]?.documentationRole).toBe("artwork");
  });

  it("a media reference stores a source path, never a rendered component or DOM node", () => {
    const media = fixtureArtRecord.media?.[0];
    expect(typeof media?.source).toBe("string");
  });
});

describe("Identity helpers", () => {
  it("createRecordId/createSlug produce plain strings usable as object values", () => {
    const id = createRecordId("fixture-id-example");
    const slug = createSlug("fixture-slug-example");
    expect(String(id)).toBe("fixture-id-example");
    expect(String(slug)).toBe("fixture-slug-example");
  });
});
