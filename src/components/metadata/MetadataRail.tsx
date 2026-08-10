import type { ReactNode } from "react";

/**
 * Metadata Rail — shared structured secondary information with
 * compact-screen reflow (IMPLEMENTATION_PLAN.md §7, M2.9). A real `<dl>`
 * of label/value pairs; a "rail" is a role, not a fixed sidebar
 * (DESIGN_SYSTEM.md v1.1 §34.2) — this component makes no layout-position
 * assumption of its own, it only lays out its own label/value pairs.
 *
 * Data-driven, not a compound component: unlike Tabs (M2.6), items here
 * need no individual keyboard coordination or parent-managed selection
 * state, so the smallest sufficient API is a flat `items` array — the same
 * shape RadioGroup/SegmentedView (M2.6) already established for this kind
 * of "list of related things" primitive.
 */
export interface MetadataEntry {
  label: string;
  value: ReactNode;
  /** Primary/Secondary/Latent hierarchy (§22.1–§22.3). Defaults to "secondary" — the ordinary case. */
  tier?: "primary" | "secondary" | "latent";
  /** Optional accessible clarification, always rendered visibly (never hover/AT-only). */
  clarification?: string;
  /** Optional group label. Consecutive entries sharing the same group render inside one named group. */
  group?: string;
}

interface MetadataRailProps {
  label: string;
  items: MetadataEntry[];
}

interface Run {
  group?: string;
  items: MetadataEntry[];
}

/** Partitions items into consecutive runs by `group`, preserving supplied order (§B9 — never reordered/alphabetized). */
function partitionIntoRuns(items: MetadataEntry[]): Run[] {
  const runs: Run[] = [];
  for (const item of items) {
    const last = runs[runs.length - 1];
    if (last && last.group === item.group) {
      last.items.push(item);
    } else {
      runs.push({ group: item.group, items: [item] });
    }
  }
  return runs;
}

export function MetadataRail({ label, items }: MetadataRailProps) {
  const runs = partitionIntoRuns(items);

  return (
    <dl className="metadata-rail" aria-label={label}>
      {runs.map((run, runIndex) =>
        run.group !== undefined ? (
          <div
            className="metadata-group"
            role="group"
            aria-label={run.group}
            key={`group-${runIndex}`}
          >
            {run.items.map((item, itemIndex) => (
              <MetadataItemRow item={item} key={itemIndex} />
            ))}
          </div>
        ) : (
          run.items.map((item, itemIndex) => (
            <MetadataItemRow item={item} key={`ungrouped-${runIndex}-${itemIndex}`} />
          ))
        ),
      )}
    </dl>
  );
}

function MetadataItemRow({ item }: { item: MetadataEntry }) {
  const tier = item.tier ?? "secondary";

  return (
    <div className="metadata-item" data-tier={tier}>
      <dt className="metadata-label type-metadata">{item.label}</dt>
      <dd className="metadata-value type-metadata">
        {item.value}
        {item.clarification !== undefined && (
          <span className="metadata-clarification"> ({item.clarification})</span>
        )}
      </dd>
    </div>
  );
}
