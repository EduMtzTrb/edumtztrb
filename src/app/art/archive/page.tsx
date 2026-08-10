import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "art",
  currentLabel: "Archive",
  currentHref: "/art/archive",
});

export default function ArtArchivePage() {
  return (
    <ComprehensiveViewShell heading="Art — Archive">
      <DirectEntryOrientation context={orientation} />
    </ComprehensiveViewShell>
  );
}
