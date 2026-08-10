/**
 * Development-only fixture source — M3.10/§D6, reused unchanged by M3.12/§F7.
 *
 * There is still no approved real content corpus and no persistence layer
 * anywhere in this repository. This module is the one safe method for
 * exercising Index/Search against real-shaped data during development and
 * the M3-B integrated human review, without ever letting fixture data reach
 * a production public response:
 *
 *   - the fixture corpus is served ONLY when `?fixture=m3b` is present AND
 *     `process.env.NODE_ENV !== "production"`;
 *   - in every other case (flag absent, or `NODE_ENV === "production"`
 *     regardless of the flag), the public source is an empty array — the
 *     honest state of "no real content exists yet," rendered as Index/
 *     Search's own Empty state, never fabricated filler;
 *   - one fixture source, one taxonomy, shared identically by Index and
 *     Search (this task's own explicit instruction — "do not create a
 *     separate Search fixture corpus").
 */

import { allFixtureRecords } from "./fixtures";
import type { CanonicalRecordBase } from "./CanonicalRecord";

export const FIXTURE_QUERY_PARAM = "fixture";
export const FIXTURE_QUERY_VALUE = "m3b";

export type SearchParamsRecord = { readonly [key: string]: string | string[] | undefined };

export interface PublicRecordSource {
  readonly records: readonly CanonicalRecordBase[];
  /** Whether the M3-B development fixture corpus is currently active — surfaced so a page can label it unmistakably. */
  readonly usingFixtures: boolean;
}

/**
 * Resolves the public record source for a request's search params. Never
 * throws; never returns fixtures in production, regardless of the query
 * string a client sends — the `NODE_ENV` check happens server-side, inside
 * this function, not in a client-trusted flag.
 */
export function resolvePublicRecordSource(searchParams: SearchParamsRecord): PublicRecordSource {
  const flag = searchParams[FIXTURE_QUERY_PARAM];
  const requested = (Array.isArray(flag) ? flag[0] : flag) === FIXTURE_QUERY_VALUE;
  const usingFixtures = requested && process.env.NODE_ENV !== "production";
  return { records: usingFixtures ? allFixtureRecords : [], usingFixtures };
}
