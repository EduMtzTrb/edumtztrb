import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { ComparisonMatrix } from "./ComparisonMatrix";

const ITEMS = [
  { media: <span aria-hidden="true" />, label: "Fixture option A" },
  { media: <span aria-hidden="true" />, label: "Fixture option B" },
  { media: <span aria-hidden="true" />, label: "Fixture option C" },
];

describe("ComparisonMatrix", () => {
  it("renders a labeled group with one figure per supplied item", () => {
    render(<ComparisonMatrix label="Fixture matrix" items={ITEMS} />);
    const group = screen.getByRole("group", { name: "Fixture matrix" });
    expect(within(group).getAllByRole("figure")).toHaveLength(3);
  });

  it("preserves supplied item labels", () => {
    render(<ComparisonMatrix label="Fixture matrix" items={ITEMS} />);
    expect(screen.getByText("Fixture option A")).toBeInTheDocument();
    expect(screen.getByText("Fixture option B")).toBeInTheDocument();
    expect(screen.getByText("Fixture option C")).toBeInTheDocument();
  });

  it("does not wrap items in a generic card element", () => {
    const { container } = render(<ComparisonMatrix label="Fixture matrix" items={ITEMS} />);
    expect(container.querySelector(".card")).not.toBeInTheDocument();
  });

  it("does not force an equal crop on any item's media slot", () => {
    const { container } = render(<ComparisonMatrix label="Fixture matrix" items={ITEMS} />);
    for (const slot of container.querySelectorAll(".media-figure-slot")) {
      expect(slot).not.toHaveAttribute("style");
    }
  });
});
