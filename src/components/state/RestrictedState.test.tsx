import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { RestrictedState } from "./RestrictedState";

describe("RestrictedState", () => {
  it("renders exactly the consumer-supplied public-safe explanation", () => {
    render(
      <RestrictedState
        heading="Fixture: not publicly available"
        explanation="Fixture: approved public wording"
      />,
    );
    expect(screen.getByText("Fixture: not publicly available")).toBeVisible();
    expect(screen.getByText("Fixture: approved public wording")).toBeVisible();
  });

  it("never renders internal-workflow wording of its own — no default explanation exists", () => {
    const { container } = render(
      <RestrictedState
        heading="Fixture: not publicly available"
        explanation="Fixture: approved public wording"
      />,
    );
    for (const internalTerm of ["Draft", "In Review", "Unpublished", "Pending"]) {
      expect(container.textContent).not.toContain(internalTerm);
    }
  });
});
