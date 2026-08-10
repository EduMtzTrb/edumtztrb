import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { RecordReturnControl } from "@/components/return/RecordReturnControl";
import { RecordPassageArrival } from "@/components/return/RecordPassageArrival";

export default async function WorkEntryPage({ params }: PageProps<"/work/[entry]">) {
  const { entry } = await params;
  const orientation = orientationForSection({
    district: "work",
    currentLabel: entry,
    currentHref: `/work/${entry}`,
  });
  const heading = `Work — ${entry}`;

  return (
    <RecordPassageArrival entrySlug={entry} recordTitle={heading}>
      <CanonicalRecordShell
        heading={heading}
        context={<DirectEntryOrientation context={orientation} />}
        continuation={<RecordReturnControl entrySlug={entry} />}
      />
    </RecordPassageArrival>
  );
}
