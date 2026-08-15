import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { PortalRecord } from "@/components/records/PortalRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { allFixtureDistrictRecords } from "@/domain/records/district-fixtures";
import { selectPublicComprehensiveView } from "@/domain/records/LifecycleArchiveModel";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import type { CanonicalRecordBase } from "@/domain/records/CanonicalRecord";
import type { ArtRecord } from "@/domain/records/DistrictExtensions";

/**
 * Art — medium grouping. `medium` (ART_UNIVERSE_v1.1.md §12: "supports
 * filtering; it is not the district's governing hierarchy") is a real
 * `ArtExtension.medium` free-text field, not a controlled classification
 * value or an approved `GlobalLensDimension` — `queryIndex` cannot filter
 * on it. Reuses the same plain-filter pattern M5.4 established for Lab's
 * `/lab/active` (a real extension field, filtered directly over
 * `allFixtureDistrictRecords`) rather than inventing a lens value that
 * doesn't exist.
 */
function isArtRecord(record: CanonicalRecordBase): record is ArtRecord {
  return record.ownerDistrict === "art" && "extension" in record;
}

export default async function ArtMediumPage({ params }: PageProps<"/art/medium/[medium]">) {
  const { medium } = await params;
  const artRecords = allFixtureDistrictRecords.filter(isArtRecord);
  const matched = selectPublicComprehensiveView(artRecords, "art").filter(
    (record) => (record as ArtRecord).extension.medium === medium,
  );
  const orientation = orientationForSection({
    district: "art",
    currentLabel: `Medium: ${medium}`,
    currentHref: `/art/medium/${medium}`,
  });

  return (
    <GroupingViewShell heading={`Art — Medium: ${medium}`}>
      <DirectEntryOrientation context={orientation} />
      {matched.length === 0 ? (
        <EmptyState
          heading="No records match this medium."
          explanation="No public Art record currently declares this medium."
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
