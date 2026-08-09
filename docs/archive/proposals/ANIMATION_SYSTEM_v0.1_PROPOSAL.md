# Personal Platform — Animation System

**Document:** `ANIMATION_SYSTEM.md`  
**Domain owner:** Motion & Animation  
**Status:** Proposal  
**Depends on:** `PLATFORM_VISION.md`, `INFORMATION_ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, and the individual universe documents  
**Implementation owner:** Claude Code after approval

---

# 1. Purpose

The animation system defines how the Personal Platform moves.

Motion is not applied as decoration, spectacle, or interface polish added after the design. It is part of the platform’s architectural language. It communicates spatial relationships, hierarchy, orientation, material behavior, and transitions between districts.

The visitor should not feel that pages are being replaced. They should feel that they are moving through one continuous designed environment.

The system must remain:

- calm
- legible
- restrained
- spatially coherent
- responsive to user intent
- accessible
- scalable across future districts

Every animation must answer at least one functional or narrative question:

1. Where did the visitor come from?
2. Where are they going?
3. What changed?
4. What can be interacted with?
5. What is foreground and what is background?
6. How are two spaces related?

If an animation answers none of these questions, it should not exist.

---

# 2. Core Motion Concept

## 2.1 The platform as a continuous spatial model

The platform is treated as a single architectural world rather than a collection of disconnected screens.

Navigation is therefore expressed through spatial transformations such as:

- entering
- approaching
- crossing
- revealing
- opening
- withdrawing
- ascending
- descending
- shifting viewpoint
- moving between foreground and depth

The interface should avoid transitions that feel like generic app behavior, including arbitrary bouncing, spinning, card flipping, elastic overshoot, or exaggerated zooming.

## 2.2 Motion as architectural narration

Motion should behave like an architectural sequence:

**threshold → passage → arrival → orientation → inhabitation**

A visitor first recognizes that a transition has begun, moves through a controlled intermediate state, arrives in the new environment, and receives enough visual stability to understand it.

## 2.3 Controlled continuity

Continuity does not require every page to animate heavily. In many situations, the strongest architectural choice is a nearly static transition with one precise spatial cue.

The platform should alternate between:

- **movement**, which communicates change
- **stillness**, which establishes presence

Stillness is a deliberate component of the motion language.

---

# 3. Motion Principles

## 3.1 Spatial before decorative

Prefer movement that explains spatial structure over movement that merely attracts attention.

**Use:** a navigation line extending toward a selected district.  
**Avoid:** an icon shaking to appear interactive.

## 3.2 One dominant movement at a time

Each interaction should have one clear motion hierarchy.

A transition may include several coordinated properties, but the visitor should perceive one primary action: a reveal, translation, focus shift, or change of depth.

## 3.3 Motion follows hierarchy

More important structural changes receive greater duration and spatial consequence.

- micro-feedback is immediate
- component changes are brief
- page changes are measured
- district transitions are the most spatially developed

## 3.4 Motion preserves orientation

Elements should move from plausible origins toward plausible destinations.

Persistent interface elements should remain stable whenever possible. Shared objects may transform between states rather than disappear and reappear without explanation.

## 3.5 Restraint over performance

The platform should never force the visitor to wait for animation to finish before accessing content.

Animation should support navigation speed, not reduce it.

## 3.6 User input has priority

Scrolling, pointer movement, keyboard input, route changes, and cancellation must override nonessential animation.

The system should not fight the visitor’s momentum or trap them inside a scripted sequence.

## 3.7 Repetition creates identity

A small vocabulary of repeated motion patterns should establish recognition across the platform.

The system should not invent a new transition for every page.

## 3.8 Variation occurs within shared rules

Each district may develop its own tempo, environmental behavior, and spatial emphasis, but all districts must use the same foundational motion grammar.

---

# 4. Motion Vocabulary

The platform should use a limited set of architectural motion verbs.

## 4.1 Reveal

Content becomes visible through masking, clipping, opacity, line extension, or controlled exposure.

Use for:

- section introductions
- headings
- images entering the viewport
- diagrams
- navigation labels

Reveals should feel like uncovering a drawing, opening a view, or passing a threshold.

## 4.2 Translate

An object moves along a clear horizontal, vertical, or depth axis.

Use for:

- page transitions
- panels
- navigation layers
- spatial sequences
- related content

Translation must imply a relationship. Avoid movement in arbitrary directions.

## 4.3 Focus

The visual field reorganizes around an element through scale, contrast, blur, depth, or surrounding reduction.

Use for:

- selected projects
- active districts
- image inspection
- modal states
- search or command interfaces

Focus should not rely solely on zoom. It can also be achieved by quieting the surrounding environment.

## 4.4 Extend

Lines, grids, paths, and boundaries grow from an origin.

Use for:

- navigation paths
- diagram construction
- active states
- section boundaries
- progress indication

Line animation should resemble drafting or spatial measurement, not handwriting unless a specific district explicitly requires it.

## 4.5 Assemble

Related fragments enter in a controlled sequence and form a coherent composition.

Use for:

- first arrival in a district
- complex diagrams
- project index layouts
- layered research structures

Assembly should be rare and reserved for meaningful structural introductions.

## 4.6 Dissolve

An element loses presence through opacity, contrast, or atmospheric diffusion.

Use for:

- background transitions
- retiring secondary information
- environmental layers
- shifts between distant spatial states

Avoid using simple crossfades as the default for all navigation.

## 4.7 Settle

Movement concludes through controlled deceleration without bounce.

Use for nearly all transitions. The final state should feel positioned, aligned, and stable.

---

# 5. Spatial Axes

Movement should follow a consistent spatial logic.

## 5.1 Horizontal axis — lateral movement through the universe

Horizontal motion represents movement between parallel areas or neighboring spaces.

Typical uses:

- moving between sibling pages
- browsing projects within a district
- moving between adjacent districts in an index
- revealing secondary navigation

## 5.2 Vertical axis — progression through a document or section

Vertical motion represents sequence, descent into detail, or return toward overview.

Typical uses:

- scrolling through a page
- entering project detail from an index
- opening deeper information
- returning to a parent level

Vertical direction must remain consistent within each navigation relationship.

## 5.3 Depth axis — hierarchy and spatial entry

Depth is represented through restrained scale, parallax, focus, contrast, and layer separation.

Typical uses:

- entering a district from Home
- opening a project
- focusing on media
- moving between overview and detail

Depth effects should remain subtle enough to avoid simulation sickness and visual instability.

## 5.4 Fixed plane — orientation layer

Persistent navigation, wayfinding, accessibility controls, and system status belong to a stable reference plane.

These elements should move minimally so that the visitor always retains an orientation anchor.

---

# 6. Timing System

## 6.1 Timing categories

| Category | Suggested duration | Purpose |
|---|---:|---|
| Immediate feedback | 80–140 ms | Confirm input, press, toggle, selection |
| Micro transition | 140–220 ms | Hover, focus, small component change |
| Component transition | 220–360 ms | Panel, card, filter, local layout change |
| Page transition | 360–600 ms | Movement within a district |
| District transition | 600–900 ms | Movement between major architectural environments |
| Environmental cycle | 6–30 s | Ambient motion that should not demand attention |

These ranges are system constraints, not fixed values. Exact timing should be tuned after prototype testing.

## 6.2 Duration principles

- Travel distance and visual consequence should influence duration.
- Incoming content may settle slightly after outgoing content begins to withdraw.
- Repeated actions should become faster than first-entry sequences.
- No standard interaction should require more than 900 ms before content becomes usable.
- Ambient loops must not create obvious repetitive beats.

## 6.3 Easing language

The primary easing character should be controlled deceleration.

### Standard entry

Fast initial response followed by a smooth, precise arrival.

Use for:

- content reveals
- page arrival
- hover emphasis
- navigation indicators

### Standard exit

A slightly faster curve than entry so that the interface remains responsive.

Use for:

- closing panels
- leaving pages
- dismissing information

### Continuous spatial movement

A balanced curve with no sudden acceleration.

Use for:

- camera translations
- shared-element transformations
- long line movement

### Prohibited default behaviors

- bounce
- spring overshoot
- rubber-band effects
- playful wobble
- abrupt linear movement
- exaggerated acceleration

Spring physics may only be considered for a specific functional simulation inside the Lab district and should not become part of global navigation.

---

# 7. Page Transitions

## 7.1 Transition hierarchy

The system distinguishes four navigation scales:

1. state change within a component
2. movement within a page
3. movement between pages in one district
4. movement between districts

Each scale should have a different spatial consequence.

## 7.2 Same-page transitions

Examples include filters, tabs, expandable information, and media changes.

Behavior:

- preserve the surrounding composition
- animate only the changed region
- use short durations
- avoid resetting scroll position
- maintain keyboard focus

## 7.3 Page-to-page transitions within a district

Pages inside the same district should feel architecturally related.

Recommended structure:

1. the selected origin remains visible briefly
2. the surrounding layout withdraws or shifts
3. shared district geometry persists
4. new content enters from the corresponding spatial direction
5. navigation settles into the new state

The transition should retain district identity through persistent background, grid, line, tonal, or navigational elements.

## 7.4 District transitions

Moving between Home, Work, Research, Lab, Art, Products, and About is a major spatial event.

Recommended structure:

1. **Selection:** the chosen district receives focus.
2. **Alignment:** surrounding elements reorganize around the route.
3. **Threshold:** the current environment reduces in contrast or passes behind a boundary.
4. **Passage:** a short spatial translation communicates distance or change of atmosphere.
5. **Arrival:** the new district’s defining geometry or environmental behavior appears first.
6. **Orientation:** title, district navigation, and first actionable content become stable.

The passage must remain concise. It should imply a larger world without becoming a cinematic loading sequence.

## 7.5 Back navigation

Back navigation should reverse spatial logic rather than replay every animation literally.

The visitor should perceive a return toward the previous level:

- detail returns to index
- district returns to Home
- focused media returns to composition

Back transitions should generally be faster than first entry.

## 7.6 Direct entry and deep links

Visitors may arrive directly on any page.

Every page must therefore support a reduced arrival sequence that establishes:

- district identity
- current location
- available navigation
- initial content hierarchy

The system must not assume that every visitor entered through Home.

## 7.7 Loading and transition failure

Content must not remain hidden while waiting for a nonessential animation or heavy asset.

When assets load slowly:

- structural layout appears first
- placeholders preserve dimensions
- animation degrades to a simple reveal
- navigation remains usable

---

# 8. Camera Movement

## 8.1 Meaning of the camera

The “camera” is the visitor’s implied viewpoint within the architectural world. It does not require literal three-dimensional rendering.

Camera movement may be constructed through:

- coordinated translation
- subtle scale shifts
- cropping changes
- parallax between layers
- focus transitions
- controlled perspective

## 8.2 Camera rules

- Movement must be slow enough to read but fast enough to remain navigational.
- Camera rotation should be avoided in the global interface.
- Perspective shifts should remain shallow.
- Scale changes should be limited and tied to hierarchy.
- The horizon or primary composition should remain stable.
- Pointer movement should not directly control large camera movements.

## 8.3 Entry movement

Entering a deeper level may use a restrained forward movement:

- selected content expands slightly
- surrounding content moves outward or loses contrast
- the destination resolves into detail

Recommended perceived scale change: approximately 1.00 to 1.04–1.08, subject to testing.

## 8.4 Exit movement

Returning to an overview may use a restrained withdrawal:

- detail contracts toward its position in the parent layout
- contextual elements return
- overview geometry regains emphasis

## 8.5 Parallax

Parallax may establish depth between environmental, structural, and content layers.

Rules:

- use only a few layers
- maintain very small displacement differences
- disable or reduce on touch devices
- disable under reduced-motion preferences
- never allow text to drift independently enough to harm reading

## 8.6 Scroll-linked camera movement

Scroll may guide viewpoint progression through long spatial narratives, especially in Home and selected district introductions.

It must not:

- hijack native scrolling
- lock the visitor into long sequences
- force exact scroll positions
- produce large scale or rotation changes
- make content inaccessible without animation

---

# 9. Hover Behavior

## 9.1 Purpose

Hover communicates possibility, relationship, and depth. It should not create a separate visual spectacle.

## 9.2 Standard hover response

A hover response may combine no more than two principal changes:

- line extension
- contrast increase
- small translation
- slight scale change
- background or boundary reveal
- image crop adjustment
- label appearance

## 9.3 Recommended limits

- translation: approximately 2–8 px
- scale: approximately 1.00–1.02
- duration: 140–220 ms
- no bounce or overshoot

These values are proposals pending prototype validation.

## 9.4 Navigation hover

District and page navigation should reveal spatial direction.

Possible behavior:

- a route line extends from the current position
- the target label gains contrast
- a minimal preview of its environment appears
- neighboring options recede slightly

The selected destination must remain clear without causing the rest of the interface to become unreadable.

## 9.5 Project and content hover

Project hover may reveal:

- project metadata
- an alternate crop
- a boundary or frame
- relationship to a category
- a directional affordance

Essential information must not exist only on hover.

## 9.6 Touch and keyboard equivalence

Hover behavior must have equivalent focus and touch states.

Keyboard focus should use the same conceptual emphasis while remaining visually unmistakable. Touch devices should receive a stable selected state or direct navigation, not hover simulation that requires an extra unexplained tap.

---

# 10. Scrolling

## 10.1 Native behavior first

The platform should preserve predictable browser scrolling.

Smooth scrolling may be used for internal anchors when it does not conflict with user preferences, but custom inertial scroll engines should not be part of the default system.

## 10.2 Scrolling as spatial progression

Long pages should be composed as sequences of architectural rooms, frames, or fields rather than undifferentiated vertical feeds.

Motion may mark:

- entry into a new section
- transition between scales
- appearance of structural lines
- change in environmental tone
- relationship between text and visual material

## 10.3 Scroll reveals

Scroll-triggered content should:

- appear only once unless repetition has meaning
- begin before the content reaches the center of the viewport
- remain readable if JavaScript fails
- avoid animating every paragraph independently
- group related elements into one composition

## 10.4 Sticky elements

Sticky positioning may act as an architectural anchor.

Use for:

- district title or index
- project metadata
- diagram legend
- chapter navigation
- persistent visual reference

Sticky behavior should release clearly at the end of its section. Excessive simultaneous sticky layers are prohibited.

## 10.5 Scroll progress

Progress indicators should resemble spatial measurement, path tracing, or section indexing rather than generic percentage bars.

They should remain secondary and should not create pressure to complete the page.

## 10.6 Horizontal scrolling

Horizontal scrolling should be used only when the content conceptually forms a lateral sequence, gallery, timeline, or plan-like field.

It must:

- be clearly signaled
- support wheel, trackpad, touch, and keyboard input
- avoid trapping vertical page movement
- provide an alternative on small screens when necessary

---

# 11. Environmental Animation

## 11.1 Purpose

Environmental animation gives each district a sense of atmosphere and latent life without competing with content.

It may suggest:

- changing light
- distant spatial activity
- slow line construction
- data flow
- material diffusion
- suspended particles
- shifting fields
- subtle changes of depth

## 11.2 Environmental hierarchy

Environmental motion remains behind content and interaction.

It should use:

- low contrast
- slow speed
- irregular cycles
- limited area
- minimal amplitude

## 11.3 Loop design

Ambient animation should not reveal an obvious restart.

Recommended cycle lengths: 6–30 seconds, with variation between parallel elements.

Avoid constant movement across the entire viewport. Some areas should remain still.

## 11.4 District variation

The following are initial proposals and must be reconciled with each universe document.

### Home

Motion represents orientation, distant districts, thresholds, and the latent geometry of the complete world.

Possible behaviors:

- slow line emergence
- faint depth drift
- changing spatial emphasis around available routes
- distant environmental signals from districts

### Work

Motion is measured, constructive, and precise.

Possible behaviors:

- alignment
- framing
- drawing assembly
- technical layer reveals

### Research

Motion expresses relationships, inquiry, branching, and evolving systems.

Possible behaviors:

- connected nodes
- shifting annotations
- layered arguments
- paths appearing between ideas

### Lab

Motion may be more reactive and provisional while remaining controlled.

Possible behaviors:

- live parameters
- responsive fields
- experimental simulations
- incomplete assemblies

### Art

Motion should protect contemplation and visual autonomy.

Possible behaviors:

- slow atmospheric changes
- subtle framing transitions
- quiet image reveals
- minimal environmental movement

### Products

Motion should communicate material, function, configuration, and transaction clarity.

Possible behaviors:

- object focus
- dimensional transitions
- configuration changes
- restrained product inspection

### About

Motion should express memory, chronology, presence, and personal continuity.

Possible behaviors:

- timeline progression
- archival layer reveals
- transitions between periods
- gentle spatial accumulation

## 11.5 Performance fallback

Environmental animation is the first motion layer to be reduced or removed when:

- device performance is limited
- battery-saving mode is active
- browser tab is not visible
- reduced motion is requested
- network or asset loading is constrained

---

# 12. Interaction Feedback

## 12.1 Feedback states

Every interactive element should define:

- default
- hover
- focus-visible
- active or pressed
- selected
- loading
- success
- warning
- error
- disabled

Motion should clarify the transition between these states.

## 12.2 Press and activation

Buttons and controls should respond immediately on press through a small change in position, scale, contrast, or fill.

The response must begin before the resulting page or state transition.

## 12.3 Loading

Loading states should express ongoing construction or transfer without suggesting indefinite waiting.

Preferred forms:

- line progression
- grid cell activation
- measured reveal
- changing structural placeholder

Avoid decorative spinners as the primary loading language unless required by a conventional system context.

## 12.4 Success

Success feedback should be quiet and conclusive.

Possible behavior:

- a line closes
- a field settles into alignment
- a status label resolves
- the completed object gains stable contrast

## 12.5 Error

Error feedback should identify location and required action.

Avoid shaking entire forms or flashing large areas. Use localized contrast, a precise boundary change, and direct explanatory text.

## 12.6 Dragging and direct manipulation

Where objects can be dragged:

- the object should separate clearly from its resting plane
- the destination or constraint should become visible
- motion should follow input without lag
- release should settle without bounce
- invalid destinations should be communicated before release

---

# 13. Choreography

## 13.1 Sequence rules

Related elements may enter in short sequences to clarify hierarchy.

Recommended ordering:

1. structural geometry
2. primary title or identity
3. main content
4. secondary metadata
5. optional environmental detail

## 13.2 Staggering

Stagger should be subtle and grouped.

Suggested interval: 20–60 ms between related elements.

Avoid long cascades where the visitor waits for each item. Lists should generally animate as a group or in small clusters rather than item by item.

## 13.3 Simultaneous movement

Elements moving together must share a reason:

- same layer
- same direction
- same hierarchy
- same transformation

Unrelated motion should not occur simultaneously.

## 13.4 Interruption

All route and interface transitions must support interruption.

When the visitor changes direction:

- current animations should resolve or reverse cleanly
- duplicate route transitions should not stack
- the final state should reflect the latest input
- essential controls must remain responsive

---

# 14. Typography and Motion

Typography should remain stable and readable.

Permitted behaviors:

- masked reveal
- opacity transition
- short positional entry
- controlled tracking change for labels
- line-by-line reveal for short statements

Avoid:

- rapidly changing type
- character scrambling as a default effect
- excessive kinetic typography
- large scale pulses
- long typewriter sequences
- text movement while the visitor is reading

Long-form reading pages should use minimal text animation after initial entry.

---

# 15. Image and Media Motion

## 15.1 Image reveal

Images may appear through:

- clipping boundary expansion
- tonal resolution
- controlled crop movement
- subtle depth transition

The image itself should remain the focus.

## 15.2 Galleries

Gallery navigation should communicate sequence and preserve context.

Possible behavior:

- outgoing image shifts along the sequence axis
- incoming image enters from the corresponding side
- captions update in coordination
- thumbnails or index remain stable

## 15.3 Video

Autoplay video should be muted, optional, and subordinate to page performance.

Video should not autoplay when:

- reduced motion is enabled
- it is outside the viewport
- data saving is requested
- the video is primarily informational and requires sound

## 15.4 Media inspection

Opening an image or object into a larger view should use a shared spatial origin where possible.

The expanded state must provide clear close, previous, next, caption, and keyboard behavior.

---

# 16. Responsive Motion

Motion should adapt to input type, viewport, performance, and attention context.

## 16.1 Desktop

May use:

- subtle hover
- shallow parallax
- spatial previews
- layered page transitions

## 16.2 Touch devices

Should prioritize:

- direct input
- shorter transitions
- minimal parallax
- stable content
- larger spatial cues rather than hover-dependent nuance

## 16.3 Small screens

On small screens:

- reduce travel distances
- reduce simultaneous layers
- favor vertical spatial logic
- avoid large zoom transitions
- preserve immediate content access

## 16.4 Low-performance devices

The system should detect or infer constrained conditions conservatively and reduce:

- blur
- large fixed layers
- continuous canvas effects
- complex masks
- multiple parallax layers
- high-resolution animated media

---

# 17. Accessibility and Reduced Motion

## 17.1 Reduced-motion principle

Reduced motion does not mean removing all feedback. It means replacing spatial movement with stable state changes.

When `prefers-reduced-motion: reduce` is active:

- remove parallax
- remove large translations and scale changes
- remove scroll-linked camera movement
- remove ambient loops
- shorten transitions substantially
- replace movement with opacity, contrast, boundary, or immediate state changes
- preserve loading, focus, success, and error communication

## 17.2 Functional parity

All content and functionality must remain available without animation.

Animation must never be the sole carrier of:

- meaning
- navigation direction
- selection
- error status
- hierarchy
- progress

## 17.3 Vestibular safety

Avoid:

- large zooms
- rapid full-screen movement
- rotation
- perspective swings
- background motion behind fixed text
- scroll acceleration disconnected from user input

## 17.4 Focus continuity

Focus must move logically after route changes, dialogs, and dynamic updates. Visual animation must not cause keyboard focus to become lost or hidden.

---

# 18. Performance Standards

Motion quality depends on responsiveness.

## 18.1 Preferred properties

Prefer animation of:

- transform
- opacity
- clipping or masking when performant

Use layout-changing properties only when necessary and tested.

## 18.2 Performance objectives

Proposed implementation targets:

- maintain smooth interaction near 60 frames per second on representative devices
- avoid long main-thread tasks during navigation
- begin interaction feedback immediately
- pause off-screen and background animation
- lazy-load nonessential animated assets
- prevent cumulative layout shift during reveals

## 18.3 Progressive enhancement

The static composition must remain complete and coherent before animation is applied.

Motion is an enhancement layer, not a dependency.

---

# 19. Motion Tokens

The final design system should expose semantic motion tokens rather than isolated durations in components.

## 19.1 Duration tokens

```text
motion-duration-instant
motion-duration-fast
motion-duration-standard
motion-duration-deliberate
motion-duration-spatial
motion-duration-ambient
```

## 19.2 Easing tokens

```text
motion-ease-enter
motion-ease-exit
motion-ease-move
motion-ease-linear-progress
```

## 19.3 Distance tokens

```text
motion-distance-micro
motion-distance-component
motion-distance-page
motion-depth-near
motion-depth-far
```

## 19.4 Stagger tokens

```text
motion-stagger-tight
motion-stagger-standard
motion-stagger-group
```

## 19.5 Environment tokens

```text
motion-environment-amplitude-low
motion-environment-speed-slow
motion-environment-opacity-low
```

Exact numerical values should be finalized during prototype testing and recorded in the shared design system.

---

# 20. Component Motion Contracts

Every reusable component should document a motion contract containing:

- trigger
- initial state
- active state
- exit state
- duration token
- easing token
- interruption behavior
- reduced-motion behavior
- keyboard and touch equivalent
- performance fallback

Components should not define unrelated custom animation values when an existing semantic token applies.

---

# 21. Prohibited Patterns

The following should not be part of the global platform language:

- decorative cursor trails
- constant pointer-reactive backgrounds
- full-screen scroll hijacking
- mandatory intro films
- long preloader sequences
- frequent page flips
- excessive glass-like floating layers
- bouncing buttons
- elastic menus
- rotating page transitions
- arbitrary card flips
- text scrambling used throughout the interface
- animation on every viewport entry
- multiple competing ambient loops
- motion that obscures or delays content
- sound triggered without explicit consent

A prohibited pattern may only appear inside a clearly bounded artwork or Lab experiment where it is the subject of the work rather than the platform interface.

---

# 22. Validation Criteria

Before a motion pattern is approved, it should pass the following review.

## 22.1 Narrative

- Does it reinforce the architectural world?
- Does it express threshold, direction, hierarchy, or relationship?
- Does it belong to this district and the larger universe?

## 22.2 Usability

- Is the result understandable without animation?
- Can the visitor interrupt it?
- Does it preserve orientation?
- Does it make the interface feel faster or slower?

## 22.3 Restraint

- Is this the minimum movement required?
- Is there already another motion competing with it?
- Would stillness communicate the state more effectively?

## 22.4 Accessibility

- Is reduced-motion behavior defined?
- Is keyboard focus preserved?
- Is essential information conveyed through another channel?
- Could the movement create vestibular discomfort?

## 22.5 Performance

- Does it remain smooth on representative devices?
- Does it avoid layout instability?
- Does it pause when not visible?
- Is there a simpler fallback?

---

# 23. Prototype and Approval Process

Motion should be approved through small, testable prototypes rather than implemented across the platform at once.

## Stage 1 — Motion primitives

Prototype and compare:

- standard reveal
- standard hover
- standard focus change
- standard line extension
- standard settle behavior

## Stage 2 — Navigation scales

Prototype:

- component transition
- page transition within one district
- district transition from Home
- back navigation
- direct deep-link arrival

## Stage 3 — Scroll behavior

Prototype:

- section reveal
- sticky anchor
- scroll progress
- restrained scroll-linked depth

## Stage 4 — Environmental behavior

Test one environmental pattern in Home and one district-specific variation.

## Stage 5 — Accessibility and performance

Verify:

- reduced motion
- keyboard navigation
- touch behavior
- lower-performance device fallback
- interruption and rapid route changes

Only approved primitives should be converted into shared implementation components and tokens.

---

# 24. Proposed First Implementation Milestones

These are planning proposals for Claude Code after the motion system and dependencies are approved.

## MOT-01 — Global motion tokens

Create the semantic duration, easing, distance, and reduced-motion foundation.

**Verification:** tokens are documented, reused, and testable.

## MOT-02 — Interaction feedback primitives

Implement hover, focus, press, disabled, loading, success, and error motion for shared controls.

**Verification:** keyboard, touch, and reduced-motion equivalents pass.

## MOT-03 — Basic route transition shell

Implement a restrained page transition within one district without environmental animation.

**Verification:** deep links, browser back, rapid navigation, and focus management work correctly.

## MOT-04 — Home-to-district transition prototype

Develop one representative district entry sequence.

**Verification:** orientation, timing, performance, cancellation, and fallback are reviewed before reuse.

## MOT-05 — Scroll and reveal primitives

Implement grouped section reveal, sticky anchors, and optional progress measurement.

**Verification:** content is complete without JavaScript and reduced motion is respected.

## MOT-06 — Environmental motion prototype

Implement one low-cost Home environment animation with automatic suspension and fallback.

**Verification:** performance and distraction are tested on desktop and mobile.

---

# 25. Cross-Domain Dependencies

This document does not independently determine the final visual form of motion. It requires coordination with:

- **Platform Vision:** confirms the emotional and experiential goals.
- **Information Architecture:** defines parent, child, sibling, and cross-district relationships that motion must represent.
- **Design System:** defines typography, color, grids, components, accessibility, and final token values.
- **Home Universe:** defines the primary entrance, district map, thresholds, and first spatial sequence.
- **District Universe Documents:** define permitted local variation in atmosphere and behavior.
- **Project Management:** records approvals, dependencies, implementation status, and verification.

Any future decision that changes navigation hierarchy, page relationships, or district identity may require an update to this motion system.

---

# 26. Decision Register

## Proposal — Architectural motion grammar

The platform uses a limited vocabulary of reveal, translate, focus, extend, assemble, dissolve, and settle.

## Proposal — Spatial navigation model

Horizontal motion represents neighboring spaces, vertical motion represents progression and hierarchy, and restrained depth represents entry and focus.

## Proposal — Motion hierarchy

Component, page, and district transitions use progressively greater duration and spatial consequence.

## Proposal — No generic spectacle

Bounce, overshoot, large rotation, long preloaders, and decorative continuous effects are excluded from the global interface.

## Proposal — Native input priority

Native scrolling, interruption, browser navigation, keyboard focus, and touch behavior take priority over animation.

## Proposal — Reduced-motion parity

Reduced-motion mode preserves all meaning and feedback while replacing major movement with stable visual state changes.

## Proposal — District variation within shared rules

Each district may vary its tempo and environmental behavior but cannot redefine the platform’s core motion grammar independently.

No decision in this document should be considered Approved until it has been reviewed against the Platform Vision, Information Architecture, Design System, and universe documents.

---

# 27. Final Motion Statement

The Personal Platform should move like architecture is experienced: through approach, threshold, passage, orientation, focus, and pause.

Its animation should make the digital world feel continuous without pretending to be a game or a literal building simulation. The strongest motion will often be nearly invisible: a line that establishes direction, a frame that opens, a field that settles, or a viewpoint that shifts just enough to reveal the relationship between spaces.

Motion should leave the visitor with a sense of coherence, not with a memory of effects.
