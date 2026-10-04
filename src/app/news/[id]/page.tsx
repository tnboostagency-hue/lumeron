"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageWrapper from "@/components/ui/page-wrapper";
import ArticleGallery from "@/components/news/article-gallery";
import { formatArticleHtmlForDisplay } from "@/lib/article-content";
import { getNewsCoverImages } from "@/lib/news-cover";

type Article = { id: string; title: string; category: string; date: string; excerpt: string; content: string; coverImage: string | null };

function formatDate(value: string) {
  const parsed = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const LOWERCASE_TITLE_WORDS = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "of", "on", "or", "the", "to", "with"]);
const TITLE_ACRONYMS = new Set(["ai", "api", "ceo", "cio", "cto", "esg", "gcc", "iot", "it", "saas", "ui", "ux"]);

function formatHeadline(value: string) {
  if (value !== value.toLocaleUpperCase() || value === value.toLocaleLowerCase()) return value;
  const words = value.toLocaleLowerCase().split(/\s+/);
  return words.map((word, index) => {
    const bareWord = word.replace(/[^a-z0-9]/gi, "");
    if (TITLE_ACRONYMS.has(bareWord)) return word.replace(bareWord, bareWord.toLocaleUpperCase());
    if (index > 0 && index < words.length - 1 && LOWERCASE_TITLE_WORDS.has(bareWord)) return word;
    return word.replace(/(^|[-/])([a-z])/g, (_match, separator: string, letter: string) => `${separator}${letter.toLocaleUpperCase()}`);
  }).join(" ");
}

export default function ArticlePage() {
  const params = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [status, setStatus] = useState<"loading" | "missing">("loading");

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/news/${params.id}`, { cache: "no-store" })
      .then(async (response) => ({ response, data: await response.json() as { article?: Article } }))
      .then(({ response, data }) => {
        if (!response.ok || !data.article) setStatus("missing");
        else setArticle(data.article as Article);
      })
      .catch(() => setStatus("missing"));
  }, [params.id]);

  const headline = article ? formatHeadline(article.title) : "";
  const coverImages = article ? getNewsCoverImages(article.coverImage) : [];
  const formattedContent = article ? formatArticleHtmlForDisplay(article.content) : "";

  return (
    <><Navbar /><PageWrapper>
      {status === "loading" && !article ? <main className="min-h-[70vh] grid place-items-center text-[#64748b]">Loading article…</main> : !article ? (
        <main className="min-h-[70vh] grid place-items-center px-6 text-center"><div><p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#229388]">Newsroom</p><h1 className="mt-3 text-3xl font-bold text-[#111827]">Article not found</h1><Link href="/news" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#229388]"><ArrowLeft size={16} /> Back to news</Link></div></main>
      ) : (
        <main className="bg-white pb-16 pt-24 sm:pb-20 sm:pt-28"><div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-10"><Link href="/news" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#229388] transition-opacity hover:opacity-70"><ArrowLeft size={16} /> All news</Link>
          <header className="max-w-4xl py-8 sm:py-10 lg:py-12"><div className="mb-4 flex flex-wrap items-center gap-2.5 text-[12px] sm:mb-5"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf8f6] px-3 py-1 font-bold uppercase tracking-[0.09em] text-[#16766e]"><Tag size={11} /> {article.category}</span><span className="inline-flex items-center gap-1.5 text-[#94a3b8]"><Calendar size={13} /> {formatDate(article.date)}</span></div><h1 className="max-w-[980px] text-[clamp(30px,7.5vw,54px)] font-semibold normal-case leading-[1.08] tracking-[-0.035em] text-[#111827]">{headline}</h1><p className="mt-5 max-w-3xl text-[16px] leading-7 text-[#64748b] sm:mt-6 sm:text-[18px] sm:leading-8">{article.excerpt}</p></header>
          {coverImages.length > 0 ? <div className="max-w-4xl"><ArticleGallery images={coverImages} alt={headline} /></div> : null}
          <article className="article-public-content mt-9 max-w-[720px] text-[16px] leading-7 text-[#475569] sm:mt-12 sm:text-[17px] sm:leading-8" dangerouslySetInnerHTML={{ __html: formattedContent }} />
        </div></main>
      )}
    </PageWrapper><Footer /></>
  );
}
