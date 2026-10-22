import ClientsShowcase from "@/components/clients/ClientsShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients & Industrial Partners | Salvi Group of Companies",
  description:
    "Explore the Tier-1 automotive and manufacturing clients trusted by Salvi Group of Companies, including Tata Motors, Godrej, Brakes India, Automotive Axles, and Meritor.",
};

export default function ClientsPage() {
  return (
    <div className="min-h-screen">
      <ClientsShowcase />
    </div>
  );
}
