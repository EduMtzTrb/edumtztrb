import type { ReactNode } from "react";

interface CanonicalRecordShellProps {
  /** Record identity/title — the only region every canonical record has today. */
  heading: ReactNode;
  /** Public state (e.g. draft/active/archived) once a content model defines it. */
  publicState?: ReactNode;
  /** Authorship or role attribution, where the owning district requires it. */
  authorship?: ReactNode;
  /** Project/record context (situating information). */
  context?: ReactNode;
  /** The record's primary content or evidence. */
  evidence?: ReactNode;
  /** Structured metadata (dates, classification, etc.). */
  metadata?: ReactNode;
  /** Credits / collaborators / contributing parties. */
  credits?: ReactNode;
  /** Meaningful relationships to other canonical records. */
  relationships?: ReactNode;
  /** Previous/next or other intentional continuation, per CUR-NAV-08. */
  continuation?: ReactNode;
}

/**
 * Canonical record detail (PLATFORM_SPECIFICATION_v1.0.md §6.6): `/work/[entry]`,
 * `/research/[entry]`, `/lab/[entry]`, `/art/[entry]`, `/products/[entry]`,
 * `/about/profile`.
 *
 * Every region beyond `heading` is optional and renders nothing when omitted —
 * no region exists in the DOM, and no ARIA landmark is created, until a future
 * milestone's content model actually supplies it. This is the structural
 * allowance the record shell owes future content, without inventing any now.
 *
 * Visual role: Display (DESIGN_SYSTEM.md v1.1 §7.1 — "major record anchors"
 * is explicitly listed as Display Voice purpose).
 */
export function CanonicalRecordShell({
  heading,
  publicState,
  authorship,
  context,
  evidence,
  metadata,
  credits,
  relationships,
  continuation,
}: CanonicalRecordShellProps) {
  return (
    <main data-page-type="canonical-record">
      <header>
        <h1 className="type-display">{heading}</h1>
        {publicState !== undefined && <p data-region="public-state">{publicState}</p>}
        {authorship !== undefined && <p data-region="authorship">{authorship}</p>}
      </header>
      {context !== undefined && (
        <section aria-label="Context" data-region="context">
          {context}
        </section>
      )}
      {evidence !== undefined && (
        <section aria-label="Evidence" data-region="evidence">
          {evidence}
        </section>
      )}
      {metadata !== undefined && (
        <section aria-label="Metadata" data-region="metadata">
          {metadata}
        </section>
      )}
      {relationships !== undefined && (
        <section aria-label="Relationships" data-region="relationships">
          {relationships}
        </section>
      )}
      {credits !== undefined && (
        <section aria-label="Credits" data-region="credits">
          {credits}
        </section>
      )}
      {continuation !== undefined && (
        <nav aria-label="Continuation" data-region="continuation">
          {continuation}
        </nav>
      )}
    </main>
  );
}
