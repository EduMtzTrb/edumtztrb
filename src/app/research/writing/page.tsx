import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Research — Writing. Reuses the approved `content-type` global lens
 * (M3.4/M3.10), pre-scoped to Research, filtered to M3.1's own approved
 * `"essay"` content-type value — the district's own shorter-form editorial
 * writing, distinct from `"publication"`. No fixture record currently
 * declares content type `"essay"`, so this route honestly returns no
 * match — never an invented essay.
 */
const orientation = orientationForSection({
  district: "research",
  currentLabel: "Writing",
  currentHref: "/research/writing",
  activeLens: { dimension: "content-type", value: "essay" },
});

export default function ResearchWritingPage() {
  const researchRecords = allFixtureRecords.filter((record) => record.ownerDistrict === "research");
  const result = queryIndex(researchRecords, { dimension: "content-type", value: "essay" });

  return (
    <GroupingViewShell heading="Research — Writing">
      <DirectEntryOrientation context={orientation} />
      <IndexResults result={result} usingFixtures scopeDescription="Content type: Essay" />
    </GroupingViewShell>
  );
}
