import type { ReactNode } from "react";

/**
 * Status tag — an informational label, not an interactive control. No
 * button/link semantics, no onClick surface. A single neutral, restrained
 * treatment — not a hue-per-lifecycle-state badge system (that full model
 * belongs to M2.11 — Shared static states); this establishes the
 * reusable primitive only.
 */
interface StatusTagProps {
  children: ReactNode;
  className?: string;
}

export function StatusTag({ children, className }: StatusTagProps) {
  const classes = ["status-tag", "type-caption"];
  if (className) classes.push(className);

  return <span className={classes.join(" ")}>{children}</span>;
}
