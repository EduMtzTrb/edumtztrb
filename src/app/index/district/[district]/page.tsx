import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByDistrictPage({
  params,
  searchParams,
}: PageProps<"/index/district/[district]">) {
  const { district } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "district", value: district });

  return (
    <GroupingViewShell heading={`Index — District: ${district}`}>
      <IndexResults
        result={result}
        usingFixtures={usingFixtures}
        scopeDescription={`district: ${district}`}
      />
    </GroupingViewShell>
  );
}
