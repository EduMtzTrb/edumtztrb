import type { ButtonHTMLAttributes, ReactNode } from "react";

type ActionLevel = "primary" | "secondary" | "tertiary";

interface ActionOwnProps {
  level?: ActionLevel;
}

/**
 * Icon-only control (§29): no visible label, so an accessible name is
 * mandatory — enforced here by making `aria-label` required whenever
 * `iconOnly` is true, rather than by convention.
 */
type ActionProps = ActionOwnProps &
  (
    | { iconOnly?: false; children: ReactNode; "aria-label"?: string }
    | { iconOnly: true; children?: ReactNode; "aria-label": string }
  ) &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children">;

/**
 * A state-changing action: a native <button>, never an <a>. Enforces the
 * button/link semantic boundary at the type level — ActionLink.tsx is the
 * only way to render something that navigates.
 *
 * `type="button"` is fixed rather than exposed as a prop: nothing in this
 * repository currently submits a form, so `type="submit"` has no real
 * consumer yet (DESIGN_SYSTEM.md v1.1 §25-29, this milestone's own
 * "don't build ahead of a real consumer" constraint). Add it when a form
 * genuinely needs it, not speculatively.
 *
 * Three action levels — §28: "the platform retains three action levels."
 * Defaults to `"primary"` since a lone action in a group is ordinarily the
 * primary one.
 */
export function Action({
  level = "primary",
  children,
  iconOnly = false,
  className,
  ...buttonProps
}: ActionProps) {
  const classes = ["action-" + level, "type-label"];
  if (iconOnly) classes.push("action-icon-only");
  if (className) classes.push(className);

  return (
    <button type="button" className={classes.join(" ")} {...buttonProps}>
      {children}
    </button>
  );
}
