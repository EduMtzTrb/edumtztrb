import { UtilityPageShell } from "@/components/page-shells/PageShell";
import { SearchForm } from "@/components/search/SearchForm";
import { SearchResults } from "@/components/search/SearchResults";
import { Breadcrumb } from "@/components/shell/Breadcrumb";
import { buildBreadcrumbTrail, orientationForUtility } from "@/components/shell/orientation";
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
  const orientation = orientationForUtility({ currentLabel: "Search", currentHref: "/search" });

  return (
    <UtilityPageShell heading="Search">
      <Breadcrumb trail={buildBreadcrumbTrail(orientation)} />
      <SearchForm defaultValue={query} fixtureActive={usingFixtures} />
      <SearchResults result={result} usingFixtures={usingFixtures} />
    </UtilityPageShell>
  );
}
