import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import { Overlay } from "./Overlay";

afterEach(() => {
  document.body.style.overflow = "";
});

function ControlledOverlay({
  initialOpen = true,
  onClose,
  origin,
}: {
  initialOpen?: boolean;
  onClose?: () => void;
  origin?: HTMLElement | null;
}) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <Overlay
      open={open}
      onClose={() => {
        setOpen(false);
        onClose?.();
      }}
      label="Fixture overlay"
      origin={origin}
    >
      <p>Overlay body content</p>
      <a href="/contact">A link inside the overlay</a>
      <button type="button">Another overlay button</button>
    </Overlay>
  );
}

describe("Overlay (M4.5 §B13)", () => {
  it("renders nothing when closed", () => {
    render(<Overlay open={false} onClose={() => {}} label="Fixture overlay" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has correct modal dialog semantics: role=dialog, aria-modal, accessible name", () => {
    render(<Overlay open onClose={() => {}} label="Fixture overlay" />);
    const dialog = screen.getByRole("dialog", { name: "Fixture overlay" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("has a visible close control, keyboard and touch accessible (a real button)", () => {
    render(<Overlay open onClose={() => {}} label="Fixture overlay" />);
    const close = screen.getByRole("button", { name: "Close Fixture overlay" });
    expect(close.tagName).toBe("BUTTON");
  });

  it("clicking Close calls onClose", () => {
    const onClose = vi.fn();
    render(<Overlay open onClose={onClose} label="Fixture overlay" />);
    fireEvent.click(screen.getByRole("button", { name: "Close Fixture overlay" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Escape calls onClose", () => {
    const onClose = vi.fn();
    render(<Overlay open onClose={onClose} label="Fixture overlay" />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("moves focus into the modal on open — the close control receives it", () => {
    render(<Overlay open onClose={() => {}} label="Fixture overlay" />);
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Close Fixture overlay" }),
    );
  });

  it("Tab from the last focusable element wraps to the first (forward trap)", () => {
    render(
      <Overlay open onClose={() => {}} label="Fixture overlay">
        <button type="button">Another overlay button</button>
      </Overlay>,
    );
    const lastButton = screen.getByRole("button", { name: "Another overlay button" });
    lastButton.focus();
    expect(document.activeElement).toBe(lastButton);

    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Close Fixture overlay" }),
    );
  });

  it("Shift+Tab from the first focusable element wraps to the last (backward trap)", () => {
    render(
      <Overlay open onClose={() => {}} label="Fixture overlay">
        <button type="button">Another overlay button</button>
      </Overlay>,
    );
    const closeButton = screen.getByRole("button", { name: "Close Fixture overlay" });
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Another overlay button" }),
    );
  });

  it("focus cannot escape into the underlying page while modal — an outside element receiving focus is pulled back in on the next Tab", () => {
    render(
      <>
        <button type="button">Outside button</button>
        <ControlledOverlay />
      </>,
    );
    const outside = screen.getByRole("button", { name: "Outside button" });
    outside.focus();
    expect(document.activeElement).toBe(outside);

    fireEvent.keyDown(document, { key: "Tab" });
    // Not inside the panel — the trap treats this as "outside," wrapping to the first item.
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Close Fixture overlay" }),
    );
  });

  it("returns focus to the explicit origin on close, when it is still mounted", () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      const [origin, setOrigin] = useState<HTMLButtonElement | null>(null);
      return (
        <>
          <button type="button" ref={setOrigin} onClick={() => setOpen(true)}>
            Origin trigger
          </button>
          <Overlay
            open={open}
            onClose={() => setOpen(false)}
            label="Fixture overlay"
            origin={origin}
          >
            <p>Body</p>
          </Overlay>
        </>
      );
    }
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Origin trigger" }));
    fireEvent.click(screen.getByRole("button", { name: "Close Fixture overlay" }));
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Origin trigger" }));
  });

  it("falls back to the element focused immediately before opening when no origin is supplied", () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open trigger
          </button>
          <Overlay open={open} onClose={() => setOpen(false)} label="Fixture overlay">
            <p>Body</p>
          </Overlay>
        </>
      );
    }
    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Open trigger" });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.activeElement).toBe(trigger);
  });

  it("preserves and restores document.body scroll locking exactly", () => {
    document.body.style.overflow = "auto";
    const { rerender } = render(<Overlay open onClose={() => {}} label="Fixture overlay" />);
    expect(document.body.style.overflow).toBe("hidden");

    rerender(<Overlay open={false} onClose={() => {}} label="Fixture overlay" />);
    expect(document.body.style.overflow).toBe("auto");
  });

  it("is not a destination — never mutates window.location or history", () => {
    const originalHref = window.location.href;
    render(<Overlay open onClose={() => {}} label="Fixture overlay" />);
    expect(window.location.href).toBe(originalHref);
  });
});
