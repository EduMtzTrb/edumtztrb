# Implementation-Readiness Reconciliation

## Status

**Ready for M2.2 with Deferred Calibration**

## Authority

`DESIGN_SYSTEM.md v1.1 — Approved / Closed`

Cross-checked directly against the document's own §117 ("Supersession Note — What changed from v1.0") and its decision register (`DS-101`–`DS-150`), not inferred.

## Repository Baseline

The implemented M2.1 token/system baseline, verified from disk (not assumed from prior reports):

| Responsibility | Current file(s) |
|---|---|
| Color tokens | `src/styles/tokens/color.css` |
| Spacing tokens | `src/styles/tokens/spacing.css` |
| Grid tokens | `src/styles/tokens/grid.css` |
| Line tokens | `src/styles/tokens/geometry.css` |
| Surface tokens | `src/styles/tokens/surface.css` |
| Layer/depth tokens | None exist. One hardcoded, unnamed value: `z-index: 100` on `.skip-link` in `src/styles/shell.css` (M1.4-era, predates M2.1 and this reconciliation) |
| Opacity tokens | None exist anywhere in the repository |
| Typography placeholders/assumptions | `src/styles/tokens/typography.css` (11 `type-*` size tokens); font-voice tokens reconciled by this task (see below) |
| Token tests/contracts | `tests/tokens/token-contract.test.ts` |
| Entry point | `src/styles/tokens/index.css` (imports all six token files), imported once by `src/app/globals.css` |

No TypeScript token definitions exist — the token layer is CSS custom properties only.

## Stale Design System References

### Updated live references
- `src/styles/tokens/typography.css` — full header rewritten; `font-primary`/`font-technical` retired, `font-display`/`font-reading`/`font-mono-functional` added (empty), citing `DESIGN_SYSTEM.md v1.1` §7/§91.
- `src/styles/tokens/geometry.css` — header updated to record `line-standard`'s supersession (§94, DS-145); `line-standard` retired.
- `src/styles/tokens/color.css` — header updated to record `color-district-accent`'s removal (§96.1, DS-144); token retired.
- `src/styles/tokens/surface.css` — header updated to record `surface-1`/`surface-2`'s supersession (§95, DS-146); both retired.
- `src/app/globals.css` — one comment that named the now-retired `--font-primary` token and cited stale section numbers (`DESIGN_SYSTEM_v1.0.md §6.1/§6.2`) was corrected to name the current tokens and current authority.
- `tests/tokens/token-contract.test.ts` — header comment and token classification lists updated (see **Tests / Contracts**).

### Preserved historical provenance
- `docs/implementation/M2.1_TOKEN_FOUNDATION.md` — **not modified**. It truthfully describes M2.1 as implemented and reconciled against `DESIGN_SYSTEM_v1.0.md`; that was accurate at the time and remains accurate as a historical record.
- Every token file's retained header text describing *why* a v1.0-era value was originally chosen (e.g. `color-focus`'s dark-field alias, the exact radius/spacing values) was left untouched — those values and their v1.0 citations are still correct today; v1.1 did not change them.
- `PROJECT_STATE.md` — **not modified** by this task (outside this task's file boundary). Its "68 tokens / 45 resolved" figures are now stale as a direct, expected result of this reconciliation (new figures: 65 / 43) and its "Not approved by `DESIGN_SYSTEM_v1.0.md`" opacity/layer-order line already carries a forward-pointing note from Governance Synchronization. Flagged below under **Remaining Issues** for a future, separate update.

### Remaining references needing later review
- `src/styles/shell.css` — its file-header comment still cites `DESIGN_SYSTEM_v1.0.md §18/§19/§33-39` for navigation/link/accessibility rules. This is M1.4-era work, outside M2.1's token scope and outside this task's file boundary (`shell.css` is a shell component stylesheet, not a token file). Not verified against v1.1's current section numbers and not modified — informational only.
- `docs/GOVERNING_DOCUMENTS.md` and `CHANGELOG.md` already correctly state Design System v1.1 as current authority (set by prior Governance Synchronization); no change needed here.

## Typography Readiness

**Old assumption found:** a single "universal Inter" model — one `font-primary` token (hardcoded to `"Inter", system-ui, ...`) intended to serve the entire platform, plus one separate `font-technical` (IBM Plex Mono) token. No distinction existed between a Display and a Reading voice; both would have shared `font-primary`.

**What v1.1 supersedes:** §117 point 1 states plainly: *"Universal Inter is retired as the approved authored type model."* §7 (Identity Principle 03) and §91 (Typography token model) replace it with three semantic voice roles — Display Voice, Reading Voice, Functional Mono Voice — and §7.4 states actual typeface families for **all three** voices "remain implementation-calibrated," including mono (§117 point 2: IBM Plex Mono is no longer even a default). No specific typeface name is fixed by governing authority for any voice at present.

**Reconciliation performed:** `font-primary` and `font-technical` retired; `font-display`, `font-reading`, `font-mono-functional` declared, each deliberately empty (no family invented — none is approved yet). The 11 `type-*` size-role tokens are unaffected by v1.1 (§91 lists the same 11 names) and were left exactly as M2.1 declared them.

**What M2.2 will need to implement:** load real typeface(s) satisfying each voice's approved *character* (architectural/authored for Display, editorial/measured for Reading, fixed-width-only for Functional Mono — §7.1–7.3), populate `font-display`/`font-reading`/`font-mono-functional` accordingly, and resolve the 11 `type-*` tokens within their approved ranges.

**Confirmation:** no typeface was loaded, no `next/font` call was added, no font family was chosen, and no text/heading/paragraph component was built or modified in this task. Only token *names* changed.

## Color / Signal

**`color-district-accent`: retired.**

`DESIGN_SYSTEM.md v1.1` §96.1 states unambiguously: *"`color-district-accent` is removed. District-specific branding palettes contradict the approved identity system"* (DS-144). §117 point 4 confirms: districts now differentiate through resolution, density, latency, layering, evidence, atmosphere, and spatial authority — not branding colors. This is not a rename — v1.1 does **not** redirect district differentiation to Signal. Signal is a deliberately separate, narrow, rare semantic role (§8, §96.2; DS-111–DS-113, including DS-113: *"Signal may not substitute for ordinary interaction, CTA, focus, validation, or semantic state colors"*). The token was never consumed anywhere in this repository, so retiring it required no other change. No Signal token exists yet and none was added — nothing in the current implementation currently misuses or approximates Signal, so no reconciliation was needed there.

## Line System

**`line-standard`: retired.**

§94 (Line token model) states: *"A single generic `line-standard` semantic role is superseded"* (DS-145), replaced by five named semantic roles: `line-structural`, `line-hierarchy`, `line-focus-state`, `line-annotation`, `line-relationship-trace`. `line-standard` was never consumed anywhere in this repository and is retired outright.

The three existing physical-weight primitives (`line-hairline` 1px, `line-emphasis` 2px, `line-structural` 3px) remain valid — `line-structural` in particular is explicitly still one of the five approved semantic roles, and §94 permits "implementation may alias physical values where testing shows two roles can share weight/color." The other four semantic roles (`line-hierarchy`, `line-focus-state`, `line-annotation`, `line-relationship-trace`) were **not** added: v1.1 gives their names but not their weights or colors ("exact line weights and opacities remain implementation-calibrated"), and introducing them now is Core visual primitives work for a later Milestone 2 package, not a prerequisite for M2.2 Typography.

## Surface System

**`surface-1` / `surface-2`: retired** (base tokens and their `-on-dark`/`-on-light` variants).

§95 (Field and surface token model) states generic public `surface-1`/`surface-2` terminology "is superseded... by field/content/overlay/focus terminology" (DS-146). Neither was consumed anywhere in this repository.

**`surface-field` and `surface-overlay`: unaffected, retained as-is.** Both are explicitly still named in §95's preferred list. `surface-field` remains load-bearing for the page background; `surface-overlay` remains declared-but-empty exactly as before.

The suggested new names (`surface-content`, `field-focused-media`) were **not** added — same reasoning as the line system: names given, no values, and building that architecture is later Core visual primitives work, not an M2.2 prerequisite.

## Depth / Layer Order

**Now governed semantically:** §19 defines the approved semantic depth sequence (Environmental Field → Resolved Layer → Working Layer → Focus Layer → Functional Overlay → Critical System Layer); §99 (Layer-order token model) approves six named tokens (`layer-field`, `layer-resolved`, `layer-working`, `layer-focus`, `layer-overlay`, `layer-critical`); DS-147: "Semantic z-order bands are approved; numerical z-index values remain implementation-level."

**What remains deferred:** exact numeric z-index values for each band — v1.1 explicitly does not fix them.

**Current implementation:** no layer/depth tokens exist at all. The one numeric value in the repository, `z-index: 100` on `.skip-link` in `shell.css`, is a pre-existing, working, M1.4-era value — not a token, not part of M2.1's scope, and not contradicted by v1.1 (v1.1 doesn't fix numbers either, so there is nothing for this hardcoded value to conflict with). No `layer-*` tokens were added in this task: doing so now would mean inventing which numeric value maps to which band, which this task is explicitly not authorized to do, and it is not required for M2.2 (Typography does not consume layer tokens).

## Opacity

**Now governed semantically:** §100 (Opacity token model) approves five named semantic roles — full authority, supporting, latent, recessed context, disabled — stating "exact values remain implementation-calibrated and must preserve contrast/accessibility" and "do not create a large arbitrary opacity scale solely because implementation permits it."

**What remains deferred:** every numeric opacity value.

**Current implementation:** no opacity tokens or hardcoded `opacity` declarations exist anywhere in `src/`. No token was added — same reasoning as layer order: not required for M2.2, and adding empty `opacity-*` tokens now without a concrete consumer would be premature architecture, not reconciliation of an existing contradiction.

## Other Token Findings

- **Grid, spacing, proportion — still valid, no change.** §92 (Spacing token model) and §93 (Grid token model) list exactly the token names already implemented (`space-0`–`space-12`, 4px/8px rhythm; `grid-compact-4`/`grid-medium-8`/`grid-wide-12`, margin/gutter roles, `composition-max`). Fully compatible with v1.1; nothing to reconcile.
- **Radius/geometry primitives — still valid.** §98 (Geometry token model) permits radius tokens "as implementation primitives within the restrained/function-led rule" and prohibits "a decorative large-radius family as an identity device." The current four-value radius registry (`radius-none`/`radius-control`/`radius-small`/`radius-circle`) is not a decorative family and is unaffected.
- **State semantics — no conflation found.** The only state-shaped tokens in the repository are UI interaction/validation feedback colors (`color-info`/`color-success`/`color-warning`/`color-error`, `color-focus`), all still listed as valid semantic roles in §96. None of them represents or conflates with the Information Architecture's four-dimensional record-lifecycle state model (lifecycle/visibility/certainty/availability) — that model governs content records, not UI feedback color, and no current token attempts to encode it. No action required.
- **District-expression assumptions — none exist.** No separate district theme objects, district-specific brand-color tokens beyond the now-retired `color-district-accent`, separate per-district typography systems, or district-namespaced token architecture were found anywhere in `src/`. **No conflicting district-brand implementation exists.**
- **Signal semantics — no conflict.** No token or component currently treats anything as a generic accent, hover color, or decorative highlight under the name "Signal" or otherwise. Nothing to reconcile; Signal remains unimplemented, as it should be at this stage.
- **Controlled Exception — no conflict.** `tests/tokens/token-contract.test.ts` enforces the shared *system* token registry (names/resolved-vs-unresolved state); it does not require every district to share every value, and nothing in the current test suite or token architecture would prevent a district from later introducing an approved Controlled Exception. No change needed.
- **Compositional grammar — no conflict.** The token contract does not impose a uniform grid or forbid asymmetry — grid column counts already vary by breakpoint (4/8/12) and margin/gutter are ranges, not fixed points. Nothing in the current token layer would prevent controlled asymmetry, concentrated void, shared axes, selective offset, peripheral latency, or density gradients from being expressed at the layout level. That expression itself remains later layout/composition work, correctly out of scope for tokens.

## M2.1 Changes Made

1. `src/styles/tokens/typography.css` — retired `font-primary`, `font-technical`; added `font-display`, `font-reading`, `font-mono-functional` (all declared, deliberately empty); header comment rewritten.
2. `src/styles/tokens/geometry.css` — retired `line-standard`; header comment rewritten.
3. `src/styles/tokens/color.css` — retired `color-district-accent`; header comment rewritten. `color-disabled` left unchanged (still an approved, unresolved name under v1.1 §96).
4. `src/styles/tokens/surface.css` — retired `surface-1`, `surface-2` (base + `-on-dark`/`-on-light` variants); header comment rewritten. `surface-field`, `surface-overlay` unchanged.
5. `src/app/globals.css` — one comment corrected (named token and cited section numbers were stale).
6. `tests/tokens/token-contract.test.ts` — token classification lists updated to match (see below); header comments updated; approved-token count assertion updated from 68 to 65.

No component, route, layout, or application-behavior file was touched. No typography was implemented, loaded, or applied.

## Tests / Contracts

**Inspected:** `tests/tokens/token-contract.test.ts` (full file), plus a manual search of `src/` and `tests/` for any consumption of `color-district-accent`, `line-standard`, `surface-1`, `surface-2`, `font-primary`, `font-technical`, `opacity`, and `z-index` — none of the six retired tokens were consumed anywhere, so no other test or source file needed updating.

**Changed:**
- `RESOLVED_TOKENS`: removed `font-primary`, `font-technical` (45 → 43 entries).
- `UNRESOLVED_TOKENS`: removed `line-standard`, `color-district-accent`, `surface-1`, `surface-2`; added `font-display`, `font-reading`, `font-mono-functional` (23 → 22 entries).
- `UNRESOLVED_AUXILIARY_TOKENS`: removed `surface-1-on-dark`, `surface-1-on-light`, `surface-2-on-dark`, `surface-2-on-light` (8 → 4 entries).
- `RETIRED_TOKENS`: added `font-primary`, `font-technical`, `line-standard`, `color-district-accent`, `surface-1`, `surface-2` (15 → 21 entries).
- Total approved-token count assertion: 68 → 65.

**Validation outcome:** `tests/tokens/token-contract.test.ts` — 139/139 passed. Full suite (`npm run test:run`) — 237/237 passed, 8/8 files (down from 247/247 before this reconciliation). The four `it.each` blocks account for the full -10: `APPROVED_TOKENS` "is declared" checks (68 → 65, -3), `RESOLVED_TOKENS` "has exact value" checks (45 → 43, -2), `UNRESOLVED_TOKENS` "is unresolved" checks (23 → 22, -1), `UNRESOLVED_AUXILIARY_TOKENS` checks (8 → 4, -4); every other test in the file is unchanged in count.

## Deferred Calibration Register

| Semantic role | Approved (v1.1) | Unresolved | Expected owner |
|---|---|---|---|
| Display Voice family | Character defined (§7.1); role name approved (§91) | Actual typeface | M2.2 — Typography |
| Reading Voice family | Character defined (§7.2); role name approved (§91) | Actual typeface | M2.2 — Typography |
| Functional Mono Voice family | Character defined (§7.3); role name approved (§91) | Actual typeface | M2.2 — Typography |
| `type-*` size tokens (11) | Min–max range per role (§7 of the typographic hierarchy) | Fixed point / fluid interpolation curve | M2.2 — Typography |
| `line-hierarchy`, `line-focus-state`, `line-annotation`, `line-relationship-trace` | Role names approved (§94, DS-145) | Weights, colors, and even whether they exist as tokens yet | Core visual primitives (later Milestone 2 package) |
| `surface-content`, `field-focused-media` | Suggested names (§95) | Values, and confirmation of exact naming | Core visual primitives (later Milestone 2 package) |
| Layer-order (`layer-field`…`layer-critical`) | Six named bands approved (§99, DS-147) | All numeric z-index values | Whichever package first needs real stacking (previously estimated M2.4/M2.9) |
| Opacity (5 semantic roles) | Roles approved (§100) | All numeric opacity values | Whichever package first needs real opacity (previously estimated M2.4/M2.9) |
| `margin-*` / `gutter-*` (6 tokens) | Per-breakpoint ranges (§93, carried from v1.0 §9.1) | Fixed points | M2.3 — Spacing and grid |
| `color-disabled` | Name approved (§96) | Value | Whichever package first builds real disabled-state UI |
| Signal | Semantic definition approved (§8, §96.2, DS-111–113) | No token exists yet; exact visual form | Not yet scheduled — no current consumer |

## Remaining Risks

- **`PROJECT_STATE.md`'s token-count figures (68/45) are now stale** as a direct result of this reconciliation (new figures: 65 declared / 43 resolved). Outside this task's file boundary to correct; flagged for a future, narrowly-scoped update (not full Governance Synchronization — a single mechanical figure correction).
- **`shell.css`'s header comment cites unverified v1.0 section numbers** for navigation/link/accessibility rules (§18/§19/§33-39). Not confirmed accurate or stale against v1.1's renumbered document; out of this task's token-contract scope.
- No risk was found that blocks M2.2 itself — every finding above is either "still valid," "retired with no consumer impact," or "correctly deferred to a named later package."

## M2.2 Readiness Decision

**M2.2 Typography may now resume.**

The token-naming layer M2.2 will build on (`font-display`, `font-reading`, `font-mono-functional`, and the 11 unaffected `type-*` tokens) is now aligned with `DESIGN_SYSTEM.md v1.1`. No stale v1.0 typography assumption remains live in the token contract. Actual typeface selection and type-scale resolution are M2.2's own work, not a precondition — v1.1 leaves them calibrated by design.

## Application Integrity

Application behavior outside token-file text is unchanged: no route, layout, component, or rendered-output change occurred. `npm run build` confirms all 53 routes + `/_not-found` compile identically to before this task (37 static, 16 dynamic).

## Validation

| Check | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass |
| `npm run build` | Pass — 53 routes + `/_not-found` compiled (37 static, 16 dynamic) |
| `npm run test:run` | Pass — 237/237 tests, 8/8 files |
| `tests/tokens/token-contract.test.ts` (isolated run) | Pass — 139/139 |
| Final diff inspection | Completed — see **Git Scope** in the completion report; no M2.2 implementation (fonts, `next/font`, typography components, heading/paragraph styling) present |
