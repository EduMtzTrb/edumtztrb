<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Handling Ambiguity

When a specification is:

- incomplete
- contradictory
- open to multiple reasonable interpretations

Do not choose one yourself.

Stop.

Explain:

- the ambiguity
- the affected specification
- the possible implementation options

Recommend one option if appropriate.

Wait for approval whenever the decision would establish a long-term technical or design convention.

Implementation must never silently establish project standards.
