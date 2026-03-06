"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import { Calendar, Tag, ChevronDown } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "AI & Technology": "#229388",
  "Cybersecurity": "#1a7a70",
  "Data Centers": "#3ec8ba",
  "Industry 4.0": "#2eb5a8",
  "Company News": "#0d2e2c",
  "Vision 2030": "#229388",
};

export default function NewsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lumeron_news");
      if (stored) setArticles(JSON.parse(stored));
    } catch {}
  }, []);

  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];
  const filtered = filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <PageWrapper>
      <>
        <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        <Navbar />

        {/* HERO */}
        <section className="relative min-h-[65vh] flex flex-col justify-end overflow-hidden bg-white pt-20">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(34,147,136,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.055) 1px,transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%,black 20%,transparent 75%)" }} />
          <div className="absolute pointer-events-none" style={{ top: "-5%", left: "50%", transform: "translateX(-50%)", width: "860px", height: "500px", background: "radial-gradient(ellipse at center,rgba(34,147,136,0.08) 0%,transparent 65%)" }} />

          <div className="container mx-auto px-6 md:px-8 pb-20 relative z-10">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-6 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">News & Insights</span>
            </div>
            <h1 className="font-bold leading-[0.95] tracking-tight mb-8" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(48px,7vw,88px)", color: "#111827", letterSpacing: "-0.03em" }}>
              Latest<br />
              <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>News &</span><br />
              Insights.
            </h1>
            <p className="text-[17px] text-[#64748b] leading-[1.75] max-w-[440px] font-light">
              Stay up to date with Lumeron's latest announcements, technology insights, and thought leadership from the forefront of Saudi Arabia's digital transformation.
            </p>
          </div>
        </section>

        {/* ARTICLES */}
        <section className="py-24 bg-[#f8fafc] border-t border-[#e2e8f0]">
          <div className="container mx-auto px-6 md:px-8">

            {articles.length === 0 ? (
              /* Empty state */
              <div className="text-center py-32">
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(34,147,136,0.08)" }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#229388" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[24px] text-[#111827] mb-3" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>No articles yet</h3>
                <p className="text-[15px] text-[#64748b] max-w-[320px] mx-auto leading-[1.7]">
                  Articles published via the admin portal will appear here automatically.
                </p>
              </div>
            ) : (
              <>
                {/* Category filter */}
                {categories.length > 1 && (
                  <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className="text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200"
                        style={{
                          background: filter === cat ? "linear-gradient(135deg,#229388,#3ec8ba)" : "white",
                          color: filter === cat ? "white" : "#64748b",
                          border: filter === cat ? "none" : "1px solid #e2e8f0",
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((article) => (
                    <div key={article.id} className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      {/* Category color bar */}
                      <div className="h-1 w-full" style={{ background: CATEGORY_COLORS[article.category] || "#229388" }} />
                      <div className="p-7">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full" style={{ background: "rgba(34,147,136,0.08)", color: "#229388" }}>
                            <Tag size={10} />{article.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-[12px] text-[#94a3b8]">
                            <Calendar size={12} />{article.date}
                          </span>
                        </div>
                        <h3 className="font-bold text-[18px] text-[#111827] mb-3 leading-snug" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{article.title}</h3>
                        <p className="text-[13px] text-[#64748b] leading-[1.75] mb-5">{article.excerpt}</p>

                        {article.content && (
                          <button
                            onClick={() => setExpanded(expanded === article.id ? null : article.id)}
                            className="flex items-center gap-2 text-[13px] font-semibold text-[#229388] hover:opacity-70 transition-opacity"
                          >
                            {expanded === article.id ? "Show Less" : "Read More"}
                            <ChevronDown size={14} className={`transition-transform duration-200 ${expanded === article.id ? "rotate-180" : ""}`} />
                          </button>
                        )}

                        {expanded === article.id && (
                          <div className="mt-4 pt-4 border-t border-[#e2e8f0] text-[13px] text-[#64748b] leading-[1.85] whitespace-pre-wrap">
                            {article.content}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}>
          <h2 className="font-bold text-white leading-tight max-w-xl" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(22px,3vw,38px)", letterSpacing: "-0.025em" }}>
            Want to discuss a technology challenge?
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
