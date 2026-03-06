"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, LogOut, Briefcase, Newspaper, Eye, EyeOff } from "lucide-react";

const PIN = "53577426";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
}

const EMPTY_JOB: Omit<Job, "id"> = { title: "", department: "", location: "Al Khobar, Saudi Arabia", type: "Full-time", description: "" };
const EMPTY_ARTICLE: Omit<Article, "id"> = { title: "", category: "Company News", date: new Date().toISOString().split("T")[0], excerpt: "", content: "" };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [tab, setTab] = useState<"jobs" | "news">("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [jobForm, setJobForm] = useState<Omit<Job, "id">>(EMPTY_JOB);
  const [articleForm, setArticleForm] = useState<Omit<Article, "id">>(EMPTY_ARTICLE);
  const [jobSuccess, setJobSuccess] = useState(false);
  const [articleSuccess, setArticleSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem("lumeron_admin_auth");
    if (ok === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    try {
      const j = localStorage.getItem("lumeron_jobs");
      if (j) setJobs(JSON.parse(j));
      const n = localStorage.getItem("lumeron_news");
      if (n) setArticles(JSON.parse(n));
    } catch {}
  }, [authed]);

  const handlePin = () => {
    if (pin === PIN) {
      sessionStorage.setItem("lumeron_admin_auth", "true");
      setAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("lumeron_admin_auth");
    setAuthed(false);
    setPin("");
  };

  const saveJobs = (updated: Job[]) => {
    setJobs(updated);
    localStorage.setItem("lumeron_jobs", JSON.stringify(updated));
  };

  const saveArticles = (updated: Article[]) => {
    setArticles(updated);
    localStorage.setItem("lumeron_news", JSON.stringify(updated));
  };

  const postJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = { ...jobForm, id: Date.now().toString() };
    saveJobs([newJob, ...jobs]);
    setJobForm(EMPTY_JOB);
    setJobSuccess(true);
    setTimeout(() => setJobSuccess(false), 3000);
  };

  const postArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: Article = { ...articleForm, id: Date.now().toString() };
    saveArticles([newArticle, ...articles]);
    setArticleForm(EMPTY_ARTICLE);
    setArticleSuccess(true);
    setTimeout(() => setArticleSuccess(false), 3000);
  };

  /* ── PIN Screen ─────────────────────────────────────────────────────────── */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d1f1e 0%,#1a3330 50%,#0d2e2c 100%)" }}>
        <style>{`
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} }
          .shake { animation: shake 0.5s ease; }
        `}</style>

        <div className={`w-full max-w-[400px] mx-4 ${shake ? "shake" : ""}`}>
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 737.38 158.61" className="w-[160px] h-[40px]">
              <circle fill="#229388" cx="413.61" cy="20.49" r="20.49"/>
              <circle fill="#229388" cx="667.23" cy="20.49" r="20.49"/>
              <circle fill="#229388" cx="715.25" cy="20.49" r="20.49"/>
              <rect fill="#229388" x="442.03" width="157.57" height="40.99" rx="18.6"/>
              <path fill="#ffffff" d="M0,150.3V32.75a8.19,8.19,0,0,1,16.38,0V142.11h92a8.19,8.19,0,1,1,0,16.38H8.19A8.19,8.19,0,0,1,0,150.3Z"/>
              <path fill="#ffffff" d="M209.09,77.19v73.23a8.17,8.17,0,0,1-16.32.63,39.36,39.36,0,0,1-62.56-31.88v-42a8.19,8.19,0,1,1,16.38,0v42a23.06,23.06,0,0,0,46.12,0v-42a8.19,8.19,0,0,1,16.38,0Z"/>
              <path fill="#ffffff" d="M373.73,108.42v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,0,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64A39.25,39.25,0,0,1,303,84.46a39.39,39.39,0,0,1,70.69,24Z"/>
              <path fill="#ffffff" d="M479.87,113.8a8.19,8.19,0,0,1-8.19,8.19H407.84a28.43,28.43,0,0,0,47.32,11.91,8.19,8.19,0,1,1,11.58,11.58,44.78,44.78,0,0,1-76.46-31c0-.21,0-.42,0-.64s0-.44,0-.65a44.8,44.8,0,0,1,89.59.65Zm-17.57-8.19a28.43,28.43,0,0,0-54.46,0Z"/>
              <path fill="#ffffff" d="M545.75,77.18a8.19,8.19,0,0,1-8.19,8.19,23.08,23.08,0,0,0-23.06,23v42a8.19,8.19,0,1,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64A39.19,39.19,0,0,1,537.56,69,8.18,8.18,0,0,1,545.75,77.18Z"/>
              <path fill="#ffffff" d="M640.24,113.8A44.81,44.81,0,1,1,595.44,69,44.85,44.85,0,0,1,640.24,113.8Zm-16.38,0a28.43,28.43,0,1,0-28.42,28.42A28.46,28.46,0,0,0,623.86,113.8Z"/>
              <path fill="#ffffff" d="M737.38,108.42v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,1,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64,39.37,39.37,0,0,1,62.56,31.88Z"/>
            </svg>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#229388,#3ec8ba)" }} />
            <div className="p-8">
              <h1 className="text-white font-bold text-[22px] mb-1" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>Admin Portal</h1>
              <p className="text-white/40 text-[13px] mb-8">Enter your access PIN to continue</p>

              <div className="mb-5 relative">
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white/50 mb-2">PIN Code</label>
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                    onKeyDown={(e) => e.key === "Enter" && handlePin()}
                    maxLength={12}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 pr-12 rounded-xl text-[16px] text-white placeholder-white/20 focus:outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.07)", border: pinError ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(255,255,255,0.1)", caretColor: "#3ec8ba", letterSpacing: "0.2em" }}
                  />
                  <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {pinError && <p className="mt-2 text-[12px] text-red-400">Incorrect PIN. Please try again.</p>}
              </div>

              <button
                onClick={handlePin}
                className="w-full py-3.5 rounded-xl font-semibold text-[15px] text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}
              >
                Access Portal
              </button>
            </div>
          </div>
          <p className="text-center text-white/20 text-[12px] mt-6">Lumeron Internal Systems — Authorised Access Only</p>
        </div>
      </div>
    );
  }

  /* ── Dashboard ──────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-sm" style={{ background: "white", borderBottom: "1px solid #e2e8f0" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </div>
          <span className="font-bold text-[15px] text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>Lumeron Admin</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-[13px] text-[#64748b] hover:text-[#ef4444] transition-colors font-medium">
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {(["jobs", "news"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200"
              style={{
                background: tab === t ? "linear-gradient(135deg,#229388,#3ec8ba)" : "white",
                color: tab === t ? "white" : "#64748b",
                border: tab === t ? "none" : "1px solid #e2e8f0",
              }}
            >
              {t === "jobs" ? <Briefcase size={15} /> : <Newspaper size={15} />}
              {t === "jobs" ? `Jobs (${jobs.length})` : `News (${articles.length})`}
            </button>
          ))}
        </div>

        {/* ─── Jobs Tab ─────────────────────────────────────────── */}
        {tab === "jobs" && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Post form */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-sm">
              <h2 className="font-bold text-[20px] text-[#111827] mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>Post a New Job</h2>
              <form onSubmit={postJob} className="flex flex-col gap-4">
                {[
                  { label: "Job Title *", key: "title" as const, type: "text" },
                  { label: "Department *", key: "department" as const, type: "text" },
                  { label: "Location", key: "location" as const, type: "text" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">{f.label}</label>
                    <input required={f.label.includes("*")} type={f.type} value={jobForm[f.key]} onChange={(e) => setJobForm((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Employment Type</label>
                  <select value={jobForm.type} onChange={(e) => setJobForm((v) => ({ ...v, type: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] transition-all bg-white">
                    {["Full-time", "Part-time", "Contract", "Internship"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Description *</label>
                  <textarea required rows={5} value={jobForm.description} onChange={(e) => setJobForm((v) => ({ ...v, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all resize-none" />
                </div>
                {jobSuccess && <div className="rounded-xl px-4 py-3 text-[13px] font-semibold text-[#229388]" style={{ background: "rgba(34,147,136,0.08)" }}>✓ Job posted — visible on /careers</div>}
                <button type="submit" className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-[14px] transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                  <Plus size={16} /> Post Job
                </button>
              </form>
            </div>

            {/* Jobs list */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[15px] text-[#64748b] uppercase tracking-[0.08em]">Posted Jobs</h3>
              {jobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center text-[14px] text-[#94a3b8]">No jobs posted yet.</div>
              ) : jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-[14px] text-[#111827] truncate">{job.title}</p>
                    <p className="text-[12px] text-[#64748b] mt-0.5">{job.department} · {job.type}</p>
                  </div>
                  <button onClick={() => saveJobs(jobs.filter((j) => j.id !== job.id))} className="text-[#94a3b8] hover:text-[#ef4444] transition-colors flex-shrink-0 p-1.5 rounded-lg hover:bg-red-50">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── News Tab ─────────────────────────────────────────── */}
        {tab === "news" && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Post form */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-sm">
              <h2 className="font-bold text-[20px] text-[#111827] mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>Publish a News Article</h2>
              <form onSubmit={postArticle} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Title *</label>
                  <input required type="text" value={articleForm.title} onChange={(e) => setArticleForm((v) => ({ ...v, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Category</label>
                    <select value={articleForm.category} onChange={(e) => setArticleForm((v) => ({ ...v, category: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] transition-all bg-white">
                      {["Company News","AI & Technology","Cybersecurity","Data Centers","Industry 4.0","Vision 2030"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Date</label>
                    <input type="date" value={articleForm.date} onChange={(e) => setArticleForm((v) => ({ ...v, date: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Excerpt *</label>
                  <textarea required rows={2} value={articleForm.excerpt} onChange={(e) => setArticleForm((v) => ({ ...v, excerpt: e.target.value }))}
                    placeholder="Short summary shown in the news grid..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all resize-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Full Content</label>
                  <textarea rows={6} value={articleForm.content} onChange={(e) => setArticleForm((v) => ({ ...v, content: e.target.value }))}
                    placeholder="Full article body shown when 'Read More' is clicked..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all resize-none" />
                </div>
                {articleSuccess && <div className="rounded-xl px-4 py-3 text-[13px] font-semibold text-[#229388]" style={{ background: "rgba(34,147,136,0.08)" }}>✓ Article published — visible on /news</div>}
                <button type="submit" className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-[14px] transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                  <Plus size={16} /> Publish Article
                </button>
              </form>
            </div>

            {/* Articles list */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[15px] text-[#64748b] uppercase tracking-[0.08em]">Published Articles</h3>
              {articles.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center text-[14px] text-[#94a3b8]">No articles published yet.</div>
              ) : articles.map((article) => (
                <div key={article.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-[14px] text-[#111827] leading-snug">{article.title}</p>
                    <p className="text-[12px] text-[#64748b] mt-0.5">{article.category} · {article.date}</p>
                  </div>
                  <button onClick={() => saveArticles(articles.filter((a) => a.id !== article.id))} className="text-[#94a3b8] hover:text-[#ef4444] transition-colors flex-shrink-0 p-1.5 rounded-lg hover:bg-red-50">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
