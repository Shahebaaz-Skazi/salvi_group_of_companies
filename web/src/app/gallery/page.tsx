import GalleryShowcase from "@/components/gallery/GalleryShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Gallery & Heritage | Salvi Group of Companies",
  description:
    "Explore our photo archive, operational moments, facility walkthroughs, and prestigious awards including the Tata Motors Business Partner Certificate of Excellence.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <GalleryShowcase />
    </div>
  );
}
