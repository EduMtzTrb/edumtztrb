# M6 — Utilities Readiness

## Status

**M6-A — Utilities Readiness + Safe Foundation: Complete.** This is a readiness/foundation task, not a full-milestone closure — Milestone 6 remains **In Progress**, with three of six work packages genuinely blocked on real, external, or content decisions that do not exist in repository authority, and one (M6.6) blocked by design until those decisions exist.

## Authority

- `IMPLEMENTATION_PLAN.md` §11 (Milestone 6 — Utilities) — **Objective:** "Implement global task-oriented utilities and commercial boundaries after the main platform architecture is stable. Functional clarity takes priority over atmosphere." **Dependencies:** "Gate M5; actual decisions for each utility being activated; approved Contact route/data; verified legal/business content before publication; approved launch-language decision before multilingual activation; approved commercial configuration before transaction activation." **Acceptance criteria:** "Activated utilities are globally reachable, keyboard/touch usable, explicit about success/error, preserve form data safely where appropriate, use correct ownership, publish only verified legal/business data, identify language clearly, block purchase from non-purchasable Products, and use literal commitment labels." **Completion gate:** "Gate M6 — Required Utilities Verified. An unavailable external dependency may remain Blocked without blocking unrelated release scope if that utility is explicitly outside the release and cannot be mistaken for active functionality."
- `IMPLEMENTATION_PLAN.md` §18 (Products Transaction Boundary) — the exact Product-record/origin-record/transaction-adapter/provider/disabled-boundary model this task's M6.5 work implements.
- `IMPLEMENTATION_PLAN.md` §22 (External Dependencies) — "Implementation must track but not invent" content, commercial, legal, language, and analytics dependencies; "**Missing required dependencies are Blocked.**"
- `PLATFORM_SPECIFICATION.md` §18.3 (Contact), §18.4 (Language), §34 (Contact Experience), §35 (Language and Localization Readiness), §36 (Legal and Administrative Boundary) — each read in full for this audit; exact findings recorded per package below.
- `ABOUT_UNIVERSE_v1.1.md` §18 (Contact Experience) — "Required fields: name, reply address, message. Avoid: mandatory phone number, marketing consent, budget interrogation before conversation, hidden direct contact information."
- `docs/implementation/M5.6_PRODUCTS.md`, `docs/implementation/M5_DISTRICT_FRAMEWORK_RECONCILIATION.md` — both already established that transaction activation is explicitly Milestone 6's own scope, not M5's; this task inherits and acts on that boundary rather than re-deciding it.
- M2.10 (`docs/implementation/M2.10_FORM_FAMILY.md`), M2.11 (`docs/implementation/M2.11_SHARED_STATIC_STATES.md`) — the shared primitives this task's own safe work reuses, unmodified in behavior (only additively extended — see "M6.1 — Contact" below).

## Repository Baseline (verified fresh for this task)

- HEAD at task start: `a90c8c4` (`docs: verify gate m5 district framework`) — confirmed via `git log -1`.
- Working tree: clean, confirmed via `git status --short`.
- `npm run format:check` — clean.
- `npm run lint` — 0 errors, 16 warnings (matches the stated baseline exactly).
- `npm run typecheck` — clean.
- `npm run test:run` — 159/159 test files, 1484/1484 tests (matches the stated baseline exactly).
- `npm run build` — 54 route-table entries, 35 static / 19 dynamic (matches the stated baseline exactly).

No drift found. Implementation proceeded from this confirmed baseline.

## Dependency Audit

Audited directly against repository content — never inferred from git metadata, account/profile information, OS usernames, fixture content, private memory, or developer examples, per this task's own explicit instruction.

### Contact

| Question | Finding |
|---|---|
| Approved public email | **None found.** `PLATFORM_SPECIFICATION.md` §34: "Exact public contact details are a content decision." No email address appears anywhere in repository authority. |
| Approved form destination | **None found.** No server action, API route, or email-provider configuration exists anywhere in `src/` (confirmed via direct search — zero `"use server"` directives, zero `src/app/api/*` files). |
| Approved contact fields | **Found.** `ABOUT_UNIVERSE_v1.1.md` §18: "Required fields: name, reply address, message." |
| Approved privacy handling | **None found** beyond the general platform-wide obligation named in §36 (see "Legal/admin" below) — no specific Contact privacy text exists. |
| Existing server action/API endpoint | **None found.** |
| Existing email provider | **None found.** No `.env`, `.env.example`, or any environment-variable file exists anywhere in this repository (confirmed via direct filesystem search). |
| Existing environment variables | **None found.** |

### Legal/admin

| Question | Finding |
|---|---|
| Seller/legal identity | **None found.** |
| Privacy text | **None found.** |
| Terms | **None found.** |
| Cookies | **None found.** |
| Company/individual legal details | **None found.** |
| Physical/business address | **None found.** |
| Tax/VAT information | **None found.** |
| Jurisdiction-specific wording | **None found.** |
| Approved public route name | **None found.** `PLATFORM_SPECIFICATION.md` §5.2's own top-level route list (`/`, `/work`, `/research`, `/lab`, `/art`, `/products`, `/about`, `/search`, `/index`, `/contact`) contains no legal/admin route. §36 authorizes building "the utility route/container, navigation access, document/page structure" but supplies no approved path name — inventing one (e.g. `/legal`) would be inventing IA, not implementing approved IA. |

### Language

| Question | Finding |
|---|---|
| Approved launch language | Implicitly English (the only language any governing document is written in), but no document states this as an approved *decision* — it is simply the only language that exists. |
| Approved multilingual launch decision | **None found.** `PLATFORM_SPECIFICATION.md` §35: "v1.0 does not decide which languages launch, whether all records are translated, URL language prefixes, translation fallback, locale negotiation, or currency conversion logic. These require separate content/product decisions." |
| Approved secondary languages | **None found.** |
| Actual approved translations | **None found.** |
| Locale routing/config already present | **None found** (confirmed via direct search — no `i18n` directory, no `messages` directory, no `[locale]` route segment anywhere). |

### Commerce

| Question | Finding |
|---|---|
| Approved seller identity | **None found.** |
| Currency | Fixture-only (`"EUR"`, explicitly disclosed as fixture, M3.1/M3.2). No real approved currency decision. |
| Tax treatment | **None found.** |
| Shipping | **None found.** |
| Digital fulfilment | Structurally modeled (`ProductsExtension.fulfilmentMethod`, free text), no real approved policy. |
| Licensing terms | Structurally modeled (`ProductsExtension.licenseSummary`), no real approved terms. |
| Commercial availability | Structurally modeled (`ProductCommercialState`, thirteen approved values, M3.2), fixture data only. |
| Payment/provider decision | **None found.** |
| Transaction types to activate | **None found** — no decision exists about which of purchase/reservation/subscription/enquiry/commission to activate first. |
| Enquiry/quote/commissioning behavior | Conceptually approved (`PRODUCTS_UNIVERSE_v1.1.md` §7/§12), no real delivery mechanism (same blocker as Contact — no server action/API/email provider exists). |

## Package Classification

| Package | Classification |
|---|---|
| M6.1 — Contact | **PARTIALLY READY** — presentation/validation implementable now; delivery blocked |
| M6.2 — Legal/admin | **BLOCKED — CONTENT DECISION** (compounded by no approved route name) |
| M6.3 — Language | **BLOCKED — CONTENT DECISION** (explicitly, per authority, "not activated" is itself a valid, correct state) |
| M6.4 — Utility states | **READY** |
| M6.5 — Products transaction boundary | **READY** |
| M6.6 — Transaction activation | **BLOCKED — CONFIGURATION** (compounded by BLOCKED — LEGAL/BUSINESS DATA and BLOCKED — EXTERNAL DEPENDENCY, all three simultaneously true) |

## M6.1 — Contact

**Governing requirement:** `ABOUT_UNIVERSE_v1.1.md` §18 + `PLATFORM_SPECIFICATION.md` §34 (see "Authority" above).

**Evidence found:** the required field set (name/reply email/message) is approved; the shared form primitives (M2.10) and static states (M2.11) already exist and are already tested; `/contact` is already globally reachable (`GlobalNav`'s own Utilities landmark, M1.4, unmodified).

**Missing dependency:** no approved delivery destination (email address, form-processing provider, server action, or API route) exists anywhere in repository authority.

**What was safely implemented now:** the complete, accessible Contact presentation — see `docs/implementation/M6.1_CONTACT.md` for the full report.

**What must not be activated:** any code path that pretends a message was sent, stores a message, or contacts an external service. None exists in this implementation.

## M6.2 — Legal/admin

**Governing requirement:** "Publish only verified real legal/admin content" (`IMPLEMENTATION_PLAN.md` §11); `PLATFORM_SPECIFICATION.md` §36 authorizes a structural utility shell but supplies no approved route name.

**Evidence found:** none — no legal content, no approved route path.

**Missing dependency:** verified legal/business content (privacy policy, terms, seller identity, etc.) *and* an approved public route name — both, simultaneously.

**What can safely be implemented now:** nothing publicly routed. Per this task's own explicit instruction ("Do not create public production routes outside the approved architecture just to have somewhere to put future legal text"), no route, file, or navigation entry was added.

**What must not be activated:** any `/legal`-shaped route, any invented privacy/terms copy, any navigation link to a non-existent page.

**Status: `Blocked — Verified Legal/Business Content Required`** (and, additionally, an approved route name — recorded together since either alone would still block).

## M6.3 — Language

**Governing requirement:** `IMPLEMENTATION_PLAN.md` §11: "Implement only after launch-language approval."

**Evidence found:** no approved multilingual launch decision anywhere in repository authority (`PLATFORM_SPECIFICATION.md` §35, verbatim, confirms this explicitly rather than merely omitting it).

**What was implemented:** nothing. No locale route, no language toggle, no translation file, no i18n dependency, no URL change — confirmed directly by this task's own new guard tests (`tests/routes/m6-blocked-packages-guard.test.ts`).

**Status: `Blocked / Not Activated — Launch-Language Decision Required`.** This is an explicitly acceptable M6 state, per `IMPLEMENTATION_PLAN.md`'s own completion-gate note: "An unavailable external dependency may remain Blocked without blocking unrelated release scope if that utility is explicitly outside the release and cannot be mistaken for active functionality." Language is outside this release's scope and cannot be mistaken for active — there is no switcher, no second route, nothing to mistake.

## M6.4 — Utility states

**Governing requirement:** shared form, overlay, failure, confirmation mechanics — `IMPLEMENTATION_PLAN.md` §11.

**Finding:** existing M2.10/M2.11 primitives already cover every state this task names (validation/pending/recoverable-failure/terminal-failure/success/confirmation/unavailable). No second, abstract "utility state machine" module was created — Contact is currently the *only* real utility flow that needs this orchestration (Legal/Language/Commerce are all blocked), and building a generic reusable orchestrator with exactly one real consumer would be exactly the premature abstraction this project's own discipline avoids. `ContactForm`'s own local state *is* M6.4's real work for this task — see `docs/implementation/M6.4_UTILITY_STATES.md` for the full reasoning and the explicit extraction trigger for if/when a second consumer appears.

**Status: Complete / Verified** (demonstrated via Contact; no second orchestration module exists to separately verify).

## M6.5 — Products transaction boundary

**Governing requirement:** `IMPLEMENTATION_PLAN.md` §18 (see "Authority" above).

**Finding:** fully implementable without activating payments, exactly as this task's own Phase J anticipated. `src/domain/commerce/transactionBoundary.ts` derives real commitment truth from the Product record's own already-approved `ProductCommercialState`/`commitmentLabel` fields (M3.2, unmodified) plus one real, repository-verified configuration fact (no M6.6 dependency exists yet) — see `docs/implementation/M6.5_PRODUCTS_TRANSACTION_BOUNDARY.md` for the full architecture, provider-independence proof, and test evidence.

**Status: Complete / Verified.**

## M6.6 — Transaction activation

**Governing requirement:** "Activate purchase/reservation/subscription only when required commercial/legal configuration exists" (`IMPLEMENTATION_PLAN.md` §11).

**Activation readiness audit** (all required, per this task's own Phase M checklist):

| Requirement | Status |
|---|---|
| Seller identity | Missing |
| Price (real, non-fixture) | Missing |
| Currency (real, approved) | Missing |
| Availability (real, non-fixture) | Missing |
| Tax | Missing |
| Legal terms | Missing |
| Fulfilment | Missing (structural field exists; no real policy) |
| Refund/cancellation | Missing |
| Licensing | Missing (structural field exists; no real terms) |
| Payment provider/configuration | Missing |
| Confirmation/recovery behavior | Not applicable until a provider exists |

**Status: `Blocked / Not Activated — Commercial Configuration Required`.** `src/domain/commerce/transactionBoundary.ts`'s own `TRANSACTION_ACTIVATION_CONFIGURED = false` constant encodes exactly this fact, in code, checked by its own test suite — this is a real, honest gate, not a placeholder comment. Enquiry/quotation pathways (the one class of "permitted non-transaction action" this task's own Phase M allows) remain equally blocked, for the identical reason Contact itself is blocked: no truthful delivery mechanism exists for them either.

## Decisions Found

- Contact's required field set (name/reply email/message) — `ABOUT_UNIVERSE_v1.1.md` §18.
- Contact's forbidden fields (phone/company/budget/marketing consent) — same source.
- Products' approved commercial-state vocabulary and commitment-label convention — M3.2/`PLATFORM_SPECIFICATION.md` §33.1 (both pre-existing, unmodified).

## Missing Decisions

- An approved Contact delivery destination (email address or provider).
- Verified legal/business content and an approved legal/admin route name.
- A launch-language approval decision.
- Seller identity, real pricing/currency/tax/shipping/licensing terms, and a payment-provider decision.

## Safe Implementations (this task)

1. `ContactForm` — the complete accessible Contact presentation (M6.1).
2. `TextField`/`TextAreaField` `forwardRef` extension — additive, backward-compatible (M6.1's own real need).
3. `deriveCommitmentAvailability` — the Products transaction boundary (M6.5).
4. `/products/[entry]/page.tsx`'s Commitment metadata now derived from real state, not a blanket string (M6.5's real consumer).
5. Guard tests proving M6.2/M6.3 remain genuinely inert.

## Blocked Activations (this task)

1. Any real Contact message delivery.
2. Any legal/admin route or content.
3. Any language switching.
4. Any real commercial transaction (purchase/reservation/subscription/enquiry/quote execution).

## Tests

- `src/components/contact/ContactForm.test.tsx` (8 tests).
- `tests/routes/contact-composition.test.tsx` (3 tests).
- `src/domain/commerce/transactionBoundary.test.ts` (8 tests).
- `tests/routes/m6-blocked-packages-guard.test.ts` (5 tests).
- 1 new test added to `tests/routes/products-composition.test.tsx` (real M6.5 wiring proof).
- `tests/routes/motion-fixture-route-wiring.test.tsx` (7 tests, pre-existing) reconfirmed passing unmodified — Contact's real form coexists correctly with every M4/M5 dev-fixture gate on the same route.

## Validation

See exact totals in each package's own report and in the final commit message; summarized: format/typecheck clean; lint 0 errors, 16 warnings (unchanged); full suite passing with all new tests added, no regression; build unchanged — 54 routes, 35 static / 19 dynamic (no new route — Contact's real form was added to the existing `/contact` route body, not a new route).

## Next Decision / Work Package

The next concrete action is external, not implementation: an approved Contact delivery destination (email or provider) would unblock the remainder of M6.1. Absent that, the next *implementable* M6 work is none — M6.2/M6.3/M6.6 are each blocked on a real decision this task cannot make, and M6.4/M6.5 are already complete. Milestone 6 remains **In Progress**; Gate M6 has not been assessed and should not be, since required dependencies for the release's full utility scope remain outstanding by design. Milestone 7 (Content Integration) has not been started.
