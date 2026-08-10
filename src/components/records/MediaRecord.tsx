import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Media Record — preview of a visual Work/Art/Lab/Product/other media-led
 * record (§34.1). Owns a semantic media *slot* only — the actual media
 * primitives (Figure, Gallery Sequence, Comparison Pair, Artwork Viewer,
 * etc.) are M2.8's. The slot imposes no aspect ratio and no crop; it
 * passes `media` through untouched so intrinsic ratio survives for
 * whatever M2.8 eventually places inside it.
 *
 * Interaction rule: the whole surface is one link, same reasoning as
 * Portal Record — a Media Record has no competing interactive content.
 */
interface MediaRecordProps {
  title: ReactNode;
  href: string;
  media: ReactNode;
  primaryMetadata?: ReactNode;
  description?: ReactNode;
}

export function MediaRecord({
  title,
  href,
  media,
  primaryMetadata,
  description,
}: MediaRecordProps) {
  return (
    <article className="record-media">
      <Link href={href} className="record-media-link">
        <div className="record-media-slot">{media}</div>
        <div className="record-media-body">
          <h3 className="record-media-title type-h3">{title}</h3>
          {primaryMetadata !== undefined && (
            <p className="record-media-metadata type-metadata">{primaryMetadata}</p>
          )}
          {description !== undefined && (
            <p className="record-media-description type-body-small">{description}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
