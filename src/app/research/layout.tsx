import type { Metadata } from "next";

import { DistrictNav } from "@/components/shell/DistrictNav";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchLayout({ children }: LayoutProps<"/research">) {
  return (
    <div data-district="research">
      <DistrictNav district="research" />
      {children}
    </div>
  );
}
