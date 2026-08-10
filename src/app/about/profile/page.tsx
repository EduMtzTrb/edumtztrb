import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "about",
  currentLabel: "Profile",
  currentHref: "/about/profile",
});

export default function AboutProfilePage() {
  return (
    <CanonicalRecordShell
      heading="About — Profile"
      context={<DirectEntryOrientation context={orientation} />}
    />
  );
}
