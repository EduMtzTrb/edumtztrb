import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { TextAreaField } from "./TextAreaField";

describe("TextAreaField", () => {
  it("renders a native textarea with a persistent, associated label", () => {
    render(<TextAreaField label="Fixture message" />);
    const textarea = screen.getByRole("textbox", { name: "Fixture message" });
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("associates optional guidance via aria-describedby", () => {
    render(<TextAreaField label="Fixture message" guidance="Fixture guidance text" />);
    const textarea = screen.getByRole("textbox", { name: "Fixture message" });
    const describedBy = textarea.getAttribute("aria-describedby");
    const guidance = document.getElementById(describedBy!.split(" ")[0]);
    expect(guidance).toHaveTextContent("Fixture guidance text");
  });

  it("shows the visible required marker and native required semantics", () => {
    render(<TextAreaField label="Fixture message" required />);
    expect(screen.getByRole("textbox", { name: /Fixture message/ })).toBeRequired();
    expect(screen.getByText("(required)")).toBeVisible();
  });

  it("renders an error with aria-invalid and an associated explanation", () => {
    render(<TextAreaField label="Fixture message" error="Fixture error explanation" />);
    const textarea = screen.getByRole("textbox", { name: "Fixture message" });
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Fixture error explanation");
  });

  it("supports the native disabled attribute", () => {
    render(<TextAreaField label="Fixture message" disabled />);
    expect(screen.getByRole("textbox", { name: "Fixture message" })).toBeDisabled();
  });

  it("preserves native textarea props (rows, defaultValue)", () => {
    render(<TextAreaField label="Fixture message" rows={6} defaultValue="Fixture content" />);
    const textarea = screen.getByRole("textbox", { name: "Fixture message" });
    expect(textarea).toHaveAttribute("rows", "6");
    expect(textarea).toHaveValue("Fixture content");
  });
});
