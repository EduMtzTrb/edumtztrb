import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Direct-entry orientation source contract — M3.13. See docs/implementation/M3.13_DIRECT_ENTRY_ORIENTATION.md. */

function readSource(file: string): string {
  return readFileSync(join(process.cwd(), "src", "components", "shell", file), "utf-8");
}

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("DirectEntryOrientation.tsx source contract (M3.13)", () => {
  const rawSrc = readSource("DirectEntryOrientation.tsx");
  // Checks below scan RENDERED/EXECUTABLE code only (comments stripped) —
  // this module's own doc comments legitimately name the exact anti-
  // patterns (fake Return history, invented previous/next) it exists to
  // avoid, so a literal full-source string match would false-positive on
  // its own explanatory prose.
  const src = stripComments(rawSrc);

  it("composes M3.9's own Breadcrumb component — no second breadcrumb implementation", () => {
    expect(src).toMatch(/import\s*\{\s*Breadcrumb\s*\}\s*from\s*"\.\/Breadcrumb"/);
    expect(src).not.toMatch(/<nav aria-label="Breadcrumb"/);
    expect(src).not.toMatch(/<ol\b/);
  });

  it("never renders fabricated prior-session / Return language", () => {
    expect(src.toLowerCase()).not.toMatch(/return to|where you came from|go back/);
  });

  it("never fabricates a previous/next sequence", () => {
    expect(src).not.toMatch(/\bprevious\b|\bnext project\b/i);
  });
});
