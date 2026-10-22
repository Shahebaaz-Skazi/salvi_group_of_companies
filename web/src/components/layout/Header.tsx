"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { firms } from "@/content/firms";
import { t } from "@/content/site";
import { Menu, X, Languages } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMr, setIsMr] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMr(document.documentElement.classList.contains("lang-mr"));
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    const next = !isMr;
    setIsMr(next);
    if (next) document.documentElement.classList.add("lang-mr");
    else document.documentElement.classList.remove("lang-mr");
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#020308]/75 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="font-heading font-extrabold text-xl tracking-tight text-white z-50 hover:opacity-90 transition-opacity">
          Salvi Group
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <div className="relative group">
            <button className="text-sm font-medium text-white/80 hover:text-white py-8 transition-colors flex items-center gap-1.5">
              <span>{t("Our Companies")}</span>
              <span className="text-xs opacity-60 group-hover:rotate-180 transition-transform duration-300">▾</span>
            </button>
            {/* Mega Menu with Glassmorphism */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-[800px] bg-[#070913]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-5">
              <div className="grid grid-cols-3 gap-3">
                {firms.map((firm) => (
                  <Link 
                    key={firm.id} 
                    href={`/${firm.slug}`}
                    className="p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/20 transition-all group/link"
                  >
                    <div 
                      className="w-2.5 h-2.5 rounded-full mb-2.5" 
                      style={{ 
                        backgroundColor: `var(${firm.accentVar})`,
                        boxShadow: `0 0 10px var(${firm.accentVar})` 
                      }}
                    />
                    <h3 className="font-heading font-semibold text-foreground text-sm">{t(firm.name)}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{t(firm.description)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">{t("About")}</Link>
          <Link href="/clients" className="text-sm font-medium text-white/80 hover:text-white transition-colors">{t("Clients")}</Link>
          <Link href="/gallery" className="text-sm font-medium text-white/80 hover:text-white transition-colors">{t("Gallery")}</Link>
          <Link href="/careers" className="text-sm font-medium text-white/80 hover:text-white transition-colors">{t("Careers")}</Link>
          <Link href="/contact" className="text-sm font-medium text-white/80 hover:text-white transition-colors">{t("Contact")}</Link>
          
          <button 
            onClick={toggleLang} 
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white flex items-center gap-1.5 text-xs font-medium ml-2 transition-all backdrop-blur-sm" 
            aria-label="Toggle language"
          >
            <Languages size={15} />
            {isMr ? "EN" : "मराठी"}
          </button>

          <Link
            href="/contact"
            className="bg-gradient-to-r from-primary to-[#ff3b30] text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(242,31,26,0.4)] hover:shadow-[0_0_28px_rgba(242,31,26,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            {t("Get a Quote")}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button onClick={toggleLang} className="text-foreground" aria-label="Toggle language">
            <Languages size={20} />
          </button>
          <button className="text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-6 p-4">
          <Link href="/" className="text-2xl font-heading font-bold" onClick={() => setIsOpen(false)}>{t("Home")}</Link>
          <div className="text-center">
            <span className="text-sm text-muted-foreground uppercase tracking-widest mb-4 block">{t("Our Companies")}</span>
            {firms.map((firm) => (
              <Link 
                key={firm.id} 
                href={`/${firm.slug}`}
                className="block text-xl font-heading mb-4"
                style={{ color: `var(${firm.accentVar})` }}
                onClick={() => setIsOpen(false)}
              >
                {t(firm.name)}
              </Link>
            ))}
          </div>
          <Link href="/about" className="text-xl font-heading" onClick={() => setIsOpen(false)}>{t("About")}</Link>
          <Link href="/contact" className="text-xl font-heading" onClick={() => setIsOpen(false)}>{t("Contact")}</Link>
        </div>
      )}
    </header>
  );
}
