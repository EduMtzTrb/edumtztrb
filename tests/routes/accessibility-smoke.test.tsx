import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { AppShell } from "@/components/shell/AppShell";
import { DistrictOverviewShell } from "@/components/page-shells/PageShell";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/work"),
}));

/**
 * Structural accessibility smoke checks against AppShell (M1.4) and a page
 * shell (M1.5) composed together, the way a visitor actually encounters them.
 * These are smoke checks against contracts already implemented, not a WCAG
 * conformance audit — see `docs/implementation/M1.6_TESTING_BASELINE.md`.
 */
function renderComposedPage() {
  return render(
    <AppShell>
      <DistrictOverviewShell heading="Work" />
    </AppShell>,
  );
}

describe("Accessibility smoke: AppShell + a page shell composed as a real route renders", () => {
  it("exposes exactly one main landmark for the whole composed page", () => {
    renderComposedPage();
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });

  it("exposes two distinctly labeled navigation landmarks", () => {
    renderComposedPage();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Utilities" })).toBeInTheDocument();
  });

  it("keeps the skip link a real, native, focusable anchor", () => {
    renderComposedPage();
    const skipLink = screen.getByRole("link", { name: "Skip to main content" });
    expect(skipLink.tagName).toBe("A");
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("provides exactly one H1 for the composed page", () => {
    renderComposedPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("communicates the active district semantically, independent of any color/CSS", () => {
    renderComposedPage();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
  });

  it("creates no empty ARIA-labeled landmark anywhere in the composed page", () => {
    const { container } = renderComposedPage();
    const labeled = container.querySelectorAll("[aria-label]");
    expect(labeled.length).toBeGreaterThan(0);
    labeled.forEach((element) => {
      expect(element.textContent?.trim().length ?? 0).toBeGreaterThan(0);
    });
  });

  it("uses real anchors with an href for every navigable link (no click-only pseudo-links)", () => {
    renderComposedPage();
    for (const link of screen.getAllByRole("link")) {
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href");
    }
  });
});
