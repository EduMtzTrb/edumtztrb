import { UtilityPageShell } from "@/components/page-shells/PageShell";
import { MotionFixture } from "@/components/motion/MotionFixture";
import { FocusFixture } from "@/components/focus/FocusFixture";
import { isFocusFixtureActive, isMotionFixtureActive } from "@/lib/motion/fixtureGate";

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const showMotionFixture = isMotionFixtureActive(params);
  const showFocusFixture = isFocusFixtureActive(params);

  return (
    <UtilityPageShell heading="Contact">
      {showMotionFixture && (
        <>
          <p role="status">M4-A Motion Foundation Fixture — not real public content</p>
          <MotionFixture />
        </>
      )}
      {showFocusFixture && (
        <>
          <p role="status">M4-B Focus / Return Fixture — not real public content</p>
          <FocusFixture />
        </>
      )}
    </UtilityPageShell>
  );
}
