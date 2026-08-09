import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Originally transcribed directly from DESIGN_SYSTEM_v1.0.md §60 ("Approved
 * token families") — not derived from reading src/styles/tokens, so this
 * test can actually detect an accidentally renamed or deleted approved
 * token, the same way tests/routes/route-contract.test.ts protects the
 * route set.
 *
 * Every approved name must be *declared* (protects against deletion/rename).
 * Beyond that, each name is also classified RESOLVED or UNRESOLVED and
 * checked accordingly — this is the correction described in
 * docs/implementation/M2.1_TOKEN_FOUNDATION.md's provenance table: a token
 * may only hold a real value here if the Design System gives one exactly
 * (or the value is a technical alias explicitly justified by already-
 * existing repository behavior, e.g. `color-focus`'s dark-field default).
 * Anything backed only by a range, or by a name with no approved value at
 * all, must stay declared-but-empty until its owning work package resolves
 * it — this suite fails if either direction regresses.
 *
 * Updated by Implementation-Readiness Reconciliation (see
 * docs/implementation/IMPLEMENTATION_READINESS_RECONCILIATION.md) for
 * `DESIGN_SYSTEM.md v1.1`, which explicitly retires/supersedes six of the
 * original 68 names (`font-primary`, `font-technical`, `line-standard`,
 * `color-district-accent`, `surface-1`, `surface-2`) and approves three
 * replacement names (`font-display`, `font-reading`, `font-mono-functional`).
 * The other 62 v1.0-approved names are unaffected by v1.1 and remain as
 * M2.1 originally classified them.
 *
 * Updated again by M2.2 — Typography (see
 * docs/implementation/M2.2_TYPOGRAPHY.md): `font-display`, `font-reading`,
 * `font-mono-functional`, and all eleven `type-*` role tokens move from
 * UNRESOLVED to RESOLVED — M2.2 calibrated real families and fluid clamp()
 * sizes for each, within the ranges `DESIGN_SYSTEM.md` approves.
 *
 * Updated again by M2.3 — Spacing and Grid (see
 * docs/implementation/M2.3_SPACING_GRID.md): all six margin/gutter tokens
 * move from UNRESOLVED to RESOLVED — each calibrated to a fluid `clamp()`
 * that stays within its approved per-breakpoint range. `color-disabled` and
 * `surface-overlay` remain unresolved, owned by later work packages.
 *
 * Opacity tokens (below, checked separately) were never part of the
 * original §60 registry — v1.0 approved neither opacity nor layer-order
 * anywhere (see docs/implementation/IMPLEMENTATION_READINESS_RECONCILIATION.md).
 * `DESIGN_SYSTEM.md v1.1` §100 approves five semantic opacity roles for the
 * first time. M2.5 — Action Controls (see
 * docs/implementation/M2.5_ACTION_CONTROLS.md) is the first genuine
 * consumer, resolving `opacity-disabled`; the other four roles stay
 * declared-but-empty, same pattern as everything else in this file.
 */

// RESOLVED: DESIGN_SYSTEM_v1.0.md gives an exact single value (or a
// technical default alias pointing at one), so a real value is required.
const RESOLVED_TOKENS = [
  "font-display",
  "font-reading",
  "font-mono-functional",
  "type-display",
  "type-h1",
  "type-h2",
  "type-h3",
  "type-body-large",
  "type-body",
  "type-body-small",
  "type-caption",
  "type-metadata",
  "type-annotation",
  "type-label",
  "space-0",
  "space-1",
  "space-2",
  "space-3",
  "space-4",
  "space-5",
  "space-6",
  "space-7",
  "space-8",
  "space-9",
  "space-10",
  "space-11",
  "space-12",
  "grid-compact-4",
  "grid-medium-8",
  "grid-wide-12",
  "composition-max",
  "color-void-1000",
  "color-void-900",
  "color-graphite-800",
  "color-graphite-700",
  "color-graphite-500",
  "color-mist-300",
  "color-mist-200",
  "color-paper-100",
  "color-paper-50",
  "color-white",
  "color-ink",
  "color-ink-secondary",
  "color-light-text",
  "color-focus",
  "color-info",
  "color-success",
  "color-warning",
  "color-error",
  "line-hairline",
  "line-emphasis",
  "line-structural",
  "radius-none",
  "radius-control",
  "radius-small",
  "radius-circle",
  "surface-field",
  "margin-compact",
  "margin-medium",
  "margin-wide",
  "gutter-compact",
  "gutter-medium",
  "gutter-wide",
];

// UNRESOLVED: the Design System gives only a range, or approves the name
// with no value at all — must stay declared-but-empty (see file header and
// each token file's own comments for the per-token reasoning).
const UNRESOLVED_TOKENS = ["color-disabled", "surface-overlay"];

const APPROVED_TOKENS = [...RESOLVED_TOKENS, ...UNRESOLVED_TOKENS];

// Auxiliary on-light/on-dark variants this implementation introduced to
// support the field-pair values above — not part of §60's own registry, so
// not checked against it, but their unresolved status is still protected.
const UNRESOLVED_AUXILIARY_TOKENS = [
  "color-disabled-on-light",
  "color-disabled-on-dark",
  "surface-overlay-on-dark",
  "surface-overlay-on-light",
];

// Retired names — either Milestone 1 starter names §60/M2.1 replaced
// (regression-guards the correction described in
// docs/implementation/M2.1_TOKEN_FOUNDATION.md), or names DESIGN_SYSTEM.md
// v1.1 explicitly superseded/removed (regression-guards Implementation-
// Readiness Reconciliation — see
// docs/implementation/IMPLEMENTATION_READINESS_RECONCILIATION.md).
const RETIRED_TOKENS = [
  "void-1000",
  "void-900",
  "fog-300",
  "fog-200",
  "fog-100",
  "district-accent",
  "state-focus",
  "state-info",
  "state-success",
  "state-warning",
  "state-error",
  "radius-0",
  "radius-1",
  "radius-2",
  "radius-round",
  // Retired by DESIGN_SYSTEM.md v1.1 (Implementation-Readiness Reconciliation):
  "font-primary",
  "font-technical",
  "line-standard",
  "color-district-accent",
  "surface-1",
  "surface-2",
];

// Opacity — separate from APPROVED_TOKENS/RESOLVED_TOKENS above because it
// was never part of the original §60 registry (see file header). Checked
// with its own tests, same rigor, same declared-vs-empty rules.
const OPACITY_RESOLVED_TOKENS = ["opacity-disabled"];
const OPACITY_UNRESOLVED_TOKENS = [
  "opacity-full-authority",
  "opacity-supporting",
  "opacity-latent",
  "opacity-recessed-context",
];

const TOKENS_DIR = join(process.cwd(), "src", "styles", "tokens");

const TOKEN_FILES = [
  "color.css",
  "surface.css",
  "typography.css",
  "spacing.css",
  "grid.css",
  "geometry.css",
  "opacity.css",
];

function readAllTokenCss(): string {
  return TOKEN_FILES.map((file) => readFileSync(join(TOKENS_DIR, file), "utf-8")).join("\n");
}

/** Maps each declared custom property name to its raw declared value (may be empty). */
function declaredCustomProperties(css: string): Map<string, string> {
  const declarations = new Map<string, string>();
  for (const match of css.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]*);/g)) {
    declarations.set(match[1], match[2].trim());
  }
  return declarations;
}

describe("Token contract (DESIGN_SYSTEM_v1.0.md §60, reconciled against v1.1)", () => {
  const css = readAllTokenCss();
  const declared = declaredCustomProperties(css);

  it("declares exactly 65 approved token names in this test's own source-of-truth list", () => {
    expect(APPROVED_TOKENS).toHaveLength(65);
  });

  it.each(APPROVED_TOKENS)("approved token --%s is declared", (token) => {
    expect(declared.has(token)).toBe(true);
  });

  it.each(RESOLVED_TOKENS)(
    "--%s has an exact approved value (Design System gives one)",
    (token) => {
      expect(declared.get(token)).not.toBe("");
    },
  );

  it.each(UNRESOLVED_TOKENS)(
    "--%s is deliberately unresolved (Design System gives only a range, or no value)",
    (token) => {
      expect(declared.get(token)).toBe("");
    },
  );

  it.each(UNRESOLVED_AUXILIARY_TOKENS)(
    "auxiliary token --%s is deliberately unresolved",
    (token) => {
      expect(declared.get(token)).toBe("");
    },
  );

  it("does not declare any Milestone 1 starter token name that M2.1 retired", () => {
    const stillPresent = RETIRED_TOKENS.filter((token) => declared.has(token));
    expect(stillPresent, `Retired token names still declared: ${stillPresent.join(", ")}`).toEqual(
      [],
    );
  });

  it("index.css imports all seven token files, in the tokens directory", () => {
    const index = readFileSync(join(TOKENS_DIR, "index.css"), "utf-8");
    for (const file of TOKEN_FILES) {
      expect(index).toContain(`./${file}`);
    }
  });

  it.each(OPACITY_RESOLVED_TOKENS)(
    "--%s has a calibrated value (first real consumer: M2.5 disabled state)",
    (token) => {
      expect(declared.get(token)).not.toBe("");
    },
  );

  it.each(OPACITY_UNRESOLVED_TOKENS)(
    "--%s is deliberately unresolved (no consumer yet)",
    (token) => {
      expect(declared.get(token)).toBe("");
    },
  );
});

describe("No stale token references remain in consuming stylesheets", () => {
  const consumers = [
    readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf-8"),
    readFileSync(join(process.cwd(), "src", "styles", "shell.css"), "utf-8"),
    readFileSync(join(process.cwd(), "src", "styles", "controls.css"), "utf-8"),
  ].join("\n");

  it("consuming stylesheets reference no retired token name", () => {
    for (const retired of RETIRED_TOKENS) {
      expect(consumers).not.toContain(`var(--${retired})`);
    }
  });

  it("consuming stylesheets reference no unresolved token (nothing may silently depend on an empty value)", () => {
    for (const unresolved of [
      ...UNRESOLVED_TOKENS,
      ...UNRESOLVED_AUXILIARY_TOKENS,
      ...OPACITY_UNRESOLVED_TOKENS,
    ]) {
      expect(consumers).not.toContain(`var(--${unresolved})`);
    }
  });
});
