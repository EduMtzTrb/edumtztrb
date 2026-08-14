import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { DistrictField } from "./DistrictField";

describe("DistrictField — M5.0 Part B shared district composition", () => {
  it("renders primary content", () => {
    render(<DistrictField primary={<p>Primary content</p>} />);
    expect(screen.getByText("Primary content")).toBeInTheDocument();
  });

  it("defaults to moderate density when none is given", () => {
    const { container } = render(<DistrictField primary={<p>Primary</p>} />);
    expect(container.querySelector(".district-field")).toHaveAttribute("data-density", "moderate");
  });

  it("reflects an explicit density prop", () => {
    for (const density of ["concentrated", "moderate", "dense"] as const) {
      const { container, unmount } = render(
        <DistrictField density={density} primary={<p>Primary</p>} />,
      );
      expect(container.querySelector(".district-field")).toHaveAttribute("data-density", density);
      unmount();
    }
  });

  it("renders no peripheral element at all when peripheral is omitted — not merely hidden", () => {
    const { container } = render(<DistrictField primary={<p>Primary only</p>} />);
    expect(container.querySelector(".district-field-peripheral")).toBeNull();
    expect(screen.queryByRole("complementary")).toBeNull();
  });

  it("renders peripheral content as a labeled complementary landmark when provided", () => {
    render(<DistrictField primary={<p>Primary</p>} peripheral={<p>Peripheral content</p>} />);
    const aside = screen.getByRole("complementary", { name: "Related" });
    expect(aside).toHaveTextContent("Peripheral content");
  });

  it("keeps primary before peripheral in DOM order regardless of density — visual placement never reorders content", () => {
    const { container } = render(
      <DistrictField
        density="dense"
        primary={<p data-testid="primary">Primary</p>}
        peripheral={<p data-testid="peripheral">Peripheral</p>}
      />,
    );
    const nodes = container.querySelectorAll("[data-testid]");
    expect(nodes[0]).toHaveAttribute("data-testid", "primary");
    expect(nodes[1]).toHaveAttribute("data-testid", "peripheral");
  });

  it("never renders a district-conditional attribute — the field is district-agnostic", () => {
    const { container } = render(<DistrictField primary={<p>Primary</p>} />);
    const field = container.querySelector(".district-field");
    expect(field).not.toHaveAttribute("data-district");
  });
});
