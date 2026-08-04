import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkLayout({ children }: LayoutProps<"/work">) {
  return <div data-district="work">{children}</div>;
}
