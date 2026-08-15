import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForRecord } from "@/components/shell/orientation";
import { RecordTrace } from "@/components/trace/Trace";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { UnavailableState } from "@/components/state/UnavailableState";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { allFixtureDistrictRecords } from "@/domain/records/district-fixtures";
import { createRecordRegistry, isDirectlyAccessible } from "@/domain/records/registry";
import type { CanonicalRecordBase } from "@/domain/records/CanonicalRecord";
import type { ResearchRecord } from "@/domain/records/DistrictExtensions";

/**
 * Research — canonical record. Real M3.1 registry lookup, the same
 * mechanism M5.2 built for Work (`findWorkRecord`/`isWorkRecord`),
 * retargeted to `ownerDistrict: "research"`. An unknown or inaccessible
 * slug renders `UnavailableState` honestly, never a fabricated record.
 *
 * EVIDENCE HIERARCHY — deliberately NOT a copy of Work's (see
 * docs/implementation/M5.3_RESEARCH.md "Research vs Work" for the full
 * reasoning). Work's primary evidence emphasizes a resolved Outcome
 * (`type-body-large`) because Work resolves and demonstrates. Research
 * asks and interprets — RESEARCH_UNIVERSE_v1.1.md §11 explicitly warns
 * "the interface must never make a hypothesis look like a verified
 * result." So Research's primary evidence (Summary + Inquiry, the framed
 * question — "questions before claims," §11) uses only the ordinary
 * `type-body` weight, and `currentPosition` (findings/interpretation) sits
 * in supporting evidence alongside Context/Methods/Evidence
 * summary/Uncertainty — one visual step back, honestly signaling
 * "provisional," not "resolved." No field gets Work's Outcome-style
 * emphasis, because nothing in Research is resolved the way Work's Outcome
 * is; the composition itself encodes that epistemic distinction.
 */

function isResearchRecord(record: CanonicalRecordBase): record is ResearchRecord {
  return record.ownerDistrict === "research" && "extension" in record;
}

function findResearchRecord(slug: string): CanonicalRecordBase | ResearchRecord | undefined {
  const extended = allFixtureDistrictRecords.find(
    (record) => record.ownerDistrict === "research" && record.slug === slug,
  );
  if (extended) return extended as ResearchRecord;
  return allFixtureRecords.find(
    (record) => record.ownerDistrict === "research" && record.slug === slug,
  );
}

function formatDate(record: CanonicalRecordBase): string | undefined {
  if (!record.date) return undefined;
  if (record.date.kind === "year") return String(record.date.year);
  if (record.date.kind === "date") return record.date.date;
  return record.date.end ? `${record.date.start}–${record.date.end}` : `${record.date.start}–`;
}

export default async function ResearchEntryPage({ params }: PageProps<"/research/[entry]">) {
  const { entry } = await params;
  const record = findResearchRecord(entry);
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
    { label: "Content type", value: record.contentType },
    { label: "Status", value: record.lifecycle, tier: "secondary" },
  ];
  const date = formatDate(record);
  if (date) metadataItems.push({ label: "Date", value: date, tier: "secondary" });
  if (record.authorship.role) {
    metadataItems.push({ label: "Role", value: record.authorship.role, tier: "primary" });
  }

  const extension = isResearchRecord(record) ? record.extension : undefined;
  if (extension?.researchActivityState) {
    metadataItems.push({
      label: "Activity",
      value: extension.researchActivityState,
      tier: "secondary",
    });
  }

  const primaryEvidence: { label: string; text: string }[] = [
    { label: "Summary", text: record.summary },
  ];
  if (extension?.inquiry) primaryEvidence.push({ label: "Question", text: extension.inquiry });

  const supportingEvidence: { label: string; text: string }[] = [];
  if (extension?.context) supportingEvidence.push({ label: "Context", text: extension.context });
  if (extension?.methods) supportingEvidence.push({ label: "Methods", text: extension.methods });
  if (extension?.evidenceSummary) {
    supportingEvidence.push({ label: "Evidence", text: extension.evidenceSummary });
  }
  if (extension?.currentPosition) {
    supportingEvidence.push({ label: "Position", text: extension.currentPosition });
  }
  if (extension?.uncertainty) {
    supportingEvidence.push({ label: "Uncertainty", text: extension.uncertainty });
  }

  const registry = createRecordRegistry(allFixtureRecords);
  const hasRelationships = (record.relationships ?? []).length > 0;

  return (
    <CanonicalRecordShell
      heading={record.title}
      publicState="M3 fixture record — not real public content"
      authorship={record.authorship.primary.name}
      context={<DirectEntryOrientation context={orientation} />}
      evidence={
        <div>
          <div className="evidence-primary">
            {primaryEvidence.map((part) => (
              <p key={part.label} className="measure type-body">
                <strong className="type-label">{part.label}. </strong>
                {part.text}
              </p>
            ))}
          </div>
          {supportingEvidence.length > 0 && (
            <div className="evidence-supporting">
              {supportingEvidence.map((part) => (
                <p key={part.label} className="measure type-body">
                  <strong className="type-label">{part.label}. </strong>
                  {part.text}
                </p>
              ))}
            </div>
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
