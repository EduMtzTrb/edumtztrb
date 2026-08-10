import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Product Record — commercial object/offer preview (§34.1). Commercially
 * material information (price, availability, family) always renders —
 * never hover-gated. No checkout/cart/purchase behavior, no
 * Product-specific accent color, no sale badges or crossed-out pricing —
 * this is a summary unit only; deeper evaluation happens at the Product
 * detail route.
 *
 * Interaction rule: only the title is the link, deliberately kept
 * separate from any future purchase/transaction control this record may
 * grow — so a later Action never has to nest inside (or compete with) the
 * record's own navigation link.
 */
interface ProductRecordProps {
  title: ReactNode;
  href: string;
  media?: ReactNode;
  family?: ReactNode;
  descriptor?: ReactNode;
  price?: ReactNode;
  availability?: ReactNode;
  edition?: ReactNode;
}

export function ProductRecord({
  title,
  href,
  media,
  family,
  descriptor,
  price,
  availability,
  edition,
}: ProductRecordProps) {
  const hasCommercial = price !== undefined || availability !== undefined || edition !== undefined;

  return (
    <article className="record-product">
      {media !== undefined && <div className="record-product-slot">{media}</div>}
      <div className="record-product-body">
        {family !== undefined && <p className="record-product-family type-metadata">{family}</p>}
        <h3 className="record-product-title type-h3">
          <Link href={href} className="record-product-link">
            {title}
          </Link>
        </h3>
        {descriptor !== undefined && (
          <p className="record-product-descriptor type-body-small">{descriptor}</p>
        )}
        {hasCommercial && (
          <p className="record-product-commercial type-label">
            {price !== undefined && <span className="record-product-price">{price}</span>}
            {availability !== undefined && (
              <span className="record-product-availability">{availability}</span>
            )}
            {edition !== undefined && <span className="record-product-edition">{edition}</span>}
          </p>
        )}
      </div>
    </article>
  );
}
