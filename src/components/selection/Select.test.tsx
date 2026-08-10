import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Select } from "./Select";

const OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

describe("Select", () => {
  it("renders a native select, labeled and with its options", () => {
    render(<Select label="Sort by" options={OPTIONS} defaultValue="newest" onChange={() => {}} />);
    const select = screen.getByRole("combobox", { name: "Sort by" });
    expect(select.tagName).toBe("SELECT");
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("reflects the selected option", () => {
    render(<Select label="Sort by" options={OPTIONS} defaultValue="oldest" onChange={() => {}} />);
    const select = screen.getByRole("combobox", { name: "Sort by" }) as HTMLSelectElement;
    expect(select.value).toBe("oldest");
  });

  it("supports the native disabled attribute", () => {
    render(<Select label="Sort by" options={OPTIONS} disabled onChange={() => {}} />);
    expect(screen.getByRole("combobox", { name: "Sort by" })).toBeDisabled();
  });
});
