import Link from "next/link";

import type { BreadcrumbItem } from "./orientation";

/**
 * Semantic breadcrumb — M3.9. A plain Server Component (no client state):
 * `<nav aria-label="Breadcrumb">` wrapping an ordered list (this task's own
 * §C2). Every non-current item is a real canonical/approved-route link
 * (`next/link`); the current item renders as plain text with
 * `aria-current="page"`, never a self-referential link.
 */
export function Breadcrumb({ trail }: { trail: readonly BreadcrumbItem[] }) {
  if (trail.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {trail.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current={item.current ? "page" : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
