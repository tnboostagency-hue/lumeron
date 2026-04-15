"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ animation: "fadeIn 0.25s ease" }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.94) } to { opacity: 1; transform: scale(1) } }
      `}</style>

      {/* Glassy blurry overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(13,46,44,0.72) 0%, rgba(34,147,136,0.18) 50%, rgba(0,0,0,0.75) 100%)",
          backdropFilter: "blur(24px) saturate(1.6)",
          WebkitBackdropFilter: "blur(24px) saturate(1.6)",
        }}
      />

      {/* Subtle glass sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(62,200,186,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        <X size={18} />
      </button>

      {/* Video card */}
      <div
        className="relative w-full z-10"
        style={{
          maxWidth: "940px",
          animation: "scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glass card border */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(62,200,186,0.12) inset",
          }}
        >
          {/* Teal top accent line */}
          <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg,#229388,#3ec8ba,#229388)" }} />

          {/* 16:9 video area */}
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src="https://streamable.com/e/l0kk95?autoplay=0&nocontrols=0&muted=0"
              allow="fullscreen"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Caption */}
        <p className="text-center mt-4 text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
          LUMERON — Enabling Digital Confidence
        </p>
      </div>
    </div>
  );
}
