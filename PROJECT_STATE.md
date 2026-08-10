# Personal Platform — Project State

**Last updated:** 2026-08-10
**Milestone:** Milestone 1 — Foundation: **Complete / Verified**. Milestone 2 — System Primitives: **Complete / Verified** (Gate M2 met — M2.12 of 12 work packages complete; all fourteen Gate M2 acceptance criteria satisfied, assessed in full in `docs/implementation/M2.12_RESPONSIVE_PRIMITIVE_VERIFICATION.md`).

This document describes what is actually implemented in the repository right now. It is not a plan or a specification — see `PLATFORM_VISION.md`, `INFORMATION_ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `ANIMATION_SYSTEM.md`, `PLATFORM_SPECIFICATION.md`, `IMPLEMENTATION_PLAN.md`, and `TECHNICAL_ARCHITECTURE.md` for those. The full source-of-truth map is `docs/GOVERNING_DOCUMENTS.md`.

---

## Completed

- Architecture and Systems Specification phase — Universe Specification Set v1.1 (Approved 2026-08-06), Cross-Universe System Requirements v1.0 (Approved 2026-08-06), Design System v1.0 (Approved 2026-08-07), Animation System v1.0 (Approved), Platform Specification v1.0 (Approved 2026-08-07)
- Implementation Planning — Implementation Plan v1.0 (Approved 2026-08-07)
- **M1.1 — Repository Audit** — **Completed — Verified with Issues** (see `docs/implementation/M1.1_REPOSITORY_AUDIT.md`)
- **M1.1A — Governing Documentation Reconciliation** — **Completed — Verified with Issues** (see `docs/implementation/M1.1A_GOVERNING_DOCUMENTATION_RECONCILIATION.md`)
- **M1.2 — Environment Baseline** — **Complete** (see `docs/implementation/M1.2_ENVIRONMENT_BASELINE.md`)
- **M1.3 — Route Skeleton** — **Complete** (see `docs/implementation/M1.3_ROUTE_SKELETON.md`)
- **M1.4 — Shared Application Shell** — **Complete** (see `docs/implementation/M1.4_SHARED_APPLICATION_SHELL.md`)
- **M1.5 — Semantic Page Shells** — **Complete** (see `docs/implementation/M1.5_SEMANTIC_PAGE_SHELLS.md`)
- **M1.6 — Testing Baseline** — **Complete** (see `docs/implementation/M1.6_TESTING_BASELINE.md`)
- **Milestone 1 — Foundation** — **Complete / Verified** (Gate M1 met — all twelve `IMPLEMENTATION_PLAN.md` §6 acceptance criteria satisfied, assessed in full in `docs/implementation/M1.6_TESTING_BASELINE.md`)
- **M2.1 — Token Foundation** — **Complete, reconciled** (see `docs/implementation/M2.1_TOKEN_FOUNDATION.md`) — a review found the first pass had silently resolved several Design-System-approved *ranges* and *unvalued names* into single final-looking values (typography sizes, grid margin/gutter, `color-disabled`, `color-district-accent`, three of four surface levels, `line-standard`); all were reverted to a deliberately unresolved state, documented in a full provenance table
- **Implementation-Readiness Reconciliation** — **Complete** (see `docs/implementation/IMPLEMENTATION_READINESS_RECONCILIATION.md`) — reconciled the M2.1 token baseline against `DESIGN_SYSTEM.md v1.1`; retired six superseded token names, added three v1.1 typography-voice names; classified as "Ready for M2.2 with Deferred Calibration"
- **M2.2 — Typography** — **Complete / Verified** (see `docs/implementation/M2.2_TYPOGRAPHY.md`) — Display Voice (Space Grotesk), Reading Voice (Source Serif 4), and Functional Mono Voice (IBM Plex Mono) implemented via `next/font/google`; all eleven semantic type roles resolved to fluid, range-respecting `clamp()` values; confirmed via automated validation, structural/mechanical browser verification, and human visual approval in a real browser. One adjacent, non-typography observation from that review (responsive navigation wrapping) is recorded as deferred to **M3.7 — Global Navigation** — see **Blockers** below
- **M2.3 — Spacing and Grid** — **Complete / Verified** (see `docs/implementation/M2.3_SPACING_GRID.md`) — 4/8/12 responsive grid, calibrated margin/gutter tokens (fluid `clamp()` within each approved per-breakpoint range), the `composition-max` guardrail with ultra-wide auto-centering, and a compositional-void primitive (`.field-interval`) implemented and applied to all seven page shells; confirmed via automated validation, structural/mechanical browser verification, and human visual approval in a real browser (Home, Work, About, Lab; narrow/intermediate/wide viewports). `GlobalNav` was not modified (confirmed via diff); the previously observed responsive navigation wrapping remains deferred to **M3.7 — Global Navigation**
- **M2.4 — Core Visual Primitives** — **Complete / Verified** (see `docs/implementation/M2.4_CORE_VISUAL_PRIMITIVES.md`) — Plane, Frame, and the Structural/Hierarchy line families implemented in a new `src/styles/primitives.css`, composed entirely from already-resolved tokens; Field and Void required no new work (already fully expressed by M1/M2.1/M2.3); Annotation line, Relationship/Trace line, and Signal are deliberately and explicitly deferred (no real content exists yet to give any of them genuine meaning). Round 1 human visual review approved Structural Line, Hierarchy Line, Plane, and Field/Void without changes; Frame's initial treatment (`line-structural`, 3px) was rejected as too strong, recalibrated to `line-hairline` (1px), and **approved on Round 2 re-review** (desktop ~1440px + mobile ~390px), including the Plane + Frame combination (restrained, not card-like — remains an exceptional pairing, not a default pattern). No primitive is applied to any page shell yet — none has content that needs one. `GlobalNav`/page shells were never modified at any point in this milestone (confirmed via diff)
- **M2.5 — Action Controls** — **Complete / Verified** (see `docs/implementation/M2.5_ACTION_CONTROLS.md`) — Primary/Secondary/Tertiary actions (`Action.tsx`, `.action-primary/secondary/tertiary`) and Route/Utility/Inline links (`ActionLink.tsx`, `.link`/`.link-inline`) implemented in a new `src/styles/controls.css`, composed entirely from already-resolved tokens plus one newly resolved opacity token (`--opacity-disabled`, `src/styles/tokens/opacity.css`); the button/link semantic boundary is enforced at the TypeScript type level, not just by convention. All required states (default/hover/pressed/focus-visible/disabled/loading) are implemented; focus-visible reuses `shell.css`'s existing mechanism exactly (verified by string-equality test). Signal is confirmed absent throughout. Icon-control capability (44×44 hit area, mandatory accessible name) is established but no icon glyph is shipped — no real consumer needs one yet. No control is applied to any page shell — none has a genuine action to trigger yet. `GlobalNav`/page shells were never modified (confirmed via diff). Human visual approval (externally supplied) recorded — see that document's "Human Visual Approval"
- **M2.6 — Selection / Filter Controls** — **Complete / Verified** (see `docs/implementation/M2.6_SELECTION_FILTER_CONTROLS.md`) — Tabs, segmented views, filter toggles, removable filters, checkboxes, radios, selects, and status tags implemented in `src/components/selection/` plus a new `src/styles/selection.css`, composed entirely from already-resolved tokens (no new token minted). "Selected state must use more than color alone" is enforced per primitive and protected by an automated CSS-contract test. Signal is confirmed absent throughout. No Lens component was built (out of M2.6's authoritative scope). No control is applied to any page shell — none has a genuine selection/filter to represent yet. `GlobalNav`/page shells were never modified (confirmed via diff). Human visual approval (externally supplied) recorded — see that document's "Human Visual Approval"
- **M2.7 — Record Family** — **Complete / Verified** (see `docs/implementation/M2.7_RECORD_FAMILY.md`) — Portal, Media, Index, Editorial, and Product records implemented in `src/components/records/` plus a new `src/styles/records.css`, composed entirely from already-resolved tokens (no new token minted, no generic universal card class). Each family differs by task/density/void while sharing typography, spacing, geometry, and focus vocabulary, per `DESIGN_SYSTEM.md v1.1` §34.1. The M2.8 (media internals), M2.9 (Metadata Rail), and Milestone 3 (canonical-record schema/routes) boundaries are all respected. No record is applied to any page shell — none has a genuine listing context yet. `GlobalNav`/page shells were never modified (confirmed via diff). Human visual approval (externally supplied) recorded — see that document's "Human Visual Approval"
- **M2.8 — Media Family** — **Complete / Verified** (see `docs/implementation/M2.8_MEDIA_FAMILY.md`) — Figure, Caption, Gallery Sequence, Comparison Pair, Comparison Matrix, Document Plate, Video Frame, Artwork Viewer Shell, and Product Media Set implemented in `src/components/media/` plus a new `src/styles/media.css`, composed entirely from already-resolved tokens (no new token minted, no forced aspect-ratio/crop anywhere). `Figure` is the genuine shared foundation six of the other eight primitives compose directly. `.frame` (M2.4) is reused exactly once, for Document Plate's genuine extent semantics — no other primitive is framed. Signal is confirmed absent throughout; no motion; no overlay/focus-layer system built (Artwork Viewer is a shell only, per the Implementation Plan's own wording). Record-family (M2.7) compatibility confirmed via integration tests without modifying `MediaRecord`/`ProductRecord`. No primitive is applied to any page shell — none has genuine media content yet. `GlobalNav`/page shells were never modified (confirmed via diff). Human visual approval (externally supplied) recorded — see that document's "Human Visual Approval"
- **M2.9 — Metadata Rail** — **Complete / Verified** (see `docs/implementation/M2.9_METADATA_RAIL.md`) — `MetadataRail` implemented in `src/components/metadata/` plus a new `src/styles/metadata.css`; real structured `<dl>`/`<dt>`/`<dd>` label/value pairs with real compact-screen CSS-grid reflow at the existing 768px breakpoint. Supports the Primary/Secondary/Latent metadata hierarchy (`DESIGN_SYSTEM.md v1.1` §22/§34.2/§97); Primary/Secondary alias already-resolved color tokens directly, and exactly one new token was resolved for the Latent tier (`--opacity-latent`, WCAG-verified against the same methodology M2.5 used for `--opacity-disabled`). Stays distinct from M2.7's record-preview summary fields and M2.8's media-intrinsic captions/credits — neither was touched. No rail is applied to any page shell — none has genuine record-level metadata yet. `GlobalNav`/page shells were never modified (confirmed via diff). Human visual approval (externally supplied) recorded — see that document's "Human Visual Approval"
- **M2.10 — Form Family** — **Complete / Verified** (see `docs/implementation/M2.10_FORM_FAMILY.md`) — `TextField`, `TextAreaField`, and `FormConfirmation` implemented in `src/components/form/` plus a new `src/styles/form.css`. Persistent labels, guidance, required state (explicit visible text marker, never color-only), focus, errors with explanation, disabled state, and confirmation hooks are all implemented; error/confirmation reuse already-resolved functional colors (`--color-error`/`--color-success`), no new color. `Action` (M2.5) is extended with an optional `type` prop (`"button" | "submit"`, default unchanged) — the one minimal, tested, backward-compatible prior-milestone change this package required; M2.6's `Select`/`Checkbox`/`RadioGroup` needed zero changes. No field is applied to any page shell — none has a genuine form yet. `GlobalNav`/page shells were never modified (confirmed via diff). Human visual approval (externally supplied) recorded — see that document's "Human Visual Approval"
- **M2.11 — Shared Static States** — **Complete / Verified** (see `docs/implementation/M2.11_SHARED_STATIC_STATES.md`) — `LoadingState`, `EmptyState`, `SparseState`, `NoResultState`, `UnavailableState`, `ArchivedState`, `ErrorState`, `SuccessState`, and `RestrictedState` (plus the internal `StaticState` foundation) implemented in `src/components/state/` plus a new `src/styles/state.css`. Interaction/system/lifecycle/commercial state dimensions stay separated per `DESIGN_SYSTEM.md v1.1` §21; color is confined to exactly Error/Success as reinforcement only, no badge taxonomy, no new color. `StatusTag` (M2.6) and `FormConfirmation` (M2.10) were both audited and left unmodified — genuinely distinct roles, not duplicated. No state is applied to any page shell — none has a genuine condition yet. `GlobalNav`/page shells were never modified (confirmed via diff). Human visual approval (externally supplied) recorded — see that document's "Human Visual Approval"
- **M2.12 — Responsive Primitive Verification** — **Complete / Verified** (see `docs/implementation/M2.12_RESPONSIVE_PRIMITIVE_VERIFICATION.md`) — every M2.2–M2.11 primitive verified via source-level CSS/test evidence (breakpoint consistency, hover-content-gating, fixed-width hazards, focus-outline consistency, computed WCAG 2.2 contrast) rather than prose assertion. One genuine defect found and corrected: `SegmentedView`'s options container (`src/styles/selection.css`) gained `flex-wrap: wrap` to prevent option clipping at narrow widths — the one-line fix does not change any already-approved desktop treatment, and is regression-tested. Computed contrast passes for all seven representative pairs (4.88:1–17.40:1). All fourteen Gate M2 acceptance criteria pass with evidence. Human responsive approval (externally supplied) recorded — see that document's "Human Responsive Approval"
- **Gate M2 — System Primitives Verified** — Milestone 2 (M2.1–M2.12, all twelve work packages) is formally closed. See `docs/implementation/M2.12_RESPONSIVE_PRIMITIVE_VERIFICATION.md` "Gate M2 Assessment" for the full fourteen-criterion evidence table.
- **Platform Vision — Final Approval** — `PLATFORM_VISION.md` closed at **v1.0, Approved / Closed** (8 August 2026): central brand idea, personal brand identity, positioning, audience hierarchy, experience goals, design principles, curatorial threshold, role of commerce, and long-term evolution are now locked governing authority (see **Governing Documents** below)
- **Information Architecture — Final Approval** — `INFORMATION_ARCHITECTURE.md` closed at **v1.0, Approved / Closed** (8 August 2026): canonical ownership, district boundaries, typed directional relationships, the public-inclusion/state model, Search/Index, lenses/filters, archive semantics, route hierarchy, and the minimum canonical-record contract are now locked governing authority
- **Design System — v1.1 Final Approval** — `DESIGN_SYSTEM.md` closed at **v1.1, Approved / Closed** (9 August 2026), superseding v1.0: adds the identity system (Precision without finality, Inhabited Threshold, Typographic Voice, Signal, Trace Language, Controlled Exception), the governing compositional grammar, district-expression rules, and a reconciled Core System including semantic depth/layer-order/opacity models — see **Blockers** below for its effect on the opacity/layer-order item
- **Governing Documentation Reconciliation** — commit `bb88f62417b9b3f14a92d8c25183d43a19be3be2` (`docs: reconcile governing document names and authority`, 9 August 2026): restored stable bare canonical filenames for the core governing documents, archived superseded proposals and the superseded Design System v1.0, and reconciled `docs/GOVERNING_DOCUMENTS.md`

## Current Phase

Implementation — Foundation (Milestone 1 of 9): **Complete / Verified**. Milestone 2 — System Primitives (12 of 12 work packages): **Complete / Verified — Gate M2 met**. Governance track: Platform Vision, Information Architecture, and Design System are now all closed at their current versions (see **Governing Documents**).

## Current Position

M2.12 — Responsive Primitive Verification completed and closed (Complete / Verified, including human responsive approval — see `docs/implementation/M2.12_RESPONSIVE_PRIMITIVE_VERIFICATION.md`). **Gate M2 — System Primitives Verified.** Milestone 2 is now fully complete (M2.1 through M2.12). Milestone 3 is merely ready, not started.

Sequence completed: Governance Synchronization → Implementation-Readiness Reconciliation → M2.2 — Typography → M2.3 — Spacing and Grid → M2.4 — Core Visual Primitives → M2.5 — Action Controls → M2.6 — Selection / Filter Controls → M2.7 — Record Family → M2.8 — Media Family → M2.9 — Metadata Rail → M2.10 — Form Family → M2.11 — Shared Static States → M2.12 — Responsive Primitive Verification.

Next: **M3.1 — Universal Canonical-Record Contract** (per `IMPLEMENTATION_PLAN.md` §7). Not started in this task.

## Governing Documents

Concise source-of-truth list (full detail: `docs/GOVERNING_DOCUMENTS.md`):

| Document | Version | Status | Path |
|---|---|---|---|
| Universe Specification Set (7 districts) | 1.1 | Approved | `docs/universes/*_UNIVERSE_v1.1.md` |
| Cross-Universe System Requirements | 1.0 | Approved | `docs/systems/CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md` |
| Platform Vision | 1.0 | Approved / Closed (8 August 2026) | `PLATFORM_VISION.md` |
| Information Architecture | 1.0 | Approved / Closed (8 August 2026) | `INFORMATION_ARCHITECTURE.md` |
| Design System | 1.1 | Approved / Closed (9 August 2026) | `DESIGN_SYSTEM.md` |
| Animation System | 1.0 | Approved | `ANIMATION_SYSTEM.md` |
| Platform Specification | 1.0 | Approved | `PLATFORM_SPECIFICATION.md` |
| Implementation Plan | 1.0 | Approved | `IMPLEMENTATION_PLAN.md` |

Every governing document above is now Active — Approved. Do not treat any document not listed here as authoritative for implementation, regardless of filename.

## Blockers

- **Platform Vision / Information Architecture — Resolved.** Both closed at v1.0, Approved / Closed, 8 August 2026. No unresolved contradiction remains at the Vision or IA level. This is no longer a blocker to any current or future work package.
- **Design System opacity / layer-order — design-governance ambiguity resolved; implementation calibration remains.** The original blocker recorded that `DESIGN_SYSTEM_v1.0.md` approved neither opacity nor layer-order anywhere. `DESIGN_SYSTEM.md v1.1` §19 now defines the approved semantic depth sequence (Environmental Field → Resolved Layer → Working Layer → Focus Layer → Functional Overlay → Critical System Layer), §99 approves a six-token layer-order model (`layer-field`, `layer-resolved`, `layer-working`, `layer-focus`, `layer-overlay`, `layer-critical`), and §100 approves five semantic opacity roles (full authority, supporting, latent, recessed context, disabled) — recorded in the Design System's own decision register as DS-147 ("Semantic z-order bands are approved; numerical z-index values remain implementation-level"). **Exact numeric z-index and opacity values are explicitly left implementation-calibrated by v1.1 itself — this document does not invent or assign any of those values.** This item is therefore reclassified from "not approved, not implemented" to **implementation-calibration work**, owned by Implementation-Readiness Reconciliation and whichever M2 package first needs real values (previously estimated as M2.4 Core visual primitives or M2.9 Overlay-adjacent work).
- **Implementation-Readiness Reconciliation — Resolved.** Completed; M2.2 subsequently completed and closed. No longer a blocker.
- **Responsive navigation wrapping** — observed during M2.2's human visual review, re-confirmed not worsened during M2.3's and M2.4's (M2.4 never touched navigation at all). Not a typography, spacing/grid, or visual-primitives blocker; not fixed during any closure so far. Deferred to **M3.7 — Global Navigation** (Milestone 3 — Navigation + Records) — see `docs/implementation/M2.2_TYPOGRAPHY.md` "Adjacent Observation", `docs/implementation/M2.3_SPACING_GRID.md` "Adjacent Observation Carried Forward", and `docs/implementation/M2.4_CORE_VISUAL_PRIMITIVES.md`. Does not block M2.5.
- No other blockers to M2.5 were identified. M2.5 is Complete / Verified, including its human visual round. See `docs/implementation/M2.5_ACTION_CONTROLS.md`.
- No blockers to M2.6 were identified. M2.6 is Complete / Verified, including its human visual round. See `docs/implementation/M2.6_SELECTION_FILTER_CONTROLS.md`.

---

## Implemented

### Technical foundation

- Next.js (App Router)
- TypeScript (strict mode)
- ESLint (`next/core-web-vitals` + TypeScript, flat config), integrated with Prettier via `eslint-config-prettier`
- Prettier, with `npm run format` / `npm run format:check`
- No UI component library, no animation library, no CSS framework

### Routes

Added by M1.3 (see `docs/implementation/M1.3_ROUTE_SKELETON.md`): the full route tree approved in `PLATFORM_SPECIFICATION.md` §5 now exists — **53 routes total** (corrected 2026-08-07 by M1.5 from an arithmetic error in the original M1.3/M1.4 reports, which had stated 49; the route files themselves were always correct and complete — only the prior reports' stated total was wrong, per `docs/implementation/M1.5_SEMANTIC_PAGE_SHELLS.md`). Every route renders one `<main>` and one identifying `<h1>` (a district/section label taken from the Platform Specification's own vocabulary, or for dynamic routes, the record identifier echoed back from the URL), now via one of the seven semantic page-shell components added by M1.5 (see below). No real content, no styling beyond the shared global stylesheet.

- **Top-level:** `/`, `/work`, `/research`, `/lab`, `/art`, `/products`, `/about`, `/search`, `/index`, `/contact`
- **Work:** `/work/selected`, `/work/all`, `/work/practice/[practiceArea]`, `/work/collections/[collection]`, `/work/[entry]`
- **Research:** `/research/current`, `/research/themes/[theme]`, `/research/publications`, `/research/writing`, `/research/talks`, `/research/archive`, `/research/[entry]`
- **Lab:** `/lab/active`, `/lab/prototypes`, `/lab/tools`, `/lab/studies`, `/lab/archive`, `/lab/[entry]`
- **Art:** `/art/selected`, `/art/series/[series]`, `/art/medium/[medium]`, `/art/exhibitions`, `/art/archive`, `/art/[entry]`
- **Products:** `/products/featured`, `/products/collections/[collection]`, `/products/digital`, `/products/physical`, `/products/services`, `/products/archive`, `/products/[entry]`
- **About:** `/about/profile`, `/about/practice`, `/about/experience`, `/about/education`, `/about/capabilities`, `/about/recognition`, `/about/current-focus`
- **Global discovery:** `/index/district/[district]`, `/index/type/[contentType]`, `/index/discipline/[discipline]`, `/index/theme/[theme]`, `/index/year/[year]`

16 dynamic route files (the `[entry]`, `[practiceArea]`, `[collection]`, `[theme]`, `[series]`, `[medium]`, `[district]`, `[contentType]`, `[discipline]`, and `[year]` segment names, several reused once per district) render on demand (no `generateStaticParams`, no fixtures, no data source) — confirmed in the `next build` output as `ƒ (Dynamic)`. The other 37 routes prerender as static content.

Utility routes (`/search`, `/index`, `/contact`) use a `layout.tsx` with `data-utility="..."` on a wrapping `<div>`, mirroring the existing district `data-district="..."` convention.

### Shared application shell

Added by M1.4 (see `docs/implementation/M1.4_SHARED_APPLICATION_SHELL.md`): every route now renders inside a shared shell composed in `src/app/layout.tsx` via `src/components/shell/AppShell.tsx` (Server Component — skip link, `<header>`, `#main-content` anchor) and `src/components/shell/GlobalNav.tsx` (the shell's only Client Component — two `<nav>` landmarks, "Primary" for the seven districts and "Utilities" for Search/Index/Contact). Active-context detection uses `usePathname()` (switched from `useSelectedLayoutSegment()` by an M1.5 correction) and applies `aria-current="page"` on an exact route match or `aria-current="true"` when the current page is nested under a nav link's section but isn't that link's own route (e.g. "Work" gets `"true"`, not `"page"`, while viewing `/work/selected`) — both states keep the same non-color visual cue (underline + weight). Styling lives in `src/styles/shell.css` (imported from `globals.css`), using only existing Color/Spacing/Geometry tokens. No footer, no language switcher, no legal/admin utility, no district-specific secondary navigation, and no motion — all explicitly deferred. Every route's own `<main>` remains the page's sole main landmark.

### Semantic page shells

Added by M1.5 (see `docs/implementation/M1.5_SEMANTIC_PAGE_SHELLS.md`): all 53 routes are now assigned to one of seven approved page-shell types (`PLATFORM_SPECIFICATION.md` §6) via `src/components/page-shells/PageShell.tsx` (`WorldThresholdShell`, `DistrictOverviewShell`, `CuratedViewShell`, `ComprehensiveViewShell`, `GroupingViewShell`, `UtilityPageShell`) and `src/components/page-shells/CanonicalRecordShell.tsx` (`CanonicalRecordShell`, used by the five districts' `[entry]` routes plus `/about/profile`). Each renders `<main data-page-type="...">` with a `<header><h1>` — the Canonical Record shell additionally accepts eight optional regions (public state, authorship, context, evidence, metadata, relationships, credits, continuation) that render nothing when unset, so no page currently has any content beyond its heading. No listing/archive/filter UI, no district-specific fields, no real content — all deferred to Content Integration (Milestone 7).

### Testing baseline

Added by M1.6 (see `docs/implementation/M1.6_TESTING_BASELINE.md`): Vitest + `@testing-library/react` (the stack Next.js 16's own bundled docs recommend for App Router unit testing) — 98 tests across 7 files, run via `npm run test:run` (single run) or `npm test` (watch mode). A standalone `npm run typecheck` (`tsc --noEmit`) was also added. Coverage: the full 53-route contract (`tests/routes/route-contract.test.ts`, filesystem-based, transcribed from `PLATFORM_SPECIFICATION.md` §5), the M1.4 shared shell and its `aria-current` logic (`src/components/shell/*.test.tsx`), all seven M1.5 page-shell types including `CanonicalRecordShell`'s optional-region behavior (`src/components/page-shells/*.test.tsx`), real route→shell wiring for one route per shell type (`tests/routes/route-shell-wiring.test.tsx`), and structural accessibility smoke checks on a composed page (`tests/routes/accessibility-smoke.test.tsx`). No interaction/E2E, Search/Index/Contact behavior, content integrity, motion, commerce, full accessibility audit, or performance testing — all explicitly deferred to later milestones.

### Design tokens

Located in `src/styles/tokens/`, imported once through `src/styles/tokens/index.css` into `src/app/globals.css`. **Corrected and reconciled by M2.1** (see `docs/implementation/M2.1_TOKEN_FOUNDATION.md`, including its full provenance table) — the M1.1A follow-up flagged below is resolved: every token file cites `DESIGN_SYSTEM_v1.0.md` directly. All 68 tokens `DESIGN_SYSTEM_v1.0.md` §60 approves are declared, across six files, but **only 45 hold a real value** — the other 23 are declared with a deliberately *empty* value, because the Design System gives only a range or approves the name with no value at all, and no earlier implementation is entitled to silently pick a point within a range and call it approved.

- **Color** (`color.css`) — neutral palette (§10.2, corrected names/values: "Mist" not "Fog," four previously-missing roles added — Paper 100, Ink, Ink Secondary, Light Text) and focus/semantic-state colors as on-light/on-dark pairs (§10.3–10.4) are exact approved values, implemented. `color-disabled` and `color-district-accent` are approved *names* with **no value approved anywhere in v1.0** — declared, deliberately left unresolved (district-accent hue is explicitly district-owned per §10.6/§63, not a shared-system decision at all).
- **Surface** (`surface.css`) — `surface-field` is implemented (near-verbatim textual support in §10.2, and load-bearing for the page's actual background). `surface-1`/`surface-2`/`surface-overlay` are declared but **unresolved** — §11 doesn't map those names to specific hexes anywhere in §10.2's table; an earlier pass had inferred a mapping and presented it as approved, which was incorrect and has been reverted.
- **Typography** (`typography.css`) — `font-primary`/`font-technical` are exact approved family names, implemented (not loaded yet — that's M2.2). All 11 `type-*` size tokens are declared but **unresolved** — §7 gives each role a min–max range and says sizes are "fluid within these ranges" without specifying a point; the approved range is preserved in each token's comment for M2.2 to resolve.
- **Spacing** (`spacing.css`) — `space-0` through `space-12` (§8.1), all exact approved values — already correct in M1; only the stale comment citation was fixed.
- **Grid** (`grid.css`) — column counts (4/8/12) and `composition-max` (1600px) are exact approved values, implemented. All 6 margin/gutter tokens were declared but unresolved at M2.1 time (§9.1 gives per-breakpoint ranges with no stated preference) — **now resolved by M2.3** as fluid `clamp()` values within each approved range; see `docs/implementation/M2.3_SPACING_GRID.md`.
- **Geometry** (`geometry.css`) — `line-hairline`/`line-emphasis`/`line-structural` and all four radius tokens (renamed to the approved registry: `radius-none`/`radius-small`/`radius-control`/`radius-circle`) are exact approved values, implemented. `line-standard` is declared but **unresolved** — §12.1 gives it as a 1–1.5px range with no stated preference.

**Not approved by `DESIGN_SYSTEM_v1.0.md` at the time M2.1 was implemented, therefore not implemented:** opacity and layer-order (z-index) tokens — named in the Implementation Plan's M2.1 description but absent from the Design System entirely at v1.0. `DESIGN_SYSTEM.md` is now v1.1 and does approve semantic roles for both (not yet reconciled into implementation) — see **Blockers** above and **Current Position**.

An empty CSS custom property (`--token-name: ;`) is valid and deliberate, not an oversight: the approved *name* stays registered and protected by the token-contract test suite, while the *value* honestly reflects that no design decision has been made. Nothing in `globals.css`/`shell.css` references any of the 23 unresolved tokens (verified by test) — resolving them, in every case, is explicit open work for a later package, not something M2.1 owns:

- Typography sizes (fluid interpolation and final application) — M2.2
- ~~Grid margin/gutter and the actual responsive grid system — M2.3~~ resolved by M2.3, see `docs/implementation/M2.3_SPACING_GRID.md`
- `surface-1`/`surface-2` — retired by Implementation-Readiness Reconciliation (superseded, not resolved; see `docs/implementation/IMPLEMENTATION_READINESS_RECONCILIATION.md`). `surface-overlay` — considered but deliberately left unresolved by M2.4 (no modal/overlay component exists yet); still owned by whichever package first builds real overlay/floating composition
- `color-disabled` — whichever package first builds real disabled-state UI (M2.5/M2.6/M2.10)
- `color-district-accent` — district-level work, Milestone 5 (explicitly not a shared-system decision)
- Motion tokens — Milestone 4

### Typography

No font is loaded or configured yet — `font-primary`/`font-technical` tokens exist (M2.1) but `body` in `globals.css` still deliberately uses a plain system-font stack, not the token, to avoid silently changing rendering before the real font is actually loaded (M2.2):

```css
font-family:
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

### Governing instructions

- `CLAUDE.md` delegates to `AGENTS.md` (`@AGENTS.md`).
- `AGENTS.md` contains the Next.js–managed agent-rules block (auto-regenerated by `next dev`) plus a project-authored **Handling Ambiguity** rule requiring implementation to stop and ask before resolving incomplete, contradictory, or multiply-interpretable specifications, rather than deciding silently.

### Environment baseline

Added by M1.2 (see `docs/implementation/M1.2_ENVIRONMENT_BASELINE.md`):

- Node.js `22.13.1` declared in `.nvmrc`; enforced as `engines.node: ">=22.13.1 <23.0.0"` in `package.json`.
- npm `10.9.2`+ (`10.x`) declared as `engines.npm: ">=10.9.2 <11.0.0"` in `package.json`; npm is the only supported package manager (only `package-lock.json` is committed).
- `.npmrc` sets `engine-strict=true` — `npm install`/`npm ci` fail fast outside the declared ranges.
- `README.md` rewritten with project-specific prerequisites, install (`npm ci`), and command documentation, replacing the original `create-next-app` boilerplate.
- No environment variables exist or are required; no `.env.example` was created. The convention for introducing the first real one (`.env.example` + `.env.local` + `NEXT_PUBLIC_` rules) is documented in `README.md`.

---

## Universe Specification Set

### Completed

- Universe Specification Set v1.1 reviewed
- Cross-district consistency review completed
- Research hierarchy corrected
- Art media-disclosure requirements restored
- About content-model count corrected
- Legal and administrative ownership resolved
- Universe Specification Set v1.1 approved
- Previous versions archived

### Approved

- Home Universe v1.1
- Work Universe v1.1
- Research Universe v1.1
- Lab Universe v1.1
- Art Universe v1.1
- Products Universe v1.1
- About Universe v1.1

Current authoritative files: `docs/universes/`. Approval status and governance are recorded in each file's own status block, not duplicated here.

### Superseded but retained

- Universe Specification Set v1.0 — archived at `docs/archive/universes/v1.0/`, not deleted.

### Next milestone

Complete — see **Cross-Universe System Requirements** below, now also complete.

---

## Cross-Universe System Requirements

### Completed

- Cross-universe system requirements extracted
- Cross-document navigation laws consolidated
- Shared accessibility requirements consolidated
- Shared responsive requirements consolidated
- Canonical ownership matrix approved
- Shared state and archive requirements approved
- Design System input requirements defined
- Animation System input requirements defined
- Platform Specification input requirements defined
- Cross-universe quality-assurance framework approved
- Cross-document dependency register approved

### Approved

- `CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md` v1.0

Current authoritative file: `docs/systems/CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md`.

### Next milestone

Complete — `DESIGN_SYSTEM.md` (now v1.1), `ANIMATION_SYSTEM.md` v1.0, and `PLATFORM_SPECIFICATION.md` v1.0 are all Approved. See **Governing Documents** above for the full current list — Platform Vision and Information Architecture are also now both v1.0, Approved / Closed. Current position: see **Current Position** above (M2.4 — Core Visual Primitives complete / verified; next is M2.5 — Action Controls).

---

## Deferred

Explicitly not implemented at this milestone:

- Typography token system and any type-family selection
- Motion tokens and animation — the shared shell works correctly with zero animation
- Responsive grid tokens and layout primitives
- Footer, language switcher, legal/admin utility — none required by an approved source yet
- District-specific secondary/local navigation and breadcrumbs — deferred, not inferred from the route tree
- Real page content of any kind — every route is a structural shell (`<main>` + identifying `<h1>`, plus for Canonical Record routes, optional regions that render nothing until real data exists); canonical record content is owned by Milestone 7
- District-specific Canonical Record fields (e.g. Work's deliverables vs. Art's medium) — same system, different content, owned by Milestone 7
- Listing/filtering/scanning behavior for Comprehensive and Grouping views — requires real records, Milestone 7
- Focus, Comparison, and Overlay states (`PLATFORM_SPECIFICATION.md` §6.7–6.9) — explicitly deferred by the Implementation Plan's own M1.5 definition
- Search, Index, and Contact behavior (querying, filtering, form submission) — `/search`, `/index`, and `/contact` exist only as route shells, now reachable via the shared shell's global navigation
- Return/spatial-memory state (filters, scroll position, comparison state) beyond native browser history
- Universe-specific visual identity or district theming
- SVG illustrations or architectural graphics
- Interaction/E2E testing, content-integrity testing, motion-behavior testing, commerce testing, a full WCAG conformance audit, and performance testing — Foundation's tests are structural smoke checks only (see `docs/implementation/M1.6_TESTING_BASELINE.md`)
- Opacity and layer-order tokens — not approved anywhere in `DESIGN_SYSTEM_v1.0.md` at the time this was deferred; `DESIGN_SYSTEM.md` v1.1 now approves semantic roles for both, exact values still implementation-calibrated; see **Blockers**
- Final values for the 23 tokens `DESIGN_SYSTEM_v1.0.md` gives only as a range or as a name with no value (typography sizes, grid margin/gutter, `color-disabled`, `color-district-accent`, `line-standard`, three of four surface levels) — deliberately declared but empty; see **Design tokens** above and `docs/implementation/M2.1_TOKEN_FOUNDATION.md`'s provenance table
- Typography/grid application, fluid responsive interpolation, Core visual primitives (Field/Plane/Line/Frame/Void/Signal), action/selection/form/state components, WCAG contrast verification against real composed UI — M2.2 through M2.12 (see `docs/implementation/M2.1_TOKEN_FOUNDATION.md` "Deferred Work")

---

## Validation Status

**Milestone 1 gate** — last verified 2026-08-07 (M1.6), all run together on a clean install:

| Command | Result |
|---|---|
| `npm ci` | Pass — `added 445 packages, and audited 446 packages`, `found 0 vulnerabilities`; lockfile consistent |
| `npm run format:check` | Pass — all files match Prettier style |
| `npm run lint` | Pass — no ESLint errors or warnings |
| `npm run typecheck` | Pass — `tsc --noEmit` (new in M1.6) |
| `npm run test:run` | Pass — 98/98 tests, 7/7 files |
| `npm run build` | Pass — all 53 approved routes + `/_not-found` compiled (37 static, 16 dynamic server-rendered on demand) |

This is the full **Milestone 1 — Foundation** gate command set (`IMPLEMENTATION_PLAN.md` §6: "Gate M1 — Foundation Verified"). All twelve Milestone 1 acceptance criteria are met — full assessment in `docs/implementation/M1.6_TESTING_BASELINE.md`. Devdependencies added: `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`, `vite-tsconfig-paths` (test tooling only — no production dependency changed).

**M2.1 — Token Foundation (reconciled)** — last verified 2026-08-07, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass (confirmed empty custom-property declarations `--x: ;` format cleanly) |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **247/247 tests, 8/8 files** (98 carried over from M1.6 + 149 token-contract tests, restructured around resolved-vs-unresolved after the correction) |
| `npm run build` | Pass — confirmed empty custom-property declarations are valid through Turbopack/lightningcss, not just Prettier; route table unchanged (37 static, 16 dynamic, 53 total) |

Full detail, including the provenance table for every token, in `docs/implementation/M2.1_TOKEN_FOUNDATION.md`.
