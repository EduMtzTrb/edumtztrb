import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { DocumentPlate } from "./DocumentPlate";

describe("DocumentPlate", () => {
  it("represents document extent via the shared Frame primitive", () => {
    const { container } = render(<DocumentPlate media={<span aria-hidden="true" />} />);
    expect(container.querySelector(".media-document-plate")).toHaveClass("frame");
  });

  it("renders an optional plate/page identifier", () => {
    render(
      <DocumentPlate media={<span aria-hidden="true" />} plateIdentifier="Fixture plate 3 of 12" />,
    );
    expect(screen.getByText("Fixture plate 3 of 12")).toBeInTheDocument();
  });

  it("renders optional caption/credit via the shared Figure/Caption structure", () => {
    const { container } = render(
      <DocumentPlate
        media={<span aria-hidden="true" />}
        caption="Fixture document caption"
        credit="Fixture source"
      />,
    );
    const figcaption = container.querySelector("figcaption");
    expect(figcaption).toHaveTextContent("Fixture document caption");
    expect(figcaption).toHaveTextContent("Fixture source");
  });

  it("does not apply fake browser chrome or a box-shadow", () => {
    const { container } = render(<DocumentPlate media={<span aria-hidden="true" />} />);
    const plate = container.querySelector(".media-document-plate");
    expect(plate).not.toHaveAttribute("style");
    expect(plate?.className).not.toMatch(/shadow/i);
  });
});
