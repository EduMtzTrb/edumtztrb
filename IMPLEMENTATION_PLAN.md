# Personal Platform — Implementation Plan

**Document:** `IMPLEMENTATION_PLAN.md`  
**Version:** 1.0  
**Status:** Approved  
**Approved:** 7 August 2026  
**Sequence position:** Architecture and Systems Specification → **Implementation Planning** → Implementation → Verification → Release  
**Document role:** Execution plan translating the approved Platform Specification into sequential, independently verifiable build work  
**Implementation owner:** Claude Code or another implementation team  
**Primary implementation reference:** `PLATFORM_SPECIFICATION.md v1.0`

---

# 1. Purpose

`IMPLEMENTATION_PLAN.md v1.0` defines the build order for the Personal Platform.

It answers:

> **How should the approved platform be implemented in small, sequential, testable, independently verifiable work packages without allowing implementation to become a second design process?**

The governing rule is:

> **Implementation planning translates approved decisions into build order. It does not create new product or design decisions.**

This document does not redesign Platform Vision, Information Architecture, any Universe, the Design System, the Animation System, the Platform Specification, content ownership, district identity, visual hierarchy, navigation law, motion meaning, or product scope.

Its job is to decompose approved decisions into executable work.

---

# 2. Authority and Boundaries

## 2.1 Governing source set

Implementation follows the approved source hierarchy established by `PLATFORM_SPECIFICATION.md v1.0`:

1. `Project Instructions.txt`
2. `PLATFORM_VISION.md v1.0`
3. `INFORMATION_ARCHITECTURE.md v1.0`
4. authoritative Universe Specification Set
5. `CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md v1.0`
6. `DESIGN_SYSTEM.md v1.0`
7. `ANIMATION_SYSTEM.md v1.0`
8. `PLATFORM_SPECIFICATION.md v1.0`
9. this `IMPLEMENTATION_PLAN.md v1.0`

This document governs execution sequence, not upstream meaning.

## 2.2 Conflict rule

If implementation discovers a contradiction between approved sources:

1. stop the affected work package;
2. record the conflict;
3. identify the authoritative domains involved;
4. do not choose the easiest interpretation;
5. resolve the conflict in the governing documentation;
6. resume only after the requirement is explicit.

A technical limitation is not permission to redesign an approved requirement.

## 2.3 Technical discretion

The Platform Specification intentionally does not choose a frontend framework, CMS, database, hosting provider, commerce provider, search engine, animation library, analytics stack, authentication system, asset CDN, or translation platform.

Those are implementation choices and may be selected when necessary, provided they preserve approved routes, canonical identity, visual rules, motion rules, accessibility, responsive intent, content ownership, Search/Index behavior, Return, and spatial memory.

Material technical choices should be recorded as implementation decisions or ADRs.

---

# 3. Implementation Principles

## 3.1 Small work packages

No implementation request should ask Claude Code to “build the platform,” “build the district,” or “finish the website” as one task.

Every work package must be:

- narrowly scoped;
- independently testable;
- reversible where practical;
- reviewable in isolation;
- tied to approved requirements;
- complete enough to leave the repository in a valid state.

## 3.2 Gate before progression

A milestone completes only when its acceptance criteria pass and the result is **Verified**.

Normal progression:

> **Approved → Implemented → Verified**

If a requirement cannot be satisfied:

> **Blocked**

If implementation proposes behavior that differs from approved behavior:

> **Proposal**

before any change can become Approved.

## 3.3 Static completeness before enhancement

Structure, hierarchy, navigation, state, and accessibility are implemented before atmospheric motion.

The static interface must remain complete without animation.

## 3.4 Canonical model before duplicated presentation

Records, routes, relationships, classifications, status, and archive behavior are implemented before district-specific content presentation expands.

No district may solve missing data architecture by creating local copies.

## 3.5 Representative prototype before system-wide reuse

Complex shared mechanics are proven once before broad application.

This applies especially to Focus, overlay, Return, spatial memory, district passage, comparison, Trace, reduced motion, Search, filters, and commerce boundaries.

## 3.6 Real content only

Implementation must not invent projects, research, experiments, artworks, products, prices, availability, biography, collaborators, legal text, business details, or translations.

Fixtures may exist for testing but must be clearly identified as fixtures and never presented as real public content.

## 3.7 Native behavior first

Native browser scrolling, Back/Forward, keyboard navigation, focus, direct URLs, touch input, interruption, and latest user intent remain baseline behavior.

Enhancement must not replace reliable native behavior with fragile simulation.

---

# 4. Global Completion Model

Every milestone below defines:

1. objective;
2. dependencies;
3. files/systems affected;
4. what may be implemented;
5. what must not be changed;
6. acceptance criteria;
7. tests;
8. completion gate.

Each work package should normally be a separate implementation task and, where practical, a separate commit.

---

# 5. Master Sequence

1. **Foundation** — repository structure, routing, shared shell, environment, testing baseline.
2. **System Primitives** — typography, spacing, grid, surfaces, controls, states, media, focus-ready structures, accessibility primitives.
3. **Navigation + Records** — canonical routing, global/district navigation, Search, Index, relationships, archives.
4. **Motion Infrastructure** — approved motion roles, reduced motion, spatial memory, Focus, overlay, Return.
5. **District Framework** — shared district shell plus Home, Work, Research, Lab, Art, Products, About.
6. **Utilities** — Contact, language when activated, legal/admin, forms, confirmations, Products transaction boundaries.
7. **Content Integration** — real records, metadata, media, lifecycle states, relationships.
8. **QA + Hardening** — accessibility, responsive behavior, performance, links, archives, state recovery, cross-district continuity.
9. **Release Readiness** — production build, deployment checks, approved analytics/privacy activation if any, rollback, production verification.

No later milestone may be treated as complete while an earlier required gate remains failed.

---

# 6. Milestone 1 — Foundation

## Objective

Create a stable technical baseline supporting the approved platform without implementing district-specific design.

## Dependencies

- approved `PLATFORM_SPECIFICATION.md v1.0`;
- approved route architecture;
- approved global district labels;
- approved Design System/accessibility targets;
- access to the implementation repository.

Final CMS, content, payment provider, analytics, production hosting, and legal wording are not required yet.

## Files / systems affected

Repository configuration, application entry, route definitions, root layout, global shell, global navigation, errors/not-found, test configuration, lint/typecheck/build configuration, environment documentation.

Exact paths depend on the existing stack.

## Work packages

### M1.1 — Repository audit

Record:

- repository root and branch;
- framework/runtime;
- package manager;
- build/test/lint/typecheck commands;
- current routes;
- existing design tokens;
- existing content/data structures;
- existing deployment configuration;
- unrelated working-tree changes.

**Output:** implementation baseline note or ADR.

### M1.2 — Environment baseline

Establish the minimum reproducible environment:

- runtime declaration;
- lockfile consistency;
- environment-variable example;
- local setup instructions;
- deterministic build scripts.

Do not add speculative services.

### M1.3 — Route skeleton

Implement:

- `/`
- `/work`
- `/research`
- `/lab`
- `/art`
- `/products`
- `/about`
- `/search`
- `/index`
- `/contact`

Add approved subroute shells only where useful.

Semantic placeholders are allowed; fabricated public content is not.

### M1.4 — Shared application shell

Implement:

- application/document root;
- main content landmark;
- global navigation;
- global utilities access;
- active district context;
- stable orientation layer.

The shell must support direct entry to every route.

### M1.5 — Semantic page shells

Create reusable shells for:

- world threshold;
- district overview;
- curated view;
- comprehensive view;
- grouping view;
- canonical record;
- utility page.

Focus, comparison, and overlay behavior come later.

### M1.6 — Testing baseline

Establish executable checks for:

- build;
- static analysis;
- type checking where applicable;
- unit/component testing where applicable;
- route smoke tests;
- basic accessibility smoke checks.

## What may be implemented

Technical repository structure, routes, shell components, navigation semantics, testing infrastructure, environment configuration, not-found/error boundaries, clearly labeled fixtures.

## What must not be changed

Do not rename districts, change canonical route identity, redesign navigation, add district-specific visual systems, invent content, add commerce, add environmental animation, add a new taxonomy, introduce authentication without an approved need, or create duplicate canonical routes.

## Acceptance criteria

1. Application installs/runs from documented instructions.
2. Production build passes.
3. Every approved top-level route resolves.
4. Direct route entry works.
5. Browser Back/Forward work.
6. Global district labels are correct.
7. Utilities remain distinct from districts.
8. Every route has a semantic main region.
9. Global navigation is keyboard reachable.
10. No route depends on hover or motion.
11. No fixture is presented as real.
12. Baseline tests pass.

## Tests

Build, static checks, route smoke, 404, keyboard smoke, direct-entry, browser-history.

## Completion gate

**Gate M1 — Foundation Verified.**

---

# 7. Milestone 2 — System Primitives

## Objective

Translate `DESIGN_SYSTEM.md v1.0` into reusable static implementation foundations before district-specific composition.

## Dependencies

- Gate M1;
- `DESIGN_SYSTEM.md v1.0`;
- WCAG 2.2 AA target.

## Files / systems affected

Tokens, typography, spacing, grids, fields/planes/lines/frames/voids/signals, controls, records, media, metadata, forms, states, responsive utilities, accessibility utilities.

## Work packages

### M2.1 — Token foundation

Implement semantic token families for typography, spacing, grid, neutral/semantic color, line weight, radius, opacity, layer order, focus, surfaces, borders, actions, states, and district accents.

### M2.2 — Typography

Implement:

- Inter;
- IBM Plex Mono;
- Display;
- H1/H2/H3;
- Body Large/Body/Body Small;
- Caption;
- Metadata;
- Annotation;
- Label.

Semantic headings remain independent of visual size.

### M2.3 — Spacing and grid

Implement:

- 4 px micro-unit;
- 8 px primary rhythm;
- approved spacing scale;
- 4-column compact;
- 8-column medium;
- 12-column wide;
- approved maximum composition behavior;
- readable line lengths.

### M2.4 — Core visual primitives

Implement Field, Plane, Line, Frame, Void, and Signal as compositional primitives.

### M2.5 — Action controls

Implement primary, secondary, and tertiary actions plus links and icon controls such as close, previous, next, expand, and play/pause where required.

### M2.6 — Selection/filter controls

Implement tabs, segmented views, filters, checkboxes, radios, selects, status tags, and removable filters.

Selected state must use more than color alone.

### M2.7 — Record family

Implement portal, media, Index, editorial, and Product records.

These are records/plates/portals/objects, not generic rounded cards.

### M2.8 — Media family

Implement figure, caption, gallery sequence, comparison pair/matrix, document plate, video frame, artwork viewer shell, Product media set, captions, credits, and accessibility hooks.

### M2.9 — Metadata rail

Implement shared structured secondary information with compact-screen reflow.

### M2.10 — Form family

Implement persistent labels, guidance, required state, focus, errors, error explanation, disabled state, and confirmation hooks.

### M2.11 — Shared static states

Implement loading, empty, sparse, no-result, unavailable, archived, error, success, confirmation, and restricted/unpublished where relevant.

### M2.12 — Responsive primitive verification

Verify recomposition rather than simple scaling.

## What may be implemented

Approved values, component APIs, shared styling foundations, semantic variants, responsive primitives, accessibility behavior, component examples/documentation.

## What must not be changed

Do not introduce new interface typefaces, alter the spacing system, replace the 4/8/12 grid logic, create district-specific focus behavior, make pills dominant, force universal media crops, rely on color alone, add site-wide user-controlled light/dark theming in v1.0, create separate district component libraries, or add choreography belonging to Animation.

## Acceptance criteria

1. Components use approved shared foundations.
2. Typefaces use approved roles.
3. Semantic heading structure is preserved.
4. Spacing follows approved rhythm.
5. 4/8/12 responsive grid exists.
6. Focus styling is global/consistent.
7. Interactive hit areas normally meet 44×44 px target.
8. Controls work without hover.
9. Media preserves ratio/captions/credits.
10. Forms use persistent labels.
11. State never depends on color alone.
12. Components remain understandable with motion off.
13. Layout remains usable at 200% zoom.
14. Representative components meet WCAG 2.2 AA contrast requirements.

## Tests

Component rendering, semantic headings, keyboard, focus-visible, contrast, 200% zoom/reflow, responsive ranges, media ratio, forms, no-hover access.

## Completion gate

**Gate M2 — System Primitives Verified.**

---

# 8. Milestone 3 — Navigation + Records

## Objective

Implement canonical information architecture and discovery before district pages accumulate real content.

## Dependencies

- Gates M1–M2;
- approved route architecture;
- canonical ownership;
- shared content obligations.

## Files / systems affected

Record schemas/contracts, route helpers, classifications, relationships, lifecycle/public-state model, archive logic, canonical URLs, global/district navigation, breadcrumbs/orientation, Search, Index, filters, direct-entry orientation.

## Work packages

### M3.1 — Universal canonical-record contract

Support, as applicable:

- stable identifier;
- canonical route;
- title;
- primary district;
- record/content type;
- public status;
- publication/visibility state;
- concise orientation text;
- authorship/attribution;
- date/period;
- classifications;
- relationship references;
- media/accessibility metadata;
- internal editorial timestamps where needed.

Schema technology is an implementation choice.

### M3.2 — District extensions

Add validated extensions for Work, Research, Lab, Art, Products, and About without duplicating universal identity.

### M3.3 — Canonical-route resolver

Guarantee one public canonical route per substantive record; reject identity based on temporary state, technology, campaign, filter, or presentation mode.

### M3.4 — Classification model

Support approved dimensions such as discipline, theme, year/period, type, district grouping, status, collection/series/territory/family, and contribution/role.

No uncontrolled tag cloud.

### M3.5 — Relationship model

Every relationship contains source, destination, type, direction where meaningful, visible label, and canonical destination.

Visual relationships may only represent semantic relationships present in data.

### M3.6 — Lifecycle and archive model

Separate:

- public state;
- internal publication state;
- district-specific lifecycle;
- archive visibility.

Do not flatten district lifecycles into one sequence.

### M3.7 — Global navigation

Complete district navigation, utilities access, active district state, direct entry, and orientation plane.

### M3.8 — District navigation

Follow shared conceptual order:

1. overview/threshold;
2. curated/current;
3. groupings/lenses;
4. comprehensive archive/catalogue/Index;
5. Search where relevant.

### M3.9 — Breadcrumb/orientation system

Deep structures expose current district, content type, parent grouping, active lens/filter where relevant, and routes to overview/comprehensive access.

### M3.10 — Index

Implement complete precise access over the public canonical set.

### M3.11 — Filters

Implement visible active state, reset, accessible controls, persistence where useful, and intentional recomposition.

### M3.12 — Search

Use the same canonical public set as Index.

Results expose, where relevant, title, type, district, match reason, public state, date/period, principal classification, and meaningful relationships.

### M3.13 — Direct-entry orientation

Deep links show district identity, current record/section, parent navigation, and primary next actions without inventing prior session history.

## What may be implemented

Schemas, validation, route resolution, canonical links, classifications, relationships, query layer, Search, Index, filters, breadcrumbs, archive logic, fixtures.

## What must not be changed

No duplicate records for cross-district presence, invented relationships, visual similarity as implicit relation, separate Search/Index taxonomies, filters as canonical identity, deletion of valuable archived history, exposure of internal publishing states by default, or Search ranking as ownership.

## Acceptance criteria

1. Every test record has one canonical route.
2. Duplicate IDs are rejected.
3. Every relationship resolves.
4. Search and Index query the same public source.
5. Filters preserve canonical identity.
6. Public archive records remain reachable when intended.
7. Public state is explicit.
8. Internal state remains internal by default.
9. Deep links orient correctly.
10. Meaningful depth has breadcrumbs/equivalent orientation.
11. Global/district navigation remain distinct.
12. Discovery is keyboard operable.
13. Essential navigation does not require motion.

## Tests

Schema validation, duplicate-ID, canonical route, broken relationship, reciprocal relation where used, archive visibility, Search/Index parity, filter persistence/reset, deep links, breadcrumbs, keyboard/touch discovery.

## Completion gate

**Gate M3 — Navigation + Records Verified.**

---

# 9. Milestone 4 — Motion Infrastructure

## Objective

Implement the approved temporal system as reusable infrastructure before district-wide choreography.

## Dependencies

- Gates M1–M3;
- `ANIMATION_SYSTEM.md v1.0`.

## Files / systems affected

Motion tokens, reduced-motion preferences, transition primitives, Focus manager, overlay/modal manager, Return/spatial-memory store, scroll restoration, representative comparison/Trace prototypes, motion tests.

## Work packages

### M4.1 — Motion tokens

Implement semantic duration, easing, distance, stagger, recession, and environment foundations.

Exact values may be tuned through prototype testing while preserving the approved hierarchy.

### M4.2 — Reduced motion and capability handling

Centralize `prefers-reduced-motion`, cancellation, lower-cost fallbacks, environmental-motion disabling, and functional feedback parity.

### M4.3 — Local interaction states

Implement Feedback/State Change for hover, focus-visible, press, selected, loading, success, error, and disabled.

### M4.4 — Focus + Recession

Create one reusable system for Work evidence, Research artifacts, Lab inspection, Art viewing, Product evaluation, and About long-form/archival reading.

### M4.5 — Overlay mechanics

Provide explicit close, Escape where appropriate, modal focus containment, focus return, background interaction prevention, preserved underlying context, and reduced background motion.

### M4.6 — Spatial memory / Return

Preserve where technically possible:

- previous route;
- parent district;
- selected record;
- Index position;
- scroll position;
- active filter/lens;
- comparison state;
- gallery position;
- relevant expanded/collapsed state;
- originating control/element reference.

### M4.7 — Browser-history contract

Verify application navigation, Back/Forward, direct links, overlays, Focus, Return, and rapid navigation together.

### M4.8 — Record-passage prototype

Prototype:

> Index → canonical record → Return

within one representative district context.

### M4.9 — Home-threshold prototype

Prototype:

> Home → one district → Home

including repeated-entry efficiency.

### M4.10 — Comparison and Trace prototypes

Implement one representative pattern for each, proving shared mechanics rather than authorizing page-specific invention.

## What may be implemented

Approved motion primitives/tokens, focus management, overlay infrastructure, state restoration, transition mechanics, prototypes, reduced-motion alternatives, performance fallbacks.

## What must not be changed

No bounce/elastic overshoot, large global zoom, page rotation, cinematic fly-through, scroll hijacking, animation-gated access, mandatory intro, cursor trails, pervasive kinetic typography, or platform-wide environmental animation yet.

## Acceptance criteria

1. Static interface remains complete with motion disabled.
2. Reduced motion preserves function/meaning.
3. Focus works by keyboard.
4. Modal focus is contained.
5. Focus returns appropriately.
6. Scroll/Index position restores.
7. Active filters/lenses restore where relevant.
8. Back/Forward behave predictably.
9. Direct links do not fabricate history.
10. Obsolete motion cancels under rapid navigation.
11. User input interrupts nonessential animation.
12. Home threshold preserves orientation.
13. Repeated entry is more efficient.
14. Comparison stabilizes reference points.
15. Trace corresponds to semantic relationships.
16. Native scrolling remains intact.

## Tests

Reduced motion, focus, modal focus trap, focus return, scroll restoration, filter/lens restoration, browser history, deep link, rapid-navigation cancellation, touch interruption, transition performance.

## Completion gate

**Gate M4 — Motion Infrastructure Verified.**

---

# 10. Milestone 5 — District Framework

## Objective

Implement the seven district shells using verified shared systems.

District difference comes from approved emphasis, not separate design systems.

## Dependencies

- Gates M1–M4;
- authoritative Universe Specification Set;
- representative validated fixtures.

## Files / systems affected

Shared district shell, district overview/curated/comprehensive/grouping/canonical-record views, district navigation, district composition, approved motion emphasis, cross-district relation presentation.

## M5.0 — Shared district shell

Support:

- district identity;
- district navigation;
- threshold/overview;
- curated foreground;
- grouping/relational layer;
- comprehensive access;
- relationship passages;
- direct entry;
- Return;
- responsive composition;
- accessibility.

Avoid per-district forks unless a source requirement truly demands them.

## District implementation order

1. Home
2. Work
3. Research
4. Lab
5. Art
6. Products
7. About

Products here means the district/offer-presentation shell. Transaction activation remains gated by Milestone 6 and real commercial dependencies.

## M5.1 — Home

**Implement:** platform orientation, district thresholds, direct and exploratory access, Home→district passage, return condition, approved atmosphere.

**Do not change:** district labels, Home ownership, utility status, direct access, Home into archive, Home as mandatory transit hub.

**Verify:** all districts reachable; shared orientation clear; direct/exploratory coexist; motion-off works; reduced motion preserves relationships; Home does not duplicate district records.

**Gate M5.1:** Home Verified.

## M5.2 — Work

**Implement:** selected, all, practice/grouping views, canonical Work detail, evidence Focus, role/contribution/credit presentation, real cross-links.

**Do not change:** Work ownership, project truth, evidence hierarchy, relationship truth.

**Verify:** professional role/contribution legible; evidence accessible; curated/comprehensive coexist; canonical routing and Return work; responsive evidence relationships hold.

**Gate M5.2:** Work Verified.

## M5.3 — Research

**Implement:** current, themes, publications, writing, talks, archive, canonical records, editorial reading, artifact Focus, relationship-backed Trace.

**Do not change:** Research ownership, inquiry/evidence distinction, Research/Lab cycle.

**Verify:** atmospheric and Index modes coexist; long form readable; research state explicit; relationships semantic; motion recedes during reading.

**Gate M5.3:** Research Verified.

## M5.4 — Lab

**Implement:** active/prototype/tool/study/archive views, canonical experiments, versions/branches, Comparison, Trace, state, transfer relationships.

**Do not change:** experimental ownership, failure/abandonment honesty, transfer-history preservation, lifecycle vocabulary, distinction from Research/Work.

**Verify:** state explicit; versions/branches clear; failures not disguised; transferred history remains; comparison stable; lineage semantic/accessibile.

**Gate M5.4:** Lab Verified.

## M5.5 — Art

**Implement:** selected, series, medium, exhibitions, archive, canonical artworks, Focus viewer, media disclosure, documentation distinctions.

**Do not change:** Art ownership, artwork/documentation distinction, encounter-before-transaction, Art/Products boundary, authored/interface motion distinction.

**Verify:** artwork primary; interface recedes; Return restores context; captions/credits/accessibility remain available; commerce links are secondary; no damaging universal crop.

**Gate M5.5:** Art Verified.

## M5.6 — Products

**Implement:** featured, collections, digital, physical, services, archive, canonical offers, price state, availability, variant/edition presentation, evaluation, truthful non-activated actions.

**Do not change:** origin ownership, Art ownership, price/availability truth, seller/legal data, payment behavior, unresolved scope.

**Verify:** offer clear; origin visible; states explicit; unavailable cannot appear purchasable; functional UI remains conventional; no transaction occurs without operational approval.

**Gate M5.6:** Products shell Verified.

## M5.7 — About

**Implement:** profile, practice, experience, education, capabilities, recognition, current focus, CV/résumé where real, Contact pathways, long-form/archival Focus.

**Do not change:** About ownership, professional audience priority, legal/admin separation, district-record ownership, personal-information boundaries.

**Verify:** authorship clear; professional evidence concise; depth optional; no duplication of district records; Contact easy to reach; personal information intentionally approved.

**Gate M5.7:** About Verified.

## Milestone acceptance criteria

All seven gates pass; all districts share the same visual and motion systems; ownership remains intact; direct district-to-district passages use explicit relationships; direct entry works; comprehensive access exists where approved; responsive/accessibility behavior remains consistent.

## Tests

Per district: routes, direct entry, district navigation, canonical records, relationships, keyboard, Focus/Return, compact/medium/wide layouts, reduced motion, content states, accessibility smoke.

## Completion gate

**Gate M5 — District Framework Verified.**

---

# 11. Milestone 6 — Utilities

## Objective

Implement global task-oriented utilities and commercial boundaries after the main platform architecture is stable.

Functional clarity takes priority over atmosphere.

## Dependencies

- Gate M5;
- actual decisions for each utility being activated;
- approved Contact route/data;
- verified legal/business content before publication;
- approved launch-language decision before multilingual activation;
- approved commercial configuration before transaction activation.

## Files / systems affected

`/contact`, Contact forms, legal/admin surfaces, language infrastructure when activated, utility navigation, confirmations/errors, utility overlays, commerce boundary/adapter, Product commitment actions.

## Work packages

### M6.1 — Contact

Implement direct Contact, minimal required data, accessible forms where used, error preservation, confirmation, privacy-aware handling, and no sales-funnel theatrics.

### M6.2 — Legal/admin

Implement the global legal/admin surface and publish only verified real content.

### M6.3 — Language

Implement only after launch-language approval.

Preserve the same conceptual hierarchy; make missing translations explicit; do not duplicate district architecture.

### M6.4 — Utility states

Apply shared form, overlay, failure, and confirmation mechanics.

### M6.5 — Products transaction boundary

Separate Product record/presentation from commercial action and transaction service.

A provider-independent adapter may be created so providers can change without rewriting Product records.

### M6.6 — Transaction activation

Activate purchase/reservation/subscription only when required commercial/legal data exists.

Before then, only truthful actions such as enquiry, quote request, commissioning information, or unavailable/archive state may be exposed.

## What may be implemented

Contact, forms, confirmations, legal/admin structure, verified legal text, approved language infrastructure, transaction boundary, provider integration after approval, real commitment actions.

## What must not be changed

Do not invent legal text, seller identity, prices, tax, shipping, availability, accounts, payment behavior, or translations; do not move global legal ownership into About or Products.

## Acceptance criteria

Activated utilities are globally reachable, keyboard/touch usable, explicit about success/error, preserve form data safely where appropriate, use correct ownership, publish only verified legal/business data, identify language clearly, block purchase from non-purchasable Products, and use literal commitment labels.

## Tests

Contact validation/success/error, focus after submission, legal links, language persistence/missing translation if activated, Product action states, unavailable purchase block, transaction adapter where activated, confirmation/recovery.

## Completion gate

**Gate M6 — Required Utilities Verified.**

An unavailable external dependency may remain **Blocked** without blocking unrelated release scope if that utility is explicitly outside the release and cannot be mistaken for active functionality.

---

# 12. Milestone 7 — Content Integration

## Objective

Replace fixtures with verified real content and prove the architecture under real information/media pressure.

## Dependencies

- Gate M5;
- Gate M6 for activated utilities;
- verified content inventory;
- verified media;
- approved credits/authorship;
- approved commercial/legal data where applicable.

## Files / systems affected

Content records/source, media library, media metadata, captions, alt text, credits, classifications, relationships, lifecycle states, Product states, About/profile data, Search/Index generation.

## Work packages

### M7.1 — Content inventory

For every release record confirm owner, canonical route, title, type, status, visibility, summary, authorship, dates, classifications, relationships, media, credits, accessibility data, unresolved fields.

### M7.2 — Record validation

No record enters the public build unless its required contract passes.

### M7.3 — Media preparation

Preserve aspect ratio, captions, credits, alt text, diagram explanation, video captions, transcripts where applicable, artwork integrity, and document readability.

### M7.4 — Relationship integration

Add only verified cross-record relationships.

### M7.5 — Lifecycle/state integration

Apply real public, archive, Research, Lab, Art preservation/documentation, Product commercial, and internal publication states.

### M7.6 — Search/Index rebuild

Generate discovery from the verified canonical release set.

### M7.7 — District content review

Review curation, comprehensive access, density, missing data, accidental duplication, and hierarchy under real content.

Content pressure may expose implementation defects; it does not automatically authorize redesign.

## What may be implemented

Verified content, source migration, media optimization, captions/credits, classifications, states, relationships, approved translations, approved commercial details, validation tooling.

## What must not be changed

No filler invention, duplicate records, ownership changes for layout convenience, deletion of meaningful history, hidden missing fields, unsupported alt-text invention, false Product state, rewriting Lab failures as success, Research hypotheses as established facts, or collaborative work as sole authorship.

## Acceptance criteria

1. All release records validate.
2. Every record has one canonical route.
3. Every cross-link resolves.
4. Public media has required accessibility metadata.
5. Credits are present where required.
6. Archive/inactive state is explicit.
7. Search/Index reflect the same release set.
8. No fixture remains in production content.
9. No invented content exists.
10. No duplicate canonical records exist.
11. Curated views remain curated.
12. Comprehensive views are complete for release scope.

## Tests

Schema validation, link scan, duplicate-ID scan, required-field scan, missing media scan, accessibility metadata checks, Search/Index parity, archive state, Product action consistency, relationship targets, fixture-string scan.

## Completion gate

**Gate M7 — Release Content Verified.**

---

# 13. Milestone 8 — QA + Hardening

## Objective

Verify the complete platform against approved specifications under realistic conditions and correct implementation defects without redesign.

## Dependencies

- Gates M1–M7 for release scope;
- representative devices/viewports;
- production-like build.

## QA tracks

### M8.1 — Routes/navigation

All routes, direct entry, history, orientation, global/district navigation, cross-district passage, canonical links.

### M8.2 — Ownership

One record/owner, no duplicates, relationship truth, archive preservation, Product origin boundaries, Lab transfer history, Art ownership under commercialization.

### M8.3 — Accessibility

WCAG 2.2 AA minimum:

- keyboard;
- focus;
- modal focus;
- touch targets;
- contrast;
- 200% zoom;
- reflow;
- color independence;
- landmarks/headings;
- alt text;
- captions/transcripts;
- forms;
- reduced motion;
- semantic equivalents to spatial views.

### M8.4 — Responsive

Compact, medium, wide, ultra-wide:

- hierarchy;
- content order;
- navigation;
- media;
- metadata;
- Focus;
- comparison;
- forms;
- Index;
- Products;
- long-form reading.

### M8.5 — Motion

Semantic role use, hierarchy, cancellation, user priority, history, reduced motion, repeated-navigation efficiency, native scroll, prohibited-pattern absence, environmental degradation.

### M8.6 — State recovery

Loading, empty, sparse, no result, unavailable, archived, errors, confirmation, failed requests, interrupted navigation, restored filters/lenses, overlay exit, Return.

### M8.7 — Search/Index

Same canonical set, accurate filters, no dead links, status visibility, no-result behavior, direct access.

### M8.8 — Commerce

Where activated: Product state, commitment label, price/availability truth, failure, confirmation, Return, legal linkage, inactive-product transaction prevention.

### M8.9 — Content integrity

Credits, authorship, dates, relations, media, captions, lifecycle/archive states, legal/business text, translation state.

### M8.10 — Performance

Production build, responsiveness, media loading, layout stability, navigation response, off-screen animation suspension, lazy loading, constrained-device behavior.

Environmental motion is removed before navigation, content, accessibility, or interaction quality.

## What may be implemented

Bug/accessibility/responsive/performance fixes, code splitting, caching, media optimization, state-recovery corrections, test improvements, behavior-preserving refactors.

## What must not be changed

QA cannot remove approved features for convenience, flatten districts, remove accessibility equivalents, change ownership, replace discovery architecture, remove Return, redesign motion/visual language, hide failure states, change Product truth, or reduce legal obligations.

## Acceptance criteria

1. No critical route broken.
2. No duplicate canonical identity.
3. No keyboard trap.
4. No inaccessible critical overlay/focus.
5. WCAG 2.2 AA target met for release-critical flows.
6. Reduced motion preserves function.
7. Responsive layouts preserve hierarchy/access.
8. Search/Index consistent.
9. Archive behavior correct.
10. Return restores context in required representative flows.
11. No inactive Product can transact.
12. No fixture remains.
13. Required media/accessibility metadata present.
14. No prohibited global motion.
15. Performance acceptable on representative devices.
16. Release-blocking suites pass.

## Tests

Full static, unit, component, integration, route, end-to-end, accessibility, responsive, reduced-motion, history, state-recovery, Search/Index, content-integrity, link, performance, and activated-commerce suite.

## Completion gate

**Gate M8 — Platform Implementation Verified.**

No release proceeds before Gate M8.

---

# 14. Milestone 9 — Release Readiness

## Objective

Prepare the Verified implementation for production deployment without changing product/design decisions.

## Dependencies

- Gate M8;
- selected production environment;
- production configuration/secrets;
- approved legal/privacy content for release scope;
- approved analytics/privacy decision if analytics is activated;
- rollback method.

## Files / systems affected

Production build/deployment config, environment values, domain/DNS, caching/CDN where applicable, crawl metadata, observability where selected, analytics only if approved, rollback docs, release checklist.

## Work packages

### M9.1 — Production build

Clean install, build, no fixtures/debug UI, complete environment validation.

### M9.2 — Environment

Validate separation, secrets, service endpoints, media paths, transaction credentials where activated.

### M9.3 — Deployment

Implement selected deployment architecture. Hosting remains a technical choice only if it supports approved requirements.

### M9.4 — Crawl/metadata readiness

Where public launch requires: canonical URLs, titles, descriptions, sitemap, robots behavior, no unintended indexing.

### M9.5 — Privacy/analytics gate

Analytics is activated only if separately approved. If not approved, release without analytics.

### M9.6 — Rollback

Document last known good build, triggers, procedure, configuration restoration, commerce rollback where relevant, and verification.

### M9.7 — Production smoke

Verify Home, all district entrances, representative records, Search, Index, Contact, legal/admin, language if active, Focus/Return, reduced motion, responsive sample, and Product action where active.

## What may be implemented

Deployment config, environment handling, caching, production metadata, privacy-approved analytics, observability, release automation, rollback procedures.

## What must not be changed

No redesign, unapproved analytics/tracking, route changes, invented legal content, unfinished commerce activation, internal-content publication, accessibility removal, or ownership change.

## Acceptance criteria

1. Clean production build passes.
2. Required production environment exists.
3. Secrets are not exposed.
4. Canonical routes resolve.
5. Intended records publish; unintended records do not.
6. Search/Index work.
7. Contact works or is truthfully outside release scope.
8. Required legal/admin content is present.
9. Commerce is Verified or explicitly inactive.
10. Reduced motion works.
11. Key responsive layouts pass.
12. Error handling works.
13. Rollback is documented and reasonably verified.
14. Final release checklist is approved.

## Tests

Clean install/build, production smoke, environment validation, appropriate secrets/security scan, broken links, canonical URLs, Search/Index, Contact, transaction sandbox/production verification where active, reduced motion, rollback rehearsal/documented verification.

## Completion gate

**Gate M9 — Release Verified and Approved for Production.**

---

# 15. Testing Strategy

Testing is cumulative.

## Static/structural

Formatting where used, linting, static analysis, type checking where applicable, schema and dependency/config validation.

## Unit

Route helpers, canonical validation, relationships, classifications, filters, Search helpers, Return-state storage, lifecycle/state logic, transaction boundary.

## Component

Controls, forms, records, media, metadata, states, navigation, overlays, Focus, comparison, Search, filters.

## Integration

Route+content, Index+filters, Search+canonical records, relationships+destinations, overlay+focus, Return+history, Product+commercial action state, Contact+confirmation/error.

## End-to-end representative journeys

1. Home → Work → record → Return.
2. Direct deep link → orientation → district overview.
3. Research → related Lab experiment → Return.
4. Lab lineage → transferred Work/Product relation.
5. Art → Focus → available edition relation → Return.
6. Products → evaluation → permitted commitment.
7. About → Contact → confirmation.
8. Search → record → Back.
9. Index → filter → record → Return with filter.
10. Reduced-motion versions of critical journeys.

## Accessibility

Automated + manual keyboard, semantic/screen-reader review where practical, focus order, reduced motion, zoom/reflow, touch, media alternatives.

## Responsive

Compact, medium, wide, ultra-wide plus content-pressure cases.

## Performance

Representative Home, media-heavy Work, long Research, state-heavy Lab, media-heavy Art, Product detail, Search/Index.

---

# 16. QA Gate Rules

## No “mostly done” gate

A milestone cannot be Verified with a known critical acceptance failure.

## Blockers

- broken canonical routing;
- duplicate ownership;
- inaccessible critical interaction;
- keyboard trap;
- unusable reduced-motion mode;
- broken required Return;
- false Product state/action;
- fabricated content;
- Search/Index canonical inconsistency;
- missing required legal content for activated transaction;
- severe responsive access failure;
- critical performance failure blocking navigation/content;
- unresolved conflict between approved specifications.

## Non-blocking defects

Minor polish may go to Backlog only if it does not affect meaning, accessibility, navigation, state truth, responsiveness, content truth, or release-critical performance.

## Verification evidence

Every gate records tests run, result, limitations, screenshots/recordings where relevant, affected routes, commit/change reference, and unresolved backlog.

---

# 17. Conceptual Implementation System Map

Exact paths depend on the actual stack, but responsibilities should remain separated approximately as:

```text
application/
  routes/
  shell/
  navigation/
  districts/
    home/
    work/
    research/
    lab/
    art/
    products/
    about/
  utilities/
    search/
    index/
    contact/
    legal/
    language/
  components/
    controls/
    records/
    media/
    metadata/
    forms/
    overlays/
    states/
    comparison/
  design-system/
    tokens/
    typography/
    grid/
    surfaces/
    accessibility/
  motion/
    tokens/
    roles/
    focus/
    return/
    transitions/
  content/
    records/
    relationships/
    classifications/
    states/
    validation/
  tests/
```

This is a responsibility map, not a requirement to force these folder names onto an existing framework.

---

# 18. Products Transaction Boundary

## Product record

Owns offer identity, family, form, price state, availability, fulfilment summary, access, licensing summary, support, lifecycle, and transaction/enquiry pathway.

## Origin record

Remains owned by Work, Research, Lab, Art, or another approved origin district.

## Transaction adapter

May initiate permitted action, pass approved Product identifiers/variants, receive success/failure/cancellation, and normalize transaction state.

## Provider

Provider choice is technical/operational and may not alter Product identity, page architecture, origin ownership, availability truth, commitment labels, or legal obligations.

## Disabled boundary

If commerce is not ready, only truthful states/actions such as unavailable, forthcoming, quote request, commissioning information, enquiry, or archive are shown.

No fake checkout.

---

# 19. Accessibility Implementation Contract

Accessibility starts in Milestone 1, not Milestone 8.

Minimum release target: **WCAG 2.2 AA**.

Required behavior includes semantic structure, headings/landmarks, keyboard operation, visible global focus, focus restoration, normal 44×44 px target goal, contrast, 200% zoom, reflow, color-independent states, touch support, no hover-only essentials, media alternatives, form labels/errors, reduced-motion parity, semantic alternatives to spatial views, and native history compatibility.

---

# 20. Responsive Implementation Contract

Responsive implementation begins with primitives and continues through every milestone.

It must preserve orientation, hierarchy, primary content, direct interaction, readable pacing, media integrity, relationships, and semantic reading order.

Small screens reduce simultaneous layers and atmospheric density, favor direct/vertical sequence, preserve navigation/Focus, avoid hover dependence, and shorten motion travel.

Wide screens may gain spatial depth/asymmetry without stretching prose or filling space without purpose.

---

# 21. Performance Implementation Contract

Priority under resource pressure:

1. content access;
2. navigation;
3. input response;
4. accessibility;
5. state feedback;
6. media presentation;
7. structural motion;
8. environmental motion.

Environmental motion is removed first.

---

# 22. External Dependencies

Implementation must track but not invent:

**Content:** projects, research, experiments, artworks, products, biography, CV/résumé, credits, collaborators, media.

**Commercial:** catalogue, price, availability, fulfilment, tax, shipping, licensing, seller identity, provider decision.

**Legal:** privacy, terms, statutory disclosures, jurisdiction-specific obligations, rights-holder details.

**Language:** launch-language decision, approved translations, review process.

**Analytics:** whether analytics is used, approved scope, privacy/consent requirements.

Missing required dependencies are **Blocked**.

---

# 23. Change-Control Rule

## Technical question

If the question is:

> “How can we implement the approved behavior?”

implementation may solve it and document the technical choice.

## Product/design question

If the question is:

> “Should the platform behave differently from the approved specification?”

stop and return the change upstream as a Proposal.

Examples requiring upstream review include district renaming, route hierarchy change, ownership change, Search behavior change, removal of Return, new motion grammar, new public status, Product qualification change, or Art/Products boundary change.

---

# 24. Recommended Claude Code Task Shape

Each prompt should include:

1. Task ID
2. Milestone
3. Objective
4. Approved sources
5. Exact scope
6. Files allowed to change
7. Files/systems prohibited from change
8. Required behavior
9. Acceptance criteria
10. Tests
11. Stop conditions
12. Completion-report format

A reviewer should be able to understand the entire diff without reconstructing unrelated changes.

---

# 25. Commit Strategy

Prefer one conceptual change per commit, no unrelated files, clear task/milestone reference, passing tests, no hidden generated artifacts, and no speculative refactor mixed with feature work.

Milestone completion should point to a known commit/tag/record.

---

# 26. Approved Decision Register

| ID | Decision | Status |
|---|---|---|
| IP-001 | Implementation planning translates approved decisions into build order; it does not create new product/design decisions. | Approved |
| IP-002 | Implementation is divided into nine gated milestones. | Approved |
| IP-003 | Work progresses Approved → Implemented → Verified, with Blocked used for unsatisfied dependencies/requirements. | Approved |
| IP-004 | No later milestone is complete while an earlier required gate fails. | Approved |
| IP-005 | Technical choices are permitted only when approved behavior is preserved. | Approved |
| IP-006 | Material technical choices should be documented without rewriting upstream authority. | Approved |
| IP-007 | Repository/application baseline precedes feature implementation. | Approved |
| IP-008 | Route identity and shared shell precede district composition. | Approved |
| IP-009 | Static Design System primitives precede broad motion choreography. | Approved |
| IP-010 | Canonical record architecture precedes real content integration at scale. | Approved |
| IP-011 | Search and Index operate on the same canonical public set. | Approved |
| IP-012 | Focus, overlay, Return, spatial memory, and reduced motion are prototyped/verified before broad reuse. | Approved |
| IP-013 | Native scroll and browser history remain baseline behavior. | Approved |
| IP-014 | District build order is Home → Work → Research → Lab → Art → Products → About. | Approved |
| IP-015 | Products presentation precedes transaction activation; transaction remains dependent on real commercial/legal configuration. | Approved |
| IP-016 | Utilities follow district-framework stability, though supporting infrastructure may be prepared earlier. | Approved |
| IP-017 | Real content integration follows verified canonical models and district shells. | Approved |
| IP-018 | Fixtures may be used for tests but never represented as real release content. | Approved |
| IP-019 | Accessibility is implemented continuously from Foundation onward. | Approved |
| IP-020 | WCAG 2.2 AA is the minimum release target. | Approved |
| IP-021 | Responsive behavior is continuous and preserves hierarchy, meaning, and access. | Approved |
| IP-022 | Performance degradation removes environmental motion before core usability. | Approved |
| IP-023 | QA covers structure, ownership, navigation, Design System, Animation System, accessibility, responsiveness, state recovery, discovery, content, and activated commerce. | Approved |
| IP-024 | Release requires a clean production build and Verified QA gate. | Approved |
| IP-025 | Analytics is activated only if separately approved; release does not require analytics. | Approved |
| IP-026 | Missing content/legal/business/language decisions are external dependencies, not implementation inventions. | Approved |
| IP-027 | Technical constraints threatening approved requirements become Blocked and escalate instead of silently redesigning. | Approved |
| IP-028 | Claude Code tasks are narrow, testable, source-grounded, and explicit about allowed/prohibited change. | Approved |
| IP-029 | Work-package commits exclude unrelated changes. | Approved |
| IP-030 | Implementation begins with M1.1 — Repository audit. | Approved |

---

# 27. Phase Transition

With approval of this document:

> **Architecture and Systems Specification ✓ → Implementation Planning ✓ → Implementation → Verification → Release**

The next project phase is **Implementation**.

The first executable task is:

> **M1.1 — Repository audit**

It must inspect the actual repository and establish the application baseline before any implementation choice is assumed.

---

# 28. Final Implementation Statement

The Personal Platform must be built as a sequence of verified systems, not one large visual build.

Routes come before pages.  
Shared form comes before district exceptions.  
Canonical records come before duplicated presentation.  
Navigation comes before atmosphere.  
Static clarity comes before motion.  
Motion infrastructure comes before choreography.  
District shells come before real content volume.  
Real content comes before final polish.  
Accessibility and responsive behavior exist throughout.  
QA proves the implementation before release.

When implementation discovers a problem, the question is not:

> “What would be easiest to build?”

It is:

> **“What is the smallest technically sound implementation that preserves the approved platform?”**

`IMPLEMENTATION_PLAN.md v1.0` is **Approved**.

The project may now proceed to **M1.1 — Repository audit**.
