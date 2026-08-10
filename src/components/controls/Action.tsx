import type { ButtonHTMLAttributes, ReactNode } from "react";

type ActionLevel = "primary" | "secondary" | "tertiary";

interface ActionOwnProps {
  level?: ActionLevel;
  /**
   * M2.10 (Form family) is the first genuine consumer of `type="submit"` —
   * see docs/implementation/M2.10_FORM_FAMILY.md "M2.5 Submit Integration"
   * for the full reasoning. Defaults to `"button"`, preserving every
   * existing call site's exact prior behavior unchanged.
   */
  type?: "button" | "submit";
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
 * `type` defaults to `"button"` — safe for every existing call site. M2.10
 * (Form family) extended this from a permanently-fixed `"button"` to an
 * explicit `"button" | "submit"` prop once a real form genuinely needed
 * submit semantics (this milestone's own "don't build ahead of a real
 * consumer" constraint no longer applied once that consumer existed) —
 * `"reset"` was not added, since nothing has asked for it. This preserves
 * M2.5's full visual hierarchy, disabled/loading semantics, and focus
 * behavior for a submit action exactly as for any other Action.
 *
 * Three action levels — §28: "the platform retains three action levels."
 * Defaults to `"primary"` since a lone action in a group is ordinarily the
 * primary one.
 */
export function Action({
  level = "primary",
  type = "button",
  children,
  iconOnly = false,
  className,
  ...buttonProps
}: ActionProps) {
  const classes = ["action-" + level, "type-label"];
  if (iconOnly) classes.push("action-icon-only");
  if (className) classes.push(className);

  return (
    <button type={type} className={classes.join(" ")} {...buttonProps}>
      {children}
    </button>
  );
}
