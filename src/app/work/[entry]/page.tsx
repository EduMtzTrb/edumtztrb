import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { RecordReturnControl } from "@/components/return/RecordReturnControl";

export default async function WorkEntryPage({ params }: PageProps<"/work/[entry]">) {
  const { entry } = await params;
  const orientation = orientationForSection({
    district: "work",
    currentLabel: entry,
    currentHref: `/work/${entry}`,
  });

  return (
    <CanonicalRecordShell
      heading={`Work — ${entry}`}
      context={<DirectEntryOrientation context={orientation} />}
      continuation={<RecordReturnControl entrySlug={entry} />}
    />
  );
}
