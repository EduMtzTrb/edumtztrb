import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "about",
  currentLabel: "Education",
  currentHref: "/about/education",
});

export default function AboutEducationPage() {
  return (
    <GroupingViewShell heading="About — Education">
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
