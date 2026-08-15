import { GroupingViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { EmptyState } from "@/components/state/EmptyState";
import { fixtureAboutRecordWithExtension } from "@/domain/records/district-fixtures";

/**
 * About — Education. Real `education` entries (ABOUT_UNIVERSE_v1.1.md
 * §12: "presented as formation, not prestige display"). No canonical route
 * per entry, same reasoning as Experience.
 */
const orientation = orientationForSection({
  district: "about",
  currentLabel: "Education",
  currentHref: "/about/education",
});

export default function AboutEducationPage() {
  const education = fixtureAboutRecordWithExtension.extension.education ?? [];

  return (
    <GroupingViewShell heading="About — Education">
      <DirectEntryOrientation context={orientation} />
      <p className="type-annotation">M3 fixture record — not real public content</p>
      {education.length === 0 ? (
        <EmptyState
          heading="No education entries are recorded yet."
          explanation="Education is a real content field, not yet populated."
        />
      ) : (
        <ul>
          {education.map((entry) => (
            <li key={`${entry.institution}-${entry.qualification}`} className="type-body">
              <strong className="type-label">{entry.qualification}</strong>
              {" — "}
              {entry.institution}
              {entry.field ? `, ${entry.field}` : ""}
            </li>
          ))}
        </ul>
      )}
    </GroupingViewShell>
  );
}
