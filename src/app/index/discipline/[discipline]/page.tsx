import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { Breadcrumb } from "@/components/shell/Breadcrumb";
import { buildBreadcrumbTrail, orientationForUtility } from "@/components/shell/orientation";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByDisciplinePage({
  params,
  searchParams,
}: PageProps<"/index/discipline/[discipline]">) {
  const { discipline } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "discipline", value: discipline });
  const orientation = orientationForUtility({
    currentLabel: `Discipline: ${discipline}`,
    currentHref: `/index/discipline/${discipline}`,
    activeLens: { dimension: "discipline", value: discipline },
    parentGrouping: { label: "Index", href: "/index" },
  });

  return (
    <GroupingViewShell heading={`Index — Discipline: ${discipline}`}>
      <Breadcrumb trail={buildBreadcrumbTrail(orientation)} />
      <IndexResults
        result={result}
        usingFixtures={usingFixtures}
        scopeDescription={`discipline: ${discipline}`}
      />
    </GroupingViewShell>
  );
}
