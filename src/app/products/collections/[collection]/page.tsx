import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

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
    </GroupingViewShell>
  );
}
