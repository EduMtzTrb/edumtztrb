import type { ReactNode } from "react";

import { StaticState } from "./StaticState";

/**
 * ArchivedState — unmistakably historical, never presented as failed or
 * currently active (this task's own scope: "remain identifiable,"
 * "preserve historical context," "not look current/active," "not expose
 * invalid current-action affordances," "permit successor/related-record
 * information where supplied"). No default `action` exists — a consumer
 * only passes one when a genuinely valid affordance exists (e.g. "View
 * current version"); this component never invents one. Archived ≠ failed,
 * archived ≠ unavailable (DESIGN_SYSTEM.md v1.1 §21.3/§21.4, §86: "Archive
 * is represented through lifecycle state, not deletion styling").
 */
interface ArchivedStateProps {
  heading: string;
  context?: ReactNode;
  action?: ReactNode;
}

export function ArchivedState({ heading, context, action }: ArchivedStateProps) {
  return (
    <StaticState heading={heading} action={action} className="static-state-archived">
      {context}
    </StaticState>
  );
}
