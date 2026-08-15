import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Research — Publications. Reuses the approved `content-type` global lens
 * (M3.4/M3.10), pre-scoped to Research, filtered to M3.1's own approved
 * `"publication"` content-type value (`CanonicalRecord.ts`'s seventeen-value
 * vocabulary) — the same district-then-lens pattern M5.2 established for
 * Work's practice areas, applied here to content type instead of
 * discipline. No fixture record currently declares content type
 * `"publication"` (the one Research fixture is `"research-project"`), so
 * this route honestly returns no match — never an invented publication.
 */
const orientation = orientationForSection({
  district: "research",
  currentLabel: "Publications",
  currentHref: "/research/publications",
  activeLens: { dimension: "content-type", value: "publication" },
});

export default function ResearchPublicationsPage() {
  const researchRecords = allFixtureRecords.filter((record) => record.ownerDistrict === "research");
  const result = queryIndex(researchRecords, { dimension: "content-type", value: "publication" });

  return (
    <GroupingViewShell heading="Research — Publications">
      <DirectEntryOrientation context={orientation} />
      <IndexResults result={result} usingFixtures scopeDescription="Content type: Publication" />
    </GroupingViewShell>
  );
}
