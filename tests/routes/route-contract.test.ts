import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, sep } from "node:path";

/**
 * Transcribed directly from PLATFORM_SPECIFICATION_v1.0.md §5 (top-level routes,
 * the seven district route sets, and the global discovery routes) — not derived
 * from scanning `src/app`, so this test can actually detect an accidental
 * deletion, rename, or unapproved addition instead of only confirming itself.
 */
const TOP_LEVEL = [
  "/",
  "/work",
  "/research",
  "/lab",
  "/art",
  "/products",
  "/about",
  "/search",
  "/index",
  "/contact",
];

const WORK = [
  "/work/selected",
  "/work/all",
  "/work/practice/[practiceArea]",
  "/work/collections/[collection]",
  "/work/[entry]",
];

const RESEARCH = [
  "/research/current",
  "/research/themes/[theme]",
  "/research/publications",
  "/research/writing",
  "/research/talks",
  "/research/archive",
  "/research/[entry]",
];

const LAB = [
  "/lab/active",
  "/lab/prototypes",
  "/lab/tools",
  "/lab/studies",
  "/lab/archive",
  "/lab/[entry]",
];

const ART = [
  "/art/selected",
  "/art/series/[series]",
  "/art/medium/[medium]",
  "/art/exhibitions",
  "/art/archive",
  "/art/[entry]",
];

const PRODUCTS = [
  "/products/featured",
  "/products/collections/[collection]",
  "/products/digital",
  "/products/physical",
  "/products/services",
  "/products/archive",
  "/products/[entry]",
];

const ABOUT = [
  "/about/profile",
  "/about/practice",
  "/about/experience",
  "/about/education",
  "/about/capabilities",
  "/about/recognition",
  "/about/current-focus",
];

const INDEX_LENSES = [
  "/index/district/[district]",
  "/index/type/[contentType]",
  "/index/discipline/[discipline]",
  "/index/theme/[theme]",
  "/index/year/[year]",
];

const APPROVED_ROUTES = [
  ...TOP_LEVEL,
  ...WORK,
  ...RESEARCH,
  ...LAB,
  ...ART,
  ...PRODUCTS,
  ...ABOUT,
  ...INDEX_LENSES,
];

const APP_DIR = join(process.cwd(), "src", "app");

function routeToRelativePageFile(route: string): string {
  return route === "/" ? "page.tsx" : `${route.slice(1)}/page.tsx`;
}

function findPageFiles(dir: string, base: string = dir): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found.push(...findPageFiles(full, base));
    } else if (entry === "page.tsx") {
      found.push(
        full
          .slice(base.length + 1)
          .split(sep)
          .join("/"),
      );
    }
  }
  return found;
}

describe("Route contract (PLATFORM_SPECIFICATION_v1.0.md §5)", () => {
  it("declares exactly 53 approved routes in this test's own source-of-truth list", () => {
    expect(APPROVED_ROUTES).toHaveLength(53);
  });

  it("declares 37 static and 16 dynamic approved routes", () => {
    const dynamic = APPROVED_ROUTES.filter((route) => route.includes("["));
    const staticRoutes = APPROVED_ROUTES.filter((route) => !route.includes("["));
    expect(staticRoutes).toHaveLength(37);
    expect(dynamic).toHaveLength(16);
  });

  it.each(APPROVED_ROUTES)("approved route %s has a page.tsx file", (route) => {
    const file = join(APP_DIR, routeToRelativePageFile(route));
    expect(existsSync(file)).toBe(true);
  });

  it("has no unapproved, missing, or renamed route files versus the approved set", () => {
    const actual = new Set(findPageFiles(APP_DIR));
    const expected = new Set(APPROVED_ROUTES.map(routeToRelativePageFile));

    const missing = [...expected].filter((file) => !actual.has(file));
    const unexpected = [...actual].filter((file) => !expected.has(file));

    expect(missing, `Missing approved route files: ${missing.join(", ")}`).toHaveLength(0);
    expect(unexpected, `Unapproved/extra route files found: ${unexpected.join(", ")}`).toHaveLength(
      0,
    );
  });
});
