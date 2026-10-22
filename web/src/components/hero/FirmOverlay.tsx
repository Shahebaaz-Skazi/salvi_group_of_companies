"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { firms } from "@/content/firms";
import { siteContent } from "@/content/site";
import { FIRM_ACCENTS, scrollToFirm } from "@/constants/hero";

interface FirmOverlayProps {
  activeFirm: 0 | 1 | 2 | 3 | 4 | 5 | null;
  targetProgress?: React.MutableRefObject<number>;
}

// Stagger delay helper — respects prefers-reduced-motion via CSS class
const STAGGER = 70; // ms between rows
const staggerStyle = (index: number): React.CSSProperties => ({
  animationDelay: `${index * STAGGER}ms`,
  animationFillMode: "both",
});

const FIRM_CATEGORIES: Record<number, string> = {
  0: "Industrial Manpower & Operations",
  1: "Workforce Staffing & Talent",
  2: "Certified Equipment Academy",
  3: "Aquaculture & Global Seafood",
  4: "Enterprise Support & Services",
  5: "Fleet & Commercial Mobility",
};

const FIRM_HIGHLIGHTS: Record<number, string[]> = {
  0: ["Verified Skilled Workforce", "100% Statutory Compliant", "Pan-Maharashtra Reach"],
  1: ["PF / ESIC Direct Management", "Executive & Blue Collar", "Fast Deployment SLA"],
  2: ["Dedicated Practice Yard", "Godrej Certified Trainers", "Safety-First Protocols"],
  3: ["Freshwater & Marine Supply", "Cold-Chain Integrity", "Domestic & Global Trade"],
  4: ["Reliable Operations", "Transparent Dealings", "Salvi Group Synergy"],
  5: ["Well-Maintained Fleet", "Corporate & Group Travel", "24/7 Route Assistance"],
};

// ─── Firm Card ────────────────────────────────────────────────────────────────
function FirmCard({ firmIndex }: { firmIndex: 0 | 1 | 2 | 3 | 4 | 5 }) {
  const firm = firms[firmIndex];
  const accent = FIRM_ACCENTS[firmIndex];
  const numStr = "0" + (firmIndex + 1);
  const category = FIRM_CATEGORIES[firmIndex] || "Salvi Group Enterprise";
  const highlights = FIRM_HIGHLIGHTS[firmIndex] || [];
  const nextIndex = firmIndex < 5 ? ((firmIndex + 1) as 0 | 1 | 2 | 3 | 4 | 5) : null;
  const nextFirm = nextIndex !== null ? firms[nextIndex] : null;

  // Two-column service split (single col on mobile)
  const services = firm.services || [];
  const half = Math.ceil(services.length / 2);
  const col1 = services.slice(0, half);
  const col2 = services.slice(half);

  return (
    <div
      className="w-full flex flex-col relative rounded-3xl p-5 sm:p-7 backdrop-blur-md border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden transform-gpu will-change-transform"
      style={{
        pointerEvents: "auto",
        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%), rgba(2,3,8,0.85)",
      }}
    >
      {/* Ambient glowing radial aura matching firm accent */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none -z-10 opacity-30"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none -z-10 opacity-20"
        style={{ backgroundColor: accent }}
      />

      {/* 1. Header Bar: Eyebrow + Strategic Category Badge */}
      <div
        className="flex items-center justify-between gap-3 mb-[clamp(8px,1.2vh,14px)] motion-safe:animate-[fadeInUp_0.5s_ease-out_both]"
        style={staggerStyle(0)}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] shrink-0"
            style={{ backgroundColor: accent, color: accent }}
          />
          <span className="text-[11px] font-mono tracking-widest text-white/90 uppercase font-semibold">
            {numStr} / 06
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[10px] font-mono tracking-wider text-white/60 uppercase">
            Salvi Group Firm
          </span>
        </div>

        {/* Strategic division pill */}
        <div className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-mono tracking-wider text-white/80 uppercase">
          {category}
        </div>
      </div>

      {/* 2. Firm name — full with subtle metallic glow */}
      <h2
        className="font-heading font-extrabold text-white mb-[clamp(4px,1vh,10px)] tracking-tight drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)] motion-safe:animate-[fadeInUp_0.5s_ease-out_both]"
        style={{
          fontSize: "clamp(1.5rem, min(2.7vw, 4.2vh), 2.7rem)",
          lineHeight: 1.15,
          textWrap: "balance" as React.CSSProperties["textWrap"],
          ...staggerStyle(1),
        }}
      >
        {firm.name}
      </h2>

      {/* 3. Short tagline */}
      {firm.description && !firm.description.includes("TODO") && (
        <p
          className="font-medium text-white/80 mb-[clamp(6px,1.1vh,12px)] motion-safe:animate-[fadeInUp_0.5s_ease-out_both]"
          style={{
            fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
            ...staggerStyle(2),
          }}
        >
          {firm.description}
        </p>
      )}

      {/* Highlights / Enterprise capability chips */}
      <div
        className="flex flex-wrap gap-1.5 mb-[clamp(8px,1.3vh,14px)] motion-safe:animate-[fadeInUp_0.5s_ease-out_both]"
        style={staggerStyle(3)}
      >
        {highlights.map((h, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-medium text-white/75"
          >
            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent }} />
            {h}
          </span>
        ))}
      </div>

      {/* 4. Story paragraph */}
      {firm.story && (
        <p
          className="
            mb-[clamp(8px,1.3vh,14px)] leading-relaxed
            line-clamp-3 [@media(max-height:680px)]:line-clamp-2
            motion-safe:animate-[fadeInUp_0.5s_ease-out_both]
          "
          style={{
            fontSize: "clamp(0.825rem, min(0.95vw, 1.8vh), 0.925rem)",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.72)",
            maxWidth: "52ch",
            ...staggerStyle(4),
          }}
        >
          {firm.story}
        </p>
      )}

      {/* 5. Services micro glass cards */}
      {services.length > 0 && (
        <div
          className="mb-[clamp(8px,1.3vh,14px)] motion-safe:animate-[fadeInUp_0.5s_ease-out_both]"
          style={staggerStyle(5)}
        >
          <p
            className="font-semibold uppercase tracking-widest mb-[clamp(4px,0.8vh,8px)] flex items-center justify-between"
            style={{
              fontSize: "0.68rem",
              fontVariant: "small-caps",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.12em",
            }}
          >
            <span>{firm.servicesLabel || "What we offer"}</span>
            <span className="text-[10px] text-white/30 font-normal">Core Capabilities</span>
          </p>

          <div className="hidden sm:grid grid-cols-2 gap-2">
            {col1.map((svc, i) => (
              <ServiceItem key={svc} svc={svc} accent={accent} index={i} hideOnShort={i >= 3} />
            ))}
            {col2.map((svc, i) => (
              <ServiceItem key={svc} svc={svc} accent={accent} index={col1.length + i} hideOnShort={(col1.length + i) >= 3} />
            ))}
          </div>
          <div className="sm:hidden flex flex-col gap-1.5">
            {services.slice(0, 3).map((svc, i) => (
              <ServiceItem key={svc} svc={svc} accent={accent} index={i} hideOnShort={false} />
            ))}
          </div>
        </div>
      )}

      {/* 6. Audience banner */}
      {firm.audience && (
        <div
          className="
            hidden sm:flex items-start gap-2.5
            p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]
            mb-[clamp(8px,1.4vh,16px)]
            [@media(max-height:640px)]:hidden
            motion-safe:animate-[fadeInUp_0.5s_ease-out_both]
          "
          style={staggerStyle(6)}
        >
          <div
            className="shrink-0 w-1 rounded-full self-stretch"
            style={{ backgroundColor: accent, minHeight: "1em", boxShadow: `0 0 6px ${accent}` }}
          />
          <p
            className="text-white/60 italic leading-snug"
            style={{ fontSize: "clamp(0.75rem, 0.85vw, 0.825rem)" }}
          >
            <span className="font-semibold text-white/80 not-italic uppercase tracking-wider text-[10px] block mb-0.5">Who this is for:</span>
            {firm.audience}
          </p>
        </div>
      )}

      {/* 7. Action Bar with Stepper Button */}
      <div
        className="flex items-center gap-2.5 flex-wrap min-[480px]:flex-nowrap motion-safe:animate-[fadeInUp_0.5s_ease-out_both] pt-1"
        style={staggerStyle(7)}
      >
        <Link
          href={"/" + firm.slug}
          className="inline-flex items-center justify-center gap-2 font-medium text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 whitespace-nowrap shadow-lg"
          style={{
            backgroundColor: accent,
            color: "#fff",
            boxShadow: `0 0 20px ${accent}40`,
          }}
        >
          Explore Firm
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 hover:scale-105 active:scale-95 text-white whitespace-nowrap backdrop-blur-md"
        >
          Get a Quote
        </Link>

        {/* Stepper shortcut to next company */}
        {nextIndex !== null && nextFirm && (
          <button
            onClick={() => scrollToFirm(nextIndex)}
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
            title={`Jump to ${nextFirm.name}`}
          >
            <span>Next (0{firmIndex + 2})</span>
            <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function ServiceItem({
  svc,
  accent,
  index,
  hideOnShort,
}: {
  svc: string;
  accent: string;
  index: number;
  hideOnShort: boolean;
}) {
  return (
    <div
      className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 text-gray-200 transition-all duration-300 hover:translate-x-0.5${hideOnShort ? " [@media(max-height:600px)]:hidden" : ""}`}
      style={{ fontSize: "clamp(0.78rem, 0.88vw, 0.86rem)" }}
    >
      <div
        className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
        style={{ backgroundColor: `${accent}25` }}
      >
        <svg
          className="w-2.5 h-2.5 shrink-0"
          style={{ color: accent }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="font-medium text-white/90 group-hover:text-white leading-tight">{svc}</span>
    </div>
  );
}

// ─── Intro Card ───────────────────────────────────────────────────────────────
function IntroCard() {
  const shortNames = ["Sonali", "Primeworkforce", "Sonali Forklift", "Flins & Flora", "Shivtej", "Sonali Tours"];

  return (
    <div className="w-full flex flex-col relative" style={{ pointerEvents: "auto" }}>
      {/* Ambient subtle glow behind text */}
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Eyebrow badge */}
      <div className="flex items-center gap-3 mb-[clamp(10px,1.8vh,20px)] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(242,31,26,0.9)]" />
          <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase">
            Pimpri, Pune • Industrial Leaders
          </span>
        </div>
      </div>

      {/* H1 */}
      <h1
        className="font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/75 mb-[clamp(8px,1.4vh,16px)] drop-shadow-[0_2px_20px_rgba(255,255,255,0.12)] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_both]"
        style={{
          fontSize: "clamp(1.85rem, min(3.2vw, 5.2vh), 3.4rem)",
          lineHeight: 1.1,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        {siteContent.groupName}
      </h1>

      {/* Tagline */}
      <p
        className="font-heading font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-white/70 mb-[clamp(10px,1.8vh,20px)] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.3s_both]"
        style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.4rem)" }}
      >
        {siteContent.tagline}
      </p>

      {/* Description */}
      <p
        className="text-white/70 mb-[clamp(14px,2.4vh,24px)] leading-relaxed line-clamp-3 motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_both]"
        style={{ fontSize: "clamp(0.875rem, 1vw, 1.025rem)" }}
      >
        A trusted provider of manpower supply and HR services, forklift driver training, and fish farming, sale, export and import.
      </p>

      {/* Firm chips with glowing dots */}
      <div className="flex flex-wrap gap-2 mb-[clamp(14px,2.2vh,24px)] [@media(max-height:680px)]:hidden motion-safe:animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
        {firms.map((f, i) => (
          <Link
            key={f.id}
            href={"/" + f.slug}
            className="group/chip flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-sm"
          >
            <div 
              className="w-2 h-2 rounded-full shrink-0 transition-transform group-hover/chip:scale-125" 
              style={{ 
                backgroundColor: FIRM_ACCENTS[i],
                boxShadow: `0 0 10px ${FIRM_ACCENTS[i]}`
              }} 
            />
            <span className="text-[11px] font-medium text-white/80 group-hover/chip:text-white whitespace-nowrap transition-colors">{shortNames[i]}</span>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-5 mb-[clamp(12px,2vh,22px)] pb-[clamp(12px,2vh,22px)] border-b border-white/10 [@media(max-height:750px)]:hidden motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
        {[
          { value: "25+", label: "Years Leadership\nExperience" },
          { value: "6", label: "Specialized\nFirms" },
          { value: "10+", label: "Major\nClients" },
        ].map(({ value, label }, i) => (
          <div key={i} className="flex items-center gap-5">
            {i > 0 && <div className="w-px h-8 bg-white/10 hidden sm:block" />}
            <div className="flex flex-col">
              <span className="text-xl font-bold font-heading text-white">{value}</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest leading-tight whitespace-pre-line">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3.5 flex-wrap min-[480px]:flex-nowrap motion-safe:animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: "smooth" })}
          className="group inline-flex items-center justify-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-[#ff3b30] text-primary-foreground hover:shadow-[0_0_30px_rgba(242,31,26,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap shadow-[0_0_20px_rgba(242,31,26,0.35)]"
        >
          <span>Explore Our Companies</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-xl border border-white/20 hover:border-white/40 text-white transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap shadow-lg shadow-black/20"
        >
          Get a Quote
        </Link>
      </div>

      {/* Trust strip */}
      <div className="flex flex-wrap gap-2.5 mt-[clamp(14px,2.2vh,22px)] pt-[clamp(14px,2.2vh,22px)] border-t border-white/10 [@media(max-height:550px)]:hidden motion-safe:animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
        {["GST Registered", "Udyam / MSME Registered", "LLP Registered"].map((label) => (
          <div key={label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm text-[10px] tracking-wider uppercase text-white/60">
            <svg className="w-3.5 h-3.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Progress dots ────────────────────────────────────────────────────────────
function ProgressLine({ activeFirm }: { activeFirm: 0 | 1 | 2 | 3 | 4 | 5 | null }) {
  const shortNames = [
    "Sonali Enterprises",
    "Primeworkforce HR",
    "Godrej Forklift Academy",
    "Flins & Flora Aquaculture",
    "Shivtej Enterprises",
    "Sonali Tours & Travels",
  ];

  return (
    <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2.5 pointer-events-auto bg-black/45 backdrop-blur-xl p-2.5 rounded-full border border-white/10 shadow-2xl">
      {([0, 1, 2, 3, 4, 5] as const).map((i) => {
        const isActive = activeFirm === i;
        const isPast = activeFirm !== null && activeFirm > i;
        return (
          <button
            key={i}
            onClick={() => scrollToFirm(i)}
            className="group relative flex items-center justify-center p-1 rounded-full transition-all duration-300 focus:outline-none cursor-pointer"
            aria-label={`Jump to ${firms[i].name}`}
          >
            {/* Hover Tooltip */}
            <div className="absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-black/90 text-white text-[11px] font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 border border-white/15 shadow-2xl -translate-x-1 group-hover:translate-x-0 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: FIRM_ACCENTS[i] }}
              />
              <span className="text-white/60 font-mono">0{i + 1}</span>
              <span>{shortNames[i]}</span>
            </div>

            {/* Indicator pill */}
            <div
              className="rounded-full transition-all duration-500 ease-out flex items-center justify-center"
              style={{
                width: isActive ? "8px" : "6px",
                height: isActive ? "32px" : "10px",
                backgroundColor: isActive
                  ? FIRM_ACCENTS[i]
                  : isPast
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(255,255,255,0.15)",
                boxShadow: isActive ? `0 0 14px ${FIRM_ACCENTS[i]}` : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function FirmOverlay({ activeFirm, targetProgress }: FirmOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const introPanelRef = useRef<HTMLDivElement>(null);

  // Measure real header height with ResizeObserver → --header-h
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) {
      document.documentElement.style.setProperty("--header-h", "80px");
      return;
    }
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    });
    ro.observe(header);
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    return () => ro.disconnect();
  }, []);

  // Intro panel: animate via RAF driven by targetProgress
  useEffect(() => {
    if (!targetProgress) return;
    let raf: number;
    const tick = () => {
      const el = introPanelRef.current;
      if (el) {
        const p = targetProgress.current;
        let opacity = 1;
        let tx = 0;
        if (p > 0.04) {
          const t = Math.min(1, (p - 0.04) / 0.10);
          opacity = 1 - t;
          tx = -20 * t;
        }
        el.style.opacity = opacity.toString();
        el.style.transform = "translateX(" + tx + "px)";
        el.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        el.style.pointerEvents = opacity < 0.1 ? "none" : "auto";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetProgress]);


  return (
    <div ref={containerRef} className="absolute inset-0 z-30 pointer-events-none">
      <ProgressLine activeFirm={activeFirm} />

      {/* Scrim */}
      <div
        className="absolute top-0 bottom-0 left-0 hidden lg:block pointer-events-none"
        style={{
          width: "calc(min(42vw, 620px) + 10vw)",
          background: "linear-gradient(90deg, rgba(2,3,8,0.90) 0%, rgba(2,3,8,0.55) 55%, transparent 100%)",
        }}
      />

      {/*
        Panels layer:
          top = real header bottom (CSS var, measured by ResizeObserver)
          bottom = viewport minus 24–48px breathing room
          left/right = 0
        Each child panel is absolute inset-0 inside this layer.
        align-items: center on each panel = mathematically centred.
        Panels are NEVER in normal flow together.
      */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "var(--header-h, 80px)",
          bottom: "clamp(24px, 4vh, 48px)",
          boxSizing: "border-box",
        }}
      >
        {/* ── INTRO PANEL (desktop) ── */}
        <div
          ref={introPanelRef}
          data-panel="intro"
          className="hidden lg:flex absolute inset-0 items-center justify-start"
          style={{
            paddingInlineStart: "clamp(24px, 4vw, 72px)",
            paddingInlineEnd: "clamp(16px, 2vw, 32px)",
          }}
        >
          <div className="w-full" style={{ maxWidth: "min(42vw, 620px)" }}>
            <IntroCard />
          </div>
        </div>
        {/* Intro mobile */}
        <div
          className="lg:hidden absolute left-4 right-4 bottom-4"
          style={{
            opacity: activeFirm === null ? 1 : 0,
            visibility: activeFirm === null ? "visible" : "hidden",
            transition: "opacity 0.4s ease",
            pointerEvents: activeFirm === null ? "auto" : "none",
          }}
        >
          <div
            className="bg-black/70 backdrop-blur-md rounded-2xl border border-white/10 p-5 shadow-2xl overflow-hidden"
            style={{ maxHeight: "55vh" }}
          >
            <IntroCard />
          </div>
        </div>

        {/* ── FIRM PANELS ── */}
        {([0, 1, 2, 3, 4, 5] as const).map((i) => {
          const visible = activeFirm === i;
          return (
            <div key={i}>
              {/* Desktop */}
              <div
                data-panel={"firm-" + i}
                className="hidden lg:flex absolute inset-0 items-center justify-start"
                style={{
                  paddingInlineStart: "clamp(24px, 4vw, 72px)",
                  paddingInlineEnd: "clamp(16px, 2vw, 32px)",
                  opacity: visible ? 1 : 0,
                  visibility: visible ? "visible" : "hidden",
                  pointerEvents: visible ? "auto" : "none",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                  transform: visible ? "translateX(0)" : "translateX(-16px)",
                }}
              >
                <div className="w-full" style={{ maxWidth: "min(42vw, 620px)" }}>
                  <FirmCard firmIndex={i} />
                </div>
              </div>
              {/* Mobile */}
              <div
                className="lg:hidden absolute left-3 right-3 bottom-4"
                style={{
                  opacity: visible ? 1 : 0,
                  visibility: visible ? "visible" : "hidden",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  pointerEvents: visible ? "auto" : "none",
                  maxHeight: "65vh",
                  overflowY: "auto",
                }}
              >
                <FirmCard firmIndex={i} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
