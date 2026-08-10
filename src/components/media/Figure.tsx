import type { ReactNode } from "react";

import { Caption } from "./Caption";

/**
 * Figure — the foundational media primitive (§34.1 Media Record's own
 * "media authority," §37, §38). Works for a photograph, drawing, diagram,
 * render, screenshot, or any other visual artifact — nothing here assumes
 * "image."
 *
 * No mandatory frame, background, radius, or crop (§9/§38 governing crop
 * rule: "cropping is a compositional operation, not a corrective
 * default"). The slot renders `media` through untouched, so intrinsic
 * proportion survives.
 *
 * Accessibility (§20, §63): this component never generates or infers
 * alternative text — that responsibility belongs to whatever media
 * element the consumer passes as `media` (e.g. `<img alt="...">`).
 * `ariaLabel` is only for the rare case a figure needs an accessible
 * identity beyond its own caption/credit text.
 */
interface FigureProps {
  media: ReactNode;
  caption?: ReactNode;
  credit?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export function Figure({ media, caption, credit, ariaLabel, className }: FigureProps) {
  const classes = ["media-figure"];
  if (className) classes.push(className);
  const hasCaption = caption !== undefined || credit !== undefined;

  return (
    <figure className={classes.join(" ")} aria-label={ariaLabel}>
      <div className="media-figure-slot">{media}</div>
      {hasCaption && <Caption credit={credit}>{caption}</Caption>}
    </figure>
  );
}
