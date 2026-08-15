import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Research — Talks. Reuses the approved `content-type` global lens
 * (M3.4/M3.10), pre-scoped to Research, filtered to M3.1's own approved
 * `"talk-or-presentation"` content-type value. No fixture record currently
 * declares that content type, so this route honestly returns no match —
 * never an invented talk.
 */
const orientation = orientationForSection({
  district: "research",
  currentLabel: "Talks",
  currentHref: "/research/talks",
  activeLens: { dimension: "content-type", value: "talk-or-presentation" },
});

export default function ResearchTalksPage() {
  const researchRecords = allFixtureRecords.filter((record) => record.ownerDistrict === "research");
  const result = queryIndex(researchRecords, {
    dimension: "content-type",
    value: "talk-or-presentation",
  });

  return (
    <GroupingViewShell heading="Research — Talks">
      <DirectEntryOrientation context={orientation} />
      <IndexResults
        result={result}
        usingFixtures
        scopeDescription="Content type: Talk or presentation"
      />
    </GroupingViewShell>
  );
}
