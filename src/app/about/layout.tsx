import type { Metadata } from "next";

import { DistrictShell } from "@/components/shell/DistrictShell";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return <DistrictShell district="about">{children}</DistrictShell>;
}
