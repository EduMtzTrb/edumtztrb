import type { ReactNode } from "react";

import { Figure } from "./Figure";

export interface GallerySequenceItem {
  media: ReactNode;
  caption?: ReactNode;
  credit?: ReactNode;
}

interface GallerySequenceProps {
  label: string;
  items: GallerySequenceItem[];
}

/**
 * Gallery Sequence — an ordered set of media with a stable reading order
 * (§13 of this task's own scope). A plain `<ol>` of `Figure`s, not a
 * carousel: no gesture-only interaction, no hidden essential information,
 * no assumption every item shares dimensions. A vertically sequenced
 * reading order is the default rather than an interactive slider, per
 * this package's explicit "do not invent interactive navigation the
 * current authority doesn't require."
 */
export function GallerySequence({ label, items }: GallerySequenceProps) {
  return (
    <ol className="media-gallery-sequence" aria-label={label}>
      {items.map((item, index) => (
        <li className="media-gallery-item" key={index}>
          <Figure media={item.media} caption={item.caption} credit={item.credit} />
          <span className="media-gallery-position type-metadata">
            {index + 1} / {items.length}
          </span>
        </li>
      ))}
    </ol>
  );
}
