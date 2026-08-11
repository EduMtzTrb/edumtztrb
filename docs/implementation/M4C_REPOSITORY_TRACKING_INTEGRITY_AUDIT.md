# Repository Tracking Integrity — Audit (pre-M4-C-re-review)

## Status

**Repository Tracking Integrity — Reconciled / Verified.** The original diagnosis below (a clean checkout of HEAD `94e3cdd`/`8e4712e` failed to build) is preserved verbatim and unedited — do not read the reconciliation as erasing that failure; it happened, was real, and is the reason this document exists. See **Reconciliation Result**, at the end of this document, for what was repaired, exactly which commits repaired it, and the fresh clean-checkout evidence proving the repair holds.

This is a diagnostic-then-reconciliation document, not an implementation-milestone report. It does not belong to any M-numbered work package and does not gate M4.9, M4-C, or Gate M4 — it exists because the finding was discovered *during* a pre-review integrity pass on M4.9 and must be recorded truthfully rather than silently worked around.

## Summary

A clean, isolated Git worktree checked out at HEAD (`94e3cdd` at the time of this audit) **fails to build**. `src/app/layout.tsx` (tracked) imports `AppShell` from `src/components/shell/AppShell.tsx` (tracked as of this session's own M4.9 calibration commit), which in turn imports `GlobalNav` from `src/components/shell/GlobalNav.tsx` — a file that has **never been committed to this repository's Git history**, despite being live, load-bearing, referenced-by-tracked-code application infrastructure. `next build` on the clean checkout fails with `Module not found: Can't resolve './GlobalNav'`.

This is not a dirty-worktree artifact and not something this session introduced — `GlobalNav.tsx` predates this entire session. It was never previously exposed because no work package prior to this M4.9 calibration ever needed to *modify* `AppShell.tsx` (which is what finally required committing `AppShell.tsx` itself, incidentally surfacing that its own sibling, `GlobalNav.tsx`, was never committed either).

The gap is substantially larger than these two files — see **Exact Inventory**, below.

## Method

1. `git worktree add --detach <temp-path> HEAD` — an isolated, clean checkout of the current working tree's actual HEAD commit, created **without modifying, stashing, or touching the real working tree** in any way.
2. Confirmed the worktree was genuinely clean (`git status` → "nothing to commit, working tree clean") and that the known gaps were genuinely absent from it (`GlobalNav.tsx`, `vitest.config.mts`, `src/app/work/selected/page.tsx` all confirmed missing from the worktree's filesystem).
3. `npm install` in the worktree — succeeded (348 packages, 0 vulnerabilities), using the **committed** `package.json`/`package-lock.json`, not the working tree's own (modified) versions.
4. `npx next build` in the worktree — **failed**, with the exact `Module not found: Can't resolve './GlobalNav'` error quoted above.
5. `npx tsc --noEmit` in the worktree — failed independently and for an additional reason: `Cannot find module 'vitest'` / `'@testing-library/react'` across every `*.test.tsx` file, because the **committed** `package.json` predates the entire testing infrastructure (no `vitest`, `@testing-library/*`, `jsdom`, or `vite-tsconfig-paths` in its `devDependencies`; no `typecheck`/`test`/`test:run` scripts at all — see **Package Metadata Finding**, below). A smaller, separate set of `Cannot find name 'PageProps'`/`'LayoutProps'` errors is a normal, expected consequence of `tsc` running before any `next build`/`next dev` has generated Next's own route-type declarations (`.next/types/**`, gitignored by design) — not itself a tracking defect.
6. The worktree was removed (`git worktree remove --force`) immediately after verification. The real working tree's `git status` was re-checked immediately before and after and found identical (no leakage, nothing left behind).

This experiment was **not** repeated for this second audit pass — the user's own instructions correctly noted the finding was already established and did not need re-verification.

## Exact Inventory

### 1. Tracked normally

391 files at the time of the original audit (396 as of this pass, +5 net from this session's own calibration commit adding `WorldTrace.tsx`/`.test.tsx`, `AppShell.tsx`/`.test.tsx`, and `m4c-world-trace-journey.test.tsx`, minus none removed). The overwhelming majority of the repository — all domain logic (`src/domain/`), all design-system components with a committed sibling test, all M3-era route resolvers, classification/relationship/lifecycle models, and most `src/app/**` leaf pages for About specifically (all 8 About routes are fully tracked, unlike the other five districts — see below).

### 2. Modified tracked

| File | Nature |
|---|---|
| `README.md` | Pre-existing, unrelated to this task |
| `package.json` | **Materially stale** — see **Package Metadata Finding** |
| `package-lock.json` | **Materially stale**, ~2541 lines of diff — see **Package Metadata Finding** |
| `src/app/art/page.tsx` | Pre-existing, unrelated — adds `DistrictOverviewShell` (currently just `<main></main>` in HEAD) |
| `src/app/lab/page.tsx` | Same pattern, pre-existing, unrelated |
| `src/app/products/page.tsx` | Same pattern, pre-existing, unrelated |
| `src/app/research/page.tsx` | Same pattern, pre-existing, unrelated |

None of these were touched by any M4.9 work this session or last. All predate the M4.9 calibration and remain exactly as found.

### 3. Deleted tracked

`ABOUT_UNIVERSE.md`, `ART_UNIVERSE.md`, `HOME_UNIVERSE.md`, `LAB_UNIVERSE.md`, `PRODUCTS_UNIVERSE.md`, `RESEARCH_UNIVERSE.md`, `WORK_UNIVERSE.md` — seven root-level files, apparently superseded by the untracked `docs/universes/*_UNIVERSE_v1.1.md` and `docs/archive/universes/**` structure (see category 6). Pre-existing, unrelated to M4.9.

### 4. Untracked but required by committed runtime/build

| File | Required by (tracked) | Consequence if absent |
|---|---|---|
| `src/components/shell/GlobalNav.tsx` | `src/components/shell/AppShell.tsx` (`import { GlobalNav } from "./GlobalNav"`) | **`next build` fails outright** — confirmed empirically |

This is the only file in the entire inventory that blocks the build itself on a clean checkout. Everything else in this table is a "the app runs but a specific route/feature is broken or absent" gap, not a "nothing builds" gap.

### 5. Untracked but required by tests/tooling

| File | Required by | Consequence if absent |
|---|---|---|
| `vitest.config.mts` | `npm run test`/`test:run` (the config vitest itself reads — aliases, jsdom environment, `setupFiles`) | Every test command fails to run meaningfully without it |
| `vitest.setup.ts` | Referenced directly inside `vitest.config.mts`'s own `setupFiles` array | Same as above |
| `src/components/shell/GlobalNav.test.tsx` | Only meaningful once `GlobalNav.tsx` (category 4) exists | Would fail to even import on a clean checkout |
| `tests/routes/route-shell-wiring.test.tsx` *(tracked)* → imports untracked `@/app/work/selected/page` and `@/app/research/publications/page` | — | A **tracked test file** fails on a clean checkout because it imports **untracked** source files — confirms the gap is not confined to `src/components/shell/` |
| `src/components/shell/DistrictNav.test.tsx` *(tracked)* → asserts against `/work/selected`, `/research/publications`, `/lab/active`, etc. as real destination hrefs | — | Assertions about href *values* still pass (no import needed), but the destinations themselves 404 on a clean checkout |
| `tests/routes/accessibility-smoke.test.tsx` *(untracked itself)* → imports tracked `AppShell` | — | Would fail to import `AppShell` → `GlobalNav` transitively |
| `tests/routes/route-contract.test.ts` *(untracked itself)* | Reads the filesystem directly (`node:fs`), no source imports | Lower risk, but its own assertions likely encode expectations about files this same inventory shows are untracked |
| `.nvmrc` (`22.13.1`), `.npmrc` (`engine-strict=true`) | Not import-required by anything, but the working tree's own (uncommitted) `package.json` adds a matching `engines` field — these three are a self-consistent, currently-uncommitted trio pinning the exact Node/npm version this project depends on | Absent from a clean checkout, `engine-strict` enforcement silently does not apply |

### 6. Untracked but required by committed application code as real, linked navigation destinations (functional, not build-blocking)

`districtNavigation.ts` (tracked, M3.8) renders real `<a href>` links to all fifteen of these routes as genuine `DistrictNav` destinations. None of these block `next build` or `tsc` — Next.js discovers routes by file presence, so a missing `page.tsx` simply 404s at runtime rather than failing the build — but they are functionally required for M3.8's own already-reported "District Navigation: Complete / Verified" claim to be true on a clean checkout:

`src/app/work/selected/page.tsx`, `src/app/research/current/page.tsx`, `src/app/research/publications/page.tsx`, `src/app/research/writing/page.tsx`, `src/app/research/talks/page.tsx`, `src/app/lab/active/page.tsx`, `src/app/lab/prototypes/page.tsx`, `src/app/lab/tools/page.tsx`, `src/app/lab/studies/page.tsx`, `src/app/art/selected/page.tsx`, `src/app/art/exhibitions/page.tsx`, `src/app/products/featured/page.tsx`, `src/app/products/digital/page.tsx`, `src/app/products/physical/page.tsx`, `src/app/products/services/page.tsx` (15 files)

Plus three untracked utility-route layouts that are not linked-to by other tracked code but are part of the same M1.3-era route-skeleton batch, self-contained (only `next/font`/metadata, no cross-file imports either direction):

`src/app/contact/layout.tsx`, `src/app/index/layout.tsx`, `src/app/search/layout.tsx`

All 18 of these files share near-identical filesystem timestamps (2026-08-07, within about a minute of each other) — a single batch-scaffolding event, not files added incrementally across the M3.8–M4.10 window. They are the reason the true, current, working-directory route count (54 build-table entries, 53 application routes) already exceeded the "53"/"34 static" figure every M4-series report copy-forwarded as "unchanged" — see the M4-C reconciliation doc's own corrected route-count section. That documentation drift, now corrected, is a direct symptom of this same tracking gap: nobody could `git diff` these files' history because they have none.

### 7. Untracked documentation only

`docs/implementation/M1.1_REPOSITORY_AUDIT.md`, `M1.1A_GOVERNING_DOCUMENTATION_RECONCILIATION.md`, `M1.2_ENVIRONMENT_BASELINE.md`, `M1.3_ROUTE_SKELETON.md`, `M1.4_SHARED_APPLICATION_SHELL.md`, `M1.5_SEMANTIC_PAGE_SHELLS.md`, `M1.6_TESTING_BASELINE.md`, `M2.1_TOKEN_FOUNDATION.md` (8 files — every Milestone-1 and the first Milestone-2 implementation report); `docs/universes/*_v1.1.md` (7 files) plus `docs/universes/README.md`; `docs/archive/universes/**` (25 files across `merge-history/`, `pre-versioned/`, `reviews/`, `v1.0/`); `docs/systems/CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md`.

None of these affect build, typecheck, or test outcomes — they are pure prose. Their absence from Git history is nonetheless notable: `PROJECT_STATE.md` (tracked, and itself the single source of truth this whole project reports against) directly cites `M1.1_REPOSITORY_AUDIT.md` through `M1.6_TESTING_BASELINE.md` as the evidentiary basis for Gate M1 having been met — none of that evidence is actually in Git.

### 8. Unrelated local/user work — none identified beyond what's already listed above

No stray editor/IDE files, no `.env`/credential-shaped files, no personal scratch files were found in the untracked set. Every untracked path traces to a legitimate, explainable prior implementation gap (categories 4–7), not incidental local clutter. `.npmrc`/`.nvmrc` (category 5) are the closest thing to "environment-local" but are themselves clearly intentional project configuration, not personal files.

### 9. Generated/ignorable

None found in the untracked set. `.next/`, `coverage/`, `node_modules/` are all correctly gitignored and did not appear in `git status`.

## Package Metadata Finding

`git diff HEAD -- package.json` (2541-line-equivalent scope reflected proportionally in `package-lock.json`) shows the **committed** `package.json` is missing, relative to the working tree's own copy:

- The `engines` field (`node >=22.13.1 <23.0.0`, `npm >=10.9.2 <11.0.0`) — the field `.nvmrc`/`.npmrc` (category 5) exist to support.
- The `typecheck`, `test`, and `test:run` scripts entirely.
- Every testing devDependency: `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/react`, `@vitejs/plugin-react`, `jsdom`, `vite-tsconfig-paths`, `vitest`.

`package-lock.json` mirrors this gap exactly and consistently (`npm install` against the committed pair succeeded cleanly, which confirms committed `package.json` and committed `package-lock.json` are mutually consistent with **each other** — the drift is entirely between "committed" and "current working," not an internal inconsistency in either file alone).

This is the direct, root cause of the `tsc`/vitest-related failures observed in the clean-worktree experiment: the committed dependency set genuinely does not include the testing stack at all. `M1.6 — Testing Baseline` (`docs/implementation/M1.6_TESTING_BASELINE.md`, itself untracked — category 7) is the implementation report that presumably introduced this stack; it was, like the file it describes, apparently never committed.

## Recommended Remediation Strategy

Per the task's own explicit instruction, no historical reconstruction was executed as part of this audit. Assessing the three offered options directly:

- **(A) One repository-baseline reconciliation commit** — not recommended. The untracked set spans nine milestones' worth of genuinely different work (M1.3 route skeleton, M1.4 shell, M1.6 testing infrastructure, M2.1 token-foundation doc, M3.8-era grouping routes, plus the deleted/superseded `*_UNIVERSE.md` root files and their `docs/universes`/`docs/archive/universes` replacements). Squashing all of it into one commit would misrepresent this project's own carefully-maintained one-work-package-per-commit discipline and would make any future `git bisect`/`git blame` across this range meaningless.
- **(B) Several historically grouped reconciliation commits** — **recommended**, and appears tractable: the natural groupings are already visible in this inventory (Category 4+5's runtime/tooling gap as one commit — `GlobalNav.tsx`, `vitest.config.mts`, `vitest.setup.ts`, `.nvmrc`, `.npmrc`, the corrected `package.json`/`package-lock.json`, plus their own already-tracked test files' newly-passing status; Category 6's fifteen grouping-route pages plus three utility layouts as a second, M3.8-labeled commit; Category 7's documentation as a third, low-risk commit; the seven deleted `*_UNIVERSE.md` files plus their `docs/universes`/`docs/archive/universes` replacement as a fourth, since that's a genuine rename/restructure, not an addition). None of these groups depends on another to be individually coherent.
- **(C) Requires user decision because unrelated/local work is intermingled** — not the primary blocker here (category 8 found nothing genuinely unrelated), but the user should still decide the **commit dates/authorship/ordering** question directly: these files' real history (who wrote them, in what order, relative to the M1–M3 commits that already exist) cannot be reconstructed from the working tree alone, and committing them "fresh" today would misdate work that is, in truth, weeks old relative to the visible commit log's own five-commit M3-A tail.

**Default expectation, followed here:** diagnose now (this document), repair in a separate, dedicated repository-integrity task before Gate M4 closure — not mixed into this M4.9 scope-correction commit. This audit recommends option **(B)**, grouped substantially as described above, as a distinct next task the user should explicitly schedule.

---

# Reconciliation Result

The dedicated task recommended above ran, independently re-auditing the working tree before repairing anything rather than trusting this document's own findings unquestioned. Every root cause below was independently re-confirmed, not merely copy-forwarded.

## Root causes, re-confirmed

- **`GlobalNav.tsx`** — confirmed the exact, sole build-blocking gap: tracked `AppShell.tsx` imports it directly; `next build` on a clean checkout fails with `Module not found: Can't resolve './GlobalNav'` until it exists.
- **`vitest.config.mts`/`vitest.setup.ts`** and the testing devDependencies gap in `package.json`/`package-lock.json` — confirmed version-for-version against `node_modules` (every declared version in the working tree's `package.json` matched what was actually installed and passing the full suite, with zero drift), then committed faithfully as-is — no dependency upgraded, no opportunistic modernization.
- **Fifteen grouping-route pages and three utility layouts** — cross-verified two ways: (1) `docs/implementation/M1.3_ROUTE_SKELETON.md` (itself part of this reconciliation) explicitly lists each one as its own deliverable; (2) `tests/routes/route-contract.test.ts` (itself part of this reconciliation), a route list transcribed independently from `PLATFORM_SPECIFICATION_v1.0.md` §5 rather than derived by scanning `src/app`, asserts exactly 53 approved routes and that every one has a `page.tsx` — already true in the working directory, now provable from a clean checkout.
- **Universe document relocation** — confirmed as a *completed, already-committed-in-intent* reconciliation: `docs/GOVERNING_DOCUMENTS.md` (tracked since commit `bb88f62`, 61 commits before this repair) already declared `docs/universes/*_UNIVERSE_v1.1.md` as the active path and the root `*_UNIVERSE.md` files as "Superseded — Archived," pointing at `docs/archive/universes/`. Only the actual file move had never been committed. Git's own rename detection confirmed this at a content level — it detected the root-file deletions and the `docs/archive/universes/pre-versioned/` additions as 100% renames, not new content.
- **`docs/systems/CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md`** and the eight M1.1–M2.1 implementation reports — the same class of gap: already-declared-canonical (the former in the same committed `GOVERNING_DOCUMENTS.md` table; the latter cited directly by already-tracked `PROJECT_STATE.md` as Gate M1's own evidentiary basis) but never actually committed.
- **One further gap found only during this reconciliation's own clean-checkout verification, not present in the original audit**: no `.gitattributes` file existed, so a fresh checkout on a machine with `core.autocrlf=true` (this machine's setting) silently converted every text file to CRLF, failing `npm run format:check` even though the repository's actual stored content was correctly LF-only throughout and `.prettierrc.json` already declared `"endOfLine": "lf"`. This was not visible in the original audit because that audit's clean-checkout test stopped at the build failure and never reached a format check. Closed with one `.gitattributes` file (`* text=auto eol=lf`) — no existing blob content changed, only future-checkout behavior.

## Files/groups reconciled

Four commits, in order, none rewriting or amending any prior history:

1. **`3899016` — `chore: reconcile runtime and test baseline`** — `GlobalNav.tsx`/`.test.tsx`, `vitest.config.mts`, `vitest.setup.ts`, `tests/routes/accessibility-smoke.test.tsx`, `.nvmrc`, `.npmrc`, `package.json`, `package-lock.json`, `README.md` (rewritten to describe this same tooling).
2. **`58a4954` — `chore: reconcile navigation route baseline`** — the 15 grouping-route pages, 3 utility layouts, `tests/routes/route-contract.test.ts`, and 4 modified (not new) district `page.tsx` files completing an already-tracked shell pattern.
3. **`5b8ad60` — `docs: reconcile repository documentation baseline`** — the Universe-document relocation (7 root files → `docs/archive/universes/pre-versioned/`, plus `docs/universes/`, `docs/archive/universes/{merge-history,reviews,v1.0}/`, `docs/archive/universes/ARCHIVE_INDEX.md`), `docs/systems/CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md`, and the 8 M1.1–M2.1 implementation reports.
4. **`eb24f28` — `chore: enforce lf line endings via .gitattributes`** — the one file addition that closed the line-ending gap found during this reconciliation's own verification pass.

## Dependency reconciliation

Faithful commit, not modernization: every `devDependencies`/`dependencies` entry, every script, and the `engines` field committed exactly matches what was already installed in `node_modules` and already passing the full 1322-test suite before this reconciliation began (verified by direct version comparison, not assumed). `npm ci` from the new clean HEAD installs 445 packages with 0 vulnerabilities — the same effective dependency graph, now reproducible from a fresh checkout via the stronger `npm ci` standard rather than the looser `npm install`.

## Route reconciliation

Exactly the 15 grouping-route pages and 3 utility layouts identified in the original audit's Category 6 were committed — no more, no fewer. `tests/routes/route-contract.test.ts` (now itself tracked) independently confirms exactly 53 approved application routes exist, matching `PLATFORM_SPECIFICATION_v1.0.md` §5 precisely, with no unapproved/missing/renamed route file. No new route was created by this reconciliation.

## Documentation reconciliation

The Universe-document relocation was committed as the truthful move `docs/GOVERNING_DOCUMENTS.md` already declared complete — Git's own rename detection confirms the content is unchanged, only relocated. No Universe document was redesigned, re-versioned, or edited. `docs/GOVERNING_DOCUMENTS.md`'s own governing-reference table now matches the actual committed filesystem for the first time.

## Clean-checkout verification

Method: `git worktree add --detach <temp-path> HEAD`, isolated from and never touching the real working tree, removed immediately after each verification pass (used twice — once before the `.gitattributes` fix, once after, since the first pass surfaced the line-ending gap).

Final clean-checkout results, from HEAD `eb24f28`:

| Step | Result |
|---|---|
| `git status` (before install) | Clean, matches new committed HEAD exactly; none of the previously-missing files present as untracked (they're now tracked) |
| `npm ci` | Pass — 445 packages, 0 vulnerabilities |
| `npm run format:check` | Pass (only after `.gitattributes`; failed on 350 files before it, for the CRLF reason above — not hidden, see **Root causes** above) |
| `npm run lint` | Pass — 0 errors, 15 pre-existing, unrelated warnings |
| `npm run build` (run before a standalone `tsc --noEmit`, generating Next's own ambient route types) | Pass |
| `npx tsc --noEmit` (standalone, re-run after the build above) | Pass — 0 errors. Run *before* any build/dev in a truly pristine checkout, it shows `Cannot find name 'PageProps'/'LayoutProps'` errors — this is Next.js's own ambient-type generation (`.next/types/**`, correctly gitignored, never meant to be committed) not yet existing, not a tracking defect; `npm run build` generates it internally and succeeds regardless of ordering. |
| `npm run test:run` | Pass — **1322/1322 tests, 148/148 files** |
| Route architecture | **54 build-table entries** (53 application routes + 1 framework-generated `/_not-found`), **35 static / 19 dynamic** |

Every number matches the pre-reconciliation working-directory baseline exactly — nothing changed except that it is now reproducible from Git alone.

## Remaining unrelated local state

None. Re-auditing `git status` after all four commits shows a fully clean working tree — every path that existed before this reconciliation is now either committed (if it was load-bearing/governing) or was already absent. No genuinely unrelated user/local work was found at any point in this reconciliation (Category G/8 in both audits independently found nothing).

## Gate M4 Closure Recheck

During Gate M4's own formal closure task, this repository's reproducibility was rechecked once more (a lightweight confirmation, not a repeat of the full historical audit above): a fresh, isolated `git worktree` at the then-current HEAD (`588a04b`) ran `npm ci` → `format:check` → `lint` → `build` → `tsc --noEmit` → `test:run`, all passing with the same totals recorded in **Clean-checkout verification**, above (1322/1322 tests, 148/148 files, 0 lint errors, 54 route-table entries, 35 static / 19 dynamic). Reproducibility held. This blocker is now formally cleared for Gate M4 — see `docs/implementation/M4C_REPRESENTATIVE_MOTION_PROTOTYPES_RECONCILIATION.md`'s own "Gate M4 Closure" and `PROJECT_STATE.md` for the formal closure record.

## Status

**Repository Tracking Integrity — Reconciled / Verified.**
