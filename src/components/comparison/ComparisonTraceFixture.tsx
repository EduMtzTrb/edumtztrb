import { LabComparisonFixture } from "./LabComparisonFixture";
import { TraceFixture } from "@/components/trace/TraceFixture";

/**
 * M4-C development review fixture — M4.10 §C18. Composes exactly one
 * representative Comparison pattern (Lab) and one representative Trace
 * pattern (a real M3.5 relationship) — never a general Sequence/graph
 * system. Development-only, gated the same way as the M4-A/M4-B
 * fixtures — see `src/lib/motion/fixtureGate.ts` and
 * `src/app/contact/page.tsx` (`?motion-fixture=m4c`, no new route).
 */
export function ComparisonTraceFixture() {
  return (
    <div>
      <section>
        <h2>Comparison — Lab attempts</h2>
        <LabComparisonFixture />
      </section>
      <section>
        <h2>Trace — real semantic relationship</h2>
        <TraceFixture />
      </section>
    </div>
  );
}
