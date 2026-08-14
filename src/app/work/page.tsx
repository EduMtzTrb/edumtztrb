import { DistrictOverviewShell } from "@/components/page-shells/PageShell";
import { DistrictField } from "@/components/composition/DistrictField";
import { PortalRecord } from "@/components/records/PortalRecord";
import { RecordTrace } from "@/components/trace/Trace";
import { ThresholdIndicator } from "@/components/threshold/ThresholdIndicator";
import { ThresholdLink } from "@/components/threshold/ThresholdLink";
import { HOME_TO_WORK_ARRIVAL_KEY, WORK_TO_HOME_ARRIVAL_KEY } from "@/lib/threshold/thresholdKeys";
import { allFixtureRecords, fixtureWorkRecord } from "@/domain/records/fixtures";
import { createRecordRegistry } from "@/domain/records/registry";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import { isPubliclyDiscoverable } from "@/domain/records/registry";

/**
 * Work — M5.2 district overview ("Constructed Archive",
 * WORK_UNIVERSE_v1.1.md §2). See docs/implementation/M5.2_WORK.md for the
 * full audit.
 *
 * CONTENT BOUNDARY — the two orientation sentences are exact approved
 * quotes (WORK_UNIVERSE_v1.1.md's own canonical formula and closing
 * statement; the canonical formula is the same PLATFORM_SPECIFICATION.md
 * clause Home already uses for Work's own threshold framing). The curated
 * highlight and relationship trace use the one existing public M3
 * fixture record (`fixtureWorkRecord`) — clearly disclosed as fixture, not
 * real project content (no real Work content exists before Milestone 7).
 *
 * STRUCTURE — one `DistrictField` instance (`density="moderate"`,
 * DESIGN_SYSTEM.md §71: "calm overview → dense evidence" — the overview
 * itself stays calm; `/work/all` is where density increases) carries the
 * thesis statement as `primary` and a curated highlight + real relationship
 * trace as `peripheral` — the "Selected Field" and "Crossroads" stages of
 * WORK_UNIVERSE.md §10's homepage sequence, expressed through the same
 * shared grammar M5.0/M5.1 already established, not a new one.
 */
export default function WorkOverviewPage() {
  const registry = createRecordRegistry(allFixtureRecords);
  const highlighted = isPubliclyDiscoverable(fixtureWorkRecord) ? fixtureWorkRecord : undefined;

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
          <div className="measure">
            <p className="type-body-large">Work demonstrates capability.</p>
            <p className="type-body">
              The Work Universe is where the platform earns professional trust.
            </p>
          </div>
        }
        peripheral={
          <div>
            {highlighted && (
              <>
                <p className="type-annotation">M3 fixture record — not real public content</p>
                <PortalRecord
                  title={highlighted.title}
                  href={resolveCanonicalRoute(highlighted)}
                  orientation={highlighted.summary}
                />
                <RecordTrace source={highlighted} registry={registry} />
              </>
            )}
            <p>
              <ThresholdLink href="/" arrivalKey={WORK_TO_HOME_ARRIVAL_KEY}>
                Return to Home
              </ThresholdLink>
            </p>
          </div>
        }
      />
    </DistrictOverviewShell>
  );
}
