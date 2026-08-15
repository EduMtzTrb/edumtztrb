import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { EmptyState } from "@/components/state/EmptyState";
import { fixtureAboutRecordWithExtension } from "@/domain/records/district-fixtures";

/**
 * About — Recognition. Renders only the real `recognition` field when
 * present — no award, press mention, exhibition, publication, or speaking
 * engagement is invented (Phase W's own explicit instruction).
 */
const orientation = orientationForSection({
  district: "about",
  currentLabel: "Recognition",
  currentHref: "/about/recognition",
});

export default function AboutRecognitionPage() {
  const recognition = fixtureAboutRecordWithExtension.extension.recognition;

  return (
    <GroupingViewShell heading="About — Recognition">
      <DirectEntryOrientation context={orientation} />
      {recognition ? (
        <>
          <p className="type-annotation">M3 fixture record — not real public content</p>
          <p className="measure type-body">{recognition}</p>
        </>
      ) : (
        <EmptyState
          heading="No recognition is recorded yet."
          explanation="Recognition is a real content field, not yet populated."
        />
      )}
    </GroupingViewShell>
  );
}
