import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index",
};

export default function IndexLayout({ children }: LayoutProps<"/index">) {
  return <div data-utility="index">{children}</div>;
}
