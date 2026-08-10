import { CuratedViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "about",
  currentLabel: "Current Focus",
  currentHref: "/about/current-focus",
});

export default function AboutCurrentFocusPage() {
  return (
    <CuratedViewShell heading="About — Current Focus">
      <DirectEntryOrientation context={orientation} />
    </CuratedViewShell>
  );
}
