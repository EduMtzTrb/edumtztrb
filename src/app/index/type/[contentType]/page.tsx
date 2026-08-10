import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByTypePage({
  params,
  searchParams,
}: PageProps<"/index/type/[contentType]">) {
  const { contentType } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "content-type", value: contentType });

  return (
    <GroupingViewShell heading={`Index — Type: ${contentType}`}>
      <IndexResults
        result={result}
        usingFixtures={usingFixtures}
        scopeDescription={`content-type: ${contentType}`}
      />
    </GroupingViewShell>
  );
}
