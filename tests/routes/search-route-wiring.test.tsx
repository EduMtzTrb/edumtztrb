import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import SearchPage from "@/app/search/page";

/** Real Search route wiring — M3.12. Same pattern as prior M3-B route-wiring suites. */
describe("Search route wiring (M3.12)", () => {
  it("no query, no fixture: shows the neutral browse-invitation empty state, not an error", async () => {
    const element = await SearchPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByText("Enter a query to search.")).toBeInTheDocument();
  });

  it("?q=...&fixture=m3b finds and links to the matching fixture record", async () => {
    const element = await SearchPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ q: "Fixture work outcome", fixture: "m3b" }),
    });
    render(element);
    expect(screen.getByRole("link", { name: /^Fixture work outcome/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Search")).toHaveValue("Fixture work outcome");
  });

  it("a query matching nothing shows NoResultState with the query preserved", async () => {
    const element = await SearchPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ q: "zzz-nothing-zzz", fixture: "m3b" }),
    });
    render(element);
    expect(screen.getByText(/no public records matched your search/i)).toBeInTheDocument();
    expect(screen.getByText("zzz-nothing-zzz")).toBeInTheDocument();
  });

  it("private/excluded fixtures never surface through Search, even by exact title", async () => {
    const element = await SearchPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ q: "Fixture unpublished work", fixture: "m3b" }),
    });
    render(element);
    expect(
      screen.queryByRole("link", { name: /Fixture unpublished work/i }),
    ).not.toBeInTheDocument();
  });
});
