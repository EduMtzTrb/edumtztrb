import { DistrictOverviewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "about",
  currentLabel: "About",
  currentHref: "/about",
});

export default function AboutPage() {
  return (
    <DistrictOverviewShell heading="About">
      <DirectEntryOrientation context={orientation} />
    </DistrictOverviewShell>
  );
}
