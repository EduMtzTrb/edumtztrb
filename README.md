# Personal Platform

Next.js (App Router) + TypeScript application.

This is the implementation repository for the Personal Platform. It is currently in Milestone 1 — Foundation. See `PROJECT_STATE.md` for what is actually implemented and `docs/GOVERNING_DOCUMENTS.md` for the current source-of-truth index.

## Prerequisites

- **Node.js** `22.13.1` (pinned in `.nvmrc`; enforced as `>=22.13.1 <23.0.0` via `engines` in `package.json`). If you use `nvm`, run `nvm use` in the repository root.
- **npm** `10.9.2` or later within `10.x` (enforced as `>=10.9.2 <11.0.0` via `engines`). npm is the only supported package manager for this repository — do not use yarn, pnpm, or bun; only `package-lock.json` is committed and kept consistent.

`.npmrc` sets `engine-strict=true`, so `npm install`/`npm ci` will fail fast if your Node or npm version falls outside the ranges above, instead of producing a build that only works by accident.

## Install

```bash
npm ci
```

Use `npm ci` (not `npm install`) for a reproducible install from `package-lock.json` — this is what should be used in a fresh clone and is the command validated for this baseline. Use `npm install` only when intentionally changing dependencies, and commit the resulting `package-lock.json` change.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server (Turbopack), at `http://localhost:3000` |
| `npm run build` | Production build (also runs the TypeScript check as part of the build) |
| `npm run start` | Serve a previously built production build (`npm run build` first) |
| `npm run lint` | Lint the codebase (ESLint) |
| `npm run format` | Auto-format the codebase (Prettier) |
| `npm run format:check` | Verify formatting without writing changes (Prettier) |
| `npm run typecheck` | Standalone TypeScript check (`tsc --noEmit`), independent of `next build` |
| `npm test` | Run the test suite in watch mode (Vitest) |
| `npm run test:run` | Run the test suite once and exit (Vitest) — use this in CI/validation |

See `docs/implementation/M1.6_TESTING_BASELINE.md` for the testing strategy and what is (and isn't) covered at this stage.

## Environment variables

No environment variables are required to install, build, or run this repository at this stage — no `.env.example` file exists because none is needed yet. `.gitignore` already excludes `.env*` from version control.

If and when a work package introduces the first real environment variable, follow this convention:

- Add it to a new `.env.example` (committed) with a placeholder, non-secret value and a one-line comment explaining what it's for.
- Real values go in `.env.local` (already git-ignored), never committed.
- Only prefix a variable `NEXT_PUBLIC_` if it is genuinely safe to ship to the browser; server-only values must not use that prefix.
- Do not add a variable speculatively — it must be required by an already-approved governing document at the time it's introduced.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- Project-specific documentation: `docs/GOVERNING_DOCUMENTS.md`, `PROJECT_STATE.md`, `IMPLEMENTATION_PLAN.md`
