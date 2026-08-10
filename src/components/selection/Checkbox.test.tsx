import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a native checkbox associated with its visible label", () => {
    render(<Checkbox label="Subscribe to updates" />);
    const checkbox = screen.getByRole("checkbox", { name: "Subscribe to updates" });
    expect(checkbox.tagName).toBe("INPUT");
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  it("toggles checked state on click", () => {
    render(<Checkbox label="Subscribe" />);
    const checkbox = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("exposes checked state programmatically when controlled", () => {
    render(<Checkbox label="Subscribe" checked readOnly />);
    expect(screen.getByRole("checkbox", { name: "Subscribe" })).toBeChecked();
  });

  it("supports the native disabled attribute", () => {
    // Real browsers withhold both the click/change event and its default
    // action for a disabled form control. jsdom's fireEvent dispatches a
    // synthetic event directly and does not fully replicate that
    // withholding, so this asserts the one thing that's actually
    // meaningful and reliably testable here: the native `disabled` state
    // is set and programmatically exposed.
    render(<Checkbox label="Subscribe" disabled />);
    expect(screen.getByRole("checkbox", { name: "Subscribe" })).toBeDisabled();
  });
});
