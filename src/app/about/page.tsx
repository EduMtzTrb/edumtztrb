import { DistrictOverviewShell } from "@/components/page-shells/PageShell";
import { DistrictField } from "@/components/composition/DistrictField";
import { PortalRecord } from "@/components/records/PortalRecord";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { ActionLink } from "@/components/controls/ActionLink";
import { fixtureAboutRecordWithExtension } from "@/domain/records/district-fixtures";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import { isPubliclyDiscoverable } from "@/domain/records/registry";

/**
 * About — M5.7 district overview ("The Archive House," ABOUT_UNIVERSE_v1.1.md
 * §20). See docs/implementation/M5.7_ABOUT.md for the full audit.
 *
 * CONTENT BOUNDARY — the two orientation sentences are exact approved
 * quotes: the governing principle ("About reveals authorship, continuity,
 * and intent.", §1) and the approved closing tagline ("About is where
 * authorship becomes legible.", Merge Note/§32). The Position content
 * (practice statement, location, languages, availability) uses the one
 * existing public M3 fixture record (`fixtureAboutRecordWithExtension`) —
 * clearly disclosed as fixture.
 *
 * AUTHORSHIP ANCHOR — still `Content Decision Required` (see
 * docs/implementation/M5.7_ABOUT.md "Authorship Status"). No governing
 * document supplies an approved public-facing personal name; none is
 * invented anywhere in this package. The record's fixture authorship name
 * ("Fixture Author") is rendered exactly as every other district already
 * discloses it — clearly fixture content, never presented as the real
 * platform identity.
 *
 * STRUCTURE — unlike Work/Research/Lab/Art/Products, About has no
 * curated-vs-comprehensive split (ABOUT_UNIVERSE_v1.1.md §7: one
 * continuous district, not an archive of many records) — the overview's
 * `primary` zone presents the Position entrance directly (ABOUT_UNIVERSE
 * §8: name, position, operating context, primary territory, short
 * statement) rather than a "curated highlight" of a second record.
 * `density="moderate"` per DESIGN_SYSTEM.md §76's own explicit word
 * ("moderate density... editorial/human reading rhythm").
 */
export default function AboutOverviewPage() {
  const record = isPubliclyDiscoverable(fixtureAboutRecordWithExtension)
    ? fixtureAboutRecordWithExtension
    : undefined;

  const metadataItems: MetadataEntry[] = [];
  if (record) {
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
  }

  return (
    <DistrictOverviewShell heading="About">
      <DistrictField
        density="moderate"
        primary={
          <div>
            <div className="measure">
              <p className="type-body">About reveals authorship, continuity, and intent.</p>
              <p className="type-body">About is where authorship becomes legible.</p>
            </div>
            {record && (
              <div className="curated-highlight">
                <p className="type-label">Position</p>
                <p className="type-annotation">M3 fixture record — not real public content</p>
                {record.extension.practiceStatement && (
                  <p className="measure type-body">{record.extension.practiceStatement}</p>
                )}
                <PortalRecord
                  title={record.title}
                  href={resolveCanonicalRoute(record)}
                  orientation={record.summary}
                />
                <MetadataRail label="Position metadata" items={metadataItems} />
                <p>
                  <ActionLink href="/contact" kind="route">
                    Contact
                  </ActionLink>
                </p>
              </div>
            )}
          </div>
        }
      />
    </DistrictOverviewShell>
  );
}
