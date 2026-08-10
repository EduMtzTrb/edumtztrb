import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Tab, TabList, TabPanel, Tabs } from "./Tabs";

function ControlledTabs({ onChange }: { onChange?: (value: string) => void }) {
  const [value, setValue] = useState("first");
  return (
    <Tabs
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
    >
      <TabList label="Sections">
        <Tab value="first">First</Tab>
        <Tab value="second">Second</Tab>
      </TabList>
      <TabPanel value="first">First panel content</TabPanel>
      <TabPanel value="second">Second panel content</TabPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders correct tablist/tab/tabpanel roles", () => {
    render(<ControlledTabs />);
    expect(screen.getByRole("tablist", { name: "Sections" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("exposes exactly one selected tab via aria-selected", () => {
    render(<ControlledTabs />);
    const first = screen.getByRole("tab", { name: "First" });
    const second = screen.getByRole("tab", { name: "Second" });
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(second).toHaveAttribute("aria-selected", "false");
  });

  it("associates each tab with its panel via aria-controls/id and aria-labelledby", () => {
    render(<ControlledTabs />);
    const first = screen.getByRole("tab", { name: "First" });
    const panel = screen.getByRole("tabpanel");
    expect(first).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", first.id);
  });

  it("hides the unselected panel", () => {
    render(<ControlledTabs />);
    expect(screen.getByText("First panel content")).toBeVisible();
    expect(screen.getByText("Second panel content")).not.toBeVisible();
  });

  it("moves selection with ArrowRight/ArrowLeft (roving focus, automatic activation)", () => {
    const onChange = vi.fn();
    render(<ControlledTabs onChange={onChange} />);
    const first = screen.getByRole("tab", { name: "First" });
    const second = screen.getByRole("tab", { name: "Second" });

    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith("second");
    expect(document.activeElement).toBe(second);

    fireEvent.keyDown(second, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith("first");
    expect(document.activeElement).toBe(first);
  });

  it("only the selected tab is in the tab order (roving tabindex)", () => {
    render(<ControlledTabs />);
    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("tabIndex", "0");
    expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute("tabIndex", "-1");
  });
});
