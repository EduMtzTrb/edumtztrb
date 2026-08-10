/**
 * Home-threshold familiarity — M4.9 §B7.
 *
 * Authority: IMPLEMENTATION_PLAN.md §9 ("M4.9 — Home-threshold prototype:
 * prototype Home -> one district -> Home, including repeated-entry
 * efficiency."). See docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md.
 *
 * DELIBERATELY SEPARATE FROM M4.6 RETURN MEMORY — Return
 * (src/lib/return/returnMemory.ts) answers "what specific context should
 * be restored"; Familiarity answers a smaller, different question: "has
 * this one threshold already been crossed this session." Familiarity is a
 * single persistent boolean per threshold (it stays true once set, for
 * the rest of the session); Return is a rich, capture-then-consume
 * snapshot cleared after one use. Reusing Return's storage for this would
 * conflate two genuinely different lifecycles (§B7's own explicit
 * instruction to document the distinction rather than merge them) — this
 * module therefore keeps its own, entirely separate sessionStorage key
 * namespace (`m4-threshold-`, never `m4-return-memory:`).
 *
 * SESSION-SCOPED, NOT PERMANENT — sessionStorage only, exactly like
 * M4.6's own choice and for the same reason: this is session navigation
 * context, not a permanent user profile, analytics record, or browsing
 * history dashboard (§B7's own explicit prohibition).
 */

const TRAVERSED_PREFIX = "m4-threshold-familiarity:";
const ARRIVAL_PREFIX = "m4-threshold-arrival:";

function hasSessionStorage(): boolean {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

/** Has this threshold already been crossed (in either direction) during the current session? */
export function hasTraversedThreshold(thresholdKey: string): boolean {
  if (!hasSessionStorage()) return false;
  return window.sessionStorage.getItem(TRAVERSED_PREFIX + thresholdKey) === "true";
}

/** Marks a threshold as crossed for the remainder of the session. */
export function markThresholdTraversed(thresholdKey: string): void {
  if (!hasSessionStorage()) return;
  window.sessionStorage.setItem(TRAVERSED_PREFIX + thresholdKey, "true");
}

/** Signals genuine departure toward a threshold destination, set by the real link that initiates the passage. */
export function markThresholdDeparture(arrivalKey: string): void {
  if (!hasSessionStorage()) return;
  window.sessionStorage.setItem(ARRIVAL_PREFIX + arrivalKey, "true");
}

/** Read-only check for a pending arrival — safe to call repeatedly (e.g. from a useSyncExternalStore snapshot), never mutates. */
export function peekThresholdArrival(arrivalKey: string): boolean {
  if (!hasSessionStorage()) return false;
  return window.sessionStorage.getItem(ARRIVAL_PREFIX + arrivalKey) === "true";
}

/** Consumes (clears) a pending arrival — a direct/cold visit to the destination correctly finds nothing to consume. */
export function clearThresholdArrival(arrivalKey: string): void {
  if (!hasSessionStorage()) return;
  window.sessionStorage.removeItem(ARRIVAL_PREFIX + arrivalKey);
}
