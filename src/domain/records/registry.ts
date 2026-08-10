/**
 * Canonical record registry helpers — M3.1.
 *
 * Deliberately small: this module does not implement route resolution
 * (M3.3), a query/persistence layer, Search, or Index (M3.10–M3.12). It
 * exists only to make two Gate-M3.1 acceptance criteria
 * (IMPLEMENTATION_PLAN.md §7: "Duplicate IDs are rejected," "Every
 * relationship resolves") genuinely testable against real data, and to
 * define — not merely describe — the public-discovery predicate real
 * storage/query code must apply.
 */

import type { CanonicalRecordBase, CanonicalRecordId } from "./CanonicalRecord";

/**
 * Builds an ID → record map, throwing on the first duplicate ID
 * encountered. This is the actual mechanism behind "Duplicate IDs are
 * rejected" — not documentation of an intention.
 */
export function createRecordRegistry(
  records: readonly CanonicalRecordBase[],
): Map<CanonicalRecordId, CanonicalRecordBase> {
  const registry = new Map<CanonicalRecordId, CanonicalRecordBase>();
  for (const record of records) {
    if (registry.has(record.id)) {
      throw new Error(`Duplicate canonical record ID: "${record.id}"`);
    }
    registry.set(record.id, record);
  }
  return registry;
}

/**
 * Throws if any record's relationship references a target ID that isn't
 * present in the supplied record set. This is the actual mechanism
 * behind "Every relationship resolves."
 */
export function assertRelationshipsResolve(records: readonly CanonicalRecordBase[]): void {
  const registry = createRecordRegistry(records);
  for (const record of records) {
    for (const relationship of record.relationships ?? []) {
      if (!registry.has(relationship.targetId)) {
        throw new Error(
          `Record "${record.id}" has an unresolved relationship target "${relationship.targetId}" (type: ${relationship.type})`,
        );
      }
    }
  }
}

/**
 * Whether a record is eligible for ordinary public discovery (Search/
 * Index) per IA §7.3: "included + public → searchable... lifecycle and
 * domain-specific state do not independently suppress an otherwise
 * eligible record." This function defines the RULE only.
 *
 * SECURITY BOUNDARY (this task's own §12/§39): this is a pure predicate
 * over a single already-loaded record — it is NOT a safe pattern for
 * filtering an entire dataset after fetching it into application memory.
 * A real storage/query layer (once one exists) must apply this exact
 * rule at the query level (e.g. a database WHERE clause), so that
 * excluded/private/unlisted records are never transmitted to a public
 * client in the first place. "Fetch everything, then filter client-side"
 * is the unsafe architecture this task explicitly warned against; this
 * predicate is the rule a safe query boundary must encode, not a
 * substitute for building one.
 */
export function isPubliclyDiscoverable(
  record: Pick<CanonicalRecordBase, "curatorialInclusion" | "visibility">,
): boolean {
  return record.curatorialInclusion === "included" && record.visibility === "public";
}

/**
 * Whether a record may be reached via a direct/controlled link even when
 * not eligible for ordinary discovery (IA §6.2.B: "`unlisted` records may
 * be accessible by direct route or controlled pathway but do not appear
 * in ordinary public discovery"). Same security-boundary caveat as
 * `isPubliclyDiscoverable` above applies.
 */
export function isDirectlyAccessible(
  record: Pick<CanonicalRecordBase, "curatorialInclusion" | "visibility">,
): boolean {
  return record.curatorialInclusion === "included" && record.visibility !== "private";
}
