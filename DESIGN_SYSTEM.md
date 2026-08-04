# Personal Platform — Design System

**Document:** `DESIGN_SYSTEM.md`  
**Domain owner:** Design System conversation  
**Phase:** Phase 3 — Design System  
**Document status:** Proposal  
**Version:** 0.1  
**Last updated:** 2026-08-04

---

## 1. Purpose

This document defines the shared visual language of the Personal Platform.

It governs:

- typography
- spacing
- layout grids
- color
- linework and borders
- iconography
- imagery treatment
- visual hierarchy
- cards
- buttons and links
- form controls
- motion
- accessibility
- responsive behavior
- controlled variation between districts

The design system must make the platform feel like one coherent architectural universe rather than a group of unrelated websites.

It should support a long-term ecosystem containing architecture, professional work, computational design, artificial intelligence, research, experiments, art, products, commerce, and future activities.

---

## 2. Authority and dependencies

### 2.1 Governing source

This document follows the project-wide principles established in `Project Instructions.txt`:

- timeless
- minimal
- architectural
- atmospheric
- exploratory
- cohesive
- structured before decorative
- system-led rather than page-led
- scalable over short-term convenience

### 2.2 Phase dependency

The project instructions establish the following sequence:

1. Platform Vision
2. Information Architecture
3. Design System
4. Universe Design
5. Category Homepages
6. Shared Components
7. Project Content
8. Optimization and Deployment

This design system may define shared visual rules now, but it must not invent or override unresolved decisions belonging to `PLATFORM_VISION.md` or `INFORMATION_ARCHITECTURE.md`.

### 2.3 Current decision status

Unless explicitly marked otherwise:

- project principles inherited from the Project Instructions are **Approved**
- concrete visual specifications in this version are **Proposal**
- district-specific identities are **Not yet defined**
- implementation is **Out of scope**

---

## 3. Design-system objective

The platform should feel like a quiet, precise, inhabited spatial system.

Its visual language should suggest:

- plans and sections
- measured construction lines
- spatial thresholds
- distant light
- layered depth
- calibrated proportion
- moments of emptiness
- controlled movement through space

It should not resemble:

- a conventional agency portfolio
- a generic technology dashboard
- a highly animated promotional website
- a collage of independent visual styles
- a game interface
- a literal science-fiction environment

The architectural-metaverse concept should be communicated through composition, rhythm, depth, navigation, and atmosphere—not through excessive visual effects.

---

## 4. Core visual grammar

### 4.1 The system is built from six visual primitives

1. **Field** — the background plane or spatial atmosphere.
2. **Line** — boundaries, routes, measurements, divisions, and connections.
3. **Plane** — cards, panels, image surfaces, and content zones.
4. **Void** — deliberate empty space that establishes scale and calm.
5. **Signal** — a controlled accent used to indicate state, focus, or district identity.
6. **Motion** — transitions that reveal spatial relationships rather than decorate them.

### 4.2 Composition principle

Every composition should balance:

- one dominant element
- one supporting structure
- one clear navigation path
- sufficient negative space

Pages should not distribute equal visual weight across all content.

### 4.3 Density principle

The default interface density is low to medium.

Dense information is permitted only where the content requires it, such as:

- project indexes
- research references
- product specifications
- archive views
- filtering systems

Even in dense areas, structure must come from alignment, grouping, and spacing rather than boxes around every item.

---

## 5. Typography

### 5.1 Typographic concept

Typography should feel precise, neutral, architectural, and editorial.

It must support:

- large spatial titles
- compact interface labels
- long-form research text
- project descriptions
- captions and metadata
- product information
- multilingual content

The system should use no more than two type families:

1. a primary sans-serif for display, reading, and interface text
2. a monospaced secondary family for technical metadata, coordinates, indexes, system states, and selected labels

Decorative display fonts are excluded from the shared system.

### 5.2 Typeface proposal

**Primary family — Proposal**  
Preferred direction: a restrained neo-grotesk or humanist-grotesk variable family with strong multilingual support.

Candidate hierarchy:

1. Suisse International, if licensing permits
2. IBM Plex Sans, as an open and technically expressive alternative
3. Helvetica Neue / Arial / system sans-serif as fallbacks

**Secondary family — Proposal**  
IBM Plex Mono.

The final primary family requires a separate approval after testing:

- Roman and italic quality
- French, Spanish, and English support
- variable-font performance
- readability at small sizes
- compatibility with the platform’s linework
- licensing and long-term availability

### 5.3 Typographic roles

| Role | Purpose | Proposed character |
|---|---|---|
| Display XL | Entrance statements and district identities | Monumental, sparse, controlled |
| Display L | Page titles and major project titles | Strong but not theatrical |
| Heading M | Section headings | Compact, structural |
| Heading S | Card and subsection titles | Clear, restrained |
| Body L | Introductions and editorial leads | Open, readable |
| Body M | Standard reading text | Neutral, comfortable |
| Body S | Supporting text and compact descriptions | Efficient but accessible |
| Label | Navigation, filters, controls | Short, precise |
| Caption | Image and object metadata | Quiet, secondary |
| Technical | Indexes, coordinates, dates, state labels | Monospaced, measured |

### 5.4 Proposed type scale

The scale should be fluid between breakpoints rather than changing abruptly.

| Token | Small viewport | Large viewport | Typical use |
|---|---:|---:|---|
| `type-10` | 11 px | 12 px | Technical metadata |
| `type-20` | 12 px | 13 px | Captions and labels |
| `type-30` | 14 px | 15 px | Secondary body text |
| `type-40` | 16 px | 18 px | Standard body text |
| `type-50` | 20 px | 24 px | Lead text / small heading |
| `type-60` | 26 px | 34 px | Section heading |
| `type-70` | 34 px | 52 px | Page heading |
| `type-80` | 48 px | 80 px | District or project display |
| `type-90` | 64 px | 128 px | Entrance-scale title |

The largest scale should be used selectively. Large type must create spatial hierarchy, not fill empty areas without purpose.

### 5.5 Line-height

| Text role | Proposed line-height |
|---|---:|
| Display | 0.88–1.02 |
| Headings | 1.05–1.18 |
| Lead text | 1.35–1.50 |
| Body text | 1.50–1.70 |
| Labels | 1.10–1.30 |
| Captions | 1.35–1.50 |

### 5.6 Letter spacing

- Large display text: slightly tightened.
- Standard headings: neutral to slightly tightened.
- Body text: neutral.
- Uppercase labels: moderately expanded.
- Monospaced metadata: neutral.

Uppercase should be reserved for labels, coordinates, classifications, and short navigation elements. Long uppercase text is prohibited.

### 5.7 Reading width

- Standard prose: 55–72 characters per line.
- Introductory prose: up to 80 characters per line when set large.
- Technical metadata: may be shorter.
- Long research text must never span the entire viewport width.

### 5.8 Typographic hierarchy rules

- A page should normally contain one primary `h1`.
- Heading levels must reflect information structure, not desired visual size.
- Do not use font weight alone to establish hierarchy.
- Combine scale, space, alignment, and position.
- Avoid more than three simultaneous font weights on one page.
- Default weights should remain regular or medium; bold is an exception.

---

## 6. Spacing system

### 6.1 Base unit

The proposed spacing system uses a 4 px micro-unit and an 8 px primary rhythm.

This allows precision for typography and controls while preserving an architectural baseline.

### 6.2 Spacing scale

| Token | Value | Typical use |
|---|---:|---|
| `space-0` | 0 | Intentional contact |
| `space-1` | 4 px | Micro-adjustment |
| `space-2` | 8 px | Tight internal spacing |
| `space-3` | 12 px | Compact label groups |
| `space-4` | 16 px | Default small gap |
| `space-5` | 24 px | Component padding |
| `space-6` | 32 px | Standard group separation |
| `space-7` | 48 px | Section sub-spacing |
| `space-8` | 64 px | Major component separation |
| `space-9` | 96 px | Section spacing |
| `space-10` | 128 px | Large spatial interval |
| `space-11` | 192 px | Entrance or chapter interval |
| `space-12` | 256 px | Exceptional cinematic interval |

### 6.3 Spacing principles

- Space communicates hierarchy before borders do.
- Internal spacing should be smaller than external spacing.
- Repeated content must follow a consistent rhythm.
- Large empty areas must frame a meaningful element or transition.
- Empty space should never obstruct basic usability or force unnecessary scrolling.

### 6.4 Section rhythm

Proposed defaults:

- compact section: `space-7` to `space-8`
- standard section: `space-9`
- major chapter transition: `space-10` to `space-11`
- entrance composition: up to `space-12`

These values should scale down fluidly on smaller viewports.

---

## 7. Grid and alignment

### 7.1 Grid concept

The platform should use a shared structural grid inspired by architectural drawing systems.

The grid must be visible through alignment but usually invisible as a graphic object.

Visible grid lines may appear selectively in:

- universe navigation
- index views
- technical project metadata
- transitional compositions
- experimental Lab interfaces

### 7.2 Proposed responsive grid

| Viewport range | Columns | Outer margin | Gutter |
|---|---:|---:|---:|
| Compact | 4 | 16–24 px | 12–16 px |
| Medium | 8 | 32–48 px | 20–24 px |
| Wide | 12 | 48–80 px | 24–32 px |
| Ultra-wide | 12 | fluid, max composition width | 32 px |

### 7.3 Composition width

- The system may use full-bleed atmospheric and visual zones.
- Reading content should remain constrained.
- Standard content should use a generous maximum composition width.
- Ultra-wide screens should gain margin and spatial depth, not stretched text.

**Proposed maximum structural width:** approximately 1600 px.

This is a composition boundary, not a mandatory container for every element.

### 7.4 Alignment rules

- Major page elements should align to the shared grid.
- Intentional misalignment is allowed only when it expresses threshold, movement, or district character.
- Misalignment must remain systematic, not accidental.
- Captions should align with either the visual edge or the content grid.
- Related metadata should share a vertical axis.

### 7.5 Vertical rhythm

Typography, controls, and content modules should align to an 8 px baseline wherever practical.

Absolute mathematical alignment may be adjusted optically when needed.

---

## 8. Color system

### 8.1 Color concept

The base platform should be predominantly neutral.

Color acts as:

- light
- atmosphere
- orientation
- state
- district signal

Color should not be used as decoration or to make every section appear different.

### 8.2 Core neutral palette — Proposal

| Token | Proposed value | Role |
|---|---|---|
| `void-1000` | `#0B0C0D` | Deep background |
| `void-900` | `#111315` | Primary dark surface |
| `graphite-800` | `#1B1E21` | Elevated dark plane |
| `graphite-700` | `#2B2F33` | Strong boundary / secondary plane |
| `graphite-500` | `#666C72` | Secondary text on light / muted detail |
| `fog-300` | `#BFC3C5` | Quiet text / disabled states |
| `fog-200` | `#D9DCDE` | Dividers on light surfaces |
| `fog-100` | `#ECEDEB` | Soft light surface |
| `paper-50` | `#F5F4EF` | Warm light background |
| `white-0` | `#FFFFFF` | Maximum contrast and light |

These values are provisional and require contrast testing in actual interface contexts.

### 8.3 Default theme direction

**Proposal:** The primary Home universe should use a dark spatial field with warm-white content and low-contrast graphite geometry.

The purpose is to evoke:

- architectural linework in darkness
- liminal spatial depth
- a quiet digital environment
- controlled emergence of content

Light surfaces may appear as rooms, documents, drawings, project plates, and product fields within the darker universe.

The platform should not be permanently dark in every district or content page.

### 8.4 District accent model

Each district may receive one controlled accent family, but the accent must remain subordinate to the core neutral system.

District accent colors should be:

- low to medium saturation
- materially or atmospherically grounded
- legible against both dark and light grounds
- used consistently for orientation and state

Possible uses:

- route highlight
- active district label
- selected filter
- focus surface
- local glow or atmospheric gradient
- project taxonomy

District accent colors must not redefine:

- typography
- spacing
- component anatomy
- interaction conventions
- accessibility behavior

Exact district colors belong to the Universe Design phase and are therefore **Not yet defined**.

### 8.5 Functional color

Functional states must remain consistent across all districts.

Required semantic categories:

- information
- success
- warning
- error
- disabled
- focus

Functional color must never rely on hue alone. It should be paired with text, iconography, shape, or pattern.

### 8.6 Gradients and glow

Permitted only when they communicate:

- depth
- light falloff
- district atmosphere
- spatial transition
- focus

Prohibited:

- multicolor promotional gradients
- decorative neon effects
- persistent glow around all interactive elements
- gradients that reduce text contrast

---

## 9. Linework, borders, radius, and depth

### 9.1 Linework

Linework is a primary identity element.

Proposed line hierarchy:

| Line type | Weight | Use |
|---|---:|---|
| Hairline | 1 px | Grid, measurement, separators |
| Standard | 1–1.5 px | Controls and card boundaries |
| Emphasis | 2 px | Focus, active route, key diagram |
| Structural | 3 px maximum | Rare, high-priority boundary |

Lines should usually be low contrast until active or focused.

### 9.2 Border use

Borders should clarify structure, not surround every object.

Prefer:

- one edge rather than four
- shared dividers rather than separate boxes
- contrast and spacing before outlines
- active lines that respond to interaction

### 9.3 Corner radius

The shared system should remain predominantly rectilinear.

**Proposed radius scale:**

- `radius-0`: 0 px — architectural panels and imagery
- `radius-1`: 2 px — subtle control refinement
- `radius-2`: 6 px — compact controls and accessible touch elements
- `radius-round`: fully circular — status dots, avatar-like media, isolated controls

Large soft rounded cards are not part of the core language.

### 9.4 Shadow and depth

Depth should be created primarily through:

- overlap
- tonal difference
- scale
- blur of atmospheric layers
- movement
- light falloff

Drop shadows should be rare and soft.

No component should depend on a strong shadow to remain legible.

---

## 10. Iconography

### 10.1 Icon style

Icons should be:

- line-based
- geometric
- minimal
- optically balanced
- consistent in stroke weight
- readable at small sizes

The icon set should feel related to architectural symbols without becoming obscure.

### 10.2 Proposed icon grid

- Default icon frame: 24 × 24 px
- Compact icon frame: 16 × 16 px
- Standard stroke: approximately 1.5 px
- Rounded or square terminals must be consistent across the set

### 10.3 Icon usage

Icons should support recognition but not replace essential labels when ambiguity is possible.

Text labels are required for:

- unfamiliar actions
- district navigation
- destructive actions
- accessibility-critical controls

### 10.4 Custom symbols

A small custom symbol family may be developed for:

- districts
- project types
- research states
- experiments
- products
- spatial navigation

Custom symbols must share one construction logic and should be tested without accompanying text before being approved.

### 10.5 Prohibited icon behavior

- mixed filled and outlined icon sets without a state reason
- emoji as interface icons
- arbitrary 3D icons
- decorative icons with no functional or semantic purpose

---

## 11. Imagery and visual media

### 11.1 Media principle

The platform may contain highly varied media, but the framing system must unify it.

Possible media include:

- architectural drawings
- diagrams
- photographs
- renders
- video
- software interfaces
- experiments
- artworks
- objects and products
- research figures

### 11.2 Shared media treatment

All media should use consistent rules for:

- edge alignment
- caption placement
- metadata
- aspect-ratio behavior
- loading states
- full-screen viewing
- accessibility descriptions

### 11.3 Image framing

Default image presentation should be borderless or hairline-framed.

Use visible frames when:

- the media itself is light against a light field
- the item is treated as a document or plate
- comparison requires equal boundaries
- the frame carries technical metadata

### 11.4 Cropping

- Architectural drawings: preserve full composition unless a detail crop is explicitly identified.
- Artworks: avoid destructive cropping.
- Project photographs: editorial crops are permitted when the uncropped original remains accessible.
- Product imagery: maintain consistent object scale within a product set.

### 11.5 Captions

Captions should be concise and informative.

Suggested sequence:

1. media title or figure number
2. descriptive caption
3. year, medium, role, or credit where relevant

Credits should never be hidden solely in hover states.

---

## 12. Visual hierarchy

### 12.1 Hierarchy order

A standard page should establish hierarchy in this order:

1. location within the universe
2. page or object identity
3. primary visual or proposition
4. supporting narrative
5. actions and navigation
6. metadata

### 12.2 One dominant gesture

Each page or major section should have one dominant visual gesture, such as:

- a large title
- a single project image
- a spatial diagram
- a route through the universe
- a field of objects
- a research proposition

Multiple dominant gestures on the same viewport should be avoided.

### 12.3 Emphasis methods

Use, in order of preference:

1. position
2. scale
3. negative space
4. contrast
5. weight
6. color
7. motion

Do not use all methods simultaneously.

---

## 13. Cards and content modules

### 13.1 Card concept

Cards should behave like architectural plates, fragments, portals, or indexed objects rather than generic rounded containers.

### 13.2 Shared card anatomy

A card may contain:

- media or spatial preview
- category or district label
- title
- short description
- metadata
- status
- optional action or route cue

Not every card needs every element.

### 13.3 Card types

#### A. Portal card

Purpose: enter a district or major collection.

Character:

- large scale
- strong atmosphere
- minimal text
- clear route cue

#### B. Project card

Purpose: preview a project.

Character:

- media-led
- title and essential metadata
- optional short description

#### C. Index card

Purpose: support scanning and filtering.

Character:

- compact
- highly aligned
- often list-based rather than boxed

#### D. Research card

Purpose: present a paper, question, note, or investigation.

Character:

- text-led
- visible status and date
- references or themes

#### E. Product card

Purpose: present an item with commercial information.

Character:

- object-led
- clear title, price/state, and action
- commerce behavior must remain accessible and conventional

### 13.4 Card interaction

On hover or focus, cards may use:

- line activation
- slight tonal lift
- controlled media movement
- route indicator movement
- metadata reveal when nonessential

Cards must not:

- jump dramatically in scale
- depend on hover for essential information
- use unrelated animation styles in different districts

---

## 14. Buttons, links, and controls

### 14.1 Interaction hierarchy

The platform should use three main action levels:

1. primary action
2. secondary action
3. text or route action

### 14.2 Primary button

Use for the single most important action in a local context.

Proposed treatment:

- solid high-contrast plane or strongly outlined state
- concise label
- minimum 44 px touch height
- visible focus state
- no more than one primary action per component group

### 14.3 Secondary button

Use for supporting actions.

Proposed treatment:

- transparent or low-contrast plane
- hairline boundary
- same height and typography as primary

### 14.4 Text and route action

Use for navigation, exploration, and lower-priority actions.

Proposed treatment:

- text label
- directional line, arrow, coordinate, or index cue
- underline or line activation on hover/focus

### 14.5 Link behavior

- Inline links must be distinguishable without relying solely on color.
- External links should be identifiable when the distinction matters.
- Visited-state behavior should be considered for research and archive contexts.
- Project navigation should use consistent previous/next conventions.

### 14.6 Control states

Every interactive element requires:

- default
- hover, where applicable
- focus-visible
- active/pressed
- selected, where applicable
- disabled
- loading, where applicable
- error, where applicable

### 14.7 Destructive actions

Destructive actions must:

- use explicit language
- be visually distinct
- require confirmation when consequences are significant
- never be represented only by an unlabeled icon

---

## 15. Forms and input fields

### 15.1 Form principle

Forms should be calm, conventional, and easy to complete.

Atmosphere must never reduce form clarity.

### 15.2 Input anatomy

Each field should provide:

- persistent label
- input area
- optional guidance
- visible focus state
- error message when needed

Placeholder text must not replace the label.

### 15.3 Field treatment

Proposed direction:

- rectilinear or minimally rounded
- clear lower or full boundary
- quiet default state
- stronger active line
- sufficient internal height and padding

### 15.4 Validation

Validation should occur at useful moments, not continuously while the user is still composing input.

Errors should explain:

- what happened
- where it happened
- how to correct it

---

## 16. Navigation language

### 16.1 Navigation principle

Navigation should combine clarity with a sense of spatial movement.

Visitors should always understand:

- where they are
- what district they are in
- how to return to the shared universe
- what related spaces are available

### 16.2 Shared navigation elements

The system should support:

- global universe navigation
- district navigation
- local page navigation
- breadcrumbs or spatial path indicators where useful
- previous/next project movement
- search and filtering

### 16.3 Spatial cues

Permitted cues include:

- coordinates
- route lines
- thresholds
- section markers
- district symbols
- depth transitions

These cues must support navigation rather than obscure it.

### 16.4 Navigation accessibility

- Keyboard focus order must follow the visual and semantic route.
- Mobile navigation must not hide critical destinations behind gestures alone.
- Current location must be conveyed through more than color.
- Global navigation should remain recoverable from every page.

---

## 17. Motion principles

### 17.1 Motion concept

Motion should express:

- entering and leaving spaces
- revealing layers
- changing depth
- following routes
- connecting related states

Motion should not exist only to attract attention.

### 17.2 Motion qualities

The default motion character is:

- calm
- precise
- continuous
- restrained
- spatially intelligible

### 17.3 Proposed duration scale

| Token | Duration | Use |
|---|---:|---|
| `motion-instant` | 80–120 ms | Pressed and micro-feedback |
| `motion-fast` | 160–220 ms | Hover and control transitions |
| `motion-standard` | 280–420 ms | Component state changes |
| `motion-spatial` | 500–800 ms | Page and district transitions |
| `motion-atmospheric` | 900–1600 ms | Rare ambient reveal |

### 17.4 Easing

Proposed easing families:

- direct response: fast ease-out
- spatial transition: smooth ease-in-out
- reveal: gentle deceleration

Spring motion should be rare and heavily damped.

### 17.5 Motion limits

- Do not animate every visible element independently.
- Do not delay access to content for cinematic introductions.
- Do not move essential controls away from the pointer.
- Avoid constant ambient movement behind reading content.
- Avoid parallax that disrupts spatial orientation or causes discomfort.

### 17.6 Reduced motion

The complete experience must remain coherent with reduced motion enabled.

Reduced-motion behavior should:

- remove parallax
- replace spatial travel with opacity or immediate state changes
- stop nonessential ambient loops
- preserve navigation clarity

---

## 18. Accessibility

### 18.1 Standard

The design system should target WCAG 2.2 AA as the minimum standard.

This requirement applies to all districts, including experimental and artistic areas.

### 18.2 Contrast

- Normal text should meet at least 4.5:1 contrast.
- Large text should meet at least 3:1 contrast.
- Interactive boundaries and essential graphical objects should meet at least 3:1 where applicable.
- Low-contrast atmospheric lines must not carry essential information.

### 18.3 Keyboard access

All interactive functions must be operable by keyboard.

Focus must be:

- visible
- high contrast
- consistent
- not clipped
- ordered logically

### 18.4 Touch targets

Interactive targets should generally be at least 44 × 44 px, even when the visible icon or label is smaller.

### 18.5 Text and zoom

- Content must remain usable at 200% zoom.
- Essential content must not be lost through clipping.
- Text should reflow without requiring two-dimensional scrolling, except for necessary visual material such as large diagrams.

### 18.6 Color and state

Color cannot be the sole carrier of meaning.

Selected, active, warning, and error states should also use:

- text
- icon
- boundary
- pattern
- position

### 18.7 Media accessibility

- Informative images require meaningful alternative text.
- Decorative geometry should be excluded from assistive reading.
- Complex diagrams require concise summaries and, where needed, extended descriptions.
- Video requires captions.
- Audio-led work requires transcripts or equivalent textual access.

### 18.8 Cognitive accessibility

The interface should avoid:

- unnecessary choices
- unexpected navigation changes
- ambiguous icon-only actions
- excessive simultaneous motion
- long unbroken text blocks
- hidden essential information

The exploratory character must remain optional. Direct paths to content should always exist.

---

## 19. Responsive behavior

### 19.1 Responsive principle

Responsive design should preserve the hierarchy and spatial intent of each composition rather than merely shrink it.

### 19.2 Compact screens

On compact screens:

- reduce the number of simultaneous spatial layers
- prioritize vertical flow
- keep the main route visible
- simplify decorative linework
- convert multi-column compositions to ordered sequences
- maintain generous but not excessive margins
- protect body-text readability

### 19.3 Medium screens

Medium screens should preserve selected asymmetry while moving secondary information into lower or collapsible zones where necessary.

### 19.4 Wide screens

Wide screens may use:

- larger voids
- stronger asymmetry
- layered panels
- persistent secondary navigation
- extended linework
- simultaneous overview and detail

Wide layouts must not stretch all content to the viewport edges.

### 19.5 Reordering

Content order may change visually, but semantic and reading order must remain logical.

### 19.6 Hover dependence

No essential interaction or content may depend on hover because touch devices and keyboard users may not have it.

### 19.7 Responsive media

- Images should preserve intentional focal points.
- Diagrams may use dedicated scroll, zoom, or full-screen modes.
- Captions should remain attached to their media.
- Video controls must remain reachable at all sizes.

---

## 20. District variation framework

### 20.1 Purpose

Each district should feel distinct while remaining recognizably part of the same platform.

Variation should happen through atmosphere, composition, and local emphasis—not by replacing the shared system.

### 20.2 Fixed across all districts

The following should remain shared:

- primary type system
- spacing scale
- grid logic
- accessibility rules
- control anatomy
- interaction-state conventions
- navigation recovery
- linework family
- motion principles
- metadata logic

### 20.3 Variable by district

The following may vary within controlled limits:

- accent color
- background atmosphere
- image prominence
- density
- local layout rhythm
- motion amplitude
- custom district symbol
- linework pattern
- degree of technical or editorial expression

### 20.4 District identity formula

Each district should eventually define:

1. one atmospheric statement
2. one accent family
3. one spatial composition rule
4. one media behavior
5. one motion emphasis
6. one custom symbol

No district should introduce more than these six identity variables without explicit approval.

### 20.5 District approval dependency

District-specific decisions belong to the Universe Design and Category Homepage phases.

The Design System defines the boundaries within which those identities may develop.

---

## 21. Search, filtering, and data-dense interfaces

### 21.1 Principle

Utility interfaces should remain more conventional than atmospheric entrance experiences.

Search, filtering, commerce, archives, and research indexes should prioritize speed, clarity, and comparison.

### 21.2 Filter design

- Active filters must be visible.
- Removing all filters must be simple.
- Result counts should update clearly.
- Filter controls should not rely on custom gestures.
- Mobile filters may use a dedicated panel but must preserve state.

### 21.3 Tables and comparisons

When tables are necessary:

- align text and numbers consistently
- use light separators
- maintain row and column association
- support horizontal scrolling only when unavoidable
- preserve headers during long comparisons where useful

---

## 22. Commerce-specific visual rules

Products belongs to the same universe but must preserve familiar commerce behavior.

The design system must support:

- price clarity
- availability state
- variant selection
- quantity
- cart actions
- delivery information
- returns information
- checkout trust

Atmospheric design must not obscure transaction information.

Primary purchase actions may use stronger visual emphasis than actions elsewhere in the platform.

---

## 23. Content-status language

The platform may include work at different levels of completion.

A consistent status system should distinguish, where relevant:

- Concept
- In progress
- Ongoing
- Completed
- Archived
- Available
- Sold out
- Experimental
- Published

Status language should remain plain and understandable.

Project-management statuses such as Proposal, Approved, Implemented, and Verified belong to internal documentation and should not automatically appear in the public interface.

---

## 24. Design anti-patterns

The following are prohibited unless explicitly justified and approved:

- excessive glassmorphism
- large rounded cards throughout the interface
- bright neon palettes as the default identity
- decorative 3D objects unrelated to content
- constant cursor effects
- unreadably small typography
- low-contrast body text
- animation that delays access
- hidden navigation with no persistent recovery
- every district using a different font
- every project using a different card structure
- content visible only on hover
- icon-only critical actions
- full-screen effects that ignore reduced-motion preferences
- visual complexity presented as exploration

---

## 25. Quality-control checklist

A design-system application should be reviewed against the following questions.

### Coherence

- Does this clearly belong to the same universe?
- Does it use the shared grid, typography, and spacing?
- Is district variation controlled rather than arbitrary?

### Hierarchy

- Is the dominant element immediately clear?
- Can the user understand location and route?
- Is supporting information visibly secondary?

### Restraint

- Does every visual element have a purpose?
- Could any line, effect, label, or animation be removed?
- Is empty space supporting the composition?

### Accessibility

- Does contrast meet the required threshold?
- Is keyboard focus visible?
- Is essential content available without hover or motion?
- Does the page work at zoom and on compact screens?

### Scalability

- Can the pattern support many projects and future districts?
- Is the component reusable without becoming generic?
- Does the pattern work with different media types?

---

## 26. Proposed design tokens

This section summarizes the system at token level without prescribing implementation syntax.

### Typography

- `font-primary`
- `font-mono`
- `type-10` through `type-90`
- `leading-display`
- `leading-heading`
- `leading-body`
- `tracking-display`
- `tracking-label`

### Spacing

- `space-0` through `space-12`

### Grid

- `grid-compact-4`
- `grid-medium-8`
- `grid-wide-12`
- `gutter-compact`
- `gutter-medium`
- `gutter-wide`
- `margin-compact`
- `margin-medium`
- `margin-wide`

### Color

- `void-1000`
- `void-900`
- `graphite-800`
- `graphite-700`
- `graphite-500`
- `fog-300`
- `fog-200`
- `fog-100`
- `paper-50`
- `white-0`
- `district-accent`
- `state-info`
- `state-success`
- `state-warning`
- `state-error`
- `state-focus`

### Geometry

- `line-hairline`
- `line-standard`
- `line-emphasis`
- `radius-0`
- `radius-1`
- `radius-2`
- `radius-round`

### Motion

- `motion-instant`
- `motion-fast`
- `motion-standard`
- `motion-spatial`
- `motion-atmospheric`
- `ease-response`
- `ease-spatial`
- `ease-reveal`

---

## 27. Decision register

| ID | Decision | Status | Notes |
|---|---|---|---|
| DS-001 | Use one coherent design system across all districts | Approved | Inherited from Project Instructions |
| DS-002 | Base visual language on architectural linework, proportion, grids, space, and atmosphere | Approved | Inherited from Project Instructions |
| DS-003 | Use a primarily neutral shared palette | Proposal | Requires visual testing |
| DS-004 | Use a dark spatial Home universe with warm-white content | Proposal | Must be coordinated with Universe Design |
| DS-005 | Limit shared typography to one sans-serif and one monospaced family | Proposal | Final families require approval |
| DS-006 | Use a 4 px micro-unit and 8 px main spacing rhythm | Proposal | Requires component testing |
| DS-007 | Use 4-, 8-, and 12-column responsive grids | Proposal | Must align with Information Architecture |
| DS-008 | Keep component geometry predominantly rectilinear | Proposal | Supports architectural character |
| DS-009 | Use district accents without changing shared component anatomy | Proposal | Exact accents deferred |
| DS-010 | Target WCAG 2.2 AA across all districts | Proposal | Recommended minimum standard |
| DS-011 | Use motion to communicate spatial relationships, not decoration | Proposal | Requires motion prototypes |
| DS-012 | Preserve conventional usability for search, forms, and commerce | Proposal | Prevents atmosphere from reducing clarity |

---

## 28. Open decisions

The following require explicit resolution before this document can become Approved:

1. Is `PLATFORM_VISION.md` approved, and does it add any visual identity constraints?
2. Is `INFORMATION_ARCHITECTURE.md` approved, and what navigation structures must the design system support?
3. Which primary typeface will be selected after licensing and legibility tests?
4. Is the dark spatial Home universe the approved default entrance theme?
5. Should the public platform provide a user-selectable light/dark appearance, or should appearance be authored per district?
6. What maximum content width best fits the approved information architecture?
7. What are the exact district accent families?
8. How visible should the architectural grid and linework be in ordinary content pages?
9. What degree of spatial transition is appropriate before it begins to obstruct navigation?
10. Which components belong to the first shared-component library?

---

## 29. Required validation artifacts

Before approval, the system should be tested through a small set of visual studies rather than full page implementation.

Recommended studies:

1. typography specimen
2. neutral palette and contrast sheet
3. spacing and grid specimen
4. button and link state sheet
5. card family comparison
6. navigation hierarchy study
7. dark and light media framing study
8. motion storyboard
9. compact, medium, and wide responsive composition
10. accessibility review

These studies belong to design validation. They should not expand into full category homepage design before Phase 3 is approved.

---

## 30. Approval condition

`DESIGN_SYSTEM.md` can move from **Proposal** to **Approved** when:

- Platform Vision and Information Architecture dependencies are confirmed
- the primary typeface is selected
- the neutral palette passes contrast testing
- the spacing and grid system are validated across representative layouts
- shared interaction states are defined
- responsive rules are tested
- accessibility requirements are accepted
- district variation boundaries are accepted

Until then, this document is the structured baseline for discussion and visual testing, not an implementation specification.
