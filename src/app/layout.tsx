import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Serif_4, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { AppShell } from "@/components/shell/AppShell";

/**
 * Typography voices — DESIGN_SYSTEM.md v1.1 §7/§91 (see
 * docs/implementation/M2.2_TYPOGRAPHY.md for the calibration rationale).
 * Each loader outputs a CSS variable only; the final semantic tokens
 * (--font-display/--font-reading/--font-mono-functional) are composed in
 * src/styles/tokens/typography.css, alongside a generic fallback stack.
 * `display: "swap"` avoids invisible text while the font loads.
 */
const displayVoice = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-display-loaded",
  display: "swap",
});

const readingVoice = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-reading-loaded",
  display: "swap",
});

const monoFunctionalVoice = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-mono-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Personal Platform",
  description: "Personal Platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayVoice.variable} ${readingVoice.variable} ${monoFunctionalVoice.variable}`}
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
