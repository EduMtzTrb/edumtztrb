import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { UnavailableState } from "./UnavailableState";

describe("UnavailableState", () => {
  it("identifies what is unavailable", () => {
    render(<UnavailableState heading="Fixture: currently unavailable" />);
    expect(screen.getByText("Fixture: currently unavailable")).toBeVisible();
  });

  it("supports an optional, consumer-supplied reason — no built-in reason taxonomy", () => {
    render(
      <UnavailableState
        heading="Fixture: currently unavailable"
        reason="Fixture: temporarily out of stock"
      />,
    );
    expect(screen.getByText("Fixture: temporarily out of stock")).toBeVisible();
  });

  it("supports an optional valid next action", () => {
    render(
      <UnavailableState
        heading="Fixture: currently unavailable"
        action={<button type="button">Fixture notify me</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Fixture notify me" })).toBeInTheDocument();
  });
});
