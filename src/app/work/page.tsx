import { DistrictOverviewShell } from "@/components/page-shells/PageShell";
import { DistrictField } from "@/components/composition/DistrictField";
import { PortalRecord } from "@/components/records/PortalRecord";
import { RecordTrace } from "@/components/trace/Trace";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { ThresholdIndicator } from "@/components/threshold/ThresholdIndicator";
import { ThresholdLink } from "@/components/threshold/ThresholdLink";
import { HOME_TO_WORK_ARRIVAL_KEY, WORK_TO_HOME_ARRIVAL_KEY } from "@/lib/threshold/thresholdKeys";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { fixtureWorkRecordWithExtension } from "@/domain/records/district-fixtures";
import { createRecordRegistry } from "@/domain/records/registry";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import { isPubliclyDiscoverable } from "@/domain/records/registry";

/**
 * Work — M5.2 district overview ("Constructed Archive",
 * WORK_UNIVERSE_v1.1.md §2), calibrated after the first human review (see
 * docs/implementation/M5.2_WORK.md "Human Review — Calibration Required" /
 * "Calibration Implementation" for the full audit and reasoning).
 *
 * CONTENT BOUNDARY — the two orientation sentences are exact approved
 * quotes (WORK_UNIVERSE_v1.1.md's own canonical formula and closing
 * statement; the canonical formula is the same PLATFORM_SPECIFICATION.md
 * clause Home already uses for Work's own threshold framing). The curated
 * highlight, its metadata, and its relationship trace use the one existing
 * public M3 fixture record (`fixtureWorkRecordWithExtension`) — clearly
 * disclosed as fixture, not real project content (no real Work content
 * exists before Milestone 7).
 *
 * STRUCTURE (calibrated) — the curated highlight now lives in
 * `DistrictField`'s `primary` zone, alongside the thesis statement, not in
 * `peripheral`. Root cause of the first review's "recessive record" finding:
 * `.district-field-peripheral` (district-composition.css, M5.0) permanently
 * carries peripheral latency — dimmed color/opacity, correct for genuine
 * annotation, wrong for curated professional foreground. Moving the
 * highlight into `primary` (wrapped in the shared `.curated-highlight`
 * rhythm primitive, canonical-record.css) gives it full resolved authority
 * — "Selected Field" from WORK_UNIVERSE.md §10's homepage sequence, not
 * "Crossroads." `peripheral` now carries only the genuine closing
 * wayfinding action — "Return to Home" — the sequence's real Crossroads
 * stage, correctly latent. `density="moderate"` is unchanged (see the
 * calibration doc's "Work Overview Calibration" for the reasoned audit
 * against DESIGN_SYSTEM.md §71 / WORK_UNIVERSE_v1.1.md §14).
 */
export default function WorkOverviewPage() {
  const registry = createRecordRegistry(allFixtureRecords);
  const highlighted = isPubliclyDiscoverable(fixtureWorkRecordWithExtension)
    ? fixtureWorkRecordWithExtension
    : undefined;

  const metadataItems: MetadataEntry[] = [];
  if (highlighted) {
    metadataItems.push({ label: "Content type", value: highlighted.contentType });
    if (highlighted.authorship.role) {
      metadataItems.push({ label: "Role", value: highlighted.authorship.role, tier: "primary" });
    }
  }

  return (
    <DistrictOverviewShell heading="Work">
      <ThresholdIndicator
        arrivalKey={HOME_TO_WORK_ARRIVAL_KEY}
        label="Arriving from Home — Work is part of the same platform."
        repeatedLabel="Arriving from Home."
      />
      <DistrictField
        density="moderate"
        primary={
          <div>
            <div className="measure">
              <p className="type-body">Work demonstrates capability.</p>
              <p className="type-body">
                The Work Universe is where the platform earns professional trust.
              </p>
            </div>
            {highlighted && (
              <div className="curated-highlight">
                <p className="type-label">Selected Work</p>
                <p className="type-annotation">M3 fixture record — not real public content</p>
                <PortalRecord
                  title={highlighted.title}
                  href={resolveCanonicalRoute(highlighted)}
                  orientation={highlighted.summary}
                />
                <MetadataRail label="Selected record metadata" items={metadataItems} />
                <RecordTrace source={highlighted} registry={registry} />
              </div>
            )}
          </div>
        }
        peripheral={
          <p>
            <ThresholdLink href="/" arrivalKey={WORK_TO_HOME_ARRIVAL_KEY}>
              Return to Home
            </ThresholdLink>
          </p>
        }
      />
    </DistrictOverviewShell>
  );
}
