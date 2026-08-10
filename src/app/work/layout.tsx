import type { Metadata } from "next";

import { DistrictNav } from "@/components/shell/DistrictNav";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkLayout({ children }: LayoutProps<"/work">) {
  return (
    <div data-district="work">
      <DistrictNav district="work" />
      {children}
    </div>
  );
}
