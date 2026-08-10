"use client";

import { useEffect } from "react";

import {
  clearReturnContext,
  restoreScroll,
  retrieveReturnContext,
} from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

/**
 * IndexPassageRestoration — M4.8. Mounted on the Index-district-work
 * lens route only. On mount, checks for a captured Record-Passage context
 * whose `originUrl` matches the *current* URL exactly (pathname + query)
 * — only then does this genuinely represent "the visitor just returned
 * here," as opposed to an unrelated earlier capture or a normal fresh
 * visit. When it matches, restores scroll (§C7: an instant jump, already
 * proven non-smooth by `restoreScroll` itself) and immediately clears the
 * capture, so a later, unrelated visit to the same URL never re-triggers
 * it (§A7: Return should not linger past its own use).
 *
 * Renders nothing — this is a behavior-only component, no visual output.
 */
export function IndexPassageRestoration() {
  useEffect(() => {
    const context = retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY);
    if (!context) return;

    const currentUrl = window.location.pathname + window.location.search;
    if (context.originUrl !== currentUrl) return;

    restoreScroll(context.scrollY);
    clearReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY);
  }, []);

  return null;
}
