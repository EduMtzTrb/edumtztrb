/**
 * Classification catalog fixtures — M3.4.
 *
 * A small, deliberately minimal set of controlled terms — enough to
 * exercise every supported dimension once, not a speculative full
 * taxonomy (this task's own C9: "do not design an exhaustive theme
 * taxonomy now"). Discipline terms use real WORK_UNIVERSE_v1.1.md §9
 * approved practice-area vocabulary, since discipline is genuine
 * platform-wide controlled vocabulary, not invented demo content.
 * Collection/series/territory/theme/contribution-role terms are
 * unmistakably fixture examples.
 */

import { createClassificationCatalog, createTermId } from "./ClassificationModel";
import type { ClassificationTerm } from "./ClassificationModel";

/** WORK_UNIVERSE_v1.1.md §9 (WU-10) — real approved cross-district discipline vocabulary, not fixture prose. */
export const disciplineTermComputationalDesign: ClassificationTerm = {
  id: createTermId("computational-design"),
  dimension: "discipline",
  label: "Computational Design",
  description: "WORK_UNIVERSE_v1.1.md §9 (WU-10) approved practice-area/discipline vocabulary.",
};

export const themeTermContinuity: ClassificationTerm = {
  id: createTermId("fixture-theme-continuity"),
  dimension: "theme",
  label: "Fixture theme — continuity across disciplines",
};

export const collectionTermWork: ClassificationTerm = {
  id: createTermId("fixture-work-collection"),
  dimension: "collection",
  label: "Fixture Work collection",
  districtScope: ["work"],
};

export const collectionTermProducts: ClassificationTerm = {
  id: createTermId("fixture-products-collection"),
  dimension: "collection",
  label: "Fixture Products collection",
  districtScope: ["products"],
};

export const territoryTermResearch: ClassificationTerm = {
  id: createTermId("fixture-research-territory"),
  dimension: "territory",
  label: "Fixture research territory",
  districtScope: ["research"],
};

export const seriesTermArt: ClassificationTerm = {
  id: createTermId("fixture-art-series"),
  dimension: "series",
  label: "Fixture art series",
  districtScope: ["art"],
};

export const contributionRoleTermLead: ClassificationTerm = {
  id: createTermId("lead"),
  dimension: "contribution-role",
  label: "Lead",
};

export const fixtureClassificationTerms: ClassificationTerm[] = [
  disciplineTermComputationalDesign,
  themeTermContinuity,
  collectionTermWork,
  collectionTermProducts,
  territoryTermResearch,
  seriesTermArt,
  contributionRoleTermLead,
];

export const fixtureClassificationCatalog = createClassificationCatalog(fixtureClassificationTerms);
