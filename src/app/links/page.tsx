"use client";

import { useEffect, useMemo, useState } from "react";
import { Phone, MessageCircle, Linkedin, Globe, Instagram } from "lucide-react";
import { RiTwitterXLine } from "react-icons/ri";

type LinksProfile = {
  phoneContact: string;
  whatsapp: string;
  linkedin: string;
  website: string;
  x: string;
  instagram: string;
};

const EMPTY_LINKS: LinksProfile = {
  phoneContact: "",
  whatsapp: "",
  linkedin: "",
  website: "",
  x: "",
  instagram: "",
};

const SAMPLE_LINKS: LinksProfile = {
  phoneContact: "+966138888888",
  whatsapp: "https://wa.me/966500000000",
  linkedin: "https://www.linkedin.com/company/lumeron",
  website: "https://lumeron.sa",
  x: "https://x.com/lumeron",
  instagram: "https://instagram.com/lumeron",
};

function ensureUrl(value: string): string {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

export default function LinksPage() {
  const [links, setLinks] = useState<LinksProfile>(EMPTY_LINKS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/links", { cache: "no-store" });
        const d = await r.json();
        if (cancelled) return;
        setLinks({
          phoneContact: String(d?.links?.phoneContact ?? ""),
          whatsapp: String(d?.links?.whatsapp ?? ""),
          linkedin: String(d?.links?.linkedin ?? ""),
          website: String(d?.links?.website ?? ""),
          x: String(d?.links?.x ?? ""),
          instagram: String(d?.links?.instagram ?? ""),
        });
      } catch {
        if (!cancelled) setLinks(EMPTY_LINKS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const items = useMemo(() => {
    const phone = normalizePhone(links.phoneContact);
    const whatsappRaw = links.whatsapp.trim();
    const whatsappHref = whatsappRaw
      ? /^https?:\/\//i.test(whatsappRaw)
        ? whatsappRaw
        : `https://wa.me/${normalizePhone(whatsappRaw).replace(/^\+/, "")}`
      : "";
    return [
      { key: "phone", label: "Phone Contact", href: phone ? `tel:${phone}` : "", icon: Phone },
      { key: "whatsapp", label: "WhatsApp", href: whatsappHref, icon: MessageCircle },
      { key: "linkedin", label: "LinkedIn", href: ensureUrl(links.linkedin), icon: Linkedin },
      { key: "website", label: "Website", href: ensureUrl(links.website), icon: Globe },
      { key: "x", label: "X", href: ensureUrl(links.x), icon: RiTwitterXLine },
      { key: "instagram", label: "Instagram", href: ensureUrl(links.instagram), icon: Instagram },
    ].filter((item) => item.href);
  }, [links]);

  const hasConfiguredLinks = useMemo(
    () => [links.phoneContact, links.whatsapp, links.linkedin, links.website, links.x, links.instagram].some((v) => v.trim().length > 0),
    [links]
  );

  const displayItems = useMemo(() => {
    if (items.length > 0) return items;
    const phone = normalizePhone(SAMPLE_LINKS.phoneContact);
    return [
      { key: "phone", label: "Phone Contact", href: phone ? `tel:${phone}` : "", icon: Phone },
      { key: "whatsapp", label: "WhatsApp", href: SAMPLE_LINKS.whatsapp, icon: MessageCircle },
      { key: "linkedin", label: "LinkedIn", href: SAMPLE_LINKS.linkedin, icon: Linkedin },
      { key: "website", label: "Website", href: SAMPLE_LINKS.website, icon: Globe },
      { key: "x", label: "X", href: SAMPLE_LINKS.x, icon: RiTwitterXLine },
      { key: "instagram", label: "Instagram", href: SAMPLE_LINKS.instagram, icon: Instagram },
    ];
  }, [items]);

  return (
    <section className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:py-14">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-[30px] border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.35)]">
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#229388] to-[#3ec8ba] flex items-center justify-center text-white text-[28px] font-bold">
              L
            </div>
            <h1 className="text-[26px] font-bold text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>
              Lumeron Links
            </h1>
            <p className="text-[13px] text-[#64748b] mt-1">All our official channels in one place.</p>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-6 text-center text-[13px] text-[#64748b]">Loading links…</div>
          ) : (
            <div className="space-y-3">
              {!hasConfiguredLinks && (
                <div className="rounded-xl border border-[#dbeafe] bg-[#eff6ff] px-3 py-2 text-[12px] text-[#1e3a8a]">
                  Showing sample links. Update from Admin Dashboard - Links.
                </div>
              )}
              {displayItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target={item.key === "phone" ? undefined : "_blank"}
                    rel={item.key === "phone" ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3.5 hover:bg-[#f8fafc] transition-colors"
                  >
                    <span className="w-10 h-10 rounded-xl bg-[#229388]/10 text-[#229388] flex items-center justify-center">
                      <Icon size={18} />
                    </span>
                    <span className="text-[14px] font-semibold text-[#111827]">{item.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
