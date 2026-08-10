import Link from "next/link";

import {
  buildToggleHref,
  type FilterCriteria,
  type FilterParamKey,
  type SearchParamsRecord,
} from "@/domain/records/FilterModel";

/**
 * Filter option toggles — M3.11. Plain `next/link`s, not M2.6's
 * button-based `FilterToggle`: `aria-pressed` is only valid ARIA usage on
 * a `button`, and this system's criteria live entirely in the URL
 * (§E3) — a real link, not a client `onClick` handler, is what makes a
 * filter genuinely shareable/refreshable/back-button-safe with zero
 * JavaScript required. The current state is instead exposed via
 * `aria-current="true"`, the exact same idiom `GlobalNav`/`DistrictNav`
 * (M3.7/M3.8) already use for "this link represents where you already
 * are." See docs/implementation/M3.11_FILTERS.md for the full reasoning.
 */
interface FilterGroupProps {
  label: string;
  paramKey: FilterParamKey;
  options: readonly string[];
  pathname: string;
  searchParams: SearchParamsRecord;
  criteria: FilterCriteria;
}

function FilterGroup({
  label,
  paramKey,
  options,
  pathname,
  searchParams,
  criteria,
}: FilterGroupProps) {
  if (options.length < 2) return null;

  return (
    <fieldset className="filter-group">
      <legend className="type-label">{label}</legend>
      <ul className="filter-option-list">
        {options.map((option) => {
          const active = criteria[paramKey] === option;
          return (
            <li key={option}>
              <Link
                href={buildToggleHref(pathname, searchParams, paramKey, option)}
                aria-current={active ? "true" : undefined}
                className="filter-option"
              >
                {option}
              </Link>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

interface FilterBarProps {
  pathname: string;
  searchParams: SearchParamsRecord;
  criteria: FilterCriteria;
  districtOptions: readonly string[];
  contentTypeOptions: readonly string[];
}

export function FilterBar({
  pathname,
  searchParams,
  criteria,
  districtOptions,
  contentTypeOptions,
}: FilterBarProps) {
  if (districtOptions.length < 2 && contentTypeOptions.length < 2) return null;

  return (
    <div className="filter-bar" role="group" aria-label="Filters">
      <FilterGroup
        label="District"
        paramKey="district"
        options={districtOptions}
        pathname={pathname}
        searchParams={searchParams}
        criteria={criteria}
      />
      <FilterGroup
        label="Type"
        paramKey="contentType"
        options={contentTypeOptions}
        pathname={pathname}
        searchParams={searchParams}
        criteria={criteria}
      />
    </div>
  );
}
