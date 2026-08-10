import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
  return <div data-utility="contact">{children}</div>;
}
