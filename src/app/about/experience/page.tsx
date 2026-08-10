import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "about",
  currentLabel: "Experience",
  currentHref: "/about/experience",
});

export default function AboutExperiencePage() {
  return (
    <GroupingViewShell heading="About — Experience">
      <DirectEntryOrientation context={orientation} />
    </GroupingViewShell>
  );
}
