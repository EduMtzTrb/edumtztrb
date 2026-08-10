import { UtilityPageShell } from "@/components/page-shells/PageShell";
import { MotionFixture } from "@/components/motion/MotionFixture";
import { isMotionFixtureActive } from "@/lib/motion/fixtureGate";

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const showFixture = isMotionFixtureActive(params);

  return (
    <UtilityPageShell heading="Contact">
      {showFixture && (
        <>
          <p role="status">M4-A Motion Foundation Fixture — not real public content</p>
          <MotionFixture />
        </>
      )}
    </UtilityPageShell>
  );
}
