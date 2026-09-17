"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageWrapper from "@/components/ui/page-wrapper";
import ArticleGallery from "@/components/news/article-gallery";
import { getNewsCoverImages } from "@/lib/news-cover";

type Article = { id: string; title: string; category: string; date: string; excerpt: string; content: string; coverImage: string | null };

function formatDate(value: string) {
  const parsed = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArticlePage() {
  const params = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [status, setStatus] = useState<"loading" | "missing">("loading");

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/news/${params.id}`, { cache: "no-store" })
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (!response.ok || !data.article) setStatus("missing");
        else setArticle(data.article as Article);
      })
      .catch(() => setStatus("missing"));
  }, [params.id]);

  return (
    <><Navbar /><PageWrapper>
      {status === "loading" && !article ? <main className="min-h-[70vh] grid place-items-center text-[#64748b]">Loading article…</main> : !article ? (
        <main className="min-h-[70vh] grid place-items-center px-6 text-center"><div><p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#229388]">Newsroom</p><h1 className="mt-3 text-3xl font-bold text-[#111827]">Article not found</h1><a href="/news" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#229388]"><ArrowLeft size={16} /> Back to news</a></div></main>
      ) : (
        <main className="bg-white pb-24 pt-28"><div className="mx-auto max-w-5xl px-6 md:px-8"><a href="/news" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#229388] hover:opacity-70"><ArrowLeft size={16} /> All news</a>
          <header className="mx-auto max-w-3xl py-12 text-center"><div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-[12px]"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf8f6] px-3 py-1 font-bold uppercase tracking-[0.09em] text-[#16766e]"><Tag size={11} /> {article.category}</span><span className="inline-flex items-center gap-1.5 text-[#94a3b8]"><Calendar size={13} /> {formatDate(article.date)}</span></div><h1 className="text-[clamp(34px,5vw,62px)] font-bold leading-[1.04] tracking-[-0.035em] text-[#111827]">{article.title}</h1><p className="mx-auto mt-7 max-w-2xl text-[18px] leading-8 text-[#64748b]">{article.excerpt}</p></header>
          {getNewsCoverImages(article.coverImage).length > 0 && <ArticleGallery images={getNewsCoverImages(article.coverImage)} alt={article.title} />}
          <article className="article-public-content mx-auto mt-12 max-w-3xl text-[16px] leading-8 text-[#475569]" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div></main>
      )}
    </PageWrapper><Footer /></>
  );
}
