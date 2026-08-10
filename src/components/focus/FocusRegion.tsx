"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Focus + Recession — M4.4. The one reusable Focus mechanism every
 * semantic context (Work evidence, Research artifacts, Lab inspection, Art
 * viewing, Product evaluation, About long-form reading) composes — see
 * docs/implementation/M4.4_FOCUS_RECESSION.md.
 *
 * FOCUS IS NOT ROUTING (§A2) — this module never imports `next/navigation`,
 * never mutates the URL, and never references a canonical record ID. It is
 * pure, in-page React state: which one item (if any) within this region is
 * currently concentrated.
 *
 * NOT MODAL — this is the non-modal Focus primitive M4.5 composes for
 * overlay entry. It never traps keyboard focus, never marks background
 * content inert, and never locks scroll. A genuinely modal presentation is
 * M4.5's own, separate responsibility.
 */

interface FocusRegionState {
  readonly activeKey: string | null;
  /**
   * The element that opened the currently active focus, if any — a same-
   * document live reference only (never serialized, never trusted across
   * navigation; cross-route origin persistence is M4.6's separate concern).
   * Exposed so a composing consumer (M4.5's modal overlay) can perform its
   * own focus-return without this module needing to know what "return"
   * means for a modal presentation.
   */
  readonly origin: HTMLElement | null;
  open(key: string, origin: HTMLElement | null): void;
  close(): void;
  isActive(key: string): boolean;
  isReceding(key: string): boolean;
}

const FocusRegionContext = createContext<FocusRegionState | null>(null);

export interface FocusRegionProps {
  children: ReactNode;
  /**
   * Which recession token this region's receding items use — a semantic
   * configuration knob (§A9: "district/content contexts may provide
   * semantic configuration"), not a second mechanism. Defaults to
   * `--motion-recession-focus`; a context where the interface should recede
   * most strongly (e.g. Art viewing) may pass `--motion-recession-overlay`.
   * Never a district-name CSS selector — always an M4.1 token reference.
   */
  recessionToken?:
    "--motion-recession-subtle" | "--motion-recession-focus" | "--motion-recession-overlay";
}

export function FocusRegion({
  children,
  recessionToken = "--motion-recession-focus",
}: FocusRegionProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [origin, setOrigin] = useState<HTMLElement | null>(null);

  const open = useCallback((key: string, originElement: HTMLElement | null) => {
    setOrigin(originElement);
    setActiveKey(key);
  }, []);

  const close = useCallback(() => {
    setActiveKey(null);
    setOrigin(null);
  }, []);

  const isActive = useCallback((key: string) => activeKey === key, [activeKey]);
  const isReceding = useCallback(
    (key: string) => activeKey !== null && activeKey !== key,
    [activeKey],
  );

  const value = useMemo<FocusRegionState>(
    () => ({ activeKey, origin, open, close, isActive, isReceding }),
    [activeKey, origin, open, close, isActive, isReceding],
  );

  const style = { "--focus-recession-opacity": `var(${recessionToken})` } as CSSProperties;

  return (
    <FocusRegionContext.Provider value={value}>
      <div data-focus-region style={style}>
        {children}
      </div>
    </FocusRegionContext.Provider>
  );
}

export function useFocusRegion(): FocusRegionState {
  const context = useContext(FocusRegionContext);
  if (!context) {
    throw new Error("useFocusRegion must be used within a FocusRegion");
  }
  return context;
}
