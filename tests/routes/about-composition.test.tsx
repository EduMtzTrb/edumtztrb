import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import AboutOverviewPage from "@/app/about/page";
import AboutProfilePage from "@/app/about/profile/page";
import AboutPracticePage from "@/app/about/practice/page";
import AboutExperiencePage from "@/app/about/experience/page";
import AboutEducationPage from "@/app/about/education/page";
import AboutCapabilitiesPage from "@/app/about/capabilities/page";
import AboutRecognitionPage from "@/app/about/recognition/page";
import AboutCurrentFocusPage from "@/app/about/current-focus/page";

/**
 * M5.7 — About composition contract. Protects the specific guarantees this
 * package must not silently regress: no invented public-facing name, no
 * generic `/about/{entry}` route, real (fixture-disclosed) content only,
 * and About's structural distinction from Research. See
 * docs/implementation/M5.7_ABOUT.md for the full audit.
 */

const overviewSource = readFileSync(
  join(process.cwd(), "src", "app", "about", "page.tsx"),
  "utf-8",
);
const profileSource = readFileSync(
  join(process.cwd(), "src", "app", "about", "profile", "page.tsx"),
  "utf-8",
);

describe("About composition (M5.7)", () => {
  it("/about remains the canonical About district overview, wired through the shared DistrictShell", () => {
    render(<AboutOverviewPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "district-overview");
  });

  it("consumes DistrictField (M5.0) rather than an About-specific composition primitive", () => {
    expect(overviewSource).toMatch(
      /import\s*\{\s*DistrictField\s*\}\s*from\s*"@\/components\/composition\/DistrictField"/,
    );
  });

  it("creates no About-specific stylesheet — no new CSS file exists under src/styles for About", () => {
    const stylesDir = join(process.cwd(), "src", "styles");
    const files = readdirSync(stylesDir);
    expect(files).not.toContain("about.css");
  });

  it("does not invent public-facing content — the overview thesis is the exact approved ABOUT_UNIVERSE_v1.1.md quotes", () => {
    render(<AboutOverviewPage />);
    expect(
      screen.getByText("About reveals authorship, continuity, and intent."),
    ).toBeInTheDocument();
    expect(screen.getByText("About is where authorship becomes legible.")).toBeInTheDocument();
  });

  it("never hardcodes a placeholder or invented personal name anywhere in this package's own source", () => {
    const districtDir = join(process.cwd(), "src", "app", "about");
    const forbidden = [/Jane Doe/i, /John Doe/i, /Your Name/i, /\[Name\]/i, /Full Name/i];
    for (const file of walk(districtDir)) {
      if (!file.endsWith("page.tsx")) continue;
      const source = readFileSync(file, "utf-8");
      for (const pattern of forbidden) {
        expect(source).not.toMatch(pattern);
      }
      // The only name string this package renders anywhere is the record's
      // own disclosed fixture authorship, read from the record object —
      // never a second, hardcoded literal name string.
      expect(source).not.toMatch(/authorship=\s*"/);
    }
  });

  it("discloses the fixture authorship name only as fixture content, never as the real platform identity", () => {
    render(<AboutProfilePage />);
    expect(screen.getByText("M3 fixture record — not real public content")).toBeInTheDocument();
    expect(screen.getByText("Fixture Author")).toBeInTheDocument();
  });

  it("/about/profile renders real Position and Biography content", () => {
    render(<AboutProfilePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Fixture profile record" }),
    ).toBeInTheDocument();
    const evidence = screen.getByRole("region", { name: "Evidence" });
    expect(evidence).toHaveTextContent("Fixture practice statement.");
    expect(evidence).toHaveTextContent("Fixture biography");
  });

  it("no generic /about/{entry} route file exists — the route family stays fixed", () => {
    const files = readdirSync(join(process.cwd(), "src", "app", "about"));
    expect(files).not.toContain("[entry]");
  });

  it("/about/practice renders real methods, distinct from /about/capabilities' real capabilities", () => {
    render(<AboutPracticePage />);
    expect(screen.getByText("Fixture method one")).toBeInTheDocument();
    expect(screen.getByText("Fixture method two")).toBeInTheDocument();

    render(<AboutCapabilitiesPage />);
    expect(screen.getByText("Fixture capability")).toBeInTheDocument();
  });

  it("/about/experience renders real experience entries as plain structured text, not linkable records", () => {
    render(<AboutExperiencePage />);
    expect(screen.getByText(/Fixture Role/)).toBeInTheDocument();
    expect(screen.getByText(/Fixture Studio/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Fixture Role/ })).not.toBeInTheDocument();
  });

  it("/about/education renders real education entries", () => {
    render(<AboutEducationPage />);
    expect(screen.getByText(/Fixture Qualification/)).toBeInTheDocument();
    expect(screen.getByText(/Fixture Institution/)).toBeInTheDocument();
  });

  it("/about/recognition renders the real recognition field, disclosed as fixture", () => {
    render(<AboutRecognitionPage />);
    expect(screen.getByText("Fixture recognition.")).toBeInTheDocument();
  });

  it("/about/current-focus renders the real availability fact plus an honest content-decision gap — never an invented narrative", () => {
    render(<AboutCurrentFocusPage />);
    expect(screen.getByText("selectively-available")).toBeInTheDocument();
    expect(
      screen.getByText("Current-focus narrative content is a pending content decision."),
    ).toBeInTheDocument();
  });

  it("About differs structurally from Research — no lifecycle/activity-state curated view exists; About's routes are fixed sections of one record, not curated-vs-comprehensive over many", () => {
    const files = readdirSync(join(process.cwd(), "src", "app", "about"));
    expect(files).not.toContain("archive");
    expect(files).not.toContain("selected");
  });

  it("reuses M4.8/M4.9 motion infrastructure unmodified — no second transition system referenced anywhere in About", () => {
    expect(overviewSource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
    expect(profileSource).not.toMatch(/RecordPassageArrival|RecordReturnControl|ThresholdLink/);
  });
});

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}
