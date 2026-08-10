import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { FilterToggle } from "./FilterToggle";

describe("FilterToggle", () => {
  it("renders a native button exposing selection via aria-pressed", () => {
    render(<FilterToggle selected={false}>Available now</FilterToggle>);
    const toggle = screen.getByRole("button", { name: "Available now" });
    expect(toggle.tagName).toBe("BUTTON");
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("reflects the selected prop as aria-pressed=true", () => {
    render(<FilterToggle selected={true}>Available now</FilterToggle>);
    expect(screen.getByRole("button", { name: "Available now" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("fires onClick to let the consumer toggle selection", () => {
    const onClick = vi.fn();
    render(
      <FilterToggle selected={false} onClick={onClick}>
        In stock
      </FilterToggle>,
    );
    fireEvent.click(screen.getByRole("button", { name: "In stock" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports the native disabled attribute", () => {
    const onClick = vi.fn();
    render(
      <FilterToggle selected={false} disabled onClick={onClick}>
        In stock
      </FilterToggle>,
    );
    const toggle = screen.getByRole("button", { name: "In stock" });
    expect(toggle).toBeDisabled();
    fireEvent.click(toggle);
    expect(onClick).not.toHaveBeenCalled();
  });
});
