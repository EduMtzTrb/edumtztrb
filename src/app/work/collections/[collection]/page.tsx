import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { EmptyState } from "@/components/state/EmptyState";

/**
 * Work — collection grouping. WORK_UNIVERSE_v1.1.md §11: collections
 * "reveal a theme, method, sector, or professional narrative without
 * replacing canonical project identity." Collection membership is a
 * catalog-referenced classification term (M3.4's `ClassificationModel.ts`,
 * `ClassificationDimension = "collection"`) — a real dimension, but not
 * one of the five approved global lenses `queryIndex` accepts, and no
 * fixture record currently references a real collection catalog entry (no
 * collection catalog is populated yet). Rather than invent collection
 * membership or query a catalog that does not exist, this route stays
 * honest: a real route, real orientation, and a real empty state — never a
 * fabricated collection (WORK_UNIVERSE_v1.1.md §17).
 */
export default async function WorkCollectionPage({
  params,
}: PageProps<"/work/collections/[collection]">) {
  const { collection } = await params;
  const orientation = orientationForSection({
    district: "work",
    currentLabel: collection,
    currentHref: `/work/collections/${collection}`,
  });

  return (
    <GroupingViewShell heading={`Work — Collection: ${collection}`}>
      <DirectEntryOrientation context={orientation} />
      <EmptyState
        heading="No records are classified into this collection yet."
        explanation="Collection membership is a real classification dimension, not yet populated for any Work record."
      />
    </GroupingViewShell>
  );
}
