# M4-C — Representative Motion Prototypes Reconciliation

## Status

**Approved / Closed.** See **Integrated Human Re-review Result**, below, for the passing review that closes this document. The path here was not straight-line — see **M4.9 Calibration** and **Integrated Human Re-review Result**'s own chronology for the full, preserved history.

This document is a batch reconciliation and, as of this closure, an approval record. M4.8, M4.9, and M4.10 are each individually **Complete / Verified** — see their own reports' "Integrated Human Review"/"Integrated Human Re-review" sections. Its purpose was to confirm the three packages prove reusable mechanics — never broad district choreography — hand a human reviewer an exact, reproducible procedure, and record that review's outcome.

## Integrated Human Re-review Result

`PASSED — externally supplied by the user`

Claude did not independently observe or pixel-inspect the rendered interface at any point in this document's own history — every finding recorded here and in M4.8/M4.9/M4.10's own reports is the user's externally supplied real-browser evidence, recorded truthfully.

Full chronology, preserved in order:

1. **Initial implementation** — M4.8, M4.9, M4.10 built (commits `ac58c25`, `e221984`, `d4ca29d`).
2. **M4.8 narrow Record-Passage correction** — reduced-motion authority mismatch found and fixed (commit `e3bbd95`; see M4.8's own "Reconciliation" section).
3. **First M4-C human review** — requested against the corrected M4.8 alongside M4.9/M4.10 as originally implemented.
4. **M4.9 human-review failure** — the first review reported the Home ↔ Work threshold as imperceptible, a static page replacement with explanatory text (recorded verbatim in M4.9's own "Human Review — Calibration Required").
5. **M4.9 `WorldTrace` calibration** — a persistent, shell-level shared spatial trace introduced to correct the root cause (commit `94e3cdd`).
6. **Pre-review scope-integrity audit** — before the re-review took place, a further audit found `WorldTrace`'s active choreography was gated on pathname alone, not genuine Home ↔ Work departure.
7. **`WorldTrace` scope correction** — `data-trace-active` gating added, reusing existing arrival-key infrastructure (commit `b35d823`). The same audit also independently confirmed a real, unrelated repository-tracking gap, diagnosed but deliberately not remediated (`docs/implementation/M4C_REPOSITORY_TRACKING_INTEGRITY_AUDIT.md`).
8. **Final M4-C integrated human re-review** — covering the corrected M4.9 behavior plus regression smoke-checks of M4.8 and M4.10.
9. **Approval** — the review above.

Final package statuses:

- **M4.8 — Complete / Verified**
- **M4.9 — Complete / Verified**
- **M4.10 — Complete / Verified**

This approval closes M4-C. It does **not** close Gate M4 — see **D12 — Final Gate M4 Pre-Assessment**, below, and `PROJECT_STATE.md`'s own "Repository Tracking Integrity — Reconciliation Required" note for the reason Gate M4 stays open despite this closure.

## M4.9 Calibration

The first M4-C integrated human browser review reported that M4.9's Home ↔ Work threshold read as static page replacement with explanatory text, not a perceptible spatial passage — recorded in full in `docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md`'s own "Human Review — Calibration Required" section. **M4.8 was not reopened. M4.10 was not reopened.** M4.9 alone was narrowly recalibrated: a persistent, always-mounted shared spatial trace (`WorldTrace`, living in `AppShell`, the one layout level that genuinely survives Home ↔ Work navigation) now provides a real, CSS-transitionable structural cue that repositions across the route change, with mechanically demonstrable first-entry (richer, `--motion-duration-spatial`, fuller travel) and repeated-entry (`--motion-duration-standard`, shorter travel) presentation states — not merely different wording. M4-C requires one human re-review of the corrected passage before it can be approved; M4.8 and M4.10 need only a regression smoke-check confirming this correction did not affect them (already covered by the unchanged cumulative M4-C suite, which still passes in full).

## Authority

`IMPLEMENTATION_PLAN.md` §9 (Milestone 4 — Motion Infrastructure, M4.8–M4.10); this task's own governing law: "representative prototype before system-wide reuse... not broad district choreography... not Milestone 5."

## Package inventory

| Package | Report | Status |
|---|---|---|
| M4.8 — Record-Passage Prototype | `docs/implementation/M4.8_RECORD_PASSAGE_PROTOTYPE.md` | Complete / Verified |
| M4.9 — Home-Threshold Prototype | `docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md` | Complete / Verified (recalibrated and scope-corrected — see **M4.9 Calibration** and **Integrated Human Re-review Result**) |
| M4.10 — Comparison and Trace Prototypes | `docs/implementation/M4.10_COMPARISON_TRACE_PROTOTYPES.md` | Complete / Verified |

## D1 — Complete motion chain audit

The full chain, confirmed end-to-end:

`M4.1 tokens → M4.2 capability/cancellation → M4.3 local states → M4.4 Focus/Recession → M4.5 Overlay → M4.6 Spatial Memory/Return → M4.7 Browser History → M4.8 Record Passage → M4.9 Home Threshold → M4.10 Comparison/Trace`

M4.8/M4.9/M4.10 are each the *first real, non-fixture-only or first-genuine-second* consumers of infrastructure the earlier packages deliberately left unconsumed or fixture-only:

- M4.8 is the first real (non-fixture) consumer of `returnMemory.ts`.
- M4.9 introduces one new, small, deliberately separate module (`familiarity.ts`) rather than overloading Return's storage — documented distinction, confirmed disjoint by test.
- M4.10 gives `ReturnContext.comparisonState` its first real consumer, and is the first consumer of M3.5's relationship model for visual presentation.

No later package bypassed or duplicated an earlier foundation: `git diff` across all three commits (`ac58c25`, `e221984`, `d4ca29d`) confirms `src/styles/tokens/motion.css`, `src/lib/motion/capability.ts`/`cancellation.ts`, `src/components/focus/**`, `src/components/overlay/**`, and `src/lib/return/returnMemory.ts` are all byte-for-byte unchanged since M4-B's own closure.

## D2 — Motion hierarchy audit

Perceptible consequence increases coherently and stays restrained at every tier:

- **Feedback/State Change** (M4.3) — unchanged.
- **Focus** (M4.4) — unchanged.
- **Record Passage** (M4.8) — corrected by a narrow reconciliation after this document's own first pass (see **D3** below): a real, restrained arrival treatment now exists (`RecordPassageArrival`), using the `deliberate` duration tier — the same tier Focus uses — distinguished from Focus not by a longer duration but by an *additional* channel (a restrained `--motion-distance-record` translation Focus never uses). Genuinely more consequential than Focus (an added channel, not merely a color/opacity change on the same element) while never approaching District Passage's `spatial` tier.
- **District Passage/World Threshold** (M4.9) — the *only* package in Milestone 4 to reach `--motion-duration-spatial` (previously declared but unconsumed since M4.1), confirmed via source contract to introduce no new, higher tier. Repeated entry deliberately drops to a *lower* tier (`standard`), never staying at the richest level indefinitely. **Recalibrated** after the first human review found the original text-only indicator imperceptible: a persistent, shell-level shared spatial trace (`WorldTrace`) now carries this tier's own transition on a genuinely-transitionable element (see **M4.9 Calibration** and D4, below), with repeated entry now differing by *both* duration and travel distance, not duration alone.
- **Comparison/Trace** (M4.10) — deliberately zero motion; both CSS files are confirmed by source contract to declare no `transition`/`@keyframes`/`animation` at all. Not reopened or redesigned by this reconciliation.

The observable hierarchy is now: Feedback < State Change < Focus < Record Passage < District Passage/World Threshold. No local component (M4.3/M4.4) uses a token tier heavier than `deliberate`; Record Passage (M4.8) also uses `deliberate`, distinguished by channel rather than duration, and never references `--motion-duration-spatial`; only M4.9 reaches `spatial`. No Home or record-arrival transition became cinematic — confirmed by the same repository-wide prohibited-pattern search in D7, below.

## D3 — Record-Passage audit

Index → canonical record → Return, proven with: one canonical route (`entry.route`, M3.3's own resolver, never a duplicate); real origin capture (`PassageIndexRecord`); real selected-item/filter/lens/scroll preservation (`originUrl`, `resultKey`, `selectedRecordId`, `scrollY`, all M4.6's own fields); real context restoration (`RecordReturnControl`, `IndexPassageRestoration`); browser Back independently valid (Journey 3, history-length assertion); direct-entry fallback (Journey 2, no fabricated Return); rapid interruption (Journey 7, `createMotionCancellation` reconfirmed).

**Corrected by a narrow, subsequent reconciliation** (`docs/implementation/M4.8_RECORD_PASSAGE_PROTOTYPE.md` §Reconciliation): the initial pass here stated Record Passage had "no motion... reduced motion not applicable," which a follow-up audit found genuinely mismatched `ANIMATION_SYSTEM.md` §4/§5.2/§9.5/§28's own authority (Record Passage is a named motion-hierarchy tier with an explicit reduced-motion role equivalent, "concise replacement preserving shared anchors," never "not applicable"). A new `RecordPassageArrival` component now gives genuine passage arrivals a real, token-only, restrained treatment (a shared-origin anchor settling from a receded/offset state to its final state over one `--motion-duration-deliberate` transition), rendered *only* for a genuine captured passage — a cold/direct entry receives no anchor and no motion at all, unchanged. A real reduced-motion equivalent now exists (the anchor mounts directly at its settled state, per Journey 7/8-adjacent evidence in the cumulative suite). M4.9 and M4.10 were not reopened or modified for this correction.

## D4 — Home-Threshold audit

Home → Work → Home, proven with: an explicit destination (`ThresholdIndicator`'s message names Work by name); continuity with the shared platform (first-entry message states "part of the same platform" — never presented as an unrelated site); orientation preserved (GlobalNav untouched, reconfirmed); no mandatory transit (direct access to Work fabricates nothing, M4.9's own direct-access test, reconfirmed in Journey 12's spirit); no intro gate (content is immediately present, the indicator itself *is* real content, not a blocking overlay); first entry richer (Journey 4); repeated entry more efficient (Journey 6, `reduced assembly`); direct district access unchanged (reconfirmed); reduced motion meaningful (Journey 8 — identical classification/message under `prefers-reduced-motion`); interruption valid (Journey 7's second test — double departure resolves to one clean indicator).

**Post-calibration addendum:** the first real M4-C human review found the above insufficient — a text-only indicator on a conditionally-mounted node is not, in a real browser, a perceptible spatial passage, since a freshly-inserted DOM node has no prior value for its own declared `transition` to animate from (full root-cause analysis in `M4.9_HOME_THRESHOLD_PROTOTYPE.md`'s own "Root Cause" section). The correction adds `WorldTrace`, a single persistent structural segment mounted once in `AppShell` (never conditionally mounted/unmounted, so its own `transition` genuinely has a prior value on every route change), reading `usePathname()` to reposition between a Home-side and Work-side edge. First/repeated entry now differ by both duration (`spatial` → `standard`) and real travel distance (full → `calc(75% - 72px)`, shorter again at the compact breakpoint), proven by `tests/tokens/threshold-contract.test.ts`'s `.world-trace` sub-suite and `tests/integration/m4c-world-trace-journey.test.tsx`'s node-identity + attribute-transition assertions. This is additive to, not a replacement of, the D4 evidence above — `ThresholdIndicator`'s own text-based orientation, first/repeated classification, and direct-entry boundary are all unchanged and still independently tested.

## D5 — Comparison audit

Common reference points remain stable by construction (a real `<table>` — the same rows exist on both sides, structurally, not by convention); usable while completely still (`comparison.css` has zero motion declarations, confirmed by source contract); movement never interferes with inspection (there is no movement); compact layouts preserve relation (`.comparison-scroll`'s horizontal-scroll strategy, never a destructive stack); `comparisonState` has a real representative consumer (`LabComparisonFixture`'s Save/Restore, exercising M4.6's own unmodified functions) — reconfirmed via Journey 9's rapid-selection-change stability test.

## D6 — Trace audit

Canonical relationship data → semantic Trace, and only that: `RecordTrace` maps exclusively over `listOutgoingRelationships(source)` (M3.5, unmodified) — there is no code path that can produce a Trace without a genuinely stored relationship. No semantic edge → no Trace, proven directly (Journey 11, an empty-DOM assertion, not a prose claim). Relationship label (`deriveRelationshipLabel`, M3.5, unmodified), source/destination (real record titles), direction (the label text itself, e.g. "Tested in"), and canonical destination (`resolveCanonicalRoute`, M3.3, unmodified) are all reconfirmed in Journey 10. Reduced-motion static equivalent — not applicable, no motion exists in this package (confirmed by `trace.css`'s own source contract).

## D7 — Prohibited-motion audit

A repository-wide search (`src/`) for every prohibited pattern this task names — bounce, spring, overshoot, large `scale(`, page rotation, `perspective`, fly-through language, scroll-hijack idioms, mandatory-animation gating, cursor-trail idioms, kinetic-typography idioms, auto-playing comparison, ambient viewport loop, and any fabricated Trace/network-generation code — found zero matches outside this task's own explanatory doc-comments (which explicitly describe what each file does *not* do — the same comment-stripping methodology used throughout M4.1–M4.10's own contract tests). No `@keyframes` exists anywhere in the repository (reconfirmed, the same invariant M4.1 established and every later package's own contract test re-verifies for its own file).

## D8 — Accessibility audit

Across M4.1–M4.10: keyboard (every new control in M4.8/M4.9/M4.10 is a real `<button>`/`<a>`/`RadioGroup`, none hover-dependent); touch (same — no pointer-only path exists anywhere); reduced motion (Journey 8, plus M4.10's "no motion to begin with" boundary); focus/modal containment/focus return (M4.4/M4.5, reconfirmed untouched); no motion-only meaning (every state in M4.8/M4.9/M4.10 is carried by real text/DOM structure, confirmed directly in each package's own tests); no hover-only essential access (confirmed structurally, no `:hover`-gated content exists in any M4.8–M4.10 file); direct links (M4.8 Journey 2, M4.9's direct-access test); static completeness (all three packages' own reports confirm meaning survives with all CSS/motion disabled, since none of the three genuinely depends on animation for meaning).

## D9 — Native-behavior audit

Back, Forward, direct URLs, native scroll, filter-query history, rapid navigation, and Return all coexist without conflict — reconfirmed via the same `tests/lib/native-history-source-contract.test.ts` M4.7 built (still passing, unchanged, now covering M4.8–M4.10's files too) plus Journey 1/3's direct exercise of the real Index/Record/Return chain. No M4-C prototype introduces a parallel navigation or history system — `PassageIndexRecord`/`RecordReturnControl`/`ThresholdLink`/`ThresholdIndicator` all use real `next/link` for any actual navigation and `sessionStorage` only for their own session-scoped signals.

## D10 — Responsive audit

`comparison.css`'s horizontal-scroll strategy is the one CSS-level responsive mechanism M4-C introduces, confirmed by source contract. No JavaScript in any M4.8/M4.9/M4.10 component branches on viewport size, breakpoint, or `window.innerWidth` (confirmed directly — Journey 12 renders the Comparison/Trace fixtures with `window.innerWidth` forced to 390 and finds identical content and structure, proving responsiveness is CSS-only and cannot silently break due to a JS width assumption). Record Passage and Home Threshold depend on no desktop-only spatial geometry — both are structural/text mechanisms, unconditional on viewport.

## D11 — Cumulative M4-C integration tests

`tests/integration/m4c-representative-motion-journeys.test.tsx` (new, 13 tests, per this task's own required 12-journey list) exercises real exports across M4.8/M4.9/M4.10 together: Index→record→Return; direct entry fabricates nothing; browser Back stays valid; Home→Work first entry; Work→Home; Home→Work repeated entry; rapid interruption (both the raw cancellation primitive and a real Home→Work double-departure); reduced-motion threshold parity; Lab Comparison stability under rapid selection changes; real Research→Lab Trace; no-relationship-no-Trace; and 390px structural equivalence. Deliberately does not implement M4.8's own full choreography a second time, or duplicate any single package's own unit tests — each journey composes real functions/components in a new combination.

## D12 — Final Gate M4 pre-assessment (does not close Gate M4)

Reassessed against the complete M4.1–M4.10 scope, now including the passed M4-C integrated human re-review recorded above. **16/16 motion-system criteria are supported — Gate M4 closure is nonetheless deferred, for a reason unrelated to the motion system itself.** See the note below the table.

| # | Criterion | Status after M4-C re-review |
|---|---|---|
| 1 | Static interface remains complete with motion disabled | PASS — mechanical + human-review-confirmed |
| 2 | Reduced motion preserves function/meaning | PASS — mechanical + human-review-confirmed; spans Focus, Overlay, Home Threshold, and Record Passage |
| 3 | Focus works by keyboard | PASS — mechanical + human-review-confirmed |
| 4 | Modal focus is contained | PASS — mechanical + human-review-confirmed |
| 5 | Focus returns appropriately | PASS — mechanical + human-review-confirmed |
| 6 | Scroll/Index position restores | PASS — mechanical + human-review-confirmed; M4.8's real, non-fixture consumer |
| 7 | Active filters/lenses restore where relevant | PASS — mechanical + human-review-confirmed |
| 8 | Back/Forward behave predictably | PASS — mechanical + human-review-confirmed. The real-browser-chrome Back/Forward behavior jsdom could never exercise (the one named gap through M4-B/M4-C's own mechanical assessment) is now covered by D18's real-Back procedure and the accepted M4.8/M4.9 findings above — this criterion's human-confirmation gap is closed. |
| 9 | Direct links do not fabricate history | PASS — mechanical + human-review-confirmed |
| 10 | Obsolete motion cancels under rapid navigation | PASS — mechanical + human-review-confirmed; spans local feedback, Return, and Home Threshold |
| 11 | User input interrupts nonessential animation | PASS — mechanical + human-review-confirmed |
| 12 | Home threshold preserves orientation | PASS — mechanical + human-review-confirmed, including the corrected `WorldTrace` scope (genuine crossings only) |
| 13 | Repeated entry is more efficient | PASS — mechanical + human-review-confirmed; both duration and travel-distance differences, not merely textual |
| 14 | Comparison stabilizes reference points | PASS — mechanical + human-review-confirmed |
| 15 | Trace corresponds to semantic relationships | PASS — mechanical + human-review-confirmed |
| 16 | Native scrolling remains intact | PASS — mechanical + human-review-confirmed |

**This 16/16 result is a motion-system-scope statement only — it is not the same thing as "Gate M4 closed."** A separate, unrelated finding from the same pre-review integrity audit (see M4.9's own "WorldTrace Scope" section and `docs/implementation/M4C_REPOSITORY_TRACKING_INTEGRITY_AUDIT.md`) established that a clean checkout of this repository's committed HEAD does not build: `GlobalNav.tsx` and a number of other load-bearing files were never committed to Git. That is a repository-reproducibility defect, not a motion-implementation defect — none of the sixteen criteria above concern it, and none of the evidence behind them is invalidated by it (every mechanical test and the human review itself ran against this live, working directory, which does contain those files). But Gate M4's own governing law requires a verified, reproducible repository, not merely a verified working directory, so Gate M4 stays **Open** pending a separate, dedicated Repository Tracking Integrity Reconciliation task. This document does not attempt to close Gate M4.

## D13 — Human review harness

One integrated browser session covers everything:

- **Record Passage**: `/index/district/work?fixture=m3b` → click into the one Work fixture record → confirm the Return control → click it.
- **Home Threshold**: `/` → "Enter Work" → observe both the arrival message *and* the structural trace segment moving from the Home edge to the Work edge → "Return to Home" (trace returns to the Home edge) → "Enter Work" again to observe both the repeated-entry message *and* the trace's now visibly quicker, shorter movement.
- **Comparison/Trace**: `/contact?motion-fixture=m4c`.
- **M4-B regression spot-check** (reusing the existing fixture, not re-reviewing it from scratch): `/contact?motion-fixture=m4b` — a quick confirmation nothing regressed, not a full re-review.

## D14 — Human review: Record Passage

At `/index/district/work?fixture=m3b`, click into the one listed record. Expected: the transition into the record feels more consequential than a local Focus interaction but not theatrical; the destination becomes stable and readable quickly; the "Return to Index" control is present and, when clicked, restores the same filtered Index view (scroll position included) rather than a generic Index; browser Back also works and feels ordinary; opening the same record URL directly in a fresh tab shows no Return control and remains fully usable via its own structural orientation; with reduced motion enabled, everything above still holds (there is no motion to lose here in the first place).

## D15 — Human review: Home Threshold

At `/`, click "Enter Work." Expected: a visible structural segment near the top of the page moves from the Home-side edge toward the Work-side edge — a genuine, perceptible spatial passage, not merely a page swap; Home clearly remains the origin the visitor is leaving; Work is identifiable as the destination before/as the transition happens; the transition communicates continuity — Work never feels like an unrelated site suddenly loading; there is no cinema/intro feeling; clicking "Return to Home" moves the same segment back and restores a clearly common, shared space; repeating Home → Work a second time in the same session feels — and reads, via both the shorter message *and* the segment's visibly quicker, shorter movement — perceptibly quicker/lighter than the first; with reduced motion enabled, the same relationship (arrival, continuity, repeated-entry difference) is preserved via structure alone — the segment still appears at the correct edge immediately, without needing to animate there.

This directly re-tests the specific defect the first human review reported (see `M4.9_HOME_THRESHOLD_PROTOTYPE.md`'s "Human Review — Calibration Required"): the passage should no longer read as "static page → static page replacement → explanatory text."

## D16 — Human review: Comparison

At `/contact?motion-fixture=m4c`, use the Lab Comparison's two pickers. Expected: it's immediately obvious which rows correspond between the two attempts; comparing is easier, not harder, than reading two separate lists; nothing auto-plays or oscillates; the table remains fully legible and usable while completely still; at 390px, the same row correspondence survives (via horizontal scroll, not a broken stacked layout).

## D17 — Human review: Trace

At the same fixture. Expected: the relationship's meaning ("Tested in") is obvious before noticing any visual line; the line genuinely helps locate/understand the relation rather than existing merely as decoration; source and destination are both clearly labeled; the destination link is real and usable; the relationship-free record's section visibly shows no Trace, and this reads as correct/expected rather than as a bug; with reduced motion enabled, nothing changes (there is no motion here to begin with).

## D18 — Human review: performance / interruption

Across all of the above: navigate rapidly (click Enter Work, then immediately click something else); use Back during/after a passage; scroll while any of this is happening. Expected in every case: the visitor's latest action always wins; nothing blocks input; no stale focus, scroll position, or message ever appears after a newer action has already superseded it; nothing feels janky enough to interfere with actually using the site. For the recalibrated Home Threshold specifically: click Enter Work, then immediately click Return to Home before the trace segment visually settles — expected: the segment smoothly redirects back toward the Home edge rather than snapping, finishing late on the wrong page, or leaving a stale position.

## D19 — Project state

Recorded in `PROJECT_STATE.md`, across this document's own history: first, M4.8/M4.10 Implemented / Mechanically Verified — awaiting M4-C integrated human review (unchanged, not reopened); M4.9 Implemented / Mechanically Verified — awaiting M4-C integrated human **re-review** (recalibrated); M4-C Ready for Integrated Human Re-review; Milestone 4 In Progress; Gate M4 Open; Milestone 5 Not Started. Following this closure: M4.8 — Complete / Verified; M4.9 — Complete / Verified; M4.10 — Complete / Verified; M4-C — **Approved / Closed**; Milestone 4 stays **In Progress** (not yet Complete / Verified — the motion system itself is fully approved, but Gate M4 requires a reproducible repository, and the separately-tracked repository-tracking gap has not yet been remediated); Gate M4 stays **Open**, with the exact blocker recorded as `Repository Tracking Integrity — Reconciliation Required`; Milestone 5 stays Not Started.

## Full validation

- `npm run format:check` — pass.
- `npm run lint` — pass, 0 errors (15 pre-existing, unrelated `<img>`/`next/image` warnings, unchanged by this task).
- `npm run typecheck` — pass, 0 errors.
- `npm run test:run` — **1275/1275 passing** (144 files) at this reconciliation's own close — 13 new tests added by this reconciliation (`tests/integration/m4c-representative-motion-journeys.test.tsx`), on top of M4.10's confirmed 1262/1262.
- `npm run build` — pass. Route count unchanged from M4.8–M4.10's own confirmed state: **53 routes total, 34 static / 19 dynamic**.

### M4.8 narrow reconciliation — updated totals

A subsequent, narrow correction to M4.8 alone (`docs/implementation/M4.8_RECORD_PASSAGE_PROTOTYPE.md` §Reconciliation) added `RecordPassageArrival` and its tests, plus a fourth application of the M4-A cross-cutting CSS-consumer reconciliation. Current totals after that correction: **1288/1288 passing, 146/146 files** (13 new tests); `npm run build` unchanged — **53 routes total, 34 static / 19 dynamic**. M4.9 and M4.10 were not touched.

### M4.9 calibration — updated totals

Following the first M4-C human review's finding that M4.9's Home ↔ Work threshold was imperceptible, a narrow correction to M4.9 alone (`docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md` "Human Review — Calibration Required" / "Root Cause" / "Calibration Architecture") added `WorldTrace` and its tests (`WorldTrace.test.tsx`, `tests/integration/m4c-world-trace-journey.test.tsx`), plus 5 new cases extending `tests/tokens/threshold-contract.test.ts`'s existing suite. Totals after that correction: 1306/1306 passing, 148/148 files (18 new tests). M4.8 and M4.10 were not touched.

Build-route reporting for this correction was itself imprecise and is corrected here: `next build`'s route table has always included one automatic, framework-generated `/_not-found` entry (no `not-found.tsx` exists anywhere, tracked or untracked — this is Next.js's own default, unconditionally present since M1.3), which earlier M4-series packages' own route tallies consistently omitted by convention. The true, unchanged application-route count is **53**; `next build`'s route table therefore reports **54 entries** (53 application routes + 1 framework-generated `/_not-found`), 35 static (34 application + `/_not-found`) / 19 dynamic. Neither the calibration nor the subsequent scope-integrity audit (below) added, removed, or changed any route.

### M4.9 pre-review scope-integrity audit — updated totals

Before the scheduled M4-C integrated human re-review, a narrow integrity/scope audit (requested independently of the calibration itself) found that `WorldTrace`'s active choreography was gated on pathname alone — meaning any arrival at `/work` (Research → Work, About → Work, cold entry, browser Back from an unrelated route), not only a genuine Home ↔ Work crossing, would have played the identical animated passage. Corrected narrowly, reusing the existing `peekThresholdArrival` arrival-key infrastructure `ThresholdLink`/`ThresholdIndicator` already established (no new mechanism, no route-transition manager, no Link interception, no new route): `WorldTrace` now sets `data-trace-active="true"` only for a genuine, currently-resolving crossing, and `threshold.css` gates its `transition` behind that attribute — structural presence (`data-trace-position`, always correct) stays deliberately separate from active choreography (`data-trace-active`, genuine crossings only). See `docs/implementation/M4.9_HOME_THRESHOLD_PROTOTYPE.md`'s own "WorldTrace Scope" section for the full audit and fix. 16 new tests (9 in `WorldTrace.test.tsx`, 2 in `threshold-contract.test.ts`, 5 in `m4c-world-trace-journey.test.tsx`). Current totals: **1322/1322 passing, 148/148 files**; `npm run build` unchanged — 54 route-table entries (53 application routes + 1 framework-generated `/_not-found`), 35 static / 19 dynamic. M4.8 and M4.10 were not touched; Milestone 5 was not begun.

This same audit also independently confirmed a real, pre-existing repository-tracking gap unrelated to M4.9's own scope — see `docs/implementation/M4C_REPOSITORY_TRACKING_INTEGRITY_AUDIT.md` (diagnosis and remediation plan only; execution is tracked separately and does not block this reconciliation).

## D21 — Diff audit

Confirmed via `git log`/`git diff` scoped to this task's own commits (`ac58c25` through this reconciliation's own commit): no M5.0 shared district shell, no final Home/Work district composition, no broad district-wide choreography, no environmental animation system, no scroll-linked environmental behavior, no new canonical route, no new relationship ontology (still exactly the six `CanonicalRelationshipType` values from M3.1), no new Trace-specific ontology, no new Signal meaning (Signal remains entirely absent, as it has been since M2.4), no fake real content (every fixture is unmistakably labeled), no transaction/commercial behavior. The large pre-existing untouched worktree changes present since before this session began (deleted `*_UNIVERSE.md` files, `README.md`, `package.json`/`package-lock.json`, several district `page.tsx` files, and numerous untracked `??` files/directories) remain completely untouched throughout every M4-C commit, reconfirmed via `git status`.

**Post-calibration addendum:** the M4.9 calibration commit was independently diff-audited against the same criteria, plus this task's own explicit calibration-specific boundaries: `src/components/threshold/RecordPassageArrival.tsx` and every other M4.8 file are byte-for-byte unchanged; every M4.10 file (`RecordTrace`, `comparison.css`, `trace.css`, `LabComparisonFixture`) is byte-for-byte unchanged; M5.0 was not started (no shared district shell, no district environmental language); no new route was created (`WorldTrace` lives inside the existing `AppShell`, confirmed by `git status` showing no new file under `src/app/`); no new district, relationship type, or Signal semantics were touched. Nothing was pushed.

## D22 — Reconciliation commit

This document, plus `tests/integration/m4c-representative-motion-journeys.test.tsx` and the `PROJECT_STATE.md` update, are committed together as `docs: prepare m4-c integrated motion review`. Not pushed.

### M4.9 calibration — commit

The M4.9 calibration described above (`WorldTrace.tsx`, `WorldTrace.test.tsx`, `AppShell.tsx`, `threshold.css`, `threshold-contract.test.ts`, `m4c-world-trace-journey.test.tsx`, `M4.9_HOME_THRESHOLD_PROTOTYPE.md`, this document, `PROJECT_STATE.md`) is committed separately as `fix: calibrate m4.9 home threshold passage`, on top of the M4.8 reconciliation commit — neither M4.9's own original implementation commit nor the M4.8 reconciliation commit was squashed or amended. Not pushed.

## Acceptance result

**Approved.** The externally supplied M4-C integrated human re-review (Claude did not independently observe or pixel-inspect the rendered interface) passed — see **Integrated Human Re-review Result**, above, for the full chronology and accepted findings. M4.8, M4.9, and M4.10 are each **Complete / Verified**. **M4-C — Representative Motion Prototypes: Approved / Closed.** This closure does not itself close Gate M4 or Milestone 4 — see **D12**, above, and `PROJECT_STATE.md` for the separately-tracked repository-reproducibility blocker that must be resolved first.
