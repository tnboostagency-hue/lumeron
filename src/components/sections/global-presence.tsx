"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, Geometry, GeoJsonProperties, FeatureCollection } from "geojson";
import { useLanguage } from "@/context/LanguageContext";

const DOT_SLATE = "#475569";
const DOT_SAUDI = "#2dd4bf";
const GLOW_SAUDI = "rgba(45,212,191,0.22)";
const ACCENT_SOFT = "rgba(34,147,136,0.12)";

type MapDot = {
  u: number;
  v: number;
  saudi: boolean;
};

function pointInPolygon(pt: [number, number], ring: number[][]): boolean {
  let inside = false;
  const [px, py] = pt;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function pointInFeature(lon: number, lat: number, f: Feature<Geometry, GeoJsonProperties>): boolean {
  const g = f.geometry;
  if (!g) return false;
  const pt: [number, number] = [lon, lat];
  if (g.type === "Polygon") {
    return pointInPolygon(pt, g.coordinates[0] as number[][]);
  }
  if (g.type === "MultiPolygon") {
    return (g.coordinates as number[][][][]).some((poly) => pointInPolygon(pt, poly[0]));
  }
  return false;
}

function lonLatToUV(lon: number, lat: number): { u: number; v: number } {
  return { u: (lon + 180) / 360, v: (90 - lat) / 180 };
}

function inSaudiBbox(lon: number, lat: number): boolean {
  return lat >= 16 && lat <= 33 && lon >= 34 && lon <= 56;
}

function buildStippleDots(
  features: Feature<Geometry, GeoJsonProperties>[],
  saudiFeature: Feature<Geometry, GeoJsonProperties> | undefined,
  stepDeg: number,
): MapDot[] {
  const dots: MapDot[] = [];
  for (let lat = 90 - stepDeg / 2; lat > -90; lat -= stepDeg) {
    for (let lon = -180 + stepDeg / 2; lon < 180; lon += stepDeg) {
      let onLand = false;
      for (const f of features) {
        if (pointInFeature(lon, lat, f)) {
          onLand = true;
          break;
        }
      }
      if (!onLand) continue;
      const saudi = saudiFeature ? pointInFeature(lon, lat, saudiFeature) : inSaudiBbox(lon, lat);
      const { u, v } = lonLatToUV(lon, lat);
      dots.push({ u, v, saudi });
    }
  }
  return dots;
}

function saudiFeatureFromCollection(fc: FeatureCollection): Feature<Geometry, GeoJsonProperties> | undefined {
  const list = fc.features as Feature<Geometry, GeoJsonProperties>[];
  return list.find((f) => {
    const n = (f.properties as { name?: string } | null)?.name;
    return n === "Saudi Arabia";
  });
}

function saudiCentroid(dots: MapDot[]): { u: number; v: number } {
  const sd = dots.filter((d) => d.saudi);
  if (!sd.length) return { u: 0.63, v: 0.36 };
  return {
    u: sd.reduce((s, d) => s + d.u, 0) / sd.length,
    v: sd.reduce((s, d) => s + d.v, 0) / sd.length,
  };
}

export default function GlobalPresence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<MapDot[]>([]);
  const frameRef = useRef<number>(0);
  const hoveredRef = useRef<number>(-1);
  const liftRef = useRef(0);
  const mouseRef = useRef({ x: -1e6, y: -1e6 });
  const dprRef = useRef(1);
  const reduceMotionRef = useRef(false);
  const startTimeRef = useRef(0);
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [ready, setReady] = useState(false);
  const [hqAnchor, setHqAnchor] = useState({ u: 0.63, v: 0.36 });

  const pickNearest = useCallback((mx: number, my: number, w: number, h: number, dpr: number) => {
    const dots = dotsRef.current;
    if (!dots.length) return -1;
    const rHit = 14 * dpr;
    const r2 = rHit * rHit;
    let best = -1;
    let bestD = r2;
    const px = mx * dpr;
    const py = my * dpr;
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const cx = d.u * w * dpr;
      const cy = d.v * h * dpr;
      const dx = px - cx;
      const dy = py - cy;
      const dist = dx * dx + dy * dy;
      if (dist < bestD) {
        bestD = dist;
        best = i;
      }
    }
    return bestD < r2 ? best : -1;
  }, []);

  useEffect(() => {
    reduceMotionRef.current =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    startTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((r) => r.json())
      .then((world) => {
        const topo = world as Topology;
        if (cancelled) return;
        const geojson = feature(topo, topo.objects.countries as GeometryCollection) as FeatureCollection;
        const saudi = saudiFeatureFromCollection(geojson);
        const step =
          typeof window !== "undefined" && window.innerWidth < 768 ? 3.4 : 2.65;
        const built = buildStippleDots(
          geojson.features as Feature<Geometry, GeoJsonProperties>[],
          saudi,
          step,
        );
        dotsRef.current = built;
        setHqAnchor(saudiCentroid(built));
        setReady(true);
      })
      .catch(() => setReady(true));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !ready) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const { u: saudiU, v: saudiV } = hqAnchor;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(320, Math.floor(rect.width));
      const h = Math.floor(w * 0.5);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1e6, y: -1e6 };
      hoveredRef.current = -1;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const drawDecor = (
      wPx: number,
      hPx: number,
      gcx: number,
      gcy: number,
      t: number,
      motion: boolean,
    ) => {
      const drawGrid = (gridAlpha: number) => {
        ctx.strokeStyle = `rgba(148,163,184,${gridAlpha})`;
        ctx.lineWidth = 1;
        const step = 72 * dprRef.current;
        for (let x = 0; x < wPx; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, hPx);
          ctx.stroke();
        }
        for (let y = 0; y < hPx; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(wPx, y);
          ctx.stroke();
        }
      };

      if (motion) {
        drawGrid(0.045);
        return;
      }

      const sweep = ((t * 0.022) % 1) * (wPx + 120) - 60;
      const band = ctx.createLinearGradient(sweep - 40, 0, sweep + 40, 0);
      band.addColorStop(0, "rgba(255,255,255,0)");
      band.addColorStop(0.5, "rgba(45,212,191,0.07)");
      band.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = band;
      ctx.fillRect(0, 0, wPx, hPx);

      const maxR = Math.min(wPx, hPx) * 0.22;
      for (let k = 0; k < 3; k++) {
        const phase = ((t * 0.45 + k / 3) % 1);
        const rad = 12 + phase * maxR;
        const alpha = (1 - phase) * 0.38;
        ctx.beginPath();
        ctx.arc(gcx, gcy, rad, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45,212,191,${alpha})`;
        ctx.lineWidth = 1.25 * dprRef.current;
        ctx.stroke();
      }

      drawGrid(0.06);
    };

    const magneticNudge = (
      cx: number,
      cy: number,
      mx: number,
      my: number,
      dpr: number,
      motion: boolean,
    ): { nx: number; ny: number } => {
      if (motion) return { nx: cx, ny: cy };
      const dx = mx * dpr - cx;
      const dy = my * dpr - cy;
      const d2 = dx * dx + dy * dy;
      const falloff = 220 * dpr;
      if (d2 > falloff * falloff) return { nx: cx, ny: cy };
      const pull = 0.14 * (1 - Math.sqrt(d2) / falloff);
      return { nx: cx + dx * pull, ny: cy + dy * pull };
    };

    const draw = () => {
      const dpr = dprRef.current;
      const wPx = canvas.width;
      const hPx = canvas.height;
      const w = wPx / dpr;
      const h = hPx / dpr;
      const dots = dotsRef.current;
      const motion = reduceMotionRef.current;
      const t = motion ? 0 : (performance.now() - startTimeRef.current) / 1000;

      hoveredRef.current = pickNearest(mouseRef.current.x, mouseRef.current.y, w, h, dpr);
      const targetLift = hoveredRef.current >= 0 ? 1 : 0;
      liftRef.current += (targetLift - liftRef.current) * 0.14;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, wPx, hPx);

      const bgGrad = ctx.createLinearGradient(0, 0, wPx, hPx);
      bgGrad.addColorStop(0, "#ffffff");
      bgGrad.addColorStop(0.5, "#fafdfe");
      bgGrad.addColorStop(1, "#f4fbfb");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, wPx, hPx);

      const gcx = saudiU * wPx;
      const gcy = saudiV * hPx;
      const grd = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, Math.min(wPx, hPx) * 0.16);
      grd.addColorStop(0, GLOW_SAUDI);
      grd.addColorStop(0.45, "rgba(45,212,191,0.07)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, wPx, hPx);

      drawDecor(wPx, hPx, gcx, gcy, t, motion);

      const baseR = Math.max(1.1, w / 520) * dpr;
      const hi = hoveredRef.current;

      const drawDot = (i: number, float: number) => {
        const d = dots[i];
        let cx = d.u * wPx;
        let cy = d.v * hPx;
        if (i !== hi) {
          const n = magneticNudge(cx, cy, mx, my, dpr, motion);
          cx = n.nx;
          cy = n.ny;
        }
        const liftPx = float * 6 * dpr;
        const scale = 1 + float * 0.45;
        const saudiBoost = d.saudi ? 1.12 : 1;
        const r = baseR * scale * saudiBoost;
        ctx.fillStyle = d.saudi ? DOT_SAUDI : DOT_SLATE;
        if (d.saudi && float < 0.05) {
          ctx.globalAlpha = 0.92;
          ctx.beginPath();
          ctx.arc(cx, cy, r * 1.65, 0, Math.PI * 2);
          ctx.fillStyle = ACCENT_SOFT;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.fillStyle = DOT_SAUDI;
        }
        if (float > 0.04) {
          ctx.shadowColor = "rgba(15,23,42,0.2)";
          ctx.shadowBlur = 12 * dpr * float;
          ctx.shadowOffsetY = 5 * dpr * float;
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;
        }
        ctx.beginPath();
        ctx.arc(cx, cy - liftPx, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
      };

      for (let i = 0; i < dots.length; i++) {
        if (dots[i].saudi || i === hi) continue;
        drawDot(i, 0);
      }
      for (let i = 0; i < dots.length; i++) {
        if (!dots[i].saudi || i === hi) continue;
        drawDot(i, 0);
      }
      if (hi >= 0) {
        drawDot(hi, liftRef.current);
      }

      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [ready, pickNearest, hqAnchor]);

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[#e2e8f0] bg-white py-16 md:py-24 px-4 md:px-6"
      aria-labelledby="global-presence-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_50%_at_50%_-10%,rgba(45,212,191,0.06),transparent_55%)]"
      />

      <div
        dir={isAr ? "rtl" : "ltr"}
        className="relative z-10 mx-auto max-w-5xl text-center mb-6 md:mb-8"
      >
        <span className="inline-block rounded-full border border-[#99f6e4]/80 bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0d9488] shadow-sm mb-5 backdrop-blur-sm">
          {isAr ? "الحضور العالمي" : "Global presence"}
        </span>
        <h2
          id="global-presence-heading"
          className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[#0f172a] mb-3"
          style={{ fontFamily: "'Syne','Avenir Next Arabic',sans-serif", letterSpacing: "-0.03em" }}
        >
          {isAr ? "أساسنا" : "Our foundation"}
        </h2>
        <p className="text-[15px] text-[#94a3b8] font-light leading-relaxed max-w-xl mx-auto mb-5">
          {isAr
            ? "لوميرون · الخبر، المنطقة الشرقية، المملكة العربية السعودية"
            : "Lumeron · Al Khobar, Eastern Province, Saudi Arabia"}
        </p>
        <div
          className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 text-[11px] md:text-xs text-[#64748b] ${isAr ? "flex-row-reverse" : ""}`}
        >
          {(
            isAr
              ? ["رؤية 2030", "مجلس التعاون · الخليج", "مقر في الخليج"]
              : ["Vision 2030 aligned", "GCC footprint", "Gulf HQ"]
          ).map((label) => (
            <span
              key={label}
              className="rounded-full border border-[#e2e8f0] bg-white/80 px-3 py-1 font-medium text-[#475569] shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative z-[1] mx-auto w-full max-w-[1100px] overflow-hidden rounded-2xl border border-[#e8eef0] bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.12),0_1px_0_rgba(15,23,42,0.04)] ring-1 ring-[#f1f5f9]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(45,212,191,0.04) 45%, transparent 70%, rgba(34,147,136,0.03) 100%)",
          }}
        />
        <canvas
          ref={canvasRef}
          className="relative z-[1] block w-full h-auto cursor-crosshair touch-none"
          style={{ userSelect: "none" }}
          aria-hidden={true}
        />
        <div
          className="pointer-events-none absolute z-[2]"
          style={{
            left: `${hqAnchor.u * 100}%`,
            top: `${hqAnchor.v * 100}%`,
            transform: "translate(-50%, calc(-100% - 12px))",
          }}
        >
          <div
            className={`flex min-w-[max-content] items-center gap-2 rounded-full border border-[#ccfbf1]/90 bg-white/85 px-3 py-1.5 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.15)] backdrop-blur-md ${isAr ? "flex-row-reverse" : ""}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2dd4bf] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#229388]" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-[#0f172a]">
              {isAr ? "المقر · الخبر" : "HQ · Al Khobar"}
            </span>
          </div>
          <div
            className="mx-auto mt-1 h-6 w-px bg-gradient-to-b from-[#229388]/50 to-transparent"
            style={{ marginInline: "auto" }}
          />
        </div>
      </div>

      <div
        dir={isAr ? "rtl" : "ltr"}
        className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-12 px-2"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#475569]" />
          <span className="text-sm text-[#94a3b8]">{isAr ? "بصمة عالمية" : "Global footprint"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#2dd4bf]" />
          <span className="text-sm text-[#94a3b8]">
            {isAr ? "المملكة العربية السعودية — مقرنا" : "Saudi Arabia — Home base"}
          </span>
        </div>
      </div>
    </section>
  );
}
