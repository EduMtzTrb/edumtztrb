import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

export default async function ArtEntryPage({ params }: PageProps<"/art/[entry]">) {
  const { entry } = await params;
  const orientation = orientationForSection({
    district: "art",
    currentLabel: entry,
    currentHref: `/art/${entry}`,
  });

  return (
    <CanonicalRecordShell
      heading={`Art — ${entry}`}
      context={<DirectEntryOrientation context={orientation} />}
    />
  );
}
