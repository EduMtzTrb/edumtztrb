import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { ComparisonPair } from "./ComparisonPair";

describe("ComparisonPair", () => {
  it("renders exactly two comparison regions inside a labeled group", () => {
    render(
      <ComparisonPair
        label="Fixture before/after"
        first={{ media: <img src="/before.jpg" alt="Fixture before" />, label: "Before" }}
        second={{ media: <img src="/after.jpg" alt="Fixture after" />, label: "After" }}
      />,
    );
    const group = screen.getByRole("group", { name: "Fixture before/after" });
    expect(group).toBeInTheDocument();
    expect(within(group).getAllByRole("figure")).toHaveLength(2);
  });

  it("exposes each item's own label as its figure caption", () => {
    render(
      <ComparisonPair
        label="Fixture before/after"
        first={{ media: <span aria-hidden="true" />, label: "Before" }}
        second={{ media: <span aria-hidden="true" />, label: "After" }}
      />,
    );
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
  });

  it("does not assume identical media dimensions — no shared sizing constraint is applied inline", () => {
    const { container } = render(
      <ComparisonPair
        label="Fixture before/after"
        first={{ media: <span aria-hidden="true" />, label: "Before" }}
        second={{ media: <span aria-hidden="true" />, label: "After" }}
      />,
    );
    for (const slot of container.querySelectorAll(".media-figure-slot")) {
      expect(slot).not.toHaveAttribute("style");
    }
  });
});
