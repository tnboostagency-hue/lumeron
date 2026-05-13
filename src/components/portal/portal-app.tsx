"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  Copy,
  FileText,
  KeyRound,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  ShoppingCart,
  Ticket,
} from "lucide-react";

const SERVICE_ITEMS = [
  { id: "managed", label: "Managed services & operations", desc: "Tickets, SLAs, and change windows" },
  { id: "datacenters", label: "Data centers & cloud", desc: "Capacity, interconnect, and resilience" },
  { id: "cyber", label: "Cybersecurity", desc: "SOC alerts, assessments, and incident response" },
  { id: "industrial", label: "Industrial & OT", desc: "Automation health and integration" },
  { id: "ai", label: "AI & analytics", desc: "Model ops, data pipelines, and governance" },
  { id: "smart", label: "Smart infrastructure", desc: "IoT, networks, and field services" },
] as const;

function copyText(text: string, setFeedback: (s: string | null) => void) {
  void navigator.clipboard.writeText(text).then(
    () => {
      setFeedback("Copied to clipboard.");
      setTimeout(() => setFeedback(null), 2000);
    },
    () => setFeedback("Copy failed — select and copy manually.")
  );
}

export function PortalIntegrationsGuide({
  userEmail,
  origin,
}: {
  userEmail: string;
  origin: string;
}) {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const apiRoot = origin ? `${origin}/api` : "/api";
  const examplePayload = `{
  "event": "service.health",
  "client_email": "${userEmail}",
  "service_id": "managed",
  "severity": "info",
  "resource": "dc-cluster-01",
  "message": "CPU below threshold after maintenance",
  "timestamp": "${new Date().toISOString()}"
}`;

  const curlJsonLine = JSON.stringify({
    event: "service.health",
    client_email: userEmail,
    service_id: "managed",
    severity: "info",
    resource: "dc-cluster-01",
    message: "CPU below threshold after maintenance",
    timestamp: new Date().toISOString(),
  });

  const exampleCurl = [
    "# Example — call YOUR integration worker or Lumeron-provisioned ingest (when enabled).",
    "# Replace placeholders. Lumeron issues LMN_API_KEY and signing secret per SOW.",
    "",
    `curl -sS -X POST "https://integrations.lumeron.sa/v1/client-events" \\`,
    `  -H "Authorization: Bearer <LMN_API_KEY>" \\`,
    `  -H "Content-Type: application/json" \\`,
    `  -H "X-Lumeron-Idempotency-Key: $(uuidgen)" \\`,
    `  -H "X-Lumeron-Signature: <HMAC_SHA256_OF_RAW_BODY_WITH_SIGNING_SECRET>" \\`,
    `  -d '${curlJsonLine.replace(/'/g, "'\\''")}'`,
  ].join("\n");

  const serviceIdsList = SERVICE_ITEMS.map((s) => `"${s.id}"`).join(", ");

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3ec8ba]/15 border border-[#3ec8ba]/35 text-[#229388]">
              <KeyRound className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">API configuration</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-2xl">
                Reference values for your IT and integration teams. Production keys and webhook secrets are issued by
                Lumeron after onboarding — not shown in this demo portal.
              </p>
            </div>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/90 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Portal origin</dt>
            <dd className="mt-2 flex flex-wrap items-center gap-2">
              <code className="text-sm text-slate-900 break-all">{origin || "—"}</code>
              {origin ? (
                <button
                  type="button"
                  onClick={() => copyText(origin, setCopyFeedback)}
                  className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1 rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-xs font-medium text-slate-600 touch-manipulation hover:border-[#3ec8ba]/50 hover:text-[#229388] active:scale-[0.98]"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>
              ) : null}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/90 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Public site API root</dt>
            <dd className="mt-2 flex flex-wrap items-center gap-2">
              <code className="text-sm text-slate-900 break-all">{apiRoot}</code>
              {origin ? (
                <button
                  type="button"
                  onClick={() => copyText(apiRoot, setCopyFeedback)}
                  className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1 rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-xs font-medium text-slate-600 touch-manipulation hover:border-[#3ec8ba]/50 hover:text-[#229388] active:scale-[0.98]"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>
              ) : null}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/90 p-4 sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tenant identifier</dt>
            <dd className="mt-2 text-sm text-slate-600">
              Use the signed-in portal email as the stable <code className="rounded bg-white px-1.5 py-0.5 text-xs border border-slate-200/90 text-slate-900">client_email</code> in every event you send. Current user:{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-xs border border-slate-200/90 text-[#229388]">{userEmail}</code>
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/90 p-4 sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Service line IDs (dashboard)</dt>
            <dd className="mt-2 text-sm text-slate-600 leading-relaxed">
              Map monitoring or CMDB groups to these IDs so the client dashboard can route notifications: {serviceIdsList}.
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-6 sm:p-8 space-y-6">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3ec8ba]/15 border border-[#3ec8ba]/35 text-[#229388]">
            <BookOpen className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">IT integration guide</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-2xl">
              How to link your servers, observability stack, and service catalog to the Lumeron client experience.
            </p>
          </div>
        </div>

        <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 leading-relaxed">
          <li>
            <strong className="text-slate-900">Choose an integration pattern.</strong>{" "}
            <em>Push:</em> your automation posts signed JSON to a Lumeron-provisioned HTTPS endpoint (recommended for
            real-time alerts). <em>Pull:</em> your SIEM or data plane calls read-only public endpoints where applicable
            and merges data into your internal CMDB; Lumeron can later subscribe to your outbound feed if required by the
            contract.
          </li>
          <li>
            <strong className="text-slate-900">Authenticate every request.</strong> Use{" "}
            <code className="rounded bg-slate-100 px-1 text-xs text-[#229388]">Authorization: Bearer &lt;LMN_API_KEY&gt;</code> for
            machine-to-machine calls. Rotate keys at least quarterly; store secrets in a vault (not in the portal).
          </li>
          <li>
            <strong className="text-slate-900">Sign webhook bodies.</strong> Compute{" "}
            <code className="rounded bg-slate-100 px-1 text-xs text-slate-900">X-Lumeron-Signature</code> as HMAC-SHA256 over the raw
            request body using the signing secret Lumeron provides. Reject replays with a short server-side nonce or
            timestamp skew check (&lt; 5 minutes).
          </li>
          <li>
            <strong className="text-slate-900">Use idempotency.</strong> Send{" "}
            <code className="rounded bg-slate-100 px-1 text-xs text-slate-900">X-Lumeron-Idempotency-Key</code> (UUID) so duplicate
            deliveries from load balancers do not create duplicate incidents in downstream systems.
          </li>
          <li>
            <strong className="text-slate-900">Model events for the dashboard.</strong> Include{" "}
            <code className="rounded bg-slate-100 px-1 text-xs text-slate-900">service_id</code> from the list above, a{" "}
            <code className="rounded bg-slate-100 px-1 text-xs text-slate-900">severity</code> (<code className="text-xs">info</code>,{" "}
            <code className="text-xs">warning</code>, <code className="text-xs">critical</code>), and a{" "}
            <code className="rounded bg-slate-100 px-1 text-xs text-slate-900">resource</code> (host, cluster, circuit ID) for traceability.
          </li>
          <li>
            <strong className="text-slate-900">Network egress.</strong> Prefer TLS 1.2+, restrict outbound from your
            integration workers to Lumeron IPs once your CSM shares the allowlist. For inbound from Lumeron to your
            APIs, publish a dedicated integration URL with mutual TLS or IP allowlisting as agreed in the SOW.
          </li>
          <li>
            <strong className="text-slate-900">Provision credentials.</strong> Email{" "}
            <a href="mailto:info@lumeron.sa" className="font-medium text-[#229388] hover:underline">
              info@lumeron.sa
            </a>{" "}
            with your company name, primary technical contact, and desired environments (production / staging). Lumeron
            returns <code className="rounded bg-slate-100 px-1 text-xs text-slate-900">LMN_API_KEY</code>, signing secret, and the
            final ingest URL — then replace the placeholder host in the example below.
          </li>
        </ol>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Example event payload</p>
          <pre className="text-xs leading-relaxed overflow-x-auto rounded-xl border border-slate-200/90 bg-slate-50 text-slate-900 p-4">
            {examplePayload}
          </pre>
          <button
            type="button"
            onClick={() => copyText(examplePayload, setCopyFeedback)}
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-[#229388] touch-manipulation hover:bg-teal-50 hover:underline active:scale-[0.98]"
          >
            <Copy className="h-4 w-4" />
            Copy JSON
          </button>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Example curl (template)</p>
          <pre className="text-xs leading-relaxed overflow-x-auto rounded-xl border border-slate-200/90 bg-slate-50 text-slate-900 p-4 whitespace-pre-wrap">
            {exampleCurl}
          </pre>
          <button
            type="button"
            onClick={() => copyText(exampleCurl, setCopyFeedback)}
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-[#229388] touch-manipulation hover:bg-teal-50 hover:underline active:scale-[0.98]"
          >
            <Copy className="h-4 w-4" />
            Copy curl
          </button>
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-200/90 pt-4">
          This portal UI is a client-facing shell. Ingest endpoints and live dashboard tiles are enabled per contract.
          Coordinate schema changes (new <code className="text-[11px]">event</code> types or fields) with Lumeron before
          promoting to production traffic.
        </p>
      </div>

      {copyFeedback ? (
        <p className="text-sm font-medium text-[#229388] bg-[#3ec8ba]/10 border border-[#3ec8ba]/30 rounded-xl px-4 py-3">
          {copyFeedback}
        </p>
      ) : null}
    </div>
  );
}

const PortalUserContext = createContext<string | null>(null);

export function usePortalUser(): string {
  const v = useContext(PortalUserContext);
  if (v == null) throw new Error("usePortalUser must be used within PortalDashboardLayout");
  return v;
}

const portalNav = [
  { href: "/portal/dashboard", label: "Dashboard", short: "Home", icon: LayoutDashboard },
  { href: "/portal/tickets", label: "Tickets", short: "Tickets", icon: Ticket },
  { href: "/portal/services", label: "Services", short: "Services", icon: Layers },
  { href: "/portal/sla", label: "SLA", short: "SLA", icon: BarChart3 },
  { href: "/portal/reports", label: "Reports", short: "Reports", icon: FileText },
  { href: "/portal/requests", label: "Requests", short: "Request", icon: ShoppingCart },
  { href: "/portal/settings", label: "Settings", short: "Account", icon: Settings },
] as const;

export function PortalDashboardLayout({ userEmail, children }: { userEmail: string; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/portal/logout", { method: "POST", credentials: "include" });
    router.push("/portal/login");
  };

  return (
    <PortalUserContext.Provider value={userEmail}>
      <div className="flex min-h-dvh flex-col bg-gradient-to-b from-white via-[#f4fbfb] to-[#eef8f6] text-slate-900">
        <header
          className="sticky top-0 z-20 border-b border-slate-200/80 pt-[env(safe-area-inset-top)] shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 45%, rgba(240,253,252,0.6) 100%)",
            WebkitBackdropFilter: "blur(40px) saturate(1.6)",
            backdropFilter: "blur(40px) saturate(1.6)",
          }}
        >
          <div className="mx-auto flex min-h-[3.25rem] max-w-[1440px] items-center justify-between gap-2 px-4 py-2.5 sm:gap-4 sm:px-8 sm:py-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <Link
                href="/"
                className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-90 sm:min-h-0 sm:min-w-0 sm:justify-start"
              >
                <Image src="/lumeron-logo.svg" alt="Lumeron" width={120} height={32} className="h-7 w-auto" />
              </Link>
              <span className="hidden text-slate-300 sm:inline">|</span>
              <span className="hidden truncate text-sm text-slate-500 sm:inline">Client portal</span>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span
                className="hidden max-w-[min(220px,28vw)] truncate text-sm text-slate-600 md:inline"
                title={userEmail}
              >
                <Mail className="mr-1 inline h-4 w-4 align-text-bottom text-slate-400" />
                {userEmail}
              </span>
              <button
                type="button"
                onClick={() => void logout()}
                className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white/80 px-3 text-sm font-medium text-slate-700 shadow-sm transition active:scale-[0.98] hover:border-[#3ec8ba]/50 hover:text-[#229388] sm:min-h-0 sm:min-w-0 sm:bg-white/70 sm:px-3 sm:py-2"
              >
                <LogOut className="h-5 w-5 sm:h-4 sm:w-4" aria-hidden />
                <span className="sr-only sm:not-sr-only">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col md:flex-row">
          <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-slate-200/80 bg-white/50 p-4 backdrop-blur-sm md:flex">
            {portalNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    active
                      ? "bg-gradient-to-r from-[#229388]/15 to-transparent text-[#229388]"
                      : "text-slate-600 hover:bg-teal-50/60 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#229388]" : "text-slate-400"}`} />
                  {item.label}
                </Link>
              );
            })}
          </aside>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <main className="flex-1 overflow-y-auto overscroll-y-contain px-4 pb-[max(5.5rem,calc(4.75rem+env(safe-area-inset-bottom,0px)))] pt-4 sm:px-6 sm:pt-5 md:pb-8 lg:px-10 lg:pt-8">
              {children}
            </main>
          </div>
        </div>

        {/* Mobile app-style bottom tab bar */}
        <nav
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200/90 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl md:hidden"
          aria-label="Portal"
        >
          <div className="mx-auto flex w-full items-stretch justify-between gap-0.5 px-1 pt-1">
            {portalNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  className={`flex min-h-[52px] min-w-0 flex-1 touch-manipulation flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 py-1 transition active:scale-[0.96] ${
                    active ? "text-[#229388]" : "text-slate-500"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                      active ? "bg-[#229388]/12 ring-1 ring-[#229388]/25" : ""
                    }`}
                  >
                    <Icon className={`h-[22px] w-[22px] shrink-0 ${active ? "opacity-100" : "opacity-80"}`} strokeWidth={active ? 2.2 : 1.7} />
                  </span>
                  <span className="max-w-full truncate px-0.5 text-center text-[10px] font-semibold leading-none tracking-tight">
                    {item.short}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </PortalUserContext.Provider>
  );
}
