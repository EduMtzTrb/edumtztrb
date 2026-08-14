import type { Metadata } from "next";

import { DistrictShell } from "@/components/shell/DistrictShell";

export const metadata: Metadata = {
  title: "Lab",
};

export default function LabLayout({ children }: LayoutProps<"/lab">) {
  return <DistrictShell district="lab">{children}</DistrictShell>;
}
