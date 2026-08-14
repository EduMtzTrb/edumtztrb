import type { Metadata } from "next";

import { DistrictShell } from "@/components/shell/DistrictShell";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchLayout({ children }: LayoutProps<"/research">) {
  return <DistrictShell district="research">{children}</DistrictShell>;
}
