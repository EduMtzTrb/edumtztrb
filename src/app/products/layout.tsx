import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsLayout({ children }: LayoutProps<"/products">) {
  return <div data-district="products">{children}</div>;
}
