"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { retrieveReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

/**
 * RecordReturnControl — M4.8. The canonical-record-side half of the
 * representative Record-Passage journey. Renders nothing unless a real
 * captured context exists AND it was captured for *this exact* record
 * (`resultKey` matched against the current entry's slug) — a cold direct
 * entry, or a captured context belonging to a different Work record,
 * both correctly show no Return control (§A9: "no Return control
 * pretending Index was previously visited").
 *
 * Built on `useSyncExternalStore`, the same SSR-safe pattern M4.2's
 * `useReducedMotion` established (`getServerSnapshot` always `false`,
 * matching the fact the server has no session knowledge, so the first
 * client render agrees with the server-rendered HTML and there is no
 * hydration mismatch) — not `useState`+`useEffect`, which this
 * repository's own ESLint config flags as an avoidable
 * setState-in-effect anti-pattern. The snapshot itself is a plain
 * boolean (trivially reference-stable — no infinite-loop risk); the
 * actual captured context is read once, synchronously, only after the
 * boolean confirms a match exists.
 *
 * A real `next/link`, not a raw anchor or a JS-driven "restore" button —
 * Return here IS navigation to the captured origin URL, using this
 * repository's one native navigation mechanism (§A13: "M4.8 consumes
 * M4-B's native-history contract, it does not reopen it").
 */
interface RecordReturnControlProps {
  entrySlug: string;
}

function subscribe(): () => void {
  return () => {};
}

function getServerSnapshot(): boolean {
  return false;
}

function hasMatchingCapture(entrySlug: string): boolean {
  const captured = retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY);
  return captured !== null && captured.resultKey === entrySlug;
}

export function RecordReturnControl({ entrySlug }: RecordReturnControlProps) {
  const hasCapture = useSyncExternalStore(
    subscribe,
    () => hasMatchingCapture(entrySlug),
    getServerSnapshot,
  );

  if (!hasCapture) return null;

  const context = retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY)!;

  return (
    <p>
      <Link href={context.originUrl}>Return to Index</Link>
    </p>
  );
}
