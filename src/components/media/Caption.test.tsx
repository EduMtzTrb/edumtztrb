import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Caption } from "./Caption";

describe("Caption", () => {
  it("renders as a figcaption by default", () => {
    const { container } = render(<Caption>Fixture caption text</Caption>);
    expect(container.querySelector("figcaption")).toHaveTextContent("Fixture caption text");
  });

  it("renders as a plain paragraph when as='p'", () => {
    const { container } = render(<Caption as="p">Fixture caption text</Caption>);
    expect(container.querySelector("p")).toHaveTextContent("Fixture caption text");
    expect(container.querySelector("figcaption")).not.toBeInTheDocument();
  });

  it("renders credit alongside caption text, structurally distinct", () => {
    render(<Caption credit="Fixture credit">Fixture caption text</Caption>);
    expect(screen.getByText(/Fixture caption text/)).toBeInTheDocument();
    expect(screen.getByText(/Fixture credit/)).toBeInTheDocument();
  });

  it("supports credit alone with no caption children", () => {
    const { container } = render(<Caption credit="Fixture credit only" />);
    expect(container.querySelector("figcaption")).toHaveTextContent("Fixture credit only");
  });

  it("uses the existing Caption typography role, not a new one", () => {
    const { container } = render(<Caption>Fixture</Caption>);
    expect(container.querySelector("figcaption")).toHaveClass("type-caption");
  });
});
