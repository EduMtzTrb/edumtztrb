import type { Metadata } from "next";

import { DistrictNav } from "@/components/shell/DistrictNav";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return (
    <div data-district="about">
      <DistrictNav district="about" />
      {children}
    </div>
  );
}
