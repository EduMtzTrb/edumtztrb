import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SearchForm } from "./SearchForm";

describe("SearchForm (M3.12)", () => {
  it("renders a native GET form submitting to /search", () => {
    render(<SearchForm defaultValue="" fixtureActive={false} />);
    const form = screen.getByRole("search");
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveAttribute("action", "/search");
  });

  it("has a persistent visible label and a named 'q' field carrying the current query", () => {
    render(<SearchForm defaultValue="fixture" fixtureActive={false} />);
    const field = screen.getByLabelText("Search");
    expect(field).toHaveAttribute("name", "q");
    expect(field).toHaveValue("fixture");
  });

  it("has a real submit control, keyboard-submittable", () => {
    render(<SearchForm defaultValue="" fixtureActive={false} />);
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "submit");
  });

  it("preserves the fixture flag via a hidden field only when fixtures are active", () => {
    const { container: withFixture } = render(<SearchForm defaultValue="" fixtureActive={true} />);
    expect(withFixture.querySelector('input[name="fixture"][value="m3b"]')).not.toBeNull();

    const { container: withoutFixture } = render(
      <SearchForm defaultValue="" fixtureActive={false} />,
    );
    expect(withoutFixture.querySelector('input[name="fixture"]')).toBeNull();
  });
});
