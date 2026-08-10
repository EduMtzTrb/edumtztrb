# Universe Documents — Review Report

**Reviewer:** Claude Code
**Scope:** `HOME_UNIVERSE_v1.0.md`, `WORK_UNIVERSE_v1.0.md`, `RESEARCH_UNIVERSE_v1.0.md`, `LAB_UNIVERSE_v1.0.md`, `ART_UNIVERSE_v1.0.md`, `PRODUCTS_UNIVERSE_v1.0.md`, `ABOUT_UNIVERSE_v1.0.md`
**Governing documents consulted:** `Project Instructions.txt`, `PLATFORM_VISION.md`, `INFORMATION_ARCHITECTURE.md`
**Status:** Review only. No source file has been modified. Nothing in this report or its accompanying review drafts is approved.

---

## Executive Summary

All seven documents are well-built. They already do the thing this kind of specification usually fails to do: state a governing concept, hold a boundary test against every neighboring district, and back both with an approved decision register precise enough to arbitrate a real disagreement about where a piece of work belongs. The Work–Lab distinction, the Art qualification test, and the Lab lifecycle vocabulary are not decoration — they are usable rules. That quality was preserved untouched everywhere it appears.

The editorial problems are consistent across all seven and fall into three categories:

1. **Restated scaffolding.** Every document explains its atmosphere, then explains it again as a spatial narrative, then again as an experience sequence, then again in a "what this must not become" list — four passes at the same handful of ideas. Art and Lab carry this furthest: Art's thirteen named "Chambers" and five medium-specific honesty rules, and Lab's six-subsection visual-language section, each independently restate a single underlying principle per instance rather than stating it once and listing the variations.
2. **A cross-platform formula that doesn't quite match itself.** Four documents (Lab, Art, Products, About) share a one-line-per-district formula ("Work demonstrates capability," "Research develops understanding," etc.). Lab's own verb for itself — "tests and transforms" — doesn't match how Art and About quote it ("exposes transformation"). Minor, but it's exactly the kind of inconsistency a platform built on precise language shouldn't have.
3. **Generic scaffolding rather than authored position.** The documents are already fairly disciplined about avoiding marketing language, but the identity and atmosphere sections mostly describe *what the district should feel like* without stating *why that follows from how the work actually gets made*. The review drafts add short reasoning clauses at these points — not new rules, just the "because" that was implicit.

None of the seven review drafts propose a conceptual change. Every governing concept, spatial narrative, boundary test, and approved decision register is preserved. One genuine cross-document conflict was found — described in full below — and it is **not** resolved silently.

---

## Cross-Platform Findings

### 1. The five/six-part district formula has two versions of Lab's verb

`LAB_UNIVERSE.md` states, consistently and repeatedly: *"Lab tests and transforms."* `ART_UNIVERSE.md` §4.1 and `ABOUT_UNIVERSE.md` §1 both instead quote Lab as *"exposes transformation."* Same meaning, different words, in a set of documents whose entire method is precise, non-interchangeable vocabulary.

**Recommendation:** treat Lab's own document as authoritative for its own verb (a district should not be quoted differently by its neighbors than it describes itself). Align Art and About to *"Lab tests and transforms."* Applied in the Art and About review drafts; **not yet applied to the approved v1.0 files** — see Conflicts and Ambiguities.

Separately: Work's own document never states its line in this formula (it has "Work is where the practice becomes accountable" and a closing tagline, but not the "Work ___s ___" form the others use). Added *"Work demonstrates capability"* in the Work review draft so the formula is complete wherever it's quoted.

### 2. Inconsistent closing pattern

Home, Work, Lab, and Art each close with a bold one-line tagline in the form *"[District] is where the platform/universe ___."* Research, Products, and About do not — Research ends on "Final Summary" plus a bare status line; Products ends on a "Completion Statement" with no tagline; About ends on a governing quote instead. Not a conceptual gap, but seven documents meant to read as one system should share a closing shape. Proposed taglines are included in the Research, Products, and About review drafts, each explicitly marked as a **proposed addition requiring sign-off**, not a tightening of existing approved language.

### 3. Formatting drift in Research

`RESEARCH_UNIVERSE.md` is the only one of the seven using flat `#`/`##` numbered sections instead of the `##`/`###` pattern the other six share, and the only one without a "Phase Completion" closing section. Cosmetic, but worth a single pass to bring all seven files to one shared shape — recommended as a batch fix at whatever point these documents are next opened for editing, not urgent enough to justify a revision on its own.

### 4. Every document re-describes all six other districts

Home §12, Work §4, Research §15, Lab §4, Art §4/§19, Products §9, and About §22 each contain a version of "here is what every other district owns." This is the right call *once* — Home's version is genuinely the platform's one full map — but repeating the entire roll call in all seven documents means the platform's actual identity statement (seven sentences) is printed roughly forty times across the corpus.

This is **intentional repetition reinforcing a governing boundary**, which the review brief explicitly says to preserve rather than cut. Each review draft keeps a local version, but trimmed to a table of only the relationships that district's own placement tests actually depend on (e.g., Lab keeps its full triangle with Research and Work because its qualification test depends on it; About keeps only the one line distinguishing itself from each neighbor). The full seven-line roll call remains, once, in Home — which is where a visitor actually needs it.

### 5. The word "metaverse" sits in tension with the review brief's own instructions

This review was asked to avoid language that "could describe any... metaverse" and to avoid "vague futurism." The platform's own approved `Project Instructions.txt` and `PLATFORM_VISION.md`, however, explicitly and repeatedly describe the platform as an "explorable architectural metaverse" — and every universe document inherits that framing.

**This is not a contradiction to resolve — it's a naming collision the review should not paper over.** The instruction to avoid generic "metaverse" language is a request to avoid *the flavor of language* generic Web3/virtual-world marketing uses, not an instruction to drop a term the platform's own governing documents have already approved. Each universe document, correctly, works hard to specify what its version of the metaverse concept *is not* (§23 in Home, §30 in Lab, §24 in Art, §19.2 in Products): not a literal city, not a game, not a technology demo. That specificity is exactly the right defense.

**Recommendation:** keep the term where it is approved (Project Instructions, Platform Vision, and each universe document's own governance section). In future content passes — actual page copy, not this governance layer — favor the more precise vocabulary these documents already establish (*field, threshold, territory, chamber, hall*) over the bare word "metaverse," simply because the specific words carry more information than the general one. This is a style note for later content work, not a change to any approved document.

### 6. Seller identity and commercial/legal disclosure have no clear owner

The most substantive finding in this review. See **Conflicts and Ambiguities, Item 1** below — it is deliberately not summarized away here.

### 7. Organizational vocabulary differs by district for the same underlying device

Work calls its durable navigational lenses **"practice areas."** Research and Lab call theirs **"territories."** Products calls its **"families."** Art relies on **"series/collections/exhibitions."** About calls its **"layers."** All five are the same structural device — a stable, small set of durable groupings a visitor can use to re-enter the archive from a different angle. Different words are defensible (a "family" of products is not conceptually the same shape as a "territory" of inquiry), but it means a future shared component (a filter control, a tag chip, a lens switcher) will need per-district copy rather than one shared pattern. Noted as a coordination item for `INFORMATION_ARCHITECTURE.md` and, later, the Design System — not a defect in any single document.

### 8. Information Architecture's open decisions are quietly being closed by the universe documents, one at a time, without IA being updated to match

`INFORMATION_ARCHITECTURE.md` §21.3 lists ten explicitly open decisions, including "Whether Services should remain within Products or eventually receive a distinct structure." `PRODUCTS_UNIVERSE.md` §7.3 has since approved Services as one of seven Product families — which is a reasonable and consistent answer, but IA itself hasn't been revised to record that the question is now closed. Similarly, Lab's "Territory" vocabulary (LAB §16.2) explicitly defers final public labels to IA, which is the correct dependency direction. Recommend a short IA maintenance pass, once all universe documents are through this review cycle, to close out the decisions the universe layer has already implicitly answered.

### 9. Authorial voice is concentrated in two places and thin elsewhere

The platform's strongest first-person design reasoning lives in About §6 (tone) and Research §14 (editorial language) — both are genuinely written from a specific intellectual position rather than a generic one. The other five documents describe atmosphere and rule sets competently but rarely state *why* a rule follows from how the work is actually made. Each review draft adds brief reasoning clauses at these points (for example, Work's note that "corporate," "promotional," "crowded," and "technological spectacle" each correspond to a specific real temptation, not just an adjective to avoid). This is the primary mechanism by which the review responds to the brief's request for stronger architectural reasoning and less generic language — see the Document-by-Document Summary for where it was applied most.

---

## Document-by-Document Summary

### Home

**Strengths preserved:** the Threshold Field concept; the seven-stage spatial narrative; the "exploration may enrich access, never gate it" rule; the full one-place roll call of all six districts.
**Principal revisions:** consolidated four separate passes at "Home is calm and authored" (§§5–8, 14 in v1.0) into one atmosphere statement; cut an adjective-pairing list down to the pairs that constrain an actual design decision.
**Removed repetition:** the "must feel / must not feel" lists, which repeated the same restraint-vs-absence axis four times.
**Increased specificity:** §11 now states what each district's *threshold* suggests, rather than re-summarizing the district itself.
**Personalization introduced:** the studio analogy in §6 ("the way a well-kept studio tells you something about how its owner thinks before you've met them").
**Unresolved questions:** none introduced by this review.
**Proposed conceptual change:** none.

### Work

**Strengths preserved:** the Work–Lab governing distinction (§8) — the platform's single clearest boundary test — kept verbatim; the homepage sequence; the practice-area model.
**Principal revisions:** added the missing canonical verb ("Work demonstrates capability") to complete the cross-platform formula; consolidated two separated scalability discussions (§9, §20) into one.
**Removed repetition:** the ten-item/ten-item "should feel / should not feel" atmosphere list trimmed to four failure modes, each tied to a specific temptation.
**Increased specificity:** none of the placement-test language was touched — it was already exact.
**Personalization introduced:** framing "corporate," "promotional," "crowded," and "spectacle" as four distinct temptations rather than four adjectives.
**Unresolved questions:** none introduced.
**Proposed conceptual change:** none.

### Research

**Strengths preserved:** the "questions before claims" editorial rule (the single most useful writing instruction in the whole corpus); the cyclical Research↔Lab diagram; the full research lifecycle vocabulary.
**Principal revisions:** reformatted to match the heading convention used by the other six documents; added a proposed closing tagline.
**Removed repetition:** none significant — this was already the tightest-written document in the set.
**Increased specificity:** the cross-universe passage table (§9) makes the four directional relationships scannable instead of four separate prose paragraphs.
**Personalization introduced:** framing in the Reviewer's Note that this document's editorial voice should influence the whole platform's honesty about evidence, not just its own copy.
**Unresolved questions:** the proposed closing tagline is new language and needs sign-off (see Conflicts).
**Proposed conceptual change:** none.

### Lab

**Strengths preserved:** the four-part experiment qualification test (§5) and the ten-state lifecycle (§14) — both kept essentially verbatim, since they are the document's real governance.
**Principal revisions:** consolidated six visual-language subsections into one; merged responsive behavior and accessibility, which separately described the same graceful-degradation behavior.
**Removed repetition:** the repeated "belongs to the Design System" boundary statement, previously restated after nearly every visual subsection, now stated once.
**Increased specificity:** the maturation tables (§20) turn four prose subsections about moving into Work, Products, Research, and Art into one scannable structure.
**Personalization introduced:** naming "Work with weaker presentation" as the one failure mode that matters most in §6, since it's the actual temptation (dressing up an unfinished project to dodge Work's higher bar) rather than a generic warning.
**Unresolved questions:** none introduced.
**Proposed conceptual change:** none.

### Art

**Strengths preserved:** the four-part Art qualification test; the Art–Products boundary (§20 in the review, §26 in v1.0) — the clearest ownership boundary in the corpus, kept nearly verbatim; the five viewing states.
**Principal revisions:** thirteen named "Chamber" layouts (v1.0 §18) compressed into one table; five medium-specific disclosure rules (v1.0 §23) compressed into one principle with per-medium specifics.
**Removed repetition:** this document had the most — roughly a third of its original length was scaffolding restating "controls recede, duration is respected, documentation is distinguished from the artwork" once per layout type and once per medium type.
**Increased specificity:** the cross-universe relationship table (§19) and the Art-becomes-purchasable section now read as boundary rules rather than being spread across six subsections.
**Personalization introduced:** identifying "visually louder than the work it holds" as the one failure mode every item in the original "should not feel" list was actually pointing at.
**Unresolved questions:** the Lab-verb terminology fix (see Cross-Platform Finding 1) is applied here but not yet in the approved v1.0 file.
**Proposed conceptual change:** none.

### Products

**Strengths preserved:** the offerability test (§4); the thirteen-state lifecycle vocabulary (§13/§14); the "commerce without pressure" prohibited-patterns list, kept in full since it is precise rather than generic.
**Principal revisions:** cross-referenced the Product Families section against the Page System section instead of restating the same seven commercial forms twice; reframed the per-district ownership tests as a table.
**Removed repetition:** the two-pass description of product families (once as families, once as page types).
**Increased specificity:** none of the commercial-clarity language needed tightening — it was already precise.
**Personalization introduced:** minimal — this document's voice is already appropriately restrained and procedural for a commercial-governance document.
**Unresolved questions:** the seller-identity/legal-disclosure ownership gap (Conflicts, Item 1) originates in this document's §24 and is flagged, not resolved, here.
**Proposed conceptual change:** none.

### About

**Strengths preserved:** the four-part values structure (principle, interpretation, consequence, tension) — the mechanism that keeps values from reading as slogans; the full personal-information governance in §19; the About/Work boundary.
**Principal revisions:** reformatted the thirteen-record content model (v1.0 §28) as a reference table; added a proposed closing tagline.
**Removed repetition:** minimal — this document was already disciplined, closer in quality to Research than to Art or Lab.
**Increased specificity:** the cross-district relationship table (§22) replaces six separate subsections with one scannable structure.
**Personalization introduced:** highlighted §6's prohibited-tone list and §19's governing test ("curiosity alone is not sufficient") as the platform's clearest statements of what "personal but not autobiographical" means — worth reusing as a reference point when actual biography copy gets written.
**Unresolved questions:** the seller-identity/legal-disclosure gap (Conflicts, Item 1) is visible from this document's side as well, in its explicit exclusion of "transaction information."
**Proposed conceptual change:** none.

---

## Comparison Table

| Document | Approved concept preserved | Editorial changes | Structural changes | Conceptual changes proposed | Approval required |
|---|---:|---|---|---|---:|
| Home | Yes — The Threshold Field | Consolidated repeated atmosphere passages; trimmed adjective lists to load-bearing pairs | Relationship-to-districts section reduced to a table | None | No |
| Work | Yes — The Constructed Archive | Trimmed atmosphere list to four named temptations; consolidated two scalability sections | Added the missing canonical verb to complete the cross-platform formula | None | No |
| Research | Yes — The Architectural Observatory and Living Archive | Minimal — already tightly written | Reformatted heading convention to match the other six documents | None | No — but see proposed tagline below |
| Lab | Yes — The Open Test Structure | Consolidated visual-language subsections; merged responsive/accessibility sections | Maturation rules reformatted as tables | None | No |
| Art | Yes — The Chamber of Attention | Compressed thirteen layout types and five medium-disclosure rules into tables/lists | Cross-universe relationships and purchasability boundary reformatted as tables | None | No — but see Lab-verb fix below |
| Products | Yes — The Quiet Exchange Hall | Cross-referenced duplicated family/page-type content | District-ownership tests reformatted as a table | None | No — see Conflicts Item 1 (originates here) |
| About | Yes — About reveals authorship, continuity, and intent | Minimal — already disciplined | Content model reformatted as a reference table | None | No — but see proposed tagline and Lab-verb fix below |

No review draft proposes a conceptual, structural-governance, or district-boundary change. Every item marked "Approval required: No" is a pure tightening of existing approved language. The three items below **do** require explicit approval before adoption, and are intentionally not folded into the table above:

1. **Lab-verb terminology fix** (Art, About) — align "exposes transformation" to Lab's own "tests and transforms."
2. **Proposed closing taglines** (Research, Products, About) — new language, not previously approved.
3. **Seller-identity / legal-disclosure ownership** (Products, About) — a genuine gap, not a wording fix; see below.

---

## Conflicts and Ambiguities

### 1. Seller identity and commercial/legal disclosure have no approved owner

**Where it appears:** `PRODUCTS_UNIVERSE.md` §24 ("Cross-Domain Dependencies") states:

> "About, Legal, and Business Structure — Must provide seller identity, rights-holder information, commercial disclosures, support contacts, policies, and applicable legal terms."

**The conflict:** `ABOUT_UNIVERSE.md` §27 ("Content Boundaries") explicitly lists **"transaction information"** under *what About does not own*, and nowhere in About's own content model (§28) does it claim seller identity, rights-holder status, or commercial/legal disclosure. Meanwhile, `PRODUCTS_UNIVERSE.md`'s own §23 ("Governance and System Boundaries") excludes "legal policy wording" from what Products owns. Each document correctly declines the responsibility; no document accepts it.

**Why it matters:** this is not an abstract governance gap — a functioning storefront needs a stated seller/rights-holder identity somewhere, and it needs to exist before Products moves toward implementation. Left unresolved, it will get invented ad hoc during implementation, which is exactly the "silently establishing a project standard" the platform's own `AGENTS.md` instructs against.

**Viable resolutions:**

- **(a)** Expand About's owned content to include a small Business/Legal layer (seller identity, rights-holder status).
- **(b)** Keep it entirely inside Products' own "Store Information" pages (`PRODUCTS_UNIVERSE.md` §10.6/§11.11), which already claim delivery, licensing, returns, support, privacy, and terms — seller/rights-holder identity would be a small, consistent addition to that existing list.
- **(c)** Treat it as a platform-wide utility, distinct from any district — `INFORMATION_ARCHITECTURE.md` §5's master sitemap already lists **"Legal and administrative information, when required"** under *Global utilities*, alongside Search and Index. This anticipates exactly this content and assigns it to neither About nor Products.

**Recommendation:** **(c)**. IA already provisioned for this as a global utility; the cleanest fix is for `PRODUCTS_UNIVERSE.md` §24 to be reworded so it no longer bundles "Legal and Business Structure" under the "About" heading, and instead cites the IA global-utility layer directly. This resolves the conflict without expanding About's scope (which would cut against About's own §27 boundary and its "About does not own... transaction information" rule) and without overloading Products' Store Information pages with content that isn't really about any one offer. **Left unchanged in both approved documents pending explicit sign-off** — the Products and About review drafts each flag it but do not silently resolve it.

### 2. Lab's own verb is quoted inconsistently by its neighbors

**Where it appears:** `LAB_UNIVERSE.md` (throughout) vs. `ART_UNIVERSE.md` §4.1 and `ABOUT_UNIVERSE.md` §1.

**The conflict:** Lab describes itself as "tests and transforms." Art and About both quote it as "exposes transformation." Not a disagreement about what Lab *does* — both phrasings describe the same activity — but two approved v1.0 documents currently contain different wording for a term a third approved v1.0 document treats as canonical.

**Recommendation:** align Art and About to Lab's own wording, since a district should be the authority on how it describes itself. **Applied in the Art and About review drafts. Not yet applied to the approved v1.0 files** — requires a small, low-risk revision to two approved documents.

### 3. Four documents close with a tagline; three don't

**Where it appears:** Home, Work, Lab, and Art all end on a bold "*[District] is where the platform/universe ___*" line. Research, Products, and About do not.

**Why it matters less than Item 1:** purely a shape inconsistency, not a boundary or ownership question. Included here rather than folded into "safe editorial improvement" below only because the proposed taglines in the three review drafts are **new sentences**, not tightened versions of existing approved language, and new language crosses the line this review was told not to cross unilaterally.

**Recommendation:** approve, reject, or rewrite the three proposed taglines:
- Research: *"The Research Universe is where the platform makes its thinking visible."*
- Products: *"Products is where the practice becomes exchangeable."*
- About: *"About is where the platform becomes a person."*

### 4. Upstream audience-priority decision remains open and both Home and About build on an implicit answer

**Where it appears:** `PLATFORM_VISION.md` §7 explicitly marks "the primary audience and priority order among audiences" as an **Open Vision Decision** (§16, item 2), not yet approved. `ABOUT_UNIVERSE.md`'s dual-speed principle (§5) and Home's first-impression sequencing both implicitly treat professional evaluators and exploratory visitors as equally weighted, parallel tracks — a reasonable design position, but one that hasn't actually been approved at the Vision level it depends on.

**Why it matters:** if the audience priority is ever formally resolved in `PLATFORM_VISION.md` and the answer isn't "equal weight, dual-speed," both Home's and About's approved designs would need revisiting.

**Recommendation:** no change to either document now — flagging this as a dependency to resolve at the Platform Vision level, not a defect in Home or About specifically.

---

## Recommended Adoption Strategy

**Safe editorial improvement** — apply directly, no further discussion needed:
- Every consolidation of repeated atmosphere/scaffolding language (all seven documents).
- Reformatting long prose lists as tables (content models, relationship lists, family/page cross-references).
- The reasoning clauses added throughout to strengthen authorial voice (none alter a rule; all explain one that already existed).

**Coordination improvement** — apply once the affected documents are opened together, not urgent on their own:
- Standardizing Research's heading format to match the other six documents.
- Updating `INFORMATION_ARCHITECTURE.md` to close the "Services within Products" open decision, which `PRODUCTS_UNIVERSE.md` has already effectively answered.
- Unifying the "practice area / territory / family / series / layer" vocabulary at the IA level for future shared filtering components.

**Clarification requiring review** — needs an explicit yes/no before adoption, but is low-risk either way:
- The three proposed closing taglines (Research, Products, About).
- The Lab-verb wording fix in Art and About (aligning to Lab's own "tests and transforms").

**Conceptual change requiring approval** — none proposed in this review.

**Rejected or unnecessary change** — none. Every consolidation kept the full rule set of the source document; nothing was cut for length alone.

**Requires resolution before implementation planning, not just before approval:**
- Seller identity / commercial / legal disclosure ownership (Conflicts, Item 1) — recommend resolving via the existing IA global-utility provision rather than expanding either About's or Products' district scope.

---

## Files Produced

- `HOME_UNIVERSE_CLAUDE_REVIEW.md`
- `WORK_UNIVERSE_CLAUDE_REVIEW.md`
- `RESEARCH_UNIVERSE_CLAUDE_REVIEW.md`
- `LAB_UNIVERSE_CLAUDE_REVIEW.md`
- `ART_UNIVERSE_CLAUDE_REVIEW.md`
- `PRODUCTS_UNIVERSE_CLAUDE_REVIEW.md`
- `ABOUT_UNIVERSE_CLAUDE_REVIEW.md`
- `UNIVERSE_REVIEW_REPORT.md` (this document)

No approved v1.0 file was modified. No proposed revision in this review, or in any of the seven review drafts, is marked approved.
