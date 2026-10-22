"use client";
import { useEffect, useRef } from "react";
import { FIRM_ACCENTS } from "@/constants/hero";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsLowEnd } from "@/hooks/useIsLowEnd";

export default function SpaceBackdrop({ activeFirm }: { activeFirm: 0 | 1 | 2 | 3 | 4 | 5 | null }) {
  const bandCanvasRef = useRef<HTMLCanvasElement>(null);
  const stars1CanvasRef = useRef<HTMLCanvasElement>(null);
  const stars2CanvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const lowEnd = useIsLowEnd();

  useEffect(() => {
    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      
      const setupCanvas = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return null;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
        return ctx;
      };

      const bandCtx = setupCanvas(bandCanvasRef.current);
      const stars1Ctx = setupCanvas(stars1CanvasRef.current);
      const stars2Ctx = setupCanvas(stars2CanvasRef.current);

      if (bandCtx) {
        bandCtx.clearRect(0, 0, w, h);
        bandCtx.fillStyle = '#020308';
        bandCtx.fillRect(0, 0, w, h);

        bandCtx.save();
        bandCtx.translate(w/2, h/2);
        bandCtx.rotate(-25 * Math.PI / 180);
        bandCtx.translate(-w/2, -h/2);

        // Milky way band
        for (let i = 0; i < 5; i++) {
          const gx = w * (0.2 + i * 0.15);
          const gy = h/2 + (Math.random() - 0.5) * h * 0.2;
          const r = Math.max(w, h) * 0.4;
          const grad = bandCtx.createRadialGradient(gx, gy, 0, gx, gy, r);
          grad.addColorStop(0, 'rgba(11, 18, 48, 0.5)');
          grad.addColorStop(0.4, 'rgba(26, 31, 74, 0.25)');
          grad.addColorStop(1, 'rgba(11, 18, 48, 0)');
          bandCtx.fillStyle = grad;
          bandCtx.fillRect(gx - r, gy - r, r*2, r*2);
        }
        
        // Warm dust
        for (let i = 0; i < 3; i++) {
          const gx = w * (0.3 + i * 0.2);
          const gy = h/2 + (Math.random() - 0.5) * h * 0.1;
          const r = Math.max(w, h) * 0.3;
          const grad = bandCtx.createRadialGradient(gx, gy, 0, gx, gy, r);
          grad.addColorStop(0, 'rgba(42, 29, 26, 0.12)');
          grad.addColorStop(1, 'rgba(42, 29, 26, 0)');
          bandCtx.fillStyle = grad;
          bandCtx.fillRect(gx - r, gy - r, r*2, r*2);
        }

        // Tiny dense stars in band
        const denseCount = lowEnd ? 900 : 1500;
        for (let i = 0; i < denseCount; i++) {
          const sx = Math.random() * w;
          const sy = h/2 + (Math.random() + Math.random() + Math.random() - 1.5) * h * 0.3;
          bandCtx.fillStyle = 'rgba(255,255,255,' + (Math.random()*0.5 + 0.2) + ')';
          bandCtx.beginPath();
          bandCtx.arc(sx, sy, Math.random()*0.8, 0, Math.PI*2);
          bandCtx.fill();
        }

        // Dark dust lanes
        for (let i = 0; i < 15; i++) {
          bandCtx.beginPath();
          let px = Math.random() * w;
          let py = h/2 + (Math.random() - 0.5) * h * 0.15;
          bandCtx.moveTo(px, py);
          for (let j = 0; j < 5; j++) {
            px += (Math.random() - 0.2) * 100;
            py += (Math.random() - 0.5) * 40;
            bandCtx.lineTo(px, py);
          }
          bandCtx.strokeStyle = 'rgba(2, 3, 8, 0.2)';
          bandCtx.lineWidth = 20 + Math.random() * 40;
          bandCtx.stroke();
        }
        bandCtx.restore();
      }

      const drawStars = (ctx: CanvasRenderingContext2D | null, isLayer2: boolean) => {
        if (!ctx) return;
        ctx.clearRect(0, 0, w, h);
        const count = lowEnd ? 150 : 250;
        const colors = ['#ffffff', '#e0f0ff', '#fff0e0'];
        for (let i = 0; i < count; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const size = 0.4 + Math.random() * 1.0;
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.globalAlpha = 0.35 + Math.random() * 0.65;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI*2);
          ctx.fill();
        }
        if (!isLayer2) {
          for (let i = 0; i < 12; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(x, y, 1.4, 0, Math.PI*2);
            ctx.fill();
            ctx.globalAlpha = 0.4;
            ctx.fillRect(x - 6, y - 0.5, 12, 1);
            ctx.fillRect(x - 0.5, y - 6, 1, 12);
          }
        }
      };

      drawStars(stars1Ctx, false);
      drawStars(stars2Ctx, true);
    };

    draw();
    let timeout: any;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(draw, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timeout);
    };
  }, [lowEnd]);

  const tintColor = activeFirm !== null ? FIRM_ACCENTS[activeFirm] : "transparent";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020308]">
      {/* Parallax layer for band */}
      <div 
        className="absolute inset-0"
        style={{ transform: !reducedMotion ? 'translateY(calc(var(--hero-progress, 0) * -30px))' : 'none' }}
      >
        <canvas ref={bandCanvasRef} className="absolute inset-0 w-full h-full" />
        <div 
          className="absolute inset-0 mix-blend-color transition-colors duration-700" 
          style={{ backgroundColor: tintColor, opacity: 0.06 }} 
        />
      </div>

      {/* Parallax layer for stars */}
      <div 
        className="absolute inset-0"
        style={{ transform: !reducedMotion ? 'translateY(calc(var(--hero-progress, 0) * -60px))' : 'none' }}
      >
        <div className={!reducedMotion ? "w-full h-full animate-[drift_90s_ease-in-out_infinite]" : "w-full h-full"}>
          <canvas ref={stars1CanvasRef} className={!reducedMotion && !lowEnd ? "absolute inset-0 w-full h-full animate-[twinkle_5s_ease-in-out_infinite]" : "absolute inset-0 w-full h-full"} />
        </div>
        <div className={!reducedMotion ? "absolute inset-0 animate-[drift_110s_ease-in-out_infinite_reverse]" : "absolute inset-0"}>
          <canvas ref={stars2CanvasRef} className={!reducedMotion && !lowEnd ? "absolute inset-0 w-full h-full animate-[twinkle_7s_ease-in-out_infinite_2s]" : "absolute inset-0 w-full h-full"} />
        </div>
      </div>
    </div>
  );
}
