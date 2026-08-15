import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { fixtureAboutRecordWithExtension } from "@/domain/records/district-fixtures";

/**
 * About — Profile. The Position + Biography canonical view
 * (ABOUT_UNIVERSE_v1.1.md §8/§9). Real content only: `practiceStatement`
 * (Position) and `biography` (the one real biography field — the
 * approved three-depth micro/short/extended system, §9, is structurally
 * deferred until real content exists to differentiate the depths; showing
 * one real field at one depth is honest, inventing two more drafts of the
 * same text is not).
 *
 * AUTHORSHIP ANCHOR — still `Content Decision Required` (see
 * docs/implementation/M5.7_ABOUT.md). No public-facing personal name is
 * rendered anywhere on this page; `record.authorship.primary.name`
 * ("Fixture Author") is shown only as the record's disclosed fixture
 * authorship, the same convention every other district already uses —
 * never presented as the platform's real identity.
 */
const orientation = orientationForSection({
  district: "about",
  currentLabel: "Profile",
  currentHref: "/about/profile",
});

export default function AboutProfilePage() {
  const record = fixtureAboutRecordWithExtension;
  const metadataItems: MetadataEntry[] = [];
  if (record.extension.availability) {
    metadataItems.push({
      label: "Availability",
      value: record.extension.availability,
      tier: "primary",
    });
  }
  if (record.extension.location) {
    metadataItems.push({ label: "Location", value: record.extension.location });
  }
  if (record.extension.languages?.length) {
    metadataItems.push({ label: "Languages", value: record.extension.languages.join(", ") });
  }
  if (record.extension.affiliations) {
    metadataItems.push({
      label: "Affiliations",
      value: record.extension.affiliations,
      tier: "secondary",
    });
  }

  return (
    <CanonicalRecordShell
      heading={record.title}
      publicState="M3 fixture record — not real public content"
      authorship={record.authorship.primary.name}
      context={<DirectEntryOrientation context={orientation} />}
      evidence={
        <div className="evidence-primary">
          {record.extension.practiceStatement && (
            <p className="measure type-body">
              <strong className="type-label">Position. </strong>
              {record.extension.practiceStatement}
            </p>
          )}
          {record.extension.biography && (
            <p className="measure type-body">
              <strong className="type-label">Biography. </strong>
              {record.extension.biography}
            </p>
          )}
        </div>
      }
      metadata={<MetadataRail label="Profile metadata" items={metadataItems} />}
    />
  );
}
