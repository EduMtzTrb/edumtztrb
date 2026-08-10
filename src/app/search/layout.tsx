import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchLayout({ children }: LayoutProps<"/search">) {
  return <div data-utility="search">{children}</div>;
}
