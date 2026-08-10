import type { ReactNode } from "react";

/**
 * Comparison — M4.10. A real HTML `<table>`: the same property rows are
 * structurally guaranteed to stay aligned for both compared sides — the
 * simplest mechanism that satisfies this task's own Comparison law
 * ("common reference points remain stable... usable while completely
 * still"). No motion is applied anywhere in this component or its CSS
 * (§C6: "once aligned: settle into stillness. No continuous animation.")
 * — the correct amount of motion for a structure that must be compared
 * while still is none.
 *
 * Responsive (§C5): the table scrolls horizontally in its own container
 * at narrow widths (`comparison.css`) rather than being mechanically
 * stacked into two unrelated blocks, which would destroy row-to-row
 * reference — the same "wide content scrolls in its own container"
 * discipline this repository already uses for tables/code blocks.
 *
 * See docs/implementation/M4.10_COMPARISON_TRACE_PROTOTYPES.md.
 */
export interface ComparisonRow {
  label: string;
  left: ReactNode;
  right: ReactNode;
}

interface ComparisonProps {
  leftHeading: string;
  rightHeading: string;
  rows: ComparisonRow[];
}

export function Comparison({ leftHeading, rightHeading, rows }: ComparisonProps) {
  return (
    <div className="comparison-scroll">
      <table className="comparison">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">{leftHeading}</th>
            <th scope="col">{rightHeading}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.left}</td>
              <td>{row.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
