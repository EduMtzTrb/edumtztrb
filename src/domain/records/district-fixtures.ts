/**
 * District-extended fixture records — M3.2.
 *
 * Extends M3.1's own fixtures (`./fixtures.ts`, left untouched) with a
 * real `extension` object per approved owner district, proving each
 * `DistrictExtensions.ts` extension type is sufficient on real (if
 * fixture) data. Every string is unmistakably a fixture — no invented
 * professional history, no real client/institution names, no real prices.
 */

import {
  fixtureAboutRecord,
  fixtureArtRecord,
  fixtureLabRecord,
  fixtureProductRecord,
  fixtureResearchRecord,
  fixtureWorkRecord,
} from "./fixtures";
import type {
  AboutRecord,
  ArtRecord,
  LabRecord,
  ProductsRecord,
  ResearchRecord,
  WorkRecord,
} from "./DistrictExtensions";

export const fixtureWorkRecordWithExtension: WorkRecord = {
  ...fixtureWorkRecord,
  ownerDistrict: "work",
  extension: {
    extensionFor: "work",
    context: "Fixture project context — not real content.",
    contribution: "Fixture personal contribution, distinct from total project scope.",
    collaborationContext: "Fixture collaboration context with a fixture client.",
    process: "Fixture process narrative.",
    outcome: "Fixture outcome narrative.",
  },
};

export const fixtureResearchRecordWithExtension: ResearchRecord = {
  ...fixtureResearchRecord,
  ownerDistrict: "research",
  extension: {
    extensionFor: "research",
    inquiry: "Fixture research inquiry — what remains uncertain?",
    context: "Fixture research context.",
    methods: "Fixture research method.",
    evidenceSummary: "Fixture evidence summary.",
    currentPosition: "Fixture current position — provisional, not established.",
    uncertainty: "Fixture stated uncertainty.",
    researchActivityState: "ongoing",
  },
};

export const fixtureLabRecordWithExtension: LabRecord = {
  ...fixtureLabRecord,
  ownerDistrict: "lab",
  extension: {
    extensionFor: "lab",
    experimentQuestion: "Fixture experimental question.",
    // A significant failed experiment stays public (Lab Universe §15) —
    // experimentState is independent of the base record's public visibility.
    experimentState: "abandoned",
    version: "Fixture v2",
    lineageNote: "Fixture lineage note describing this branch's position.",
    method: "Fixture method/test description.",
    evidence: "Fixture observable evidence.",
    observation: "Fixture observation.",
    failureNote: "Fixture failure note — divergence from intended behavior.",
    nextQuestion: "Fixture next open question.",
  },
};

export const fixtureArtRecordWithExtension: ArtRecord = {
  ...fixtureArtRecord,
  ownerDistrict: "art",
  extension: {
    extensionFor: "art",
    medium: "Fixture medium.",
    dimensions: "Fixture dimensions.",
    artistStatement: "Fixture artist statement.",
    exhibitionContext: "Fixture exhibition context.",
    presentationCondition: "live",
    // Restrained factual note only — no price, no stock (Art Universe §20).
    editionNote:
      "Fixture edition note — an edition exists; commercial terms are owned by a related Products record.",
  },
};

export const fixtureProductRecordWithExtension: ProductsRecord = {
  ...fixtureProductRecord,
  ownerDistrict: "products",
  extension: {
    extensionFor: "products",
    proposition: "Fixture value proposition.",
    intendedRecipient: "Fixture intended recipient.",
    productFamily: "digital",
    priceBasis: { kind: "fixed", amount: "€000 — fixture only", currency: "EUR" },
    commercialState: "available",
    included: "Fixture included deliverable.",
    exclusions: "Fixture stated exclusion.",
    fulfilmentMethod: "Fixture fulfilment method (download).",
    leadTime: "Fixture lead time.",
    licenseSummary: "Fixture plain-language license summary.",
    requirements: "Fixture requirement.",
    support: "Fixture support description.",
    commitmentLabel: "Purchase",
  },
};

export const fixtureAboutRecordWithExtension: AboutRecord = {
  ...fixtureAboutRecord,
  ownerDistrict: "about",
  extension: {
    extensionFor: "about",
    practiceStatement: "Fixture practice statement.",
    biography: "Fixture biography — not real content.",
    experience: [
      {
        organization: "Fixture Studio",
        role: "Fixture Role",
        period: "Fixture period",
        context: "Fixture context",
      },
    ],
    education: [
      {
        institution: "Fixture Institution",
        qualification: "Fixture Qualification",
        field: "Fixture Field",
      },
    ],
    values: [
      {
        principle: "Fixture principle",
        interpretation: "Fixture interpretation",
        consequence: "Fixture consequence",
        tension: "Fixture tension",
      },
    ],
    methods: ["Fixture method one", "Fixture method two"],
    capabilities: ["Fixture capability"],
    languages: ["Fixture language"],
    location: "Fixture operating context",
    availability: "selectively-available",
    affiliations: "Fixture affiliation.",
    recognition: "Fixture recognition.",
  },
};

export const allFixtureDistrictRecords = [
  fixtureWorkRecordWithExtension,
  fixtureResearchRecordWithExtension,
  fixtureLabRecordWithExtension,
  fixtureArtRecordWithExtension,
  fixtureProductRecordWithExtension,
  fixtureAboutRecordWithExtension,
];
