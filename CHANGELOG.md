# Changelog

All notable changes to this repository are recorded here. Entries are factual records of what was implemented, not a roadmap.

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
