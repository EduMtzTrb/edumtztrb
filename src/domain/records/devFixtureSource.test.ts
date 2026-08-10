import { afterEach, describe, expect, it, vi } from "vitest";

import { resolvePublicRecordSource } from "./devFixtureSource";
import { allFixtureRecords } from "./fixtures";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("resolvePublicRecordSource (M3.10/M3.12 shared dev fixture policy)", () => {
  it("returns an empty, honest source when the fixture flag is absent — even outside production", () => {
    const result = resolvePublicRecordSource({});
    expect(result.records).toHaveLength(0);
    expect(result.usingFixtures).toBe(false);
  });

  it("returns the fixture corpus when the flag is exactly 'm3b' and not in production", () => {
    const result = resolvePublicRecordSource({ fixture: "m3b" });
    expect(result.usingFixtures).toBe(true);
    expect(result.records).toEqual(allFixtureRecords);
  });

  it("never serves fixtures in production, even when the flag is present", () => {
    vi.stubEnv("NODE_ENV", "production");
    const result = resolvePublicRecordSource({ fixture: "m3b" });
    expect(result.usingFixtures).toBe(false);
    expect(result.records).toHaveLength(0);
  });

  it("an unrecognized flag value does not activate fixtures", () => {
    const result = resolvePublicRecordSource({ fixture: "anything-else" });
    expect(result.usingFixtures).toBe(false);
    expect(result.records).toHaveLength(0);
  });

  it("handles a multi-value query param (array) by checking only the first value", () => {
    const result = resolvePublicRecordSource({ fixture: ["m3b", "extra"] });
    expect(result.usingFixtures).toBe(true);
  });
});
