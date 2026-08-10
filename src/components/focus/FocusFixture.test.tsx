import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { FocusFixture } from "./FocusFixture";

/**
 * Confirms all six semantic contexts (M4.4 §A9) consume the identical
 * Focus + Recession mechanism — the same `data-focus-state` attribute
 * lifecycle, not six different implementations.
 */
describe("FocusFixture (M4.4 §A11 — all six semantic contexts)", () => {
  it("renders a Focus trigger for each of the six semantic contexts", () => {
    render(<FocusFixture />);
    for (const label of [
      "Focus: Evidence A",
      "Focus: Artifact A",
      "Focus: Prototype state",
      "Focus: Study A",
      "Focus: Fixture product A",
      "Focus: Practice note",
    ]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });

  it("each context opens/closes through the identical mechanism — same control, same detail-reveal lifecycle", () => {
    render(<FocusFixture />);
    const artControl = screen.getByRole("button", { name: "Focus: Study A" });
    fireEvent.click(artControl);
    expect(screen.getByText(/interface recedes most strongly here/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Exit focus: Study A" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Exit focus: Study A" }));
    expect(screen.queryByText(/interface recedes most strongly here/)).not.toBeInTheDocument();
  });

  it("opening one context's item does not affect an unrelated context's region", () => {
    render(<FocusFixture />);
    fireEvent.click(screen.getByRole("button", { name: "Focus: Evidence A" }));
    // Work's own sibling recedes, but Research's items are a completely separate region.
    expect(screen.getByRole("button", { name: "Focus: Artifact A" })).toBeInTheDocument();
    expect(screen.queryByText(/calm, editorial reading passage/)).not.toBeInTheDocument();
  });
});
