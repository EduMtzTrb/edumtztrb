import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "about",
  currentLabel: "Capabilities",
  currentHref: "/about/capabilities",
});

export default function AboutCapabilitiesPage() {
  return (
    <GroupingViewShell heading="About — Capabilities">
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
