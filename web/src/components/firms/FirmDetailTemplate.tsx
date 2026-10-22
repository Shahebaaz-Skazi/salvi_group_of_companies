"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, stagger } from "animejs";
import AccentSetter from "@/components/ui/AccentSetter";
import { DetailedFirmData, DETAILED_FIRMS } from "./firmDetailsData";
import { firms } from "@/content/firms";

interface Props {
  firm: DetailedFirmData;
}

export default function FirmDetailTemplate({ firm }: Props) {
  const metricsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate metrics on mount
    if (metricsRef.current) {
      const metricBoxes = metricsRef.current.querySelectorAll(".firm-metric-box");
      animate(metricBoxes, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.95, 1],
        delay: stagger(80, { start: 100 }),
        ease: "outBack(1.3)",
        duration: 600,
      });
    }

    // Animate capability cards
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".firm-capability-card");
      animate(cards, {
        opacity: [0, 1],
        translateY: [24, 0],
        delay: stagger(100, { start: 250 }),
        ease: "outCubic",
        duration: 700,
      });
    }
  }, [firm.slug]);

  // Other companies to navigate to
  const otherFirms = firms.filter((f) => f.slug !== firm.slug);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <AccentSetter firmId={firm.id} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-muted-foreground/60">Our Companies</span>
        <span>/</span>
        <span className="text-primary font-semibold">{firm.name}</span>
      </nav>

      {/* ── HERO BANNER ── */}
      <div className="relative p-8 md:p-14 rounded-3xl glass-panel border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden mb-14">
        {/* Ambient atmospheric glow */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-25"
          style={{ backgroundColor: firm.accent }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-[90px] pointer-events-none opacity-15"
          style={{ backgroundColor: firm.accent }}
        />

        <div className="relative z-10 max-w-4xl">
          {/* Header Eyebrow */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide border uppercase"
              style={{
                backgroundColor: `${firm.accent}15`,
                color: firm.accent,
                borderColor: `${firm.accent}40`,
              }}
            >
              {firm.badge}
            </span>
            <span className="text-xs font-mono text-white/40">•</span>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              {firm.category}
            </span>
          </div>

          {/* Firm Name */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight mb-5"
            style={{ color: firm.accent }}
          >
            {firm.name}
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl font-heading font-medium text-foreground/90 mb-6 leading-snug">
            {firm.tagline}
          </p>

          {/* Deep Story Paragraph */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            {firm.story}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/contact?type=${firm.enquiryType}`}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:scale-105 active:scale-95"
              style={{
                backgroundColor: firm.accent,
                color: "#ffffff",
                boxShadow: `0 0 25px ${firm.accent}50`,
              }}
            >
              {firm.ctaButton}
            </Link>
            <a
              href="#capabilities"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/[0.05] hover:bg-white/[0.1] text-foreground border border-white/10 hover:border-white/20 transition-all"
            >
              Explore Capabilities ↓
            </a>
          </div>
        </div>
      </div>

      {/* ── LIVE METRIC COUNTERS ── */}
      <div
        ref={metricsRef}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
      >
        {firm.metrics.map((m, i) => (
          <div
            key={i}
            className="firm-metric-box p-6 rounded-2xl glass-card border border-white/10 text-center flex flex-col justify-center"
          >
            <div
              className="text-3xl sm:text-4xl font-heading font-extrabold mb-1.5"
              style={{ color: firm.accent }}
            >
              {m.value}
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── CORE CAPABILITIES / EXPANDED SERVICES ── */}
      <div id="capabilities" className="mb-20 scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
            <span>Specialized Operations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            {firm.capabilitiesTitle}
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch"
        >
          {firm.capabilities.map((cap, i) => (
            <div
              key={i}
              className="firm-capability-card group p-7 sm:p-8 rounded-3xl glass-card border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Corner hover glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                style={{ backgroundColor: firm.accent }}
              />

              <div>
                {/* Header with Icon and Number */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border"
                    style={{
                      backgroundColor: `${firm.accent}15`,
                      color: firm.accent,
                      borderColor: `${firm.accent}30`,
                    }}
                  >
                    0{i + 1}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/60">
                    Operation #{i + 1}
                  </span>
                </div>

                {/* Capability Title */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-white transition-colors">
                  {cap.title}
                </h3>

                {/* Capability Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {cap.desc}
                </p>

                {/* Deliverable Bullets */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/70 block mb-2 font-semibold">
                    Key Scope & Deliverables:
                  </span>
                  {cap.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-muted-foreground/90">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: firm.accent }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WORKFLOW / DEPLOYMENT PROCESS (If Available) ── */}
      {firm.workflowSteps && (
        <div className="mb-20 p-8 sm:p-12 rounded-3xl glass-panel border border-white/10">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-2 block">
              Execution Methodology
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              {firm.workflowTitle || "Standardized Execution Workflow"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {firm.workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition-colors"
              >
                <div className="text-2xl font-heading font-extrabold text-primary mb-3">
                  {step.step}
                </div>
                <h4 className="font-heading font-bold text-foreground text-sm mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TRUSTED CLIENT INTEGRATIONS (If Available) ── */}
      {firm.trustedBy && (
        <div className="mb-20 p-8 rounded-3xl glass-card border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-1">
                Tier-1 Validated
              </span>
              <h3 className="text-xl font-heading font-bold text-foreground">
                Key Industrial Deployments
              </h3>
            </div>
            <Link
              href="/clients"
              className="text-xs font-semibold text-primary hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View All 13 Clients & Case Studies</span>
              <span>→</span>
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {firm.trustedBy.map((client, cIdx) => (
              <span
                key={cIdx}
                className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-foreground/90 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {client}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── STATUTORY COMPLIANCE SHIELD (If Available) ── */}
      {firm.statutory && (
        <div className="mb-20 p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-heading font-bold text-foreground text-sm">
                Verified Statutory & Legal Governance
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Principal employers are protected with verified registrations and active compliance certificates.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {firm.statutory.map((item, sIdx) => (
              <div
                key={sIdx}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-left"
              >
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                  {item.label}
                </span>
                <span className="text-xs font-mono font-semibold text-foreground/90">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONGLOMERATE NAVIGATOR: OTHER COMPANIES ── */}
      <div className="mb-20 pt-10 border-t border-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
              Conglomerate Synergy
            </span>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Other Salvi Group Companies
            </h3>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-primary hover:text-white transition-colors"
          >
            View Group Ecosystem →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {otherFirms.map((of) => (
            <Link
              key={of.id}
              href={`/${of.slug}`}
              className="p-5 rounded-2xl glass-card border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div
                  className="w-2.5 h-2.5 rounded-full mb-3 shadow-[0_0_8px_currentColor]"
                  style={{
                    backgroundColor: `var(${of.accentVar})`,
                    color: `var(${of.accentVar})`,
                  }}
                />
                <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {of.name}
                </h4>
                <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {of.description}
                </p>
              </div>
              <span className="text-[10px] font-mono uppercase text-primary/80 mt-4 block">
                Explore Division →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CALL TO ACTION BANNER ── */}
      <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-primary/20 via-white/[0.04] to-primary/10 border border-white/15 text-center shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            {firm.ctaHeading}
          </h2>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            {firm.ctaText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?type=${firm.enquiryType}`}
              className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-primary hover:opacity-90 shadow-[0_0_25px_rgba(242,31,26,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              {firm.ctaButton}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-foreground border border-white/15 transition-all"
            >
              Schedule Client Discussion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
