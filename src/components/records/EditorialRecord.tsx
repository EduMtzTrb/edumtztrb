import Link from "next/link";
import type { ReactNode } from "react";

import { StatusTag } from "@/components/selection/StatusTag";

/**
 * Editorial Record — text-led preview for Research papers, essays,
 * questions, notes, and publications (§34.1). Uses Reading Voice for its
 * excerpt; no separate Research-only typography is introduced.
 *
 * Interaction rule: only the title is the link. Unlike Portal/Media/Index
 * Records, an Editorial Record's body is real prose a reader may want to
 * select — wrapping the whole block in one <a> would make ordinary text
 * selection fight navigation, so only the title carries the route.
 */
interface EditorialRecordProps {
  title: ReactNode;
  href: string;
  excerpt?: ReactNode;
  date?: ReactNode;
  source?: ReactNode;
  status?: ReactNode;
}

export function EditorialRecord({
  title,
  href,
  excerpt,
  date,
  source,
  status,
}: EditorialRecordProps) {
  const hasMeta = date !== undefined || source !== undefined || status !== undefined;

  return (
    <article className="record-editorial">
      <h3 className="record-editorial-title type-h3">
        <Link href={href} className="record-editorial-link">
          {title}
        </Link>
      </h3>
      {hasMeta && (
        <p className="record-editorial-meta type-metadata">
          {date !== undefined && <span>{date}</span>}
          {source !== undefined && <span>{source}</span>}
          {status !== undefined && <StatusTag>{status}</StatusTag>}
        </p>
      )}
      {excerpt !== undefined && <p className="record-editorial-excerpt type-body">{excerpt}</p>}
    </article>
  );
}
