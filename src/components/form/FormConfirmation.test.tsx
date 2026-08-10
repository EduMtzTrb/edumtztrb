import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { FormConfirmation } from "./FormConfirmation";

describe("FormConfirmation", () => {
  it("renders as a polite live region", () => {
    render(<FormConfirmation>Fixture: changes saved</FormConfirmation>);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveTextContent("Fixture: changes saved");
  });

  it("is absent unless a consumer renders it", () => {
    render(<div>Fixture form without confirmation</div>);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
