import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PortalLoginClient } from "@/components/portal/portal-login-client";
import { PORTAL_SESSION_COOKIE, verifyPortalSessionToken } from "@/lib/portal-session";

export default async function PortalLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  if (verifyPortalSessionToken(token)) redirect("/portal/dashboard");
  return <PortalLoginClient />;
}
