/**
 * Lifecycle and archive model — M3.6.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.6 — Lifecycle and archive
 * model: Separate: public state; internal publication state;
 * district-specific lifecycle; archive visibility. Do not flatten
 * district lifecycles into one sequence."); INFORMATION_ARCHITECTURE.md
 * §6 (Public Inclusion and State Model), §10 (Archive Semantics), §19.4
 * (State terminology), §19.6 (All versus Archive);
 * CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md §14 (Shared State and Lifecycle
 * Requirements, including its "Internal publishing" row);
 * PLATFORM_SPECIFICATION.md §16 (Archives and Historical Continuity), §17
 * (District Lifecycle and Public State). See
 * docs/implementation/M3.6_LIFECYCLE_ARCHIVE_MODEL.md for the full audit.
 *
 * TERMINOLOGY RECONCILIATION — the Implementation Plan's phrase "public
 * state" is not a fifth state dimension; it reconciles to IA's own
 * precise vocabulary (IA §19.4: "do not use `public state` or `status` as
 * unqualified catch-all terms"), already fully implemented as three of
 * M3.1's four independent dimensions — `curatorialInclusion`,
 * `visibility`, `lifecycle` — plus M3.2's district-specific state fields
 * for the fourth. This module adds no new field to `CanonicalRecordBase`
 * or to any M3.2 extension; `CanonicalRecord.ts`, `DistrictExtensions.ts`,
 * `RouteResolver.ts`, `ClassificationModel.ts`, and `RelationshipModel.ts`
 * are all byte-for-byte unchanged by this package.
 *
 * WHAT M3.6 ACTUALLY ADDS, on top of the four dimensions M3.1/M3.2
 * already own:
 *   1. INTERNAL PUBLICATION STATE — a genuinely new, fifth concept
 *      (editorial workflow status: Draft/In Review/Ready to
 *      Publish/Published/Needs Revision — CROSS_UNIVERSE_SYSTEM_
 *      REQUIREMENTS.md §14's own "Internal publishing" row). Modeled as a
 *      SEPARATE side-table (`InternalPublicationRecord`, keyed by record
 *      ID), never a field on `CanonicalRecordBase` itself — this makes
 *      leakage into public projection structurally impossible, not just
 *      filtered.
 *   2. ARCHIVE ELIGIBILITY / PUBLIC-ARCHIVE SELECTION — `isArchived`,
 *      `isPublicArchiveEligible`, `selectPublicArchive`,
 *      `selectPublicComprehensiveView` — all derived from M3.1's own
 *      `lifecycle` field and M3.1's own `isPubliclyDiscoverable`
 *      (`registry.ts`, reused directly, never re-implemented).
 *   3. PUBLIC-SAFE PROJECTION — `toPublicSafeProjection`, stripping the
 *      internal-only `editorial` field M3.1 already isolated for exactly
 *      this purpose.
 *
 * NO STATE-MACHINE — this module deliberately implements no
 * transition-validation engine and no single universal
 * `draft → active → complete → archived` sequence. No upstream authority
 * defines an enforced transition graph; each Universe document describes
 * typical progressions in prose, not as a validated requirement, and this
 * task's own scope explicitly rejects "flattening district lifecycles
 * into one sequence."
 */

import type {
  CanonicalOwnerDistrict,
  CanonicalRecordBase,
  CanonicalRecordId,
} from "./CanonicalRecord";
import { isPubliclyDiscoverable } from "./registry";

// ---------------------------------------------------------------------
// Internal publication state — CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md
// §14's own approved vocabulary, verbatim. Modeled entirely OUTSIDE
// `CanonicalRecordBase` — there is no field on the canonical record type
// this state could ever be read from during normal record handling.
// ---------------------------------------------------------------------

export type InternalPublicationState =
  "draft" | "in-review" | "ready-to-publish" | "published" | "needs-revision";

export interface InternalPublicationRecord {
  readonly recordId: CanonicalRecordId;
  readonly state: InternalPublicationState;
}

/** Builds a recordId → internal publication state map, throwing on a duplicate entry — the same registry discipline M3.1/M3.4/M3.5 already established. */
export function createInternalPublicationRegistry(
  entries: readonly InternalPublicationRecord[],
): Map<CanonicalRecordId, InternalPublicationState> {
  const registry = new Map<CanonicalRecordId, InternalPublicationState>();
  for (const entry of entries) {
    if (registry.has(entry.recordId)) {
      throw new Error(`Duplicate internal publication entry for record "${entry.recordId}"`);
    }
    registry.set(entry.recordId, entry.state);
  }
  return registry;
}

// ---------------------------------------------------------------------
// Public-safe projection — strips M3.1's `editorial` field (internal
// timestamps), the one field `CanonicalRecordBase` itself carries that
// was never meant to reach a public client. Internal publication state
// requires no stripping logic at all: it was never merged into the
// canonical record shape in the first place (see above).
// ---------------------------------------------------------------------

export type PublicSafeRecord = Omit<CanonicalRecordBase, "editorial">;

/**
 * SECURITY BOUNDARY (mirrors `registry.ts`'s own warning) — this is a
 * pure, per-record projection, not a substitute for query-level
 * enforcement. A real persistence/query layer must still apply
 * `isPubliclyDiscoverable`/`isPublicArchiveEligible` before a record ever
 * reaches this function, exactly as `registry.ts` already documents for
 * visibility/curatorial eligibility — "fetch everything, then filter
 * client-side" remains the unsafe architecture this project rejects.
 */
export function toPublicSafeProjection(record: CanonicalRecordBase): PublicSafeRecord {
  const safe = { ...record };
  delete safe.editorial;
  return safe;
}

// ---------------------------------------------------------------------
// Archive — IA §10.2: "archived is a lifecycle value. There is no
// separate universal archive-state field." No `isArchived` boolean is
// ever stored; it is always derived from `lifecycle` here.
// ---------------------------------------------------------------------

export function isArchived(record: Pick<CanonicalRecordBase, "lifecycle">): boolean {
  return record.lifecycle === "archived";
}

/** Archived AND eligible for ordinary public discovery (M3.1's `isPubliclyDiscoverable`, reused directly — not re-implemented). */
export function isPublicArchiveEligible(
  record: Pick<CanonicalRecordBase, "lifecycle" | "curatorialInclusion" | "visibility">,
): boolean {
  return isArchived(record) && isPubliclyDiscoverable(record);
}

/** The public archive for an optional district scope — archived records only. */
export function selectPublicArchive(
  records: readonly CanonicalRecordBase[],
  district?: CanonicalOwnerDistrict,
): CanonicalRecordBase[] {
  return records.filter(
    (record) =>
      isPublicArchiveEligible(record) &&
      (district === undefined || record.ownerDistrict === district),
  );
}

/**
 * The public COMPREHENSIVE view for an optional district scope — every
 * eligible public record regardless of lifecycle (IA §19.6: "`All` =
 * all eligible public records within a scope"). Deliberately NOT
 * restricted to non-archived records — an archived record remains
 * eligible for a comprehensive view exactly as it remains eligible for
 * Index (IA §8.4) — proving `/work/all` and a future `/work/archive` are
 * genuinely different, non-interchangeable selections rather than two
 * names for the same set.
 */
export function selectPublicComprehensiveView(
  records: readonly CanonicalRecordBase[],
  district?: CanonicalOwnerDistrict,
): CanonicalRecordBase[] {
  return records.filter(
    (record) =>
      isPubliclyDiscoverable(record) &&
      (district === undefined || record.ownerDistrict === district),
  );
}
