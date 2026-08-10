import { ActionLink } from "@/components/controls/ActionLink";
import {
  activeCriteriaEntries,
  buildRemoveHref,
  buildResetHref,
  isFilterActive,
  type FilterCriteria,
  type SearchParamsRecord,
} from "@/domain/records/FilterModel";

/**
 * Visible active-filter state plus reset — M3.11 §E1/§E5. Each chip and
 * the reset control are real `ActionLink`s (M2.5) to a precomputed URL,
 * not client `onClick` handlers — consistent with `FilterBar`'s own
 * link-first architecture (see its header comment for the full reasoning).
 * Renders nothing when no filter is active — never a stray empty region.
 */
interface ActiveFiltersProps {
  pathname: string;
  searchParams: SearchParamsRecord;
  criteria: FilterCriteria;
}

export function ActiveFilters({ pathname, searchParams, criteria }: ActiveFiltersProps) {
  if (!isFilterActive(criteria)) return null;

  return (
    <div className="active-filters" aria-label="Active filters">
      <ul className="active-filter-list">
        {activeCriteriaEntries(criteria).map(([key, value]) => (
          <li key={key} className="active-filter-chip">
            <span className="type-label">{value}</span>
            <ActionLink kind="utility" href={buildRemoveHref(pathname, searchParams, key)}>
              Remove
            </ActionLink>
          </li>
        ))}
      </ul>
      <ActionLink kind="utility" href={buildResetHref(pathname, searchParams)}>
        Reset filters
      </ActionLink>
    </div>
  );
}
