import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { AppShell } from "./AppShell";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

describe("AppShell", () => {
  it("renders a skip link to #main-content as the first content", () => {
    render(
      <AppShell>
        <main>Test page content</main>
      </AppShell>,
    );

    const skipLink = screen.getByRole("link", { name: "Skip to main content" });
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("renders the global navigation inside a header landmark", () => {
    render(
      <AppShell>
        <main>Test page content</main>
      </AppShell>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  });

  it("wraps children in a focusable #main-content anchor without adding a second main landmark", () => {
    const { container } = render(
      <AppShell>
        <main>Test page content</main>
      </AppShell>,
    );

    const anchor = container.querySelector("#main-content");
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute("tabindex", "-1");
    expect(anchor).toHaveTextContent("Test page content");

    // Exactly one main landmark total — AppShell itself must never introduce one.
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });
});
