import { describe, expect, it } from "vitest";

import {
  allFixtureDistrictRecords,
  fixtureAboutRecordWithExtension,
  fixtureArtRecordWithExtension,
  fixtureLabRecordWithExtension,
  fixtureProductRecordWithExtension,
  fixtureResearchRecordWithExtension,
  fixtureWorkRecordWithExtension,
} from "./district-fixtures";
import { assertValidDistrictRecord, validateDistrictRecord } from "./DistrictExtensions";
import type { AnyDistrictRecord } from "./DistrictExtensions";

describe("Ownership correlation — every fixture's extension matches its owner district", () => {
  it.each([
    ["work", fixtureWorkRecordWithExtension],
    ["research", fixtureResearchRecordWithExtension],
    ["lab", fixtureLabRecordWithExtension],
    ["art", fixtureArtRecordWithExtension],
    ["products", fixtureProductRecordWithExtension],
    ["about", fixtureAboutRecordWithExtension],
  ] as const)("%s fixture's extension.extensionFor matches ownerDistrict", (district, record) => {
    expect(record.ownerDistrict).toBe(district);
    expect(record.extension.extensionFor).toBe(district);
  });

  it("all fixtures pass validation with zero issues", () => {
    for (const record of allFixtureDistrictRecords) {
      expect(validateDistrictRecord(record)).toEqual([]);
    }
  });
});

describe("Runtime rejection of owner/extension mismatch (JSON boundary — no compile-time protection)", () => {
  it("rejects a Work record carrying a Research extension at runtime", () => {
    const malformed = {
      ...fixtureWorkRecordWithExtension,
      extension: { extensionFor: "research", inquiry: "Should not validate" },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0]?.path).toBe("extension.extensionFor");
  });

  it("assertValidDistrictRecord throws on the same mismatch", () => {
    const malformed = {
      ...fixtureWorkRecordWithExtension,
      extension: { extensionFor: "research", inquiry: "Should not validate" },
    } as unknown as AnyDistrictRecord;
    expect(() => assertValidDistrictRecord(malformed)).toThrow(/does not match ownerDistrict/);
  });
});

describe("Identity redefinition is rejected", () => {
  it("an extension carrying an unrelated key is rejected as an unknown field", () => {
    const malformed = {
      ...fixtureWorkRecordWithExtension,
      extension: { ...fixtureWorkRecordWithExtension.extension, id: "should-not-be-here" },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.id")).toBe(true);
  });
});

describe("Work extension", () => {
  it("supports contribution/role/context structure", () => {
    const ext = fixtureWorkRecordWithExtension.extension;
    expect(ext.contribution).toBeTruthy();
    expect(ext.context).toBeTruthy();
    expect(ext.collaborationContext).toBeTruthy();
  });

  it("rejects a malformed Work extension (empty-string field)", () => {
    const malformed = {
      ...fixtureWorkRecordWithExtension,
      extension: { extensionFor: "work" as const, context: "   " },
    };
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.context")).toBe(true);
  });

  it("rejects a cross-district (Products) field leaking onto a Work extension", () => {
    const malformed = {
      ...fixtureWorkRecordWithExtension,
      extension: { extensionFor: "work" as const, context: "Fixture", price: "€100" },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.price")).toBe(true);
  });
});

describe("Research extension", () => {
  it("supports inquiry/current-position/uncertainty structure", () => {
    const ext = fixtureResearchRecordWithExtension.extension;
    expect(ext.inquiry).toBeTruthy();
    expect(ext.currentPosition).toBeTruthy();
    expect(ext.uncertainty).toBeTruthy();
  });

  it("an evolving research position remains distinct from the base record's publication state", () => {
    expect(fixtureResearchRecordWithExtension.extension.researchActivityState).toBe("ongoing");
    expect(fixtureResearchRecordWithExtension.visibility).toBe("public");
    // Changing one must never imply anything about the other — they are unrelated fields on unrelated objects.
    expect(fixtureResearchRecordWithExtension.extension).not.toHaveProperty("visibility");
  });

  it("rejects an invalid researchActivityState enum value", () => {
    const malformed = {
      ...fixtureResearchRecordWithExtension,
      extension: { extensionFor: "research" as const, researchActivityState: "definitely-final" },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.researchActivityState")).toBe(true);
  });
});

describe("Lab extension", () => {
  it("a failed/abandoned experiment may remain a valid, fully public record", () => {
    expect(fixtureLabRecordWithExtension.extension.experimentState).toBe("abandoned");
    expect(fixtureLabRecordWithExtension.visibility).toBe("public");
    expect(fixtureLabRecordWithExtension.curatorialInclusion).toBe("included");
    expect(validateDistrictRecord(fixtureLabRecordWithExtension)).toEqual([]);
  });

  it("experimentState never mutates the base record's universal lifecycle", () => {
    expect(fixtureLabRecordWithExtension.lifecycle).toBe("failed");
    expect(fixtureLabRecordWithExtension.extension.experimentState).not.toBe(
      fixtureLabRecordWithExtension.lifecycle,
    );
  });

  it("version/lineage data does not create a new canonical identity — the record keeps its one id/slug", () => {
    expect(fixtureLabRecordWithExtension.extension.version).toBeTruthy();
    expect(fixtureLabRecordWithExtension.id).toBe("fixture-lab-001");
  });

  it("rejects an invalid experimentState enum value", () => {
    const malformed = {
      ...fixtureLabRecordWithExtension,
      extension: { extensionFor: "lab" as const, experimentState: "flourishing" },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.experimentState")).toBe(true);
  });
});

describe("Art extension", () => {
  it("supports medium/presentationCondition/editionNote", () => {
    const ext = fixtureArtRecordWithExtension.extension;
    expect(ext.medium).toBeTruthy();
    expect(ext.presentationCondition).toBe("live");
    expect(ext.editionNote).toBeTruthy();
  });

  it("commerce fields cannot leak into the Art extension", () => {
    const malformed = {
      ...fixtureArtRecordWithExtension,
      extension: { extensionFor: "art" as const, medium: "Fixture", price: "€100", stock: 3 },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.price")).toBe(true);
    expect(issues.some((issue) => issue.path === "extension.stock")).toBe(true);
  });
});

describe("Products extension", () => {
  it("supports offer/commercial information", () => {
    const ext = fixtureProductRecordWithExtension.extension;
    expect(ext.proposition).toBeTruthy();
    expect(ext.productFamily).toBe("digital");
    expect(ext.commercialState).toBe("available");
    expect(ext.priceBasis).toEqual({
      kind: "fixed",
      amount: "€000 — fixture only",
      currency: "EUR",
    });
  });

  it("commercial availability remains distinct from the base record's lifecycle/visibility", () => {
    expect(fixtureProductRecordWithExtension.extension.commercialState).toBe("available");
    expect(fixtureProductRecordWithExtension.lifecycle).toBe("active");
    expect(fixtureProductRecordWithExtension.extension).not.toHaveProperty("lifecycle");
    expect(fixtureProductRecordWithExtension.extension).not.toHaveProperty("visibility");
  });

  it("no transaction runtime logic exists — priceBasis is descriptive data only", () => {
    expect(typeof fixtureProductRecordWithExtension.extension.priceBasis).toBe("object");
    for (const value of Object.values(fixtureProductRecordWithExtension.extension)) {
      expect(typeof value).not.toBe("function");
    }
  });

  it("rejects a malformed priceBasis (fixed without amount)", () => {
    const malformed = {
      ...fixtureProductRecordWithExtension,
      extension: {
        extensionFor: "products" as const,
        priceBasis: { kind: "fixed", currency: "EUR" },
      },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.priceBasis.amount")).toBe(true);
  });

  it("rejects an unknown priceBasis kind", () => {
    const malformed = {
      ...fixtureProductRecordWithExtension,
      extension: { extensionFor: "products" as const, priceBasis: { kind: "installments" } },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.priceBasis.kind")).toBe(true);
  });
});

describe("About extension", () => {
  it("supports the approved information families without duplicating a Work/Research record body", () => {
    const ext = fixtureAboutRecordWithExtension.extension;
    expect(ext.biography).toBeTruthy();
    expect(ext.experience?.[0]?.organization).toBeTruthy();
    expect(ext.education?.[0]?.institution).toBeTruthy();
    expect(ext.values?.[0]?.principle).toBeTruthy();
  });

  it("enforces About Universe §13's four-part Value structure", () => {
    const malformed = {
      ...fixtureAboutRecordWithExtension,
      extension: {
        extensionFor: "about" as const,
        values: [{ principle: "Fixture principle" }],
      },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.values[0].interpretation")).toBe(true);
    expect(issues.some((issue) => issue.path === "extension.values[0].consequence")).toBe(true);
  });

  it("rejects a malformed experience entry missing role", () => {
    const malformed = {
      ...fixtureAboutRecordWithExtension,
      extension: {
        extensionFor: "about" as const,
        experience: [{ organization: "Fixture Studio" }],
      },
    } as unknown as AnyDistrictRecord;
    const issues = validateDistrictRecord(malformed);
    expect(issues.some((issue) => issue.path === "extension.experience[0].role")).toBe(true);
  });
});

describe("Home exclusion", () => {
  it("no fixture, extension, or record targets Home", () => {
    const owners = allFixtureDistrictRecords.map((record) => record.ownerDistrict);
    expect(owners).not.toContain("home");
  });
});

describe("Serialization", () => {
  it("every district-extended fixture round-trips through JSON", () => {
    for (const record of allFixtureDistrictRecords) {
      const roundTripped = JSON.parse(JSON.stringify(record));
      expect(roundTripped.id).toBe(record.id);
      expect(roundTripped.extension.extensionFor).toBe(record.extension.extensionFor);
      for (const value of Object.values(record.extension)) {
        expect(typeof value).not.toBe("function");
      }
    }
  });
});
