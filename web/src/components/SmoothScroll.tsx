"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false, // native touch momentum for buttery smooth 120Hz feel on mobile/touch
      touchMultiplier: 1.0,
      wheelMultiplier: 1.0,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Provide lenis instance on window for helper functions (e.g. scrollToFirm)
    if (typeof window !== "undefined") {
      (window as unknown as { lenis?: Lenis }).lenis = lenis;
    }

    // Sync with GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Auto-update dimensions when DOM size changes (accordions, images, dynamic tabs)
    const ro = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    if (document.body) {
      ro.observe(document.body);
    }

    const onWindowResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      gsap.ticker.remove(updateTicker);
      ro.disconnect();
      window.removeEventListener("resize", onWindowResize);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as unknown as { lenis?: Lenis }).lenis;
      }
    };
  }, []);

  // On page / tab transition: immediately reset scroll and recalculate document height limits
  useEffect(() => {
    if (!lenisRef.current) return;

    // Reset to top immediately so previous page's scroll offset doesn't clamp new page
    lenisRef.current.scrollTo(0, { immediate: true });
    lenisRef.current.resize();
    ScrollTrigger.refresh();

    // Re-verify after Next.js finishes client component mounting & image layout
    const t1 = setTimeout(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    }, 100);

    const t2 = setTimeout(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return <>{children}</>;
}
