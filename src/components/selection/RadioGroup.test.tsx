import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { RadioGroup } from "./RadioGroup";

const OPTIONS = [
  { value: "public", label: "Public" },
  { value: "restricted", label: "Restricted" },
];

function ControlledRadioGroup({ onChange }: { onChange?: (value: string) => void }) {
  const [value, setValue] = useState("public");
  return (
    <RadioGroup
      label="Visibility"
      name="visibility"
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
      options={OPTIONS}
    />
  );
}

describe("RadioGroup", () => {
  it("renders a native, labeled radiogroup with one radio per option", () => {
    render(<ControlledRadioGroup />);
    expect(screen.getByRole("radiogroup", { name: "Visibility" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("radios share one name (mutual exclusivity)", () => {
    render(<ControlledRadioGroup />);
    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toHaveAttribute("name", "visibility");
    }
  });

  it("exposes checked state programmatically", () => {
    render(<ControlledRadioGroup />);
    expect(screen.getByRole("radio", { name: "Public" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Restricted" })).not.toBeChecked();
  });

  it("selecting one option checks it and unchecks the other", () => {
    const onChange = vi.fn();
    render(<ControlledRadioGroup onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "Restricted" }));
    expect(onChange).toHaveBeenCalledWith("restricted");
    expect(screen.getByRole("radio", { name: "Restricted" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Public" })).not.toBeChecked();
  });

  it("supports a disabled option", () => {
    render(
      <RadioGroup
        label="Visibility"
        name="visibility-disabled"
        value="public"
        onChange={() => {}}
        options={[
          { value: "public", label: "Public" },
          { value: "restricted", label: "Restricted", disabled: true },
        ]}
      />,
    );
    expect(screen.getByRole("radio", { name: "Restricted" })).toBeDisabled();
  });
});
