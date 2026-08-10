import type { Metadata } from "next";

import { DistrictNav } from "@/components/shell/DistrictNav";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsLayout({ children }: LayoutProps<"/products">) {
  return (
    <div data-district="products">
      <DistrictNav district="products" />
      {children}
    </div>
  );
}
