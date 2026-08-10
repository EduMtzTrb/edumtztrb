/**
 * useOverlayBackgroundProps — M4.5 §B2/§B9. The exact composition point
 * this task requires: "overlay entry must compose M4.4's Focus +
 * Recession mechanism... do not build independent CSS physics."
 *
 * Returns the same `data-focus-state` attribute `focus.css` (M4.4)
 * already styles — zero new CSS rule — plus the native `inert` attribute,
 * which is the real interaction-prevention mechanism (§B9: background
 * must not receive pointer activation, keyboard focus, or accidental
 * screen-reader interaction while modal). Recession (visual) and
 * inertness (functional) are deliberately returned together: a background
 * that looks quieted but can still be tabbed into, or one that is inert
 * but gives no visual cue why, would each be an incomplete signal.
 */
export interface OverlayBackgroundProps {
  readonly "data-focus-state": "neutral" | "receding";
  readonly inert: true | undefined;
}

export function useOverlayBackgroundProps(overlayOpen: boolean): OverlayBackgroundProps {
  return {
    "data-focus-state": overlayOpen ? "receding" : "neutral",
    inert: overlayOpen ? true : undefined,
  };
}
