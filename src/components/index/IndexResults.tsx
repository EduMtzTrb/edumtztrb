import { IndexRecord } from "@/components/records/IndexRecord";
import { PassageIndexRecord } from "@/components/return/PassageIndexRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { NoResultState } from "@/components/state/NoResultState";
import type { IndexResult } from "@/domain/records/IndexModel";
import type { CanonicalOwnerDistrict } from "@/domain/records/CanonicalRecord";

/**
 * Index results presentation — M3.10, corrected by M3.11. Reuses M2.7's
 * `IndexRecord` (the dense, scannable row primitive already built for
 * exactly this role) and M2.11's `EmptyState`/`NoResultState` — no new
 * record/state primitive was designed, per this task's own §D5 ("do not
 * redesign them").
 *
 * `scopeDescription` (M3.11 correction) — M3.10's original empty-state
 * branch used `result.lens` alone to decide between "genuinely empty"
 * (`EmptyState`) and "no match for this scope" (`NoResultState`). That
 * missed M3.11's own filter-narrowed case: filtering an already-lens-free
 * `/index` view down to zero results is "no match," not "nothing exists,"
 * but the constructed `IndexResult` in that case carries no `lens`. A
 * caller now supplies `scopeDescription` explicitly whenever ANY
 * narrowing (lens or filter) produced the empty result; its absence means
 * the underlying public source itself is empty.
 *
 * `passageCaptureDistrict` (M4.8, additive, default unset — every existing
 * caller's behavior is byte-for-byte unchanged) — when supplied, entries
 * owned by that one district render through `PassageIndexRecord` instead
 * of `IndexRecord`, capturing Return context on departure. Scoped to
 * exactly one representative district context per this task's own §A1 —
 * not a general passage system applied everywhere.
 */
interface IndexResultsProps {
  result: IndexResult;
  usingFixtures: boolean;
  scopeDescription?: string;
  passageCaptureDistrict?: CanonicalOwnerDistrict;
}

export function IndexResults({
  result,
  usingFixtures,
  scopeDescription,
  passageCaptureDistrict,
}: IndexResultsProps) {
  if (result.entries.length === 0) {
    return scopeDescription ? (
      <NoResultState heading="No public records match this Index scope." query={scopeDescription} />
    ) : (
      <EmptyState
        heading="No public records exist yet."
        explanation="This Index is empty because no canonical content has been published yet."
      />
    );
  }

  return (
    <>
      {usingFixtures && (
        <p className="index-fixture-notice" role="status">
          M3-B Fixture Data — not real public content
        </p>
      )}
      <p className="index-result-count">
        {result.count} {result.count === 1 ? "record" : "records"}
      </p>
      <div className="index-result-list">
        {result.entries.map((entry) =>
          entry.record.ownerDistrict === passageCaptureDistrict ? (
            <PassageIndexRecord
              key={entry.record.id}
              title={entry.record.title}
              href={entry.route}
              type={entry.record.contentType}
              date={entry.record.date?.kind === "year" ? entry.record.date.year : undefined}
              recordId={entry.record.id}
              slug={entry.record.slug}
              ownerDistrict={entry.record.ownerDistrict}
            />
          ) : (
            <IndexRecord
              key={entry.record.id}
              title={entry.record.title}
              href={entry.route}
              type={entry.record.contentType}
              date={entry.record.date?.kind === "year" ? entry.record.date.year : undefined}
            />
          ),
        )}
      </div>
    </>
  );
}
