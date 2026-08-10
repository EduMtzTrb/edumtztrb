import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { ReturnMemoryFixture } from "./ReturnMemoryFixture";

afterEach(() => {
  window.sessionStorage.clear();
  vi.useRealTimers();
});

describe("ReturnMemoryFixture (M4.6 §C12)", () => {
  it("cold entry: Return before any capture reports no fake context", () => {
    render(<ReturnMemoryFixture />);
    fireEvent.click(screen.getByRole("button", { name: /^Return/ }));
    expect(screen.getByRole("status")).toHaveTextContent(/nothing to return to/i);
  });

  it("Return restores the captured state, not the live state that changed afterward", () => {
    vi.useFakeTimers();
    render(<ReturnMemoryFixture />);

    fireEvent.click(screen.getByRole("button", { name: "Capture current state" }));
    // Change live state after capturing.
    fireEvent.click(screen.getByRole("button", { name: /toggle expanded/i }));
    expect(screen.getByText(/expanded:/i)).toHaveTextContent("true");

    fireEvent.click(screen.getByRole("button", { name: /^Return/ }));
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Captured while live "expanded" was still false → expandedIds should be empty.
    expect(screen.getByText("[]")).toBeInTheDocument();
  });

  it("rapid re-Return resolves to only the latest intent", () => {
    vi.useFakeTimers();
    render(<ReturnMemoryFixture />);
    fireEvent.click(screen.getByRole("button", { name: "Capture current state" }));

    const returnButton = screen.getByRole("button", { name: /^Return/ });
    fireEvent.click(returnButton);
    fireEvent.click(returnButton);
    fireEvent.click(returnButton);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByRole("status")).toHaveTextContent(/intent #3 settled/i);
    expect(screen.queryByText(/intent #1 settled/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/intent #2 settled/i)).not.toBeInTheDocument();
  });

  it("the capture control carries a stable origin key restoreFocusByKey can resolve", () => {
    render(<ReturnMemoryFixture />);
    const captureButton = screen.getByRole("button", { name: "Capture current state" });
    expect(captureButton).toHaveAttribute("data-return-origin-key", "return-fixture-origin");
  });
});
