import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";

import HomePage from "@/app/page";
import WorkPage from "@/app/work/page";
import WorkAllPage from "@/app/work/all/page";
import IndexPage from "@/app/index/page";
import IndexByDistrictPage from "@/app/index/district/[district]/page";
import SearchPage from "@/app/search/page";
import WorkEntryPage from "@/app/work/[entry]/page";

import { queryIndex } from "@/domain/records/IndexModel";
import { searchRecords } from "@/domain/records/SearchModel";
import { resolveRelationship } from "@/domain/records/RelationshipModel";
import { buildCanonicalRouteRegistry } from "@/domain/records/RouteResolver";
import { createRecordRegistry } from "@/domain/records/registry";
import {
  allFixtureRecords,
  fixtureLabRecord,
  fixtureResearchRecord,
  fixtureWorkRecord,
} from "@/domain/records/fixtures";
import type { CanonicalRecordBase } from "@/domain/records/CanonicalRecord";

/**
 * M3-B cumulative integration journeys — Phase H §H2. Exercises real
 * exported page functions and domain functions together, across package
 * boundaries, rather than repeating any single package's own unit tests.
 * See docs/implementation/M3B_NAVIGATION_DISCOVERY_RECONCILIATION.md.
 */
describe("Journey 1 — Direct Home → Work → Work secondary navigation → comprehensive access", () => {
  it("Home renders, Work district root exposes secondary navigation, and comprehensive access (/work/all) is reachable with correct orientation", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeInTheDocument();

    render(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Work" })).toBeInTheDocument();

    render(<WorkAllPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Work — All" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });
});

describe("Journey 2 — Index → active lens/filter → canonical record destination", () => {
  it("an Index lens (district=work) resolves a result whose link is the exact M3.3 canonical route", async () => {
    const element = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(element);
    const link = screen.getByRole("link", { name: /Fixture work outcome/i });
    expect(link).toHaveAttribute("href", "/work/fixture-work-outcome");
  });

  it("/index with a combined district+type filter still resolves to the same canonical routes Index alone would produce", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ fixture: "m3b", district: "work", contentType: "project" }),
    });
    render(element);
    expect(screen.getByRole("link", { name: /Fixture work outcome/i })).toHaveAttribute(
      "href",
      "/work/fixture-work-outcome",
    );
  });
});

describe("Journey 3 — Search query → matching canonical record", () => {
  it("a real query resolves to the exact same canonical destination Index would produce for the same record", async () => {
    const element = await SearchPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ q: "Fixture work outcome", fixture: "m3b" }),
    });
    render(element);
    expect(screen.getByRole("link", { name: /^Fixture work outcome/i })).toHaveAttribute(
      "href",
      "/work/fixture-work-outcome",
    );
  });
});

describe("Journey 4 — Direct deep link → orientation → district overview", () => {
  it("a canonical-record deep link, opened cold, orients to its district and offers a real Overview link", async () => {
    const element = await WorkEntryPage({
      params: Promise.resolve({ entry: "some-deep-entry" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByText("Work")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work Overview" })).toHaveAttribute("href", "/work");
  });
});

describe("Journey 5 — Research record → semantic related Lab destination", () => {
  it("Research's tested-in relationship resolves to Lab's exact canonical route, with ownership unchanged on both ends", () => {
    const registry = createRecordRegistry(allFixtureRecords);
    const relationship = fixtureResearchRecord.relationships?.find((r) => r.type === "tested-in");
    expect(relationship).toBeDefined();

    const resolved = resolveRelationship(fixtureResearchRecord, relationship!, registry);
    expect(resolved.targetRoute).toBe("/lab/fixture-lab-experiment");
    expect(resolved.label).toBe("Tested in");

    // Ownership invariance: resolving the relationship never touches either record's district.
    expect(fixtureResearchRecord.ownerDistrict).toBe("research");
    expect(fixtureLabRecord.ownerDistrict).toBe("lab");
  });
});

describe("Journey 6 — Public archived record → Index/Search → same canonical route", () => {
  it("an archived-but-public record resolves to the identical canonical route through both Index and Search", () => {
    const archived: CanonicalRecordBase = { ...fixtureWorkRecord, lifecycle: "archived" };
    const records = [...allFixtureRecords.filter((r) => r.id !== fixtureWorkRecord.id), archived];

    const indexEntry = queryIndex(records).entries.find((e) => e.record.id === archived.id);
    const searchEntry = searchRecords(records, archived.title).entries.find(
      (e) => e.record.id === archived.id,
    );

    expect(indexEntry).toBeDefined();
    expect(searchEntry).toBeDefined();
    expect(indexEntry!.route).toBe(searchEntry!.route);
    expect(indexEntry!.route).toBe("/work/fixture-work-outcome");
  });
});

describe("Cross-cutting invariants across the full M3-B fixture set", () => {
  it("no duplicate canonical route exists across the whole fixture corpus (M3.3, reconfirmed at M3-B integration level)", () => {
    expect(() => buildCanonicalRouteRegistry(allFixtureRecords)).not.toThrow();
    const registry = buildCanonicalRouteRegistry(allFixtureRecords);
    expect(registry.size).toBe(allFixtureRecords.length);
  });

  it("no duplicate canonical ID exists across the whole fixture corpus", () => {
    expect(() => createRecordRegistry(allFixtureRecords)).not.toThrow();
  });

  it("Search and Index always agree on the public corpus for the full fixture set (parity, reconfirmed at M3-B integration level)", () => {
    const indexIds = new Set(queryIndex(allFixtureRecords).entries.map((e) => e.record.id));
    for (const record of allFixtureRecords) {
      const found = searchRecords(allFixtureRecords, record.title).entries.some(
        (e) => e.record.id === record.id,
      );
      expect(found).toBe(indexIds.has(record.id));
    }
  });
});
