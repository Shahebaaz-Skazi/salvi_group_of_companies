import AboutShowcase from "@/components/about/AboutShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Salvi Group of Companies",
  description:
    "Learn about Salvi Group of Companies, an industrial conglomerate in Pimpri, Pune with 25+ years of experience powering Tata Motors, Godrej, Brakes India, and leading automotive enterprises.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutShowcase />
    </div>
  );
}
