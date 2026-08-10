"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { CanonicalOwnerDistrict } from "@/domain/records/CanonicalRecord";
import { DISTRICT_LABELS, DISTRICT_NAVIGATION } from "./districtNavigation";

/**
 * District (secondary) navigation — M3.8. Renders one district's own
 * configured item set (`districtNavigation.ts`) as a `<nav>` landmark
 * distinct from, and rendered below, the shared global navigation
 * (M1.4/M3.7's `GlobalNav`) — never merged into one flat list (this
 * task's own §B3).
 *
 * ACTIVE-STATE SEMANTICS DELIBERATELY DIFFER FROM `GlobalNav` (§B4: "active
 * district," "active district view," and "selected filter/lens" are
 * separate semantics). `GlobalNav`'s district link intentionally treats
 * every nested route as "within this district" (prefix match) — correct
 * for a single link representing an entire district. Here, every item is
 * a sibling destination at the same rank (Overview, Selected, Archive,
 * ...), so an exact-path match is used instead: prefix-matching would
 * incorrectly mark "Overview" (`/work`) as active on every other district
 * page, since `/work` is a literal prefix of `/work/selected`, `/work/all`,
 * etc.
 */
export function DistrictNav({ district }: { district: CanonicalOwnerDistrict }) {
  const pathname = usePathname();
  const items = DISTRICT_NAVIGATION[district];
  const label = DISTRICT_LABELS[district];

  return (
    <nav aria-label={`${label} navigation`} data-district-nav={district}>
      <ul className="district-nav-list">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
