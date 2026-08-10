import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { MediaRecord } from "./MediaRecord";

describe("MediaRecord", () => {
  it("renders the media slot content and title inside a real link", () => {
    render(
      <MediaRecord
        title="Fixture work"
        href="/fixture"
        media={<img src="/fixture.jpg" alt="Fixture media" />}
      />,
    );
    const link = screen.getByRole("link", { name: /Fixture work/ });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/fixture");
    expect(screen.getByRole("img", { name: "Fixture media" })).toBeInTheDocument();
  });

  it("title is always accessible even without media", () => {
    render(
      <MediaRecord title="Fixture work" href="/fixture" media={<span aria-hidden="true" />} />,
    );
    expect(screen.getByRole("heading", { name: "Fixture work" })).toBeInTheDocument();
  });

  it("renders optional primary metadata and description when supplied", () => {
    render(
      <MediaRecord
        title="Fixture work"
        href="/fixture"
        media={<span aria-hidden="true" />}
        primaryMetadata="Fixture metadata"
        description="Fixture description"
      />,
    );
    expect(screen.getByText("Fixture metadata")).toBeInTheDocument();
    expect(screen.getByText("Fixture description")).toBeInTheDocument();
  });

  it("renders the media slot as a plain container, not an image-specific wrapper", () => {
    const { container } = render(
      <MediaRecord title="Fixture work" href="/fixture" media={<span aria-hidden="true" />} />,
    );
    const slot = container.querySelector(".record-media-slot");
    expect(slot).toBeInTheDocument();
    expect(slot).not.toHaveAttribute("style");
  });
});
