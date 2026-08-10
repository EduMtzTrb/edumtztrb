import { IndexRecord } from "@/components/records/IndexRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { NoResultState } from "@/components/state/NoResultState";
import type { IndexResult } from "@/domain/records/IndexModel";

/**
 * Index results presentation — M3.10. Reuses M2.7's `IndexRecord` (the
 * dense, scannable row primitive already built for exactly this role) and
 * M2.11's `EmptyState`/`NoResultState` — no new record/state primitive was
 * designed, per this task's own §D5 ("do not redesign them").
 */
interface IndexResultsProps {
  result: IndexResult;
  usingFixtures: boolean;
}

export function IndexResults({ result, usingFixtures }: IndexResultsProps) {
  if (result.entries.length === 0) {
    return result.lens ? (
      <NoResultState
        heading="No public records match this Index scope."
        query={`${result.lens.dimension}: ${result.lens.value}`}
      />
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
        {result.entries.map((entry) => (
          <IndexRecord
            key={entry.record.id}
            title={entry.record.title}
            href={entry.route}
            type={entry.record.contentType}
            date={entry.record.date?.kind === "year" ? entry.record.date.year : undefined}
          />
        ))}
      </div>
    </>
  );
}
