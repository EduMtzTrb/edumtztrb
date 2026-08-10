import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import IndexPage from "@/app/index/page";

/** Real Index + Filters route wiring — M3.11. Same pattern as `route-shell-wiring.test.tsx` (M1.6) / `index-route-wiring.test.tsx` (M3.10). */
describe("Filter route wiring (M3.11)", () => {
  it("no filter active: shows the full fixture set and no active-filter chip", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ fixture: "m3b" }),
    });
    render(element);
    expect(screen.getByRole("link", { name: /Fixture work outcome/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Fixture artwork/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Reset filters" })).not.toBeInTheDocument();
  });

  it("?district=work&fixture=m3b narrows results and shows the active chip + reset", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ fixture: "m3b", district: "work" }),
    });
    render(element);
    expect(screen.getByRole("link", { name: /Fixture work outcome/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Fixture artwork/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reset filters" })).toHaveAttribute(
      "href",
      "/index?fixture=m3b",
    );
  });

  it("the district filter option for 'work' carries aria-current=true when active", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ fixture: "m3b", district: "work" }),
    });
    render(element);
    const link = screen.getAllByRole("link", { name: "work" })[0];
    expect(link).toHaveAttribute("aria-current", "true");
  });

  it("a combined filter that matches nothing shows the No Result state (not the genuinely-empty state), describing the active scope", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ fixture: "m3b", district: "art", contentType: "project" }),
    });
    render(element);
    expect(screen.getByText(/no public records match this index scope/i)).toBeInTheDocument();
    expect(screen.getByText(/district: art, contentType: project/i)).toBeInTheDocument();
  });

  it("no filter and an empty source (no fixture flag) shows the genuinely-empty state, not No Result", async () => {
    const element = await IndexPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByText(/no public records exist yet/i)).toBeInTheDocument();
  });
});
