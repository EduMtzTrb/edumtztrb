import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import {
  WorldThresholdShell,
  DistrictOverviewShell,
  CuratedViewShell,
  ComprehensiveViewShell,
  GroupingViewShell,
  UtilityPageShell,
} from "./PageShell";

const SIMPLE_SHELLS = [
  {
    name: "WorldThresholdShell",
    Shell: WorldThresholdShell,
    pageType: "world-threshold",
    headingClass: "type-display",
  },
  {
    name: "DistrictOverviewShell",
    Shell: DistrictOverviewShell,
    pageType: "district-overview",
    headingClass: "type-h1",
  },
  {
    name: "CuratedViewShell",
    Shell: CuratedViewShell,
    pageType: "curated-view",
    headingClass: "type-h1",
  },
  {
    name: "ComprehensiveViewShell",
    Shell: ComprehensiveViewShell,
    pageType: "comprehensive-view",
    headingClass: "type-h1",
  },
  {
    name: "GroupingViewShell",
    Shell: GroupingViewShell,
    pageType: "grouping-view",
    headingClass: "type-h1",
  },
  {
    name: "UtilityPageShell",
    Shell: UtilityPageShell,
    pageType: "utility-page",
    headingClass: "type-h1",
  },
] as const;

describe.each(SIMPLE_SHELLS)("$name", ({ Shell, pageType, headingClass }) => {
  it(`renders data-page-type="${pageType}", exactly one main, and the heading as an H1`, () => {
    const { container } = render(<Shell heading="Test Heading" />);

    const mains = screen.getAllByRole("main");
    expect(mains).toHaveLength(1);
    expect(mains[0]).toHaveAttribute("data-page-type", pageType);

    expect(screen.getByRole("heading", { level: 1, name: "Test Heading" })).toBeInTheDocument();

    // No stray empty landmark/section beyond the single main + its header.
    expect(container.querySelectorAll("section")).toHaveLength(0);
  });

  it(`applies the ${headingClass} typography role to its H1 (M2.2)`, () => {
    render(<Shell heading="Test Heading" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass(headingClass);
  });

  it("applies the composition grid to its main and field-interval to its header (M2.3)", () => {
    render(<Shell heading="Test Heading" />);
    expect(screen.getByRole("main")).toHaveClass("composition");
    expect(screen.getByRole("heading", { level: 1 }).closest("header")).toHaveClass(
      "field-interval",
    );
  });
});

describe("GroupingViewShell / UtilityPageShell — optional children (M3.10)", () => {
  it("GroupingViewShell renders supplied children after the header", () => {
    render(
      <GroupingViewShell heading="Index — District: work">
        <p>Result content</p>
      </GroupingViewShell>,
    );
    expect(screen.getByText("Result content")).toBeInTheDocument();
  });

  it("UtilityPageShell renders supplied children after the header", () => {
    render(
      <UtilityPageShell heading="Index">
        <p>Result content</p>
      </UtilityPageShell>,
    );
    expect(screen.getByText("Result content")).toBeInTheDocument();
  });

  it("renders nothing extra when children is omitted — byte-for-byte the same heading-only shape as before", () => {
    const { container } = render(<GroupingViewShell heading="Test Heading" />);
    expect(container.querySelector("main")?.children).toHaveLength(1);
  });
});

describe("WorldThresholdShell", () => {
  it('carries data-district="home", unique among the simple shells', () => {
    render(<WorldThresholdShell heading="Home" />);
    expect(screen.getByRole("main")).toHaveAttribute("data-district", "home");
  });
});

describe.each(SIMPLE_SHELLS.filter((s) => s.name !== "WorldThresholdShell"))(
  "$name",
  ({ Shell }) => {
    it("does not carry a data-district attribute", () => {
      render(<Shell heading="Test Heading" />);
      expect(screen.getByRole("main")).not.toHaveAttribute("data-district");
    });
  },
);
