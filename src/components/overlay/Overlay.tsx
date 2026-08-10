"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Overlay Mechanics — M4.5. Composes M4.4's Focus + Recession rather than
 * building a second recession mechanism — see `useOverlayBackgroundProps`
 * (sibling module) for the background half of that composition.
 *
 * NATIVE-ELEMENT AUDIT (§B3 "audit browser support before choosing
 * inert/fallback architecture"): `<dialog>` + `showModal()` was evaluated
 * first, since real evergreen browsers support it well. It was NOT chosen
 * — this repository's own test environment (jsdom, via Vitest) implements
 * neither `HTMLDialogElement.showModal()` nor `.close()` at all (confirmed
 * by direct probe), which would make the entire modal mechanism
 * mechanically unverifiable here, contrary to this project's established
 * "mechanically verified" discipline. The WAI-ARIA Dialog (Modal) Pattern
 * (`role="dialog"`, `aria-modal="true"`) with an explicit, tested Tab-trap
 * is used instead — universally supported, and fully provable by this
 * repository's own test suite rather than depending on unverifiable
 * platform behavior. See docs/implementation/M4.5_OVERLAY_MECHANICS.md.
 */

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

export interface OverlayProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog region (`aria-label`). */
  label: string;
  /**
   * The element Focus return should prefer on close, if still mounted —
   * same-document only (§B8; cross-route persistence is M4.6's concern).
   * Falls back to whatever had focus immediately before the overlay
   * opened, then to leaving focus wherever the browser default puts it —
   * never a forced, arbitrary `<body>` focus, never a detached node.
   */
  origin?: HTMLElement | null;
  children?: ReactNode;
}

export function Overlay({ open, onClose, label, origin, children }: OverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Entry: capture where to return focus, move focus into the modal, trap
  // Tab/Shift+Tab, and let Escape close (§B5/§B6/§B7).
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = (document.activeElement as HTMLElement | null) ?? null;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = getFocusableElements(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !panel.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Exit: restore focus to the stable origin, falling back to whatever was
  // focused immediately before opening — both checked live, never a
  // detached node (§B7).
  useEffect(() => {
    if (open) return;
    const target =
      origin && document.contains(origin)
        ? origin
        : previouslyFocused.current && document.contains(previouslyFocused.current)
          ? previouslyFocused.current
          : null;
    target?.focus();
    previouslyFocused.current = null;
  }, [open, origin]);

  // Scroll lock: preserve the underlying page's scroll position while
  // modal, restore exactly on close (§B11). Overlay content itself scrolls
  // independently (`[data-overlay-panel]`, overlay.css).
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div data-overlay-content>
      <div data-overlay-backdrop aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        data-overlay-panel
        className="plane frame"
      >
        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          aria-label={`Close ${label}`}
          className="action-tertiary type-label"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
