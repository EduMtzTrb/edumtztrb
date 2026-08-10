import type { ReactNode } from "react";

import { StaticState } from "./StaticState";

/**
 * NoResultState — the presentation state only (this task's own scope:
 * "preserve query/filter context," "explicitly state no matching public
 * records were found," "support clear reset/edit action hooks," "never
 * imply hidden content exists"). Real Search/Index/filter logic remains
 * Milestone 3's; this component never queries anything itself — `query`
 * is whatever already-resolved criterion text a future consumer supplies.
 */
interface NoResultStateProps {
  heading: string;
  query?: ReactNode;
  action?: ReactNode;
}

export function NoResultState({ heading, query, action }: NoResultStateProps) {
  return (
    <StaticState
      heading={heading}
      detail={query}
      action={action}
      className="static-state-no-result"
    />
  );
}
