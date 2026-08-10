import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "work",
  currentLabel: "All Work",
  currentHref: "/work/all",
});

export default function WorkAllPage() {
  return (
    <ComprehensiveViewShell heading="Work — All">
      <DirectEntryOrientation context={orientation} />
    </ComprehensiveViewShell>
  );
}
