import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { TextField } from "./TextField";

describe("TextField", () => {
  it("renders a native input with a persistent, associated label", () => {
    render(<TextField label="Fixture name" />);
    const input = screen.getByRole("textbox", { name: "Fixture name" });
    expect(input.tagName).toBe("INPUT");
    expect(screen.getByText("Fixture name")).toBeVisible();
  });

  it("does not use placeholder as a label substitute — both can coexist", () => {
    render(<TextField label="Fixture name" placeholder="e.g. Jane" />);
    const input = screen.getByRole("textbox", { name: "Fixture name" });
    expect(input).toHaveAttribute("placeholder", "e.g. Jane");
    expect(screen.getByText("Fixture name")).toBeInTheDocument();
  });

  it("associates optional guidance via aria-describedby", () => {
    render(<TextField label="Fixture name" guidance="Fixture guidance text" />);
    const input = screen.getByRole("textbox", { name: "Fixture name" });
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    const guidance = document.getElementById(describedBy!.split(" ")[0]);
    expect(guidance).toHaveTextContent("Fixture guidance text");
  });

  it("shows an explicit, visible required marker (not a bare color-only asterisk) and native required semantics", () => {
    render(<TextField label="Fixture name" required />);
    const input = screen.getByRole("textbox", { name: /Fixture name/ });
    expect(input).toBeRequired();
    expect(screen.getByText("(required)")).toBeVisible();
  });

  it("does not falsely show required for an optional field", () => {
    render(<TextField label="Fixture name" />);
    expect(screen.queryByText("(required)")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Fixture name" })).not.toBeRequired();
  });

  it("renders an error with aria-invalid and an associated explanation, without removing the control or its value", () => {
    render(
      <TextField
        label="Fixture email"
        defaultValue="fixture@example.com"
        error="Fixture error explanation"
      />,
    );
    const input = screen.getByRole("textbox", { name: "Fixture email" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveValue("fixture@example.com");
    const describedBy = input.getAttribute("aria-describedby");
    const errorEl = document.getElementById(describedBy!.split(" ").pop()!);
    expect(errorEl).toHaveTextContent("Fixture error explanation");
    expect(errorEl).toHaveAttribute("role", "alert");
  });

  it("does not render an error region when no error is supplied", () => {
    render(<TextField label="Fixture name" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("supports the native disabled attribute", () => {
    const onChange = vi.fn();
    render(<TextField label="Fixture name" disabled onChange={onChange} />);
    expect(screen.getByRole("textbox", { name: "Fixture name" })).toBeDisabled();
  });

  it("preserves native input props (type, value, onChange)", () => {
    const onChange = vi.fn();
    render(
      <TextField
        label="Fixture email"
        type="email"
        value="fixture@example.com"
        onChange={onChange}
      />,
    );
    const input = screen.getByRole("textbox", { name: "Fixture email" });
    expect(input).toHaveAttribute("type", "email");
    fireEvent.change(input, { target: { value: "changed@example.com" } });
    expect(onChange).toHaveBeenCalled();
  });
});
