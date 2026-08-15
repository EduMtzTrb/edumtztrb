import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForRecord } from "@/components/shell/orientation";
import { RecordTrace } from "@/components/trace/Trace";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { UnavailableState } from "@/components/state/UnavailableState";
import { FocusRegion } from "@/components/focus/FocusRegion";
import { FocusItem } from "@/components/focus/FocusItem";
import { ArtworkViewer } from "@/components/media/ArtworkViewer";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { allFixtureDistrictRecords } from "@/domain/records/district-fixtures";
import { createRecordRegistry, isDirectlyAccessible } from "@/domain/records/registry";
import type { CanonicalRecordBase } from "@/domain/records/CanonicalRecord";
import type { ArtRecord } from "@/domain/records/DistrictExtensions";

/**
 * Art — canonical record. Real M3.1 registry lookup, the same mechanism
 * M5.2 built for Work, retargeted to `ownerDistrict: "art"`.
 *
 * ENCOUNTER-FIRST HIERARCHY — deliberately NOT Work's evidence hierarchy
 * (see docs/implementation/M5.5_ART.md "Art vs Work" for the full
 * reasoning). ART_UNIVERSE_v1.1.md §13's four layers — Encounter →
 * Identification → Orientation → Extended context (optional) — govern the
 * `evidence` region directly: the artwork media (`ArtworkViewer`, M2.8)
 * plus its concise summary/orientation are always visible at ordinary
 * `type-body` weight (never Work's `type-body-large` — an artwork's
 * orientation "should support perception rather than replace it," §13, not
 * read as a resolved claim); Identification (medium/dimensions/date/role)
 * lives in the shared `metadata` lateral rail, kept genuinely secondary per
 * DESIGN_SYSTEM.md §74's "very low visible metadata at primary encounter."
 * Extended context (artist statement, exhibition context, edition note) is
 * revealed only through Focus — never shown by default, matching §13's own
 * "optional unless necessary to encounter the work honestly."
 *
 * FOCUS (M4.4) — `FocusRegion`/`FocusItem` are consumed here for the first
 * time by any district's real canonical-record page. The artwork (plus its
 * always-visible orientation) is `FocusItem`'s `summary` — genuinely never
 * hidden; the extended-context layer is `detail`, rendered only while
 * focused — real progressive disclosure over real data, never "a zoomed/
 * enlarged copy" of the same content (`FocusItem`'s own documented rule).
 * Only wired when the record actually has real media — a future record
 * without media renders the same content without Focus rather than
 * wrapping empty structure in an interactive control.
 *
 * `recessionToken="--motion-recession-overlay"` — Art's own strongest
 * recession register (DESIGN_SYSTEM.md §74: "strongest interface
 * recession"), an existing `FocusRegion` configuration knob (M4.4,
 * unmodified), not a new mechanism.
 */

function isArtRecord(record: CanonicalRecordBase): record is ArtRecord {
  return record.ownerDistrict === "art" && "extension" in record;
}

function findArtRecord(slug: string): CanonicalRecordBase | ArtRecord | undefined {
  const extended = allFixtureDistrictRecords.find(
    (record) => record.ownerDistrict === "art" && record.slug === slug,
  );
  if (extended) return extended as ArtRecord;
  return allFixtureRecords.find((record) => record.ownerDistrict === "art" && record.slug === slug);
}

function formatDate(record: CanonicalRecordBase): string | undefined {
  if (!record.date) return undefined;
  if (record.date.kind === "year") return String(record.date.year);
  if (record.date.kind === "date") return record.date.date;
  return record.date.end ? `${record.date.start}–${record.date.end}` : `${record.date.start}–`;
}

export default async function ArtEntryPage({ params }: PageProps<"/art/[entry]">) {
  const { entry } = await params;
  const record = findArtRecord(entry);
  const accessible = record && isDirectlyAccessible(record);

  if (!record || !accessible) {
    return (
      <CanonicalRecordShell
        heading="Record unavailable"
        evidence={
          <UnavailableState
            heading="This record is not available."
            reason="It may not exist, or it does not meet the public/direct-access threshold."
          />
        }
      />
    );
  }

  const orientation = orientationForRecord(record);
  const metadataItems: MetadataEntry[] = [
    { label: "Content type", value: record.contentType, tier: "latent" },
    { label: "Status", value: record.lifecycle, tier: "latent" },
  ];
  const date = formatDate(record);
  if (date) metadataItems.push({ label: "Date", value: date, tier: "latent" });
  if (record.authorship.role) {
    metadataItems.push({ label: "Role", value: record.authorship.role, tier: "secondary" });
  }

  const extension = isArtRecord(record) ? record.extension : undefined;
  if (extension?.medium)
    metadataItems.push({ label: "Medium", value: extension.medium, tier: "secondary" });
  if (extension?.dimensions) {
    metadataItems.push({ label: "Dimensions", value: extension.dimensions, tier: "latent" });
  }
  if (extension?.presentationCondition) {
    metadataItems.push({
      label: "Condition",
      value: extension.presentationCondition,
      tier: "latent",
    });
  }
  if (extension?.editionNote) {
    metadataItems.push({ label: "Edition", value: extension.editionNote, tier: "latent" });
  }

  const extendedContext: { label: string; text: string }[] = [];
  if (extension?.artistStatement) {
    extendedContext.push({ label: "Statement", text: extension.artistStatement });
  }
  if (extension?.exhibitionContext) {
    extendedContext.push({ label: "Exhibition context", text: extension.exhibitionContext });
  }

  const media = record.media?.[0];
  const mediaAltText =
    media && media.accessibility.role !== "decorative" ? media.accessibility.altText : "";
  const artworkView = media ? (
    <ArtworkViewer
      media={<img src={media.source} alt={mediaAltText} />}
      credit={media.accessibility.credit}
    />
  ) : undefined;

  const orientationText = <p className="measure type-body">{record.summary}</p>;

  const extendedContextView =
    extendedContext.length > 0 ? (
      <div className="measure">
        {extendedContext.map((part) => (
          <p key={part.label} className="type-body">
            <strong className="type-label">{part.label}. </strong>
            {part.text}
          </p>
        ))}
      </div>
    ) : null;

  const registry = createRecordRegistry(allFixtureRecords);
  const hasRelationships = (record.relationships ?? []).length > 0;

  return (
    <CanonicalRecordShell
      heading={record.title}
      publicState="M3 fixture record — not real public content"
      authorship={record.authorship.primary.name}
      context={<DirectEntryOrientation context={orientation} />}
      evidence={
        <div className="evidence-primary">
          {artworkView ? (
            <FocusRegion recessionToken="--motion-recession-overlay">
              <FocusItem
                focusKey={entry}
                label={record.title}
                summary={
                  <>
                    {artworkView}
                    {orientationText}
                  </>
                }
                detail={extendedContextView}
              />
            </FocusRegion>
          ) : (
            orientationText
          )}
        </div>
      }
      metadata={<MetadataRail label="Record metadata" items={metadataItems} />}
      relationships={
        hasRelationships ? <RecordTrace source={record} registry={registry} /> : undefined
      }
      credits={
        record.authorship.collaborators?.length ? (
          <ul>
            {record.authorship.collaborators.map((collaborator) => (
              <li key={collaborator.name} className="type-annotation">
                {collaborator.name}
                {collaborator.role ? ` — ${collaborator.role}` : ""}
              </li>
            ))}
          </ul>
        ) : undefined
      }
    />
  );
}
