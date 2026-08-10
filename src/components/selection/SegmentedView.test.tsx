import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { SegmentedView } from "./SegmentedView";

const OPTIONS = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
];

function ControlledSegmentedView({ onChange }: { onChange?: (value: string) => void }) {
  const [value, setValue] = useState("grid");
  return (
    <SegmentedView
      label="Layout"
      name="layout"
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
      options={OPTIONS}
    />
  );
}

describe("SegmentedView", () => {
  it("renders a native, labeled radiogroup with one radio per option", () => {
    render(<ControlledSegmentedView />);
    expect(screen.getByRole("radiogroup", { name: "Layout" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("exposes exactly one checked option programmatically", () => {
    render(<ControlledSegmentedView />);
    expect(screen.getByRole("radio", { name: "Grid" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "List" })).not.toBeChecked();
  });

  it("mutual exclusivity: selecting one option calls onChange with its value", () => {
    const onChange = vi.fn();
    render(<ControlledSegmentedView onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "List" }));
    expect(onChange).toHaveBeenCalledWith("list");
    expect(screen.getByRole("radio", { name: "List" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Grid" })).not.toBeChecked();
  });

  it("supports a disabled option", () => {
    render(
      <SegmentedView
        label="Layout"
        name="layout-disabled"
        value="grid"
        onChange={() => {}}
        options={[
          { value: "grid", label: "Grid" },
          { value: "list", label: "List", disabled: true },
        ]}
      />,
    );
    expect(screen.getByRole("radio", { name: "List" })).toBeDisabled();
  });
});
