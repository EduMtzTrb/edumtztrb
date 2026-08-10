import type { ReactNode } from "react";

/**
 * StaticState — the shared anatomy eight of M2.11's nine states compose
 * (Empty, Sparse, No Result, Unavailable, Archived, Error, Success,
 * Restricted). Not intended for direct use outside this family — each
 * semantic wrapper supplies its own required `heading` and a fixed
 * `className`, so a consumer can never render an unlabeled or
 * semantically ambiguous "generic state." `LoadingState` does not use
 * this foundation: reserved geometry + `aria-busy` is a genuinely
 * different shape from "heading + explanation + detail + action."
 *
 * State communication priority (DESIGN_SYSTEM.md v1.1 §21.5): clear
 * language first, typography second, placement/structure third, color
 * last (and only as reinforcement, never sole carrier) — `heading` is
 * always required plain text; color (where a wrapper adds any) is layered
 * on top in that wrapper's own CSS, never here.
 */
interface StaticStateProps {
  heading: string;
  children?: ReactNode;
  detail?: ReactNode;
  action?: ReactNode;
  className: string;
  role?: "status" | "alert";
}

export function StaticState({
  heading,
  children,
  detail,
  action,
  className,
  role,
}: StaticStateProps) {
  return (
    <div className={`static-state ${className}`} role={role}>
      <p className="static-state-heading type-label">{heading}</p>
      {children !== undefined && (
        <p className="static-state-explanation type-body-small">{children}</p>
      )}
      {detail !== undefined && <p className="static-state-detail type-metadata">{detail}</p>}
      {action !== undefined && <div className="static-state-action">{action}</div>}
    </div>
  );
}
