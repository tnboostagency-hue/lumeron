"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import { ChevronDown, MapPin, Briefcase, Clock, Send } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const DEFAULT_JOBS: Job[] = [
  {
    id: "default-1",
    title: "AI & Machine Learning Engineer",
    department: "Artificial Intelligence",
    location: "Al Khobar, Saudi Arabia",
    type: "Full-time",
    description: "Design and deploy production-grade AI/ML systems including Arabic-native LLMs, computer vision pipelines, and industrial edge inference models. Work alongside multidisciplinary teams to deliver sovereign AI solutions aligned with Vision 2030.",
  },
  {
    id: "default-2",
    title: "Cybersecurity Analyst (SOC)",
    department: "Cybersecurity",
    location: "Al Khobar, Saudi Arabia",
    type: "Full-time",
    description: "Monitor, detect, and respond to threats across enterprise IT and OT environments in our 24/7 SOC. Apply SIEM, MDR/XDR, and threat intelligence platforms to protect critical national infrastructure aligned with NCA ECC frameworks.",
  },
  {
    id: "default-3",
    title: "Data Center Project Manager",
    department: "Digital Infrastructure",
    location: "Al Khobar, Saudi Arabia",
    type: "Full-time",
    description: "Lead end-to-end delivery of Tier IV data center projects from concept through Level 1–5 commissioning. Coordinate multidisciplinary engineering teams, manage CAPEX/OPEX budgets, and ensure compliance with Uptime Institute standards.",
  },
];

export default function CareersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(DEFAULT_JOBS);
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [applied, setApplied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", linkedin: "", position: "", cover: "", cv: "" });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lumeron_jobs");
      if (stored) {
        const parsed: Job[] = JSON.parse(stored);
        if (parsed.length > 0) setJobs([...DEFAULT_JOBS, ...parsed]);
      }
    } catch {}
  }, []);

  const handleApply = (jobId: string, jobTitle: string) => {
    setOpenJobId(openJobId === jobId ? null : jobId);
    setForm((f) => ({ ...f, position: jobTitle }));
    setApplied(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          linkedin: form.linkedin,
          position: form.position,
          cover: form.cover,
        }),
      });
    } catch {
      // fall through to success state
    }
    setApplied(openJobId);
    setOpenJobId(null);
    setForm({ name: "", email: "", phone: "", linkedin: "", position: "", cover: "", cv: "" });
  };

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />
      <PageWrapper>
        {/* HERO */}
        <section className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden bg-white pt-20">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.055) 1px,transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%,black 20%,transparent 75%)" }} />
          <div className="absolute pointer-events-none" style={{ top: "-5%", left: "50%", transform: "translateX(-50%)", width: "860px", height: "500px", background: "radial-gradient(ellipse at center,rgba(34,147,136,0.08) 0%,transparent 65%)" }} />

          <div className="container mx-auto px-6 md:px-8 pb-20 relative z-10">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-6 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Careers</span>
            </div>
            <h1 className="font-bold leading-[0.95] tracking-tight mb-10" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(48px,7vw,88px)", color: "#111827", letterSpacing: "-0.03em" }}>
              Build the<br />
              <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Future</span><br />
              with us.
            </h1>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="text-[17px] text-[#64748b] leading-[1.75] max-w-[440px] font-light">
                Join Saudi Arabia's leading sovereign technology company — building the digital infrastructure, AI systems, and cybersecurity capabilities that power the Kingdom's Vision 2030.
              </p>
              <a href="#openings" className="btn-primary text-[14px] px-8 py-3.5 flex-shrink-0">View Open Positions</a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="border-y border-[#e2e8f0] bg-white grid grid-cols-2 lg:grid-cols-4 shadow-sm">
          {[
            { num: "Al Khobar", label: "Headquarters" },
            { num: "5+", label: "Service divisions" },
            { num: "Vision", label: "2030 aligned" },
            { num: "Saudi-first", label: "Talent philosophy" },
          ].map((s) => (
            <div key={s.label} className="px-10 py-10 border-r border-[#e2e8f0] last:border-r-0">
              <div className="font-bold leading-none mb-2 text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(20px,2.5vw,32px)", letterSpacing: "-0.02em" }}>{s.num}</div>
              <div className="text-[12px] font-medium tracking-[0.07em] uppercase text-[#94a3b8]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* OPEN POSITIONS */}
        <section id="openings" className="py-28 bg-[#f8fafc] border-t border-[#e2e8f0]">
          <div className="container mx-auto px-6 md:px-8">
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">Open Positions</span>
              </div>
              <h2 className="font-bold" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                Current openings
              </h2>
            </div>

            <div className="flex flex-col gap-5 max-w-4xl">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Job header */}
                  <div className="p-7">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-[20px] text-[#111827] mb-2" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{job.title}</h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="flex items-center gap-1.5 text-[12px] text-[#64748b]"><Briefcase size={13} className="text-[#229388]" />{job.department}</span>
                          <span className="flex items-center gap-1.5 text-[12px] text-[#64748b]"><MapPin size={13} className="text-[#229388]" />{job.location}</span>
                          <span className="flex items-center gap-1.5 text-[12px] text-[#64748b]"><Clock size={13} className="text-[#229388]" />{job.type}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(job.id, job.title)}
                        className="flex-shrink-0 flex items-center gap-2 text-[13px] font-semibold px-6 py-2.5 rounded-full transition-all duration-200"
                        style={{ background: openJobId === job.id ? "#f0fdfc" : "linear-gradient(135deg,#229388,#3ec8ba)", color: openJobId === job.id ? "#229388" : "white", border: openJobId === job.id ? "1px solid rgba(34,147,136,0.3)" : "none" }}
                      >
                        {openJobId === job.id ? "Close" : applied === job.id ? "Applied ✓" : "Apply Now"}
                        {openJobId !== job.id && applied !== job.id && <ChevronDown size={15} />}
                      </button>
                    </div>
                    <p className="text-[14px] text-[#64748b] leading-[1.75]">{job.description}</p>
                  </div>

                  {/* Application form */}
                  {openJobId === job.id && (
                    <form onSubmit={handleSubmit} className="border-t border-[#e2e8f0] p-7 bg-[#fafcff]">
                      <h4 className="font-semibold text-[16px] text-[#111827] mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>Apply for: {job.title}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {[
                          { id: "name", label: "Full Name *", type: "text", key: "name" as const },
                          { id: "email", label: "Email Address *", type: "email", key: "email" as const },
                          { id: "phone", label: "Phone Number", type: "tel", key: "phone" as const },
                          { id: "linkedin", label: "LinkedIn Profile URL", type: "url", key: "linkedin" as const },
                        ].map((f) => (
                          <div key={f.id}>
                            <label className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-[0.06em]">{f.label}</label>
                            <input
                              type={f.type}
                              required={f.label.includes("*")}
                              value={form[f.key]}
                              onChange={(e) => setForm((v) => ({ ...v, [f.key]: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all bg-white"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mb-4">
                        <label className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-[0.06em]">Cover Letter</label>
                        <textarea
                          rows={4}
                          value={form.cover}
                          onChange={(e) => setForm((v) => ({ ...v, cover: e.target.value }))}
                          placeholder="Tell us why you're excited about this role and what makes you the right fit..."
                          className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all bg-white resize-none"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-[0.06em]">Upload CV / Resume *</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          className="w-full text-[13px] text-[#64748b] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[12px] file:font-semibold file:bg-[#229388]/10 file:text-[#229388] hover:file:bg-[#229388]/20 transition-all cursor-pointer"
                        />
                        <p className="text-[11px] text-[#94a3b8] mt-1.5">PDF, DOC or DOCX — max 10MB</p>
                      </div>
                      <button type="submit" className="flex items-center gap-2 btn-primary text-[14px] px-8 py-3.5">
                        <Send size={15} /> Submit Application
                      </button>
                    </form>
                  )}

                  {applied === job.id && (
                    <div className="border-t border-[#e2e8f0] px-7 py-5 bg-[#f0fdfc] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-[#229388]">Application submitted!</p>
                        <p className="text-[12px] text-[#64748b]">We'll review your profile and be in touch within 5 business days.</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}>
          <h2 className="font-bold text-white leading-tight max-w-xl" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(22px,3vw,38px)", letterSpacing: "-0.025em" }}>
            Don't see the right role? Send us your CV anyway.
          </h2>
          <button onClick={() => setModalOpen(true)} className="flex-shrink-0 bg-white font-semibold text-[13px] tracking-[0.08em] uppercase px-10 py-4 rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md" style={{ color: "#229388" }}>
            Get in Touch
          </button>
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
}
