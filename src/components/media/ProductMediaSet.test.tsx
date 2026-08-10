import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProductMediaSet } from "./ProductMediaSet";

const ITEMS = [
  { media: <img src="/primary.jpg" alt="Fixture primary view" />, label: "Primary view" },
  { media: <img src="/detail.jpg" alt="Fixture detail view" />, label: "Detail" },
  { media: <img src="/variant.jpg" alt="Fixture variant view" />, label: "Variant" },
];

describe("ProductMediaSet", () => {
  it("renders a labeled, ordered list preserving supplied order", () => {
    render(<ProductMediaSet label="Fixture product media" items={ITEMS} />);
    const list = screen.getByRole("list", { name: "Fixture product media" });
    expect(list.tagName).toBe("OL");
    const images = screen.getAllByRole("img");
    expect(images.map((img) => img.getAttribute("alt"))).toEqual([
      "Fixture primary view",
      "Fixture detail view",
      "Fixture variant view",
    ]);
  });

  it("exposes each item's evaluation-role label", () => {
    render(<ProductMediaSet label="Fixture product media" items={ITEMS} />);
    expect(screen.getByText("Primary view")).toBeInTheDocument();
    expect(screen.getByText("Detail")).toBeInTheDocument();
    expect(screen.getByText("Variant")).toBeInTheDocument();
  });

  it("does not force a universal square crop on any item", () => {
    const { container } = render(<ProductMediaSet label="Fixture product media" items={ITEMS} />);
    for (const slot of container.querySelectorAll(".media-figure-slot")) {
      expect(slot).not.toHaveAttribute("style");
    }
  });

  it("does not render a sale badge, promo overlay, or Signal-classed element", () => {
    const { container } = render(<ProductMediaSet label="Fixture product media" items={ITEMS} />);
    expect(container.querySelector("[class*='signal']")).not.toBeInTheDocument();
    expect(container.querySelector("[class*='badge']")).not.toBeInTheDocument();
    expect(container.querySelector("[class*='promo']")).not.toBeInTheDocument();
  });
});
