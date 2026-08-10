import { describe, expect, it } from "vitest";

import type { CanonicalRecordBase } from "../../src/domain/records/CanonicalRecord";
import { fixtureLabRecordWithExtension } from "../../src/domain/records/district-fixtures";
import { validateDistrictRecord } from "../../src/domain/records/DistrictExtensions";
import {
  disciplineTermComputationalDesign,
  fixtureClassificationCatalog,
} from "../../src/domain/records/classification-fixtures";
import { validateRecordClassifications } from "../../src/domain/records/ClassificationModel";
import { resolveCanonicalRoute } from "../../src/domain/records/RouteResolver";
import {
  createRecordRegistry,
  isDirectlyAccessible,
  isPubliclyDiscoverable,
} from "../../src/domain/records/registry";
import {
  listIncomingRelationships,
  resolveRelationship,
  validateRelationships,
} from "../../src/domain/records/RelationshipModel";
import {
  isArchived,
  isPublicArchiveEligible,
  selectPublicArchive,
  selectPublicComprehensiveView,
  toPublicSafeProjection,
} from "../../src/domain/records/LifecycleArchiveModel";
import {
  allFixtureRecords,
  fixtureResearchRecord,
  fixtureWorkRecord,
} from "../../src/domain/records/fixtures";

/**
 * M3-A integration test — one representative journey through every layer
 * of the canonical architecture (M3.1 identity → M3.2 district extension
 * → M3.4 classification → M3.3 route → M3.5 relationships → M3.6
 * lifecycle/archive/public-safe projection), plus cross-district lineage
 * across multiple fixture records. This file intentionally does not
 * repeat each package's own unit tests — see
 * docs/implementation/M3A_CANONICAL_ARCHITECTURE_RECONCILIATION.md for
 * the full audit this test supports.
 */

describe("M3-A — one canonical record through every layer", () => {
  const registry = createRecordRegistry(allFixtureRecords);
  const record = {
    ...fixtureLabRecordWithExtension,
    disciplines: [disciplineTermComputationalDesign.id],
  };

  it("identity survives every layer unchanged", () => {
    expect(record.id).toBe("fixture-lab-001");
    expect(record.ownerDistrict).toBe("lab");
  });

  it("M3.2 — district extension validates cleanly", () => {
    expect(validateDistrictRecord(record)).toEqual([]);
    expect(record.ownerDistrict).toBe("lab");
  });

  it("M3.4 — classification validates cleanly and never changes owner", () => {
    expect(validateRecordClassifications(record, fixtureClassificationCatalog)).toEqual([]);
    expect(record.ownerDistrict).toBe("lab");
  });

  it("M3.3 — canonical route resolves and is unaffected by the extension/classification layers", () => {
    const route = resolveCanonicalRoute(record);
    expect(route).toBe("/lab/fixture-lab-experiment");
    expect(resolveCanonicalRoute(fixtureLabRecordWithExtension)).toBe(route);
  });

  it("M3.5 — relationships resolve to canonical destinations and reciprocals derive without duplicate storage", () => {
    expect(validateRelationships(record, registry)).toEqual([]);
    const developedInto = record.relationships!.find((r) => r.type === "developed-into")!;
    const resolved = resolveRelationship(record, developedInto, registry);
    expect(resolved.targetRoute).toBe("/work/fixture-work-outcome");
    expect(resolved.label).toBe("Developed into");

    const incoming = listIncomingRelationships(record.id, allFixtureRecords);
    expect(
      incoming.some((r) => r.sourceId === fixtureResearchRecord.id && r.type === "tested-in"),
    ).toBe(true);
  });

  it("M3.6 — public eligibility, archive derivation, and public-safe projection all compose correctly", () => {
    expect(isPubliclyDiscoverable(record)).toBe(true);
    expect(isDirectlyAccessible(record)).toBe(true);
    expect(isArchived(record)).toBe(false);
    expect(isPublicArchiveEligible(record)).toBe(false);

    const projection = toPublicSafeProjection(record);
    expect(Object.prototype.hasOwnProperty.call(projection, "editorial")).toBe(false);
    expect(projection.id).toBe(record.id);
  });

  it("archiving the record at the end of the journey preserves every prior layer's result", () => {
    const archived: CanonicalRecordBase = { ...record, lifecycle: "archived" };
    expect(archived.id).toBe(record.id);
    expect(archived.ownerDistrict).toBe(record.ownerDistrict);
    expect(resolveCanonicalRoute(archived)).toBe(resolveCanonicalRoute(record));
    expect(validateRelationships(archived, registry)).toEqual([]);
    expect(validateRecordClassifications(archived, fixtureClassificationCatalog)).toEqual([]);
    expect(isArchived(archived)).toBe(true);
    expect(isPublicArchiveEligible(archived)).toBe(true);
  });
});

describe("M3-A — cross-district lineage across multiple fixture records", () => {
  const registry = createRecordRegistry(allFixtureRecords);

  it("Research → Lab → Work → Research forms a coherent, resolvable, ownership-preserving graph", () => {
    for (const record of allFixtureRecords) {
      expect(validateRelationships(record, registry)).toEqual([]);
    }

    const researchToLab = resolveRelationship(
      fixtureResearchRecord,
      fixtureResearchRecord.relationships!.find((r) => r.type === "tested-in")!,
      registry,
    );
    expect(researchToLab.targetRoute).toBe("/lab/fixture-lab-experiment");

    const workToResearch = resolveRelationship(
      fixtureWorkRecord,
      fixtureWorkRecord.relationships!.find((r) => r.type === "informed-by")!,
      registry,
    );
    expect(workToResearch.targetRoute).toBe("/research/fixture-research-inquiry");

    // Ownership is preserved end to end — no relationship in the chain altered any record's owner district.
    expect(registry.get(fixtureResearchRecord.id)?.ownerDistrict).toBe("research");
    expect(registry.get(fixtureWorkRecord.id)?.ownerDistrict).toBe("work");
  });

  it("the public archive and comprehensive view derive from the same single eligibility source across the whole fixture set", () => {
    const archive = selectPublicArchive(allFixtureRecords);
    const comprehensive = selectPublicComprehensiveView(allFixtureRecords);
    expect(archive.every((record) => comprehensive.some((r) => r.id === record.id))).toBe(true);
    expect(comprehensive.length).toBeGreaterThanOrEqual(archive.length);
  });

  it("every fixture record's canonical route resolves exactly once with no collisions", () => {
    const routes = new Set<string>();
    for (const record of allFixtureRecords) {
      const route = resolveCanonicalRoute(record);
      expect(routes.has(route)).toBe(false);
      routes.add(route);
    }
  });
});
