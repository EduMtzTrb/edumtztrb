import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab",
};

export default function LabLayout({ children }: LayoutProps<"/lab">) {
  return <div data-district="lab">{children}</div>;
}
