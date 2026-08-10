import Link from "next/link";
import type { ReactNode } from "react";

import { StatusTag } from "@/components/selection/StatusTag";

/**
 * Index Record — the dense, scannable row representation for archives,
 * catalogues, and (later) Search/Index result lists (§34.1). Minimal
 * containment: adjacent Index Records share a hairline divider
 * (`src/styles/records.css`) instead of each row owning its own box
 * (§16.7, "shared dividers instead of repeated boxes"). Does not
 * implement Milestone 3's Search/Index querying, filtering, or result
 * state — this is the row primitive those systems can render.
 *
 * Interaction rule: the whole row is one link. An Index Record has no
 * competing interactive content — `status`, if supplied, is the
 * non-interactive M2.6 `StatusTag`, safe to nest inside an anchor.
 */
interface IndexRecordProps {
  title: ReactNode;
  href: string;
  type?: ReactNode;
  date?: ReactNode;
  status?: ReactNode;
  supporting?: ReactNode;
}

export function IndexRecord({ title, href, type, date, status, supporting }: IndexRecordProps) {
  return (
    <article className="record-index">
      <Link href={href} className="record-index-link">
        <span className="record-index-title type-label">{title}</span>
        {type !== undefined && <span className="record-index-field type-metadata">{type}</span>}
        {date !== undefined && <span className="record-index-field type-metadata">{date}</span>}
        {supporting !== undefined && (
          <span className="record-index-field type-metadata">{supporting}</span>
        )}
        {status !== undefined && <StatusTag>{status}</StatusTag>}
      </Link>
    </article>
  );
}
