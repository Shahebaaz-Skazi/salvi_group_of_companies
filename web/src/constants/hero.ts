// ─── Hero scroll & timing constants ──────────────────────────────────────────
// All tuning lives here. Frames are at 30 fps; total animation = 990 f = 33 s.

export const ANIM_DURATION_S = 33; // seconds in the baked animation
export const ANIM_FPS       = 30;
export const TOTAL_FRAMES   = 990;

// Scroll stops in frames (frame / TOTAL_FRAMES = progress)
export const STOPS_FRAMES = {
  intro:      1,
  exploded:   150,
  firm1:      210,
  firm2:      330,
  firm3:      450,
  firm4:      570,
  firm5:      690,
  firm6:      810,
  reassembled:990,
} as const;

// Hold windows: each firm holds from its start frame to start + 50
export const HOLD_F = 50;

// Convert frames → progress (0-1) helper
export function frameToProgress(frame: number): number {
  return frame / TOTAL_FRAMES;
}

// Ordered stop progress values used for snap
export const STOP_PROGRESSES: number[] = Object.values(STOPS_FRAMES).map(
  (f) => f / TOTAL_FRAMES
);

// ScrollTrigger scrub amount (seconds lag)
export const SCRUB_AMOUNT = 0.8;

// Mixer time damping (lerp factor per frame; 0.08 = smooth but responsive)
export const MIXER_LERP = 0.08;

// Mouse parallax max rotation degrees
export const PARALLAX_DEG = 3;

// Accent colours per firm index (matches firms.ts)
export const FIRM_ACCENTS: Record<number, string> = {
  0: "#F21F1A", // Sonali
  1: "#1A73FF", // Primeworkforce
  2: "#FF9E0D", // Sonali Godrej Forklift
  3: "#00D9B8", // Flins & Flora
  4: "#9B5CFF", // Shivtej Enterprises
  5: "#FF4D99", // Sonali Tours and Travels
};

export const GLOW_ACCENTS: Record<number, string> = {
  0: "#3a0a0c",
  1: "#0a1d3f",
  2: "#3a2606",
  3: "#05302c",
  4: "#1c0f3a",
  5: "#3a0f22",
};

// Neutral glow colour (between firm stops)
export const NEUTRAL_GLOW = "#07101f";

// Emissive intensity: [idle, active pulseLow, active pulseHigh]
export const EMISSIVE_IDLE   = 0.0;
export const EMISSIVE_LOW    = 1.5;
export const EMISSIVE_HIGH   = 3.0;

// Background base colour
export const BG_COLOR = "#020308";

// Starfield particle count (keep ≤ 400)
export const STAR_COUNT = 150;

// DPR cap
export const DPR_MAX = 1.5;

// Camera & responsive framing
export const CAMERA_BASE_Z = 26;
export const CAMERA_FOV = 30;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 200;
export const GEAR_RADIUS_ASSEMBLED = 5.8;
export const GEAR_RADIUS_EXPLODED = 11.5;

// Idle spin constants
export const IDLE_SPIN_SPEED = 0.05;
export const IDLE_FADE_START = 0.03;
export const IDLE_FADE_END = 0.12;

// Desktop shift
export const SHIFT_X_RATIO = 0.22;
export const GEAR_MODEL_URL = "/salvi_gear_v3.glb";

export function scrollToFirm(index: number) {
  if (typeof window === "undefined") return;
  const frames = [
    STOPS_FRAMES.firm1,
    STOPS_FRAMES.firm2,
    STOPS_FRAMES.firm3,
    STOPS_FRAMES.firm4,
    STOPS_FRAMES.firm5,
    STOPS_FRAMES.firm6,
  ];
  const targetFrame = frames[index] ?? STOPS_FRAMES.firm1;
  const progress = targetFrame / TOTAL_FRAMES;
  const heroWrapper = document.querySelector('section[aria-label="Salvi Group interactive hero"]');
  if (heroWrapper) {
    const total = heroWrapper.clientHeight - window.innerHeight;
    const targetY = progress * total;
    const w = window as unknown as { lenis?: { scrollTo: (y: number, opts?: unknown) => void } };
    if (w.lenis) {
      w.lenis.scrollTo(targetY, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }
}

