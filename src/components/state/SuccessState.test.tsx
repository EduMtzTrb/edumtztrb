import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SuccessState } from "./SuccessState";

describe("SuccessState", () => {
  it("renders an explicit heading with polite status semantics", () => {
    render(<SuccessState heading="Fixture: changes saved" />);
    const region = screen.getByRole("status");
    expect(region).toHaveTextContent("Fixture: changes saved");
  });

  it("never uses alert semantics — success should not interrupt", () => {
    render(<SuccessState heading="Fixture: changes saved" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("supports an optional next-step action", () => {
    render(
      <SuccessState
        heading="Fixture: changes saved"
        action={<a href="/fixture-next">Fixture: continue</a>}
      />,
    );
    expect(screen.getByRole("link", { name: "Fixture: continue" })).toBeInTheDocument();
  });
});
