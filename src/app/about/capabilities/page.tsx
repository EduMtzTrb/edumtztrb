import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { EmptyState } from "@/components/state/EmptyState";
import { fixtureAboutRecordWithExtension } from "@/domain/records/district-fixtures";

/**
 * About — Capabilities. Real `capabilities` (distinct from Practice's
 * `methods` — two separate real `AboutExtension` fields). A plain list,
 * never percentages or a tag cloud (Phase V's own explicit instruction).
 */
const orientation = orientationForSection({
  district: "about",
  currentLabel: "Capabilities",
  currentHref: "/about/capabilities",
});

export default function AboutCapabilitiesPage() {
  const capabilities = fixtureAboutRecordWithExtension.extension.capabilities ?? [];

  return (
    <GroupingViewShell heading="About — Capabilities">
      <DirectEntryOrientation context={orientation} />
      <p className="type-annotation">M3 fixture record — not real public content</p>
      {capabilities.length === 0 ? (
        <EmptyState
          heading="No capabilities are recorded yet."
          explanation="Capabilities are a real content field, not yet populated."
        />
      ) : (
        <ul>
          {capabilities.map((capability) => (
            <li key={capability} className="type-body">
              {capability}
            </li>
          ))}
        </ul>
      )}
    </GroupingViewShell>
  );
}
