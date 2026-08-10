import type { ReactNode } from "react";

import { Figure } from "./Figure";

export interface ProductMediaItem {
  media: ReactNode;
  label: ReactNode;
  credit?: ReactNode;
}

interface ProductMediaSetProps {
  label: string;
  items: ProductMediaItem[];
}

/**
 * Product Media Set — supports evaluation, not promotional spectacle
 * (§19 of this task's own scope; DESIGN_SYSTEM.md v1.1 §41). Each item's
 * `label` communicates its evaluation role (primary view, detail,
 * variant, material, context) rather than a decorative index.
 * Deliberately its own named component rather than reusing Gallery
 * Sequence — a product set's order is evaluation-driven, not narrative,
 * and this task explicitly protects that semantic distinction even where
 * the two primitives share a similar shape. No forced square crop, no
 * sale badge, no accent color, no Signal.
 */
export function ProductMediaSet({ label, items }: ProductMediaSetProps) {
  return (
    <ol className="media-product-media-set" aria-label={label}>
      {items.map((item, index) => (
        <li className="media-product-media-item" key={index}>
          <Figure media={item.media} caption={item.label} credit={item.credit} />
        </li>
      ))}
    </ol>
  );
}
