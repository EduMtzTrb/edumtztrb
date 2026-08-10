import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

export default async function ArtSeriesPage({ params }: PageProps<"/art/series/[series]">) {
  const { series } = await params;
  const orientation = orientationForSection({
    district: "art",
    currentLabel: `Series: ${series}`,
    currentHref: `/art/series/${series}`,
  });

  return (
    <GroupingViewShell heading={`Art — Series: ${series}`}>
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
