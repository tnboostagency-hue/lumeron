"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  Plus,
  LogOut,
  Briefcase,
  Newspaper,
  Eye,
  EyeOff,
  Users,
  Pencil,
  X,
  ImagePlus,
  Download,
  Link2,
} from "lucide-react";
import { MAX_NEWS_COVER_DATA_URL_LENGTH } from "@/lib/news-cover";

const MAX_COVER_FILE_BYTES = 2 * 1024 * 1024;

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  published: boolean;
  sortOrder: number;
}

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  /** data:image/...;base64,... or null */
  coverImage: string | null;
  published: boolean;
}

interface ApplicationListItem {
  id: string;
  jobId: string | null;
  jobTitle: string;
  name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  coverLetter: string | null;
  themeGuide: string | null;
  cvFileName: string | null;
  cvMimeType: string | null;
  hasCv: boolean;
  portfolioImageFileName: string | null;
  portfolioImageMimeType: string | null;
  hasPortfolioImage: boolean;
  createdAt: string;
}

interface LinksProfile {
  id: string;
  phoneContact: string;
  whatsapp: string;
  linkedin: string;
  website: string;
  x: string;
  instagram: string;
}

const EMPTY_JOB: Omit<Job, "id"> = {
  title: "",
  department: "",
  location: "Al Khobar, Saudi Arabia",
  type: "Full-time",
  description: "",
  published: true,
  sortOrder: 0,
};
const EMPTY_ARTICLE: Omit<Article, "id"> = {
  title: "",
  category: "Company News",
  date: new Date().toISOString().split("T")[0],
  excerpt: "",
  content: "",
  coverImage: null,
  published: true,
};
const EMPTY_LINKS: LinksProfile = {
  id: "primary",
  phoneContact: "",
  whatsapp: "",
  linkedin: "",
  website: "",
  x: "",
  instagram: "",
};

function normalizeJobRow(row: Record<string, unknown>): Job {
  return {
    id: String(row.id),
    title: String(row.title),
    department: String(row.department),
    location: String(row.location),
    type: String(row.type),
    description: String(row.description),
    published: Boolean(row.published),
    sortOrder: Number.isFinite(Number(row.sortOrder)) ? Number(row.sortOrder) : 0,
  };
}

function normalizeArticleRow(row: Record<string, unknown>): Article {
  const c = row.coverImage ?? row.cover_image;
  return {
    id: String(row.id),
    title: String(row.title),
    category: String(row.category),
    date: String(row.date),
    excerpt: String(row.excerpt),
    content: String(row.content ?? ""),
    coverImage: typeof c === "string" && c.length > 0 ? c : null,
    published: Boolean(row.published),
  };
}

function formatAdminArticleDate(raw: string): string {
  if (!raw) return "";
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T12:00:00` : raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

type AuthState = "loading" | "guest" | "admin";
type AdminTab = "jobs" | "news" | "applications" | "links";

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [shake, setShake] = useState(false);
  const [tab, setTab] = useState<AdminTab>("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [applications, setApplications] = useState<ApplicationListItem[]>([]);
  const [linksForm, setLinksForm] = useState<LinksProfile>(EMPTY_LINKS);
  const [jobForm, setJobForm] = useState<Omit<Job, "id">>(EMPTY_JOB);
  const [articleForm, setArticleForm] = useState<Omit<Article, "id">>(EMPTY_ARTICLE);
  const [jobSuccess, setJobSuccess] = useState(false);
  const [articleSuccess, setArticleSuccess] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [jobFormError, setJobFormError] = useState<string | null>(null);
  const [articleFormError, setArticleFormError] = useState<string | null>(null);
  const [linksFormError, setLinksFormError] = useState<string | null>(null);
  const [linksSuccess, setLinksSuccess] = useState(false);

  const refreshJobs = useCallback(async () => {
    const r = await fetch("/api/admin/jobs", { credentials: "include", cache: "no-store" });
    if (!r.ok) return;
    const d = await r.json();
    const raw = Array.isArray(d.jobs) ? d.jobs : [];
    setJobs(raw.map((row: Record<string, unknown>) => normalizeJobRow(row)));
  }, []);

  const refreshNews = useCallback(async () => {
    const r = await fetch("/api/admin/news", { credentials: "include", cache: "no-store" });
    if (!r.ok) return;
    const d = await r.json();
    const raw = Array.isArray(d.articles) ? d.articles : [];
    setArticles(raw.map((row: Record<string, unknown>) => normalizeArticleRow(row)));
  }, []);

  const refreshApplications = useCallback(async () => {
    const r = await fetch("/api/admin/applications", { credentials: "include", cache: "no-store" });
    if (!r.ok) return;
    const d = await r.json();
    setApplications(d.applications ?? []);
  }, []);

  const refreshLinks = useCallback(async () => {
    const r = await fetch("/api/admin/links", { credentials: "include", cache: "no-store" });
    if (!r.ok) return;
    const d = await r.json();
    const l = d?.links ?? {};
    setLinksForm({
      id: "primary",
      phoneContact: String(l.phoneContact ?? ""),
      whatsapp: String(l.whatsapp ?? ""),
      linkedin: String(l.linkedin ?? ""),
      website: String(l.website ?? ""),
      x: String(l.x ?? ""),
      instagram: String(l.instagram ?? ""),
    });
  }, []);

  useEffect(() => {
    (async () => {
      setLoadError(null);
      try {
        const r = await fetch("/api/admin/session", { credentials: "include", cache: "no-store" });
        if (r.ok) {
          setAuthState("admin");
          await refreshJobs();
        } else {
          setAuthState("guest");
        }
      } catch {
        setAuthState("guest");
        setLoadError("Could not reach server.");
      }
    })();
  }, [refreshJobs]);

  useEffect(() => {
    if (authState !== "admin") return;
    refreshNews();
    refreshApplications();
    refreshLinks();
  }, [authState, refreshNews, refreshApplications, refreshLinks]);

  const handlePin = async () => {
    setPinError(false);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ pin }),
      });
      if (r.ok) {
        setAuthState("admin");
        setPin("");
        await refreshJobs();
        await refreshNews();
        await refreshApplications();
        await refreshLinks();
      } else {
        setPinError(true);
        setShake(true);
        setPin("");
        setTimeout(() => setShake(false), 600);
      }
    } catch {
      setPinError(true);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAuthState("guest");
    setJobs([]);
    setArticles([]);
    setApplications([]);
    setPin("");
  };

  const postJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobFormError(null);
    const payload = {
      ...jobForm,
      sortOrder: Number.isFinite(Number(jobForm.sortOrder)) ? Number(jobForm.sortOrder) : 0,
    };
    const url = editingJobId ? `/api/admin/jobs/${editingJobId}` : "/api/admin/jobs";
    const method = editingJobId ? "PATCH" : "POST";
    const r = await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      setJobFormError(typeof d.error === "string" ? d.error : "Could not save job.");
      return;
    }
    setEditingJobId(null);
    setJobForm(EMPTY_JOB);
    setJobSuccess(true);
    setTimeout(() => setJobSuccess(false), 3000);
    await refreshJobs();
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this job opening? It will be removed from /careers.")) return;
    const r = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE", credentials: "include" });
    if (r.ok) {
      if (editingJobId === id) {
        setEditingJobId(null);
        setJobForm(EMPTY_JOB);
      }
      await refreshJobs();
    }
  };

  const toggleJobPublished = async (job: Job) => {
    const r = await fetch(`/api/admin/jobs/${job.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !job.published }),
    });
    if (r.ok) await refreshJobs();
  };

  const startEditJob = (job: Job) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      published: job.published,
      sortOrder: job.sortOrder,
    });
    setJobFormError(null);
    setJobSuccess(false);
  };

  const cancelEditJob = () => {
    setEditingJobId(null);
    setJobForm(EMPTY_JOB);
    setJobFormError(null);
  };

  const postArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setArticleFormError(null);
    const url = editingArticleId ? `/api/admin/news/${editingArticleId}` : "/api/admin/news";
    const method = editingArticleId ? "PATCH" : "POST";
    const r = await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articleForm),
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      setArticleFormError(typeof d.error === "string" ? d.error : "Could not save article.");
      return;
    }
    setEditingArticleId(null);
    setArticleForm(EMPTY_ARTICLE);
    setArticleSuccess(true);
    setTimeout(() => setArticleSuccess(false), 3000);
    await refreshNews();
  };

  const deleteArticle = async (id: string) => {
    const r = await fetch(`/api/admin/news/${id}`, { method: "DELETE", credentials: "include" });
    if (r.ok) {
      if (editingArticleId === id) {
        setEditingArticleId(null);
        setArticleForm(EMPTY_ARTICLE);
      }
      await refreshNews();
    }
  };

  const downloadApplicationCv = async (a: ApplicationListItem) => {
    const r = await fetch(`/api/admin/applications/${a.id}/cv`, { credentials: "include" });
    if (!r.ok) {
      alert(r.status === 404 ? "CV not available." : "Could not download CV.");
      return;
    }
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = (a.cvFileName && a.cvFileName.trim()) || "cv.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadApplicationImage = async (a: ApplicationListItem) => {
    const r = await fetch(`/api/admin/applications/${a.id}/image`, { credentials: "include" });
    if (!r.ok) {
      alert(r.status === 404 ? "Image not available." : "Could not download image.");
      return;
    }
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = (a.portfolioImageFileName && a.portfolioImageFileName.trim()) || "portfolio-image.png";
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Delete this application permanently?")) return;
    const r = await fetch(`/api/admin/applications/${id}`, { method: "DELETE", credentials: "include" });
    if (r.ok) await refreshApplications();
  };

  const toggleArticlePublished = async (article: Article) => {
    const r = await fetch(`/api/admin/news/${article.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !article.published }),
    });
    if (r.ok) await refreshNews();
  };

  const saveLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinksFormError(null);
    const r = await fetch("/api/admin/links", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneContact: linksForm.phoneContact,
        whatsapp: linksForm.whatsapp,
        linkedin: linksForm.linkedin,
        website: linksForm.website,
        x: linksForm.x,
        instagram: linksForm.instagram,
      }),
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      setLinksFormError(typeof d.error === "string" ? d.error : "Could not save links.");
      return;
    }
    setLinksSuccess(true);
    setTimeout(() => setLinksSuccess(false), 3000);
    await refreshLinks();
  };

  const startEditArticle = (article: Article) => {
    setEditingArticleId(article.id);
    const d = article.date.includes("T") ? article.date.split("T")[0]! : article.date.slice(0, 10);
    setArticleForm({
      title: article.title,
      category: article.category,
      date: /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : new Date().toISOString().split("T")[0]!,
      excerpt: article.excerpt,
      content: article.content,
      coverImage: article.coverImage,
      published: article.published,
    });
    setArticleFormError(null);
    setArticleSuccess(false);
  };

  const cancelEditArticle = () => {
    setEditingArticleId(null);
    setArticleForm(EMPTY_ARTICLE);
    setArticleFormError(null);
  };

  if (authState === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <p className="text-[#64748b] text-[14px]">Loading admin…</p>
      </div>
    );
  }

  if (authState === "guest") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#0d1f1e 0%,#1a3330 50%,#0d2e2c 100%)" }}
      >
        <style>{`
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} }
          .shake { animation: shake 0.5s ease; }
        `}</style>

        <div className={`w-full max-w-[400px] mx-4 ${shake ? "shake" : ""}`}>
          <div className="flex justify-center mb-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 737.38 158.61" className="w-[160px] h-[40px]">
              <circle fill="#229388" cx="413.61" cy="20.49" r="20.49" />
              <circle fill="#229388" cx="667.23" cy="20.49" r="20.49" />
              <circle fill="#229388" cx="715.25" cy="20.49" r="20.49" />
              <rect fill="#229388" x="442.03" width="157.57" height="40.99" rx="18.6" />
              <path
                fill="#ffffff"
                d="M0,150.3V32.75a8.19,8.19,0,0,1,16.38,0V142.11h92a8.19,8.19,0,1,1,0,16.38H8.19A8.19,8.19,0,0,1,0,150.3Z"
              />
              <path
                fill="#ffffff"
                d="M209.09,77.19v73.23a8.17,8.17,0,0,1-16.32.63,39.36,39.36,0,0,1-62.56-31.88v-42a8.19,8.19,0,1,1,16.38,0v42a23.06,23.06,0,0,0,46.12,0v-42a8.19,8.19,0,0,1,16.38,0Z"
              />
              <path
                fill="#ffffff"
                d="M373.73,108.42v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,0,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64A39.25,39.25,0,0,1,303,84.46a39.39,39.39,0,0,1,70.69,24Z"
              />
              <path
                fill="#ffffff"
                d="M479.87,113.8a8.19,8.19,0,0,1-8.19,8.19H407.84a28.43,28.43,0,0,0,47.32,11.91,8.19,8.19,0,1,1,11.58,11.58,44.78,44.78,0,0,1-76.46-31c0-.21,0-.42,0-.64s0-.44,0-.65a44.8,44.8,0,0,1,89.59.65Zm-17.57-8.19a28.43,28.43,0,0,0-54.46,0Z"
              />
              <path
                fill="#ffffff"
                d="M545.75,77.18a8.19,8.19,0,0,1-8.19,8.19,23.08,23.08,0,0,0-23.06,23v42a8.19,8.19,0,1,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64A39.19,39.19,0,0,1,537.56,69,8.18,8.18,0,0,1,545.75,77.18Z"
              />
              <path
                fill="#ffffff"
                d="M640.24,113.8A44.81,44.81,0,1,1,595.44,69,44.85,44.85,0,0,1,640.24,113.8Zm-16.38,0a28.43,28.43,0,1,0-28.42,28.42A28.46,28.46,0,0,0,623.86,113.8Z"
              />
              <path
                fill="#ffffff"
                d="M737.38,108.42v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,1,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64,39.37,39.37,0,0,1,62.56,31.88Z"
              />
            </svg>
          </div>

          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#229388,#3ec8ba)" }} />
            <div className="p-8">
              <h1 className="text-white font-bold text-[22px] mb-1" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>
                Admin Portal
              </h1>
              <p className="text-white/40 text-[13px] mb-2">Enter your access PIN (set `ADMIN_PIN` in production).</p>
              {loadError && <p className="text-amber-400/90 text-[12px] mb-4">{loadError}</p>}

              <div className="mb-5 relative">
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white/50 mb-2">PIN Code</label>
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setPinError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handlePin()}
                    maxLength={32}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 pr-12 rounded-xl text-[16px] text-white placeholder-white/20 focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: pinError ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(255,255,255,0.1)",
                      caretColor: "#3ec8ba",
                      letterSpacing: "0.15em",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
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
          <p className="text-center text-white/20 text-[12px] mt-6">Lumeron — authorised access only</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-sm"
        style={{ background: "white", borderBottom: "1px solid #e2e8f0" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <span className="font-bold text-[15px] text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>
            Lumeron Admin
          </span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-[13px] text-[#64748b] hover:text-[#ef4444] transition-colors font-medium">
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-3 mb-8">
          {(
            [
              ["jobs", "Jobs", Briefcase, jobs.length],
              ["news", "News", Newspaper, articles.length],
              ["applications", "Applications", Users, applications.length],
              [
                "links",
                "Links",
                Link2,
                [linksForm.phoneContact, linksForm.whatsapp, linksForm.linkedin, linksForm.website, linksForm.x, linksForm.instagram].filter(Boolean).length,
              ],
            ] as const
          ).map(([key, label, Icon, count]) => (
            <button
              key={key}
              onClick={() => {
                setTab(key);
                if (key === "applications") refreshApplications();
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200"
              style={{
                background: tab === key ? "linear-gradient(135deg,#229388,#3ec8ba)" : "white",
                color: tab === key ? "white" : "#64748b",
                border: tab === key ? "none" : "1px solid #e2e8f0",
              }}
            >
              <Icon size={15} />
              {label} ({count})
            </button>
          ))}
        </div>

        {tab === "jobs" && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <h2 className="font-bold text-[20px] text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>
                  {editingJobId ? "Edit job" : "Post a new job"}
                </h2>
                {editingJobId && (
                  <button
                    type="button"
                    onClick={cancelEditJob}
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-[#64748b] hover:text-[#111827]"
                  >
                    <X size={15} /> Cancel
                  </button>
                )}
              </div>
              <form onSubmit={postJob} className="flex flex-col gap-4">
                {jobFormError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-800">{jobFormError}</div>
                )}
                {(
                  [
                    { label: "Job Title *", key: "title" as const, type: "text" },
                    { label: "Department *", key: "department" as const, type: "text" },
                    { label: "Location", key: "location" as const, type: "text" },
                  ] as const
                ).map((f) => (
                  <div key={f.key}>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">{f.label}</label>
                    <input
                      required={f.label.includes("*")}
                      type={f.type}
                      value={jobForm[f.key]}
                      onChange={(e) => setJobForm((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all"
                    />
                  </div>
                ))}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Employment Type</label>
                    <select
                      value={jobForm.type}
                      onChange={(e) => setJobForm((v) => ({ ...v, type: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] transition-all bg-white"
                    >
                      {["Full-time", "Part-time", "Contract", "Internship"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">
                      Sort order
                    </label>
                    <input
                      type="number"
                      value={jobForm.sortOrder}
                      onChange={(e) => setJobForm((v) => ({ ...v, sortOrder: Number(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all"
                    />
                    <p className="text-[11px] text-[#94a3b8] mt-1">Higher numbers appear first on the careers page.</p>
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={jobForm.published}
                    onChange={(e) => setJobForm((v) => ({ ...v, published: e.target.checked }))}
                    className="h-4 w-4 rounded border-[#e2e8f0] text-[#229388] focus:ring-[#229388]"
                  />
                  <span className="text-[14px] text-[#374151]">Visible on public careers page</span>
                </label>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Description *</label>
                  <textarea
                    required
                    rows={5}
                    value={jobForm.description}
                    onChange={(e) => setJobForm((v) => ({ ...v, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all resize-none"
                  />
                </div>
                {jobSuccess && (
                  <div className="rounded-xl px-4 py-3 text-[13px] font-semibold text-[#229388]" style={{ background: "rgba(34,147,136,0.08)" }}>
                    ✓ Job saved — synced to <a href="/careers" className="underline">/careers</a> when published.
                  </div>
                )}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-[14px] transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}
                >
                  {editingJobId ? <Pencil size={16} /> : <Plus size={16} />}
                  {editingJobId ? "Save changes" : "Post job"}
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[15px] text-[#64748b] uppercase tracking-[0.08em]">Posted Jobs</h3>
              {jobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center text-[13px] text-[#64748b] leading-relaxed">
                  <p className="text-[#94a3b8] mb-3">No jobs in the database yet.</p>
                  <p>Publish openings here and they appear on <a href="/careers" className="text-[#229388] underline">/careers</a> immediately when marked visible.</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className={`bg-white rounded-2xl border p-5 shadow-sm flex items-start justify-between gap-4 ${
                      editingJobId === job.id ? "border-[#229388] ring-2 ring-[#229388]/20" : "border-[#e2e8f0]"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-semibold text-[14px] text-[#111827] truncate">{job.title}</p>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            background: job.published ? "rgba(34,147,136,0.12)" : "rgba(148,163,184,0.2)",
                            color: job.published ? "#229388" : "#64748b",
                          }}
                        >
                          {job.published ? "Live" : "Hidden"}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#64748b]">
                        {job.department} · {job.type} · order {job.sortOrder}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        title={job.published ? "Hide from site" : "Publish to site"}
                        onClick={() => toggleJobPublished(job)}
                        className="text-[#94a3b8] hover:text-[#229388] transition-colors p-2 rounded-lg hover:bg-[#f0fdfc]"
                      >
                        {job.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => startEditJob(job)}
                        className="text-[#94a3b8] hover:text-[#229388] transition-colors p-2 rounded-lg hover:bg-[#f0fdfc]"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="text-[#94a3b8] hover:text-[#ef4444] transition-colors p-2 rounded-lg hover:bg-red-50"
                        type="button"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tab === "news" && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <h2 className="font-bold text-[20px] text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>
                  {editingArticleId ? "Edit article" : "Publish a news article"}
                </h2>
                {editingArticleId && (
                  <button
                    type="button"
                    onClick={cancelEditArticle}
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-[#64748b] hover:text-[#111827]"
                  >
                    <X size={15} /> Cancel
                  </button>
                )}
              </div>
              <form onSubmit={postArticle} className="flex flex-col gap-4">
                {articleFormError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-800">{articleFormError}</div>
                )}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Title *</label>
                  <input
                    required
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm((v) => ({ ...v, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Category</label>
                    <select
                      value={articleForm.category}
                      onChange={(e) => setArticleForm((v) => ({ ...v, category: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] transition-all bg-white"
                    >
                      {["Company News", "AI & Technology", "Cybersecurity", "Data Centers", "Industry 4.0", "Vision 2030"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Date</label>
                    <input
                      type="date"
                      value={articleForm.date}
                      onChange={(e) => setArticleForm((v) => ({ ...v, date: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Excerpt *</label>
                  <textarea
                    required
                    rows={2}
                    value={articleForm.excerpt}
                    onChange={(e) => setArticleForm((v) => ({ ...v, excerpt: e.target.value }))}
                    placeholder="Short summary shown in the news grid..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Cover image</label>
                  <p className="text-[12px] text-[#94a3b8] mb-2">Shown on the public news page. JPEG, PNG, GIF, or WebP — max ~2MB.</p>
                  {articleForm.coverImage && (
                    <div className="mb-3 relative rounded-xl overflow-hidden border border-[#e2e8f0] bg-[#f8fafc] max-h-[200px]">
                      <img src={articleForm.coverImage} alt="" className="w-full max-h-[200px] object-cover" />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-[13px] font-semibold text-[#374151] cursor-pointer hover:bg-[#f8fafc] transition-colors">
                      <ImagePlus size={16} className="text-[#229388]" />
                      {articleForm.coverImage ? "Replace image" : "Upload image"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          e.target.value = "";
                          if (!file) return;
                          if (!file.type.startsWith("image/")) {
                            setArticleFormError("Please choose an image file.");
                            return;
                          }
                          if (file.size > MAX_COVER_FILE_BYTES) {
                            setArticleFormError("Image must be under 2MB.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            const dataUrl = typeof reader.result === "string" ? reader.result : "";
                            if (dataUrl.length > MAX_NEWS_COVER_DATA_URL_LENGTH) {
                              setArticleFormError("Image is too large after encoding. Try a smaller file.");
                              return;
                            }
                            setArticleFormError(null);
                            setArticleForm((v) => ({ ...v, coverImage: dataUrl || null }));
                          };
                          reader.onerror = () => setArticleFormError("Could not read file.");
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    {articleForm.coverImage && (
                      <button
                        type="button"
                        onClick={() => setArticleForm((v) => ({ ...v, coverImage: null }))}
                        className="text-[13px] font-semibold text-[#64748b] hover:text-[#ef4444]"
                      >
                        Remove cover
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">Full Content</label>
                  <textarea
                    rows={6}
                    value={articleForm.content}
                    onChange={(e) => setArticleForm((v) => ({ ...v, content: e.target.value }))}
                    placeholder="Full article body shown when &quot;Read More&quot; is clicked..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all resize-none"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={articleForm.published}
                    onChange={(e) => setArticleForm((v) => ({ ...v, published: e.target.checked }))}
                    className="h-4 w-4 rounded border-[#e2e8f0] text-[#229388] focus:ring-[#229388]"
                  />
                  <span className="text-[14px] text-[#374151]">Visible on public news page</span>
                </label>
                {articleSuccess && (
                  <div className="rounded-xl px-4 py-3 text-[13px] font-semibold text-[#229388]" style={{ background: "rgba(34,147,136,0.08)" }}>
                    ✓ Article saved — synced to <a href="/news" className="underline">/news</a> when published.
                  </div>
                )}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-[14px] transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}
                >
                  {editingArticleId ? <Pencil size={16} /> : <Plus size={16} />}
                  {editingArticleId ? "Save changes" : "Publish article"}
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[15px] text-[#64748b] uppercase tracking-[0.08em]">All articles</h3>
              {articles.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center text-[14px] text-[#94a3b8]">No articles yet.</div>
              ) : (
                articles.map((article) => (
                  <div
                    key={article.id}
                    className={`bg-white rounded-2xl border p-5 shadow-sm flex items-start justify-between gap-4 ${
                      editingArticleId === article.id ? "border-[#229388] ring-2 ring-[#229388]/20" : "border-[#e2e8f0]"
                    }`}
                  >
                    <div className="min-w-0 flex-1 flex gap-3">
                      {article.coverImage ? (
                        <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#e2e8f0] shrink-0 bg-[#f1f5f9]">
                          <img src={article.coverImage} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : null}
                      <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-semibold text-[14px] text-[#111827] leading-snug">{article.title}</p>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            background: article.published ? "rgba(34,147,136,0.12)" : "rgba(148,163,184,0.2)",
                            color: article.published ? "#229388" : "#64748b",
                          }}
                        >
                          {article.published ? "Live" : "Hidden"}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#64748b]">
                        {article.category} · {formatAdminArticleDate(article.date)}
                      </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        title={article.published ? "Hide from site" : "Publish to site"}
                        onClick={() => toggleArticlePublished(article)}
                        className="text-[#94a3b8] hover:text-[#229388] transition-colors p-2 rounded-lg hover:bg-[#f0fdfc]"
                      >
                        {article.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => startEditArticle(article)}
                        className="text-[#94a3b8] hover:text-[#229388] transition-colors p-2 rounded-lg hover:bg-[#f0fdfc]"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="text-[#94a3b8] hover:text-[#ef4444] transition-colors p-2 rounded-lg hover:bg-red-50"
                        type="button"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tab === "applications" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[18px] text-[#111827]">Career applications</h2>
              <button
                type="button"
                onClick={() => refreshApplications()}
                className="text-[13px] font-semibold text-[#229388] hover:underline"
              >
                Refresh
              </button>
            </div>
            {applications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-10 text-center text-[14px] text-[#94a3b8]">
                No applications yet. Submissions from <a href="/careers" className="text-[#229388] underline">/careers</a> appear here.
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((a) => (
                  <div key={a.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[15px] text-[#111827]">{a.name}</p>
                        <p className="text-[13px] text-[#229388] mt-1">{a.jobTitle}</p>
                        <p className="text-[12px] text-[#64748b] mt-2">
                          <a href={`mailto:${a.email}`} className="underline">
                            {a.email}
                          </a>
                          {a.phone ? ` · ${a.phone}` : ""}
                        </p>
                        {a.linkedin && (
                          <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#229388] underline mt-1 inline-block">
                            LinkedIn
                          </a>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 text-[11px] text-[#94a3b8]">
                        <span>{new Date(a.createdAt).toLocaleString()}</span>
                        <div className="flex flex-wrap items-center justify-end gap-1">
                          {a.hasCv && (
                            <button
                              type="button"
                              onClick={() => void downloadApplicationCv(a)}
                              className="inline-flex items-center gap-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1.5 text-[12px] font-semibold text-[#229388] hover:bg-[#f0fdfc]"
                            >
                              <Download size={14} />
                              Download CV
                            </button>
                          )}
                          {a.hasPortfolioImage && (
                            <button
                              type="button"
                              onClick={() => void downloadApplicationImage(a)}
                              className="inline-flex items-center gap-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1.5 text-[12px] font-semibold text-[#229388] hover:bg-[#f0fdfc]"
                            >
                              <Download size={14} />
                              Download Image
                            </button>
                          )}
                          <button
                            type="button"
                            title="Delete application"
                            onClick={() => void deleteApplication(a.id)}
                            className="p-2 rounded-lg text-[#94a3b8] hover:text-[#ef4444] hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        {a.hasCv && a.cvFileName && (
                          <span className="text-[10px] text-[#64748b] max-w-[220px] truncate" title={a.cvFileName}>
                            {a.cvFileName}
                          </span>
                        )}
                        {a.hasPortfolioImage && a.portfolioImageFileName && (
                          <span className="text-[10px] text-[#64748b] max-w-[220px] truncate" title={a.portfolioImageFileName}>
                            {a.portfolioImageFileName}
                          </span>
                        )}
                      </div>
                    </div>
                    {a.coverLetter && (
                      <p className="mt-4 text-[13px] text-[#64748b] leading-relaxed border-t border-[#e2e8f0] pt-4 whitespace-pre-wrap">{a.coverLetter}</p>
                    )}
                    {a.themeGuide && (
                      <p className="mt-3 text-[13px] text-[#64748b] leading-relaxed border-t border-[#e2e8f0] pt-4 whitespace-pre-wrap">
                        <span className="font-semibold text-[#111827]">Theme guide:</span> {a.themeGuide}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "links" && (
          <div className="grid lg:grid-cols-[1fr_330px] gap-8 items-start">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-7 shadow-sm">
              <h2 className="font-bold text-[20px] text-[#111827] mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>
                Link in bio setup
              </h2>
              <form onSubmit={saveLinks} className="space-y-4">
                {linksFormError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-800">{linksFormError}</div>
                )}
                {(
                  [
                    ["phoneContact", "Phone Contact", "+966..."],
                    ["whatsapp", "WhatsApp", "https://wa.me/... or phone"],
                    ["linkedin", "LinkedIn", "linkedin.com/company/..."],
                    ["website", "Website", "lumeron.sa"],
                    ["x", "X", "x.com/..."],
                    ["instagram", "Instagram", "instagram.com/..."],
                  ] as const
                ).map(([key, label, placeholder]) => (
                  <div key={key}>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-1.5">{label}</label>
                    <input
                      type="text"
                      value={linksForm[key]}
                      placeholder={placeholder}
                      onChange={(e) => setLinksForm((v) => ({ ...v, [key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[14px] text-[#111827] focus:outline-none focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/10 transition-all"
                    />
                  </div>
                ))}
                {linksSuccess && (
                  <div className="rounded-xl px-4 py-3 text-[13px] font-semibold text-[#229388]" style={{ background: "rgba(34,147,136,0.08)" }}>
                    ✓ Links saved — synced to <a href="/links" className="underline">/links</a>.
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-[14px] transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}
                >
                  <Link2 size={16} /> Save links
                </button>
              </form>
            </div>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
              <h3 className="font-semibold text-[14px] uppercase tracking-[0.08em] text-[#64748b] mb-4">Public page</h3>
              <p className="text-[13px] text-[#64748b] leading-relaxed mb-3">
                The <a href="/links" className="text-[#229388] underline">/links</a> page is optimized for mobile and shows only non-empty links.
              </p>
              <p className="text-[12px] text-[#94a3b8]">
                Tips: use full URLs for social channels. For WhatsApp you can paste a URL or phone number.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
