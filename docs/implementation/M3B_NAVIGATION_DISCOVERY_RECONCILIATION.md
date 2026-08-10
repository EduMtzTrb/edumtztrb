# M3-B — Navigation + Discovery Reconciliation

## Status

**Ready for Integrated Human Review.** This is a batch reconciliation document, not a new Implementation Plan work package — no `M3.13.1` or equivalent was invented. M3-B is **not** formally approved/closed by this document; that requires one externally supplied integrated browser review (see **Human review procedure** below).

## Authority

- `IMPLEMENTATION_PLAN.md` §7 — M3.7–M3.13 work-package definitions, and §6/§8 — Gate M3's thirteen acceptance criteria.
- `docs/implementation/M3A_CANONICAL_ARCHITECTURE_RECONCILIATION.md` — the frozen upstream canonical architecture (M3.1–M3.6) M3-B consumes without revision.
- The seven individual M3.7–M3.13 implementation reports (`docs/implementation/M3.7_GLOBAL_NAVIGATION.md` through `M3.13_DIRECT_ENTRY_ORIENTATION.md`).

## Package inventory

| Package | Status | Commit |
|---|---|---|
| M3.7 — Global Navigation | Implemented / Mechanically Verified | `f8e414f` |
| M3.8 — District Navigation | Implemented / Mechanically Verified | `23b1bc5` |
| M3.9 — Breadcrumb / Orientation System | Implemented / Mechanically Verified | `dbb08cf` |
| M3.10 — Index | Implemented / Mechanically Verified | `785f479` |
| M3.11 — Filters | Implemented / Mechanically Verified | `41fd03e` |
| M3.12 — Search | Implemented / Mechanically Verified | `5e2d2db` |
| M3.13 — Direct-Entry Orientation | Implemented / Mechanically Verified | `2b48ee7` |

None of the seven is individually "Complete / Verified" — per this task's own explicit instruction, that status is reserved until this one integrated review completes.

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

## Gate M3 pre-assessment

All 13 `IMPLEMENTATION_PLAN.md` §7 acceptance criteria, assessed now — **not** formally closed (that is Gate M3's own separate, later closure event):

| # | Criterion | Assessment |
|---|---|---|
| 1 | Every test record has one canonical route | **Mechanically Passed** — `buildCanonicalRouteRegistry` succeeds, zero collisions, reconfirmed at M3-B integration scope |
| 2 | Duplicate IDs are rejected | **Mechanically Passed** — `createRecordRegistry` (M3.1), reconfirmed unchanged |
| 3 | Every relationship resolves | **Mechanically Passed** — M3.5's own guarantee, reconfirmed via Journey 5 |
| 4 | Search and Index query the same public source | **Mechanically Passed** — direct parity test, three independent confirmations |
| 5 | Filters preserve canonical identity | **Mechanically Passed** — M3.11's own tests + integration Journey 2 |
| 6 | Public archive records remain reachable when intended | **Mechanically Passed** — Journey 6 |
| 7 | Public state is explicit | **Mechanically Passed** — M3.1/M3.6, unchanged, surfaced via `IndexRecord`'s `status` slot in Search/Index |
| 8 | Internal state remains internal by default | **Mechanically Passed** — M3.6's side-table architecture, structurally incapable of leaking; reconfirmed absent from every M3-B projection |
| 9 | Deep links orient correctly | **Mechanically Passed** — M3.13, all ten representative cases |
| 10 | Meaningful depth has breadcrumbs/equivalent orientation | **Mechanically Passed** — M3.9 model + M3.13 wiring |
| 11 | Global/district navigation remain distinct | **Mechanically Passed** — M3.7/M3.8, structurally distinct landmarks + distinct active-state semantics |
| 12 | Discovery is keyboard operable | **Mechanically Passed** — every control audited is a native, keyboard-operable element |
| 13 | Essential navigation does not require motion | **Mechanically Passed** — zero motion CSS anywhere in M3-B |

All 13 are **Mechanically Passed**. None is **Failed / Blocked**. Literal visual/interaction quality (does it *feel* right, not just structurally correct) remains **Needs Human Browser Confirmation** — the subject of the review below. Gate M3 itself is not closed by this table; that closure is a separate, later event after the human review and after M3.7–M3.13 are individually marked Complete / Verified.

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

## Human review procedure

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

M3-B — Navigation + Discovery is implementation-complete across all seven work packages (M3.7–M3.13), mechanically verified against all 13 Gate M3 criteria, with Search/Index parity independently confirmed three times and zero canonical-identity/route/ownership violations found anywhere in the cumulative integration journeys. **Ready for Integrated Human Review.**
