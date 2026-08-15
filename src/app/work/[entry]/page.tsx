import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForRecord } from "@/components/shell/orientation";
import { RecordReturnControl } from "@/components/return/RecordReturnControl";
import { RecordPassageArrival } from "@/components/return/RecordPassageArrival";
import { RecordTrace } from "@/components/trace/Trace";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { UnavailableState } from "@/components/state/UnavailableState";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { allFixtureDistrictRecords } from "@/domain/records/district-fixtures";
import { createRecordRegistry, isDirectlyAccessible } from "@/domain/records/registry";
import type { CanonicalRecordBase } from "@/domain/records/CanonicalRecord";
import type { WorkRecord } from "@/domain/records/DistrictExtensions";

/**
 * Work — canonical record. M5.2 gives this route (previously a string-
 * interpolated placeholder — see M5.1/M5.0-era `Work — {entry}` heading)
 * its first real M3.1 registry lookup: any `ownerDistrict: "work"` fixture
 * record reachable by direct entry (`isDirectlyAccessible` — M3.1's own
 * rule: included + not-private; the excluded/private
 * `fixtureUnpublishedWorkRecord` correctly resolves to "unavailable," never
 * leaking private content) renders its real evidence, metadata, and
 * relationships. An unknown or inaccessible slug renders `UnavailableState`
 * honestly, never a fabricated record.
 *
 * Prefers the richer `WorkRecord` (with its `WorkExtension` — context,
 * contribution, process, outcome) when the matched record has one;
 * `evidence`/`metadata`/`relationships`/`credits` are each present only
 * when the record actually supplies that data (M1.5's own optional-region
 * contract — no invented placeholder text fills an empty region).
 *
 * EVIDENCE HIERARCHY (M5.2 calibration — see docs/implementation/
 * M5.2_WORK.md "Canonical-Record Evidence Hierarchy" / "Outcome
 * Authority"): the `evidence` region's real content is split into two
 * reusable groups (`.evidence-primary`/`.evidence-supporting`,
 * canonical-record.css) rather than one uniform list — Summary and Outcome
 * (the resolved result) keep full color authority; Process/Context/
 * Contribution sit one visual step back, behind their own hairline, using
 * the exact Secondary metadata tier MetadataRail already establishes. No
 * evidence text was invented or reworded — only grouped and weighted.
 *
 * Consumes M4.8 Record Passage (`RecordPassageArrival`/`RecordReturnControl`,
 * unchanged) exactly as M4.8 built it — genuine passage detection via the
 * one fixed `WORK_RECORD_PASSAGE_RETURN_KEY`, real only when arrival came
 * from `/index/district/work`'s `PassageIndexRecord`, never fabricated for
 * a direct or `/work/all`-originated visit.
 */

function isWorkRecord(record: CanonicalRecordBase): record is WorkRecord {
  return record.ownerDistrict === "work" && "extension" in record;
}

function findWorkRecord(slug: string): CanonicalRecordBase | WorkRecord | undefined {
  const extended = allFixtureDistrictRecords.find(
    (record) => record.ownerDistrict === "work" && record.slug === slug,
  );
  if (extended) return extended as WorkRecord;
  return allFixtureRecords.find(
    (record) => record.ownerDistrict === "work" && record.slug === slug,
  );
}

function formatDate(record: CanonicalRecordBase): string | undefined {
  if (!record.date) return undefined;
  if (record.date.kind === "year") return String(record.date.year);
  if (record.date.kind === "date") return record.date.date;
  return record.date.end ? `${record.date.start}–${record.date.end}` : `${record.date.start}–`;
}

export default async function WorkEntryPage({ params }: PageProps<"/work/[entry]">) {
  const { entry } = await params;
  const record = findWorkRecord(entry);
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

  const extension = isWorkRecord(record) ? record.extension : undefined;
  const primaryEvidence: { label: string; text: string }[] = [
    { label: "Summary", text: record.summary },
  ];
  if (extension?.outcome) primaryEvidence.push({ label: "Outcome", text: extension.outcome });

  const supportingEvidence: { label: string; text: string }[] = [];
  if (extension?.process) supportingEvidence.push({ label: "Process", text: extension.process });
  if (extension?.context) supportingEvidence.push({ label: "Context", text: extension.context });
  if (extension?.contribution) {
    supportingEvidence.push({ label: "Contribution", text: extension.contribution });
  }

  const registry = createRecordRegistry(allFixtureRecords);
  const hasRelationships = (record.relationships ?? []).length > 0;

  return (
    <RecordPassageArrival entrySlug={entry} recordTitle={record.title}>
      <CanonicalRecordShell
        heading={record.title}
        publicState="M3 fixture record — not real public content"
        authorship={record.authorship.primary.name}
        context={<DirectEntryOrientation context={orientation} />}
        evidence={
          <div>
            <div className="evidence-primary">
              {primaryEvidence.map((part) => (
                <p
                  key={part.label}
                  className={
                    part.label === "Outcome" ? "measure type-body-large" : "measure type-body"
                  }
                >
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
        continuation={<RecordReturnControl entrySlug={entry} />}
      />
    </RecordPassageArrival>
  );
}
