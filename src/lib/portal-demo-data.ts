/** Demo seed for the Lumeron client portal (AST labels in UI). */

export const DEMO_CLIENT = {
  name: "Noor Al-Rashidi",
  company: "ARAMCO Digital Division",
  email: "demo@lumeron.sa",
  contractedPillars: [1, 3, 5] as const,
};

export type PillarId = 1 | 2 | 3 | 4 | 5;

export const PILLARS: Record<
  PillarId,
  { id: PillarId; short: string; title: string }
> = {
  1: { id: 1, short: "01", title: "Digital Infrastructure & Data Centers" },
  2: { id: 2, short: "02", title: "Industrial Digitalization (Industry 4.0)" },
  3: { id: 3, short: "03", title: "Cybersecurity & Digital Trust" },
  4: { id: 4, short: "04", title: "Artificial Intelligence & Advanced Analytics" },
  5: { id: 5, short: "05", title: "Smart Infrastructure & Connectivity" },
};

export const SUB_SERVICES_BY_PILLAR: Record<PillarId, string[]> = {
  1: ["Hyperscale Infrastructure", "Sovereign Cloud Fabric", "Edge & Colocation"],
  2: ["Smart Factory Integration", "Digital Twin Operations", "Workforce Capability Building"],
  3: ["24/7 SOC Operations", "Zero-Trust Architecture", "NCA Compliance"],
  4: ["Arabic-Native LLMs", "Industrial Edge AI", "AI-Driven Automation"],
  5: ["Proactive Infrastructure Management", "Guaranteed SLA Delivery", "Dedicated Support Teams"],
};

export type ServiceStatus = "operational" | "degraded" | "incident" | "maintenance";

export type DemoService = {
  id: string;
  name: string;
  pillar: PillarId;
  uptime: number;
  status: ServiceStatus;
  lastIncident?: string;
  lastIncidentDate?: string;
  sparkline: number[];
};

export const DEMO_SERVICES: DemoService[] = [
  {
    id: "svc-1",
    name: "Tier IV Data Center — Riyadh",
    pillar: 1,
    uptime: 99.999,
    status: "operational",
    sparkline: [42, 44, 41, 43, 45, 44, 43, 42, 41, 40, 41, 42],
  },
  {
    id: "svc-2",
    name: "Sovereign Cloud Fabric",
    pillar: 1,
    uptime: 99.97,
    status: "operational",
    sparkline: [38, 40, 39, 41, 40, 39, 38, 37, 38, 39, 40, 39],
  },
  {
    id: "svc-3",
    name: "Edge Node — Eastern Province",
    pillar: 1,
    uptime: 99.95,
    status: "maintenance",
    lastIncident: "Planned fiber splice — no customer impact",
    lastIncidentDate: "2026-05-02",
    sparkline: [55, 52, 58, 60, 48, 50, 49, 47, 46, 45, 44, 43],
  },
  {
    id: "svc-4",
    name: "IIoT Platform",
    pillar: 2,
    uptime: 99.92,
    status: "operational",
    sparkline: [30, 31, 32, 31, 30, 29, 30, 31, 32, 33, 32, 31],
  },
  {
    id: "svc-5",
    name: "24/7 SOC",
    pillar: 3,
    uptime: 100,
    status: "operational",
    sparkline: [22, 23, 22, 21, 22, 23, 22, 21, 20, 21, 22, 21],
  },
  {
    id: "svc-6",
    name: "Zero-Trust Gateway",
    pillar: 3,
    uptime: 99.91,
    status: "degraded",
    lastIncident: "Elevated auth latency on hybrid connector",
    lastIncidentDate: "2026-05-11",
    sparkline: [48, 52, 65, 70, 55, 50, 48, 46, 45, 44, 43, 42],
  },
  {
    id: "svc-7",
    name: "NCA Compliance Dashboard",
    pillar: 3,
    uptime: 99.98,
    status: "operational",
    sparkline: [25, 26, 25, 24, 25, 26, 25, 24, 23, 24, 25, 24],
  },
  {
    id: "svc-8",
    name: "Arabic LLM API",
    pillar: 4,
    uptime: 99.96,
    status: "operational",
    sparkline: [35, 36, 35, 34, 35, 36, 37, 36, 35, 34, 35, 34],
  },
  {
    id: "svc-9",
    name: "Infrastructure Management",
    pillar: 5,
    uptime: 99.999,
    status: "operational",
    sparkline: [28, 29, 28, 27, 28, 29, 28, 27, 26, 27, 28, 27],
  },
];

export type TicketStatus = "Open" | "In Progress" | "Pending Client" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High" | "Critical";

export type DemoTicket = {
  id: string;
  subject: string;
  pillar: PillarId;
  subService: string;
  status: TicketStatus;
  priority: TicketPriority;
  created: string;
  lastUpdate: string;
  analyst?: { name: string; tier: "T1" | "T2" | "T3" };
  thread?: { from: "client" | "lumeron"; body: string; at: string }[];
  slaNote?: string;
};

export const DEMO_TICKETS: DemoTicket[] = [
  {
    id: "LMR-0041",
    subject: "SOC alert threshold review",
    pillar: 3,
    subService: "24/7 SOC Operations",
    status: "In Progress",
    priority: "High",
    created: "2026-05-08T09:15:00+03:00",
    lastUpdate: "2026-05-12T14:22:00+03:00",
    analyst: { name: "Sara Al-Mutairi", tier: "T2" },
    slaNote: "P03 — SOC response P1: 15m acknowledgement",
    thread: [
      { from: "client", body: "We need thresholds aligned with our new SIEM correlation IDs.", at: "2026-05-08T09:15:00+03:00" },
      { from: "lumeron", body: "Acknowledged. Analyst assigned — reviewing correlation pack v3.", at: "2026-05-08T09:28:00+03:00" },
      { from: "lumeron", body: "Draft threshold matrix attached in internal workspace — awaiting your sign-off.", at: "2026-05-12T14:22:00+03:00" },
    ],
  },
  {
    id: "LMR-0040",
    subject: "Edge node latency spike",
    pillar: 1,
    subService: "Edge & Colocation",
    status: "Resolved",
    priority: "Critical",
    created: "2026-05-01T11:00:00+03:00",
    lastUpdate: "2026-05-03T16:40:00+03:00",
    analyst: { name: "Faisal Al-Qahtani", tier: "T3" },
    slaNote: "P01 — Edge incident bridge within 30m",
    thread: [
      { from: "client", body: "Latency >120ms on EP-EDGE-02 since 10:45 AST.", at: "2026-05-01T11:00:00+03:00" },
      { from: "lumeron", body: "Bridge opened — rerouted upstream peering; monitoring stable.", at: "2026-05-01T11:42:00+03:00" },
    ],
  },
  {
    id: "LMR-0035",
    subject: "Add IP range to allowlist",
    pillar: 3,
    subService: "Zero-Trust Architecture",
    status: "Closed",
    priority: "Low",
    created: "2026-04-22T08:00:00+03:00",
    lastUpdate: "2026-04-23T10:05:00+03:00",
    analyst: { name: "Nora Al-Harbi", tier: "T1" },
    thread: [{ from: "client", body: "Please allow 10.44.0.0/16 for partner VPN.", at: "2026-04-22T08:00:00+03:00" }],
  },
];

export const DEMO_ACTIVITY = [
  { at: "2026-05-12T15:10:00+03:00", text: "Ticket LMR-0041 updated — analyst comment added" },
  { at: "2026-05-12T11:02:00+03:00", text: "SLA review pack published for May" },
  { at: "2026-05-11T19:30:00+03:00", text: "Zero-Trust Gateway marked degraded — mitigation active" },
  { at: "2026-05-10T09:00:00+03:00", text: "Maintenance window completed — Edge Eastern Province" },
  { at: "2026-05-09T14:00:00+03:00", text: "New SOC dashboard tile: AI triage queue depth" },
] as const;

export type SlaRow = {
  service: string;
  target: number;
  actual: number;
  breaches: number;
  breachMinutes: number;
  creditSar: number | null;
};

export const DEMO_SLA_OVERALL = 99.97;

export const DEMO_SLA_ROWS: SlaRow[] = [
  { service: "Tier IV Data Center — Riyadh", target: 99.995, actual: 99.999, breaches: 0, breachMinutes: 0, creditSar: null },
  { service: "Sovereign Cloud Fabric", target: 99.95, actual: 99.97, breaches: 0, breachMinutes: 0, creditSar: null },
  { service: "Zero-Trust Gateway", target: 99.9, actual: 99.91, breaches: 1, breachMinutes: 18, creditSar: 0 },
  { service: "24/7 SOC", target: 100, actual: 100, breaches: 0, breachMinutes: 0, creditSar: null },
  { service: "Infrastructure Management", target: 99.99, actual: 99.999, breaches: 0, breachMinutes: 0, creditSar: null },
];

export const DEMO_SLA_TREND = [
  { m: "Jan", v: 99.92 },
  { m: "Feb", v: 99.95 },
  { m: "Mar", v: 99.94 },
  { m: "Apr", v: 99.96 },
  { m: "May", v: 99.97 },
];

export const DEMO_REPORTS_VOLUME = [
  { m: "Jan", tickets: 12 },
  { m: "Feb", tickets: 9 },
  { m: "Mar", tickets: 15 },
  { m: "Apr", tickets: 11 },
  { m: "May", tickets: 8 },
];

export const DEMO_REPORTS_RESOLUTION_H = [4.2, 3.8, 3.5, 3.2, 2.9];
export const DEMO_REPORTS_UPTIME_AREA = [99.9, 99.92, 99.91, 99.95, 99.97];

export type RequestCatalogItem = {
  id: string;
  label: string;
  pillar: PillarId;
  fields: { key: string; label: string; type: "text" | "textarea" }[];
};

export const REQUEST_CATALOG: RequestCatalogItem[] = [
  { id: "wl", label: "Add IP to Whitelist", pillar: 3, fields: [{ key: "cidr", label: "CIDR / IP", type: "text" }, { key: "just", label: "Business justification", type: "textarea" }] },
  { id: "colo", label: "Increase Colocation Space", pillar: 1, fields: [{ key: "kw", label: "Additional kW", type: "text" }, { key: "rack", label: "Rack notes", type: "textarea" }] },
  { id: "edge", label: "Add Edge Node Region", pillar: 1, fields: [{ key: "region", label: "Target region", type: "text" }, { key: "lat", label: "Latency requirements", type: "textarea" }] },
  { id: "iiot", label: "Onboard New IIoT Device", pillar: 2, fields: [{ key: "serial", label: "Device serial / asset tag", type: "text" }, { key: "proto", label: "Protocols", type: "textarea" }] },
  { id: "twin", label: "Schedule Digital Twin Simulation", pillar: 2, fields: [{ key: "window", label: "Preferred window (AST)", type: "text" }, { key: "scope", label: "Scope", type: "textarea" }] },
  { id: "hunt", label: "SOC Threat Hunt Request", pillar: 3, fields: [{ key: "hypo", label: "Hypothesis / IOCs", type: "textarea" }] },
  { id: "nca", label: "NCA Compliance Gap Assessment", pillar: 3, fields: [{ key: "scope", label: "Systems in scope", type: "textarea" }] },
  { id: "llm", label: "Arabic LLM Fine-Tuning Request", pillar: 4, fields: [{ key: "use", label: "Use case summary", type: "textarea" }] },
  { id: "slam", label: "Request SLA Review Meeting", pillar: 5, fields: [{ key: "when", label: "Preferred dates", type: "text" }] },
  { id: "esc", label: "Escalate to Dedicated Support", pillar: 5, fields: [{ key: "sev", label: "Severity / impact", type: "textarea" }] },
];

export function contractedServices(): DemoService[] {
  const set = new Set(DEMO_CLIENT.contractedPillars);
  return DEMO_SERVICES.filter((s) => set.has(s.pillar));
}

export function dashboardKpis() {
  const open = DEMO_TICKETS.filter((t) => t.status === "Open" || t.status === "In Progress" || t.status === "Pending Client").length;
  const critical = DEMO_TICKETS.filter((t) => t.priority === "Critical" && t.status !== "Closed" && t.status !== "Resolved").length;
  return {
    openTickets: open,
    slaPct: DEMO_SLA_OVERALL,
    activeServices: contractedServices().length,
    criticalAlerts: critical,
  };
}

export function slaColorClass(pct: number): string {
  if (pct < 99.5) return "text-red-600";
  if (pct < 99.9) return "text-amber-600";
  return "text-[#229388]";
}

export function formatAst(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", { timeZone: "Asia/Riyadh", dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}
