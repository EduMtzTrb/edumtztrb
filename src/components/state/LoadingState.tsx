import type { CSSProperties } from "react";

/**
 * LoadingState — reserves expected geometry and communicates a
 * genuinely-named loading condition (this task's own scope: "reserve
 * expected geometry/proportion," "minimize layout shift," "meaningful
 * delays should be named," "must never invent fake content/media/
 * evidence/products/records"). No spinner, no shimmer skeleton, no
 * animated gradient — a calm, always-visible text label plus an optional
 * reserved `minHeight`, nothing more. Motion/choreography for loading, if
 * ever wanted, is Milestone 4's (Animation System), not this package's.
 */
interface LoadingStateProps {
  label: string;
  minHeight?: CSSProperties["minHeight"];
}

export function LoadingState({ label, minHeight }: LoadingStateProps) {
  return (
    <div
      className="loading-state type-body-small"
      role="status"
      aria-busy="true"
      style={minHeight !== undefined ? { minHeight } : undefined}
    >
      {label}
    </div>
  );
}
