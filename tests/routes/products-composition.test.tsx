import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import ProductsOverviewPage from "@/app/products/page";
import ProductsFeaturedPage from "@/app/products/featured/page";
import ProductsDigitalPage from "@/app/products/digital/page";
import ProductsPhysicalPage from "@/app/products/physical/page";
import ProductsServicesPage from "@/app/products/services/page";
import ProductsCollectionPage from "@/app/products/collections/[collection]/page";
import ProductsArchivePage from "@/app/products/archive/page";
import ProductsEntryPage from "@/app/products/[entry]/page";

/**
 * M5.6 — Products composition contract. Protects the specific guarantees
 * this package must not silently regress: shared-system reuse, real
 * product-family filtering, canonical-record honesty, honest commerce
 * boundary (no fake Buy button, no transaction infrastructure), and the
 * real origin cross-link back to Art. See docs/implementation/
 * M5.6_PRODUCTS.md for the full audit.
 */

const layoutSource = readFileSync(
  join(process.cwd(), "src", "app", "products", "layout.tsx"),
  "utf-8",
);
const overviewSource = readFileSync(
  join(process.cwd(), "src", "app", "products", "page.tsx"),
  "utf-8",
);
const entrySource = readFileSync(
  join(process.cwd(), "src", "app", "products", "[entry]", "page.tsx"),
  "utf-8",
);

describe("Products composition (M5.6)", () => {
  it("/products remains the canonical Products district overview, wired through the shared DistrictShell", () => {
    render(<ProductsOverviewPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "district-overview");
    expect(layoutSource).toMatch(/DistrictShell/);
    expect(layoutSource).toMatch(/district="products"/);
  });

  it("consumes DistrictField (M5.0) rather than a Products-specific composition primitive", () => {
    expect(overviewSource).toMatch(
      /import\s*\{\s*DistrictField\s*\}\s*from\s*"@\/components\/composition\/DistrictField"/,
    );
  });

  it("creates no Products-specific stylesheet or CTA-color palette — no new CSS file exists under src/styles for Products", () => {
    const stylesDir = join(process.cwd(), "src", "styles");
    const files = readdirSync(stylesDir);
    expect(files).not.toContain("products.css");
  });

  it("does not invent public-facing content — the overview thesis is the exact approved PRODUCTS_UNIVERSE_v1.1.md quotes", () => {
    render(<ProductsOverviewPage />);
    expect(screen.getByText("Products operationalizes value.")).toBeInTheDocument();
    expect(screen.getByText("Products is where value becomes offerable.")).toBeInTheDocument();
  });

  it("introduces no new district palette or Signal semantics — no inline style/class implies one", () => {
    const { container } = render(<ProductsOverviewPage />);
    expect(container.querySelector("[style]")).toBeNull();
    expect(overviewSource.toLowerCase()).not.toMatch(/signal/);
  });

  it("Featured is genuinely curated (featured only) — currently empty because no fixture is marked featured", () => {
    render(<ProductsFeaturedPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "curated-view");
    expect(screen.getByText("No offer is currently marked as featured.")).toBeInTheDocument();
  });

  it("Digital uses the real productFamily field and genuinely matches the one extended fixture", () => {
    render(<ProductsDigitalPage />);
    expect(screen.getByRole("link", { name: /Fixture product offer/i })).toHaveAttribute(
      "href",
      "/products/fixture-product-offer",
    );
  });

  it("Physical/Services honestly return no match — the one extended fixture declares digital, not physical or service", () => {
    render(<ProductsPhysicalPage />);
    expect(screen.getByText("No physical offers exist yet.")).toBeInTheDocument();

    render(<ProductsServicesPage />);
    expect(screen.getByText("No services exist yet.")).toBeInTheDocument();
  });

  it("collection grouping stays honest — no collection catalog is populated, so no collection membership is fabricated", async () => {
    const element = await ProductsCollectionPage({
      params: Promise.resolve({ collection: "some-collection" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "grouping-view");
    expect(
      screen.getByText("No offers are classified into this collection yet."),
    ).toBeInTheDocument();
  });

  it("Archive is comprehensive — every publicly discoverable Products record appears, reusing M3.10 IndexResults", () => {
    render(<ProductsArchivePage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "comprehensive-view");
    expect(screen.getByRole("link", { name: /Fixture product offer/i })).toHaveAttribute(
      "href",
      "/products/fixture-product-offer",
    );
    expect(screen.getByRole("link", { name: /Fixture product edition/i })).toHaveAttribute(
      "href",
      "/products/fixture-product-edition",
    );
  });

  it("a real canonical Products record resolves via the M3.1 registry with real price/availability", async () => {
    const element = await ProductsEntryPage({
      params: Promise.resolve({ entry: "fixture-product-offer" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "canonical-record");
    expect(
      screen.getByRole("heading", { level: 1, name: "Fixture product offer" }),
    ).toBeInTheDocument();
    const metadata = screen.getByRole("region", { name: "Metadata" });
    expect(within(metadata).getByText("available")).toBeInTheDocument();
    expect(within(metadata).getByText(/€000 — fixture only EUR/)).toBeInTheDocument();
  });

  it("an unknown Products slug resolves honestly unavailable via direct entry — never fabricated", async () => {
    const element = await ProductsEntryPage({
      params: Promise.resolve({ entry: "no-such-product" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(
      screen.getByRole("heading", { level: 1, name: "Record unavailable" }),
    ).toBeInTheDocument();
  });

  it("never renders a functional Buy/checkout control — commitmentLabel is disclosed as plain text only", async () => {
    const element = await ProductsEntryPage({
      params: Promise.resolve({ entry: "fixture-product-offer" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.queryByRole("button", { name: /purchase/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^purchase$/i })).not.toBeInTheDocument();
    expect(screen.getByText("Purchase")).toBeInTheDocument();
    expect(entrySource).not.toMatch(/action-primary/);
  });

  it("the real origin cross-link back to Art renders via listIncomingRelationships on the record Art actually points to", async () => {
    const element = await ProductsEntryPage({
      params: Promise.resolve({ entry: "fixture-product-edition" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    const relationships = screen.getByRole("region", { name: "Relationships" });
    expect(within(relationships).getByText("Commercial origin of")).toBeInTheDocument();
    expect(within(relationships).getByRole("link")).toHaveAttribute("href", "/art/fixture-artwork");
  });

  it("reuses M3.5 RelationshipModel's real listIncomingRelationships — no second reverse-edge store", () => {
    expect(entrySource).toMatch(
      /import\s*\{\s*listIncomingRelationships\s*\}\s*from\s*"@\/domain\/records\/RelationshipModel"/,
    );
  });

  it("reuses M4.8/M4.9 motion infrastructure unmodified — no second transition system referenced anywhere in Products", () => {
    expect(entrySource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
    expect(overviewSource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
  });
});
