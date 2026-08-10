import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

export default async function ResearchThemePage({ params }: PageProps<"/research/themes/[theme]">) {
  const { theme } = await params;
  const orientation = orientationForSection({
    district: "research",
    currentLabel: `Theme: ${theme}`,
    currentHref: `/research/themes/${theme}`,
  });

  return (
    <GroupingViewShell heading={`Research — Theme: ${theme}`}>
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
