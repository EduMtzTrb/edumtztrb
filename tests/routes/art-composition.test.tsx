import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import ArtOverviewPage from "@/app/art/page";
import ArtSelectedPage from "@/app/art/selected/page";
import ArtSeriesPage from "@/app/art/series/[series]/page";
import ArtMediumPage from "@/app/art/medium/[medium]/page";
import ArtExhibitionsPage from "@/app/art/exhibitions/page";
import ArtArchivePage from "@/app/art/archive/page";
import ArtEntryPage from "@/app/art/[entry]/page";

/**
 * M5.5 — Art composition contract. Protects the specific guarantees this
 * package must not silently regress: shared-system reuse (DistrictShell/
 * DistrictField/Index/Focus), curated-vs-comprehensive distinction,
 * canonical-record honesty, real relationship data, and the deliberate
 * encounter-first evidence hierarchy distinct from Work/Research/Lab. See
 * docs/implementation/M5.5_ART.md for the full audit.
 */

const layoutSource = readFileSync(join(process.cwd(), "src", "app", "art", "layout.tsx"), "utf-8");
const overviewSource = readFileSync(join(process.cwd(), "src", "app", "art", "page.tsx"), "utf-8");
const entrySource = readFileSync(
  join(process.cwd(), "src", "app", "art", "[entry]", "page.tsx"),
  "utf-8",
);

describe("Art composition (M5.5)", () => {
  it("/art remains the canonical Art district overview, wired through the shared DistrictShell", () => {
    render(<ArtOverviewPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "district-overview");
    expect(layoutSource).toMatch(/DistrictShell/);
    expect(layoutSource).toMatch(/district="art"/);
  });

  it("consumes DistrictField (M5.0) rather than an Art-specific composition primitive", () => {
    expect(overviewSource).toMatch(
      /import\s*\{\s*DistrictField\s*\}\s*from\s*"@\/components\/composition\/DistrictField"/,
    );
  });

  it("creates no Art-specific stylesheet or palette — no new CSS file exists under src/styles for Art", () => {
    const stylesDir = join(process.cwd(), "src", "styles");
    const files = readdirSync(stylesDir);
    expect(files).not.toContain("art.css");
  });

  it("uses the concentrated density, a reasoned per-district divergence, not a copy-paste default", () => {
    expect(overviewSource).toMatch(/density="concentrated"/);
  });

  it("does not invent public-facing content — the overview thesis is the exact approved ART_UNIVERSE_v1.1.md quotes", () => {
    render(<ArtOverviewPage />);
    expect(screen.getByText("Art concentrates perception.")).toBeInTheDocument();
    expect(
      screen.getByText("The Art Universe is where the platform makes perception inhabitable."),
    ).toBeInTheDocument();
  });

  it("introduces no new district palette or Signal semantics — no inline style/class implies one", () => {
    const { container } = render(<ArtOverviewPage />);
    expect(container.querySelector("[style]")).toBeNull();
    expect(overviewSource.toLowerCase()).not.toMatch(/signal/);
  });

  it("Selected is genuinely curated (featured only) — currently empty because no fixture is marked featured", () => {
    render(<ArtSelectedPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "curated-view");
    expect(screen.getByText("No work is currently marked as selected.")).toBeInTheDocument();
  });

  it("series grouping stays honest — no series catalog is populated, so no series membership is fabricated", async () => {
    const element = await ArtSeriesPage({
      params: Promise.resolve({ series: "some-series" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "grouping-view");
    expect(screen.getByText("No records are classified into this series yet.")).toBeInTheDocument();
  });

  it("medium grouping uses the real extension field — the one fixture's real medium genuinely matches", async () => {
    const element = await ArtMediumPage({
      params: Promise.resolve({ medium: "Fixture medium." }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("link", { name: /Fixture artwork/i })).toHaveAttribute(
      "href",
      "/art/fixture-artwork",
    );
  });

  it("medium grouping honestly returns no match for an arbitrary medium", async () => {
    const element = await ArtMediumPage({
      params: Promise.resolve({ medium: "painting" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByText("No records match this medium.")).toBeInTheDocument();
  });

  it("Exhibitions uses the real content-type lens and stays honestly empty against the one fixture (content type: artwork)", () => {
    render(<ArtExhibitionsPage />);
    expect(screen.getByText(/No public records match this Index scope/)).toBeInTheDocument();
  });

  it("Archive is comprehensive — every publicly discoverable Art record appears, reusing M3.10 IndexResults", () => {
    render(<ArtArchivePage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "comprehensive-view");
    expect(screen.getByRole("link", { name: /Fixture artwork/i })).toHaveAttribute(
      "href",
      "/art/fixture-artwork",
    );
    expect(screen.getByText(/M3-B Fixture Data/)).toBeInTheDocument();
  });

  it("a real canonical Art record resolves via the M3.1 registry — not duplicated, not fabricated", async () => {
    const element = await ArtEntryPage({
      params: Promise.resolve({ entry: "fixture-artwork" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "canonical-record");
    expect(screen.getByRole("heading", { level: 1, name: "Fixture artwork" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Evidence" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Metadata" })).toBeInTheDocument();
  });

  it("an unknown Art slug resolves honestly unavailable via direct entry — never fabricated", async () => {
    const element = await ArtEntryPage({
      params: Promise.resolve({ entry: "no-such-art-record" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(
      screen.getByRole("heading", { level: 1, name: "Record unavailable" }),
    ).toBeInTheDocument();
  });

  it("renders the real artwork media through Focus (M4.4), not a fabricated placeholder rectangle", async () => {
    const element = await ArtEntryPage({
      params: Promise.resolve({ entry: "fixture-artwork" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    const image = screen.getByRole("img", { name: /fixture alt text/i });
    expect(image).toHaveAttribute("src", "/fixtures/fixture-artwork.jpg");
    // The Focus control is real and keyboard-accessible (a native <button>).
    const focusButton = screen.getByRole("button", { name: /Focus: Fixture artwork/i });
    expect(focusButton).toBeInTheDocument();
  });

  it("Focus reveals extended context only while active — never shown by default (progressive disclosure, not a zoomed copy)", async () => {
    const element = await ArtEntryPage({
      params: Promise.resolve({ entry: "fixture-artwork" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.queryByText(/Fixture artist statement/i)).not.toBeInTheDocument();
    const focusButton = screen.getByRole("button", { name: /Focus: Fixture artwork/i });
    focusButton.click();
    expect(await screen.findByText(/Fixture artist statement/i)).toBeInTheDocument();
  });

  it("the canonical record's evidence hierarchy differs from Work's — no Outcome label, no type-body-large field", async () => {
    const element = await ArtEntryPage({
      params: Promise.resolve({ entry: "fixture-artwork" }),
      searchParams: Promise.resolve({}),
    });
    const { container } = render(element);
    const evidence = screen.getByRole("region", { name: "Evidence" });
    expect(within(evidence).queryByText("Outcome.")).not.toBeInTheDocument();
    expect(container.querySelector(".type-body-large")).toBeNull();
  });

  it("relationships render only from real semantic data — the fixture's genuine 'commercialized-as' relationship toward Products, never fabricated geometry", async () => {
    const element = await ArtEntryPage({
      params: Promise.resolve({ entry: "fixture-artwork" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    const relationships = screen.getByRole("region", { name: "Relationships" });
    expect(within(relationships).getByText("Commercialized as")).toBeInTheDocument();
    expect(within(relationships).getByRole("link")).toHaveAttribute(
      "href",
      "/products/fixture-product-edition",
    );
  });

  it("reuses M4.8/M4.9 motion infrastructure unmodified — no second transition system referenced anywhere in Art", () => {
    expect(entrySource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
    expect(overviewSource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
  });

  it("reuses M4.4 Focus unmodified — imports the real shared FocusRegion/FocusItem, not an Art-specific viewer state", () => {
    expect(entrySource).toMatch(
      /import\s*\{\s*FocusRegion\s*\}\s*from\s*"@\/components\/focus\/FocusRegion"/,
    );
    expect(entrySource).toMatch(
      /import\s*\{\s*FocusItem\s*\}\s*from\s*"@\/components\/focus\/FocusItem"/,
    );
  });
});
