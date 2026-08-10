import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { Breadcrumb } from "@/components/shell/Breadcrumb";
import { buildBreadcrumbTrail, orientationForUtility } from "@/components/shell/orientation";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByDistrictPage({
  params,
  searchParams,
}: PageProps<"/index/district/[district]">) {
  const { district } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "district", value: district });
  const orientation = orientationForUtility({
    currentLabel: `District: ${district}`,
    currentHref: `/index/district/${district}`,
    activeLens: { dimension: "district", value: district },
    parentGrouping: { label: "Index", href: "/index" },
  });

  return (
    <GroupingViewShell heading={`Index — District: ${district}`}>
      <Breadcrumb trail={buildBreadcrumbTrail(orientation)} />
      <IndexResults
        result={result}
        usingFixtures={usingFixtures}
        scopeDescription={`district: ${district}`}
      />
    </GroupingViewShell>
  );
}
