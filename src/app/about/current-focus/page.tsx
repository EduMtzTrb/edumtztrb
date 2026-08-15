import { CuratedViewShell } from "@/components/page-shells/PageShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { EmptyState } from "@/components/state/EmptyState";
import { fixtureAboutRecordWithExtension } from "@/domain/records/district-fixtures";

/**
 * About — Current Focus. `AboutExtension` has no dedicated current-focus
 * narrative field — distinct from Research's Current (`lifecycle`) and
 * Lab's Active (`experimentState`), About's own "Now" layer
 * (ABOUT_UNIVERSE_v1.1.md §24) has no corresponding real field in the
 * approved M3.2 extension yet. Rather than invent one, this route shows
 * the one real, genuinely current fact that does exist — `availability`,
 * §24's own example of "Now" content — and honestly states the narrative
 * gap as a pending content decision, the same discipline the M5.1
 * Authorship anchor already established.
 */
const orientation = orientationForSection({
  district: "about",
  currentLabel: "Current Focus",
  currentHref: "/about/current-focus",
});

export default function AboutCurrentFocusPage() {
  const availability = fixtureAboutRecordWithExtension.extension.availability;
  const metadataItems: MetadataEntry[] = availability
    ? [{ label: "Availability", value: availability, tier: "primary" }]
    : [];

  return (
    <CuratedViewShell heading="About — Current Focus">
      <DirectEntryOrientation context={orientation} />
      {availability && (
        <>
          <p className="type-annotation">M3 fixture record — not real public content</p>
          <MetadataRail label="Current state" items={metadataItems} />
        </>
      )}
      <EmptyState
        heading="Current-focus narrative content is a pending content decision."
        explanation="No governing document yet supplies approved present-tense focus/direction copy. Nothing is invented here; this is recorded as a content gap, not an implementation failure."
      />
    </CuratedViewShell>
  );
}
