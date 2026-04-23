"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import { ChevronDown, MapPin, Briefcase, Clock, Send, Newspaper } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

interface FeedItem {
  id: string;
  type: "job" | "news";
  title: string;
  category: string;
  excerpt: string;
  date: string;
  href: string;
}

function mapApiJob(row: Record<string, unknown>): Job {
  return {
    id: String(row.id),
    title: String(row.title),
    department: String(row.department),
    location: String(row.location),
    type: String(row.type),
    description: String(row.description),
  };
}

export default function CareersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [applied, setApplied] = useState<string | null>(null);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    position: "",
    cover: "",
    themeGuide: "",
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setJobsLoading(true);
      try {
        const r = await fetch("/api/jobs", { cache: "no-store" });
        const d = await r.json();
        if (cancelled) return;
        const list = Array.isArray(d.jobs) ? d.jobs.map((row: Record<string, unknown>) => mapApiJob(row)) : [];
        setJobs(list);
      } catch {
        if (!cancelled) setJobs([]);
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/feed", { cache: "no-store" });
        const d = await r.json();
        if (cancelled) return;
        const list = Array.isArray(d.items) ? d.items : [];
        setFeedItems(
          list
            .filter((item: FeedItem) => item.type === "news")
            .slice(0, 3)
        );
      } catch {
        if (!cancelled) setFeedItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleApply = (jobId: string, jobTitle: string) => {
    setOpenJobId(openJobId === jobId ? null : jobId);
    setForm((f) => ({ ...f, position: jobTitle }));
    setApplied(null);
    setApplyError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApplyError(null);
    const formEl = e.currentTarget;
    const fileInput = formEl.querySelector<HTMLInputElement>('input[name="cv"]');
    const file = fileInput?.files?.[0];
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("email", form.email.trim());
    fd.append("phone", form.phone.trim());
    fd.append("linkedin", form.linkedin.trim());
    fd.append("position", form.position.trim());
    fd.append("cover", form.cover);
    fd.append("themeGuide", form.themeGuide);
    const imageInput = formEl.querySelector<HTMLInputElement>('input[name="portfolioImage"]');
    const portfolioImage = imageInput?.files?.[0];
    if (openJobId) fd.append("jobId", openJobId);
    if (file) fd.append("cv", file);
    if (portfolioImage) fd.append("portfolioImage", portfolioImage);

    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setApplyError(data.error ?? "Could not submit. Try again or contact us.");
        return;
      }
      setApplied(openJobId);
      setOpenJobId(null);
      setForm({ name: "", email: "", phone: "", linkedin: "", position: "", cover: "", themeGuide: "" });
      fileInput.value = "";
      if (imageInput) imageInput.value = "";
    } catch {
      setApplyError("Network error. Check your connection and try again.");
    }
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

        {/* NEWS FEED */}
        {feedItems.length > 0 && (
          <section className="py-14 bg-white border-t border-[#e2e8f0]">
            <div className="container mx-auto px-6 md:px-8">
              <div className="flex items-center gap-2 mb-6">
                <Newspaper size={15} className="text-[#229388]" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#229388]">Latest from News Feed</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {feedItems.map((item) => (
                  <a key={item.id} href={item.href} className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 hover:bg-white hover:shadow-sm transition-all">
                    <p className="text-[11px] uppercase tracking-[0.08em] text-[#229388] font-semibold mb-2">{item.category}</p>
                    <h3 className="text-[15px] font-semibold text-[#111827] leading-snug mb-2">{item.title}</h3>
                    <p className="text-[12px] text-[#64748b] leading-relaxed line-clamp-3">{item.excerpt}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

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
              {jobsLoading && (
                <div className="rounded-2xl border border-[#e2e8f0] bg-white px-7 py-12 text-center text-[14px] text-[#64748b]">
                  Loading open positions…
                </div>
              )}
              {!jobsLoading && jobs.length === 0 && (
                <div className="rounded-2xl border border-[#e2e8f0] bg-white px-7 py-14 text-center max-w-xl">
                  <p className="font-semibold text-[#111827] text-[17px] mb-2" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>
                    No open positions at the moment
                  </p>
                  <p className="text-[14px] text-[#64748b] leading-relaxed">
                    Roles you publish in the admin portal (as visible) show up here automatically. Check back soon or use Get in Touch below.
                  </p>
                </div>
              )}
              {!jobsLoading && jobs.map((job) => (
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
                      {applyError && (
                        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-800" role="alert">
                          {applyError}
                        </p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {[
                          { id: "name", label: "Full Name *", type: "text", key: "name" as const },
                          { id: "email", label: "Email Address", type: "email", key: "email" as const },
                          { id: "phone", label: "Phone Number *", type: "tel", key: "phone" as const },
                          { id: "linkedin", label: "LinkedIn Profile URL", type: "url", key: "linkedin" as const },
                        ].map((f) => (
                          <div key={f.id}>
                            <label className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-[0.06em]">{f.label}</label>
                            <input
                              id={f.id}
                              name={f.key}
                              type={f.type}
                          required={f.key === "name" || f.key === "phone"}
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
                          name="cover"
                          rows={4}
                          value={form.cover}
                          onChange={(e) => setForm((v) => ({ ...v, cover: e.target.value }))}
                          placeholder="Tell us why you're excited about this role and what makes you the right fit..."
                          className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all bg-white resize-none"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-[0.06em]">Theme Guide (optional)</label>
                        <textarea
                          name="themeGuide"
                          rows={3}
                          value={form.themeGuide}
                          onChange={(e) => setForm((v) => ({ ...v, themeGuide: e.target.value }))}
                          placeholder="Share your visual approach, brand tone, and design thinking."
                          className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all bg-white resize-none"
                        />
                      </div>
                      <div className="mb-4 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#229388] mb-1">Theme guide tips</p>
                        <ul className="text-[12px] text-[#64748b] leading-relaxed list-disc pl-4 space-y-0.5">
                          <li>Use clean typography and high-contrast hierarchy.</li>
                          <li>Keep layout simple and outcome-focused.</li>
                          <li>Match visuals to the role and business domain.</li>
                        </ul>
                      </div>
                      <div className="mb-6">
                        <label className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-[0.06em]">Upload CV / Resume</label>
                        <input
                          key={`cv-${job.id}-${openJobId}`}
                          name="cv"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="w-full text-[13px] text-[#64748b] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[12px] file:font-semibold file:bg-[#229388]/10 file:text-[#229388] hover:file:bg-[#229388]/20 transition-all cursor-pointer"
                        />
                        <p className="text-[11px] text-[#94a3b8] mt-1.5">PDF, DOC or DOCX — max 8MB</p>
                      </div>
                      <div className="mb-6">
                        <label className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-[0.06em]">Portfolio / Work Sample Image (optional)</label>
                        <input
                          name="portfolioImage"
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          className="w-full text-[13px] text-[#64748b] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[12px] file:font-semibold file:bg-[#229388]/10 file:text-[#229388] hover:file:bg-[#229388]/20 transition-all cursor-pointer"
                        />
                        <p className="text-[11px] text-[#94a3b8] mt-1.5">PNG, JPG, GIF, or WebP — max 5MB</p>
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
