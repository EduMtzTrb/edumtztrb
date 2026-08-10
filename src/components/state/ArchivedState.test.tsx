import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ArchivedState } from "./ArchivedState";

describe("ArchivedState", () => {
  it("makes the archived state explicit", () => {
    render(<ArchivedState heading="Fixture: archived" />);
    expect(screen.getByText("Fixture: archived")).toBeVisible();
  });

  it("does not render a current-action affordance by default", () => {
    render(<ArchivedState heading="Fixture: archived" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("permits successor/related-record context and a valid action when supplied", () => {
    render(
      <ArchivedState
        heading="Fixture: archived"
        context="Fixture: superseded by a later version"
        action={<a href="/fixture-current">Fixture: view current version</a>}
      />,
    );
    expect(screen.getByText("Fixture: superseded by a later version")).toBeVisible();
    expect(screen.getByRole("link", { name: "Fixture: view current version" })).toBeInTheDocument();
  });

  it("does not use error/alert semantics — archived is not failure", () => {
    render(<ArchivedState heading="Fixture: archived" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
