import type { ReactNode } from "react";

export type DistrictFieldDensity = "concentrated" | "moderate" | "dense";

/**
 * Shared district composition field — M5.0 Part B.
 *
 * Authority: `DESIGN_SYSTEM.md` v1.1 §11 (Governing compositional grammar —
 * "Controlled asymmetry, concentrated void, shared axes, selective offset,
 * peripheral latency, and deliberate density gradients"), §11.8 (Dominant
 * and peripheral fields), §69 (Shared district rule — "Districts vary by
 * degree rather than vocabulary").
 *
 * This is the one shared primitive every district-composition instance
 * inhabits — not a per-district layout. It exposes exactly two semantic
 * roles (`primary`, optional `peripheral`) and one shared, district-agnostic
 * emphasis state (`density`, §11.7's own vocabulary: concentrated void /
 * moderate / dense evidence). It never accepts a district name or a
 * per-district boolean (no `isWork`/`isArt`) — the visible ratio and void
 * come entirely from `density`, defined once in `district-composition.css`
 * and shared by every consumer.
 *
 * `peripheral` is optional and, when present, is always rendered after
 * `primary` in DOM order — visual asymmetry (grid-column placement, never
 * the CSS `order` property) never reorders the underlying content, so
 * reading order, tab order, and visual order all agree at every breakpoint.
 */
export function DistrictField({
  density = "moderate",
  primary,
  peripheral,
}: {
  density?: DistrictFieldDensity;
  primary: ReactNode;
  peripheral?: ReactNode;
}) {
  return (
    <div className="district-field" data-density={density}>
      <div className="district-field-primary">{primary}</div>
      {peripheral !== undefined && (
        <aside className="district-field-peripheral" aria-label="Related">
          {peripheral}
        </aside>
      )}
    </div>
  );
}
