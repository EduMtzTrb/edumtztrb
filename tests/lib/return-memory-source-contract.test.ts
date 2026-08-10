import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Spatial memory / Return — source contract, M4.6. Evidence for what a
 * behavioral test alone doesn't prove: the storage mechanism genuinely
 * used, and the absence of prohibited patterns (native history tampering,
 * React/DOM-element serialization, canonical-record duplication).
 */

const returnMemorySource = readFileSync(
  join(process.cwd(), "src", "lib", "return", "returnMemory.ts"),
  "utf-8",
);

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("returnMemory.ts source contract (M4.6)", () => {
  it("uses sessionStorage, never localStorage — genuinely session-scoped, not permanent (§C6)", () => {
    const stripped = stripComments(returnMemorySource);
    expect(stripped).toMatch(/sessionStorage/);
    expect(stripped).not.toMatch(/\blocalStorage\b/);
  });

  it("never touches history.scrollRestoration — native scroll restoration stays intact (§C7)", () => {
    expect(stripComments(returnMemorySource)).not.toMatch(/scrollRestoration/);
  });

  it("never calls history.back/pushState/replaceState — Return is not Back, and never fabricates a history entry (§C1)", () => {
    const stripped = stripComments(returnMemorySource);
    expect(stripped).not.toMatch(/history\.(back|pushState|replaceState)/);
  });

  it('uses only behavior: "auto" for scroll restoration — never a smooth/animated jump', () => {
    expect(returnMemorySource).not.toMatch(/behavior:\s*["']smooth["']/);
  });

  it("never imports React or a canonical-record/domain module — plain data only, no record duplication (§C3/§C4)", () => {
    const stripped = stripComments(returnMemorySource);
    expect(stripped).not.toMatch(/from ["']react["']/);
    expect(stripped).not.toMatch(/domain\/records/);
  });

  it("never stores a filter/criteria field separately from originUrl — no duplicate filter store (§C4)", () => {
    const stripped = stripComments(returnMemorySource);
    expect(stripped).not.toMatch(/\bfilters?\s*[?:]/i);
    expect(stripped).not.toMatch(/\bcriteria\s*[?:]/i);
  });
});
