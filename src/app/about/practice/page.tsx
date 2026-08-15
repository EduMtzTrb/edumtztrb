import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { EmptyState } from "@/components/state/EmptyState";
import { fixtureAboutRecordWithExtension } from "@/domain/records/district-fixtures";

/**
 * About — Practice. Real `methods` (ABOUT_UNIVERSE_v1.1.md §14: "durable
 * ways of working... tools may be named where professionally useful but
 * stay secondary to the methods they enable"). Distinct from Capabilities
 * (`/about/capabilities`) — About's own extension models `methods` and
 * `capabilities` as two separate real fields; this route renders only the
 * former. No skill percentages, tool-logo walls, or tag cloud (§14's own
 * anti-pattern) — a plain list of real, disclosed fixture text.
 */
const orientation = orientationForSection({
  district: "about",
  currentLabel: "Practice",
  currentHref: "/about/practice",
});

export default function AboutPracticePage() {
  const methods = fixtureAboutRecordWithExtension.extension.methods ?? [];

  return (
    <GroupingViewShell heading="About — Practice">
      <DirectEntryOrientation context={orientation} />
      <p className="type-annotation">M3 fixture record — not real public content</p>
      {methods.length === 0 ? (
        <EmptyState
          heading="No methods are recorded yet."
          explanation="Practice methods are a real content field, not yet populated."
        />
      ) : (
        <ul>
          {methods.map((method) => (
            <li key={method} className="type-body">
              {method}
            </li>
          ))}
        </ul>
      )}
    </GroupingViewShell>
  );
}
