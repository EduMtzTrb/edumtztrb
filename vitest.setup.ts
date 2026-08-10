import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// RTL's auto-cleanup relies on detecting a global `afterEach`, which this
// project doesn't enable (vitest.config.mts keeps `test.globals` off so test
// files import `describe`/`it`/`expect` explicitly) — so it's registered here.
afterEach(() => {
  cleanup();
});
