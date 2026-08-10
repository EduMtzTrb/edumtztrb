import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { DistrictNav } from "./DistrictNav";
import { DISTRICT_NAVIGATION } from "./districtNavigation";
import type { CanonicalOwnerDistrict } from "@/domain/records/CanonicalRecord";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

function renderAt(district: CanonicalOwnerDistrict, pathname: string) {
  vi.mocked(usePathname).mockReturnValue(pathname);
  return render(<DistrictNav district={district} />);
}

/** Every approved STATIC route (PLATFORM_SPECIFICATION.md §5.2–§5.8), transcribed
 * independently of `tests/routes/route-contract.test.ts` for the same reason that
 * file transcribes independently of `src/app` — so an invented district-nav route
 * is actually caught, not just self-confirmed. Dynamic `[entry]`/`[practiceArea]`/
 * etc. segments are deliberately excluded — no district-nav item may target one. */
const APPROVED_STATIC_ROUTES = new Set([
  "/",
  "/work",
  "/work/selected",
  "/work/all",
  "/research",
  "/research/current",
  "/research/publications",
  "/research/writing",
  "/research/talks",
  "/research/archive",
  "/lab",
  "/lab/active",
  "/lab/prototypes",
  "/lab/tools",
  "/lab/studies",
  "/lab/archive",
  "/art",
  "/art/selected",
  "/art/exhibitions",
  "/art/archive",
  "/products",
  "/products/featured",
  "/products/digital",
  "/products/physical",
  "/products/services",
  "/products/archive",
  "/about",
  "/about/profile",
  "/about/practice",
  "/about/experience",
  "/about/education",
  "/about/capabilities",
  "/about/recognition",
  "/about/current-focus",
  "/search",
  "/index",
  "/contact",
]);

const DISTRICTS: CanonicalOwnerDistrict[] = ["work", "research", "lab", "art", "products", "about"];

describe("DistrictNav — shared conceptual order and route validity", () => {
  it("every district's every item href is one of the approved static routes — no invented route", () => {
    for (const district of DISTRICTS) {
      for (const item of DISTRICT_NAVIGATION[district]) {
        expect(
          APPROVED_STATIC_ROUTES.has(item.href),
          `${district}: "${item.label}" → "${item.href}" is not an approved static route`,
        ).toBe(true);
      }
    }
  });

  it("no district ever links to a Search route locally — global Search already provides that access", () => {
    for (const district of DISTRICTS) {
      for (const item of DISTRICT_NAVIGATION[district]) {
        expect(item.href).not.toBe("/search");
        expect(item.label.toLowerCase()).not.toContain("search");
      }
    }
  });

  it("work/research/lab/art/products each start with an 'overview' item and end with a 'comprehensive' item — the shared conceptual order's endpoints", () => {
    for (const district of ["work", "research", "lab", "art", "products"] as const) {
      const items = DISTRICT_NAVIGATION[district];
      expect(items[0].role).toBe("overview");
      expect(items[items.length - 1].role).toBe("comprehensive");
    }
  });

  it("about follows its own approved section structure, not the overview/curated/grouping/comprehensive order", () => {
    const roles = DISTRICT_NAVIGATION.about.map((item) => item.role);
    expect(roles[0]).toBe("overview");
    expect(roles.slice(1).every((role) => role === "section")).toBe(true);
  });

  it("renders a district-labeled nav landmark distinct from the global 'Primary'/'Utilities' landmarks", () => {
    renderAt("work", "/work");
    expect(screen.getByRole("navigation", { name: "Work navigation" })).toBeInTheDocument();
  });

  it("renders every configured item as a real link with its configured href, for every district", () => {
    for (const district of DISTRICTS) {
      const { unmount } = renderAt(district, `/${district}`);
      const nav = screen.getByRole("navigation");
      for (const item of DISTRICT_NAVIGATION[district]) {
        const link = within(nav).getByRole("link", { name: item.label });
        expect(link).toHaveAttribute("href", item.href);
      }
      unmount();
    }
  });

  it('marks only the exact-matching item aria-current="page" — a district root ("/work") is not falsely marked current on a sibling page ("/work/selected")', () => {
    renderAt("work", "/work/selected");
    expect(screen.getByRole("link", { name: "Selected" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "All Work" })).not.toHaveAttribute("aria-current");
  });

  it("marks Overview current only when the pathname is exactly the district root", () => {
    renderAt("lab", "/lab");
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("aria-current", "page");
  });

  it("marks no item current on a route the district nav doesn't itself represent (e.g. a canonical-record entry route)", () => {
    renderAt("art", "/art/some-artwork");
    for (const item of DISTRICT_NAVIGATION.art) {
      expect(screen.getByRole("link", { name: item.label })).not.toHaveAttribute("aria-current");
    }
  });
});
