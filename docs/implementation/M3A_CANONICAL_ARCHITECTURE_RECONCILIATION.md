# M3-A — Canonical Architecture Reconciliation

## Status

**Approved / Closed.** M3.2–M3.6, built on M3.1's already-closed foundation, together form one coherent canonical architecture. This is a batch reconciliation document, not a new Implementation Plan work package — no `M3.6.1` or equivalent was invented.

## Scope of this document

M3-A comprises M3.2 (District Extensions), M3.3 (Canonical-Route Resolver), M3.4 (Classification Model), M3.5 (Relationship Model), and M3.6 (Lifecycle and Archive Model). M3.1 (Universal Canonical-Record Contract) is the foundation dependency included in every compatibility check below but is **not reopened** — it remains closed at commit `60ab70b`, and every file it owns (`CanonicalRecord.ts`, `registry.ts`, `fixtures.ts`) is confirmed byte-for-byte unchanged throughout M3.2–M3.6 (verified directly: `git diff 60ab70b -- src/domain/records/CanonicalRecord.ts src/domain/records/registry.ts src/domain/records/fixtures.ts` is empty). The objective of this document is verification, not reimplementation: confirming M3.2–M3.6 form one coherent whole before the visual/navigation/discovery half of Milestone 3 (M3-B) begins.

## M3.1 compatibility result

**Pass.** All five downstream packages (M3.2–M3.6) import from `CanonicalRecord.ts`/`registry.ts` without modifying either file. `git log --follow` and direct diff against the M3.1 commit confirm zero changes to any M3.1-owned file across the five subsequent commits (`0c2420f`, `6525691`, `cee58d7`, `159e59f`, `b9ffa11`).

## Identity invariant result

**Pass.** Traced through the complete chain — CanonicalRecord → District extension → Canonical route → Classification → Relationship → Lifecycle/archive/discovery eligibility — with one canonical ID surviving every layer, proven directly by `tests/domain/m3a-canonical-architecture.test.ts`'s "one canonical record through every layer" suite: a single fixture record (`fixture-lab-001`) passes through district-extension validation (M3.2), classification validation (M3.4), route resolution (M3.3), relationship resolution (M3.5), and lifecycle/archive/public-safe projection (M3.6) with its `id` unchanged at every step, including after archiving. No layer duplicates identity: extensions carry no `id`/`slug` field (M3.2, compile-time and source-contract enforced), classification terms are referenced by ID never embedded (M3.4), relationships store `targetId` never an embedded record (M3.5, M3.1), and archiving never creates a new record or route (M3.6).

## Ownership invariant result

**Pass.** Every district's fixture retains its own `ownerDistrict` through every layer, confirmed both by each package's own dedicated ownership-invariance tests (M3.2 §18 "Ownership correlation", M3.4 "Ownership invariance", M3.5 "Ownership invariance", M3.6 archive tests) and by the cumulative integration test's explicit assertions after district-extension validation, classification, relationship resolution, and archiving. Home remains structurally excluded as a canonical owner at every layer — no `HomeExtension` (M3.2), no Home fixture anywhere in the classification/relationship/lifecycle test suites, and `CanonicalOwnerDistrict` (M3.1, unchanged) still excludes `"home"`.

## District-boundary result

**Pass**, all five highest-risk transitions verified:

- **Research → Lab** — inquiry (Research's `inquiry`/`currentPosition`, M3.2) vs. experiment (Lab's `experimentQuestion`/`experimentState`, M3.2) stay on separate extension types; the `tested-in` relationship (M3.5) connects them without merging records.
- **Lab → Work** — M3.5's own test proves the Lab fixture's `lifecycle: "failed"` and identity are untouched after resolving its `developed-into` relationship to Work; M3.6 additionally proves this holds after archiving.
- **Lab → Products** — `commercialized-as` resolves to a Products-owned target (M3.5); Products' commercial fields (M3.2) never appear on the Lab extension (M3.2 source-contract enforced).
- **Art → Products** — M3.5 proves Art retains `ownerDistrict: "art"` after resolving `commercialized-as`; M3.2 proves no price/stock field can ever appear on `ArtExtension`.
- **Work → Research** — `informed-by` (M3.5) connects them without either district absorbing the other's fields; M3.2's `WorkExtension` carries no research-inquiry field and vice versa.

No layer creates a duplicate canonical record merely for cross-district relevance — confirmed at the source level in every package (no embedded target records anywhere).

## Route invariant result

**Pass.** Every fixture across the combined architecture resolves exactly once (`m3a-canonical-architecture.test.ts`: "every fixture record's canonical route resolves exactly once with no collisions", scanning all eight M3.1 fixtures plus district-extended variants into one `Set` with no duplicate). No reserved-segment collision exists in the fixture set (M3.3's own tests cover the rejection path directly). Relationship canonical destinations resolve correctly (M3.5 tests, reconfirmed in the integration test: Lab's `developed-into` → `/work/fixture-work-outcome`, Research's `tested-in` → `/lab/fixture-lab-experiment`). Classification changes (M3.4), lifecycle changes, and archive state (M3.6) are all proven — both individually in each package's own tests and again in the cumulative integration test — to leave a record's resolved route completely unchanged. No commercial state affects route (M3.6's Products-discontinued test).

## Classification invariant result

**Pass.** No `tags: string[]` or uncontrolled vocabulary exists anywhere (M3.4 source-contract, reconfirmed absent across all six new M3.2–M3.6 modules). Exactly five global Index lens dimensions remain exposed (`district`, `content-type`, `discipline`, `theme`, `year` — M3.4, unchanged since its own commit). Controlled district dimensions (`collection`, `series`, `territory`, `contribution-role`) remain semantically distinct via the `dimension` discriminant, never collapsed into one generic tag. Classification cannot generate a relationship automatically (M3.5's own explicit "classification boundary" test, plus M3.5's source contract confirming zero import of `ClassificationModel.ts`). Classification cannot change owner or route (tested directly in M3.4 and reconfirmed in the integration test). Lifecycle is never duplicated as a conflicting classification truth — `ClassificationModel.ts`'s state facets (`lifecycleFacet`, etc.) are pure derivations, never independently stored values.

## Relationship invariant result

**Pass.** Exactly six stored core types are used throughout every fixture and every package (M3.1's original vocabulary, reconfirmed unchanged by M3.5's own "six-type ontology only" test scanning all fixtures). Every edge in the fixture graph resolves (M3.1's `assertRelationshipsResolve` plus M3.5's `validateRelationships`, both exercised in the integration test's cross-district lineage suite). Canonical destinations use M3.3's resolver exclusively — no relationship anywhere stores a route string (M3.5 source contract). Reciprocal presentation is derived (`listIncomingRelationships`), never requiring a duplicate stored inverse edge — confirmed directly in the integration test (Lab's incoming edge from Research is derived, not present in Lab's own `relationships` array). Editorial labels (M3.5's `deriveRelationshipLabel`) stay distinct from the stored ontology. No relationship is ever generated from spatial/visual/classification similarity (M3.5's explicit boundary tests). Priority never affects ownership (M3.5 tested directly). Archived public records retain full relationship capability (M3.6's "relationships preserved after archiving" test, reconfirmed in the integration test's archive step). Private/restricted targets are not specially exposed through relationship listing — `listIncomingRelationships`/`listOutgoingRelationships` return data regardless of target eligibility, with the explicit documented expectation (M3.6's own security-boundary language, consistent with M3.1's `registry.ts`) that a caller must still apply `isPubliclyDiscoverable` before public delivery — this is a shared, consistently documented boundary, not a gap unique to any one package.

## State/archive invariant result

**Pass.** All five independent dimensions remain separate: curatorial inclusion, visibility, and universal lifecycle (M3.1, unchanged), district-specific state (M3.2, unchanged), and internal publication workflow (M3.6, newly added as a side-table, never a field on `CanonicalRecordBase`). Archive is confirmed to be lifecycle-derived only — no second stored archive field exists anywhere in the six new modules (M3.6 source contract). A failed Lab experiment, a speculative Work record, an archived record, and a discontinued Product are all confirmed to remain publicly discoverable (M3.6's dedicated eligibility tests, reusing M3.1's `isPubliclyDiscoverable` directly rather than re-implementing it). Completion never grants public visibility (M3.1's original fixture, reconfirmed by M3.6). Unlisted is confirmed distinct from private (M3.1's original registry tests, reused by M3.6's own direct-access tests). Archived is confirmed distinct from unavailable/discontinued (M3.6's dedicated "Product discontinued state does not automatically make a record archived" test). A failed experiment is never conflated with a system error — Lab's `experimentState`/`failureNote` (M3.2) remain descriptive district data, never surfaced as an error state anywhere in this architecture. `/work/all` is confirmed distinct from Archive (M3.6's dedicated test: the comprehensive view strictly exceeds the archive in size for the fixture set, and includes non-archived records).

## Search/Index-readiness result

**Confirmed ready, not implemented.** `selectPublicComprehensiveView` and `selectPublicArchive` (M3.6) both derive from the single shared `isPubliclyDiscoverable` source (M3.1) — no divergent `isSearchable`/`isIndexable` pair was ever created across any of the five packages, directly satisfying Gate M3's "Search and Index query the same public source" criterion ahead of M3.10–M3.12's actual implementation. The classification catalog (M3.4) provides the exactly-five approved global lens dimensions any future Index implementation will need, sourced from a single catalog mechanism (confirmed: exactly one `create*Catalog` function exists across the whole architecture). The relationship model (M3.5) provides one canonical relationship-truth source, confirmed to contain no separate Search-specific relation taxonomy. No Index UI, Search ranking, or Filter logic exists anywhere in M3.2–M3.6 — confirmed at the source level in every package's own contract test.

## Security result

**Pass.** No package anywhere implements or encourages "fetch all records → send to browser → filter client-side." Each package that touches public/private eligibility (M3.1's `registry.ts`, M3.6's `LifecycleArchiveModel.ts`) documents the same explicit warning in its own header comments, consistently worded across the two files. M3.6's `toPublicSafeProjection` strips M3.1's `editorial` field; internal publication state (M3.6) is structurally incapable of leaking into a public projection, since it was never merged into `CanonicalRecordBase` to begin with — confirmed directly (no `internalPublicationState`/`state` key ever appears on a projection). Relationship traversal (M3.5) does not itself enforce eligibility — documented consistently as the caller's responsibility, matching M3.1's original registry design rather than introducing a new, differently-worded security boundary.

## Serialization result

**Pass.** All six new modules (`DistrictExtensions.ts`, `RouteResolver.ts`, `ClassificationModel.ts`, `RelationshipModel.ts`, `LifecycleArchiveModel.ts`, plus their fixtures) contain zero `ReactNode`, JSX, component, callback, or browser-object references — confirmed at the source-contract level in every package, and reconfirmed by the cumulative integration test's own JSON-round-trip-adjacent assertions (public-safe projection, resolved relationships).

## Cumulative integration-test result

**Pass — 10/10 new tests.** `tests/domain/m3a-canonical-architecture.test.ts` (new in this closure) exercises one representative fixture record through every layer in sequence (M3.2 → M3.4 → M3.3 → M3.5 → M3.6, including a post-archive re-verification of every prior layer's result) and a second suite proving cross-district lineage (Research → Lab → Work → Research) resolves coherently with preserved ownership, that the public archive is always a subset of the public comprehensive view across the whole fixture set, and that every fixture's canonical route is unique with zero collisions.

## M3.4 test-count correction result

**Corrected.** The M3.4 report originally stated "24 behavioral + 10 source-contract" tests; the actual counts (confirmed by running each test file individually through `vitest run --reporter=verbose` and reading the reported total) are **23 behavioral + 10 source-contract = 33**, matching the real 696→729 increase. `docs/implementation/M3.4_CLASSIFICATION_MODEL.md`'s "Tests" section is corrected accordingly. No test was changed to make an old sentence true — only the documentation's stated count was corrected to match the actual, already-passing test suite.

## Implementation-report corrections

While verifying M3.4's count, the same direct-count method (`vitest run --reporter=verbose` per file, since `it.each` blocks expand into multiple runtime tests that a static `grep` undercounts) was applied to every M3.1–M3.6 test file, to confirm no other report carried a stale per-file breakdown. Three further inconsistencies were found and corrected, all originating from the same root cause — files containing `it.each` (`CanonicalRecord.test.ts`, `DistrictExtensions.test.ts`, `RouteResolver.test.ts`, `RelationshipModel.test.ts`) expand to more runtime tests than a naive per-line count suggests, and in three cases an offsetting error in the *other* file of the same package's pair had made the **total** look correct even though the **per-file split** was wrong:

| Report | Field | Was | Corrected to | Package total (unchanged) |
|---|---|---|---|---|
| `M3.1_UNIVERSAL_CANONICAL_RECORD_CONTRACT.md` | `CanonicalRecord.test.ts` | 24 tests | **22 tests** | 42 (unaffected) |
| `M3.1_UNIVERSAL_CANONICAL_RECORD_CONTRACT.md` | `records-source-contract.test.ts` | 10 tests | **12 tests** | 42 (unaffected) |
| `M3.2_DISTRICT_EXTENSIONS.md` | `DistrictExtensions.test.ts` | 30 tests | **32 tests** | 44 (unaffected) |
| `M3.2_DISTRICT_EXTENSIONS.md` | `district-extensions-source-contract.test.ts` | 14 tests | **12 tests** | 44 (unaffected) |
| `M3.4_CLASSIFICATION_MODEL.md` | `ClassificationModel.test.ts` | 24 tests | **23 tests** | 33 (unaffected) |
| `M3.5_RELATIONSHIP_MODEL.md` | `RelationshipModel.test.ts` | 29 tests | **28 tests** | 39 (unaffected) |
| `M3.5_RELATIONSHIP_MODEL.md` | `relationship-model-source-contract.test.ts` | 10 tests | **11 tests** | 39 (unaffected) |

`M3.3_CANONICAL_ROUTE_RESOLVER.md` (34 + 8 = 42) and `M3.6_LIFECYCLE_ARCHIVE_MODEL.md` (32 + 11 = 43, already direct-counted at authorship time) required no correction — both were independently verified accurate. Every package-level total test count reported throughout M3.1–M3.6 (42, 44, 42, 33, 39, 43, summing to the reported 610/654/696/729/768/811 running totals) was independently re-verified against a live `npm run test:run` at each step and is confirmed correct — only six individual per-file line items across two reports needed correction, never a total. All five package statuses remain **Complete / Verified**.

## Final validation

| Command | Result |
|---|---|
| `npm run format:check` | Pass |
| `npm run lint` | Pass — 0 errors, 15 pre-existing `@next/next/no-img-element` warnings (M2.7–M2.9 test fixtures, unchanged) |
| `npm run typecheck` | Pass |
| `npm run test:run` | Pass — **821/821 tests, 75/75 files** |
| `npm run build` | Pass — all 53 routes unchanged (37 static, 16 dynamic); no route/component/style file touched |

## Final total test count

**821/821 passing**, 75/75 test files — 811 carried over from M3.6 plus 10 new cumulative integration tests (`tests/domain/m3a-canonical-architecture.test.ts`), with no regression in any prior package's suite.

## Closure files changed

- `tests/domain/m3a-canonical-architecture.test.ts` (new — the only new code/test artifact in this closure)
- `docs/implementation/M3A_CANONICAL_ARCHITECTURE_RECONCILIATION.md` (new — this document)
- `docs/implementation/M3.1_UNIVERSAL_CANONICAL_RECORD_CONTRACT.md` (factual correction — two per-file test counts)
- `docs/implementation/M3.2_DISTRICT_EXTENSIONS.md` (factual correction — two per-file test counts)
- `docs/implementation/M3.4_CLASSIFICATION_MODEL.md` (factual correction — one per-file test count)
- `docs/implementation/M3.5_RELATIONSHIP_MODEL.md` (factual correction — two per-file test counts)
- `PROJECT_STATE.md` (updated)

No implementation defect was found during this audit — every correction made was a documentation-accuracy fix (a stated test count not matching the actual, already-passing suite), never a code or behavior change. `src/domain/records/CanonicalRecord.ts`, `registry.ts`, `fixtures.ts`, `DistrictExtensions.ts`, `district-fixtures.ts`, `RouteResolver.ts`, `ClassificationModel.ts`, `classification-fixtures.ts`, `RelationshipModel.ts`, and `LifecycleArchiveModel.ts` are all untouched by this closure.

## M3-A approval

M3.2–M3.6 all remain valid; cumulative integration tests pass; no governing contradiction remains; no unresolved canonical-architecture decision remains; the full validation gate passes.

**M3-A — Canonical Architecture: Approved / Closed.**

This approval means the canonical data architecture is stable enough for M3-B (Navigation + Discovery) work to begin. It does **not** mean Milestone 3 is complete, and it does **not** approve M3.7–M3.13 or close Gate M3.
