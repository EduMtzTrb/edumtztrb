import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { EmptyState } from "@/components/state/EmptyState";
import { fixtureAboutRecordWithExtension } from "@/domain/records/district-fixtures";

/**
 * About — Experience. Real `experience` entries (ABOUT_UNIVERSE_v1.1.md
 * §11: "explains roles, organizations, and methods used across multiple
 * projects... About explains the professional trajectory. Work
 * demonstrates professional capability through projects."). No project
 * case study is duplicated here — that remains Work's own territory; each
 * entry summarizes a role, not project outcomes. Entries have no canonical
 * route of their own (no `/about/{entry}`, preserved per this batch's own
 * instruction), so they render as plain structured text, not linkable
 * records.
 */
const orientation = orientationForSection({
  district: "about",
  currentLabel: "Experience",
  currentHref: "/about/experience",
});

export default function AboutExperiencePage() {
  const experience = fixtureAboutRecordWithExtension.extension.experience ?? [];

  return (
    <GroupingViewShell heading="About — Experience">
      <DirectEntryOrientation context={orientation} />
      <p className="type-annotation">M3 fixture record — not real public content</p>
      {experience.length === 0 ? (
        <EmptyState
          heading="No experience entries are recorded yet."
          explanation="Professional experience is a real content field, not yet populated."
        />
      ) : (
        <ul>
          {experience.map((entry) => (
            <li key={`${entry.organization}-${entry.role}`} className="type-body">
              <strong className="type-label">{entry.role}</strong>
              {" — "}
              {entry.organization}
              {entry.period ? ` (${entry.period})` : ""}
              {entry.context ? `. ${entry.context}` : ""}
            </li>
          ))}
        </ul>
      )}
    </GroupingViewShell>
  );
}
