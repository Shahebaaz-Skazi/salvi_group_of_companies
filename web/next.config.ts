import type { NextConfig } from "next";

// Use Webpack because native SWC bindings are unavailable on this Windows build.
const nextConfig: NextConfig = {
  webpack: (config) => config,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          /**
           * Content-Security-Policy
           *
           * WebGL (Three.js): needs worker-src blob: and script-src blob:
           * Maps embed: frame-src https://maps.google.com https://www.google.com
           * Resend/analytics: connect-src extended if needed
           *
           * TODO_CONFIRM: Tighten img-src and connect-src once CDN / analytics
           * domains are confirmed. Also add nonce support for inline GSAP if required.
           */
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + inline eval needed by Three.js / GSAP workers
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob:",
              // Styles: self + inline (Tailwind CSS-in-JS)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts: Google Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + data URIs (Three.js textures) + placeholder sources
              "img-src 'self' data: blob:",
              // Workers: Three.js and R3F use blob: workers
              "worker-src 'self' blob:",
              // WebGL needs this for Draco / OffscreenCanvas
              "child-src 'self' blob:",
              // Frames: Google Maps embed
              "frame-src https://maps.google.com https://www.google.com https://www.openstreetmap.org",
              // Network: Resend (email API called server-side, not client), WA redirect
              "connect-src 'self' https://wa.me",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            // Disable features the site doesn't use; keep geolocation off
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "payment=()",
              "usb=()",
              "accelerometer=()",
              "gyroscope=()",
            ].join(", "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
