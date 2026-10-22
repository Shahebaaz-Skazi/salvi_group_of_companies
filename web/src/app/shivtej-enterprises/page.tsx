import { Metadata } from "next";
import FirmDetailTemplate from "@/components/firms/FirmDetailTemplate";
import { DETAILED_FIRMS } from "@/components/firms/firmDetailsData";

export const metadata: Metadata = {
  title: "Shivtej Enterprises | Industrial Operations & Engineering Support",
  description:
    "Providing preventive plant maintenance, factory consumables procurement, and reliable on-site technical services backed by the Salvi Group.",
};

export default function ShivtejEnterprisesPage() {
  const firm = DETAILED_FIRMS["shivtej-enterprises"];
  return <FirmDetailTemplate firm={firm} />;
}
