# M4-B — Focus / Return / History Reconciliation

## Status

**Ready for Integrated Human Review.**

This is a batch reconciliation document, not an approval record. M4.4, M4.5, M4.6, and M4.7 remain individually **Implemented / Mechanically Verified — awaiting M4-B integrated human review**; none is Complete / Verified yet, and this document does not change that. Its purpose is to confirm the four packages form one coherent, non-duplicated interaction architecture before a human reviewer looks at it, and to hand that reviewer an exact, reproducible procedure.

## Authority

`IMPLEMENTATION_PLAN.md` §9 (Milestone 4 — Motion Infrastructure, M4.4–M4.7); the Global M4-B Laws this task itself states: Focus → Recession → Overlay → Return → Spatial Memory → Browser History as one coupled interaction architecture, not independent per-page mechanisms.

## Package inventory

| Package | Report | Status |
|---|---|---|
| M4.4 — Focus + Recession | `docs/implementation/M4.4_FOCUS_RECESSION.md` | Implemented / Mechanically Verified |
| M4.5 — Overlay Mechanics | `docs/implementation/M4.5_OVERLAY_MECHANICS.md` | Implemented / Mechanically Verified |
| M4.6 — Spatial Memory / Return | `docs/implementation/M4.6_SPATIAL_MEMORY_RETURN.md` | Implemented / Mechanically Verified |
| M4.7 — Browser-History Contract | `docs/implementation/M4.7_BROWSER_HISTORY_CONTRACT.md` | Implemented / Mechanically Verified |

## E1 — Integrated architecture audit

One chain, confirmed end-to-end, no duplicate mechanism at any layer:

1. **M4.1 tokens** → **M4.2 capability/cancellation** — unchanged since M4-A's own closure; reconfirmed byte-for-byte untouched by M4.4–M4.7 (`motion.css`, `capability.ts`, `cancellation.ts` all identical).
2. **M4.4 Focus/Recession** — the one non-modal concentration mechanism (`FocusRegion`/`FocusItem`), consuming M4.1's Focus-tier duration/recession tokens for the first time.
3. **M4.5 Overlay** — composes M4.4 directly (`useOverlayBackgroundProps` reuses `focus.css`'s exact `data-focus-state` rule) rather than building a second recession mechanism; its own modal-specific behavior (Tab-trap, Escape, focus-return) is new, necessarily so, since M4.4 is explicitly non-modal.
4. **M4.6 Return/Spatial Memory** — a session-scoped data model, orthogonal to Focus/Overlay's visual mechanisms; reuses M4.2's `createMotionCancellation` for its one genuine async race (post-navigation restoration) rather than inventing a second cancellation primitive.
5. **M4.7 Browser History** — verification only; confirms none of the above four ever touches `history`/`window.location`, and that M3.11's URL-authoritative filter/lens state remains the single source of truth Return's `originUrl` also relies on.

No duplicate recession mechanism, focus manager, modal focus trap, Return store, filter store, history stack, or cancellation registry exists anywhere — each of the four packages' own reports already documents this individually; `tests/lib/native-history-source-contract.test.ts` and the two `m4b-*` cumulative test files now prove it jointly, with real, running assertions.

## E2 — Close / Back / Return audit

Three concepts, kept structurally distinct throughout, confirmed by source contract in every relevant file:

- **Close** (M4.5) — ends the current Overlay's own modal state. `Overlay.onClose` never touches history.
- **Back** (native, M4.7) — untouched anywhere; zero `history.back()`/`pushState`/`replaceState` calls exist in `src/`.
- **Return** (M4.6) — restores a *known, previously captured* context via a plain data lookup; where it genuinely navigates, it does so through an ordinary `<a href>` (the fixture's "Go to captured origin" link, added in M4.7), never a history trick.

`m4b-focus-return-history-journeys.test.tsx`'s Journey 1/2 prove Close and Focus-exit leave `window.location` unchanged; Journey 3/4 prove Return is a pure data operation; the repository-wide audit (M4.7) proves Back is never intercepted anywhere.

## E3 — Focus / Overlay audit

- Focus can and does exist without a modal overlay (M4.4's entire fixture demonstrates this — six semantic contexts, zero of them modal).
- Modal overlay composes Focus/Recession (confirmed, E1 above) rather than re-implementing it.
- Overlay never implies a new district/route (M4.5's own source contract, reconfirmed by M4.7's audit).
- Focused/receding content remains visually present and legible — recession is opacity-only, confirmed by CSS contract (`focus.css`, `overlay.css`) to contain no transform/scale/zoom/blur/perspective anywhere.
- No dramatic zoom, no theatrical full-screen transition — `overlay.css`'s own header comment documents the deliberate choice of binary open/closed presence over any entrance/exit animation.
- Reduced motion preserves meaning — `m4b-focus-return-history-journeys.test.tsx` Journey 7 proves Focus and Overlay's *interactive* behavior (not just CSS timing) is identical under `prefers-reduced-motion`.

## E4 — Accessibility audit

- Keyboard can enter Focus — a real `<button>`, Enter/Space-activatable by construction (M4.4).
- Modal focus is contained — mechanically proven in both directions (`Overlay.test.tsx`, reconfirmed cross-package in Journey 2).
- Shift+Tab loops correctly — same evidence, explicit backward-wrap assertions.
- Escape works — proven directly, and reconfirmed as not colliding with any other Escape-consuming behavior (Focus has none; only Overlay listens).
- Visible close exists — a real, always-rendered `<button>`, never hover-only or Escape-only.
- Focus returns — to the explicit origin when supplied and live, else the pre-open active element, else left alone; never a detached-node call (tested).
- Background inactive when modal — `inert` applied via `useOverlayBackgroundProps`, confirmed set/cleared correctly.
- Reduced motion parity — Journey 7, above.
- Touch exit works — the close control and Escape are keyboard/pointer/touch-uniform; no hover-dependent path exists anywhere in M4.4/M4.5.
- Screen-reader semantics — `role="dialog"`, `aria-modal="true"`, a required accessible `label` prop (not optional) on every Overlay instance.

## E5 — Spatial memory coverage of all ten M4.6 dimensions

| Dimension | Classification |
|---|---|
| Previous route | Implemented and demonstrated — `originUrl`, full query string, captured/restored/tested |
| Parent district | Implemented and demonstrated — `parentDistrict`, captured/restored/tested |
| Selected record | Implemented and demonstrated — `selectedRecordId` (identifier only), captured/restored/tested |
| Index position | Implemented infrastructure with fixture proof — `resultKey` (stable identity) preferred over raw `scrollY`; no real Index page wiring yet (M4.8) |
| Scroll position | Implemented and demonstrated — `scrollY` captured; `restoreScroll` mechanically tested (instant, non-smooth, never touches `history.scrollRestoration`) |
| Active filter/lens | Implemented and demonstrated — carried entirely by `originUrl`, no duplicate store, round-trip tested through `parseFilterCriteria` |
| Comparison state | Implemented infrastructure with fixture proof — `comparisonState` field, clearly fixture-labeled; real Comparison feature is M4.10's scope |
| Gallery position | Implemented infrastructure with fixture proof — `galleryPosition` field, clearly fixture-labeled; real Gallery feature is M2.8/M4.10's scope |
| Expanded/collapsed state | Implemented and demonstrated — `expandedIds`, captured/restored/tested, including the fixture's own live-vs-captured divergence proof |
| Originating control/element reference | Implemented and demonstrated — `originControlKey` + `findElementByReturnKey`/`restoreFocusByKey`, same-document only, degrades safely, tested |

Seven of ten dimensions are implemented and demonstrated with real (fixture-scoped) data; three are implemented infrastructure with fixture-only placeholder data, honestly labeled, because no real Comparison/Gallery/full-Index-position consumer exists yet — exactly the boundary this task's own §C9/§E5 instruction requires distinguishing, not blurring.

## E6 — Browser-history audit

See `docs/implementation/M4.7_BROWSER_HISTORY_CONTRACT.md` in full. Summary: zero custom history manipulation anywhere in `src/`, confirmed by a permanent automated test (`tests/lib/native-history-source-contract.test.ts`); Focus/Overlay/Return each individually and now jointly confirmed history-inert; filter/lens URL state undisturbed; rapid navigation intent resolves correctly via M4.2's real cancellation primitive. No fake history, no stale restoration.

## E7 — M1–M3 regression

The full suite (1197/1197) includes every M1/M2/M3 test file with its assertion intent unchanged — none was modified by any M4.4–M4.7 package. `GlobalNav`/`AppShell`/`DistrictNav`/`Breadcrumb`/`src/domain/records/**`/`FilterModel.ts`/`SearchModel.ts`/`IndexModel.ts` are all confirmed untouched (no commit in `77e017a`..`465e212` touches any of those paths). `m4b-focus-return-history-journeys.test.tsx` Journey 4/5 additionally re-render real `IndexPage` output directly, reconfirming M3-B's own navigation/discovery surface still renders correctly alongside the new M4-B code.

## E8 — Cumulative M4-B tests

Two new integration files, both exercising real exports across package boundaries rather than repeating any single package's own unit tests:

- **`tests/integration/m4b-browser-history-contract.test.tsx`** (6 journeys, built during M4.7) — Focus+Overlay+Return combined history-inertness; pure-function-of-params re-rendering; filter/lens URL round-trip through a captured Return context; cold-entry/no-fabrication; rapid-navigation cancellation; overlay scroll-lock scoping.
- **`tests/integration/m4b-focus-return-history-journeys.test.tsx`** (8 journeys, built in this reconciliation, per this task's own §E8 list) — non-modal Focus open/close; modal Overlay full keyboard lifecycle (Tab, Shift+Tab, Escape, origin-focus-return); capture→mutate→Return-restores-the-captured-state; direct entry/no fabrication; filter/lens URL through a simulated Back round-trip; rapid intent while a Return is pending, cross-checked against independent Focus state; reduced-motion Focus+Overlay parity; modal scroll preservation.

Deliberately not built: M4.8's actual Index → record passage choreography — both files use real page components and real fixture data, never a simulated full passage sequence.

## E9 — Gate M4 pre-assessment (does not close Gate M4)

Re-assessed against M4-B's actual scope (M4.1–M4.7 of 10 Milestone-4 work packages). Gate M4 stays **Open**.

| # | Criterion | Status after M4-B |
|---|---|---|
| 1 | Static interface remains complete with motion disabled | Supported — Focus/Overlay/Return are all state-driven, not animation-driven; function is unaffected by motion being disabled |
| 2 | Reduced motion preserves function/meaning | Supported, strengthened — Journey 7 proves interactive (not just CSS) parity for Focus and Overlay |
| 3 | Focus works by keyboard | Supported, strengthened — full non-modal and modal keyboard lifecycles mechanically proven |
| 4 | Modal focus is contained | **Supported (new)** — Overlay's Tab-trap mechanically proven in both directions |
| 5 | Focus returns appropriately | **Supported (new)** — explicit-origin and pre-open-element fallback both proven, never a detached node |
| 6 | Scroll/Index position restores | Partially supported (new) — the model and restore mechanics exist and are tested; not yet wired into a real Index page (M4.8) |
| 7 | Active filters/lenses restore where relevant | Supported — M3.11's URL mechanism reconfirmed undisturbed; Return does not duplicate it |
| 8 | Back/Forward behave predictably | Partially supported — native-history audit and pure-render-function proof exist; real browser-chrome Back/Forward button behavior needs human confirmation |
| 9 | Direct links do not fabricate history | Supported, strengthened — reconfirmed at both the Return and the Index-page level |
| 10 | Obsolete motion cancels under rapid navigation | Supported, strengthened — proven for Return (M4.6) and cross-package against independent Focus state (Journey 6) |
| 11 | User input interrupts nonessential animation | Supported — unchanged from M4-A's own evidence, still holds |
| 12 | Home threshold preserves orientation | Not applicable — M4.9, not started |
| 13 | Repeated entry is more efficient | Not applicable — M4.9, not started |
| 14 | Comparison stabilizes reference points | Not applicable — M4.10, not started (`ReturnContext.comparisonState` exists only as fixture-labeled infrastructure) |
| 15 | Trace corresponds to semantic relationships | Not applicable — Trace remains deferred since M2.4; M4.10 not started |
| 16 | Native scrolling remains intact | Supported, strengthened — explicit repository-wide audit plus overlay scroll-lock scoping both proven |

Criteria 1, 2, 3, 7, 9, 10, 11, and 16 now carry stronger evidence than M4-A's own assessment; criteria 4 and 5 are newly addressable and supported; criterion 6 and 8 are newly partially supported, each with an explicit, honest gap named. Criteria 12–15 remain M4-C territory (M4.8–M4.10), unclaimed. **Gate M4 cannot close on M4-B alone and this document does not attempt to close it.**

## E10 — Development review fixture

**`/contact?motion-fixture=m4b`** — the single, shared M4-B fixture surface, built incrementally across M4.4–M4.6 and reused unchanged by M4.7. It provides:

- **Non-modal Focus** — six semantic-context sections (Work/Research/Lab/Art/Products/About), each with two `FocusItem`s.
- **Modal Overlay** — the "Open overlay" trigger, composing the entire Focus fixture as its receding/inert background.
- **Explicit Close** — a labeled button inside the overlay panel.
- **Escape** — closes the same overlay, same as Close.
- **Focus-return target** — closing the overlay (via Close or Escape) returns focus to the "Open overlay" trigger.
- **Scrollable underlying context** — the six-section Focus fixture is long enough to scroll; the overlay's body-scroll lock is exercised against it directly.
- **State-memory capture/restore** — the "Return / spatial memory" section: Capture, change live state, Return, observe the captured (not live) value restore, plus a visible cold-entry state before any capture.
- **Rapid-intent cancellation** — the Return section's "click rapidly" control, and separately the M4-A `InterruptionDemo` still present at `?motion-fixture=m4a`.
- **Reduced-motion behavior** — OS/browser-level toggle affects every control on this page identically; no separate fixture mode needed.

For genuine **Back/Forward** and **filter/lens** review, the existing real M3 fixture routes are more appropriate than simulating them inside `/contact`, per this task's own explicit instruction — use **`/index?fixture=m3b`** (apply a filter, then use the browser's own Back/Forward).

## E11 — Human review procedure

### Focus

Open a Focus item in any of the six fixture sections. Expected: the item's detail content appears; sibling items in the same section visibly recede (dimmer, not gone); no zoom, no route change, no lag before the exit control is reachable.

### Non-modal keyboard

Tab through a Focus section before and after opening an item. Expected: no accidental trap — every other item's control remains reachable regardless of which one is active; the exit control ("Exit focus: ...") is clearly labeled and immediately usable.

### Modal Overlay

Click "Open overlay." Expected: focus visibly moves to the Close control; Tab and Shift+Tab cycle only among the overlay's own controls; the six-section Focus fixture behind it visibly recedes and cannot be clicked or tabbed into; a visible Close control and Escape both work; closing returns focus to "Open overlay."

### Underlying scroll

Scroll the page down before clicking "Open overlay." Expected: the page does not jump when the overlay opens or closes; the overlay's own content scrolls independently if it overflows.

### Reduced motion

Emulate `prefers-reduced-motion: reduce` (OS setting or browser devtools). Repeat the Focus and Overlay checks above. Expected: identical hierarchy and behavior, with little to no perceptible travel — never a loss of function or meaning.

### Return memory

In the "Return / spatial memory" section: click "Capture current state," then "Toggle expanded," then "Return." Expected: the restored readout shows the *captured* (pre-toggle) `expandedIds`, not the current one; a real link to the captured origin URL appears afterward.

### Cold entry

Reload `/contact?motion-fixture=m4b` fresh (or open in a new tab) and click "Return" immediately, before any Capture. Expected: a clear "nothing to return to" message — never a fabricated context.

### Browser Back/Forward

Open `/index?fixture=m3b`, apply a filter (e.g. toggle a district), then use the browser's own Back and Forward buttons. Expected: the URL and the visible filtered results update predictably each time; nothing from this fixture's Focus/Overlay/Return state interferes.

### Rapid intent

In the Return section, click "Return" several times in quick succession. Expected: only the final click's result is ever shown; no earlier, now-stale message appears late.

### 390px

Repeat the Focus and Overlay checks at a narrow (~390px) viewport or on a real touch device. Expected: no clipping, the overlay's Close control remains reachable and tappable, the focus ring is visible, overlay content scrolls if needed, and the underlying page does not scroll while the overlay is open.

## E12 — Project state

Recorded in `PROJECT_STATE.md`: M4.4/M4.5/M4.6/M4.7 remain Implemented / Mechanically Verified (not yet Complete / Verified); M4-B moves to Ready for Integrated Human Review; Milestone 4 stays In Progress; Gate M4 stays Open; M4.8 stays Not Started.

## Full validation

- `npm run format:check` — pass.
- `npm run lint` — pass, 0 errors (15 pre-existing, unrelated `<img>`/`next/image` warnings, unchanged by this task).
- `npm run typecheck` — pass, 0 errors.
- `npm run test:run` — **1197/1197 passing** (128 files) — 8 new tests added by this reconciliation (`tests/integration/m4b-focus-return-history-journeys.test.tsx`), on top of M4.7's confirmed 1189/1189.
- `npm run build` — pass. Route count unchanged from M4.4–M4.7's own confirmed state: **53 routes total, 34 static / 19 dynamic**.

## E14 — Diff audit

Confirmed via `git log`/`git diff` scoped to this task's own commits (`77e017a` through this reconciliation's own commit): no M4.8 record-passage choreography, no M4.9 Home-threshold work, no M4.10 Comparison/Trace prototype, no environmental animation, no district-specific choreography, no scroll hijacking, no dramatic zoom, no bounce/spring/overshoot easing, no new canonical route, no fake public-facing content (every fixture is unmistakably labeled "not real public content"). The large pre-existing untouched worktree changes present since before this session began (deleted `*_UNIVERSE.md` files, `README.md`, `package.json`/`package-lock.json`, six district `page.tsx` files) remain completely untouched throughout every M4-B commit, reconfirmed via `git status`.

## E15 — Reconciliation commit

This document, plus `tests/integration/m4b-focus-return-history-journeys.test.tsx` and the `PROJECT_STATE.md` update, are committed together as `docs: prepare m4-b focus return history review`. Not pushed.

## Acceptance result

Pending. This document's status is **Ready for Integrated Human Review** — the next action is the one externally supplied human review covering all four M4-B packages together, per E11/E10 above. This document does not itself constitute approval and does not close M4.4, M4.5, M4.6, M4.7, M4-B, or Gate M4.
