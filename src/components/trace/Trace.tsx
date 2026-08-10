import Link from "next/link";

import { listOutgoingRelationships, resolveRelationship } from "@/domain/records/RelationshipModel";
import type {
  CanonicalRecordBase,
  CanonicalRecordId,
  CanonicalRelationshipReference,
} from "@/domain/records/CanonicalRecord";

/**
 * Trace — M4.10. Renders one real, stored M3.5 semantic relationship as a
 * visible Trace — never a decorative/inferred connection.
 *
 * DATA-DRIVEN, NEVER DECORATIVE (§C9/§C20) — the entire chain is real:
 * `resolveRelationship` (M3.5, unmodified) resolves the target through
 * the actual registry and derives its label from the actual stored
 * `CanonicalRelationshipType`; the destination link is M3.3's own
 * `resolveCanonicalRoute` (via `resolveRelationship`), never a
 * Trace-specific route. There is no code path in this component that can
 * render a line between two records that do not have a real stored
 * relationship — `RecordTrace` (below) proves this by construction: it
 * maps only over `listOutgoingRelationships(source)`, so an empty
 * relationship array produces no output at all.
 *
 * NO NEW LINE TOKEN — `DESIGN_SYSTEM.md v1.1` approves the name
 * `line-relationship-trace` but (per `src/styles/tokens/geometry.css`'s
 * own header comment) gives it no weight/color; M2.4 deliberately left it
 * unresolved. This component reuses the already-resolved `.line-
 * structural` primitive (M2.4) instead of unilaterally resolving a new
 * token value — the same "reuse an existing resolved primitive rather
 * than invent a new one" discipline M4.5 already applied to `.plane`/
 * `.frame`. See docs/implementation/M4.10_COMPARISON_TRACE_PROTOTYPES.md.
 */
interface TraceProps {
  source: CanonicalRecordBase;
  relationship: CanonicalRelationshipReference;
  registry: ReadonlyMap<CanonicalRecordId, CanonicalRecordBase>;
}

export function Trace({ source, relationship, registry }: TraceProps) {
  const target = registry.get(relationship.targetId);
  if (!target) return null;

  const resolved = resolveRelationship(source, relationship, registry);

  return (
    <div className="trace line-structural" data-relationship-type={resolved.type}>
      <span className="trace-source type-label">{source.title}</span>
      <span className="trace-label type-metadata">{resolved.label}</span>
      <Link href={resolved.targetRoute} className="trace-destination">
        {target.title}
      </Link>
    </div>
  );
}

/**
 * RecordTrace — the real per-record consumer: renders one `Trace` per
 * genuine outgoing relationship, and nothing at all when there are none
 * (§C20: "missing relationship produces no visual Trace").
 */
interface RecordTraceProps {
  source: CanonicalRecordBase;
  registry: ReadonlyMap<CanonicalRecordId, CanonicalRecordBase>;
}

export function RecordTrace({ source, registry }: RecordTraceProps) {
  const relationships = listOutgoingRelationships(source);
  if (relationships.length === 0) return null;

  return (
    <div className="trace-group" aria-label="Relationships">
      {relationships.map((relationship) => (
        <Trace
          key={`${relationship.targetId}-${relationship.type}`}
          source={source}
          relationship={relationship}
          registry={registry}
        />
      ))}
    </div>
  );
}
