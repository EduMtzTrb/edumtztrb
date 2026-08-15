import { DistrictOverviewShell } from "@/components/page-shells/PageShell";
import { DistrictField } from "@/components/composition/DistrictField";
import { PortalRecord } from "@/components/records/PortalRecord";
import { RecordTrace } from "@/components/trace/Trace";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { fixtureArtRecordWithExtension } from "@/domain/records/district-fixtures";
import { createRecordRegistry } from "@/domain/records/registry";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import { isPubliclyDiscoverable } from "@/domain/records/registry";

/**
 * Art — M5.5 district overview ("The Chamber of Attention,"
 * ART_UNIVERSE_v1.1.md §2). See docs/implementation/M5.5_ART.md for the
 * full audit.
 *
 * CONTENT BOUNDARY — the two orientation sentences are exact approved
 * quotes: the canonical formula ("Art concentrates perception.", §1) and
 * the approved closing statement ("The Art Universe is where the platform
 * makes perception inhabitable.", §27/Merge Note). The curated highlight,
 * its metadata, and its relationship trace use the one existing public M3
 * fixture record (`fixtureArtRecordWithExtension`) — clearly disclosed as
 * fixture.
 *
 * DENSITY — `density="concentrated"`, deliberately different from Work/
 * Research/Lab's shared `"moderate"`. DESIGN_SYSTEM.md §74 gives Art the
 * most distinct compositional register of any district built so far:
 * "strongest interface recession; concentrated void; very low visible
 * metadata at primary encounter." `district-composition.css`'s own
 * `concentrated` value (M5.0) — primary itself offset off-axis, void on
 * both sides, a narrow one-column peripheral edge — is the exact match for
 * that register; `moderate`'s balanced flush split would contradict §74's
 * "concentrated void" language. This is the first genuine per-district
 * density divergence in Milestone 5, reasoned explicitly rather than
 * copied from precedent (the same discipline M5.2's own density audit
 * established for auditing, not assuming, the correct value).
 *
 * STRUCTURE — the curated highlight lives in `DistrictField`'s `primary`
 * zone (M5.2's calibrated lesson: `.district-field-peripheral` permanently
 * carries peripheral latency, wrong for curated foreground). `peripheral`
 * is intentionally omitted — Art has no M4.9 threshold wiring of its own,
 * and `DistrictNav` already reaches Selected/Series/Medium/Exhibitions/
 * Archive without duplicating those links here.
 *
 * "Curated Field" (the eyebrow label below) is ART_UNIVERSE_v1.1.md §10's
 * own approved Homepage zone name — "the primary experience: a variable
 * spatial composition where scale, distance, and grouping communicate
 * curatorial relationships, not equal cards" — reused verbatim, the same
 * discipline M5.2/M5.3/M5.4 used for their own eyebrow labels.
 */
export default function ArtOverviewPage() {
  const registry = createRecordRegistry(allFixtureRecords);
  const highlighted = isPubliclyDiscoverable(fixtureArtRecordWithExtension)
    ? fixtureArtRecordWithExtension
    : undefined;

  const metadataItems: MetadataEntry[] = [];
  if (highlighted) {
    if (highlighted.extension.medium) {
      metadataItems.push({ label: "Medium", value: highlighted.extension.medium });
    }
    metadataItems.push({ label: "Content type", value: highlighted.contentType, tier: "latent" });
  }

  return (
    <DistrictOverviewShell heading="Art">
      <DistrictField
        density="concentrated"
        primary={
          <div>
            <div className="measure">
              <p className="type-body">Art concentrates perception.</p>
              <p className="type-body">
                The Art Universe is where the platform makes perception inhabitable.
              </p>
            </div>
            {highlighted && (
              <div className="curated-highlight">
                <p className="type-label">Curated Field</p>
                <p className="type-annotation">M3 fixture record — not real public content</p>
                <PortalRecord
                  title={highlighted.title}
                  href={resolveCanonicalRoute(highlighted)}
                  orientation={highlighted.summary}
                />
                <MetadataRail label="Curated Field metadata" items={metadataItems} />
                <RecordTrace source={highlighted} registry={registry} />
              </div>
            )}
          </div>
        }
      />
    </DistrictOverviewShell>
  );
}
