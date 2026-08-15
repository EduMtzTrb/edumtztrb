import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { PortalRecord } from "@/components/records/PortalRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { allFixtureDistrictRecords } from "@/domain/records/district-fixtures";
import { selectPublicComprehensiveView } from "@/domain/records/LifecycleArchiveModel";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import type { CanonicalRecordBase } from "@/domain/records/CanonicalRecord";
import type { ProductsRecord } from "@/domain/records/DistrictExtensions";

/**
 * Products — Digital. `productFamily` (PRODUCTS_UNIVERSE_v1.1.md §7) is a
 * real, structural `ProductsExtension.productFamily` field — not an
 * approved `GlobalLensDimension`, so `queryIndex` cannot filter on it.
 * Reuses the same plain-filter pattern M5.4/M5.5 established (Lab's
 * `/lab/active`, Art's `/art/medium/[medium]`) over
 * `allFixtureDistrictRecords`. The one extended fixture record genuinely
 * declares `productFamily: "digital"`, so this route honestly surfaces it.
 */
function isProductsRecord(record: CanonicalRecordBase): record is ProductsRecord {
  return record.ownerDistrict === "products" && "extension" in record;
}

const orientation = orientationForSection({
  district: "products",
  currentLabel: "Digital",
  currentHref: "/products/digital",
});

export default function ProductsDigitalPage() {
  const productRecords = allFixtureDistrictRecords.filter(isProductsRecord);
  const matched = selectPublicComprehensiveView(productRecords, "products").filter(
    (record) => (record as ProductsRecord).extension.productFamily === "digital",
  );

  return (
    <GroupingViewShell heading="Products — Digital">
      <DirectEntryOrientation context={orientation} />
      {matched.length === 0 ? (
        <EmptyState
          heading="No digital offers exist yet."
          explanation="No public Products record currently declares the digital family."
        />
      ) : (
        <div>
          {matched.map((record) => (
            <PortalRecord
              key={record.id}
              title={record.title}
              href={resolveCanonicalRoute(record)}
              orientation={record.summary}
            />
          ))}
        </div>
      )}
    </GroupingViewShell>
  );
}
