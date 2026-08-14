import type { Metadata } from "next";

import { DistrictShell } from "@/components/shell/DistrictShell";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsLayout({ children }: LayoutProps<"/products">) {
  return <DistrictShell district="products">{children}</DistrictShell>;
}
