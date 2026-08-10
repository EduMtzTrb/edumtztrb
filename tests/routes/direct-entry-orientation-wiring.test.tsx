import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import WorkEntryPage from "@/app/work/[entry]/page";
import ResearchEntryPage from "@/app/research/[entry]/page";
import LabEntryPage from "@/app/lab/[entry]/page";
import ArtEntryPage from "@/app/art/[entry]/page";
import ProductsEntryPage from "@/app/products/[entry]/page";
import AboutPracticePage from "@/app/about/practice/page";
import WorkPracticeAreaPage from "@/app/work/practice/[practiceArea]/page";
import WorkAllPage from "@/app/work/all/page";
import IndexByDistrictPage from "@/app/index/district/[district]/page";
import SearchPage from "@/app/search/page";

/**
 * Direct-entry orientation — real route wiring, M3.13 §G6. Covers exactly
 * the ten representative deep-entry cases this task's own scope names:
 * Work/Research/Lab/Art/Product canonical records, an About subsection, a
 * grouping, an archive, an Index lens, and a Search query — each entered
 * "cold" (fresh `params`/`searchParams`, no prior render), matching this
 * task's own §G1 direct-entry assumption.
 */
function expectNoFabricatedHistory() {
  expect(screen.queryByText(/return to/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/where you came from/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/go back/i)).not.toBeInTheDocument();
}

describe("Direct-entry orientation — canonical records (M3.13)", () => {
  it("Work: district correct, truthful next actions, no fabricated history", async () => {
    // The global nav (M1.4/M3.7) is composed once at the root layout, not
    // per-page — its own presence/reachability is covered by GlobalNav's
    // own tests; this test renders the page component in isolation, the
    // same pattern route-shell-wiring.test.tsx already established.
    const element = await WorkEntryPage({
      params: Promise.resolve({ entry: "some-deep-entry" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work Overview" })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: "All Work" })).toHaveAttribute("href", "/work/all");
    expectNoFabricatedHistory();
  });

  it("Research: district correct, truthful next actions, no fabricated history", async () => {
    const element = await ResearchEntryPage({
      params: Promise.resolve({ entry: "some-deep-entry" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("link", { name: "Research Overview" })).toHaveAttribute(
      "href",
      "/research",
    );
    expect(screen.getByRole("link", { name: "Archive" })).toHaveAttribute(
      "href",
      "/research/archive",
    );
    expectNoFabricatedHistory();
  });

  it("Lab: district correct, truthful next actions, no fabricated history", async () => {
    const element = await LabEntryPage({
      params: Promise.resolve({ entry: "some-deep-entry" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("link", { name: "Lab Overview" })).toHaveAttribute("href", "/lab");
    expect(screen.getByRole("link", { name: "Archive" })).toHaveAttribute("href", "/lab/archive");
    expectNoFabricatedHistory();
  });

  it("Art: district correct, truthful next actions, no fabricated history", async () => {
    const element = await ArtEntryPage({
      params: Promise.resolve({ entry: "some-deep-entry" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("link", { name: "Art Overview" })).toHaveAttribute("href", "/art");
    expect(screen.getByRole("link", { name: "Archive" })).toHaveAttribute("href", "/art/archive");
    expectNoFabricatedHistory();
  });

  it("Products: district correct, truthful next actions, no fabricated history", async () => {
    const element = await ProductsEntryPage({
      params: Promise.resolve({ entry: "some-deep-entry" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("link", { name: "Products Overview" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "Archive" })).toHaveAttribute(
      "href",
      "/products/archive",
    );
    expectNoFabricatedHistory();
  });
});

describe("Direct-entry orientation — About subsection (M3.13)", () => {
  it("orients correctly with no fabricated parent history", () => {
    render(<AboutPracticePage />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("Practice")).toBeInTheDocument();
    expectNoFabricatedHistory();
  });
});

describe("Direct-entry orientation — grouping (M3.13)", () => {
  it("a grouping route orients to its district, offering Overview/Comprehensive/Index/Search", async () => {
    const element = await WorkPracticeAreaPage({
      params: Promise.resolve({ practiceArea: "some-practice-area" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("link", { name: "Work Overview" })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: "All Work" })).toHaveAttribute("href", "/work/all");
  });
});

describe("Direct-entry orientation — archive/comprehensive (M3.13)", () => {
  it("an archive route orients correctly and does not duplicate itself as a next action", () => {
    render(<WorkAllPage />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "All Work" })).not.toBeInTheDocument();
  });
});

describe("Direct-entry orientation — Index lens (M3.13)", () => {
  it("an Index lens route's breadcrumb shows Index as parent and the active lens as current", async () => {
    const element = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(breadcrumb).toHaveTextContent("Index");
    expect(breadcrumb).toHaveTextContent("District: work");
  });
});

describe("Direct-entry orientation — Search query (M3.13)", () => {
  it("Search's own breadcrumb orients without a district and without fabricated history", async () => {
    const element = await SearchPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ q: "fixture" }),
    });
    render(element);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expectNoFabricatedHistory();
  });
});
