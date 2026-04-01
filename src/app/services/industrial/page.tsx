"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";

const stats = [
  { num: "8", unit: "", label: "Service lines" },
  { num: "50", unit: "+", label: "OEM integrations" },
  { num: "99.7", unit: "%", label: "Uptime SLA" },
  { num: "15", unit: "+", label: "Active plants" },
];

const services = [
  {
    num: "01", badge: "Automation",
    title: "Robotics & Smart Automation",
    desc: "End-to-end robotic integration — from collaborative robots on the assembly line to fully automated material handling systems.",
    items: ["KUKA, ABB & Fanuc robot integration", "Collaborative robot (cobot) deployment", "PLC/SCADA programming & commissioning", "Automated guided vehicles (AGV/AMR)", "Vision-guided pick-and-place systems", "Safety risk assessment & CE marking"],
    pct: 96,
  },
  {
    num: "02", badge: "Process Eng.",
    title: "Data-based Process Reengineering",
    desc: "Transform operational data into measurable efficiency gains through OEE analysis, bottleneck elimination and KPI-driven management.",
    items: ["Overall Equipment Effectiveness (OEE) dashboards", "Bottleneck identification & root cause analysis", "Production KPI framework design", "Value stream mapping & digital workflows", "Real-time MES data visualisation", "Continuous improvement (Kaizen) support"],
    pct: 92,
  },
  {
    num: "03", badge: "Integration",
    title: "Digital Integration with OEMs",
    desc: "Seamlessly bridge enterprise systems with shop-floor equipment — enabling real-time data exchange across your entire value chain.",
    items: ["SAP & Oracle MES connector development", "REST/GraphQL API gateway design", "ERP-to-machine real-time data sync", "EDI & B2B partner integration", "Legacy system modernisation adapters", "Integration testing & SLA management"],
    pct: 94,
  },
  {
    num: "04", badge: "IIoT",
    title: "IIoT Platforms",
    desc: "Deploy scalable Industrial IoT infrastructure — from edge nodes on the plant floor to cloud-based analytics and alerting.",
    items: ["Edge computing node deployment", "MQTT & OPC-UA protocol implementation", "Real-time asset tracking & monitoring", "Sensor fusion & data normalisation", "Cloud IIoT platform integration (AWS/Azure)", "Predictive alert rule engine configuration"],
    pct: 90,
  },
  {
    num: "05", badge: "Modernisation",
    title: "SCADA/DCS Modernisation",
    desc: "Upgrade aging control infrastructure with minimal production disruption — migrating to modern HMIs, historians and open architectures.",
    items: ["Legacy SCADA/DCS migration planning", "Historian integration (OSIsoft PI, Ignition)", "HMI refresh & operator interface redesign", "Cybersecurity hardening of OT networks", "Phased cutover with zero-downtime strategy", "Post-migration performance validation"],
    pct: 88,
  },
  {
    num: "06", badge: "Digital Twin",
    title: "Digital Twin Solutions",
    desc: "Create living digital replicas of your plant assets to simulate scenarios, optimise operations and de-risk capital decisions.",
    items: ["3D plant model development", "Physics-based process simulation", "Predictive scenario planning & what-if analysis", "Asset lifecycle monitoring integration", "Energy consumption optimisation modelling", "Training simulators for operators"],
    pct: 85,
  },
  {
    num: "07", badge: "Predictive AI",
    title: "Predictive Maintenance Systems",
    desc: "Move from reactive to predictive maintenance using ML models trained on your equipment's real operational data.",
    items: ["ML-driven failure prediction models", "Vibration, temperature & current sensor fusion", "CMMS integration (SAP PM, Maximo)", "Remaining useful life (RUL) estimation", "Automated work order generation", "Maintenance KPI & downtime dashboards"],
    pct: 93,
  },
  {
    num: "08", badge: "AR/XR",
    title: "Augmented Reality",
    desc: "Overlay digital guidance onto the physical world — accelerating maintenance, reducing errors and enabling remote expert support.",
    items: ["AR-guided maintenance & inspection workflows", "Remote expert overlay (HoloLens, RealWear)", "Step-by-step AR work instruction authoring", "Digital twin AR visualisation", "XR-based operator training simulations", "Integration with EAM/CMMS systems"],
    pct: 82,
  },
];

const specs = [
  { name: "Cybersecurity Standard", val: "IEC 62443" },
  { name: "Asset Management", val: "ISO 55001" },
  { name: "Comm. Protocols", val: "OPC-UA / MQTT" },
  { name: "Robotics Brands", val: "KUKA · ABB · Fanuc" },
  { name: "Control Systems", val: "Siemens · Rockwell · ABB" },
  { name: "IIoT Platforms", val: "Azure IoT · AWS IoT" },
  { name: "ERP Integration", val: "SAP · Oracle · Infor" },
  { name: "Compliance", val: "NIST SP 800-82" },
];

export default function IndustrialPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />
      <PageWrapper>

        {/* HERO */}
        <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-white pt-20">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.06) 1px,transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%,black 30%,transparent 80%)" }} />
          <div className="absolute pointer-events-none" style={{ top: "-5%", left: "50%", transform: "translateX(-50%)", width: "860px", height: "500px", background: "radial-gradient(ellipse at center,rgba(34,147,136,0.09) 0%,transparent 65%)" }} />
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 1440 860" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <circle cx="180" cy="200" r="60" stroke="rgba(34,147,136,0.12)" strokeWidth="1.5" fill="none"/>
              <circle cx="180" cy="200" r="40" stroke="rgba(34,147,136,0.1)" strokeWidth="1" fill="none"/>
              <circle cx="180" cy="200" r="20" stroke="rgba(34,147,136,0.15)" strokeWidth="1" fill="none"/>
              <circle cx="1260" cy="660" r="80" stroke="rgba(34,147,136,0.1)" strokeWidth="1.5" fill="none"/>
              <circle cx="1260" cy="660" r="50" stroke="rgba(34,147,136,0.08)" strokeWidth="1" fill="none"/>
              <line x1="240" y1="200" x2="420" y2="200" stroke="rgba(34,147,136,0.12)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="1180" y1="660" x2="980" y2="660" stroke="rgba(34,147,136,0.12)" strokeWidth="1" strokeDasharray="4 3"/>
              <circle cx="420" cy="200" r="5" fill="rgba(34,147,136,0.5)"/>
              <circle cx="980" cy="660" r="5" fill="rgba(34,147,136,0.5)"/>
            </svg>
          </div>

          <div className="container mx-auto px-6 md:px-8 pb-20 relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Service</span>
            </div>
            <h2 className="font-bold text-foreground mb-7" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.02em", color: "#111827" }}>
              Industrial Digitalization (Industry 4.0)
            </h2>
            <h1 className="font-bold leading-[0.95] tracking-tight mb-10" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(52px,8vw,96px)", color: "#111827", letterSpacing: "-0.03em" }}>
              Industry 4.0<br />
              <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Engineered</span>
              <br />for KSA.
            </h1>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="text-[17px] text-[#64748b] leading-[1.75] max-w-[420px] font-light">
                Lumeron transforms Saudi industrial facilities into smart, data-driven operations — integrating robotics, IIoT, digital twins and predictive intelligence under one accountable partner.
              </p>
              <div className="flex gap-4 flex-shrink-0">
                <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px] px-8 py-3.5">Connect Now</button>
                <a href="#services" className="btn-outline text-[14px] px-8 py-3.5">Our Services</a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2 z-10">
            <div className="w-px h-14" style={{ background: "linear-gradient(to bottom,#229388,transparent)", animation: "pulse 2s ease-in-out infinite" }} />
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
                Full-spectrum industrial digitalization
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-6">
                From robotics integration and SCADA modernisation to IIoT platforms and AI-driven predictive maintenance — Lumeron delivers end-to-end Industry 4.0 transformation for Saudi manufacturing and process industries.
              </p>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                Our engineering teams bring deep domain expertise across discrete manufacturing, oil & gas, utilities and petrochemicals — aligning every deployment to IEC 62443 cybersecurity standards and Vision 2030 industrial localisation objectives.
              </p>
              <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px]">Start a Conversation</button>
            </div>
            {/* Factory floor / gear SVG illustration */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0fdfc 0%,#f8fafc 100%)", aspectRatio: "4/3" }}>
                <svg viewBox="0 0 400 320" fill="none" className="w-4/5 h-4/5">
                  <style>{`
                    @keyframes flow { 0%{stroke-dashoffset:80} 100%{stroke-dashoffset:0} }
                    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
                    .data-flow { animation: flow 2s linear infinite; }
                    .status-dot { animation: blink 1.4s ease-in-out infinite; }
                  `}</style>

                  {/* Background grid */}
                  <rect width="400" height="320" fill="rgba(34,147,136,0.02)" rx="8"/>
                  <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(34,147,136,0.06)" strokeWidth="0.5"/>
                  <line x1="0" y1="160" x2="400" y2="160" stroke="rgba(34,147,136,0.06)" strokeWidth="0.5"/>
                  <line x1="0" y1="240" x2="400" y2="240" stroke="rgba(34,147,136,0.06)" strokeWidth="0.5"/>
                  <line x1="100" y1="0" x2="100" y2="320" stroke="rgba(34,147,136,0.06)" strokeWidth="0.5"/>
                  <line x1="200" y1="0" x2="200" y2="320" stroke="rgba(34,147,136,0.06)" strokeWidth="0.5"/>
                  <line x1="300" y1="0" x2="300" y2="320" stroke="rgba(34,147,136,0.06)" strokeWidth="0.5"/>

                  {/* Large gear A */}
                  <g>
                    <animateTransform attributeName="transform" type="rotate" from="0 80 160" to="360 80 160" dur="8s" repeatCount="indefinite" />
                    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a) => {
                      const r = a * Math.PI / 180;
                      const x1 = 80 + 48 * Math.cos(r); const y1 = 160 + 48 * Math.sin(r);
                      const x2 = 80 + 58 * Math.cos(r); const y2 = 160 + 58 * Math.sin(r);
                      return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#229388" strokeWidth="7" strokeLinecap="round" opacity="0.8"/>;
                    })}
                    <circle cx="80" cy="160" r="44" fill="white" stroke="#229388" strokeWidth="2" opacity="0.9"/>
                    <circle cx="80" cy="160" r="28" fill="rgba(34,147,136,0.08)" stroke="#3ec8ba" strokeWidth="1.5"/>
                    <circle cx="80" cy="160" r="10" fill="#229388" opacity="0.7"/>
                  </g>

                  {/* Medium gear B */}
                  <g>
                    <animateTransform attributeName="transform" type="rotate" from="0 160 160" to="-360 160 160" dur="5.3s" repeatCount="indefinite" />
                    {[0,45,90,135,180,225,270,315].map((a) => {
                      const r = a * Math.PI / 180;
                      const x1 = 160 + 32 * Math.cos(r); const y1 = 160 + 32 * Math.sin(r);
                      const x2 = 160 + 40 * Math.cos(r); const y2 = 160 + 40 * Math.sin(r);
                      return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3ec8ba" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>;
                    })}
                    <circle cx="160" cy="160" r="28" fill="white" stroke="#3ec8ba" strokeWidth="2" opacity="0.9"/>
                    <circle cx="160" cy="160" r="16" fill="rgba(62,200,186,0.1)" stroke="#3ec8ba" strokeWidth="1"/>
                    <circle cx="160" cy="160" r="6" fill="#3ec8ba" opacity="0.7"/>
                  </g>

                  {/* Small gear C */}
                  <g>
                    <animateTransform attributeName="transform" type="rotate" from="0 222 120" to="360 222 120" dur="4s" repeatCount="indefinite" />
                    {[0,60,120,180,240,300].map((a) => {
                      const r = a * Math.PI / 180;
                      const x1 = 222 + 22 * Math.cos(r); const y1 = 120 + 22 * Math.sin(r);
                      const x2 = 222 + 28 * Math.cos(r); const y2 = 120 + 28 * Math.sin(r);
                      return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#229388" strokeWidth="5" strokeLinecap="round" opacity="0.7"/>;
                    })}
                    <circle cx="222" cy="120" r="18" fill="white" stroke="#229388" strokeWidth="1.5" opacity="0.9"/>
                    <circle cx="222" cy="120" r="7" fill="rgba(34,147,136,0.15)"/>
                  </g>

                  {/* Data flow lines */}
                  <path d="M 240 160 Q 290 140 320 160" stroke="rgba(34,147,136,0.3)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" className="data-flow"/>
                  <path d="M 240 200 Q 290 220 340 200" stroke="rgba(62,200,186,0.3)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" className="data-flow" style={{animationDelay:"0.5s"}}/>
                  <path d="M 80 220 Q 80 260 140 270" stroke="rgba(34,147,136,0.2)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" className="data-flow" style={{animationDelay:"1s"}}/>

                  {/* IIoT nodes */}
                  {[[310,155],[340,195],[370,160],[310,230]].map(([x,y],i) => (
                    <g key={i}>
                      <rect x={x-12} y={y-10} width="24" height="20" rx="3" fill="white" stroke="rgba(34,147,136,0.3)" strokeWidth="1"/>
                      <circle cx={x+8} cy={y-6} r="3" fill="#229388" className="status-dot" style={{animationDelay:`${i*0.3}s`}}/>
                    </g>
                  ))}

                  {/* Robot arm schematic */}
                  <line x1="140" y1="270" x2="160" y2="240" stroke="rgba(34,147,136,0.4)" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="160" y1="240" x2="190" y2="255" stroke="rgba(34,147,136,0.4)" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="140" cy="270" r="5" fill="#229388" opacity="0.6"/>
                  <circle cx="160" cy="240" r="4" fill="#3ec8ba" opacity="0.7"/>
                  <circle cx="190" cy="255" r="4" fill="#229388" opacity="0.6"/>

                  {/* Label */}
                  <rect x="10" y="10" width="140" height="22" rx="4" fill="rgba(34,147,136,0.08)"/>
                  <text x="80" y="25" textAnchor="middle" fontSize="8.5" fill="#229388" fontWeight="700" letterSpacing="0.8">SMART FACTORY — LIVE</text>
                  <circle cx="20" cy="21" r="4" fill="#229388" className="status-dot"/>
                </svg>
                <div className="absolute -bottom-4 -left-4 text-white rounded-xl px-5 py-4 shadow-lg" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                  <div className="font-bold text-2xl leading-none" style={{ fontFamily: '"Avenir Next Arabic",sans-serif' }}>4.0</div>
                  <div className="text-[11px] mt-1 opacity-90 tracking-wide">Industry Ready</div>
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
                  Eight pillars of industrial transformation
                </h2>
              </div>
              <p className="text-[15px] text-[#64748b] leading-[1.7] max-w-[360px] font-light">
                A single accountable partner covering the full Industry 4.0 stack — from shop-floor automation to enterprise intelligence.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div key={s.num} className="group flex gap-5 items-start bg-white rounded-xl p-7 border border-[#e2e8f0] hover:border-[#229388]/40 hover:shadow-md transition-all duration-300 relative overflow-hidden">
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

        {/* HOW WE OPERATE */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Our Methodology</span>
              </div>
              <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                Connected intelligence from sensor to boardroom
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                Our IIoT methodology creates a unified data fabric — connecting every sensor, machine and system into a single operational intelligence layer that feeds real-time dashboards, AI models and ERP systems simultaneously.
              </p>
              <ul className="flex flex-col divide-y divide-[#e2e8f0]">
                {[
                  "IEC 62443 OT/IT security-by-design",
                  "Zero-downtime migration & phased cutover",
                  "Multi-vendor protocol normalisation",
                  "Edge-to-cloud data pipeline architecture",
                  "Saudi Aramco SAEP compliance-ready",
                  "Localisation & knowledge transfer programs",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 text-[14px] text-[#111827] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#229388] flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* IIoT Dashboard SVG */}
            <div className="rounded-2xl border border-[#e2e8f0] shadow-lg relative overflow-hidden" style={{ aspectRatio: "1", background: "linear-gradient(150deg,#f0fdfc 0%,#f8fafc 60%,#edfaf9 100%)" }}>
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.04) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
              <svg viewBox="0 0 360 360" fill="none" className="w-full h-full relative z-10">
                <style>{`
                  @keyframes pulse-node { 0%,100%{r:5;opacity:0.9} 50%{r:7;opacity:0.5} }
                  @keyframes travel { 0%{stroke-dashoffset:100} 100%{stroke-dashoffset:0} }
                  .node-pulse { animation: pulse-node 1.8s ease-in-out infinite; }
                  .packet { animation: travel 3s linear infinite; }
                `}</style>
                <rect x="20" y="20" width="320" height="320" rx="8" fill="white" fillOpacity="0.7" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <rect x="20" y="20" width="320" height="32" rx="7" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <circle cx="38" cy="36" r="5" fill="#229388" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.2s" repeatCount="indefinite"/>
                </circle>
                <text x="190" y="40" textAnchor="middle" fontSize="9" fill="#229388" fontWeight="700" letterSpacing="1">IIoT OPERATIONS DASHBOARD</text>

                {/* Sensor nodes */}
                {[
                  [60,90,"Temp"],[140,90,"Vib."],[220,90,"Press."],[300,90,"Flow"],
                  [60,170,"Motor A"],[140,170,"Motor B"],[220,170,"Pump 1"],[300,170,"Pump 2"],
                ].map(([x,y,lbl],i) => (
                  <g key={i}>
                    <rect x={Number(x)-22} y={Number(y)-18} width="44" height="36" rx="4" fill="white" stroke="rgba(34,147,136,0.25)" strokeWidth="1"/>
                    <text x={Number(x)} y={Number(y)-4} textAnchor="middle" fontSize="7" fill="#64748b" fontWeight="600">{lbl}</text>
                    <circle cx={Number(x)} cy={Number(y)+10} r="5" fill="#229388" className="node-pulse" style={{animationDelay:`${i*0.22}s`}}/>
                    <line x1={Number(x)} y1={Number(y)+18} x2={Number(x)} y2="230" stroke="rgba(34,147,136,0.15)" strokeWidth="1" strokeDasharray="3 2" className="packet" style={{animationDelay:`${i*0.3}s`}}/>
                  </g>
                ))}

                {/* Aggregation bus */}
                <rect x="36" y="230" width="288" height="20" rx="4" fill="rgba(34,147,136,0.08)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <text x="180" y="244" textAnchor="middle" fontSize="8" fill="#229388" fontWeight="700" letterSpacing="0.8">EDGE AGGREGATION BUS</text>

                {/* KPI row */}
                {[["OEE","87%",60],["MTBF","312h",140],["Energy","−14%",220],["Alerts","3",300]].map(([lbl,val,x]) => (
                  <g key={String(lbl)}>
                    <rect x={Number(x)-28} y="260" width="56" height="40" rx="4" fill="white" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                    <text x={Number(x)} y="277" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">{lbl}</text>
                    <text x={Number(x)} y="292" textAnchor="middle" fontSize="11" fill="#229388" fontWeight="700">{val}</text>
                  </g>
                ))}

                <rect x="20" y="312" width="320" height="28" rx="0" fill="rgba(34,147,136,0.08)"/>
                <circle cx="38" cy="326" r="4" fill="#229388">
                  <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/>
                </circle>
                <text x="50" y="330" fontSize="8.5" fill="#229388" fontWeight="700" letterSpacing="0.8">LIVE · 8 SENSORS · IEC 62443 SECURED · OPC-UA</text>
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
                Standards & platforms we work with
              </h2>
              <p className="text-[15px] text-[#64748b] max-w-[440px] mx-auto leading-[1.7]">Every deployment is standards-compliant, vendor-neutral and built for long-term operational resilience.</p>
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

        {/* CTA */}
        <section className="py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}>
          <h2 className="font-bold text-white leading-tight max-w-xl" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(24px,3vw,42px)", letterSpacing: "-0.025em" }}>
            Ready to digitalize your industrial operations?
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
