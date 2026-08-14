import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Work — practice-area grouping. `DistrictExtensions.ts`'s own comment
 * establishes practice areas as a lens over `disciplines` (M3.1's existing
 * field, not a separate taxonomy) — WORK_UNIVERSE_v1.1.md §9: "Practice
 * Areas are lenses, not separate portfolios: one atmosphere, one
 * navigational logic, one evidential standard, one archive." Reuses the
 * approved `discipline` global lens (M3.4/M3.10), pre-scoped to Work, over
 * `IndexResults` — the same comprehensive-access mechanism `/work/all`
 * uses, narrowed rather than duplicated. No fixture record currently
 * declares a discipline, so every practice-area route today honestly
 * returns no match (`IndexResults`' own `NoResultState`), not an invented
 * grouping.
 */
export default async function WorkPracticeAreaPage({
  params,
}: PageProps<"/work/practice/[practiceArea]">) {
  const { practiceArea } = await params;
  const workRecords = allFixtureRecords.filter((record) => record.ownerDistrict === "work");
  const result = queryIndex(workRecords, { dimension: "discipline", value: practiceArea });
  const orientation = orientationForSection({
    district: "work",
    currentLabel: practiceArea,
    currentHref: `/work/practice/${practiceArea}`,
    activeLens: { dimension: "discipline", value: practiceArea },
  });

  return (
    <GroupingViewShell heading={`Work — Practice: ${practiceArea}`}>
      <DirectEntryOrientation context={orientation} />
      <IndexResults result={result} usingFixtures scopeDescription={`Practice: ${practiceArea}`} />
    </GroupingViewShell>
  );
}
