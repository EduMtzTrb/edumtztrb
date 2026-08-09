import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type LinkKind = "route" | "utility" | "inline";

type NextLinkProps = ComponentProps<typeof Link>;

interface ActionLinkOwnProps {
  /**
   * Route link (§27.2 — movement between spaces/records/districts), utility
   * link (§27.3 — download/copy/source/share/legal/support), or inline link
   * (§27.1 — embedded in prose). Route and utility share `.link`, since
   * DESIGN_SYSTEM.md doesn't mandate a visual difference between them;
   * inline gets `.link-inline` (no hit-area, inherits surrounding type).
   */
  kind?: LinkKind;
  children: ReactNode;
}

type ActionLinkProps = ActionLinkOwnProps & Omit<NextLinkProps, "children">;

const LINK_CLASS: Record<LinkKind, string> = {
  route: "link",
  utility: "link",
  inline: "link-inline",
};

/**
 * Navigation: wraps Next.js `Link`, never a native <button>. `href` is
 * mandatory (inherited from `Link`'s own props) — there is no `disabled`,
 * `type`, or click-handler-only variant. Enforces the button/link semantic
 * boundary at the type level alongside Action.tsx: this component cannot
 * express a state-changing action, only navigation.
 */
export function ActionLink({ kind = "route", children, className, ...linkProps }: ActionLinkProps) {
  const classes = [LINK_CLASS[kind]];
  if (kind !== "inline") classes.push("type-label");
  if (className) classes.push(className);

  return (
    <Link className={classes.join(" ")} {...linkProps}>
      {children}
    </Link>
  );
}
