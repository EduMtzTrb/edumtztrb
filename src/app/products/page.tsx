import { DistrictOverviewShell } from "@/components/page-shells/PageShell";
import { DistrictField } from "@/components/composition/DistrictField";
import { PortalRecord } from "@/components/records/PortalRecord";
import { MetadataRail } from "@/components/metadata/MetadataRail";
import type { MetadataEntry } from "@/components/metadata/MetadataRail";
import { fixtureProductRecordWithExtension } from "@/domain/records/district-fixtures";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";
import { isPubliclyDiscoverable } from "@/domain/records/registry";

/**
 * Products — M5.6 district overview ("The Quiet Exchange Hall,"
 * PRODUCTS_UNIVERSE_v1.1.md §5). See docs/implementation/M5.6_PRODUCTS.md
 * for the full audit.
 *
 * CONTENT BOUNDARY — the two orientation sentences are exact approved
 * quotes: the canonical formula ("Products operationalizes value.", §1)
 * and the approved closing tagline ("Products is where value becomes
 * offerable.", Merge Note/§21). The curated highlight and its metadata use
 * the one existing public M3 fixture record with a real extension
 * (`fixtureProductRecordWithExtension`) — clearly disclosed as fixture.
 *
 * DENSITY — `density="moderate"`, matching Work/Research/Lab's shared
 * value. DESIGN_SYSTEM.md §75 gives Products "moderate efficient density;
 * strong Primary metadata... Transaction-critical information may not
 * become latent" — the opposite register from Art's `concentrated` void
 * (§74). `moderate`'s balanced flush split is the correct match: dense
 * enough to keep price/availability legible at a glance (never demoted to
 * a latent tier the way Art's own metadata is), calm enough not to read as
 * a storefront grid.
 *
 * STRUCTURE — the curated highlight lives in `primary` (M5.2's calibrated
 * lesson), `peripheral` intentionally omitted — same reasoning as
 * Research/Lab/Art. "Current Display" (the eyebrow label) is
 * PRODUCTS_UNIVERSE_v1.1.md §10's own approved Homepage zone name — "a
 * spacious showroom zone, convincing with one item, controlled with
 * several" — reused verbatim.
 */
export default function ProductsOverviewPage() {
  const highlighted = isPubliclyDiscoverable(fixtureProductRecordWithExtension)
    ? fixtureProductRecordWithExtension
    : undefined;

  const metadataItems: MetadataEntry[] = [];
  if (highlighted) {
    if (highlighted.extension.commercialState) {
      metadataItems.push({
        label: "Availability",
        value: highlighted.extension.commercialState,
        tier: "primary",
      });
    }
    if (highlighted.extension.priceBasis) {
      const basis = highlighted.extension.priceBasis;
      const priceText =
        basis.kind === "fixed" || basis.kind === "from"
          ? `${basis.kind === "from" ? "From " : ""}${basis.amount} ${basis.currency}`
          : basis.kind === "quotation-required"
            ? "Quotation required"
            : "Hourly or package basis";
      metadataItems.push({ label: "Price", value: priceText, tier: "primary" });
    }
    if (highlighted.extension.productFamily) {
      metadataItems.push({ label: "Family", value: highlighted.extension.productFamily });
    }
  }

  return (
    <DistrictOverviewShell heading="Products">
      <DistrictField
        density="moderate"
        primary={
          <div>
            <div className="measure">
              <p className="type-body">Products operationalizes value.</p>
              <p className="type-body">Products is where value becomes offerable.</p>
            </div>
            {highlighted && (
              <div className="curated-highlight">
                <p className="type-label">Current Display</p>
                <p className="type-annotation">M3 fixture record — not real public content</p>
                <PortalRecord
                  title={highlighted.title}
                  href={resolveCanonicalRoute(highlighted)}
                  orientation={highlighted.summary}
                />
                <MetadataRail label="Current Display metadata" items={metadataItems} />
              </div>
            )}
          </div>
        }
      />
    </DistrictOverviewShell>
  );
}
