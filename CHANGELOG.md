# Changelog

All notable changes to this repository are recorded here. Entries are factual records of what was implemented, not a roadmap.

---

## 2026-08-09 — Governing Documentation Reconciliation

Commit `bb88f62417b9b3f14a92d8c25183d43a19be3be2` — `docs: reconcile governing document names and authority`.

- Restored stable bare canonical filenames for the core governing documents (`PLATFORM_VISION.md`, `INFORMATION_ARCHITECTURE.md`, `ANIMATION_SYSTEM.md`, `PLATFORM_SPECIFICATION.md`, `IMPLEMENTATION_PLAN.md`), each self-identifying its own version/status internally.
- Archived superseded proposals: Platform Vision v0.1, Information Architecture v0.1, Design System v0.1, Animation System proposal.
- Archived Design System v1.0 as superseded by v1.1; removed a redundant v1.1 duplicate left at root.
- Reconciled `docs/GOVERNING_DOCUMENTS.md` to reflect the resulting authority structure.

## 2026-08-09 — Design System v1.1 Final Approval

`DESIGN_SYSTEM.md` closed at v1.1, Approved / Closed, superseding v1.0.

- Approved the identity system: Principles 01–06 (Precision without finality — Resolved objects, Open relationships; Inhabited Threshold; Typographic Voice; Signal; Trace Language; Controlled Exception).
- Approved the governing compositional grammar (controlled asymmetry, concentrated void, shared axes, selective offset, peripheral latency, deliberate density gradients).
- Approved district-expression rules and a reconciled Core System (semantic depth/layer-order/opacity/control models).
- Approved responsive, media, and accessibility boundaries.
- Confirmed the calibrated-token boundary: semantic roles and models are approved; exact numeric values remain implementation-calibrated.
- No unresolved Design-System-level contradiction remains.

## 2026-08-08 — Information Architecture v1.0 Final Approval

`INFORMATION_ARCHITECTURE.md` closed at v1.0, Approved / Closed.

- Approved canonical ownership, district boundaries, and typed directional cross-record relationships.
- Approved the Search/Index distinction and the lenses/filters distinction.
- Approved archive semantics (no separate archive field — represented through `lifecycle: archived`) and the four-dimensional public-inclusion state model.
- Approved the route hierarchy and the minimum shared canonical-record contract.
- Approved navigation requirements and future-growth constraints.
- No unresolved IA-level contradiction remains.

## 2026-08-08 — Platform Vision v1.0 Final Approval

`PLATFORM_VISION.md` closed at v1.0, Approved / Closed.

- Approved the central brand idea (architectural intelligence across disciplines) and the practice as one multidisciplinary design practice.
- Approved professional decision-makers as the primary audience and person-first authorship.
- Approved the curatorial threshold — public presence earned by significance, not completion — and that commerce is integrated but subordinate to practice identity.
- Approved the platform's long-term invariants and governing principles.
- No unresolved Vision-level contradiction remains.

---

## 2026-08-04 — Milestone 1: Foundation correction

Corrected the initial foundation to contain only the technical infrastructure required for the current phase.

### Removed

- Interim `IBM_Plex_Sans` / `IBM_Plex_Mono` font implementation: `next/font/google` imports, font variable configuration, and related comments in `src/app/layout.tsx`.
- Typography token file (`src/styles/tokens/typography.css`) and its import.
- Motion token file (`src/styles/tokens/motion.css`) and its import.
- Responsive grid token file (`src/styles/tokens/grid.css`) and its import.
- `font-size` / `line-height` declarations in `globals.css` that depended on the removed typography tokens.

### Added

- Native system-font stack in `src/app/globals.css` (`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`), replacing the loaded font.
- **Handling Ambiguity** rule in `AGENTS.md`: implementation must stop and ask, rather than silently choose, whenever a specification is incomplete, contradictory, or open to multiple reasonable interpretations — especially when the decision would establish a long-term technical or design convention.
- `PROJECT_STATE.md` and this `CHANGELOG.md`.

### Retained

- Color, Spacing, and Geometry design tokens.
- All seven routes (`/`, `/work`, `/research`, `/lab`, `/art`, `/products`, `/about`), still empty.
- Next.js, TypeScript, ESLint, and Prettier configuration — unchanged.

### Validation

- `npm run format:check` — pass
- `npm run lint` — pass
- `npm run build` — pass, all 7 routes + `/_not-found` compiled and prerendered
- No new dependencies introduced

---

## 2026-08-04 — Milestone 1: Initial foundation

Scaffolded the technical foundation for the Personal Platform.

### Added

- Next.js (App Router) + TypeScript project, via `create-next-app`.
- ESLint (`next/core-web-vitals` + TypeScript) and Prettier, wired together.
- Seven top-level routes with empty layouts and pages: `/`, `/work`, `/research`, `/lab`, `/art`, `/products`, `/about`.
- Initial design-token system: Color, Typography, Spacing, Grid, Geometry, Motion.
- `IBM_Plex_Sans` / `IBM_Plex_Mono` loaded via `next/font/google` as an interim typeface choice.

### Validation

- `npm run lint` — pass
- `npm run build` — pass, all 7 routes compiled and prerendered
