import { Metadata } from "next";
import FirmDetailTemplate from "@/components/firms/FirmDetailTemplate";
import { DETAILED_FIRMS } from "@/components/firms/firmDetailsData";

export const metadata: Metadata = {
  title: "Sonali Godrej Forklift Training Center | Operator Certification",
  description:
    "Authorized skill academy affiliated with Godrej & Boyce Mfg. Co. Ltd. providing certified hands-on forklift driver training and Tier-1 plant job placement.",
};

export default function ForkliftTrainingPage() {
  const firm = DETAILED_FIRMS["forklift-training"];
  return <FirmDetailTemplate firm={firm} />;
}
