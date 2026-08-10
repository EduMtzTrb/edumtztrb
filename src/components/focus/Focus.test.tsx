import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { FocusRegion, useFocusRegion } from "./FocusRegion";
import { FocusItem } from "./FocusItem";

function ThreeItemRegion() {
  return (
    <FocusRegion>
      <FocusItem
        focusKey="a"
        label="Item A"
        summary={<p>Summary A</p>}
        detail={<p>Detail A — concentrated content</p>}
      />
      <FocusItem
        focusKey="b"
        label="Item B"
        summary={<p>Summary B</p>}
        detail={<p>Detail B — concentrated content</p>}
      />
      <FocusItem
        focusKey="c"
        label="Item C"
        summary={<p>Summary C</p>}
        detail={<p>Detail C — concentrated content</p>}
      />
    </FocusRegion>
  );
}

describe("FocusRegion / FocusItem (M4.4 §A10)", () => {
  it("starts with every item neutral and no detail content rendered", () => {
    render(<ThreeItemRegion />);
    expect(screen.getByRole("button", { name: "Focus: Item A" })).toBeInTheDocument();
    expect(screen.queryByText(/Detail A/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Detail B/)).not.toBeInTheDocument();
  });

  it("opening one item makes it active (reveals detail) and the others recede — summaries stay present, not removed", () => {
    render(<ThreeItemRegion />);
    fireEvent.click(screen.getByRole("button", { name: "Focus: Item A" }));

    expect(screen.getByText("Detail A — concentrated content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Exit focus: Item A" })).toBeInTheDocument();

    // Recession affects context, it does not hide it — B and C's summaries remain queryable.
    expect(screen.getByText("Summary B")).toBeInTheDocument();
    expect(screen.getByText("Summary C")).toBeInTheDocument();
    expect(screen.queryByText(/Detail B/)).not.toBeInTheDocument();
  });

  it("touch/pointer activation (click) works identically to any other trigger — no hover dependency", () => {
    render(<ThreeItemRegion />);
    fireEvent.click(screen.getByRole("button", { name: "Focus: Item B" }));
    expect(screen.getByText("Detail B — concentrated content")).toBeInTheDocument();
  });

  it("switching directly from one active item to another resolves to only the newly opened item — no stale detail lingers", () => {
    render(<ThreeItemRegion />);
    fireEvent.click(screen.getByRole("button", { name: "Focus: Item A" }));
    fireEvent.click(screen.getByRole("button", { name: "Focus: Item C" }));

    expect(screen.getByText("Detail C — concentrated content")).toBeInTheDocument();
    expect(screen.queryByText(/Detail A/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Focus: Item A" })).toBeInTheDocument();
  });

  it("exiting focus restores a fully neutral, stable hierarchy — every item returns to its default state", () => {
    render(<ThreeItemRegion />);
    fireEvent.click(screen.getByRole("button", { name: "Focus: Item A" }));
    fireEvent.click(screen.getByRole("button", { name: "Exit focus: Item A" }));

    expect(screen.queryByText(/Detail A/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Focus: Item A" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Focus: Item B" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Focus: Item C" })).toBeInTheDocument();
  });

  it("the same control that opens Focus also closes it — DOM focus never has to jump to a second element", () => {
    render(<ThreeItemRegion />);
    const control = screen.getByRole("button", { name: "Focus: Item A" });
    control.focus();
    expect(document.activeElement).toBe(control);

    fireEvent.click(control);
    // Still the same DOM node — now relabeled as the exit affordance.
    expect(document.activeElement).toBe(control);
    expect(control).toHaveAccessibleName("Exit focus: Item A");
  });

  it("no keyboard trap exists — every control in the region remains a normal, independently reachable button regardless of focus state", () => {
    render(<ThreeItemRegion />);
    fireEvent.click(screen.getByRole("button", { name: "Focus: Item A" }));

    const controlB = screen.getByRole("button", { name: "Focus: Item B" });
    const controlC = screen.getByRole("button", { name: "Focus: Item C" });
    expect(controlB).not.toHaveAttribute("tabindex", "-1");
    expect(controlC).not.toHaveAttribute("tabindex", "-1");
    expect(controlB.tagName).toBe("BUTTON");
  });

  it("exposes aria-expanded reflecting the real active state, never color/motion alone", () => {
    render(<ThreeItemRegion />);
    const control = screen.getByRole("button", { name: "Focus: Item A" });
    expect(control).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(control);
    expect(control).toHaveAttribute("aria-expanded", "true");
  });

  it("useFocusRegion throws a clear error when used outside a FocusRegion (no silent no-op)", () => {
    function Broken() {
      useFocusRegion();
      return null;
    }
    expect(() => render(<Broken />)).toThrow(/useFocusRegion must be used within a FocusRegion/);
  });
});
