import type { ElementType, ReactNode } from "react";

/**
 * Caption — quiet, media-attached text (DESIGN_SYSTEM.md v1.1 §42, §12
 * type table: "Caption | Media caption or credit | 13–14 px | Quiet,
 * media-attached"). The same typographic role serves both caption and
 * credit — §42/§12 name them together, not as separate roles — so
 * `credit` is a second, structurally distinct line inside the same
 * component rather than a new typography size.
 *
 * `as` defaults to `"figcaption"` for use directly inside a native
 * `<figure>` (Figure, Document Plate, Video Frame, Artwork Viewer,
 * Product Media Set items); pass `as="p"` when a caption is needed
 * outside a `<figure>` context.
 */
interface CaptionProps {
  children?: ReactNode;
  credit?: ReactNode;
  as?: Extract<ElementType, "figcaption" | "p">;
  className?: string;
}

export function Caption({ children, credit, as = "figcaption", className }: CaptionProps) {
  const Tag = as;
  const classes = ["media-caption", "type-caption"];
  if (className) classes.push(className);

  return (
    <Tag className={classes.join(" ")}>
      {children}
      {credit !== undefined && (
        <span className="media-credit">
          {children !== undefined ? " — " : ""}
          {credit}
        </span>
      )}
    </Tag>
  );
}
