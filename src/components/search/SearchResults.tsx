import { ActionLink } from "@/components/controls/ActionLink";
import { IndexRecord } from "@/components/records/IndexRecord";
import { EmptyState } from "@/components/state/EmptyState";
import { NoResultState } from "@/components/state/NoResultState";
import type { SearchResult } from "@/domain/records/SearchModel";

/**
 * Search results presentation — M3.12. Reuses M2.7's `IndexRecord`
 * (`supporting` carries the match reason; `status` carries lifecycle —
 * "public state," this task's own §F5 field) and M2.11's `EmptyState`/
 * `NoResultState` — no new record/state primitive was designed, mirroring
 * M3.10's own §D5 reuse discipline.
 *
 * EMPTY QUERY ≠ ERROR (§F6) — an empty query renders `EmptyState` as a
 * neutral browse invitation (with a link to Index), never `NoResultState`
 * (which would incorrectly imply a search was actually attempted and
 * failed).
 */
interface SearchResultsProps {
  result: SearchResult;
  usingFixtures: boolean;
}

export function SearchResults({ result, usingFixtures }: SearchResultsProps) {
  if (result.query === "") {
    return (
      <EmptyState
        heading="Enter a query to search."
        explanation="Search looks across public titles, summaries, classification, and related records. Prefer to browse instead?"
        action={<ActionLink href="/index">Go to Index</ActionLink>}
      />
    );
  }

  if (result.entries.length === 0) {
    return <NoResultState heading="No public records matched your search." query={result.query} />;
  }

  return (
    <>
      {usingFixtures && (
        <p className="index-fixture-notice" role="status">
          M3-B Fixture Data — not real public content
        </p>
      )}
      <p className="index-result-count">
        {result.count} {result.count === 1 ? "result" : "results"} for &ldquo;{result.query}&rdquo;
      </p>
      <div className="index-result-list">
        {result.entries.map((entry) => (
          <IndexRecord
            key={entry.record.id}
            title={entry.record.title}
            href={entry.route}
            type={entry.record.contentType}
            status={entry.record.lifecycle}
            supporting={entry.matchReason}
          />
        ))}
      </div>
    </>
  );
}
