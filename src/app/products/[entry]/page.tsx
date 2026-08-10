import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";

export default async function ProductsEntryPage({ params }: PageProps<"/products/[entry]">) {
  const { entry } = await params;
  const orientation = orientationForSection({
    district: "products",
    currentLabel: entry,
    currentHref: `/products/${entry}`,
  });

  return (
    <CanonicalRecordShell
      heading={`Products — ${entry}`}
      context={<DirectEntryOrientation context={orientation} />}
    />
  );
}
