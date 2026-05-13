"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Headphones,
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

  const refreshSession = useCallback(async () => {
    const r = await fetch("/api/portal/session", { credentials: "include" });
    const j = (await r.json()) as { user: string | null };
    setUser(j.user ?? null);
    if (j.user) setPrefs(loadPrefs(j.user));
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
        { id: "settings" as const, label: "Account", icon: ShieldCheck },
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

            {tab === "settings" && (
              <div className="space-y-8 max-w-xl">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Account</h2>
                  <p className="mt-1 text-slate-600">Signed in with passwordless email.</p>
                </div>
                <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</p>
                    <p className="mt-1 text-slate-900 font-medium">{user}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Session</p>
                    <p className="mt-1 text-sm text-slate-600">Expires after 14 days of inactivity. Sign out on shared devices.</p>
                  </div>
                  <Link
                    href="/privacy"
                    className="inline-block text-sm font-medium text-[#229388] hover:underline"
                  >
                    Privacy policy
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
