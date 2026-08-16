import Link from "next/link";

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
import { listIncomingRelationships } from "@/domain/records/RelationshipModel";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import { deriveCommitmentAvailability } from "@/domain/commerce/transactionBoundary";
import type { CanonicalRecordBase } from "@/domain/records/CanonicalRecord";
import type { ProductsRecord } from "@/domain/records/DistrictExtensions";

/**
 * Products — canonical record. Real M3.1 registry lookup, the same
 * mechanism M5.2 built for Work, retargeted to `ownerDistrict: "products"`.
 *
 * EVIDENCE HIERARCHY — deliberately the most resolved/transactional of any
 * district built so far (see docs/implementation/M5.6_PRODUCTS.md "Products
 * vs Work vs Art"). DESIGN_SYSTEM.md §75: "strong Primary metadata...
 * transaction-critical information may not become latent." Primary
 * evidence is the value proposition plus price and availability — the
 * exact "essential commercial information always before extended
 * narrative" order PRODUCTS_UNIVERSE_v1.1.md §10 requires. Supporting
 * evidence (inclusions/exclusions, fulfilment, license summary,
 * requirements, support) is real detail, genuinely secondary to the
 * commit-or-not decision, but never hidden behind interaction.
 *
 * NO TRANSACTION INFRASTRUCTURE — `commitmentLabel` ("Purchase") is
 * rendered as plain descriptive text in Metadata, never as a clickable
 * control — there is no checkout, cart, or payment behavior to attach to a
 * button, and a non-functional button would be exactly the "fake Buy
 * button" this package is explicitly forbidden from creating.
 *
 * COMMITMENT TRUTH (M6.5, `src/domain/commerce/transactionBoundary.ts`,
 * see docs/implementation/M6.5_PRODUCTS_TRANSACTION_BOUNDARY.md) —
 * whether the commitment label is even shown, and why not when it isn't,
 * is now derived from the record's own real `commercialState` plus the
 * real, repository-verified absence of M6.6 transaction configuration —
 * never a blanket "not implemented yet" string. An unavailable/archived/
 * sold-out (etc.) record shows no commitment label at all, with the real
 * state named as the reason; a genuinely offerable record still shows no
 * functional control, with the real M6.6 configuration gap named as the
 * reason instead. Transactional execution itself remains
 * `IMPLEMENTATION_PLAN.md`'s own Milestone 6.6 scope.
 *
 * ORIGIN CROSS-LINK (PRODUCTS_UNIVERSE_v1.1.md §9: "product records
 * reciprocally show origin district and a deliberate route back") — uses
 * M3.5's own `listIncomingRelationships` (`RelationshipModel.ts`,
 * unmodified), the same "derive the reverse edge by scanning outgoing
 * relationships, never a second stored edge" mechanism M3.5 already
 * proved. Rendered with `Trace`'s own `.trace`/`.line-structural` classes
 * for visual consistency — composed here, not a new component.
 */

function isProductsRecord(record: CanonicalRecordBase): record is ProductsRecord {
  return record.ownerDistrict === "products" && "extension" in record;
}

function findProductRecord(slug: string): CanonicalRecordBase | ProductsRecord | undefined {
  const extended = allFixtureDistrictRecords.find(
    (record) => record.ownerDistrict === "products" && record.slug === slug,
  );
  if (extended) return extended as ProductsRecord;
  return allFixtureRecords.find(
    (record) => record.ownerDistrict === "products" && record.slug === slug,
  );
}

function formatDate(record: CanonicalRecordBase): string | undefined {
  if (!record.date) return undefined;
  if (record.date.kind === "year") return String(record.date.year);
  if (record.date.kind === "date") return record.date.date;
  return record.date.end ? `${record.date.start}–${record.date.end}` : `${record.date.start}–`;
}

function formatPrice(extension: ProductsRecord["extension"]): string | undefined {
  const basis = extension.priceBasis;
  if (!basis) return undefined;
  if (basis.kind === "fixed") return `${basis.amount} ${basis.currency}`;
  if (basis.kind === "from") return `From ${basis.amount} ${basis.currency}`;
  if (basis.kind === "quotation-required") return "Quotation required";
  return "Hourly or package basis";
}

export default async function ProductsEntryPage({ params }: PageProps<"/products/[entry]">) {
  const { entry } = await params;
  const record = findProductRecord(entry);
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
    { label: "Content type", value: record.contentType, tier: "secondary" },
    { label: "Status", value: record.lifecycle, tier: "secondary" },
  ];
  const date = formatDate(record);
  if (date) metadataItems.push({ label: "Date", value: date, tier: "secondary" });

  const extension = isProductsRecord(record) ? record.extension : undefined;
  if (extension?.commercialState) {
    metadataItems.push({
      label: "Availability",
      value: extension.commercialState,
      tier: "primary",
    });
  }
  const price = extension ? formatPrice(extension) : undefined;
  if (price) metadataItems.push({ label: "Price", value: price, tier: "primary" });
  if (extension?.productFamily) {
    metadataItems.push({ label: "Family", value: extension.productFamily, tier: "secondary" });
  }
  const commitment = extension ? deriveCommitmentAvailability(extension) : undefined;
  if (commitment?.label) {
    metadataItems.push({
      label: "Commitment",
      value: commitment.label,
      tier: "secondary",
      clarification: commitment.reason,
    });
  } else if (commitment) {
    metadataItems.push({
      label: "Commitment",
      value: "Not currently available",
      tier: "latent",
      clarification: commitment.reason,
    });
  }

  const primaryEvidence: { label: string; text: string }[] = [
    { label: "Summary", text: record.summary },
  ];
  if (extension?.proposition) {
    primaryEvidence.push({ label: "Proposition", text: extension.proposition });
  }

  const supportingEvidence: { label: string; text: string }[] = [];
  if (extension?.intendedRecipient) {
    supportingEvidence.push({ label: "For", text: extension.intendedRecipient });
  }
  if (extension?.included) supportingEvidence.push({ label: "Included", text: extension.included });
  if (extension?.exclusions) {
    supportingEvidence.push({ label: "Excluded", text: extension.exclusions });
  }
  if (extension?.fulfilmentMethod) {
    supportingEvidence.push({ label: "Fulfilment", text: extension.fulfilmentMethod });
  }
  if (extension?.leadTime)
    supportingEvidence.push({ label: "Lead time", text: extension.leadTime });
  if (extension?.licenseSummary) {
    supportingEvidence.push({ label: "License", text: extension.licenseSummary });
  }
  if (extension?.requirements) {
    supportingEvidence.push({ label: "Requirements", text: extension.requirements });
  }
  if (extension?.support) supportingEvidence.push({ label: "Support", text: extension.support });

  const registry = createRecordRegistry(allFixtureRecords);
  const hasOutgoing = (record.relationships ?? []).length > 0;
  const incoming = listIncomingRelationships(record.id, allFixtureRecords);
  const hasRelationships = hasOutgoing || incoming.length > 0;

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
        hasRelationships ? (
          <div>
            {hasOutgoing && <RecordTrace source={record} registry={registry} />}
            {incoming.length > 0 && (
              <div className="trace-group" aria-label="Origin relationships">
                {incoming.map((rel) => {
                  const source = registry.get(rel.sourceId);
                  if (!source) return null;
                  return (
                    <div
                      key={`${rel.sourceId}-${rel.type}`}
                      className="trace line-structural"
                      data-relationship-type={rel.type}
                    >
                      <span className="trace-source type-label">{record.title}</span>
                      <span className="trace-label type-metadata">{rel.label}</span>
                      <Link href={resolveCanonicalRoute(source)} className="trace-destination">
                        {source.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
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
