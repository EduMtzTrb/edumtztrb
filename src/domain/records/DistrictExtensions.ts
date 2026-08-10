/**
 * District Extensions — M3.2.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.2 — District extensions: Add
 * validated extensions for Work, Research, Lab, Art, Products, and About
 * without duplicating universal identity"); INFORMATION_ARCHITECTURE.md
 * §15 (District-Specific Information Boundaries); PLATFORM_SPECIFICATION.md
 * §12 (District Content Obligations); WORK_UNIVERSE_v1.1.md,
 * RESEARCH_UNIVERSE_v1.1.md, LAB_UNIVERSE_v1.1.md, ART_UNIVERSE_v1.1.md,
 * PRODUCTS_UNIVERSE_v1.1.md, ABOUT_UNIVERSE_v1.1.md. See
 * docs/implementation/M3.2_DISTRICT_EXTENSIONS.md for the full audit,
 * boundary reasoning, and per-district field provenance.
 *
 * GOVERNING RULE (this module's own header, restated): universal identity
 * once (M3.1's `CanonicalRecordBase`), district meaning through validated
 * extension. Nothing here duplicates `id`, `slug`, `title`, `ownerDistrict`,
 * `visibility`, `curatorialInclusion`, `lifecycle`, `authorship`, `date`,
 * `media`, or `relationships` — all of those stay owned by
 * `CanonicalRecord.ts`. An extension may add a *district-specific* state
 * dimension distinct from universal lifecycle (IA §6.2.D) — never a second
 * copy of a universal one.
 *
 * ARCHITECTURE — owner-correlated discriminated extension, not a district
 * god-object. Each extension interface carries its own literal
 * `extensionFor` discriminant; `ExtensionForDistrict<D>` is a generic
 * mapping (via `Extract`) from an owner district to its one correlated
 * extension type; `DistrictRecord<D>` composes `CanonicalRecordBase` with
 * that correlated extension. Assigning a Research extension to a Work
 * record is a compile error (see `DistrictExtensions.type-tests.ts`), not a
 * runtime bug or a documented convention. Home has no extension type at
 * all — it is not a valid `CanonicalOwnerDistrict` member (M3.1), so no
 * `DistrictRecord<"home">` can be constructed.
 *
 * VALIDATION — dependency-free runtime validators (`validateDistrictRecord`
 * / `assertValidDistrictRecord`), matching M3.1's own decision not to add a
 * schema-validation dependency (`IMPLEMENTATION_PLAN.md` M3.1: "schema
 * technology is an implementation choice"). Compile-time types cannot
 * protect data that arrives already-untyped (e.g. `JSON.parse`); these
 * validators exist for that boundary, checking owner/extension
 * correlation, unknown/cross-district keys, enum membership, and
 * structural validity of nested shapes (`ProductPriceBasis`, `AboutValue`,
 * `AboutExperienceEntry`, `AboutEducationEntry`). They enforce truth and
 * structural correctness, never fabricate completeness — every field
 * below is optional, matching the source districts' own "where
 * applicable" framing.
 */

import type { CanonicalOwnerDistrict, CanonicalRecordBase } from "./CanonicalRecord";

// ---------------------------------------------------------------------
// Work extension — WORK_UNIVERSE_v1.1.md §13 (Project Presentation), §9
// (Practice Areas); IA §15.1; PLATFORM_SPECIFICATION.md §12.1.
//
// Practice areas/disciplines are deliberately NOT modeled here — Work
// Universe §9 calls them "lenses," and IA §15.1/§11.2 treats discipline as
// a classification dimension. `CanonicalRecordBase.disciplines` (M3.1) is
// already the correct capability slot for them (this module's own §A14
// option 1: reuse the existing classification-reference abstraction
// rather than inventing a second one). Full controlled-vocabulary
// classification mechanics remain M3.4's territory.
// ---------------------------------------------------------------------

export interface WorkExtension {
  readonly extensionFor: "work";
  /** Project context or brief. */
  context?: string;
  /** The author's own contribution, distinct from total project scope (WU-16 — contribution transparency is non-negotiable). */
  contribution?: string;
  /** Client, institution, office, or collaboration context — distinct from `Authorship.collaborators`, which names people, not the relationship context itself. */
  collaborationContext?: string;
  /** Method/process narrative. */
  process?: string;
  /** Outputs/outcomes narrative — the resolved result, not evidence media (owned by `CanonicalRecordBase.media`). */
  outcome?: string;
}

// ---------------------------------------------------------------------
// Research extension — RESEARCH_UNIVERSE_v1.1.md §10 (Organization Model),
// §11 (Editorial Language); IA §15.2, §6.2.D; PLATFORM_SPECIFICATION.md
// §12.2.
// ---------------------------------------------------------------------

/** IA §6.2.D's own worked example of a Research domain-specific state — distinct from `CanonicalRecordBase.lifecycle`, never flattened into it. */
export type ResearchActivityState = "ongoing" | "concluded";

export interface ResearchExtension {
  readonly extensionFor: "research";
  /** Question, thesis, or proposition — Research Universe §11: "questions before claims." */
  inquiry?: string;
  context?: string;
  methods?: string;
  /** Evidence/sources narrative. */
  evidenceSummary?: string;
  /** Findings, interpretation, or current position — must be able to represent an evolving, provisional state honestly (Research Universe §11: "the interface must never make a hypothesis look like a verified result"). */
  currentPosition?: string;
  /** Uncertainty or limitations, where relevant. */
  uncertainty?: string;
  researchActivityState?: ResearchActivityState;
}

// ---------------------------------------------------------------------
// Lab extension — LAB_UNIVERSE_v1.1.md §14 (Experiment States), §16–17
// (Organization / Anatomy of an Experiment Record); IA §15.3, §6.2.D;
// PLATFORM_SPECIFICATION.md §12.3.
// ---------------------------------------------------------------------

/**
 * Lab Universe §14's approved ten-value experiment lifecycle — a
 * domain-specific state (IA §6.2.D), never flattened into
 * `CanonicalRecordBase.lifecycle`. A failed or abandoned experiment may
 * still be `curatorialInclusion: "included"` and `visibility: "public"` —
 * this field records the experiment's own condition, not whether it is
 * shown (LAB-09: "state describes condition rather than quality or
 * project approval").
 */
export type LabExperimentState =
  | "framed"
  | "trial"
  | "active"
  | "branching"
  | "stabilized"
  | "paused"
  | "concluded"
  | "abandoned"
  | "transferred"
  | "archived";

export interface LabExtension {
  readonly extensionFor: "lab";
  /** The framed uncertainty — question or intention (Lab Universe §5's own qualification gate). */
  experimentQuestion?: string;
  experimentState?: LabExperimentState;
  /** A significant version label — Lab Universe §13: "routine saves and cosmetic tweaks are not public versions." */
  version?: string;
  /** Narrative description of this record's branch/lineage position. Formal links to sibling/successor Lab records use `CanonicalRecordBase.relationships` (`related-to`/`derived-from`), never a duplicate field here. */
  lineageNote?: string;
  method?: string;
  evidence?: string;
  observation?: string;
  /** Lab Universe §15 distinguishes Failed (divergence from intended behavior) from Invalid (no reliable conclusion possible) — both captured honestly in one narrative field rather than a speculative sub-taxonomy. */
  failureNote?: string;
  /** The open edge — what remains unresolved (Lab Universe §5's fourth qualification element). */
  nextQuestion?: string;
}

// ---------------------------------------------------------------------
// Art extension — ART_UNIVERSE_v1.1.md §12 (Canonical Content Model), §17
// (disclosure obligations), §20 (When Art Becomes Purchasable); IA §15.4;
// PLATFORM_SPECIFICATION.md §12.4.
// ---------------------------------------------------------------------

/**
 * Art Universe §17's shared preservation-state vocabulary — Art's own
 * domain-specific state (IA §6.2.D), describing the actual condition a
 * visitor encounters (live, degraded, only documented, etc.), never the
 * universal lifecycle.
 */
export type ArtPresentationCondition =
  | "live"
  | "partially-functional"
  | "documented"
  | "reconstructed"
  | "emulated"
  | "no-longer-reproducible";

export interface ArtExtension {
  readonly extensionFor: "art";
  medium?: string;
  /** Dimensions/material/duration description — descriptive text; structured time-based duration for individual media items remains `MediaReference.duration` (M3.1). */
  dimensions?: string;
  /** Artistic context/statement (Art Universe §13's "Orientation" layer). */
  artistStatement?: string;
  exhibitionContext?: string;
  presentationCondition?: ArtPresentationCondition;
  /**
   * Restrained factual availability only (Art Universe §20: "whether an
   * edition exists, edition size when artistically relevant, material or
   * format, and a labeled passage to Products"). Never price, stock, or
   * any computed commercial value — those belong exclusively to a related
   * `ProductsExtension` record, connected through `relationships`
   * (`commercialized-as`), never duplicated here.
   */
  editionNote?: string;
}

// ---------------------------------------------------------------------
// Products extension — PRODUCTS_UNIVERSE_v1.1.md §3 (What Qualifies as a
// Product), §7 (Product Families), §12 (Pricing), §13 (Availability and
// Lifecycle States); IA §15.5; PLATFORM_SPECIFICATION.md §12.5, §33.1
// (commitment labels are literal).
//
// `productFamily` is structural (it determines which commercial mechanics
// apply — license terms vs. shipping vs. subscription cadence), the same
// role `CanonicalRecordBase.contentType` plays for the base contract — not
// a discovery/classification facet. "Collections" (Product Hierarchy
// Level 3, Products Universe §8) are curated groupings that reference
// records without owning them; they are explicitly NOT modeled here and
// remain M3.4/M3.5 territory (classification + relationships).
// ---------------------------------------------------------------------

export type ProductFamily =
  "digital" | "physical" | "service" | "license" | "edition" | "subscription" | "commission";

/**
 * Products Universe §12's four permitted price framings. Every variant is
 * descriptive commercial truth — a string amount, never a computed or
 * binding transaction value, and never wired to any checkout/payment
 * logic (explicitly out of scope for this milestone).
 */
export type ProductPriceBasis =
  | { kind: "fixed"; amount: string; currency: string }
  | { kind: "from"; amount: string; currency: string }
  | { kind: "quotation-required" }
  | { kind: "hourly-or-package" };

/**
 * Products Universe §13's approved thirteen-value commercial-availability
 * lifecycle — Products' own domain-specific state (IA §6.2.D), distinct
 * from `CanonicalRecordBase.lifecycle` and from `visibility`. A
 * `"discontinued"` product may remain `visibility: "public"` for
 * documentary purposes (Products Universe §13: "Sold Out — visible for
 * documentary purposes").
 */
export type ProductCommercialState =
  | "forthcoming"
  | "available"
  | "limited"
  | "made-to-order"
  | "preorder"
  | "temporarily-unavailable"
  | "capacity-closed"
  | "sold-out"
  | "discontinued"
  | "superseded"
  | "archived"
  | "regionally-unavailable"
  | "free-access";

export interface ProductsExtension {
  readonly extensionFor: "products";
  /** Value proposition. */
  proposition?: string;
  intendedRecipient?: string;
  productFamily?: ProductFamily;
  priceBasis?: ProductPriceBasis;
  commercialState?: ProductCommercialState;
  /** Included deliverable/access/service. */
  included?: string;
  exclusions?: string;
  fulfilmentMethod?: string;
  leadTime?: string;
  /** Plain-language licensing/usage summary (Products Universe §14) — never the full legal terms themselves. */
  licenseSummary?: string;
  requirements?: string;
  support?: string;
  /** The literal commitment-action label — "Purchase", "Reserve", "Apply", "Book" (`PLATFORM_SPECIFICATION.md` §33.1). Text only; no executable transaction logic anywhere in this module. */
  commitmentLabel?: string;
}

// ---------------------------------------------------------------------
// About extension — ABOUT_UNIVERSE_v1.1.md §9 (Biography System), §11
// (Professional Experience), §12 (Education), §13 (Values), §14
// (Methods), §15 (Languages/Location/Availability), §28 (Content Model);
// IA §15.6; PLATFORM_SPECIFICATION.md §12.6.
//
// Not all twelve About Universe §28 record types are modeled here — that
// would overbuild well past "smallest coherent architecture" for a first
// extension package. Experience, Education, and Value are modeled as
// their own typed shapes because each carries a genuine internal
// structure worth protecting (About Universe §13 in particular requires
// Values to carry all of principle/interpretation/consequence, not just a
// label). Credential and Timeline Event are deferred — see the
// implementation report's "Deferred items". Contact pathways are a
// utility-page concern (`PLATFORM_SPECIFICATION.md` §18.3, `/contact`),
// not canonical About record content, and are not modeled here.
// ---------------------------------------------------------------------

export interface AboutExperienceEntry {
  organization: string;
  role: string;
  period?: string;
  context?: string;
}

export interface AboutEducationEntry {
  institution: string;
  qualification: string;
  field?: string;
  period?: string;
}

/**
 * About Universe §13's required four-part structure: "each requires four
 * parts: the principle, its interpretation, its consequence in practice,
 * and its tension or limitation." `tension` is the one optional part —
 * not every value is under active tension, but a value with no principle,
 * interpretation, or consequence is not a value at all, per that section.
 */
export interface AboutValue {
  principle: string;
  interpretation: string;
  consequence: string;
  tension?: string;
}

/** About Universe §15 — "available, selectively available, open to commissions, fully committed." */
export type AboutAvailabilityState =
  "available" | "selectively-available" | "open-to-commissions" | "fully-committed";

export interface AboutExtension {
  readonly extensionFor: "about";
  practiceStatement?: string;
  biography?: string;
  experience?: AboutExperienceEntry[];
  education?: AboutEducationEntry[];
  values?: AboutValue[];
  methods?: string[];
  capabilities?: string[];
  languages?: string[];
  /** Operating context, not a private address (About Universe §15/§19). */
  location?: string;
  availability?: AboutAvailabilityState;
  affiliations?: string;
  recognition?: string;
}

// ---------------------------------------------------------------------
// Owner correlation — the compile-time core of this module (this task's
// own §A3: "the type system must make [an owner/extension mismatch]
// invalid"). `ExtensionForDistrict<D>` is a generic owner→extension
// mapping via `Extract`; `DistrictRecord<D>` composes it onto
// `CanonicalRecordBase`. See `DistrictExtensions.type-tests.ts` for the
// compile-time proof this rejects mismatches.
// ---------------------------------------------------------------------

export type DistrictExtension =
  | WorkExtension
  | ResearchExtension
  | LabExtension
  | ArtExtension
  | ProductsExtension
  | AboutExtension;

export type ExtensionForDistrict<D extends CanonicalOwnerDistrict> = Extract<
  DistrictExtension,
  { extensionFor: D }
>;

export interface DistrictRecord<
  D extends CanonicalOwnerDistrict = CanonicalOwnerDistrict,
> extends CanonicalRecordBase {
  ownerDistrict: D;
  extension: ExtensionForDistrict<D>;
}

export type WorkRecord = DistrictRecord<"work">;
export type ResearchRecord = DistrictRecord<"research">;
export type LabRecord = DistrictRecord<"lab">;
export type ArtRecord = DistrictRecord<"art">;
export type ProductsRecord = DistrictRecord<"products">;
export type AboutRecord = DistrictRecord<"about">;

/**
 * Home is deliberately absent from this union — it is not a member of
 * `CanonicalOwnerDistrict` (M3.1), so no `DistrictRecord<"home">` can be
 * constructed, and no `HomeExtension` type exists anywhere in this module.
 */
export type AnyDistrictRecord =
  WorkRecord | ResearchRecord | LabRecord | ArtRecord | ProductsRecord | AboutRecord;

// ---------------------------------------------------------------------
// Runtime validation — dependency-free (this task's own §A5: assess
// whether TypeScript plus dependency-free runtime validators are
// sufficient before adding a library; they are, for the same reason M3.1
// needed none — there is still no real data-ingestion boundary in this
// repository). Every check below defends a boundary the type system
// cannot: data arriving already untyped (e.g. `JSON.parse`).
// ---------------------------------------------------------------------

export interface ValidationIssue {
  path: string;
  message: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => isNonEmptyString(item));
}

function checkOptionalString(
  issues: ValidationIssue[],
  obj: Record<string, unknown>,
  key: string,
  path: string,
): void {
  if (obj[key] !== undefined && !isNonEmptyString(obj[key])) {
    issues.push({
      path: `${path}.${key}`,
      message: `"${key}" must be a non-empty string when present`,
    });
  }
}

function checkOptionalEnum(
  issues: ValidationIssue[],
  obj: Record<string, unknown>,
  key: string,
  allowed: readonly string[],
  path: string,
): void {
  if (obj[key] !== undefined && !allowed.includes(obj[key] as string)) {
    issues.push({
      path: `${path}.${key}`,
      message: `"${key}" must be one of: ${allowed.join(", ")} (received "${String(obj[key])}")`,
    });
  }
}

function checkUnknownKeys(
  issues: ValidationIssue[],
  obj: Record<string, unknown>,
  allowed: ReadonlySet<string>,
  path: string,
): void {
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) {
      issues.push({
        path: `${path}.${key}`,
        message: `unexpected field "${key}" — not part of this district's extension`,
      });
    }
  }
}

const RESEARCH_ACTIVITY_STATES: readonly ResearchActivityState[] = ["ongoing", "concluded"];
const LAB_EXPERIMENT_STATES: readonly LabExperimentState[] = [
  "framed",
  "trial",
  "active",
  "branching",
  "stabilized",
  "paused",
  "concluded",
  "abandoned",
  "transferred",
  "archived",
];
const ART_PRESENTATION_CONDITIONS: readonly ArtPresentationCondition[] = [
  "live",
  "partially-functional",
  "documented",
  "reconstructed",
  "emulated",
  "no-longer-reproducible",
];
const PRODUCT_FAMILIES: readonly ProductFamily[] = [
  "digital",
  "physical",
  "service",
  "license",
  "edition",
  "subscription",
  "commission",
];
const PRODUCT_COMMERCIAL_STATES: readonly ProductCommercialState[] = [
  "forthcoming",
  "available",
  "limited",
  "made-to-order",
  "preorder",
  "temporarily-unavailable",
  "capacity-closed",
  "sold-out",
  "discontinued",
  "superseded",
  "archived",
  "regionally-unavailable",
  "free-access",
];
const ABOUT_AVAILABILITY_STATES: readonly AboutAvailabilityState[] = [
  "available",
  "selectively-available",
  "open-to-commissions",
  "fully-committed",
];

const WORK_KEYS = new Set([
  "extensionFor",
  "context",
  "contribution",
  "collaborationContext",
  "process",
  "outcome",
]);
const RESEARCH_KEYS = new Set([
  "extensionFor",
  "inquiry",
  "context",
  "methods",
  "evidenceSummary",
  "currentPosition",
  "uncertainty",
  "researchActivityState",
]);
const LAB_KEYS = new Set([
  "extensionFor",
  "experimentQuestion",
  "experimentState",
  "version",
  "lineageNote",
  "method",
  "evidence",
  "observation",
  "failureNote",
  "nextQuestion",
]);
const ART_KEYS = new Set([
  "extensionFor",
  "medium",
  "dimensions",
  "artistStatement",
  "exhibitionContext",
  "presentationCondition",
  "editionNote",
]);
const PRODUCTS_KEYS = new Set([
  "extensionFor",
  "proposition",
  "intendedRecipient",
  "productFamily",
  "priceBasis",
  "commercialState",
  "included",
  "exclusions",
  "fulfilmentMethod",
  "leadTime",
  "licenseSummary",
  "requirements",
  "support",
  "commitmentLabel",
]);
const ABOUT_KEYS = new Set([
  "extensionFor",
  "practiceStatement",
  "biography",
  "experience",
  "education",
  "values",
  "methods",
  "capabilities",
  "languages",
  "location",
  "availability",
  "affiliations",
  "recognition",
]);

function validateWorkExtension(ext: Record<string, unknown>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  checkUnknownKeys(issues, ext, WORK_KEYS, "extension");
  for (const key of ["context", "contribution", "collaborationContext", "process", "outcome"]) {
    checkOptionalString(issues, ext, key, "extension");
  }
  return issues;
}

function validateResearchExtension(ext: Record<string, unknown>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  checkUnknownKeys(issues, ext, RESEARCH_KEYS, "extension");
  for (const key of [
    "inquiry",
    "context",
    "methods",
    "evidenceSummary",
    "currentPosition",
    "uncertainty",
  ]) {
    checkOptionalString(issues, ext, key, "extension");
  }
  checkOptionalEnum(issues, ext, "researchActivityState", RESEARCH_ACTIVITY_STATES, "extension");
  return issues;
}

function validateLabExtension(ext: Record<string, unknown>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  checkUnknownKeys(issues, ext, LAB_KEYS, "extension");
  for (const key of [
    "experimentQuestion",
    "version",
    "lineageNote",
    "method",
    "evidence",
    "observation",
    "failureNote",
    "nextQuestion",
  ]) {
    checkOptionalString(issues, ext, key, "extension");
  }
  checkOptionalEnum(issues, ext, "experimentState", LAB_EXPERIMENT_STATES, "extension");
  return issues;
}

function validateArtExtension(ext: Record<string, unknown>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  checkUnknownKeys(issues, ext, ART_KEYS, "extension");
  for (const key of [
    "medium",
    "dimensions",
    "artistStatement",
    "exhibitionContext",
    "editionNote",
  ]) {
    checkOptionalString(issues, ext, key, "extension");
  }
  checkOptionalEnum(issues, ext, "presentationCondition", ART_PRESENTATION_CONDITIONS, "extension");
  return issues;
}

function validatePriceBasis(value: unknown, path: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (value === undefined) return issues;
  if (typeof value !== "object" || value === null) {
    issues.push({ path, message: "priceBasis must be an object" });
    return issues;
  }
  const basis = value as Record<string, unknown>;
  const kind = basis.kind;
  if (kind === "fixed" || kind === "from") {
    checkUnknownKeys(issues, basis, new Set(["kind", "amount", "currency"]), path);
    checkOptionalString(issues, basis, "currency", path);
    if (!isNonEmptyString(basis.amount)) {
      issues.push({
        path: `${path}.amount`,
        message: `"amount" must be a non-empty string for kind "${kind}"`,
      });
    }
    if (!isNonEmptyString(basis.currency)) {
      issues.push({
        path: `${path}.currency`,
        message: `"currency" is required for kind "${kind}"`,
      });
    }
  } else if (kind === "quotation-required" || kind === "hourly-or-package") {
    checkUnknownKeys(issues, basis, new Set(["kind"]), path);
  } else {
    issues.push({
      path: `${path}.kind`,
      message: `priceBasis.kind must be one of: fixed, from, quotation-required, hourly-or-package (received "${String(kind)}")`,
    });
  }
  return issues;
}

function validateProductsExtension(ext: Record<string, unknown>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  checkUnknownKeys(issues, ext, PRODUCTS_KEYS, "extension");
  for (const key of [
    "proposition",
    "intendedRecipient",
    "included",
    "exclusions",
    "fulfilmentMethod",
    "leadTime",
    "licenseSummary",
    "requirements",
    "support",
    "commitmentLabel",
  ]) {
    checkOptionalString(issues, ext, key, "extension");
  }
  checkOptionalEnum(issues, ext, "productFamily", PRODUCT_FAMILIES, "extension");
  checkOptionalEnum(issues, ext, "commercialState", PRODUCT_COMMERCIAL_STATES, "extension");
  issues.push(...validatePriceBasis(ext.priceBasis, "extension.priceBasis"));
  return issues;
}

function validateAboutValue(value: unknown, path: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (typeof value !== "object" || value === null) {
    issues.push({ path, message: "each value must be an object" });
    return issues;
  }
  const entry = value as Record<string, unknown>;
  checkUnknownKeys(
    issues,
    entry,
    new Set(["principle", "interpretation", "consequence", "tension"]),
    path,
  );
  for (const key of ["principle", "interpretation", "consequence"]) {
    if (!isNonEmptyString(entry[key])) {
      issues.push({
        path: `${path}.${key}`,
        message: `"${key}" is required (About Universe §13's four-part structure)`,
      });
    }
  }
  checkOptionalString(issues, entry, "tension", path);
  return issues;
}

function validateAboutExperienceEntry(value: unknown, path: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (typeof value !== "object" || value === null) {
    issues.push({ path, message: "each experience entry must be an object" });
    return issues;
  }
  const entry = value as Record<string, unknown>;
  checkUnknownKeys(issues, entry, new Set(["organization", "role", "period", "context"]), path);
  for (const key of ["organization", "role"]) {
    if (!isNonEmptyString(entry[key])) {
      issues.push({ path: `${path}.${key}`, message: `"${key}" is required` });
    }
  }
  checkOptionalString(issues, entry, "period", path);
  checkOptionalString(issues, entry, "context", path);
  return issues;
}

function validateAboutEducationEntry(value: unknown, path: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (typeof value !== "object" || value === null) {
    issues.push({ path, message: "each education entry must be an object" });
    return issues;
  }
  const entry = value as Record<string, unknown>;
  checkUnknownKeys(
    issues,
    entry,
    new Set(["institution", "qualification", "field", "period"]),
    path,
  );
  for (const key of ["institution", "qualification"]) {
    if (!isNonEmptyString(entry[key])) {
      issues.push({ path: `${path}.${key}`, message: `"${key}" is required` });
    }
  }
  checkOptionalString(issues, entry, "field", path);
  checkOptionalString(issues, entry, "period", path);
  return issues;
}

function validateAboutExtension(ext: Record<string, unknown>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  checkUnknownKeys(issues, ext, ABOUT_KEYS, "extension");
  checkOptionalString(issues, ext, "practiceStatement", "extension");
  checkOptionalString(issues, ext, "biography", "extension");
  checkOptionalString(issues, ext, "location", "extension");
  checkOptionalString(issues, ext, "affiliations", "extension");
  checkOptionalString(issues, ext, "recognition", "extension");
  checkOptionalEnum(issues, ext, "availability", ABOUT_AVAILABILITY_STATES, "extension");

  if (ext.experience !== undefined) {
    if (!Array.isArray(ext.experience)) {
      issues.push({ path: "extension.experience", message: "must be an array when present" });
    } else {
      ext.experience.forEach((entry, index) =>
        issues.push(...validateAboutExperienceEntry(entry, `extension.experience[${index}]`)),
      );
    }
  }
  if (ext.education !== undefined) {
    if (!Array.isArray(ext.education)) {
      issues.push({ path: "extension.education", message: "must be an array when present" });
    } else {
      ext.education.forEach((entry, index) =>
        issues.push(...validateAboutEducationEntry(entry, `extension.education[${index}]`)),
      );
    }
  }
  if (ext.values !== undefined) {
    if (!Array.isArray(ext.values)) {
      issues.push({ path: "extension.values", message: "must be an array when present" });
    } else {
      ext.values.forEach((entry, index) =>
        issues.push(...validateAboutValue(entry, `extension.values[${index}]`)),
      );
    }
  }
  for (const key of ["methods", "capabilities", "languages"] as const) {
    if (ext[key] !== undefined && !isStringArray(ext[key])) {
      issues.push({
        path: `extension.${key}`,
        message: `"${key}" must be an array of non-empty strings when present`,
      });
    }
  }

  return issues;
}

/**
 * Validates a district record's extension: owner/extension discriminant
 * correlation first (this task's own §A18 "Ownership correlation" — the
 * runtime mirror of the compile-time guarantee), then district-specific
 * field validity. Returns an empty array when valid.
 */
export function validateDistrictRecord(record: AnyDistrictRecord): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ext = record.extension as unknown;

  if (typeof ext !== "object" || ext === null) {
    issues.push({ path: "extension", message: "extension is required and must be an object" });
    return issues;
  }
  const extObj = ext as Record<string, unknown>;

  if (extObj.extensionFor !== record.ownerDistrict) {
    issues.push({
      path: "extension.extensionFor",
      message: `extension.extensionFor ("${String(extObj.extensionFor)}") does not match ownerDistrict ("${record.ownerDistrict}")`,
    });
    return issues;
  }

  switch (record.ownerDistrict) {
    case "work":
      issues.push(...validateWorkExtension(extObj));
      break;
    case "research":
      issues.push(...validateResearchExtension(extObj));
      break;
    case "lab":
      issues.push(...validateLabExtension(extObj));
      break;
    case "art":
      issues.push(...validateArtExtension(extObj));
      break;
    case "products":
      issues.push(...validateProductsExtension(extObj));
      break;
    case "about":
      issues.push(...validateAboutExtension(extObj));
      break;
  }

  return issues;
}

/** Throws with every issue's path and message when `validateDistrictRecord` finds any problem. */
export function assertValidDistrictRecord(record: AnyDistrictRecord): void {
  const issues = validateDistrictRecord(record);
  if (issues.length > 0) {
    const detail = issues.map((issue) => `${issue.path}: ${issue.message}`).join("; ");
    throw new Error(`Invalid "${record.ownerDistrict}" district record "${record.id}" — ${detail}`);
  }
}
