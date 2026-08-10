/**
 * Development fixture gate — M4.3 §C21, extended additively by M4.4 §A11
 * for the M4-B fixture.
 *
 * Reuses the exact discipline M3.10/M3.12's `resolvePublicRecordSource`
 * already established for Index/Search (`docs/implementation/M3.10_INDEX.md`
 * "Fixture policy"): a query-parameter flag, checked server-side against
 * `NODE_ENV`, so a client cannot force fixture content into a production
 * response merely by sending the query string. No new route was added —
 * this gates two mutually exclusive sections of the already-approved
 * `/contact` utility route (`?motion-fixture=m4a` for M4-A,
 * `?motion-fixture=m4b` for M4-B), per this task's own explicit "do not
 * add an unapproved permanent public route" / "prefer reusing an existing
 * development-only fixture strategy."
 */

export const MOTION_FIXTURE_QUERY_PARAM = "motion-fixture";
export const MOTION_FIXTURE_QUERY_VALUE = "m4a";
/** M4.4 §A11 — reuses this same gate, additively, for the M4-B Focus/Return fixture. */
export const FOCUS_FIXTURE_QUERY_VALUE = "m4b";

export type SearchParamsRecord = { readonly [key: string]: string | string[] | undefined };

function activeFixtureFlag(searchParams: SearchParamsRecord): string | undefined {
  if (process.env.NODE_ENV === "production") return undefined;
  const flag = searchParams[MOTION_FIXTURE_QUERY_PARAM];
  return Array.isArray(flag) ? flag[0] : flag;
}

export function isMotionFixtureActive(searchParams: SearchParamsRecord): boolean {
  return activeFixtureFlag(searchParams) === MOTION_FIXTURE_QUERY_VALUE;
}

export function isFocusFixtureActive(searchParams: SearchParamsRecord): boolean {
  return activeFixtureFlag(searchParams) === FOCUS_FIXTURE_QUERY_VALUE;
}
