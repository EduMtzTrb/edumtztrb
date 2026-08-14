/**
 * Development fixture gate — M5.0 Part B, mirroring the exact discipline
 * `src/lib/motion/fixtureGate.ts` already established for M4-A/M4-B/M4-C:
 * a query-parameter flag, checked server-side against `NODE_ENV`, so a
 * client cannot force fixture content into a production response merely by
 * sending the query string. No new route is added — this gates one more
 * mutually exclusive section of the already-approved `/contact` utility
 * route (`?composition-fixture=m5`).
 *
 * A separate query param from `motion-fixture` is used deliberately: this
 * fixture demonstrates the Design System's shared compositional grammar
 * (DESIGN_SYSTEM.md §11), not an Animation System motion role — reusing
 * `motion-fixture`'s name for a non-motion concept would misdescribe it.
 */

export const DISTRICT_COMPOSITION_FIXTURE_QUERY_PARAM = "composition-fixture";
export const DISTRICT_COMPOSITION_FIXTURE_QUERY_VALUE = "m5";

export type SearchParamsRecord = { readonly [key: string]: string | string[] | undefined };

export function isDistrictCompositionFixtureActive(searchParams: SearchParamsRecord): boolean {
  if (process.env.NODE_ENV === "production") return false;
  const flag = searchParams[DISTRICT_COMPOSITION_FIXTURE_QUERY_PARAM];
  const value = Array.isArray(flag) ? flag[0] : flag;
  return value === DISTRICT_COMPOSITION_FIXTURE_QUERY_VALUE;
}
