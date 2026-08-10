import type { Metadata } from "next";

import { DistrictNav } from "@/components/shell/DistrictNav";

export const metadata: Metadata = {
  title: "Art",
};

export default function ArtLayout({ children }: LayoutProps<"/art">) {
  return (
    <div data-district="art">
      <DistrictNav district="art" />
      {children}
    </div>
  );
}
