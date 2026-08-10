import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByYearPage({
  params,
  searchParams,
}: PageProps<"/index/year/[year]">) {
  const { year } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "year", value: year });

  return (
    <GroupingViewShell heading={`Index — Year: ${year}`}>
      <IndexResults
        result={result}
        usingFixtures={usingFixtures}
        scopeDescription={`year: ${year}`}
      />
    </GroupingViewShell>
  );
}
