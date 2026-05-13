import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal | Lumeron",
  description: "Lumeron client portal — support, service preferences, and account settings.",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div dir="ltr" lang="en">{children}</div>;
}
