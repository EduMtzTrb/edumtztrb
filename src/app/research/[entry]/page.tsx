import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

export default async function ResearchEntryPage({ params }: PageProps<"/research/[entry]">) {
  const { entry } = await params;
  const orientation = orientationForSection({
    district: "research",
    currentLabel: entry,
    currentHref: `/research/${entry}`,
  });

  return (
    <CanonicalRecordShell
      heading={`Research — ${entry}`}
      context={<DirectEntryOrientation context={orientation} />}
    />
  );
}
