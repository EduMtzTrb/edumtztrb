import { afterEach, describe, expect, it, vi } from "vitest";

import { isFocusFixtureActive, isMotionFixtureActive } from "./fixtureGate";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("isMotionFixtureActive (M4.3 §C21)", () => {
  it("is false when the flag is absent", () => {
    expect(isMotionFixtureActive({})).toBe(false);
  });

  it("is true when the flag is exactly 'm4a' and not in production", () => {
    expect(isMotionFixtureActive({ "motion-fixture": "m4a" })).toBe(true);
  });

  it("is false in production, even when the flag is present", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(isMotionFixtureActive({ "motion-fixture": "m4a" })).toBe(false);
  });

  it("is false for an unrecognized flag value", () => {
    expect(isMotionFixtureActive({ "motion-fixture": "anything-else" })).toBe(false);
  });

  it("handles a multi-value query param by checking only the first value", () => {
    expect(isMotionFixtureActive({ "motion-fixture": ["m4a", "extra"] })).toBe(true);
  });
});

describe("isFocusFixtureActive (M4.4 §A11)", () => {
  it("is false when the flag is absent", () => {
    expect(isFocusFixtureActive({})).toBe(false);
  });

  it("is true when the flag is exactly 'm4b' and not in production", () => {
    expect(isFocusFixtureActive({ "motion-fixture": "m4b" })).toBe(true);
  });

  it("is false in production, even when the flag is present", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(isFocusFixtureActive({ "motion-fixture": "m4b" })).toBe(false);
  });

  it("is false for the M4-A flag value — the two fixtures are mutually exclusive on one request", () => {
    expect(isFocusFixtureActive({ "motion-fixture": "m4a" })).toBe(false);
    expect(isMotionFixtureActive({ "motion-fixture": "m4b" })).toBe(false);
  });
});
