import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Portal Record — entry into a district or major collection
 * (DESIGN_SYSTEM.md v1.1 §34.1). Minimal essential information,
 * concentrated void, one clear route cue.
 *
 * Interaction rule: the whole surface is one link. A Portal has exactly
 * one purpose (enter) and no competing interactive content, so nesting
 * the full visible content inside a single <a> is the correct model here
 * — unlike Editorial/Product Records, which link only their title (see
 * those components' own interaction-rule notes).
 */
interface PortalRecordProps {
  title: ReactNode;
  href: string;
  orientation?: ReactNode;
  identifier?: ReactNode;
}

export function PortalRecord({ title, href, orientation, identifier }: PortalRecordProps) {
  return (
    <article className="record-portal">
      <Link href={href} className="record-portal-link">
        {identifier !== undefined && (
          <span className="record-portal-identifier type-caption">{identifier}</span>
        )}
        <h3 className="record-portal-title type-h2">{title}</h3>
        {orientation !== undefined && (
          <p className="record-portal-orientation type-body-small">{orientation}</p>
        )}
      </Link>
    </article>
  );
}
