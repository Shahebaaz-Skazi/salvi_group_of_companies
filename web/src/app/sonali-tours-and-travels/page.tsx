import { Metadata } from "next";
import FirmDetailTemplate from "@/components/firms/FirmDetailTemplate";
import { DETAILED_FIRMS } from "@/components/firms/firmDetailsData";

export const metadata: Metadata = {
  title: "Sonali Tours and Travels | Corporate Mobility, Fleet & Tour Packages",
  description:
    "Daily corporate employee commute bus shuttles, luxury chauffeur-driven executive cars, ticketing, and curated group holiday tours across Maharashtra.",
};

export default function SonaliToursPage() {
  const firm = DETAILED_FIRMS["sonali-tours-and-travels"];
  return <FirmDetailTemplate firm={firm} />;
}
