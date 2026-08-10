import type { ReactNode } from "react";

import { StaticState } from "./StaticState";

/**
 * SuccessState — the shared platform-wide success/confirmation state
 * (this task's own scope: "concise and conclusive," "avoid celebratory
 * spectacle," "remain accessible without animation," "expose next steps
 * where relevant," "distinguish submission from final approval where a
 * human process continues"). `role="status"` (implicit polite live-region)
 * — never `"alert"`; good news should not interrupt.
 *
 * FormConfirmation boundary (M2.10, src/components/form/FormConfirmation.tsx):
 * deliberately left independently thin rather than refactored to compose
 * this component — see docs/implementation/M2.11_SHARED_STATIC_STATES.md
 * "FormConfirmation Boundary" for the full reasoning. `SuccessState` is
 * the general-purpose primitive a future non-form success/confirmation
 * moment (e.g. a completed action outside a form) can use.
 */
interface SuccessStateProps {
  heading: string;
  explanation?: ReactNode;
  action?: ReactNode;
}

export function SuccessState({ heading, explanation, action }: SuccessStateProps) {
  return (
    <StaticState heading={heading} action={action} className="static-state-success" role="status">
      {explanation}
    </StaticState>
  );
}
