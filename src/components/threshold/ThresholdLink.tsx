"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { markThresholdDeparture } from "@/lib/threshold/familiarity";

/**
 * ThresholdLink — M4.9. A real `next/link` that marks genuine departure
 * intent before navigating, exactly the same synchronous-capture-before-
 * navigation discipline M4.8's `PassageIndexRecord` already established —
 * never delaying or gating the actual navigation.
 *
 * `className` is additive (M5.1) — the M4.9 contract (href, arrivalKey,
 * children, click behavior) is otherwise unchanged; every prior caller
 * omitted it and renders identically. Added so a `ThresholdLink` can share
 * the same approved `.link`/`.type-label` control language (M2.5
 * `ActionLink`) as an ordinary route link, e.g. Home's district-threshold
 * list, without a visual seam between the one district with reciprocal
 * threshold wiring and the others that use a plain link.
 */
interface ThresholdLinkProps {
  href: string;
  arrivalKey: string;
  children: ReactNode;
  className?: string;
}

export function ThresholdLink({ href, arrivalKey, children, className }: ThresholdLinkProps) {
  return (
    <Link href={href} className={className} onClick={() => markThresholdDeparture(arrivalKey)}>
      {children}
    </Link>
  );
}
