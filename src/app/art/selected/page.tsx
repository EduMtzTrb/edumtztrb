import { CuratedViewShell } from "@/components/page-shells/PageShell";
import { PortalRecord } from "@/components/records/PortalRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { DirectEntryOrientation } from "@/components/shell/DirectEntryOrientation";
import { orientationForSection } from "@/components/shell/orientation";
import { allFixtureRecords } from "@/domain/records/fixtures";
import { selectPublicComprehensiveView } from "@/domain/records/LifecycleArchiveModel";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";

/**
 * Art — Selected. Filters on `featured === true` — the same editorial
 * curatorial mechanism `/work/selected` uses (M5.2), not a state-based
 * mechanism like Research's Current or Lab's Active. Both the route name
 * ("Selected," matching Work's own) and the district's own authority
 * (ART_UNIVERSE_v1.1.md §10: "Curated Field — the primary experience...
 * curatorial relationships, not equal cards" — an editorial act) support
 * this choice; ART-25 confirms "a curated foreground coexists with a
 * complete precise index," the same curated/comprehensive split every
 * other district already implements. No fixture is currently marked
 * featured, so this page honestly renders `EmptyState` — no curatorial
 * judgment is fabricated.
 */
const orientation = orientationForSection({
  district: "art",
  currentLabel: "Selected",
  currentHref: "/art/selected",
});

export default function ArtSelectedPage() {
  const selected = selectPublicComprehensiveView(allFixtureRecords, "art").filter(
    (record) => record.featured === true,
  );

  return (
    <CuratedViewShell heading="Art — Selected">
      <DirectEntryOrientation context={orientation} />
      {selected.length === 0 ? (
        <EmptyState
          heading="No work is currently marked as selected."
          explanation="Selected is an editable curatorial state, not a permanent ranking — none of the current records has been marked featured yet."
        />
      ) : (
        <div>
          {selected.map((record) => (
            <PortalRecord
              key={record.id}
              title={record.title}
              href={resolveCanonicalRoute(record)}
              orientation={record.summary}
            />
          ))}
        </div>
      )}
    </CuratedViewShell>
  );
}
