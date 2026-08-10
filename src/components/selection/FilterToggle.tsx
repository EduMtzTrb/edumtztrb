import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Filter toggle — the selection-vocabulary control primitive for a single
 * filter criterion. Owns only the control itself: selected/unselected
 * state, keyboard/focus behavior, accessible exposure. Result-set
 * recomposition, URL persistence, and reset architecture belong to
 * M3.11 — Filters, not this package.
 *
 * A native <button aria-pressed> — not a <Action level="primary">, so a
 * selected filter never visually reads as a CTA.
 */
interface FilterToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children" | "aria-pressed"
> {
  selected: boolean;
  children: ReactNode;
}

export function FilterToggle({ selected, children, className, ...buttonProps }: FilterToggleProps) {
  const classes = ["filter-toggle", "type-label"];
  if (className) classes.push(className);

  return (
    <button type="button" aria-pressed={selected} className={classes.join(" ")} {...buttonProps}>
      <span className="filter-toggle-marker" aria-hidden="true" />
      <span className="filter-toggle-label">{children}</span>
    </button>
  );
}
