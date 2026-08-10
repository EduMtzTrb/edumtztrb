"use client";

import { useSyncExternalStore } from "react";

/**
 * Reduced-motion / capability model — M4.2.
 *
 * Authority: IMPLEMENTATION_PLAN.md §9 ("M4.2 — Reduced motion and
 * capability handling: centralize `prefers-reduced-motion`, cancellation,
 * lower-cost fallbacks, environmental-motion disabling, and functional
 * feedback parity."); ANIMATION_SYSTEM.md §28 (Reduced-Motion System),
 * §30 (Performance Constraints — "progressively reduce environmental
 * complexity on constrained devices... suspend nonessential motion when
 * the document is hidden"). See
 * docs/implementation/M4.2_REDUCED_MOTION_CAPABILITY.md for the full
 * audit, including why the CSS side needed no new rule.
 *
 * ONE SOURCE OF PREFERENCE — every reduced-motion decision in this
 * repository reads `prefers-reduced-motion` through this module, never a
 * component-local `matchMedia` call (this task's own §B4: "avoid every
 * component independently writing its own... logic").
 *
 * NO FINGERPRINTING — this module reads exactly two conservative,
 * standardized browser signals: `prefers-reduced-motion` (a real user
 * preference) and the Network Information API's `saveData` flag (an
 * explicit "use less data" preference some browsers expose) — never
 * `navigator.userAgent`, `hardwareConcurrency`, `deviceMemory`, a battery
 * API, or continuous FPS sampling (this task's own explicit §B3/§B8
 * prohibition), confirmed at the source level in
 * `motion-capability-source-contract.test.ts`.
 */

function hasMatchMedia(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

/** Synchronous read of the current reduced-motion preference. Safe to call during SSR (returns `false`, the least-restrictive default, matching the fact that no client preference is knowable yet). */
export function prefersReducedMotion(): boolean {
  if (!hasMatchMedia()) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * React hook mirroring `prefersReducedMotion()`, updating live if the
 * visitor changes their OS/browser preference while the page is open.
 * Built on `useSyncExternalStore` — the React-recommended primitive for
 * subscribing to an external, mutable browser source like `matchMedia`
 * (avoids both tearing under concurrent rendering and the "setState
 * synchronously inside an effect" anti-pattern a plain `useState`+
 * `useEffect` implementation would otherwise need). SSR-safe by
 * construction: `getServerSnapshot` always returns `false` — the same
 * value React uses for the first client render before hydration
 * reconciles — so there is no hydration mismatch.
 */
function subscribe(onChange: () => void): () => void {
  if (!hasMatchMedia()) return () => {};
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, prefersReducedMotion, getServerSnapshot);
}

/**
 * Conservative "prefer lower cost" signal — true when the visitor prefers
 * reduced motion, OR has explicitly requested reduced data usage (Network
 * Information API `saveData`, where supported). Never guesses GPU/CPU
 * capability. SSR-safe (returns `false`).
 */
export function shouldPreferLowerCost(): boolean {
  if (prefersReducedMotion()) return true;
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

/** Whether the document is currently hidden (backgrounded/minimized/another tab active). SSR-safe (returns `false` — nothing is hidden before the document exists). */
export function isDocumentHidden(): boolean {
  if (typeof document === "undefined") return false;
  return document.visibilityState === "hidden";
}

/**
 * The environment-disabling contract — M4.2's §B6 obligation. No
 * environmental animation exists anywhere yet; this function is the
 * contract any future environmental motion (M4.9+) MUST consume before
 * running. Environmental motion may run only when the visitor has not
 * requested reduced motion, lower-cost behavior is not preferred, and the
 * document is currently visible.
 */
export function shouldRunEnvironmentalMotion(): boolean {
  return !prefersReducedMotion() && !shouldPreferLowerCost() && !isDocumentHidden();
}
