import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SearchResults } from "./SearchResults";
import { searchRecords } from "@/domain/records/SearchModel";
import {
  allFixtureRecords,
  fixtureAboutRecord,
  fixtureWorkRecord,
} from "@/domain/records/fixtures";

describe("SearchResults (M3.12)", () => {
  it("an empty query renders a neutral browse invitation, never a No-Result state", () => {
    render(<SearchResults result={searchRecords(allFixtureRecords, "")} usingFixtures={false} />);
    expect(screen.getByText("Enter a query to search.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to Index" })).toHaveAttribute("href", "/index");
  });

  it("a query with no matches renders NoResultState, preserving the query text", () => {
    render(
      <SearchResults
        result={searchRecords(allFixtureRecords, "zzz-no-match-zzz")}
        usingFixtures={false}
      />,
    );
    expect(screen.getByText(/no public records matched your search/i)).toBeInTheDocument();
    expect(screen.getByText("zzz-no-match-zzz")).toBeInTheDocument();
  });

  it("a matching query renders results with title, canonical link, and a visible match reason", () => {
    render(
      <SearchResults
        result={searchRecords(allFixtureRecords, fixtureWorkRecord.title)}
        usingFixtures={false}
      />,
    );
    const link = screen.getByRole("link", { name: new RegExp(`^${fixtureWorkRecord.title}`) });
    expect(link).toHaveAttribute("href", "/work/fixture-work-outcome");
    expect(screen.getByText("Exact title match")).toBeInTheDocument();
  });

  it("shows the labeled fixture notice only when usingFixtures is true", () => {
    render(
      <SearchResults
        result={searchRecords(allFixtureRecords, fixtureWorkRecord.title)}
        usingFixtures={true}
      />,
    );
    expect(screen.getByText("M3-B Fixture Data — not real public content")).toBeInTheDocument();
  });

  it("shows the result count including the query text, for a query matching exactly one record with no relationship spillover", () => {
    render(
      <SearchResults
        result={searchRecords(allFixtureRecords, fixtureAboutRecord.title)}
        usingFixtures={false}
      />,
    );
    expect(screen.getByText(/1 result for/i)).toBeInTheDocument();
  });
});
