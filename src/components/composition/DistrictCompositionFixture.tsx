import { DistrictField } from "./DistrictField";

/**
 * M5.0 Part B development review fixture, calibrated after first human
 * review (see docs/implementation/M5.0_SHARED_DISTRICT_SHELL.md "Human
 * Review — Calibration Required"). Development-only, gated the same way as
 * the M4-A/M4-B/M4-C fixtures — see `src/lib/composition/fixtureGate.ts`
 * and `src/app/contact/page.tsx` (`?composition-fixture=m5`, no new route).
 *
 * Renders the SAME `DistrictField` shared composition primitive three
 * times, varying only `density` and content volume — proving one shared
 * system, not three layouts, supports contrasting district conditions
 * (IMPLEMENTATION_PLAN.md M5.0's own "one shell can support contrasting
 * district conditions without forking" requirement). Content is
 * unmistakably representative fixture text, never a real Work/Research/
 * Art record, never a district palette, never fabricated Signal/network
 * decoration.
 *
 * CALIBRATION: the first review found section/sub-headings here still used
 * unstyled default `<h2>`/`<h3>` markup — no approved type role was ever
 * applied, so plain browser heading defaults, not the architectural
 * typography system, were what actually dominated the rendered page. Every
 * heading and text node below now carries an existing approved
 * `DESIGN_SYSTEM.md` §7 type-role class (`.type-h2`/`.type-h3`/
 * `.type-annotation`/etc., src/styles/tokens/typography.css) — no new
 * typography, only the system that already existed actually being used.
 * The concentrated/focus-forward statement additionally uses `.type-display`
 * (already approved for "threshold moments"/major anchors) so it reads as
 * a deliberately occupied field, not merely a smaller amount of body text.
 */
export function DistrictCompositionFixture() {
  return (
    <div>
      <section aria-labelledby="fixture-dense-heading">
        <h2 id="fixture-dense-heading" className="type-h2">
          Dense / evidence-forward (density=&quot;dense&quot;)
        </h2>
        <DistrictField
          density="dense"
          primary={
            <div>
              <h3 className="type-h3">Representative evidence set — fixture only</h3>
              <ul className="type-body-small">
                <li>Fixture item 01 — representative record summary line.</li>
                <li>Fixture item 02 — representative record summary line.</li>
                <li>Fixture item 03 — representative record summary line.</li>
                <li>Fixture item 04 — representative record summary line.</li>
                <li>Fixture item 05 — representative record summary line.</li>
                <li>Fixture item 06 — representative record summary line.</li>
              </ul>
            </div>
          }
          peripheral={
            <div>
              <h3 className="type-annotation">Related — fixture only</h3>
              <ul className="type-annotation">
                <li>Fixture filter A</li>
                <li>Fixture filter B</li>
                <li>Fixture related term</li>
              </ul>
            </div>
          }
        />
      </section>

      <section aria-labelledby="fixture-editorial-heading">
        <h2 id="fixture-editorial-heading" className="type-h2">
          Editorial / reading-forward (density=&quot;moderate&quot;)
        </h2>
        <DistrictField
          density="moderate"
          primary={
            <div className="measure">
              <h3 className="type-h3">Representative reading passage — fixture only</h3>
              <p className="type-body">
                This paragraph is representative fixture prose, standing in for a real editorial
                passage. Its only purpose is to demonstrate the shared composition field at reading
                width and moderate density, not to describe real work.
              </p>
              <p className="type-body">
                A second representative paragraph continues the same fixture passage, long enough to
                show how the primary zone behaves once it holds genuine running text rather than
                short list items.
              </p>
            </div>
          }
          peripheral={
            <div>
              <h3 className="type-annotation">Context — fixture only</h3>
              <p className="type-annotation">
                Fixture annotation, related but secondary to the reading passage.
              </p>
            </div>
          }
        />
      </section>

      <section aria-labelledby="fixture-sparse-heading">
        <h2 id="fixture-sparse-heading" className="type-h2">
          Sparse / focus-forward (density=&quot;concentrated&quot;)
        </h2>
        <DistrictField
          density="concentrated"
          primary={
            <div>
              <h3 className="type-display">Representative focal statement — fixture only</h3>
              <p className="type-body">
                One deliberately short, isolated statement — the rest of the field is void.
              </p>
            </div>
          }
          peripheral={<p className="type-annotation">Fixture latent note</p>}
        />
      </section>
    </div>
  );
}
