"use client";

import { useState } from "react";

import { FocusFixture } from "@/components/focus/FocusFixture";
import { Overlay } from "./Overlay";
import { useOverlayBackgroundProps } from "./useOverlayBackgroundProps";
import styles from "./OverlayFixture.module.css";

/**
 * M4-B development review fixture — M4.5 §B14. Extends the M4.4 Focus
 * fixture (composed unchanged, not duplicated) with a modal Overlay demo:
 * opening it applies the exact same background-recession treatment
 * (`useOverlayBackgroundProps`, reusing `focus.css`'s `[data-focus-state]`
 * rule) to the whole Focus fixture, and makes it genuinely inert.
 * Development-only, same `?motion-fixture=m4b` gate as M4.4 — see
 * `src/lib/motion/fixtureGate.ts` and `src/app/contact/page.tsx`.
 */
export function OverlayFixture() {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<HTMLButtonElement | null>(null);
  const backgroundProps = useOverlayBackgroundProps(open);

  return (
    <div className={styles.overlayFixtureRoot}>
      <section>
        <h2>Overlay — modal, composing Focus + Recession</h2>
        <p>
          Fixture: opening this overlay recedes and inerts the entire Focus fixture below it — the
          same mechanism M4.4 already established, not a second one.
        </p>
        <button
          type="button"
          ref={setOrigin}
          onClick={() => setOpen(true)}
          className="action-secondary type-label"
        >
          Open overlay
        </button>
      </section>

      <div {...backgroundProps}>
        <FocusFixture />
      </div>

      <Overlay open={open} onClose={() => setOpen(false)} label="Fixture overlay" origin={origin}>
        <h2>Fixture overlay content</h2>
        <p>
          Fixture: not a real portfolio record. Tab and Shift+Tab stay contained inside this panel;
          Escape or the Close control above dismiss it and return focus to the button that opened
          it.
        </p>
        <a href="/contact">A fixture link inside the overlay</a>
      </Overlay>
    </div>
  );
}
