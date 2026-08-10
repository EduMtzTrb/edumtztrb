import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { RemovableFilter } from "./RemovableFilter";

describe("RemovableFilter", () => {
  it("displays the current filter criterion as text", () => {
    render(<RemovableFilter label="District: Work" onRemove={() => {}} />);
    expect(screen.getByText("District: Work")).toBeInTheDocument();
  });

  it("exposes removal as a real native button with the criterion in its accessible name", () => {
    render(<RemovableFilter label="District: Work" onRemove={() => {}} />);
    const removeButton = screen.getByRole("button", { name: "Remove District: Work" });
    expect(removeButton.tagName).toBe("BUTTON");
    expect(removeButton).toHaveAttribute("type", "button");
  });

  it("fires onRemove when the remove button is activated", () => {
    const onRemove = vi.fn();
    render(<RemovableFilter label="District: Work" onRemove={onRemove} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove District: Work" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("supports a disabled remove control", () => {
    render(<RemovableFilter label="District: Work" onRemove={() => {}} disabled />);
    expect(screen.getByRole("button", { name: "Remove District: Work" })).toBeDisabled();
  });
});
