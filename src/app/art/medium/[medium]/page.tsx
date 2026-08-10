import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

export default async function ArtMediumPage({ params }: PageProps<"/art/medium/[medium]">) {
  const { medium } = await params;
  const orientation = orientationForSection({
    district: "art",
    currentLabel: `Medium: ${medium}`,
    currentHref: `/art/medium/${medium}`,
  });

  return (
    <GroupingViewShell heading={`Art — Medium: ${medium}`}>
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
