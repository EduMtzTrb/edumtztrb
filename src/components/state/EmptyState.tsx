import type { ReactNode } from "react";

import { StaticState } from "./StaticState";

/**
 * EmptyState — explains genuine absence without implying failure (this
 * task's own scope: "explain what is empty," "not imply failure," "not
 * manufacture filler," "provide a next valid action where one genuinely
 * exists"). No default heading/explanation exists anywhere — a consumer
 * must always supply real, specific wording; this component invents no
 * filler content of its own.
 */
interface EmptyStateProps {
  heading: string;
  explanation?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ heading, explanation, action }: EmptyStateProps) {
  return (
    <StaticState heading={heading} action={action} className="static-state-empty">
      {explanation}
    </StaticState>
  );
}
