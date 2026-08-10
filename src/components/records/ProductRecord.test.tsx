import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProductRecord } from "./ProductRecord";

describe("ProductRecord", () => {
  it("renders the title as a link to the product detail route", () => {
    render(<ProductRecord title="Fixture object" href="/fixture" />);
    const link = screen.getByRole("link", { name: "Fixture object" });
    expect(link).toHaveAttribute("href", "/fixture");
  });

  it("renders price, availability, and family when supplied — always visible, never hover-gated", () => {
    render(
      <ProductRecord
        title="Fixture object"
        href="/fixture"
        family="Fixture family"
        price="€000 — fixture only"
        availability="Fixture availability"
      />,
    );
    expect(screen.getByText("Fixture family")).toBeInTheDocument();
    expect(screen.getByText("€000 — fixture only")).toBeInTheDocument();
    expect(screen.getByText("Fixture availability")).toBeInTheDocument();
  });

  it("renders an optional media slot", () => {
    render(
      <ProductRecord
        title="Fixture object"
        href="/fixture"
        media={<img src="/fixture.jpg" alt="Fixture product media" />}
      />,
    );
    expect(screen.getByRole("img", { name: "Fixture product media" })).toBeInTheDocument();
  });

  it("keeps the detail route separate from any purchase affordance — only one link, no button", () => {
    render(
      <ProductRecord
        title="Fixture object"
        href="/fixture"
        price="€000 — fixture only"
        availability="In stock"
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("does not depend on Signal or any commercial accent to communicate availability", () => {
    render(<ProductRecord title="Fixture object" href="/fixture" availability="In stock" />);
    const availability = screen.getByText("In stock");
    expect(availability.className).not.toMatch(/signal/i);
  });
});
