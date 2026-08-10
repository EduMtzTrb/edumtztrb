import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Breadcrumb } from "./Breadcrumb";
import type { BreadcrumbItem } from "./orientation";

describe("Breadcrumb (M3.9)", () => {
  it("renders a semantic <nav aria-label='Breadcrumb'> wrapping an ordered list", () => {
    const trail: BreadcrumbItem[] = [
      { label: "Work", href: "/work" },
      { label: "Fixture work outcome", current: true },
    ];
    render(<Breadcrumb trail={trail} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.querySelector("ol")).not.toBeNull();
  });

  it("renders every non-current item as a real link to its route", () => {
    const trail: BreadcrumbItem[] = [
      { label: "Research", href: "/research" },
      { label: "Fixture Theme", href: "/research/themes/fixture-theme" },
      { label: "Fixture inquiry", current: true },
    ];
    render(<Breadcrumb trail={trail} />);
    expect(screen.getByRole("link", { name: "Research" })).toHaveAttribute("href", "/research");
    expect(screen.getByRole("link", { name: "Fixture Theme" })).toHaveAttribute(
      "href",
      "/research/themes/fixture-theme",
    );
  });

  it("never renders the current item as a link to itself — plain text with aria-current=page instead", () => {
    const trail: BreadcrumbItem[] = [
      { label: "Work", href: "/work" },
      { label: "Fixture work outcome", current: true },
    ];
    render(<Breadcrumb trail={trail} />);
    expect(screen.queryByRole("link", { name: "Fixture work outcome" })).not.toBeInTheDocument();
    const current = screen.getByText("Fixture work outcome");
    expect(current.tagName).toBe("SPAN");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders nothing for an empty trail rather than an empty landmark", () => {
    const { container } = render(<Breadcrumb trail={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a single-item trail (global utility case) correctly", () => {
    render(<Breadcrumb trail={[{ label: "Contact", current: true }]} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("Contact")).toHaveAttribute("aria-current", "page");
  });
});
