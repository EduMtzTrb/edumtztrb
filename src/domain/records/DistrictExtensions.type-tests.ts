/**
 * Compile-time invariant tests — M3.2.
 *
 * Checked by `tsc --noEmit` (`npm run typecheck`), never imported or
 * executed. See `src/domain/records/CanonicalRecord.type-tests.ts` for the
 * M3.1 precedent this file follows — each `@ts-expect-error` line asserts
 * the following statement fails to compile; a future change that
 * accidentally makes an invalid shape valid again turns the now-unused
 * directive itself into a type error.
 */

import { createRecordId, createSlug } from "./CanonicalRecord";
import type { CanonicalRecordBase } from "./CanonicalRecord";
import type {
  AboutRecord,
  ArtExtension,
  DistrictRecord,
  LabRecord,
  ProductsExtension,
  ResearchExtension,
  WorkRecord,
} from "./DistrictExtensions";

const baseShape: CanonicalRecordBase = {
  id: createRecordId("type-test-district-record"),
  slug: createSlug("type-test-district-record"),
  title: "Type test district record",
  ownerDistrict: "work",
  contentType: "project",
  curatorialInclusion: "included",
  visibility: "public",
  lifecycle: "complete",
  summary: "Type test summary.",
  authorship: { primary: { name: "Type Test" } },
};

// Work owner + Research extension must be a compile error — the
// discriminated `ExtensionForDistrict<D>` mapping must reject a
// structurally mismatched extension, not merely a differently-labeled one.
const researchExtensionValue: ResearchExtension = {
  extensionFor: "research",
  inquiry: "Fixture inquiry",
};
const invalidWorkWithResearchExtension: WorkRecord = {
  ...baseShape,
  ownerDistrict: "work",
  // @ts-expect-error — a Work-owned record cannot receive a Research extension
  extension: researchExtensionValue,
};

// Research owner + Products extension must likewise be rejected.
const productsExtensionValue: ProductsExtension = {
  extensionFor: "products",
  productFamily: "digital",
};
const invalidResearchWithProductsExtension: DistrictRecord<"research"> = {
  ...baseShape,
  ownerDistrict: "research",
  // @ts-expect-error — a Research-owned record cannot receive a Products extension
  extension: productsExtensionValue,
};

// Lab owner + Art extension must likewise be rejected.
const artExtensionValue: ArtExtension = { extensionFor: "art", medium: "Fixture medium" };
const invalidLabWithArtExtension: LabRecord = {
  ...baseShape,
  ownerDistrict: "lab",
  // @ts-expect-error — a Lab-owned record cannot receive an Art extension
  extension: artExtensionValue,
};

// Home is not a valid `CanonicalOwnerDistrict` member (M3.1) — no
// `DistrictRecord<"home">` can be named at all.
// @ts-expect-error — "home" is not an approved canonical owner district; it cannot parameterize DistrictRecord
type InvalidHomeDistrictRecord = DistrictRecord<"home">;

// A district extension cannot redefine universal identity fields —
// `id`/`slug`/`title`/`ownerDistrict` belong exclusively to
// `CanonicalRecordBase`, never duplicated inside an extension object.
const invalidExtensionRedefinesIdentity: WorkRecord = {
  ...baseShape,
  ownerDistrict: "work",
  extension: {
    extensionFor: "work",
    context: "Fixture context",
    // @ts-expect-error — an extension must never redefine the record's own canonical id
    id: createRecordId("should-not-be-here"),
  },
};

// A valid, fully-correlated About record — proves the mapping accepts the
// matching owner/extension pair (a positive check, no @ts-expect-error).
const validAboutRecord: AboutRecord = {
  ...baseShape,
  ownerDistrict: "about",
  contentType: "profile-record",
  extension: { extensionFor: "about", practiceStatement: "Fixture practice statement" },
};

void invalidWorkWithResearchExtension;
void invalidResearchWithProductsExtension;
void invalidLabWithArtExtension;
void invalidExtensionRedefinesIdentity;
void validAboutRecord;
export type { InvalidHomeDistrictRecord };
