"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";

type GalleryCategory =
  | "All"
  | "Awards & Recognition"
  | "Plant & Training"
  | "Corporate HQ"
  | "Leadership & Heritage";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: "Awards & Recognition" | "Plant & Training" | "Corporate HQ" | "Leadership & Heritage";
  tag: string;
  location: string;
  entity: string;
  story: string;
  aspectHint?: "landscape" | "portrait";
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "tata-motors-excellence-award",
    src: "/images/officeimage5.jpg",
    title: "Tata Motors Business Partner Certificate of Excellence",
    category: "Awards & Recognition",
    tag: "Flagship Award",
    location: "Tata Motors Pimpri Plant, Pune",
    entity: "Sonali Enterprises & Salvi Group",
    story:
      "Tata Motors senior leadership presenting the prestigious 'Business Partner Certificate of Excellence' and golden trophy to the Salvi Group and Sonali Enterprises supervisory squad. This award honors our 24/7 commitment to zero-downtime material handling, plant logistics, and line support.",
    aspectHint: "landscape",
  },
  {
    id: "tata-motors-training-hall",
    src: "/images/officeimage3.jpeg",
    title: "Shopfloor Kaizen & Safety Induction Hall",
    category: "Plant & Training",
    tag: "Kaizen & 5S",
    location: "Tata Motors Plant Training Center, Pimpri",
    entity: "Industrial Supervisory Team",
    story:
      "A hands-on operational briefing and Kaizen training session inside the Tata Motors facility. Group leadership and plant trainers lead rigorous modules on 5S methodology, eliminating non-value-adding waste (Muda), and shopfloor safety protocols before line deployment.",
    aspectHint: "landscape",
  },
  {
    id: "corporate-reception-jop",
    src: "/images/officeimage1.jpeg",
    title: "Welcoming Hub at The Jewel of Pimpri",
    category: "Corporate HQ",
    tag: "Central Reception",
    location: "The Jewel of Pimpri (JOP), Pimpri, Pune",
    entity: "Salvi Group Headquarters",
    story:
      "The contemporary main entrance and reception lounge at Salvi Group's central headquarters. Designed with modern acoustic fluted paneling and a live vertical biophilic green wall, embodying our foundational motto: 'Bridging Skills and Success'.",
    aspectHint: "portrait",
  },
  {
    id: "proprietor-pratik-salvi",
    src: "/images/officeimage7.jpg",
    title: "Proprietor & Director — Mr. Pratik Ravindra Salvi",
    category: "Leadership & Heritage",
    tag: "Executive Leadership",
    location: "Executive Directorate, Pimpri HQ",
    entity: "Primeworkforce Solutions & Sonali Enterprises",
    story:
      "Proprietor Mr. Pratik Ravindra Salvi reviewing industrial SLA agreements and contractor compliance dossiers in the executive suite. Carrying forward a 25-year family legacy in industrial manpower, heavy logistics, and precision engineering across Maharashtra.",
    aspectHint: "portrait",
  },
  {
    id: "operations-workstations",
    src: "/images/officeimage2.jpeg",
    title: "Digital Operations & Statutory Record Stations",
    category: "Corporate HQ",
    tag: "Operations Wing",
    location: "Corporate Operations Wing, Pune",
    entity: "Group Administrative Command",
    story:
      "The dedicated administrative operations center managing 100% on-time monthly PF filings, ESIC records, vendor compliance audits, and 24/7 client dispatch communications, framed beneath the guiding portrait of industrial visionary Ratan Tata.",
    aspectHint: "portrait",
  },
  {
    id: "executive-director-suite",
    src: "/images/officeimage4.jpg",
    title: "Executive Suite & Heritage of Late Ravindra D. Salvi",
    category: "Leadership & Heritage",
    tag: "Heritage Tribute",
    location: "Corporate Headquarters, Pimpri",
    entity: "Group Directorate",
    story:
      "The executive conference suite overlooking the industrial corridor of Pimpri. Featuring the honored portrait of group founder Late Ravindra Dhondu Salvi, whose founding principles of integrity and dedicated service continue to steer every contract.",
    aspectHint: "portrait",
  },
  {
    id: "sonali-enterprises-branding",
    src: "/images/officeimage6.jpg",
    title: "Sonali Enterprises Identity & Milestone Celebration",
    category: "Corporate HQ",
    tag: "Milestone Event",
    location: "Corporate Lounge, Pimpri HQ",
    entity: "Sonali Enterprises",
    story:
      "Architectural stainless-steel signage and celebratory decor marking an operational milestone for Sonali Enterprises. Represents decades of trusted partnership with Tier-1 automotive and manufacturing leaders across India's industrial heartland.",
    aspectHint: "landscape",
  },
];

const CATEGORIES: GalleryCategory[] = [
  "All",
  "Awards & Recognition",
  "Plant & Training",
  "Corporate HQ",
  "Leadership & Heritage",
];

export default function GalleryShowcase() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Animate grid cards when category changes or on mount
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".gallery-card");
      animate(cards, {
        opacity: [0, 1],
        translateY: [24, 0],
        scale: [0.96, 1],
        delay: stagger(60, { start: 50 }),
        ease: "outBack(1.2)",
        duration: 550,
      });
    }
  }, [activeCategory]);

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      } else if (e.key === "ArrowRight") {
        setSelectedIdx((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
    },
    [selectedIdx, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activeItem = selectedIdx !== null ? filteredItems[selectedIdx] : null;

  return (
    <div className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Inside Salvi Group
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-5">
          Moments, Facilities & Milestones
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every image in our archive carries a story of craftsmanship, verified statutory governance, and Tier-1 automotive partnership built over 25 years.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(242,31,26,0.35)]"
                  : "bg-white/[0.03] text-muted-foreground border-white/10 hover:border-white/20 hover:text-foreground"
              }`}
            >
              {cat}
              {cat === "All" && ` (${GALLERY_ITEMS.length})`}
            </button>
          );
        })}
      </div>

      {/* Structured Responsive Grid with Stories */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
      >
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="gallery-card group glass-card rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            {/* Image Container with uniform aspect ratio */}
            <div
              className="relative aspect-[16/11] w-full overflow-hidden cursor-pointer bg-black/40"
              onClick={() => setSelectedIdx(idx)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"

              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Tag Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-primary/85 text-white backdrop-blur-md shadow-md">
                  {item.tag}
                </span>
              </div>

              {/* Click to Expand Prompt */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <svg
                  className="w-3.5 h-3.5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                <span>Expand View</span>
              </div>
            </div>

            {/* Story & Details Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-muted-foreground/80 mb-2.5">
                  <span className="font-medium text-primary/90 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {item.entity}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Small Story */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {item.story}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedIdx(idx)}
                  className="text-xs font-semibold text-primary hover:text-white flex items-center gap-1.5 transition-colors group/btn"
                >
                  <span>Read Story & Expand</span>
                  <svg
                    className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground/60">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* High-End Interactive Lightbox Modal */}
      {selectedIdx !== null && activeItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedIdx(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] overflow-y-auto glass-panel border border-white/15 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Left/Prev Arrow */}
            <button
              onClick={() =>
                setSelectedIdx(
                  (selectedIdx - 1 + filteredItems.length) % filteredItems.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-primary border border-white/20 flex items-center justify-center text-white transition-all shadow-xl"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right/Next Arrow */}
            <button
              onClick={() =>
                setSelectedIdx((selectedIdx + 1) % filteredItems.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-primary border border-white/20 flex items-center justify-center text-white transition-all shadow-xl"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image display */}
            <div className="relative w-full md:w-3/5 aspect-[4/3] rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl">
              <Image
                src={activeItem.src}
                alt={activeItem.title}
                fill
                className="object-contain"

                priority
              />
            </div>

            {/* Accompanying Story Side Panel */}
            <div className="w-full md:w-2/5 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/20 border border-primary/30 text-primary">
                    {activeItem.tag}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {activeItem.category}
                  </span>
                </div>

                <h2 className="text-2xl font-heading font-bold text-foreground mb-4 leading-tight">
                  {activeItem.title}
                </h2>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-5">
                  <p className="text-sm text-foreground/90 leading-relaxed font-sans">
                    {activeItem.story}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">Location:</span>
                    <span>{activeItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">Operating Firm:</span>
                    <span>{activeItem.entity}</span>
                  </div>
                </div>
              </div>

              {/* Navigation pagination indicator */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Photo {selectedIdx + 1} of {filteredItems.length}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground/60">
                  Use ← → arrows to navigate
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
