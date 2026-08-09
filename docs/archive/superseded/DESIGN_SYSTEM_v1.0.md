# Personal Platform — Design System

**Document:** `DESIGN_SYSTEM.md`  
**Domain owner:** Design System conversation  
**Version:** 1.0  
**Status:** Approved  
**Approved:** 2026-08-07  
**Supersedes:** `DESIGN_SYSTEM.md v0.1`  
**Project phase:** Phase 3 — Design System

---

## 1. Purpose

This document defines the complete shared visual language of the Personal Platform.

It answers one governing question:

> **What visual rules make the whole platform feel like one coherent world?**

The platform already defines different districts with different roles, atmospheres, and behaviors. The Design System does not redesign those districts. It defines the common visual machinery available to all of them.

The governing distinction is:

> **The Universe documents define what each district should feel like.**  
> **The Design System defines the visual tools available to create those feelings.**

The system must create **coherence without sameness**.

---

## 2. Authority and relationship to the project

This document is governed by the approved platform principles:

- timeless
- minimal
- architectural
- atmospheric
- exploratory
- cohesive
- systems before individual pages
- reusable rules before custom exceptions
- scalability over short-term convenience

The platform is not a conventional portfolio website. It is an explorable architectural world containing professional work, research, experiments, art, products, personal authorship, and future activities.

The visual system must therefore support both:

1. a recognizable shared universe
2. meaningful differences between districts

Everything in this document is **Approved** unless explicitly identified as a district-owned variable or implementation detail.

---

## 3. Design-system thesis

The platform should feel like a **quiet, precise, inhabited spatial system**.

Its visual identity comes from:

- proportion
- alignment
- line
- plane
- frame
- void
- measured typography
- controlled contrast
- restrained color
- spatial hierarchy
- editorial rhythm
- architectural annotation

The architectural-metaverse idea must be expressed through composition rather than spectacle.

The system should suggest plans, sections, measured drawings, thresholds, rooms, fields, plates, traces, routes, and spatial depth without becoming a literal architectural-interface imitation.

The platform must not resemble:

- a generic agency portfolio
- a dashboard
- a game HUD
- a neon science-fiction interface
- a collection of unrelated microsites
- a trend-driven design showcase
- a conventional e-commerce template

---

# PART I — THE SHARED VISUAL GRAMMAR

## 4. Core visual primitives

Every district uses the same six static primitives.

### 4.1 Field

The **field** is the environmental ground of a composition.

It may be dark, light, photographic, atmospheric, or spatial, but it must remain calm enough to support hierarchy.

The field is not decoration. It establishes the visual climate in which content exists.

### 4.2 Line

The **line** expresses:

- division
- route
- measurement
- sequence
- alignment
- connection
- boundary
- state

Linework is one of the platform's strongest architectural identity devices.

### 4.3 Plane

A **plane** is a content-bearing surface.

Examples:

- reading surface
- project plate
- media surface
- information panel
- product information zone
- comparison region

Planes are created first through tonal distinction and spacing. Borders are secondary.

### 4.4 Frame

A **frame** establishes the limits of an object or view.

Frames are appropriate for:

- media
- diagrams
- technical plates
- documents
- comparison states
- interface controls

A frame is not the same as a card. The system should not place every object inside a box.

### 4.5 Void

The **void** is deliberate empty space.

Void establishes:

- scale
- pause
- hierarchy
- concentration
- separation
- threshold

Empty space is an active design material.

### 4.6 Signal

A **signal** is a controlled visual accent used for:

- focus
- active state
- selection
- orientation
- status
- district identity

Signals must remain subordinate to content.

---

## 5. Composition rules

### 5.1 One dominant gesture

Each major viewport or section should have one dominant visual gesture.

That gesture may be:

- a title
- a work
- a proposition
- an image
- a diagram
- an object
- a route
- a spatial field

Avoid multiple elements competing for equal authority.

### 5.2 Hierarchy through architecture

Hierarchy should be created in this order:

1. position
2. scale
3. void
4. alignment
5. contrast
6. weight
7. color

Color should rarely be the first method of emphasis.

### 5.3 Density

The default density is **low to medium**.

Higher density is permitted where the task requires scanning, comparison, filtering, technical reading, or commerce.

Dense areas must remain structured by alignment and grouping rather than excessive containers.

### 5.4 Asymmetry

Asymmetry is permitted and encouraged when it creates spatial direction.

It must remain anchored to the shared grid.

Random offsetting is not architectural asymmetry.

### 5.5 Restraint

Every visual element must justify its presence.

If removing an element does not reduce orientation, meaning, hierarchy, atmosphere, or usability, it should normally be removed.

---

# PART II — TYPOGRAPHY

## 6. Typography system

### 6.1 Approved type families

The shared system uses two families.

**Primary:** Inter  
**Secondary / technical:** IBM Plex Mono

These choices are approved because they provide:

- strong multilingual support
- reliable digital rendering
- long-term availability
- broad weight ranges
- clear small-size readability
- restrained architectural character
- technical distinction without decorative styling

No district may replace these families as part of its identity.

A project artifact may contain typography intrinsic to the artifact itself, but that typography does not become interface typography.

### 6.2 Typeface roles

Inter is used for:

- display
- headings
- body text
- interface labels
- navigation
- product information
- long-form reading

IBM Plex Mono is used selectively for:

- metadata
- dates
- coordinates
- indexes
- figure numbers
- states
- technical identifiers
- measurements
- small annotations

Monospaced text must not dominate long-form reading.

---

## 7. Shared typographic hierarchy

The platform uses the following semantic roles everywhere.

| Role | Purpose | Approved large-screen range | Character |
|---|---|---:|---|
| Display | District entrances, rare major statements | 72–120 px | Monumental, sparse |
| H1 | Page, project, work, research or product identity | 44–72 px | Primary structural title |
| H2 | Major section | 32–48 px | Strong editorial division |
| H3 | Subsection or grouped module | 22–32 px | Compact structural heading |
| Body Large | Introductory or lead text | 20–24 px | Open, slower reading |
| Body | Standard prose | 16–18 px | Neutral, comfortable |
| Body Small | Supporting prose | 14–16 px | Secondary but readable |
| Caption | Media caption or credit | 13–14 px | Quiet, attached to media |
| Metadata | Date, role, state, index, technical data | 12–13 px | Compact, measured |
| Annotation | Figure note, route note, technical explanation | 12–14 px | Precise, contextual |
| Label | Navigation, filter, field, control | 13–15 px | Direct, concise |

Sizes are fluid within these ranges. The semantic role is fixed; an implementation may not change heading meaning merely to obtain a visual size.

### 7.1 Line height

- Display: 0.90–1.00
- H1: 0.98–1.08
- H2: 1.05–1.15
- H3: 1.10–1.20
- Body Large: 1.40–1.55
- Body: 1.50–1.65
- Body Small: 1.45–1.60
- Caption: 1.35–1.50
- Metadata: 1.30–1.45
- Annotation: 1.35–1.50
- Label: 1.20–1.35

### 7.2 Weight

The default system uses:

- Regular 400
- Medium 500
- Semibold 600 only when necessary

Bold 700 is exceptional.

Typography should gain authority through scale and position before weight.

### 7.3 Tracking

- Display: slightly negative
- Headings: neutral to slightly negative
- Body: neutral
- Metadata: neutral
- Uppercase micro-labels: moderately positive

Long uppercase passages are prohibited.

### 7.4 Reading width

- Standard prose: 55–72 characters per line
- Large introductory prose: up to approximately 80 characters
- Research long-form text: preferably 60–70 characters
- Captions and metadata: naturally shorter

Full-width long-form text is prohibited on wide screens.

### 7.5 Typography invariants

Across every district:

- one semantic H1 per page in normal circumstances
- heading levels follow document structure
- no text below 12 px for normal interface content
- no essential information communicated only through capitalization or weight
- maximum three simultaneous weights in one composition
- body copy remains sentence case
- all text must remain selectable where technically possible

---

# PART III — SPACING, PROPORTION, AND GRID

## 8. Spacing system

The system uses a **4 px micro-unit** and an **8 px primary rhythm**.

### 8.1 Approved spacing scale

| Token | Value |
|---|---:|
| Space 0 | 0 px |
| Space 1 | 4 px |
| Space 2 | 8 px |
| Space 3 | 12 px |
| Space 4 | 16 px |
| Space 5 | 24 px |
| Space 6 | 32 px |
| Space 7 | 48 px |
| Space 8 | 64 px |
| Space 9 | 96 px |
| Space 10 | 128 px |
| Space 11 | 192 px |
| Space 12 | 256 px |

Large values may interpolate responsively rather than remain fixed on smaller screens.

### 8.2 Spacing logic

- internal spacing is smaller than external spacing
- objects in the same semantic group sit closer together than objects in different groups
- section spacing should be perceptibly larger than component spacing
- major thresholds may use extreme void
- empty space must not make simple tasks inefficient

### 8.3 Shared section rhythm

- compact module separation: 32–48 px
- normal section separation: 64–96 px
- major chapter separation: 96–192 px
- entrance or gallery void: up to 256 px where justified

These are system ranges, not requirements that every district use the same density.

---

## 9. Grid system

### 9.1 Shared responsive grid

The system uses a responsive column framework.

| Context | Columns | Outer margin | Gutter |
|---|---:|---:|---:|
| Compact | 4 | 16–24 px | 12–16 px |
| Medium | 8 | 32–48 px | 20–24 px |
| Wide | 12 | 48–80 px | 24–32 px |
| Ultra-wide | 12 | fluid | 32 px |

Reference thresholds:

- Compact: below 640 px
- Medium: 640–1023 px
- Wide: 1024–1599 px
- Ultra-wide: 1600 px and above

Thresholds may shift slightly during implementation only when content testing demonstrates a clear need. The 4 / 8 / 12 structural logic remains fixed.

### 9.2 Maximum composition width

The standard structural composition should not exceed approximately **1600 px**.

Ultra-wide screens should gain margin, void, and spatial depth rather than stretched text or uncontrolled media width.

Full-bleed atmospheric fields and selected media are exempt.

### 9.3 Alignment

Major content should align to the shared grid.

Permitted departures:

- threshold compositions
- deliberate spatial tension
- large art presentation
- oversized media
- exceptional architectural diagrams

Departures must remain optically related to the underlying grid.

### 9.4 Baseline rhythm

An 8 px vertical baseline should guide repeated UI and editorial structures.

Optical correction is allowed for typography and media.

---

# PART IV — COLOR, SURFACES, AND DEPTH

## 10. Color architecture

### 10.1 Principle

The shared universe is fundamentally neutral.

Color is used as:

- light
- atmosphere
- orientation
- focus
- state
- limited district signal

Color is not used to compensate for weak hierarchy.

### 10.2 Approved core neutral palette

| Token | Value | Primary role |
|---|---|---|
| Void 1000 | `#0B0D0E` | Deep environmental field |
| Void 900 | `#121516` | Dark surface |
| Graphite 800 | `#1D2123` | Raised dark plane |
| Graphite 700 | `#303638` | Structural dark divider |
| Graphite 500 | `#6B7275` | Muted structure |
| Mist 300 | `#B9BEBD` | Secondary light-on-dark information |
| Mist 200 | `#D7DAD7` | Light divider |
| Paper 100 | `#ECEBE6` | Secondary warm surface |
| Paper 50 | `#F5F3ED` | Primary light field |
| White 0 | `#FFFFFF` | Maximum light |
| Ink | `#151719` | Primary text on light |
| Ink Secondary | `#5C6265` | Secondary text on light |
| Light Text | `#F4F2EC` | Primary text on dark |

The palette is intentionally warm-neutral rather than pure monochrome.

### 10.3 Approved focus colors

Focus is a platform-level semantic state and cannot vary by district.

- Focus on light field: `#005FCC`
- Focus on dark field: `#75A7FF`

Focus color must be paired with a visible outline or boundary, not used as a subtle tint alone.

### 10.4 Approved semantic state colors

**On light fields**

- Information: `#005FCC`
- Success: `#2E7D32`
- Warning: `#8A5A00`
- Error: `#B3261E`

**On dark fields**

- Information: `#75A7FF`
- Success: `#6FCF82`
- Warning: `#F2C14E`
- Error: `#FF8A80`

Semantic color must be paired with a label, icon, line treatment, or state wording.

### 10.5 Dark and light fields

The platform supports two shared environmental field families:

**Dark Field**  
Deep neutral backgrounds with warm-light content and restrained graphite linework.

**Light Field**  
Warm-paper backgrounds with dark content and restrained grey linework.

These are not conventional user-selectable themes.

A district or page may author its field according to its approved atmosphere. The visual language remains shared in either mode.

### 10.6 District accents

A district may use **one accent family**.

Accent use is limited to:

- active district marker
- route trace
- selected state
- local annotation
- controlled atmospheric light
- occasional figure coding

District accent may not redefine:

- semantic error/success/warning colors
- focus state
- body-text color
- typography
- component anatomy
- accessibility requirements

Exact accent hue belongs to district identity. The Design System controls its behavior, not its hue.

A district is permitted to operate without a distinct accent if neutrality better serves its content.

### 10.7 Gradients

Gradients are permitted only for:

- light falloff
- atmospheric depth
- threshold transition
- image or field integration

Promotional multicolor gradients are prohibited.

---

## 11. Surfaces and planes

The shared system recognizes four surface levels.

### Field

The environmental background.

### Surface 1

A reading, content, or object plane separated primarily by tone.

### Surface 2

A temporarily emphasized, selected, floating, or comparison plane.

### Overlay

A modal, drawer, lightbox, or navigation layer requiring clear focus management.

Surfaces should be differentiated by:

1. tone
2. line
3. spacing
4. overlap

Strong shadow is the last resort.

---

## 12. Line, border, radius, and shadow

### 12.1 Line hierarchy

| Role | Weight | Use |
|---|---:|---|
| Hairline | 1 px | Grid, divider, measurement, caption relation |
| Standard | 1–1.5 px | Control, frame, active boundary |
| Emphasis | 2 px | Focus, selection, primary structural state |
| Structural | 3 px max | Rare exceptional boundary |

### 12.2 Border rule

Prefer:

- one edge instead of four
- shared dividers instead of repeated boxes
- tonal separation before outline
- spacing before containment

### 12.3 Radius

The platform is predominantly rectilinear.

Approved radii:

- 0 px — frames, media, architectural plates
- 2 px — default controls
- 6 px — selected compact UI where comfort requires it
- circular — only for intrinsically circular controls, status points, or avatars

Large rounded cards and excessive pills are not part of the visual language.

### 12.4 Shadow

Shadow must remain rare, broad, and soft.

Depth should normally come from:

- overlap
- tonal difference
- void
- scale
- field change

No ordinary card should require a drop shadow.

---

# PART V — ICONOGRAPHY, ANNOTATION, AND METADATA

## 13. Iconography

Icons are:

- outline-based
- geometric
- minimal
- optically balanced
- consistent in stroke

Approved standard frames:

- 16 × 16 px compact
- 20 × 20 px standard-small
- 24 × 24 px standard

Default stroke: approximately 1.5 px.

Text labels are required whenever an icon is not universally obvious.

Mixed visual icon families are prohibited.

Emoji are not interface icons.

---

## 14. Metadata language

Metadata is a shared architectural layer, not district-specific styling.

Typical metadata includes:

- year
- location
- role
- collaborators
- discipline
- status
- medium
- dimensions
- duration
- version
- publication state
- availability
- figure number

### 14.1 Metadata style

Default metadata uses:

- IBM Plex Mono
- 12–13 px
- regular weight
- restrained contrast
- short line lengths
- consistent field order

Metadata should be grouped rather than scattered around a composition.

### 14.2 Metadata prominence

The system defines the style; districts define the prominence.

Examples:

- Work may foreground metadata.
- Research may foreground source and state metadata.
- Lab may foreground version and experiment state.
- Art may reduce metadata until requested or until the viewing sequence pauses.
- Products may foreground price, availability, edition, and fulfillment information.

Same language. Different emphasis.

---

## 15. Annotation language

Annotations express relationships between content and spatial or technical context.

Permitted forms:

- figure number
- short note
- leader line
- measurement
- axis or coordinate
- sequence marker
- state label
- reference marker

Annotations should feel like architectural notation but remain understandable without architectural training.

They may never become ornamental pseudo-technical graphics.

---

# PART VI — MEDIA

## 16. Shared media system

The platform must unify highly varied media without forcing identical presentation.

The shared media family supports:

- photography
- architectural drawings
- renders
- diagrams
- interfaces
- code or computational outputs
- video
- artworks
- documents
- product imagery
- research figures

### 16.1 Media frame

A media frame may be:

- open / borderless
- hairline-framed
- plate-framed
- full-bleed
- contained comparison frame

The choice depends on content, not district decoration.

### 16.2 Cropping

- Drawings: preserve the complete composition unless explicitly presenting a detail.
- Artworks: preserve the work unless the artistically intentional crop is part of the presentation.
- Project photography: editorial crop allowed; full image should remain available where relevant.
- Product imagery: maintain consistent scale across comparable objects.
- Research figures: never crop away legends, axes, labels, or evidential context.

### 16.3 Caption anatomy

A caption may contain:

1. figure or object identifier
2. concise description or title
3. credit / role / source / medium / year as relevant

Credits cannot exist only on hover.

### 16.4 Media aspect ratio

The system does not impose one universal ratio.

The frame must preserve the logic of the source material.

Repeated comparison sets should use a common ratio or common visible frame where comparison benefits from consistency.

### 16.5 Full-screen viewing

Full-screen or enlarged viewing must preserve:

- caption access
- keyboard escape
- focus return
- next/previous behavior where relevant
- zoom or pan only when useful

---

# PART VII — SHARED COMPONENT FAMILIES

## 17. Component philosophy

Components should feel like architectural instruments rather than generic UI kit elements.

The system defines **families**, not a single universal card repeated everywhere.

Shared components may vary in density and emphasis, but not in basic behavior.

---

## 18. Navigation family

The shared navigation family includes:

- global universe navigation
- district marker
- local navigation
- route / breadcrumb indicator
- previous / next navigation
- search entry
- filter entry
- mobile navigation layer

### Invariants

Every page must make it possible to determine:

- where the visitor is
- what district they are in
- how to return to the shared universe
- how to continue locally

The global route must always be recoverable.

---

## 19. Link family

### Inline link

For links inside prose.

Must remain distinguishable without color alone.

### Route link

For moving between spaces, projects, chapters, or districts.

May use:

- arrow
- line extension
- coordinate
- index
- direction cue

### Utility link

For secondary functions such as download, copy, source, share, legal information, or support.

Link meaning must remain clear without relying on animation.

---

## 20. Button family

There are three action levels.

### Primary action

For the most important action in a local context.

- minimum visual height: 44 px
- strong contrast
- rectilinear geometry
- concise label
- one primary action per local group by default

### Secondary action

- same basic height and typography
- transparent or quiet surface
- hairline boundary or tonal distinction

### Tertiary / text action

- no containing plane by default
- text plus line, icon, or directional cue
- used for lower-priority exploration

### Button invariants

Every button must define:

- default
- hover where relevant
- focus-visible
- pressed
- disabled
- loading where relevant

The shape and basic interaction logic cannot vary by district.

---

## 21. Icon-control family

Icon-only controls are permitted only when the function is immediately recognizable or has an accessible label.

The interactive target should normally be at least 44 × 44 px even if the visible icon is smaller.

Examples:

- close
- previous
- next
- expand
- play / pause
- zoom
- menu

Critical or destructive actions require visible text in contexts where ambiguity is plausible.

---

## 22. Selection, filter, and state controls

The shared family includes:

- tabs
- segmented views
- filters
- checkboxes
- radio controls
- select fields
- compact status tags
- removable filter tokens

### Geometry

Pills are allowed only when the component's behavior genuinely benefits from token-like containment, such as removable filters or compact statuses.

Pill styling must not become the dominant interface language.

### Selection

Selected state must use at least two signals, for example:

- contrast + line
- text + symbol
- fill + icon

Color alone is insufficient.

---

## 23. Card and record family

Cards are treated as **records, plates, portals, or objects** rather than generic containers.

### Portal record

Purpose: enter a district or major collection.

Character:

- large void
- strong atmospheric field
- minimal information
- clear route cue

### Media record

Purpose: preview Work, Art, Lab, or other visual material.

Character:

- media-led
- title
- essential metadata
- optional description

### Index record

Purpose: scanning archives, work lists, research indexes, or search results.

Character:

- aligned
- compact
- often row-based
- minimal containment

### Editorial record

Purpose: paper, research question, essay, note, or publication.

Character:

- text-led
- status/date/source visibility
- controlled line length

### Product record

Purpose: commercial object or offer.

Character:

- object-led
- title
- price / availability
- edition or variant where relevant
- clear transaction route

### Record invariants

Essential information cannot exist only on hover.

Records may not dramatically jump in scale when focused or hovered.

---

## 24. Figure and media component family

Shared media components include:

- single figure
- figure + caption
- gallery sequence
- comparison pair
- comparison matrix
- document plate
- video frame
- artwork viewer
- product media set

All share common caption, credit, focus, and enlarged-view logic.

---

## 25. Metadata rail

A metadata rail is a shared layout device for structured secondary information.

It may sit:

- beside a project
- above a research document
- below an artwork
- beside a product
- within an About chronology

The rail uses the shared metadata language and may reflow below content on compact screens.

---

## 26. Form family

Forms are deliberately conventional.

Every field provides:

- persistent visible label
- control
- optional guidance
- focus state
- error state
- error explanation where needed

Placeholder text cannot replace a field label.

Form atmosphere is subordinate to completion clarity.

---

## 27. Overlay family

Includes:

- modal
- lightbox
- drawer
- full-screen media viewer
- mobile navigation layer

Overlays must provide:

- visible close mechanism
- Escape behavior where appropriate
- contained keyboard focus
- correct focus return
- background interaction prevention when modal
- clear relation to the underlying page

---

# PART VIII — RESPONSIVE SYSTEM

## 28. Responsive principle

Responsive design preserves **hierarchy and spatial intention**, not desktop geometry.

The platform must never become a miniature desktop layout on a phone.

---

## 29. Compact behavior

On compact screens:

- multi-column compositions become ordered vertical sequences
- void is reduced but not removed
- one primary spatial idea is retained at a time
- secondary linework is simplified
- decorative architectural traces may disappear
- metadata rails reflow below primary content
- controls remain reachable and full-sized
- text line length remains readable
- navigation cannot depend on hover or gesture discovery

Artistic or spatial ambiguity may never make basic navigation ambiguous.

---

## 30. Medium behavior

Medium screens may preserve:

- selective asymmetry
- two-column relationships
- local side rails
- moderate spatial void
- controlled simultaneous overview and detail

Secondary content may move below primary content when necessary.

---

## 31. Wide behavior

Wide screens may introduce:

- stronger asymmetry
- large void
- layered planes
- persistent secondary navigation
- expanded metadata relationships
- simultaneous overview and detail
- extended linework

Wide does not mean filling the screen.

---

## 32. Content order

Visual rearrangement is permitted only when semantic reading order remains coherent.

CSS or implementation tricks may not create a visual order that contradicts keyboard, screen-reader, or document order.

---

# PART IX — ACCESSIBILITY AND NON-NEGOTIABLE RULES

## 33. Accessibility target

The platform targets **WCAG 2.2 AA** as the minimum shared standard.

This applies equally to:

- Home
- Work
- Research
- Lab
- Art
- Products
- About
- future districts

Experimental atmosphere is never an exemption.

---

## 34. Contrast

Required minimums:

- normal text: 4.5:1
- large text: 3:1
- essential graphical objects and interactive boundaries: 3:1 where applicable

Low-contrast atmospheric lines may exist only when they carry no essential information.

---

## 35. Focus

Focus visibility is mandatory and cannot vary by district.

Approved focus treatment:

- 2 px visible focus line
- minimum 2 px visual separation from the component edge when practical
- platform focus color appropriate to light or dark field
- never clipped by overflow
- never replaced only by a color shift

Hover and focus may share some styling but must not be identical when keyboard orientation would become unclear.

---

## 36. Keyboard

All interactive functions must be keyboard operable.

Keyboard order must follow the logical reading and navigation sequence.

No district may create an essential gesture-only path.

---

## 37. Touch and pointer

Interactive targets should normally provide at least a **44 × 44 px** hit area.

Small visual symbols may sit inside larger invisible hit targets.

Essential information cannot depend on hover.

---

## 38. Text scaling and zoom

The platform must remain usable at 200% zoom.

Text must reflow without loss of content or functionality.

Two-dimensional scrolling is reserved for content that genuinely requires it, such as large drawings, tables, or diagrams.

---

## 39. Color independence

Meaning cannot be encoded through hue alone.

Every important state requires an additional cue such as:

- label
- icon
- line
- shape
- position
- pattern

---

## 40. Media accessibility

- informative images receive meaningful alternative text
- decorative geometry is hidden from assistive reading
- complex diagrams receive concise summaries and extended explanation where required
- video receives captions
- audio-led work receives transcript or equivalent access
- controls remain keyboard accessible

---

## 41. Cognitive accessibility

The exploratory character of the platform must remain optional.

The system prohibits:

- hidden essential information
- ambiguous icon-only critical actions
- unexpected navigation relocation
- excessive simultaneous signals
- long unbroken text walls
- essential content revealed only through spatial experimentation

A direct path must always exist even when an exploratory path is offered.

---

# PART X — DISTRICT VARIATION

## 42. Coherence without sameness

District variation is achieved by changing the **emphasis** of shared tools, not by inventing new visual languages.

Every district uses the same:

- type families
- semantic hierarchy
- spacing scale
- grid logic
- core neutral palette
- line family
- control anatomy
- focus behavior
- accessibility rules
- metadata syntax
- responsive principles
- media accessibility logic

---

## 43. Variables districts may control

A district may vary:

1. field mode: dark, light, or content-led
2. amount of void
3. composition density
4. metadata prominence
5. annotation prominence
6. media dominance
7. linework visibility
8. local accent family
9. degree of asymmetry
10. ratio of overview to detail

A district may not introduce an unrelated visual language merely to feel distinct.

---

## 44. Approved district emphasis matrix

This matrix translates the approved district intentions into shared-system emphasis. It does not replace the Universe documents.

| District | Void | Structure | Metadata | Annotation | Media / content authority | Surface tendency |
|---|---|---|---|---|---|---|
| Home | Very high | Low-visible / spatial | Low | Low | Environment and threshold | Dark field favored |
| Work | Medium | High | High | Medium | Evidence and project media | Neutral / structured |
| Research | High | Medium | Medium-high | High | Text, source, argument | Light editorial field favored |
| Lab | Medium | High | High | High | Iteration, comparison, state | Calibrated mixed field |
| Art | Very high | Minimal | Low / deferred | Minimal | Artwork | Content-led field |
| Products | Medium-low | High | High | Low-medium | Object + commercial facts | Clear neutral surfaces |
| About | High | Medium-low | Medium | Low | Biography, continuity, portrait / narrative | Warm, human neutral field |

The table defines relative emphasis, not mandatory page layouts.

---

## 45. Home

Home may use the system's largest void, most atmospheric field, and most spatial linework.

It should reveal the system rather than display every component family.

Home must not establish interaction conventions that disappear elsewhere.

---

## 46. Work

Work may tighten spacing and increase structural alignment.

It may foreground:

- metadata rails
- project indexes
- roles
- dates
- collaborators
- categories
- technical figures

The visual system should make evidence legible without becoming a corporate dashboard.

---

## 47. Research

Research may slow the rhythm and increase editorial reading space.

It may foreground:

- annotation
- references
- quotations
- source relations
- publication states
- argument structure

The system should support long reading without abandoning the architectural universe.

---

## 48. Lab

Lab may use denser comparison zones and more visible technical annotation.

It may foreground:

- versions
- branches
- tests
- states
- outcomes
- failure
- transformation

Experimental content may be unstable. Interface behavior may not be unstable.

---

## 49. Art

Art minimizes interface authority around the work.

It may use:

- extreme void
- reduced metadata prominence
- minimal linework
- content-led field changes
- very quiet controls

Controls and metadata may recede visually but must remain discoverable and accessible.

---

## 50. Products

Products may use tighter information zones because comparison and transaction require efficiency.

It must foreground:

- title
- price
- availability
- variant or edition
- fulfillment
- licensing where relevant
- purchase action

Commercial clarity takes precedence over atmospheric ambiguity.

---

## 51. About

About may use a warmer, less technical composition while remaining within the same system.

It may emphasize:

- portraiture
- chronology
- biography
- experience
- values
- languages
- availability
- credentials
- contact

It should feel authored and human, not like a separate personal-brand template.

---

# PART XI — VISUAL HIERARCHY BY CONTENT TYPE

## 52. Project / Work hierarchy

Default order:

1. project identity
2. primary evidence
3. role and context
4. narrative
5. secondary evidence
6. metadata and credits
7. related routes

---

## 53. Research hierarchy

Default order:

1. question or proposition
2. state / publication context
3. argument or abstract
4. evidence and references
5. relationships to Work or Lab
6. supporting metadata

---

## 54. Experiment hierarchy

Default order:

1. experiment identity
2. question / hypothesis
3. current state
4. test / version / branch
5. outcome
6. relation to Research, Work, or Products

---

## 55. Artwork hierarchy

Default order:

1. work
2. title
3. essential identification
4. contextual text only when useful
5. related series / collection / route

The artwork must not compete with its frame.

---

## 56. Product hierarchy

Default order:

1. object / offer identity
2. key media
3. price and availability
4. purchase or inquiry action
5. specification / edition / license
6. fulfillment and support
7. canonical relationship to Work, Art, Research, or Lab

---

# PART XII — MOTION BOUNDARY

## 57. What this document owns

The Design System defines only the visual prerequisites for interaction states.

It owns:

- default state
- hover state appearance
- focus-visible state appearance
- active / pressed state appearance
- selected state appearance
- disabled state appearance
- loading-state visual hierarchy

The Design System does **not** define the choreography of movement between those states.

---

## 58. What `ANIMATION_SYSTEM.md` will own

The future Animation System will define:

- duration
- easing
- entrance and exit logic
- page transitions
- district transitions
- threshold behavior
- spatial travel
- reveal sequencing
- return transitions
- comparison transitions
- media transitions
- spatial memory
- reduced-motion choreography

The static system should therefore never depend on animation to make hierarchy or meaning understandable.

---

# PART XIII — ANTI-PATTERNS

## 59. Prohibited shared-language patterns

Unless explicitly justified and approved as content rather than interface, the platform must not use:

- glassmorphism as a primary surface language
- large soft rounded cards everywhere
- bright neon as the base identity
- gratuitous 3D decoration
- persistent cursor effects
- decorative pseudo-technical measurements
- tiny interface text
- low-contrast body copy
- icon-only critical actions
- essential hover-only content
- excessive pills
- arbitrary gradients
- multiple unrelated icon sets
- district-specific typefaces
- district-specific button anatomy
- unrelated card systems for every content type
- color as the only state signal
- visual density presented as exploration
- decorative architectural linework that interferes with content
- interface ornament that competes with artwork or project evidence

---

# PART XIV — DESIGN TOKENS

## 60. Approved token families

Implementation may express these tokens in any suitable technical syntax, but their semantic meaning must remain stable.

### Typography

- `font-primary`
- `font-technical`
- `type-display`
- `type-h1`
- `type-h2`
- `type-h3`
- `type-body-large`
- `type-body`
- `type-body-small`
- `type-caption`
- `type-metadata`
- `type-annotation`
- `type-label`

### Spacing

- `space-0` through `space-12`

### Grid

- `grid-compact-4`
- `grid-medium-8`
- `grid-wide-12`
- `margin-compact`
- `margin-medium`
- `margin-wide`
- `gutter-compact`
- `gutter-medium`
- `gutter-wide`
- `composition-max`

### Neutral color

- `color-void-1000`
- `color-void-900`
- `color-graphite-800`
- `color-graphite-700`
- `color-graphite-500`
- `color-mist-300`
- `color-mist-200`
- `color-paper-100`
- `color-paper-50`
- `color-white`
- `color-ink`
- `color-ink-secondary`
- `color-light-text`

### Semantic color

- `color-focus`
- `color-info`
- `color-success`
- `color-warning`
- `color-error`
- `color-disabled`
- `color-district-accent`

### Line and geometry

- `line-hairline`
- `line-standard`
- `line-emphasis`
- `line-structural`
- `radius-none`
- `radius-small`
- `radius-control`
- `radius-circle`

### Surface

- `surface-field`
- `surface-1`
- `surface-2`
- `surface-overlay`

---

# PART XV — IMPLEMENTATION GOVERNANCE

## 61. What Claude Code may implement directly from this document

Once implementation reaches the relevant phase, Claude Code may translate the approved system into:

- design tokens
- typography primitives
- layout primitives
- grid utilities
- spacing utilities
- neutral and semantic color variables
- focus primitives
- button family
- link family
- form family
- media frame family
- metadata primitives
- annotation primitives
- card / record primitives
- overlay primitives
- responsive behavior

Claude Code must not reinterpret the visual philosophy or introduce a new component language.

---

## 62. What requires a new design decision

The following cannot be introduced silently during implementation:

- a new typeface
- a new spacing scale
- a new grid model
- a new shared accent strategy
- a new button anatomy
- a new card geometry
- a new focus language
- a new border-radius language
- a district-specific interface system
- a lower accessibility target
- an interaction pattern that hides essential information

Such changes require an explicit design-system decision and documentation update.

---

## 63. What remains district-owned

The following are intentionally **not unresolved**; they belong to district-level design within the system boundaries:

- exact district accent hue
- exact amount of void on a specific page
- exact local composition
- exact media scale
- exact field choice for individual content
- local metadata prominence
- local annotation prominence
- district symbol design

The shared system defines the permissible range. Universe documents define the intended atmosphere. Page design selects the specific composition.

---

# PART XVI — QUALITY CONTROL

## 64. Coherence test

A design belongs to the platform only if:

- it uses the approved typography
- it aligns to the shared grid logic
- it uses the shared spacing scale
- its controls use shared anatomy
- its linework belongs to the shared line family
- its color belongs to the shared color architecture
- its district difference comes from emphasis, not replacement

---

## 65. Hierarchy test

At any major viewport, a visitor should be able to identify:

1. where they are
2. what is primary
3. what supports it
4. what can be acted upon
5. where they can go next

---

## 66. Restraint test

For every visual element ask:

- Does it clarify?
- Does it orient?
- Does it establish hierarchy?
- Does it support atmosphere?
- Does it communicate state?
- Does it support the content?

If none apply, remove it.

---

## 67. District test

A district is successfully differentiated when it feels distinct even if its accent color is removed.

Its identity should still emerge from:

- void
- density
- composition
- media authority
- metadata prominence
- annotation prominence
- structure

This prevents color-coded sameness disguised as variation.

---

## 68. Accessibility test

No visual concept is approved if it requires sacrificing:

- readable contrast
- visible focus
- keyboard navigation
- target size
- semantic order
- zoom and reflow
- direct access to essential content

---

## 69. Scalability test

A pattern is system-worthy only if it can accommodate:

- many projects
- different media types
- long and short titles
- multilingual text
- missing optional metadata
- future districts
- small and large datasets
- compact and wide screens

One-off compositions may exist, but they may not silently become new global patterns.

---

# PART XVII — DECISION REGISTER

## 70. Approved decisions

| ID | Decision | Status |
|---|---|---|
| DS-001 | One coherent visual system governs all districts. | Approved |
| DS-002 | Architectural identity comes from line, plane, frame, void, proportion, grid, and annotation. | Approved |
| DS-003 | Inter is the shared primary typeface. | Approved |
| DS-004 | IBM Plex Mono is the shared technical / metadata typeface. | Approved |
| DS-005 | The platform uses the shared Display / H1 / H2 / H3 / Body / Caption / Metadata / Annotation / Label hierarchy. | Approved |
| DS-006 | The system uses a 4 px micro-unit and 8 px primary spacing rhythm. | Approved |
| DS-007 | Responsive layout uses 4-, 8-, and 12-column structural grids. | Approved |
| DS-008 | The core palette is neutral, warm, and capable of both Dark Field and Light Field compositions. | Approved |
| DS-009 | Districts may use one controlled accent family without changing global semantics. | Approved |
| DS-010 | Focus colors and focus behavior are global and cannot vary by district. | Approved |
| DS-011 | Geometry is predominantly rectilinear with restrained radius. | Approved |
| DS-012 | Linework is a primary shared identity device. | Approved |
| DS-013 | Cards are treated as records, plates, portals, or objects rather than generic rounded containers. | Approved |
| DS-014 | Buttons use one shared three-level action hierarchy. | Approved |
| DS-015 | Metadata and annotation have shared visual syntax but district-variable prominence. | Approved |
| DS-016 | Media is unified through framing, caption, credit, and accessibility rules rather than forced aspect ratios. | Approved |
| DS-017 | Responsive design preserves hierarchy and spatial intention rather than shrinking desktop layouts. | Approved |
| DS-018 | WCAG 2.2 AA is the minimum accessibility target. | Approved |
| DS-019 | Essential information can never depend on hover, color, or animation alone. | Approved |
| DS-020 | Search, forms, filters, and commerce remain conventionally understandable even inside atmospheric districts. | Approved |
| DS-021 | District identity comes from controlled emphasis of shared tools, not replacement of the system. | Approved |
| DS-022 | Animation choreography is excluded from this document and belongs to `ANIMATION_SYSTEM.md`. | Approved |
| DS-023 | The static interface must remain fully understandable without animation. | Approved |
| DS-024 | User-selectable site-wide light/dark theming is not part of v1.0; field appearance is authored by district and content. | Approved |
| DS-025 | The Design System is implementation-authoritative for shared visual rules. | Approved |

---

# PART XVIII — HANDOFF TO THE ANIMATION SYSTEM

## 71. Static language established by v1.0

The Design System now establishes:

- what the world is made of visually
- how typography establishes hierarchy
- how space establishes scale
- how the grid creates coherence
- how linework communicates structure
- how surfaces create depth
- how neutral color creates atmosphere
- how signals communicate state
- how media is framed
- how records and controls are constructed
- how accessibility constrains every district
- how responsive layouts preserve intent
- how districts may vary without fragmenting the platform

This is the stable visual substrate on which movement can operate.

---

## 72. Next system document

The next design-system-level deliverable should be:

> **`ANIMATION_SYSTEM.md v1.0`**

Its governing question should be:

> **How does this coherent visual world move, transform, remember position, and communicate transitions without becoming theatrical or obstructive?**

It should inherit the visual states and spatial logic defined here rather than redefine them.

---

# 73. Approval

`DESIGN_SYSTEM.md v1.0` is **Approved**.

It is now the source of truth for the shared static visual language of the Personal Platform.

Future district design, shared-component design, and frontend implementation must conform to this document unless a later explicit design-system revision supersedes it.

