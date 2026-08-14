import type { Metadata } from "next";

import { DistrictShell } from "@/components/shell/DistrictShell";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkLayout({ children }: LayoutProps<"/work">) {
  return <DistrictShell district="work">{children}</DistrictShell>;
}
