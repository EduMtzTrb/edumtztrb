"use client";

import { useState } from "react";

import { Action } from "@/components/controls/Action";
import { ActionLink } from "@/components/controls/ActionLink";
import { Checkbox } from "@/components/selection/Checkbox";
import { FilterToggle } from "@/components/selection/FilterToggle";
import { TextField } from "@/components/form/TextField";
import { ErrorState } from "@/components/state/ErrorState";
import { SuccessState } from "@/components/state/SuccessState";
import { InterruptionDemo } from "./InterruptionDemo";
import styles from "./MotionFixture.module.css";

/**
 * M4-A development review fixture — M4.3 §C21. Demonstrates hover,
 * focus-visible, press, selected, loading, success, error, and disabled
 * in one compact page, using real shared components unmodified (no
 * fixture-only visual language). Development-only — see
 * `src/lib/motion/fixtureGate.ts` and `src/app/contact/page.tsx` for the
 * production gate (`?motion-fixture=m4a`, outside `/contact`'s own
 * normal rendering — no new route was added).
 */
export function MotionFixture() {
  const [selected, setSelected] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.motionFixtureGrid}>
      <section>
        <h2>Hover / focus-visible / press</h2>
        <Action level="secondary">Hover, tab to, or click me</Action>{" "}
        <ActionLink href="/contact" kind="inline">
          an inline link
        </ActionLink>
      </section>

      <section>
        <h2>Selected</h2>
        <FilterToggle selected={selected} onClick={() => setSelected((value) => !value)}>
          {selected ? "Selected" : "Not selected"}
        </FilterToggle>{" "}
        <Checkbox
          label="A checkbox"
          checked={checked}
          onChange={() => setChecked((value) => !value)}
        />
      </section>

      <section>
        <h2>Loading</h2>
        <Action level="secondary" aria-busy={loading} onClick={() => setLoading((value) => !value)}>
          {loading ? "Loading…" : "Toggle loading"}
        </Action>
      </section>

      <section>
        <h2>Success</h2>
        <SuccessState heading="Fixture: action completed" />
      </section>

      <section>
        <h2>Error</h2>
        <TextField label="Fixture field" aria-invalid defaultValue="an invalid value" />
        <ErrorState heading="Fixture: something needs attention" />
      </section>

      <section>
        <h2>Disabled</h2>
        <Action level="secondary" disabled>
          Disabled action
        </Action>
      </section>

      <section>
        <h2>Rapid interruption / latest-intent</h2>
        <InterruptionDemo />
      </section>
    </div>
  );
}
