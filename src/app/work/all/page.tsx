import { ComprehensiveViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Work — All. Comprehensive access (WORK_UNIVERSE_v1.1.md §11: "All Work
 * prioritizes completeness and scanability over atmosphere"; DESIGN_SYSTEM.md
 * §71: "calm overview → dense evidence" — this is the district's own
 * densest, most functional view). Reuses M3.10's `IndexResults` (the exact
 * same public-eligible query + dense-row rendering Index already provides)
 * scoped to Work via the approved `district` lens, rather than a second
 * comprehensive-view implementation — no district owns a duplicate archive
 * mechanism. `usingFixtures` is honestly `true`: no real Work content
 * exists before Milestone 7.
 *
 * SCAN-STRUCTURE NOTE (M5.2 calibration — see docs/implementation/
 * M5.2_WORK.md "Comprehensive View Calibration"): a real, honest sentence
 * describing the catalogue's actual scan axes (content type, date — the
 * exact fields `IndexRecord` renders, never fabricated) is rendered ahead
 * of `IndexResults`, so the comprehensive-access architecture reads as
 * established even with the one current fixture row; every additional real
 * record populates the identical structure without further change.
 */
const orientation = orientationForSection({
  district: "work",
  currentLabel: "All Work",
  currentHref: "/work/all",
});

export default function WorkAllPage() {
  const result = queryIndex(allFixtureRecords, { dimension: "district", value: "work" });

  return (
    <ComprehensiveViewShell heading="Work — All">
      <DirectEntryOrientation context={orientation} />
      <p className="type-annotation">
        Comprehensive access — every publicly discoverable Work record, scannable by content type
        and date.
      </p>
      <IndexResults result={result} usingFixtures />
    </ComprehensiveViewShell>
  );
}
