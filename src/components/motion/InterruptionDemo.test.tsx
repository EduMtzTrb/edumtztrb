import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { InterruptionDemo } from "./InterruptionDemo";

describe("InterruptionDemo (M4.3 §C21 — latest-intent proof)", () => {
  it("starts idle", () => {
    render(<InterruptionDemo />);
    expect(screen.getByText(/idle/i)).toBeInTheDocument();
  });

  it("rapid re-triggers resolve to only the latest intent — the obsolete one never settles", () => {
    vi.useFakeTimers();
    render(<InterruptionDemo />);
    const trigger = screen.getByRole("button", { name: /trigger motion/i });

    fireEvent.click(trigger); // intent #1
    fireEvent.click(trigger); // intent #2, supersedes #1
    fireEvent.click(trigger); // intent #3, supersedes #2

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByText(/intent #3 settled/i)).toBeInTheDocument();
    expect(screen.queryByText(/intent #1 settled/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/intent #2 settled/i)).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
