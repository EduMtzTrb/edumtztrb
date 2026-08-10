import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("exposes a polite status region with aria-busy and a visible, named label", () => {
    render(<LoadingState label="Fixture: loading records" />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-busy", "true");
    expect(region).toHaveTextContent("Fixture: loading records");
    expect(region).toBeVisible();
  });

  it("reserves geometry via an author-supplied min-height, not a fixed default", () => {
    const { container } = render(<LoadingState label="Fixture: loading" minHeight="200px" />);
    const region = container.querySelector(".loading-state") as HTMLElement;
    expect(region.style.minHeight).toBe("200px");
  });

  it("does not require a reserved height", () => {
    const { container } = render(<LoadingState label="Fixture: loading" />);
    const region = container.querySelector(".loading-state") as HTMLElement;
    expect(region.style.minHeight).toBe("");
  });

  it("renders no skeleton/shimmer/spinner element", () => {
    const { container } = render(<LoadingState label="Fixture: loading" />);
    expect(
      container.querySelector("[class*='skeleton'], [class*='spinner'], [class*='shimmer']"),
    ).not.toBeInTheDocument();
  });
});
