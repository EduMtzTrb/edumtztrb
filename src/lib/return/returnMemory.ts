/**
 * Spatial memory / Return — M4.6.
 *
 * Authority: IMPLEMENTATION_PLAN.md §9 ("M4.6 — Spatial memory / Return:
 * preserve where technically possible: previous route; parent district;
 * selected record; Index position; scroll position; active filter/lens;
 * comparison state; gallery position; relevant expanded/collapsed state;
 * originating control/element reference."). See
 * docs/implementation/M4.6_SPATIAL_MEMORY_RETURN.md for the full audit.
 *
 * RETURN IS NOT BACK (§C1) — this module never calls `history.back()` and
 * never touches browser history at all. It models one thing only: a
 * session-scoped, serializable snapshot of "where the visitor was," which
 * a Return control may consult. Native Back/Forward (M4.7's territory)
 * and Close (M4.5's territory) are both completely independent of this
 * module.
 *
 * NO DUPLICATE FILTER/LENS STORE (§C4) — `originUrl` (query string
 * included) is the single source of truth for filter/lens state, since
 * M3.11 already makes the URL authoritative. This module never parses or
 * separately stores filter criteria.
 *
 * SESSION-SCOPED, NOT PERMANENT (§C6) — backed by `sessionStorage`
 * (cleared when the tab closes), never `localStorage`.
 *
 * NO REACT NODE / CALLBACK / DOM-ELEMENT SERIALIZATION (§C3) — every field
 * on `ReturnContext` is a JSON-safe primitive or plain array/object of
 * primitives. A same-document DOM element is never stored directly; only
 * a stable string key (`originControlKey`), resolved back to a live
 * element on demand by `findElementByReturnKey` — never a detached-node
 * risk, since a missing key simply resolves to `null`.
 */

export interface ReturnContext {
  /** The full origin route, query string included — the only source of truth for filter/lens state. */
  originUrl: string;
  /** Parent district, if genuinely known — never guessed. */
  parentDistrict?: string;
  /** Selected canonical record ID — an identifier only, never a full record object. */
  selectedRecordId?: string;
  /** A stable result-identity key within the origin view (e.g. an Index/list item), preferred over a raw pixel position (§C8). */
  resultKey?: string;
  /** Scroll Y at capture time — a best-effort restoration target, not an identity. */
  scrollY?: number;
  /** A stable key for the originating control/element, resolved live on restore — never a stored element reference (§C5). */
  originControlKey?: string;
  /** Fixture-only placeholder — M4.10 owns the real Comparison prototype (§C9). */
  comparisonState?: Record<string, string | number | boolean>;
  /** Fixture-only placeholder — M4.10/M2.8 own the real Gallery feature (§C9). */
  galleryPosition?: number;
  /** Fixture-only placeholder — genuinely deferred consumer, model supported only. */
  expandedIds?: string[];
  /** Capture timestamp — informational only, never treated as authoritative. */
  capturedAt: number;
}

const STORAGE_KEY_PREFIX = "m4-return-memory:";

function hasSessionStorage(): boolean {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

/** Captures a snapshot under `key`, session-scoped. Overwrites any prior capture under the same key. */
export function captureReturnContext(
  key: string,
  context: Omit<ReturnContext, "capturedAt">,
): void {
  if (!hasSessionStorage()) return;
  const record: ReturnContext = { ...context, capturedAt: Date.now() };
  window.sessionStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(record));
}

/** Returns the captured snapshot for `key`, or `null` if none exists — the direct-entry / cold-open case (§C2), never fabricated. */
export function retrieveReturnContext(key: string): ReturnContext | null {
  if (!hasSessionStorage()) return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY_PREFIX + key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ReturnContext;
  } catch {
    return null;
  }
}

/** Clears any captured snapshot for `key`. */
export function clearReturnContext(key: string): void {
  if (!hasSessionStorage()) return;
  window.sessionStorage.removeItem(STORAGE_KEY_PREFIX + key);
}

/**
 * Resolves a stable origin-control key to a live, currently-mounted
 * element — never a stored reference. Returns `null` (never throws) when
 * the key is absent or no longer resolves to anything, the "changed
 * layout / stale target degrades safely" case (§C5/§C7).
 */
export function findElementByReturnKey(key: string): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.querySelector<HTMLElement>(`[data-return-origin-key="${CSS.escape(key)}"]`);
}

/** Best-effort focus restoration by stable key. Returns whether it succeeded — never throws on a missing/detached target. */
export function restoreFocusByKey(key: string | undefined): boolean {
  if (!key) return false;
  const target = findElementByReturnKey(key);
  if (!target) return false;
  target.focus();
  return true;
}

/**
 * Best-effort scroll restoration — an instant jump (`behavior: "auto"`),
 * never a smooth/animated scroll (§C7's own "native scrolling remains
 * baseline" / this task's repeated "no scroll hijacking" prohibition).
 * `history.scrollRestoration` is never touched anywhere in this module —
 * native browser scroll-restoration behavior is left completely intact.
 */
export function restoreScroll(scrollY: number | undefined): void {
  if (typeof window === "undefined" || scrollY === undefined) return;
  window.scrollTo({ top: scrollY, behavior: "auto" });
}
