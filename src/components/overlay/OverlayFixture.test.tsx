import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { OverlayFixture } from "./OverlayFixture";

afterEach(() => {
  document.body.style.overflow = "";
});

describe("OverlayFixture (M4.5 §B14 — composes M4.4's Focus fixture, not a second one)", () => {
  it("renders the Focus fixture content alongside the Overlay trigger", () => {
    render(<OverlayFixture />);
    expect(screen.getByRole("button", { name: "Open overlay" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Focus: Evidence A" })).toBeInTheDocument();
  });

  it("opening the overlay marks the Focus fixture background receding and inert", () => {
    render(<OverlayFixture />);
    fireEvent.click(screen.getByRole("button", { name: "Open overlay" }));

    const focusTrigger = screen.getByRole("button", { name: "Focus: Evidence A" });
    // inert propagates to descendants; closest ancestor carrying the attribute is the background wrapper.
    expect(focusTrigger.closest("[data-focus-state='receding']")).not.toBeNull();
    expect(focusTrigger.closest("[inert]")).not.toBeNull();
  });

  it("closing the overlay returns focus to the Open overlay trigger and restores the background", () => {
    render(<OverlayFixture />);
    const trigger = screen.getByRole("button", { name: "Open overlay" });
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(document.activeElement).toBe(trigger);
    const focusTrigger = screen.getByRole("button", { name: "Focus: Evidence A" });
    expect(focusTrigger.closest("[data-focus-state='receding']")).toBeNull();
    expect(focusTrigger.closest("[inert]")).toBeNull();
  });
});
