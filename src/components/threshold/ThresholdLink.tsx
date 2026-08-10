"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { markThresholdDeparture } from "@/lib/threshold/familiarity";

/**
 * ThresholdLink — M4.9. A real `next/link` that marks genuine departure
 * intent before navigating, exactly the same synchronous-capture-before-
 * navigation discipline M4.8's `PassageIndexRecord` already established —
 * never delaying or gating the actual navigation.
 */
interface ThresholdLinkProps {
  href: string;
  arrivalKey: string;
  children: ReactNode;
}

export function ThresholdLink({ href, arrivalKey, children }: ThresholdLinkProps) {
  return (
    <Link href={href} onClick={() => markThresholdDeparture(arrivalKey)}>
      {children}
    </Link>
  );
}
