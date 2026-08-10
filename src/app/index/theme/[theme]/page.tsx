import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByThemePage({
  params,
  searchParams,
}: PageProps<"/index/theme/[theme]">) {
  const { theme } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "theme", value: theme });

  return (
    <GroupingViewShell heading={`Index — Theme: ${theme}`}>
      <IndexResults result={result} usingFixtures={usingFixtures} />
    </GroupingViewShell>
  );
}
