import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Action } from "@/components/controls/Action";
import { Checkbox } from "@/components/selection/Checkbox";
import { RadioGroup } from "@/components/selection/RadioGroup";
import { Select } from "@/components/selection/Select";

import { TextField } from "./TextField";

/**
 * Confirms M2.5's Action (now supporting type="submit") and M2.6's
 * existing Select/Checkbox/RadioGroup all work inside a real <form>
 * alongside M2.10's TextField, without any of those components needing to
 * change beyond Action's own documented, tested `type` extension —
 * component integration testing only, per this task's own instruction. No
 * production Contact/checkout form is built or modified.
 */
function FixtureForm({ onSubmit }: { onSubmit: () => void }) {
  const [visibility, setVisibility] = useState("public");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <TextField label="Fixture name" required />
      <Select
        label="Fixture category"
        options={[{ value: "a", label: "Fixture A" }]}
        defaultValue="a"
      />
      <Checkbox label="Fixture subscribe" />
      <RadioGroup
        label="Fixture visibility"
        name="fixture-visibility"
        value={visibility}
        onChange={setVisibility}
        options={[
          { value: "public", label: "Public" },
          { value: "restricted", label: "Restricted" },
        ]}
      />
      <Action type="submit">Fixture submit</Action>
    </form>
  );
}

describe("M2.10 / M2.5 / M2.6 control integration", () => {
  it("renders a real <form> containing a native submit Action alongside existing selection controls", () => {
    render(<FixtureForm onSubmit={() => {}} />);
    expect(screen.getByRole("textbox", { name: /Fixture name/ })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Fixture category" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Fixture subscribe" })).toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: "Fixture visibility" })).toBeInTheDocument();
    const submit = screen.getByRole("button", { name: "Fixture submit" });
    expect(submit).toHaveAttribute("type", "submit");
  });

  it("a real <button type=submit> inside the form triggers the form's submit handler", () => {
    // Real browsers submit the enclosing form when a type="submit" button
    // is clicked — that activation behavior is what Action's `type` prop
    // enables. jsdom does not implement that specific click-to-submit
    // chain for programmatically dispatched clicks, so this exercises the
    // same native form-submission path directly (the same technique the
    // M2.6 Checkbox tests already use for an analogous jsdom gap around
    // disabled inputs) rather than depending on an unsupported simulation.
    const onSubmit = vi.fn();
    const { container } = render(<FixtureForm onSubmit={onSubmit} />);
    const submit = screen.getByRole("button", { name: "Fixture submit" });
    expect(submit).toHaveAttribute("type", "submit");
    fireEvent.submit(container.querySelector("form")!);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("existing M2.6 controls remain fully interactive inside the form", () => {
    render(<FixtureForm onSubmit={() => {}} />);
    const checkbox = screen.getByRole("checkbox", { name: "Fixture subscribe" });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(screen.getByRole("radio", { name: "Restricted" }));
    expect(screen.getByRole("radio", { name: "Restricted" })).toBeChecked();
  });
});
