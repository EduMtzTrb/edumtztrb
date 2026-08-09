import type { ReactNode } from "react";

interface PageShellProps {
  pageType: string;
  heading: ReactNode;
  /** Root ("/") has no wrapping district layout, unlike every other route. */
  district?: string;
  /** Visual typography role (M2.2) — independent of the fixed <h1> semantic level. */
  headingClassName: string;
}

/**
 * Shared structural primitive behind the six simple page-shell types.
 * Not exported beyond this module — each page type gets its own named
 * component below so route pages express intent (`<CuratedViewShell />`),
 * not an internal implementation detail.
 */
function PageShell({ pageType, heading, district, headingClassName }: PageShellProps) {
  return (
    <main className="composition" data-page-type={pageType} data-district={district}>
      <header className="field-interval">
        <h1 className={headingClassName}>{heading}</h1>
      </header>
    </main>
  );
}

/**
 * Home. Platform identity, orientation, and district thresholds are provided
 * by the shared application shell's global navigation (M1.4); this shell only
 * marks the page's structural role. PLATFORM_SPECIFICATION_v1.0.md §6.1.
 *
 * Visual role: Display (DESIGN_SYSTEM.md v1.1 §7.1 — "threshold moments" is
 * explicitly listed as Display Voice purpose).
 */
export function WorldThresholdShell({ heading }: { heading: ReactNode }) {
  return (
    <PageShell
      pageType="world-threshold"
      heading={heading}
      district="home"
      headingClassName="type-display"
    />
  );
}

/**
 * /work, /research, /lab, /art, /products, /about.
 * PLATFORM_SPECIFICATION_v1.0.md §6.2.
 */
export function DistrictOverviewShell({ heading }: { heading: ReactNode }) {
  return <PageShell pageType="district-overview" heading={heading} headingClassName="type-h1" />;
}

/**
 * Selected / current / active / featured foreground views.
 * PLATFORM_SPECIFICATION_v1.0.md §6.3.
 */
export function CuratedViewShell({ heading }: { heading: ReactNode }) {
  return <PageShell pageType="curated-view" heading={heading} headingClassName="type-h1" />;
}

/**
 * Archive / all / catalogue views.
 * PLATFORM_SPECIFICATION_v1.0.md §6.4.
 */
export function ComprehensiveViewShell({ heading }: { heading: ReactNode }) {
  return <PageShell pageType="comprehensive-view" heading={heading} headingClassName="type-h1" />;
}

/**
 * Classification/organizational views (practice areas, collections, themes,
 * series, media, Index lenses). Must never own a duplicate canonical record.
 * PLATFORM_SPECIFICATION_v1.0.md §6.5.
 */
export function GroupingViewShell({ heading }: { heading: ReactNode }) {
  return <PageShell pageType="grouping-view" heading={heading} headingClassName="type-h1" />;
}

/**
 * Search, Index, Contact. PLATFORM_SPECIFICATION_v1.0.md §6.10.
 */
export function UtilityPageShell({ heading }: { heading: ReactNode }) {
  return <PageShell pageType="utility-page" heading={heading} headingClassName="type-h1" />;
}
