import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Lab — Studies. Reuses the approved `content-type` global lens
 * (M3.4/M3.10), pre-scoped to Lab, filtered to M3.1's own approved
 * `"experiment"` content-type value — the district's foundational record
 * type (LAB_UNIVERSE_v1.1.md §1: "experiments, prototypes, simulations,
 * comparisons, models..."). Alongside `/lab/prototypes` ("prototype") and
 * `/lab/tools` ("tool"), this is a reasoned, documented mapping of the
 * third fixed grouping route onto the one remaining Lab-relevant content
 * type in M3.1's approved seventeen-value vocabulary
 * (`CanonicalRecord.ts`) — "Studies" is this route's own editorial label
 * for that type, not a new taxonomy value. The one real Lab fixture
 * declares content type `"experiment"`, so — unlike Prototypes/Tools —
 * this route genuinely surfaces it.
 */
const orientation = orientationForSection({
  district: "lab",
  currentLabel: "Studies",
  currentHref: "/lab/studies",
  activeLens: { dimension: "content-type", value: "experiment" },
});

export default function LabStudiesPage() {
  const labRecords = allFixtureRecords.filter((record) => record.ownerDistrict === "lab");
  const result = queryIndex(labRecords, { dimension: "content-type", value: "experiment" });

  return (
    <GroupingViewShell heading="Lab — Studies">
      <DirectEntryOrientation context={orientation} />
      <IndexResults result={result} usingFixtures scopeDescription="Content type: Experiment" />
    </GroupingViewShell>
  );
}
