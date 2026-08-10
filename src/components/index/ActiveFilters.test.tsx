import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ActiveFilters } from "./ActiveFilters";

describe("ActiveFilters (M3.11)", () => {
  it("renders nothing when no filter is active", () => {
    const { container } = render(
      <ActiveFilters pathname="/index" searchParams={{}} criteria={{}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders one chip per active criterion with a real Remove link", () => {
    render(
      <ActiveFilters
        pathname="/index"
        searchParams={{ district: "work", contentType: "project" }}
        criteria={{ district: "work", contentType: "project" }}
      />,
    );
    expect(screen.getByText("work")).toBeInTheDocument();
    expect(screen.getByText("project")).toBeInTheDocument();
    const removeLinks = screen.getAllByRole("link", { name: "Remove" });
    expect(removeLinks).toHaveLength(2);
  });

  it("a Remove link clears only its own criterion", () => {
    render(
      <ActiveFilters
        pathname="/index"
        searchParams={{ district: "work", contentType: "project" }}
        criteria={{ district: "work", contentType: "project" }}
      />,
    );
    const removeLinks = screen.getAllByRole("link", { name: "Remove" });
    const hrefs = removeLinks.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/index?contentType=project");
    expect(hrefs).toContain("/index?district=work");
  });

  it("renders a Reset filters link clearing every criterion", () => {
    render(
      <ActiveFilters
        pathname="/index"
        searchParams={{ district: "work", fixture: "m3b" }}
        criteria={{ district: "work" }}
      />,
    );
    const reset = screen.getByRole("link", { name: "Reset filters" });
    expect(reset).toHaveAttribute("href", "/index?fixture=m3b");
  });
});
