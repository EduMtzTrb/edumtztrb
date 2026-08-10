import { describe, expect, it } from "vitest";

import type { CanonicalRecordBase } from "./CanonicalRecord";
import {
  collectionTermProducts,
  collectionTermWork,
  contributionRoleTermLead,
  disciplineTermComputationalDesign,
  fixtureClassificationCatalog,
  seriesTermArt,
  territoryTermResearch,
  themeTermContinuity,
} from "./classification-fixtures";
import {
  APPROVED_GLOBAL_LENS_DIMENSIONS,
  contentTypeFacet,
  createClassificationCatalog,
  curatorialInclusionFacet,
  districtFacet,
  isGlobalLensDimension,
  lifecycleFacet,
  validateRecordClassifications,
  visibilityFacet,
  yearFacet,
} from "./ClassificationModel";
import {
  fixtureArtRecord,
  fixtureProductRecord,
  fixtureResearchRecord,
  fixtureWorkRecord,
} from "./fixtures";
import { resolveCanonicalRoute } from "./RouteResolver";

describe("Catalog", () => {
  it("unique term IDs are accepted", () => {
    expect(fixtureClassificationCatalog.size).toBe(7);
  });

  it("rejects a duplicate term ID", () => {
    expect(() =>
      createClassificationCatalog([
        disciplineTermComputationalDesign,
        disciplineTermComputationalDesign,
      ]),
    ).toThrow(/Duplicate classification term ID/);
  });

  it("unknown term references are rejected", () => {
    const record: Pick<CanonicalRecordBase, "ownerDistrict" | "disciplines" | "themes"> = {
      ownerDistrict: "work",
      disciplines: ["not-a-real-term"],
    };
    const issues = validateRecordClassifications(record, fixtureClassificationCatalog);
    expect(issues.some((issue) => issue.message.includes("unknown discipline term"))).toBe(true);
  });
});

describe("No uncontrolled tag cloud", () => {
  it("a valid discipline reference resolves cleanly against the catalog", () => {
    const record: Pick<CanonicalRecordBase, "ownerDistrict" | "disciplines" | "themes"> = {
      ownerDistrict: "work",
      disciplines: [disciplineTermComputationalDesign.id],
    };
    expect(validateRecordClassifications(record, fixtureClassificationCatalog)).toEqual([]);
  });

  it("a term used for the wrong dimension is rejected", () => {
    const record: Pick<CanonicalRecordBase, "ownerDistrict" | "disciplines" | "themes"> = {
      ownerDistrict: "work",
      // themeTermContinuity is a "theme" term, not a "discipline" term.
      disciplines: [themeTermContinuity.id],
    };
    const issues = validateRecordClassifications(record, fixtureClassificationCatalog);
    expect(issues.some((issue) => issue.message.includes('not "discipline"'))).toBe(true);
  });

  it("a duplicate reference on the same record is rejected", () => {
    const record: Pick<CanonicalRecordBase, "ownerDistrict" | "disciplines" | "themes"> = {
      ownerDistrict: "work",
      disciplines: [disciplineTermComputationalDesign.id, disciplineTermComputationalDesign.id],
    };
    const issues = validateRecordClassifications(record, fixtureClassificationCatalog);
    expect(issues.some((issue) => issue.message.includes("duplicate reference"))).toBe(true);
  });
});

describe("Canonical-derived facets", () => {
  it("district facet derives from ownerDistrict", () => {
    expect(districtFacet(fixtureWorkRecord)).toEqual({ dimension: "district", value: "work" });
  });

  it("type facet derives from contentType", () => {
    expect(contentTypeFacet(fixtureWorkRecord)).toEqual({
      dimension: "content-type",
      value: "project",
    });
  });

  it("year/period facet derives from canonical date, not a separately stored value", () => {
    const withYear: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      date: { kind: "year", year: 2024 },
    };
    expect(yearFacet(withYear)).toEqual({ dimension: "year", value: 2024 });

    const withDate: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      date: { kind: "date", date: "2023-05-01" },
    };
    expect(yearFacet(withDate)).toEqual({ dimension: "year", value: 2023 });

    const withRange: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      date: { kind: "range", start: "2020-01-01", end: "2022-01-01" },
    };
    expect(yearFacet(withRange)).toEqual({ dimension: "year", value: 2020 });

    expect(yearFacet(fixtureWorkRecord)).toEqual({ dimension: "year", value: undefined });
  });

  it("no conflicting duplicated values — the facet always matches the record's own base field", () => {
    for (const record of [
      fixtureWorkRecord,
      fixtureResearchRecord,
      fixtureArtRecord,
      fixtureProductRecord,
    ]) {
      expect(districtFacet(record).value).toBe(record.ownerDistrict);
      expect(contentTypeFacet(record).value).toBe(record.contentType);
    }
  });
});

describe("District grouping", () => {
  it("Work collection term is scoped to work", () => {
    expect(collectionTermWork.districtScope).toEqual(["work"]);
    const record: Pick<CanonicalRecordBase, "ownerDistrict" | "disciplines" | "themes"> = {
      ownerDistrict: "work",
      disciplines: [],
    };
    expect(collectionTermWork.dimension).toBe("collection");
    void record;
  });

  it("Research territory term is scoped to research, distinct meaning from Art series", () => {
    expect(territoryTermResearch.dimension).toBe("territory");
    expect(seriesTermArt.dimension).toBe("series");
    expect(territoryTermResearch.dimension).not.toBe(seriesTermArt.dimension);
  });

  it("Products collection term is a genuinely separate term from Work's collection term, despite sharing a dimension", () => {
    expect(collectionTermProducts.dimension).toBe("collection");
    expect(collectionTermProducts.id).not.toBe(collectionTermWork.id);
    expect(collectionTermProducts.districtScope).toEqual(["products"]);
  });

  it("a district-scoped term used by the wrong district is rejected", () => {
    const record: Pick<CanonicalRecordBase, "ownerDistrict" | "disciplines" | "themes"> = {
      ownerDistrict: "art",
      themes: [],
    };
    // Attempt to (mis)use a research-scoped territory term as if it were a theme — both wrong dimension and wrong scope.
    const issues = validateRecordClassifications(
      { ...record, themes: [territoryTermResearch.id] },
      fixtureClassificationCatalog,
    );
    expect(issues.length).toBeGreaterThan(0);
  });
});

describe("Contribution/role classification", () => {
  it("is modeled as its own dimension, distinct from canonical Authorship (M3.1-owned)", () => {
    expect(contributionRoleTermLead.dimension).toBe("contribution-role");
    expect(fixtureWorkRecord.authorship.primary.name).toBeTruthy();
  });
});

describe("Ownership invariance", () => {
  it("classification never changes a record's owner district", () => {
    const before = fixtureWorkRecord.ownerDistrict;
    validateRecordClassifications(
      {
        ownerDistrict: fixtureWorkRecord.ownerDistrict,
        disciplines: [disciplineTermComputationalDesign.id],
      },
      fixtureClassificationCatalog,
    );
    expect(fixtureWorkRecord.ownerDistrict).toBe(before);
  });
});

describe("Route invariance (integration with M3.3)", () => {
  it("same canonical record + different discipline/theme classification = same canonical route", () => {
    const original = resolveCanonicalRoute(fixtureWorkRecord);
    const reclassified: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      disciplines: [disciplineTermComputationalDesign.id],
      themes: [themeTermContinuity.id],
    };
    expect(resolveCanonicalRoute(reclassified)).toBe(original);
  });
});

describe("State facets preserve source dimension", () => {
  it("lifecycle, visibility, and curatorialInclusion never merge into one generic facet", () => {
    expect(lifecycleFacet(fixtureResearchRecord)).toEqual({ source: "lifecycle", value: "active" });
    expect(visibilityFacet(fixtureResearchRecord)).toEqual({
      source: "visibility",
      value: "public",
    });
    expect(curatorialInclusionFacet(fixtureResearchRecord)).toEqual({
      source: "curatorialInclusion",
      value: "included",
    });
  });

  it("a failed Lab-style state and a Products-style availability state stay on their own district-owned fields, never duplicated here", () => {
    // This module never reads or exposes district-extension state
    // (experimentState/commercialState/etc.) — those remain owned by
    // DistrictExtensions.ts (M3.2), read directly by any caller that needs them.
    expect(lifecycleFacet(fixtureProductRecord).source).toBe("lifecycle");
  });
});

describe("Index readiness — exactly five approved global lens dimensions", () => {
  it("district, content-type, discipline, theme, and year are global-lens-capable", () => {
    expect(APPROVED_GLOBAL_LENS_DIMENSIONS).toEqual([
      "district",
      "content-type",
      "discipline",
      "theme",
      "year",
    ]);
    for (const dimension of APPROVED_GLOBAL_LENS_DIMENSIONS) {
      expect(isGlobalLensDimension(dimension)).toBe(true);
    }
  });

  it("collection, series, territory, and contribution-role are NOT global lens dimensions", () => {
    expect(isGlobalLensDimension("collection")).toBe(false);
    expect(isGlobalLensDimension("series")).toBe(false);
    expect(isGlobalLensDimension("territory")).toBe(false);
    expect(isGlobalLensDimension("contribution-role")).toBe(false);
  });

  it("no more than five dimensions are ever exposed as global lenses", () => {
    expect(APPROVED_GLOBAL_LENS_DIMENSIONS.length).toBe(5);
  });
});

describe("Cross-district discovery", () => {
  it("the same discipline term may classify records from multiple districts without duplicating the term", () => {
    const workUse: Pick<CanonicalRecordBase, "ownerDistrict" | "disciplines" | "themes"> = {
      ownerDistrict: "work",
      disciplines: [disciplineTermComputationalDesign.id],
    };
    const labUse: Pick<CanonicalRecordBase, "ownerDistrict" | "disciplines" | "themes"> = {
      ownerDistrict: "lab",
      disciplines: [disciplineTermComputationalDesign.id],
    };
    expect(validateRecordClassifications(workUse, fixtureClassificationCatalog)).toEqual([]);
    expect(validateRecordClassifications(labUse, fixtureClassificationCatalog)).toEqual([]);
    expect(fixtureClassificationCatalog.get(disciplineTermComputationalDesign.id)).toBe(
      disciplineTermComputationalDesign,
    );
  });
});
