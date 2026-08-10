import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Action } from "./Action";

describe("Action", () => {
  it("renders a native button, type=button, defaulting to the primary level", () => {
    render(<Action>Continue</Action>);
    const button = screen.getByRole("button", { name: "Continue" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("action-primary");
  });

  it("supports type=submit for real form submission (M2.10's extension), without changing the default", () => {
    render(<Action type="submit">Save changes</Action>);
    expect(screen.getByRole("button", { name: "Save changes" })).toHaveAttribute("type", "submit");
  });

  it.each(["primary", "secondary", "tertiary"] as const)(
    "applies action-%s for level=%s",
    (level) => {
      render(<Action level={level}>Go</Action>);
      expect(screen.getByRole("button")).toHaveClass(`action-${level}`);
    },
  );

  it("applies the type-label typography role (M2.2)", () => {
    render(<Action>Go</Action>);
    expect(screen.getByRole("button")).toHaveClass("type-label");
  });

  it("supports the native disabled attribute and blocks clicks", () => {
    const onClick = vi.fn();
    render(
      <Action disabled onClick={onClick}>
        Go
      </Action>,
    );
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("supports aria-busy for the loading state without disabling the element", () => {
    render(<Action aria-busy="true">Saving</Action>);
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).not.toBeDisabled();
  });

  it("renders an icon-only control at the required accessible name, with the icon-only hit-area class", () => {
    render(
      <Action iconOnly aria-label="Close">
        <span aria-hidden="true">×</span>
      </Action>,
    );
    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toHaveClass("action-icon-only");
  });
});
