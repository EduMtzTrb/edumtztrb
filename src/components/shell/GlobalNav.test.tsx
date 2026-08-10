import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { GlobalNav } from "./GlobalNav";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

function renderAt(pathname: string) {
  vi.mocked(usePathname).mockReturnValue(pathname);
  return render(<GlobalNav />);
}

const DISTRICTS = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Research", "/research"],
  ["Lab", "/lab"],
  ["Art", "/art"],
  ["Products", "/products"],
  ["About", "/about"],
] as const;

const UTILITIES = [
  ["Search", "/search"],
  ["Index", "/index"],
  ["Contact", "/contact"],
] as const;

describe("GlobalNav", () => {
  it("exposes two semantically distinct navigation landmarks", () => {
    renderAt("/");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Utilities" })).toBeInTheDocument();
  });

  it("lists all seven primary district links, as real links, inside Primary", () => {
    renderAt("/");
    const primary = screen.getByRole("navigation", { name: "Primary" });
    for (const [label, href] of DISTRICTS) {
      const link = within(primary).getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
    }
  });

  it("lists Search, Index, and Contact, as real links, inside Utilities — not Primary", () => {
    renderAt("/");
    const primary = screen.getByRole("navigation", { name: "Primary" });
    const utilities = screen.getByRole("navigation", { name: "Utilities" });
    for (const [label, href] of UTILITIES) {
      const link = within(utilities).getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      expect(within(primary).queryByRole("link", { name: label })).not.toBeInTheDocument();
    }
  });

  it('marks the exact current top-level route aria-current="page", and only that link', () => {
    renderAt("/work");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
    for (const [label] of [...DISTRICTS, ...UTILITIES]) {
      if (label === "Work") continue;
      expect(screen.getByRole("link", { name: label })).not.toHaveAttribute("aria-current");
    }
  });

  it('marks Home aria-current="page" at the root route', () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
  });

  it(
    'marks a nested district route aria-current="true" on the containing district link — ' +
      "not falsely claiming the district root is the literal current page",
    () => {
      renderAt("/work/selected");
      const workLink = screen.getByRole("link", { name: "Work" });
      expect(workLink).toHaveAttribute("aria-current", "true");
      expect(workLink).not.toHaveAttribute("aria-current", "page");
    },
  );

  it('marks a dynamic canonical-record route aria-current="true" on its district link', () => {
    renderAt("/work/some-project");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "true");
  });

  it('marks the Index utility root aria-current="page" at exactly /index', () => {
    renderAt("/index");
    expect(screen.getByRole("link", { name: "Index" })).toHaveAttribute("aria-current", "page");
  });

  it('marks the Index utility link aria-current="true" (not "page") on a nested Index lens route', () => {
    renderAt("/index/theme/architecture");
    expect(screen.getByRole("link", { name: "Index" })).toHaveAttribute("aria-current", "true");
  });

  it("leaves unrelated links with no aria-current at all", () => {
    renderAt("/work/selected");
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Search" })).not.toHaveAttribute("aria-current");
  });
});
