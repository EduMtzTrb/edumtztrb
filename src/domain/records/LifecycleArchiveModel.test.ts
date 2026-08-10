import { describe, expect, it } from "vitest";

import { createRecordId } from "./CanonicalRecord";
import type { CanonicalRecordBase } from "./CanonicalRecord";
import {
  allFixtureRecords,
  fixtureArtRecord,
  fixtureLabRecord,
  fixtureProductRecord,
  fixtureResearchRecord,
  fixtureUnpublishedWorkRecord,
  fixtureWorkRecord,
} from "./fixtures";
import {
  fixtureLabRecordWithExtension,
  fixtureProductRecordWithExtension,
} from "./district-fixtures";
import {
  createInternalPublicationRegistry,
  isArchived,
  isPublicArchiveEligible,
  selectPublicArchive,
  selectPublicComprehensiveView,
  toPublicSafeProjection,
} from "./LifecycleArchiveModel";
import { isDirectlyAccessible, isPubliclyDiscoverable } from "./registry";
import { resolveCanonicalRoute } from "./RouteResolver";
import { listIncomingRelationships, listOutgoingRelationships } from "./RelationshipModel";
import { validateRecordClassifications } from "./ClassificationModel";
import { fixtureClassificationCatalog } from "./classification-fixtures";

describe("State separation", () => {
  it("curatorial inclusion, visibility, lifecycle, and district-specific state vary independently across fixtures", () => {
    expect(fixtureLabRecord.curatorialInclusion).toBe("included");
    expect(fixtureLabRecord.visibility).toBe("public");
    expect(fixtureLabRecord.lifecycle).toBe("failed");
    expect(fixtureLabRecordWithExtension.extension.experimentState).toBe("abandoned");
    // All four differ in wording/value from one another — no field was collapsed into another.
    const values = new Set([
      fixtureLabRecord.curatorialInclusion,
      fixtureLabRecord.visibility,
      fixtureLabRecord.lifecycle,
      fixtureLabRecordWithExtension.extension.experimentState,
    ]);
    expect(values.size).toBe(4);
  });

  it("internal publication state is independent of all four IA dimensions", () => {
    const internalRegistry = createInternalPublicationRegistry([
      { recordId: fixtureWorkRecord.id, state: "published" },
    ]);
    expect(internalRegistry.get(fixtureWorkRecord.id)).toBe("published");
    expect(fixtureWorkRecord.visibility).toBe("public");
    // Nothing links the two — they are read from entirely separate sources.
  });
});

describe("Public discovery eligibility", () => {
  it("included + public + failed remains discoverable", () => {
    expect(fixtureLabRecord.lifecycle).toBe("failed");
    expect(isPubliclyDiscoverable(fixtureLabRecord)).toBe(true);
  });

  it("included + public + speculative remains discoverable", () => {
    const speculative: CanonicalRecordBase = { ...fixtureWorkRecord, lifecycle: "speculative" };
    expect(isPubliclyDiscoverable(speculative)).toBe(true);
  });

  it("included + public + archived remains discoverable", () => {
    const archived: CanonicalRecordBase = { ...fixtureWorkRecord, lifecycle: "archived" };
    expect(isPubliclyDiscoverable(archived)).toBe(true);
  });

  it("included + public + discontinued (Products domain-specific state) remains discoverable", () => {
    const discontinued = {
      ...fixtureProductRecordWithExtension,
      extension: {
        ...fixtureProductRecordWithExtension.extension,
        commercialState: "discontinued" as const,
      },
    };
    expect(isPubliclyDiscoverable(discontinued)).toBe(true);
  });

  it("unlisted is excluded from ordinary public discovery", () => {
    const unlisted: CanonicalRecordBase = { ...fixtureWorkRecord, visibility: "unlisted" };
    expect(isPubliclyDiscoverable(unlisted)).toBe(false);
  });

  it("private is excluded", () => {
    expect(isPubliclyDiscoverable(fixtureUnpublishedWorkRecord)).toBe(false);
  });

  it("excluded (curatorial) is excluded from discovery", () => {
    expect(fixtureUnpublishedWorkRecord.curatorialInclusion).toBe("excluded");
    expect(isPubliclyDiscoverable(fixtureUnpublishedWorkRecord)).toBe(false);
  });

  it("completion alone does not imply public visibility", () => {
    expect(fixtureUnpublishedWorkRecord.lifecycle).toBe("complete");
    expect(isPubliclyDiscoverable(fixtureUnpublishedWorkRecord)).toBe(false);
  });
});

describe("Direct access", () => {
  it("unlisted may remain directly accessible", () => {
    const unlisted: CanonicalRecordBase = { ...fixtureWorkRecord, visibility: "unlisted" };
    expect(isDirectlyAccessible(unlisted)).toBe(true);
  });

  it("private is not directly accessible", () => {
    expect(isDirectlyAccessible(fixtureUnpublishedWorkRecord)).toBe(false);
  });
});

describe("Archive", () => {
  it("archived is derived from lifecycle, never a separate stored field", () => {
    const archived: CanonicalRecordBase = { ...fixtureWorkRecord, lifecycle: "archived" };
    expect(isArchived(archived)).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(archived, "isArchived")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(archived, "archived")).toBe(false);
  });

  it("isPublicArchiveEligible requires both archived lifecycle and public discoverability", () => {
    const archivedPublic: CanonicalRecordBase = { ...fixtureWorkRecord, lifecycle: "archived" };
    const archivedPrivate: CanonicalRecordBase = {
      ...fixtureUnpublishedWorkRecord,
      lifecycle: "archived",
    };
    expect(isPublicArchiveEligible(archivedPublic)).toBe(true);
    expect(isPublicArchiveEligible(archivedPrivate)).toBe(false);
  });

  it("canonical ID, owner, and M3.3 route are all preserved after archiving", () => {
    const archived: CanonicalRecordBase = { ...fixtureWorkRecord, lifecycle: "archived" };
    expect(archived.id).toBe(fixtureWorkRecord.id);
    expect(archived.ownerDistrict).toBe(fixtureWorkRecord.ownerDistrict);
    expect(resolveCanonicalRoute(archived)).toBe(resolveCanonicalRoute(fixtureWorkRecord));
  });

  it("relationships are preserved after archiving", () => {
    const archived: CanonicalRecordBase = { ...fixtureLabRecord, lifecycle: "archived" };
    expect(listOutgoingRelationships(archived)).toEqual(
      listOutgoingRelationships(fixtureLabRecord),
    );
  });

  it("classifications are preserved after archiving", () => {
    const archived: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      lifecycle: "archived",
      disciplines: ["computational-design"],
    };
    expect(validateRecordClassifications(archived, fixtureClassificationCatalog)).toEqual([]);
    expect(archived.disciplines).toEqual(["computational-design"]);
  });

  it("Work /all is not treated as Archive — comprehensive view includes non-archived records too", () => {
    const comprehensive = selectPublicComprehensiveView(allFixtureRecords, "work");
    const archive = selectPublicArchive(allFixtureRecords, "work");
    expect(comprehensive.some((r) => r.id === fixtureWorkRecord.id)).toBe(true);
    expect(archive.some((r) => r.id === fixtureWorkRecord.id)).toBe(false);
    expect(comprehensive.length).toBeGreaterThan(archive.length);
  });

  it("Product discontinued state does not automatically make a record archived", () => {
    expect(fixtureProductRecord.lifecycle).not.toBe("archived");
    const discontinued = {
      ...fixtureProductRecordWithExtension,
      extension: {
        ...fixtureProductRecordWithExtension.extension,
        commercialState: "discontinued" as const,
      },
    };
    expect(isArchived(discontinued)).toBe(false);
  });

  it("Art availability/edition note does not alter Art's own lifecycle", () => {
    expect(fixtureArtRecord.lifecycle).toBe("complete");
    expect(isArchived(fixtureArtRecord)).toBe(false);
  });

  it("selectPublicArchive respects district scoping and public eligibility together", () => {
    const archivedIncluded: CanonicalRecordBase = {
      ...fixtureResearchRecord,
      id: createRecordId("fixture-archived-research"),
      lifecycle: "archived",
    };
    const archivedPrivate: CanonicalRecordBase = {
      ...fixtureResearchRecord,
      id: createRecordId("fixture-archived-private-research"),
      lifecycle: "archived",
      visibility: "private",
      curatorialInclusion: "excluded",
    };
    const archive = selectPublicArchive([archivedIncluded, archivedPrivate], "research");
    expect(archive.map((r) => r.id)).toEqual([archivedIncluded.id]);
  });
});

describe("Internal publishing", () => {
  it("internal publication state never appears in the public-safe projection", () => {
    const projection = toPublicSafeProjection(fixtureWorkRecord);
    expect(Object.prototype.hasOwnProperty.call(projection, "internalPublicationState")).toBe(
      false,
    );
    expect(Object.prototype.hasOwnProperty.call(projection, "state")).toBe(false);
  });

  it("public-safe projection strips the internal editorial field", () => {
    const withEditorial: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      editorial: { createdAt: "2026-01-01", updatedAt: "2026-01-02" },
    };
    const projection = toPublicSafeProjection(withEditorial);
    expect(Object.prototype.hasOwnProperty.call(projection, "editorial")).toBe(false);
    expect(projection.id).toBe(withEditorial.id);
  });

  it("a Published internal workflow status does not itself make a record public", () => {
    const draftWithPublishedWorkflow: CanonicalRecordBase = { ...fixtureUnpublishedWorkRecord };
    const internalRegistry = createInternalPublicationRegistry([
      { recordId: draftWithPublishedWorkflow.id, state: "published" },
    ]);
    expect(internalRegistry.get(draftWithPublishedWorkflow.id)).toBe("published");
    // Public eligibility still reads only curatorialInclusion/visibility — unaffected by internal workflow.
    expect(isPubliclyDiscoverable(draftWithPublishedWorkflow)).toBe(false);
  });

  it("a Draft internal workflow state does not itself make a record private", () => {
    const publicRecordStillInDraftWorkflow: CanonicalRecordBase = fixtureWorkRecord;
    const internalRegistry = createInternalPublicationRegistry([
      { recordId: publicRecordStillInDraftWorkflow.id, state: "draft" },
    ]);
    expect(internalRegistry.get(publicRecordStillInDraftWorkflow.id)).toBe("draft");
    expect(isPubliclyDiscoverable(publicRecordStillInDraftWorkflow)).toBe(true);
  });

  it("rejects a duplicate internal publication entry for the same record", () => {
    expect(() =>
      createInternalPublicationRegistry([
        { recordId: fixtureWorkRecord.id, state: "draft" },
        { recordId: fixtureWorkRecord.id, state: "published" },
      ]),
    ).toThrow(/Duplicate internal publication entry/);
  });
});

describe("District lifecycle remains distinct", () => {
  it("Lab experimental state is not the universal lifecycle", () => {
    expect(fixtureLabRecordWithExtension.extension.experimentState).not.toBe(
      fixtureLabRecordWithExtension.lifecycle,
    );
  });

  it("Products commercial state is not the universal lifecycle", () => {
    expect(fixtureProductRecordWithExtension.extension.commercialState).not.toBe(
      fixtureProductRecordWithExtension.lifecycle,
    );
  });
});

describe("Relationships and classifications under archive", () => {
  it("a public archived Lab record's incoming relationship from Research still resolves", () => {
    const archivedLab: CanonicalRecordBase = { ...fixtureLabRecord, lifecycle: "archived" };
    const incoming = listIncomingRelationships(archivedLab.id, [
      fixtureResearchRecord,
      archivedLab,
    ]);
    expect(incoming.some((rel) => rel.sourceId === fixtureResearchRecord.id)).toBe(true);
  });

  it("private targets are not specially exposed through relationship listing — callers must still check eligibility", () => {
    const privateTarget: CanonicalRecordBase = { ...fixtureUnpublishedWorkRecord };
    const relatedSource: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      id: createRecordId("fixture-related-source"),
      relationships: [{ targetId: privateTarget.id, type: "related-to" }],
    };
    const resolvedTargetIsPrivate = !isPubliclyDiscoverable(privateTarget);
    expect(resolvedTargetIsPrivate).toBe(true);
    expect(listOutgoingRelationships(relatedSource)[0]?.targetId).toBe(privateTarget.id);
  });
});

describe("Serialization / security", () => {
  it("public-safe projection JSON round-trips and contains no internal field", () => {
    const projection = toPublicSafeProjection(fixtureWorkRecord);
    const roundTripped = JSON.parse(JSON.stringify(projection));
    expect(roundTripped.id).toBe(fixtureWorkRecord.id);
    expect(roundTripped.editorial).toBeUndefined();
  });

  it("selectPublicArchive/selectPublicComprehensiveView never mutate the input array (no fetch-all-then-filter footgun)", () => {
    const before = [...allFixtureRecords];
    selectPublicArchive(allFixtureRecords, "work");
    selectPublicComprehensiveView(allFixtureRecords, "work");
    expect(allFixtureRecords).toEqual(before);
  });
});
