import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Lab — Tools. Reuses the approved `content-type` global lens
 * (M3.4/M3.10), pre-scoped to Lab, filtered to M3.1's own approved
 * `"tool"` content-type value. No fixture record currently declares that
 * content type, so this route honestly returns no match — never an
 * invented tool.
 */
const orientation = orientationForSection({
  district: "lab",
  currentLabel: "Tools",
  currentHref: "/lab/tools",
  activeLens: { dimension: "content-type", value: "tool" },
});

export default function LabToolsPage() {
  const labRecords = allFixtureRecords.filter((record) => record.ownerDistrict === "lab");
  const result = queryIndex(labRecords, { dimension: "content-type", value: "tool" });

  return (
    <GroupingViewShell heading="Lab — Tools">
      <DirectEntryOrientation context={orientation} />
      <IndexResults result={result} usingFixtures scopeDescription="Content type: Tool" />
    </GroupingViewShell>
  );
}
