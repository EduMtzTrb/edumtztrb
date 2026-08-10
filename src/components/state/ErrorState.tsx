import type { ReactNode } from "react";

import { StaticState } from "./StaticState";

/**
 * ErrorState — explicit, calm, recoverable, user-understandable,
 * non-blaming, non-theatrical (this task's own scope). `role="alert"`
 * (implicit assertive live-region) so assistive technology announces it
 * without a consumer needing to wire that up separately. Never confused
 * with a failed Lab experiment or failed Research hypothesis
 * (DESIGN_SYSTEM.md v1.1 §21.2/§21.3: "System error must never visually
 * redefine failed research or failed experimentation," "failed ≠ system
 * error") — this component is for genuine system/technical failure only;
 * a failed experiment's own lifecycle state (§21.3: draft/active/complete/
 * archived/failed/abandoned/speculative) is a Milestone 3 domain concern,
 * not this component. Not color-only: the functional `--color-error`
 * reinforces the heading, but the explicit heading text and `role="alert"`
 * carry the actual meaning.
 */
interface ErrorStateProps {
  heading: string;
  explanation?: ReactNode;
  action?: ReactNode;
}

export function ErrorState({ heading, explanation, action }: ErrorStateProps) {
  return (
    <StaticState heading={heading} action={action} className="static-state-error" role="alert">
      {explanation}
    </StaticState>
  );
}
