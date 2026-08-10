import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { ThresholdLink } from "./ThresholdLink";
import { peekThresholdArrival } from "@/lib/threshold/familiarity";

afterEach(() => {
  window.sessionStorage.clear();
});

describe("ThresholdLink (M4.9)", () => {
  it("is a real link to the given href", () => {
    render(
      <ThresholdLink href="/work" arrivalKey="home-work:to-work">
        Enter Work
      </ThresholdLink>,
    );
    expect(screen.getByRole("link", { name: "Enter Work" })).toHaveAttribute("href", "/work");
  });

  it("clicking marks departure under the given arrival key, before navigation", () => {
    render(
      <ThresholdLink href="/work" arrivalKey="home-work:to-work">
        Enter Work
      </ThresholdLink>,
    );
    expect(peekThresholdArrival("home-work:to-work")).toBe(false);
    fireEvent.click(screen.getByRole("link", { name: "Enter Work" }));
    expect(peekThresholdArrival("home-work:to-work")).toBe(true);
  });
});
