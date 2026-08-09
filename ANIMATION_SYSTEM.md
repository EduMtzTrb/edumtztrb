# Personal Platform — Animation System

**Document:** `ANIMATION_SYSTEM.md`  
**Version:** 1.0  
**Status:** Approved  
**Domain owner:** Motion & Animation  
**Implementation owner:** Claude Code after Platform Specification and implementation planning  
**Sequence position:** Universe Specifications → Cross-Universe Requirements → Design System → **Animation System** → Platform Specification → implementation planning  

---

# 1. Purpose

The Animation System defines how the Personal Platform changes over time.

The Design System defines form. The Animation System defines change.

Motion is not an effects layer added after visual design. It is the temporal expression of the same architectural system that governs proportion, hierarchy, grids, surfaces, frames, lines, planes, voids, and district identity.

The platform is conceived as one architectural world. Motion must therefore help the visitor understand how places, records, views, states, and layers relate to one another.

The governing question is:

> **How does this architectural world move without becoming theatrical, distracting, or inconsistent?**

The answer is a restrained motion grammar in which movement communicates structure, consequence, direction, focus, continuity, and state.

Motion must remain:

- architectural rather than cinematic
- quiet rather than spectacular
- legible rather than ornamental
- continuous rather than disorienting
- responsive rather than scripted
- purposeful rather than ubiquitous
- accessible rather than compulsory
- scalable rather than page-specific

Every motion must communicate at least one of the following:

1. a threshold has been crossed
2. a relationship exists between two places or states
3. attention should move toward or away from something
4. information has changed
5. something has been assembled, compared, traced, or confirmed
6. the visitor is returning to a known context
7. a process is continuing or has completed

If movement communicates none of these things, it should not exist.

---

# 2. Core Principle

The Design System establishes:

> **Same system. Different emphasis.**

The Animation System follows the same principle.

Every district uses one shared motion grammar, but each district emphasizes different roles, tempos, densities, and degrees of spatial consequence.

The districts do not receive unrelated animation identities.

They remain parts of one world.

Home carries the strongest sense of passage and orientation. Work emphasizes alignment, evidence, and structural resolution. Research moves more slowly and editorially. Lab emphasizes comparison, trace, assembly, and changing states. Art relies primarily on recession, focus, and stillness. Products moves directly and efficiently toward evaluation and confirmation. About uses gentle sequence, continuity, and return.

District difference comes from emphasis, not from inventing new physics.

---

# 3. The Platform as a Temporal Architecture

The visitor should not experience the platform as a series of unrelated screens replacing one another.

Navigation should imply movement through one continuous environment.

This does not require literal 3D simulation.

The architectural world may be expressed through:

- alignment
- translation
- masking
- cropping
- scale
- depth
- focus
- contrast
- recession
- persistent geometry
- shared origins and destinations
- continuity of position
- controlled changes in environmental tone

The platform should alternate deliberately between movement and stillness.

Movement explains change.

Stillness establishes presence.

A page that never moves feels disconnected from the spatial premise. A page that never stops moving destroys architectural calm.

The system therefore treats stillness as an active motion state.

---

# 4. Motion Hierarchy

Motion consequence must correspond to architectural consequence.

The hierarchy is:

1. **Feedback** — confirms local input
2. **State Change** — communicates a component or data change
3. **Focus** — reorganizes attention within the current context
4. **Sequence** — progresses through related material
5. **Record Passage** — moves between overview and a record, or between related records
6. **District Passage** — moves between major areas of the platform
7. **World Threshold** — establishes entry into or return from the platform’s primary spatial system

Higher levels may use more duration, larger spatial displacement, and more coordinated elements.

Lower levels must remain faster and more localized.

A button press must never carry the same spatial weight as entering Research from Home.

A modal must never feel like entering a new district.

A district passage must never be reduced to the same visual event as changing a tab.

---

# 5. Approved Motion-Role Vocabulary

The following vocabulary is the semantic foundation of the Animation System.

Implementation should use these roles conceptually and, where useful, in naming motion tokens, variants, component contracts, and tests.

## 5.1 Threshold

**Meaning:** crossing from one architectural condition into another.

**Allowed to communicate:**

- Home → district entry
- district → Home exit
- transition into a strongly different mode or environment
- crossing a boundary between overview and immersive state when the spatial consequence is substantial

**May use:** masking, boundary crossing, alignment, environmental change, restrained depth, recession of the origin.

**Must not communicate:** minor UI changes, hover, local filtering, or decorative entrance effects.

Threshold is rare and carries high spatial weight.

## 5.2 Passage

**Meaning:** movement between related architectural locations.

**Allowed to communicate:**

- page-to-page movement
- sibling records
- district-to-district movement after orientation has been established
- travel between index and detail where the relation is spatially legible

**May use:** translation, shared geometry, controlled depth, directional cropping, persistent anchors.

Passage expresses distance without becoming cinematic travel.

## 5.3 Approach

**Meaning:** movement toward something before full commitment or entry.

**Allowed to communicate:**

- hover or focus preview
- selected destination before activation
- route emphasis
- preparatory enlargement or framing

**May use:** small translation, shallow scale, contrast change, line extension, surrounding recession.

Approach must never delay activation.

## 5.4 Focus

**Meaning:** concentrating attention within the current context.

**Allowed to communicate:**

- enlarged artwork
- Work evidence inspection
- Research artifact reading
- Lab result inspection
- Product evaluation
- About long-form reading or archival detail

**May use:** surrounding recession, frame expansion, stable shared origin, controlled scale, contrast, depth, masking.

Focus should usually make the environment quieter rather than make the selected item more theatrical.

## 5.5 Sequence

**Meaning:** ordered progression through related information.

**Allowed to communicate:**

- chapter progression
- timeline movement
- gallery order
- stepped explanation
- process stages

**May use:** directional translation, measured reveal, persistent progress markers, sticky anchors.

Sequence must preserve user control and must not become forced storytelling.

## 5.6 Comparison

**Meaning:** placing two or more states, versions, artifacts, or options into explicit relation.

**Allowed to communicate:**

- before/after
- version comparison
- Lab branches
- product variants
- research evidence comparison
- Work option or phase comparison where relevant

**May use:** synchronized alignment, split views, matched transitions, shared scale, selective highlighting.

Comparison must stabilize common reference points. It must not use movement that makes visual comparison harder.

## 5.7 Assembly

**Meaning:** parts becoming legible as a system or composition.

**Allowed to communicate:**

- first district orientation
- drawing or diagram construction
- layered evidence
- grouped datasets or components
- Lab systems and prototypes

**May use:** short stagger, line extension, progressive layer appearance, aligned insertion.

Assembly is not a generic page-load animation and should be used sparingly.

## 5.8 Trace

**Meaning:** revealing a relationship, history, route, dependency, or lineage.

**Allowed to communicate:**

- Research references and conceptual paths
- Lab iteration lineage
- transition from Research question to Lab experiment
- progression from Lab to Work or Products
- provenance between canonical records and commercial objects

**May use:** line progression, node emphasis, path illumination, sequential highlighting, persistent relational geometry.

Trace must clarify evidence. It must not mimic decorative network animation.

## 5.9 Recession

**Meaning:** deliberately reducing the presence of non-primary material.

**Allowed to communicate:**

- focus
- overlay entry
- artwork concentration
- foreground/background hierarchy
- departure from a context

**May use:** opacity reduction, contrast reduction, blur only when safe and performant, scale reduction, masking, tonal quieting.

Recession is one of the system’s primary alternatives to zoom.

## 5.10 Return

**Meaning:** restoring a known previous context.

**Allowed to communicate:**

- closing focus
- returning from record to index
- browser Back behavior
- district → Home
- closing overlays

**May use:** shared origin reversal, contextual restoration, scroll or index restoration, faster reciprocal movement.

Return must preserve spatial memory whenever technically possible.

## 5.11 Confirmation

**Meaning:** making a completed action conclusive.

**Allowed to communicate:**

- purchase action accepted
- form submitted
- preference saved
- copy/download state completed
- operation succeeded

**May use:** alignment, line closure, stable state resolution, concise contrast or boundary change.

Confirmation must be quiet and immediate.

## 5.12 State Change

**Meaning:** showing that a local interface or data state has changed without implying travel.

**Allowed to communicate:**

- filters
- tabs
- toggles
- sorting
- loading completion
- selected/unselected states
- error and warning resolution

**May use:** localized reveal, replacement, boundary change, opacity, concise translation.

State Change must never masquerade as Passage or Threshold.

---

# 6. Supporting Motion Operations

The motion roles describe **why** something moves. The following operations describe **how** it may move.

Approved operations are:

- **Reveal** — controlled exposure of content
- **Translate** — movement along a meaningful axis
- **Extend** — growth of a line, path, frame, or boundary
- **Scale** — restrained hierarchy change
- **Crop** — change of visible frame or aperture
- **Dissolve** — controlled loss of visual presence
- **Align** — reorganization around a common geometric reference
- **Settle** — precise deceleration into a stable final state

Operations must never replace semantic roles.

For example, a scale animation is not inherently Focus. It becomes Focus only when it reorganizes attention toward selected content.

---

# 7. Spatial Axes and Directional Logic

Movement must follow consistent spatial reasoning.

## 7.1 Horizontal axis

Horizontal motion usually represents lateral relation.

Use for:

- sibling records
- parallel views
- gallery sequence
- side-by-side comparison
- adjacent sections or categories where the information architecture establishes equivalence

## 7.2 Vertical axis

Vertical motion usually represents progression, document depth, or hierarchy.

Use for:

- long-form reading
- chapter progression
- index → deeper detail when represented as descent
- returning toward overview
- chronological progression when vertically composed

## 7.3 Depth axis

Depth represents hierarchy, entry, concentration, and withdrawal.

Use for:

- Home → district
- index → record
- focus states
- environmental foreground/background separation

Depth must remain shallow and restrained.

Large zooms, rapid perspective changes, and camera rotation are not part of the global language.

## 7.4 Fixed orientation plane

Persistent navigation, accessibility controls, system status, and selected-location indicators form an orientation plane.

They should move minimally.

Their relative stability gives the visitor a reference against which spatial movement can be understood.

---

# 8. Spatial Memory

Spatial memory is an approved core requirement.

The platform should remember enough of the visitor’s previous context that navigation feels like movement through a persistent world rather than replacement of one page by another.

Where technically possible, navigation state should preserve:

- previous route
- parent district
- selected record
- position within an index
- scroll position when returning
- active filter or lens
- active comparison state
- gallery position
- relevant expanded/collapsed state
- originating geometry for shared transitions

## 8.1 Return-state principle

Returning should restore the visitor to the context they left rather than placing them at an arbitrary default state.

Examples:

- closing a Work project returns to its previous position in the Work index
- closing Art focus restores the gallery composition and previous scroll position
- leaving a Research artifact returns to the relevant argument, cluster, or index position
- leaving a Lab comparison restores the active branch or experiment context
- returning from Products restores filters or evaluation context when appropriate

## 8.2 Directional continuity

The direction of entry establishes an expectation for return.

Return should normally use reciprocal spatial logic, but it should be shorter and more efficient than first entry.

## 8.3 Deep links

Spatial memory must not become a dependency.

Any route may be entered directly.

A direct entry must create an abbreviated orientation state containing:

- district identity
- current record or section
- parent navigation
- primary next actions

The platform must not pretend the visitor came from a context that did not exist in the current session.

---

# 9. Transition Categories

The following transition categories are approved.

## 9.1 Home → district

**Primary roles:** Threshold + Passage + Assembly.

This is the strongest recurring architectural transition.

Sequence:

1. selected district receives Approach
2. Home geometry aligns toward the destination
3. surrounding routes recede
4. a concise Threshold is crossed
5. district-defining geometry/environment arrives before secondary content
6. title, navigation, and first actionable content settle

The transition must imply that Home and the district occupy the same world.

It must not become a cinematic fly-through or loading film.

## 9.2 District → Home

**Primary roles:** Return + Threshold.

The district withdraws and Home restores orientation.

The return should be faster than first entry and should preserve the visitor’s prior Home state where appropriate.

## 9.3 District → district

**Primary roles:** Passage + Threshold only when environmental difference requires it.

A visitor should not always be forced through Home.

Cross-district movement should acknowledge the relationship between districts while retaining global orientation.

## 9.4 Section → section

**Primary role:** Sequence or Passage.

Use native scrolling, anchors, or concise transitions according to information hierarchy.

Sections inside a document should not feel like separate worlds.

## 9.5 Index → record

**Primary roles:** Approach + Focus or Passage.

Where possible, the selected record acts as the spatial origin of the detail view.

The transition preserves:

- record identity
- district identity
- origin position
- path for Return

## 9.6 Record → record

**Primary roles:** Sequence or Passage.

Sibling records use clear directional logic. The user must remain aware that they are still inside the same district and record type.

## 9.7 Overlay/modal entry

**Primary roles:** Focus + Recession.

The underlying context remains spatially present but becomes secondary.

The overlay must never imply a new district.

## 9.8 Focus state

**Primary roles:** Focus + Recession.

The selected material becomes easier to inspect while surrounding interface retreats.

## 9.9 Return state

**Primary role:** Return.

Context is restored with minimal delay and, where possible, with reciprocal geometry.

---

# 10. District Entry and Exit Behavior

All districts share the same entry structure but vary emphasis.

## 10.1 First entry

The first entry during a session may carry the complete district introduction:

- environmental cue
- primary geometry
- district title
- navigation orientation
- initial content composition

## 10.2 Repeated entry

Repeated navigation must become more efficient.

Once the visitor understands a route, the platform should reduce ceremony.

Repeated entries should:

- shorten duration
- reduce assembly
- preserve more persistent geometry
- prioritize immediate content access
- avoid replaying environmental introductions

The world should become easier to navigate as familiarity increases.

## 10.3 Exit

Exit should communicate where the visitor is returning or moving next.

It should not simply fade the entire screen to neutral unless there is no meaningful spatial relationship to preserve.

---

# 11. Focus System

Focus is a shared behavior with district-specific emphasis.

The general sequence is:

1. selected content declares itself
2. surrounding context recedes
3. primary content reaches a stable inspection state
4. controls and metadata become available without competing with content
5. Return restores the prior composition

Focus should preserve the sense that the selected item belongs to its origin.

## 11.1 Work focus

Work focus supports professional evidence.

It may concentrate:

- drawings
- models
- images
- technical documentation
- project evidence
- captions and provenance

Motion should feel aligned, exact, and structural.

Evidence should expand or reorganize without losing its relation to the project narrative.

## 11.2 Research focus

Research focus supports sustained reading and artifact inspection.

It should become slower and quieter after entry.

Once reading begins, motion should largely stop.

References, figures, notes, and related artifacts may reveal contextually, but text should not remain animated during reading.

## 11.3 Lab focus

Lab focus may expose dynamic states, versions, tests, failures, or parameters.

Motion may remain more active than in Work or Research when the motion itself explains transformation.

The visitor must always be able to distinguish interface motion from experimental output.

## 11.4 Art focus

Art focus uses the strongest recession and the least interface movement.

The architecture should withdraw around the work.

The artwork determines whether visual motion exists inside the focus state.

Interface chrome should not animate continuously around artwork.

## 11.5 Products focus

Products focus supports evaluation and decision-making.

Motion should quickly expose:

- object or offer
- variation
- price/availability context
- material or dimensional detail
- purchase or inquiry action

It should be direct and efficient rather than immersive for its own sake.

## 11.6 About focus

About focus supports biography, continuity, values, experience, credentials, and long-form reading.

Motion should be gentle and sequential.

It should help reveal chronology or layers of authorship without dramatizing the person.

---

# 12. Reveal and Recession Rules

Reveal and recession are paired operations.

## 12.1 Reveal

Reveal should expose existing structure rather than make content appear from nowhere.

Preferred reveal methods:

- clipping from an architectural edge
- masking
- short positional movement
- line or frame extension
- opacity used with another structural cue
- tonal resolution

Reveal must not be applied independently to every paragraph, label, image, or card.

Related content should reveal as a composition.

## 12.2 Recession

Recession reduces hierarchy without erasing context.

Preferred methods:

- lower contrast
- lower opacity
- reduced environmental activity
- slight scale reduction
- tonal convergence
- selective masking
- blur only when readable, accessible, and performant

Recession is preferred over aggressive zoom for many Focus states.

## 12.3 Stillness after reveal

Once content has been revealed, it should settle.

Reading, inspection, and contemplation require stable surfaces.

---

# 13. Comparison and Lineage Motion

Comparison and lineage are system-level behaviors, not Lab-only special effects.

## 13.1 Comparison

When comparing states, the system should preserve common reference points.

Preferred behavior:

- common geometry remains fixed
- changed regions move or highlight
- synchronized transitions use identical duration and easing
- labels remain stable
- the visitor may pause comparison at any state

Avoid:

- independent drifting panels
- mismatched zoom levels
- automatic oscillation between states
- transitions too fast to inspect differences

## 13.2 Version change

Versions should transition by showing what persists and what changes.

Unchanged structure should remain stable where possible.

Changed structure may reveal, replace, translate, or trace.

## 13.3 Lineage

Lineage explains how one record leads to another.

Examples include:

- Research question → Lab experiment
- Lab experiment → resolved Work
- Art record → Product edition
- Work/Research canonical record → related Product

Trace motion may reveal the relationship, but canonical ownership must remain informationally clear through labels and structure, not motion alone.

---

# 14. Scrolling

Native browser scrolling is the default.

The platform must not use global scroll hijacking or artificial inertia as a foundational interaction.

Scrolling is treated as architectural progression through composed fields rather than as a feed.

## 14.1 Scroll-linked motion

Scroll may control:

- section reveal
- progress measurement
- restrained depth cues
- line tracing
- environmental change
- contextual alignment

Scroll-linked motion must:

- remain directly coupled to user input
- stop when scrolling stops
- remain understandable when removed
- respect reduced-motion preferences
- avoid large scale or rotation changes

## 14.2 Sticky anchors

Sticky elements may preserve orientation during long sequences.

Use for:

- chapter labels
- district identifiers
- project metadata
- Research references
- comparison legends
- progress/index anchors

Sticky layers must release clearly and must not accumulate into visual congestion.

## 14.3 Long-form reading

Research and About long-form content should become progressively more static as reading begins.

No continual parallax, drifting text, or animated backgrounds should compete with sustained reading.

## 14.4 Horizontal scrolling

Horizontal scrolling is permitted only when the content is inherently lateral, such as:

- gallery sequences
- timelines
- plan-like fields
- version strips

It must be clearly indicated and must not trap vertical page navigation.

---

# 15. Camera and Viewpoint

The “camera” is an implied viewpoint, not a requirement for literal 3D rendering.

Camera-like movement may be constructed through:

- coordinated translation
- shallow scaling
- cropping
- layer parallax
- depth ordering
- focus and recession

Approved constraints:

- global camera rotation is prohibited
- perspective swings are prohibited
- large full-screen zoom is prohibited
- pointer-driven camera movement must remain extremely limited or absent
- viewpoint movement must not delay access to content
- text must remain stable while being read

A selected item may appear to approach the viewer, but the perceived movement should remain restrained.

---

# 16. Hover and Pre-Activation Behavior

Hover uses the **Approach** role.

Its purpose is to communicate possibility and relation.

Hover may combine a maximum of two primary visual changes, such as:

- line extension
- contrast increase
- small translation
- shallow scale
- boundary reveal
- crop adjustment
- metadata reveal

Essential information may never exist only on hover.

Keyboard focus must provide an equivalent conceptual state with stronger accessibility clarity.

Touch interfaces must not simulate hover in ways that require unexplained extra taps.

---

# 17. Interaction Feedback

Every interactive component should define these states where relevant:

- default
- hover
- focus-visible
- active/pressed
- selected
- loading
- success
- warning
- error
- disabled

Feedback must begin immediately after input.

## 17.1 Press

Press states may use concise translation, scale, fill, boundary, or contrast change.

No bounce.

## 17.2 Confirmation

Successful actions settle into a stable final state.

Examples:

- a line closes
- a boundary completes
- a label resolves
- an object aligns into its final position

## 17.3 Error

Errors must be localized and explanatory.

The interface must not shake entire forms or flash large areas.

Motion is secondary to clear text and visible state.

---

# 18. Loading and State-Change Motion

Loading is a State Change, not a spectacle.

Content structure should appear before nonessential animation or media.

Preferred loading language:

- structural placeholder
- measured line progression
- progressive reveal of already-known geometry
- local status change

The interface must remain usable whenever possible.

Long preloaders, looping branded films, and mandatory waiting animations are prohibited.

If content or media loads slowly:

1. layout dimensions remain stable
2. primary navigation remains available
3. animation simplifies
4. loading state remains local to the affected content

---

# 19. Overlay and Modal Behavior

Overlays and modals are layers within the current architectural context.

They use **Focus + Recession**, not Threshold.

## 19.1 Entry

- originating control or object remains conceptually connected
- background recedes
- overlay enters from a meaningful origin where possible
- focus transfers correctly to the overlay

## 19.2 Active state

- the background remains visually present but inactive
- environmental motion behind the overlay should pause or reduce
- no competing animation should continue unnecessarily

## 19.3 Exit

- Return restores the prior context
- keyboard focus returns to the originating control when appropriate
- prior scroll and selection state are preserved

Full-screen media inspection may visually dominate the viewport while still behaving as an overlay if the information architecture has not changed.

---

# 20. Artwork Motion vs Interface Motion

The platform distinguishes **authored motion** from **interface motion**.

This distinction is essential in Art and may also apply to Lab, Research, Work, and Products when the content itself is animated.

## 20.1 Interface motion

Interface motion belongs to the platform system.

It must follow this document.

Examples:

- navigation transitions
- focus entry
- gallery controls
- captions
- overlays
- loading
- state changes

## 20.2 Authored motion

Authored motion belongs to the work being presented.

Examples:

- moving artwork
- generative piece
- simulation
- prototype animation
- motion study
- video

The interface must recede around authored motion.

It must not visually imitate, synchronize with, or compete with the work unless that relationship is explicitly part of the work itself.

Autoplay must respect accessibility, user preference, data/performance constraints, and the communicative requirements of the artifact.

---

# 21. Environmental Animation

Environmental animation gives the architectural world latent life.

It is subordinate to content and navigation.

It may suggest:

- light change
- distant spatial activity
- line emergence
- data flow
- material diffusion
- depth
- incomplete construction

Environmental motion should use:

- low amplitude
- low contrast
- long or irregular cycles
- limited affected area
- substantial periods of stillness

The entire viewport should not move continuously.

Environmental animation is the first layer removed under performance, reduced-motion, battery, or attention constraints.

---

# 22. District Motion Emphasis

All districts use the same roles. Their difference is emphasis.

## 22.1 Home

**Primary roles:** Threshold, Passage, Approach, Assembly, Return.

Home carries the strongest sense of spatial orientation and the largest motion consequence.

It may use:

- route alignment
- distant district cues
- restrained depth
- latent geometry
- environmental shifts

Home should feel like entering and navigating a world, not operating a menu.

## 22.2 Work

**Primary roles:** Passage, Focus, Assembly, Comparison, Return.

Character:

- precise
- aligned
- evidential
- constructive

Movement should reinforce grids, frames, phases, and relationships between professional evidence.

## 22.3 Research

**Primary roles:** Sequence, Focus, Trace, Comparison, Recession.

Character:

- slower
- editorial
- cumulative
- relational

Motion helps expose arguments and references, then recedes during reading.

## 22.4 Lab

**Primary roles:** Comparison, Trace, Assembly, State Change, Focus.

Character:

- provisional
- reactive
- transformable
- calibrated

Lab may contain more visible state change than other districts, but it must remain readable and must never become generically chaotic.

## 22.5 Art

**Primary roles:** Focus, Recession, Sequence, Return.

Character:

- quiet
- spacious
- subordinate to the work
- contemplative

Architecture moves out of the way.

Stillness is especially important.

## 22.6 Products

**Primary roles:** Focus, Comparison, State Change, Confirmation, Return.

Character:

- direct
- clear
- efficient
- material

Motion supports evaluation, configuration, availability, and transaction clarity without becoming a generic e-commerce animation language.

## 22.7 About

**Primary roles:** Sequence, Trace, Focus, Recession, Return.

Character:

- gentle
- sequential
- human
- continuous

Motion may help connect biography, experience, education, values, methods, and chronology without becoming self-promotional or sentimental.

---

# 23. Timing System

Timing corresponds to consequence.

The approved v1.0 ranges are:

| Level | Range | Typical use |
|---|---:|---|
| Immediate | 80–140 ms | press, selection confirmation, local feedback |
| Fast | 140–220 ms | hover, focus-visible, concise state change |
| Standard | 220–360 ms | component change, overlay, local comparison |
| Deliberate | 360–600 ms | record passage, substantial focus transition |
| Spatial | 600–900 ms | first district threshold or major world passage |
| Ambient | 6–30 s | low-attention environmental cycle |

These ranges are approved system boundaries. Exact token values inside the ranges may be tuned during implementation testing without reopening the conceptual system, provided behavior remains within the intended hierarchy.

## 23.1 Repeated-navigation efficiency

Repeated transitions should progressively favor the faster end of the allowed range.

A familiar route should never replay a lengthy first-entry sequence merely because it can.

## 23.2 Easing

The global motion character is controlled deceleration.

Approved easing families:

- enter — responsive start, precise arrival
- exit — slightly faster withdrawal
- move — balanced spatial translation
- progress — linear only where the value itself represents continuous progress

Prohibited global easing behavior:

- bounce
- elastic overshoot
- wobble
- rubber-band physics
- exaggerated acceleration

Spring behavior may exist inside a bounded Lab experiment if it belongs to the experiment, not to platform navigation.

---

# 24. Motion Density

Motion density describes how many independent movements can occur at once.

The global rule is:

> **One dominant movement at a time.**

Secondary movements may support the dominant one, but unrelated animation should not compete for attention.

Approved density principles:

- group related reveals
- limit stagger
- avoid simultaneous ambient and navigational emphasis
- reduce environmental activity during reading or focus
- avoid animating every viewport entry
- prefer static persistence over repeated re-entry animation

---

# 25. Typography and Motion

Typography exists to be read.

Permitted text motion:

- masked reveal
- short positional entry
- opacity/contrast transition
- limited tracking change for labels
- grouped line reveal for short statements

Prohibited as global language:

- character scrambling
- long typewriter sequences
- kinetic paragraphs
- continuous text drift
- scale pulsing
- moving long-form text while reading

Once a reading surface is active, typography should be still.

---

# 26. Image, Object, and Media Motion

## 26.1 Images

Images may reveal through:

- clipping
- aperture/crop change
- tonal resolution
- shallow depth transition

The motion should reveal the image, not become more memorable than it.

## 26.2 Galleries

Gallery sequence should preserve position and direction.

Captions, index, and navigation should remain stable enough to maintain orientation.

## 26.3 Object inspection

Objects and products may use controlled rotation or manipulation only when the visitor intentionally initiates it and when it materially helps inspection.

This is direct manipulation, not global camera behavior.

## 26.4 Video and time-based work

Time-based content should not autoplay merely to make a page feel alive.

Interface playback state must remain clear.

---

# 27. Responsive Motion

Motion adapts to viewport, input type, device capability, and attention context.

## 27.1 Desktop

May support:

- hover Approach
- shallow parallax
- layered transitions
- richer environmental cues

## 27.2 Touch

Prioritize:

- direct activation
- shorter travel
- less parallax
- stable layouts
- no hover dependency

## 27.3 Small screens

Prefer:

- vertical spatial logic
- reduced travel distance
- fewer simultaneous layers
- faster access to content
- smaller environmental motion budgets

The mobile experience is not a miniature desktop camera system.

---

# 28. Reduced-Motion System

Reduced motion must preserve meaning, hierarchy, and feedback.

It is not an incomplete version of the platform.

When `prefers-reduced-motion: reduce` is active:

- remove parallax
- remove large translation
- remove large scale/depth changes
- remove scroll-linked camera effects
- stop ambient loops
- shorten nonessential transitions
- replace spatial travel with opacity, contrast, boundary, or immediate state changes
- preserve focus-visible, loading, error, success, selection, progress, and confirmation states

Role equivalents:

- Threshold → immediate environmental/context change with stable orientation cue
- Passage → concise replacement preserving shared anchors
- Approach → contrast/boundary emphasis
- Focus → surrounding recession without large movement
- Sequence → native scroll or direct step change
- Comparison → stable side-by-side or direct swap
- Assembly → immediate grouped appearance
- Trace → static path/relationship highlight
- Recession → contrast/opacity reduction
- Return → immediate context restoration
- Confirmation → concise stable state resolution
- State Change → direct localized change

No information may depend on motion alone.

---

# 29. Accessibility Constraints

Animation must satisfy the following requirements:

- all functionality works without animation
- keyboard focus is never lost during transitions
- focus restoration is defined for overlays and Return
- essential state is not hover-only
- motion is not the sole signal of error, success, selection, hierarchy, progress, or navigation direction
- rapid full-screen movement is avoided
- large zoom and rotation are prohibited globally
- background movement must not undermine foreground reading
- reduced-motion behavior exists for every reusable motion pattern

Motion must support comprehension, not demand tolerance.

---

# 30. Performance Constraints

Motion quality depends on responsiveness.

Approved implementation principles:

- static composition is complete before animation enhancement
- prefer transform and opacity for frequent animation
- use masks/clipping only when performance is verified
- avoid animation that forces repeated layout calculation
- reserve blur and large fixed layers for carefully tested cases
- prevent layout shift during reveal and loading
- pause off-screen environmental animation
- suspend nonessential motion when the document is hidden
- progressively reduce environmental complexity on constrained devices
- interaction feedback begins immediately

The implementation target is smooth response on representative desktop and mobile devices, with progressive reduction rather than degraded usability on weaker hardware.

Environmental motion is always expendable. Navigation clarity is not.

---

# 31. Motion Tokens

Implementation should expose semantic tokens rather than isolated component-specific values.

Recommended token families:

## Duration

- `motion-duration-immediate`
- `motion-duration-fast`
- `motion-duration-standard`
- `motion-duration-deliberate`
- `motion-duration-spatial`
- `motion-duration-ambient`

## Easing

- `motion-ease-enter`
- `motion-ease-exit`
- `motion-ease-move`
- `motion-ease-progress`

## Distance

- `motion-distance-micro`
- `motion-distance-component`
- `motion-distance-record`
- `motion-depth-near`
- `motion-depth-district`

## Recession

- `motion-recession-subtle`
- `motion-recession-focus`
- `motion-recession-overlay`

## Stagger

- `motion-stagger-tight`
- `motion-stagger-standard`
- `motion-stagger-group`

## Environment

- `motion-environment-amplitude-low`
- `motion-environment-speed-slow`
- `motion-environment-presence-low`

Exact implementation values should be centralized and verified against the approved timing hierarchy.

---

# 32. Motion Contracts

Every reusable animated component or transition must define a motion contract containing:

- semantic role
- trigger
- origin
- destination
- dominant movement
- persistent anchors
- initial state
- active state
- exit/Return state
- duration token
- easing token
- interruption behavior
- repeated-navigation behavior where relevant
- reduced-motion equivalent
- keyboard behavior
- touch behavior
- performance fallback

Components may not invent unrelated animation values when a shared token or role already applies.

---

# 33. Interruption and User Priority

User input always has priority over nonessential animation.

The system must support:

- rapid route changes
- browser Back/Forward
- scroll interruption
- keyboard navigation
- touch interruption
- closing overlays during entry
- changing selection before an earlier motion completes

Animations must not stack indefinitely.

The final state must always resolve to the visitor’s latest valid action.

No standard interaction may require the visitor to wait for animation to finish before content or navigation becomes usable.

---

# 34. Prohibited Motion Patterns

The following are prohibited as global platform language:

- decorative cursor trails
- constant pointer-reactive backgrounds
- full-screen scroll hijacking
- mandatory intro films
- cinematic fly-through navigation
- long branded preloaders
- repeated page-flip effects
- bouncing controls
- elastic menus
- spring overshoot in navigation
- rotating page transitions
- arbitrary card flips
- text scrambling as a recurring motif
- typewriter effects as general presentation
- movement on every viewport entry
- auto-playing comparison oscillations
- excessive parallax
- perspective swings
- large global zooms
- constant ambient movement across the full viewport
- multiple competing environmental loops
- shake-based error feedback
- motion that delays content access
- motion whose only purpose is to signal sophistication
- sound triggered without explicit visitor action or consent

A prohibited platform pattern may appear inside a bounded artwork or Lab experiment when it is part of the authored content itself.

---

# 35. Validation Criteria

A motion pattern is valid only if it passes all five tests.

## 35.1 Meaning

- What role does it serve?
- What relationship or change does it communicate?
- Would the visitor understand the state without it?

## 35.2 Spatial coherence

- Does it preserve origin and destination?
- Does it maintain spatial memory where appropriate?
- Does Return make sense?
- Does it respect the platform’s directional logic?

## 35.3 Restraint

- Is this the minimum necessary movement?
- Is one motion clearly dominant?
- Would stillness work better?
- Does repeated navigation become more efficient?

## 35.4 Accessibility

- Is reduced-motion parity defined?
- Is focus preserved?
- Is meaning available through non-motion cues?
- Is vestibular risk minimized?

## 35.5 Performance

- Does it remain responsive on representative devices?
- Does it avoid layout instability?
- Can it be interrupted?
- Can nonessential layers degrade cleanly?

---

# 36. Implementation Sequence

Implementation begins only after the Platform Specification and implementation planning confirm component architecture and route behavior.

Claude Code should implement motion in small, testable milestones.

## MOT-01 — Tokens and primitives

Implement duration, easing, distance, recession, and reduced-motion foundations.

Verify consistency and reuse.

## MOT-02 — Local interaction states

Implement hover, focus-visible, press, selected, loading, success, error, and disabled behavior.

Verify keyboard, touch, and reduced-motion parity.

## MOT-03 — Focus and overlay system

Implement reusable Focus + Recession + Return behavior.

Verify focus management, scroll preservation, and modal accessibility.

## MOT-04 — Record passage

Implement index → record → Return within one district.

Verify spatial memory, browser Back, deep links, and rapid navigation.

## MOT-05 — Home threshold prototype

Implement one Home → district → Home transition.

Verify orientation, timing, cancellation, repeated-entry efficiency, reduced motion, and performance before reuse.

## MOT-06 — Sequence, comparison, and trace

Implement one representative pattern for each role.

Verify that motion clarifies rather than obscures relationships.

## MOT-07 — Scroll-linked behavior

Implement section reveals, sticky anchors, and any approved restrained scroll-linked depth behavior.

Verify native scroll integrity.

## MOT-08 — District variation

Apply shared primitives using district emphasis rules.

Verify that districts feel distinct without introducing new motion grammar.

## MOT-09 — Environmental motion

Add environmental animation last.

Verify that it can be disabled entirely without damaging navigation, hierarchy, or identity.

---

# 37. Cross-Domain Contract

This document is now the approved source of truth for platform motion behavior.

It does not redefine:

- district purpose
- information architecture
- static visual hierarchy
- typography
- color
- spacing
- grid
- content ownership
- canonical record rules

Those remain governed by their respective approved documents.

This document translates those systems into temporal behavior.

If future design work requires a motion pattern that contradicts this document, the conflict must be explicitly reviewed and recorded rather than implemented silently.

---

# 38. Approved Decisions

The following decisions are Approved for `ANIMATION_SYSTEM.md v1.0`.

## Approved — Form and change distinction

> **The Design System defines form. The Animation System defines change.**

## Approved — Shared system, different emphasis

All districts use one motion grammar with district-specific emphasis rather than independent animation identities.

## Approved — Motion-role vocabulary

The shared semantic roles are:

**Threshold, Passage, Approach, Focus, Sequence, Comparison, Assembly, Trace, Recession, Return, Confirmation, State Change.**

## Approved — Motion hierarchy

Structural transitions carry more spatial and temporal consequence than local feedback.

## Approved — Spatial memory

Return behavior preserves relevant route, position, selection, lens, comparison, and origin context where technically possible.

## Approved — Repeated-navigation efficiency

First entry may be richer; repeated routes become faster and less ceremonial.

## Approved — Focus through recession

Focus is achieved primarily by reorganizing hierarchy and quieting surrounding context, not by dramatic zoom.

## Approved — Native scrolling

Native browser scrolling is the baseline. Global scroll hijacking is prohibited.

## Approved — Comparison and lineage

Comparison preserves common references; Trace communicates lineage without becoming decorative network animation.

## Approved — Overlay logic

Overlays and modals use Focus + Recession + Return and do not imply a new architectural destination.

## Approved — Artwork/interface distinction

Authored motion belongs to the presented work; interface motion remains subordinate and follows the platform system.

## Approved — Reduced-motion parity

Reduced-motion mode preserves all meaning and interaction while replacing spatial travel with stable state changes.

## Approved — User priority

Navigation, scroll, keyboard, touch, cancellation, and browser history override nonessential animation.

## Approved — Performance hierarchy

Environmental motion is removed before navigational clarity or interaction feedback is compromised.

## Approved — Prohibited spectacle

Bounce, overshoot, page rotation, large global zoom, cinematic fly-through, decorative cursor trails, global scroll hijacking, mandatory intro films, and pervasive kinetic typography are excluded from the platform interface.

---

# 39. Final Motion Statement

The Personal Platform should move as architecture is understood: through threshold, approach, passage, orientation, concentration, comparison, trace, return, and pause.

Motion should reveal relationships that static composition alone cannot fully express, then withdraw once those relationships are understood.

Home carries the strongest sense of spatial passage. Work aligns and resolves. Research unfolds and traces. Lab compares and transforms. Art recedes. Products clarifies and confirms. About sequences and connects.

The visitor should remember where they are, where they came from, what changed, and what deserves attention.

They should not remember the website for its effects.

They should remember a coherent world that moved with purpose.
