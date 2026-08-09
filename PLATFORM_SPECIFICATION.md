# Personal Platform — Platform Specification

**Document:** `PLATFORM_SPECIFICATION.md`  
**Version:** 1.0  
**Status:** Approved  
**Approved:** 7 August 2026  
**Sequence position:** Universe Specifications → Cross-Universe Requirements → Design System → Animation System → **Platform Specification** → Implementation Planning  
**Document role:** Single implementation-facing operational specification for the complete Personal Platform  
**Implementation owner:** Claude Code or another implementation team, only after implementation planning  
**Authority model:** Consolidates approved source specifications without replacing their domain authority

---

# 1. Purpose

`PLATFORM_SPECIFICATION.md v1.0` defines how the approved Personal Platform operates as one complete system.

It answers:

> **How do all approved systems combine into one complete implementation-ready platform specification?**

This is not another design document.

It does not invent a new visual identity, motion language, information architecture, district concept, or content strategy. It consolidates the approved project into one operational reference so that implementation does not have to reconstruct the platform by interpreting many documents independently.

The governing distinction is:

> **The Design System defines form.**  
> **The Animation System defines change.**  
> **The Platform Specification defines how the complete system operates.**

The specification governs the combination of:

- routes
- page types
- navigation
- canonical ownership
- cross-record relationships
- shared content obligations
- Search
- Index
- filters
- archives
- district lifecycle
- global utilities
- responsive behavior
- accessibility
- focus
- overlays
- return states
- loading
- empty states
- failure states
- confirmations
- cross-district passage
- implementation boundaries
- platform-wide acceptance criteria

The purpose of this document is to make the approved platform implementable without allowing implementation to become a second design process.

---

# 2. Source Authority and Conflict Resolution

## 2.1 Governing source set

This specification consolidates the approved project source set:

1. `Project Instructions.txt`
2. `PLATFORM_VISION.md v1.0`
3. `INFORMATION_ARCHITECTURE.md v1.0`
4. the authoritative Universe Specification Set for Home, Work, Research, Lab, Art, Products, and About
5. `CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md v1.0`
6. `DESIGN_SYSTEM.md v1.0`
7. `ANIMATION_SYSTEM.md v1.0`
8. this `PLATFORM_SPECIFICATION.md v1.0`

## 2.2 Distributed authority

The source documents retain authority over their own domains.

- Project Instructions govern project philosophy, process discipline, decision status, and documentation.
- Platform Vision governs identity, positioning, audience priority, experience goals, and long-term evolution.
- Information Architecture governs routes, hierarchy, navigation structure, canonical identity, classification, Search, Index, and structural relationships.
- Universe specifications govern district purpose, atmosphere, spatial identity, district-specific experience, and district-owned lifecycle rules.
- Cross-Universe Requirements govern shared system obligations extracted across districts.
- Design System governs the shared static visual language.
- Animation System governs the shared temporal language.
- Platform Specification governs how those approved systems operate together during implementation.

## 2.3 No silent reconciliation

If two authoritative sources appear to conflict:

1. implementation must not choose whichever interpretation is easier;
2. the conflict must be documented;
3. the affected domain owner must resolve it;
4. the approved source specification must be revised if necessary;
5. implementation proceeds only after the contradiction is removed.

This specification may clarify how approved rules combine. It may not silently override them.

## 2.4 Implementation-facing precedence

When an implementation question is already resolved here through faithful consolidation of the source documents, developers should use this document as the primary implementation-facing reference.

When a change would alter the meaning of an upstream decision, the relevant upstream source remains authoritative and must be revised before this specification is changed.

---

# 3. Canonical Platform Model

The Personal Platform is one coherent architectural universe containing seven primary districts:

- Home
- Work
- Research
- Lab
- Art
- Products
- About

The canonical operational distinctions are:

> **Work demonstrates capability.**  
> **Research develops understanding.**  
> **Lab tests and transforms.**  
> **Art concentrates perception.**  
> **Products operationalizes value.**  
> **About reveals authorship, continuity, and intent.**

Home establishes the shared world, provides orientation, and enables passage into every district.

These distinctions are not slogans. They are placement, ownership, navigation, and implementation tests.

A technical implementation must never collapse these districts into discipline silos or duplicate content simply because one item participates in several parts of the practice.

---

# 4. Platform Hierarchy

The public platform uses five conceptual levels.

## Level 0 — Platform

The complete Personal Platform.

## Level 1 — District

One of Home, Work, Research, Lab, Art, Products, or About.

## Level 2 — Section, grouping, collection, archive, family, territory, series, or equivalent district organizer

Level 2 organizes canonical records without taking ownership away from them.

Examples include Selected Work, Practice Areas, Research Themes, Active Experiments, Lineages, Bodies of Work, Product Families, Collections, and Experience.

## Level 3 — Canonical record

A substantive public entity such as a Work project, Research record, Lab experiment, artwork, product/service, or independently addressable About/profile record.

## Level 4 — Subentry

Optional independently meaningful content belonging to a canonical record, such as a case-study chapter, project phase, research output, experiment iteration, artwork-series item, product variant, or service option.

Level 4 is used only when independent navigation or reference is justified. Implementation must not fragment simple records merely to create more routes.

---

# 5. Complete Public Route Architecture

Routes define public information identity, not technical framework choice.

## 5.1 Route laws

All public routes must:

- use stable human-readable identities;
- preserve district names as the first structural level;
- map substantive items to one canonical route;
- keep temporary status, technology, date, filter, visual format, campaign, and presentation mode out of canonical identity;
- preserve canonical routes when the visual presentation changes;
- support direct entry without requiring a prior navigation sequence.

Route changes are architectural changes and require an explicit migration decision.

## 5.2 Top-level routes

```text
/
/work
/research
/lab
/art
/products
/about
/search
/index
/contact
```

`/contact` is a global direct pathway into the Contact function owned by About.

## 5.3 Work routes

```text
/work
/work/selected
/work/all
/work/practice/{practice-area}
/work/collections/{collection}
/work/{entry}
```

## 5.4 Research routes

```text
/research
/research/current
/research/themes/{theme}
/research/publications
/research/writing
/research/talks
/research/archive
/research/{entry}
```

## 5.5 Lab routes

```text
/lab
/lab/active
/lab/prototypes
/lab/tools
/lab/studies
/lab/archive
/lab/{entry}
```

District-specific views such as lineages, constellations, timelines, or field views may be implemented where approved by the Lab specification, but they must remain coherent with the canonical Lab record structure rather than generate duplicate experimental identities.

## 5.6 Art routes

```text
/art
/art/selected
/art/series/{series}
/art/medium/{medium}
/art/exhibitions
/art/archive
/art/{entry}
```

Series, exhibitions, collections, periods, and media organize or contextualize Art records. They do not silently replace canonical artwork identity.

## 5.7 Products routes

```text
/products
/products/featured
/products/collections/{collection}
/products/digital
/products/physical
/products/services
/products/archive
/products/{entry}
```

Additional commercial families such as licenses, subscriptions, commissions, editions, and hybrid offers must use the approved Products hierarchy without creating unnecessary top-level districts.

## 5.8 About routes

```text
/about
/about/profile
/about/practice
/about/experience
/about/education
/about/capabilities
/about/recognition
/about/current-focus
/contact
```

The implementation may use in-page sections where separate routes add no meaningful independent value, provided direct linking, navigation semantics, accessibility, and the approved public hierarchy remain intact.

## 5.9 Global discovery routes

```text
/search
/index
/index/district/{district}
/index/type/{content-type}
/index/discipline/{discipline}
/index/theme/{theme}
/index/year/{year}
```

These are organizational views over canonical records. They do not create alternate canonical pages.

## 5.10 Deeper route exceptions

A deeper route may be introduced only when approved content justifies a meaningful multipart Work case study, independently useful Research outputs, individually documented works inside an Art series, meaningful experiment versions or lineage states, or independently addressable Product variants/documentation/service options.

Conceptual depth beyond Level 4 should normally be handled through sections, chapters, filters, relationships, or in-page navigation rather than deeper routing.

---

# 6. Page-Type Architecture

The platform must be implemented from shared page roles rather than one-off page designs.

## 6.1 World threshold

Primary instance: Home.

Purpose:

- establish the shared universe;
- communicate authorship and platform identity;
- provide direct and exploratory district access;
- establish orientation and return.

Home is not a content archive.

## 6.2 District overview

Primary instances: `/work`, `/research`, `/lab`, `/art`, `/products`, `/about`.

Purpose:

- establish district identity;
- expose curated current or significant material;
- make primary district navigation legible;
- provide routes to comprehensive access;
- establish cross-district relationships where meaningful.

District overview pages must remain curated as content volume grows.

## 6.3 Curated collection or selected view

Examples include Work Selected, Research Current, Lab Active, Art Selected, and Products Featured.

Purpose:

- provide an intentionally edited reading;
- communicate current significance;
- reduce archive density;
- preserve canonical links.

Curated views do not own records.

## 6.4 Comprehensive archive / catalogue / all-records view

Examples include Work All, Research Archive, Lab Archive, Art Archive, and Products Catalogue/Archive.

Purpose:

- provide complete public access;
- support scanning;
- support filtering;
- expose status and taxonomy;
- scale with volume.

These views may be more functional and less atmospheric than district entrances.

## 6.5 Classification or grouping view

Examples include Work Practice Area, Research Theme, Lab lineage/constellation/field, Art Series or Medium, and Product Collection or Family.

Purpose:

- organize canonical records by a meaningful durable relationship;
- explain the grouping;
- preserve direct links to canonical records;
- permit discovery without duplication.

## 6.6 Canonical record detail

A canonical detail page must:

- identify its primary district;
- identify record type;
- communicate status;
- show title and authorship/attribution as relevant;
- provide the district-specific evidence or experience required by its source specification;
- expose meaningful relationships without duplicating linked records;
- support direct entry;
- support predictable return;
- provide relevant accessibility information.

## 6.7 Focus / inspection state

Focus is not automatically a route.

It may be used for Work evidence, Research artifacts, Lab versions and comparisons, Art viewing, Product evaluation, and About long-form or archival reading.

Focus must preserve origin context, parent identity, clear exit, keyboard focus, browser-history expectations where applicable, and reduced-motion equivalence.

## 6.8 Comparison state

Comparison is a task-oriented state rather than a new district.

It must:

- name what is being compared;
- align stable dimensions;
- preserve shared reference points;
- support pausing and inspection;
- remain accessible semantically;
- restore the prior state on exit.

## 6.9 Overlay / modal

Overlays are temporary layers for bounded tasks or inspection.

They must not imply a new architectural destination.

They use Focus, Recession, and Return.

They require explicit close, keyboard-operable dismissal where appropriate, focus containment when modal, focus restoration on exit, stable background context, and no inaccessible content trapping.

## 6.10 Utility page

Examples include Search, Index, legal/administrative information, and contact task when presented independently.

Utility pages prioritize clarity, scanning, forms, status, and task completion over atmospheric expression.

---

# 7. Global Navigation

## 7.1 Permanent district set

The global district navigation uses the conceptually stable labels Home, Work, Research, Lab, Art, Products, and About.

These are not to be renamed by implementation for stylistic reasons.

## 7.2 Global utilities

The global utility layer contains Search, Index, Contact, language selection when activated, and legal/administrative information.

Utilities are not districts and must remain globally reachable.

## 7.3 Global navigation obligations

At every meaningful depth, the user must be able to determine:

- current district;
- current content identity;
- route to district overview;
- route to global navigation;
- route to Search and Index;
- route to Contact;
- route out of focus or immersive conditions.

Global navigation may visually recede in focused states but cannot become unavailable.

## 7.4 Directness

Professional decision-makers are the primary audience.

Therefore global navigation must support rapid direct access regardless of atmospheric presentation.

No implementation may require a visitor to complete an intro, discover a hidden gesture, understand a spatial metaphor, wait for animation, use hover, or enter Home first.

---

# 8. District Navigation

Every district uses recognizable shared logic:

1. Overview / threshold
2. curated / selected / current layer
3. organizational groupings, lenses, families, territories, series, or views
4. comprehensive archive, catalogue, or Index
5. Search where relevant

District-specific terminology may vary when the source Universe specification requires it.

Local navigation must not create incompatible navigation behavior between districts.

## 8.1 Contextual orientation

Deep structures must expose district, current section/grouping, current record, parent grouping when relevant, active lens/filter/view, route to overview, and route to comprehensive access.

Breadcrumbs are permitted but not mandatory if an equivalent semantic and visible mechanism provides the same information.

## 8.2 Previous / next

Previous and next are permitted only where a true intentional sequence exists, such as ordered case-study chapters, exhibition sequence, artwork series, research sequence, experiment lineage, or deliberately ordered collection.

They must not manufacture sequence among unrelated records.

---

# 9. Canonical Record Ownership

## 9.1 One substantive item, one canonical identity

Every substantive public item has one primary owner and one canonical record.

A record may appear through many pathways. It may not be duplicated merely to make it visible in another district.

## 9.2 Work ownership

Work owns professional project identity, delivered or mature outcomes, professional capability evidence, role and contribution, project context, and accountable result.

## 9.3 Research ownership

Research owns questions, intellectual framing, methods of inquiry, sources and evidence, arguments, findings, evolving positions, and research artifacts as research evidence.

## 9.4 Lab ownership

Lab owns experiments, prototypes, tests, experimental versions, branches, failures, lineages, transformation evidence, and experimental lifecycle history.

When something matures elsewhere, the Lab record remains as experimental history.

## 9.5 Art ownership

Art owns artwork identity, artwork encounter, series relationship, collection/exhibition context, medium, period, artwork documentation, and artistic status/presentation.

Commercial availability never transfers canonical artwork ownership to Products.

## 9.6 Products ownership

Products owns the canonical commercial offer: offer identity, product family, available form, price state, availability, fulfilment, access, licensing summary, support, commercial lifecycle, and transaction or enquiry pathway.

Products does not absorb origin records.

## 9.7 About ownership

About owns personal and professional authorship, biography, trajectory, practice structure, values and methods, experience, education, capabilities, affiliations, recognition, current focus, and contact identity.

About does not own platform-wide legal disclosures or offer-specific transaction terms.

## 9.8 Global legal and administrative ownership

The global legal/administrative utility owns platform-wide information such as legal/business identity where required, rights-holder identity where required, privacy information, general terms, statutory disclosures, and platform-wide administrative information.

Products owns offer-specific commercial conditions. About owns personal/professional authorship and identity.

The exact legal wording, jurisdictional obligations, seller details, tax rules, and policies remain content/legal decisions outside this specification.

---

# 10. Cross-Record Relationships

Relationships are explicit links between canonical records. They must never be simulated by duplicate pages.

## 10.1 Relationship requirements

A relationship must identify source record, destination record, relationship type, direction where meaningful, visible relational label, and canonical destination.

## 10.2 Permitted relationship classes

Examples include informed by, developed from, tested through, matured into, applied in, documented in, exhibited in, available as, offered through, derived from, related series, successor/predecessor, version of, branch of, collaborator/contributor, publication of, and evidence for.

Exact public wording should follow district editorial language and actual content truth.

## 10.3 Bidirectionality

Where useful, relationships should be reciprocal.

Example:

- Lab experiment → matured into → Work record
- Work record → developed through → Lab experiment

Reciprocal presentation may use different language while referencing the same relationship.

## 10.4 No false relationships

Spatial proximity, linework, motion, Search similarity, or visual grouping must never imply a relationship that is not represented in the content model.

Every meaningful relationship presented spatially must also exist semantically.

---

# 11. Shared Content-Model Obligations

Every public record type must expose a structured minimum sufficient for routing, discovery, accessibility, and relationships.

## 11.1 Universal record fields

Every canonical record requires, as applicable:

- stable identifier
- canonical route
- title
- primary district
- record/content type
- public status
- publication/visibility state
- concise summary or orientation text
- primary authorship/attribution
- dates or period where meaningful
- classifications
- relationship references
- media/accessibility metadata where media exists
- created/updated editorial metadata internally as needed

## 11.2 Classification obligations

Records may use discipline, theme, year/period, content type, district-specific grouping, status, collection/series/territory/family, and contribution/role where relevant.

Classifications support discovery. They do not define canonical ownership.

## 11.3 Authorship and contribution

Where multiple contributors exist, the platform must distinguish author/creator, personal role, collaborator, team, client/institution, manufacturer/fabricator/publisher or equivalent where relevant.

The current personal identity must not be hard-coded in a way that prevents future studio, company, or multi-author records.

## 11.4 Status is explicit

Relevant state must be textually identifiable.

A visitor must not be expected to infer state from color, opacity, position, motion, or district atmosphere.

## 11.5 Unknown information

Missing information must not be fabricated.

The implementation must support honest absence, omission, or “not specified” editorial treatment where appropriate rather than generating fake completeness.

---

# 12. District Content Obligations

## 12.1 Work records

A Work record must support, where applicable: project identity, context and brief, date/period, location, status, practice areas/disciplines, role and contribution, team/client/collaborators, process, evidence, outputs/outcomes, media and captions, credits, and related Research/Lab/Art/Products records.

Professional contribution must remain legible.

## 12.2 Research records

A Research record must support: question/thesis/inquiry, context, status, methods, evidence/sources, findings/position/current understanding, uncertainty or limitations where relevant, research artifacts, references, and related Lab/Work/Art/Products records.

Research must not present evolving knowledge as falsely final.

## 12.3 Lab records

A Lab record must support: experiment identity, question/intention, lifecycle state, version, lineage, inputs/parameters where meaningful, method/test, evidence, observation/result, failures or invalid states, next question, branch/successor relationships, maturation or transfer links, and related Research/Work/Art/Products records.

Failed and abandoned experiments may remain valid public records when deliberately documented and meaningful.

## 12.4 Art records

An Art record must support, where applicable: artwork identity, work/series relationship, medium, date/period, state, documentation versus artwork distinction, dimensions/duration/technical conditions where meaningful, context layers, exhibition/collection relationships, captions/credits, accessibility description, related Research/Lab/Work records, and a restrained Product relationship when acquisition exists.

Art context must not overwhelm the encounter.

## 12.5 Product records

A Product record must support, where applicable: product/offer identity, primary family, value proposition, intended recipient/user, included deliverable/access/service, exclusions/boundaries, price/currency or quote basis, availability, variant/plan/edition, fulfilment/access method, timing/lead time, licensing or usage summary, requirements/compatibility, support, lifecycle state, commitment action, origin record/provenance, and successor/superseded relationship.

Essential commercial information appears before extended narrative context.

## 12.6 About content

About must support profile, practice/philosophy, experience, education, capabilities, collaborators/clients/affiliations where appropriate, recognition, current focus, contact pathways, and downloadable or externally linked credentials when editorially approved.

About reveals authorship without becoming a résumé dump or self-promotional campaign.

---

# 13. Search

Search is a global utility over the canonical record set.

## 13.1 Search scope

Search should be able to retrieve public canonical records across districts using available structured content and relevant textual content.

It must not index private material, latent Lab material, unpublished records, internal project-management status, or administrative content not intended for public retrieval.

## 13.2 Search result requirements

A result should communicate, where relevant: title, record type, primary district, concise context, why or where it matched when useful, date/period, public status, principal classification, and meaningful relationship context.

## 13.3 Search behavior

Search must be operable without animation, work by keyboard and touch, expose no-result state explicitly, preserve the query when returning from a result where practical, link to canonical records, and avoid creating alternate result pages for the same record.

## 13.4 Search ranking

This specification does not prescribe a search engine or ranking algorithm.

Whatever method is chosen must not distort canonical ownership or present temporary promotional importance as structural truth unless an explicit editorial ranking is approved.

---

# 14. Index

The Index is the platform-wide precise view of public canonical content.

It is distinct from Search.

Search answers: **What matches my query?**

Index answers: **What exists, and how is it classified?**

## 14.1 Index obligations

The Index must support clear access by approved structural dimensions such as district, content type, discipline, theme, and year/period.

Other dimensions may be added when supported by approved content governance.

## 14.2 Index behavior

Index views must preserve canonical links, expose active filters, expose result count/scope, be resettable, preserve meaningful state on return, avoid decorative ambiguity, remain usable at large content volumes, and provide semantic relationships independent of spatial layout.

## 14.3 Index is not a second taxonomy

The Index consumes the platform's approved content classifications.

It may not invent a parallel categorization system merely for interface convenience.

---

# 15. Filters, Lenses, Sorting, and Recomposition

## 15.1 Filters

Filters narrow a known set.

They must be explicitly labeled, show active state, support clear reset, expose result scope, remain usable without hover, and preserve state when opening and returning from a record where practical.

## 15.2 Lenses

A lens changes how the same canonical body of content is read.

Examples may include professional practice area, theme, lineage, medium, status, period, or another approved district-specific reading.

A lens must not imply that records change ownership.

## 15.3 Sorting

Sorting changes order, not membership. Sort state must be visible.

## 15.4 Recomposition

When filters or lenses change a spatial composition, the remaining content should be deliberately recomposed rather than simply disappearing and leaving arbitrary gaps.

The static semantic order must remain understandable.

---

# 16. Archives and Historical Continuity

Archives preserve valid public history. They are not trash folders.

## 16.1 Archive principles

Archived records may remain public when they retain documentary value, provenance, compatibility/support relevance, historical relevance, research or experimental lineage, or curatorial significance.

## 16.2 Archive state

Archive status must be explicit.

An archived item must not appear active, current, available, or ongoing unless another state explicitly says so.

## 16.3 Products archive

Commercial retirement must not erase design history.

Products may preserve prior availability, edition/version history, specifications, successor relationships, support relevance, and origin links.

## 16.4 Lab archive

Paused, failed, invalid, abandoned, transferred, or concluded experimental records may remain visible when meaningful and correctly labeled.

## 16.5 Art archive

Art archive access must preserve artwork identity and curatorial relationships without requiring the homepage to expose every work.

---

# 17. District Lifecycle and Public State

The platform must distinguish state from visual atmosphere.

## 17.1 Shared state classes

Where applicable, the platform must be able to represent current, ongoing, completed, archived, experimental, paused, failed, invalid, transferred, unavailable, forthcoming, available, limited, preorder, temporarily unavailable, capacity closed, sold out, discontinued, superseded, regionally unavailable, free access, and published.

Not every district uses every state.

## 17.2 District-specific authority

Exact lifecycle vocabularies owned by Universe specifications take precedence over generic shared vocabulary.

Implementation must not normalize meaningful distinctions away merely to reduce the number of status types.

## 17.3 State transitions

State transitions may affect labels, available actions, inclusion in curated views, filters, archive placement, Search context, and relationship language.

State transitions must not automatically change canonical route or ownership.

---

# 18. Global Utilities

## 18.1 Search

Global and direct.

## 18.2 Index

Global and direct.

## 18.3 Contact

Contact must be reachable globally.

It may resolve to About while remaining a distinct direct visitor intention.

Contact actions must use literal commitment labels.

## 18.4 Language

Language selection is a global utility only when multilingual content is activated.

This specification does not approve launch languages, translation completeness, fallback language, URL localization strategy, or editorial translation workflow.

Those remain product/content decisions.

Any future language system must preserve canonical identity and accessibility.

## 18.5 Legal and administrative

A global legal/admin utility must provide the platform-wide administrative information required by the actual operating context.

This specification defines ownership only.

It does not invent legal wording, business identity, tax treatment, jurisdictional requirements, policies, or compliance text.

## 18.6 Sound

Sound is not a required global utility.

The platform baseline is silent.

Media with sound requires explicit user activation and appropriate control/accessibility.

---

# 19. Design System Application

`DESIGN_SYSTEM.md v1.0` is implementation-authoritative for shared static visual rules.

Implementation must use its approved:

- Inter primary typeface;
- IBM Plex Mono metadata/technical typeface;
- semantic typographic roles;
- 4 px micro-unit;
- 8 px primary spacing rhythm;
- 4 / 8 / 12-column structural grids;
- neutral warm color architecture;
- Dark Field and Light Field compositions;
- shared focus semantics;
- predominantly rectilinear geometry;
- restrained radius;
- linework language;
- shared action hierarchy;
- metadata/annotation syntax;
- media framing rules;
- responsive principles;
- WCAG 2.2 AA minimum target.

## 19.1 District variation

Districts may vary through approved controlled emphasis such as field condition, one accent family, density, media prominence, linework emphasis, spatial composition, atmospheric depth, and motion emphasis.

A district may not replace the shared visual system.

## 19.2 Functional interfaces

Search, Index, filters, forms, commerce, comparisons, and other task-heavy interfaces must remain conventionally understandable.

Atmosphere must recede when it competes with task clarity.

## 19.3 Static completeness

The interface must remain fully understandable when animation is unavailable.

---

# 20. Animation System Application

`ANIMATION_SYSTEM.md v1.0` is implementation-authoritative for shared motion.

Approved semantic roles are Threshold, Passage, Approach, Focus, Sequence, Comparison, Assembly, Trace, Recession, Return, Confirmation, and State Change.

Implementation must assign motion according to semantic consequence.

## 20.1 Motion hierarchy

From least to greatest architectural consequence:

1. Feedback
2. State Change
3. Focus
4. Sequence
5. Record Passage
6. District Passage
7. World Threshold

Local UI feedback must never carry the same weight as district or world transitions.

## 20.2 Native scrolling

Native browser scrolling is the baseline.

Global scroll hijacking is prohibited.

## 20.3 Repeated navigation

First entry may be richer.

Repeated navigation becomes more efficient through reduced assembly, shorter duration, less environmental ceremony, faster access to content, and preservation of known context.

## 20.4 User priority

Navigation, keyboard input, touch, scroll, browser history, cancellation, and subsequent user actions override nonessential animation.

The final interface must always resolve to the latest valid user action.

## 20.5 Reduced motion

Reduced-motion mode must preserve all function and meaning.

Spatial travel is replaced by stable state changes rather than leaving relationships unexplained.

## 20.6 Prohibited interface motion

Global interface implementation must not use bounce, elastic overshoot, cinematic fly-through, page rotation, large global zoom, decorative cursor trails, global scroll hijacking, mandatory intro film, pervasive kinetic typography, constant ambient viewport motion, or motion that gates content.

Authored artworks or Lab experiments may contain motion intrinsic to the work itself, but the interface around them remains governed by the platform system.

---

# 21. Cross-District Passage

Direct district-to-district travel is permitted.

The user is not required to return through Home between districts.

## 21.1 Passage obligations

A cross-district passage must communicate origin district, destination district, relational reason where entered through a record relationship, continuity of the shared platform, and orientation on arrival.

## 21.2 Motion roles

District-to-district movement uses Passage, plus Threshold only when the environmental change justifies it.

## 21.3 Relational passage

When movement occurs through a relationship, the link must explain why.

Examples:

- view the research behind this project
- inspect the experiment that produced this method
- see the artwork
- view the available edition
- return to the originating work

Generic “more” links are insufficient where a relational label is available.

## 21.4 Home as origin

Home remains the shared origin and return condition of the platform even though it is not a mandatory transit hub.

---

# 22. Focus Behavior

The shared Focus model is:

1. selected material declares itself;
2. surrounding material recedes;
3. selected content reaches a stable inspection condition;
4. necessary controls and metadata remain available;
5. Return restores the previous context.

Focus is achieved primarily through hierarchy and recession, not dramatic zoom.

## 22.1 Work

Focus supports evidence inspection and must preserve project context and captions/provenance.

## 22.2 Research

Focus supports reading and artifact inspection. Motion settles after entry.

## 22.3 Lab

Focus may retain active explanatory motion where transformation itself is evidence.

Interface motion and experiment output must remain distinguishable.

## 22.4 Art

Art receives strongest interface recession.

The artwork controls its own motion. Interface motion must remain minimal around the encounter.

## 22.5 Products

Focus prioritizes rapid evaluation of offer, variation, price/availability, relevant specification, and commitment action.

## 22.6 About

Focus supports sustained biography, chronology, experience, values, or archival reading without theatricalizing the person.

---

# 23. Overlay and Modal Behavior

Overlays must preserve the underlying context, visually and semantically identify themselves as temporary, provide explicit close, support Escape where appropriate, move keyboard focus correctly, return keyboard focus to the initiating control, prevent inaccessible interaction with obscured modal background content, restore prior page state, and remain usable in reduced-motion mode.

An overlay must not be used to avoid creating a canonical route when content deserves an addressable record.

---

# 24. Return and Spatial Memory

Return is a platform-wide behavior.

Where technically possible, the system should preserve previous route, parent district, prior scroll position, selected record, active filters, active lens, comparison state, gallery position, lineage branch, relevant expanded/collapsed state, and origin for shared geometry.

## 24.1 Return target

Return restores the context the visitor actually left.

It must not arbitrarily reset to the top of a district or clear filters unless the user explicitly requested a reset.

## 24.2 Direct entry

Direct/deep links receive an abbreviated orientation state.

The system must not fabricate a prior context.

## 24.3 Browser history

Back and Forward must behave predictably.

Custom state must not break normal browser-history expectations.

---

# 25. Loading Behavior

Loading must preserve structure.

## 25.1 Required loading properties

- expected media proportions are reserved;
- layout shift is minimized;
- controls do not move unpredictably;
- loading state is named when delay is meaningful;
- the interface remains interruptible;
- essential navigation remains available;
- loading animation does not become branded spectacle.

## 25.2 Placeholders

Placeholders may represent geometry or reserved space.

They must not invent fake content, fake project imagery, fake artwork, fake evidence, fake product details, or fake records.

## 25.3 Progressive loading

Nonessential atmospheric layers may load after essential orientation and content.

The content and navigation hierarchy must win over environmental effect.

---

# 26. Empty, No-Result, Unavailable, and Archived States

## 26.1 Empty

A genuine empty state must explain what is empty, avoid implying failure, avoid fake filler, and provide the next valid action where one exists.

A district with little content must still feel intentional through composition rather than invented records.

## 26.2 No result

A no-result state must preserve the query/filter context, state that no matching public records were found, provide clear reset/edit options, and avoid implying that content exists but is hidden.

## 26.3 Unavailable

Unavailable content or offers must state what is unavailable, whether the state is temporary/permanent/regional/sold out/capacity-based/or another approved state, and what action remains possible if any.

## 26.4 Archived

Archived state must remain identifiable, preserve historical context, avoid current-action affordances that no longer apply, and expose successors or related active records where meaningful.

---

# 27. Failure and Error Behavior

Failure must be explicit, calm, and recoverable.

## 27.1 Failure principles

Errors must state what failed in user-understandable language, preserve valid user input whenever possible, not erase successful prior state, identify the next valid action, avoid blame, avoid shake-based error motion, not depend on color alone, and be announced appropriately to assistive technology.

## 27.2 Partial failure

If one nonessential media or atmospheric element fails, usable page content must remain available when technically possible.

The system should degrade the nonessential layer rather than fail the entire page.

## 27.3 Transaction and contact failure

When a commitment action fails, no success confirmation may be shown, the attempted state should remain recoverable, the visitor must know whether anything was submitted or committed, and duplicate submission risk must be minimized by the chosen technical solution.

---

# 28. Confirmation Behavior

Confirmation is concise and conclusive.

It applies to actions such as message sent, purchase accepted, reservation/request submitted, subscription action accepted, preference saved, and copy/download completed where feedback is useful.

A confirmation must identify the completed action, avoid celebratory spectacle, remain accessible without animation, expose next steps where relevant, and distinguish submission from final approval where a human process continues.

---

# 29. Responsive Obligations

Responsive behavior preserves the same platform, not a simplified alternate website.

## 29.1 Structural grid

Implementation uses 4 columns in compact contexts, 8 columns in medium contexts, and 12 columns in wide and ultra-wide contexts.

Exact threshold adjustment is allowed only when real content testing demonstrates need, while preserving the structural logic.

## 29.2 Responsive priorities

As viewport space decreases, preserve in this order:

1. orientation
2. primary content
3. direct interaction
4. readable hierarchy
5. state and metadata required for understanding
6. atmosphere

Atmospheric complexity is reduced before usability.

## 29.3 Small screens

Small screens should shorten motion distances, reduce simultaneous layers, favor clear vertical progression where appropriate, preserve direct navigation, avoid hover dependency, maintain touch targets, avoid requiring precision gestures, and keep commerce/Search/Index/forms conventionally usable.

## 29.4 Large screens

Large screens may support more peripheral annotation, wider spatial composition, simultaneous context, restrained depth, and greater void.

They must not stretch prose to unreadable widths or force media to fill space without purpose.

## 29.5 Input independence

All primary tasks must work with keyboard, touch, mouse, trackpad, and assistive technology.

Hover is enhancement only.

---

# 30. Accessibility Obligations

WCAG 2.2 AA is the minimum platform target.

Accessibility is part of the primary architectural system.

## 30.1 Required parity

Every spatial, map-like, lineage, exhibition, timeline, comparison, atmospheric, or field view requires a structured semantic equivalent.

## 30.2 Keyboard

All navigation, links, buttons, filters, focus states, media controls, comparisons, forms, overlays, and immersive modes must be keyboard operable.

## 30.3 Focus

Visible keyboard focus is global and cannot be district-customized away.

Focus order must follow meaningful reading and interaction order.

## 30.4 Semantic relationships

Relationships conveyed by line, position, proximity, depth, motion, or color must also be represented semantically.

## 30.5 Media

The platform must support, as applicable, alternative text, captions, credits, transcripts, audio description or equivalent description, duration, playback controls, pause/stop, and clear distinction between artwork and documentation.

Alternative descriptions must not invent interpretation unsupported by the actual content.

## 30.6 No single-channel meaning

Essential meaning may not depend on color alone, motion alone, hover alone, sound alone, position alone, or shape alone.

## 30.7 Reduced motion

Reduced motion preserves hierarchy, selection, orientation, relationship, state change, focus, Return, and access to all content.

## 30.8 Reading

Core text, state, metadata, controls, commercial conditions, and contact information must be readable without requiring media zoom.

## 30.9 Forms

Forms must provide explicit labels, understandable required fields, accessible validation, persistent error messages, clear commitment text, success/failure status, and keyboard/screen-reader compatibility.

---

# 31. Performance and Progressive Enhancement

The platform's meaning must survive reduced technical capability.

## 31.1 Priority order under constraint

When performance must be reduced, degrade in this order:

1. ambient/environmental motion;
2. complex atmospheric layers;
3. nonessential masks/blur/parallax;
4. decorative depth;

before compromising navigation, content, focus, state feedback, accessibility, or transaction clarity.

## 31.2 Static baseline

A static or minimally animated render must still communicate identity, hierarchy, navigation, content, state, relationships, and actions.

## 31.3 Layout stability

Implementation must minimize unexpected layout movement.

Media frames and known content structures should reserve space.

## 31.4 User action priority

No nonessential animation may block or queue ahead of a subsequent user action.

---

# 32. Artwork Motion Versus Interface Motion

The platform distinguishes authored content motion from interface motion.

## 32.1 Artwork

An artwork may animate, loop, react, use sound, use unusual interaction, or intentionally challenge normal interface conventions when those properties belong to the artwork itself.

## 32.2 Lab experiment

A Lab experiment may use nonstandard motion or interaction when that behavior is the experimental subject or evidence.

## 32.3 Interface boundary

The surrounding platform must make clear what belongs to the artwork/experiment, what belongs to site navigation, how to pause/exit where appropriate, how accessibility is provided, and how the user returns.

Experimental content does not grant permission to break global navigation or accessibility.

---

# 33. Commerce and Commitment

Products must be integrated into the same platform while preserving familiar commercial clarity.

## 33.1 Commitment labels

Actions must state the actual commitment.

Examples: Purchase, Reserve, Subscribe, Request a quote, Apply for a commission, Book a consultation, Send a message.

Vague action language must not conceal consequences.

## 33.2 Commercial transparency

Where relevant, evaluation must expose before commitment: price/pricing basis, currency, availability, version/variant, what is included, what is excluded, delivery/access method, lead time, recurring terms, licensing summary, support, and applicable policy routes.

## 33.3 Ethical commerce

Implementation must not introduce false scarcity, invented countdowns, hidden costs, deceptive defaults, obstructive cancellation, misleading comparison pricing, aggressive cross-selling, or false urgency.

Real constraints may be displayed plainly.

---

# 34. Contact Experience

Contact is a global intention with About ownership.

The contact experience must identify the recipient/practice, use clear message purpose/pathway where needed, label actions literally, state submission status, preserve entered information after recoverable failure where possible, avoid sales-funnel pressure, provide an alternate contact route when editorially approved, and remain accessible and low-friction.

Exact public contact details are a content decision.

---

# 35. Language and Localization Readiness

The architecture must not make later multilingual support impossible.

Records and interface content should be capable of separating canonical identity, language-specific display text, translated long-form content, and localized commercial information where required.

However, v1.0 does not decide which languages launch, whether all records are translated, URL language prefixes, translation fallback, locale negotiation, or currency conversion logic.

These require separate content/product decisions.

---

# 36. Legal and Administrative Boundary

Implementation must provide a place for required legal and administrative information.

This specification does not approve the content of that information.

Developers may implement the utility route/container, navigation access, document/page structure, semantic headings, and links from relevant commercial/contact flows.

Developers may not invent privacy policy, terms, company details, seller identity, tax statements, return/refund rules, licensing terms, or statutory notices.

Those require actual legal/business inputs.

---

# 37. Implementation Boundaries

The platform is implementation-ready at the level of product behavior and system architecture.

It is intentionally not implementation-prescriptive about unnecessary technical choices.

## 37.1 Developers may choose

Subject to the acceptance criteria, implementation planning may choose frontend framework, rendering strategy, content-management architecture, database or file-backed data layer, hosting, image/media delivery, search technology, commerce provider, payment provider, form infrastructure, analytics, animation library, state-management approach, testing framework, and deployment architecture.

These choices must serve the approved behavior rather than alter it.

## 37.2 Developers may not redefine

Developers may not independently change platform districts, route hierarchy, canonical ownership, primary audience priority, Search/Index distinction, global versus district navigation, district purpose, page-role hierarchy, lifecycle meaning, accessibility target, Design System semantics, Animation System roles, cross-district relationships, content-placement tests, Art/Product ownership boundary, Research/Lab/Work distinction, Home as shared origin, or professional-legibility requirement.

## 37.3 Technical limitation rule

If a technical choice cannot implement an approved requirement, the response is not to remove the requirement silently.

The team must either choose a different technical approach or escalate the constraint for a documented product/design decision.

---

# 38. Directly Implementable Versus Decision-Dependent

## 38.1 Developers may implement directly from approved specifications

The following are approved enough to enter implementation planning without further design decisions:

- top-level route architecture;
- district route blueprint;
- global navigation roles;
- district navigation logic;
- Search route and role;
- Index route and role;
- canonical-record principle;
- relationship model;
- archive behavior;
- focus system;
- overlay behavior;
- Return/spatial-memory behavior;
- loading-state rules;
- empty/no-result rules;
- failure/confirmation behavior;
- responsive structural logic;
- accessibility obligations;
- Design System typography/grid/spacing/static semantics;
- Animation System motion-role grammar;
- cross-district passage rules;
- static and reduced-motion parity;
- semantic state requirements;
- functional-interface clarity requirements;
- legal/admin utility container and ownership boundary.

## 38.2 Content decisions still required

Implementation must receive real content decisions for initial record inventory, which records launch publicly, selected/featured/curated items, actual project descriptions, actual Research themes and records, public Lab experiments, artwork selection and interpretation, actual Products and prices, actual About biography, current-focus copy, contact details, credits and contributor data, captions and alternative text, actual lifecycle states, and actual relationship links.

## 38.3 Product decisions still required

The following remain product/editorial decisions:

- launch language(s);
- exact translation rollout;
- which optional district views launch immediately;
- which Level 4 subentries deserve routes;
- whether any private/protected content exists;
- account/customer functionality;
- saved items;
- newsletter/update system;
- actual commerce launch scope;
- actual checkout or enquiry paths by offer;
- actual support model;
- any future Journal/Updates content type;
- any future new district.

## 38.4 Legal/business decisions still required

Before relevant public launch, actual inputs are required for legal entity/seller identity, privacy policy, terms, consumer/business conditions, licensing terms, taxes, shipping/fulfilment policies, refund/return/withdrawal rules, jurisdiction-specific disclosures, and payment-security wording.

## 38.5 Technical decisions still required

Implementation Planning must choose and document application architecture, content/data architecture, component architecture, state persistence strategy, search implementation, media pipeline, commerce integrations if activated, deployment, observability, testing, security, and privacy implementation.

Those decisions may not alter approved platform behavior.

---

# 39. Component Contract Requirement

Every reusable implementation component must define its operational contract.

At minimum, the contract should identify where applicable:

- semantic purpose;
- supported page roles;
- required content;
- optional content;
- interactive states;
- focus behavior;
- keyboard behavior;
- touch behavior;
- loading state;
- empty state;
- failure state;
- confirmation state;
- responsive behavior;
- accessibility semantics;
- Design System tokens/roles;
- Animation System semantic role;
- reduced-motion equivalent;
- return/state persistence behavior;
- performance fallback.

Components must consume approved system roles rather than inventing local design or motion rules.

---

# 40. Motion Contract Requirement

Every animated reusable component or transition must define semantic motion role, trigger, origin, destination, persistent anchors, initial state, active state, exit/Return state, approved duration/easing token, interruption behavior, repeated-navigation behavior where relevant, reduced-motion equivalent, keyboard behavior, touch behavior, and performance fallback.

Motion may not be added simply because a library makes it available.

---

# 41. Record Contract Requirement

Every canonical record type must define canonical ID, canonical route, owning district, type, title, public state, visibility, required metadata, optional metadata, classifications, relationships, media schema, accessibility schema, archive behavior, Search representation, Index representation, direct-entry orientation, and related-record presentation.

The technical schema may differ by implementation, but the semantic contract must be preserved.

---

# 42. Platform-Wide QA Strategy

QA must test behavior against approved system contracts, not only screenshot similarity.

Testing must cover structure, content identity, navigation, state, relationships, visual-system compliance, motion-system compliance, accessibility, responsive behavior, performance, failure recovery, browser history, direct links, canonical routing, and Search/Index integrity.

---

# 43. Structural Acceptance Criteria

The implementation passes structural acceptance when:

1. all approved top-level routes resolve correctly;
2. canonical record routes are unique;
3. curated views link to canonical records;
4. Search and Index link to canonical records;
5. no record is duplicated across districts as a competing canonical page;
6. district ownership follows approved placement rules;
7. global utilities remain outside district identity;
8. deep links provide orientation;
9. browser Back/Forward remains predictable;
10. future content can be added without changing primary navigation.

---

# 44. Navigation Acceptance Criteria

The implementation passes navigation acceptance when:

1. every district is directly reachable;
2. Home is not required as a mandatory transit screen;
3. current district is always identifiable;
4. direct and exploratory navigation coexist;
5. no essential route depends on hover, animation, sound, gesture discovery, or spatial interpretation;
6. focused states provide clear exit;
7. previous/next is used only for real sequences;
8. Return restores meaningful prior context where possible;
9. Search, Index, Contact, and legal/admin utilities are globally reachable;
10. small-screen navigation remains complete.

---

# 45. Canonical Ownership Acceptance Criteria

The implementation passes ownership acceptance when:

1. every substantive record has one owning district;
2. cross-district presence is implemented through relationships or references;
3. Research, Lab, and Work records remain distinct by purpose/state;
4. Art retains artwork ownership when commercial offers exist;
5. Products owns transaction/commercial truth rather than origin narrative;
6. Lab retains experimental lineage after maturation;
7. About does not absorb commercial/legal content;
8. global legal/admin content is separated from About and offer-specific Products data;
9. no visible relationship is fabricated by UI only;
10. canonical routes remain stable across filters and presentation modes.

---

# 46. Visual-System Acceptance Criteria

The implementation passes Design System acceptance when:

1. Inter is the shared primary interface typeface;
2. IBM Plex Mono is used only in approved technical/metadata roles;
3. semantic type hierarchy is preserved;
4. spacing follows the 4 px / 8 px system;
5. layouts follow the 4 / 8 / 12 structural grids;
6. district identity is controlled variation, not separate branding;
7. line, plane, frame, void, field, and signal are used semantically;
8. essential information never depends on color;
9. functional interfaces remain conventionally understandable;
10. static layouts remain complete without animation;
11. media is not forced into a universal aspect ratio;
12. focus appearance remains globally accessible;
13. no district replaces global control anatomy or accessibility behavior.

---

# 47. Motion-System Acceptance Criteria

The implementation passes Animation System acceptance when:

1. every significant animation has a semantic role;
2. motion consequence matches architectural consequence;
3. navigation is never gated by animation;
4. native scrolling remains baseline;
5. overlays do not feel like districts;
6. Focus primarily quiets surroundings;
7. Return preserves context;
8. repeated navigation becomes more efficient;
9. user input interrupts nonessential animation;
10. reduced-motion mode preserves meaning;
11. comparison preserves stable reference points;
12. lineage/Trace reflects real relationships;
13. interface motion remains subordinate to artwork/experiment motion;
14. prohibited spectacle patterns are absent.

---

# 48. Accessibility Acceptance Criteria

The implementation passes accessibility acceptance when:

1. WCAG 2.2 AA requirements are met at minimum;
2. all core tasks work by keyboard;
3. focus is visible everywhere;
4. focus order remains logical;
5. spatial relationships have semantic equivalents;
6. essential meaning does not rely on color, motion, hover, sound, position, or shape alone;
7. reduced-motion mode has functional parity;
8. forms provide accessible validation and status;
9. media supports the required alternatives;
10. overlays manage focus correctly;
11. Search, Index, filters, commerce, and Contact are accessible;
12. small-screen touch use does not require precision pointing;
13. direct-entry pages remain understandable without prior spatial context.

---

# 49. Responsive Acceptance Criteria

The implementation passes responsive acceptance when:

1. every district remains conceptually recognizable across sizes;
2. no mobile version collapses into an unrelated conventional site;
3. orientation survives reduction of atmosphere;
4. primary content and actions remain available without horizontal dependency;
5. grids transition coherently between 4, 8, and 12 columns;
6. long-form reading maintains suitable measure;
7. media remains legible and correctly framed;
8. filters remain usable and stateful;
9. touch does not depend on hover;
10. motion travel is reduced on small screens;
11. ultra-wide screens gain composition/void rather than stretched prose.

---

# 50. State and Recovery Acceptance Criteria

The implementation passes state acceptance when:

1. loading preserves layout;
2. empty states are explicit;
3. no-result states preserve query/filter context;
4. unavailable states identify the actual reason when known;
5. archived content cannot be mistaken for current content;
6. failed states are recoverable where possible;
7. failed submission never displays success;
8. confirmation states describe the completed action;
9. user input is preserved after recoverable errors where possible;
10. browser history and Return do not arbitrarily destroy prior context.

---

# 51. Search and Index Acceptance Criteria

The discovery system passes when:

1. Search and Index operate on the same canonical public record set;
2. Search does not create alternate record identities;
3. Index does not create a parallel taxonomy;
4. filters expose active state;
5. filters are resettable;
6. result context identifies district/type;
7. Search has an explicit no-result state;
8. opening and returning from a result preserves useful context where possible;
9. unpublished/private records are excluded;
10. relationships and classifications are represented truthfully.

---

# 52. Commerce Acceptance Criteria

Products passes when:

1. essential commercial conditions precede commitment;
2. commitment labels are literal;
3. commercial status is explicit;
4. artwork acquisition does not displace the canonical Art record;
5. product provenance links to canonical origin records;
6. archive/sold-out/discontinued records preserve history appropriately;
7. no deceptive urgency or dark pattern is introduced;
8. transactional interfaces remain familiar and accessible;
9. transaction failure/confirmation is unambiguous;
10. actual legal/business data is supplied rather than invented.

---

# 53. Content Integrity Acceptance Criteria

The platform passes content integrity when:

1. no project, artwork, experiment, publication, product, biography detail, credit, legal fact, or status is invented to fill layout;
2. unknown information remains honestly unknown;
3. preliminary work is not visually or verbally presented as completed;
4. failed Lab work is not cosmetically reframed as success;
5. Research uncertainty is visible where relevant;
6. Work contribution is explicit;
7. artwork documentation is distinguishable from artwork;
8. Product limitations are visible where relevant;
9. authorship and collaborator roles are accurate;
10. cross-record relationships correspond to actual editorial relationships.

---

# 54. Implementation Change Control

## 54.1 Minor implementation decision

A decision is implementation-owned when it changes technical means without changing approved public behavior.

Examples include component internal structure, data fetching, caching, build tooling, library choice, performance optimization, and code organization.

## 54.2 Specification-impacting decision

A decision requires product/system review when it would alter a route, page role, global utility, state model, Return behavior, Search/Index behavior, accessibility behavior, shared component contract, motion role, or responsive hierarchy.

## 54.3 Upstream-authority decision

A decision requires upstream source revision when it would alter platform identity, audience priority, district definition, canonical ownership, Universe concept, visual-system law, motion-system law, or cross-universe requirement.

Implementation is not authorized to make these changes.

---

# 55. Required Implementation Planning Outputs

The next project phase must translate this specification into a sequenced implementation plan.

Implementation Planning should produce at minimum:

1. route implementation map;
2. page-type/component map;
3. canonical content-schema plan;
4. relationship-schema plan;
5. global navigation plan;
6. district-navigation plan;
7. Search/Index plan;
8. state-management and Return-memory plan;
9. Design System token/component translation plan;
10. Animation System motion-contract plan;
11. responsive implementation plan;
12. accessibility test plan;
13. media strategy;
14. content-loading strategy;
15. error/empty/loading/confirmation component plan;
16. legal/admin placeholder-content boundary;
17. content-decision dependency list;
18. technical architecture decision record;
19. milestone sequence;
20. verification strategy.

Each implementation milestone must remain small, sequential, testable, and independently verifiable.

---

# 56. Recommended Implementation Sequence

## Stage 1 — Structural foundation

- route skeleton;
- global layout;
- semantic page shells;
- global navigation;
- district context;
- Design System tokens;
- accessibility baseline.

## Stage 2 — Canonical content architecture

- record contracts;
- relationship model;
- classification model;
- archive/state model;
- fixture or validated real-content loading.

## Stage 3 — Global discovery

- Index;
- filters;
- Search;
- no-result and empty states;
- direct-entry orientation.

## Stage 4 — Shared interaction states

- Focus;
- overlays;
- Return;
- spatial memory;
- loading;
- failure;
- confirmation;
- comparison primitives.

## Stage 5 — District shells

- Home;
- Work;
- Research;
- Lab;
- Art;
- Products;
- About

using approved shared systems and district-specific emphasis.

## Stage 6 — Motion layer

- motion primitives;
- Threshold/Passage;
- Focus/Recession;
- Return;
- Sequence;
- Comparison;
- Trace;
- reduced-motion equivalents;
- repeated-navigation behavior.

## Stage 7 — Content integration

Only verified real content. No invented filler.

## Stage 8 — Commerce and administrative activation

Only when actual products, business details, legal text, and operational decisions exist.

## Stage 9 — Verification

- routes;
- canonical ownership;
- responsive behavior;
- accessibility;
- motion;
- state recovery;
- performance;
- content integrity;
- Search/Index;
- commerce where activated.

This sequence may be decomposed further during planning.

---

# 57. Explicit Non-Goals

This specification does not choose a frontend framework, CMS, database, hosting provider, deployment platform, commerce provider, payment provider, search engine, animation library, analytics stack, authentication system, asset CDN, or translation platform.

It does not author actual project content, biography, legal text, product catalogue, prices, privacy policy, terms, or translations.

It does not redesign Universe concepts, visual system, motion system, or information architecture.

---

# 58. Platform Invariants

The following must remain true regardless of implementation technology or future growth.

1. The platform is one coherent world.
2. Home remains the shared origin and orientation condition.
3. Work, Research, Lab, Art, Products, and About retain distinct purposes.
4. Every substantive item has one canonical identity.
5. Relationships replace duplication.
6. Exploration and direct access coexist.
7. Professional legibility remains available at all times.
8. Curated foreground and comprehensive depth coexist.
9. Search and Index use the canonical content system.
10. District atmosphere never overrides usability.
11. Design System rules define shared form.
12. Animation System roles define shared change.
13. Accessibility is part of the primary system.
14. Reduced motion preserves meaning.
15. Responsive layouts preserve hierarchy and intent.
16. Return preserves context where possible.
17. Content state is explicit.
18. Commercial truth remains separate from origin truth.
19. Implementation technical choices may not redefine product architecture.
20. Future growth must extend the system rather than reconstruct it.

---

# 59. Approved Decision Register

| ID | Decision | Status |
|---|---|---|
| PS-001 | `PLATFORM_SPECIFICATION.md` is the single implementation-facing operational reference while upstream documents retain domain authority. | Approved |
| PS-002 | The platform operates as seven districts plus global utilities. | Approved |
| PS-003 | The approved Information Architecture route blueprint governs public route identity. | Approved |
| PS-004 | Shared page roles are world threshold, district overview, curated view, comprehensive view, grouping view, canonical record, focus, comparison, overlay, and utility. | Approved |
| PS-005 | Global and district navigation are distinct but use one recognizable hierarchy. | Approved |
| PS-006 | Search, Index, Contact, language when activated, and legal/admin information are global utilities, not districts. | Approved |
| PS-007 | Every substantive item has one canonical record and one primary owning district. | Approved |
| PS-008 | Cross-district presence is implemented through explicit relationships rather than duplicate records. | Approved |
| PS-009 | Work owns professional outcome truth; Research owns inquiry truth; Lab owns experimental truth; Art owns artwork truth; Products owns commercial truth; About owns authorship truth. | Approved |
| PS-010 | Platform-wide legal/admin truth remains globally owned, distinct from About and offer-specific Products content. | Approved |
| PS-011 | Every canonical record implements shared routing, status, classification, relationship, accessibility, and discovery obligations. | Approved |
| PS-012 | Search and Index operate on the same public canonical set while serving different tasks. | Approved |
| PS-013 | Filters and lenses do not change canonical ownership. | Approved |
| PS-014 | Archives preserve public historical truth rather than acting as deletion bins. | Approved |
| PS-015 | Content and lifecycle state must be named explicitly rather than inferred from styling. | Approved |
| PS-016 | The Design System is authoritative for shared static form. | Approved |
| PS-017 | The Animation System is authoritative for shared temporal behavior. | Approved |
| PS-018 | Focus uses hierarchy and recession while preserving origin and Return. | Approved |
| PS-019 | Overlays are temporary Focus/Recession states and do not imply new architectural destinations. | Approved |
| PS-020 | Return preserves route, position, selection, lens, filter, comparison, and related context where technically possible. | Approved |
| PS-021 | Direct links remain first-class and receive abbreviated orientation without fabricated prior context. | Approved |
| PS-022 | Loading preserves structure and never invents fake content. | Approved |
| PS-023 | Empty, no-result, unavailable, archived, failure, and confirmation states are explicit and accessible. | Approved |
| PS-024 | Direct district-to-district passage is permitted; Home is the shared origin but not a mandatory transit hub. | Approved |
| PS-025 | Native scrolling is the baseline and user input overrides nonessential motion. | Approved |
| PS-026 | WCAG 2.2 AA is the minimum platform accessibility target. | Approved |
| PS-027 | Responsive implementation preserves the same conceptual platform across screen sizes. | Approved |
| PS-028 | Functional interfaces prioritize clarity over atmosphere. | Approved |
| PS-029 | Artwork or experiment motion may differ as authored content; surrounding interface motion remains governed by the platform system. | Approved |
| PS-030 | Developers may choose technical means but may not reinterpret approved platform behavior. | Approved |
| PS-031 | Actual content, legal/business data, launch-language decisions, and unresolved product scope remain external dependencies rather than implementation inventions. | Approved |
| PS-032 | Platform-wide QA must verify structure, ownership, navigation, Design System, Animation System, accessibility, responsiveness, state recovery, discovery, and content integrity. | Approved |
| PS-033 | Technical constraints that threaten an approved requirement must be escalated rather than silently resolved through redesign. | Approved |
| PS-034 | Implementation Planning is the next project phase. | Approved |

---

# 60. Approval and Phase Completion

`PLATFORM_SPECIFICATION.md v1.0` is **Approved**.

It is now the complete implementation-facing specification for how the Personal Platform operates as one system.

It consolidates Platform Vision, Information Architecture, the Universe Specification Set, Cross-Universe Requirements, Design System, and Animation System.

It prevents implementation from reconstructing the architecture independently from district documents.

It preserves the source specifications as domain authorities while providing one operational reference for routing, navigation, page roles, canonical ownership, relationships, content contracts, Search, Index, archives, lifecycle states, utilities, visual-system application, motion-system application, responsive behavior, accessibility, focus, overlays, Return, loading, empty/failure/confirmation states, cross-district passage, implementation boundaries, and acceptance criteria.

The approved project sequence is now:

> **Universe Specifications ✓ → Cross-Universe Requirements ✓ → Design System ✓ → Animation System ✓ → Platform Specification ✓ → Implementation Planning**

The next deliverable is the implementation plan.

---

# 61. Final Operational Statement

The Personal Platform must be implemented as a coherent, persistent architectural system rather than a collection of independently designed pages.

Every route must preserve identity.  
Every record must have one owner.  
Every relationship must be truthful.  
Every district must remain distinct without becoming a separate brand.  
Every state must be understandable.  
Every transition must have meaning.  
Every focused condition must provide a way back.  
Every atmospheric layer must yield to access, content, and clarity.  
Every technical choice must remain subordinate to the approved platform architecture.

The implementation succeeds when the visitor can move quickly or slowly, directly or exploratorily, across professional work, research, experimentation, art, products, and authorship while always understanding where they are, what they are seeing, how it relates to the wider practice, and what they can do next.

**The platform is no longer a set of design intentions. It is a specified operating system for one evolving practice.**
