import type { Metadata } from "next";

import { DistrictNav } from "@/components/shell/DistrictNav";

export const metadata: Metadata = {
  title: "Lab",
};

export default function LabLayout({ children }: LayoutProps<"/lab">) {
  return (
    <div data-district="lab">
      <DistrictNav district="lab" />
      {children}
    </div>
  );
}
