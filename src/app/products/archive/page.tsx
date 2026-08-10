import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

const orientation = orientationForSection({
  district: "products",
  currentLabel: "Archive",
  currentHref: "/products/archive",
});

export default function ProductsArchivePage() {
  return (
    <ComprehensiveViewShell heading="Products — Archive">
      <DirectEntryOrientation context={orientation} />
    </ComprehensiveViewShell>
  );
}
