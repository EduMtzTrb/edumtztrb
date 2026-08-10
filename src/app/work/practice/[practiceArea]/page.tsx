import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

export default async function WorkPracticeAreaPage({
  params,
}: PageProps<"/work/practice/[practiceArea]">) {
  const { practiceArea } = await params;
  const orientation = orientationForSection({
    district: "work",
    currentLabel: `Practice: ${practiceArea}`,
    currentHref: `/work/practice/${practiceArea}`,
  });

  return (
    <GroupingViewShell heading={`Work — Practice: ${practiceArea}`}>
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
