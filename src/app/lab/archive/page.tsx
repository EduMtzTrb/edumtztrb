import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Lab — Archive. Comprehensive access (LAB_UNIVERSE_v1.1.md §11: "Archive
 * Depth — the complete indexed collection: scanning, filtering,
 * chronology, status, search"). Reuses M3.10's `IndexResults` +
 * `queryIndex(records, {dimension:"district", value:"lab"})` directly —
 * the same mechanism `/index`, `/work/all`, and `/research/archive`
 * already provide, scoped rather than duplicated. `usingFixtures` is
 * honestly `true`.
 */
const orientation = orientationForSection({
  district: "lab",
  currentLabel: "Archive",
  currentHref: "/lab/archive",
});

export default function LabArchivePage() {
  const result = queryIndex(allFixtureRecords, { dimension: "district", value: "lab" });

  return (
    <ComprehensiveViewShell heading="Lab — Archive">
      <DirectEntryOrientation context={orientation} />
      <p className="type-annotation">
        Complete indexed access — every publicly discoverable Lab record, scannable by content type
        and date.
      </p>
      <IndexResults result={result} usingFixtures />
    </ComprehensiveViewShell>
  );
}
