import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Figure } from "./Figure";

describe("Figure", () => {
  it("renders a semantic <figure> containing the supplied media", () => {
    const { container } = render(
      <Figure media={<img src="/fixture.jpg" alt="Fixture drawing" />} />,
    );
    expect(container.querySelector("figure")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Fixture drawing" })).toBeInTheDocument();
  });

  it("associates an optional caption via figcaption", () => {
    const { container } = render(
      <Figure media={<span aria-hidden="true" />} caption="Fixture caption text" />,
    );
    const figure = container.querySelector("figure");
    const figcaption = container.querySelector("figcaption");
    expect(figcaption).toHaveTextContent("Fixture caption text");
    expect(figure).toContainElement(figcaption);
  });

  it("caption is optional — no figcaption renders when omitted", () => {
    const { container } = render(<Figure media={<span aria-hidden="true" />} />);
    expect(container.querySelector("figcaption")).not.toBeInTheDocument();
  });

  it("does not hard-code an aspect ratio or crop on the media slot", () => {
    const { container } = render(<Figure media={<span aria-hidden="true" />} />);
    const slot = container.querySelector(".media-figure-slot");
    expect(slot).toBeInTheDocument();
    expect(slot).not.toHaveAttribute("style");
  });

  it("does not apply a universal frame — no .frame class on the figure", () => {
    const { container } = render(<Figure media={<span aria-hidden="true" />} />);
    expect(container.querySelector("figure")?.className).not.toMatch(/\bframe\b|\bplane\b/);
  });

  it("supports an explicit accessible label for the figure as a whole", () => {
    render(<Figure media={<span aria-hidden="true" />} ariaLabel="Fixture accessible name" />);
    expect(screen.getByRole("figure", { name: "Fixture accessible name" })).toBeInTheDocument();
  });
});
