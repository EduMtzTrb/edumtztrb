import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { TraceFixture } from "./TraceFixture";

describe("TraceFixture (M4.10 §C18/§C20)", () => {
  it("shows a real relationship Trace for the record that has one", () => {
    render(<TraceFixture />);
    expect(screen.getByText("Fixture research inquiry")).toBeInTheDocument();
    expect(screen.getByText("Tested in")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Fixture lab experiment" })).toBeInTheDocument();
  });

  it("shows no Trace for the record with no relationships, and says so explicitly", () => {
    render(<TraceFixture />);
    expect(screen.getByText(/No Trace rendered for "Fixture profile record"/)).toBeInTheDocument();
  });
});
