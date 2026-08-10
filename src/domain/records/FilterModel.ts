/**
 * Filter model — M3.11.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.11 — Filters: implement visible
 * active state, reset, accessible controls, persistence where useful, and
 * intentional recomposition."). See docs/implementation/M3.11_FILTERS.md
 * for the full audit, including why plain URL links (not M2.6's
 * button-based `FilterToggle`/`RemovableFilter`) were chosen as the
 * control mechanism.
 *
 * FILTER, NOT LENS, NOT SORT — this task's own §E1: a filter narrows a
 * known set (membership); it never changes route/ownership/order-only
 * semantics. Every function below only ever *removes* entries from an
 * already-resolved `IndexResult`'s entries — it never adds, reorders
 * (beyond what `IndexModel.ts` already ordered), or mutates a record.
 *
 * URL-FIRST PERSISTENCE (§E3) — criteria live entirely in query-string
 * parameters (`?district=...&contentType=...`), never in canonical-record
 * identity and never in a client-only store. `buildToggleHref`/
 * `buildRemoveHref`/`buildResetHref` are pure functions computing a new,
 * real, shareable URL from the current one — no client-side JavaScript is
 * required for filtering to work at all (a plain `<a href>` is sufficient).
 */

import type { CanonicalContentType, CanonicalOwnerDistrict } from "./CanonicalRecord";
import type { IndexEntry } from "./IndexModel";

export type SearchParamsRecord = { readonly [key: string]: string | string[] | undefined };

export const FILTER_PARAM_KEYS = ["district", "contentType"] as const;
export type FilterParamKey = (typeof FILTER_PARAM_KEYS)[number];

export interface FilterCriteria {
  readonly district?: CanonicalOwnerDistrict;
  readonly contentType?: CanonicalContentType;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Reads only the known filter keys — every other query parameter (e.g. `fixture`) is deliberately ignored here and left untouched by every href-building helper below. */
export function parseFilterCriteria(searchParams: SearchParamsRecord): FilterCriteria {
  return {
    district: firstValue(searchParams.district) as CanonicalOwnerDistrict | undefined,
    contentType: firstValue(searchParams.contentType) as CanonicalContentType | undefined,
  };
}

export function isFilterActive(criteria: FilterCriteria): boolean {
  return criteria.district !== undefined || criteria.contentType !== undefined;
}

/** The active criteria as ordered [key, value] pairs — the data a caller renders as removable chips. */
export function activeCriteriaEntries(criteria: FilterCriteria): Array<[FilterParamKey, string]> {
  const entries: Array<[FilterParamKey, string]> = [];
  if (criteria.district) entries.push(["district", criteria.district]);
  if (criteria.contentType) entries.push(["contentType", criteria.contentType]);
  return entries;
}

/** A human-readable description of the active criteria (e.g. "district: work, contentType: project"), or `undefined` when no filter is active — used to distinguish "no match for this filter" from "nothing exists yet" in the results presentation layer. */
export function describeCriteria(criteria: FilterCriteria): string | undefined {
  const entries = activeCriteriaEntries(criteria);
  if (entries.length === 0) return undefined;
  return entries.map(([key, value]) => `${key}: ${value}`).join(", ");
}

function matchesCriteria(entry: IndexEntry, criteria: FilterCriteria): boolean {
  if (criteria.district && entry.record.ownerDistrict !== criteria.district) return false;
  if (criteria.contentType && entry.record.contentType !== criteria.contentType) return false;
  return true;
}

/** Narrows an already-resolved Index entry list — combinable (AND) criteria, never widening, never reordering. */
export function applyFilterCriteria(
  entries: readonly IndexEntry[],
  criteria: FilterCriteria,
): IndexEntry[] {
  return entries.filter((entry) => matchesCriteria(entry, criteria));
}

/** Distinct districts present in the given (already lens-scoped) entries — the only options a filter should ever offer (§E2: "only expose filters useful to the current view"). */
export function distinctDistricts(entries: readonly IndexEntry[]): CanonicalOwnerDistrict[] {
  return [...new Set(entries.map((entry) => entry.record.ownerDistrict))].sort();
}

/** Distinct content types present in the given (already lens-scoped) entries. */
export function distinctContentTypes(entries: readonly IndexEntry[]): CanonicalContentType[] {
  return [...new Set(entries.map((entry) => entry.record.contentType))].sort();
}

// ---------------------------------------------------------------------
// URL construction — pure, given the current pathname and raw
// searchParams. Every non-filter parameter (e.g. `fixture`) is preserved
// untouched, so filtering never disturbs the development-fixture flag or
// any other future non-filter parameter.
// ---------------------------------------------------------------------

function toURLSearchParams(searchParams: SearchParamsRecord): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    const first = firstValue(value);
    if (first !== undefined) params.set(key, first);
  }
  return params;
}

function withParams(pathname: string, params: URLSearchParams): string {
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

/** The href that applies (or, if already active, removes) one criterion value — a plain toggle expressed as a URL. */
export function buildToggleHref(
  pathname: string,
  searchParams: SearchParamsRecord,
  key: FilterParamKey,
  value: string,
): string {
  const params = toURLSearchParams(searchParams);
  if (params.get(key) === value) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
  return withParams(pathname, params);
}

/** The href that removes exactly one active criterion, leaving every other parameter (including other filters and `fixture`) untouched. */
export function buildRemoveHref(
  pathname: string,
  searchParams: SearchParamsRecord,
  key: FilterParamKey,
): string {
  const params = toURLSearchParams(searchParams);
  params.delete(key);
  return withParams(pathname, params);
}

/** The href that clears every filter criterion while preserving every non-filter parameter (e.g. `fixture`) — "restore the known source set" without losing utility identity (§E5). */
export function buildResetHref(pathname: string, searchParams: SearchParamsRecord): string {
  const params = toURLSearchParams(searchParams);
  for (const key of FILTER_PARAM_KEYS) params.delete(key);
  return withParams(pathname, params);
}
