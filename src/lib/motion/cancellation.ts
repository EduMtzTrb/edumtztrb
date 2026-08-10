/**
 * Motion cancellation / latest-intent foundation — M4.2.
 *
 * Authority: ANIMATION_SYSTEM.md §33 (Interruption and User Priority —
 * "the final state must always resolve to the visitor's latest valid
 * action... animations must not stack indefinitely"). See
 * docs/implementation/M4.2_REDUCED_MOTION_CAPABILITY.md for the full
 * audit.
 *
 * SMALLEST REUSABLE FOUNDATION ONLY — this task's own explicit boundary:
 * "do not build the complete route-transition manager... do not build
 * spatial memory... do not intercept browser navigation." This module
 * provides one dependency-free, keyed cancellation primitive that any
 * future reusable motion (M4.3's local-feedback consumers today; M4.4+'s
 * larger transitions later) can build on — it does not itself choreograph
 * anything.
 *
 * MECHANISM — a plain, native `AbortController` per key. Starting motion
 * under a key that already has an active controller aborts the previous
 * one first, so at most one controller per key is ever active — "latest
 * valid user intent wins" by construction, not by convention a consumer
 * has to remember to implement.
 */

export interface MotionCancellationController {
  /** Begins a new motion under `key`, aborting any still-active motion previously begun under the same key. Returns the signal this motion should watch. */
  begin(key: string): AbortSignal;
  /** Whether `signal` is still the current (non-superseded, non-aborted) motion for `key` — the check a consumer makes immediately before committing a final visual state. */
  isActive(key: string, signal: AbortSignal): boolean;
  /** Cancels any active motion under `key` without starting a new one (e.g. on unmount). */
  cancel(key: string): void;
}

/**
 * Creates an independent cancellation registry. A consumer with several
 * unrelated concurrent motions (e.g. distinct interactive components) may
 * create its own registry, or the whole app may share one — this module
 * is deliberately unopinionated about scope; per this task's own
 * instruction not to build a global route-transition manager, no
 * app-wide singleton is exported here.
 */
export function createMotionCancellation(): MotionCancellationController {
  const active = new Map<string, AbortController>();

  return {
    begin(key: string): AbortSignal {
      active.get(key)?.abort();
      const controller = new AbortController();
      active.set(key, controller);
      return controller.signal;
    },

    isActive(key: string, signal: AbortSignal): boolean {
      return active.get(key)?.signal === signal && !signal.aborted;
    },

    cancel(key: string): void {
      active.get(key)?.abort();
    },
  };
}
