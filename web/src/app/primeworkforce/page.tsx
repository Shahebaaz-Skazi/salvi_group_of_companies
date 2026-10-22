import { Metadata } from "next";
import FirmDetailTemplate from "@/components/firms/FirmDetailTemplate";
import { DETAILED_FIRMS } from "@/components/firms/firmDetailsData";

export const metadata: Metadata = {
  title: "Primeworkforce Solutions LLP | Industrial Workforce & HR Management",
  description:
    "Supplying skilled, semi-skilled, and technical manpower, plant vehicle logistics, and 100% statutory ESI/PF compliant staffing across Maharashtra's premier industrial belts.",
};

export default function PrimeWorkforcePage() {
  const firm = DETAILED_FIRMS["primeworkforce"];
  return <FirmDetailTemplate firm={firm} />;
}
