import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "lab",
  currentLabel: "Archive",
  currentHref: "/lab/archive",
});

export default function LabArchivePage() {
  return (
    <ComprehensiveViewShell heading="Lab — Archive">
      <DirectEntryOrientation context={orientation} />
    </ComprehensiveViewShell>
  );
}
