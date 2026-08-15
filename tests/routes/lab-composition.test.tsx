import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import LabOverviewPage from "@/app/lab/page";
import LabActivePage from "@/app/lab/active/page";
import LabPrototypesPage from "@/app/lab/prototypes/page";
import LabToolsPage from "@/app/lab/tools/page";
import LabStudiesPage from "@/app/lab/studies/page";
import LabArchivePage from "@/app/lab/archive/page";
import LabEntryPage, { findComparablePredecessor } from "@/app/lab/[entry]/page";
import { createRecordId, createSlug } from "@/domain/records/CanonicalRecord";
import { createRecordRegistry } from "@/domain/records/registry";
import type { LabRecord } from "@/domain/records/DistrictExtensions";

/**
 * M5.4 — Lab composition contract. Protects the specific guarantees this
 * package must not silently regress: shared-system reuse
 * (DistrictShell/DistrictField/Index/Comparison/Trace), state-based curated
 * views, canonical-record honesty (including honest failure/abandonment
 * disclosure), real relationship data, and the deliberate evidence-hierarchy
 * distinction from both Research and Work. See
 * docs/implementation/M5.4_LAB.md for the full audit.
 */

const layoutSource = readFileSync(join(process.cwd(), "src", "app", "lab", "layout.tsx"), "utf-8");
const overviewSource = readFileSync(join(process.cwd(), "src", "app", "lab", "page.tsx"), "utf-8");
const entrySource = readFileSync(
  join(process.cwd(), "src", "app", "lab", "[entry]", "page.tsx"),
  "utf-8",
);

interface LabRecordOverrides {
  id: string;
  slug: string;
  title?: string;
  relationships?: LabRecord["relationships"];
  extension?: Partial<LabRecord["extension"]>;
}

function buildLabRecord(overrides: LabRecordOverrides): LabRecord {
  return {
    id: createRecordId(overrides.id),
    slug: createSlug(overrides.slug),
    title: overrides.title ?? "Test Lab Record",
    ownerDistrict: "lab",
    contentType: "experiment",
    curatorialInclusion: "included",
    visibility: "public",
    lifecycle: "complete",
    summary: "Test summary — not real content.",
    authorship: { primary: { name: "Test Author" } },
    relationships: overrides.relationships,
    extension: {
      extensionFor: "lab",
      ...overrides.extension,
    },
  };
}

describe("Lab composition (M5.4)", () => {
  it("/lab remains the canonical Lab district overview, wired through the shared DistrictShell", () => {
    render(<LabOverviewPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "district-overview");
    expect(layoutSource).toMatch(/DistrictShell/);
    expect(layoutSource).toMatch(/district="lab"/);
  });

  it("consumes DistrictField (M5.0) rather than a Lab-specific composition primitive", () => {
    expect(overviewSource).toMatch(
      /import\s*\{\s*DistrictField\s*\}\s*from\s*"@\/components\/composition\/DistrictField"/,
    );
  });

  it("creates no Lab-specific stylesheet, fake terminal UI, or neon aesthetic — no new CSS file exists under src/styles for Lab", () => {
    const stylesDir = join(process.cwd(), "src", "styles");
    const files = readdirSync(stylesDir);
    expect(files).not.toContain("lab.css");
  });

  it("does not invent public-facing content — the overview thesis is the exact approved LAB_UNIVERSE_v1.1.md quotes", () => {
    render(<LabOverviewPage />);
    expect(screen.getByText("Lab tests and transforms.")).toBeInTheDocument();
    expect(
      screen.getByText("The Lab is where the platform makes change observable."),
    ).toBeInTheDocument();
  });

  it("the overview honestly discloses the fixture's real abandoned state — never hidden or disguised (LAB-11)", () => {
    render(<LabOverviewPage />);
    expect(screen.getByText("abandoned")).toBeInTheDocument();
  });

  it("introduces no new district palette or Signal semantics — no inline style/class implies one", () => {
    const { container } = render(<LabOverviewPage />);
    expect(container.querySelector("[style]")).toBeNull();
    expect(overviewSource.toLowerCase()).not.toMatch(/signal/);
  });

  it("Active filters strictly on the real experimentState — the one fixture (abandoned) honestly does not match", () => {
    render(<LabActivePage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "curated-view");
    expect(screen.getByText("No experiments are currently marked active.")).toBeInTheDocument();
  });

  it("Prototypes/Tools/Studies each use the real content-type lens; Studies genuinely matches the one fixture (experiment), Prototypes/Tools honestly do not", () => {
    render(<LabPrototypesPage />);
    expect(screen.getByText(/No public records match this Index scope/)).toBeInTheDocument();

    render(<LabToolsPage />);
    expect(screen.getAllByText(/No public records match this Index scope/).length).toBeGreaterThan(
      0,
    );

    render(<LabStudiesPage />);
    expect(screen.getByRole("link", { name: /Fixture lab experiment/i })).toHaveAttribute(
      "href",
      "/lab/fixture-lab-experiment",
    );
  });

  it("Archive is comprehensive — every publicly discoverable Lab record appears, reusing M3.10 IndexResults", () => {
    render(<LabArchivePage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "comprehensive-view");
    expect(screen.getByRole("link", { name: /Fixture lab experiment/i })).toHaveAttribute(
      "href",
      "/lab/fixture-lab-experiment",
    );
    expect(screen.getByText(/M3-B Fixture Data/)).toBeInTheDocument();
  });

  it("a real canonical Lab record resolves via the M3.1 registry, including its own honest failed/public lifecycle", async () => {
    const element = await LabEntryPage({
      params: Promise.resolve({ entry: "fixture-lab-experiment" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "canonical-record");
    expect(
      screen.getByRole("heading", { level: 1, name: "Fixture lab experiment" }),
    ).toBeInTheDocument();
    const metadata = screen.getByRole("region", { name: "Metadata" });
    expect(within(metadata).getByText("failed")).toBeInTheDocument();
  });

  it("an unknown Lab slug resolves honestly unavailable via direct entry — never fabricated", async () => {
    const element = await LabEntryPage({
      params: Promise.resolve({ entry: "no-such-lab-record" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(
      screen.getByRole("heading", { level: 1, name: "Record unavailable" }),
    ).toBeInTheDocument();
  });

  it("the Lab evidence hierarchy genuinely differs from Work's and Research's — Question/Observation labels, never Outcome or Position", async () => {
    const element = await LabEntryPage({
      params: Promise.resolve({ entry: "fixture-lab-experiment" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    const evidence = screen.getByRole("region", { name: "Evidence" });
    expect(within(evidence).getByText("Question.")).toBeInTheDocument();
    expect(within(evidence).getByText("Observation.")).toBeInTheDocument();
    expect(within(evidence).queryByText("Outcome.")).not.toBeInTheDocument();
    expect(within(evidence).queryByText("Position.")).not.toBeInTheDocument();
  });

  it("relationships render only from real semantic data — the fixture's genuine 'developed-into'/'commercialized-as' relationships, never fabricated geometry", async () => {
    const element = await LabEntryPage({
      params: Promise.resolve({ entry: "fixture-lab-experiment" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    const relationships = screen.getByRole("region", { name: "Relationships" });
    expect(within(relationships).getByText("Developed into")).toBeInTheDocument();
    expect(within(relationships).getByText("Commercialized as")).toBeInTheDocument();
  });

  it("the live fixture route renders no Comparison table — no real derived-from Lab-to-Lab relationship exists yet, so none is fabricated", async () => {
    const element = await LabEntryPage({
      params: Promise.resolve({ entry: "fixture-lab-experiment" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("findComparablePredecessor returns undefined without a real stored derived-from relationship", () => {
    const current = buildLabRecord({ id: "test-lab-solo", slug: "test-lab-solo" });
    const registry = createRecordRegistry([current]);
    expect(findComparablePredecessor(current, registry)).toBeUndefined();
  });

  it("findComparablePredecessor resolves a real predecessor when a genuine derived-from relationship exists — proving the Comparison-consuming logic is real, not fabricated", () => {
    const predecessor = buildLabRecord({
      id: "test-lab-predecessor",
      slug: "test-lab-predecessor",
      title: "Test Lab Predecessor",
      extension: {
        extensionFor: "lab",
        method: "Method A",
        evidence: "Evidence A",
        observation: "Observation A",
        experimentState: "concluded",
      },
    });
    const current = buildLabRecord({
      id: "test-lab-current",
      slug: "test-lab-current",
      title: "Test Lab Current",
      relationships: [{ targetId: predecessor.id, type: "derived-from" }],
      extension: {
        extensionFor: "lab",
        method: "Method B",
        evidence: "Evidence B",
        observation: "Observation B",
        experimentState: "active",
      },
    });
    const registry = createRecordRegistry([predecessor, current]);

    const found = findComparablePredecessor(current, registry);
    expect(found?.id).toBe(predecessor.id);
    expect(found?.extension.method).toBe("Method A");
  });

  it("reuses M4.10 Comparison unmodified — imports the real shared component, not a Lab-specific comparison system", () => {
    expect(entrySource).toMatch(
      /import\s*\{\s*Comparison\s*\}\s*from\s*"@\/components\/comparison\/Comparison"/,
    );
  });

  it("reuses M4.8/M4.9 motion infrastructure unmodified — no second transition system referenced anywhere in Lab", () => {
    expect(entrySource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
    expect(overviewSource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
  });
});
