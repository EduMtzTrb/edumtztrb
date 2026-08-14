import { afterEach, describe, expect, it, vi } from "vitest";

import { isDistrictCompositionFixtureActive } from "./fixtureGate";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("isDistrictCompositionFixtureActive (M5.0 Part B)", () => {
  it("is false when the flag is absent", () => {
    expect(isDistrictCompositionFixtureActive({})).toBe(false);
  });

  it("is true when the flag is exactly 'm5' and not in production", () => {
    expect(isDistrictCompositionFixtureActive({ "composition-fixture": "m5" })).toBe(true);
  });

  it("is false in production, even when the flag is present", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(isDistrictCompositionFixtureActive({ "composition-fixture": "m5" })).toBe(false);
  });

  it("is false for an unrecognized flag value", () => {
    expect(isDistrictCompositionFixtureActive({ "composition-fixture": "anything-else" })).toBe(
      false,
    );
  });

  it("handles a multi-value query param by checking only the first value", () => {
    expect(isDistrictCompositionFixtureActive({ "composition-fixture": ["m5", "extra"] })).toBe(
      true,
    );
  });

  it("does not activate on the unrelated motion-fixture query param", () => {
    expect(isDistrictCompositionFixtureActive({ "motion-fixture": "m4a" })).toBe(false);
  });
});
