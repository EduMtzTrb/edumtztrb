import { ActionLink } from "@/components/controls/ActionLink";
import { Breadcrumb } from "./Breadcrumb";
import { buildBreadcrumbTrail, type OrientationContext } from "./orientation";
import { DISTRICT_NAVIGATION } from "./districtNavigation";

/**
 * Direct-entry orientation — M3.13. Composes M3.9's own orientation model
 * and `Breadcrumb` component directly — no second breadcrumb
 * implementation exists anywhere (this task's own §G5).
 *
 * DIRECT ENTRY LAW (§G1) — assumes zero prior session context: every piece
 * of information rendered here comes from the route itself (district,
 * current label/route, and — only when genuinely known — parent grouping),
 * never from a fabricated "previous position."
 *
 * NO FAKE RETURN HISTORY (§G2) — the "next actions" list below offers only
 * truthful, always-valid structural destinations (district overview,
 * comprehensive access when the district has one, Index, Search) — never
 * "Return to where you came from," which would imply session history that
 * does not exist. M4.6 owns real Return/spatial-memory restoration.
 */
export function DirectEntryOrientation({ context }: { context: OrientationContext }) {
  const trail = buildBreadcrumbTrail(context);
  const comprehensiveLabel = context.district
    ? DISTRICT_NAVIGATION[context.district].find((item) => item.role === "comprehensive")?.label
    : undefined;

  const showOverviewAction =
    context.districtOverviewRoute && context.districtOverviewRoute !== context.currentHref;
  const showComprehensiveAction =
    context.comprehensiveRoute && context.comprehensiveRoute !== context.currentHref;

  return (
    <div className="direct-entry-orientation">
      <Breadcrumb trail={trail} />
      <ul className="direct-entry-actions">
        {showOverviewAction && (
          <li>
            <ActionLink kind="utility" href={context.districtOverviewRoute!}>
              {context.districtLabel} Overview
            </ActionLink>
          </li>
        )}
        {showComprehensiveAction && (
          <li>
            <ActionLink kind="utility" href={context.comprehensiveRoute!}>
              {comprehensiveLabel ?? "Comprehensive Access"}
            </ActionLink>
          </li>
        )}
        <li>
          <ActionLink kind="utility" href="/index">
            Index
          </ActionLink>
        </li>
        <li>
          <ActionLink kind="utility" href="/search">
            Search
          </ActionLink>
        </li>
      </ul>
    </div>
  );
}
