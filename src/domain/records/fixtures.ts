/**
 * Fixture canonical records — M3.1.
 *
 * Test/demonstration data only. Every string is unmistakably a fixture
 * ("Fixture …") — none resembles real professional, research, or
 * commercial history. These fixtures exist to exercise
 * `CanonicalRecordBase` (one per approved owner district) and to prove,
 * with real data, the curatorial-threshold invariants IA §6.1 requires:
 * a failed Lab experiment may be public, and complete work may remain
 * unpublished.
 *
 * The relationship graph below (`research-001 → tested-in → lab-001 →
 * developed-into → work-001`, etc.) is deliberately the exact directional
 * example INFORMATION_ARCHITECTURE.md §5.4 already gives as approved
 * usage — not an invented scenario.
 */

import { createRecordId, createSlug } from "./CanonicalRecord";
import type { CanonicalRecordBase } from "./CanonicalRecord";

export const fixtureResearchRecord: CanonicalRecordBase = {
  id: createRecordId("fixture-research-001"),
  slug: createSlug("fixture-research-inquiry"),
  title: "Fixture research inquiry",
  ownerDistrict: "research",
  contentType: "research-project",
  curatorialInclusion: "included",
  visibility: "public",
  lifecycle: "active",
  summary: "Fixture summary describing a fixture research inquiry — not real content.",
  authorship: { primary: { name: "Fixture Author" } },
  relationships: [{ targetId: createRecordId("fixture-lab-001"), type: "tested-in" }],
};

export const fixtureLabRecord: CanonicalRecordBase = {
  id: createRecordId("fixture-lab-001"),
  slug: createSlug("fixture-lab-experiment"),
  title: "Fixture lab experiment",
  ownerDistrict: "lab",
  contentType: "experiment",
  curatorialInclusion: "included",
  visibility: "public",
  // A significant failed experiment remains openly documented (IA §6.1/§6.4).
  lifecycle: "failed",
  summary: "Fixture summary describing a fixture experiment that failed but remains public.",
  authorship: { primary: { name: "Fixture Author" } },
  relationships: [
    { targetId: createRecordId("fixture-work-001"), type: "developed-into" },
    { targetId: createRecordId("fixture-product-001"), type: "commercialized-as" },
  ],
};

export const fixtureWorkRecord: CanonicalRecordBase = {
  id: createRecordId("fixture-work-001"),
  slug: createSlug("fixture-work-outcome"),
  title: "Fixture work outcome",
  ownerDistrict: "work",
  contentType: "project",
  curatorialInclusion: "included",
  visibility: "public",
  lifecycle: "complete",
  summary: "Fixture summary describing a fixture resolved work outcome.",
  authorship: { primary: { name: "Fixture Author" }, role: "Lead" },
  relationships: [{ targetId: createRecordId("fixture-research-001"), type: "informed-by" }],
};

/** Demonstrates the curatorial-threshold rule's other direction: complete work may remain unpublished (IA §6.1/§6.4). */
export const fixtureUnpublishedWorkRecord: CanonicalRecordBase = {
  id: createRecordId("fixture-work-002"),
  slug: createSlug("fixture-work-unpublished"),
  title: "Fixture unpublished work",
  ownerDistrict: "work",
  contentType: "project",
  curatorialInclusion: "excluded",
  visibility: "private",
  lifecycle: "complete",
  summary:
    "Fixture summary — this fixture record is complete but does not meet the public curatorial threshold.",
  authorship: { primary: { name: "Fixture Author" } },
};

export const fixtureProductRecord: CanonicalRecordBase = {
  id: createRecordId("fixture-product-001"),
  slug: createSlug("fixture-product-offer"),
  title: "Fixture product offer",
  ownerDistrict: "products",
  contentType: "product",
  curatorialInclusion: "included",
  visibility: "public",
  lifecycle: "active",
  summary: "Fixture summary describing a fixture commercial offer — €000 — fixture only.",
  authorship: { primary: { name: "Fixture Author" } },
};

export const fixtureArtRecord: CanonicalRecordBase = {
  id: createRecordId("fixture-art-001"),
  slug: createSlug("fixture-artwork"),
  title: "Fixture artwork",
  ownerDistrict: "art",
  contentType: "artwork",
  curatorialInclusion: "included",
  visibility: "public",
  lifecycle: "complete",
  summary: "Fixture summary describing a fixture artwork.",
  authorship: { primary: { name: "Fixture Author" } },
  relationships: [{ targetId: createRecordId("fixture-product-002"), type: "commercialized-as" }],
  media: [
    {
      id: "fixture-media-001",
      kind: "image",
      source: "/fixtures/fixture-artwork.jpg",
      documentationRole: "artwork",
      accessibility: {
        role: "informative",
        altText: "Fixture alt text describing the fixture artwork.",
        credit: "Fixture Author",
      },
    },
  ],
};

export const fixtureSecondProductRecord: CanonicalRecordBase = {
  id: createRecordId("fixture-product-002"),
  slug: createSlug("fixture-product-edition"),
  title: "Fixture product edition",
  ownerDistrict: "products",
  contentType: "product",
  curatorialInclusion: "included",
  visibility: "public",
  lifecycle: "active",
  summary: "Fixture summary — €000 — fixture only.",
  authorship: { primary: { name: "Fixture Author" } },
};

export const fixtureAboutRecord: CanonicalRecordBase = {
  id: createRecordId("fixture-about-001"),
  slug: createSlug("fixture-profile"),
  title: "Fixture profile record",
  ownerDistrict: "about",
  contentType: "profile-record",
  curatorialInclusion: "included",
  visibility: "public",
  lifecycle: "active",
  summary: "Fixture summary describing a fixture profile record.",
  authorship: { primary: { name: "Fixture Author" } },
};

/** One fixture per approved canonical-owner district, plus the unpublished-work fixture — the full set used by this package's own tests. */
export const allFixtureRecords: CanonicalRecordBase[] = [
  fixtureResearchRecord,
  fixtureLabRecord,
  fixtureWorkRecord,
  fixtureUnpublishedWorkRecord,
  fixtureProductRecord,
  fixtureSecondProductRecord,
  fixtureArtRecord,
  fixtureAboutRecord,
];
