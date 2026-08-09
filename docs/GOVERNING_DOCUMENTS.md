# Governing Documents — Source of Truth Index

**Purpose:** answer one question — *which documents currently govern implementation?*

This file is a map. It does not restate or duplicate the content of any specification. Each document's own internal header (title, version, status) is the actual source of truth for its own authority; this index only tells you where to find the current one.

Last reconciled: 2026-08-09 (Documentation Inventory, Canonical Naming Audit, and Cleanup).

---

## Active — Approved

These are the documents implementation must currently follow.

| Document | Version | Status | Role | Active path |
|---|---|---|---|---|
| Project Instructions | — | Approved (foundational) | Original governing brief for the whole platform; item 1 in the Implementation Plan's governing source set | `Project Instructions.txt` |
| Platform Vision | 1.0 | Approved (8 August 2026) | Philosophy, identity, positioning, audience, experience goals, design principles, curatorial boundaries, long-term evolution | `PLATFORM_VISION.md` |
| Information Architecture | 1.0 | Approved / Closed (8 August 2026) | Routes, hierarchy, navigation, canonical ownership, record relationships, discovery, categorization | `INFORMATION_ARCHITECTURE.md` |
| Universe Specification Set (7 districts: Home, Work, Research, Lab, Art, Products, About) | 1.1 | Approved (2026-08-06) | District identity, atmosphere, homepage, navigation, and boundaries for each district | `docs/universes/*_UNIVERSE_v1.1.md` (see `docs/universes/README.md`) |
| Cross-Universe System Requirements | 1.0 | Approved (2026-08-06) | Shared obligations extracted across all seven districts | `docs/systems/CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md` |
| Design System | 1.1 | Approved / Closed (2026-08-09) | Shared visual and identity system: identity principles, typography, spacing, grid, color, linework, components, motion touchpoints, accessibility, responsive rules, compositional grammar | `DESIGN_SYSTEM.md` |
| Animation System | 1.0 | Approved | How the platform moves: motion roles, Focus, overlay, Return, spatial memory, reduced motion | `ANIMATION_SYSTEM.md` |
| Platform Specification | 1.0 | Approved (2026-08-07) | Single implementation-facing operational specification consolidating all approved sources into one system | `PLATFORM_SPECIFICATION.md` |
| Implementation Plan | 1.0 | Approved (2026-08-07) | Build order: nine gated milestones, work packages, acceptance criteria | `IMPLEMENTATION_PLAN.md` |

**Governing order** (per `IMPLEMENTATION_PLAN.md` §2.1 — later documents translate execution sequence, they do not overrule the meaning of earlier ones): Project Instructions → Platform Vision → Information Architecture → Universe Specification Set → Cross-Universe System Requirements → Design System → Animation System → Platform Specification → Implementation Plan.

Every link in this chain is now Active — Approved. The previous "Unresolved" status of Platform Vision and Information Architecture (recorded 2026-08-07 in Task M1.1A) is resolved: both now exist at Version 1.0, Approved, at their canonical bare filenames.

---

## Superseded — Archived

Preserved for history. Do not treat as authoritative.

| Document | Version | Superseded by | Archived path |
|---|---|---|---|
| Platform Vision (proposal) | 0.1 | `PLATFORM_VISION.md` (v1.0) | `docs/archive/proposals/PLATFORM_VISION_v0.1_PROPOSAL.md` |
| Information Architecture (proposal) | 0.1 | `INFORMATION_ARCHITECTURE.md` (v1.0) | `docs/archive/proposals/INFORMATION_ARCHITECTURE_v0.1_PROPOSAL.md` |
| Design System (proposal) | 0.1 | `DESIGN_SYSTEM.md` (v1.1) | `docs/archive/proposals/DESIGN_SYSTEM_v0.1_PROPOSAL.md` |
| Design System | 1.0 | `DESIGN_SYSTEM.md` (v1.1) | `docs/archive/superseded/DESIGN_SYSTEM_v1.0.md` |
| Animation System (proposal) | 0.1 (unversioned in header) | `ANIMATION_SYSTEM.md` | `docs/archive/proposals/ANIMATION_SYSTEM_v0.1_PROPOSAL.md` |
| Universe Specification Set (pre-versioned drafts) | pre-versioned | `docs/universes/*_UNIVERSE_v1.1.md` | `docs/archive/universes/pre-versioned/` |
| Universe Specification Set | 1.0 | `docs/universes/*_UNIVERSE_v1.1.md` | `docs/archive/universes/v1.0/` |
| Universe merge-history drafts and Claude review notes | v1.1 drafts | `docs/universes/*_UNIVERSE_v1.1.md` | `docs/archive/universes/merge-history/`, `docs/archive/universes/reviews/` |

---

## Naming convention

Two distinct, deliberate canonical-naming conventions coexist in this repository, each with its own documented evidence:

1. **Core upstream governing documents** (Project Instructions, Platform Vision, Information Architecture, Design System, Animation System, Cross-Universe System Requirements, Platform Specification, Implementation Plan) use a **stable bare filename**, with version and status recorded inside the document header. This is the convention each of these documents uses to cite itself and every other document in this set (e.g. `IMPLEMENTATION_PLAN.md` §2.1 cites `PLATFORM_VISION.md v1.0`, `DESIGN_SYSTEM.md v1.0`, and its own identity as `IMPLEMENTATION_PLAN.md v1.0` — all bare names, version stated separately).
2. **The seven district Universe documents** use a **version-suffixed active filename** (`HOME_UNIVERSE_v1.1.md`, not `HOME_UNIVERSE.md`). This is separately and explicitly declared in `docs/universes/README.md` ("Current files") and `docs/archive/universes/ARCHIVE_INDEX.md`, and is not disturbed by this reconciliation — it is that set's own established, intentional policy.

Do not force either convention onto the other document set.

---

## Supporting (not governing specifications)

| Document | Role |
|---|---|
| `TECHNICAL_ARCHITECTURE.md` | Engineering philosophy/principles; no version or approval header found |
| `PROJECT_STATE.md` | Running record of what is actually implemented (not a plan or spec) |
| `CHANGELOG.md` | Factual record of completed changes |
| `README.md` | Project overview and setup instructions |
| `AGENTS.md` / `CLAUDE.md` | Agent operating instructions for implementation work |

---

## Implementation reports (historical)

Dated audit/milestone records in `docs/implementation/`. Each reflects the repository state *at the time it was written* — including citations to filenames that were canonical then but have since been renamed by later reconciliation. These are historical records, not live pointers; consult this index, not an implementation report, for the current canonical path of a governing document.

---

## How to use this index

1. Need to know a shared visual rule or the identity system? Read `DESIGN_SYSTEM.md`.
2. Need to know how something should move or transition? Read `ANIMATION_SYSTEM.md`.
3. Need the full operational picture of the platform? Read `PLATFORM_SPECIFICATION.md`.
4. Need to know what to build next and in what order? Read `IMPLEMENTATION_PLAN.md`.
5. Need a district's own identity and rules? Read the matching file in `docs/universes/` (version-suffixed).
6. Need the platform's founding philosophy or its route/ownership model? Read `PLATFORM_VISION.md` or `INFORMATION_ARCHITECTURE.md`.
7. If a document is not listed under **Active — Approved** above, do not treat it as authoritative, even if its filename looks current.
