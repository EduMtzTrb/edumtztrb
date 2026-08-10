/**
 * Universal Canonical-Record Contract — M3.1.
 *
 * Authority: IMPLEMENTATION_PLAN.md §7 (M3.1 — exact field list quoted in
 * this module's own sections below); INFORMATION_ARCHITECTURE.md §14
 * ("Minimum Shared Canonical Record Contract" — the section this module
 * implements almost verbatim), §4 (Canonical Ownership), §5 (Cross-District
 * Relationship Model), §6 (Public Inclusion and State Model), §13.3
 * (Content type); CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md §8.1 (Universal
 * obligations). See docs/implementation/M3.1_UNIVERSAL_CANONICAL_RECORD_CONTRACT.md
 * for the full audit, boundary reasoning, and provenance of every field.
 *
 * THIS IS A DATA CONTRACT, NOT A DATABASE SCHEMA OR CMS SPECIFICATION
 * (IA §14: "It is not a database schema, CMS specification, or mandatory
 * visual template"). Schema technology is an implementation choice
 * (IMPLEMENTATION_PLAN.md's own words) — this module uses TypeScript types
 * only, no runtime validation library, no new dependency. See the
 * implementation report's "Validation Strategy" for why.
 *
 * NOT SERIALIZABLE-UNSAFE: every type below is a plain, JSON-serializable
 * shape — no ReactNode, no function, no class instance, no DOM/browser
 * object anywhere. M2.7–M2.11's presentation components are never
 * imported here; this module has zero dependency on `src/components`.
 *
 * SCOPE BOUNDARY — this module owns ONLY the fields IMPLEMENTATION_PLAN.md
 * §7 lists for M3.1. It deliberately does NOT implement:
 *   - District-specific extension fields (M3.2 — "District extensions")
 *   - Canonical route construction/resolution (M3.3 — "Canonical-route
 *     resolver"); this module stores `slug` only, never a computed URL
 *   - The full controlled-vocabulary classification model (M3.4 —
 *     "Classification model"); `disciplines`/`themes` here are loose
 *     string arrays, a capability slot, not a constrained taxonomy
 *   - The full relationship model's presentation semantics (M3.5 —
 *     "Relationship model"); this module stores typed, directional
 *     references only, using the already-approved v1.0 vocabulary
 *     (IA §5.3), never a derived visible label
 *   - The full lifecycle/archive model (M3.6 — "Lifecycle and archive
 *     model"); this module stores the three IA-approved state dimensions
 *     it owns (curatorial inclusion, visibility, lifecycle) and
 *     deliberately excludes the fourth (domain-specific state), which
 *     belongs to each district's own M3.2 extension
 * See the implementation report's per-boundary sections for the full
 * reasoning behind each of these exclusions.
 */

// ---------------------------------------------------------------------
// Identity — IA §14.1: "stable ID... independent of title or route
// presentation" and "slug... public route identifier." Branded string
// types (a zero-dependency TypeScript technique) make it a compile error
// to pass a slug where an ID is expected or vice versa — directly
// encoding the IA's own distinction between the two concepts, per this
// task's own "do not silently make slug the only permanent identity."
// ---------------------------------------------------------------------

export type CanonicalRecordId = string & { readonly __brand: "CanonicalRecordId" };
export type CanonicalSlug = string & { readonly __brand: "CanonicalSlug" };

/** Constructs a CanonicalRecordId from a plain string. No format is prescribed upstream — this is nominal typing only, not a runtime validator. */
export function createRecordId(value: string): CanonicalRecordId {
  return value as CanonicalRecordId;
}

/** Constructs a CanonicalSlug from a plain string. */
export function createSlug(value: string): CanonicalSlug {
  return value as CanonicalSlug;
}

// ---------------------------------------------------------------------
// Ownership — IA §4.2. Exactly the six approved canonical-owner
// districts. Home is deliberately excluded: "Home does not own canonical
// Work, Research, Lab, Art, Product, or About records merely because it
// surfaces them" (§4.2). No discipline (Architecture, AI, BIM, Software,
// etc.) appears here — those are not canonical districts (IA §1: "A new
// discipline... does not by itself justify a new district").
// ---------------------------------------------------------------------

export type CanonicalOwnerDistrict = "work" | "research" | "lab" | "art" | "products" | "about";

// ---------------------------------------------------------------------
// Content type — IA §13.3's approved core vocabulary (v1.0), verbatim.
// "A content type describes what a canonical record is, not how it is
// displayed or reached." No Journal/Updates type is approved in v1.0.
// ---------------------------------------------------------------------

export type CanonicalContentType =
  | "project"
  | "case-study"
  | "research-project"
  | "publication"
  | "essay"
  | "talk-or-presentation"
  | "experiment"
  | "prototype"
  | "tool"
  | "artwork"
  | "art-series"
  | "exhibition"
  | "product"
  | "service"
  | "collection"
  | "profile-record"
  | "organization-or-venture";

// ---------------------------------------------------------------------
// State — IA §6.2's four independent dimensions. This module owns three
// (A, B, C); the fourth (D, domain-specific state) is deliberately
// excluded — see the module header's scope boundary. §6.3: "The
// unqualified term `status` must not be used as a universal IA field
// because it collapses distinct concepts" — there is deliberately no
// `status` field anywhere in this module.
// ---------------------------------------------------------------------

/** IA §6.2.A — an editorial judgment, not a lifecycle stage. */
export type CuratorialInclusion = "included" | "excluded";

/** IA §6.2.B — who can discover or access the record. */
export type Visibility = "public" | "unlisted" | "private";

/**
 * IA §6.2.C — the actual lifecycle condition of the underlying work.
 * "Not every lifecycle value applies to every district. Lifecycle must
 * describe reality honestly. It does not determine worth or visibility
 * by itself" — enforced by keeping this a fully independent field from
 * `curatorialInclusion`/`visibility` (§13, the curatorial-threshold rule:
 * completion and public inclusion are independent).
 */
export type Lifecycle =
  "draft" | "active" | "complete" | "failed" | "abandoned" | "speculative" | "archived";

// ---------------------------------------------------------------------
// Relationships — IA §5. The approved v1.0 vocabulary (§5.3), verbatim.
// "The vocabulary is intentionally small. Additional types require a
// demonstrated recurring need and terminology governance" — this module
// does not invent additional types.
// ---------------------------------------------------------------------

export type CanonicalRelationshipType =
  | "related-to"
  | "derived-from"
  | "informed-by"
  | "tested-in"
  | "developed-into"
  | "commercialized-as";

/**
 * A directional edge from the record holding this reference to a target
 * canonical record — never an embedded copy of the target (IA §5.1:
 * "Canonical records remain stable objects... represented through
 * explicit relationships rather than duplication"). `priority` is IA
 * §5.5's optional editorial priority ("affects presentation or discovery
 * ordering only... does not affect ownership"). No `label` field: a
 * displayed/reciprocal label is presentation-derived (IA §5.4 — "may be
 * adapted to context without changing the stored relationship"), not
 * stored truth, and belongs to whatever later package renders it
 * (M2.7/M3.5), not this contract.
 */
export interface CanonicalRelationshipReference {
  targetId: CanonicalRecordId;
  type: CanonicalRelationshipType;
  priority?: number;
}

// ---------------------------------------------------------------------
// Authorship / attribution — IA §5.6: "Authorship, role, collaboration,
// client, institution, and contributor information are attribution
// metadata... must not be mixed into the relationship ontology." Kept as
// its own structure, never inside `relationships`.
// ---------------------------------------------------------------------

export interface AttributionEntry {
  name: string;
  /** e.g. "Client", "Institution", "Collaborator" — free text, not a controlled enum (M3.4's territory if ever constrained). */
  role?: string;
}

export interface Authorship {
  primary: AttributionEntry;
  /** The primary author/record-holder's role in this specific record (IA §14.2 "role"), distinct from AttributionEntry.role, which describes a *collaborator's* role. */
  role?: string;
  collaborators?: AttributionEntry[];
}

/** IA §14.2 "credits" and CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md §8.1 "credits" — distinct from Authorship (contribution/credit, not primary responsibility). */
export interface Credit {
  name: string;
  role: string;
}

// ---------------------------------------------------------------------
// Date / period — CROSS_UNIVERSE_SYSTEM_REQUIREMENTS.md §8.1 "date or
// period"; IA §14.2 "year and/or date/date range." A discriminated union
// covers all three without forcing every record into one shape.
// ---------------------------------------------------------------------

export type CanonicalDate =
  | { kind: "year"; year: number }
  | { kind: "date"; date: string }
  | { kind: "range"; start: string; end?: string };

// ---------------------------------------------------------------------
// Media references / accessibility — PLATFORM_SPECIFICATION.md §30
// (Accessibility Obligations): "alternative text, captions, credits,
// transcripts, audio description or equivalent description, duration,
// playback controls, pause/stop, and clear distinction between artwork
// and documentation." This is a reference to media (identity, kind,
// source, accessibility, ordering) — never the rendered media itself.
// M2.8's Figure/Caption/VideoFrame/etc. are presentation primitives that
// later consume this data; they are never imported here.
//
// Alt text is enforced at the type level exactly like M2.5's Action
// `iconOnly`/`aria-label` pairing: a "decorative" reference cannot carry
// alt text (nothing to describe); "informative"/"complex" references
// cannot omit it — the same "accessibility hooks" discipline M2.8 already
// established for this repository.
// ---------------------------------------------------------------------

export type MediaKind = "image" | "drawing" | "diagram" | "video" | "audio" | "document" | "other";

/** PLATFORM_SPECIFICATION.md §30's explicit "clear distinction between artwork and documentation." */
export type MediaDocumentationRole = "artwork" | "documentation";

export type MediaAccessibilityMetadata =
  | { role: "decorative"; caption?: string; credit?: string }
  | {
      role: "informative";
      altText: string;
      caption?: string;
      credit?: string;
      transcript?: string;
      audioDescription?: string;
    }
  | {
      role: "complex";
      altText: string;
      longDescription: string;
      caption?: string;
      credit?: string;
      transcript?: string;
      audioDescription?: string;
    };

export interface MediaReference {
  id: string;
  kind: MediaKind;
  /** Path/URI reference to the asset — never the asset or a rendered component. */
  source: string;
  accessibility: MediaAccessibilityMetadata;
  documentationRole?: MediaDocumentationRole;
  /** Playback duration for time-based media (video/audio), as a plain string (e.g. "3:24") — no formatting logic here. */
  duration?: string;
  /** Explicit ordering within a record's media set; omit when order is immaterial. */
  order?: number;
}

// ---------------------------------------------------------------------
// The universal contract itself — IA §14.1/§14.2, IMPLEMENTATION_PLAN.md
// §7's own M3.1 field list. `CanonicalRecordBase` is deliberately NOT a
// discriminated union with per-district optional fields (this task's own
// §6: "avoid `price?`/`experimentResult?`/`paperAbstract?`... all living
// as optional fields on one giant type"). M3.2 extends this per district
// via ordinary TypeScript interface extension
// (`interface WorkRecord extends CanonicalRecordBase { ... }`), which is
// why no placeholder "extension" field exists here — the extension
// mechanism is TypeScript's own `extends`, not a field on this type.
//
// `editorial` internal timestamps are nested under their own key,
// deliberately separated from the public-facing fields around them — see
// the implementation report's "Security / Public-Delivery Boundary" for
// why this separation matters even before any real persistence layer
// exists.
// ---------------------------------------------------------------------

export interface CanonicalRecordBase {
  // Universal identity fields (IA §14.1)
  id: CanonicalRecordId;
  slug: CanonicalSlug;
  title: string;
  ownerDistrict: CanonicalOwnerDistrict;
  contentType: CanonicalContentType;
  curatorialInclusion: CuratorialInclusion;
  visibility: Visibility;
  lifecycle: Lifecycle;
  summary: string;
  authorship: Authorship;

  // Universal-capability fields (IA §14.2) — present on the type, may be
  // omitted per-record when genuinely inapplicable.
  subtitle?: string;
  date?: CanonicalDate;
  /** Loose string identifiers — M3.4 ("Classification model") will constrain these to controlled vocabularies. This module only establishes the capability slot IA §14.2 requires ("disciplines", "themes"). */
  disciplines?: string[];
  themes?: string[];
  collaborators?: AttributionEntry[];
  relationships?: CanonicalRelationshipReference[];
  media?: MediaReference[];
  credits?: Credit[];
  provenance?: string;
  location?: string;
  /** IA §14.2 "optional editorial priority or featured state." */
  featured?: boolean;

  /** Internal editorial timestamps (M3.1's own "internal editorial timestamps where needed") — never public-facing truth about the record itself. */
  editorial?: {
    createdAt?: string;
    updatedAt?: string;
  };
}
