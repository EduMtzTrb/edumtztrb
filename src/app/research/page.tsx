import { DistrictOverviewShell } from "@/components/page-shells/PageShell";
import { DistrictField } from "@/components/composition/DistrictField";
import { PortalRecord } from "@/components/records/PortalRecord";
import { RecordTrace } from "@/components/trace/Trace";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { fixtureResearchRecordWithExtension } from "@/domain/records/district-fixtures";
import { createRecordRegistry } from "@/domain/records/registry";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import { isPubliclyDiscoverable } from "@/domain/records/registry";

/**
 * Research — M5.3 district overview ("Architectural Observatory and Living
 * Archive," RESEARCH_UNIVERSE_v1.1.md §2). See docs/implementation/
 * M5.3_RESEARCH.md for the full audit.
 *
 * CONTENT BOUNDARY — the two orientation sentences are exact approved
 * quotes: the corrected cross-district canonical formula
 * ("Research develops understanding.", RESEARCH_UNIVERSE_v1.1.md §1) and
 * the approved closing tagline ("The Research Universe is where the
 * platform makes its thinking visible.", §21/Merge Note). The curated
 * highlight, its metadata, and its relationship trace use the one existing
 * public M3 fixture record (`fixtureResearchRecordWithExtension`) — clearly
 * disclosed as fixture, not real research content (no real Research content
 * exists before Milestone 7).
 *
 * STRUCTURE — reuses M5.2's own calibrated lesson directly, not a fresh
 * guess: the curated highlight lives in `DistrictField`'s `primary` zone,
 * never `peripheral` (`.district-field-peripheral`, district-composition.css,
 * permanently carries peripheral latency — correct for genuine annotation,
 * wrong for curated foreground). `peripheral` is intentionally omitted —
 * Research has no M4.9 threshold wiring of its own (that remains Work's
 * one representative consumer, M5.1), and every other Research pathway
 * (Current/Publications/Writing/Talks/Archive) is already reachable through
 * `DistrictNav` (M3.8) without duplicating those links here.
 *
 * "Active Edge" (the eyebrow label below) is RESEARCH_UNIVERSE_v1.1.md §7's
 * own approved Homepage zone name — reused verbatim, the same discipline
 * M5.2 used for "Selected Work" (WORK_UNIVERSE_v1.1.md §11).
 */
export default function ResearchOverviewPage() {
  const registry = createRecordRegistry(allFixtureRecords);
  const highlighted = isPubliclyDiscoverable(fixtureResearchRecordWithExtension)
    ? fixtureResearchRecordWithExtension
    : undefined;

  const metadataItems: MetadataEntry[] = [];
  if (highlighted) {
    if (highlighted.extension.researchActivityState) {
      metadataItems.push({
        label: "Activity",
        value: highlighted.extension.researchActivityState,
        tier: "primary",
      });
    }
    metadataItems.push({ label: "Content type", value: highlighted.contentType });
  }

  return (
    <DistrictOverviewShell heading="Research">
      <DistrictField
        density="moderate"
        primary={
          <div>
            <div className="measure">
              <p className="type-body">Research develops understanding.</p>
              <p className="type-body">
                The Research Universe is where the platform makes its thinking visible.
              </p>
            </div>
            {highlighted && (
              <div className="curated-highlight">
                <p className="type-label">Active Edge</p>
                <p className="type-annotation">M3 fixture record — not real public content</p>
                <PortalRecord
                  title={highlighted.title}
                  href={resolveCanonicalRoute(highlighted)}
                  orientation={highlighted.summary}
                />
                <MetadataRail label="Active Edge metadata" items={metadataItems} />
                <RecordTrace source={highlighted} registry={registry} />
              </div>
            )}
          </div>
        }
      />
    </DistrictOverviewShell>
  );
}
