import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { MotionFixture } from "./MotionFixture";

describe("MotionFixture (M4.3 §C21)", () => {
  it("demonstrates all eight required states using real shared components", () => {
    render(<MotionFixture />);

    // Hover/focus-visible/press — a real Action and a real inline ActionLink.
    expect(screen.getByRole("button", { name: /hover, tab to, or click me/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "an inline link" })).toBeInTheDocument();

    // Selected — a real FilterToggle and a real Checkbox.
    expect(screen.getByRole("button", { name: /not selected/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("checkbox", { name: "A checkbox" })).not.toBeChecked();

    // Loading — a real Action carrying aria-busy.
    expect(screen.getByRole("button", { name: /toggle loading/i })).toHaveAttribute(
      "aria-busy",
      "false",
    );

    // Success — a real SuccessState.
    expect(screen.getByText("Fixture: action completed")).toBeInTheDocument();

    // Error — a real invalid TextField plus a real ErrorState.
    expect(screen.getByLabelText("Fixture field")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Fixture: something needs attention")).toBeInTheDocument();

    // Disabled — a real disabled Action.
    expect(screen.getByRole("button", { name: /disabled action/i })).toBeDisabled();

    // Interruption demo is present.
    expect(
      screen.getByRole("button", { name: /trigger motion \(click rapidly/i }),
    ).toBeInTheDocument();
  });

  it("selected/checked/loading states toggle on interaction", () => {
    render(<MotionFixture />);

    fireEvent.click(screen.getByRole("button", { name: /not selected/i }));
    expect(screen.getByRole("button", { name: /^selected$/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "A checkbox" }));
    expect(screen.getByRole("checkbox", { name: "A checkbox" })).toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: /toggle loading/i }));
    expect(screen.getByRole("button", { name: /^loading…$/i })).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });
});
