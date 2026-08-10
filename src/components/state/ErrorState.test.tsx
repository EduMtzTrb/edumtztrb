import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("renders an explicit heading with alert semantics", () => {
    render(<ErrorState heading="Fixture: something went wrong" />);
    const region = screen.getByRole("alert");
    expect(region).toHaveTextContent("Fixture: something went wrong");
  });

  it("supports an optional, user-understandable explanation", () => {
    render(
      <ErrorState
        heading="Fixture: something went wrong"
        explanation="Fixture: the request could not be completed."
      />,
    );
    expect(screen.getByText("Fixture: the request could not be completed.")).toBeVisible();
  });

  it("supports a recovery action hook", () => {
    render(
      <ErrorState
        heading="Fixture: something went wrong"
        action={<button type="button">Fixture retry</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Fixture retry" })).toBeInTheDocument();
  });

  it("is not color-only — the heading text and role=alert carry the meaning independent of styling", () => {
    render(<ErrorState heading="Fixture: something went wrong" />);
    // jsdom does not compute CSS colors; this asserts the two non-color
    // channels (explicit text, programmatic role) are present regardless.
    const region = screen.getByRole("alert");
    expect(region).toHaveTextContent("Fixture: something went wrong");
    expect(region).toHaveClass("static-state-error");
  });
});
