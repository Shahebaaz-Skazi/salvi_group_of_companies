import { Metadata } from "next";
import FirmDetailTemplate from "@/components/firms/FirmDetailTemplate";
import { DETAILED_FIRMS } from "@/components/firms/firmDetailsData";

export const metadata: Metadata = {
  title: "Flins & Flora | Aquaculture, Seafood Wholesale & Marine Export",
  description:
    "Commercial aquaculture, freshwater fisheries, temperature-controlled cold-chain logistics, and global seafood trading by Salvi Group of Companies.",
};

export default function FlinsAndFloraPage() {
  const firm = DETAILED_FIRMS["flins-and-flora"];
  return <FirmDetailTemplate firm={firm} />;
}
