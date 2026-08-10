# M4-A — Motion Foundations Reconciliation

## Status

**Ready for Integrated Human Review.**

This is a batch reconciliation document, not an approval record. M4.1, M4.2, and M4.3 remain individually **Implemented / Mechanically Verified — awaiting M4-A integrated human review**; none is Complete / Verified yet, and this document does not change that. Its purpose is to confirm the three packages form one coherent, non-duplicated motion foundation before a human reviewer looks at it, and to hand that reviewer an exact, reproducible procedure.

## Authority

`IMPLEMENTATION_PLAN.md` §9 (Milestone 4 — Motion Infrastructure, M4.1–M4.3); `ANIMATION_SYSTEM.md` (Motion Hierarchy §4, Motion Tokens §31, Reduced-Motion System §28, Performance Constraints §30, Interruption and User Priority §33, Environmental Animation §21).

## Package inventory

| Package | Report | Status |
|---|---|---|
| M4.1 — Motion Tokens | `docs/implementation/M4.1_MOTION_TOKENS.md` | Implemented / Mechanically Verified |
| M4.2 — Reduced Motion and Capability Handling | `docs/implementation/M4.2_REDUCED_MOTION_CAPABILITY.md` | Implemented / Mechanically Verified |
| M4.3 — Local Interaction States | `docs/implementation/M4.3_LOCAL_INTERACTION_STATES.md` | Implemented / Mechanically Verified |

## D2 — Token → capability → consumer chain audit

One directional chain, no branch, no duplication:

1. **Tokens** (`src/styles/tokens/motion.css`, M4.1) declare the only duration/easing/distance/depth/recession/stagger/environment values in the repository. No second motion-value source exists anywhere (confirmed by Journey 4 below).
2. **Capability** (`src/lib/motion/capability.ts` + `cancellation.ts`, M4.2) reads browser state (`matchMedia`, Network Information, `document.visibilityState`) and exposes it as `prefersReducedMotion`/`useReducedMotion`/`shouldPreferLowerCost`/`isDocumentHidden`/`shouldRunEnvironmentalMotion`, plus `createMotionCancellation` for latest-intent guarantees. This layer consumes no token values directly — it is orthogonal, browser-state-only, exactly as designed (a capability decision, not a duration value).
3. **Consumers** (`controls.css`/`selection.css`/`form.css`, M4.3) are the only files that write `transition: ... var(--motion-...)`, and the only components that call `useReducedMotion`/`createMotionCancellation` for a genuine local-feedback purpose are the M4.3 fixture (`InterruptionDemo.tsx`) plus, for this reconciliation, the cumulative test itself.

`tests/integration/m4a-motion-foundation-journeys.test.tsx` (new, D9) proves this chain end-to-end with real exports, not re-stated unit assertions: Journey 6 combines `prefersReducedMotion` and `createMotionCancellation` in one flow; Journey 2 proves `useReducedMotion`'s value genuinely changes a real M4.3 consumer's timing behavior; Journey 4 proves no file outside `motion.css`/`controls.css`/`selection.css`/`form.css` references a `--motion-` token.

## D3 — Motion hierarchy audit

`ANIMATION_SYSTEM.md` §4 orders Feedback < State Change < Focus < Sequence/Record Passage < Environmental Animation. M4-A implements only the first two tiers:

- Every `transition` M4.3 added uses `--motion-duration-immediate`/`fast` (hover/press — Feedback) or `--motion-duration-standard` (selected/loading/error/disabled — State Change), confirmed directly in `controls-contract.test.ts`/`selection-contract.test.ts`/`form-contract.test.ts`'s M4.3 assertions.
- No file in the repository consumes `--motion-duration-deliberate` (Focus), `--motion-duration-spatial` (Sequence/Record Passage), or `--motion-duration-ambient` (Environmental) — grep-confirmed; those tokens exist only as declarations for M4.4/M4.9+ to consume later.
- No `@keyframes`, no `animation:`/`animation-name:` property exists anywhere in the repository (reconfirmed by the M4.1 and M4.3 contract tests) — nothing environmental or loop-based has been introduced.

The hierarchy is therefore preserved by construction: M4-A occupies exactly its two authorized tiers and cannot be mistaken for Focus/Passage/Threshold/Return work, none of which exists yet.

## D4 — Reduced-motion audit

For every M4.3 state (hover, press, selected, loading, success, error, disabled):

- **Meaning survives.** Every state is still communicated by its original M2-era non-color/non-timing channel (weight, shape, explicit text, opacity) — M4.3 added only a `transition` property to already-correct static rules; no new visual information was made conditional on motion.
- **Feedback survives.** The existing repository-wide `@media (prefers-reduced-motion: reduce)` rule in `globals.css` (from M1, confirmed byte-for-byte unchanged by M4.2) collapses all durations to `0.01ms`, so every transition still runs — it resolves to its end state effectively instantly rather than being suppressed. State changes remain visible, just without the eased travel.
- **No content is hidden**, no focus is lost: M4.3 explicitly did not add a transition to `:focus-visible` anywhere (outline must remain immediately visible, not eased in) — verified directly in all three M4.3-modified stylesheets' contract tests.
- **The InterruptionDemo fixture proves this for a real (if fixture-scoped) consumer**: under reduced motion, `useReducedMotion()` is `true` and the demo settles synchronously, skipping the nonessential 400ms delay entirely rather than merely shortening it (Journey 2, second test).

M4.2's `shouldRunEnvironmentalMotion` contract (no environmental motion may run under reduced motion / lower-cost / hidden-document conditions) has no real consumer yet — correctly, since no environmental motion exists (M4.9+). The contract is established and tested in isolation (`capability.test.ts`) so a future consumer cannot skip it.

## D5 — User-priority / rapid-intent audit

`ANIMATION_SYSTEM.md` §33: "the final state must always resolve to the visitor's latest valid action." Verified at three levels:

1. **Unit level** (`cancellation.test.ts`, M4.2): `createMotionCancellation` aborts any prior controller under a key before issuing a new one — at most one active signal per key by construction.
2. **Component level** (`InterruptionDemo.test.tsx`, M4.3): three rapid clicks resolve to exactly "intent #3 settled," never #1 or #2.
3. **Cumulative level** (Journey 3, this document's new test): reconfirms both the raw registry behavior (5 rapid `begin()` calls, only the last stays active) and the real-consumer behavior together in one file, alongside the rest of the M4-A chain — not a restatement, a cross-package proof.

No interaction anywhere in M4-A waits for animation to complete before accepting new input — every `transition` is a passive CSS property on an already-functional static rule; none gates a state change, a click handler, or a form submission behind `transitionend`.

## D6 — Motion density audit

- Hover states change at most two non-color channels together (confirmed per-family during M4.3's own audit — no family exceeds this).
- No record-grid, list, or comprehensive-view element receives any transition — M4.3's scope was exactly `controls.css`/`selection.css`/`form.css`, confirmed by Journey 4's file-level scan.
- No viewport-entry animation exists — nothing in the repository observes scroll position or intersection to trigger motion (no `IntersectionObserver` usage anywhere in `src/`, confirmed by grep during this audit).
- No environmental/ambient loop, no route-level transition, no decorative motion competing with the eight functional states — the repository's only `@media (prefers-reduced-motion...)` rule and only motion-consuming stylesheets are exactly the ones named above.

## D7 — Prohibited-pattern search

Searched the full working tree (`src/`) for every explicitly prohibited pattern this task names: bounce, elastic, overshoot, spring (as an easing family), shake, `@keyframes`, `perspective`, large `scale(`/`zoom`, page rotation, cinematic fly-through terms, scroll-hijack idioms, cursor-trail idioms, kinetic-text/text-scramble idioms, branded preloader, mandatory-animation gating, ambient/auto-playing loop, card-flip. None found. The only `cubic-bezier()` curves in the repository are M4.1's four easing tokens, each independently proven overshoot-free (Y-control-points confined to `[0, 1]`, `motion-contract.test.ts`). This reconfirms M4.1's and M4.3's own individual audits rather than substituting for them.

## D8 — M1–M3 regression audit

- Full suite (1090/1090) includes every M1/M2/M3 test file unchanged in assertion intent — none was modified except the three M2-era CSS contract tests M4.3 already documented reconciling (an authorized, explained change, not a silent one).
- `next build` route count is unchanged in kind from M4.3's own report (35 static / 18 dynamic, 53 total) — M4-A introduces zero new routes.
- Journey 5 (this document's new cumulative test) directly re-renders real M3-B pages (`WorkPage`, `IndexPage`, `SearchPage`) and confirms their identifying headings still render, spot-confirming M4.3's CSS additions did not disturb M3's navigation/discovery surface.
- `GlobalNav.tsx`/`AppShell.tsx`/`DistrictNav.tsx`/`Breadcrumb.tsx`/domain `src/domain/records/**` are all untouched by any M4.1–M4.3 commit (confirmed via `git diff` scoped to those paths returning nothing across all three commits).

## D9 — Cumulative M4-A integration test

Added `tests/integration/m4a-motion-foundation-journeys.test.tsx` (8 tests, all passing), mirroring the role `m3b-navigation-discovery-journeys.test.tsx` played for Milestone 3: exercises real exported functions/components across the M4.1/M4.2/M4.3 package boundary rather than repeating any single package's own unit tests. Six journeys: real consumers still function with M4.3 CSS applied; reduced motion changes a real consumer's behavior end-to-end; rapid intent resolves to a stable final state (registry-level and component-level); token-consumption is confined to the audited surface; M1–M3 regression spot-check; capability primitives compose cleanly together.

## D10 — Gate M4 pre-assessment (does not close Gate M4)

`IMPLEMENTATION_PLAN.md` §9's sixteen Gate M4 acceptance criteria, classified against M4-A's actual scope (M4.1–M4.3 of 10 Milestone-4 work packages). Gate M4 stays **Open** — this table exists to show what M4-A can and cannot yet claim, not to certify the gate.

| # | Criterion | M4-A status |
|---|---|---|
| 1 | Static interface remains complete with motion disabled | Supported — mechanically verified (existing reduced-motion collapse + M4.3 states remain functional without transitions) |
| 2 | Reduced motion preserves function/meaning | Supported — mechanically verified (D4); pending human confirmation in the integrated review |
| 3 | Focus works by keyboard | Unaffected/carried forward — M4.3 deliberately added no transition to focus-visible; unchanged since M1/M2 |
| 4 | Modal focus is contained | Not applicable — no overlay/modal system exists (M4.5, not started) |
| 5 | Focus returns appropriately | Not applicable — Return/spatial memory is M4.6, not started |
| 6 | Scroll/Index position restores | Not applicable — M4.6, not started |
| 7 | Active filters/lenses restore where relevant | Not applicable — M4.6, not started (M3.11's URL persistence is a different, already-shipped mechanism) |
| 8 | Back/Forward behave predictably | Not applicable — M4.7 (browser-history contract), not started |
| 9 | Direct links do not fabricate history | Not at risk — M4-A adds no history logic of any kind |
| 10 | Obsolete motion cancels under rapid navigation | Partially supported — proven at the local-feedback level (D5); route-navigation-level cancellation is M4.6/M4.7 territory, not started |
| 11 | User input interrupts nonessential animation | Supported — mechanically verified at the local-feedback scope M4-A owns (D5) |
| 12 | Home threshold preserves orientation | Not applicable — M4.9, not started |
| 13 | Repeated entry is more efficient | Not applicable — M4.9, not started |
| 14 | Comparison stabilizes reference points | Not applicable — M4.10, not started |
| 15 | Trace corresponds to semantic relationships | Not applicable — Trace itself remains deferred since M2.4; M4.10 not started |
| 16 | Native scrolling remains intact | Not at risk — M4-A adds no scroll-linked or scroll-hijacking behavior (D7) |

Nine of sixteen criteria are not yet applicable (M4.4–M4.10 territory); of the remaining seven, five are supported with mechanical evidence today and two (#3, #9) were never at risk. **Gate M4 cannot close on M4-A alone and this document does not attempt to close it.**

## D11 — Human review procedure

The reviewer should confirm, in a real browser, that motion in this batch is genuinely **architectural, quiet, legible, responsive, purposeful, accessible** — not cinematic, spectacular, ornamental, scripted, ubiquitous, or compulsory (`ANIMATION_SYSTEM.md`'s own Motion System Law). Concretely, for each of the eight local states:

- **Hover** — subtle, immediate-feeling (not sluggish), reversible on pointer-out.
- **Focus-visible** — appears instantly, no eased entrance (confirm no lag/fade).
- **Press** — a brief, restrained acknowledgment, not a bounce or overshoot.
- **Selected** — the transition supports the already-approved non-color selected treatment; does not itself become the primary signal.
- **Loading** — `aria-busy` states transition smoothly without implying false progress.
- **Success / Error** — the state-change transition reads as confirmation, not celebration or alarm.
- **Disabled** — no motion invites interaction with a disabled control.
- **Reduced motion** — with the OS/browser preference set, every one of the above still communicates its state, just without eased travel.
- **Rapid intent** — clicking the interruption trigger repeatedly and quickly never leaves a stale "settled" message on screen; only the last click's outcome is ever shown.

## D12 — Exact review views

Fixture route (dev-only, gated, per M4.3): **`/contact?motion-fixture=m4a`**

1. **Desktop, normal motion** — default OS/browser preference. Exercise every control in the fixture (buttons, filter toggle, checkbox, text field, success/error demonstration, interruption demo).
2. **Desktop, reduced motion** — enable "Reduce motion" (OS-level or browser devtools emulation), reload the same URL, repeat the same interactions.
3. **Keyboard-only** — Tab through every fixture control; confirm focus-visible has no lag and every state remains reachable and legible without a pointer.
4. **390px viewport / touch** — narrow-viewport or device-emulated touch interaction with the same fixture; confirm hit areas and transitions read correctly at that size.
5. **Rapid-cancellation fixture** — the "Trigger motion" button specifically: click it rapidly (5+ times quickly) and confirm only the final intent's message ever settles, both with and without reduced motion active.

`/contact` with no query flag must continue to render the plain Contact utility page with no fixture content, in both production and development — already covered by `motion-fixture-route-wiring.test.tsx` and re-confirmed as part of this reconciliation's own full-suite run.

## Full validation

- `npm run format:check` — pass (new test file reformatted to match Prettier).
- `npm run lint` — pass, 0 errors (15 pre-existing `<img>`/`next/image` warnings in unrelated M2-era media test files, unchanged by this task).
- `npm run typecheck` — pass, 0 errors.
- `npm run test:run` — **1090/1090 passing** (115 files) — 8 new tests added by this reconciliation (`tests/integration/m4a-motion-foundation-journeys.test.tsx`), on top of M4.3's confirmed 1082/1082.
- `npm run build` — pass. Route count unchanged from M4.3's own confirmed state: **53 routes total, 34 static / 19 dynamic**.

## Diff audit

Confirmed via `git status`/`git diff` scoped to this task's own changes: only `tests/integration/m4a-motion-foundation-journeys.test.tsx` (new), this document (new), and `PROJECT_STATE.md` were touched by Phase D. No M4.4+ file (no Focus/overlay/Return/history/threshold/comparison/Trace code) was created. The large pre-existing untouched worktree changes present since before this task began (deleted `*_UNIVERSE.md` files, `README.md`, `package.json`/`package-lock.json`, six district `page.tsx` files) remain completely untouched, as in every prior package this session.

## Known limitations

- Human visual/interaction review has not yet occurred — this document prepares for it, it does not substitute for it.
- No performance/frame-timing measurement was taken (out of scope for a token/capability/local-state foundation; relevant once M4.4+ introduces heavier transitions).
- The fixture (`/contact?motion-fixture=m4a`) is dev-only by design and is not itself real public content — it exists solely to give the reviewer something concrete to interact with.

## Deferred M4 responsibilities

Everything not covered by M4.1–M4.3 remains explicitly deferred, unimplemented, and unclaimed by this document: Focus system (M4.4), overlay mechanics (M4.5), Return/spatial memory (M4.6), browser-history contract (M4.7), record-passage prototype (M4.8), Home-threshold prototype (M4.9), Comparison/Trace prototypes (M4.10).

## Acceptance result

Pending. This document's status is **Ready for Integrated Human Review** — the next action is the one externally supplied human review covering all three M4-A packages together, per D11/D12 above. This document does not itself constitute approval and does not close M4.1, M4.2, M4.3, M4-A, or Gate M4.
