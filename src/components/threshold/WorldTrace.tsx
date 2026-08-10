"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

import { hasTraversedThreshold, peekThresholdArrival } from "@/lib/threshold/familiarity";
import {
  HOME_TO_WORK_ARRIVAL_KEY,
  HOME_WORK_THRESHOLD_KEY,
  WORK_TO_HOME_ARRIVAL_KEY,
} from "@/lib/threshold/thresholdKeys";

/**
 * WorldTrace — M4.9 calibration. The corrected record of this task's own
 * root-cause finding: the original M4.9 passage failed real-browser
 * review because its one animated element (`ThresholdIndicator`) was a
 * conditionally *mounted* node — a brand-new DOM node inserted already at
 * its final CSS values has no prior value to animate from in any
 * browser, so the declared `transition` never actually played, and only
 * page text differed between Home and Work.
 *
 * THE FIX IS PERSISTENCE, NOT A NEW EFFECT — `WorldTrace` is mounted once
 * in `AppShell` (`src/components/shell/AppShell.tsx`), the one layout
 * level that genuinely survives every Home ↔ Work navigation (`/` and
 * `/work` share no other common layout). It is *never* conditionally
 * mounted or unmounted; only its own attribute values change in response
 * to the real, current pathname (`usePathname()`, the same hook
 * `GlobalNav` already uses for its own active-state detection). Because
 * the element genuinely persists across the route change, a real CSS
 * `transition` on it has a real prior value to animate from — structurally
 * guaranteed to be capable of firing, unlike the conditionally-mounted
 * approach it replaces.
 *
 * NOT A GENERAL ROUTE-TRANSITION MANAGER — this component knows about
 * exactly one boundary (Home ↔ Work, via `resolveTracePosition`), reads
 * no navigation-in-progress state, intercepts nothing, and delays
 * nothing. It is a single, restrained, structural indicator scoped to
 * this one representative prototype — not a mechanism for choreographing
 * arbitrary route changes.
 *
 * FIRST/REPEATED MODE — reused verbatim from `ThresholdIndicator`'s own
 * pattern: `hasTraversedThreshold` (M4.6/M4.9's session-scoped familiarity
 * read) is read via `useSyncExternalStore`, never mutated here. The actual
 * "mark traversed" write remains `ThresholdIndicator`'s own, unchanged
 * responsibility. `hasTraversedThreshold` is monotonic for the session
 * (once true, stays true), so no separate "did a crossing just happen"
 * bookkeeping is needed: on the render that first paints `position="work"`,
 * the mark from a *previous* crossing has not yet been written (that write
 * happens in `ThresholdIndicator`'s effect, after this same commit), so the
 * snapshot correctly still reads "first". On any later crossing, the prior
 * effect has already run, so the snapshot correctly reads "repeated".
 *
 * A first attempt at this component tracked "genuine crossing" with two
 * `useRef`s mutated during the render body, reasoning that ref mutation
 * (not `setState`) was React's documented exception to "don't do this
 * during render." `npx eslint` proved that reasoning wrong for this
 * specific repository: `react-hooks/refs` in this project's config forbids
 * reading OR writing `ref.current` during render outright, with no
 * exception. This rewrite avoids refs entirely rather than relying on a
 * pattern already shown not to hold here.
 *
 * CANCELLATION — audited, none manufactured. `usePathname()` is
 * synchronous and always reflects the current, real location; there is
 * no asynchronous settle for a rapid navigation to race, and the
 * browser's own CSS transition engine smoothly redirects an in-flight
 * transition toward a newly changed target value on its own — no
 * component-level interruption logic is needed (see
 * docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md "Interruption").
 *
 * SCOPE — Home <-> Work ONLY, never "any navigation into Work." Deriving
 * `data-trace-position` from the pathname alone would make Research ->
 * Work (or any non-Home origin) play the identical choreography as a
 * genuine Home -> Work passage, merely because the destination happens to
 * be `/work` — a real leak found and corrected during a pre-review
 * integrity audit (see the M4.9 doc's own "WorldTrace Scope" section).
 * `data-trace-active` gates the CSS `transition` itself, reusing the
 * exact same `peekThresholdArrival` arrival-key infrastructure
 * `ThresholdLink`/`ThresholdIndicator` already use to detect a genuine
 * passage — never a second, parallel session/history system. Structural
 * presence (`data-trace-position`, always correct) is kept deliberately
 * separate from active choreography (`data-trace-active`, only true for a
 * genuine Home<->Work crossing): an unrelated arrival at Work still shows
 * the trace at the Work-side edge (stable shell structure), but with no
 * transition to animate through — it simply renders there, exactly as a
 * cold/direct entry already does.
 */
type TracePosition = "home" | "work" | "elsewhere";
type TraceMode = "first" | "repeated";

function resolveTracePosition(pathname: string | null): TracePosition {
  if (pathname === "/") return "home";
  if (pathname === "/work" || pathname?.startsWith("/work/")) return "work";
  return "elsewhere";
}

function isGenuineCrossing(position: TracePosition): boolean {
  if (position === "work") return peekThresholdArrival(HOME_TO_WORK_ARRIVAL_KEY);
  if (position === "home") return peekThresholdArrival(WORK_TO_HOME_ARRIVAL_KEY);
  return false;
}

function subscribe(): () => void {
  return () => {};
}

function getServerSnapshot(): TraceMode {
  return "first";
}

function getModeSnapshot(): TraceMode {
  return hasTraversedThreshold(HOME_WORK_THRESHOLD_KEY) ? "repeated" : "first";
}

export function WorldTrace() {
  const pathname = usePathname();
  const position = resolveTracePosition(pathname);
  const mode = useSyncExternalStore(subscribe, getModeSnapshot, getServerSnapshot);
  const active = isGenuineCrossing(position);

  return (
    <div
      className="world-trace"
      data-trace-position={position}
      data-trace-mode={mode}
      data-trace-active={active ? "true" : undefined}
    >
      <span className="world-trace-segment" aria-hidden="true" />
    </div>
  );
}
