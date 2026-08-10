/**
 * M4-A development fixture gate — M4.3 §C21.
 *
 * Reuses the exact discipline M3.10/M3.12's `resolvePublicRecordSource`
 * already established for Index/Search (`docs/implementation/M3.10_INDEX.md`
 * "Fixture policy"): a query-parameter flag, checked server-side against
 * `NODE_ENV`, so a client cannot force fixture content into a production
 * response merely by sending the query string. No new route was added —
 * this gates a section of the already-approved `/contact` utility route,
 * per this task's own explicit "do not add an unapproved permanent public
 * route" / "prefer reusing an existing development-only fixture strategy."
 */

export const MOTION_FIXTURE_QUERY_PARAM = "motion-fixture";
export const MOTION_FIXTURE_QUERY_VALUE = "m4a";

export type SearchParamsRecord = { readonly [key: string]: string | string[] | undefined };

export function isMotionFixtureActive(searchParams: SearchParamsRecord): boolean {
  const flag = searchParams[MOTION_FIXTURE_QUERY_PARAM];
  const value = Array.isArray(flag) ? flag[0] : flag;
  return value === MOTION_FIXTURE_QUERY_VALUE && process.env.NODE_ENV !== "production";
}
