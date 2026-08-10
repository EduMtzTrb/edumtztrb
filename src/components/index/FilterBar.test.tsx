import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { FilterBar } from "./FilterBar";

describe("FilterBar (M3.11)", () => {
  it("renders nothing when fewer than two options exist for every dimension — no decorative filter", () => {
    const { container } = render(
      <FilterBar
        pathname="/index"
        searchParams={{}}
        criteria={{}}
        districtOptions={["work"]}
        contentTypeOptions={["project"]}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a real link per option with the correct toggle href", () => {
    render(
      <FilterBar
        pathname="/index"
        searchParams={{}}
        criteria={{}}
        districtOptions={["art", "work"]}
        contentTypeOptions={[]}
      />,
    );
    const link = screen.getByRole("link", { name: "work" });
    expect(link).toHaveAttribute("href", "/index?district=work");
  });

  it("marks the currently active option aria-current='true', and no other option", () => {
    render(
      <FilterBar
        pathname="/index"
        searchParams={{ district: "work" }}
        criteria={{ district: "work" }}
        districtOptions={["art", "work"]}
        contentTypeOptions={[]}
      />,
    );
    expect(screen.getByRole("link", { name: "work" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "art" })).not.toHaveAttribute("aria-current");
  });

  it("renders a district group and a type group as two distinct fieldsets when both have options", () => {
    render(
      <FilterBar
        pathname="/index"
        searchParams={{}}
        criteria={{}}
        districtOptions={["art", "work"]}
        contentTypeOptions={["artwork", "project"]}
      />,
    );
    const group = screen.getByRole("group", { name: "Filters" });
    expect(within(group).getByText("District")).toBeInTheDocument();
    expect(within(group).getByText("Type")).toBeInTheDocument();
  });

  it("toggling the already-active option would remove it (href has no district param)", () => {
    render(
      <FilterBar
        pathname="/index"
        searchParams={{ district: "work" }}
        criteria={{ district: "work" }}
        districtOptions={["art", "work"]}
        contentTypeOptions={[]}
      />,
    );
    expect(screen.getByRole("link", { name: "work" })).toHaveAttribute("href", "/index");
  });
});
