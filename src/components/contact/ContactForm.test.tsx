import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { ContactForm } from "./ContactForm";

/**
 * M6.1 — Contact form contract. Protects the critical rule this component
 * exists to honor: never make a form appear functional when no truthful
 * delivery mechanism exists. See docs/implementation/M6.1_CONTACT.md.
 */
describe("ContactForm (M6.1)", () => {
  it("renders persistent, associated labels for name, reply email, and message — the exact ABOUT_UNIVERSE_v1.1.md §18 required fields, nothing more", () => {
    render(<ContactForm />);
    expect(screen.getByRole("textbox", { name: /^Name/ })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^Reply email/ })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^Message/ })).toBeInTheDocument();
    // Explicitly forbidden fields (ABOUT_UNIVERSE_v1.1.md §18's own "Avoid" list).
    expect(screen.queryByRole("textbox", { name: /phone/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /company/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /budget/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("marks all three fields required with real native semantics, not color alone", () => {
    render(<ContactForm />);
    expect(screen.getByRole("textbox", { name: /^Name/ })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /^Reply email/ })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /^Message/ })).toBeRequired();
    expect(screen.getAllByText("(required)")).toHaveLength(3);
  });

  it("shows no error before any submission attempt", () => {
    render(<ContactForm />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("blocks submission and shows real field-level errors for empty required fields, moving focus to the first invalid field", () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    const nameInput = screen.getByRole("textbox", { name: /^Name/ });
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveFocus();
    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
  });

  it("validates email format, not just presence", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByRole("textbox", { name: /^Name/ }), {
      target: { value: "Fixture Name" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /^Reply email/ }), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /^Message/ }), {
      target: { value: "Fixture message" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^Reply email/ })).toHaveFocus();
  });

  it("preserves entered values after a recoverable validation failure — nothing is cleared", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByRole("textbox", { name: /^Name/ }), {
      target: { value: "Fixture Name" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /^Message/ }), {
      target: { value: "Fixture message that should survive" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // Email was left empty (a real failure), but Name/Message survive untouched.
    expect(screen.getByRole("textbox", { name: /^Name/ })).toHaveValue("Fixture Name");
    expect(screen.getByRole("textbox", { name: /^Message/ })).toHaveValue(
      "Fixture message that should survive",
    );
  });

  it("a fully valid submission never fakes success — renders an honest UnavailableState instead of a fabricated confirmation", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByRole("textbox", { name: /^Name/ }), {
      target: { value: "Fixture Name" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /^Reply email/ }), {
      target: { value: "fixture@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /^Message/ }), {
      target: { value: "Fixture message" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText("This message was not sent.")).toBeInTheDocument();
    expect(
      screen.getByText(/not yet connected to a real delivery destination/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/nothing you entered was transmitted or stored/i)).toBeInTheDocument();
    // No fabricated success state anywhere.
    expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    // The form itself is gone — there is nothing left to resubmit against a
    // destination that doesn't exist.
    expect(screen.queryByRole("button", { name: /send message/i })).not.toBeInTheDocument();
  });

  it("the submit action uses a real native submit button, not a disabled-mystery control", () => {
    render(<ContactForm />);
    const button = screen.getByRole("button", { name: /send message/i });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toBeDisabled();
  });
});
