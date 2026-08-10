import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SparseState } from "./SparseState";

describe("SparseState", () => {
  it("renders as a distinct semantic variant from Empty/Error", () => {
    const { container } = render(<SparseState heading="Fixture: limited entries so far" />);
    expect(container.querySelector(".static-state-sparse")).toBeInTheDocument();
    expect(container.querySelector(".static-state-empty")).not.toBeInTheDocument();
  });

  it("does not use error/alert semantics", () => {
    render(<SparseState heading="Fixture: limited entries so far" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders optional explanation without an action slot — orientation, not a dead end", () => {
    render(
      <SparseState heading="Fixture: limited entries so far" explanation="Fixture explanation" />,
    );
    expect(screen.getByText("Fixture explanation")).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
