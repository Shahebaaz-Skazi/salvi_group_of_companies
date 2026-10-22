"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { firms } from "@/content/firms";
import { siteContent, t } from "@/content/site";
import { FIRM_ACCENTS } from "@/constants/hero";
import { animate, stagger } from "animejs";

const BIG_CONNECTIONS = [
  {
    name: "TATA MOTORS LTD.",
    location: "Pimpri & TMPVL (K Block)",
    category: "Automotive OEM Leader",
    role: "Material Handling, OK Car Dispatch, Altroz/Nova Cup & Jig Transfers, Tractor Movement",
    accent: "#F21F1A",
    highlight: true,
  },
  {
    name: "GODREJ & BOYCE MFG. CO. LTD.",
    location: "Pune Branch",
    category: "Industrial Equipment & MHE",
    role: "Strategic Training Alliance & Certified Forklift Operator Academy",
    accent: "#FF9E0D",
    highlight: true,
  },
  {
    name: "BRAKES INDIA LTD.",
    location: "Waki Plant, Pune",
    category: "Automotive Braking Systems",
    role: "Core Industrial Manpower & Assembly Support",
    accent: "#1A73FF",
  },
  {
    name: "AXLES INDIA LTD.",
    location: "Chennai Hub",
    category: "Commercial Axle Systems",
    role: "Specialized Contract Workforce & Component Handling",
    accent: "#00D9B8",
  },
  {
    name: "AUTOMOTIVE AXLES LIMITED",
    location: "Chota Govindpur",
    category: "Heavy Vehicle Axle OEM",
    role: "Plant Floor Manpower & Production Support",
    accent: "#9B5CFF",
  },
  {
    name: "MERITOR HVS INDIA LTD.",
    location: "Mysore Facility",
    category: "Drivetrain & Mobility",
    role: "Material Handling & Heavy Engineering Staffing",
    accent: "#FF4D99",
  },
  {
    name: "ALCRAFT THERMOTECHNOLOGIES",
    location: "Chennai",
    category: "Thermal Engineering",
    role: "Technical Job-Work & Plant Maintenance",
    accent: "#F21F1A",
  },
  {
    name: "MAHABAL AUTOANCILLARIES LTD.",
    location: "Sangli",
    category: "Precision Auto Components",
    role: "Machining & Shopfloor Workforce",
    accent: "#1A73FF",
  },
  {
    name: "WINDALS AUTO & PRECISION",
    location: "Talawade & Bhosari MIDC",
    category: "Automotive Stamping & Axles",
    role: "Plant Material Movement & Production Staffing",
    accent: "#FF9E0D",
  },
  {
    name: "MADRAS ENGG. IND. PVT. LTD.",
    location: "Kanchipuram",
    category: "Heavy Vehicle Components",
    role: "Industrial Labour & Logistics Contracting",
    accent: "#00D9B8",
  },
  {
    name: "PROWIZ MANSYSTEMS PVT. LTD.",
    location: "Noida",
    category: "Industrial Automation Systems",
    role: "Specialized Technical Personnel Support",
    accent: "#9B5CFF",
  },
  {
    name: "TATA MOTORS PASSENGER VEHICLE",
    location: "TCF2 & OMEGA PDI",
    category: "Vehicle Assembly & Dispatch",
    role: "Vehicle Movement, Press Shop Forklift & Dispatch Operations",
    accent: "#F21F1A",
    highlight: true,
  },
];

const TIMELINE_MILESTONES = [
  {
    year: "1999",
    title: "Founding of Sonali Enterprises",
    desc: "Established in Pimpri-Chinchwad (PCMC) as the flagship industrial firm, providing mechanical fabrication and dedicated contract workforce to early automotive pioneers.",
    badge: "Heritage Inception",
  },
  {
    year: "2006",
    title: "Tier-1 Automotive Scale & Tata Motors Alliance",
    desc: "Expanded into 24/7 material handling, assembly jig transfers, and car dispatch operations across critical plant sectors of Tata Motors.",
    badge: "OEM Enlistment",
  },
  {
    year: "2012",
    title: "Godrej Material Handling Skill Partnership",
    desc: "Partnered with Godrej & Boyce to establish the Sonali Godrej Forklift Driver Training Center, training and certifying workplace-ready equipment operators.",
    badge: "Skill Academy",
  },
  {
    year: "2018",
    title: "Incorporation of Primeworkforce Solutions LLP",
    desc: "Pioneered computerized statutory auditing, digitized HR compliance, EPF, and ESIC account management to help clients navigate labor laws seamlessly.",
    badge: "Corporate LLP",
  },
  {
    year: "2021",
    title: "Multi-Sector Diversification: Aquaculture & Logistics",
    desc: "Expanded the group horizon with Flins & Flora LLP (freshwater aquaculture, cold-chain seafood trade) and Shivtej Enterprises (plant support services).",
    badge: "Diversification",
  },
  {
    year: "Today",
    title: "Unified Industrial Conglomerate",
    desc: "6 integrated operating firms servicing Maharashtra's industrial golden corridor with over 25+ years of verified compliance, leadership, and operational mastery.",
    badge: "Industry Leader",
  },
];

const STATUTORY_SHIELDS = [
  {
    code: "LLP Registered",
    title: "Primeworkforce Solutions LLP",
    desc: "Legally incorporated limited liability partnership under the Ministry of Corporate Affairs.",
    status: "Active & Verified",
  },
  {
    code: "GSTIN",
    title: "27ABJFP7711M1ZP",
    desc: "100% Goods & Services Tax compliant with regular input credit auditing and filings.",
    status: "Government Verified",
  },
  {
    code: "MSME / UDYAM",
    title: "UDYAM-MH-26-1212463",
    desc: "Official enterprise accreditation under the Ministry of Micro, Small and Medium Enterprises.",
    status: "Certified Enterprise",
  },
  {
    code: "EPFO & ESIC",
    title: "100% Direct Account Settlement",
    desc: "Complete ECR compliance, UAN registration, medical security, and accident insurance for every deployed worker.",
    status: "Zero Default Record",
  },
  {
    code: "Labour Law Compliance",
    title: "Shop & Establishment Act",
    desc: "Full adherence to Contract Labour (Regulation & Abolition) Act, Minimum Wages, and Professional Tax rules.",
    status: "Statutory Shield",
  },
  {
    code: "Safety First",
    title: "Zero-Harm Culture",
    desc: "Strict PPE standards, safety inductions, and certified equipment training before plant-floor deployment.",
    status: "Standard Protocol",
  },
];

export default function AboutShowcase() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsAnimated = useRef(false);

  useEffect(() => {
    // Animate stats counter using Anime.js
    if (!metricsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !metricsAnimated.current) {
          metricsAnimated.current = true;

          // Target values
          const targets = [
            { el: "#stat-exp", target: 25, suffix: "+" },
            { el: "#stat-firms", target: 6, suffix: " Firms" },
            { el: "#stat-clients", target: 13, suffix: "+" },
            { el: "#stat-compliance", target: 100, suffix: "%" },
          ];

          targets.forEach(({ el, target, suffix }) => {
            const domEl = document.querySelector(el);
            if (!domEl) return;
            const counter = { val: 0 };
            animate(counter, {
              val: target,
              duration: 2000,
              ease: "outCubic",
              onUpdate: () => {
                domEl.textContent = `${Math.floor(counter.val)}${suffix}`;
              },
            });
          });

          // Stagger reveal stat cards
          animate(".stat-card", {
            translateY: [30, 0],
            opacity: [0, 1],
            delay: stagger(100),
            duration: 800,
            ease: "outCubic",
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full relative z-10 pb-28">
      {/* ─── 1. HERO HEADER ─── */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/12 backdrop-blur-xl mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#F21F1A]" />
          <span className="text-[11px] font-mono tracking-widest text-white/90 uppercase font-semibold">
            Pimpri-Chinchwad, Pune • 25+ Years Industrial Mastery • Tier-1 Industrial Partner
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white mb-8 tracking-tight drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)] max-w-5xl mx-auto leading-[1.1]">
          Engineering Industrial Excellence Across Sectors.
        </h1>

        <p className="text-lg sm:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed mb-12">
          {t("Salvi Group of Companies is a multi-sector industrial conglomerate headquartered in Pimpri, Pune. Spanning precision manufacturing operations, enterprise workforce deployment, certified equipment training, cold-chain aquaculture, and corporate mobility, the group serves as a trusted Tier-1 partner to India's leading automotive and engineering giants.")}
        </p>

        {/* Quick actions */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-[#ff3b30] text-primary-foreground font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(242,31,26,0.4)]"
          >
            <span>Partner with Salvi Group</span>
            <span>→</span>
          </Link>
          <a
            href="#ecosystem"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xl"
          >
            Explore 6 Operating Firms
          </a>
        </div>
      </section>

      {/* ─── 2. LIVE IMPACT METRICS STRIP (Anime.js) ─── */}
      <section ref={metricsRef} className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { id: "stat-exp", label: "Years Industrial Leadership", sub: "Founded 1999 in PCMC", defaultText: "25+" },
            { id: "stat-firms", label: "Operating Companies", sub: "Synergistic Group Units", defaultText: "6 Firms" },
            { id: "stat-clients", label: "Industrial Leaders Powered", sub: "Tata, Godrej, Brakes India+", defaultText: "13+" },
            { id: "stat-compliance", label: "Statutory Audit Compliance", sub: "100% PF, ESIC, GST, MSME", defaultText: "100%" },
          ].map((metric, i) => (
            <div
              key={i}
              className="stat-card p-6 sm:p-7 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl opacity-0 flex flex-col justify-between"
            >
              <div
                id={metric.id}
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white mb-2 tracking-tight drop-shadow-sm"
              >
                {metric.defaultText}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider mb-1">
                  {metric.label}
                </p>
                <p className="text-[11px] text-white/50 font-mono">{metric.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. STRATEGIC CLIENT & PARTNER NETWORK ("THE BIG CONNECTIONS") ─── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest text-primary uppercase font-semibold mb-4">
            Tier-1 Industrial Network
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
            Trusted by India's Automotive & Engineering Giants
          </h2>
          <p className="text-white/65 max-w-2xl mx-auto text-sm sm:text-base">
            From the bustling assembly lines of Tata Motors to Godrej's material handling facilities, Salvi Group powers the critical shopfloor operations of market leaders.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BIG_CONNECTIONS.map((c, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between shadow-xl"
            >
              {/* Top ambient highlight */}
              <div
                className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: c.accent }}
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/80 uppercase">
                    {c.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/50">{c.location}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {c.name}
                </h3>

                <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-4">
                  {c.role}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Verified Vendor Enlistment
                </span>
                <span className="text-xs text-white/40 group-hover:text-white transition-colors">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. THE 6 OPERATING ENTITIES (GROUP ECOSYSTEM MAP) ─── */}
      <section id="ecosystem" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest text-primary uppercase font-semibold mb-4">
            Synergistic Business Units
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
            The Salvi Group Multi-Company Architecture
          </h2>
          <p className="text-white/65 max-w-2xl mx-auto text-sm sm:text-base">
            Each operating company addresses a specialized industrial domain while leveraging group synergies, shared management, and decades of statutory mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {firms.map((f, i) => (
            <div
              key={f.id}
              className="p-7 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/12 hover:border-white/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
            >
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: FIRM_ACCENTS[i] }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-white/80 uppercase">
                    0{i + 1} / 06
                  </span>
                  <div
                    className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]"
                    style={{ backgroundColor: FIRM_ACCENTS[i], color: FIRM_ACCENTS[i] }}
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                  {f.name}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 mb-5 leading-relaxed font-medium">
                  {f.description}
                </p>

                {f.services && f.services.length > 0 && (
                  <div className="space-y-1.5 mb-6">
                    {f.services.slice(0, 3).map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/60">
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: FIRM_ACCENTS[i] }} />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={`/${f.slug}`}
                className="pt-4 border-t border-white/[0.08] inline-flex items-center justify-between text-xs font-semibold uppercase tracking-wider transition-colors duration-300 group-hover:text-white"
                style={{ color: FIRM_ACCENTS[i] }}
              >
                <span>View Company Profile</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. 25-YEAR HERITAGE & INDUSTRIAL TIMELINE ─── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest text-primary uppercase font-semibold mb-4">
            Decades of Reliability
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
            25 Years of Industrial Leadership
          </h2>
          <p className="text-white/65 max-w-xl mx-auto text-sm sm:text-base">
            From our grassroots beginning in Pimpri-Chinchwad in 1999 to our present multi-firm conglomerate footprint.
          </p>
        </div>

        <div className="relative border-l border-white/15 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {TIMELINE_MILESTONES.map((item, i) => (
            <div key={i} className="relative group">
              {/* Timeline diamond node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#020308] border-2 border-primary group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_rgba(242,31,26,0.6)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-primary">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/80">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. STATUTORY GOVERNANCE & COMPLIANCE SHIELD ─── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold mb-4">
              Uncompromising Governance Moat
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Statutory Compliance & Legal Assurance
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto text-sm sm:text-base">
              For corporate procurement and HR directors, statutory compliance is zero-negotiable. Salvi Group maintains an unblemished record across every governmental labor and tax mandate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STATUTORY_SHIELDS.map((shield, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    {shield.code}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {shield.status}
                  </span>
                </div>
                <h4 className="text-base font-heading font-bold text-white mb-1.5">{shield.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{shield.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/60">
            <span>Corporate Head Office: The Jewel of Pimpri, Pimpri, Pune 411018</span>
            <span>CIN / LLP Registered • Form XXIV Licensing Ready</span>
          </div>
        </div>
      </section>

      {/* ─── 7. EXECUTIVE LEADERSHIP & INDUSTRIAL MASTERY ─── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest text-primary uppercase font-semibold mb-4">
            Group Leadership
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
            Guided by Proven Industrial Veterans
          </h2>
          <p className="text-white/65 max-w-2xl mx-auto text-sm sm:text-base">
            Over four combined decades of shopfloor administration, labor law enforcement, and manufacturing human resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/12 transition-all duration-300 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-semibold text-primary mb-4">
                Founder & Proprietor
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                {t("Mr. Pratik Ravindra Salvi")}
              </h3>
              <p className="text-sm font-mono text-white/50 mb-6">Strategic Expansion & Executive Oversight</p>
              <p className="text-sm text-white/75 leading-relaxed mb-6">
                {t("Steering the Salvi Group of Companies with a strategic vision to elevate industrial contracting, compliant workforce deployment, and operational standards throughout the Pune manufacturing corridor and across India.")}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
              <span>Salvi Group Leadership</span>
              <span>Pune, Maharashtra</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/12 transition-all duration-300 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-blue-400 mb-4">
                Industrial Advisory Directorate
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                {t("Personnel & Statutory Veterans")}
              </h3>
              <p className="text-sm font-mono text-white/50 mb-6">25 Years Manpower + 18 Years Personnel Directorate</p>
              <p className="text-sm text-white/75 leading-relaxed mb-6">
                {t("Our core operational team includes an officer with 25 years of specialized experience in industrial manpower logistics, and another with 18 years in factory personnel departments—guaranteeing mastery over the Contract Labour Act, EPF, and ESI acts.")}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
              <span>Full Statutory Mastery</span>
              <span>EPFO & ESIC Enlisted</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. INSTITUTIONAL RFP / CONTACT BANNER ─── */}
      <section className="pt-10 px-6 max-w-5xl mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-primary/20 via-white/[0.05] to-primary/10 backdrop-blur-2xl border border-white/15 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Ready to Upgrade Your Industrial Operations?
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Whether you need 24/7 shopfloor material handling, forklift operator certification, or compliant turnkey manpower supply, our leadership team is ready to assist.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(242,31,26,0.5)]"
              >
                <span>Request Enterprise RFP / Quote</span>
                <span>→</span>
              </Link>
              <Link
                href="/clients"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xl"
              >
                <span>View Client Case Studies</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
