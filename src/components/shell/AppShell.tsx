import type { ReactNode } from "react";

import { GlobalNav } from "./GlobalNav";
import { WorldTrace } from "@/components/threshold/WorldTrace";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="global-header">
        <GlobalNav />
      </header>
      {/* M4.9 calibration — a persistent structural trace, never unmounted
          across navigation; see src/components/threshold/WorldTrace.tsx
          for the full "why AppShell" reasoning. */}
      <WorldTrace />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
    </>
  );
}
