/**
 * Classification model — M3.4.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.4 — Classification model:
 * Support approved dimensions such as discipline, theme, year/period,
 * type, district grouping, status, collection/series/territory/family,
 * and contribution/role. No uncontrolled tag cloud.");
 * INFORMATION_ARCHITECTURE.md §8 (Index), §9 (Filters and Lenses), §18.6
 * (Controlled classification), §6.2.D (Domain-specific state);
 * PLATFORM_SPECIFICATION.md §14 (Index), §15 (Filters, Lenses, Sorting,
 * Recomposition). See
 * docs/implementation/M3.4_CLASSIFICATION_MODEL.md for the full audit and
 * per-dimension provenance.
 *
 * GOVERNING PRINCIPLE (IA §9.1/§9.2, restated): classification supports
 * discovery. It never defines ownership, never changes canonical route,
 * never creates a new canonical record, and never becomes a second
 * uncontrolled tagging system (IA §18.6: "controlled vocabulary rather
 * than unrestricted decorative tagging"; CROSS_UNIVERSE_SYSTEM_
 * REQUIREMENTS.md §8.4: "the system must avoid uncontrolled tag clouds").
 *
 * THREE KINDS OF DIMENSION, kept structurally distinct in this module:
 *   1. CANONICAL-DERIVED FACETS (`districtFacet`, `contentTypeFacet`,
 *      `yearFacet`) — computed from fields M3.1 already owns
 *      (`ownerDistrict`, `contentType`, `date`). Never separately stored,
 *      so there is exactly one source of truth for each.
 *   2. STATE FACETS (`lifecycleFacet`, `visibilityFacet`,
 *      `curatorialInclusionFacet`) — likewise derived, each tagged with
 *      its own source dimension, never merged into one generic `status`
 *      facet (IA §6.3).
 *   3. CATALOG-REFERENCED TERMS (`discipline`, `theme`, `collection`,
 *      `series`, `territory`, `contribution-role`) — controlled-vocabulary
 *      terms a record references by stable ID; a term must exist in the
 *      catalog before any record may reference it.
 *
 * GLOBAL LENSES — IA §8.3/§9.2's approved v1.0 set is exactly district,
 * content type, discipline, theme, year. `APPROVED_GLOBAL_LENS_DIMENSIONS`
 * and `isGlobalLensDimension` encode this closed set; no other dimension
 * in this module (collection, series, territory, contribution-role) is
 * ever exposed as a global lens — they remain district-specific
 * classification/filtering dimensions (IA §9.4).
 *
 * OUT OF SCOPE (explicitly, per this task's own boundary) — no Index UI,
 * no Search ranking, no Filter UI, no URL/query persistence, no
 * checkout/commerce logic. This module prepares structured classification
 * TRUTH only.
 */

import type {
  CanonicalContentType,
  CanonicalOwnerDistrict,
  CanonicalRecordBase,
} from "./CanonicalRecord";

// ---------------------------------------------------------------------
// Global lenses — IA §8.3/§9.2's closed, approved v1.0 set.
// ---------------------------------------------------------------------

export type GlobalLensDimension = "district" | "content-type" | "discipline" | "theme" | "year";

export const APPROVED_GLOBAL_LENS_DIMENSIONS: readonly GlobalLensDimension[] = [
  "district",
  "content-type",
  "discipline",
  "theme",
  "year",
];

/**
 * The broader classification-dimension vocabulary this module supports —
 * the five global-lens dimensions plus the district-specific grouping
 * dimensions IA §18.6 explicitly permits ("additional district-specific
 * classifications may exist where useful"). `collection`, `series`,
 * `territory`, and `contribution-role` are never global lenses (IA §9.4:
 * "district-specific filters do not automatically become global Index
 * lenses") — see `isGlobalLensDimension`.
 *
 * `status`/domain-specific state is deliberately NOT a member of this
 * union — see the "State facets" section below; it is exposed as its own
 * distinctly-sourced facet, never as a classification term, so it can
 * never collapse into one generic vocabulary (IA §6.3).
 */
export type ClassificationDimension =
  "discipline" | "theme" | "collection" | "series" | "territory" | "contribution-role";

export function isGlobalLensDimension(
  dimension: ClassificationDimension | GlobalLensDimension,
): dimension is GlobalLensDimension {
  return (APPROVED_GLOBAL_LENS_DIMENSIONS as readonly string[]).includes(dimension);
}

// ---------------------------------------------------------------------
// Canonical-derived facets — computed, never separately stored.
// ---------------------------------------------------------------------

export interface DistrictFacet {
  dimension: "district";
  value: CanonicalOwnerDistrict;
}

export function districtFacet(record: Pick<CanonicalRecordBase, "ownerDistrict">): DistrictFacet {
  return { dimension: "district", value: record.ownerDistrict };
}

export interface ContentTypeFacet {
  dimension: "content-type";
  value: CanonicalContentType;
}

export function contentTypeFacet(
  record: Pick<CanonicalRecordBase, "contentType">,
): ContentTypeFacet {
  return { dimension: "content-type", value: record.contentType };
}

function extractYear(isoLike: string): number | undefined {
  const match = /^(\d{4})/.exec(isoLike);
  return match ? Number(match[1]) : undefined;
}

export interface YearFacet {
  dimension: "year";
  value: number | undefined;
}

/** Derives the year facet from `CanonicalRecordBase.date` (M3.1) — never a second, independently stored "year" field. */
export function yearFacet(record: Pick<CanonicalRecordBase, "date">): YearFacet {
  const date = record.date;
  if (!date) return { dimension: "year", value: undefined };
  if (date.kind === "year") return { dimension: "year", value: date.year };
  if (date.kind === "date") return { dimension: "year", value: extractYear(date.date) };
  return { dimension: "year", value: extractYear(date.start) };
}

// ---------------------------------------------------------------------
// State facets — likewise derived; each carries its own source so
// distinct state dimensions (IA §6.2) can never merge into one generic
// vocabulary. Domain-specific state (M3.2's `experimentState`,
// `commercialState`, etc.) already carries its own precise field name and
// is read directly from a district extension by a caller — this module
// does not duplicate it as a classification term.
// ---------------------------------------------------------------------

export type StateFacetSource = "lifecycle" | "visibility" | "curatorialInclusion";

export interface StateFacet {
  source: StateFacetSource;
  value: string;
}

export function lifecycleFacet(record: Pick<CanonicalRecordBase, "lifecycle">): StateFacet {
  return { source: "lifecycle", value: record.lifecycle };
}

export function visibilityFacet(record: Pick<CanonicalRecordBase, "visibility">): StateFacet {
  return { source: "visibility", value: record.visibility };
}

export function curatorialInclusionFacet(
  record: Pick<CanonicalRecordBase, "curatorialInclusion">,
): StateFacet {
  return { source: "curatorialInclusion", value: record.curatorialInclusion };
}

// ---------------------------------------------------------------------
// Controlled classification catalog — the actual "no uncontrolled tag
// cloud" mechanism. A term must be registered here before any record may
// reference it; `validateRecordClassifications` rejects unknown terms,
// wrong-dimension terms, out-of-scope terms, and duplicate references.
// ---------------------------------------------------------------------

export type ClassificationTermId = string & { readonly __brand: "ClassificationTermId" };

export function createTermId(value: string): ClassificationTermId {
  return value as ClassificationTermId;
}

export interface ClassificationTerm {
  readonly id: ClassificationTermId;
  readonly dimension: ClassificationDimension;
  readonly label: string;
  /** Restricts the term to specific owner districts; omitted means usable cross-district (e.g. a discipline naming a way of working that spans several districts). */
  readonly districtScope?: readonly CanonicalOwnerDistrict[];
  readonly description?: string;
}

/** Builds an id → term map, throwing on the first duplicate term ID — the classification catalog's own identity guarantee, mirroring M3.1's `createRecordRegistry`. */
export function createClassificationCatalog(
  terms: readonly ClassificationTerm[],
): Map<ClassificationTermId, ClassificationTerm> {
  const catalog = new Map<ClassificationTermId, ClassificationTerm>();
  for (const term of terms) {
    if (catalog.has(term.id)) {
      throw new Error(`Duplicate classification term ID: "${term.id}"`);
    }
    catalog.set(term.id, term);
  }
  return catalog;
}

export interface ClassificationIssue {
  path: string;
  message: string;
}

function validateTermList(
  values: readonly string[] | undefined,
  dimension: ClassificationDimension,
  owner: CanonicalOwnerDistrict,
  catalog: ReadonlyMap<ClassificationTermId, ClassificationTerm>,
  path: string,
): ClassificationIssue[] {
  const issues: ClassificationIssue[] = [];
  if (!values) return issues;

  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      issues.push({ path: `${path}[]`, message: `duplicate reference to term "${value}"` });
      continue;
    }
    seen.add(value);

    const term = catalog.get(value as ClassificationTermId);
    if (!term) {
      issues.push({
        path: `${path}[]`,
        message: `unknown ${dimension} term "${value}" — not present in the controlled catalog`,
      });
      continue;
    }
    if (term.dimension !== dimension) {
      issues.push({
        path: `${path}[]`,
        message: `term "${value}" belongs to dimension "${term.dimension}", not "${dimension}"`,
      });
    }
    if (term.districtScope && !term.districtScope.includes(owner)) {
      issues.push({
        path: `${path}[]`,
        message: `term "${value}" is scoped to [${term.districtScope.join(", ")}], not usable by district "${owner}"`,
      });
    }
  }
  return issues;
}

/**
 * Validates `CanonicalRecordBase.disciplines`/`.themes` (M3.1's own
 * loose capability slots — deliberately not retyped here; see the
 * implementation report's "Term identity" section for why a validation-
 * layer strengthening was chosen over a field-type change) against a
 * controlled catalog: every referenced term must exist, must belong to
 * the expected dimension, must be usable by the record's own owner
 * district when scoped, and must not be referenced twice on one record.
 */
export function validateRecordClassifications(
  record: Pick<CanonicalRecordBase, "ownerDistrict" | "disciplines" | "themes">,
  catalog: ReadonlyMap<ClassificationTermId, ClassificationTerm>,
): ClassificationIssue[] {
  return [
    ...validateTermList(
      record.disciplines,
      "discipline",
      record.ownerDistrict,
      catalog,
      "disciplines",
    ),
    ...validateTermList(record.themes, "theme", record.ownerDistrict, catalog, "themes"),
  ];
}
