import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ArtworkViewer } from "./ArtworkViewer";

describe("ArtworkViewer", () => {
  it("keeps media dominant inside a semantic figure", () => {
    const { container } = render(
      <ArtworkViewer media={<img src="/fixture.jpg" alt="Fixture artwork" />} />,
    );
    expect(container.querySelector("figure")).toHaveClass("media-artwork-viewer");
    expect(screen.getByRole("img", { name: "Fixture artwork" })).toBeInTheDocument();
  });

  it("caption/credit are optional and, when present, are never hidden", () => {
    render(
      <ArtworkViewer
        media={<span aria-hidden="true" />}
        caption="Fixture artwork title"
        credit="Fixture artist, year"
      />,
    );
    expect(screen.getByText(/Fixture artwork title/)).toBeVisible();
    expect(screen.getByText(/Fixture artist, year/)).toBeVisible();
  });

  it("does not apply a card, plane, or frame treatment", () => {
    const { container } = render(<ArtworkViewer media={<span aria-hidden="true" />} />);
    const figure = container.querySelector("figure");
    expect(figure?.className).not.toMatch(/\bframe\b|\bplane\b|\bcard\b/);
  });

  it("does not force a crop on the artwork's media slot", () => {
    const { container } = render(<ArtworkViewer media={<span aria-hidden="true" />} />);
    expect(container.querySelector(".media-figure-slot")).not.toHaveAttribute("style");
  });
});
