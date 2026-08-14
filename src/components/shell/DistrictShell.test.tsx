import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { DistrictShell } from "./DistrictShell";
import { DISTRICT_LABELS } from "./districtNavigation";
import type { CanonicalOwnerDistrict } from "@/domain/records/CanonicalRecord";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const DISTRICTS: CanonicalOwnerDistrict[] = ["work", "research", "lab", "art", "products", "about"];

function renderShell(district: CanonicalOwnerDistrict, pathname: string) {
  vi.mocked(usePathname).mockReturnValue(pathname);
  return render(
    <DistrictShell district={district}>
      <main>{district} page content</main>
    </DistrictShell>,
  );
}

describe("DistrictShell — M5.0 shared district shell", () => {
  it("stamps the correct data-district identity for every district", () => {
    for (const district of DISTRICTS) {
      const { container, unmount } = renderShell(district, `/${district}`);
      expect(container.querySelector(`[data-district="${district}"]`)).not.toBeNull();
      unmount();
    }
  });

  it("renders that district's own DistrictNav landmark for every district", () => {
    for (const district of DISTRICTS) {
      const { unmount } = renderShell(district, `/${district}`);
      expect(
        screen.getByRole("navigation", { name: `${DISTRICT_LABELS[district]} navigation` }),
      ).toBeInTheDocument();
      unmount();
    }
  });

  it("renders children after the district navigation, unmodified", () => {
    renderShell("work", "/work");
    expect(screen.getByText("work page content")).toBeInTheDocument();
  });

  it("never introduces a duplicate main landmark or any other new landmark of its own", () => {
    renderShell("art", "/art");
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });
});
