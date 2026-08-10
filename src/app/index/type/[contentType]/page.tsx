import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { Breadcrumb } from "@/components/shell/Breadcrumb";
import { buildBreadcrumbTrail, orientationForUtility } from "@/components/shell/orientation";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByTypePage({
  params,
  searchParams,
}: PageProps<"/index/type/[contentType]">) {
  const { contentType } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "content-type", value: contentType });
  const orientation = orientationForUtility({
    currentLabel: `Type: ${contentType}`,
    currentHref: `/index/type/${contentType}`,
    activeLens: { dimension: "content-type", value: contentType },
    parentGrouping: { label: "Index", href: "/index" },
  });

  return (
    <GroupingViewShell heading={`Index — Type: ${contentType}`}>
      <Breadcrumb trail={buildBreadcrumbTrail(orientation)} />
      <IndexResults
        result={result}
        usingFixtures={usingFixtures}
        scopeDescription={`content-type: ${contentType}`}
      />
    </GroupingViewShell>
  );
}
