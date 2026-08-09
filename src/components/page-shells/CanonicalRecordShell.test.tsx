import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { CanonicalRecordShell } from "./CanonicalRecordShell";

describe("CanonicalRecordShell", () => {
  it("with only heading: renders exactly one main, one H1, and no optional regions", () => {
    const { container } = render(<CanonicalRecordShell heading="Test Record" />);

    const mains = screen.getAllByRole("main");
    expect(mains).toHaveLength(1);
    expect(mains[0]).toHaveAttribute("data-page-type", "canonical-record");

    expect(screen.getByRole("heading", { level: 1, name: "Test Record" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("type-display");

    // No optional region exists in the DOM at all — not hidden, not empty, absent.
    expect(container.querySelectorAll("[data-region]")).toHaveLength(0);
    expect(container.querySelectorAll("section")).toHaveLength(0);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("with every optional region supplied: renders each as a labeled, populated region", () => {
    render(
      <CanonicalRecordShell
        heading="Test Record"
        publicState="Test public state"
        authorship="Test authorship"
        context="Test context"
        evidence="Test evidence"
        metadata="Test metadata"
        relationships="Test relationships"
        credits="Test credits"
        continuation="Test continuation"
      />,
    );

    expect(screen.getByText("Test public state")).toBeInTheDocument();
    expect(screen.getByText("Test authorship")).toBeInTheDocument();

    expect(screen.getByRole("region", { name: "Context" })).toHaveTextContent("Test context");
    expect(screen.getByRole("region", { name: "Evidence" })).toHaveTextContent("Test evidence");
    expect(screen.getByRole("region", { name: "Metadata" })).toHaveTextContent("Test metadata");
    expect(screen.getByRole("region", { name: "Relationships" })).toHaveTextContent(
      "Test relationships",
    );
    expect(screen.getByRole("region", { name: "Credits" })).toHaveTextContent("Test credits");
    expect(screen.getByRole("navigation", { name: "Continuation" })).toHaveTextContent(
      "Test continuation",
    );

    // Still exactly one main landmark, even with every region populated.
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });

  it("renders only the regions that were actually supplied (partial fixture)", () => {
    const { container } = render(
      <CanonicalRecordShell heading="Test Record" evidence="Test evidence only" />,
    );

    expect(screen.getByRole("region", { name: "Evidence" })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Context" })).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Metadata" })).not.toBeInTheDocument();
    expect(container.querySelectorAll("section")).toHaveLength(1);
  });
});
