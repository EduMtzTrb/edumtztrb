# Personal Platform — Project State

**Last updated:** 2026-08-10
**Milestone:** Milestone 1 — Foundation: **Complete / Verified**. Milestone 2 — System Primitives: **Complete / Verified** (Gate M2 met — M2.12 of 12 work packages complete; all fourteen Gate M2 acceptance criteria satisfied, assessed in full in `docs/implementation/M2.12_RESPONSIVE_PRIMITIVE_VERIFICATION.md`). Milestone 3 — Navigation + Records: **Complete / Verified** (Gate M3 met — M3.13 of 13 work packages complete; all thirteen Gate M3 acceptance criteria satisfied, assessed in full in `docs/implementation/M3B_NAVIGATION_DISCOVERY_RECONCILIATION.md`). M3-A — Canonical Architecture (M3.2–M3.6): **Approved / Closed**. M3-B — Navigation + Discovery (M3.7–M3.13): **Approved / Closed**. Milestone 4 — Motion Infrastructure: **Ready / Not Started**.

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
- **M3.1 — Universal Canonical-Record Contract** — **Complete / Verified** (see `docs/implementation/M3.1_UNIVERSAL_CANONICAL_RECORD_CONTRACT.md`) — a new `src/domain/records/` module (`CanonicalRecord.ts`, `registry.ts`, `fixtures.ts`) implements `IMPLEMENTATION_PLAN.md` §7's exact M3.1 field list as one minimal, strongly-typed `CanonicalRecordBase` interface: branded `CanonicalRecordId`/`CanonicalSlug` identity, the six IA §4.2 canonical-owner districts (Home excluded), the IA §13.3 seventeen-value content-type vocabulary, IA §6.2's three contract-owned independent state dimensions (curatorial inclusion, visibility, lifecycle — no generic `status`, no coupling between completion and publication, verified both behaviorally and at compile time), typed directional relationships using only the IA §5.3 six-type vocabulary (ID-referencing, never embedded, never auto-symmetric), and media references with discriminated decorative/informative/complex accessibility metadata (`PLATFORM_SPECIFICATION.md` §30). District-specific extension fields, canonical-route resolution, the classification model, and relationship presentation semantics are explicitly excluded as M3.2–M3.5's separate territory. No runtime-validation dependency was added (TypeScript types plus compile-time `@ts-expect-error` invariant tests only); the "fetch everything then filter client-side" anti-pattern is explicitly documented as unsafe for any future persistence layer. Zero non-domain files were touched — no route, component, stylesheet, or token file changed. 42 new tests (610/610 total). Human visual approval does not apply — this is a non-visual data-contract package, verified by the standard mechanical validation gate.
- **M3.2 — District Extensions** — **Complete / Verified** (see `docs/implementation/M3.2_DISTRICT_EXTENSIONS.md`) — a new `DistrictExtensions.ts` module adds a validated, owner-correlated extension per approved district (`WorkExtension`, `ResearchExtension`, `LabExtension`, `ArtExtension`, `ProductsExtension`, `AboutExtension`) without duplicating any M3.1 universal field. Architecture: each extension carries its own literal `extensionFor` discriminant; a generic `ExtensionForDistrict<D>` mapping (via `Extract`) composes `DistrictRecord<D>` from `CanonicalRecordBase` plus exactly the correlated extension — a Work-owned record cannot receive a Research extension, enforced as a compile error (`DistrictExtensions.type-tests.ts`), not a runtime convention; Home receives no extension type at all. Dependency-free runtime validators (`validateDistrictRecord`/`assertValidDistrictRecord`) check owner/extension correlation, reject unknown/cross-district keys, validate enum membership (Lab's ten-state experiment lifecycle, Products' thirteen-state commercial lifecycle, Art's six-state preservation vocabulary, Research's activity state), and validate nested shapes (`ProductPriceBasis`, About's four-part `Value` structure). Domain-specific state per district (IA §6.2.D) stays precisely named and fully separate from universal lifecycle/visibility — proven directly: a `fixtureLabRecordWithExtension` with `experimentState: "abandoned"` remains `lifecycle: "failed"` and fully `visibility: "public"`. No commercial field (price/stock/checkout/cart) can appear on Work/Research/Lab/Art extensions — enforced at the source-contract level. No classification vocabulary (practice area, series, territory, collection, family) was built — explicitly deferred to M3.4; no new relationship type was invented — district-vocabulary richness maps onto M3.1's existing six approved IA §5.3 types. Zero non-domain files were touched. 44 new tests (654/654 total). Human visual approval does not apply.
- **M3.3 — Canonical-Route Resolver** — **Complete / Verified** (see `docs/implementation/M3.3_CANONICAL_ROUTE_RESOLVER.md`) — a new `RouteResolver.ts` module (`resolveCanonicalRoute`, `buildCanonicalRouteRegistry`, `RESERVED_ROUTE_SEGMENTS`) guarantees one canonical public route per substantive record across all six owner districts, computed from `ownerDistrict`/`slug`/`contentType` alone — proven structurally (the function body never references `visibility`/`lifecycle`/`curatorialInclusion`/`disciplines`/`themes`/`featured`) and behaviorally (route invariance tested across all of those, plus Lab success/failure state and Products availability specifically). The five slug-routed districts resolve to `/{district}/{slug}`; a district-specific reserved-segment table (reproduced verbatim from IA §11.3–§11.7/Platform Spec §5.3–§5.7) rejects any slug that would collide with a static sibling route (e.g. `/work/selected`) rather than silently resolving the conflict. About — audited carefully against this task's explicit "do not invent `/about/{slug}`" instruction — resolves to the one fixed `/about/profile` route regardless of its own slug, reasoned from IA §13.3's single "Profile Record" content type, M3.2's own decision to nest About's substructure inside one record, and both About Universe §7 and Platform Spec §5.8's explicit "in-page sections" allowance; a second About record is therefore a genuine duplicate-route error, rejected. Route identity stays fully separate from public-delivery authorization — a private/excluded record still resolves a valid route; M3.1's `isPubliclyDiscoverable`/`isDirectlyAccessible` remain the only delivery-eligibility boundary, untouched. Archive, grouping/lens/filter, and classification membership are all proven unable to affect canonical identity. No `src/app/**` file needed to change — the existing M1.3 route tree was already fully compliant with IA §11/Platform Spec §5. 42 new tests (696/696 total). Human visual approval does not apply.
- **M3.4 — Classification Model** — **Complete / Verified** (see `docs/implementation/M3.4_CLASSIFICATION_MODEL.md`) — a new `ClassificationModel.ts` module supports discipline, theme, year/period, type, district grouping (collection/series/territory), and contribution/role, with a controlled term catalog (`createClassificationCatalog`, duplicate-ID rejection) replacing any possibility of an uncontrolled tag cloud. Three structurally distinct dimension kinds: canonical-derived facets (`districtFacet`/`contentTypeFacet`/`yearFacet`, computed from M3.1 fields, never separately stored), state facets (`lifecycleFacet`/`visibilityFacet`/`curatorialInclusionFacet`, each tagged with its own source, never merged into one generic `status`), and catalog-referenced terms (validated for unknown-term, wrong-dimension, wrong-district-scope, and duplicate-reference rejection). Exactly the five IA §8.3/§9.2-approved global lens dimensions are exposed (district, content type, discipline, theme, year) — collection/series/territory/contribution-role are deliberately never global lenses. M3.1's `disciplines`/`themes` fields were strengthened with validation only, not retyped — the smallest backward-compatible change, keeping M3.1 untouched. Products' `productFamily` (M3.2, structural) is deliberately not re-modeled as a classification dimension; Products' actual M3.4-owned concern is `collection` (Product Hierarchy Level 3). Ownership and canonical-route invariance under classification changes are both proven directly, the latter via a live integration test against M3.3's `resolveCanonicalRoute`. No Index/Search/Filter UI or query logic exists — classification truth only. Zero coupling introduced into M3.1/M3.2/M3.3 — all three remain byte-for-byte unchanged. 33 new tests (729/729 total). Human visual approval does not apply.
- **M3.5 — Relationship Model** — **Complete / Verified** (see `docs/implementation/M3.5_RELATIONSHIP_MODEL.md`) — a new `RelationshipModel.ts` module completes M3.5 on top of M3.1's existing `CanonicalRelationshipReference` structure (source implicit, `targetId`, `type`, optional `priority`) rather than building a second relationship system: `validateRelationships` rejects self-loops, unresolved targets, and duplicate (destination + type) edges; `resolveRelationship` composes M3.1's registry with M3.3's `resolveCanonicalRoute` to resolve a canonical destination fresh every time (never a stored route string); `deriveRelationshipLabel` derives forward/reverse visible labels from the stored type, drawing on richer Universe-document editorial vocabulary as label text only, never as new stored types — still exactly the six approved IA §5.3 types. `listIncomingRelationships` proves reciprocal display can be derived by scanning outgoing edges, with no persisted duplicate inverse. Ownership invariance, the Research/Lab cyclical relationship, Lab's retained experimental history after maturing into Work, and Art/Products separation are all proven directly with fixtures. No coupling to `ClassificationModel.ts`; no visual/Trace/Signal code; no Search/Index logic. `CanonicalRecord.ts`, `registry.ts`, `DistrictExtensions.ts`, `RouteResolver.ts`, and `ClassificationModel.ts` all remain byte-for-byte unchanged. 39 new tests (768/768 total). Human visual approval does not apply.
- **M3.6 — Lifecycle and Archive Model** — **Complete / Verified** (see `docs/implementation/M3.6_LIFECYCLE_ARCHIVE_MODEL.md`) — a new `LifecycleArchiveModel.ts` module separates public state, internal publication state, district-specific lifecycle, and archive visibility, reusing M3.1's `isPubliclyDiscoverable`/`isDirectlyAccessible` directly rather than re-implementing them. Internal publication state (`draft`/`in-review`/`ready-to-publish`/`published`/`needs-revision`, per `CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md` §14) is modeled as a side-table (`InternalPublicationRecord`, keyed by record ID) entirely outside `CanonicalRecordBase`, making leakage into public projection structurally impossible rather than merely filtered. `isArchived` derives purely from `lifecycle` (no second stored archive field); `isPublicArchiveEligible`/`selectPublicArchive`/`selectPublicComprehensiveView` prove `/work/all` and Archive are genuinely different, non-interchangeable selections (Archive ⊊ comprehensive view). `toPublicSafeProjection` strips M3.1's `editorial` field. Canonical identity, M3.3 route, M3.5 relationships, and M3.4 classifications are all proven unaffected by archiving. Products discontinuation, Lab experiment state, and Research activity state are all proven independent of universal lifecycle. No state-transition engine was built — deliberately, per explicit scope. `CanonicalRecord.ts`, `registry.ts`, `DistrictExtensions.ts`, `RouteResolver.ts`, `ClassificationModel.ts`, and `RelationshipModel.ts` all remain byte-for-byte unchanged; no M2.11 static-state component was touched. 43 new tests (811/811 total). Human visual approval does not apply.
- **M3-A — Canonical Architecture Reconciliation** — **Approved / Closed** (see `docs/implementation/M3A_CANONICAL_ARCHITECTURE_RECONCILIATION.md`) — a batch audit confirming M3.2–M3.6 (District Extensions, Canonical-Route Resolver, Classification Model, Relationship Model, Lifecycle and Archive Model), built on M3.1's unchanged foundation, form one coherent canonical architecture: identity, ownership, route, classification, relationship, and state/archive invariants all verified across every layer, including a new cumulative integration test (`tests/domain/m3a-canonical-architecture.test.ts`, 10 tests) tracing one fixture record through the complete pipeline and proving cross-district lineage (Research → Lab → Work → Research) resolves coherently with preserved ownership and zero route collisions. `CanonicalRecord.ts`, `registry.ts`, and `fixtures.ts` (M3.1) confirmed byte-for-byte unchanged since their own commit (`60ab70b`) via direct diff. Six per-file test-count inconsistencies were found across the M3.1, M3.2, and M3.5 reports (each caused by `it.each` runtime expansion undercounted by a static line count) and corrected — every package-level total (42/44/42/33/39/43) was independently re-verified against live test runs and confirmed already correct; no implementation defect was found, no code was changed. 10 new tests (821/821 total). Human visual approval does not apply.
- **M3.7 — Global Navigation** — **Complete / Verified** (see `docs/implementation/M3.7_GLOBAL_NAVIGATION.md`) — audited the existing M1.4 shell (`AppShell.tsx`, `GlobalNav.tsx`, both confirmed byte-for-byte unchanged): seven permanent district links, a structurally separate Utilities landmark, correct active-district state on root/deep/dynamic/utility routes, and direct entry were all already correct and required no reimplementation. Resolved the one item M2.2/M2.3 explicitly deferred here — responsive `GlobalNav` wrapping — with a CSS-only, mobile-first fix in `src/styles/shell.css`: the header stacks Primary above Utilities as two unambiguous blocks by default, reverting to the pre-existing single-row layout at the already-approved 768px breakpoint; no JavaScript menu, no new breakpoint, no motion. The shared orientation plane is confirmed already satisfied by the existing `aria-current` mechanism; deep structural orientation remains M3.9's separate scope. 7 new tests (828/828 total). The M3-B integrated human browser review (externally supplied, covering all seven M3.7–M3.13 packages together) has since passed — see `docs/implementation/M3B_NAVIGATION_DISCOVERY_RECONCILIATION.md` "Integrated Human Review Result."
- **M3.8 — District Navigation** — **Complete / Verified** (see `docs/implementation/M3.8_DISTRICT_NAVIGATION.md`) — one shared system (`districtNavigation.ts` configuration + one `DistrictNav.tsx` component + one `district-nav.css` stylesheet), not six incompatible components, wired into all six district `layout.tsx` files. Work/Research/Lab/Art/Products follow the shared overview→curated→groupings→comprehensive conceptual order using only routes `PLATFORM_SPECIFICATION.md` §5.3–§5.7 already approves; About uses its own distinct profile/practice/experience/education/capabilities/recognition/current-focus section structure rather than a forced false symmetry. Several grouping routes (Work's practice areas/collections, Research's themes, Art's series/medium) are dynamic-only with no static index page and were deliberately NOT given an invented top-level nav destination. No local Search item was added to any district — global Search already covers that need. Active-state semantics deliberately differ from `GlobalNav` (exact-match, not prefix-match — a district-nav item is a sibling destination, not a section-enclosing link). `GlobalNav.tsx`/`AppShell.tsx` remain untouched. 17 new tests (845/845 total).
- **M3.9 — Breadcrumb / Orientation System** — **Complete / Verified** (see `docs/implementation/M3.9_BREADCRUMB_ORIENTATION.md`) — one shared `OrientationContext` model (`orientation.ts`) with three entry points (`orientationForRecord`, `orientationForSection`, `orientationForUtility`) covering every page role, plus one semantic `Breadcrumb.tsx` component (`<nav aria-label="Breadcrumb">` + `<ol>`, current item never self-linked). District overview/comprehensive routes are read directly from M3.8's own `DISTRICT_NAVIGATION` — no duplicate route table. Parent grouping is contextual (never canonical ownership); a grouping with no real static destination renders as plain text rather than an invented route. Active-lens/filter fields are typed slots only — no filter logic yet (M3.11). No universal previous/next was added. Proven against M3.1's existing fixtures; not yet wired into any real page (deferred to M3.13, which will demonstrate it end-to-end under the same development-only fixture discipline M3.10/M3.12 use). 23 new tests (868/868 total).
- **M3.10 — Index** — **Complete / Verified** (see `docs/implementation/M3.10_INDEX.md`) — a new `IndexModel.ts` (`queryIndex`) consumes M3.6's own `selectPublicComprehensiveView` directly (never a second registry/taxonomy), narrowed by exactly the five closed `GlobalLensDimension` values M3.4 already approved; every result's canonical link is M3.3's own `resolveCanonicalRoute`, resolved fresh. All six approved Index routes (`/index` + five lens families) now render real content via a new `IndexResults.tsx`, reusing M2.7's `IndexRecord` and M2.11's `EmptyState`/`NoResultState` unmodified. A shared `devFixtureSource.ts` gates M3.1's fixture corpus behind `?fixture=m3b` **and** `NODE_ENV !== "production"` (checked server-side — a client cannot force it in production), with an unmistakable on-page notice when active; this is the one fixture source M3.12 — Search will also reuse. `PageShell.tsx`'s `GroupingViewShell`/`UtilityPageShell` gained an additive, backward-compatible optional `children` prop. `/index` moved from static to dynamic (37→36 static, 16→17 dynamic; 53 routes total, unchanged) — an explicit, documented, unavoidable consequence of reading `searchParams`, not a silent regression. 36 new tests (904/904 total).
- **M3.11 — Filters** — **Complete / Verified** (see `docs/implementation/M3.11_FILTERS.md`) — a new `FilterModel.ts` (pure functions: parse/apply/describe criteria, derive available options from the current view only, build toggle/remove/reset URLs) wired into `/index` via `FilterBar.tsx`/`ActiveFilters.tsx`. Deliberately uses plain `next/link`s with `aria-current="true"` (the same idiom `GlobalNav`/`DistrictNav`/`Breadcrumb` already use) rather than M2.6's button-based `FilterToggle`/`RemovableFilter` — a considered, documented substitution, since those assume client `onClick`/`onRemove` state and this task explicitly prefers URL-shareable persistence (§E3); `aria-pressed` is also invalid ARIA on a link. Filter state lives entirely in the query string, preserving the `fixture` flag and never touching canonical route/identity. Combined (AND) criteria, visible active state, a working Reset, and non-arbitrary recomposition are all proven directly. While integrating, found and fixed a genuine M3.10 defect: `IndexResults`' empty-state branch used `result.lens` alone to choose between "nothing exists" and "no match," missing the filter-narrowed-to-zero case — corrected with an explicit `scopeDescription` prop, all five M3.10 lens routes updated to pass their own description, existing M3.10 tests unaffected. 40 new tests (944/944 total).
- **M3.12 — Search** — **Complete / Verified** (see `docs/implementation/M3.12_SEARCH.md`) — `SearchModel.ts` (`searchRecords`) consumes the exact same `selectPublicComprehensiveView` source `IndexModel.ts` already uses, proven with a direct Search/Index corpus-parity test (this task's own explicit §F1 requirement) — no Search-specific record set or taxonomy exists. Deterministic, explainable ranking (exact title → title contains → title word match → summary → discipline/theme → relationship context), no search-engine dependency added. Reuses M3.10's `resolvePublicRecordSource` (`?fixture=m3b` + server-side `NODE_ENV` gate) unchanged — one shared fixture source for both Index and Search. `/search` is now a real, native `GET` form (`SearchForm.tsx`/`SearchResults.tsx`, reusing M2.10's `TextField`, M2.5's `Action`, M2.7's `IndexRecord`, M2.11's `EmptyState`/`NoResultState` unmodified) — zero client JavaScript required. A real defect was found and fixed during testing: an early token-match heuristic matched on any shared query word, causing every "Fixture ..." titled record to match any multi-word query in the shared fixture corpus — corrected to require every query token to match. `/search` moves from static to dynamic (35 static / 18 dynamic; 53 routes total, unchanged), the same direct `searchParams` consequence M3.10 already established for `/index`. 39 new tests (983/983 total).
- **M3.13 — Direct-Entry Orientation** — **Complete / Verified** (see `docs/implementation/M3.13_DIRECT_ENTRY_ORIENTATION.md`) — completes M3-B. A new `DirectEntryOrientation.tsx` composes M3.9's own `Breadcrumb`/orientation model directly (no second implementation) into a truthful "next actions" list (district overview, comprehensive access where it exists, Index, Search — never a fabricated "Return to where you came from"). Wired into all 5 canonical-record entry routes, all 6 grouping routes, all 5 archive/comprehensive routes, all 8 About routes, and all 5 Index routes plus Search — every deep route rendered cold (fresh params, no prior render) correctly shows district identity, current record/section, genuine (never fabricated) parent, and truthful next actions. `PageShell.tsx`'s `DistrictOverviewShell`/`CuratedViewShell`/`ComprehensiveViewShell` gained the same additive, backward-compatible `children` prop `GroupingViewShell`/`UtilityPageShell` already had (M3.10). Extended `orientationForUtility` with an optional `parentGrouping` (a genuine gap found while wiring Index lens routes — a utility route nested under another utility, e.g. an Index lens under `/index`, had no way to express that). Route count unchanged from M3.12 (35 static / 18 dynamic) — no route in this package newly reads `searchParams`. 16 new tests (1008/1008 total).
- **M3-B — Navigation + Discovery Reconciliation** — **Approved / Closed** (see `docs/implementation/M3B_NAVIGATION_DISCOVERY_RECONCILIATION.md`) — a batch audit confirming M3.7–M3.13, built on M3-A's frozen canonical architecture (M3.1–M3.6, confirmed byte-for-byte unchanged throughout), form one coherent navigation/discovery system: Search/Index corpus parity independently reconfirmed at full-fixture-corpus scale, canonical-link integrity (zero route collisions) reconfirmed via `buildCanonicalRouteRegistry`, and a cumulative integration suite (`tests/integration/m3b-navigation-discovery-journeys.test.tsx`, 10 tests) exercising all six required cross-package journeys (Home→Work→comprehensive access; Index lens/filter→canonical destination; Search→canonical destination; direct deep link→orientation; Research→Lab relationship resolution; archived-public record reachable identically via Index and Search). The externally supplied integrated human browser review (Claude did not independently observe the rendered interface) then PASSED across all seven packages with no further calibration required — recorded in full in the reconciliation document's "Integrated Human Review Result." All 13 Gate M3 acceptance criteria now PASS with both mechanical evidence and human-review confirmation. 10 new tests (1018/1018 total).
- **Gate M3 — Navigation + Records Verified** — Milestone 3 (M3.1–M3.13, all thirteen work packages) is formally closed. See `docs/implementation/M3B_NAVIGATION_DISCOVERY_RECONCILIATION.md` "Gate M3 — Final Audit" for the full thirteen-criterion evidence table (mechanical evidence + integrated human review, per criterion).
- **Platform Vision — Final Approval** — `PLATFORM_VISION.md` closed at **v1.0, Approved / Closed** (8 August 2026): central brand idea, personal brand identity, positioning, audience hierarchy, experience goals, design principles, curatorial threshold, role of commerce, and long-term evolution are now locked governing authority (see **Governing Documents** below)
- **Information Architecture — Final Approval** — `INFORMATION_ARCHITECTURE.md` closed at **v1.0, Approved / Closed** (8 August 2026): canonical ownership, district boundaries, typed directional relationships, the public-inclusion/state model, Search/Index, lenses/filters, archive semantics, route hierarchy, and the minimum canonical-record contract are now locked governing authority
- **Design System — v1.1 Final Approval** — `DESIGN_SYSTEM.md` closed at **v1.1, Approved / Closed** (9 August 2026), superseding v1.0: adds the identity system (Precision without finality, Inhabited Threshold, Typographic Voice, Signal, Trace Language, Controlled Exception), the governing compositional grammar, district-expression rules, and a reconciled Core System including semantic depth/layer-order/opacity models — see **Blockers** below for its effect on the opacity/layer-order item
- **Governing Documentation Reconciliation** — commit `bb88f62417b9b3f14a92d8c25183d43a19be3be2` (`docs: reconcile governing document names and authority`, 9 August 2026): restored stable bare canonical filenames for the core governing documents, archived superseded proposals and the superseded Design System v1.0, and reconciled `docs/GOVERNING_DOCUMENTS.md`

## Current Phase

Implementation — Foundation (Milestone 1 of 9): **Complete / Verified**. Milestone 2 — System Primitives (12 of 12 work packages): **Complete / Verified — Gate M2 met**. Milestone 3 — Navigation + Records (13 of 13 work packages): **Complete / Verified — Gate M3 met**. M3-A — Canonical Architecture (M3.2–M3.6): **Approved / Closed**. M3-B — Navigation + Discovery (M3.7–M3.13): **Approved / Closed**. Milestone 4 — Motion Infrastructure: **Ready / Not Started**. Governance track: Platform Vision, Information Architecture, and Design System are now all closed at their current versions (see **Governing Documents**).

## Current Position

Milestone 3 — Navigation + Records is complete. The externally supplied M3-B integrated human browser review (Claude did not independently observe the rendered interface) PASSED across all seven M3.7–M3.13 packages with no further calibration required (see `docs/implementation/M3B_NAVIGATION_DISCOVERY_RECONCILIATION.md` "Integrated Human Review Result"). M3.7–M3.13 are each now individually Complete / Verified (their own implementation reports each carry a new "Integrated Human Review" section recording the accepted findings). M3-B — Navigation + Discovery is **Approved / Closed**. All 13 Gate M3 acceptance criteria PASS with both mechanical evidence and human-review confirmation — **Gate M3 — Navigation + Records Verified**. Milestone 3 — Navigation + Records (M3.1–M3.13, all thirteen work packages) is formally closed.

M3-A's canonical architecture (M3.1–M3.6) was reconfirmed stable and unmodified throughout this closure — not reopened, no contradiction found.

Sequence completed: Governance Synchronization → Implementation-Readiness Reconciliation → M2.2 — Typography → M2.3 — Spacing and Grid → M2.4 — Core Visual Primitives → M2.5 — Action Controls → M2.6 — Selection / Filter Controls → M2.7 — Record Family → M2.8 — Media Family → M2.9 — Metadata Rail → M2.10 — Form Family → M2.11 — Shared Static States → M2.12 — Responsive Primitive Verification → **Gate M2 — System Primitives Verified** → M3.1 — Universal Canonical-Record Contract → M3.2 — District Extensions → M3.3 — Canonical-Route Resolver → M3.4 — Classification Model → M3.5 — Relationship Model → M3.6 — Lifecycle and Archive Model → **M3-A — Canonical Architecture: Approved / Closed** → M3.7 — Global Navigation → M3.8 — District Navigation → M3.9 — Breadcrumb / Orientation System → M3.10 — Index → M3.11 — Filters → M3.12 — Search → M3.13 — Direct-Entry Orientation → **M3-B — Navigation + Discovery: Approved / Closed** → **Gate M3 — Navigation + Records Verified**.

Milestone 3 complete. Gate M3 verified. Milestone 4 — Motion Infrastructure is ready to begin.

**Next: M4.1 — Motion Tokens.** M4.1 has not started — Milestone 4's dependencies (Gates M1–M3, `ANIMATION_SYSTEM.md v1.0`) are all now satisfied at the documentation/state level, making Milestone 4 **Ready / Not Started**. No motion tokens, transition utilities, Focus manager, overlay manager, Return/spatial-memory store, browser-history work, or comparison/Trace prototypes have been created — those belong to future M4 implementation tasks, out of scope for this closure pass.

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

**M3.1 — Universal Canonical-Record Contract** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass — includes `src/domain/records/CanonicalRecord.type-tests.ts`'s compile-time invariant checks |
| `npm run test:run` | Pass — **610/610 tests, 64/64 files** (568 carried over from Gate M2 + 42 new M3.1 tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic); no route/component/style file touched |

Full detail in `docs/implementation/M3.1_UNIVERSAL_CANONICAL_RECORD_CONTRACT.md`.

**M3.2 — District Extensions** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass — includes `DistrictExtensions.type-tests.ts`'s compile-time invariant checks |
| `npm run test:run` | Pass — **654/654 tests, 66/66 files** (610 carried over from M3.1 + 44 new M3.2 tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic); no route/component/style file touched |

Full detail in `docs/implementation/M3.2_DISTRICT_EXTENSIONS.md`.

**M3.3 — Canonical-Route Resolver** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **696/696 tests, 68/68 files** (654 carried over from M3.2 + 42 new M3.3 tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic); no route/component/style file touched |

Full detail in `docs/implementation/M3.3_CANONICAL_ROUTE_RESOLVER.md`.

**M3.4 — Classification Model** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **729/729 tests, 70/70 files** (696 carried over from M3.3 + 33 new M3.4 tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic); no route/component/style file touched |

Full detail in `docs/implementation/M3.4_CLASSIFICATION_MODEL.md`.

**M3.5 — Relationship Model** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **768/768 tests, 72/72 files** (729 carried over from M3.4 + 39 new M3.5 tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic); no route/component/style file touched |

Full detail in `docs/implementation/M3.5_RELATIONSHIP_MODEL.md`.

**M3.6 — Lifecycle and Archive Model** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **811/811 tests, 74/74 files** (768 carried over from M3.5 + 43 new M3.6 tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic); no route/component/style file touched |

Full detail in `docs/implementation/M3.6_LIFECYCLE_ARCHIVE_MODEL.md`.

**M3-A — Canonical Architecture Reconciliation** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **821/821 tests, 75/75 files** (811 carried over from M3.6 + 10 new cumulative integration tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic); no route/component/style file touched |

Full detail in `docs/implementation/M3A_CANONICAL_ARCHITECTURE_RECONCILIATION.md`.

**M3.7 — Global Navigation** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **828/828 tests, 76/76 files** (821 carried over from M3-A + 7 new M3.7 tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic); no route file touched, `shell.css` completed |

Full detail in `docs/implementation/M3.7_GLOBAL_NAVIGATION.md`.

**M3.8 — District Navigation** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **845/845 tests, 79/79 files** (828 carried over from M3.7 + 17 new M3.8 tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic) |

Full detail in `docs/implementation/M3.8_DISTRICT_NAVIGATION.md`.

**M3.9 — Breadcrumb / Orientation System** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **868/868 tests, 82/82 files** (845 carried over from M3.8 + 23 new M3.9 tests) |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic) |

Full detail in `docs/implementation/M3.9_BREADCRUMB_ORIENTATION.md`.

**M3.10 — Index** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **904/904 tests, 87/87 files** (868 carried over from M3.9 + 36 new M3.10 tests) |
| `npm run build` | Pass — 53 routes total; 36 static / 17 dynamic (`/index` moved from static to dynamic — explicit, documented, unavoidable consequence of reading `searchParams` for the dev-fixture flag) |

Full detail in `docs/implementation/M3.10_INDEX.md`.

**M3.11 — Filters** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **944/944 tests, 93/93 files** (904 carried over from M3.10 + 40 new M3.11 tests) |
| `npm run build` | Pass — 53 routes total, 36 static / 17 dynamic (unchanged from M3.10) |

Full detail in `docs/implementation/M3.11_FILTERS.md`.

**M3.12 — Search** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **983/983 tests, 100/100 files** (944 carried over from M3.11 + 39 new M3.12 tests) |
| `npm run build` | Pass — 53 routes total; 35 static / 18 dynamic (`/search` moved from static to dynamic — same direct `searchParams` consequence as M3.10's `/index`) |

Full detail in `docs/implementation/M3.12_SEARCH.md`.

**M3.13 — Direct-Entry Orientation** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **1008/1008 tests, 104/104 files** |
| `npm run build` | Pass — 53 routes total, 35 static / 18 dynamic (unchanged from M3.12) |

Full detail in `docs/implementation/M3.13_DIRECT_ENTRY_ORIENTATION.md`.

**M3-B — Navigation + Discovery Reconciliation** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **1018/1018 tests, 105/105 files** (1008 carried over from M3.13 + 10 new Phase H integration tests) |
| `npm run build` | Pass — 53 routes total, 35 static / 18 dynamic (unchanged from M3.13) |

Full detail in `docs/implementation/M3B_NAVIGATION_DISCOVERY_RECONCILIATION.md`.

**Gate M3 — Navigation + Records Verified (final closure)** — last verified 2026-08-10, no dependency changed so `npm ci` was not re-run; this is the documentation-only closure pass recording the externally supplied M3-B integrated human review and the final Gate M3 audit — no application implementation changed:

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **1018/1018 tests, 105/105 files** (unchanged from the pre-closure baseline — confirms this pass changed no test/implementation file) |
| `npm run build` | Pass — 53 routes total, 35 static / 18 dynamic (unchanged) |

This is the full **Milestone 3 — Navigation + Records** gate command set (`IMPLEMENTATION_PLAN.md` §7/§8: "Gate M3 — Navigation + Records Verified"). All thirteen Milestone 3 acceptance criteria are met — full evidence table in `docs/implementation/M3B_NAVIGATION_DISCOVERY_RECONCILIATION.md` "Gate M3 — Final Audit".
