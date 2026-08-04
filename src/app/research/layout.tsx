import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchLayout({ children }: LayoutProps<"/research">) {
  return <div data-district="research">{children}</div>;
}
