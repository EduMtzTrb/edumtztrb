import { describe, expect, it } from "vitest";

import {
  buildBreadcrumbTrail,
  orientationForRecord,
  orientationForSection,
  orientationForUtility,
} from "./orientation";
import { fixtureWorkRecord, fixtureLabRecord } from "@/domain/records/fixtures";

describe("Orientation model (M3.9)", () => {
  it("district root: a single current item, not linked to itself, no duplicate district entry", () => {
    const context = orientationForSection({
      district: "work",
      currentLabel: "Work",
      currentHref: "/work",
    });
    const trail = buildBreadcrumbTrail(context);
    expect(trail).toEqual([{ label: "Work", href: undefined, current: true }]);
  });

  it("curated view: district (linked) then current curated section", () => {
    const context = orientationForSection({
      district: "lab",
      currentLabel: "Active",
      currentHref: "/lab/active",
    });
    const trail = buildBreadcrumbTrail(context);
    expect(trail).toEqual([
      { label: "Lab", href: "/lab", current: false },
      { label: "Active", current: true },
    ]);
  });

  it("grouping (e.g. Research Publications): district then current grouping, no invented parent", () => {
    const context = orientationForSection({
      district: "research",
      currentLabel: "Publications",
      currentHref: "/research/publications",
    });
    expect(context.parentGrouping).toBeUndefined();
    const trail = buildBreadcrumbTrail(context);
    expect(trail).toHaveLength(2);
    expect(trail[1]).toEqual({ label: "Publications", current: true });
  });

  it("comprehensive/archive view resolves the same way as any other section", () => {
    const context = orientationForSection({
      district: "art",
      currentLabel: "Archive",
      currentHref: "/art/archive",
    });
    expect(context.comprehensiveRoute).toBe("/art/archive");
    const trail = buildBreadcrumbTrail(context);
    expect(trail[trail.length - 1]).toEqual({ label: "Archive", current: true });
  });

  it("canonical record without a parent grouping: district then record title", () => {
    const context = orientationForRecord(fixtureWorkRecord);
    expect(context.district).toBe("work");
    expect(context.contentType).toBe("project");
    expect(context.currentHref).toBe("/work/fixture-work-outcome");
    const trail = buildBreadcrumbTrail(context);
    expect(trail).toEqual([
      { label: "Work", href: "/work", current: false },
      { label: "Fixture work outcome", current: true },
    ]);
  });

  it("canonical record with a genuine parent grouping: district, parent (linked), then record title — parent is contextual, not canonical ownership", () => {
    const context = orientationForRecord(fixtureLabRecord, {
      parentGrouping: { label: "Fixture Prototypes", href: "/lab/prototypes" },
    });
    const trail = buildBreadcrumbTrail(context);
    expect(trail).toEqual([
      { label: "Lab", href: "/lab", current: false },
      { label: "Fixture Prototypes", href: "/lab/prototypes", current: false },
      { label: "Fixture lab experiment", current: true },
    ]);
  });

  it("a parent grouping with no real static destination (dynamic-only route) renders as plain, non-linked text — never an invented route", () => {
    const context = orientationForRecord(fixtureWorkRecord, {
      parentGrouping: { label: "Fixture Collection" },
    });
    const trail = buildBreadcrumbTrail(context);
    expect(trail[1]).toEqual({ label: "Fixture Collection", href: undefined, current: false });
  });

  it("current page being the parent grouping itself is not duplicated as a separate trailing item", () => {
    const context = orientationForRecord(
      { ...fixtureWorkRecord, slug: fixtureWorkRecord.slug },
      { parentGrouping: { label: "Fixture work outcome", href: "/work/fixture-work-outcome" } },
    );
    const trail = buildBreadcrumbTrail(context);
    expect(trail[trail.length - 1]).toEqual({
      label: "Fixture work outcome",
      href: undefined,
      current: true,
    });
    expect(trail).toHaveLength(2);
  });

  it("Index lens route: a global utility with an active lens slot, no owning district, no invented parent", () => {
    const context = orientationForUtility({
      currentLabel: "Index — Theme: Fixture Theme",
      currentHref: "/index/theme/fixture-theme",
      activeLens: { dimension: "theme", value: "fixture-theme" },
    });
    expect(context.district).toBeUndefined();
    expect(context.activeLens).toEqual({ dimension: "theme", value: "fixture-theme" });
    const trail = buildBreadcrumbTrail(context);
    expect(trail).toEqual([{ label: "Index — Theme: Fixture Theme", current: true }]);
  });

  it("global utility (Contact): a single current item, no district, no invented parent history", () => {
    const context = orientationForUtility({ currentLabel: "Contact", currentHref: "/contact" });
    const trail = buildBreadcrumbTrail(context);
    expect(trail).toEqual([{ label: "Contact", current: true }]);
  });

  it("routes exposed by the orientation model are the exact same routes M3.8's DistrictNav already renders — no duplicate route table", () => {
    const context = orientationForSection({
      district: "products",
      currentLabel: "Featured",
      currentHref: "/products/featured",
    });
    expect(context.districtOverviewRoute).toBe("/products");
    expect(context.comprehensiveRoute).toBe("/products/archive");
  });

  it("About has no comprehensive-access route — truthfully absent, never fabricated", () => {
    const context = orientationForSection({
      district: "about",
      currentLabel: "Practice",
      currentHref: "/about/practice",
    });
    expect(context.comprehensiveRoute).toBeUndefined();
  });

  it("priority/classification/lifecycle fields never influence orientation — only identity fields are read", () => {
    const archivedLab: typeof fixtureLabRecord = { ...fixtureLabRecord, lifecycle: "archived" };
    const contextA = orientationForRecord(fixtureLabRecord);
    const contextB = orientationForRecord(archivedLab);
    expect(contextA.currentHref).toBe(contextB.currentHref);
    expect(contextA.district).toBe(contextB.district);
  });

  it("M3.13: a utility route may itself carry a parent grouping (e.g. an Index lens route parented by Index)", () => {
    const context = orientationForUtility({
      currentLabel: "District: work",
      currentHref: "/index/district/work",
      parentGrouping: { label: "Index", href: "/index" },
    });
    const trail = buildBreadcrumbTrail(context);
    expect(trail).toEqual([
      { label: "Index", href: "/index", current: false },
      { label: "District: work", current: true },
    ]);
  });
});
