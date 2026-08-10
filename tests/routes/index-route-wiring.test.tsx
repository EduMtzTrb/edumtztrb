import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import IndexPage from "@/app/index/page";
import IndexByDistrictPage from "@/app/index/district/[district]/page";
import IndexByTypePage from "@/app/index/type/[contentType]/page";

/**
 * Real Index route → domain query → presentation wiring — M3.10. Follows
 * the same pattern `tests/routes/route-shell-wiring.test.tsx` (M1.6)
 * already established for async Server Components: call the exported
 * async page function directly with resolved `params`/`searchParams`
 * promises, then hand the resulting element to Testing Library.
 */
describe("Index route wiring (M3.10)", () => {
  it("/index with no fixture flag shows the honest Empty state — no real content source exists yet", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "utility-page");
    expect(screen.getByText(/no public records exist yet/i)).toBeInTheDocument();
  });

  it("/index?fixture=m3b shows the labeled fixture notice and the full public fixture set", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(element);
    expect(screen.getByText("M3-B Fixture Data — not real public content")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Fixture work outcome/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Fixture artwork/i })).toBeInTheDocument();
  });

  it("/index/district/work?fixture=m3b narrows results to exactly Work's public fixtures", async () => {
    const element = await IndexByDistrictPage({
      params: Promise.resolve({ district: "work" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(element);
    expect(screen.getByRole("main")).toHaveAttribute("data-page-type", "grouping-view");
    expect(screen.getByRole("link", { name: /Fixture work outcome/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Fixture artwork/i })).not.toBeInTheDocument();
  });

  it("an unmatched lens value renders the NoResultState, preserving the scope in view", async () => {
    const element = await IndexByTypePage({
      params: Promise.resolve({ contentType: "nonexistent-type" }),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(element);
    expect(screen.getByText(/no public records match this index scope/i)).toBeInTheDocument();
    expect(screen.getByText(/content-type: nonexistent-type/i)).toBeInTheDocument();
  });
});
