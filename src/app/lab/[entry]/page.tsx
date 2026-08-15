import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForRecord } from "@/components/shell/orientation";
import { RecordTrace } from "@/components/trace/Trace";
import { Comparison } from "@/components/comparison/Comparison";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { UnavailableState } from "@/components/state/UnavailableState";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { allFixtureDistrictRecords } from "@/domain/records/district-fixtures";
import { createRecordRegistry, isDirectlyAccessible } from "@/domain/records/registry";
import type { CanonicalRecordBase } from "@/domain/records/CanonicalRecord";
import type { LabRecord } from "@/domain/records/DistrictExtensions";

/**
 * Lab — canonical record. Real M3.1 registry lookup, the same mechanism
 * M5.2 built for Work, retargeted to `ownerDistrict: "lab"`.
 *
 * EVIDENCE HIERARCHY — deliberately NOT a copy of Work's or Research's
 * (see docs/implementation/M5.4_LAB.md "Lab vs Research vs Work"). Primary
 * evidence pairs the framed uncertainty (`experimentQuestion` —
 * LAB_UNIVERSE_v1.1.md §5's first qualification element) with `observation`
 * (§5's third element, "observable evidence... that can be inspected") —
 * the real question-and-result pairing a test actually produces, at full
 * color authority (this is genuinely observable evidence, not a false
 * "resolved" claim the way Work's Outcome is, nor a provisional hypothesis
 * the way Research's Position is). Setup/transformation (`method`), raw
 * `evidence` narrative, `failureNote`, `nextQuestion`, and `lineageNote`
 * sit in supporting evidence — real, but secondary to the question/result
 * pairing.
 *
 * COMPARISON (M4.10) — Lab is the first district to materially wire a real
 * `Comparison` consumer into a canonical record page, per this batch's own
 * instruction. `findComparablePredecessor` looks for a real, stored
 * `derived-from` relationship (M3.1's own six-type vocabulary — no
 * seventh type invented) to another Lab-owned record and, only when one
 * exists, renders both records' real Method/Evidence/Observation/State
 * fields side by side. No fixture record currently carries a `derived-from`
 * Lab-to-Lab relationship, so this renders nothing on the live route today
 * — honestly absent, not fabricated, the same "renders only from real
 * data" discipline `RecordTrace` already established. The consuming logic
 * itself is real and covered by a dedicated test using two inline
 * Lab-shaped records (never added to the shared M3 fixture corpus).
 *
 * `LabComparisonFixture` (`src/components/comparison/LabComparisonFixture.tsx`,
 * M4.10) is explicitly fixture-labeled demo data ("Attempt A/B/C") living
 * only at `/contact?motion-fixture=m4c` — deliberately not reused here,
 * since this route must never show fabricated attempt data as if it were
 * a real experiment record.
 */

function isLabRecord(record: CanonicalRecordBase): record is LabRecord {
  return record.ownerDistrict === "lab" && "extension" in record;
}

function findLabRecord(slug: string): CanonicalRecordBase | LabRecord | undefined {
  const extended = allFixtureDistrictRecords.find(
    (record) => record.ownerDistrict === "lab" && record.slug === slug,
  );
  if (extended) return extended as LabRecord;
  return allFixtureRecords.find((record) => record.ownerDistrict === "lab" && record.slug === slug);
}

function formatDate(record: CanonicalRecordBase): string | undefined {
  if (!record.date) return undefined;
  if (record.date.kind === "year") return String(record.date.year);
  if (record.date.kind === "date") return record.date.date;
  return record.date.end ? `${record.date.start}–${record.date.end}` : `${record.date.start}–`;
}

/**
 * Finds a real predecessor for Comparison: a stored `derived-from`
 * relationship (either direction) resolving to another Lab-owned record
 * with a `LabExtension`. Returns `undefined` — never a fabricated
 * pairing — when no such relationship exists.
 */
export function findComparablePredecessor(
  record: CanonicalRecordBase,
  registry: ReadonlyMap<string, CanonicalRecordBase>,
): LabRecord | undefined {
  const derivedFrom = (record.relationships ?? []).find((rel) => rel.type === "derived-from");
  if (!derivedFrom) return undefined;
  const target = registry.get(derivedFrom.targetId);
  if (!target || !isLabRecord(target)) return undefined;
  return target;
}

function comparisonRows(predecessor: LabRecord, current: LabRecord) {
  const fields: {
    label: string;
    key: "method" | "evidence" | "observation" | "experimentState";
  }[] = [
    { label: "Method", key: "method" },
    { label: "Evidence", key: "evidence" },
    { label: "Observation", key: "observation" },
    { label: "State", key: "experimentState" },
  ];
  return fields
    .filter((field) => predecessor.extension[field.key] && current.extension[field.key])
    .map((field) => ({
      label: field.label,
      left: predecessor.extension[field.key] as string,
      right: current.extension[field.key] as string,
    }));
}

export default async function LabEntryPage({ params }: PageProps<"/lab/[entry]">) {
  const { entry } = await params;
  const record = findLabRecord(entry);
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

  const extension = isLabRecord(record) ? record.extension : undefined;
  if (extension?.experimentState) {
    metadataItems.push({ label: "State", value: extension.experimentState, tier: "secondary" });
  }
  if (extension?.version) {
    metadataItems.push({ label: "Version", value: extension.version, tier: "secondary" });
  }

  const primaryEvidence: { label: string; text: string }[] = [
    { label: "Summary", text: record.summary },
  ];
  if (extension?.experimentQuestion) {
    primaryEvidence.push({ label: "Question", text: extension.experimentQuestion });
  }
  if (extension?.observation) {
    primaryEvidence.push({ label: "Observation", text: extension.observation });
  }

  const supportingEvidence: { label: string; text: string }[] = [];
  if (extension?.method) supportingEvidence.push({ label: "Method", text: extension.method });
  if (extension?.evidence) supportingEvidence.push({ label: "Evidence", text: extension.evidence });
  if (extension?.failureNote) {
    supportingEvidence.push({ label: "Failure note", text: extension.failureNote });
  }
  if (extension?.nextQuestion) {
    supportingEvidence.push({ label: "Open edge", text: extension.nextQuestion });
  }
  if (extension?.lineageNote) {
    supportingEvidence.push({ label: "Lineage", text: extension.lineageNote });
  }

  const registry = createRecordRegistry(allFixtureRecords);
  const hasRelationships = (record.relationships ?? []).length > 0;
  const predecessor = isLabRecord(record) ? findComparablePredecessor(record, registry) : undefined;
  const comparison = predecessor && isLabRecord(record) ? comparisonRows(predecessor, record) : [];

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
        hasRelationships || comparison.length > 0 ? (
          <div>
            {hasRelationships && <RecordTrace source={record} registry={registry} />}
            {predecessor && comparison.length > 0 && (
              <Comparison
                leftHeading={predecessor.title}
                rightHeading={record.title}
                rows={comparison}
              />
            )}
          </div>
        ) : undefined
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
