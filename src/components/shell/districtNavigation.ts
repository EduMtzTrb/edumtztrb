/**
 * District navigation configuration — M3.8.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.8 — District navigation:
 * follow shared conceptual order: 1. overview/threshold; 2.
 * curated/current; 3. groupings/lenses; 4. comprehensive archive/
 * catalogue/Index; 5. Search where relevant. District terminology may
 * vary. Shared logic may not."); PLATFORM_SPECIFICATION.md §5.3–§5.8 (the
 * exact per-district route tables this configuration is transcribed from
 * — no route below was invented). See
 * docs/implementation/M3.8_DISTRICT_NAVIGATION.md for the full audit.
 *
 * ONE SHARED SYSTEM, SIX DATA SETS — this is the single configuration
 * `DistrictNav.tsx` renders; there are not six incompatible navigation
 * components. `DistrictNavRole` encodes the shared conceptual order once;
 * each district's own item list assigns its own approved labels/routes to
 * those roles.
 *
 * ONLY REAL, STATIC ROUTES — every `href` below is one of the 53 routes
 * already approved and built by M1.3 (`PLATFORM_SPECIFICATION.md` §5).
 * Several district route families are dynamic-only with no static index
 * page (`/work/practice/{practice-area}`, `/work/collections/{collection}`,
 * `/research/themes/{theme}`, `/art/series/{series}`, `/art/medium/
 * {medium}`, `/products/collections/{collection}`) — per this task's own
 * instruction ("do not invent unapproved routes to make every district
 * symmetrical"), those grouping families are deliberately NOT represented
 * as a top-level district-nav destination here; they remain reachable
 * contextually (from a record's own metadata/relationships) once real
 * records exist. No "Search" item was added to any district — global
 * Search (`/search`) already provides that access, and no district
 * specification requires a separate local search route.
 */

import type { CanonicalOwnerDistrict } from "@/domain/records/CanonicalRecord";

/** The shared conceptual order (IMPLEMENTATION_PLAN.md §7's own five-step list, minus "Search" — see module header). */
export type DistrictNavRole = "overview" | "curated" | "grouping" | "comprehensive" | "section";

export interface DistrictNavItem {
  readonly label: string;
  readonly href: string;
  readonly role: DistrictNavRole;
}

export const DISTRICT_LABELS: Readonly<Record<CanonicalOwnerDistrict, string>> = {
  work: "Work",
  research: "Research",
  lab: "Lab",
  art: "Art",
  products: "Products",
  about: "About",
};

/**
 * `about` deliberately does not follow the overview/curated/grouping/
 * comprehensive order — its own approved route family (Platform
 * Specification §5.8) is a fixed profile/practice/experience/education/
 * capabilities/recognition/current-focus section structure, not a
 * curated-vs-archive distinction. Modeling it with the same five-role
 * `curated`/`grouping`/`comprehensive` labels would misrepresent it as
 * something it isn't — this task's own explicit instruction not to force
 * false cross-district symmetry.
 */
export const DISTRICT_NAVIGATION: Readonly<
  Record<CanonicalOwnerDistrict, readonly DistrictNavItem[]>
> = {
  work: [
    { label: "Overview", href: "/work", role: "overview" },
    { label: "Selected", href: "/work/selected", role: "curated" },
    { label: "All Work", href: "/work/all", role: "comprehensive" },
  ],
  research: [
    { label: "Overview", href: "/research", role: "overview" },
    { label: "Current", href: "/research/current", role: "curated" },
    { label: "Publications", href: "/research/publications", role: "grouping" },
    { label: "Writing", href: "/research/writing", role: "grouping" },
    { label: "Talks", href: "/research/talks", role: "grouping" },
    { label: "Archive", href: "/research/archive", role: "comprehensive" },
  ],
  lab: [
    { label: "Overview", href: "/lab", role: "overview" },
    { label: "Active", href: "/lab/active", role: "curated" },
    { label: "Prototypes", href: "/lab/prototypes", role: "grouping" },
    { label: "Tools", href: "/lab/tools", role: "grouping" },
    { label: "Studies", href: "/lab/studies", role: "grouping" },
    { label: "Archive", href: "/lab/archive", role: "comprehensive" },
  ],
  art: [
    { label: "Overview", href: "/art", role: "overview" },
    { label: "Selected", href: "/art/selected", role: "curated" },
    { label: "Exhibitions", href: "/art/exhibitions", role: "grouping" },
    { label: "Archive", href: "/art/archive", role: "comprehensive" },
  ],
  products: [
    { label: "Overview", href: "/products", role: "overview" },
    { label: "Featured", href: "/products/featured", role: "curated" },
    { label: "Digital", href: "/products/digital", role: "grouping" },
    { label: "Physical", href: "/products/physical", role: "grouping" },
    { label: "Services", href: "/products/services", role: "grouping" },
    { label: "Archive", href: "/products/archive", role: "comprehensive" },
  ],
  about: [
    { label: "Overview", href: "/about", role: "overview" },
    { label: "Profile", href: "/about/profile", role: "section" },
    { label: "Practice", href: "/about/practice", role: "section" },
    { label: "Experience", href: "/about/experience", role: "section" },
    { label: "Education", href: "/about/education", role: "section" },
    { label: "Capabilities", href: "/about/capabilities", role: "section" },
    { label: "Recognition", href: "/about/recognition", role: "section" },
    { label: "Current Focus", href: "/about/current-focus", role: "section" },
  ],
};
