"use client";

import { createContext, useContext, useId, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";

/**
 * Tabs — switching between peer panels within the same interaction
 * context (ARIA tablist/tab/tabpanel pattern). Not automatic route
 * navigation: selection lives in local/controlled state, not the URL.
 *
 * Smallest coherent compound API: `Tabs` (state + id-namespace provider),
 * `TabList` (role="tablist", owns arrow-key roving focus), `Tab`
 * (role="tab"), `TabPanel` (role="tabpanel"). No production consumer
 * exists yet — see docs/implementation/M2.6_SELECTION_FILTER_CONTROLS.md.
 */

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  idPrefix: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`<${component}> must be rendered inside <Tabs>`);
  }
  return context;
}

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

export function Tabs({ value, onChange, children }: TabsProps) {
  const idPrefix = useId();
  return (
    <TabsContext.Provider value={{ value, onChange, idPrefix }}>{children}</TabsContext.Provider>
  );
}

interface TabListProps {
  label: string;
  children: ReactNode;
}

/**
 * Keyboard behavior (ARIA APG tablist pattern, automatic activation):
 * ArrowLeft/ArrowRight move roving focus among tabs and activate the
 * newly focused tab; Home/End jump to the first/last tab.
 */
export function TabList({ label, children }: TabListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const navigationKeys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!navigationKeys.includes(event.key)) return;

    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
    );
    if (tabs.length === 0) return;

    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      className="tab-list"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

interface TabProps {
  value: string;
  children: ReactNode;
}

export function Tab({ value, children }: TabProps) {
  const { value: selectedValue, onChange, idPrefix } = useTabsContext("Tab");
  const isSelected = value === selectedValue;

  return (
    <button
      type="button"
      role="tab"
      id={`${idPrefix}-tab-${value}`}
      aria-controls={`${idPrefix}-panel-${value}`}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      className="tab type-label"
      onClick={() => onChange(value)}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  value: string;
  children: ReactNode;
}

export function TabPanel({ value, children }: TabPanelProps) {
  const { value: selectedValue, idPrefix } = useTabsContext("TabPanel");
  const isSelected = value === selectedValue;

  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${value}`}
      aria-labelledby={`${idPrefix}-tab-${value}`}
      hidden={!isSelected}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
