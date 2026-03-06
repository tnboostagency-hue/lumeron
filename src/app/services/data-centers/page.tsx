"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";

const stats = [
  { num: "99.999", unit: "%", label: "Uptime availability" },
  { num: "Tier", unit: " IV", label: "Design & construction" },
  { num: "< 15", unit: " min", label: "Mean time to restore" },
  { num: "24", unit: "/7", label: "NOC monitoring coverage" },
];

const services = [
  {
    num: "01",
    title: "Data Center Consulting & Advisory",
    badge: "Strategy",
    desc: "End-to-end advisory from master planning to financial modelling — positioning your infrastructure for long-term operational excellence.",
    items: [
      "Data center strategy & master planning",
      "Capacity planning (Power / Cooling / Rack Density)",
      "Site selection & feasibility studies",
      "Tier (I–IV) design advisory",
      "CAPEX/OPEX optimization analysis",
    ],
    pct: 97,
  },
  {
    num: "02",
    title: "Engineering & Design Services",
    badge: "Full-Stack Eng.",
    desc: "Full-stack engineering across all disciplines — from early concept schematics to detailed multi-discipline construction drawings.",
    items: [
      "Concept layouts & architecture",
      "Architectural & structural design",
      "Mechanical design (HVAC, CRAC/CRAH, chillers)",
      "Electrical design (UPS, generators, switchgear)",
      "Fire suppression (FM200, NOVEC, VESDA)",
      "ICT / ELV systems & BMS/DCIM design",
      "Hot/cold aisle containment layouts",
      "Energy optimization & PUE improvement",
      "Redundancy design (N+1, 2N, 2N+1)",
    ],
    pct: 100,
  },
  {
    num: "03",
    title: "Procurement & Vendor Management",
    badge: "Global Supply",
    desc: "Strategic sourcing and global logistics management for all critical data center equipment, with full FAT oversight.",
    items: [
      "Generators & UPS systems",
      "Precision cooling systems",
      "Power panels, transformers & switchgear",
      "Racks, structured cabling & PDUs",
      "Fire detection & suppression systems",
      "OEM coordination (Cisco, Schneider, Vertiv, Eaton…)",
      "Vendor qualification & evaluation",
      "Factory Acceptance Tests (FAT)",
      "Global logistics & supply chain management",
    ],
    pct: 95,
  },
  {
    num: "04",
    title: "Construction, Installation & Commissioning",
    badge: "Level 1–5 Cx",
    desc: "Turnkey build delivery from civil groundworks through Level 1–5 integrated commissioning and formal client handover.",
    items: [
      "Building construction & raised flooring",
      "White space build-out & cable pathways",
      "Main power systems & UPS / battery banks",
      "PDU & RPP distribution installations",
      "Cooling system installation & chiller integration",
      "Structured cabling, CCTV & access control",
      "BMS / DCIM integration",
      "End-to-end commissioning (Level 1–5)",
      "Reliability testing & client handover documentation",
    ],
    pct: 99,
  },
];

const specs = [
  { name: "Design Standard", val: "Uptime Tier IV" },
  { name: "PUE Target", val: "≤ 1.35" },
  { name: "Availability SLA", val: "99.999%" },
  { name: "Cooling Capacity", val: "N+1 / 2N" },
  { name: "Power Redundancy", val: "2N+1" },
  { name: "Commissioning", val: "Level 1–5" },
  { name: "Fire Suppression", val: "FM200 / NOVEC" },
  { name: "Data Sovereignty", val: "KSA Compliant" },
];

export default function DataCentersPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageWrapper>
      <>
        <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        <Navbar />

        {/* HERO — unchanged */}
        <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-white pt-20">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(34,147,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,147,136,0.06) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 80%)",
            }}
          />
          <div className="absolute pointer-events-none" style={{ top: "-5%", left: "50%", transform: "translateX(-50%)", width: "860px", height: "500px", background: "radial-gradient(ellipse at center, rgba(34,147,136,0.09) 0%, transparent 65%)" }} />
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 1440 860" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <path d="M 160 160 L 360 160 L 360 360" stroke="rgba(34,147,136,0.18)" strokeWidth="1.5"/>
              <path d="M 1280 700 L 1080 700 L 1080 500" stroke="rgba(34,147,136,0.18)" strokeWidth="1.5"/>
              <circle cx="360" cy="360" r="5" fill="rgba(34,147,136,0.55)"/>
              <circle cx="1080" cy="500" r="5" fill="rgba(34,147,136,0.55)"/>
              <line x1="720" y1="0" x2="720" y2="860" stroke="rgba(34,147,136,0.07)" strokeWidth="1"/>
            </svg>
          </div>

          <div className="container mx-auto px-6 md:px-8 pb-20 relative z-10">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-6 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Data Centers</span>
            </div>
            <h1
              className="font-bold leading-[0.95] tracking-tight mb-10"
              style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(52px,8vw,96px)", color: "#111827", letterSpacing: "-0.03em" }}
            >
              Infrastructure<br />
              <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Built for</span>
              <br />Tomorrow.
            </h1>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="text-[17px] text-[#64748b] leading-[1.75] max-w-[420px] font-light">
                Lumeron designs, builds, and operates hyperscale data center facilities engineered for maximum uptime, energy efficiency, and Saudi data sovereignty.
              </p>
              <div className="flex gap-4 flex-shrink-0">
                <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px] px-8 py-3.5">Connect Now</button>
                <a href="#services" className="btn-outline text-[14px] px-8 py-3.5">Our Services</a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2 z-10">
            <div className="w-px h-14" style={{ background: "linear-gradient(to bottom, #229388, transparent)", animation: "pulse 2s ease-in-out infinite" }} />
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#94a3b8]" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          </div>
        </section>

        {/* STATS BAR */}
        <div className="border-y border-[#e2e8f0] bg-white grid grid-cols-2 lg:grid-cols-4 shadow-sm">
          {stats.map((s) => (
            <div key={s.label} className="px-10 py-10 border-r border-[#e2e8f0] last:border-r-0">
              <div className="font-bold leading-none mb-2" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,46px)", color: "#111827", letterSpacing: "-0.02em" }}>
                {s.num}<span className="text-[#229388]" style={{ fontSize: "0.55em" }}>{s.unit}</span>
              </div>
              <div className="text-[12px] font-medium tracking-[0.07em] uppercase text-[#94a3b8]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ABOUT */}
        <section id="about" className="bg-white py-32">
          <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">About This Service</span>
              </div>
              <h2 className="font-bold leading-tight mb-8" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,48px)", color: "#111827", letterSpacing: "-0.025em" }}>
                Comprehensive end-to-end data center solutions
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-6">
                From initial consulting and feasibility through full engineering design, procurement, construction, and Level 1–5 commissioning — Lumeron delivers the most advanced data center infrastructures in the region under a single accountable partner.
              </p>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                Our multidisciplinary teams bring deep expertise in Tier IV design, precision cooling, high-density power distribution, BMS/DCIM integration, and Saudi data sovereignty requirements.
              </p>
              <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px]">Start a Conversation</button>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0fdfc 0%,#f8fafc 100%)", aspectRatio: "4/3" }}>
                {/* Data center floor plan illustration */}
                <svg viewBox="0 0 400 320" fill="none" className="w-4/5 h-4/5">
                  {/* Outer shell */}
                  <rect x="20" y="20" width="360" height="280" rx="6" fill="rgba(34,147,136,0.03)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                  {/* Header */}
                  <rect x="20" y="20" width="360" height="32" rx="6" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                  <text x="200" y="40" textAnchor="middle" fontSize="9" fill="#229388" fontWeight="700" letterSpacing="1">DATA CENTER FLOOR PLAN — TIER IV</text>
                  {/* Cold aisle */}
                  <rect x="40" y="72" width="320" height="18" rx="2" fill="rgba(62,200,186,0.12)" stroke="rgba(34,147,136,0.2)" strokeWidth="0.5"/>
                  <text x="200" y="84" textAnchor="middle" fontSize="7" fill="#3ec8ba" fontWeight="600" letterSpacing="0.5">COLD AISLE</text>
                  {/* Server racks row 1 */}
                  {[40,80,120,160,200,240,280,320].map((x) => (
                    <g key={x}>
                      <rect x={x} y="94" width="32" height="50" rx="1" fill="white" stroke="rgba(34,147,136,0.25)" strokeWidth="0.8"/>
                      <rect x={x+3} y="97" width="26" height="5" rx="0.5" fill="rgba(34,147,136,0.3)"/>
                      <rect x={x+3} y="104" width="26" height="5" rx="0.5" fill="rgba(34,147,136,0.2)"/>
                      <rect x={x+3} y="111" width="26" height="5" rx="0.5" fill="rgba(34,147,136,0.15)"/>
                      <rect x={x+3} y="118" width="26" height="5" rx="0.5" fill="rgba(34,147,136,0.1)"/>
                      <circle cx={x+28} cy={100} r="2" fill="#229388" opacity="0.7"/>
                    </g>
                  ))}
                  {/* Hot aisle */}
                  <rect x="40" y="148" width="320" height="18" rx="2" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.15)" strokeWidth="0.5"/>
                  <text x="200" y="160" textAnchor="middle" fontSize="7" fill="#ef4444" fontWeight="600" letterSpacing="0.5" opacity="0.6">HOT AISLE</text>
                  {/* Server racks row 2 */}
                  {[40,80,120,160,200,240,280,320].map((x) => (
                    <g key={`r2-${x}`}>
                      <rect x={x} y="170" width="32" height="50" rx="1" fill="white" stroke="rgba(34,147,136,0.25)" strokeWidth="0.8"/>
                      <rect x={x+3} y="173" width="26" height="5" rx="0.5" fill="rgba(34,147,136,0.3)"/>
                      <rect x={x+3} y="180" width="26" height="5" rx="0.5" fill="rgba(34,147,136,0.2)"/>
                      <rect x={x+3} y="187" width="26" height="5" rx="0.5" fill="rgba(34,147,136,0.15)"/>
                      <rect x={x+3} y="194" width="26" height="5" rx="0.5" fill="rgba(34,147,136,0.1)"/>
                      <circle cx={x+28} cy={176} r="2" fill="#229388" opacity="0.7"/>
                    </g>
                  ))}
                  {/* Power feed lines */}
                  {[56,136,216,296].map((x) => (
                    <line key={`pf-${x}`} x1={x} y1="224" x2={x} y2="280" stroke="rgba(34,147,136,0.15)" strokeWidth="1" strokeDasharray="3 2"/>
                  ))}
                  {/* UPS / power zone */}
                  <rect x="40" y="232" width="80" height="40" rx="2" fill="rgba(34,147,136,0.06)" stroke="rgba(34,147,136,0.2)" strokeWidth="0.8"/>
                  <text x="80" y="256" textAnchor="middle" fontSize="7.5" fill="#229388" fontWeight="600">UPS ROOM</text>
                  <rect x="160" y="232" width="80" height="40" rx="2" fill="rgba(34,147,136,0.06)" stroke="rgba(34,147,136,0.2)" strokeWidth="0.8"/>
                  <text x="200" y="256" textAnchor="middle" fontSize="7.5" fill="#229388" fontWeight="600">COOLING</text>
                  <rect x="280" y="232" width="80" height="40" rx="2" fill="rgba(34,147,136,0.06)" stroke="rgba(34,147,136,0.2)" strokeWidth="0.8"/>
                  <text x="320" y="256" textAnchor="middle" fontSize="7.5" fill="#229388" fontWeight="600">GENERATOR</text>
                  {/* Live dot */}
                  <circle cx="370" cy="36" r="5" fill="#229388">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                <div className="absolute -bottom-4 -left-4 text-white rounded-xl px-5 py-4 shadow-lg" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                  <div className="font-bold text-2xl leading-none" style={{ fontFamily: '"Avenir Next Arabic",sans-serif' }}>Tier IV</div>
                  <div className="text-[11px] mt-1 opacity-90 tracking-wide">Uptime Certified</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-28 bg-[#f8fafc] border-y border-[#e2e8f0]">
          <div className="container mx-auto px-6 md:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-[#229388]" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">What We Offer</span>
                </div>
                <h2 className="font-bold leading-tight" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em", maxWidth: "480px" }}>
                  Four-phase data center lifecycle
                </h2>
              </div>
              <p className="text-[15px] text-[#64748b] leading-[1.7] max-w-[360px] font-light">
                A single accountable partner covering consulting, engineering, procurement, and commissioning under one integrated delivery model.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div key={s.num} className="group flex gap-5 items-start bg-white rounded-xl p-7 border border-[#e2e8f0] hover:border-[#229388]/40 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", color: "white", fontFamily: '"Avenir Next Arabic","Inter",sans-serif', boxShadow: "0 4px 12px rgba(34,147,136,0.25)" }}
                    >
                      {i + 1}
                    </div>
                    {i < services.length - 1 && (
                      <div className="w-px flex-1 mt-2 min-h-[20px]" style={{ background: "linear-gradient(to bottom, rgba(34,147,136,0.3), transparent)" }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-[16px] text-[#111827] leading-snug" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{s.title}</h3>
                      <span className="flex-shrink-0 text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded-md whitespace-nowrap" style={{ background: "rgba(34,147,136,0.08)", color: "#229388", border: "1px solid rgba(34,147,136,0.2)" }}>{s.badge}</span>
                    </div>
                    <p className="text-[13px] text-[#64748b] leading-[1.75] font-light mb-4">{s.desc}</p>
                    <ul className="grid grid-cols-1 gap-1.5 mb-4">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[12px] text-[#475569]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#229388] flex-shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 rounded-full bg-[#e2e8f0] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.pct}%`, background: "linear-gradient(90deg,#229388,#3ec8ba)" }} />
                      </div>
                      <span className="text-[11px] font-semibold text-[#229388] flex-shrink-0">{s.pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE BUILD */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Our Build Methodology</span>
              </div>
              <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                Engineered for resilience, commissioned for certainty
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                Every facility we build follows a rigorous Level 1–5 commissioning programme — from component-level factory acceptance through to full integrated systems testing and client handover, with zero tolerance for undocumented deviations.
              </p>
              <ul className="flex flex-col divide-y divide-[#e2e8f0]">
                {[
                  "Uptime Institute Tier IV design standards",
                  "Multi-discipline integrated engineering team",
                  "Factory Acceptance Tests (FAT) on all critical plant",
                  "Level 1–5 commissioning with full test scripts",
                  "BMS / DCIM integration from day one",
                  "NCA & Saudi data sovereignty compliance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 text-[14px] text-[#111827] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#229388] flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Power chain / commissioning levels diagram */}
            <div className="rounded-2xl border border-[#e2e8f0] shadow-lg relative overflow-hidden" style={{ aspectRatio: "1", background: "linear-gradient(150deg,#f0fdfc 0%,#f8fafc 60%,#edfaf9 100%)" }}>
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.04) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
              <svg viewBox="0 0 360 360" fill="none" className="w-full h-full relative z-10">
                <rect x="20" y="20" width="320" height="320" rx="8" fill="white" fillOpacity="0.7" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                {/* Header */}
                <rect x="20" y="20" width="320" height="32" rx="7" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <circle cx="38" cy="36" r="5" fill="#229388" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.4s" repeatCount="indefinite"/>
                </circle>
                <text x="190" y="40" textAnchor="middle" fontSize="9" fill="#229388" fontWeight="700" letterSpacing="1">COMMISSIONING PROGRESS</text>

                {/* Level bars */}
                {[
                  { y: 72,  label: "L1 — Component Test",          pct: 100, color: "#229388" },
                  { y: 112, label: "L2 — Sub-system Test",          pct: 100, color: "#229388" },
                  { y: 152, label: "L3 — System Test",              pct: 95,  color: "#3ec8ba" },
                  { y: 192, label: "L4 — Integrated Systems Test",  pct: 88,  color: "#3ec8ba" },
                  { y: 232, label: "L5 — Operational Acceptance",   pct: 72,  color: "#94a3b8" },
                ].map((lv) => (
                  <g key={lv.y}>
                    <text x="36" y={lv.y + 12} fontSize="8" fill="#374151" fontWeight="600">{lv.label}</text>
                    <rect x="36" y={lv.y + 18} width="288" height="16" rx="3" fill="rgba(34,147,136,0.07)" stroke="rgba(34,147,136,0.12)" strokeWidth="0.5"/>
                    <rect x="36" y={lv.y + 18} width={288 * lv.pct / 100} height="16" rx="3" fill={lv.color} opacity="0.7"/>
                    <text x={36 + 288 * lv.pct / 100 - 24} y={lv.y + 30} fontSize="7.5" fill="white" fontWeight="700">{lv.pct}%</text>
                  </g>
                ))}

                {/* Bottom status */}
                <rect x="20" y="312" width="320" height="28" rx="0" fill="rgba(34,147,136,0.08)"/>
                <circle cx="38" cy="326" r="4" fill="#229388">
                  <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/>
                </circle>
                <text x="50" y="330" fontSize="8.5" fill="#229388" fontWeight="700" letterSpacing="0.8">LIVE  ·  TIER IV  ·  PUE ≤ 1.35  ·  99.999% SLA</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SPECS */}
        <section className="py-28 bg-[#f8fafc] border-t border-[#e2e8f0]">
          <div className="container mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Technical Parameters</span>
                <div className="w-5 h-px bg-[#229388]" />
              </div>
              <h2 className="font-bold mb-4" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                Built to the highest specifications
              </h2>
              <p className="text-[15px] text-[#64748b] max-w-[440px] mx-auto leading-[1.7]">Every parameter defined by international standards and independently verified.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" style={{ border: "1px solid rgba(34,147,136,0.18)", gap: "1px", background: "rgba(34,147,136,0.12)", boxShadow: "0 4px 24px rgba(34,147,136,0.06)" }}>
              {specs.map((r) => (
                <div key={r.name} className="bg-white px-10 py-7 flex justify-between items-center hover:bg-[#f0fdfc] transition-colors duration-200">
                  <span className="text-[12px] font-bold tracking-[0.07em] uppercase text-[#94a3b8]">{r.name}</span>
                  <span className="font-semibold text-[20px] text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', letterSpacing: "-0.01em" }}>{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}>
          <h2 className="font-bold text-white leading-tight max-w-xl" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(24px,3vw,42px)", letterSpacing: "-0.025em" }}>
            Ready to build your future-proof data center?
          </h2>
          <button onClick={() => setModalOpen(true)} className="flex-shrink-0 bg-white font-semibold text-[13px] tracking-[0.08em] uppercase px-10 py-4 rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md" style={{ color: "#229388" }}>
            Connect Now
          </button>
        </section>

        <Footer />
      </>
    </PageWrapper>
  );
}
