import { describe, expect, it } from "vitest";

import { useOverlayBackgroundProps } from "./useOverlayBackgroundProps";

describe("useOverlayBackgroundProps (M4.5 §B2/§B9)", () => {
  it("returns neutral, non-inert props when the overlay is closed", () => {
    expect(useOverlayBackgroundProps(false)).toEqual({
      "data-focus-state": "neutral",
      inert: undefined,
    });
  });

  it("returns receding, inert props when the overlay is open — reusing M4.4's data-focus-state, not a second recession mechanism", () => {
    expect(useOverlayBackgroundProps(true)).toEqual({
      "data-focus-state": "receding",
      inert: true,
    });
  });
});
