"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DISTRICTS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "Lab", href: "/lab" },
  { label: "Art", href: "/art" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
] as const;

const UTILITIES = [
  { label: "Search", href: "/search" },
  { label: "Index", href: "/index" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * "page": this link's href is literally the current page (ARIA: current document).
 * "true": the current page lives inside this link's section, but isn't this exact
 * page — no more specific aria-current token applies (ARIA 1.2 §6.9).
 */
function currentState(pathname: string, href: string): "page" | "true" | undefined {
  if (pathname === href) return "page";
  if (href !== "/" && pathname.startsWith(`${href}/`)) return "true";
  return undefined;
}

export function GlobalNav() {
  const pathname = usePathname();

  return (
    <>
      <nav aria-label="Primary">
        <ul className="global-nav-list">
          {DISTRICTS.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} aria-current={currentState(pathname, href)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Utilities">
        <ul className="global-utilities-list">
          {UTILITIES.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} aria-current={currentState(pathname, href)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
