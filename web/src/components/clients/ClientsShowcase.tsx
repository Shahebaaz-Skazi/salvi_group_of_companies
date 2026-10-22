"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, stagger } from "animejs";

type SectorType = "All" | "Automotive OEM" | "Axle & Drivetrain" | "Heavy Engineering" | "Stamping & Components" | "Industrial Automation";

interface ClientItem {
  id: string;
  name: string;
  location: string;
  sector: "Automotive OEM" | "Axle & Drivetrain" | "Heavy Engineering" | "Stamping & Components" | "Industrial Automation";
  scope: string[];
  highlight?: boolean;
  contractType: "Long-Standing Tier-1" | "Plant Operations" | "Specialized Contracting";
  initials: string;
  color: string;
}

const CLIENTS_DATA: ClientItem[] = [
  {
    id: "tata-motors-pimpri",
    name: "Tata Motors Ltd.",
    location: "Pimpri Plant, Pune",
    sector: "Automotive OEM",
    scope: ["Plant Material Handling", "Tractor Part Movement K to J", "Assembly Line Staffing"],
    highlight: true,
    contractType: "Long-Standing Tier-1",
    initials: "TML",
    color: "#F21F1A",
  },
  {
    id: "tata-motors-passenger",
    name: "Tata Motors Passenger Vehicle Ltd. (TMPVL)",
    location: "Pimpri (K Block, TCF2, OMEGA PDI)",
    sector: "Automotive OEM",
    scope: ["Altroz & Nova Jig Transfers", "OK Cars Final Dispatch", "16T Press Shop Forklift"],
    highlight: true,
    contractType: "Long-Standing Tier-1",
    initials: "TMPVL",
    color: "#F21F1A",
  },
  {
    id: "godrej-boyce",
    name: "Godrej & Boyce Mfg. Co. Ltd.",
    location: "Pune Branch",
    sector: "Heavy Engineering",
    scope: ["Certified Forklift Driver Academy", "Material Handling Equipment", "Operator Skill Testing"],
    highlight: true,
    contractType: "Long-Standing Tier-1",
    initials: "G&B",
    color: "#FF9E0D",
  },
  {
    id: "brakes-india",
    name: "Brakes India Ltd.",
    location: "Waki Plant, Pune",
    sector: "Automotive OEM",
    scope: ["Braking System Assembly Staffing", "Shopfloor Logistics", "Housekeeping & Machine Cleaning"],
    highlight: true,
    contractType: "Plant Operations",
    initials: "BIL",
    color: "#1A73FF",
  },
  {
    id: "axles-india",
    name: "Axles India Ltd.",
    location: "Chennai Hub",
    sector: "Axle & Drivetrain",
    scope: ["Axle Housing Component Handling", "Contract Workforce", "Vehicle Movement Services"],
    contractType: "Specialized Contracting",
    initials: "AIL",
    color: "#00D9B8",
  },
  {
    id: "alcraft",
    name: "Alcraft Thermotechnologies Pvt. Ltd.",
    location: "Chennai Facility",
    sector: "Heavy Engineering",
    scope: ["Thermal Equipment Job Work", "Assembly Contract", "Plant Maintenance Support"],
    contractType: "Specialized Contracting",
    initials: "ATT",
    color: "#9B5CFF",
  },
  {
    id: "mahabal",
    name: "Mahabal Autoancillaries Ltd.",
    location: "Sangli Plant",
    sector: "Stamping & Components",
    scope: ["Machining Shopfloor Workforce", "Production Component Movement", "Facility Upkeep"],
    contractType: "Plant Operations",
    initials: "MAL",
    color: "#FF4D99",
  },
  {
    id: "windals-auto",
    name: "Windals Auto Pvt. Ltd.",
    location: "Talawade Industrial Area",
    sector: "Stamping & Components",
    scope: ["Automotive Stamping Line Labour", "Press Shop Material Transfer", "Finished Part Loading"],
    contractType: "Plant Operations",
    initials: "WAPL",
    color: "#FF9E0D",
  },
  {
    id: "madras-engg",
    name: "Madras Engineering Industries Pvt. Ltd.",
    location: "Kanchipuram Facility",
    sector: "Heavy Engineering",
    scope: ["Slack Adjuster & Brake Components", "Industrial Labour Supply", "Warehouse Logistics"],
    contractType: "Specialized Contracting",
    initials: "MEI",
    color: "#1A73FF",
  },
  {
    id: "prowiz",
    name: "Prowiz Mansystems Pvt. Ltd.",
    location: "Noida Industrial Belt",
    sector: "Industrial Automation",
    scope: ["Technical Workforce Provisioning", "Robotics & Conveyor Cleaning", "Engineering Job Assembly"],
    contractType: "Specialized Contracting",
    initials: "PMS",
    color: "#00D9B8",
  },
  {
    id: "meritor",
    name: "Meritor HVS India Ltd.",
    location: "Mysore Facility",
    sector: "Axle & Drivetrain",
    scope: ["Heavy Vehicle Drivetrain Assembly", "Shopfloor Component Logistics", "24/7 Shift Operations"],
    highlight: true,
    contractType: "Long-Standing Tier-1",
    initials: "MHVS",
    color: "#9B5CFF",
  },
  {
    id: "windals-precision",
    name: "Windals Precision Pvt. Ltd. (Banjo Unit)",
    location: "Bhosari MIDC, Pune",
    sector: "Stamping & Components",
    scope: ["Banjo Beam & Axle Casing Support", "Precision Fabrication Work", "Plant Housekeeping"],
    contractType: "Plant Operations",
    initials: "WPPL",
    color: "#FF4D99",
  },
  {
    id: "automotive-axles",
    name: "Automotive Axles Limited",
    location: "Chota Govindpur",
    sector: "Axle & Drivetrain",
    scope: ["CV Axle Manufacturing Workforce", "Chassis Component Transfer", "Loading & Unloading Support"],
    highlight: true,
    contractType: "Long-Standing Tier-1",
    initials: "AAL",
    color: "#1A73FF",
  },
];

const SECTORS: SectorType[] = [
  "All",
  "Automotive OEM",
  "Axle & Drivetrain",
  "Heavy Engineering",
  "Stamping & Components",
  "Industrial Automation",
];

const TATA_OPERATIONS = [
  {
    title: "Tractor & Driver Part Movement (K to J Block)",
    desc: "Seamless inter-block movement of heavy assembly components and chassis parts across manufacturing bays.",
    tag: "Internal Logistics",
  },
  {
    title: "Boltable Cup & Jig Transfer (Altroz Line)",
    desc: "Precision tooling and robotic fixture transfer ensuring uninterrupted assembly timing for the Tata Altroz platform.",
    tag: "Precision Tooling",
  },
  {
    title: "Boltable Cup & Jig Transfer (Nova Line)",
    desc: "Critical body-in-white (BIW) jig logistics and tooling maintenance for Tata passenger vehicle architecture.",
    tag: "Body-in-White",
  },
  {
    title: "OK Cars Final Dispatch (TCF2 to PDI)",
    desc: "Strict quality-gated vehicle movement from Trim, Chassis & Final (TCF2) lines to Pre-Delivery Inspection tracks.",
    tag: "Finished Vehicle",
  },
  {
    title: "Dispatch of OK Tagged Cars (TCF to PDI)",
    desc: "Zero-defect movement handling and staging for line-off vehicles ready for regional distribution.",
    tag: "Quality Staging",
  },
  {
    title: "Vehicle Movement at OMEGA PDI",
    desc: "Driver support and precision parking logistics across OMEGA platform testing and pre-dispatch zones.",
    tag: "PDI Operations",
  },
  {
    title: "16-Ton Forklift Press Shop Operations",
    desc: "Heavy die changing, coil handling, and press shop stamping tool transfers utilizing specialized 16T forklifts.",
    tag: "Heavy Press Shop",
  },
  {
    title: "SBND Vehicle Movement Contract",
    desc: "Turnkey fleet movement contract ensuring scheduled material routing throughout the Pimpri plant.",
    tag: "Turnkey Fleet",
  },
];

export default function ClientsShowcase() {
  const [selectedSector, setSelectedSector] = useState<SectorType>("All");
  const filteredClients = selectedSector === "All"
    ? CLIENTS_DATA
    : CLIENTS_DATA.filter((c) => c.sector === selectedSector);

  const statsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    // Animate stats counter using Anime.js
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;

          const counters = [
            { id: "#stat-client-count", target: 13, suffix: "+" },
            { id: "#stat-client-years", target: 25, suffix: " Years" },
            { id: "#stat-client-shift", target: 24, suffix: "/7" },
            { id: "#stat-client-sla", target: 100, suffix: "%" },
          ];

          counters.forEach(({ id, target, suffix }) => {
            const domEl = document.querySelector(id);
            if (!domEl) return;
            const obj = { val: 0 };
            animate(obj, {
              val: target,
              duration: 1800,
              ease: "outCubic",
              onUpdate: () => {
                domEl.textContent = `${Math.floor(obj.val)}${suffix}`;
              },
            });
          });

          // Stagger reveal stat cards
          animate(".client-stat-card", {
            translateY: [25, 0],
            opacity: [0, 1],
            delay: stagger(90),
            duration: 700,
            ease: "outCubic",
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate client cards on filter change
  useEffect(() => {
    animate(".client-grid-card", {
      translateY: [20, 0],
      opacity: [0, 1],
      scale: [0.98, 1],
      delay: stagger(50),
      duration: 500,
      ease: "outCubic",
    });
  }, [selectedSector]);

  return (
    <div className="w-full relative z-10 pb-24">
      {/* ─── 1. HERO HEADER ─── */}
      <section className="pt-32 pb-14 px-6 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/12 backdrop-blur-xl mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#F21F1A]" />
          <span className="text-[11px] font-mono tracking-widest text-white/90 uppercase font-semibold">
            Enterprise Industrial Client Portfolio • Tier-1 Automotive & Engineering Enlistments
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white mb-6 tracking-tight drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)] max-w-5xl mx-auto leading-[1.1]">
          Trusted by Market Leaders Across India.
        </h1>

        <p className="text-base sm:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed mb-10">
          From high-volume automotive assembly plants to heavy engineering hubs, Salvi Group provides precision material handling, compliant contract workforce, and shopfloor operational logistics.
        </p>

        {/* Action quick links */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#case-study"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-[#ff3b30] text-primary-foreground font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(242,31,26,0.4)]"
          >
            <span>Inspect Tata Motors Case Study</span>
            <span>↓</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xl"
          >
            Enterprise RFP Inquiry
          </Link>
        </div>
      </section>

      {/* ─── 2. CLIENT IMPACT METRICS STRIP ─── */}
      <section ref={statsRef} className="py-8 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { id: "stat-client-count", label: "Enterprise Clients", sub: "Tata Motors, Godrej, Meritor+", defaultVal: "13+" },
            { id: "stat-client-years", label: "Operational Track Record", sub: "Since 1999 Inception", defaultVal: "25 Years" },
            { id: "stat-client-shift", label: "Shopfloor Availability", sub: "Continuous Shift Support", defaultVal: "24/7" },
            { id: "stat-client-sla", label: "On-Time Dispatch SLA", sub: "Zero-Disruption Logistics", defaultVal: "100%" },
          ].map((item, i) => (
            <div
              key={i}
              className="client-stat-card p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 transition-all duration-300 shadow-xl opacity-0 flex flex-col justify-between"
            >
              <div
                id={item.id.replace("#", "")}
                className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-2 tracking-tight"
              >
                {item.defaultVal}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider mb-0.5">
                  {item.label}
                </p>
                <p className="text-[11px] text-white/50 font-mono">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. FEATURED IN-DEPTH CASE STUDY: TATA MOTORS TMPVL ─── */}
      <section id="case-study" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {/* Ambient subtle aura */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-primary uppercase font-bold block mb-2">
                FEATURED AUTOMOTIVE OEM CASE STUDY
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
                Tata Motors Passenger Vehicles Ltd. (TMPVL)
              </h2>
              <p className="text-sm text-white/60 font-mono mt-1">
                K Block, TCF2, OMEGA PDI & Press Shop • Pimpri Plant, Pune
              </p>
            </div>

            {/* Industrial insignia badge */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/12 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center font-heading font-black text-white text-sm shadow-[0_0_15px_rgba(242,31,26,0.4)]">
                TML
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  Active Tier-1 Vendor
                </span>
                <span className="text-xs font-semibold text-white">Plant Floor Contract</span>
              </div>
            </div>
          </div>

          {/* Scope Narrative */}
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-4xl mb-10">
            Salvi Group delivers mission-critical shopfloor material handling, precision vehicle movement, and heavy equipment logistics across the K Block, TCF2, and OMEGA PDI bays of Tata Motors Pimpri. Our teams operate around the clock to ensure zero-disruption flow for high-volume platforms like the Tata Altroz and Tata Nova.
          </p>

          {/* 8 Operational Pillars Grid */}
          <div className="mb-10">
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/50 mb-5 flex items-center gap-2">
              <span>Operational Activities & Technical Mandates</span>
              <span className="h-px flex-grow bg-white/10" />
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TATA_OPERATIONS.map((op, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-primary font-bold">
                        0{i + 1}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/70">
                        {op.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-heading font-bold text-white mb-2 leading-snug group-hover:text-primary transition-colors">
                      {op.title}
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed">{op.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study Bottom Highlights Strip */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xl sm:text-2xl font-bold font-heading text-white block">24/7</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Multi-Shift Uptime</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xl sm:text-2xl font-bold font-heading text-primary block">16 Ton</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Forklift Capability</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xl sm:text-2xl font-bold font-heading text-white block">2 Platforms</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Altroz & Nova Lines</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xl sm:text-2xl font-bold font-heading text-emerald-400 block">100%</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Zero-Harm Safety</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. COMPLETE CLIENT ROSTER WITH SECTOR FILTER TABS ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest text-primary uppercase font-semibold mb-4">
            Industrial Client Roster
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
            Tier-1 Enlistments & Client Network
          </h2>
          <p className="text-white/65 max-w-2xl mx-auto text-sm sm:text-base">
            Filter our operational client network across automotive OEMs, heavy engineering, precision stamping, and drivetrain manufacturing hubs.
          </p>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {SECTORS.map((sector) => {
            const active = selectedSector === sector;
            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  active
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(242,31,26,0.5)] scale-105"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10"
                }`}
              >
                {sector} {sector === "All" && `(${CLIENTS_DATA.length})`}
              </button>
            );
          })}
        </div>

        {/* Client Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="client-grid-card p-6 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between shadow-xl group"
            >
              {/* Subtle top ambient glow */}
              <div
                className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: client.color }}
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  {/* Monogram emblem */}
                  <div
                    className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/12 flex items-center justify-center font-heading font-extrabold text-white text-xs group-hover:scale-105 transition-transform"
                    style={{ borderColor: `${client.color}40`, color: client.color }}
                  >
                    {client.initials}
                  </div>

                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white/80">
                    {client.contractType}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  {client.name}
                </h3>
                <p className="text-xs font-mono text-white/50 mb-4">{client.location}</p>

                {/* Scope chips */}
                <div className="space-y-1.5 mb-6">
                  {client.scope.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-white/65">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: client.color }} />
                      <span className="leading-tight">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>{client.sector}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. ENTERPRISE VENDOR ONBOARDING PROCESS ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/12 shadow-2xl">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono tracking-widest text-primary uppercase font-bold block mb-2">
              STANDARDIZED OPERATIONAL EXCELLENCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-3">
              How We Onboard & Power Industrial Plants
            </h2>
            <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto">
              A 4-step compliance-gated deployment process engineered for zero downtime and total legal safety.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                title: "Plant Audit & SLA Mapping",
                desc: "Thorough shopfloor assessment of shift timings, machinery lines, safety requirements, and operator skill levels.",
              },
              {
                step: "02",
                title: "Statutory Verification",
                desc: "100% automated documentation under Contract Labour Act, EPF UAN linking, ESIC smart cards, and police verification.",
              },
              {
                step: "03",
                title: "Safety & 5S Inductions",
                desc: "Mandatory plant-floor safety training, PPE gear provisioning, and certified simulator evaluations before line deployment.",
              },
              {
                step: "04",
                title: "Supervised 24/7 Operations",
                desc: "Dedicated shift supervisors, computerized attendance tracking, and instant backup operator availability.",
              },
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/20 transition-all">
                <span className="text-2xl font-mono font-bold text-primary block mb-3">{st.step}</span>
                <h4 className="text-base font-heading font-bold text-white mb-2">{st.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. CALL TO ACTION ─── */}
      <section className="pt-8 px-6 max-w-5xl mx-auto text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-primary/20 via-white/[0.05] to-primary/10 backdrop-blur-2xl border border-white/15 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            Partner with Pune's Leading Industrial Group
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join Tata Motors, Godrej, Brakes India, and leading automotive manufacturers who rely on Salvi Group for compliant, uninterrupted plant floor operations.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(242,31,26,0.5)]"
            >
              <span>Request Enterprise Proposal / Quote</span>
              <span>→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xl"
            >
              <span>Explore Group Heritage & Leadership</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
