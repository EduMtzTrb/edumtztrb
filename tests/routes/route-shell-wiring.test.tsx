import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";
import WorkPage from "@/app/work/page";
import WorkSelectedPage from "@/app/work/selected/page";
import WorkAllPage from "@/app/work/all/page";
import ResearchPublicationsPage from "@/app/research/publications/page";
import SearchPage from "@/app/search/page";
import WorkEntryPage from "@/app/work/[entry]/page";

/**
 * One real, unmodified route `page.tsx` per page-shell type, rendered exactly as
 * Next.js would render it, confirming actual route→shell wiring rather than only
 * the shell components in isolation. Static (synchronous) routes are used
 * wherever one exists for the type, per Next.js's own Vitest guide: "Vitest
 * currently does not support [rendering] async Server Components" directly.
 */
describe("Representative route → page-shell wiring (real page.tsx files)", () => {
  it("/ renders the World Threshold shell", () => {
    render(<HomePage />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("data-page-type", "world-threshold");
    expect(main).toHaveAttribute("data-district", "home");
    expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeInTheDocument();
  });

  it("/work renders the District Overview shell", () => {
    render(<WorkPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "district-overview");
    expect(screen.getByRole("heading", { level: 1, name: "Work" })).toBeInTheDocument();
  });

  it("/work/selected renders the Curated View shell", () => {
    render(<WorkSelectedPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "curated-view");
    expect(screen.getByRole("heading", { level: 1, name: "Work — Selected" })).toBeInTheDocument();
  });

  it("/work/all renders the Comprehensive View shell", () => {
    render(<WorkAllPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "comprehensive-view");
    expect(screen.getByRole("heading", { level: 1, name: "Work — All" })).toBeInTheDocument();
  });

  it("/research/publications renders the Grouping View shell", () => {
    render(<ResearchPublicationsPage />);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "grouping-view");
    expect(
      screen.getByRole("heading", { level: 1, name: "Research — Publications" }),
    ).toBeInTheDocument();
  });

  it("/search renders the Utility Page shell (M3.12: now async — reads searchParams)", async () => {
    const element = await SearchPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "utility-page");
    expect(screen.getByRole("heading", { level: 1, name: "Search" })).toBeInTheDocument();
  });

  // Canonical Record has no static example — all six of its routes are dynamic
  // (async). Calling the exported async page function directly (bypassing
  // React's render tree, which is what Vitest cannot yet do for async Server
  // Components) resolves its `params` the same way Next.js does at request
  // time, then hands the resulting element to Testing Library like any other.
  it("/work/[entry] resolves params and renders the Canonical Record shell (dynamic route)", async () => {
    const element = await WorkEntryPage({
      params: Promise.resolve({ entry: "test-entry" }),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "canonical-record");
    expect(
      screen.getByRole("heading", { level: 1, name: "Work — test-entry" }),
    ).toBeInTheDocument();
  });
});
