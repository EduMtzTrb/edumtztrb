import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders an explicit heading explaining what is empty", () => {
    render(<EmptyState heading="Fixture: no items yet" />);
    expect(screen.getByText("Fixture: no items yet")).toBeVisible();
  });

  it("does not use error/alert semantics — absence is not failure", () => {
    render(<EmptyState heading="Fixture: no items yet" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders an optional next valid action, absent when not supplied", () => {
    const { rerender } = render(<EmptyState heading="Fixture: no items yet" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(
      <EmptyState
        heading="Fixture: no items yet"
        action={<button type="button">Fixture add</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Fixture add" })).toBeInTheDocument();
  });

  it("renders no filler content beyond what is supplied", () => {
    const { container } = render(<EmptyState heading="Fixture: no items yet" />);
    expect(container.querySelector(".static-state-explanation")).not.toBeInTheDocument();
    expect(container.querySelector(".static-state-action")).not.toBeInTheDocument();
  });
});
