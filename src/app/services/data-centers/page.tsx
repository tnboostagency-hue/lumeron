"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";

const stats = [
  { num: "24", unit: "/7", label: "Operational uptime commitment" },
  { num: "99.999", unit: "%", label: "Availability SLA" },
  { num: "Tier", unit: " III", label: "Certified facilities" },
  { num: "100", unit: "%", label: "KSA data sovereignty" },
];

const services = [
  { num: "01", title: "Colocation", desc: "House your hardware in Tier IV certified facilities with guaranteed power, cooling, and cross-connect services." },
  { num: "02", title: "Network & Connectivity", desc: "Direct access to 200+ carriers, subsea cable landing stations, and ultra-low-latency backbone across continents." },
  { num: "03", title: "Managed Security", desc: "Biometric access control, 24/7 on-site security staff, CCTV surveillance, and electronic monitoring of all assets." },
  { num: "04", title: "Power & Cooling", desc: "N+1 UPS systems, diesel backup, precision air cooling, and aisle containment achieving a 1.2 PUE rating." },
  { num: "05", title: "Disaster Recovery", desc: "Geo-redundant replication, RTO/RPO-aligned backup strategies, and fully documented DR runbooks tested quarterly." },
  { num: "06", title: "NOC & Monitoring", desc: "24/7 Network Operations Centre with real-time dashboards, automated alerting, and proactive incident management." },
];

const specs = [
  { name: "Uptime SLA", val: "99.999%" },
  { name: "Power Redundancy", val: "N+1" },
  { name: "PUE Rating", val: "1.2" },
  { name: "Certification", val: "Tier IV" },
  { name: "Cooling Redundancy", val: "N+1" },
  { name: "Security Standard", val: "ISO 27001" },
  { name: "Fiber Diversity", val: "Dual entry" },
  { name: "Support", val: "24/7 NOC" },
];

export default function DataCentersPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageWrapper>
      <>
        <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        <Navbar />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-white pt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(34,147,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,147,136,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 80%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{ top: "-5%", left: "50%", transform: "translateX(-50%)", width: "860px", height: "500px", background: "radial-gradient(ellipse at center, rgba(34,147,136,0.09) 0%, transparent 65%)" }}
        />
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
              Where critical workloads find their home
            </h2>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-6">
              Founded at the intersection of engineering precision and sovereignty ambition, Lumeron builds data center campuses that redefine what enterprise infrastructure can be. From raw land to fully operational facility, we own every step.
            </p>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
              Our campuses are designed with redundancy at their core — N+1 power, dual-fiber entry points, independent cooling loops — so your operations never stop.
            </p>
            <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px]">Start a Conversation</button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0fdfc 0%,#f8fafc 100%)", aspectRatio: "4/3" }}>
              <svg viewBox="0 0 400 320" fill="none" className="w-4/5 h-4/5">
                {[20, 72, 124, 176, 228].map((y, i) => (
                  <g key={y}>
                    <rect x="60" y={y} width="280" height="40" rx="3" fill="rgba(34,147,136,0.08)" stroke="rgba(34,147,136,0.25)" strokeWidth="1"/>
                    <rect x="76" y={y + 10} width="60" height="20" rx="2" fill="rgba(34,147,136,0.12)" stroke="rgba(34,147,136,0.18)" strokeWidth="1"/>
                    <circle cx="226" cy={y + 20} r="5" fill="#229388" opacity={i % 2 === 0 ? "0.8" : "0.35"}/>
                    <circle cx="244" cy={y + 20} r="5" fill={i > 2 ? "#229388" : "rgba(34,147,136,0.25)"} opacity="0.7"/>
                    <circle cx="262" cy={y + 20} r="5" fill="rgba(34,147,136,0.2)"/>
                    <rect x="280" y={y + 12} width="40" height="16" rx="2" fill="rgba(34,147,136,0.06)" stroke="rgba(34,147,136,0.18)" strokeWidth="1"/>
                  </g>
                ))}
                <rect x="56" y="16" width="8" height="256" rx="2" fill="rgba(34,147,136,0.18)" stroke="rgba(34,147,136,0.25)" strokeWidth="1"/>
                <rect x="336" y="16" width="8" height="256" rx="2" fill="rgba(34,147,136,0.18)" stroke="rgba(34,147,136,0.25)" strokeWidth="1"/>
              </svg>
              <div className="absolute -bottom-4 -left-4 text-white rounded-xl px-5 py-4 shadow-lg" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                <div className="font-bold text-2xl leading-none" style={{ fontFamily: '"Avenir Next Arabic",sans-serif' }}>Tier IV</div>
                <div className="text-[11px] mt-1 opacity-90 tracking-wide">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — alternating rows with teal accent bar + inline SVG icon */}
      <section id="services" className="py-28 bg-white border-y border-[#e2e8f0] overflow-hidden">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">What We Offer</span>
              </div>
              <h2 className="font-bold leading-tight" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em", maxWidth: "480px" }}>
                Full-spectrum data center services
              </h2>
            </div>
            <p className="text-[15px] text-[#64748b] leading-[1.7] max-w-[360px] font-light">
              From bare-metal colocation to fully managed cloud-adjacent environments, our portfolio scales alongside the most demanding workloads.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-[#e2e8f0]">
            {services.map((s, i) => (
              <div
                key={s.num}
                className="group grid grid-cols-[64px_1fr_auto] md:grid-cols-[80px_1fr_220px] gap-6 md:gap-12 items-center py-10 px-2 hover:bg-[#f0fdfc] transition-colors duration-300 relative"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 h-full w-0 group-hover:w-1 transition-all duration-300 rounded-r" style={{ background: "linear-gradient(180deg,#229388,#3ec8ba)" }} />

                {/* Number */}
                <div className="font-bold text-[#e2e8f0] group-hover:text-[#229388] transition-colors duration-300 select-none leading-none" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.04em" }}>
                  {s.num}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-[18px] md:text-[20px] text-[#111827] mb-2 leading-snug" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{s.title}</h3>
                  <p className="text-[14px] text-[#64748b] leading-[1.75] font-light max-w-xl">{s.desc}</p>
                </div>

                {/* Right: mini server-rack icon unique per row */}
                <div className="hidden md:flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 80 60" fill="none" className="w-20 h-16">
                    {[0,1,2].map((r) => {
                      const active = r === i % 3;
                      return (
                        <g key={r}>
                          <rect x="4" y={4 + r * 18} width="72" height="14" rx="2" fill={active ? "rgba(34,147,136,0.12)" : "rgba(34,147,136,0.05)"} stroke={active ? "#229388" : "rgba(34,147,136,0.2)"} strokeWidth="1"/>
                          <rect x="10" y={7 + r * 18} width="20" height="8" rx="1" fill={active ? "rgba(34,147,136,0.25)" : "rgba(34,147,136,0.08)"} />
                          <circle cx="60" cy={11 + r * 18} r="3" fill={active ? "#229388" : "rgba(34,147,136,0.2)"} />
                          <circle cx="68" cy={11 + r * 18} r="3" fill={active ? "rgba(62,200,186,0.7)" : "rgba(34,147,136,0.1)"} />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-24 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Infrastructure</span>
            </div>
            <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              Engineered for zero compromise
            </h2>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
              Every Lumeron facility is designed to the most demanding international standards, with full compliance to Saudi NCA and NDMO requirements.
            </p>
            <ul className="flex flex-col divide-y divide-[#e2e8f0]">
              {["Tier IV Uptime Institute certification","N+1 power and cooling redundancy","Dual diverse fiber entry points","Biometric multi-factor access control","ISO 27001 & ISO 22301 compliant","NCA ECC framework aligned"].map((item) => (
                <li key={item} className="flex items-center gap-4 py-4 text-[14px] text-[#111827] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#229388] flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          {/* Data Center: animated server rack with live LEDs and airflow indicators */}
          <div className="rounded-2xl border border-[#e2e8f0] shadow-lg relative overflow-hidden" style={{ aspectRatio: "1", background: "linear-gradient(160deg,#f0fdfc 0%,#f8fafc 60%,#e8f8f7 100%)" }}>
            {/* Subtle grid bg */}
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.05) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
            <svg viewBox="0 0 360 360" fill="none" className="w-full h-full relative z-10">
              {/* Rack cabinet outline */}
              <rect x="80" y="30" width="200" height="300" rx="6" fill="rgba(34,147,136,0.04)" stroke="rgba(34,147,136,0.3)" strokeWidth="1.5"/>
              {/* Rack top bar */}
              <rect x="80" y="30" width="200" height="20" rx="5" fill="rgba(34,147,136,0.12)" stroke="rgba(34,147,136,0.25)" strokeWidth="1"/>
              {/* Rack bottom bar */}
              <rect x="80" y="310" width="200" height="20" rx="5" fill="rgba(34,147,136,0.08)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
              {/* Rack ear handles */}
              <rect x="72" y="50" width="8" height="260" rx="2" fill="rgba(34,147,136,0.15)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
              <rect x="280" y="50" width="8" height="260" rx="2" fill="rgba(34,147,136,0.15)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>

              {/* 7 server units */}
              {[0,1,2,3,4,5,6].map((r) => {
                const y = 58 + r * 36;
                const isActive = r !== 3;
                return (
                  <g key={r}>
                    <rect x="88" y={y} width="184" height="28" rx="3" fill={isActive ? "rgba(34,147,136,0.07)" : "rgba(0,0,0,0.02)"} stroke={isActive ? "rgba(34,147,136,0.22)" : "rgba(200,200,200,0.3)"} strokeWidth="1"/>
                    {/* Drive bays */}
                    {[0,1,2,3].map((d) => (
                      <rect key={d} x={96 + d*14} y={y+6} width="10" height="16" rx="1.5" fill={isActive ? "rgba(34,147,136,0.14)" : "rgba(0,0,0,0.04)"} stroke={isActive ? "rgba(34,147,136,0.2)" : "rgba(200,200,200,0.2)"} strokeWidth="0.5"/>
                    ))}
                    {/* Status LED cluster */}
                    <circle cx="230" cy={y+10} r="3.5" fill={isActive ? "#229388" : "#e2e8f0"}>
                      {isActive && <animate attributeName="opacity" values="1;0.4;1" dur={`${1.4 + r*0.3}s`} repeatCount="indefinite"/>}
                    </circle>
                    <circle cx="242" cy={y+10} r="3.5" fill={r < 5 ? "#3ec8ba" : "#e2e8f0"}>
                      {r < 5 && <animate attributeName="opacity" values="1;0.5;1" dur={`${1.8 + r*0.2}s`} repeatCount="indefinite"/>}
                    </circle>
                    <circle cx="254" cy={y+10} r="3.5" fill={r % 3 === 0 ? "#229388" : "#e2e8f0"} opacity={r % 3 === 0 ? "0.7" : "1"}/>
                    {/* Port */}
                    <rect x="225" y={y+17} width="34" height="7" rx="1.5" fill="rgba(34,147,136,0.06)" stroke="rgba(34,147,136,0.18)" strokeWidth="0.5"/>
                  </g>
                );
              })}

              {/* Cold-aisle airflow arrows (left side) */}
              {[80, 116, 152, 188, 224].map((y, i) => (
                <g key={`air-${y}`} opacity="0.5">
                  <line x1="48" y1={y} x2="74" y2={y} stroke="#3ec8ba" strokeWidth="1" strokeDasharray="4 3">
                    <animate attributeName="stroke-dashoffset" values="14;0" dur={`${0.8 + i*0.15}s`} repeatCount="indefinite"/>
                  </line>
                  <polygon points={`74,${y-3} 74,${y+3} 80,${y}`} fill="#3ec8ba" opacity="0.6"/>
                </g>
              ))}
              {/* Hot-aisle exhaust arrows (right side) */}
              {[80, 116, 152, 188, 224].map((y, i) => (
                <g key={`hot-${y}`} opacity="0.4">
                  <line x1="288" y1={y} x2="314" y2={y} stroke="#229388" strokeWidth="1" strokeDasharray="4 3">
                    <animate attributeName="stroke-dashoffset" values="14;0" dur={`${0.8 + i*0.15}s`} repeatCount="indefinite"/>
                  </line>
                  <polygon points={`314,${y-3} 314,${y+3} 320,${y}`} fill="#229388" opacity="0.5"/>
                </g>
              ))}

              {/* Labels */}
              <text x="36" y="270" fontSize="8" fill="#3ec8ba" fontWeight="600" letterSpacing="0.5" transform="rotate(-90,36,270)">COLD AISLE</text>
              <text x="324" y="270" fontSize="8" fill="#229388" fontWeight="600" letterSpacing="0.5" transform="rotate(90,324,270)">HOT AISLE</text>

              {/* Uptime badge bottom */}
              <rect x="110" y="316" width="140" height="24" rx="4" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.25)" strokeWidth="1"/>
              <text x="180" y="332" textAnchor="middle" fontSize="10" fill="#229388" fontWeight="700" letterSpacing="1">99.999% UPTIME</text>
            </svg>
          </div>
        </div>
      </section>


      {/* CTA STRIP */}
      <section className="py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}>
        <h2 className="font-bold text-white leading-tight max-w-xl" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(24px,3vw,42px)", letterSpacing: "-0.025em" }}>
          Ready to build your sovereign data center strategy?
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
