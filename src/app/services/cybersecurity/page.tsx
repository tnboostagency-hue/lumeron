"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";

const stats = [
  { num: "500", unit: "+", label: "Threats blocked daily" },
  { num: "99.97", unit: "%", label: "Threat detection rate" },
  { num: "15", unit: " min", label: "Mean time to respond" },
  { num: "24", unit: "/7", label: "SOC monitoring" },
];

const services = [
  { num: "01", title: "SOC-as-a-Service", desc: "Round-the-clock Security Operations Centre staffed by certified analysts with AI-assisted threat correlation and triage." },
  { num: "02", title: "Threat Intelligence", desc: "Real-time feeds from global ISACs, dark-web monitoring, and Saudi sector-specific threat landscape briefings." },
  { num: "03", title: "Penetration Testing", desc: "Adversarial simulation across network, application, and physical layers using CREST-certified methodologies." },
  { num: "04", title: "Compliance & GRC", desc: "End-to-end alignment with NCA ECC, SAMA CSF, PDPL, and ISO 27001 — from gap analysis to audit readiness." },
  { num: "05", title: "Identity & Access", desc: "Zero-trust architecture design, PAM deployment, and MFA rollout across hybrid cloud and on-premises environments." },
  { num: "06", title: "Incident Response", desc: "Rapid containment, forensic investigation, and recovery playbooks executed by experienced IR specialists." },
];

const specs = [
  { name: "Detection Rate", val: "99.97%" },
  { name: "MTTD", val: "< 5 min" },
  { name: "MTTR", val: "15 min" },
  { name: "SOC Coverage", val: "24/7/365" },
  { name: "Framework", val: "NCA ECC" },
  { name: "Certification", val: "ISO 27001" },
  { name: "SAMA Alignment", val: "CSF v1.0" },
  { name: "PDPL Ready", val: "Yes" },
];

export default function CybersecurityPage() {
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
        <div className="absolute pointer-events-none" style={{ top: "-5%", left: "50%", transform: "translateX(-50%)", width: "860px", height: "500px", background: "radial-gradient(ellipse at center, rgba(34,147,136,0.09) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 1440 860" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {/* Shield-like decorative paths */}
            <path d="M 200 80 L 200 300 Q 200 400 320 440" stroke="rgba(34,147,136,0.15)" strokeWidth="1.5" fill="none"/>
            <path d="M 1240 80 L 1240 300 Q 1240 400 1120 440" stroke="rgba(34,147,136,0.15)" strokeWidth="1.5" fill="none"/>
            <circle cx="200" cy="80" r="4" fill="rgba(34,147,136,0.5)"/>
            <circle cx="1240" cy="80" r="4" fill="rgba(34,147,136,0.5)"/>
            <circle cx="320" cy="440" r="6" fill="rgba(34,147,136,0.4)"/>
            <circle cx="1120" cy="440" r="6" fill="rgba(34,147,136,0.4)"/>
            <path d="M 320 440 L 1120 440" stroke="rgba(34,147,136,0.08)" strokeWidth="1" strokeDasharray="8 6"/>
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-8 pb-20 relative z-10">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-[#229388]" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Cybersecurity</span>
          </div>
          <h1
            className="font-bold leading-[0.95] tracking-tight mb-10"
            style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(52px,8vw,96px)", color: "#111827", letterSpacing: "-0.03em" }}
          >
            Defend What<br />
            <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Matters</span>
            <br />Most.
          </h1>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-[17px] text-[#64748b] leading-[1.75] max-w-[420px] font-light">
              Lumeron's cybersecurity practice protects Saudi Arabia's most critical digital assets — from sovereign infrastructure to financial institutions — with intelligence-led, NCA-aligned security operations.
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
              Intelligence-led protection for the Kingdom
            </h2>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-6">
              Threats targeting Saudi Arabia's digital infrastructure have grown in sophistication and frequency. Lumeron's cybersecurity team brings government-grade capabilities to enterprises across all sectors — financial, energy, healthcare, and government.
            </p>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
              Our SOC operates on a custom SIEM platform tuned to regional threat actors, with playbooks developed in direct collaboration with the National Cybersecurity Authority.
            </p>
            <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px]">Start a Conversation</button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0fdfc 0%,#f8fafc 100%)", aspectRatio: "4/3" }}>
              {/* Shield SVG illustration */}
              <svg viewBox="0 0 400 320" fill="none" className="w-4/5 h-4/5">
                <path d="M 200 30 L 310 80 L 310 180 Q 310 260 200 290 Q 90 260 90 180 L 90 80 Z" fill="rgba(34,147,136,0.06)" stroke="rgba(34,147,136,0.3)" strokeWidth="1.5"/>
                <path d="M 200 55 L 285 95 L 285 175 Q 285 240 200 265 Q 115 240 115 175 L 115 95 Z" fill="rgba(34,147,136,0.08)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <path d="M 165 165 L 188 188 L 240 136" stroke="#229388" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="200" cy="170" r="38" stroke="rgba(34,147,136,0.15)" strokeWidth="1" fill="none"/>
                {/* Scan lines */}
                <line x1="90" y1="145" x2="310" y2="145" stroke="rgba(34,147,136,0.12)" strokeWidth="1" strokeDasharray="6 4"/>
                <line x1="90" y1="175" x2="310" y2="175" stroke="rgba(34,147,136,0.2)" strokeWidth="1.5"/>
                <line x1="90" y1="205" x2="310" y2="205" stroke="rgba(34,147,136,0.12)" strokeWidth="1" strokeDasharray="6 4"/>
              </svg>
              <div className="absolute -bottom-4 -left-4 text-white rounded-xl px-5 py-4 shadow-lg" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                <div className="font-bold text-2xl leading-none" style={{ fontFamily: '"Avenir Next Arabic",sans-serif' }}>NCA</div>
                <div className="text-[11px] mt-1 opacity-90 tracking-wide">ECC Aligned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — dark terminal panel with scan-line bg and threat-level badges */}
      <section id="services" className="py-28 relative overflow-hidden" style={{ background: "#0d1f1e" }}>
        {/* Scan-line overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(34,147,136,0.03) 3px, rgba(34,147,136,0.03) 4px)" }} />
        {/* Top/bottom teal glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-40 pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(34,147,136,0.18) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#3ec8ba]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#3ec8ba]">What We Offer</span>
              </div>
              <h2 className="font-bold leading-tight text-white" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", letterSpacing: "-0.025em", maxWidth: "480px" }}>
                End-to-end cyber defense services
              </h2>
            </div>
            <p className="text-[15px] leading-[1.7] max-w-[360px] font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
              From proactive threat hunting to regulatory compliance, our integrated security services cover every dimension of your risk landscape.
            </p>
          </div>

          {/* Terminal-style cards: 2-col on md, 3-col on lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(62,200,186,0.1)", border: "1px solid rgba(62,200,186,0.12)" }}>
            {services.map((s, i) => {
              const badges = [
                { label: "Active Defense", color: "#229388" },
                { label: "Intel Feed", color: "#0e7a70" },
                { label: "Offensive Sec", color: "#1a5c57" },
                { label: "Compliance", color: "#229388" },
                { label: "Zero Trust", color: "#0e7a70" },
                { label: "IR Ready", color: "#c0392b" },
              ];
              const badge = badges[i] || badges[0];
              return (
                <div key={s.num} className="group relative p-8 overflow-hidden transition-all duration-300" style={{ background: "#0d1f1e" }}>
                  {/* Corner bracket top-left */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l opacity-30 group-hover:opacity-80 transition-opacity" style={{ borderColor: "#3ec8ba" }} />
                  {/* Corner bracket bottom-right */}
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r opacity-30 group-hover:opacity-80 transition-opacity" style={{ borderColor: "#3ec8ba" }} />
                  {/* Hover bg */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(34,147,136,0.06)" }} />

                  <div className="relative z-10">
                    {/* Top row: number + threat badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-bold text-[11px] tracking-[0.2em] text-[#229388]">{s.num}</span>
                      <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-1 rounded-sm" style={{ background: badge.color + "22", color: badge.color === "#c0392b" ? "#e74c3c" : "#3ec8ba", border: `1px solid ${badge.color}44` }}>{badge.label}</span>
                    </div>
                    <h3 className="font-semibold text-white text-[17px] mb-3 leading-snug" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{s.title}</h3>
                    <p className="text-[13px] leading-[1.75] font-light" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                    {/* Bottom terminal line */}
                    <div className="mt-6 flex items-center gap-2">
                      <span className="text-[10px] font-mono" style={{ color: "#229388" }}>$</span>
                      <div className="h-px flex-1 opacity-20" style={{ background: "#3ec8ba" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-24 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Our Approach</span>
            </div>
            <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              Zero-trust. Intelligence-led. Always on.
            </h2>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
              We operate on the assumption of breach — every access request is verified, every anomaly is investigated, and every incident is handled with full forensic rigor.
            </p>
            <ul className="flex flex-col divide-y divide-[#e2e8f0]">
              {["Zero-trust architecture framework","AI-powered threat correlation engine","NCA ECC & SAMA CSF compliance","Saudi PDPL data protection alignment","CREST-certified penetration testing","24/7 Security Operations Centre"].map((item) => (
                <li key={item} className="flex items-center gap-4 py-4 text-[14px] text-[#111827] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#229388] flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          {/* Cybersecurity: hex threat radar with rotating sweep + threat nodes */}
          <div className="rounded-2xl border border-[#e2e8f0] shadow-lg relative overflow-hidden" style={{ aspectRatio: "1", background: "radial-gradient(ellipse at center, #e8faf8 0%, #f0fdfc 40%, #f8fafc 100%)" }}>
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.04) 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
            <svg viewBox="0 0 360 360" fill="none" className="w-full h-full relative z-10">
              {/* Radar rings */}
              {[40, 80, 120, 160].map((r, i) => (
                <circle key={r} cx="180" cy="180" r={r} stroke="rgba(34,147,136,0.15)" strokeWidth="1" strokeDasharray={i % 2 === 0 ? "none" : "6 4"}/>
              ))}
              {/* Crosshair lines */}
              <line x1="180" y1="20" x2="180" y2="340" stroke="rgba(34,147,136,0.1)" strokeWidth="1"/>
              <line x1="20" y1="180" x2="340" y2="180" stroke="rgba(34,147,136,0.1)" strokeWidth="1"/>
              <line x1="67" y1="67" x2="293" y2="293" stroke="rgba(34,147,136,0.07)" strokeWidth="1"/>
              <line x1="293" y1="67" x2="67" y2="293" stroke="rgba(34,147,136,0.07)" strokeWidth="1"/>

              {/* Radar sweep — glowing arc rotating */}
              <defs>
                <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3ec8ba" stopOpacity="0"/>
                  <stop offset="60%" stopColor="#3ec8ba" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#229388" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <g>
                  <animateTransform attributeName="transform" type="rotate" from="0 180 180" to="360 180 180" dur="4s" repeatCount="indefinite"/>
                  {/* Sweep arc */}
                  <circle cx="180" cy="180" r="160" fill="none"
                    stroke="url(#sweepGrad)"
                    strokeWidth="3"
                    strokeDasharray="80 922"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  {/* Glow head — circle at the leading edge (right side = cx:340, cy:180) */}
                  <circle cx="340" cy="180" r="5" fill="#3ec8ba" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;0.5;0.9" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="340" cy="180" r="10" fill="none" stroke="#3ec8ba" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="r" values="8;14;8" dur="4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0.05;0.4" dur="4s" repeatCount="indefinite"/>
                  </circle>
                </g>

              {/* Threat nodes — scattered around radar */}
              {[
                { cx: 255, cy: 110, active: true,  label: "APT" },
                { cx: 130, cy: 85,  active: false, label: "DDOS" },
                { cx: 290, cy: 220, active: true,  label: "C2" },
                { cx: 100, cy: 250, active: false, label: "PHISH" },
                { cx: 210, cy: 305, active: true,  label: "0-DAY" },
                { cx: 80,  cy: 155, active: true,  label: "MALW" },
              ].map((n) => (
                <g key={n.label}>
                  {n.active && (
                    <circle cx={n.cx} cy={n.cy} r="14" fill="rgba(34,147,136,0.08)" stroke="rgba(34,147,136,0.3)" strokeWidth="1">
                      <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <circle cx={n.cx} cy={n.cy} r="5" fill={n.active ? "#229388" : "#94a3b8"} opacity={n.active ? "1" : "0.5"}>
                    {n.active && <animate attributeName="opacity" values="1;0.5;1" dur="1.6s" repeatCount="indefinite"/>}
                  </circle>
                  <text x={n.cx} y={n.cy - 10} textAnchor="middle" fontSize="7" fill={n.active ? "#229388" : "#94a3b8"} fontWeight="700" letterSpacing="0.5" opacity={n.active ? "1" : "0.5"}>{n.label}</text>
                  {/* Line to center */}
                  {n.active && <line x1={n.cx} y1={n.cy} x2="180" y2="180" stroke="rgba(34,147,136,0.2)" strokeWidth="0.8" strokeDasharray="3 3"/>}
                </g>
              ))}

              {/* Center dot */}
              <circle cx="180" cy="180" r="6" fill="#229388">
                <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="180" cy="180" r="3" fill="white"/>

              {/* Status readout bottom */}
                <rect x="95" y="316" width="250" height="24" rx="4" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.25)" strokeWidth="1"/>
              <circle cx="112" cy="328" r="4" fill="#229388"><animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/></circle>
              <text x="122" y="332" fontSize="9" fill="#229388" fontWeight="700" letterSpacing="0.8">SOC ACTIVE — 3 THREATS TRACKED</text>
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
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Service Parameters</span>
              <div className="w-5 h-px bg-[#229388]" />
            </div>
            <h2 className="font-bold mb-4" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              Measured in outcomes, not promises
            </h2>
            <p className="text-[15px] text-[#64748b] max-w-[440px] mx-auto leading-[1.7]">Industry-leading SLAs backed by contractual commitments and transparent reporting.</p>
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
          Ready to strengthen your cyber posture?
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
