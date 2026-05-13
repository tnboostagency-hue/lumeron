"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/** Morse for LUMERON — decorative “digital pulse” band */
const LUMERON_MORSE: ("." | "-")[][] = [
  [".", "-", ".", "."],
  [".", ".", "-"],
  ["-", "-"],
  ["."],
  [".", "-", "."],
  ["-", "-", "-"],
  ["-", "."],
];

type Props = {
  onLoggedIn: () => void | Promise<void>;
};

export function PortalLoginShell({ onLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#f4faf9]">
      {/* Ambient 3D-ish layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-24 top-[12%] h-[420px] w-[420px] rounded-[40%] bg-gradient-to-br from-[#3ec8ba]/25 via-[#229388]/12 to-transparent blur-3xl"
          animate={{ rotate: [0, 8, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-32 bottom-[8%] h-[380px] w-[380px] rounded-[45%] bg-gradient-to-tr from-[#229388]/20 to-transparent blur-3xl"
          animate={{ rotate: [0, -10, 0], y: [0, 24, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3ec8ba]/10"
          style={{ transform: "translate(-50%, -50%) rotateX(72deg)", transformStyle: "preserve-3d" }}
        />
      </div>

      <header className="relative z-20 border-b border-white/60 bg-white/75 backdrop-blur-xl shadow-sm shadow-slate-200/40">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
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
            <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-[#64748b] sm:inline">
              Client portal
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[#229388] underline-offset-4 hover:underline"
          >
            Back to site
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        {/* Morse telemetry */}
        <div className="mb-8 w-full max-w-lg text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#64748b]">
            Digital pulse · Morse
          </p>
          <div className="flex flex-wrap items-end justify-center gap-x-3 gap-y-2 sm:gap-x-4">
            {LUMERON_MORSE.map((letter, li) => (
              <div key={li} className="flex items-center gap-1.5 rounded-lg bg-white/50 px-2 py-2 shadow-sm ring-1 ring-[#229388]/10">
                {letter.map((sym, si) => (
                  <motion.span
                    key={`${li}-${si}`}
                    className={
                      sym === "-"
                        ? "block h-1.5 w-6 rounded-sm bg-gradient-to-r from-[#229388] to-[#3ec8ba]"
                        : "block h-2.5 w-2.5 rounded-full bg-[#3ec8ba] shadow-[0_0_12px_rgba(62,200,186,0.5)]"
                    }
                    animate={{
                      opacity: [0.35, 1, 0.35],
                      scale: sym === "-" ? [1, 1.06, 1] : [0.88, 1.15, 0.88],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: (li * 4 + si) * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 3D card */}
        <div className="w-full max-w-[440px]" style={{ perspective: "1200px" }}>
          <motion.div
            initial={{ rotateX: 10, rotateY: -8, opacity: 0, y: 24 }}
            animate={{ rotateX: 5, rotateY: -4, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="relative rounded-3xl border border-white/80 bg-white/90 p-8 shadow-[0_24px_80px_-12px_rgba(34,147,136,0.25)] ring-1 ring-[#229388]/10 backdrop-blur-md sm:p-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#3ec8ba]/60 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            <div className="relative" style={{ transform: "translateZ(24px)" }}>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Client access</h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Demo portal — no email is sent. Enter your work email and the access code{" "}
                <span className="font-mono font-semibold text-[#229388]">123456</span>.
              </p>

              <div className="mt-8 space-y-4">
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
                    className="w-full rounded-xl border border-slate-200/90 bg-slate-50/90 px-4 py-3.5 text-[15px] text-slate-900 shadow-inner outline-none transition focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/25"
                  />
                </div>
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
                    className="w-full rounded-xl border border-slate-200/90 bg-slate-50/90 px-4 py-3.5 font-mono text-lg tracking-[0.35em] text-slate-900 shadow-inner outline-none transition focus:border-[#229388] focus:ring-2 focus:ring-[#229388]/25"
                  />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <motion.button
                  type="button"
                  disabled={loading}
                  onClick={() => void submit()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-gradient-to-r from-[#229388] to-[#1a7a70] py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-[#229388]/35 transition hover:shadow-xl disabled:opacity-55"
                >
                  {loading ? "Signing in…" : "Enter portal"}
                </motion.button>

                <p className="text-center text-[11px] leading-relaxed text-slate-400">
                  Email one-time codes can be enabled later with{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-[10px] text-slate-600">
                    PORTAL_USE_EMAIL_OTP=true
                  </code>{" "}
                  when Resend is configured for all recipients.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
