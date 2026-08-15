import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Art — Archive. Comprehensive access (ART_UNIVERSE_v1.1.md §10: "Archive
 * Depth — the complete public index, visible but not the district's first
 * impression"; ART-25). Reuses M3.10's `IndexResults` +
 * `queryIndex(records, {dimension:"district", value:"art"})` directly —
 * the same mechanism every other district's archive/all view already
 * provides, scoped rather than duplicated. `usingFixtures` is honestly
 * `true`.
 */
const orientation = orientationForSection({
  district: "art",
  currentLabel: "Archive",
  currentHref: "/art/archive",
});

export default function ArtArchivePage() {
  const result = queryIndex(allFixtureRecords, { dimension: "district", value: "art" });

  return (
    <ComprehensiveViewShell heading="Art — Archive">
      <DirectEntryOrientation context={orientation} />
      <p className="type-annotation">
        Complete indexed access — every publicly discoverable Art record, scannable by content type
        and date.
      </p>
      <IndexResults result={result} usingFixtures />
    </ComprehensiveViewShell>
  );
}
