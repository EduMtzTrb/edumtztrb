import type { Metadata } from "next";

import { DistrictShell } from "@/components/shell/DistrictShell";

export const metadata: Metadata = {
  title: "Art",
};

export default function ArtLayout({ children }: LayoutProps<"/art">) {
  return <DistrictShell district="art">{children}</DistrictShell>;
}
