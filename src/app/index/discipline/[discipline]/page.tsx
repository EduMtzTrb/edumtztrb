import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByDisciplinePage({
  params,
  searchParams,
}: PageProps<"/index/discipline/[discipline]">) {
  const { discipline } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "discipline", value: discipline });

  return (
    <GroupingViewShell heading={`Index — Discipline: ${discipline}`}>
      <IndexResults
        result={result}
        usingFixtures={usingFixtures}
        scopeDescription={`discipline: ${discipline}`}
      />
    </GroupingViewShell>
  );
}
