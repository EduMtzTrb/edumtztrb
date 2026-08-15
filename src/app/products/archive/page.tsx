import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Products — Archive. Comprehensive access, documentary rather than
 * promotional (PRODUCTS_UNIVERSE_v1.1.md §10: "Product Archive
 * (documentary, not promotional)"). Reuses M3.10's `IndexResults` +
 * `queryIndex(records, {dimension:"district", value:"products"})`
 * directly — the same mechanism every other district's archive already
 * provides. `usingFixtures` is honestly `true`. Two real fixtures exist
 * (`fixture-product-offer`, `fixture-product-edition`), so this route
 * genuinely demonstrates a multi-record catalogue, unlike the other
 * districts' single-fixture archives.
 */
const orientation = orientationForSection({
  district: "products",
  currentLabel: "Archive",
  currentHref: "/products/archive",
});

export default function ProductsArchivePage() {
  const result = queryIndex(allFixtureRecords, { dimension: "district", value: "products" });

  return (
    <ComprehensiveViewShell heading="Products — Archive">
      <DirectEntryOrientation context={orientation} />
      <p className="type-annotation">
        Complete indexed access — every publicly discoverable Products record, scannable by content
        type and date.
      </p>
      <IndexResults result={result} usingFixtures />
    </ComprehensiveViewShell>
  );
}
