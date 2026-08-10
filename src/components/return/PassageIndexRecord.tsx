"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { StatusTag } from "@/components/selection/StatusTag";
import { captureReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

/**
 * PassageIndexRecord — M4.8. The Index-side half of the representative
 * Record-Passage journey (`docs/implementation/M4.8_RECORD_PASSAGE_PROTOTYPE.md`).
 *
 * Deliberately a small, separate client component rather than a
 * modification to M2.7's `IndexRecord` — that primitive is shared by every
 * Index route and every content type; M4.8 is explicitly scoped to one
 * representative district (§A1), and Return-context capture requires a
 * client boundary `IndexRecord` doesn't have. Visually identical (same
 * `.record-index`/`.record-index-link` classes, no new geometry/color),
 * so the row reads exactly the same as every other Index row until the
 * moment of departure — no ornamental treatment marks it different.
 *
 * Capturing on `onClick` (before the browser/Next.js processes the real
 * `<Link>` navigation) is synchronous and requires no `preventDefault` —
 * navigation is never delayed or gated by this capture (§A5: "content
 * access must remain immediate").
 */
interface PassageIndexRecordProps {
  title: ReactNode;
  href: string;
  type?: ReactNode;
  date?: ReactNode;
  status?: ReactNode;
  recordId: string;
  slug: string;
  ownerDistrict: string;
}

export function PassageIndexRecord({
  title,
  href,
  type,
  date,
  status,
  recordId,
  slug,
  ownerDistrict,
}: PassageIndexRecordProps) {
  function handleClick() {
    captureReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY, {
      originUrl: window.location.pathname + window.location.search,
      parentDistrict: ownerDistrict,
      selectedRecordId: recordId,
      resultKey: slug,
      scrollY: window.scrollY,
    });
  }

  return (
    <article className="record-index">
      <Link href={href} className="record-index-link" onClick={handleClick}>
        <span className="record-index-title type-label">{title}</span>
        {type !== undefined && <span className="record-index-field type-metadata">{type}</span>}
        {date !== undefined && <span className="record-index-field type-metadata">{date}</span>}
        {status !== undefined && <StatusTag>{status}</StatusTag>}
      </Link>
    </article>
  );
}
