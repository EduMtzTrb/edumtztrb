import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

export default async function LabEntryPage({ params }: PageProps<"/lab/[entry]">) {
  const { entry } = await params;
  const orientation = orientationForSection({
    district: "lab",
    currentLabel: entry,
    currentHref: `/lab/${entry}`,
  });

  return (
    <CanonicalRecordShell
      heading={`Lab — ${entry}`}
      context={<DirectEntryOrientation context={orientation} />}
    />
  );
}
