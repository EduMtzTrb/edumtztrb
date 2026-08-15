import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Lab — Prototypes. Reuses the approved `content-type` global lens
 * (M3.4/M3.10), pre-scoped to Lab, filtered to M3.1's own approved
 * `"prototype"` content-type value. No fixture record currently declares
 * that content type (the one Lab fixture is `"experiment"`), so this route
 * honestly returns no match — never an invented prototype.
 */
const orientation = orientationForSection({
  district: "lab",
  currentLabel: "Prototypes",
  currentHref: "/lab/prototypes",
  activeLens: { dimension: "content-type", value: "prototype" },
});

export default function LabPrototypesPage() {
  const labRecords = allFixtureRecords.filter((record) => record.ownerDistrict === "lab");
  const result = queryIndex(labRecords, { dimension: "content-type", value: "prototype" });

  return (
    <GroupingViewShell heading="Lab — Prototypes">
      <DirectEntryOrientation context={orientation} />
      <IndexResults result={result} usingFixtures scopeDescription="Content type: Prototype" />
    </GroupingViewShell>
  );
}
