import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { EmptyState } from "@/components/state/EmptyState";

/**
 * Products — collection grouping. Collection membership (Product Hierarchy
 * Level 3, PRODUCTS_UNIVERSE_v1.1.md §8: "curated groupings; do not own the
 * canonical record") is a real, catalog-referenced `ClassificationDimension`
 * (M3.4) but not one of the five approved `GlobalLensDimension`s
 * `queryIndex` accepts, and no fixture record currently references a
 * populated collection catalog — the exact same honest limitation M5.2
 * already documented for `/work/collections/[collection]`.
 */
export default async function ProductsCollectionPage({
  params,
}: PageProps<"/products/collections/[collection]">) {
  const { collection } = await params;
  const orientation = orientationForSection({
    district: "products",
    currentLabel: `Collection: ${collection}`,
    currentHref: `/products/collections/${collection}`,
  });

  return (
    <GroupingViewShell heading={`Products — Collection: ${collection}`}>
      <DirectEntryOrientation context={orientation} />
      <EmptyState
        heading="No offers are classified into this collection yet."
        explanation="Collection membership is a real classification dimension, not yet populated for any Products record."
      />
    </GroupingViewShell>
  );
}
