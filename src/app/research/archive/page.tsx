import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "research",
  currentLabel: "Archive",
  currentHref: "/research/archive",
});

export default function ResearchArchivePage() {
  return (
    <ComprehensiveViewShell heading="Research — Archive">
      <DirectEntryOrientation context={orientation} />
    </ComprehensiveViewShell>
  );
}
