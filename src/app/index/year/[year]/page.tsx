import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { Breadcrumb } from "@/components/shell/Breadcrumb";
import { buildBreadcrumbTrail, orientationForUtility } from "@/components/shell/orientation";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByYearPage({
  params,
  searchParams,
}: PageProps<"/index/year/[year]">) {
  const { year } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "year", value: year });
  const orientation = orientationForUtility({
    currentLabel: `Year: ${year}`,
    currentHref: `/index/year/${year}`,
    activeLens: { dimension: "year", value: year },
    parentGrouping: { label: "Index", href: "/index" },
  });

  return (
    <GroupingViewShell heading={`Index — Year: ${year}`}>
      <Breadcrumb trail={buildBreadcrumbTrail(orientation)} />
      <IndexResults
        result={result}
        usingFixtures={usingFixtures}
        scopeDescription={`year: ${year}`}
      />
    </GroupingViewShell>
  );
}
