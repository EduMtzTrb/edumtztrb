import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art",
};

export default function ArtLayout({ children }: LayoutProps<"/art">) {
  return <div data-district="art">{children}</div>;
}
