import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { DirectEntryOrientation } from "./DirectEntryOrientation";
import { orientationForRecord, orientationForSection, orientationForUtility } from "./orientation";
import { fixtureWorkRecord } from "@/domain/records/fixtures";

describe("DirectEntryOrientation (M3.13)", () => {
  it("renders a breadcrumb trail plus a truthful next-actions list for a canonical record", () => {
    render(<DirectEntryOrientation context={orientationForRecord(fixtureWorkRecord)} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work Overview" })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: "All Work" })).toHaveAttribute("href", "/work/all");
    expect(screen.getByRole("link", { name: "Index" })).toHaveAttribute("href", "/index");
    expect(screen.getByRole("link", { name: "Search" })).toHaveAttribute("href", "/search");
  });

  it("never renders a 'Return to where you came from' or any fabricated prior-session action", () => {
    render(<DirectEntryOrientation context={orientationForRecord(fixtureWorkRecord)} />);
    expect(screen.queryByText(/return to/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/where you came from/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/go back/i)).not.toBeInTheDocument();
  });

  it("omits the district-overview action when already viewing the district root", () => {
    render(
      <DirectEntryOrientation
        context={orientationForSection({
          district: "work",
          currentLabel: "Work",
          currentHref: "/work",
        })}
      />,
    );
    expect(screen.queryByRole("link", { name: "Work Overview" })).not.toBeInTheDocument();
  });

  it("omits the comprehensive-access action when already viewing it, and omits it entirely for a district with none (About)", () => {
    render(
      <DirectEntryOrientation
        context={orientationForSection({
          district: "work",
          currentLabel: "All Work",
          currentHref: "/work/all",
        })}
      />,
    );
    expect(screen.queryByRole("link", { name: "All Work" })).not.toBeInTheDocument();

    const { queryByRole } = render(
      <DirectEntryOrientation
        context={orientationForSection({
          district: "about",
          currentLabel: "Practice",
          currentHref: "/about/practice",
        })}
      />,
    );
    expect(queryByRole("link", { name: "Comprehensive Access" })).not.toBeInTheDocument();
  });

  it("always offers Index and Search — the truthful, universally-valid destinations — even for a global-utility context with no district", () => {
    render(
      <DirectEntryOrientation
        context={orientationForUtility({ currentLabel: "Search", currentHref: "/search" })}
      />,
    );
    expect(screen.getByRole("link", { name: "Index" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Search" })).toBeInTheDocument();
  });
});
