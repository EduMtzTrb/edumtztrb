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
 * Products — Physical. Same real `productFamily` plain-filter mechanism as
 * `/products/digital`, filtered to `"physical"`. The one extended fixture
 * declares `"digital"`, so this route honestly returns no match.
 */
function isProductsRecord(record: CanonicalRecordBase): record is ProductsRecord {
  return record.ownerDistrict === "products" && "extension" in record;
}

const orientation = orientationForSection({
  district: "products",
  currentLabel: "Physical",
  currentHref: "/products/physical",
});

export default function ProductsPhysicalPage() {
  const productRecords = allFixtureDistrictRecords.filter(isProductsRecord);
  const matched = selectPublicComprehensiveView(productRecords, "products").filter(
    (record) => (record as ProductsRecord).extension.productFamily === "physical",
  );

  return (
    <GroupingViewShell heading="Products — Physical">
      <DirectEntryOrientation context={orientation} />
      {matched.length === 0 ? (
        <EmptyState
          heading="No physical offers exist yet."
          explanation="No public Products record currently declares the physical family."
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
