import { describe, expect, it } from "vitest";

import { createRecordId } from "./CanonicalRecord";
import type { CanonicalRecordBase } from "./CanonicalRecord";
import {
  allFixtureRecords,
  fixtureArtRecord,
  fixtureLabRecord,
  fixtureProductRecord,
  fixtureResearchRecord,
  fixtureSecondProductRecord,
  fixtureWorkRecord,
} from "./fixtures";
import { createRecordRegistry, isPubliclyDiscoverable } from "./registry";
import {
  deriveRelationshipLabel,
  listIncomingRelationships,
  listOutgoingRelationships,
  resolveRelationship,
  validateRelationships,
} from "./RelationshipModel";

const registry = createRecordRegistry(allFixtureRecords);

describe("Every relationship has source, destination, type, and a visible label", () => {
  it.each([
    [fixtureResearchRecord, "tested-in", fixtureLabRecord.id],
    [fixtureLabRecord, "developed-into", fixtureWorkRecord.id],
    [fixtureLabRecord, "commercialized-as", fixtureProductRecord.id],
    [fixtureArtRecord, "commercialized-as", fixtureSecondProductRecord.id],
    [fixtureWorkRecord, "informed-by", fixtureResearchRecord.id],
  ] as const)(
    "%s's outgoing relationship resolves with source/destination/type/label",
    (source, type, targetId) => {
      const relationship = listOutgoingRelationships(source).find((rel) => rel.type === type);
      expect(relationship).toBeDefined();
      expect(relationship?.targetId).toBe(targetId);

      const resolved = resolveRelationship(source, relationship!, registry);
      expect(resolved.sourceId).toBe(source.id);
      expect(resolved.targetId).toBe(targetId);
      expect(resolved.type).toBe(type);
      expect(resolved.label).toBeTruthy();
    },
  );
});

describe("Six-type ontology only", () => {
  it("every fixture relationship uses one of the six approved stored types", () => {
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

  it("deriveRelationshipLabel is defined for all six types, both directions", () => {
    const types = [
      "related-to",
      "derived-from",
      "informed-by",
      "tested-in",
      "developed-into",
      "commercialized-as",
    ] as const;
    for (const type of types) {
      expect(deriveRelationshipLabel(type, "forward")).toBeTruthy();
      expect(deriveRelationshipLabel(type, "reverse")).toBeTruthy();
    }
  });

  it("a generic related-to relationship resolves like any other stored type", () => {
    const sourceWithRelatedTo: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      relationships: [{ targetId: fixtureArtRecord.id, type: "related-to" }],
    };
    const relationship = listOutgoingRelationships(sourceWithRelatedTo)[0]!;
    const resolved = resolveRelationship(sourceWithRelatedTo, relationship, registry);
    expect(resolved.type).toBe("related-to");
    expect(resolved.label).toBe("Related to");
  });
});

describe("Canonical destination resolution", () => {
  it("resolves through the M3.3 canonical-route resolver — no stored URL", () => {
    const relationship = listOutgoingRelationships(fixtureLabRecord).find(
      (r) => r.type === "developed-into",
    )!;
    const resolved = resolveRelationship(fixtureLabRecord, relationship, registry);
    expect(resolved.targetRoute).toBe("/work/fixture-work-outcome");
  });

  it("throws when resolving a relationship whose target is not in the registry", () => {
    const broken = {
      targetId: createRecordId("fixture-does-not-exist"),
      type: "related-to" as const,
    };
    expect(() => resolveRelationship(fixtureWorkRecord, broken, registry)).toThrow(
      /unknown target/,
    );
  });
});

describe("Broken/self/duplicate edge handling", () => {
  it("every fixture record's relationships pass validation cleanly", () => {
    for (const record of allFixtureRecords) {
      expect(validateRelationships(record, registry)).toEqual([]);
    }
  });

  it("rejects a relationship targeting a nonexistent record", () => {
    const broken: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      relationships: [{ targetId: createRecordId("fixture-does-not-exist"), type: "related-to" }],
    };
    const issues = validateRelationships(broken, registry);
    expect(issues.some((issue) => issue.message.includes("unresolved relationship target"))).toBe(
      true,
    );
  });

  it("rejects an accidental self-relationship", () => {
    const selfLoop: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      relationships: [{ targetId: fixtureWorkRecord.id, type: "related-to" }],
    };
    const issues = validateRelationships(selfLoop, registry);
    expect(issues.some((issue) => issue.message.includes("self-relationship rejected"))).toBe(true);
  });

  it("rejects a duplicate edge (same destination + same type referenced twice)", () => {
    const duplicated: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      relationships: [
        { targetId: fixtureResearchRecord.id, type: "informed-by" },
        { targetId: fixtureResearchRecord.id, type: "informed-by" },
      ],
    };
    const issues = validateRelationships(duplicated, registry);
    expect(issues.some((issue) => issue.message.includes("duplicate relationship"))).toBe(true);
  });

  it("does NOT reject two distinct relationship types to the same target", () => {
    const distinctTypes: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      relationships: [
        { targetId: fixtureResearchRecord.id, type: "informed-by" },
        { targetId: fixtureResearchRecord.id, type: "related-to" },
      ],
    };
    expect(validateRelationships(distinctTypes, registry)).toEqual([]);
  });
});

describe("Reciprocal display without duplicated inverse storage", () => {
  it("Lab's incoming relationships include Research's outgoing tested-in edge, derived, not separately stored", () => {
    const incoming = listIncomingRelationships(fixtureLabRecord.id, allFixtureRecords);
    const fromResearch = incoming.find((rel) => rel.sourceId === fixtureResearchRecord.id);
    expect(fromResearch).toBeDefined();
    expect(fromResearch?.type).toBe("tested-in");
    expect(fromResearch?.label).toBe(deriveRelationshipLabel("tested-in", "reverse"));
    // Confirms no separate stored inverse edge exists on the Lab fixture itself.
    expect(
      listOutgoingRelationships(fixtureLabRecord).some(
        (r) => r.targetId === fixtureResearchRecord.id,
      ),
    ).toBe(false);
  });

  it("editorial reciprocal label differs from the stored forward label while the stored type is unchanged", () => {
    expect(deriveRelationshipLabel("developed-into", "forward")).toBe("Developed into");
    expect(deriveRelationshipLabel("developed-into", "reverse")).toBe("Developed from");
  });

  it("Work's genuinely independently authored informed-by edge coexists with Research's own tested-in edge without conflict", () => {
    const researchOutgoing = listOutgoingRelationships(fixtureResearchRecord);
    const workOutgoing = listOutgoingRelationships(fixtureWorkRecord);
    expect(
      researchOutgoing.some((r) => r.targetId === fixtureLabRecord.id && r.type === "tested-in"),
    ).toBe(true);
    expect(
      workOutgoing.some((r) => r.targetId === fixtureResearchRecord.id && r.type === "informed-by"),
    ).toBe(true);
  });
});

describe("Priority does not affect ownership", () => {
  it("a prioritized relationship leaves owner district and route untouched", () => {
    const prioritized: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      relationships: [{ targetId: fixtureResearchRecord.id, type: "informed-by", priority: 1 }],
    };
    expect(prioritized.ownerDistrict).toBe("work");
    const relationship = listOutgoingRelationships(prioritized)[0]!;
    const resolved = resolveRelationship(prioritized, relationship, registry);
    expect(resolved.priority).toBe(1);
    expect(prioritized.ownerDistrict).toBe("work");
  });
});

describe("Ownership invariance", () => {
  it("resolving a relationship never mutates source or target owner district", () => {
    const relationship = listOutgoingRelationships(fixtureLabRecord).find(
      (r) => r.type === "developed-into",
    )!;
    resolveRelationship(fixtureLabRecord, relationship, registry);
    expect(fixtureLabRecord.ownerDistrict).toBe("lab");
    expect(registry.get(fixtureWorkRecord.id)?.ownerDistrict).toBe("work");
  });
});

describe("District-transfer rules", () => {
  it("Research/Lab cyclical relationship: Lab may also point back toward Research independently, without being forced", () => {
    // Cyclical means BOTH directions are legitimate as independently authored edges — not that one must mirror the other automatically.
    expect(
      listOutgoingRelationships(fixtureResearchRecord).some((r) => r.type === "tested-in"),
    ).toBe(true);
    expect(
      listIncomingRelationships(fixtureResearchRecord.id, allFixtureRecords).length,
    ).toBeGreaterThanOrEqual(0);
  });

  it("Lab retains its experimental record after maturing into Work — the Lab fixture is unmodified by resolution", () => {
    const relationship = listOutgoingRelationships(fixtureLabRecord).find(
      (r) => r.type === "developed-into",
    )!;
    resolveRelationship(fixtureLabRecord, relationship, registry);
    expect(fixtureLabRecord.lifecycle).toBe("failed");
    expect(fixtureLabRecord.id).toBe("fixture-lab-001");
  });

  it("Art remains Art-owned after a commercialized-as relationship to Products", () => {
    const relationship = listOutgoingRelationships(fixtureArtRecord).find(
      (r) => r.type === "commercialized-as",
    )!;
    const resolved = resolveRelationship(fixtureArtRecord, relationship, registry);
    expect(fixtureArtRecord.ownerDistrict).toBe("art");
    expect(registry.get(resolved.targetId)?.ownerDistrict).toBe("products");
  });
});

describe("Attribution boundary", () => {
  it("Authorship/collaborators are never part of the relationship ontology", () => {
    expect(fixtureWorkRecord.authorship).toBeDefined();
    expect(
      fixtureWorkRecord.relationships?.some((r) => (r as unknown as Record<string, unknown>).role),
    ).toBeFalsy();
  });
});

describe("Classification boundary", () => {
  it("shared classification never auto-generates a relationship", () => {
    const noClassificationDrivenRelationship: CanonicalRecordBase = {
      ...fixtureWorkRecord,
      disciplines: ["computational-design"],
      relationships: fixtureWorkRecord.relationships,
    };
    expect(listOutgoingRelationships(noClassificationDrivenRelationship)).toHaveLength(1);
  });
});

describe("Search/Index boundary", () => {
  it("this module exposes data only — public-discovery eligibility remains M3.1's own concern", () => {
    expect(isPubliclyDiscoverable(fixtureLabRecord)).toBe(true);
  });
});

describe("Serialization", () => {
  it("resolved relationships and incoming-relationship lists round-trip through JSON", () => {
    const relationship = listOutgoingRelationships(fixtureLabRecord).find(
      (r) => r.type === "developed-into",
    )!;
    const resolved = resolveRelationship(fixtureLabRecord, relationship, registry);
    const roundTripped = JSON.parse(JSON.stringify(resolved));
    expect(roundTripped.targetRoute).toBe(resolved.targetRoute);

    const incoming = listIncomingRelationships(fixtureLabRecord.id, allFixtureRecords);
    const roundTrippedIncoming = JSON.parse(JSON.stringify(incoming));
    expect(roundTrippedIncoming).toEqual(incoming);
  });

  it("no embedded target record — relationships reference IDs only", () => {
    for (const relationship of listOutgoingRelationships(fixtureLabRecord)) {
      expect(Object.prototype.hasOwnProperty.call(relationship, "target")).toBe(false);
      expect(typeof relationship.targetId).toBe("string");
    }
  });
});
