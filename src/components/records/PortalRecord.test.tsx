import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { PortalRecord } from "./PortalRecord";

describe("PortalRecord", () => {
  it("renders as a semantic article containing a real link with the title", () => {
    render(<PortalRecord title="Fixture district" href="/fixture" />);
    expect(screen.getByRole("article")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Fixture district" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/fixture");
  });

  it("exposes the title as a heading", () => {
    render(<PortalRecord title="Fixture district" href="/fixture" />);
    expect(screen.getByRole("heading", { name: "Fixture district" })).toBeInTheDocument();
  });

  it("renders optional orientation and identifier when supplied", () => {
    render(
      <PortalRecord
        title="Fixture district"
        href="/fixture"
        orientation="Fixture orientation text"
        identifier="Fixture identifier"
      />,
    );
    expect(screen.getByText("Fixture orientation text")).toBeInTheDocument();
    expect(screen.getByText("Fixture identifier")).toBeInTheDocument();
  });

  it("does not render optional regions when omitted", () => {
    render(<PortalRecord title="Fixture district" href="/fixture" />);
    // Only the title and the link itself should be present.
    expect(screen.getByRole("article").textContent).toBe("Fixture district");
  });

  it("supports keyboard focus on its link", () => {
    render(<PortalRecord title="Fixture district" href="/fixture" />);
    const link = screen.getByRole("link", { name: "Fixture district" });
    link.focus();
    expect(link).toHaveFocus();
  });
});
