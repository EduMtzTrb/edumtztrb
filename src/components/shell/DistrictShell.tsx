import type { ReactNode } from "react";

import type { CanonicalOwnerDistrict } from "@/domain/records/CanonicalRecord";
import { DistrictNav } from "./DistrictNav";

/**
 * Shared district shell — M5.0.
 *
 * Authority: IMPLEMENTATION_PLAN.md Milestone 5 / M5.0 ("Implement the seven
 * district shells using verified shared systems. District difference comes
 * from approved emphasis, not separate design systems." / "Avoid per-district
 * forks unless a source requirement truly demands them.").
 *
 * Single composition root for every district's own `layout.tsx` (`work`,
 * `research`, `lab`, `art`, `products`, `about`), replacing what were six
 * byte-for-byte duplicated layout bodies differing only by district string.
 *
 * Scope is deliberately narrow: district identity (`data-district`) and
 * district navigation (M3.8 `DistrictNav`) are the only two layers a
 * *shell* owns. Every other conceptual layer M5.0 must support — threshold/
 * overview, curated foreground, grouping/relational, comprehensive access,
 * relationship passages, direct entry, Return, responsive composition,
 * accessibility — already has a dedicated, tested, page-level component
 * (M1.5 page shells, M3.9/M3.13 orientation, M4 motion/return) composed
 * inside `children`. Duplicating any of them here would be exactly the
 * "second design system" / per-district fork this task exists to avoid.
 */
export function DistrictShell({
  district,
  children,
}: {
  district: CanonicalOwnerDistrict;
  children: ReactNode;
}) {
  return (
    <div data-district={district}>
      <DistrictNav district={district} />
      {children}
    </div>
  );
}
