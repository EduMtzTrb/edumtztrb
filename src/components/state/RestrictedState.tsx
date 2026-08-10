import type { ReactNode } from "react";

import { StaticState } from "./StaticState";

/**
 * RestrictedState — presents an already-approved public-safe explanation;
 * it never derives, infers, or defaults one (this task's own scope: "do
 * not accidentally expose restricted/private information," "presentation
 * may state that something is unavailable/restricted only when the
 * consuming domain has already decided such a public state may be
 * shown," "the state component must accept already-approved public
 * wording rather than deriving it"). `explanation` is a **required** prop
 * (not optional, unlike every sibling state) — enforced at the type
 * level, so this component cannot render with no explanation and cannot
 * silently fall back to internal wording like "Draft" or "In Review."
 * M2.11 does not decide publication eligibility; Information Architecture
 * / Milestone 3 own that entirely.
 */
interface RestrictedStateProps {
  heading: string;
  explanation: ReactNode;
}

export function RestrictedState({ heading, explanation }: RestrictedStateProps) {
  return (
    <StaticState heading={heading} className="static-state-restricted">
      {explanation}
    </StaticState>
  );
}
