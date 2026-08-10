import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { IndexResults } from "@/components/index/IndexResults";
import { Breadcrumb } from "@/components/shell/Breadcrumb";
import { buildBreadcrumbTrail, orientationForUtility } from "@/components/shell/orientation";
import { resolvePublicRecordSource } from "@/domain/records/devFixtureSource";
import { queryIndex } from "@/domain/records/IndexModel";

export default async function IndexByThemePage({
  params,
  searchParams,
}: PageProps<"/index/theme/[theme]">) {
  const { theme } = await params;
  const { records, usingFixtures } = resolvePublicRecordSource(await searchParams);
  const result = queryIndex(records, { dimension: "theme", value: theme });
  const orientation = orientationForUtility({
    currentLabel: `Theme: ${theme}`,
    currentHref: `/index/theme/${theme}`,
    activeLens: { dimension: "theme", value: theme },
    parentGrouping: { label: "Index", href: "/index" },
  });

  return (
    <GroupingViewShell heading={`Index — Theme: ${theme}`}>
      <Breadcrumb trail={buildBreadcrumbTrail(orientation)} />
      <IndexResults
        result={result}
        usingFixtures={usingFixtures}
        scopeDescription={`theme: ${theme}`}
      />
    </GroupingViewShell>
  );
}
