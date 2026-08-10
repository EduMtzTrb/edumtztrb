import type { ReactNode } from "react";

import { StaticState } from "./StaticState";

/**
 * UnavailableState — identifies what is unavailable and, where known, why
 * (this task's own scope: "identify what is unavailable," "support
 * explanation of actual reason where known," "distinguish temporary/
 * permanent/regional/sold-out/capacity/etc. when supplied," "expose
 * remaining valid action where applicable"). `reason` is free-form
 * `ReactNode` text a consumer supplies — no hard-coded reason taxonomy
 * (temporary/permanent/regional/etc.) exists here beyond that single slot,
 * per this task's own explicit "do not hard-code a universal reason
 * taxonomy" instruction. Unavailable ≠ Archived (DESIGN_SYSTEM.md v1.1
 * §21.4) — this is a commercial/availability fact, not a lifecycle one.
 */
interface UnavailableStateProps {
  heading: string;
  reason?: ReactNode;
  action?: ReactNode;
}

export function UnavailableState({ heading, reason, action }: UnavailableStateProps) {
  return (
    <StaticState heading={heading} action={action} className="static-state-unavailable">
      {reason}
    </StaticState>
  );
}
