import { CuratedViewShell } from "@/components/page-shells/PageShell";
import { PortalRecord } from "@/components/records/PortalRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { selectPublicComprehensiveView } from "@/domain/records/LifecycleArchiveModel";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";

/**
 * Work — Selected. WORK_UNIVERSE_v1.1.md §11: "Selected Work is an
 * editable curatorial state, not a permanent ranking." The `featured`
 * field (M3.1) is the real editorial signal — Claude does not decide which
 * record "is" the selected work; that curatorial judgment belongs to the
 * platform owner. No fixture record is currently marked `featured`, so
 * this view honestly renders empty (WORK_UNIVERSE_v1.1.md §17: "honest
 * neutral states, never invented projects") rather than fabricating a
 * curatorial choice.
 */
const orientation = orientationForSection({
  district: "work",
  currentLabel: "Selected",
  currentHref: "/work/selected",
});

export default function WorkSelectedPage() {
  const selected = selectPublicComprehensiveView(allFixtureRecords, "work").filter(
    (record) => record.featured === true,
  );

  return (
    <CuratedViewShell heading="Work — Selected">
      <DirectEntryOrientation context={orientation} />
      {selected.length === 0 ? (
        <EmptyState
          heading="No work is currently marked as selected."
          explanation="Selected Work is an editable curatorial state, not a permanent ranking — none of the current records has been marked featured yet."
        />
      ) : (
        <div>
          {selected.map((record) => (
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
