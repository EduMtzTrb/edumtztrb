import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { GallerySequence } from "./GallerySequence";

const ITEMS = [
  { media: <img src="/one.jpg" alt="Fixture one" />, caption: "Fixture caption one" },
  { media: <img src="/two.jpg" alt="Fixture two" />, caption: "Fixture caption two" },
  { media: <img src="/three.jpg" alt="Fixture three" />, caption: "Fixture caption three" },
];

describe("GallerySequence", () => {
  it("renders an ordered, labeled list with one item per entry", () => {
    render(<GallerySequence label="Fixture sequence" items={ITEMS} />);
    const list = screen.getByRole("list", { name: "Fixture sequence" });
    expect(list.tagName).toBe("OL");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("preserves supplied reading order", () => {
    render(<GallerySequence label="Fixture sequence" items={ITEMS} />);
    const images = screen.getAllByRole("img");
    expect(images.map((img) => img.getAttribute("alt"))).toEqual([
      "Fixture one",
      "Fixture two",
      "Fixture three",
    ]);
  });

  it("exposes an explicit position/count indicator per item", () => {
    render(<GallerySequence label="Fixture sequence" items={ITEMS} />);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("does not depend on a carousel — every item is present in the DOM simultaneously", () => {
    render(<GallerySequence label="Fixture sequence" items={ITEMS} />);
    for (const alt of ["Fixture one", "Fixture two", "Fixture three"]) {
      expect(screen.getByRole("img", { name: alt })).toBeVisible();
    }
  });
});
