import type { ReactNode } from "react";

import { Figure } from "./Figure";

export interface ComparisonItem {
  media: ReactNode;
  label: ReactNode;
  credit?: ReactNode;
}

interface ComparisonPairProps {
  label: string;
  first: ComparisonItem;
  second: ComparisonItem;
}

/**
 * Comparison Pair — meaningful visual comparison between exactly two
 * items (before/after, option A/B, iteration/iteration, source/
 * transformation) (§14 of this task's own scope; DESIGN_SYSTEM.md v1.1
 * §45). The relationship stays understandable through labels and stable
 * spatial correspondence alone, without motion or a drag-to-reveal
 * slider — `records.css`'s flex layout recomposes side-by-side → stacked
 * on narrow viewports without losing that correspondence.
 */
export function ComparisonPair({ label, first, second }: ComparisonPairProps) {
  return (
    <div className="media-comparison-pair" role="group" aria-label={label}>
      <Figure
        media={first.media}
        caption={first.label}
        credit={first.credit}
        className="media-comparison-item"
      />
      <Figure
        media={second.media}
        caption={second.label}
        credit={second.credit}
        className="media-comparison-item"
      />
    </div>
  );
}
