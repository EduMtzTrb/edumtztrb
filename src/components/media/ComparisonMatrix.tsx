import type { ReactNode } from "react";

import { Figure } from "./Figure";

export interface ComparisonMatrixItem {
  media: ReactNode;
  label: ReactNode;
  credit?: ReactNode;
}

interface ComparisonMatrixProps {
  label: string;
  items: ComparisonMatrixItem[];
}

/**
 * Comparison Matrix — more than two comparable items on shared axes
 * (§15 of this task's own scope). A responsive grid, not a generic
 * dashboard table: alignment and gap (`records.css`-style spacing, not
 * per-cell containment) carry the structure, and the grid recomposes its
 * column count rather than shrinking cells to illegibility.
 */
export function ComparisonMatrix({ label, items }: ComparisonMatrixProps) {
  return (
    <div className="media-comparison-matrix" role="group" aria-label={label}>
      {items.map((item, index) => (
        <Figure
          key={index}
          media={item.media}
          caption={item.label}
          credit={item.credit}
          className="media-comparison-item"
        />
      ))}
    </div>
  );
}
