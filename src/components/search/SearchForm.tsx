import { TextField } from "@/components/form/TextField";
import { Action } from "@/components/controls/Action";

/**
 * Search query form — M3.12. A plain, native `<form method="get">` — no
 * client-side JavaScript is required for search to work at all; the query
 * lives in the URL (`?q=...`) exactly like M3.11's filter state, so
 * refresh/direct-link/back-button all behave correctly by construction
 * (this task's own §F6 "query should be visible and persistent through
 * the URL"). Reuses M2.10's `TextField` and M2.5's `Action`
 * (`type="submit"`) unmodified — no new form language was created.
 */
export function SearchForm({
  defaultValue,
  fixtureActive,
}: {
  defaultValue: string;
  fixtureActive: boolean;
}) {
  return (
    <form method="get" role="search" action="/search" className="search-form">
      {fixtureActive && <input type="hidden" name="fixture" value="m3b" />}
      <TextField
        label="Search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        guidance="Search public titles, summaries, classification, and related records."
      />
      <Action type="submit" level="primary">
        Search
      </Action>
    </form>
  );
}
