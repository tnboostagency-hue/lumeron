"use client";

import { useRouter } from "next/navigation";
import { PortalLoginShell } from "@/components/portal/portal-login-shell";

export function PortalLoginClient() {
  const router = useRouter();
  return <PortalLoginShell onLoggedIn={() => router.push("/portal/dashboard")} />;
}
