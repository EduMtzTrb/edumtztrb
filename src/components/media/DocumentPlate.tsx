import type { ReactNode } from "react";

import { Figure } from "./Figure";

interface DocumentPlateProps {
  media: ReactNode;
  plateIdentifier?: ReactNode;
  caption?: ReactNode;
  credit?: ReactNode;
}

/**
 * Document Plate — a PDF page, drawing sheet, research document,
 * technical artifact, or scanned page (§16 of this task's own scope;
 * DESIGN_SYSTEM.md v1.1 §38.1 lists documents among crop-resistant,
 * extent-carrying media). The one M2.8 primitive that legitimately
 * applies `.frame` (M2.4) by default: a document genuinely has an extent
 * worth marking, unlike every other primitive in this package, which
 * stays unframed. No fake browser chrome, no paper texture, no
 * box-shadow — the frame is the same restrained hairline boundary every
 * other Frame consumer in this repository already uses.
 */
export function DocumentPlate({ media, plateIdentifier, caption, credit }: DocumentPlateProps) {
  return (
    <div className="media-document-plate frame">
      {plateIdentifier !== undefined && (
        <p className="media-document-plate-identifier type-metadata">{plateIdentifier}</p>
      )}
      <Figure media={media} caption={caption} credit={credit} />
    </div>
  );
}
