import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { EmptyState } from "@/components/state/EmptyState";

/**
 * Art — series grouping. Series is a real, catalog-referenced
 * `ClassificationDimension` (M3.4, `ClassificationModel.ts`) but — like
 * Work's `collection` — is not one of the five approved
 * `GlobalLensDimension`s `queryIndex` accepts, and no fixture record
 * currently references a populated series catalog (ArtExtension itself
 * has no `series` field; ART_UNIVERSE_v1.1.md §12 treats series as part of
 * a work's authored identity, not a filterable classification the current
 * canonical model populates). Rather than invent a query mechanism or a
 * series field that doesn't exist, this route stays honest: a real route,
 * real orientation, and a real empty state — the same discipline M5.2
 * applied to `/work/collections/[collection]`.
 */
export default async function ArtSeriesPage({ params }: PageProps<"/art/series/[series]">) {
  const { series } = await params;
  const orientation = orientationForSection({
    district: "art",
    currentLabel: `Series: ${series}`,
    currentHref: `/art/series/${series}`,
  });

  return (
    <GroupingViewShell heading={`Art — Series: ${series}`}>
      <DirectEntryOrientation context={orientation} />
      <EmptyState
        heading="No records are classified into this series yet."
        explanation="Series membership is a real classification dimension, not yet populated for any Art record."
      />
    </GroupingViewShell>
  );
}
