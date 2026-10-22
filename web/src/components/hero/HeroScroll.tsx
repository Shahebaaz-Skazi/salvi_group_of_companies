"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import FirmOverlay from "./FirmOverlay";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsLowEnd, useWebGLAvailable } from "@/hooks/useIsLowEnd";
import { firms } from "@/content/firms";
import { siteContent } from "@/content/site";
import {
  SCRUB_AMOUNT,
  STOP_PROGRESSES,
  STOPS_FRAMES,
  HOLD_F,
  FIRM_ACCENTS,
  scrollToFirm,
} from "@/constants/hero";

// Lazy-load the Canvas after first paint
const CanvasScene = dynamic(() => import("./CanvasScene"), {
  ssr: false,
  loading: () => null,
});

// ─── Derive firm-stop ranges ─────────────────────────────────────
const FIRM_STOPS: { firmIndex: 0 | 1 | 2 | 3 | 4 | 5; start: number; end: number }[] = [
  { firmIndex: 0, start: STOPS_FRAMES.firm1 / 990, end: (STOPS_FRAMES.firm1 + HOLD_F) / 990 },
  { firmIndex: 1, start: STOPS_FRAMES.firm2 / 990, end: (STOPS_FRAMES.firm2 + HOLD_F) / 990 },
  { firmIndex: 2, start: STOPS_FRAMES.firm3 / 990, end: (STOPS_FRAMES.firm3 + HOLD_F) / 990 },
  { firmIndex: 3, start: STOPS_FRAMES.firm4 / 990, end: (STOPS_FRAMES.firm4 + HOLD_F) / 990 },
  { firmIndex: 4, start: STOPS_FRAMES.firm5 / 990, end: (STOPS_FRAMES.firm5 + HOLD_F) / 990 },
  { firmIndex: 5, start: STOPS_FRAMES.firm6 / 990, end: (STOPS_FRAMES.firm6 + HOLD_F) / 990 },
];

function deriveActiveFirm(progress: number): 0 | 1 | 2 | 3 | 4 | 5 | null {
  for (const s of FIRM_STOPS) {
    if (progress >= s.start - (12 / 990) && progress <= s.end + (12 / 990)) return s.firmIndex;
  }
  return null;
}

// ─── Reduced-motion poster fallback ──────────────────────────────
function PosterFallback() {
  const [shown, setShown] = useState(0); // firm index 0-3, cycles
  useEffect(() => {
    const id = setInterval(() => setShown((v) => (v + 1) % 4), 4000);
    return () => clearInterval(id);
  }, []);
  const firm = firms[shown];
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#05060A]">
      <Image
        src="/images/gear_poster.png"
        alt="Salvi Group of Companies - Gear illustration"
        fill
        className="object-cover opacity-40"
        priority
      />
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-heading font-bold mb-3 text-white transition-all duration-700">
          {siteContent.groupName}
        </h1>
        <p className="text-lg text-white/60 mb-8">{siteContent.tagline}</p>
        <p
          className="text-2xl font-heading font-semibold transition-colors duration-700"
          style={{ color: FIRM_ACCENTS[shown] }}
        >
          {firm.name}
        </p>
        <p className="text-white/50 mt-2 max-w-xs mx-auto">{firm.description}</p>
      </div>
    </section>
  );
}

import React, { Component, ErrorInfo, ReactNode } from "react";

class HeroErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("HeroErrorBoundary caught:", error, errorInfo);
    
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}



// ─── Main HeroScroll ─────────────────────────────────────────────
export default function HeroScroll() {
  const reduced = useReducedMotion();
  const lowEnd  = useIsLowEnd();
  const webgl   = useWebGLAvailable();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  
  
  const [activeFirm, setActiveFirm] = useState<0 | 1 | 2 | 3 | 4 | 5 | null>(null);
  
  const [canvasReady, setCanvasReady] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  

  

  

  // Show canvas after load and idle
  useEffect(() => {
    const start = () => {
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(() => setCanvasReady(true));
      } else {
        setTimeout(() => setCanvasReady(true), 1200);
      }
    };
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start);
      return () => window.removeEventListener("load", start);
    }
  }, []);

  // Track visibility
  useEffect(() => {
    if (!wrapperRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  // Custom scroll listener
  // Throttled scroll listener — guarantees at most 1 RAF update per frame and prevents runaway loops
  useEffect(() => {
    if (reduced || lowEnd || !webgl) return;
    
    let ticking = false;
    let lastFirm: 0 | 1 | 2 | 3 | 4 | 5 | null = null;

    const updateScrollProgress = () => {
      ticking = false;
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;

      const p = Math.min(1, Math.max(0, -rect.top / total));
      targetProgress.current = p;

      wrapperRef.current.style.setProperty('--hero-progress', p.toString());
      if (cueRef.current) {
        cueRef.current.style.opacity = p > 0.94 ? String(Math.max(0, 1 - (p - 0.94) / 0.05)) : "1";
      }

      const nextFirm = deriveActiveFirm(p);
      if (nextFirm !== lastFirm) {
        lastFirm = nextFirm;
        setActiveFirm(nextFirm);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("salvi-active-firm", { detail: nextFirm }));
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollProgress);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, lowEnd, webgl]);

  const currentFrameloop = heroInView ? "always" : "never";

  if (reduced || lowEnd || !webgl) {
    return (
      <>
        <PosterFallback />
        
      </>
    );
  }

  return (
    <>
      
      <section
        ref={wrapperRef}
        style={{ height: "900vh", position: "relative" }}
        aria-label="Salvi Group interactive hero"
      >
        <div style={{ position: "sticky", top: 0, height: "100svh", minHeight: "100vh", overflow: "hidden" }}>
          {/* Poster shown until canvas is ready */}
          {!canvasReady && (
            <Image
              src="/images/gear_poster.png"
              alt=""
              fill
              className="object-cover pointer-events-none"
              priority
              aria-hidden="true"
            />
          )}

          {/* Global space backdrop shines through transparent sticky container */}

          {/* 3-D canvas */}
          {canvasReady && (
            <div ref={canvasRef} className="absolute inset-0 z-[1]">
              <HeroErrorBoundary>
                <CanvasScene targetProgressRef={targetProgress} override={null} activeFirm={activeFirm} heroInView={heroInView} />
              </HeroErrorBoundary>
            </div>
          )}

          {/* Overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 80% at center, transparent 65%, rgba(2,3,8,0.3) 100%)" }} />
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-[0.04]">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
          </svg>


          {/* UI overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <FirmOverlay activeFirm={activeFirm} targetProgress={targetProgress} />
          </div>

          {/* Dynamic Interactive Scroll Indicator */}
          <div 
            ref={cueRef}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto transition-all duration-300"
          >
            <button
              onClick={() => {
                if (activeFirm === null) {
                  scrollToFirm(0);
                } else if (activeFirm < 5) {
                  scrollToFirm(activeFirm + 1);
                } else if (wrapperRef.current) {
                  const targetY = wrapperRef.current.clientHeight;
                  window.scrollTo({ top: targetY, behavior: "smooth" });
                }
              }}
              className="group flex flex-col items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xl border border-white/15 hover:border-white/35 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full animate-ping shrink-0"
                  style={{
                    backgroundColor: activeFirm !== null ? FIRM_ACCENTS[activeFirm] : "#F21F1A",
                  }}
                />
                <span className="text-xs font-medium tracking-wider text-white/90 group-hover:text-white uppercase">
                  {activeFirm === null
                    ? "Scroll or Click to Explore Companies (01 / 06)"
                    : activeFirm < 5
                    ? `Next Company (0${activeFirm + 2} / 06): ${firms[activeFirm + 1].name.split(" ")[0]} ↓`
                    : "Scroll to Explore Overview & Services ↓"}
                </span>
                <svg
                  className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-transform duration-300 group-hover:translate-y-0.5 animate-bounce shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Multi-segment progress indicator line */}
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: activeFirm === null ? "16%" : `${((activeFirm + 1) / 6) * 100}%`,
                    backgroundColor: activeFirm !== null ? FIRM_ACCENTS[activeFirm] : "#F21F1A",
                    boxShadow: `0 0 8px ${activeFirm !== null ? FIRM_ACCENTS[activeFirm] : "#F21F1A"}`,
                  }}
                />
              </div>
            </button>



          </div>
        </div>
      </section>
    </>
  );
}
