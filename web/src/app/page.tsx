import HeroScroll from "@/components/hero/HeroScroll";
import CompaniesShowcase from "@/components/home/CompaniesShowcase";
import Link from "next/link";
import { firms } from "@/content/firms";
import { t } from "@/content/site";
import FadeIn from "@/components/ui/FadeIn";

const clients = [
  "TATA MOTORS LTD. PIMPRI",
  "GODREJ & BOYCE MFG. CO. LTD.",
  "BRAKES INDIA LTD., WAKI",
  "AXLES INDIA LTD. CHENNAI",
  "ALCRAFT THERMOTECHNOLOGIES",
  "MAHABAL AUTOANCILLARIES LTD.",
  "WINDALS AUTO PVT LTD.",
  "MADRAS ENGG.IND.PVT. LTD.",
  "PROWIZ MANSYSTEMS PVT.LTD.",
  "MERITOR HVS INDIA LTD",
  "AUTOMOTIVE AXLES LIMITED"
]; // TODO_CONFIRM logos

export default function Home() {
  return (
    <>
      <HeroScroll />
      
      {/* ─── Our Companies Section with Glassmorphism & Anime.js ─── */}
      <CompaniesShowcase />

      {/* ─── Stats Glass Panel ─── */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-10">
        <div 
          className="p-8 md:p-12 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
          }}
        >
          <FadeIn delay={0}>
            <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(242,31,26,0.35)]">25+</div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{t("Years Experience")}</div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(242,31,26,0.35)]">10+</div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{t("Major Clients")}</div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(242,31,26,0.35)]">{firms.length}</div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{t("Specialized Firms")}</div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(242,31,26,0.35)]">100%</div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{t("Compliance")}</div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Why Choose Salvi Group Section ─── */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-4xl font-heading font-bold mb-6 text-white">{t("Why Choose Salvi Group?")}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("With over 25 years of experience in manpower supply and industrial services, we are fully conversant with all statutory laws and regulations. Our dedicated teams ensure productivity-oriented workforce solutions.")}
            </p>
            <ul className="space-y-4">
              {[
                "Strict compliance with Labour Laws (P.F., E.S.I., etc.)",
                "Proven track record with top-tier automotive clients",
                "End-to-end solutions from hiring to training",
                "Focus on safety, quality, and productivity"
              ].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(242,31,26,0.6)]" />
                  <span className="text-white/90">{t(item)}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "1", title: "Consult", desc: "Understanding your exact requirements.", delay: 0.1, y: "" },
              { num: "2", title: "Deploy", desc: "Providing skilled and trained personnel.", delay: 0.2, y: "md:translate-y-6" },
              { num: "3", title: "Manage", desc: "Handling all compliance and payroll.", delay: 0.3, y: "" },
              { num: "4", title: "Deliver", desc: "Ensuring seamless operational success.", delay: 0.4, y: "md:translate-y-6" },
            ].map((step, idx) => (
              <FadeIn 
                key={idx} 
                delay={step.delay} 
                className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${step.y}`}
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 text-primary font-heading font-bold text-sm flex items-center justify-center mb-3">
                  {step.num}
                </div>
                <h3 className="font-heading font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Client Marquee ─── */}
      <section className="py-24 overflow-hidden border-t border-white/10 relative z-10">
        <FadeIn>
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-12">
            {t("Trusted by Industry Leaders")}
          </h2>
        </FadeIn>
        <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
          {[...clients, ...clients].map((client, i) => (
            <div 
              key={i} 
              className="mx-3 px-6 py-3 rounded-xl text-base md:text-lg font-heading text-white/60 hover:text-white transition-all whitespace-nowrap"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              {t(client)}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Call to Action Glass Card ─── */}
      <section className="py-28 px-6 relative z-10">
        <FadeIn>
          <div 
            className="max-w-5xl mx-auto p-12 md:p-16 rounded-3xl text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 12px 48px 0 rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Ambient inner glows */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
                {t("Ready to optimize your workforce?")}
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                {t("Partner with us for reliable, compliant, and efficient industrial services.")}
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 shadow-[0_0_25px_rgba(242,31,26,0.45)] transition-all hover:scale-105"
              >
                {t("Get in Touch")}
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
