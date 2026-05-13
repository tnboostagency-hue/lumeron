"use client";

import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowLeft, Plus, Search } from "lucide-react";
import {
  DEMO_ACTIVITY,
  DEMO_CLIENT,
  DEMO_REPORTS_RESOLUTION_H,
  DEMO_REPORTS_UPTIME_AREA,
  DEMO_REPORTS_VOLUME,
  DEMO_SLA_OVERALL,
  DEMO_SLA_ROWS,
  DEMO_SLA_TREND,
  DEMO_TICKETS,
  PILLARS,
  REQUEST_CATALOG,
  SUB_SERVICES_BY_PILLAR,
  contractedServices,
  dashboardKpis,
  formatAst,
  slaColorClass,
  type DemoTicket,
  type PillarId,
  type ServiceStatus,
} from "@/lib/portal-demo-data";
import { useClientPortalStore } from "@/stores/client-portal-store";
import { PortalIntegrationsGuide, usePortalUser } from "@/components/portal/portal-app";

const CHART_PRIMARY = "#3ec8ba";
const CHART_SECONDARY = "#39968d";
const MUTED = "#94a3b8";
const CHART_TOOLTIP: CSSProperties = {
  background: "#ffffff",
  border: "1px solid rgba(226, 232, 240, 0.95)",
  borderRadius: "12px",
  color: "#0f172a",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
};

function MiniSparkline({ data }: { data: number[] }) {
  const pts = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-10 w-[100px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={pts} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <Line type="monotone" dataKey="v" stroke={CHART_PRIMARY} strokeWidth={1.5} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function statusDot(status: ServiceStatus) {
  const map = {
    operational: "bg-[#229388] shadow-[0_0_0_3px_rgba(34,147,136,0.35)] animate-pulse",
    degraded: "bg-amber-500",
    incident: "bg-red-500",
    maintenance: "bg-[#39968d]",
  };
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${map[status]}`} title={status} />;
}

function statusLabel(status: ServiceStatus) {
  const labels: Record<ServiceStatus, string> = {
    operational: "Operational",
    degraded: "Degraded",
    incident: "Incident",
    maintenance: "Maintenance",
  };
  return labels[status];
}

export function PortalDashboardFull() {
  const email = usePortalUser();
  const kpis = dashboardKpis();
  const services = contractedServices();
  const hour = new Date().toLocaleString("en-GB", { timeZone: "Asia/Riyadh", hour: "numeric", hour12: false });
  const greet = Number(hour) < 12 ? "Good morning" : Number(hour) < 17 ? "Good afternoon" : "Good evening";
  const displayName = DEMO_CLIENT.email === email.toLowerCase() ? DEMO_CLIENT.name : email.split("@")[0];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 sm:space-y-8 lg:space-y-10">
      <div className="space-y-1 sm:space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">Dashboard</p>
        <h1 className="text-[1.375rem] font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
          {greet}, {displayName}
        </h1>
        <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
          {DEMO_CLIENT.company}
          <span className="text-slate-300"> · </span>
          <span className="text-[#229388]">Asia/Riyadh (AST)</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {[
          { label: "Open tickets", value: String(kpis.openTickets), sub: "Active in your queue" },
          { label: "SLA compliance (month)", value: `${kpis.slaPct}%`, sub: "Rolling composite", mono: true },
          { label: "Active services", value: String(kpis.activeServices), sub: "Contracted lines" },
          { label: "Critical alerts", value: String(kpis.criticalAlerts), sub: "Open critical priority" },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-5 sm:shadow-[0_8px_32px_rgba(34,147,136,0.07)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">{c.label}</p>
            <p className={`mt-1.5 text-[1.625rem] font-semibold tabular-nums leading-none text-slate-900 sm:mt-2 sm:text-2xl ${"mono" in c && c.mono ? "font-mono" : ""}`}>
              {c.value}
            </p>
            <p className="mt-1 text-xs leading-snug text-slate-500 sm:text-sm">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-6">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Service health</h2>
        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Contracted services — quick status</p>
        <div className="mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-4 sm:flex-wrap sm:overflow-x-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {services.map((s) => (
            <div
              key={s.id}
              className="flex min-w-[min(100%,17.5rem)] shrink-0 snap-start items-center gap-3 rounded-xl border border-slate-200/90 bg-slate-50/95 px-3 py-2.5 pr-4 sm:min-w-0 sm:shrink"
            >
              {statusDot(s.status)}
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight text-slate-900">{s.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {statusLabel(s.status)} · <span className="font-mono text-[#229388]">{s.uptime}%</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-6 lg:col-span-2">
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Recent activity</h2>
          <ul className="mt-3 space-y-3 sm:mt-4">
            {DEMO_ACTIVITY.map((a) => (
              <li
                key={a.at}
                className="flex flex-col gap-1 border-b border-slate-100 pb-3 text-sm last:border-0 last:pb-0 sm:flex-row sm:gap-3"
              >
                <span className="shrink-0 font-mono text-[11px] text-slate-500 sm:w-36 sm:text-xs">{formatAst(a.at)}</span>
                <span className="min-w-0 leading-snug text-slate-800">{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-6">
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Quick actions</h2>
          <div className="mt-3 flex flex-col gap-2 sm:mt-4">
            <Link
              href="/portal/tickets/new"
              className="flex min-h-12 touch-manipulation items-center rounded-xl border border-[#229388]/35 bg-[#229388]/10 px-4 py-3 text-sm font-semibold text-slate-900 transition active:scale-[0.99] hover:bg-[#229388]/18"
            >
              + New ticket
            </Link>
            <Link
              href="/portal/sla"
              className="flex min-h-12 touch-manipulation items-center rounded-xl border border-slate-200/90 px-4 py-3 text-sm font-medium text-slate-800 transition active:scale-[0.99] hover:border-[#3ec8ba]/50"
            >
              View SLA report
            </Link>
            <Link
              href="/portal/requests"
              className="flex min-h-12 touch-manipulation items-center rounded-xl border border-slate-200/90 px-4 py-3 text-sm font-medium text-slate-800 transition active:scale-[0.99] hover:border-[#3ec8ba]/50"
            >
              Request a service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const STATUS_OPTS: DemoTicket["status"][] = ["Open", "In Progress", "Pending Client", "Resolved", "Closed"];
const PRIORITY_OPTS: DemoTicket["priority"][] = ["Low", "Medium", "High", "Critical"];

export function PortalTicketsPanel() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [pillar, setPillar] = useState<string>("all");

  const rows = useMemo(() => {
    return DEMO_TICKETS.filter((t) => {
      if (q && !(`${t.id} ${t.subject}`.toLowerCase().includes(q.toLowerCase()))) return false;
      if (status !== "all" && t.status !== status) return false;
      if (priority !== "all" && t.priority !== priority) return false;
      if (pillar !== "all" && String(t.pillar) !== pillar) return false;
      return true;
    });
  }, [q, status, priority, pillar]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">Support tickets</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Tickets</h1>
        </div>
        <Link
          href="/portal/tickets/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#229388] to-[#39968d] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#229388]/20"
        >
          <Plus className="h-4 w-4" />
          New ticket
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search ID or subject…"
            className="w-full rounded-xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-[#3ec8ba]/60"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm px-3 py-2.5 text-sm text-slate-900"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm px-3 py-2.5 text-sm text-slate-900"
        >
          <option value="all">All priorities</option>
          {PRIORITY_OPTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={pillar}
          onChange={(e) => setPillar(e.target.value)}
          className="rounded-xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm px-3 py-2.5 text-sm text-slate-900"
        >
          <option value="all">All pillars</option>
          {[1, 2, 3, 4, 5].map((p) => (
            <option key={p} value={String(p)}>
              {PILLARS[p as PillarId].short} — {PILLARS[p as PillarId].title}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/90 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3 font-semibold">#ID</th>
              <th className="px-4 py-3 font-semibold">Subject</th>
              <th className="px-4 py-3 font-semibold">Service</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Created</th>
              <th className="px-4 py-3 font-semibold">Last update</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr
                key={t.id}
                className="border-b border-slate-100 hover:bg-teal-50/50 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-[#229388]">
                  <Link href={`/portal/tickets/${encodeURIComponent(t.id)}`} className="hover:underline">
                    {t.id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-900">{t.subject}</td>
                <td className="px-4 py-3 text-slate-500">
                  <span className="rounded-md bg-[#3ec8ba]/20 px-1.5 py-0.5 text-xs text-slate-900">{PILLARS[t.pillar].short}</span>{" "}
                  {t.subService}
                </td>
                <td className="px-4 py-3 text-slate-800">{t.status}</td>
                <td className="px-4 py-3">{t.priority}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{formatAst(t.created)}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{formatAst(t.lastUpdate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PortalTicketNewPanel() {
  const router = useRouter();
  const [pillar, setPillar] = useState<PillarId>(1);
  const [sub, setSub] = useState(SUB_SERVICES_BY_PILLAR[1][0]);
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<DemoTicket["priority"]>("Medium");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const list = SUB_SERVICES_BY_PILLAR[pillar];
    if (!list.includes(sub)) setSub(list[0]);
  }, [pillar, sub]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => router.push("/portal/tickets"), 1600);
  };

  if (done) {
    return (
      <div className="max-w-xl rounded-2xl border border-[#3ec8ba]/35 bg-white/95 backdrop-blur-sm shadow-sm p-8 text-center">
        <p className="text-lg font-semibold text-[#229388]">Request recorded</p>
        <p className="mt-2 text-sm text-slate-500">Demo: a ticket would be created in ITSM. Redirecting to ticket list…</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/portal/tickets" className="inline-flex items-center gap-2 text-sm text-[#229388] hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to tickets
      </Link>
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Create ticket</h1>
        <p className="mt-1 text-sm text-slate-500">Raise a ticket against a Lumeron service pillar (demo).</p>
      </div>
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</label>
          <input
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-[#3ec8ba]/60"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Service pillar</label>
            <select
              value={pillar}
              onChange={(e) => setPillar(Number(e.target.value) as PillarId)}
              className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2.5 text-slate-900"
            >
              {([1, 2, 3, 4, 5] as const).map((p) => (
                <option key={p} value={p}>
                  {PILLARS[p].short} {PILLARS[p].title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sub-service</label>
            <select
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2.5 text-slate-900"
            >
              {SUB_SERVICES_BY_PILLAR[pillar].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</label>
          <div className="mt-2 flex flex-wrap gap-3">
            {PRIORITY_OPTS.map((p) => (
              <label key={p} className="flex items-center gap-2 text-sm text-slate-900 cursor-pointer">
                <input type="radio" name="pr" checked={priority === p} onChange={() => setPriority(p)} />
                {p}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description</label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-[#3ec8ba]/60"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Attachments</label>
          <p className="mt-1 text-xs text-slate-500">Demo: PDF / PNG / logs — wire to upload in production.</p>
          <input type="file" className="mt-2 text-sm text-slate-500" disabled />
        </div>
        <button type="submit" className="w-full rounded-xl bg-[#229388] py-3 text-sm font-semibold text-white hover:bg-[#1a7a70]">
          Submit ticket
        </button>
      </form>
    </div>
  );
}

export function PortalTicketDetailPanel({ ticketId }: { ticketId: string }) {
  const ticket = DEMO_TICKETS.find((t) => t.id === ticketId);
  if (!ticket) {
    return (
      <div className="text-slate-900">
        <p>Ticket not found.</p>
        <Link href="/portal/tickets" className="mt-2 inline-block text-[#229388] hover:underline">
          Back to list
        </Link>
      </div>
    );
  }
  const initial = ticket.analyst?.name?.charAt(0) ?? "L";

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/portal/tickets" className="inline-flex items-center gap-2 text-sm text-[#229388] hover:underline">
        <ArrowLeft className="h-4 w-4" />
        All tickets
      </Link>
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[#229388]">{ticket.id}</p>
            <h1 className="mt-1 text-xl font-semibold text-slate-900">{ticket.subject}</h1>
            <p className="mt-2 text-sm text-slate-500">
              {PILLARS[ticket.pillar].short} · {ticket.subService} · {ticket.status} · {ticket.priority}
            </p>
          </div>
          {ticket.analyst ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-slate-50 px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3ec8ba]/35 text-sm font-bold text-slate-900">
                {initial}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900">{ticket.analyst.name}</p>
                <p className="text-xs text-slate-500">Analyst · {ticket.analyst.tier}</p>
              </div>
            </div>
          ) : null}
        </div>
        {ticket.slaNote ? <p className="mt-4 text-sm text-[#229388] border-t border-slate-200/90 pt-4">{ticket.slaNote}</p> : null}
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900">Thread</h2>
        <ul className="mt-4 space-y-4">
          {(ticket.thread ?? []).map((m, i) => (
            <li key={i} className={`rounded-xl border px-4 py-3 ${m.from === "client" ? "border-[#229388]/35 bg-[#3ec8ba]/10" : "border-slate-200/90 bg-slate-50"}`}>
              <p className="text-xs font-mono text-slate-500">{formatAst(m.at)} · {m.from === "client" ? "You" : "Lumeron"}</p>
              <p className="mt-1 text-sm text-slate-900/95">{m.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <textarea
            rows={3}
            placeholder="Reply (demo — not sent)"
            className="w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2 text-sm text-slate-900"
          />
          <button type="button" className="mt-2 rounded-lg bg-[#229388] px-4 py-2 text-sm font-medium text-white opacity-60 cursor-not-allowed">
            Send reply
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300/90 p-4 text-sm text-slate-500">
        Status timeline / audit trail would appear here in production.
      </div>
    </div>
  );
}

export function PortalServiceHealthPanel() {
  const services = contractedServices();
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">Service health</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Contracted services</h1>
        <p className="mt-1 text-sm text-slate-500">Uptime (30d) and last 24h response profile (demo sparkline).</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-md bg-[#3ec8ba]/25 px-2 py-0.5 text-xs font-mono text-[#229388]">{PILLARS[s.pillar].short}</span>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">{s.name}</h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  {statusDot(s.status)}
                  {statusLabel(s.status)}
                </p>
              </div>
              <MiniSparkline data={s.sparkline} />
            </div>
            <p className="font-mono text-2xl text-slate-900">
              Uptime <span className={slaColorClass(s.uptime)}>{s.uptime}%</span>
            </p>
            {s.lastIncident ? (
              <p className="text-sm text-slate-500">
                Last incident: {s.lastIncident}
                {s.lastIncidentDate ? ` · ${s.lastIncidentDate}` : ""}
              </p>
            ) : (
              <p className="text-sm text-slate-500">No open incidents in the selected window.</p>
            )}
            <button type="button" className="mt-auto text-left text-sm font-medium text-[#229388] hover:underline">
              View details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortalSlaPanel() {
  const trend = DEMO_SLA_TREND.map((d) => ({ name: d.m, pct: d.v }));
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">SLA</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">SLA dashboard</h1>
      </div>
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-8 text-center">
        <p className="text-sm text-slate-500">Overall SLA score (month)</p>
        <p className={`mt-2 text-5xl font-mono font-bold ${slaColorClass(DEMO_SLA_OVERALL)}`}>{DEMO_SLA_OVERALL}%</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-slate-200/90 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Target</th>
              <th className="px-4 py-3">Actual</th>
              <th className="px-4 py-3">Breaches</th>
              <th className="px-4 py-3">Duration (min)</th>
              <th className="px-4 py-3">Credit (SAR)</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_SLA_ROWS.map((r) => (
              <tr key={r.service} className="border-b border-slate-100 hover:bg-teal-50/50">
                <td className="px-4 py-3 text-slate-900">{r.service}</td>
                <td className="px-4 py-3 font-mono text-slate-500">{r.target}%</td>
                <td className={`px-4 py-3 font-mono ${slaColorClass(r.actual)}`}>{r.actual}%</td>
                <td className="px-4 py-3">{r.breaches}</td>
                <td className="px-4 py-3 font-mono">{r.breachMinutes}</td>
                <td className="px-4 py-3">{r.creditSar == null ? "—" : r.creditSar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-5 h-72">
        <p className="text-sm font-semibold text-slate-900 mb-4">Monthly SLA trend</p>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={trend}>
            <defs>
              <linearGradient id="slaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_PRIMARY} stopOpacity={0.4} />
                <stop offset="100%" stopColor={CHART_SECONDARY} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke={MUTED} tick={{ fill: MUTED, fontSize: 11 }} />
            <YAxis domain={[99.88, 100]} stroke={MUTED} tick={{ fill: MUTED, fontSize: 11 }} width={48} />
            <Tooltip contentStyle={CHART_TOOLTIP} />
            <Area type="monotone" dataKey="pct" stroke={CHART_PRIMARY} fill="url(#slaFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <button type="button" className="rounded-xl border border-slate-200/90 px-4 py-2 text-sm text-slate-500 cursor-not-allowed" disabled>
        Download SLA report (PDF) — demo
      </button>
    </div>
  );
}

export function PortalReportsPanel() {
  const vol = DEMO_REPORTS_VOLUME.map((d, i) => ({ name: d.m, tickets: d.tickets, hours: DEMO_REPORTS_RESOLUTION_H[i], up: DEMO_REPORTS_UPTIME_AREA[i] }));
  const [range, setRange] = useState("30d");
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">Reports</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Analytics & exports</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["7d", "30d", "90d", "custom"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${range === r ? "bg-[#229388] text-white shadow-sm" : "bg-slate-100 text-slate-600 border border-slate-200/90"}`}
            >
              {r === "custom" ? "Custom" : `Last ${r}`}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-4 h-64">
          <p className="text-sm font-medium text-slate-900 mb-2">Ticket volume</p>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={vol}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke={MUTED} tick={{ fill: MUTED, fontSize: 11 }} />
              <YAxis stroke={MUTED} tick={{ fill: MUTED, fontSize: 11 }} width={28} />
              <Tooltip contentStyle={CHART_TOOLTIP} />
              <Bar dataKey="tickets" fill={CHART_SECONDARY} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-4 h-64">
          <p className="text-sm font-medium text-slate-900 mb-2">Resolution time (days)</p>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={vol}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke={MUTED} tick={{ fill: MUTED, fontSize: 11 }} />
              <YAxis stroke={MUTED} tick={{ fill: MUTED, fontSize: 11 }} width={28} />
              <Tooltip contentStyle={CHART_TOOLTIP} />
              <Line type="monotone" dataKey="hours" stroke={CHART_PRIMARY} strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-4 h-64 lg:col-span-2">
          <p className="text-sm font-medium text-slate-900 mb-2">Service uptime history</p>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={vol}>
              <defs>
                <linearGradient id="upFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_PRIMARY} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={CHART_SECONDARY} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke={MUTED} tick={{ fill: MUTED, fontSize: 11 }} />
              <YAxis domain={[99.85, 100]} stroke={MUTED} tick={{ fill: MUTED, fontSize: 11 }} width={40} />
              <Tooltip contentStyle={CHART_TOOLTIP} />
              <Area type="monotone" dataKey="up" stroke={CHART_PRIMARY} fill="url(#upFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-4">
          <p className="text-sm font-semibold text-slate-900">SOC incident summary</p>
          <p className="mt-2 text-sm text-slate-500">Pillar 03 — 2 informational, 0 critical (demo).</p>
        </div>
        <div className="rounded-xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-4">
          <p className="text-sm font-semibold text-slate-900">IIoT anomaly events</p>
          <p className="mt-2 text-sm text-slate-500">Pillar 02 — no anomalies in window (demo).</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" className="rounded-xl border border-slate-200/90 px-4 py-2 text-sm text-slate-500 cursor-not-allowed" disabled>
          Download PDF
        </button>
        <button type="button" className="rounded-xl border border-slate-200/90 px-4 py-2 text-sm text-slate-500 cursor-not-allowed" disabled>
          Export CSV
        </button>
      </div>
    </div>
  );
}

export function PortalRequestsPanel() {
  const [typeId, setTypeId] = useState(REQUEST_CATALOG[0].id);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const item = REQUEST_CATALOG.find((r) => r.id === typeId)!;

  useEffect(() => {
    const cat = REQUEST_CATALOG.find((r) => r.id === typeId) ?? REQUEST_CATALOG[0];
    const next: Record<string, string> = {};
    cat.fields.forEach((f) => {
      next[f.key] = "";
    });
    setFields(next);
  }, [typeId]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg rounded-2xl border border-[#3ec8ba]/35 bg-white/95 backdrop-blur-sm shadow-sm p-8">
        <p className="text-lg font-semibold text-[#229388]">Request received</p>
        <p className="mt-2 text-sm text-slate-500">
          A confirmation ticket would be auto-created in the background. Reference: <span className="font-mono text-[#229388]">REQ-{typeId.toUpperCase()}-DEMO</span>
        </p>
        <button type="button" onClick={() => setSubmitted(false)} className="mt-4 text-sm text-[#229388] hover:underline">
          Submit another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">Service requests</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Request catalog</h1>
        <p className="mt-1 text-sm text-slate-500">Request changes without opening a full support ticket (demo).</p>
      </div>
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Request type</label>
          <select
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2.5 text-slate-900"
          >
            {REQUEST_CATALOG.map((r) => (
              <option key={r.id} value={r.id}>
                {PILLARS[r.pillar].short} · {r.label}
              </option>
            ))}
          </select>
        </div>
        {item.fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                required
                rows={4}
                value={fields[f.key] ?? ""}
                onChange={(e) => setFields((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2 text-slate-900"
              />
            ) : (
              <input
                required
                value={fields[f.key] ?? ""}
                onChange={(e) => setFields((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2 text-slate-900"
              />
            )}
          </div>
        ))}
        <button type="submit" className="w-full rounded-xl bg-[#229388] py-3 text-sm font-semibold text-white hover:bg-[#1a7a70]">
          Submit request
        </button>
      </form>
    </div>
  );
}

export function PortalSettingsFull() {
  const user = usePortalUser();
  const { lang, profileName, profileCompany, profileRole, notifications, setLang, setProfile, setNotifications } =
    useClientPortalStore();
  const [tab, setTab] = useState<"profile" | "notifications" | "integrations">("profile");
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(typeof window !== "undefined" ? window.location.origin : "");
  }, []);

  return (
    <div className={`max-w-4xl space-y-6 ${lang === "ar" ? "text-right" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">Settings</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Profile & notifications</h1>
      </div>
      <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-slate-100/90 border border-slate-200/90 w-fit">
        {(
          [
            ["profile", "Profile"],
            ["notifications", "Notifications"],
            ["integrations", "API & IT"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === k ? "bg-[#229388] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "profile" ? (
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-6 space-y-4 max-w-xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">Name</label>
              <input
                value={profileName}
                onChange={(e) => setProfile({ profileName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2 text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">Role</label>
              <input
                value={profileRole}
                onChange={(e) => setProfile({ profileRole: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2 text-slate-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase text-slate-500">Company</label>
              <input
                value={profileCompany}
                onChange={(e) => setProfile({ profileCompany: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2 text-slate-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase text-slate-500">Email (session)</label>
              <p className="mt-1 text-slate-900 font-mono text-sm">{user}</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Language</label>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${lang === "en" ? "bg-[#229388] text-white shadow-sm" : "bg-slate-100 text-slate-600 border border-slate-200/90"}`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang("ar")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${lang === "ar" ? "bg-[#229388] text-white shadow-sm" : "bg-slate-100 text-slate-600 border border-slate-200/90"}`}
              >
                العربية
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">RTL applies to this settings block when Arabic is selected.</p>
          </div>
          <Link href="/privacy" className="inline-block text-sm text-[#229388] hover:underline">
            Privacy policy
          </Link>
        </div>
      ) : null}

      {tab === "notifications" ? (
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-sm p-6 space-y-6 max-w-xl">
          <p className="text-sm text-slate-500">Channels</p>
          <label className="flex items-center gap-2 text-slate-900">
            <input
              type="checkbox"
              checked={notifications.channelEmail}
              onChange={(e) => setNotifications({ channelEmail: e.target.checked })}
            />
            Email
          </label>
          <label className="flex items-center gap-2 text-slate-900">
            <input
              type="checkbox"
              checked={notifications.channelInApp}
              onChange={(e) => setNotifications({ channelInApp: e.target.checked })}
            />
            In-portal
          </label>
          <p className="text-sm text-slate-500 pt-2 border-t border-slate-200/90">Alerts</p>
          {(
            [
              ["ticketUpdates", "Ticket updates"],
              ["slaBreaches", "SLA breaches"],
              ["incidentAlerts", "Incident alerts"],
              ["monthlyReports", "Monthly reports"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-slate-900">
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={(e) => setNotifications({ [key]: e.target.checked })}
              />
              {label}
            </label>
          ))}
          <div>
            <p className="text-sm text-slate-500 mb-2">Connected services (read-only)</p>
            <ul className="text-sm text-slate-800 space-y-1 font-mono">
              <li>SIEM stream · provisioned</li>
              <li>CMDB sync · weekly</li>
              <li>Status page webhook · active</li>
            </ul>
          </div>
        </div>
      ) : null}

      {tab === "integrations" ? <PortalIntegrationsGuide userEmail={user} origin={origin} /> : null}
    </div>
  );
}
