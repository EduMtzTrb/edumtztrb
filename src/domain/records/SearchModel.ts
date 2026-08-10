/**
 * Search query model — M3.12.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.12 — Search: use the same
 * canonical public set as Index. Results expose, where relevant, title,
 * type, district, match reason, public state, date/period, principal
 * classification, and meaningful relationships."); INFORMATION_ARCHITECTURE.md
 * §8 (Search — "I know approximately what I am looking for. Help me find
 * it," explicitly distinct from Index's "show me what exists"). See
 * docs/implementation/M3.12_SEARCH.md for the full audit, including the
 * direct Search/Index corpus-parity test this task's own §F1 requires.
 *
 * SAME PUBLIC SOURCE AS INDEX — this module consumes M3.6's own
 * `selectPublicComprehensiveView` directly, the exact function
 * `IndexModel.ts` (M3.10) also calls — never a second registry, a second
 * taxonomy, or a Search-specific content set. `resolvePublicRecordSource`
 * (M3.10's `devFixtureSource.ts`) is reused unchanged as the one shared
 * fixture source for both.
 *
 * SMALLEST DETERMINISTIC RANKING — no search-engine dependency was added.
 * Matches are found in one fixed priority order (exact title → title
 * contains → title token → summary → discipline/theme → relationship
 * context) and results are sorted by that rank, then title, then ID —
 * deterministic and explainable, never a black-box score exposed to the
 * visitor as "technical noise" (this task's own explicit instruction).
 */

import type { CanonicalRecordBase, CanonicalRecordId } from "./CanonicalRecord";
import { selectPublicComprehensiveView } from "./LifecycleArchiveModel";
import { resolveCanonicalRoute } from "./RouteResolver";
import type { CanonicalRoute } from "./RouteResolver";

export interface SearchResultEntry {
  readonly record: CanonicalRecordBase;
  readonly route: CanonicalRoute;
  /** Concise, visitor-facing explanation of why this result matched — never a raw internal score. */
  readonly matchReason: string;
}

export interface SearchResult {
  /** The trimmed query actually searched — preserved for the presentation layer (empty-query and no-result states both need it). */
  readonly query: string;
  readonly entries: readonly SearchResultEntry[];
  readonly count: number;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

interface RankedMatch {
  readonly rank: number;
  readonly reason: string;
}

function matchDirect(record: CanonicalRecordBase, queryNorm: string): RankedMatch | undefined {
  const title = normalize(record.title);
  if (title === queryNorm) return { rank: 0, reason: "Exact title match" };
  if (title.includes(queryNorm)) return { rank: 1, reason: "Title match" };

  const titleTokens = title.split(/\s+/);
  const queryTokens = queryNorm.split(/\s+/).filter(Boolean);
  if (
    queryTokens.length > 0 &&
    queryTokens.every((token) => titleTokens.some((t) => t.startsWith(token)))
  ) {
    return { rank: 2, reason: "Title word match" };
  }

  if (record.summary && normalize(record.summary).includes(queryNorm)) {
    return { rank: 3, reason: "Summary match" };
  }

  if ((record.disciplines ?? []).some((d) => normalize(d).includes(queryNorm))) {
    return { rank: 4, reason: "Discipline match" };
  }
  if ((record.themes ?? []).some((t) => normalize(t).includes(queryNorm))) {
    return { rank: 4, reason: "Theme match" };
  }

  return undefined;
}

/** Relationship-context match — the lowest-priority signal, and only against a PUBLIC target's title, so a private/excluded record's title is never exposed through another record's search result (this task's own security boundary, consistent with M3.5/M3.6's documented caution around relationship traversal). */
function matchRelationshipContext(
  record: CanonicalRecordBase,
  queryNorm: string,
  publicRegistry: ReadonlyMap<CanonicalRecordId, CanonicalRecordBase>,
): RankedMatch | undefined {
  for (const relationship of record.relationships ?? []) {
    const target = publicRegistry.get(relationship.targetId);
    if (target && normalize(target.title).includes(queryNorm)) {
      return { rank: 5, reason: `Related to "${target.title}"` };
    }
  }
  return undefined;
}

function byRankThenTitleThenId(
  a: { rank: number; record: CanonicalRecordBase },
  b: { rank: number; record: CanonicalRecordBase },
): number {
  return (
    a.rank - b.rank ||
    a.record.title.localeCompare(b.record.title) ||
    a.record.id.localeCompare(b.record.id)
  );
}

/**
 * Searches the public canonical set for a free-text query. An empty (or
 * whitespace-only) query returns a correctly empty result with `query: ""`
 * — the presentation layer's job to render as a neutral browse invitation,
 * never an error (this task's own §F6).
 */
export function searchRecords(
  records: readonly CanonicalRecordBase[],
  query: string,
): SearchResult {
  const trimmed = query.trim();
  if (trimmed === "") return { query: "", entries: [], count: 0 };

  const publicSet = selectPublicComprehensiveView(records);
  const publicRegistry = new Map(publicSet.map((record) => [record.id, record]));
  const queryNorm = normalize(trimmed);

  const matched: Array<{ record: CanonicalRecordBase; rank: number; reason: string }> = [];
  for (const record of publicSet) {
    const match =
      matchDirect(record, queryNorm) ?? matchRelationshipContext(record, queryNorm, publicRegistry);
    if (match) matched.push({ record, rank: match.rank, reason: match.reason });
  }

  matched.sort(byRankThenTitleThenId);

  const entries: SearchResultEntry[] = matched.map(({ record, reason }) => ({
    record,
    route: resolveCanonicalRoute(record),
    matchReason: reason,
  }));

  return { query: trimmed, entries, count: entries.length };
}
