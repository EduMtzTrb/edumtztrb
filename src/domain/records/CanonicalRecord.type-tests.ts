/**
 * Compile-time invariant tests — M3.1.
 *
 * These assertions are checked by `tsc --noEmit` (already part of the
 * validation gate, `npm run typecheck`), not by `vitest run` — some of
 * this package's invariants ("invalid combinations difficult or
 * impossible," this task's own §29) are type-level guarantees that no
 * runtime test could ever exercise (an invalid object literal is
 * rejected before the program can even execute). Each `@ts-expect-error`
 * line below asserts that the following statement fails to compile; if a
 * future change accidentally makes an invalid shape valid again, the now
 * -unused `@ts-expect-error` directive itself becomes a type error,
 * catching the regression. This file is never imported anywhere — it
 * exists to be type-checked, not executed.
 */

import { createRecordId, createSlug } from "./CanonicalRecord";
import type {
  CanonicalOwnerDistrict,
  CanonicalRecordBase,
  CanonicalRelationshipReference,
  MediaAccessibilityMetadata,
} from "./CanonicalRecord";

// Discipline/technology is not a canonical owner district (only the six
// approved districts are — Home is deliberately excluded too).
// @ts-expect-error — "architecture" is not an approved canonical owner district
const invalidOwnerArchitecture: CanonicalOwnerDistrict = "architecture";
// @ts-expect-error — "ai" is not an approved canonical owner district
const invalidOwnerAi: CanonicalOwnerDistrict = "ai";
// @ts-expect-error — "home" is explicitly not a canonical-record owner (IA §4.2)
const invalidOwnerHome: CanonicalOwnerDistrict = "home";

// A relationship reference stores a target ID, never an embedded target
// record — this must be a compile error, not merely a convention.
const invalidRelationshipEmbedsRecord: CanonicalRelationshipReference = {
  // @ts-expect-error — relationships must reference a target ID, never embed the target record
  target: {} as CanonicalRecordBase,
  type: "related-to",
};

// The unqualified generic `status` field must never exist on the
// universal contract (IA §14.5/§6.3) — verified by constructing a record
// with every required field and confirming a `status` key is rejected.
const validRecordShape: CanonicalRecordBase = {
  id: createRecordId("type-test-record"),
  slug: createSlug("type-test-record"),
  title: "Type test record",
  ownerDistrict: "work",
  contentType: "project",
  curatorialInclusion: "included",
  visibility: "public",
  lifecycle: "complete",
  summary: "Type test summary.",
  authorship: { primary: { name: "Type Test" } },
};
// @ts-expect-error — `status` is not part of the universal contract (IA §14.5)
const invalidGenericStatus: CanonicalRecordBase = { ...validRecordShape, status: "active" };

// Decorative media may not carry alt text (nothing to describe); this is
// the mirror of the "informative/complex requires altText" invariant.
const invalidDecorativeWithAltText: MediaAccessibilityMetadata = {
  role: "decorative",
  // @ts-expect-error — decorative media must not carry altText
  altText: "This should not type-check on a decorative reference",
};

// Informative media must carry alt text — omitting it is a compile error.
// @ts-expect-error — informative media requires altText
const invalidInformativeWithoutAltText: MediaAccessibilityMetadata = {
  role: "informative",
};

// Complex media must carry both alt text and a long description.
// @ts-expect-error — complex media requires altText and longDescription
const invalidComplexWithoutLongDescription: MediaAccessibilityMetadata = {
  role: "complex",
  altText: "Fixture alt text",
};

// Completion does not imply visibility, and visibility does not imply
// lifecycle — this is the curatorial-threshold rule (IA §6.1/§13),
// verified here as a *positive* type-check: this combination must be
// VALID (no @ts-expect-error), proving the type system does not couple
// these two independent dimensions.
const validCompleteButPrivateRecord: CanonicalRecordBase = {
  ...validRecordShape,
  lifecycle: "complete",
  visibility: "private",
  curatorialInclusion: "excluded",
};

const validFailedButPublicRecord: CanonicalRecordBase = {
  ...validRecordShape,
  ownerDistrict: "lab",
  contentType: "experiment",
  lifecycle: "failed",
  visibility: "public",
  curatorialInclusion: "included",
};

// Referenced so these bindings aren't flagged as unused by eslint/tsc —
// their entire purpose is the assignment/type-check above, not their runtime value.
void invalidOwnerArchitecture;
void invalidOwnerAi;
void invalidOwnerHome;
void invalidRelationshipEmbedsRecord;
void invalidGenericStatus;
void invalidDecorativeWithAltText;
void invalidInformativeWithoutAltText;
void invalidComplexWithoutLongDescription;
void validCompleteButPrivateRecord;
void validFailedButPublicRecord;
