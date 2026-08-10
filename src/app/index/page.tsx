import { UtilityPageShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexPage({ searchParams }: PageProps<"/index">) {
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records);

  return (
    <UtilityPageShell heading="Index">
      <IndexResults result={result} usingFixtures={usingFixtures} />
    </UtilityPageShell>
  );
}
