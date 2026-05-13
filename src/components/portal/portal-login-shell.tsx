"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PortalLogin3D } from "@/components/portal/portal-login-3d";

type Props = {
  onLoggedIn: () => void | Promise<void>;
};

export function PortalLoginShell({ onLoggedIn }: Props) {
  const [step, setStep] = useState<0 | 1>(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [compactLayout, setCompactLayout] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCompactLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const sendCode = async () => {
    setError(null);
    setInfo(null);
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid work email.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/portal/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: trimmed }),
      });
      const j = (await r.json()) as { error?: string; demoOnly?: boolean; message?: string; ok?: boolean };
      if (!r.ok) {
        setError(j.error || "Could not start sign-in.");
        return;
      }
      if (j.demoOnly || j.message?.includes("Demo")) {
        console.info("[Portal] Demo mode — use access code 123456");
      } else {
        console.info("[Portal] OTP email requested for", trimmed);
      }
      setEmail(trimmed.toLowerCase());
      setInfo(j.message || "Check your inbox for a 6-digit code.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      const r = await fetch("/api/portal/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, code }),
      });
      const j = (await r.json()) as { error?: string };
      if (!r.ok) {
        setError(j.error || "Sign-in failed.");
        return;
      }
      await onLoggedIn();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-gradient-to-b from-white via-[#f4fbfb] to-[#eef8f6] text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(62,200,186,0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(57,150,141,0.12), transparent)",
          }}
        />
      </div>

      <header className="relative z-20 border-b border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-4">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <Image
              src="/lumeron-logo.svg"
              alt="Lumeron"
              width={132}
              height={36}
              className="h-8 w-auto sm:h-9"
              priority
            />
            <span className="hidden h-7 w-px bg-slate-200 sm:block" aria-hidden />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:inline">
              Client portal
            </span>
          </Link>
          <Link
            href="/"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-end text-sm font-medium text-[#229388] underline-offset-4 hover:underline sm:min-h-0 sm:min-w-0"
          >
            Back to site
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Tall 3D hero on mobile/tablet (svh) so the animation is readable; desktop keeps split ratio */}
        <div className="relative min-h-[max(22rem,min(52svh,38rem))] w-full shrink-0 border-b border-slate-200/80 sm:min-h-[max(24rem,min(48svh,36rem))] lg:min-h-[calc(100dvh-4.5rem)] lg:w-[52%] lg:shrink-0 lg:border-b-0 lg:border-r lg:border-slate-200/80">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#eef8f6]/80 lg:bg-gradient-to-r" />
          <div className="absolute inset-0">
            <PortalLogin3D />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-12">
          <div className="w-full max-w-[440px]" style={{ perspective: compactLayout ? "1000px" : "1200px" }}>
            <motion.div
              initial={{ rotateX: 10, rotateY: -8, opacity: 0, y: 24 }}
              animate={
                compactLayout
                  ? { rotateX: 3, rotateY: -2, opacity: 1, y: 0 }
                  : { rotateX: 5, rotateY: -4, opacity: 1, y: 0 }
              }
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="relative rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-[0_24px_80px_-12px_rgba(34,147,136,0.12)] ring-1 ring-[#3ec8ba]/20 backdrop-blur-md sm:rounded-3xl sm:p-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="absolute right-3 top-3 rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-700 sm:right-4 sm:top-4 sm:px-2.5 sm:text-[10px]">
                Demo mode
              </span>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#3ec8ba]/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
              <div className="relative pr-14 sm:pr-16" style={{ transform: "translateZ(24px)" }}>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Client access</h1>
                <p className="mt-2 text-sm italic text-[#39968d]">Your digital estate, under control.</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {step === 0
                    ? "Enter your corporate email. We will send a one-time code, or you can continue in demo with 123456 after requesting a code."
                    : "Enter the 6-digit code from your email. In demo mode, use 123456."}
                </p>

                <div className="mt-8 space-y-4">
                  {step === 0 ? (
                    <>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Work email
                        </label>
                        <input
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="min-h-[48px] w-full rounded-xl border border-slate-200/90 bg-slate-50/90 px-4 py-3.5 text-[16px] text-slate-900 shadow-inner outline-none transition focus:border-[#3ec8ba] focus:ring-2 focus:ring-[#3ec8ba]/20 sm:text-[15px]"
                        />
                      </div>
                      {error ? <p className="text-sm text-[#FF3B3B]">{error}</p> : null}
                      <motion.button
                        type="button"
                        disabled={loading}
                        onClick={() => void sendCode()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="min-h-[48px] w-full rounded-xl bg-gradient-to-r from-[#229388] to-[#39968d] py-3.5 text-[16px] font-semibold text-white shadow-lg shadow-[#229388]/20 transition hover:shadow-xl active:scale-[0.99] disabled:opacity-55 sm:text-[15px]"
                      >
                        {loading ? "Sending…" : "Send access code"}
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-slate-500">
                        Signing in as <span className="font-mono text-slate-900">{email}</span>
                        <button
                          type="button"
                          className="ml-1 inline-flex min-h-[44px] items-center rounded-lg px-2 text-[#229388] hover:bg-teal-50 hover:underline sm:ml-2"
                          onClick={() => {
                            setStep(0);
                            setCode("");
                            setInfo(null);
                            setError(null);
                          }}
                        >
                          Change
                        </button>
                      </p>
                      {info ? <p className="text-xs text-[#229388]/90">{info}</p> : null}
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Access code
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          value={code}
                          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                          placeholder="123456"
                          className="min-h-[52px] w-full rounded-xl border border-slate-200/90 bg-slate-50/90 px-4 py-3.5 font-mono text-xl tracking-[0.35em] text-slate-900 shadow-inner outline-none transition focus:border-[#3ec8ba] focus:ring-2 focus:ring-[#3ec8ba]/20 sm:text-lg"
                        />
                      </div>
                      {error ? <p className="text-sm text-[#FF3B3B]">{error}</p> : null}
                      <motion.button
                        type="button"
                        disabled={loading}
                        onClick={() => void submit()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="min-h-[48px] w-full rounded-xl bg-gradient-to-r from-[#229388] to-[#1a7a70] py-3.5 text-[16px] font-semibold text-white shadow-lg shadow-[#229388]/25 transition hover:shadow-xl active:scale-[0.99] disabled:opacity-55 sm:text-[15px]"
                      >
                        {loading ? "Signing in…" : "Enter portal"}
                      </motion.button>
                    </>
                  )}

                  <p className="text-center text-[11px] leading-relaxed text-slate-500">
                    Production: set{" "}
                    <code className="rounded bg-slate-100 px-1 font-mono text-[10px] text-slate-600 ring-1 ring-slate-200/90">
                      PORTAL_USE_EMAIL_OTP=true
                    </code>{" "}
                    and Resend (<span className="whitespace-nowrap">no-reply@lumeron.sa</span>) for emailed codes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
