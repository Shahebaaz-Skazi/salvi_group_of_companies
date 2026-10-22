import type { Metadata } from "next";
import { Inter, Sora, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { siteContent } from "@/content/site";
import { firms } from "@/content/firms";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const sora = Sora({ variable: "--font-heading", subsets: ["latin"] });
const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-marathi",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Salvi Group of Companies | Bridging Skills and Success",
    template: "%s | Salvi Group of Companies",
  },
  description: "Premium manpower, structural fabrication, forklift training, and aquaculture in Pune. We are a trusted labour contractor and industrial service provider.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Salvi Group of Companies",
    title: "Salvi Group of Companies",
    description: "Premium manpower, structural fabrication, forklift training, and aquaculture in Pune.",
    images: [{ url: "/images/gear_poster.png", width: 1200, height: 630, alt: "Salvi Group of Companies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salvi Group of Companies",
    description: "Premium manpower, structural fabrication, forklift training, and aquaculture in Pune.",
    images: ["/images/gear_poster.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://salvigroup.in/#organization", // TODO_CONFIRM domain
      "name": "Salvi Group of Companies",
      "url": "https://salvigroup.in",
      "logo": "https://salvigroup.in/images/gear_poster.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": siteContent.contact.phone,
        "contactType": "customer service",
        "email": siteContent.contact.email,
        "areaServed": "IN",
        "availableLanguage": ["en", "mr"]
      },
      "subOrganization": firms.map(firm => ({
        "@type": "Organization",
        "name": firm.name,
        "url": `https://salvigroup.in/${firm.slug}`
      }))
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://salvigroup.in/#localbusiness",
      "name": "Salvi Group of Companies",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office No. 8, B Wing, 1st Floor, The Jewel of Pimpri",
        "addressLocality": "Pimpri, Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411018",
        "addressCountry": "IN"
      },
      "telephone": siteContent.contact.phone
    }
  ]
};

import GlobalBackground from "@/components/hero/GlobalBackground";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${sora.variable} ${notoSansDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#020308] text-foreground relative">
        {/* Single persistent global background */}
        <GlobalBackground />

        <div className="relative z-10 flex flex-col flex-grow">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <SmoothScroll>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
