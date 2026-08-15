import { DistrictOverviewShell } from "@/components/page-shells/PageShell";
import { DistrictField } from "@/components/composition/DistrictField";
import { PortalRecord } from "@/components/records/PortalRecord";
import { RecordTrace } from "@/components/trace/Trace";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { fixtureLabRecordWithExtension } from "@/domain/records/district-fixtures";
import { createRecordRegistry } from "@/domain/records/registry";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import { isPubliclyDiscoverable } from "@/domain/records/registry";

/**
 * Lab — M5.4 district overview ("The Open Test Structure,"
 * LAB_UNIVERSE_v1.1.md §2). See docs/implementation/M5.4_LAB.md for the
 * full audit.
 *
 * CONTENT BOUNDARY — the two orientation sentences are exact approved
 * quotes: the canonical formula ("Lab tests and transforms.", §1) and the
 * approved closing statement ("The Lab is where the platform makes change
 * observable.", §27/Merge Note). The curated highlight, its metadata, and
 * its relationship traces use the one existing public M3 fixture record
 * (`fixtureLabRecordWithExtension`) — clearly disclosed as fixture.
 *
 * STRUCTURE — reuses M5.2's calibrated lesson: the curated highlight lives
 * in `primary`, never `peripheral`. `peripheral` is intentionally omitted,
 * same reasoning as Research (M5.3) — no M4.9 wiring of Lab's own, and
 * `DistrictNav` already reaches Active/Prototypes/Tools/Studies/Archive.
 *
 * "Active Assembly" (the eyebrow label below) is LAB_UNIVERSE_v1.1.md
 * §11's own approved Homepage zone name, reused verbatim: "a deliberately
 * small set of active OR RECENTLY MEANINGFUL experiments... selection is
 * based on experimental significance, not recency" — explicitly broader
 * than the strict `/lab/active` route's `experimentState === "active"`
 * filter (see that route's own comment). The fixture's real
 * `experimentState: "abandoned"` is shown honestly, not hidden — Lab
 * Universe §15/LAB-11: failed and abandoned experiments receive the same
 * editorial dignity as successful ones, and remain visible when their
 * termination is meaningful.
 */
export default function LabOverviewPage() {
  const registry = createRecordRegistry(allFixtureRecords);
  const highlighted = isPubliclyDiscoverable(fixtureLabRecordWithExtension)
    ? fixtureLabRecordWithExtension
    : undefined;

  const metadataItems: MetadataEntry[] = [];
  if (highlighted) {
    if (highlighted.extension.experimentState) {
      metadataItems.push({
        label: "State",
        value: highlighted.extension.experimentState,
        tier: "primary",
      });
    }
    metadataItems.push({ label: "Content type", value: highlighted.contentType });
  }

  return (
    <DistrictOverviewShell heading="Lab">
      <DistrictField
        density="moderate"
        primary={
          <div>
            <div className="measure">
              <p className="type-body">Lab tests and transforms.</p>
              <p className="type-body">The Lab is where the platform makes change observable.</p>
            </div>
            {highlighted && (
              <div className="curated-highlight">
                <p className="type-label">Active Assembly</p>
                <p className="type-annotation">M3 fixture record — not real public content</p>
                <PortalRecord
                  title={highlighted.title}
                  href={resolveCanonicalRoute(highlighted)}
                  orientation={highlighted.summary}
                />
                <MetadataRail label="Active Assembly metadata" items={metadataItems} />
                <RecordTrace source={highlighted} registry={registry} />
              </div>
            )}
          </div>
        }
      />
    </DistrictOverviewShell>
  );
}
