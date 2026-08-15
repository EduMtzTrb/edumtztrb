import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Art — Exhibitions. Reuses the approved `content-type` global lens
 * (M3.4/M3.10), pre-scoped to Art, filtered to M3.1's own approved
 * `"exhibition"` content-type value (`CanonicalRecord.ts`'s seventeen-value
 * vocabulary already includes both `"exhibition"` and `"art-series"` as
 * real content types — the same district-then-lens pattern M5.2/M5.3/M5.4
 * established). No fixture record currently declares content type
 * `"exhibition"` (the one Art fixture is `"artwork"`), so this route
 * honestly returns no match — never an invented exhibition.
 */
const orientation = orientationForSection({
  district: "art",
  currentLabel: "Exhibitions",
  currentHref: "/art/exhibitions",
  activeLens: { dimension: "content-type", value: "exhibition" },
});

export default function ArtExhibitionsPage() {
  const artRecords = allFixtureRecords.filter((record) => record.ownerDistrict === "art");
  const result = queryIndex(artRecords, { dimension: "content-type", value: "exhibition" });

  return (
    <GroupingViewShell heading="Art — Exhibitions">
      <DirectEntryOrientation context={orientation} />
      <IndexResults result={result} usingFixtures scopeDescription="Content type: Exhibition" />
    </GroupingViewShell>
  );
}
