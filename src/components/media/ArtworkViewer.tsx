import type { ReactNode } from "react";

import { Figure } from "./Figure";

interface ArtworkViewerProps {
  media: ReactNode;
  caption?: ReactNode;
  credit?: ReactNode;
  ariaLabel?: string;
}

/**
 * Artwork Viewer Shell — the strongest media-authority rule in this
 * package (§18 of this task's own scope; DESIGN_SYSTEM.md v1.1 §40:
 * "Artwork receives the strongest protection from interface
 * competition"). A shell only: generous void instead of Figure's default
 * spacing (`records.css`-style token reuse, no new value), no Frame/Plane,
 * caption/credit recede in tone but remain always available — never
 * hover-only (§41's "credits may not exist only on hover").
 *
 * Deliberately deferred: any enlarged/focused-view behavior (zoom, a
 * dedicated Focus Layer / Focused-media Field atmosphere). That belongs
 * to later overlay/focus-layer work this package does not own — see
 * docs/implementation/M2.8_MEDIA_FAMILY.md "Overlay / Focus Boundary".
 * This is the in-flow presentation shell only, not an enlarged-view
 * system.
 */
export function ArtworkViewer({ media, caption, credit, ariaLabel }: ArtworkViewerProps) {
  return (
    <Figure
      media={media}
      caption={caption}
      credit={credit}
      ariaLabel={ariaLabel}
      className="media-artwork-viewer"
    />
  );
}
