"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import ServiceHeroOtherServices from "@/components/ui/service-hero-other-services";

const services = [
  { num: "01", title: "Managed IT Infrastructure", desc: "Full lifecycle management of servers, storage, and networking — from procurement and deployment through day-to-day operations." },
  { num: "02", title: "Cloud Management", desc: "Multi-cloud governance, cost optimization, capacity planning, and FinOps across AWS, Azure, Google Cloud, and local providers." },
  { num: "03", title: "End-User Computing", desc: "Device lifecycle, virtual desktop infrastructure (VDI), helpdesk, and remote workforce enablement at enterprise scale." },
  { num: "04", title: "Network Operations", desc: "Proactive monitoring, performance management, and optimization of WAN, SD-WAN, and campus network environments." },
  { num: "05", title: "Database Administration", desc: "DBA-as-a-service covering Oracle, SQL Server, PostgreSQL, and NoSQL platforms with backup, patching, and performance tuning." },
  { num: "06", title: "IT Service Management", desc: "ITIL-aligned ITSM practices — change management, CMDB, SLA reporting, and continuous service improvement programs." },
];

export default function ManagedServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />
      <PageWrapper>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-x-hidden overflow-y-visible bg-white pt-20">
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
            {/* Dashboard / grid decoration */}
            <rect x="100" y="120" width="200" height="120" rx="4" stroke="rgba(34,147,136,0.15)" strokeWidth="1" fill="none"/>
            <rect x="120" y="140" width="80" height="30" rx="2" stroke="rgba(34,147,136,0.2)" strokeWidth="1" fill="rgba(34,147,136,0.04)"/>
            <rect x="120" y="180" width="140" height="8" rx="1" fill="rgba(34,147,136,0.15)"/>
            <rect x="120" y="196" width="100" height="8" rx="1" fill="rgba(34,147,136,0.1)"/>
            <rect x="1140" y="120" width="200" height="120" rx="4" stroke="rgba(34,147,136,0.15)" strokeWidth="1" fill="none"/>
            <rect x="1160" y="140" width="80" height="30" rx="2" stroke="rgba(34,147,136,0.2)" strokeWidth="1" fill="rgba(34,147,136,0.04)"/>
            <rect x="1160" y="180" width="140" height="8" rx="1" fill="rgba(34,147,136,0.15)"/>
            <rect x="1160" y="196" width="100" height="8" rx="1" fill="rgba(34,147,136,0.1)"/>
            <line x1="300" y1="180" x2="1140" y2="180" stroke="rgba(34,147,136,0.07)" strokeWidth="1" strokeDasharray="8 6"/>
          </svg>
        </div>

        <div className="container relative z-[115] mx-auto overflow-visible px-6 md:px-8 pb-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-[#229388]" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Service</span>
          </div>
          <h2 className="font-bold text-foreground mb-7" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.02em", color: "#111827" }}>
            Managed Services
          </h2>
          <h1
            className="font-bold leading-[0.95] tracking-tight mb-10"
            style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(52px,8vw,96px)", color: "#111827", letterSpacing: "-0.03em" }}
          >
            Operations,<br />
            <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Handled.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-[17px] text-[#64748b] leading-[1.75] max-w-[420px] font-light">
              Lumeron takes ownership of your technology operations so your team can focus on what matters — delivering value to your customers and advancing Vision 2030 objectives.
            </p>
            <div className="flex gap-4 flex-shrink-0">
              <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px] px-8 py-3.5">Connect Now</button>
              <ServiceHeroOtherServices excludeHref="/services/managed-services" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-14" style={{ background: "linear-gradient(to bottom, #229388, transparent)", animation: "pulse 2s ease-in-out infinite" }} />
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
              Your IT operations, in expert hands
            </h2>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-6">
              Running enterprise technology is a full-time responsibility — one that requires skilled people, robust tooling, and constant vigilance. Lumeron's managed services practice brings all three, delivered as a single predictable service.
            </p>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
              We integrate deeply with your team, learn your environment, and operate as an extension of your organization — not a vendor, but a partner with skin in the game.
            </p>
            <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px]">Start a Conversation</button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0fdfc 0%,#f8fafc 100%)", aspectRatio: "4/3" }}>
              {/* Dashboard illustration */}
              <svg viewBox="0 0 400 320" fill="none" className="w-4/5 h-4/5">
                <rect x="30" y="20" width="340" height="260" rx="6" fill="rgba(34,147,136,0.04)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                {/* Header bar */}
                <rect x="30" y="20" width="340" height="36" rx="6" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <circle cx="54" cy="38" r="6" fill="rgba(34,147,136,0.3)"/>
                <circle cx="72" cy="38" r="6" fill="rgba(34,147,136,0.2)"/>
                <circle cx="90" cy="38" r="6" fill="rgba(34,147,136,0.1)"/>
                {/* Metric cards */}
                {[[50, 72, "99.95", "%"], [160, 72, "< 4h", ""], [270, 72, "24/7", ""]].map(([x, y, val, u]) => (
                  <g key={String(x)}>
                    <rect x={Number(x)} y={Number(y)} width="90" height="56" rx="4" fill="white" stroke="rgba(34,147,136,0.18)" strokeWidth="1"/>
                    <text x={Number(x) + 45} y={Number(y) + 28} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#229388">{val}</text>
                    <text x={Number(x) + 45} y={Number(y) + 44} textAnchor="middle" fontSize="9" fill="#94a3b8">UPTIME</text>
                  </g>
                ))}
                {/* Chart area */}
                <rect x="50" y="148" width="300" height="100" rx="4" fill="rgba(34,147,136,0.04)" stroke="rgba(34,147,136,0.15)" strokeWidth="1"/>
                <polyline points="60,228 100,200 140,210 180,188 220,195 260,178 300,185 340,170" stroke="#229388" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M 60 228 L 100 200 L 140 210 L 180 188 L 220 195 L 260 178 L 300 185 L 340 170 L 340 248 L 60 248 Z" fill="rgba(34,147,136,0.06)"/>
              </svg>
              <div className="absolute -bottom-4 -left-4 text-white rounded-xl px-5 py-4 shadow-lg" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                <div className="font-bold text-2xl leading-none" style={{ fontFamily: '"Avenir Next Arabic",sans-serif' }}>ITIL</div>
                <div className="text-[11px] mt-1 opacity-90 tracking-wide">v4 Aligned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — two-column process layout with SLA badges and connector lines */}
      <section id="services" className="py-28 bg-[#f8fafc] border-y border-[#e2e8f0]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">What We Offer</span>
              </div>
              <h2 className="font-bold leading-tight" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em", maxWidth: "480px" }}>
                Comprehensive managed IT services
              </h2>
            </div>
          </div>

          {/* Two-column layout: left = vertical timeline, right = detail cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const slas = ["SLA Tier 1", "FinOps Ready", "ITIL v4", "SD-WAN", "DBA-as-a-Service", "ITSM Portal"];
              const pcts = [99, 94, 100, 98, 97, 96];
              return (
                <div key={s.num} className="group flex gap-5 items-start bg-white rounded-xl p-7 border border-[#e2e8f0] hover:border-[#229388]/40 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  {/* Left: step indicator with connector */}
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

                  {/* Right: content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-[16px] text-[#111827] leading-snug" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{s.title}</h3>
                      {/* SLA badge */}
                      <span className="flex-shrink-0 text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded-md whitespace-nowrap" style={{ background: "rgba(34,147,136,0.08)", color: "#229388", border: "1px solid rgba(34,147,136,0.2)" }}>{slas[i]}</span>
                    </div>
                    <p className="text-[13px] text-[#64748b] leading-[1.75] font-light mb-4">{s.desc}</p>
                    {/* Mini progress bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 rounded-full bg-[#e2e8f0] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pcts[i]}%`, background: "linear-gradient(90deg,#229388,#3ec8ba)" }} />
                      </div>
                      <span className="text-[11px] font-semibold text-[#229388] flex-shrink-0">{pcts[i]}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPERATIONS */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-24 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Operations Model</span>
            </div>
            <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              Proactive by design, responsive when it counts
            </h2>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
              Our operations model prioritizes prevention over reaction — using AIOps-driven monitoring to identify and resolve issues before they impact your business, with contractual SLA accountability at every layer.
            </p>
            <ul className="flex flex-col divide-y divide-[#e2e8f0]">
              {["ITIL v4 service management framework","AIOps-powered monitoring & alerting","Three-tier escalation model","Monthly service review meetings","Transparent SLA reporting portal","Saudi-based operations teams"].map((item) => (
                <li key={item} className="flex items-center gap-4 py-4 text-[14px] text-[#111827] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#229388] flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          {/* Managed Services: live NOC dashboard with sparkline, uptime grid, alert feed */}
          <div className="rounded-2xl border border-[#e2e8f0] shadow-lg relative overflow-hidden" style={{ aspectRatio: "1", background: "linear-gradient(150deg,#f0fdfc 0%,#f8fafc 60%,#edfaf9 100%)" }}>
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.04) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
            <svg viewBox="0 0 360 360" fill="none" className="w-full h-full relative z-10">
              {/* Dashboard frame */}
              <rect x="20" y="20" width="320" height="320" rx="8" fill="white" fillOpacity="0.7" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
              {/* Top bar */}
              <rect x="20" y="20" width="320" height="32" rx="7" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
              <circle cx="38" cy="36" r="5" fill="#229388" opacity="0.7"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.4s" repeatCount="indefinite"/></circle>
              <circle cx="54" cy="36" r="5" fill="#3ec8ba" opacity="0.5"/>
              <circle cx="70" cy="36" r="5" fill="rgba(34,147,136,0.2)"/>
              <text x="180" y="40" textAnchor="middle" fontSize="9" fill="#229388" fontWeight="700" letterSpacing="1">NOC OPERATIONS CENTER</text>

              {/* 3 metric cards */}
              {[
                { x: 30,  label: "UPTIME",  val: "99.95", unit: "%" },
                { x: 140, label: "MTTR",    val: "< 4",   unit: "hr" },
                { x: 250, label: "TICKETS", val: "12",    unit: "/d" },
              ].map((m) => (
                <g key={m.label}>
                  <rect x={m.x} y="62" width="90" height="56" rx="5" fill="white" stroke="rgba(34,147,136,0.18)" strokeWidth="1"/>
                  <text x={m.x + 45} y="84" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="600" letterSpacing="0.8">{m.label}</text>
                  <text x={m.x + 45} y="102" textAnchor="middle" fontSize="18" fill="#229388" fontWeight="800" letterSpacing="-0.5">{m.val}</text>
                  <text x={m.x + 45} y="113" textAnchor="middle" fontSize="8" fill="#3ec8ba" fontWeight="600">{m.unit}</text>
                </g>
              ))}

              {/* Sparkline chart */}
              <rect x="30" y="128" width="300" height="90" rx="5" fill="rgba(34,147,136,0.03)" stroke="rgba(34,147,136,0.15)" strokeWidth="1"/>
              <text x="42" y="142" fontSize="7.5" fill="#94a3b8" fontWeight="600" letterSpacing="0.8">SERVICE HEALTH — 7 DAY TREND</text>
              {/* Grid lines inside chart */}
              {[155, 170, 185, 200].map((y) => (
                <line key={y} x1="36" y1={y} x2="324" y2={y} stroke="rgba(34,147,136,0.07)" strokeWidth="0.5"/>
              ))}
              {/* Sparkline — solid fill */}
              <polyline points="36,198 74,185 112,190 150,175 188,180 226,165 264,172 302,160 324,155" stroke="#229388" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M36,198 L74,185 L112,190 L150,175 L188,180 L226,165 L264,172 L302,160 L324,155 L324,210 L36,210 Z" fill="rgba(34,147,136,0.08)"/>
              {/* Live dot at end */}
              <circle cx="324" cy="155" r="4" fill="#229388">
                <animate attributeName="r" values="3;6;3" dur="1.6s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite"/>
              </circle>

              {/* Alert feed */}
              {[
                { y: 234, dot: "#229388", msg: "SRV-04  —  All systems nominal", time: "0m ago" },
                { y: 254, dot: "#3ec8ba", msg: "CLOUD   —  Auto-scaled +2 nodes", time: "8m ago" },
                { y: 274, dot: "#94a3b8", msg: "DB-02   —  Scheduled backup OK",  time: "22m ago" },
                { y: 294, dot: "#229388", msg: "NET-01  —  Latency within SLA",   time: "34m ago" },
              ].map((a) => (
                <g key={a.y}>
                  <circle cx="40" cy={a.y} r="4" fill={a.dot}>
                    {a.dot === "#229388" && <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>}
                  </circle>
                  <text x="52" y={a.y + 4} fontSize="8.5" fill="#374151" fontWeight="500">{a.msg}</text>
                  <text x="320" y={a.y + 4} textAnchor="end" fontSize="7.5" fill="#94a3b8">{a.time}</text>
                </g>
              ))}

              {/* Bottom status bar */}
              <rect x="20" y="312" width="320" height="28" rx="0" fill="rgba(34,147,136,0.08)" stroke="none"/>
              <rect x="20" y="320" width="320" height="20" rx="0" fill="rgba(34,147,136,0.08)"/>
              <circle cx="38" cy="329" r="4" fill="#229388"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/></circle>
              <text x="50" y="333" fontSize="8.5" fill="#229388" fontWeight="700" letterSpacing="0.8">LIVE  ·  200+ SYSTEMS MONITORED  ·  SLA: 99.95%</text>
            </svg>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}>
        <h2 className="font-bold text-white leading-tight max-w-xl" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(24px,3vw,42px)", letterSpacing: "-0.025em" }}>
          Ready to hand over IT operations and focus on growth?
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
