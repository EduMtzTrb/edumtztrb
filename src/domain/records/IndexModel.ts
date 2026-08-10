/**
 * Index query layer — M3.10.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.10 — Index: implement complete
 * precise access over the public canonical set."); INFORMATION_ARCHITECTURE.md
 * §8 (Index — "What exists, and how is it classified?" — never Search's
 * "help me find it"); §9.2 (the five approved v1.0 global lens dimensions).
 * See docs/implementation/M3.10_INDEX.md for the full audit.
 *
 * SHARED PUBLIC SOURCE — this module consumes M3.6's own
 * `selectPublicComprehensiveView` directly (never a second registry, a
 * second taxonomy, or an Index-only content set). Public eligibility
 * (`isPubliclyDiscoverable`, M3.1) is already enforced before a record
 * ever reaches this module — this is query/projection logic over an
 * already-public set, not a filtering boundary itself (that boundary
 * remains `registry.ts`'s, per its own documented security warning).
 *
 * FIVE APPROVED LENSES ONLY — `IndexLensQuery.dimension` is typed as
 * M3.4's own closed `GlobalLensDimension` union (`district`, `content-type`,
 * `discipline`, `theme`, `year`). No sixth lens can be constructed; this is
 * enforced at the type level, not by runtime convention.
 *
 * STRUCTURED BROWSING, NOT RANKING — Index orders results deterministically
 * (title, then ID as a tiebreaker) with no relevance scoring. Search's own
 * ranking (M3.12) is a genuinely different concern.
 */

import type { CanonicalRecordBase } from "./CanonicalRecord";
import { selectPublicComprehensiveView } from "./LifecycleArchiveModel";
import { resolveCanonicalRoute } from "./RouteResolver";
import type { CanonicalRoute } from "./RouteResolver";
import { contentTypeFacet, districtFacet, yearFacet } from "./ClassificationModel";
import type { GlobalLensDimension } from "./ClassificationModel";

export interface IndexLensQuery {
  readonly dimension: GlobalLensDimension;
  readonly value: string;
}

export interface IndexEntry {
  readonly record: CanonicalRecordBase;
  readonly route: CanonicalRoute;
}

export interface IndexResult {
  readonly entries: readonly IndexEntry[];
  readonly count: number;
  readonly lens?: IndexLensQuery;
}

function matchesLens(record: CanonicalRecordBase, lens: IndexLensQuery): boolean {
  switch (lens.dimension) {
    case "district":
      return districtFacet(record).value === lens.value;
    case "content-type":
      return contentTypeFacet(record).value === lens.value;
    case "year": {
      const year = yearFacet(record).value;
      return year !== undefined && String(year) === lens.value;
    }
    case "discipline":
      return (record.disciplines ?? []).includes(lens.value);
    case "theme":
      return (record.themes ?? []).includes(lens.value);
  }
}

/** Deterministic, presentation-appropriate ordering — title, then ID as a stable tiebreaker. No relevance ranking (that is Search's own concern, M3.12). */
function byTitleThenId(a: CanonicalRecordBase, b: CanonicalRecordBase): number {
  return a.title.localeCompare(b.title) || a.id.localeCompare(b.id);
}

/**
 * Queries the Index over the public canonical set, optionally narrowed by
 * one approved global lens. An unknown/unmatched lens value (a route
 * segment that doesn't correspond to any public record) is not an error —
 * it produces a correctly empty result, exactly like any other genuinely
 * empty scope.
 */
export function queryIndex(
  records: readonly CanonicalRecordBase[],
  lens?: IndexLensQuery,
): IndexResult {
  const publicSet = selectPublicComprehensiveView(records);
  const matched = lens ? publicSet.filter((record) => matchesLens(record, lens)) : publicSet;
  const entries: IndexEntry[] = [...matched]
    .sort(byTitleThenId)
    .map((record) => ({ record, route: resolveCanonicalRoute(record) }));
  return { entries, count: entries.length, lens };
}
