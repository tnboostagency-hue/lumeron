"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timeout = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timeout);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // When opening, scroll overlay to top so centered content is in view (no scrolling to find it)
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!mounted || typeof document === "undefined") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setSendError(true);
        setSending(false);
        return;
      }
    } catch {
      setSendError(true);
      setSending(false);
      return;
    }
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", company: "", service: "", message: "" });
      onClose();
    }, 3000);
  };

  return createPortal(
    /* Portal to body so modal is not affected by ancestor transforms (e.g. PageWrapper) — keeps it viewport-centered on all pages */
    <>
    {/* Outer: full-screen overlay, scroll to top when opened so content is in view */}
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain"
      style={{ animation: isOpen ? "fadeIn 0.25s ease forwards" : "fadeOut 0.25s ease forwards" }}
    >
      {/* Backdrop — sits behind, clicks close modal */}
      <div
        className="fixed inset-0 bg-black/40"
        style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      {/* Centering wrapper: min-h-screen so panel is centered in viewport; no scrolling to find it */}
      <div className="relative flex min-h-screen min-h-dvh items-center justify-center p-4 sm:p-6">
        {/* Panel — max-h so tall content scrolls inside panel, not the overlay */}
        <div
          className="relative w-full max-w-[520px] max-h-[calc(100vh-2rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            animation: isOpen
              ? "modalSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards"
              : "modalSlideOut 0.25s ease forwards",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Teal accent bar */}
          <div
            className="h-1 w-full flex-shrink-0"
            style={{
              background: "linear-gradient(90deg, #229388 0%, #3ec8ba 50%, #229388 100%)",
              backgroundSize: "200% 100%",
              animation: "gradientShift 4s ease infinite",
            }}
          />

          <div className="p-5 sm:p-7 overflow-y-auto flex-1 min-h-0">
            {/* Close */}
            <button
              onClick={onClose}
              className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} p-2 rounded-full text-muted-foreground hover:bg-black/6 hover:text-foreground transition-all duration-200`}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {sent ? (
              <div className="flex flex-col items-center text-center py-6 gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #229388, #3ec8ba)" }}
                >
                  <CheckCircle size={30} strokeWidth={1.8} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[22px] font-semibold text-foreground mb-1">
                    {lang === 'ar' ? "تم إرسال الرسالة!" : "Message Sent!"}
                  </h3>
                  <p className="text-muted-foreground text-[14px]">
                    {lang === 'ar' ? "تم إرسال رسالتك بنجاح. سنرد عليك خلال 24 ساعة." : "Your message has been sent. We'll respond within 24 hours."}
                  </p>
                </div>
              </div>
            ) : sendError ? (
              <div className="flex flex-col items-center text-center py-6 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-100">
                  <X size={30} strokeWidth={1.8} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-[22px] font-semibold text-foreground mb-1">
                    {lang === 'ar' ? "حدث خطأ" : "Something went wrong"}
                  </h3>
                  <p className="text-muted-foreground text-[14px] mb-4">
                    {lang === 'ar'
                      ? "لم نتمكن من إرسال رسالتك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة."
                      : "We couldn't send your message. Please try again or contact us at info@lumeron.sa"}
                  </p>
                  <button
                    onClick={() => setSendError(false)}
                    className="btn-primary px-6 py-2.5 text-[14px]"
                  >
                    {lang === 'ar' ? "حاول مجدداً" : "Try Again"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <span className="text-tagline mb-2 block">
                  {lang === 'ar' ? "تواصل معنا" : "Get In Touch"}
                </span>
                <h2 className="text-[22px] sm:text-[26px] font-semibold text-foreground leading-tight mb-1">
                  {lang === 'ar' ? "تواصل مع لوميرون" : "Connect with Lumeron"}
                </h2>
                <p className="text-muted-foreground text-[13px] sm:text-[14px] mb-5 leading-relaxed">
                  {lang === 'ar' ? "أخبرنا عن مشروعك وسيتواصل معك فريقنا خلال 24 ساعة." : "Tell us about your project and our team will be in touch within 24 hours."}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1 tracking-wide uppercase">
                        {t.contact.name} <span className="text-[#229388]">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        className="form-input !h-[44px] !text-[14px]"
                        placeholder={lang === 'ar' ? "اسمك" : "Your name"}
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1 tracking-wide uppercase">
                        {t.contact.email} <span className="text-[#229388]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        className="form-input !h-[44px] !text-[14px]"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1 tracking-wide uppercase">
                      {t.contact.company}
                    </label>
                    <input
                      type="text"
                      className="form-input !h-[44px] !text-[14px]"
                      placeholder={lang === 'ar' ? "منظمتك" : "Your organization"}
                      value={form.company}
                      onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1 tracking-wide uppercase">
                      {lang === 'ar' ? "الخدمة المطلوبة" : "Service of Interest"}
                    </label>
                    <select
                      className="form-input !h-[44px] !text-[14px]"
                      value={form.service}
                      onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                      style={{ color: form.service ? "var(--foreground)" : "var(--muted-foreground)" }}
                    >
                      <option value="">{lang === 'ar' ? "اختر الخدمة..." : "Select a service..."}</option>
                      <option value="Data Centers">{lang === 'ar' ? "مراكز البيانات" : "Data Centers"}</option>
                      <option value="Industry 4.0">{lang === 'ar' ? "الصناعة 4.0" : "Industry 4.0"}</option>
                      <option value="Cybersecurity">{lang === 'ar' ? "الأمن السيبراني" : "Cybersecurity"}</option>
                      <option value="Artificial Intelligence">{lang === 'ar' ? "الذكاء الاصطناعي" : "Artificial Intelligence"}</option>
                      <option value="Smart Infrastructure">{lang === 'ar' ? "البنية التحتية الذكية" : "Smart Infrastructure"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1 tracking-wide uppercase">
                      {t.contact.message} <span className="text-[#229388]">*</span>
                    </label>
                    <textarea
                      required
                      className="form-textarea !text-[14px]"
                      style={{ minHeight: "100px" }}
                      rows={3}
                      placeholder={lang === 'ar' ? "أخبرنا عن مشروعك أو استفسارك..." : "Tell us about your project or inquiry..."}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full py-3 text-[14px] flex items-center justify-center gap-2 mt-1"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {lang === 'ar' ? "جاري الإرسال..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        {t.contact.send} 
                        <Send size={15} className={lang === 'ar' ? 'rotate-180' : ''} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[12px] text-muted-foreground pt-0.5">
                    {lang === 'ar' ? "أو راسلنا مباشرة على" : "Or email us directly at"}{" "}
                    <a href="mailto:info@lumeron.sa" className="text-[#229388] font-semibold hover:underline">
                      info@lumeron.sa
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes modalSlideIn { from { opacity: 0; transform: translateY(32px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes modalSlideOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(16px) scale(0.97); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
    </div>
    </>,
    document.body
  );
}
