import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { NoResultState } from "./NoResultState";

describe("NoResultState", () => {
  it("explicitly states no matching public records were found", () => {
    render(<NoResultState heading="Fixture: no matching records" />);
    expect(screen.getByText("Fixture: no matching records")).toBeVisible();
  });

  it("preserves supplied query/filter context", () => {
    render(<NoResultState heading="Fixture: no matching records" query={'Fixture: "ceramic"'} />);
    expect(screen.getByText('Fixture: "ceramic"')).toBeVisible();
  });

  it("supports a reset/edit action hook", () => {
    render(
      <NoResultState
        heading="Fixture: no matching records"
        action={<button type="button">Fixture reset filters</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Fixture reset filters" })).toBeInTheDocument();
  });

  it("never implies hidden content — renders nothing beyond the supplied heading/query/action", () => {
    const { container } = render(<NoResultState heading="Fixture: no matching records" />);
    expect(container.querySelector(".static-state-detail")).not.toBeInTheDocument();
    expect(container.querySelector(".static-state-action")).not.toBeInTheDocument();
  });
});
