import { CuratedViewShell } from "@/components/page-shells/PageShell";
import { PortalRecord } from "@/components/records/PortalRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { selectPublicComprehensiveView } from "@/domain/records/LifecycleArchiveModel";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";

/**
 * Research — Current. RESEARCH_UNIVERSE_v1.1.md §7: "Active Edge — research
 * lines currently receiving attention. Not a news feed — the active edge of
 * the knowledge structure."
 *
 * DISTINCTION FROM WORK'S `/work/selected` (see docs/implementation/
 * M5.3_RESEARCH.md "Research vs Work" for the full reasoning): Work's
 * Selected is an *editorial* curatorial state (`featured === true`) — a
 * judgment only the platform owner can make. Research's Current is a
 * *state-based* read of the district's own real activity (`lifecycle ===
 * "active"`) — RESEARCH_UNIVERSE_v1.1.md's own text ties "current" to
 * activity, not editorial selection, and PLATFORM_SPECIFICATION.md §5.3–5.4
 * deliberately names this route "Current," not "Selected." No curatorial
 * judgment is fabricated either way — Research's honesty mechanism is
 * simply a different real field.
 */
const orientation = orientationForSection({
  district: "research",
  currentLabel: "Current",
  currentHref: "/research/current",
});

export default function ResearchCurrentPage() {
  const current = selectPublicComprehensiveView(allFixtureRecords, "research").filter(
    (record) => record.lifecycle === "active",
  );

  return (
    <CuratedViewShell heading="Research — Current">
      <DirectEntryOrientation context={orientation} />
      {current.length === 0 ? (
        <EmptyState
          heading="No research lines are currently marked active."
          explanation="Current reflects the district's own real activity state, not an editorial ranking — none of the current records is presently active."
        />
      ) : (
        <div>
          {current.map((record) => (
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
