import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import ResearchOverviewPage from "@/app/research/page";
import ResearchCurrentPage from "@/app/research/current/page";
import ResearchThemePage from "@/app/research/themes/[theme]/page";
import ResearchPublicationsPage from "@/app/research/publications/page";
import ResearchWritingPage from "@/app/research/writing/page";
import ResearchTalksPage from "@/app/research/talks/page";
import ResearchArchivePage from "@/app/research/archive/page";
import ResearchEntryPage from "@/app/research/[entry]/page";

/**
 * M5.3 — Research composition contract. Protects the specific guarantees
 * this package must not silently regress: shared-system reuse
 * (DistrictShell/DistrictField/Index), curated-vs-comprehensive
 * distinction, canonical-record honesty, real relationship data, and the
 * deliberate evidence-hierarchy distinction from Work. See
 * docs/implementation/M5.3_RESEARCH.md for the full audit.
 */

const layoutSource = readFileSync(
  join(process.cwd(), "src", "app", "research", "layout.tsx"),
  "utf-8",
);
const overviewSource = readFileSync(
  join(process.cwd(), "src", "app", "research", "page.tsx"),
  "utf-8",
);
const entrySource = readFileSync(
  join(process.cwd(), "src", "app", "research", "[entry]", "page.tsx"),
  "utf-8",
);

describe("Research composition (M5.3)", () => {
  it("/research remains the canonical Research district overview, wired through the shared DistrictShell", () => {
    render(<ResearchOverviewPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "district-overview");
    expect(layoutSource).toMatch(/DistrictShell/);
    expect(layoutSource).toMatch(/district="research"/);
  });

  it("consumes DistrictField (M5.0) rather than a Research-specific composition primitive", () => {
    expect(overviewSource).toMatch(
      /import\s*\{\s*DistrictField\s*\}\s*from\s*"@\/components\/composition\/DistrictField"/,
    );
  });

  it("creates no Research-specific stylesheet or design system — no new CSS file exists under src/styles for Research", () => {
    const stylesDir = join(process.cwd(), "src", "styles");
    const files = readdirSync(stylesDir);
    expect(files).not.toContain("research.css");
  });

  it("does not invent public-facing content — the overview thesis is the exact approved RESEARCH_UNIVERSE_v1.1.md quotes", () => {
    render(<ResearchOverviewPage />);
    expect(screen.getByText("Research develops understanding.")).toBeInTheDocument();
    expect(
      screen.getByText("The Research Universe is where the platform makes its thinking visible."),
    ).toBeInTheDocument();
  });

  it("introduces no new district palette or Signal semantics — no inline style/class implies one", () => {
    const { container } = render(<ResearchOverviewPage />);
    expect(container.querySelector("[style]")).toBeNull();
    expect(overviewSource.toLowerCase()).not.toMatch(/signal/);
  });

  it("Current is state-based (lifecycle active), not the same mechanism as Work's featured-based Selected", () => {
    render(<ResearchCurrentPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "curated-view");
    // The one real fixture (lifecycle: "active") genuinely matches — a real, non-fabricated result.
    expect(screen.getByRole("link", { name: /Fixture research inquiry/i })).toHaveAttribute(
      "href",
      "/research/fixture-research-inquiry",
    );
  });

  it("theme grouping uses the real, approved theme lens (M3.4/M3.10), pre-scoped to Research — no invented taxonomy", async () => {
    const element = await ResearchThemePage({
      params: Promise.resolve({ theme: "some-theme" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "grouping-view");
    expect(screen.getByText(/No public records match this Index scope/)).toBeInTheDocument();
  });

  it("Publications/Writing/Talks each use the real content-type lens and stay honestly empty against the one fixture (content type: research-project)", () => {
    render(<ResearchPublicationsPage />);
    expect(screen.getByText(/No public records match this Index scope/)).toBeInTheDocument();

    render(<ResearchWritingPage />);
    expect(screen.getAllByText(/No public records match this Index scope/).length).toBeGreaterThan(
      0,
    );

    render(<ResearchTalksPage />);
    expect(screen.getAllByText(/No public records match this Index scope/).length).toBeGreaterThan(
      0,
    );
  });

  it("Archive is comprehensive — every publicly discoverable Research record appears, reusing M3.10 IndexResults", () => {
    render(<ResearchArchivePage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "comprehensive-view");
    expect(screen.getByRole("link", { name: /Fixture research inquiry/i })).toHaveAttribute(
      "href",
      "/research/fixture-research-inquiry",
    );
    expect(screen.getByText(/M3-B Fixture Data/)).toBeInTheDocument();
  });

  it("a real canonical Research record resolves via the M3.1 registry — not duplicated, not fabricated", async () => {
    const element = await ResearchEntryPage({
      params: Promise.resolve({ entry: "fixture-research-inquiry" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "canonical-record");
    expect(
      screen.getByRole("heading", { level: 1, name: "Fixture research inquiry" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Evidence" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Metadata" })).toBeInTheDocument();
  });

  it("an unknown Research slug resolves honestly unavailable via direct entry — never fabricated", async () => {
    const element = await ResearchEntryPage({
      params: Promise.resolve({ entry: "no-such-research-record" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(
      screen.getByRole("heading", { level: 1, name: "Record unavailable" }),
    ).toBeInTheDocument();
  });

  it("the Research evidence hierarchy genuinely differs from Work's — Question/Position labels, never an Outcome label, and no field gets Work's emphasized treatment", async () => {
    const element = await ResearchEntryPage({
      params: Promise.resolve({ entry: "fixture-research-inquiry" }),
      searchParams: Promise.resolve({}),
    });
    const { container } = render(element);
    const evidence = screen.getByRole("region", { name: "Evidence" });
    expect(within(evidence).getByText("Question.")).toBeInTheDocument();
    expect(within(evidence).getByText("Position.")).toBeInTheDocument();
    expect(within(evidence).queryByText("Outcome.")).not.toBeInTheDocument();
    expect(container.querySelector(".type-body-large")).toBeNull();
  });

  it("relationships render only from real semantic data — the fixture's genuine 'tested-in' relationship, never fabricated geometry", async () => {
    const element = await ResearchEntryPage({
      params: Promise.resolve({ entry: "fixture-research-inquiry" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    const relationships = screen.getByRole("region", { name: "Relationships" });
    expect(within(relationships).getByText("Tested in")).toBeInTheDocument();
    expect(within(relationships).getByRole("link")).toHaveAttribute(
      "href",
      "/lab/fixture-lab-experiment",
    );
  });

  it("reuses M4.8/M4.9 motion infrastructure unmodified — no second transition system referenced anywhere in Research", () => {
    expect(entrySource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
    expect(overviewSource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
  });
});
