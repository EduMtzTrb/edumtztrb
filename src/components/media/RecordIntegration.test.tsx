import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { MediaRecord } from "@/components/records/MediaRecord";
import { ProductRecord } from "@/components/records/ProductRecord";

import { Figure } from "./Figure";
import { ProductMediaSet } from "./ProductMediaSet";

/**
 * Confirms M2.8 media primitives can be inserted into the M2.7 media
 * slots (MediaRecord/ProductRecord) without either package needing to
 * change — component integration testing only, per this task's own
 * instruction. No production page is modified to demonstrate this.
 */
describe("M2.8 / M2.7 record-slot integration", () => {
  it("a Figure can be placed inside MediaRecord's media slot", () => {
    render(
      <MediaRecord
        title="Fixture work"
        href="/fixture"
        media={
          <Figure
            media={<img src="/fixture.jpg" alt="Fixture drawing" />}
            caption="Fixture caption"
          />
        }
      />,
    );
    expect(screen.getByRole("img", { name: "Fixture drawing" })).toBeInTheDocument();
    expect(screen.getByText("Fixture caption")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fixture work" })).toBeInTheDocument();
  });

  it("a ProductMediaSet can be placed inside ProductRecord's media slot", () => {
    render(
      <ProductRecord
        title="Fixture object"
        href="/fixture"
        media={
          <ProductMediaSet
            label="Fixture product media"
            items={[
              {
                media: <img src="/fixture.jpg" alt="Fixture primary view" />,
                label: "Primary view",
              },
            ]}
          />
        }
        price="€000 — fixture only"
      />,
    );
    expect(screen.getByRole("img", { name: "Fixture primary view" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Fixture object" })).toBeInTheDocument();
  });
});
