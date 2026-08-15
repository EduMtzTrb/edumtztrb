import { CuratedViewShell } from "@/components/page-shells/PageShell";
import { PortalRecord } from "@/components/records/PortalRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { allFixtureDistrictRecords } from "@/domain/records/district-fixtures";
import { selectPublicComprehensiveView } from "@/domain/records/LifecycleArchiveModel";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import type { LabRecord } from "@/domain/records/DistrictExtensions";

/**
 * Lab — Active. LAB_UNIVERSE_v1.1.md §14's approved ten-value experiment
 * lifecycle names `"active"` as one real, literal state — this route
 * filters strictly on `LabExtension.experimentState === "active"`,
 * scoped over `allFixtureDistrictRecords` (the richer set carrying the
 * extension) rather than the base fixture set.
 *
 * DISTINCTION FROM THE OVERVIEW'S "Active Assembly": the overview
 * highlight uses LAB_UNIVERSE_v1.1.md §11's own broader "active OR
 * recently meaningful... experimental significance, not recency"
 * criterion, so it can surface a significant abandoned experiment. This
 * route is the strict literal filter — the one fixture record's real
 * `experimentState` is `"abandoned"`, not `"active"`, so this route
 * honestly renders empty. Both are simultaneously true and consistent:
 * broader editorial significance vs. strict current state, LAB-09's own
 * "state describes condition, not quality or project approval."
 */
const orientation = orientationForSection({
  district: "lab",
  currentLabel: "Active",
  currentHref: "/lab/active",
});

export default function LabActivePage() {
  const labRecords = allFixtureDistrictRecords.filter(
    (record): record is LabRecord => record.ownerDistrict === "lab",
  );
  const active = selectPublicComprehensiveView(labRecords, "lab").filter(
    (record) => (record as LabRecord).extension.experimentState === "active",
  );

  return (
    <CuratedViewShell heading="Lab — Active">
      <DirectEntryOrientation context={orientation} />
      {active.length === 0 ? (
        <EmptyState
          heading="No experiments are currently marked active."
          explanation="Active reflects the district's own real experiment state — none of the current records is presently active (the one existing fixture is honestly recorded as abandoned)."
        />
      ) : (
        <div>
          {active.map((record) => (
            <PortalRecord
              key={record.id}
              title={record.title}
              href={resolveCanonicalRoute(record)}
              orientation={record.summary}
            />
          ))}
        </div>
      )}
    </CuratedViewShell>
  );
}
