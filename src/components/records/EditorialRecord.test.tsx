import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { EditorialRecord } from "./EditorialRecord";

describe("EditorialRecord", () => {
  it("renders a text-led record with the title as a heading-scoped link", () => {
    render(<EditorialRecord title="Fixture paper" href="/fixture" />);
    const heading = screen.getByRole("heading", { name: "Fixture paper" });
    expect(heading).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Fixture paper" });
    expect(link).toHaveAttribute("href", "/fixture");
  });

  it("renders excerpt, date, source, and status slots when provided", () => {
    render(
      <EditorialRecord
        title="Fixture paper"
        href="/fixture"
        excerpt="Fixture excerpt content for readers."
        date="Fixture date"
        source="Fixture source"
        status="Draft"
      />,
    );
    expect(screen.getByText("Fixture excerpt content for readers.")).toBeInTheDocument();
    expect(screen.getByText("Fixture date")).toBeInTheDocument();
    expect(screen.getByText("Fixture source")).toBeInTheDocument();
    expect(screen.getByText("Draft")).toHaveClass("status-tag");
  });

  it("renders readable content structure with no forced meta block when nothing is supplied", () => {
    render(<EditorialRecord title="Fixture paper" href="/fixture" />);
    expect(screen.getByRole("article").querySelectorAll("p")).toHaveLength(0);
  });

  it("only the title is interactive — excerpt text is not wrapped in a link", () => {
    render(
      <EditorialRecord
        title="Fixture paper"
        href="/fixture"
        excerpt="Fixture excerpt content for readers."
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
