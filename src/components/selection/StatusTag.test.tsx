import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { StatusTag } from "./StatusTag";

describe("StatusTag", () => {
  it("renders the explicit status text", () => {
    render(<StatusTag>Archived</StatusTag>);
    expect(screen.getByText("Archived")).toBeInTheDocument();
  });

  it("is a plain, non-interactive element — not a button or link", () => {
    render(<StatusTag>Archived</StatusTag>);
    const tag = screen.getByText("Archived");
    expect(tag.tagName).toBe("SPAN");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies the shared status-tag class", () => {
    render(<StatusTag>Draft</StatusTag>);
    expect(screen.getByText("Draft")).toHaveClass("status-tag");
  });
});
