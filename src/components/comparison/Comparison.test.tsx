import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Comparison } from "./Comparison";

describe("Comparison (M4.10 §C4)", () => {
  const rows = [
    { label: "Input", left: "Dataset A", right: "Dataset B" },
    { label: "Method", left: "Method 1", right: "Method 2" },
  ];

  it("renders one shared row per property, both sides sharing identical labels", () => {
    render(<Comparison leftHeading="Attempt A" rightHeading="Attempt B" rows={rows} />);
    expect(screen.getByRole("columnheader", { name: "Attempt A" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Attempt B" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Input" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Method" })).toBeInTheDocument();
    expect(screen.getByText("Dataset A")).toBeInTheDocument();
    expect(screen.getByText("Dataset B")).toBeInTheDocument();
  });

  it("preserves row order — a real semantic <table>, so reference stays structurally guaranteed", () => {
    render(<Comparison leftHeading="A" rightHeading="B" rows={rows} />);
    const rowHeaders = screen.getAllByRole("rowheader").map((el) => el.textContent);
    expect(rowHeaders).toEqual(["Input", "Method"]);
  });

  it("is understandable without motion — content is real text, not conveyed by animation", () => {
    render(<Comparison leftHeading="A" rightHeading="B" rows={rows} />);
    // A plain synchronous render already proves this: no timers, no effects needed to see the content.
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
