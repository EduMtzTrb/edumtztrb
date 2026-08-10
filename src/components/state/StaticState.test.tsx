import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { StaticState } from "./StaticState";

describe("StaticState (shared foundation)", () => {
  it("always renders a heading and applies the supplied variant class", () => {
    const { container } = render(
      <StaticState heading="Fixture heading" className="static-state-empty" />,
    );
    expect(screen.getByText("Fixture heading")).toBeVisible();
    expect(container.firstElementChild).toHaveClass("static-state", "static-state-empty");
  });

  it("applies a role only when explicitly supplied", () => {
    const { container: withoutRole } = render(
      <StaticState heading="Fixture" className="static-state-empty" />,
    );
    expect(withoutRole.firstElementChild).not.toHaveAttribute("role");

    render(<StaticState heading="Fixture alert" className="static-state-error" role="alert" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("omits explanation/detail/action wrappers entirely when not supplied", () => {
    const { container } = render(<StaticState heading="Fixture" className="static-state-empty" />);
    expect(container.querySelector(".static-state-explanation")).not.toBeInTheDocument();
    expect(container.querySelector(".static-state-detail")).not.toBeInTheDocument();
    expect(container.querySelector(".static-state-action")).not.toBeInTheDocument();
  });
});
