import { FocusRegion } from "./FocusRegion";
import { FocusItem } from "./FocusItem";
import styles from "./FocusFixture.module.css";

/**
 * M4-B development review fixture — M4.4 §A11. Demonstrates the single
 * Focus + Recession mechanism (`FocusRegion`/`FocusItem`) across all six
 * semantic contexts M4.4 must support, with different content — never a
 * different implementation — per each. No real portfolio record is used;
 * every item below is clearly fixture content. Development-only — see
 * `src/lib/motion/fixtureGate.ts` and `src/app/contact/page.tsx` for the
 * production gate (`?motion-fixture=m4b`, no new route added).
 */
export function FocusFixture() {
  return (
    <div className={styles.focusFixtureGrid}>
      <section>
        <h2>Work — evidence inspection</h2>
        <FocusRegion recessionToken="--motion-recession-focus">
          <FocusItem
            focusKey="work-evidence-a"
            label="Evidence A"
            summary={<p>Fixture: Interface audit, screenshot set (3 frames)</p>}
            detail={
              <p>
                Fixture detail: precise, aligned evidence — annotated screenshot comparing before
                and after states, with exact measurement callouts.
              </p>
            }
          />
          <FocusItem
            focusKey="work-evidence-b"
            label="Evidence B"
            summary={<p>Fixture: Component API diff</p>}
            detail={<p>Fixture detail: a structured before/after prop-signature comparison.</p>}
          />
        </FocusRegion>
      </section>

      <section>
        <h2>Research — artifact reading</h2>
        <FocusRegion recessionToken="--motion-recession-focus">
          <FocusItem
            focusKey="research-artifact-a"
            label="Artifact A"
            summary={<p>Fixture: Working note, &ldquo;Reduced-motion parity&rdquo;</p>}
            detail={
              <p>
                Fixture detail: a calm, editorial reading passage — the kind of longer artifact text
                Research inspection concentrates attention on without theatrical motion.
              </p>
            }
          />
          <FocusItem
            focusKey="research-artifact-b"
            label="Artifact B"
            summary={<p>Fixture: Citation set</p>}
            detail={<p>Fixture detail: a list of supporting references for the working note.</p>}
          />
        </FocusRegion>
      </section>

      <section>
        <h2>Lab — inspection</h2>
        <FocusRegion recessionToken="--motion-recession-focus">
          <FocusItem
            focusKey="lab-inspection-a"
            label="Prototype state"
            summary={<p>Fixture: Prototype, provisional build 0.4</p>}
            detail={
              <p>
                Fixture detail: transformable/provisional material — a note marked explicitly
                unfinished, exposed without chaotic motion.
              </p>
            }
          />
          <FocusItem
            focusKey="lab-inspection-b"
            label="Tooling note"
            summary={<p>Fixture: Build script draft</p>}
            detail={<p>Fixture detail: an in-progress tooling note, still provisional.</p>}
          />
        </FocusRegion>
      </section>

      <section>
        <h2>Art — concentrated viewing</h2>
        <FocusRegion recessionToken="--motion-recession-overlay">
          <FocusItem
            focusKey="art-viewing-a"
            label="Study A"
            summary={<p>Fixture: Study, medium: fixture placeholder</p>}
            detail={
              <p>
                Fixture detail: the interface recedes most strongly here (
                <code>--motion-recession-overlay</code>) so the authored work stays primary — the
                same mechanism, a stronger recession magnitude.
              </p>
            }
          />
          <FocusItem
            focusKey="art-viewing-b"
            label="Study B"
            summary={<p>Fixture: Study, series placeholder</p>}
            detail={<p>Fixture detail: a second study, same strong-recession context.</p>}
          />
        </FocusRegion>
      </section>

      <section>
        <h2>Products — evaluation</h2>
        <FocusRegion recessionToken="--motion-recession-focus">
          <FocusItem
            focusKey="product-evaluation-a"
            label="Fixture product A"
            summary={<p>Fixture: Product, informational summary</p>}
            detail={
              <p>
                Fixture detail: informational and actionable evaluation content — specification
                detail a visitor would concentrate on before a real decision.
              </p>
            }
          />
          <FocusItem
            focusKey="product-evaluation-b"
            label="Fixture product B"
            summary={<p>Fixture: Product, comparison note</p>}
            detail={<p>Fixture detail: a comparison note for evaluation.</p>}
          />
        </FocusRegion>
      </section>

      <section>
        <h2>About — long-form / archival reading</h2>
        <FocusRegion recessionToken="--motion-recession-focus">
          <FocusItem
            focusKey="about-reading-a"
            label="Practice note"
            summary={<p>Fixture: Practice note, excerpt</p>}
            detail={
              <p>
                Fixture detail: calm, readable long-form content — concentrated attention without
                any change in text size or theatrical entrance.
              </p>
            }
          />
          <FocusItem
            focusKey="about-reading-b"
            label="Archival entry"
            summary={<p>Fixture: Archival entry, excerpt</p>}
            detail={<p>Fixture detail: a second long-form archival excerpt.</p>}
          />
        </FocusRegion>
      </section>
    </div>
  );
}
