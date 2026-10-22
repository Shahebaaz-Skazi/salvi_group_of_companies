import { Metadata } from "next";
import FirmDetailTemplate from "@/components/firms/FirmDetailTemplate";
import { DETAILED_FIRMS } from "@/components/firms/firmDetailsData";

export const metadata: Metadata = {
  title: "Sonali Enterprises | Industrial Job Contracting & Fabrication",
  description:
    "The flagship firm of Salvi Group of Companies, providing Tier-1 assembly job contracts, heavy structural fabrication, and forklift fleet operations for Tata Motors and leading automotive OEMs.",
};

export default function SonaliEnterprisesPage() {
  const firm = DETAILED_FIRMS["sonali-enterprises"];
  return <FirmDetailTemplate firm={firm} />;
}
