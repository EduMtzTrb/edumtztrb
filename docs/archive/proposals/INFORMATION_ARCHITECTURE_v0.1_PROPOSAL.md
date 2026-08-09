# Personal Platform — Information Architecture

**Document:** `INFORMATION_ARCHITECTURE.md`  
**Version:** 0.1  
**Document status:** Proposal  
**Domain owner:** Personal Platform — Information Architecture  
**Scope:** Sitemap, navigation, hierarchy, page relationships, user journeys, search, categorization, and content organization  
**Excluded:** Visual design, interaction styling, technical architecture, implementation, and project-specific content

---

# 1. Purpose

This document defines how information is organized, related, discovered, and navigated across the Personal Platform.

The platform is not organized as a set of unrelated portfolios. It is organized as one coherent personal universe containing different modes of practice.

The information architecture must support two simultaneous experiences:

1. **Exploration** — visitors can discover the platform gradually as a connected world.
2. **Direct access** — visitors with a specific purpose can reach relevant work, research, products, or contact information immediately.

The structure must remain stable as the platform expands over many years.

---

# 2. Governing Foundations

The following foundations are inherited from the Project Instructions and are treated as **Approved**.

## 2.1 Platform role — Approved

The platform is a permanent digital home for the complete professional and creative practice, including:

- architecture
- professional work
- computational design
- software
- artificial intelligence
- research
- experiments
- art
- products
- commerce
- future ventures

## 2.2 Structural metaphor — Approved

The platform is conceived as an architectural universe.

- **Home** is the entrance to the universe.
- Each major category is a **district**.
- Every district has its own character while remaining part of the same system.
- Future districts may be added without rebuilding the entire structure.

## 2.3 Current major districts — Approved

- Home
- Work
- Research
- Lab
- Art
- Products
- About

## 2.4 Information architecture principles — Approved

- Structure before visuals.
- Systems before individual pages.
- Scalability over short-term convenience.
- Cohesion across disciplines.
- No important content should become inaccessible because the immersive experience is unfamiliar.

---

# 3. Core Architectural Model

## 3.1 Districts represent modes of engagement — Proposal

The major districts should not be treated as rigid discipline silos.

They represent the primary reason a visitor is engaging with a piece of content:

| District | Primary visitor question |
|---|---|
| Home | What is this universe, and where can I go? |
| Work | What has Eduardo designed, built, delivered, or contributed to? |
| Research | What questions, ideas, and knowledge is he developing? |
| Lab | What is he testing, prototyping, or exploring? |
| Art | What is he expressing through artistic practice? |
| Products | What can I obtain, use, commission, or purchase? |
| About | Who is he, how does he work, and how can I contact him? |

This model allows architecture, computation, AI, software, and art to appear as connected expressions of one practice rather than separate identities.

## 3.2 Disciplines are classifications, not top-level districts — Proposal

The following should normally operate as cross-platform classifications:

- Architecture
- Computational Design
- Artificial Intelligence
- Software
- Research
- Art
- Product Design
- Writing
- Visualization
- Strategy

A single project may involve several disciplines while retaining one canonical home in the platform.

Example:

- An AI-assisted architectural design prototype may live primarily in **Lab**.
- It may also be discoverable through the classifications **Architecture**, **Artificial Intelligence**, and **Computational Design**.
- If it later becomes a finished tool, it may become a **Product** or a completed **Work** while preserving its development history.

## 3.3 One canonical content item, multiple pathways — Proposal

Every substantive item should have one canonical page or record.

The same item may appear in:

- a district homepage
- a discipline collection
- a thematic collection
- search results
- related-content sections
- curated selections
- a chronological archive

This avoids duplicated project pages and conflicting versions of the same information.

## 3.4 Curated and comprehensive layers — Proposal

Each major district should contain two complementary layers:

1. **Curated layer** — a deliberate introduction, selected work, and meaningful pathways.
2. **Comprehensive layer** — an index or archive containing all relevant material.

The curated layer communicates identity. The comprehensive layer ensures completeness and long-term scalability.

---

# 4. Platform Hierarchy

## 4.1 Hierarchy levels — Proposal

### Level 0 — Platform

The complete Personal Platform.

### Level 1 — Districts

The seven approved major districts.

### Level 2 — District sections and collections

Organizational groupings within each district.

Examples:

- Selected Work
- Research Themes
- Experiments
- Bodies of Work
- Product Collections
- Experience

### Level 3 — Content entries

Individual projects, studies, experiments, artworks, products, essays, or profile records.

### Level 4 — Subentries

Optional parts belonging to a larger entry.

Examples:

- project phases
- case-study chapters
- experiment iterations
- artwork series items
- product variants
- research outputs

Level 4 should only be introduced when the content is substantial enough to justify independent navigation.

---

# 5. Master Sitemap

The following sitemap is a **Proposal** built on the approved district structure.

```text
Personal Platform
│
├── Home
│   ├── Universe introduction
│   ├── District entrances
│   ├── Selected current work
│   ├── Current research and experiments
│   ├── Featured art or products
│   └── Direct pathways for key visitor intentions
│
├── Work
│   ├── Work overview
│   ├── Selected work
│   ├── All work
│   ├── Practice areas
│   │   ├── Architecture
│   │   ├── Computational Design
│   │   ├── AI and Software
│   │   ├── Professional Practice
│   │   └── Other future practice areas
│   ├── Project collections
│   └── Work entries
│       ├── Project overview
│       ├── Context and brief
│       ├── Role and contribution
│       ├── Process
│       ├── Outcomes
│       ├── Credits and collaborators
│       └── Related work, research, lab entries, or products
│
├── Research
│   ├── Research overview
│   ├── Current research
│   ├── Research themes
│   ├── Publications and formal outputs
│   ├── Essays and long-form writing
│   ├── Talks and presentations
│   ├── Research archive
│   └── Research entries
│       ├── Question or thesis
│       ├── Context
│       ├── Method
│       ├── Findings or position
│       ├── Status
│       ├── Sources or references
│       └── Related experiments, work, and outputs
│
├── Lab
│   ├── Lab overview
│   ├── Active experiments
│   ├── Prototypes
│   ├── Tools and systems
│   ├── Studies and tests
│   ├── Process archive
│   └── Lab entries
│       ├── Experiment question
│       ├── Hypothesis or intention
│       ├── Current state
│       ├── Process and iterations
│       ├── Results or observations
│       ├── Next questions
│       └── Related research, work, or products
│
├── Art
│   ├── Art overview
│   ├── Selected works
│   ├── Bodies of work
│   ├── Works by medium
│   ├── Exhibitions and presentations
│   ├── Art archive
│   └── Art entries
│       ├── Work or series overview
│       ├── Concept or statement
│       ├── Medium and dimensions
│       ├── Date and status
│       ├── Series relationship
│       ├── Exhibition or publication history
│       └── Availability or related editions when applicable
│
├── Products
│   ├── Products overview
│   ├── Featured products
│   ├── Product collections
│   ├── Digital products
│   ├── Physical products
│   ├── Services or commissions
│   ├── Product archive
│   └── Product entries
│       ├── Product proposition
│       ├── Intended user
│       ├── Features or contents
│       ├── Origin and design story
│       ├── Availability
│       ├── Documentation or support
│       └── Related work, research, or lab development
│
├── About
│   ├── Profile
│   ├── Practice and philosophy
│   ├── Experience
│   ├── Education
│   ├── Capabilities
│   ├── Clients, collaborators, and affiliations
│   ├── Recognition, exhibitions, or publications
│   ├── Current focus
│   └── Contact
│
└── Global utilities
    ├── Search
    ├── Index
    ├── Contact shortcut
    ├── Language selection, when required
    └── Legal and administrative information, when required
```

---

# 6. District Definitions and Boundaries

Clear boundaries are required because many projects may legitimately fit more than one district.

## 6.1 Work — Proposal

### Purpose

Present resolved or substantial professional and self-directed work.

### Include

- commissioned projects
- professional case studies
- completed architectural work
- mature computational design projects
- developed software or AI systems
- significant self-initiated design projects
- collaborative work with a clearly stated personal role

### Exclude as primary content

- unresolved tests whose main value is experimentation
- research whose main output is knowledge rather than a designed result
- products whose primary visitor action is obtaining or purchasing them
- purely artistic work

### Placement test

Place an item in Work when the clearest visitor question is:

> What was designed, developed, delivered, or achieved?

## 6.2 Research — Proposal

### Purpose

Present structured inquiry, theory, methods, findings, and knowledge production.

### Include

- thesis research
- formal studies
- papers
- essays
- literature-based inquiries
- research frameworks
- talks based on original research
- documented findings

### Exclude as primary content

- casual unfinished tests
- prototypes without a developed research argument
- professional projects presented mainly through their delivered result

### Placement test

Place an item in Research when the clearest visitor question is:

> What question is being investigated, and what knowledge results from it?

## 6.3 Lab — Proposal

### Purpose

Expose the experimental practice without requiring every exploration to appear finished.

### Include

- prototypes
- experiments
- tests
- speculative systems
- process studies
- failed or inconclusive explorations with learning value
- work in progress
- technical and conceptual trials

### Exclude as primary content

- mature completed case studies
- formal research outputs
- market-ready products

### Placement test

Place an item in Lab when the clearest visitor question is:

> What is being tested, and what is being learned through the process?

## 6.4 Art — Proposal

### Purpose

Present work whose primary intention is artistic expression, interpretation, or experience.

### Include

- individual artworks
- series
- visual studies developed as artistic practice
- installations
- image, sound, object, spatial, or mixed-media work
- exhibitions

### Exclude as primary content

- commercial products derived from art
- design studies whose main purpose is professional or technical

### Placement test

Place an item in Art when the clearest visitor question is:

> What is being expressed or experienced as an artwork?

## 6.5 Products — Proposal

### Purpose

Present offerings that a visitor can obtain, use, license, commission, or purchase.

### Include

- digital products
- physical products
- editions
- templates
- software tools
- paid resources
- services
- commissionable offerings

### Exclude as primary content

- projects that are not available as an offering
- experiments without a stable proposition
- professional case studies with no current offering

### Placement test

Place an item in Products when the clearest visitor question is:

> What is offered, for whom, and how can it be obtained?

## 6.6 About — Proposal

### Purpose

Explain the person, practice, credibility, capabilities, history, and means of contact.

### Include

- biography
- professional positioning
- practice philosophy
- experience
- education
- capabilities
- current interests
- collaborators and affiliations
- contact routes

### Boundary rule

About provides context for the work. It should not duplicate full project case studies or research entries.

---

# 7. Content Types

Content types describe what an item is. Districts describe where it primarily belongs.

## 7.1 Core content types — Proposal

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
- Update or Journal Entry, only if introduced later

## 7.2 Content-type rules — Proposal

- Each item must have one primary content type.
- A content type must have a clear visitor expectation.
- New content types should only be created when existing types cannot describe the content without distortion.
- Content types should not be created merely to reflect a temporary format or trend.
- Content type labels should remain understandable to a non-specialist visitor.

---

# 8. Classification System

The classification system allows one item to be discovered from several perspectives without duplicating it.

## 8.1 Required classification dimensions — Proposal

Every substantive item should be classified using the following dimensions where relevant.

### Primary district

Exactly one:

- Work
- Research
- Lab
- Art
- Products

About content remains within About.

### Content type

Exactly one primary type.

### Discipline

One or more controlled terms, such as:

- Architecture
- Computational Design
- Artificial Intelligence
- Software
- Research
- Art
- Product Design
- Writing
- Visualization
- Strategy

### Theme

One or more conceptual subjects, such as:

- Adaptability
- Accessibility
- Indetermination
- Spatial Graphs
- Design Cognition
- Automation
- Materiality
- Memory
- Urban Systems

Themes should emerge from the actual body of work rather than being invented in advance.

### Medium or format

When relevant:

- Building
- Drawing
- Model
- Installation
- Software
- Dataset
- Interface
- Text
- Image
- Video
- Object
- Workshop

### Time

- year
- optional date range
- optional project phase

### Status

Content status is separate from project governance status.

Suggested public content statuses:

- Ongoing
- Completed
- Archived
- Available
- Unavailable
- Edition closed

Internal-only statuses may include:

- Draft
- Ready for review
- Ready to publish
- Published
- Needs revision

### Role

When collaboration is involved:

- author
- designer
- architect
- researcher
- developer
- collaborator
- co-founder
- contributor
- project assistant
- other precise role

### Context

When relevant:

- Professional
- Academic
- Independent
- Collaborative
- Commissioned
- Personal

## 8.2 Classification rules — Proposal

- Use controlled vocabulary rather than uncontrolled tag accumulation.
- Prefer a small number of meaningful classifications.
- Do not create near-duplicate terms.
- Do not use discipline labels as indicators of quality or maturity.
- Public labels should be comprehensible without internal project knowledge.
- Internal workflow labels should not automatically appear publicly.
- A project may be surfaced in multiple collections, but its canonical identity remains unchanged.

---

# 9. Navigation System

## 9.1 Navigation goals — Proposal

Navigation must:

- preserve the feeling of exploration
- reveal the platform’s overall structure
- support immediate access to specific information
- maintain orientation inside deep content
- connect related work across districts
- remain stable as content volume grows

## 9.2 Primary navigation — Proposal

The primary navigation consists of the approved districts:

- Home
- Work
- Research
- Lab
- Art
- Products
- About

Primary navigation should remain conceptually consistent throughout the platform.

## 9.3 Utility navigation — Proposal

Utility navigation supports tasks that are not districts:

- Search
- Index
- Contact
- Language selection, if multilingual publishing is introduced

Utility items should not compete with the district hierarchy.

## 9.4 District navigation — Proposal

Each district may contain a secondary navigation based on its own content structure.

Example for Work:

- Overview
- Selected
- All Work
- Practice Areas
- Collections

Example for Research:

- Overview
- Current Research
- Themes
- Publications
- Archive

Secondary navigation should use consistent logic across districts even when labels differ.

## 9.5 Contextual navigation — Proposal

Individual entries should provide:

- a clear indication of their district
- their position in a collection when applicable
- access to the parent collection or district
- related content
- previous and next items only when the sequence is meaningful

Previous and next navigation should not imply a false hierarchy when items are merely adjacent in time.

## 9.6 Breadcrumbs — Proposal

Breadcrumbs or an equivalent orientation mechanism should be available for deep structures.

Conceptual form:

```text
Platform / District / Collection / Entry
```

Breadcrumbs represent information relationships, not the visitor’s browser history.

## 9.7 Direct and exploratory pathways — Proposal

The platform should always offer both:

### Exploratory pathway

Home → District → Curated collection → Entry → Related entry

### Direct pathway

Search or Index → Entry

Neither pathway should be treated as secondary. The immersive concept must not prevent efficient access.

---

# 10. Home as the Universe Entrance

Home is an approved district but has a distinct structural role.

## 10.1 Home responsibilities — Proposal

Home should:

- establish the platform as one coherent practice
- introduce the districts
- help first-time visitors understand the range of work
- expose current or significant activity
- provide direct routes for visitors with clear goals
- avoid attempting to summarize every item

## 10.2 Home content hierarchy — Proposal

1. Platform identity and central proposition
2. District entrances
3. Selected or current signals from across the platform
4. Visitor-intention pathways
5. About and contact orientation

## 10.3 Visitor-intention pathways — Proposal

Home may provide direct semantic pathways such as:

- View selected professional work
- Explore current research
- See experiments and prototypes
- Discover artworks
- Browse available products
- Learn about the practice
- Get in contact

These are pathways, not additional districts.

---

# 11. Page and Content Relationships

## 11.1 Primary relationship model — Proposal

```text
Platform
  → District
    → Section or Collection
      → Entry
        → Subentry, when justified
```

## 11.2 Cross-district relationship model — Proposal

Content should also support meaningful lateral relationships:

```text
Research question
  ↔ Lab experiment
  ↔ Work outcome
  ↔ Product offering
  ↔ Art interpretation
```

Not every project requires all relationships. Connections should only be shown when they explain a genuine intellectual, practical, or historical relationship.

## 11.3 Relationship types — Proposal

Use explicit relationship meanings rather than a generic “related” category whenever possible:

- Developed from
- Informed by
- Tested through
- Resulted in
- Part of series
- Earlier iteration
- Later iteration
- Companion project
- Shared theme
- Shared method
- Available as product
- Presented in
- Collaborated with

## 11.4 Collection relationships — Proposal

Collections are curated groupings that may cross disciplines or districts.

Examples:

- Selected Architecture
- AI and Design
- Open Systems
- Accessibility Research
- Tools for Designers
- Current Experiments

A collection does not replace the canonical district of an item.

## 11.5 Series and multipart work — Proposal

Use a series when multiple entries share a common identity and sequence.

Use subentries when parts cannot be understood independently from the parent.

This distinction prevents unnecessary fragmentation.

---

# 12. Search and Discovery

## 12.1 Search role — Proposal

Search is a global utility for visitors who know what they are looking for or want to explore across district boundaries.

Search should not replace curated navigation.

## 12.2 Search scope — Proposal

Search should cover publicly available:

- titles
- summaries
- project descriptions
- people and collaborators
- organizations
- disciplines
- themes
- methods
- locations
- dates
- content types
- product names
- publication titles

## 12.3 Search result organization — Proposal

Results should clearly communicate:

- title
- content type
- primary district
- short contextual description
- date or status when relevant
- principal classifications

Results should be grouped or filterable when volume requires it.

## 12.4 Search filters — Proposal

Potential filters:

- District
- Content type
- Discipline
- Theme
- Year or period
- Status
- Context
- Medium
- Availability

Filters should only be introduced when enough content exists to make them useful.

## 12.5 Search behavior principles — Proposal

- Exact title matches should be easy to identify.
- Search should recognize common terms and approved synonyms.
- Empty searches should lead to the Index or a browseable overview rather than an error state.
- No-result states should offer broader categories or corrected vocabulary.
- Internal unpublished information must not appear in public search.

---

# 13. The Global Index

## 13.1 Purpose — Proposal

The Index is the comprehensive, non-curated view of the public platform.

It serves:

- returning visitors
- recruiters performing a broad review
- researchers looking for a specific topic
- visitors who prefer lists over spatial exploration
- long-term archival access

## 13.2 Index organization — Proposal

The Index should support multiple views of the same canonical content set:

- by district
- by content type
- by discipline
- by theme
- by chronology
- alphabetically
- by status or availability when relevant

The Index should not introduce a second, conflicting taxonomy.

---

# 14. User Journeys

The following journeys are **Proposals** intended to test whether the architecture serves distinct visitor needs.

## 14.1 Potential employer or recruiter

### Goal

Understand professional relevance, capabilities, contribution, and experience quickly.

### Primary journey

Home → Work → Selected Work → Project Case Study → Role and Contribution → About → Experience → Contact

### Alternate direct journey

Search or Index → Relevant Project → About → Contact

### Required information

- clear role
- project context
- responsibilities
- outcomes
- collaborators
- tools or methods when relevant
- professional experience

## 14.2 Potential client

### Goal

Assess fit, quality, process, and availability for collaboration.

### Primary journey

Home → Work → Relevant Practice Area → Case Study → Related Projects → About → Practice and Philosophy → Contact

### Product or service journey

Home → Products → Service or Product → Proposition → Availability → Contact or acquisition pathway

## 14.3 Researcher, academic, or thesis collaborator

### Goal

Understand research questions, methods, findings, and related experiments.

### Primary journey

Home → Research → Research Theme → Research Entry → Related Lab Experiment → Publication or Talk → About → Contact

## 14.4 Designer, developer, or creative collaborator

### Goal

Discover shared interests and understand active experiments.

### Primary journey

Home → Lab → Active Experiment → Related Work or Research → About → Current Focus → Contact

## 14.5 Collector, curator, or art-focused visitor

### Goal

Understand artistic practice, bodies of work, and availability.

### Primary journey

Home → Art → Body of Work → Artwork or Series → Exhibition History or Availability → About → Contact

### Product connection

Art Entry → Related Edition → Product Entry

## 14.6 Customer or product user

### Goal

Understand an offering and determine whether it is relevant and obtainable.

### Primary journey

Home or direct link → Products → Product Collection → Product Entry → Contents or Features → Availability → Documentation or Contact

## 14.7 General exploratory visitor

### Goal

Understand the coherence of the complete practice through discovery.

### Primary journey

Home → District → Curated Entry → Related Entry in Another District → About

## 14.8 Returning visitor

### Goal

Find new, current, or previously visited content efficiently.

### Primary journey

Home → Current Activity or Index → Filtered collection → Entry

---

# 15. Content Organization Within Entries

## 15.1 Shared entry framework — Proposal

Most substantial entries should communicate, in an order appropriate to their type:

1. Identity
2. Context
3. Intent or question
4. Personal role
5. Process or method
6. Outcome, finding, or current state
7. Credits and relationships
8. Related content

This is an information sequence, not a visual page template.

## 15.2 Project identity information — Proposal

Where applicable:

- title
- subtitle or concise proposition
- date or duration
- location
- content type
- primary district
- disciplines
- status
- role
- collaborators
- client or institution

## 15.3 Transparency of contribution — Proposal

Collaborative and professional work must clearly distinguish:

- total project scope
- personal responsibilities
- team or office authorship
- collaborators
- source and ownership of visual material

This protects credibility and allows visitors to understand the actual contribution.

## 15.4 Entry depth — Proposal

Not every item requires a full case study.

Use three editorial depths:

- **Feature entry** — extensive narrative and documentation
- **Standard entry** — complete but concise presentation
- **Index entry** — essential metadata and a brief description

Depth reflects available evidence and significance, not the district itself.

---

# 16. Content Maturity and Movement Between Districts

## 16.1 Content evolution — Proposal

A project may evolve over time:

```text
Idea
  → Lab experiment
    → Research finding
    → Completed work
    → Product
```

This is not a mandatory linear path.

An artwork may remain Art. A research project may never become a product. A professional project may begin directly as Work.

## 16.2 Preservation of history — Proposal

When an item changes maturity:

- preserve meaningful earlier stages
- record relationships between stages
- avoid silently rewriting experimental history as if the final outcome was inevitable
- maintain one canonical identity when the stages remain parts of the same project
- create separate linked entries when each stage has independent value and visitor intent

## 16.3 Primary-district reassignment — Proposal

Reassign the canonical district only when the visitor’s principal expectation has materially changed.

Example:

- An experimental tool begins in Lab.
- Once stable and offered to users, its primary page may move to Products.
- The Lab retains a linked development record rather than a duplicated product page.

---

# 17. Scalability Rules

## 17.1 Adding content — Proposal

New content should normally fit into:

- an existing district
- an existing content type
- an existing or newly justified theme
- an existing collection or the comprehensive archive

Adding a project must not require changing the global hierarchy.

## 17.2 Adding a new district — Proposal

A new district should only be considered when all of the following are true:

1. The content represents a distinct visitor intention, not merely a discipline.
2. It contains or is expected to contain a substantial body of work.
3. It cannot be represented clearly within an existing district.
4. It requires its own stable internal hierarchy.
5. Its addition strengthens rather than fragments the overall practice.

## 17.3 Adding a new classification — Proposal

Create a new classification only when:

- multiple items require it
- visitors are likely to understand and use it
- it is meaningfully distinct from existing terms
- it is expected to remain relevant

## 17.4 Future ventures and company structure — Proposal

A future company, studio, or venture should initially be represented as an organization or venture entity connected to relevant Work, Products, Research, and About content.

It should become a district only if it develops an independent visitor purpose and substantial content ecosystem.

---

# 18. Naming Principles

## 18.1 District names — Proposal

District names should remain:

- short
- stable
- internationally understandable
- broad enough to support growth
- distinct in visitor intent

The approved names already satisfy these requirements.

## 18.2 Section names — Proposal

Use direct labels for structural clarity:

- Selected Work
- All Work
- Current Research
- Active Experiments
- Bodies of Work
- Product Collections
- Experience
- Contact

Metaphorical naming may support the universe concept, but it should not replace essential descriptive labels without an equally clear orientation mechanism.

## 18.3 Project titles — Proposal

Project titles should preserve the project’s real identity. Editorial subtitles may clarify purpose without renaming the original work.

---

# 19. Multilingual Information Architecture

## 19.1 Status — Idea

The platform may eventually require more than one language because the practice operates across Spanish-, French-, and English-speaking contexts.

## 19.2 Structural principle — Proposal if multilingual publishing is approved

- Languages should share the same conceptual hierarchy.
- A language should not create a separate district structure.
- Canonical relationships should remain consistent across languages.
- A missing translation should be explicitly indicated rather than silently substituting incomplete content.
- Search and indexing should respect language while allowing intentional cross-language discovery.

Language strategy requires a separate approval decision before it becomes part of the active architecture.

---

# 20. Governance and Source-of-Truth Rules

## 20.1 Ownership — Approved

This conversation and this document own information-architecture decisions.

Other project areas may propose changes but should not silently redefine:

- district structure
- navigation hierarchy
- content types
- classification rules
- search organization
- user-journey priorities

## 20.2 Change process — Proposal

Every structural change should record:

- the current state
- the proposed change
- the reason
- affected districts or content
- migration implications at the information level
- decision status

## 20.3 Decision status — Approved

Use:

- Idea
- Proposal
- Approved
- Implemented
- Verified
- Deprecated

Implementation and verification are tracked elsewhere, but the information-architecture decision remains documented here.

---

# 21. Decision Register

## 21.1 Approved foundations

| Decision | Status | Source |
|---|---|---|
| The platform is a long-term professional and creative ecosystem, not only a portfolio. | Approved | Project Instructions |
| The platform is organized as an architectural universe. | Approved | Project Instructions |
| Home is the entrance to the universe. | Approved | Project Instructions |
| The current major districts are Home, Work, Research, Lab, Art, Products, and About. | Approved | Project Instructions |
| Future districts may be added without fundamental redesign. | Approved | Project Instructions |
| Structure and systems precede visual and implementation decisions. | Approved | Project Instructions |

## 21.2 Proposed information-architecture decisions

| Decision | Status |
|---|---|
| Districts represent modes of visitor engagement rather than disciplines. | Proposal |
| Disciplines operate as cross-platform classifications. | Proposal |
| Each substantive item has one canonical identity and may appear through multiple pathways. | Proposal |
| Every district contains a curated layer and a comprehensive layer. | Proposal |
| Search and Index are global utilities rather than districts. | Proposal |
| Content is classified through controlled dimensions including district, type, discipline, theme, medium, status, role, context, and time. | Proposal |
| Work, Research, Lab, Art, and Products have explicit placement tests. | Proposal |
| Entries support explicit cross-district relationships. | Proposal |
| New districts require a distinct visitor intention and substantial independent content. | Proposal |
| The platform supports both immersive exploration and direct access. | Proposal |

## 21.3 Open decisions

The following require future discussion and approval:

1. Final Work practice-area vocabulary.
2. Initial Research theme vocabulary.
3. Initial Lab grouping model: by experiment type, theme, or status.
4. Whether Services should remain within Products or eventually receive a distinct structure.
5. Whether a public chronological journal or updates layer is needed.
6. Multilingual scope and language priority.
7. Public visibility rules for unfinished, failed, confidential, or archived work.
8. Thresholds for distinguishing Feature, Standard, and Index entries.
9. Whether the global Index is visible in primary utility navigation from the first release.
10. Whether organizations and ventures require dedicated public profile pages in the initial architecture.

---

# 22. Recommended Approval Sequence

To complete Phase 2 without moving into visuals or implementation, approve the architecture in the following order:

1. District definitions and boundaries
2. Master sitemap
3. Navigation model
4. Content types
5. Classification dimensions
6. Page and content relationships
7. Search and Index model
8. Priority user journeys
9. Scalability and governance rules
10. Multilingual scope

---

# 23. Phase 2 Completion Criteria

The Information Architecture phase can be considered **Approved** when:

- every major district has a clear purpose and boundary
- the sitemap is accepted
- primary, secondary, contextual, and utility navigation are defined
- content types and classification rules are accepted
- ambiguous content can be assigned consistently
- key user journeys can reach their goals without depending on visual effects
- search and Index roles are resolved
- future content and ventures can be added without restructuring the platform
- open decisions that affect the Design System or Universe Design are either resolved or explicitly deferred

Until these criteria are met, Phase 3 should not be treated as approved to begin.

---

# 24. Current Document State

This version establishes the first complete information-architecture proposal.

It does not approve the proposed structure automatically. The approved district framework comes from the Project Instructions; all newly introduced substructures, taxonomies, navigation rules, and content models remain **Proposal** until reviewed in this conversation.
