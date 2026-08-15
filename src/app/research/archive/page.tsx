import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Research — Archive. Comprehensive access (RESEARCH_UNIVERSE_v1.1.md §8:
 * "index mode" — "direct lookup, filtering, accessibility, large
 * archives"). Reuses M3.10's `IndexResults` + `queryIndex(records,
 * {dimension:"district", value:"research"})` directly — the exact same
 * comprehensive-access mechanism `/index` and `/work/all` already provide,
 * scoped rather than duplicated. `usingFixtures` is honestly `true`: no
 * real Research content exists before Milestone 7.
 */
const orientation = orientationForSection({
  district: "research",
  currentLabel: "Archive",
  currentHref: "/research/archive",
});

export default function ResearchArchivePage() {
  const result = queryIndex(allFixtureRecords, { dimension: "district", value: "research" });

  return (
    <ComprehensiveViewShell heading="Research — Archive">
      <DirectEntryOrientation context={orientation} />
      <p className="type-annotation">
        Complete indexed access — every publicly discoverable Research record, scannable by content
        type and date.
      </p>
      <IndexResults result={result} usingFixtures />
    </ComprehensiveViewShell>
  );
}
