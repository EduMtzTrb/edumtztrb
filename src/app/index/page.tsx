import { UtilityPageShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { FilterBar } from "@/components/index/FilterBar";
import { ActiveFilters } from "@/components/index/ActiveFilters";
import { Breadcrumb } from "@/components/shell/Breadcrumb";
import { buildBreadcrumbTrail, orientationForUtility } from "@/components/shell/orientation";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";
import {
  applyFilterCriteria,
  describeCriteria,
  distinctContentTypes,
  distinctDistricts,
  parseFilterCriteria,
} from "@/domain/records/FilterModel";

const PATHNAME = "/index";

export default async function IndexPage({ searchParams }: PageProps<"/index">) {
  const params = await searchParams;
  const { records, usingFixtures } = resolvePublicRecordSource(params);
  const baseResult = queryIndex(records);

  const criteria = parseFilterCriteria(params);
  const filteredEntries = applyFilterCriteria(baseResult.entries, criteria);

  const orientation = orientationForUtility({ currentLabel: "Index", currentHref: PATHNAME });

  return (
    <UtilityPageShell heading="Index">
      <Breadcrumb trail={buildBreadcrumbTrail(orientation)} />
      <FilterBar
        pathname={PATHNAME}
        searchParams={params}
        criteria={criteria}
        districtOptions={distinctDistricts(baseResult.entries)}
        contentTypeOptions={distinctContentTypes(baseResult.entries)}
      />
      <ActiveFilters pathname={PATHNAME} searchParams={params} criteria={criteria} />
      <IndexResults
        result={{ entries: filteredEntries, count: filteredEntries.length }}
        usingFixtures={usingFixtures}
        scopeDescription={describeCriteria(criteria)}
      />
    </UtilityPageShell>
  );
}
