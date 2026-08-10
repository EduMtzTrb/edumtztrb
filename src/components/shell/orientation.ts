/**
 * Shared orientation model — M3.9.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 ("M3.9 — Breadcrumb/orientation
 * system: deep structures expose current district, content type, parent
 * grouping, active lens/filter where relevant, and routes to overview/
 * comprehensive access. Breadcrumbs themselves are not mandatory if an
 * equivalent semantic mechanism satisfies all obligations."); this task's
 * own §C1–§C5. See docs/implementation/M3.9_BREADCRUMB_ORIENTATION.md.
 *
 * ONE SHARED SEMANTIC MODEL, not per-page text assembly. `OrientationContext`
 * is capable of representing every obligation the authoritative scope
 * lists: current district, content type, current record/section, parent
 * grouping, active lens, active filter scope (a slot only — M3.11 owns the
 * real logic), route to district overview, and route to comprehensive
 * district access. "Relationship to global navigation" is satisfied
 * structurally, not duplicated: `districtOverviewRoute`/`comprehensiveRoute`
 * are read directly from M3.8's own `DISTRICT_NAVIGATION` — the exact same
 * route table `GlobalNav`/`DistrictNav` already render from, never a second,
 * independently maintained route list.
 *
 * NO PREVIOUS/NEXT — this task's own §C5 forbids a universal previous/next
 * sequence; none is modeled here. NO FILTER LOGIC — `activeLens`/
 * `activeFilterScope` are typed slots only; M3.11 implements the real
 * mechanism. NO WIRING INTO REAL PAGES YET — like M3.1's fixtures, this
 * package is tested against fixture records only; wiring into real routes
 * requires real record data, which does not exist before Milestone 7.
 * M3.13 (this batch's Phase G) demonstrates the system end-to-end using
 * the same development-only fixture discipline M3.10/M3.12 use.
 */

import type { CanonicalOwnerDistrict, CanonicalRecordBase } from "@/domain/records/CanonicalRecord";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import { DISTRICT_LABELS, DISTRICT_NAVIGATION } from "./districtNavigation";
import type { DistrictNavRole } from "./districtNavigation";

/**
 * Parent grouping is contextual, never canonical ownership (this task's own
 * §C3). `href` is optional: several grouping families (practice areas,
 * collections, themes, series, medium) are dynamic-only with no static
 * index route (M3.8's own audit) — a parent grouping without a real
 * destination is represented as plain, non-linked text rather than an
 * invented route.
 */
export interface ParentGrouping {
  readonly label: string;
  readonly href?: string;
}

export interface ActiveLens {
  readonly dimension: string;
  readonly value: string;
}

export interface OrientationContext {
  /** Absent for global utilities (Search/Index/Contact), which own no district. */
  readonly district?: CanonicalOwnerDistrict;
  readonly districtLabel?: string;
  readonly districtOverviewRoute?: string;
  /** Absent where the district genuinely has no comprehensive-access route (e.g. About). */
  readonly comprehensiveRoute?: string;
  readonly contentType?: string;
  readonly parentGrouping?: ParentGrouping;
  /** Slot only — M3.11 owns real filter/lens logic. */
  readonly activeLens?: ActiveLens;
  readonly activeFilterScope?: string;
  readonly currentLabel: string;
  readonly currentHref: string;
}

function districtNavItem(district: CanonicalOwnerDistrict, role: DistrictNavRole) {
  return DISTRICT_NAVIGATION[district].find((item) => item.role === role);
}

/** Orientation for a canonical-record deep entry (M3.13's primary use case). */
export function orientationForRecord(
  record: Pick<CanonicalRecordBase, "ownerDistrict" | "slug" | "contentType" | "title">,
  options?: { readonly parentGrouping?: ParentGrouping },
): OrientationContext {
  const overview = districtNavItem(record.ownerDistrict, "overview");
  const comprehensive = districtNavItem(record.ownerDistrict, "comprehensive");
  return {
    district: record.ownerDistrict,
    districtLabel: DISTRICT_LABELS[record.ownerDistrict],
    districtOverviewRoute: overview?.href,
    comprehensiveRoute: comprehensive?.href,
    contentType: record.contentType,
    parentGrouping: options?.parentGrouping,
    currentLabel: record.title,
    currentHref: resolveCanonicalRoute(record),
  };
}

export interface SectionOrientationInput {
  readonly district: CanonicalOwnerDistrict;
  readonly currentLabel: string;
  readonly currentHref: string;
  readonly parentGrouping?: ParentGrouping;
  readonly activeLens?: ActiveLens;
  readonly activeFilterScope?: string;
}

/** Orientation for a district-owned deep structure that isn't itself a canonical record: curated view, grouping, archive/comprehensive view. */
export function orientationForSection(input: SectionOrientationInput): OrientationContext {
  const overview = districtNavItem(input.district, "overview");
  const comprehensive = districtNavItem(input.district, "comprehensive");
  return {
    district: input.district,
    districtLabel: DISTRICT_LABELS[input.district],
    districtOverviewRoute: overview?.href,
    comprehensiveRoute: comprehensive?.href,
    parentGrouping: input.parentGrouping,
    activeLens: input.activeLens,
    activeFilterScope: input.activeFilterScope,
    currentLabel: input.currentLabel,
    currentHref: input.currentHref,
  };
}

export interface UtilityOrientationInput {
  readonly currentLabel: string;
  readonly currentHref: string;
  readonly activeLens?: ActiveLens;
  /** M3.13: a utility route may itself be nested under another utility (e.g. an Index lens route under `/index`) — contextual, never canonical ownership, same as a district's own `parentGrouping`. */
  readonly parentGrouping?: ParentGrouping;
}

/** Orientation for a global utility (Search, Index, an Index lens route, Contact) — owns no district. */
export function orientationForUtility(input: UtilityOrientationInput): OrientationContext {
  return {
    currentLabel: input.currentLabel,
    currentHref: input.currentHref,
    activeLens: input.activeLens,
    parentGrouping: input.parentGrouping,
  };
}

// ---------------------------------------------------------------------
// Breadcrumb trail derivation — a plain, ordered, JSON-serializable list.
// Never links the current page to itself (this task's own §C2); never
// invents a parent when none was supplied (§C3's "do not manufacture
// parent grouping").
// ---------------------------------------------------------------------

export interface BreadcrumbItem {
  readonly label: string;
  /** Omitted for the current item — deliberately not linked to itself. */
  readonly href?: string;
  readonly current?: boolean;
}

export function buildBreadcrumbTrail(context: OrientationContext): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [];

  if (context.district && context.districtLabel) {
    const isDistrictCurrent = context.currentHref === context.districtOverviewRoute;
    trail.push({
      label: context.districtLabel,
      href: isDistrictCurrent ? undefined : context.districtOverviewRoute,
      current: isDistrictCurrent,
    });
    if (isDistrictCurrent) return trail;
  }

  if (context.parentGrouping) {
    const isParentCurrent = context.currentHref === context.parentGrouping.href;
    trail.push({
      label: context.parentGrouping.label,
      href: isParentCurrent ? undefined : context.parentGrouping.href,
      current: isParentCurrent,
    });
    if (isParentCurrent) return trail;
  }

  trail.push({ label: context.currentLabel, current: true });
  return trail;
}
