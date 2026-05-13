"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Copy,
  Headphones,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Tab = "overview" | "support" | "services" | "settings";

const SERVICE_ITEMS = [
  { id: "managed", label: "Managed services & operations", desc: "Tickets, SLAs, and change windows" },
  { id: "datacenters", label: "Data centers & cloud", desc: "Capacity, interconnect, and resilience" },
  { id: "cyber", label: "Cybersecurity", desc: "SOC alerts, assessments, and incident response" },
  { id: "industrial", label: "Industrial & OT", desc: "Automation health and integration" },
  { id: "ai", label: "AI & analytics", desc: "Model ops, data pipelines, and governance" },
  { id: "smart", label: "Smart infrastructure", desc: "IoT, networks, and field services" },
] as const;

type Prefs = Record<string, { emailDigest: boolean; priorityAlerts: boolean }>;

const defaultPrefs = (): Prefs =>
  Object.fromEntries(
    SERVICE_ITEMS.map((s) => [s.id, { emailDigest: true, priorityAlerts: false }])
  ) as Prefs;

function loadPrefs(email: string): Prefs {
  if (typeof window === "undefined") return defaultPrefs();
  try {
    const raw = localStorage.getItem(`lumeron_portal_prefs_${email}`);
    if (!raw) return defaultPrefs();
    const parsed = JSON.parse(raw) as Prefs;
    const base = defaultPrefs();
    for (const id of Object.keys(base)) {
      if (parsed[id]) {
        base[id] = {
          emailDigest: Boolean(parsed[id].emailDigest),
          priorityAlerts: Boolean(parsed[id].priorityAlerts),
        };
      }
    }
    return base;
  } catch {
    return defaultPrefs();
  }
}

function copyText(text: string, setFeedback: (s: string | null) => void) {
  void navigator.clipboard.writeText(text).then(
    () => {
      setFeedback("Copied to clipboard.");
      setTimeout(() => setFeedback(null), 2000);
    },
    () => setFeedback("Copy failed — select and copy manually.")
  );
}

function PortalIntegrationsGuide({
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
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf9] border border-[#3ec8ba]/30 text-[#229388]">
              <KeyRound className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">API configuration</h3>
              <p className="mt-1 text-sm text-slate-600 max-w-2xl">
                Reference values for your IT and integration teams. Production keys and webhook secrets are issued by
                Lumeron after onboarding — not shown in this demo portal.
              </p>
            </div>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Portal origin</dt>
            <dd className="mt-2 flex flex-wrap items-center gap-2">
              <code className="text-sm text-slate-800 break-all">{origin || "—"}</code>
              {origin ? (
                <button
                  type="button"
                  onClick={() => copyText(origin, setCopyFeedback)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 hover:border-[#229388]/40 hover:text-[#229388]"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>
              ) : null}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Public site API root</dt>
            <dd className="mt-2 flex flex-wrap items-center gap-2">
              <code className="text-sm text-slate-800 break-all">{apiRoot}</code>
              {origin ? (
                <button
                  type="button"
                  onClick={() => copyText(apiRoot, setCopyFeedback)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 hover:border-[#229388]/40 hover:text-[#229388]"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>
              ) : null}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tenant identifier</dt>
            <dd className="mt-2 text-sm text-slate-700">
              Use the signed-in portal email as the stable <code className="rounded bg-white px-1.5 py-0.5 text-xs border border-slate-200">client_email</code> in every event you send. Current user:{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-xs border border-slate-200">{userEmail}</code>
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Service line IDs (dashboard)</dt>
            <dd className="mt-2 text-sm text-slate-700 leading-relaxed">
              Map monitoring or CMDB groups to these IDs so the client dashboard can route notifications: {serviceIdsList}.
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf9] border border-[#3ec8ba]/30 text-[#229388]">
            <BookOpen className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">IT integration guide</h3>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              How to link your servers, observability stack, and service catalog to the Lumeron client experience.
            </p>
          </div>
        </div>

        <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <li>
            <strong className="text-slate-900">Choose an integration pattern.</strong>{" "}
            <em>Push:</em> your automation posts signed JSON to a Lumeron-provisioned HTTPS endpoint (recommended for
            real-time alerts). <em>Pull:</em> your SIEM or data plane calls read-only public endpoints where applicable
            and merges data into your internal CMDB; Lumeron can later subscribe to your outbound feed if required by the
            contract.
          </li>
          <li>
            <strong className="text-slate-900">Authenticate every request.</strong> Use{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">Authorization: Bearer &lt;LMN_API_KEY&gt;</code> for
            machine-to-machine calls. Rotate keys at least quarterly; store secrets in a vault (not in the portal).
          </li>
          <li>
            <strong className="text-slate-900">Sign webhook bodies.</strong> Compute{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">X-Lumeron-Signature</code> as HMAC-SHA256 over the raw
            request body using the signing secret Lumeron provides. Reject replays with a short server-side nonce or
            timestamp skew check (&lt; 5 minutes).
          </li>
          <li>
            <strong className="text-slate-900">Use idempotency.</strong> Send{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">X-Lumeron-Idempotency-Key</code> (UUID) so duplicate
            deliveries from load balancers do not create duplicate incidents in downstream systems.
          </li>
          <li>
            <strong className="text-slate-900">Model events for the dashboard.</strong> Include{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">service_id</code> from the list above, a{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">severity</code> (<code className="text-xs">info</code>,{" "}
            <code className="text-xs">warning</code>, <code className="text-xs">critical</code>), and a{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">resource</code> (host, cluster, circuit ID) for traceability.
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
            returns <code className="rounded bg-slate-100 px-1 text-xs">LMN_API_KEY</code>, signing secret, and the
            final ingest URL — then replace the placeholder host in the example below.
          </li>
        </ol>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Example event payload</p>
          <pre className="text-xs leading-relaxed overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 text-slate-100 p-4">
            {examplePayload}
          </pre>
          <button
            type="button"
            onClick={() => copyText(examplePayload, setCopyFeedback)}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#229388] hover:underline"
          >
            <Copy className="h-4 w-4" />
            Copy JSON
          </button>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Example curl (template)</p>
          <pre className="text-xs leading-relaxed overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 text-slate-100 p-4 whitespace-pre-wrap">
            {exampleCurl}
          </pre>
          <button
            type="button"
            onClick={() => copyText(exampleCurl, setCopyFeedback)}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#229388] hover:underline"
          >
            <Copy className="h-4 w-4" />
            Copy curl
          </button>
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-100 pt-4">
          This portal UI is a client-facing shell. Ingest endpoints and live dashboard tiles are enabled per contract.
          Coordinate schema changes (new <code className="text-[11px]">event</code> types or fields) with Lumeron before
          promoting to production traffic.
        </p>
      </div>

      {copyFeedback ? (
        <p className="text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-3">
          {copyFeedback}
        </p>
      ) : null}
    </div>
  );
}

function savePrefs(email: string, prefs: Prefs) {
  localStorage.setItem(`lumeron_portal_prefs_${email}`, JSON.stringify(prefs));
}

export function PortalApp() {
  const [user, setUser] = useState<string | null | undefined>(undefined);
  const [tab, setTab] = useState<Tab>("overview");
  const [emailInput, setEmailInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs());
  const [origin, setOrigin] = useState("");
  const [settingsView, setSettingsView] = useState<"profile" | "integrations">("profile");

  const refreshSession = useCallback(async () => {
    const r = await fetch("/api/portal/session", { credentials: "include" });
    const j = (await r.json()) as { user: string | null };
    setUser(j.user ?? null);
    if (j.user) setPrefs(loadPrefs(j.user));
  }, []);

  useEffect(() => {
    setOrigin(typeof window !== "undefined" ? window.location.origin : "");
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const logout = async () => {
    await fetch("/api/portal/logout", { method: "POST", credentials: "include" });
    setUser(null);
    setStep("email");
    setCodeInput("");
    setTab("overview");
    setSettingsView("profile");
  };

  const sendCode = async () => {
    setError(null);
    setNotice(null);
    setLoading(true);
    try {
      const r = await fetch("/api/portal/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: emailInput }),
      });
      const j = (await r.json()) as { error?: string; demoOnly?: boolean; message?: string };
      if (!r.ok) {
        setError(j.error || "Could not send code.");
        return;
      }
      if (j.demoOnly && j.message) setNotice(j.message);
      setStep("code");
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setError(null);
    setLoading(true);
    try {
      const r = await fetch("/api/portal/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: emailInput, code: codeInput }),
      });
      const j = (await r.json()) as { error?: string; email?: string };
      if (!r.ok) {
        setError(j.error || "Sign-in failed.");
        return;
      }
      await refreshSession();
    } finally {
      setLoading(false);
    }
  };

  const updatePref = (id: string, key: "emailDigest" | "priorityAlerts", value: boolean) => {
    if (!user) return;
    setPrefs((prev) => {
      const next = {
        ...prev,
        [id]: { ...prev[id], [key]: value },
      };
      savePrefs(user, next);
      return next;
    });
  };

  const nav = useMemo(
    () =>
      [
        { id: "overview" as const, label: "Dashboard", icon: LayoutDashboard },
        { id: "support" as const, label: "Support", icon: Headphones },
        { id: "services" as const, label: "Services", icon: Settings2 },
        { id: "settings" as const, label: "Settings", icon: ShieldCheck },
      ] as const,
    []
  );

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="h-10 w-10 rounded-full border-2 border-[#229388] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0fdf9] via-white to-[#f8fafc]">
        <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight text-[#0f172a]">
              Lumeron
            </Link>
            <span className="text-xs font-medium uppercase tracking-wider text-[#64748b]">Client portal</span>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-white/90 shadow-xl shadow-slate-200/50 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#3ec8ba] to-[#229388] text-white shadow-md shadow-[#229388]/25">
                <Sparkles className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Sign in</h1>
                <p className="text-sm text-slate-500">Passwordless — we email you a one-time code.</p>
              </div>
            </div>

            {step === "email" ? (
              <div className="mt-8 space-y-4">
                <label className="block text-sm font-medium text-slate-700">Work email</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-[15px] text-slate-900 outline-none ring-[#229388]/30 focus:border-[#229388] focus:ring-2"
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => void sendCode()}
                  className="w-full rounded-xl bg-[#229388] py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-[#229388]/30 transition hover:bg-[#1a7a70] disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Email me a code"}
                </button>
                <p className="text-xs text-slate-500 leading-relaxed pt-2">
                  Demo: you can use code <span className="font-mono font-semibold text-[#229388]">123456</span> after
                  entering your email. Turn off demo in production with{" "}
                  <span className="font-mono">PORTAL_DISABLE_DEMO_OTP=true</span> in Cloudflare.
                </p>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                {notice && (
                  <p className="text-sm text-emerald-900 bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-3 leading-relaxed">
                    {notice}
                  </p>
                )}
                <p className="text-sm text-slate-600">
                  We sent a code to <span className="font-medium text-slate-900">{emailInput}</span>
                </p>
                <label className="block text-sm font-medium text-slate-700">One-time code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  placeholder="123456"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-lg tracking-widest font-mono text-slate-900 outline-none ring-[#229388]/30 focus:border-[#229388] focus:ring-2"
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => void verify()}
                  className="w-full rounded-xl bg-[#229388] py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-[#229388]/30 transition hover:bg-[#1a7a70] disabled:opacity-60"
                >
                  {loading ? "Signing in…" : "Verify & continue"}
                </button>
                <button
                  type="button"
                  className="w-full text-sm text-[#229388] font-medium hover:underline"
                  onClick={() => {
                    setStep("email");
                    setError(null);
                    setNotice(null);
                    setCodeInput("");
                  }}
                >
                  Use a different email
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="shrink-0 text-base font-semibold tracking-tight text-[#0f172a]">
              Lumeron
            </Link>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline truncate text-sm text-slate-500">Client portal</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline max-w-[220px] truncate text-sm text-slate-600" title={user}>
              <Mail className="inline h-4 w-4 mr-1 text-slate-400 align-text-bottom" />
              {user}
            </span>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-[#229388]/40 hover:text-[#229388]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full max-w-[1440px] mx-auto">
        <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-slate-200/90 bg-white/60 p-4 gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-[#e6faf7] to-transparent text-[#0f766e]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#229388]" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="md:hidden flex gap-1 overflow-x-auto border-b border-slate-200/90 bg-white/80 px-3 py-2">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                    active ? "bg-[#229388] text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <main className="flex-1 p-4 sm:p-8 lg:p-10">
            {tab === "overview" && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Dashboard</h2>
                  <p className="mt-1 text-slate-600">Overview of your engagement with Lumeron.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { label: "Support response", value: "< 4h", sub: "Business hours target" },
                    { label: "Platform health", value: "Operational", sub: "All monitored regions" },
                    { label: "Open requests", value: "0", sub: "No tickets in queue" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-100"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{card.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
                      <p className="mt-1 text-sm text-slate-500">{card.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-[#f0fdf9] p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-slate-900">Welcome back</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-2xl">
                    This portal is your home for service updates, notification preferences, and support. For urgent
                    incidents, use the Support tab or email your account team. Demo metrics shown here can be replaced
                    with live data from your CRM or ITSM integration.
                  </p>
                </div>
              </div>
            )}

            {tab === "support" && (
              <div className="space-y-8 max-w-3xl">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Support</h2>
                  <p className="mt-1 text-slate-600">Channels and response expectations.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href="mailto:info@lumeron.sa"
                    className="group rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-[#3ec8ba]/50 hover:shadow-md"
                  >
                    <Headphones className="h-8 w-8 text-[#229388]" />
                    <h3 className="mt-4 font-semibold text-slate-900">Client success</h3>
                    <p className="mt-2 text-sm text-slate-600">info@lumeron.sa</p>
                    <p className="mt-3 text-sm font-medium text-[#229388] group-hover:underline">Email us</p>
                  </a>
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                    <ShieldCheck className="h-8 w-8 text-[#229388]" />
                    <h3 className="mt-4 font-semibold text-slate-900">Security & incidents</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      For suspected incidents, contact your CSM or use the escalation path in your statement of work.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6">
                  <p className="text-sm font-medium text-slate-700">Ticket integration (placeholder)</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Connect Jira Service Management, Freshdesk, or your ITSM here in a future release. For now, email is
                    the primary intake for this demo portal.
                  </p>
                </div>
              </div>
            )}

            {tab === "services" && (
              <div className="space-y-8 max-w-3xl">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Service notifications</h2>
                  <p className="mt-1 text-slate-600">
                    Choose how we reach you per service line. Preferences are stored in this browser only (demo).
                  </p>
                </div>
                <div className="space-y-3">
                  {SERVICE_ITEMS.map((s) => (
                    <div
                      key={s.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{s.label}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{s.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 shrink-0">
                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-[#229388] focus:ring-[#229388]"
                            checked={prefs[s.id]?.emailDigest ?? true}
                            onChange={(e) => updatePref(s.id, "emailDigest", e.target.checked)}
                          />
                          Digest email
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-[#229388] focus:ring-[#229388]"
                            checked={prefs[s.id]?.priorityAlerts ?? false}
                            onChange={(e) => updatePref(s.id, "priorityAlerts", e.target.checked)}
                          />
                          Priority alerts
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "settings" && user && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h2>
                  <p className="mt-1 text-slate-600">Account and IT integration reference.</p>
                </div>

                <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 w-fit">
                  <button
                    type="button"
                    onClick={() => setSettingsView("profile")}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      settingsView === "profile"
                        ? "bg-white text-[#0f766e] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettingsView("integrations")}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      settingsView === "integrations"
                        ? "bg-white text-[#0f766e] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    API & IT guide
                  </button>
                </div>

                {settingsView === "profile" ? (
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-4 max-w-xl">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</p>
                      <p className="mt-1 text-slate-900 font-medium">{user}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Session</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Expires after 14 days of inactivity. Sign out on shared devices.
                      </p>
                    </div>
                    <Link
                      href="/privacy"
                      className="inline-block text-sm font-medium text-[#229388] hover:underline"
                    >
                      Privacy policy
                    </Link>
                  </div>
                ) : (
                  <PortalIntegrationsGuide userEmail={user} origin={origin} />
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
