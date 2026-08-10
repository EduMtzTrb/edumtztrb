import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { LabComparisonFixture } from "./LabComparisonFixture";
import { retrieveReturnContext } from "@/lib/return/returnMemory";

afterEach(() => {
  window.sessionStorage.clear();
});

describe("LabComparisonFixture (M4.10 §C2/§C7)", () => {
  it("starts comparing Attempt A vs Attempt B with the fixture disclosure visible", () => {
    render(<LabComparisonFixture />);
    expect(screen.getByText("Fixture: not a real experiment record.")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Attempt A" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Attempt B" })).toBeInTheDocument();
  });

  it("switching the right picker updates the comparison to the newly selected attempt", () => {
    render(<LabComparisonFixture />);
    fireEvent.click(screen.getAllByRole("radio", { name: "Attempt C" })[1]!);
    expect(screen.getByRole("columnheader", { name: "Attempt C" })).toBeInTheDocument();
  });

  it("Save writes a real comparisonState via M4.6's returnMemory, Restore reads it back", () => {
    render(<LabComparisonFixture />);
    fireEvent.click(screen.getByRole("button", { name: "Save this comparison" }));

    const saved = retrieveReturnContext("m4.10-lab-comparison");
    expect(saved?.comparisonState).toEqual({ left: "attempt-a", right: "attempt-b" });

    fireEvent.click(screen.getAllByRole("radio", { name: "Attempt C" })[0]!);
    expect(screen.getByRole("columnheader", { name: "Attempt C" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Restore saved comparison" }));
    expect(screen.getByRole("columnheader", { name: "Attempt A" })).toBeInTheDocument();
  });

  it("Restore with no prior Save reports nothing to restore, never fabricating a comparison", () => {
    render(<LabComparisonFixture />);
    fireEvent.click(screen.getByRole("button", { name: "Restore saved comparison" }));
    expect(screen.getByRole("status")).toHaveTextContent(/No saved comparison to restore/i);
  });
});
