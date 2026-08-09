# Personal Platform — Information Architecture

**Document:** `INFORMATION_ARCHITECTURE.md`  
**Version:** 1.0  
**Status:** Approved / Closed  
**Approved:** 8 August 2026  
**Domain owner:** Personal Platform — Information Architecture  
**Authority:** Authoritative upstream dependency for routes, hierarchy, navigation, canonical ownership, record relationships, discovery, categorization, lifecycle/public-state handling, and structural scalability  
**Upstream authority:** `PLATFORM_VISION.md v1.0` — Approved / Closed  
**Excluded:** Visual design, motion design, technical architecture, database/CMS design, implementation technology, and project-specific editorial content

---

# 1. Purpose

This document is the authoritative structural blueprint for the Personal Platform.

It defines:

- routes
- hierarchy
- navigation requirements
- canonical record ownership
- district boundaries
- cross-district relationships
- content organization
- Search
- Index
- filtering and lenses
- archives
- public inclusion and lifecycle logic
- reusable information/page types
- minimum shared record requirements
- district-specific information boundaries
- structural growth rules

Its purpose is to ensure that implementation does not need to invent or infer information architecture.

The platform is not a collection of separate disciplinary portfolios. It is the information structure of **one multidisciplinary design practice** governed by the central idea **Architectural intelligence across disciplines**.

The architecture must support both:

1. **Professional direct access** — professional decision-makers can reach relevant evidence, authorship, capability, and contact efficiently.
2. **Exploratory discovery** — visitors can move through the practice as a connected world of records, relationships, themes, and districts.

Both are first-class requirements. When they conflict, **professional legibility and efficient access take priority over exploratory expression**.

---

# 2. Relationship to Platform Vision

This document operationalizes, but does not redefine, the closed Platform Vision.

The following upstream constraints are locked:

- Central idea: **Architectural intelligence across disciplines**
- Positioning: **One multidisciplinary design practice**
- Audience priority: **Professional decision-makers first**
- Authorship: **Person-first**
- Commerce: integrated but subordinate
- Public inclusion threshold: **public presence is earned by significance, not completion**
- Incomplete, failed, abandoned, speculative, or archived work may be public when genuinely significant
- Long-term invariants: architectural intelligence, coherence, personal authorship and judgment, professional legibility, honest state representation, curatorial discipline, expandability
- Governing principles: Timeless, Minimal, Architectural, Atmospheric, Exploratory, Cohesive, Curated, Expandable, Human, Legible, Honest

Information architecture must preserve these constraints. It may not reorganize the platform in ways that fragment the practice into disconnected disciplines, obscure authorship, make commerce dominant, reward completion over significance, or sacrifice professional retrieval for immersion.

---

# 3. Top-Level Platform Model

## 3.1 Approved districts

The permanent version 1.0 district structure is:

- Home
- Work
- Research
- Lab
- Art
- Products
- About

These are the only approved top-level districts in version 1.0.

Districts represent **durable visitor intentions**, not disciplines.

## 3.2 Global utilities

The approved global utilities are:

- Search
- Index
- Contact

Language selection and legal/administrative information may also exist globally when activated, but they are utility functions rather than districts.

Search, Index, and Contact are **not districts**.

## 3.3 Disciplines are not districts

Architecture, computational design, AI, software, research, art, product design, writing, visualization, strategy, and future fields of practice operate as cross-platform classifications where relevant.

A discipline may appear across several districts without acquiring top-level ownership.

## 3.4 Commerce

Products is a full district because commercial evaluation and acquisition constitute a distinct visitor intention.

Commerce does not govern platform identity. Products remains subordinate to the larger person-first multidisciplinary practice.

## 3.5 Journal / News / Updates

No Journal, News, Updates, or equivalent publishing district is approved in version 1.0.

A future editorial system may be proposed only if recurring publishing becomes a durable visitor need that cannot be represented adequately through existing districts or utilities.

## 3.6 Future districts

Future districts may be added without breaking the conceptual model, but only under the growth criteria in Section 20.

A new discipline, content type, organization, venture, theme, medium, or commercial category does not by itself justify a new district.

---

# 4. Canonical Ownership

## 4.1 Governing rule

> **Every public canonical record has exactly one canonical owner district.**

Every substantive record has:

- one stable identity
- one owner district
- one canonical route

A record may be discovered through multiple districts, collections, lenses, filters, Search results, Index views, or relationships without being duplicated.

Relevance to more than one district is never sufficient reason to create duplicate records.

## 4.2 District ownership boundaries

### Home

Home owns:

- entrance
- orientation
- synthesis
- common ground
- district access
- selected platform signals
- visitor-intention pathways

Home does **not** own canonical Work, Research, Lab, Art, Product, or About records merely because it surfaces them.

### Work

Work owns records whose principal visitor value is a resolved, substantial, accountable outcome.

Governing question:

> **What was designed, developed, delivered, or achieved?**

Work demonstrates capability and resolved outcomes.

### Research

Research owns records whose principal visitor value is inquiry, framing, interpretation, methods, evidence, or knowledge production.

Governing question:

> **What is being asked or interpreted, and what understanding is being developed?**

Research asks and interprets.

### Lab

Lab owns records whose principal visitor value is experimentation, testing, transformation, iteration, branching, failure, comparison, or observed learning.

Governing question:

> **What is being tested or transformed, and what is being learned?**

Lab tests and transforms.

### Art

Art owns records whose principal visitor value is autonomous artistic encounter, expression, interpretation, or authored artistic practice.

Governing question:

> **What is being encountered or expressed as art?**

Art owns the canonical artwork or artistic body of work even when commercial editions or derivatives exist elsewhere.

### Products

Products owns records whose principal visitor relationship is obtaining, using, commissioning, licensing, subscribing to, or purchasing an offer.

Governing question:

> **What is offered, for whom, under what conditions, and how can it be obtained?**

Products owns the transaction and offer layer, not the canonical artistic, research, experimental, or professional history from which an offer may derive.

### About

About owns authorship, biography, trajectory, values, methods, experience, education, capabilities, languages, availability, continuity, affiliations, and practice identity.

Governing question:

> **Who is behind the practice, how has it developed, and how does it operate?**

About supplies context and authorship; it does not duplicate substantive records owned by other districts.

## 4.3 One initiative, one or several canonical records

A broader initiative may produce more than one canonical record only when each record has **genuinely independent visitor value** and answers a different district-level question.

Example:

```text
Research record → the inquiry
Lab record      → the experiment
Work record     → the resolved application
Product record  → the offer
```

These are distinct canonical records connected by typed relationships.

If the same material would merely be repeated under different district headings, one canonical record must be retained and cross-district discovery must use relationships, classifications, collections, Search, or Index instead.

## 4.4 Canonical reassignment

A canonical owner may change only when the principal visitor expectation of the underlying record materially changes.

Reassignment must be explicit and must preserve historical integrity.

When earlier stages have independent documentary value, they remain as distinct linked records rather than being overwritten or duplicated.

---

# 5. Cross-District Relationship Model

## 5.1 Governing principle

The platform uses **resolved records and open relationships**.

Canonical records remain stable objects. Their intellectual, practical, creative, commercial, and historical connections are represented through explicit relationships rather than duplication.

## 5.2 Approved relationship model

Relationships are:

- **typed**
- **directional**
- stored from a source canonical record to a target canonical record
- optionally assigned editorial priority
- eligible to support discovery in Search and Index

The system may derive a reciprocal display from a stored directional relationship. A separately authored reverse relationship is not required unless it expresses genuinely different semantics.

## 5.3 Core v1.0 relationship vocabulary

The approved core vocabulary is:

- `related-to`
- `derived-from`
- `informed-by`
- `tested-in`
- `developed-into`
- `commercialized-as`

The vocabulary is intentionally small. Additional types require a demonstrated recurring need and terminology governance.

## 5.4 Directional examples

```text
Research A — tested-in → Lab B
Lab B — developed-into → Work C
Lab B — commercialized-as → Product D
Art E — commercialized-as → Product F
Work C — informed-by → Research A
```

The displayed reciprocal wording may be adapted to context without changing the stored relationship.

## 5.5 Relationship priority

A relationship may carry optional editorial priority so that a record with many connections can distinguish primary lineage from secondary relevance.

Priority affects presentation or discovery ordering only. It does not affect ownership.

## 5.6 Attribution is separate

Authorship, role, collaboration, client, institution, and contributor information are attribution metadata, not project-lineage relationships.

They must not be mixed into the relationship ontology simply because they also connect entities.

## 5.7 Relationships in Search and Index

Search and Index may surface or use relationships to improve discovery.

Relationships never:

- create duplicate canonical records
- change owner district
- create a new content type
- imply equivalence between source and target records

---

# 6. Public Inclusion and State Model

## 6.1 Curatorial rule

> **Public presence is earned by significance, not completion.**

Completion and public inclusion are independent.

Therefore:

- incomplete work may be public
- failed work may be public
- abandoned work may be public
- speculative work may be public
- archived work may be public
- completed work may remain unpublished

The determining criterion is whether the record has sufficient significance, integrity, context, and visitor value to belong in the public practice.

## 6.2 Four independent state dimensions

The IA separates record state into four dimensions.

### A. Curatorial inclusion

Answers:

> **Has this record earned a place in the platform's public body of work?**

Values:

- `included`
- `excluded`

Curatorial inclusion is an editorial judgment. It is not a lifecycle stage.

### B. Visibility

Answers:

> **Who can discover or access this record?**

Values:

- `public`
- `unlisted`
- `private`

`public` records are eligible for ordinary public discovery subject to inclusion rules.

`unlisted` records may be accessible by direct route or controlled pathway but do not appear in ordinary public discovery.

`private` records are excluded from the public platform.

### C. Lifecycle

Answers:

> **What is the actual lifecycle condition of the underlying work?**

Common values may include:

- `draft`
- `active`
- `complete`
- `failed`
- `abandoned`
- `speculative`
- `archived`

Not every lifecycle value applies to every district.

Lifecycle must describe reality honestly. It does not determine worth or visibility by itself.

### D. Domain-specific state

Answers:

> **Does the owning district require an additional operational state that is not a universal lifecycle concept?**

Examples include:

Products:

- forthcoming
- available
- unavailable
- discontinued

Lab, where required:

- valid
- invalid
- superseded

Research, where required:

- ongoing
- concluded

Domain-specific values are used only where they express a genuinely different information dimension.

## 6.3 No generic universal `status`

The unqualified term `status` must not be used as a universal IA field because it collapses distinct concepts.

When used in a district, it must be qualified by meaning, such as:

- lifecycle state
- visibility
- commercial state
- experiment state

## 6.4 Example combinations

```text
Included + Public + Failed
→ a significant failed Lab experiment that remains openly documented

Excluded + Private + Complete
→ completed material that does not meet the public curatorial threshold

Included + Public + Complete + Discontinued
→ a historically significant Product record whose offer is no longer active

Included + Public + Archived
→ a historical canonical record retained for evidential or lineage value
```

## 6.5 Confidential and restricted material

Confidential, legally restricted, contractually restricted, or otherwise non-public material is excluded from public Search, Index, navigation, and relationship exposure.

A separate public summary may exist only when it is itself an approved canonical record and does not disclose restricted information.

---

# 7. Search

## 7.1 Role

Search is the **global query-based discovery system for canonical records eligible for public discovery**.

It is a utility, not a district and not an alternative ownership system.

Search primarily supports visitors who know, or approximately know, what they are trying to find.

## 7.2 Search corpus

Ordinary public Search operates across all districts and searches:

- structured canonical-record metadata
- searchable textual content associated with canonical records

It searches canonical public records rather than treating district landing pages, Index lenses, utility pages, filter states, or generated navigation pages as equivalent substantive results.

## 7.3 Eligibility

Ordinary public Search includes records that satisfy the public-discovery rules.

In general:

- `included + public` → searchable
- `included + public + archived` → searchable
- `included + public + failed` → searchable
- `included + public + speculative` → searchable
- `included + public + discontinued` → searchable
- `included + unlisted` → not returned in ordinary Search
- `private` → not returned publicly
- `excluded` → outside the public Search corpus

Lifecycle and domain-specific state do not independently suppress an otherwise eligible record.

## 7.4 Searchable information

Search may use, where available:

- title
- subtitle
- summary
- full searchable record text
- owner district
- content type
- date/year
- disciplines
- themes
- people and collaborators
- organizations
- methods
- locations
- media/format descriptors
- domain-specific public metadata
- typed relationship context

Internal workflow data and private metadata must not enter the public search corpus.

## 7.5 Relationships

Typed relationships may:

- contribute to relevance
- expose connected records
- provide contextual discovery

A relationship does not make one record a duplicate result for another.

## 7.6 Ranking

Search uses relevance ranking.

The IA does not prescribe an algorithm, but ranking may consider:

- title match
- metadata match
- textual match
- discipline/theme match
- relationship context
- optional editorial priority

Search must not simply reproduce Home or curated-view prominence.

## 7.7 Search destination

`/search` is the canonical Search utility destination.

Search may also be invoked through an overlay or other interaction state, but such presentation does not create another route family, content type, or ownership system.

## 7.8 Search versus Index

Search answers:

> **I know approximately what I am looking for. Help me find it.**

Index answers:

> **Show me what exists and let me browse the public structure.**

---

# 8. Index

## 8.1 Role

Index is the **structured, browsable view of the public canonical universe**.

It provides comprehensive orientation for visitors who prefer systematic browsing over query-based retrieval or spatial exploration.

It is a utility, not a district and not a second content repository.

## 8.2 Canonical-record basis

Index operates on canonical records only.

A record may appear in multiple Index perspectives while retaining:

- one stable identity
- one owner district
- one canonical route

Index lens pages do not create new content ownership.

## 8.3 Approved global lenses

The approved version 1.0 global Index lenses are:

- district
- content type
- discipline
- theme
- year

No additional global lenses are approved in version 1.0.

Additional perspectives may be proposed later if actual content volume demonstrates a durable need.

## 8.4 Archived records

Public archived records remain eligible for Index because archive represents historical/public position rather than deletion.

Index may communicate lifecycle or other state information where it materially helps interpretation.

## 8.5 Canonical links

Every Index occurrence must resolve to the corresponding canonical record.

A lens route organizes discovery; it does not become the canonical destination for the underlying record.

---

# 9. Filters and Lenses

## 9.1 Canonical distinction

The IA uses the following terms precisely:

- **Canonical record** — the substantive owned object
- **Collection** — an authored set of records with meaningful editorial or semantic grouping
- **Grouping** — a generic structural mechanism for organizing records
- **Lens** — a stable named structural perspective over canonical records
- **Filter** — a temporary narrowing of the current structured view

## 9.2 Lenses

Global Index lenses are stable navigational perspectives and may have navigable routes.

Approved global lenses are limited to:

- district
- content type
- discipline
- theme
- year

A lens never changes ownership or canonical identity.

## 9.3 Filters

Filters refine a current structured view.

Filters may combine where combinations remain meaningful.

Filtering never:

- creates a new canonical record
- creates a new content type
- changes owner district
- creates a new curatorial judgment
- converts a curated view into a comprehensive view

## 9.4 Global versus district-specific filtering

Globally shared classification dimensions may support filtering where useful.

Districts may expose additional filters based on their own information obligations.

Examples include:

- Work — role, context, scale where useful
- Research — method or research state where useful
- Lab — experiment or version state
- Art — medium or series
- Products — product type or commercial state

District-specific filters do not automatically become global Index lenses.

## 9.5 Curated and comprehensive views

Comprehensive views may be filtered where useful.

Curated views may expose filtering only when it does not undermine their authored editorial purpose.

A filtered curated view remains curated; it does not become an exhaustive archive by implication.

## 9.6 Navigable/shareable state

Meaningful filter combinations must be capable of being represented in navigable/shareable state.

Exact URL/query syntax, persistence duration, browser-history behavior, and control design are implementation and interaction decisions, not IA decisions.

---

# 10. Archive Semantics

## 10.1 Definition

> **An archived canonical record remains part of the platform because it retains historical, evidential, contextual, or lineage value, but it is no longer part of the current primary presentation of its district.**

Archive is not deletion and not a judgment of quality.

## 10.2 Archive as lifecycle

`archived` is a lifecycle value.

There is **no separate universal archive-state field**.

Archive views derive from eligible canonical records whose lifecycle and public-state conditions place them in the public archive.

## 10.3 Distinctions

- archived ≠ private
- archived ≠ failed
- archived ≠ abandoned
- archived ≠ discontinued
- archived ≠ superseded
- archived ≠ low quality

These concepts may coexist where truthful, but they answer different questions.

## 10.4 Public archive behavior

An eligible archived record:

- retains its canonical URL
- may remain searchable
- may remain visible in Index
- may retain and receive typed relationships
- may remain part of collections or lineage
- may return from archive if its editorial role changes

## 10.5 District consistency

All districts share the common archive meaning.

Districts may differ in whether they expose a dedicated archive route, a comprehensive view, or archive filtering, according to their approved route families and content needs.

## 10.6 Related terms

- **private / hidden** → visibility, not archive
- **failed / abandoned** → lifecycle outcomes
- **discontinued** → Products domain-specific commercial state
- **superseded** → district/version-specific state where needed
- **historical** → descriptive role, not a required state
- **inactive** → not a universal IA term

---

# 11. Route Hierarchy

Routes describe public information hierarchy and canonical identity. They do not prescribe a technical framework.

## 11.1 Route principles

- Routes use stable, human-readable names.
- District names form the first structural level.
- Every substantive canonical record has one canonical route.
- Collections, lenses, filters, curated views, Search, and Index point to canonical records rather than duplicating them.
- Dates, technologies, temporary states, and presentation formats do not define canonical record identity unless they are themselves the meaning of an approved grouping route.
- Public route identity remains stable when visual presentation changes.
- Route changes require explicit IA review because they affect long-term identity and external references.

## 11.2 Top-level routes

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

`/contact` is a direct utility route and may resolve to the Contact information owned by About.

## 11.3 Work route family

```text
/work
/work/selected
/work/all
/work/practice/{practice-area}
/work/collections/{collection}
/work/{record}
```

`/work/all` is the approved comprehensive Work view. It is not semantically identical to lifecycle archive.

## 11.4 Research route family

```text
/research
/research/current
/research/themes/{theme}
/research/publications
/research/writing
/research/talks
/research/archive
/research/{record}
```

## 11.5 Lab route family

```text
/lab
/lab/active
/lab/prototypes
/lab/tools
/lab/studies
/lab/archive
/lab/{record}
```

## 11.6 Art route family

```text
/art
/art/selected
/art/series/{series}
/art/medium/{medium}
/art/exhibitions
/art/archive
/art/{record}
```

## 11.7 Products route family

```text
/products
/products/featured
/products/collections/{collection}
/products/digital
/products/physical
/products/services
/products/archive
/products/{record}
```

## 11.8 About route family

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

## 11.9 Global discovery route family

```text
/search
/index
/index/district/{district}
/index/type/{content-type}
/index/discipline/{discipline}
/index/theme/{theme}
/index/year/{year}
```

These routes organize access to canonical records. They do not create new canonical ownership.

## 11.10 Route depth

Additional depth is permitted only when a subrecord has meaningful independent visitor value, such as:

- a multipart case study
- an independently useful research output
- an artwork within a larger series
- a product document or variant that merits its own public identity

Unnecessary route fragmentation is prohibited.

---

# 12. Information Hierarchy

The conceptual hierarchy is:

```text
Level 0 — Platform
Level 1 — District or Global Utility
Level 2 — View, Section, Collection, Grouping, Archive, or Lens
Level 3 — Canonical Record
Level 4 — Subrecord, only when independently meaningful
```

A level describes information relationships, not mandatory visual nesting.

---

# 13. Page, Route, Content, and Interaction Types

These concepts must remain distinct.

## 13.1 Page / information types

Approved reusable IA-level information roles include:

### World threshold / Home

The common origin, synthesis, and orientation layer.

### District overview

Introduces a district's role, hierarchy, current/selected signals, and primary pathways.

### Curated view

An authored selection that communicates significance or a deliberate editorial reading.

### Comprehensive view

A broad structured view of all eligible records within a defined scope.

### Grouping / collection view

Organizes records around an authored collection, section, series, practice area, theme, or other approved grouping.

### Canonical record

The authoritative destination for a substantive owned record.

### Utility page

Supports a global task such as Search, Index, or Contact.

### Focused media view

A focused state or page role for close examination of media when the underlying district Universe requires it.

### Comparison / evidence view

A structured comparative reading used only where approved district behavior requires explicit comparison or evidence review.

## 13.2 Route type

A route type describes how an information role is addressable in the public hierarchy.

Not every page/information type requires a distinct route family.

## 13.3 Content type

A content type describes what a canonical record **is**, not how it is displayed or reached.

Approved core types include:

- Project
- Case Study
- Research Project
- Publication
- Essay
- Talk or Presentation
- Experiment
- Prototype
- Tool
- Artwork
- Art Series
- Exhibition
- Product
- Service
- Collection
- Profile Record
- Organization or Venture

No Journal / Updates content type is approved in version 1.0.

## 13.4 Interaction state

An interaction state describes a temporary mode of reading or navigation, such as:

- focus
- comparison
- overlay/modal
- filter state

An interaction state does not automatically create a route, content type, canonical record, or ownership boundary.

---

# 14. Minimum Shared Canonical Record Contract

The shared record contract defines the information every canonical record must be capable of expressing. It is **not** a database schema, CMS specification, or mandatory visual template.

## 14.1 Universal identity fields

Every canonical record requires:

- **stable ID** — persistent internal identity independent of title or route presentation
- **slug** — public route identifier within its approved route family
- **title** — primary public identity
- **owner district** — exactly one canonical owner
- **content type** — exactly one primary content type
- **curatorial inclusion** — included / excluded
- **visibility** — public / unlisted / private
- **lifecycle** — truthful lifecycle state where applicable
- **summary** — concise description sufficient for discovery and context
- **authorship** — responsible author/entity information appropriate to the record

## 14.2 Universal-capability fields

Every record model must be capable of carrying these fields, but they may be empty or omitted when genuinely inapplicable:

- subtitle
- year and/or date/date range
- disciplines
- themes
- role
- collaborators
- typed relationships
- relationship priority
- media references
- credits
- provenance/source information
- location/context
- optional editorial priority or featured state
- district-specific state
- district-specific metadata

## 14.3 Utility-derived fields

The following may be derived rather than manually authored:

- canonical URL
- reciprocal relationship display
- Index membership
- Search eligibility
- archive-view membership
- generated breadcrumb/orientation path

Derived information must follow approved IA rules and may not invent ownership or state.

## 14.4 No separate archive field

There is no universal `archive state` field.

Archive is represented through `lifecycle: archived` where appropriate, and archive views derive from that lifecycle plus curatorial inclusion and visibility.

## 14.5 No universal generic `status`

A generic `status` field is not part of the shared contract.

State must use the explicit dimensions defined in Section 6.

## 14.6 Record depth

Editorial depth may vary without changing canonical identity.

A record may be presented at a feature, standard, or concise/index depth according to significance, evidence, and visitor value.

Depth is presentation/editorial scope, not lifecycle or ownership.

---

# 15. District-Specific Information Boundaries

Shared records must not flatten district differences. Each district has unique information obligations.

These are IA-level requirements, not complete schemas.

## 15.1 Work

Work records should be capable of expressing:

- context / brief
- personal role and contribution
- client, institution, office, or collaboration context where relevant
- constraints
- methods/process where useful
- deliverables
- outcome/evidence
- credits and collaborators
- related Research, Lab, Product, or Work records

Professional records must distinguish total project scope from personal contribution.

## 15.2 Research

Research records should be capable of expressing:

- research question, thesis, or proposition
- context
- method
- references/sources
- findings, interpretation, or current position
- research artifacts
- publication/presentation relationships
- related Lab or Work records

Research may remain ongoing or unresolved if its state is represented honestly.

## 15.3 Lab

Lab records should be capable of expressing:

- experiment question or intention
- experiment state where needed
- version
- branch
- test
- iteration history
- observations/outcomes
- failure/invalidity/supersession where relevant
- unresolved questions
- related Research, Work, or Product records

The Lab must preserve experimental lineage rather than rewriting development as inevitable success.

## 15.4 Art

Art records should be capable of expressing:

- medium
- dimensions or material information where relevant
- series/body-of-work relationship
- artistic context/statement where useful
- exhibition or presentation context
- credits/provenance where relevant
- relationship to commercial editions or Products without transferring artwork ownership

## 15.5 Products

Product records should be capable of expressing, where applicable:

- offer proposition
- intended user
- product/service type
- price or pricing basis
- commercial state
- availability
- edition information
- license terms
- fulfilment/delivery
- support/documentation
- commission/acquisition pathway
- origin/relationship to canonical Work, Art, Research, or Lab records

Products owns the offer and transaction layer.

## 15.6 About

About should be capable of expressing:

- biography
- practice identity
- experience
- education
- values
- methods
- capabilities
- languages
- location at an appropriate public level
- availability
- clients/collaborators/institutions where appropriate
- affiliations and recognition
- contact pathways
- authorship/role relationships to records across the platform

About reveals authorship, continuity, and intent rather than duplicating evidence already owned by other districts.

## 15.7 Home

Home does not use the ordinary substantive-record model as its primary structure.

Its information obligations are:

- central practice proposition
- coherent synthesis across disciplines
- district orientation
- selected/current signals
- professional direct pathways
- exploratory pathways
- About/Contact orientation

Home may reference canonical records from anywhere in the platform without becoming their owner.

---

# 16. Home as Information Architecture

## 16.1 Canonical name

The canonical IA district name is **Home**.

**The Threshold Field** is the approved governing concept for Home's Universe experience. It is not an alternative district name, route name, or competing IA term.

## 16.2 Role

Home is the threshold and common origin of the platform.

It must communicate **one coherent practice before merely listing categories**.

Its role is to:

- communicate the central multidisciplinary practice
- orient the visitor toward the seven districts
- support professional decision-makers quickly
- provide selected cross-platform signals
- open deeper exploratory pathways
- supply concise authorship/contact orientation

## 16.3 Boundaries

Home must not:

- become a duplicate Index
- become a complete archive
- own records that belong to another district
- require visitors to return through Home when moving between related records or districts
- make spatial exploration the only navigation method

---

# 17. Navigation Requirements

This section defines what navigation must make possible. It does not define visual styling or interaction mechanics.

## 17.1 Global requirements

Navigation must provide:

- global access to all seven districts
- global access to Search
- global access to Index
- global access to Contact
- clear awareness of current district/context
- professional direct access to evidence and contact
- deeper exploratory navigation

## 17.2 District navigation

Each district must provide access to its approved overview, curated/current views, groupings, comprehensive/archive structures, and canonical records as relevant.

District navigation must reflect that district's approved information model rather than forcing identical sections everywhere.

## 17.3 Canonical record navigation

A canonical record must make it possible to understand:

- its owner district
- its content type
- its relevant parent grouping/collection where applicable
- its meaningful typed relationships
- a path back to broader district or comprehensive context

## 17.4 Relationship navigation

Visitors must be able to move between meaningfully related canonical records across districts without returning to Home.

Relationship navigation must preserve ownership clarity.

## 17.5 Prior context and return

Navigation must support return to prior meaningful context, especially after entering a canonical record from:

- Search
- Index
- a lens
- a filtered view
- a collection
- another related record

The exact interaction mechanism is downstream work, but the IA requires preservation of contextual orientation.

## 17.6 Sequence navigation

Previous/next or ordered navigation is appropriate only where a meaningful sequence exists, such as:

- a series
- a chronological research progression
- a defined collection order
- a case-study sequence
- experimental lineage

It must not imply false hierarchy between unrelated records.

## 17.7 Professional priority

Both direct and exploratory navigation are first-class.

When a navigational choice creates conflict, the priority order is:

1. professional legibility and efficient evidence access
2. exploratory depth
3. commercial pathway

Exploration may enrich direct navigation but may not obstruct it.

---

# 18. Content Organization

## 18.1 Curated view

A curated view is deliberately authored to communicate significance, identity, priority, or a particular reading of the practice.

Curated does not mean complete.

## 18.2 Comprehensive view

A comprehensive view exposes all **eligible public records within a defined scope**.

It does not mean every completed or internally stored item.

The public curatorial threshold still applies.

## 18.3 Collection

A collection is an authored or semantic grouping of canonical records.

A collection may cross disciplines and, where meaningful, districts.

It does not replace owner district or canonical route.

## 18.4 Series

A series is used when several records share a common identity while remaining independently meaningful.

## 18.5 Subrecord

A subrecord is justified only when a component of a larger canonical record has independent visitor value.

Otherwise, the material remains an internal section of the parent record.

## 18.6 Controlled classification

Classification uses controlled vocabulary rather than unrestricted decorative tagging.

Core dimensions are:

- owner district
- content type
- discipline
- theme
- year/date

Additional district-specific classifications may exist where useful.

New terms must be meaningful, understandable, non-duplicative, and supported by actual content.

---

# 19. Naming Conventions

The following terminology is canonical for IA v1.0.

## 19.1 Record terminology

**Canonical record**  
The authoritative owned content object.

**Record**  
Approved short form when canonical meaning is clear.

**Entry / item**  
Non-authoritative informal terms. Avoid in IA definitions and implementation contracts.

## 19.2 Organization terminology

**Collection**  
An authored set of records with meaningful editorial or semantic grouping.

**Grouping**  
A generic organizational mechanism that may or may not be editorial.

**Lens**  
A stable named classification perspective over canonical records.

**Filter**  
A temporary narrowing operation within a structured view.

These terms are intentionally distinct.

## 19.3 Presentation terminology

**Curated view**  
A deliberately selected editorial presentation.

**Comprehensive view**  
A broad view of all eligible records within a defined scope.

**Archive view**  
A view focused on eligible archived canonical records.

**Featured**  
Optional editorial prominence. It is not lifecycle, visibility, or ownership.

**Current**  
A contextual editorial label. It is not a universal state dimension.

**Active**  
A lifecycle value where appropriate.

## 19.4 State terminology

Use:

- curatorial inclusion
- visibility
- lifecycle
- domain-specific state

Do not use `public state` or `status` as unqualified catch-all terms.

## 19.5 Home terminology

**Home** is the canonical IA name.

**The Threshold Field** is its Universe concept, not a competing structural name.

## 19.6 All versus Archive

`All` and `Archive` are intentionally distinct.

- **All / comprehensive** = all eligible public records within a scope
- **Archive** = eligible canonical records whose lifecycle is archived

Therefore `/work/all` does not need to be renamed `/work/archive`.

---

# 20. Future Growth Rules

The IA must grow without abandoning person-first, practice-first structure.

## 20.1 New disciplines

New disciplines may be added as controlled classifications without changing top-level navigation.

A discipline becomes a district only if it independently satisfies all district criteria.

## 20.2 New content types

A new content type is justified only when existing types cannot communicate visitor expectations accurately and the need is durable across more than one isolated record.

## 20.3 New relationship types

A new relationship type is justified when:

- the semantic distinction recurs
- existing relationship types cannot express it truthfully
- the term improves visitor understanding or system integrity

Relationship vocabulary must remain small enough to be legible and governable.

## 20.4 Future studio/company identity

Future organizations, studios, or ventures begin as connected entities with their own attribution and relationships to Work, Products, Research, Lab, and About where relevant.

They do not automatically become top-level districts.

The platform remains person-first until a real organizational change justifies a different model through an explicit upstream decision.

## 20.5 Commercial growth

Products may expand through:

- product types
- collections
- services
- licenses
- editions
- subscriptions
- commissions
- domain-specific commercial metadata

Commercial expansion must not displace the platform's broader practice identity.

## 20.6 New districts

A new district may be approved only when all conditions are met:

1. It represents a durable visitor intention, not merely a discipline or business category.
2. It has or credibly requires a substantial independent body of content.
3. Existing districts cannot contain it without conceptual distortion.
4. It requires its own stable hierarchy and navigation logic.
5. It strengthens rather than fragments the multidisciplinary practice.
6. Its addition preserves professional legibility and global navigation clarity.

## 20.7 Growth mechanisms

Normal growth should occur through:

- canonical records
- collections
- controlled classifications
- richer typed relationships
- broader archives
- deeper editorial treatment
- additional district-specific schema fields where justified

It should not normally require repeated additions to primary navigation.

---

# 21. Deferred Decisions

The following are intentionally deferred and do not block IA v1.0 closure:

1. Exact initial Research theme vocabulary.
2. Exact initial collection names within each district.
3. Exact launch curation and which individual records are public, featured, or selected.
4. Detailed district-specific filter vocabularies beyond approved principles.
5. Public language priority and translation rollout.
6. Translation completeness requirements at launch.
7. Exact future venture profile structures.
8. Any future Journal / News / Updates structure unless a new approved need emerges.
9. Search engine, indexing technology, database, CMS, or ranking algorithm.
10. Exact filter control design, query syntax, persistence duration, or browser-history behavior.
11. Exact visual treatment of focus, comparison, overlays, relationships, archives, Search, Index, or navigation.
12. Technical implementation of canonical IDs, route generation, reciprocal relationship display, or derived state.

All deferred decisions must remain compatible with this document.

---

# 22. Approval Decision Register

| Decision | Status |
|---|---|
| Central IA must express one multidisciplinary design practice. | Approved |
| Professional decision-makers have priority when navigation goals conflict. | Approved |
| Top-level districts are Home, Work, Research, Lab, Art, Products, About. | Approved |
| Search, Index, and Contact are global utilities, not districts. | Approved |
| Disciplines are cross-platform classifications, not top-level districts. | Approved |
| Products is a district; commerce remains subordinate to practice identity. | Approved |
| No Journal / News / Updates district exists in v1.0. | Approved |
| Home is the canonical IA name; The Threshold Field is its Universe concept. | Approved |
| Every public canonical record has exactly one canonical owner district. | Approved |
| Relevance to multiple districts does not justify duplicate records. | Approved |
| One broader initiative may produce multiple canonical records only when each has independent visitor value and distinct ownership logic. | Approved |
| Cross-record relationships are typed and directional with derived reciprocals. | Approved |
| Core relationship types are related-to, derived-from, informed-by, tested-in, developed-into, commercialized-as. | Approved |
| Relationship priority is optional and does not affect ownership. | Approved |
| Authorship/role/collaboration remain attribution metadata separate from lineage relationships. | Approved |
| Public presence is earned by significance, not completion. | Approved |
| Curatorial inclusion, visibility, lifecycle, and domain-specific state are independent dimensions. | Approved |
| Generic universal status is rejected. | Approved |
| Search is full public canonical-record search across metadata and searchable record text. | Approved |
| Search excludes ordinary discovery of unlisted, private, and excluded records. | Approved |
| Archived/failed/speculative/discontinued records may remain searchable when included and public. | Approved |
| Search may use typed relationships for relevance and connected discovery. | Approved |
| Index is the structured browsable view of the public canonical universe. | Approved |
| Global Index lenses are district, content type, discipline, theme, year. | Approved |
| Lenses are stable perspectives; filters are temporary refinements. | Approved |
| Filters may combine where meaningful and may be represented in navigable/shareable state. | Approved |
| Filtering never changes ownership or creates canonical records. | Approved |
| Archive means retained historical/evidential/contextual/lineage value outside current primary presentation. | Approved |
| Archived is a lifecycle value; no separate universal archive field exists. | Approved |
| Public archived records retain canonical identity and may remain searchable, indexed, and related. | Approved |
| Work `/all` is a comprehensive view and is intentionally distinct from lifecycle archive. | Approved |
| Current district route families remain the approved route architecture. | Approved |
| Page type, route type, content type, and interaction state are distinct concepts. | Approved |
| A minimum shared canonical-record contract is required without flattening district-specific information. | Approved |
| Home owns orientation and synthesis, not substantive records from other districts. | Approved |
| Navigation must support global district access, utilities, relationship movement, contextual return, professional direct access, and exploration. | Approved |
| Future disciplines, content types, relationships, ventures, and commerce may grow without automatically creating districts. | Approved |
| New districts require a genuinely distinct durable visitor intention and substantial independent ecosystem. | Approved |
| Platform remains person-first and practice-first unless explicitly superseded upstream. | Approved |

---

# 23. Implementation Implications

This document is an authoritative upstream dependency for implementation.

Implementation must not guess or redefine the following:

## 23.1 Canonical identity

Implementation must preserve:

- one stable canonical identity per substantive record
- one owner district
- one canonical route
- cross-district discovery through references and typed relationships rather than duplication

## 23.2 State handling

Implementation must keep separate:

- curatorial inclusion
- visibility
- lifecycle
- domain-specific state

It must not collapse them into one `status` concept.

## 23.3 Search and Index

Implementation must treat:

- Search as query-based discovery of eligible public canonical records
- Index as structured browsing of the public canonical universe

Neither utility may create secondary canonical ownership.

## 23.4 Filters and lenses

Implementation must distinguish stable lenses from temporary filters and preserve canonical links under every filtered/lens view.

## 23.5 Archive

Implementation must represent archive through lifecycle and public-discovery rules rather than moving content into duplicate archive records.

## 23.6 Navigation

Implementation must provide both professional direct access and exploratory navigation, with professional legibility taking priority where necessary.

The exact visual controls, transition behaviors, component architecture, state-management technology, database structure, or search technology are not specified here.

## 23.7 Schema

Implementation may choose technical data structures freely provided they can faithfully represent the approved IA contract and district-specific obligations.

Technical convenience is not grounds for changing IA semantics.

Any technical constraint that would require changing canonical ownership, route hierarchy, relationship semantics, Search/Index behavior, archive meaning, or state dimensions must return to the Information Architecture domain for explicit review.

---

# 24. Closure Validation

`INFORMATION_ARCHITECTURE.md v1.0` satisfies the closure gate because:

- every public record has an unambiguous canonical ownership rule
- district boundaries are explicit
- cross-district relationships do not require duplication
- multiple canonical records from one broader initiative are allowed only when visitor value is independently distinct
- Search and Index have separate authoritative roles
- public inclusion is independent from completion
- lifecycle, visibility, curatorial inclusion, and domain-specific state are distinct
- archive has a single platform-wide meaning
- filtering and lenses cannot create new canonical ownership
- the main route hierarchy is coherent and stable
- page type, route type, content type, and interaction state are distinguished
- the minimum shared record contract is sufficient for downstream implementation
- district-specific information obligations remain distinct
- Home's IA role is resolved
- navigation supports professional direct access and deeper exploration simultaneously
- naming inconsistencies are resolved or intentionally distinguished
- future growth does not require present-day speculative restructuring
- no remaining IA-level contradiction with the closed Platform Vision is known

---

# 25. Approval Statement

`INFORMATION_ARCHITECTURE.md v1.0` is **Approved / Closed** as of **8 August 2026**.

It is the authoritative source of truth for:

- top-level information structure
- public route hierarchy
- district and utility boundaries
- canonical record ownership
- cross-record relationships
- Search behavior
- Index behavior
- filtering and lens semantics
- archive semantics
- public inclusion and lifecycle logic
- page/information-type distinctions
- minimum shared record requirements
- district-specific information boundaries
- navigation requirements
- terminology
- structural scalability

No unresolved IA-level contradiction remains.

Implementation may depend on this document, but implementation must not independently reinterpret or redesign its structural decisions.

Project-state, roadmap, decision-log, and changelog synchronization are intentionally outside this closure action and will be handled separately.
