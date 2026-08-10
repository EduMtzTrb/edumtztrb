import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "about",
  currentLabel: "Practice",
  currentHref: "/about/practice",
});

export default function AboutPracticePage() {
  return (
    <GroupingViewShell heading="About — Practice">
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
