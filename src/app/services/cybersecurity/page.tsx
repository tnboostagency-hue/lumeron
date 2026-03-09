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
  {
    num: "01",
    title: "Managed Security Operations (24/7 SOC)",
    badge: "MDR / XDR",
    desc: "Proactive threat detection, monitoring, and response across your IT and OT environments.",
    items: [
      "24/7 Security Operations Center (SOC)",
      "SIEM Implementation & Management (Sentinel, Splunk)",
      "Managed Detection & Response (MDR/XDR)",
      "Threat Intelligence Integration",
      "Log Monitoring & Correlation",
      "Incident Triage & Containment",
      "Executive & Technical Reporting Dashboards",
    ],
    pct: 100,
  },
  {
    num: "02",
    title: "Governance, Risk & Compliance (GRC)",
    badge: "ISO 27001",
    desc: "Strengthening your security posture while ensuring regulatory and industry compliance.",
    items: [
      "Enterprise Risk Assessments",
      "Compliance Gap Analysis",
      "Security Policy & Procedure Development",
      "ISMS Implementation aligned with ISO 27001",
      "Framework Alignment with NIST CSF",
      "Third-Party Risk Management",
      "Audit Readiness & Advisory",
    ],
    pct: 97,
  },
  {
    num: "03",
    title: "Offensive Cybersecurity (Red Team & Pen Testing)",
    badge: "Red Team",
    desc: "Identify vulnerabilities before attackers do — with realistic adversary simulation.",
    items: [
      "External & Internal Penetration Testing",
      "Web & API Security Testing",
      "Active Directory Security Assessment",
      "Red Team & Adversary Simulation",
      "Phishing & Social Engineering Assessments",
      "Cloud Security Testing",
    ],
    pct: 98,
  },
  {
    num: "04",
    title: "OT Security (Industrial & Critical Infrastructure)",
    badge: "IEC 62443",
    desc: "Protecting ICS, SCADA, and industrial networks from modern cyber threats.",
    items: [
      "OT Risk & Vulnerability Assessments",
      "Industrial Network Segmentation (Purdue Model)",
      "Secure Remote Access Architecture",
      "OT SOC Monitoring",
      "IEC 62443 Advisory & Alignment",
      "Incident Response for Industrial Environments",
    ],
    pct: 95,
  },
  {
    num: "05",
    title: "Digital Forensics & Incident Response (DFIR)",
    badge: "DFIR",
    desc: "Rapid containment, investigation, and recovery from cyber incidents.",
    items: [
      "Incident Response Retainer",
      "Ransomware Investigation & Containment",
      "Malware Analysis & Root Cause Identification",
      "Log & Endpoint Forensics",
      "Evidence Preservation & Reporting",
      "Post-Incident Security Hardening",
    ],
    pct: 96,
  },
  {
    num: "06",
    title: "Cloud Security Services",
    badge: "Zero Trust",
    desc: "Securing modern hybrid and multi-cloud environments end to end.",
    items: [
      "Microsoft 365 Security Hardening",
      "Azure & AWS Security Architecture Review",
      "Cloud Security Posture Management (CSPM)",
      "Zero Trust Implementation",
      "CASB & Secure Access Service Edge (SASE)",
      "Identity & Access Management (IAM, MFA, SSO)",
    ],
    pct: 99,
  },
  {
    num: "07",
    title: "Security Integration & Implementation",
    badge: "NGFW / ZTNA",
    desc: "Seamless deployment of enterprise-grade cybersecurity technologies.",
    items: [
      "SIEM, EDR/XDR Deployment",
      "Next-Generation Firewall (NGFW) Implementation",
      "Email Security (SPF/DKIM/DMARC)",
      "Zero Trust Network Access (ZTNA)",
      "Data Loss Prevention (DLP)",
      "Security Architecture Design & Optimization",
    ],
    pct: 94,
  },
  {
    num: "08",
    title: "Cybersecurity Strategy & Architecture Consulting",
    badge: "Advisory",
    desc: "Strategic security transformation aligned with your business objectives.",
    items: [
      "Enterprise Security Architecture Design",
      "Security Maturity Assessment (Level 0–5 Model)",
      "Cybersecurity Roadmap Development",
      "Technology Evaluation & RFP Advisory",
      "Security Program Transformation",
    ],
    pct: 93,
  },
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
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Service</span>
            </div>
            <h2 className="font-bold text-foreground mb-7" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.02em", color: "#111827" }}>
              Cybersecurity & Digital Trust
            </h2>
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
                End-to-end cybersecurity across Enterprise, Cloud & OT
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-6">
                In today's evolving threat landscape, organizations require integrated, intelligence-driven cybersecurity strategies that protect enterprise IT, cloud infrastructure, and critical operational technology (OT) systems.
              </p>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                We deliver comprehensive, end-to-end cybersecurity services designed to secure your digital ecosystem — from corporate networks and cloud platforms to industrial control systems and critical infrastructure.
              </p>
              <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px]">Start a Conversation</button>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0fdfc 0%,#f8fafc 100%)", aspectRatio: "4/3" }}>
                {/* SOC threat radar illustration */}
                <svg viewBox="0 0 400 320" fill="none" className="w-4/5 h-4/5">
                  {/* Outer frame */}
                  <rect x="20" y="20" width="360" height="280" rx="6" fill="rgba(34,147,136,0.03)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                  <rect x="20" y="20" width="360" height="32" rx="6" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                  <text x="200" y="40" textAnchor="middle" fontSize="9" fill="#229388" fontWeight="700" letterSpacing="1">SOC THREAT OPERATIONS CENTER</text>
                  {/* Radar circles */}
                  {[60,45,30,15].map((r) => (
                    <circle key={r} cx="140" cy="175" r={r} stroke="rgba(34,147,136,0.2)" strokeWidth="0.8" fill="none"/>
                  ))}
                  {/* Radar sweep */}
                  <line x1="140" y1="175" x2="195" y2="120" stroke="rgba(34,147,136,0.5)" strokeWidth="1.5"/>
                  <path d="M140 175 L195 120 A62 62 0 0 0 140 113" fill="rgba(34,147,136,0.08)"/>
                  {/* Radar blips */}
                  <circle cx="168" cy="145" r="3" fill="#229388"><animate attributeName="opacity" values="1;0.1;1" dur="1.8s" repeatCount="indefinite"/></circle>
                  <circle cx="115" cy="155" r="2.5" fill="#3ec8ba"><animate attributeName="opacity" values="1;0.1;1" dur="2.2s" repeatCount="indefinite"/></circle>
                  <circle cx="152" cy="210" r="2" fill="#229388"><animate attributeName="opacity" values="1;0.1;1" dur="1.4s" repeatCount="indefinite"/></circle>
                  {/* Cross-hairs */}
                  <line x1="80" y1="175" x2="200" y2="175" stroke="rgba(34,147,136,0.15)" strokeWidth="0.5"/>
                  <line x1="140" y1="115" x2="140" y2="235" stroke="rgba(34,147,136,0.15)" strokeWidth="0.5"/>
                  {/* Right panel — alert feed */}
                  <rect x="240" y="62" width="120" height="210" rx="4" fill="rgba(34,147,136,0.04)" stroke="rgba(34,147,136,0.15)" strokeWidth="0.8"/>
                  <text x="300" y="78" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="600" letterSpacing="0.5">ACTIVE ALERTS</text>
                  {[
                    { y: 94,  color: "#ef4444", sev: "HIGH",   msg: "Brute-force SSH" },
                    { y: 120, color: "#f59e0b", sev: "MED",    msg: "Port scan detect" },
                    { y: 146, color: "#229388", sev: "LOW",    msg: "Policy deviation" },
                    { y: 172, color: "#229388", sev: "INFO",   msg: "Auth anomaly" },
                    { y: 198, color: "#3ec8ba", sev: "INFO",   msg: "Log spike event" },
                    { y: 224, color: "#94a3b8", sev: "CLEAR",  msg: "All systems norm." },
                  ].map((a) => (
                    <g key={a.y}>
                      <circle cx="254" cy={a.y + 4} r="3" fill={a.color}/>
                      <text x="262" y={a.y + 8} fontSize="7" fill="#374151" fontWeight="500">{a.msg}</text>
                      <text x="354" y={a.y + 8} textAnchor="end" fontSize="6.5" fill={a.color} fontWeight="700">{a.sev}</text>
                    </g>
                  ))}
                  {/* Bottom bar */}
                  <rect x="20" y="280" width="360" height="20" rx="0" fill="rgba(34,147,136,0.08)"/>
                  <circle cx="36" cy="290" r="4" fill="#229388"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/></circle>
                  <text x="48" y="294" fontSize="8" fill="#229388" fontWeight="700" letterSpacing="0.8">LIVE  ·  500+ THREATS BLOCKED TODAY  ·  99.97% DETECTION</text>
                </svg>
                <div className="absolute -bottom-4 -left-4 text-white rounded-xl px-5 py-4 shadow-lg" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                  <div className="font-bold text-2xl leading-none" style={{ fontFamily: '"Avenir Next Arabic",sans-serif' }}>NCA</div>
                  <div className="text-[11px] mt-1 opacity-90 tracking-wide">ECC Aligned</div>
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
                  Eight integrated security disciplines
                </h2>
              </div>
              <p className="text-[15px] text-[#64748b] leading-[1.7] max-w-[360px] font-light">
                A single cybersecurity partner covering SOC, GRC, offensive testing, OT, forensics, cloud, integration, and strategy under one framework.
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

        {/* OPERATIONS MODEL */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Security Operations Model</span>
              </div>
              <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                Intelligence-led, outcome-driven security
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                Our security operations model integrates threat intelligence, behavioural analytics, and automated playbooks — enabling sub-15-minute response times while ensuring full NCA ECC, NIST CSF, and ISO 27001 alignment.
              </p>
              <ul className="flex flex-col divide-y divide-[#e2e8f0]">
                {[
                  "NCA ECC & PDPL compliance alignment",
                  "MITRE ATT&CK framework-based detection",
                  "Automated SOAR playbooks for Tier 1 response",
                  "Dedicated Threat Intelligence team",
                  "Full OT/IT convergence security coverage",
                  "Saudi-based SOC analysts — AR & EN coverage",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 text-[14px] text-[#111827] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#229388] flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Live SOC dashboard */}
            <div className="rounded-2xl border border-[#e2e8f0] shadow-lg relative overflow-hidden" style={{ aspectRatio: "1", background: "linear-gradient(150deg,#f0fdfc 0%,#f8fafc 60%,#edfaf9 100%)" }}>
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.04) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
              <svg viewBox="0 0 360 360" fill="none" className="w-full h-full relative z-10">
                <rect x="20" y="20" width="320" height="320" rx="8" fill="white" fillOpacity="0.7" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <rect x="20" y="20" width="320" height="32" rx="7" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <circle cx="38" cy="36" r="5" fill="#229388" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="54" cy="36" r="5" fill="#3ec8ba" opacity="0.5"/>
                <circle cx="70" cy="36" r="5" fill="rgba(34,147,136,0.2)"/>
                <text x="190" y="40" textAnchor="middle" fontSize="9" fill="#229388" fontWeight="700" letterSpacing="1">SECURITY OPERATIONS CENTER</text>

                {/* 3 metric cards */}
                {[
                  { x: 30,  label: "DETECTION", val: "99.97", unit: "%" },
                  { x: 140, label: "MTTR",       val: "< 15",  unit: "min" },
                  { x: 250, label: "THREATS",    val: "500",   unit: "/day" },
                ].map((m) => (
                  <g key={m.label}>
                    <rect x={m.x} y="62" width="90" height="56" rx="5" fill="white" stroke="rgba(34,147,136,0.18)" strokeWidth="1"/>
                    <text x={m.x + 45} y="84" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="600" letterSpacing="0.8">{m.label}</text>
                    <text x={m.x + 45} y="102" textAnchor="middle" fontSize="18" fill="#229388" fontWeight="800" letterSpacing="-0.5">{m.val}</text>
                    <text x={m.x + 45} y="113" textAnchor="middle" fontSize="8" fill="#3ec8ba" fontWeight="600">{m.unit}</text>
                  </g>
                ))}

                {/* Threat trend sparkline */}
                <rect x="30" y="128" width="300" height="90" rx="5" fill="rgba(34,147,136,0.03)" stroke="rgba(34,147,136,0.15)" strokeWidth="1"/>
                <text x="42" y="142" fontSize="7.5" fill="#94a3b8" fontWeight="600" letterSpacing="0.8">THREAT VOLUME — 7 DAY TREND</text>
                {[155, 170, 185, 200].map((y) => (
                  <line key={y} x1="36" y1={y} x2="324" y2={y} stroke="rgba(34,147,136,0.07)" strokeWidth="0.5"/>
                ))}
                <polyline points="36,205 74,195 112,200 150,182 188,190 226,170 264,178 302,162 324,155" stroke="#229388" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36,205 L74,195 L112,200 L150,182 L188,190 L226,170 L264,178 L302,162 L324,155 L324,210 L36,210 Z" fill="rgba(34,147,136,0.08)"/>
                <circle cx="324" cy="155" r="4" fill="#229388">
                  <animate attributeName="r" values="3;6;3" dur="1.6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite"/>
                </circle>

                {/* Alert feed */}
                {[
                  { y: 234, dot: "#229388", msg: "SOC-01  —  No active incidents",       time: "0m ago" },
                  { y: 254, dot: "#f59e0b", msg: "IDS-07  —  Anomaly auto-contained",    time: "6m ago" },
                  { y: 274, dot: "#3ec8ba", msg: "CLOUD   —  CSPM scan completed",       time: "18m ago" },
                  { y: 294, dot: "#229388", msg: "OT-03   —  Purdue segmentation OK",    time: "31m ago" },
                ].map((a) => (
                  <g key={a.y}>
                    <circle cx="40" cy={a.y} r="4" fill={a.dot}>
                      {a.dot === "#229388" && <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>}
                    </circle>
                    <text x="52" y={a.y + 4} fontSize="8.5" fill="#374151" fontWeight="500">{a.msg}</text>
                    <text x="320" y={a.y + 4} textAnchor="end" fontSize="7.5" fill="#94a3b8">{a.time}</text>
                  </g>
                ))}

                <rect x="20" y="312" width="320" height="28" rx="0" fill="rgba(34,147,136,0.08)"/>
                <circle cx="38" cy="326" r="4" fill="#229388"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/></circle>
                <text x="50" y="330" fontSize="8.5" fill="#229388" fontWeight="700" letterSpacing="0.8">LIVE  ·  NCA ECC ALIGNED  ·  ISO 27001  ·  24/7</text>
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
