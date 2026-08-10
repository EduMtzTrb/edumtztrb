import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { IndexRecord } from "./IndexRecord";

describe("IndexRecord", () => {
  it("renders a compact row as a real link with the title", () => {
    render(<IndexRecord title="Fixture entry" href="/fixture" />);
    const link = screen.getByRole("link", { name: /Fixture entry/ });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/fixture");
  });

  it("supports the required scanning fields (type/date/supporting) when supplied", () => {
    render(
      <IndexRecord
        title="Fixture entry"
        href="/fixture"
        type="Fixture type"
        date="Fixture date"
        supporting="Fixture supporting"
      />,
    );
    expect(screen.getByText("Fixture type")).toBeInTheDocument();
    expect(screen.getByText("Fixture date")).toBeInTheDocument();
    expect(screen.getByText("Fixture supporting")).toBeInTheDocument();
  });

  it("renders an optional status as a non-interactive StatusTag", () => {
    render(<IndexRecord title="Fixture entry" href="/fixture" status="Archived" />);
    expect(screen.getByText("Archived")).toHaveClass("status-tag");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders without a generic card wrapper — root is a plain article, no extra box element", () => {
    const { container } = render(<IndexRecord title="Fixture entry" href="/fixture" />);
    const article = container.querySelector("article.record-index");
    expect(article).toBeInTheDocument();
    expect(article?.className).not.toMatch(/plane|frame|card/);
  });

  it("renders without media", () => {
    render(<IndexRecord title="Fixture entry" href="/fixture" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
