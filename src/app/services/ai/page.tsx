"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import ServiceHeroOtherServices from "@/components/ui/service-hero-other-services";

const services = [
  {
    num: "01", badge: "Strategy",
    title: "AI Strategy & Roadmap",
    desc: "Define your organisation's AI vision with a pragmatic, ROI-driven roadmap — from readiness assessment through governance and change management.",
    items: ["AI maturity & readiness assessment", "Business case & ROI modelling", "Use-case prioritisation framework", "Data governance & AI ethics policy", "Build vs. buy vs. partner analysis", "Executive AI literacy programs"],
    pct: 98,
  },
  {
    num: "02", badge: "Industrial AI",
    title: "AI for Industrial Optimization",
    desc: "Deploy machine learning models directly on the plant floor — optimising scheduling, yield, energy and quality in real time.",
    items: ["Production scheduling optimisation", "Yield & throughput improvement models", "Anomaly detection on sensor streams", "Energy consumption forecasting", "Quality defect prediction & SPC", "Supply chain demand planning AI"],
    pct: 95,
  },
  {
    num: "03", badge: "Vision AI",
    title: "Computer Vision",
    desc: "Extract intelligence from cameras and imaging systems — enabling automated inspection, safety monitoring and crowd analytics at scale.",
    items: ["Automated visual defect detection", "PPE & safety compliance monitoring", "Crowd analytics & flow management", "Facial recognition & access control", "OCR & document digitisation", "Drone-based infrastructure inspection"],
    pct: 93,
  },
  {
    num: "04", badge: "Forecasting",
    title: "Predictive Analytics",
    desc: "Turn historical and real-time data into forward-looking intelligence — reducing uncertainty across demand, risk and customer behaviour.",
    items: ["Demand & sales forecasting models", "Customer churn prediction", "Credit & financial risk scoring", "Inventory optimisation algorithms", "Time-series anomaly detection", "Scenario modelling & Monte Carlo simulation"],
    pct: 96,
  },
  {
    num: "05", badge: "Smart City",
    title: "Smart City Analytics",
    desc: "Deliver data-driven governance for urban infrastructure — from traffic optimisation and energy grids to emergency response intelligence.",
    items: ["Adaptive traffic signal optimisation", "Energy grid load balancing models", "Urban crowd & event management", "Emergency response routing AI", "Public transport demand prediction", "City-level KPI dashboards & GIS integration"],
    pct: 90,
  },
  {
    num: "06", badge: "Data Eng.",
    title: "Data Engineering & Pipelines",
    desc: "Build the data foundation that powers your AI — reliable, scalable pipelines from raw ingestion to feature-ready datasets.",
    items: ["ETL/ELT pipeline design & orchestration", "Lakehouse & data mesh architecture", "Real-time streaming (Kafka, Flink)", "Data quality & lineage management", "Feature store design & implementation", "Data catalogue & metadata management"],
    pct: 97,
  },
  {
    num: "07", badge: "BI",
    title: "Business Intelligence",
    desc: "Empower every decision-maker with self-serve analytics — beautiful dashboards, governed datasets and a culture of data literacy.",
    items: ["Power BI & Tableau enterprise rollout", "Self-serve analytics portal design", "Semantic layer & data model development", "Executive KPI dashboards", "Embedded analytics in business apps", "BI governance & certification programs"],
    pct: 94,
  },
  {
    num: "08", badge: "Gen AI",
    title: "Generative AI",
    desc: "Harness large language models and generative AI to automate knowledge work, enhance customer experience and unlock new capabilities.",
    items: ["LLM fine-tuning on enterprise data", "Retrieval-augmented generation (RAG)", "Arabic NLP & bilingual AI systems", "Enterprise AI chatbot & copilot development", "Document intelligence & summarisation", "AI code generation & developer tools"],
    pct: 91,
  },
];

export default function AIPage() {
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
              {/* Neural net hint */}
              {[[200,180],[400,120],[360,300],[600,200]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="rgba(34,147,136,0.3)"/>
              ))}
              <line x1="200" y1="180" x2="400" y2="120" stroke="rgba(34,147,136,0.1)" strokeWidth="1"/>
              <line x1="200" y1="180" x2="360" y2="300" stroke="rgba(34,147,136,0.1)" strokeWidth="1"/>
              <line x1="400" y1="120" x2="600" y2="200" stroke="rgba(34,147,136,0.1)" strokeWidth="1"/>
              <line x1="360" y1="300" x2="600" y2="200" stroke="rgba(34,147,136,0.1)" strokeWidth="1"/>
              <line x1="1240" y1="600" x2="1100" y2="520" stroke="rgba(34,147,136,0.12)" strokeWidth="1.5"/>
              <line x1="1100" y1="520" x2="1050" y2="680" stroke="rgba(34,147,136,0.12)" strokeWidth="1.5"/>
              <circle cx="1240" cy="600" r="5" fill="rgba(34,147,136,0.5)"/>
              <circle cx="1100" cy="520" r="5" fill="rgba(34,147,136,0.5)"/>
              <circle cx="1050" cy="680" r="5" fill="rgba(34,147,136,0.5)"/>
            </svg>
          </div>

          <div className="container relative z-[115] mx-auto overflow-visible px-6 md:px-8 pb-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Service</span>
            </div>
            <h2 className="font-bold text-foreground mb-7" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.02em", color: "#111827" }}>
              Artificial Intelligence & Advanced Analytics
            </h2>
            <h1 className="font-bold leading-[0.95] tracking-tight mb-10" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(52px,8vw,96px)", color: "#111827", letterSpacing: "-0.03em" }}>
              Intelligence<br />
              <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>at Scale,</span>
              <br />In Arabic.
            </h1>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="text-[17px] text-[#64748b] leading-[1.75] max-w-[420px] font-light">
                Lumeron builds and deploys production-grade AI systems for Saudi enterprises — from industrial optimisation and computer vision to generative AI and bilingual Arabic intelligence platforms.
              </p>
              <div className="flex gap-4 flex-shrink-0">
                <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px] px-8 py-3.5">Connect Now</button>
                <ServiceHeroOtherServices excludeHref="/services/ai" />
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
                Production-grade AI for Saudi enterprises
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-6">
                From AI strategy and data engineering through to model deployment, monitoring and continuous improvement — Lumeron delivers the full AI lifecycle under one accountable partner, built for the specific needs of Saudi industries.
              </p>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                Our bilingual AI capabilities — including Arabic NLP and Vision 2030-aligned use cases — position Saudi organisations to lead the region's AI transformation rather than follow it.
              </p>
              <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px]">Start a Conversation</button>
            </div>
            {/* Neural network SVG */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0fdfc 0%,#f8fafc 100%)", aspectRatio: "4/3" }}>
                <svg viewBox="0 0 400 320" fill="none" className="w-4/5 h-4/5">
                  <style>{`
                    @keyframes pulse-nn { 0%,100%{opacity:0.9;r:7} 50%{opacity:0.4;r:9} }
                    @keyframes signal { 0%{stroke-dashoffset:60} 100%{stroke-dashoffset:0} }
                    .nn-node { animation: pulse-nn 2s ease-in-out infinite; }
                    .nn-edge { stroke-dasharray:8 4; animation: signal 2.5s linear infinite; }
                  `}</style>

                  {/* Input layer */}
                  {[60,110,160,210,260].map((y,i) => (
                    <g key={`in-${i}`}>
                      <circle cx="60" cy={y} r="7" fill="#229388" className="nn-node" style={{animationDelay:`${i*0.2}s`}}/>
                      <text x="20" y={y+4} fontSize="7" fill="#94a3b8" fontWeight="600" textAnchor="middle">IN {i+1}</text>
                    </g>
                  ))}

                  {/* Hidden layer 1 */}
                  {[80,130,180,230].map((y,i) => (
                    <g key={`h1-${i}`}>
                      <circle cx="160" cy={y} r="8" fill="rgba(34,147,136,0.5)" stroke="#229388" strokeWidth="1.5" className="nn-node" style={{animationDelay:`${i*0.25}s`}}/>
                    </g>
                  ))}

                  {/* Hidden layer 2 */}
                  {[100,160,220].map((y,i) => (
                    <g key={`h2-${i}`}>
                      <circle cx="240" cy={y} r="9" fill="rgba(62,200,186,0.5)" stroke="#3ec8ba" strokeWidth="1.5" className="nn-node" style={{animationDelay:`${i*0.3}s`}}/>
                    </g>
                  ))}

                  {/* Output layer */}
                  {[120,180,240].map((y,i) => (
                    <g key={`out-${i}`}>
                      <circle cx="330" cy={y} r="8" fill="#3ec8ba" className="nn-node" style={{animationDelay:`${i*0.2}s`}}/>
                      <text x="370" y={y+4} fontSize="7" fill="#64748b" fontWeight="600">OUT {i+1}</text>
                    </g>
                  ))}

                  {/* Edges input → h1 */}
                  {[60,110,160,210,260].flatMap((y1) => [80,130,180,230].map((y2) => (
                    <line key={`${y1}-${y2}`} x1="67" y1={y1} x2="152" y2={y2} stroke="rgba(34,147,136,0.12)" strokeWidth="0.8" className="nn-edge"/>
                  )))}

                  {/* Edges h1 → h2 */}
                  {[80,130,180,230].flatMap((y1) => [100,160,220].map((y2) => (
                    <line key={`h-${y1}-${y2}`} x1="168" y1={y1} x2="231" y2={y2} stroke="rgba(62,200,186,0.15)" strokeWidth="0.8" className="nn-edge" style={{animationDelay:"0.5s"}}/>
                  )))}

                  {/* Edges h2 → output */}
                  {[100,160,220].flatMap((y1) => [120,180,240].map((y2) => (
                    <line key={`o-${y1}-${y2}`} x1="249" y1={y1} x2="322" y2={y2} stroke="rgba(34,147,136,0.2)" strokeWidth="1" className="nn-edge" style={{animationDelay:"1s"}}/>
                  )))}

                  {/* Layer labels */}
                  <text x="60" y="290" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="700">INPUT</text>
                  <text x="160" y="290" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="700">HIDDEN 1</text>
                  <text x="240" y="290" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="700">HIDDEN 2</text>
                  <text x="330" y="290" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="700">OUTPUT</text>

                  {/* Header label */}
                  <rect x="5" y="5" width="130" height="20" rx="4" fill="rgba(34,147,136,0.08)"/>
                  <text x="70" y="19" textAnchor="middle" fontSize="7.5" fill="#229388" fontWeight="700" letterSpacing="0.5">DEEP NEURAL NETWORK</text>
                  <circle cx="15" cy="15" r="4" fill="#229388">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                <div className="absolute -bottom-4 -left-4 text-white rounded-xl px-5 py-4 shadow-lg" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                  <div className="font-bold text-2xl leading-none" style={{ fontFamily: '"Avenir Next Arabic",sans-serif' }}>98.5%</div>
                  <div className="text-[11px] mt-1 opacity-90 tracking-wide">Avg. Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-28 bg-[#f8fafc] border-y border-[#e2e8f0]">
          <div className="container mx-auto px-6 md:px-8">
            <div className="mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-[#229388]" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">What We Offer</span>
                </div>
                <h2 className="font-bold leading-tight" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em", maxWidth: "480px" }}>
                  Eight AI & analytics capabilities
                </h2>
              </div>
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

        {/* ML PIPELINE */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Our Methodology</span>
              </div>
              <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                From raw data to production intelligence
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
                Our MLOps methodology ensures AI models don't just perform in the lab — they deliver measurable business value in production, monitored and continuously improved over their full operational lifetime.
              </p>
              <ul className="flex flex-col divide-y divide-[#e2e8f0]">
                {[
                  "Business-outcome-first problem framing",
                  "Feature engineering on your real operational data",
                  "Explainable AI (XAI) for regulated industries",
                  "MLOps pipelines with CI/CD for models",
                  "Model drift detection & automated retraining",
                  "NCA AI governance framework compliance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 text-[14px] text-[#111827] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#229388] flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* ML Pipeline Dashboard SVG */}
            <div className="rounded-2xl border border-[#e2e8f0] shadow-lg relative overflow-hidden" style={{ aspectRatio: "1", background: "linear-gradient(150deg,#f0fdfc 0%,#f8fafc 60%,#edfaf9 100%)" }}>
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.04) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
              <svg viewBox="0 0 360 360" fill="none" className="w-full h-full relative z-10">
                <style>{`
                  @keyframes flow-pipe { 0%{stroke-dashoffset:30} 100%{stroke-dashoffset:0} }
                  @keyframes fade-bar { 0%{opacity:0.4} 100%{opacity:1} }
                  .pipe { stroke-dasharray:6 3; animation: flow-pipe 1.5s linear infinite; }
                  .acc-bar { animation: fade-bar 2s ease-in-out infinite alternate; }
                `}</style>
                <rect x="20" y="20" width="320" height="320" rx="8" fill="white" fillOpacity="0.7" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <rect x="20" y="20" width="320" height="32" rx="7" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.2)" strokeWidth="1"/>
                <circle cx="38" cy="36" r="5" fill="#229388" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.2s" repeatCount="indefinite"/>
                </circle>
                <text x="190" y="40" textAnchor="middle" fontSize="9" fill="#229388" fontWeight="700" letterSpacing="1">ML PIPELINE — LIVE</text>

                {/* Pipeline stages */}
                {[
                  { x: 50,  y: 80,  w: 60, label: "DATA\nINGEST", color: "#229388" },
                  { x: 150, y: 80,  w: 60, label: "FEATURE\nENG.", color: "#229388" },
                  { x: 250, y: 80,  w: 60, label: "TRAINING", color: "#3ec8ba" },
                  { x: 150, y: 160, w: 60, label: "EVAL &\nVALIDATE", color: "#3ec8ba" },
                  { x: 50,  y: 240, w: 60, label: "DEPLOY\n(PROD)", color: "#229388" },
                  { x: 150, y: 240, w: 60, label: "MONITOR", color: "#229388" },
                  { x: 250, y: 240, w: 60, label: "RETRAIN", color: "#94a3b8" },
                ].map(({ x, y, w, label, color }) => (
                  <g key={`${x}-${y}`}>
                    <rect x={x} y={y} width={w} height={40} rx="5" fill="white" stroke={`${color}44`} strokeWidth="1.5"/>
                    <rect x={x} y={y} width="4" height="40" rx="2" fill={color} opacity="0.7"/>
                    {label.split("\n").map((ln, li) => (
                      <text key={li} x={x + w / 2 + 2} y={y + 16 + li * 13} textAnchor="middle" fontSize="7.5" fill="#374151" fontWeight="700">{ln}</text>
                    ))}
                  </g>
                ))}

                {/* Arrows */}
                {[
                  [110,100,150,100],[210,100,250,100],
                  [280,120,250,160],[210,180,110,240],
                  [110,260,150,260],[210,260,250,260],
                  [250,240,280,120],
                ].map(([x1,y1,x2,y2],i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(34,147,136,0.4)" strokeWidth="1.5" className="pipe" style={{animationDelay:`${i*0.2}s`}}/>
                ))}

                {/* Model accuracy meter */}
                <rect x="36" y="300" width="288" height="12" rx="3" fill="rgba(34,147,136,0.07)" stroke="rgba(34,147,136,0.12)" strokeWidth="0.5"/>
                <rect x="36" y="300" width="260" height="12" rx="3" fill="#229388" opacity="0.7" className="acc-bar"/>
                <text x="36" y="295" fontSize="7.5" fill="#229388" fontWeight="700">MODEL ACCURACY</text>
                <text x="300" y="295" fontSize="7.5" fill="#229388" fontWeight="700" textAnchor="end">98.5%</text>

                <rect x="20" y="320" width="320" height="20" rx="0" fill="rgba(34,147,136,0.08)"/>
                <text x="180" y="334" textAnchor="middle" fontSize="8" fill="#229388" fontWeight="700" letterSpacing="0.6">MLOPS · CONTINUOUS TRAINING · DRIFT MONITORING</text>
              </svg>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}>
          <h2 className="font-bold text-white leading-tight max-w-xl" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(24px,3vw,42px)", letterSpacing: "-0.025em" }}>
            Ready to deploy AI that actually works in production?
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
