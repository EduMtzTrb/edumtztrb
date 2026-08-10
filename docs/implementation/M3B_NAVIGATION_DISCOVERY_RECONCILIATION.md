# M3-B — Navigation + Discovery Reconciliation

## Status

**Approved / Closed.** This is a batch reconciliation document, not a new Implementation Plan work package — no `M3.13.1` or equivalent was invented. The externally supplied integrated human browser review this document previously required (see **Human review procedure** below) has now been completed and PASSED — see **Integrated Human Review Result**. `M3-B — Navigation + Discovery: Approved / Closed`.

## Authority

- `IMPLEMENTATION_PLAN.md` §7 — M3.7–M3.13 work-package definitions, and §6/§8 — Gate M3's thirteen acceptance criteria.
- `docs/implementation/M3A_CANONICAL_ARCHITECTURE_RECONCILIATION.md` — the frozen upstream canonical architecture (M3.1–M3.6) M3-B consumes without revision.
- The seven individual M3.7–M3.13 implementation reports (`docs/implementation/M3.7_GLOBAL_NAVIGATION.md` through `M3.13_DIRECT_ENTRY_ORIENTATION.md`).

## Package inventory

| Package | Status | Commit |
|---|---|---|
| M3.7 — Global Navigation | Complete / Verified | `f8e414f` |
| M3.8 — District Navigation | Complete / Verified | `23b1bc5` |
| M3.9 — Breadcrumb / Orientation System | Complete / Verified | `dbb08cf` |
| M3.10 — Index | Complete / Verified | `785f479` |
| M3.11 — Filters | Complete / Verified | `41fd03e` |
| M3.12 — Search | Complete / Verified | `5e2d2db` |
| M3.13 — Direct-Entry Orientation | Complete / Verified | `2b48ee7` |

All seven are now individually **Complete / Verified** — the integrated human review this table previously deferred that status until (see prior revision) has now passed; each package's own implementation report was updated in this closure pass with its own "Integrated Human Review" section.

## Integrated Human Review Result

`PASSED — externally supplied human browser review.`

This approval was supplied externally by the user after reviewing the running application in a real browser. Claude did not independently observe, render, or pixel-inspect the browser interface at any point — this section records the user's own reported findings, not an automated or Claude-originated visual judgment.

The user reviewed the integrated M3-B system — Global Navigation, District Navigation, Breadcrumb/Orientation, Index, Filters, Search, and Direct-Entry Orientation — across desktop behavior, compact/mobile behavior, development fixture behavior, successful Search, Search no-result behavior, filtered Index behavior, and deep direct entry, and reported:

> All reviewed M3-B routes and representative journeys pass.

Summarized accepted results, per package (full detail recorded in each package's own updated implementation report, "Integrated Human Review" section):

- **M3.7 — Global Navigation**: all seven districts legible/reachable; Search/Index/Contact structurally distinct; current district identifiable; responsive wrapping no longer ambiguous; compact navigation complete; no hover-hidden navigation; no motion required.
- **M3.8 — District Navigation**: visibly/conceptually distinct from global navigation; shared conceptual order understandable; district terminology coherent; all six districts distinguishable without becoming separate websites; active secondary location understandable; compact layouts usable.
- **M3.9 — Breadcrumb / Orientation**: sufficient location context on deep structures; orientation hierarchy subordinate, not noisy; contextual grouping never redefines canonical ownership; current page never unnecessarily self-linked; understandable without animation.
- **M3.10 — Index**: systematic/precise/scannable, not a dashboard or portfolio-card wall; development fixtures unmistakably labeled; canonical destinations clear; global lens behavior understandable; empty/no-result behavior appropriate.
- **M3.11 — Filters**: active state visually clear; Reset understandable; state reflected in shareable URL; recomposition visible/intentional; canonical identity unaffected; zero-result filtering correctly shown as No Result, not Empty; keyboard/touch understandable.
- **M3.12 — Search**: meaningfully distinct from Index; visible query understandable; match context/reason sufficient without internal scoring noise; no-result preserves query; empty Search never presented as Error; native form behavior clear; fixtures clearly non-public.
- **M3.13 — Direct-Entry Orientation**: a deep canonical route opened cold in a fresh tab is understandable; owning district/current record identifiable; truthful structural next actions available; no invented prior-session history; no fake "Return to where you came from"; M4's future Return/spatial-memory system correctly deferred.
- **Integrated M3-B behavior**: global/district navigation remain distinct; Index/Search remain distinct while querying the same canonical public system; Filters narrow views without mutating record identity; canonical destinations stable; public archived records reachable where intended; deep-entry orientation truthful; compact/mobile navigation coherent; essential navigation requires neither motion nor hover; no M3-B visual or interaction blocker remains.

No further M3-B calibration is required. `M3-B — Navigation + Discovery: Approved / Closed`.

## M3-A dependency audit

M3-B consumes M3.1–M3.6 as frozen upstream architecture, never revising it. Confirmed directly: `CanonicalRecord.ts`, `registry.ts`, `DistrictExtensions.ts`, `RouteResolver.ts`, `ClassificationModel.ts`, `RelationshipModel.ts`, and `LifecycleArchiveModel.ts` do not appear in any of the seven M3.7–M3.13 commits' diffs (verified via `git show --stat` on each). M3-B's own new domain modules (`IndexModel.ts`, `FilterModel.ts`, `SearchModel.ts`, `devFixtureSource.ts`) import from those seven files but never modify them — the same "read, never write" discipline M3-A itself required of M3.2–M3.6 toward M3.1.

## Global navigation

M3.7 audited and completed the existing M1.4 shell rather than reimplementing it; the only substantive change was a CSS-only responsive-wrapping fix. Seven districts, a structurally separate Utilities landmark, and correct active-district state are all confirmed unchanged and still passing (`GlobalNav.test.tsx`, pre-existing, 11 tests).

## District navigation

One shared system (`districtNavigation.ts` + `DistrictNav.tsx`), not six components. Confirmed: every `href` in every district's configuration matches an already-approved static route (no invented route); no district was given a local Search item; About's own section structure was preserved rather than forced into the five-role order.

## Deep orientation

One shared `OrientationContext` model (`orientation.ts`) and one `Breadcrumb` component, composed — never reimplemented — by M3.11's filter chips, M3.13's `DirectEntryOrientation`, and the Index/Search utility routes. Confirmed at the source level, in every consuming package's own contract test, that no second breadcrumb/orientation implementation exists anywhere in `src/`.

## Index

`queryIndex` consumes M3.6's `selectPublicComprehensiveView` directly; exactly the five closed `GlobalLensDimension` values are the only possible lens. All six approved Index routes render real (or honestly empty) content.

## Filters

Real, working, URL-persisted filter state on `/index`, combinable (AND) criteria, visible active state, reset — all link-based, matching the same `aria-current` idiom the rest of M3-B uses. Never touches canonical route/identity (tested directly, repeatedly, across M3.11's own suite and the Phase H integration journeys below).

## Search

`searchRecords` consumes the identical `selectPublicComprehensiveView` source Index uses — proven with a **direct parity test** (`tests/domain/search-index-parity.test.ts`, this task's own explicit requirement), reconfirmed again at the M3-B integration level below. Deterministic, explainable ranking; no search-engine dependency.

## Direct entry

All five canonical-record entry routes, all six grouping routes, all five archive/comprehensive routes, all eight About routes, and Index/Search all now orient correctly when entered cold, with truthful next actions and zero fabricated Return/session-history language (`tests/domain/direct-entry-orientation-source-contract.test.ts` scans the stripped source directly for the specific forbidden phrases and finds none).

## Search/Index corpus parity

**Confirmed, non-negotiable, and tested three times independently**, at increasing scope: (1) within `SearchModel.ts`'s own reuse of `selectPublicComprehensiveView`; (2) the dedicated `tests/domain/search-index-parity.test.ts` suite; (3) this document's own cumulative integration test (`tests/integration/m3b-navigation-discovery-journeys.test.tsx`, "Cross-cutting invariants" describe block) re-running the same parity check against the full combined M3-B fixture set. All three pass. Gate M3 acceptance criterion 4 is met.

## Canonical-link integrity

Every Index entry, every Search result, every district-nav item, every breadcrumb link, and every direct-entry "next action" resolves through M3.3's `resolveCanonicalRoute` or an already-approved static route — never a locally invented or copied route string. `buildCanonicalRouteRegistry(allFixtureRecords)` (M3.3) succeeds without throwing across the full fixture set, and its result size equals the fixture count — zero collisions.

## Public/private eligibility

No package built in M3-B re-implements `isPubliclyDiscoverable`/`isPublicArchiveEligible` — `IndexModel.ts` and `SearchModel.ts` both import `selectPublicComprehensiveView` (M3.6) directly. A private/excluded fixture record is confirmed absent from Index, Search, and every route's rendered output (tested directly and repeatedly).

## Archive behavior

A public archived fixture record is confirmed reachable, with an identical canonical route, through both Index and Search (Journey 6 of the integration suite). Archive status never suppresses discovery, matching M3.6's own already-verified invariant, carried through unchanged into M3-B's discovery layer.

## Keyboard/touch

Every interactive element introduced across M3.7–M3.13 is a native `<a>`, `<button type="submit">`, or `<input>` — no custom key handling, no click-only affordance, anywhere. Confirmed at the source level in every package's own CSS contract test (no `:hover`-gated content) and by the absence of any `onKeyDown`/`tabIndex` manipulation in any M3-B source file.

## Responsive behavior

M3.7's shell fix and every subsequent package's CSS (`district-nav.css`, `breadcrumb.css`, `index-results.css`, `filters.css`, `search.css`, `direct-entry.css`) use only the two already-approved breakpoints (768px/1024px) or no breakpoint at all (simple `flex-wrap`), confirmed by each package's own CSS contract test. No disclosure/hamburger menu was introduced anywhere in M3-B.

## No-motion completeness

Confirmed at the source level, per package: zero `transition`/`animation`/`@keyframes` rules exist in any CSS file added by M3.7–M3.13.

## Development fixture strategy

One shared mechanism (`devFixtureSource.ts`, M3.10, reused unchanged by M3.12): `?fixture=m3b`, gated server-side by `process.env.NODE_ENV !== "production"`. No second fixture source, no unapproved permanent route. See **Human review procedure** below for exact activation instructions.

## Integrated test journeys

`tests/integration/m3b-navigation-discovery-journeys.test.tsx` (new, 10 tests) — the six required journeys plus three cross-cutting invariant checks, run against real exported page functions and domain functions together:

1. **Direct Home → Work → Work secondary navigation → comprehensive access** — Home, Work district root, and `/work/all` all render correctly in sequence; comprehensive access carries correct orientation.
2. **Index → active lens/filter → canonical record destination** — a district lens and a combined district+type filter both resolve to the exact M3.3 canonical route.
3. **Search query → matching canonical record** — a real query resolves to the identical canonical destination Index would produce for the same record.
4. **Direct deep link → orientation → district overview** — a canonical-record route opened cold orients correctly and offers a real, working Overview link.
5. **Research record → semantic related Lab destination** — the `tested-in` relationship resolves to Lab's exact canonical route, with ownership unchanged on both ends.
6. **Public archived record → Index/Search → same canonical route** — proven identical between the two systems.

Plus: no duplicate canonical route or ID across the full fixture corpus; Search/Index parity reconfirmed at full-corpus scale.

## Gate M3 — Final Audit

All 13 `IMPLEMENTATION_PLAN.md` §7/§8 acceptance criteria, given both mechanical evidence and the now-completed integrated human review. **Gate M3 — Navigation + Records Verified.**

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | Every test record has one canonical route | **PASS** | M3.3's `resolveCanonicalRoute`/`buildCanonicalRouteRegistry`, reconfirmed against the full fixture corpus in `tests/integration/m3b-navigation-discovery-journeys.test.tsx` ("no duplicate canonical route exists across the whole fixture corpus") — zero collisions, registry size equals fixture count. Originally established in M3.3's own 42-test suite and reconfirmed unchanged throughout M3-A and M3-B. |
| 2 | Duplicate IDs are rejected | **PASS** | M3.1's `createRecordRegistry` (`registry.ts`) throws on the first duplicate ID; reconfirmed unchanged via the same integration test's "no duplicate canonical ID" assertion. `registry.ts` confirmed byte-for-byte unchanged since M3.1's own commit through the entirety of M3-A and M3-B. |
| 3 | Every relationship resolves | **PASS** | M3.5's `assertRelationshipsResolve`/`validateRelationships`, reconfirmed by Journey 5 of the integration suite (Research's `tested-in` relationship resolves to Lab's exact canonical route, `resolveRelationship` returning a real `targetRoute`). |
| 4 | Search and Index query the same public source | **PASS** | Direct parity test (`tests/domain/search-index-parity.test.ts`), reconfirmed at M3-B integration scope (this document's own "Cross-cutting invariants" test), and human-confirmed distinct-yet-same-source behavior (Integrated Human Review Result, M3.12/Integrated M3-B behavior). Three independent mechanical confirmations plus human review. |
| 5 | Filters preserve canonical identity | **PASS** | `FilterModel.test.ts` ("never mutates canonical route or record identity"), reconfirmed via Journey 2 (a filtered Index result's link is the exact M3.3 canonical route), and human-confirmed ("filters do not appear to change canonical identity"). |
| 6 | Public archive records remain reachable when intended | **PASS** | M3.6's `isPublicArchiveEligible`/`selectPublicArchive`, reconfirmed via Journey 6 (an archived-but-public record resolves to the identical canonical route through both Index and Search), and human-confirmed ("public archived records remain reachable where intended"). |
| 7 | Public state is explicit | **PASS** | M3.1's `curatorialInclusion`/`visibility`/`lifecycle` (no generic `status`), surfaced explicitly via `IndexRecord`'s `status` slot in both Search and Index results (M3.10/M3.12), unchanged since M3.1. |
| 8 | Internal state remains internal by default | **PASS** | M3.6's `InternalPublicationRecord` side-table, structurally outside `CanonicalRecordBase` — confirmed absent from every M3-B projection (`IndexModel.ts`/`SearchModel.ts` source contracts: "never reads internal publication state"). |
| 9 | Deep links orient correctly | **PASS** | M3.13's `tests/routes/direct-entry-orientation-wiring.test.tsx`, all ten §G6 representative cases, plus human-confirmed ("a deep canonical route is understandable when opened directly in a fresh tab"). |
| 10 | Meaningful depth has breadcrumbs/equivalent orientation | **PASS** | M3.9's `OrientationContext`/`Breadcrumb`, wired by M3.13 into all touched deep routes; human-confirmed ("deep structures expose sufficient location context... hierarchy remains subordinate rather than visually noisy"). |
| 11 | Global/district navigation remain distinct | **PASS** | M3.7/M3.8 — two structurally separate `<nav>` landmark pairs per page, distinct active-state semantics (prefix-match vs. exact-match), confirmed at the source level (`DistrictNav.test.tsx`) and human-confirmed ("district navigation is visibly and conceptually distinct from global navigation"). |
| 12 | Discovery is keyboard operable | **PASS** | Every Index/Search/Filter control audited is a native `<a>`, `<button type="submit">`, or `<input>` — no custom key handling anywhere in M3-B source (confirmed by absence of `onKeyDown`/non-standard `tabIndex` usage); human-confirmed ("controls remain keyboard/touch understandable"). |
| 13 | Essential navigation does not require motion | **PASS** | Zero `transition`/`animation`/`@keyframes` rules in any M3.7–M3.13 CSS file, confirmed by each package's own CSS contract test; human-confirmed ("no motion is required... essential navigation requires neither motion nor hover"). |

**All 13 criteria PASS.** No criterion is Failed/Blocked. No contradiction was found during this final audit that would require reopening M3-A or any M3-B package. **Gate M3 — Navigation + Records Verified.**

## Known limitations

- No real content exists — every visual demonstration uses the explicitly labeled M3-B development fixture corpus.
- Filters were wired into `/index` only, not the five lens routes (documented, deliberate scope boundary — M3.11's own report).
- No state-transition engine, no Return/spatial-memory restoration (M4's own territory) — consistently deferred across every M3-B package.
- Literal pixel-level rendering (actual browser layout, contrast in context, real touch-target measurement) has not been performed in this environment — the same "structural/mechanical now, human-eye later" split every M1–M3 package before this one has used.

## Deferred M4 responsibilities

Motion, Focus manager, overlay/modal manager, full Return/spatial-memory store, scroll restoration, reduced-motion-aware transitions — none of these were touched or anticipated beyond leaving CSS free of motion properties, exactly as M3-A left them for M3-B to inherit cleanly.

## Full validation

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (unrelated, unchanged since M3.1) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **1018/1018 tests, 105/105 files** |
| `npm run build` | Pass — 53 routes total, 35 static / 18 dynamic |

## Total test count

**1018/1018 passing**, 105/105 test files. Breakdown since M3-A's closure (821/821):

| Package | New tests | Running total |
|---|---|---|
| M3.7 | 7 | 828 |
| M3.8 | 17 | 845 |
| M3.9 | 23 | 868 |
| M3.10 | 36 | 904 |
| M3.11 | 40 | 944 |
| M3.12 | 39 | 983 |
| M3.13 | 25 | 1008 |
| Phase H (cumulative integration) | 10 | 1018 |

## Human review procedure (completed)

This is the procedure the externally supplied review (**Integrated Human Review Result**, above) followed. Preserved here as the record of what was actually reviewed, and as reusable reference for any future spot-check.

### Development fixture activation

Start the dev server:

```
npm run dev
```

Append `?fixture=m3b` to any Index or Search URL to activate the labeled M3-B fixture corpus (works only outside a production build — `next build && next start` will **not** serve fixtures, by design). Filter/query parameters combine normally with the flag, e.g. `/index?fixture=m3b&district=work`.

### Exact routes/journeys to inspect

**Global navigation** — `/` — desktop (~1440px) and narrow (~390px) width; confirm all ten destinations (7 districts + 3 utilities) are visible/reachable at both, and that the header stacks (not interleaves) below 768px.

**District navigation** — visit `/work`, `/research`, `/lab`, `/art`, `/products`, `/about` — confirm each shows its own secondary nav below the global nav, with district-appropriate labels (Selected/All Work vs. Current/Archive vs. Profile/Practice/… for About).

**Orientation** — `/work/practice/some-practice-area?fixture=m3b` (grouping), `/work/fixture-work-outcome` or any `/work/{slug}` (canonical record — no fixture flag needed, since the route itself supplies the slug), `/work/all` (comprehensive) — confirm each shows a breadcrumb and truthful next-actions row.

**Index** — `/index?fixture=m3b` (complete set), `/index/district/work?fixture=m3b` and `/index/theme/fixture-theme?fixture=m3b` (two lens views) — confirm systematic, scannable rows, not a card grid.

**Filters** — `/index?fixture=m3b` — toggle a district filter, then a content-type filter (combined), observe the active-filter chips and result count change, then use Reset — confirm the fixture flag survives Reset.

**Search** — `/search?fixture=m3b` (empty query — browse invitation), `/search?fixture=m3b&q=Fixture` (results with visible match reasons), `/search?fixture=m3b&q=zzz-no-match` (calm no-result state).

**Direct entry** — open `/lab/fixture-lab-experiment` (no fixture flag needed) in a fresh browser tab/private window — confirm it orients correctly with zero assumption of prior navigation.

### Human review criteria

Judge the integrated system, not isolated visual polish:

- **Global navigation** — is platform structure immediately obvious? Is the current district identifiable? Does mobile remain complete (no clipped/hidden destination)?
- **District navigation** — do districts feel related but not identical? Does secondary hierarchy make sense without explanation?
- **Orientation** — do deep pages explain "where am I" quickly, without the breadcrumb/next-actions row becoming visual noise?
- **Index** — does it read as systematic and precise, not atmospheric or dashboard-like?
- **Filters** — is the active state obvious? Is Reset obvious? Does the result count change feel intentional, not glitchy?
- **Search** — does it feel clearly distinct from Index? Is the query/match relationship legible?
- **Direct entry** — opened cold, does the page feel fully usable, with no implied "you should have come from somewhere else"?
- **Responsive** — does the navigation hierarchy survive at 390px, without becoming "just a squeezed desktop"?

## Acceptance result

M3-B — Navigation + Discovery is complete across all seven work packages (M3.7–M3.13), mechanically verified against all 13 Gate M3 criteria, with Search/Index parity independently confirmed three times, zero canonical-identity/route/ownership violations found anywhere in the cumulative integration journeys, and the externally supplied integrated human browser review PASSED with no further calibration required for any package.

`M3-B — Navigation + Discovery: Approved / Closed`

`Gate M3 — Navigation + Records Verified`

M3-A's canonical architecture (M3.1–M3.6) remained stable and unmodified throughout the entire Navigation + Discovery implementation and this closure — confirmed once more in this pass, no contradiction found, not reopened.
