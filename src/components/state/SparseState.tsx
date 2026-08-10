import type { ReactNode } from "react";

import { StaticState } from "./StaticState";

/**
 * SparseState — genuine low content density, not failure and not Empty
 * (this task's own scope: "Sparse is not Empty," "preserve intentional
 * composition," "avoid filler," "not apologize for limited content,"
 * "primary content remains authoritative"). Deliberately has no `action`
 * prop: sparse content isn't a dead end needing a recovery step, it's
 * orientation — explanatory only, per this task's own "primarily provide
 * explanatory orientation rather than a 'warning.'"
 */
interface SparseStateProps {
  heading: string;
  explanation?: ReactNode;
}

export function SparseState({ heading, explanation }: SparseStateProps) {
  return (
    <StaticState heading={heading} className="static-state-sparse">
      {explanation}
    </StaticState>
  );
}
