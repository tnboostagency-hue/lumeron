"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import ServiceHeroOtherServices from "@/components/ui/service-hero-other-services";

const services = [
  {
    num: "01", badge: "Network Design",
    title: "Network & Telecom Design",
    desc: "End-to-end network architecture from campus LAN to wide-area enterprise WAN — designed for performance, resilience and scalability.",
    items: ["LAN/WAN architecture & capacity planning", "BGP, OSPF & MPLS routing design", "QoS policy design & traffic engineering", "IP addressing & VLAN segmentation", "Wireless (Wi-Fi 6/6E) enterprise design", "Network documentation & as-built deliverables"],
    pct: 97,
  },
  {
    num: "02", badge: "Fiber Infra",
    title: "Fiber OSP/ISP",
    desc: "Full-turnkey outside and inside plant fiber delivery — from civil works and cable laying through splicing, testing and documentation.",
    items: ["Underground & aerial fiber route planning", "Directional drilling & civil coordination", "Fusion splicing & termination", "OTDR testing & loss budget verification", "Fiber management systems (FMS) installation", "As-built GIS mapping & documentation"],
    pct: 95,
  },
  {
    num: "03", badge: "SD-WAN",
    title: "SD-WAN & SASE",
    desc: "Modernise your WAN with software-defined intelligence — delivering application-aware routing, zero-trust access and cloud-optimised connectivity.",
    items: ["SD-WAN design & multi-vendor deployment", "Zero-trust network access (ZTNA)", "Cloud on-ramp & SaaS optimisation", "Unified threat management integration", "Centralised orchestration & policy management", "WAN performance analytics & reporting"],
    pct: 92,
  },
  {
    num: "04", badge: "5G & IoT",
    title: "Private 5G & IoT Connectivity",
    desc: "Deploy private 5G networks and IoT connectivity layers for smart campuses, industrial facilities and critical infrastructure.",
    items: ["Private 5G NR campus network design", "NB-IoT & LTE-M sensor connectivity", "LoRaWAN gateway deployment & management", "Asset tracking & location services", "IoT gateway & edge node deployment", "SIM management & connectivity platform"],
    pct: 88,
  },
  {
    num: "05", badge: "Smart BMS",
    title: "Smart Buildings & BMS",
    desc: "Transform facilities into intelligent buildings — integrating building management, energy optimisation and occupancy analytics.",
    items: ["BACnet/Modbus BMS integration", "HVAC & energy management systems", "Smart lighting & occupancy control", "Access control & visitor management", "Digital twin building model", "Energy consumption analytics & reporting"],
    pct: 90,
  },
  {
    num: "06", badge: "C2 Centers",
    title: "Command & Control Centers",
    desc: "Design and build world-class NOC, SOC and command centres — integrating video walls, PSIM and unified situational awareness.",
    items: ["NOC/SOC physical design & build", "Video wall & display system integration", "PSIM platform integration", "Multi-source alarm correlation", "Dispatcher workstation & ergonomics design", "24/7 operations process design"],
    pct: 94,
  },
  {
    num: "07", badge: "Hybrid Cloud",
    title: "Hybrid Cloud & DC Connectivity",
    desc: "Connect your data centres, cloud regions and branch offices with carrier-grade, resilient interconnects.",
    items: ["MPLS & leased line circuit management", "Dark fiber & wavelength services", "Cloud direct connect (AWS/Azure/STC)", "Colocation cross-connect management", "BGP peering & internet exchange connectivity", "Network redundancy & failover design"],
    pct: 93,
  },
  {
    num: "08", badge: "Managed NOC",
    title: "Managed Connectivity & NOC",
    desc: "Hand over the complexity of network operations to our 24/7 NOC — with SLA-backed response, proactive monitoring and full transparency.",
    items: ["24/7 network monitoring & alerting", "Incident management & SLA-backed response", "Configuration & change management", "Capacity trend analysis & planning", "Monthly performance reporting", "Vendor & carrier management on your behalf"],
    pct: 96,
  },
];

export default function SmartInfrastructurePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />
      <PageWrapper>

        {/* HERO */}
        <section className="relative min-h-[92vh] flex flex-col justify-end overflow-x-hidden overflow-y-visible bg-white pt-20">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.06) 1px,transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%,black 30%,transparent 80%)" }} />
          <div className="absolute pointer-events-none" style={{ top: "-5%", left: "50%", transform: "translateX(-50%)", width: "860px", height: "500px", background: "radial-gradient(ellipse at center,rgba(34,147,136,0.09) 0%,transparent 65%)" }} />
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 1440 860" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Network topology hint */}
              <circle cx="200" cy="220" r="8" fill="rgba(34,147,136,0.3)"/>
              <circle cx="380" cy="140" r="6" fill="rgba(34,147,136,0.25)"/>
              <circle cx="340" cy="340" r="6" fill="rgba(34,147,136,0.25)"/>
              <circle cx="520" cy="240" r="7" fill="rgba(34,147,136,0.3)"/>
              <line x1="200" y1="220" x2="380" y2="140" stroke="rgba(34,147,136,0.12)" strokeWidth="1.5"/>
              <line x1="200" y1="220" x2="340" y2="340" stroke="rgba(34,147,136,0.12)" strokeWidth="1.5"/>
              <line x1="380" y1="140" x2="520" y2="240" stroke="rgba(34,147,136,0.12)" strokeWidth="1.5"/>
              <line x1="340" y1="340" x2="520" y2="240" stroke="rgba(34,147,136,0.12)" strokeWidth="1.5"/>
              <line x1="1240" y1="580" x2="1060" y2="500" stroke="rgba(34,147,136,0.1)" strokeWidth="1.5" strokeDasharray="5 3"/>
              <line x1="1060" y1="500" x2="1100" y2="700" stroke="rgba(34,147,136,0.1)" strokeWidth="1.5" strokeDasharray="5 3"/>
              <circle cx="1240" cy="580" r="5" fill="rgba(34,147,136,0.4)"/>
              <circle cx="1060" cy="500" r="5" fill="rgba(34,147,136,0.4)"/>
            </svg>
          </div>

          <div className="container relative z-[115] mx-auto overflow-visible px-6 md:px-8 pb-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Service</span>
            </div>
            <h2 className="font-bold text-foreground mb-7" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.02em", color: "#111827" }}>
              Smart Infrastructure & Connectivity
            </h2>
            <h1 className="font-bold leading-[0.95] tracking-tight mb-10" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(52px,8vw,96px)", color: "#111827", letterSpacing: "-0.03em" }}>
              Networks That<br />
              <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Never</span>
              <br />Sleep.
            </h1>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="text-[17px] text-[#64748b] leading-[1.75] max-w-[420px] font-light">
                Lumeron designs, builds and operates the connectivity backbone of Saudi Arabia's digital transformation — from fiber OSP and private 5G to SD-WAN, smart buildings and 24/7 managed NOC services.
              </p>
              <div className="flex gap-4 flex-shrink-0">
                <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px] px-8 py-3.5">Connect Now</button>
                <ServiceHeroOtherServices excludeHref="/services/smart-infrastructure" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2 z-10">
            <div className="w-px h-14" style={{ background: "linear-gradient(to bottom,#229388,transparent)", animation: "pulse 2s ease-in-out infinite" }} />
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#94a3b8]" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-white py-32">
          <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">About This Service</span>
              </div>
              <h2 className="font-bold leading-tight mb-8" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,48px)", color: "#111827", letterSpacing: "-0.025em" }}>
                The connectivity backbone of Saudi Vision 2030
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-6">
                From subsea fiber landing stations to the last metre of structured cabling inside a smart building — Lumeron delivers every layer of the connectivity stack as a single, accountable partner.
              </p>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                Our BICSI-certified engineers and 24/7 NOC team ensure your networks are always available, always secure and always optimised — backed by SLA commitments that match your business criticality.
              </p>
              <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px]">Start a Conversation</button>
            </div>
            {/* Network topology SVG */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0fdfc 0%,#f8fafc 100%)", aspectRatio: "4/3" }}>
                <svg viewBox="0 0 400 320" fill="none" className="w-4/5 h-4/5">
                  <style>{`
                    @keyframes packet-travel { 0%{stroke-dashoffset:80} 100%{stroke-dashoffset:0} }
                    @keyframes node-glow { 0%,100%{r:9;opacity:1} 50%{r:11;opacity:0.6} }
                    .topo-edge { stroke-dasharray:10 5; animation: packet-travel 2s linear infinite; }
                    .topo-node { animation: node-glow 2.2s ease-in-out infinite; }
                  `}</style>

                  {/* Core router */}
                  <rect x="165" y="130" width="70" height="50" rx="6" fill="white" stroke="#229388" strokeWidth="1.5"/>
                  <text x="200" y="150" textAnchor="middle" fontSize="7.5" fill="#229388" fontWeight="700">CORE</text>
                  <text x="200" y="163" textAnchor="middle" fontSize="7" fill="#64748b">ROUTER</text>
                  <circle cx="200" cy="173" r="4" fill="#229388">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/>
                  </circle>

                  {/* Distribution nodes */}
                  {[
                    { x: 70,  y: 80,  label: "DIST A" },
                    { x: 300, y: 80,  label: "DIST B" },
                    { x: 70,  y: 220, label: "DIST C" },
                    { x: 300, y: 220, label: "DIST D" },
                  ].map(({ x, y, label }) => (
                    <g key={label}>
                      <rect x={x - 28} y={y - 18} width="56" height="36" rx="4" fill="white" stroke="rgba(34,147,136,0.4)" strokeWidth="1"/>
                      <text x={x} y={y - 4} textAnchor="middle" fontSize="7" fill="#229388" fontWeight="700">{label}</text>
                      <circle cx={x} cy={y + 8} r="4" fill="rgba(34,147,136,0.6)" className="topo-node" style={{animationDelay:`${x/100}s`}}/>
                      {/* Link to core */}
                      <line x1={x < 200 ? x + 28 : x - 28} y1={y + 0} x2={x < 200 ? 165 : 235} y2={y < 155 ? 140 : 170} stroke="rgba(34,147,136,0.4)" strokeWidth="1.5" className="topo-edge" style={{animationDelay:`${y/200}s`}}/>
                    </g>
                  ))}

                  {/* Access layer nodes */}
                  {[
                    { x: 30,  y: 40,  parent: { x: 70, y: 80 }  },
                    { x: 90,  y: 30,  parent: { x: 70, y: 80 }  },
                    { x: 340, y: 40,  parent: { x: 300, y: 80 } },
                    { x: 360, y: 110, parent: { x: 300, y: 80 } },
                    { x: 30,  y: 270, parent: { x: 70, y: 220 } },
                    { x: 90,  y: 295, parent: { x: 70, y: 220 } },
                    { x: 340, y: 270, parent: { x: 300, y: 220 }},
                    { x: 360, y: 210, parent: { x: 300, y: 220 }},
                  ].map(({ x, y, parent }, i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="7" fill="white" stroke="rgba(34,147,136,0.3)" strokeWidth="1"/>
                      <circle cx={x} cy={y} r="3" fill="#3ec8ba" opacity="0.8"/>
                      <line x1={x} y1={y} x2={parent.x} y2={parent.y} stroke="rgba(62,200,186,0.3)" strokeWidth="1" strokeDasharray="4 3" className="topo-edge" style={{animationDelay:`${i*0.15}s`}}/>
                    </g>
                  ))}

                  {/* Internet cloud */}
                  <ellipse cx="200" cy="40" rx="45" ry="22" fill="rgba(34,147,136,0.06)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                  <text x="200" y="38" textAnchor="middle" fontSize="7.5" fill="#229388" fontWeight="700">INTERNET</text>
                  <text x="200" y="50" textAnchor="middle" fontSize="6.5" fill="#94a3b8">/ MPLS WAN</text>
                  <line x1="200" y1="62" x2="200" y2="130" stroke="rgba(34,147,136,0.4)" strokeWidth="1.5" className="topo-edge"/>

                  {/* Label */}
                  <rect x="10" y="290" width="160" height="22" rx="4" fill="rgba(34,147,136,0.08)"/>
                  <text x="90" y="305" textAnchor="middle" fontSize="8" fill="#229388" fontWeight="700" letterSpacing="0.5">NETWORK TOPOLOGY — LIVE</text>
                  <circle cx="20" cy="301" r="4" fill="#229388">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                <div className="absolute -bottom-4 -left-4 text-white rounded-xl px-5 py-4 shadow-lg" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                  <div className="font-bold text-2xl leading-none" style={{ fontFamily: '"Avenir Next Arabic",sans-serif' }}>99.99%</div>
                  <div className="text-[11px] mt-1 opacity-90 tracking-wide">Uptime SLA</div>
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
                  Eight connectivity & infrastructure capabilities
                </h2>
              </div>
              <p className="text-[15px] text-[#64748b] leading-[1.7] max-w-[360px] font-light">
                From the physical fiber in the ground to the cloud-managed WAN — every layer delivered by one expert team.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div key={s.num} className="group flex gap-5 items-start bg-white rounded-xl p-7 border border-[#e2e8f0] hover:border-[#229388]/40 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", color: "white", fontFamily: '"Avenir Next Arabic","Inter",sans-serif', boxShadow: "0 4px 12px rgba(34,147,136,0.25)" }}>
                      {i + 1}
                    </div>
                    {i < services.length - 1 && <div className="w-px flex-1 mt-2 min-h-[20px]" style={{ background: "linear-gradient(to bottom,rgba(34,147,136,0.3),transparent)" }} />}
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
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `100%`, background: "linear-gradient(90deg,#229388,#3ec8ba)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NOC OPERATIONS */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Our Operations</span>
              </div>
              <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                Always-on NOC watching every packet
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                Our 24/7 Network Operations Centre provides full-spectrum monitoring, incident response and capacity management — giving you enterprise-grade visibility without the overhead of building it yourself.
              </p>
              <ul className="flex flex-col divide-y divide-[#e2e8f0]">
                {[
                  "Full-stack observability (L1 through L7)",
                  "15-minute mean time to respond (MTTR) SLA",
                  "Automated incident ticket creation & escalation",
                  "Monthly SLA reporting & trend analysis",
                  "Proactive capacity & congestion alerting",
                  "BICSI RCDD-certified design engineers",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 text-[14px] text-[#111827] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#229388] flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* NOC Dashboard SVG */}
            <div className="rounded-2xl border border-[#e2e8f0] shadow-lg relative overflow-hidden" style={{ aspectRatio: "1", background: "linear-gradient(150deg,#f0fdfc 0%,#f8fafc 60%,#edfaf9 100%)" }}>
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.04) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
              <svg viewBox="0 0 360 360" fill="none" className="w-full h-full relative z-10">
                <style>{`
                  @keyframes sweep { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
                  @keyframes blink-alert { 0%,100%{opacity:1} 50%{opacity:0.2} }
                  .sweep-line { animation: sweep 3s linear infinite; }
                  .alert-dot { animation: blink-alert 1s ease-in-out infinite; }
                `}</style>
                <rect x="20" y="20" width="320" height="320" rx="8" fill="white" fillOpacity="0.7" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <rect x="20" y="20" width="320" height="32" rx="7" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <circle cx="38" cy="36" r="5" fill="#229388" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.2s" repeatCount="indefinite"/>
                </circle>
                <text x="190" y="40" textAnchor="middle" fontSize="9" fill="#229388" fontWeight="700" letterSpacing="1">NOC LIVE DASHBOARD</text>

                {/* Mini network map */}
                <rect x="36" y="62" width="190" height="120" rx="4" fill="rgba(34,147,136,0.04)" stroke="rgba(34,147,136,0.15)" strokeWidth="1"/>
                <text x="131" y="76" textAnchor="middle" fontSize="7" fill="#229388" fontWeight="700">NETWORK MAP</text>
                {/* Nodes on mini map */}
                {[[80,100],[131,90],[181,105],[90,145],[160,150]].map(([x,y],i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="6" fill="white" stroke="rgba(34,147,136,0.4)" strokeWidth="1"/>
                    <circle cx={x} cy={y} r="3" fill="#229388" opacity="0.7"/>
                  </g>
                ))}
                {[[80,100,131,90],[131,90,181,105],[80,100,90,145],[131,90,160,150],[181,105,160,150]].map(([x1,y1,x2,y2],i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(34,147,136,0.3)" strokeWidth="1" strokeDasharray="3 2" className="sweep-line" style={{animationDelay:`${i*0.4}s`}}/>
                ))}

                {/* Alert feed */}
                <rect x="236" y="62" width="88" height="120" rx="4" fill="rgba(34,147,136,0.04)" stroke="rgba(34,147,136,0.15)" strokeWidth="1"/>
                <text x="280" y="76" textAnchor="middle" fontSize="7" fill="#229388" fontWeight="700">ALERTS</text>
                {[
                  { y: 88,  color: "#22c55e", msg: "Site A — OK" },
                  { y: 104, color: "#22c55e", msg: "Site B — OK" },
                  { y: 120, color: "#f59e0b", msg: "Site C — Warn" },
                  { y: 136, color: "#22c55e", msg: "Site D — OK" },
                  { y: 152, color: "#ef4444", msg: "Link 3 — DOWN" },
                  { y: 168, color: "#22c55e", msg: "NOC — Online" },
                ].map(({ y, color, msg }) => (
                  <g key={y}>
                    <circle cx="248" cy={y} r="4" fill={color} className={color === "#ef4444" ? "alert-dot" : ""}/>
                    <text x="258" y={y + 4} fontSize="6.5" fill="#374151">{msg}</text>
                  </g>
                ))}

                {/* Uptime bars */}
                <text x="36" y="200" fontSize="7.5" fill="#229388" fontWeight="700">UPTIME — LAST 30 DAYS</text>
                {Array.from({length: 30}, (_,i) => (
                  <rect key={i} x={36 + i*9} y={i === 12 ? 210 : 206} width="7" height={i === 12 ? 24 : 28} rx="1" fill={i === 12 ? "#f59e0b" : "#229388"} opacity="0.7"/>
                ))}
                <text x="36" y="244" fontSize="7" fill="#94a3b8">99.99% average uptime</text>

                {/* KPI row */}
                {[["MTTR","12 min",60],["Incidents","3",160],["Open Tx","0",260]].map(([l,v,x]) => (
                  <g key={String(l)}>
                    <rect x={Number(x)-30} y="255" width="60" height="40" rx="4" fill="white" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                    <text x={Number(x)} y="271" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">{l}</text>
                    <text x={Number(x)} y="286" textAnchor="middle" fontSize="11" fill="#229388" fontWeight="700">{v}</text>
                  </g>
                ))}

                <rect x="20" y="312" width="320" height="28" rx="0" fill="rgba(34,147,136,0.08)"/>
                <text x="180" y="330" textAnchor="middle" fontSize="8.5" fill="#229388" fontWeight="700" letterSpacing="0.8">LIVE · 40+ SITES · 24/7 · SLA 99.99%</text>
              </svg>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}>
          <h2 className="font-bold text-white leading-tight max-w-xl" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(24px,3vw,42px)", letterSpacing: "-0.025em" }}>
            Ready to build a network that never stops?
          </h2>
          <button onClick={() => setModalOpen(true)} className="flex-shrink-0 bg-white font-semibold text-[13px] tracking-[0.08em] uppercase px-10 py-4 rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md" style={{ color: "#229388" }}>
            Connect Now
          </button>
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
}
