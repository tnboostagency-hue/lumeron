import type { ReactNode } from "react";
import type { Viewport } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PortalDashboardLayout } from "@/components/portal/portal-app";
import { PORTAL_SESSION_COOKIE, verifyPortalSessionToken } from "@/lib/portal-session";

/** PWA-style safe areas + theme tint behind status bar on notched devices */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f0fdfc",
};

export default async function PortalAppSectionLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  const email = verifyPortalSessionToken(token);
  if (!email) redirect("/portal/login");
  return <PortalDashboardLayout userEmail={email}>{children}</PortalDashboardLayout>;
}
