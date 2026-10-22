"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { firms } from "@/content/firms";
import { t } from "@/content/site";
import { animate, stagger } from "animejs";

export default function CompaniesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          // Animate header with Anime.js
          animate(".showcase-header", {
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            ease: "outCubic",
          });

          // Stagger cards with Anime.js spring ease
          animate(".company-showcase-card", {
            translateY: [40, 0],
            opacity: [0, 1],
            delay: stagger(100, { start: 200 }),
            duration: 800,
            ease: "outCubic",
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="showcase-header text-center mb-16 opacity-0">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
          {t("Our Companies")}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base">
          {t("Explore the specialized entities under Salvi Group of Companies delivering excellence across diverse industrial sectors.")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {firms.map((firm) => (
          <div key={firm.id} className="company-showcase-card opacity-0">
            <Link
              href={`/${firm.slug}`}
              className="group relative block p-8 rounded-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5 h-full flex flex-col justify-between"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              }}
            >
              {/* Subtle top edge light reflection */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Ambient glow matching firm accent on hover */}
              <div
                className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: `var(${firm.accentVar})` }}
              />

              <div>
                {/* Glowing accent indicator pill */}
                <div
                  className="w-12 h-1.5 mb-6 rounded-full transition-all duration-300 group-hover:w-20"
                  style={{
                    backgroundColor: `var(${firm.accentVar})`,
                    boxShadow: `0 0 14px var(${firm.accentVar})`,
                  }}
                />

                <h3 className="text-2xl font-heading font-bold mb-3 text-white transition-colors">
                  {t(firm.name)}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                  {t(firm.description)}
                </p>
              </div>

              {/* Explore link indicator */}
              <div
                className="mt-8 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1"
                style={{ color: `var(${firm.accentVar})` }}
              >
                <span>{t("Explore Firm")}</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
