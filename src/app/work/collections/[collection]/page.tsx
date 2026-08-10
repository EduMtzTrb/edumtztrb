import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

export default async function WorkCollectionPage({
  params,
}: PageProps<"/work/collections/[collection]">) {
  const { collection } = await params;
  const orientation = orientationForSection({
    district: "work",
    currentLabel: `Collection: ${collection}`,
    currentHref: `/work/collections/${collection}`,
  });

  return (
    <GroupingViewShell heading={`Work — Collection: ${collection}`}>
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
