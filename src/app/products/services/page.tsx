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
 * Products — Services. Same real `productFamily` plain-filter mechanism as
 * `/products/digital`, filtered to `"service"`. The one extended fixture
 * declares `"digital"`, so this route honestly returns no match.
 */
function isProductsRecord(record: CanonicalRecordBase): record is ProductsRecord {
  return record.ownerDistrict === "products" && "extension" in record;
}

const orientation = orientationForSection({
  district: "products",
  currentLabel: "Services",
  currentHref: "/products/services",
});

export default function ProductsServicesPage() {
  const productRecords = allFixtureDistrictRecords.filter(isProductsRecord);
  const matched = selectPublicComprehensiveView(productRecords, "products").filter(
    (record) => (record as ProductsRecord).extension.productFamily === "service",
  );

  return (
    <GroupingViewShell heading="Products — Services">
      <DirectEntryOrientation context={orientation} />
      {matched.length === 0 ? (
        <EmptyState
          heading="No services exist yet."
          explanation="No public Products record currently declares the service family."
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
