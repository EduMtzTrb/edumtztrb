import { UtilityPageShell } from "@/components/page-shells/PageShell";
import { SearchForm } from "@/components/search/SearchForm";
import { SearchResults } from "@/components/search/SearchResults";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { searchRecords } from "@/domain/records/SearchModel";

function firstValue(value: string | string[] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value;
  return v ?? "";
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const { records, usingFixtures } = resolvePublicRecordSource(params);
  const query = firstValue(params.q);
  const result = searchRecords(records, query);

  return (
    <UtilityPageShell heading="Search">
      <SearchForm defaultValue={query} fixtureActive={usingFixtures} />
      <SearchResults result={result} usingFixtures={usingFixtures} />
    </UtilityPageShell>
  );
}
