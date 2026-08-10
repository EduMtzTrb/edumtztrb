import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "about",
  currentLabel: "Recognition",
  currentHref: "/about/recognition",
});

export default function AboutRecognitionPage() {
  return (
    <GroupingViewShell heading="About — Recognition">
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
