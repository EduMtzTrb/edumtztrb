import { CuratedViewShell } from "@/components/page-shells/PageShell";
import { PortalRecord } from "@/components/records/PortalRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { selectPublicComprehensiveView } from "@/domain/records/LifecycleArchiveModel";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";

/**
 * Products — Featured. Filters on `featured === true` — the same editorial
 * curatorial mechanism `/work/selected` and `/art/selected` use (the route
 * name "Featured" itself signals an editorial pick, the same semantic
 * family as "Selected," distinct from Research's state-based "Current" or
 * Lab's state-based "Active"). PRODUCTS_UNIVERSE_v1.1.md §6: "Curation
 * before volume — the homepage never attempts to expose the entire
 * catalogue." Neither of the two current fixtures is marked featured, so
 * this page honestly renders `EmptyState`.
 */
const orientation = orientationForSection({
  district: "products",
  currentLabel: "Featured",
  currentHref: "/products/featured",
});

export default function ProductsFeaturedPage() {
  const featured = selectPublicComprehensiveView(allFixtureRecords, "products").filter(
    (record) => record.featured === true,
  );

  return (
    <CuratedViewShell heading="Products — Featured">
      <DirectEntryOrientation context={orientation} />
      {featured.length === 0 ? (
        <EmptyState
          heading="No offer is currently marked as featured."
          explanation="Featured is an editable curatorial state, not a permanent ranking — neither current record has been marked featured yet."
        />
      ) : (
        <div>
          {featured.map((record) => (
            <PortalRecord
              key={record.id}
              title={record.title}
              href={resolveCanonicalRoute(record)}
              orientation={record.summary}
            />
          ))}
        </div>
      )}
    </CuratedViewShell>
  );
}
