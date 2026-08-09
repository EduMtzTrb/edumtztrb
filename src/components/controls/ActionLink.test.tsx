import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ActionLink } from "./ActionLink";

describe("ActionLink", () => {
  it("renders a real anchor (via next/link), never a button, defaulting to kind=route", () => {
    render(<ActionLink href="/work">Work</ActionLink>);
    const link = screen.getByRole("link", { name: "Work" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/work");
    expect(link).toHaveClass("link");
    expect(link).toHaveClass("type-label");
  });

  it("applies the same .link class for kind=utility as kind=route (no mandated visual difference, §27.2/§27.3)", () => {
    render(
      <ActionLink href="/legal" kind="utility">
        Legal
      </ActionLink>,
    );
    expect(screen.getByRole("link", { name: "Legal" })).toHaveClass("link");
  });

  it("applies link-inline (not link, no type-label) for kind=inline, and inherits surrounding typography", () => {
    render(
      <ActionLink href="/about" kind="inline">
        the about page
      </ActionLink>,
    );
    const link = screen.getByRole("link", { name: "the about page" });
    expect(link).toHaveClass("link-inline");
    expect(link).not.toHaveClass("link");
    expect(link).not.toHaveClass("type-label");
  });

  it("has no disabled prop, type prop, or click-only affordance in its type surface (compile-time boundary, exercised here at runtime via aria-disabled)", () => {
    render(
      <ActionLink href="/archive" aria-disabled="true">
        Archive
      </ActionLink>,
    );
    const link = screen.getByRole("link", { name: "Archive" });
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link.tagName).toBe("A");
  });
});
