/**
 * Canonical-route resolver — M3.3.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.3 — Canonical-route resolver:
 * Guarantee one public canonical route per substantive record; reject
 * identity based on temporary state, technology, campaign, filter, or
 * presentation mode"); INFORMATION_ARCHITECTURE.md §11 (Route Hierarchy);
 * PLATFORM_SPECIFICATION.md §5 (Complete Public Route Architecture). See
 * docs/implementation/M3.3_CANONICAL_ROUTE_RESOLVER.md for the full audit,
 * the reserved-segment table's provenance, and the About route reasoning.
 *
 * ROUTE LAW (IA §11.1 / Platform Spec §5.1, restated): stable,
 * human-readable identity; district name as the first structural level;
 * one canonical route per substantive record; temporary status,
 * technology, date, filter, visual format, campaign, and presentation
 * mode play NO role in canonical identity. This module reads only
 * `ownerDistrict` and `slug` — nothing else on a record can influence its
 * resolved route, which is what makes every invariance test in
 * `RouteResolver.test.ts` structurally guaranteed rather than merely
 * observed.
 *
 * IDENTITY VS. DELIVERY — this module computes route IDENTITY only. It is
 * not, and must never become, the public-delivery authorization boundary;
 * that boundary already exists as `isPubliclyDiscoverable`/
 * `isDirectlyAccessible` in `registry.ts` (M3.1), and stays a fully
 * separate concern here (see `RouteResolver.test.ts`'s "Route identity
 * versus public-delivery authorization" tests). A private record still
 * has a well-defined canonical route; whether a real query layer ever
 * serves that route to a given visitor is a decision this module does not
 * make.
 */

import type { CanonicalOwnerDistrict, CanonicalRecordBase } from "./CanonicalRecord";

export type CanonicalRoute = string & { readonly __brand: "CanonicalRoute" };

/**
 * Static first-path-segment names already owned by each district's own
 * approved route family (IA §11.3–§11.7 / PLATFORM_SPECIFICATION.md
 * §5.3–§5.7), reproduced verbatim from those tables. A canonical record
 * whose slug equals one of these words would be unreachable — Next.js's
 * App Router resolves the static sibling route ahead of the dynamic
 * `[entry]` segment — so it must be rejected here rather than silently
 * masked.
 */
export const RESERVED_ROUTE_SEGMENTS: Readonly<
  Record<Exclude<CanonicalOwnerDistrict, "about">, readonly string[]>
> = {
  work: ["selected", "all", "practice", "collections"],
  research: ["current", "themes", "publications", "writing", "talks", "archive"],
  lab: ["active", "prototypes", "tools", "studies", "archive"],
  art: ["selected", "series", "medium", "exhibitions", "archive"],
  products: ["featured", "collections", "digital", "physical", "services", "archive"],
};

/**
 * About's approved route family (IA §11.8 / PLATFORM_SPECIFICATION.md
 * §5.8) is a small FIXED set of named routes — there is no approved
 * generic `/about/{entry}` (confirmed absent from both the IA and
 * Platform Specification route tables, and absent from the existing
 * `src/app/about/` route tree built by M1.3). IA §13.3's approved
 * content-type vocabulary contains exactly one About-flavored type,
 * "Profile Record," and M3.2's `AboutExtension` deliberately nests all of
 * a person's Experience/Education/Value sub-content inside that one
 * record rather than splitting it into independent canonical records
 * (see docs/implementation/M3.2_DISTRICT_EXTENSIONS.md "About
 * extension"). Combined with About Universe §7's own words — "these
 * layers may live as one continuous district or as linked internal
 * views" — and PLATFORM_SPECIFICATION.md §5.8 — "the implementation may
 * use in-page sections where separate routes add no meaningful
 * independent value... provided... the approved public hierarchy
 * remain[s] intact" — the non-arbitrary reading is: there is exactly one
 * canonical About record, and its one canonical route is `/about/profile`
 * (About Universe §8's own "Entrance: Position"). The other six About
 * routes are approved SECTION views over that same one record, never
 * independent canonical-record destinations. See the implementation
 * report's "About route handling" for the full reasoning trail — this is
 * a resolved reading of existing authority, not an invented one.
 */
const ABOUT_CANONICAL_ROUTE = "/about/profile" as CanonicalRoute;
const ABOUT_CANONICAL_CONTENT_TYPE = "profile-record";

/**
 * Resolves the one canonical public route for a substantive record, from
 * identity fields alone. Throws when the record's slug would collide with
 * a reserved static route segment, or when an About-owned record does not
 * carry the one content type this module knows how to route (surfacing an
 * unresolved case explicitly rather than guessing a route for it).
 */
export function resolveCanonicalRoute(
  record: Pick<CanonicalRecordBase, "ownerDistrict" | "slug" | "contentType">,
): CanonicalRoute {
  if (record.ownerDistrict === "about") {
    if (record.contentType !== ABOUT_CANONICAL_CONTENT_TYPE) {
      throw new Error(
        `About-owned record has content type "${record.contentType}", not "${ABOUT_CANONICAL_CONTENT_TYPE}" — ` +
          `no approved route mapping exists for this content type yet; this must be resolved explicitly, not guessed.`,
      );
    }
    return ABOUT_CANONICAL_ROUTE;
  }

  const slug = String(record.slug);
  const reserved = RESERVED_ROUTE_SEGMENTS[record.ownerDistrict];
  if (reserved.includes(slug)) {
    throw new Error(
      `Canonical slug "${slug}" collides with a reserved "${record.ownerDistrict}" route segment (${reserved.join(", ")}) — choose a different slug`,
    );
  }

  return `/${record.ownerDistrict}/${slug}` as CanonicalRoute;
}

/**
 * Builds a route → record map across a record set, throwing on the first
 * duplicate canonical route encountered — the registry-level mirror of
 * `resolveCanonicalRoute`'s per-record reserved-segment check (Gate M3's
 * "one canonical record ID → one canonical route" / "two substantive
 * records → same canonical route is rejected"). Distinct owner districts
 * never collide, since the district name is always the route's first
 * segment; two About-owned records always collide, since both resolve to
 * the same fixed `/about/profile`.
 */
export function buildCanonicalRouteRegistry(
  records: readonly CanonicalRecordBase[],
): Map<CanonicalRoute, CanonicalRecordBase> {
  const registry = new Map<CanonicalRoute, CanonicalRecordBase>();
  for (const record of records) {
    const route = resolveCanonicalRoute(record);
    const existing = registry.get(route);
    if (existing) {
      throw new Error(
        `Duplicate canonical route "${route}" — both "${existing.id}" and "${record.id}" resolve to it`,
      );
    }
    registry.set(route, record);
  }
  return registry;
}
