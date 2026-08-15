import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { IndexResults } from "@/components/index/IndexResults";
import { queryIndex } from "@/domain/records/IndexModel";
import { allFixtureRecords } from "@/domain/records/fixtures";

/**
 * Research — theme grouping. Reuses the approved `theme` global lens
 * (M3.4/M3.10) directly — one of the five closed `GlobalLensDimension`
 * values `queryIndex` accepts, pre-scoped to Research first (the same
 * two-step district-then-lens pattern `/work/practice/[practiceArea]`
 * already established, M5.2) — never a second taxonomy. No fixture record
 * currently declares a theme, so this route honestly returns no match via
 * `IndexResults`' own `NoResultState`, not an invented grouping.
 */
export default async function ResearchThemePage({ params }: PageProps<"/research/themes/[theme]">) {
  const { theme } = await params;
  const researchRecords = allFixtureRecords.filter((record) => record.ownerDistrict === "research");
  const result = queryIndex(researchRecords, { dimension: "theme", value: theme });
  const orientation = orientationForSection({
    district: "research",
    currentLabel: `Theme: ${theme}`,
    currentHref: `/research/themes/${theme}`,
    activeLens: { dimension: "theme", value: theme },
  });

  return (
    <GroupingViewShell heading={`Research — Theme: ${theme}`}>
      <DirectEntryOrientation context={orientation} />
      <IndexResults result={result} usingFixtures scopeDescription={`Theme: ${theme}`} />
    </GroupingViewShell>
  );
}
