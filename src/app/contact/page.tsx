import { UtilityPageShell } from "@/components/page-shells/PageShell";
import { ContactForm } from "@/components/contact/ContactForm";
import { MotionFixture } from "@/components/motion/MotionFixture";
import { OverlayFixture } from "@/components/overlay/OverlayFixture";
import { ReturnMemoryFixture } from "@/components/return/ReturnMemoryFixture";
import { ComparisonTraceFixture } from "@/components/comparison/ComparisonTraceFixture";
import { DistrictCompositionFixture } from "@/components/composition/DistrictCompositionFixture";
import {
  isComparisonTraceFixtureActive,
  isFocusFixtureActive,
  isMotionFixtureActive,
} from "@/lib/motion/fixtureGate";
import { isDistrictCompositionFixtureActive } from "@/lib/composition/fixtureGate";

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const showMotionFixture = isMotionFixtureActive(params);
  const showFocusFixture = isFocusFixtureActive(params);
  const showComparisonTraceFixture = isComparisonTraceFixtureActive(params);
  const showDistrictCompositionFixture = isDistrictCompositionFixtureActive(params);

  return (
    <UtilityPageShell heading="Contact">
      <ContactForm />
      {showMotionFixture && (
        <>
          <p role="status">M4-A Motion Foundation Fixture — not real public content</p>
          <MotionFixture />
        </>
      )}
      {showFocusFixture && (
        <>
          <p role="status">M4-B Focus / Return Fixture — not real public content</p>
          <OverlayFixture />
          <section>
            <h2>Return / spatial memory</h2>
            <ReturnMemoryFixture />
          </section>
        </>
      )}
      {showComparisonTraceFixture && (
        <>
          <p role="status">M4-C Comparison / Trace Fixture — not real public content</p>
          <ComparisonTraceFixture />
        </>
      )}
      {showDistrictCompositionFixture && (
        <>
          <p role="status">M5.0 District Composition Fixture — not real public content</p>
          <DistrictCompositionFixture />
        </>
      )}
    </UtilityPageShell>
  );
}
