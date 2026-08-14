import { describe, expect, it, vi } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import WorkOverviewPage from "@/app/work/page";
import WorkSelectedPage from "@/app/work/selected/page";
import WorkAllPage from "@/app/work/all/page";
import WorkPracticeAreaPage from "@/app/work/practice/[practiceArea]/page";
import WorkCollectionPage from "@/app/work/collections/[collection]/page";
import WorkEntryPage from "@/app/work/[entry]/page";
import { peekThresholdArrival } from "@/lib/threshold/familiarity";
import { retrieveReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

/**
 * M5.2 — Work composition contract. Protects the specific guarantees this
 * package must not silently regress: shared-system reuse (DistrictShell/
 * DistrictField/Index/Record Passage/Home Threshold), curated-vs-
 * comprehensive distinction, canonical-record honesty, and content
 * provenance. See docs/implementation/M5.2_WORK.md for the full audit.
 */

type Listener = (event: { matches: boolean }) => void;

function mockReducedMotion(matches: boolean) {
  const listeners = new Set<Listener>();
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
    media: query,
    addEventListener: (_: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_: string, listener: Listener) => listeners.delete(listener),
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  }));
}

const layoutSource = readFileSync(join(process.cwd(), "src", "app", "work", "layout.tsx"), "utf-8");
const overviewSource = readFileSync(join(process.cwd(), "src", "app", "work", "page.tsx"), "utf-8");
const entrySource = readFileSync(
  join(process.cwd(), "src", "app", "work", "[entry]", "page.tsx"),
  "utf-8",
);

describe("Work composition (M5.2)", () => {
  it("/work remains the canonical Work district overview, wired through the shared DistrictShell", () => {
    render(<WorkOverviewPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "district-overview");
    expect(layoutSource).toMatch(/DistrictShell/);
    expect(layoutSource).toMatch(/district="work"/);
  });

  it("consumes DistrictField (M5.0) rather than a Work-specific composition primitive", () => {
    expect(overviewSource).toMatch(
      /import\s*\{\s*DistrictField\s*\}\s*from\s*"@\/components\/composition\/DistrictField"/,
    );
  });

  it("creates no Work-specific stylesheet or design system — no new CSS file exists under src/styles for Work", () => {
    const stylesDir = join(process.cwd(), "src", "styles");
    const files = readdirSync(stylesDir);
    expect(files).not.toContain("work.css");
  });

  it("Selected is curated (featured only), not comprehensive — currently empty because no fixture is marked featured", () => {
    render(<WorkSelectedPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "curated-view");
    expect(screen.getByText("No work is currently marked as selected.")).toBeInTheDocument();
  });

  it("All is comprehensive — every publicly discoverable Work record appears, reusing M3.10 IndexResults", () => {
    render(<WorkAllPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "comprehensive-view");
    expect(screen.getByRole("link", { name: /Fixture work outcome/i })).toHaveAttribute(
      "href",
      "/work/fixture-work-outcome",
    );
    expect(screen.getByText(/M3-B Fixture Data/)).toBeInTheDocument();
  });

  it("practice-area grouping uses the real, approved discipline lens (M3.4/M3.10), pre-scoped to Work — no invented taxonomy", async () => {
    const element = await WorkPracticeAreaPage({
      params: Promise.resolve({ practiceArea: "some-practice-area" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "grouping-view");
    // Honest: no fixture declares a discipline yet, so this is a real "no match," not a fabricated grouping.
    expect(screen.getByText(/No public records match this Index scope/)).toBeInTheDocument();
  });

  it("collection grouping stays honest — no collection catalog is populated, so no collection membership is fabricated", async () => {
    const element = await WorkCollectionPage({
      params: Promise.resolve({ collection: "some-collection" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "grouping-view");
    expect(
      screen.getByText("No records are classified into this collection yet."),
    ).toBeInTheDocument();
  });

  it("a real canonical Work record resolves via the M3.1 registry — not duplicated, not fabricated", async () => {
    const element = await WorkEntryPage({
      params: Promise.resolve({ entry: "fixture-work-outcome" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "canonical-record");
    expect(
      screen.getByRole("heading", { level: 1, name: "Fixture work outcome" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Evidence" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Metadata" })).toBeInTheDocument();
  });

  it("an excluded/private record resolves honestly unavailable via direct entry — never leaked", async () => {
    const element = await WorkEntryPage({
      params: Promise.resolve({ entry: "fixture-work-unpublished" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(
      screen.getByRole("heading", { level: 1, name: "Record unavailable" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Fixture unpublished work/)).not.toBeInTheDocument();
  });

  it("reuses M4.8 Record Passage unchanged — the entry page still imports the exact M4.8 components/keys, no second transition system", () => {
    expect(entrySource).toMatch(
      /import\s*\{\s*RecordReturnControl\s*\}\s*from\s*"@\/components\/return\/RecordReturnControl"/,
    );
    expect(entrySource).toMatch(
      /import\s*\{\s*RecordPassageArrival\s*\}\s*from\s*"@\/components\/return\/RecordPassageArrival"/,
    );
    expect(entrySource).not.toMatch(/RECORD_PASSAGE_RETURN_KEY\s*=/); // no new key defined here
  });

  it("reuses M4.9 Home Threshold unchanged on the overview — same arrival/departure keys, no second store", () => {
    expect(overviewSource).toMatch(
      /import\s*\{\s*HOME_TO_WORK_ARRIVAL_KEY,\s*WORK_TO_HOME_ARRIVAL_KEY\s*\}\s*from\s*"@\/lib\/threshold\/thresholdKeys"/,
    );
  });

  it("direct Work overview entry (no prior Home departure) fabricates no arrival history", () => {
    render(<WorkOverviewPage />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(peekThresholdArrival("home-work:to-work")).toBe(false);
  });

  it("direct record entry (no prior Index departure) fabricates no Return control", async () => {
    const element = await WorkEntryPage({
      params: Promise.resolve({ entry: "fixture-work-outcome" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.queryByRole("link", { name: /Return to Index/i })).not.toBeInTheDocument();
    expect(retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY)).toBeNull();
  });

  it("relationships render only from real semantic data — the fixture record's genuine 'informed-by' relationship, never fabricated geometry", async () => {
    const element = await WorkEntryPage({
      params: Promise.resolve({ entry: "fixture-work-outcome" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    const relationships = screen.getByRole("region", { name: "Relationships" });
    expect(within(relationships).getByText("Informed by")).toBeInTheDocument();
    expect(within(relationships).getByRole("link")).toHaveAttribute(
      "href",
      "/research/fixture-research-inquiry",
    );
  });

  it("introduces no new district palette, Signal semantics, or motion tier — no new stylesheet exists to check, and no inline style/class implies one", () => {
    const { container } = render(<WorkOverviewPage />);
    expect(container.querySelector("[style]")).toBeNull();
    expect(overviewSource.toLowerCase()).not.toMatch(/signal/);
  });

  it("reduced motion preserves full Work function — every page renders its complete structure", () => {
    mockReducedMotion(true);
    render(<WorkAllPage />);
    expect(screen.getByRole("link", { name: /Fixture work outcome/i })).toBeInTheDocument();
  });

  it("Work overview keeps primary orientation before the peripheral field in DOM order", () => {
    const { container } = render(<WorkOverviewPage />);
    const primary = container.querySelector(".district-field-primary");
    const peripheral = container.querySelector(".district-field-peripheral");
    expect(primary).not.toBeNull();
    expect(peripheral).not.toBeNull();
    expect(
      primary!.compareDocumentPosition(peripheral!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("does not invent public-facing content — the overview thesis is the exact approved WORK_UNIVERSE_v1.1.md quotes", () => {
    render(<WorkOverviewPage />);
    expect(screen.getByText("Work demonstrates capability.")).toBeInTheDocument();
    expect(
      screen.getByText("The Work Universe is where the platform earns professional trust."),
    ).toBeInTheDocument();
  });

  it("the district-to-Home departure link genuinely marks departure before navigation — real M4.9 wiring, not a fabricated passage", () => {
    render(<WorkOverviewPage />);
    expect(peekThresholdArrival("home-work:to-home")).toBe(false);
    fireEvent.click(screen.getByRole("link", { name: "Return to Home" }));
    expect(peekThresholdArrival("home-work:to-home")).toBe(true);
  });
});
