export type FirmIndex = 0 | 1 | 2 | 3 | 4 | 5;

export interface Firm {
  id: FirmIndex;
  name: string;
  slug: string;
  accentVar: string;
  description: string;        // short tagline shown under the firm name
  story?: string;              // 1-4 sentence narrative paragraph
  servicesLabel?: string;      // label above services list
  services?: string[];         // plain names, shown as a list
  audience?: string;           // italic qualifier line
  status: "DRAFT_CLIENT_APPROVAL" | "NEEDS_CLIENT_DETAILS" | "PLACEHOLDER_DRAFT";
}

export const firms: Firm[] = [
  {
    id: 0,
    name: "Sonali Enterprises",
    slug: "sonali-enterprises",
    accentVar: "--color-brand-sonali",
    description: "The main firm of Salvi Group of Companies.",
    story:
      "Sonali Enterprises is the main firm of Salvi Group of Companies. It delivers job-contract, fabrication, and cleaning and housekeeping services, with a focus on reliable, well-managed work.",
    services: [
      "Job Contract Services",
      "Fabrication Services",
      "Cleaning & Housekeeping",
    ],
    audience: "For businesses that need dependable work teams and on-site services.",
    status: "DRAFT_CLIENT_APPROVAL",
  },
  {
    id: 1,
    name: "Primeworkforce Solutions LLP",
    slug: "primeworkforce",
    accentVar: "--color-brand-prime",
    description: "Expert manpower supply and human resources management.",
    story:
      "Primeworkforce Solutions LLP is the manpower and human-resources arm of the group. It supplies manpower along with contract labour, vehicle movement and vehicle rental, so companies can focus on their core work while the workforce side is handled.",
    services: [
      "Contract Labour",
      "Vehicle Movement",
      "Vehicle Rental",
      "Cleaning & Housekeeping",
      "Job Contract Services",
    ],
    audience: "For companies looking for manpower supply and HR support.",
    status: "DRAFT_CLIENT_APPROVAL",
  },
  {
    id: 2,
    name: "Sonali Godrej Forklift Driver Training Center",
    slug: "forklift-training",
    accentVar: "--color-brand-forklift",
    description: "Forklift driver training and skill development.",
    story:
      "Sonali Godrej Forklift Driver Training Center trains workers to operate forklifts safely and confidently, so that companies receive operators who are ready for the workplace.",
    services: [
      "Forklift Driver Training",
    ],
    audience: "For companies that need trained operators, and for people building a career in forklift driving.",
    status: "DRAFT_CLIENT_APPROVAL",
  },
  {
    id: 3,
    name: "Flins & Flora",
    slug: "flins-and-flora",
    accentVar: "--color-brand-flins",
    description: "Fish farming, sale, export, and import.",
    story:
      "Flins & Flora is the fish farm of the group. It raises fish for sale and handles export and import for buyers who need a dependable supply.",
    services: [
      "Fish Farming",
      "Fish Sale",
      "Export",
      "Import",
    ],
    audience: "For buyers and partners looking for fish supply, locally and across borders.",
    status: "DRAFT_CLIENT_APPROVAL",
  },
  // PLACEHOLDER_DRAFT: replace with client-approved content before launch.
  {
    id: 4,
    name: "Shivtej Enterprises",
    slug: "shivtej-enterprises",
    accentVar: "--color-brand-shivtej",
    description: "A firm of Salvi Group of Companies.",
    story: "Shivtej Enterprises is part of Salvi Group of Companies, built on the group's commitment to dependable service, honest dealings and long-term relationships with its customers.",
    servicesLabel: "Our approach",
    services: ["Reliable, timely service", "Transparent dealings", "Customer-first support", "Backed by the Salvi Group"],
    audience: "For customers who value dependable service and a long-term partner.",
    status: "PLACEHOLDER_DRAFT",
  },
  // PLACEHOLDER_DRAFT: replace with client-approved content before launch.
  {
    id: 5,
    name: "Sonali Tours and Travels",
    slug: "sonali-tours-and-travels",
    accentVar: "--color-brand-tours",
    description: "Travel and tour services.",
    story: "Sonali Tours and Travels is the travel arm of Salvi Group of Companies, helping customers plan comfortable and well-organised journeys.",
    servicesLabel: "What we offer",
    services: ["Tour Packages", "Vehicle Booking", "Ticket Booking", "Group Travel"],
    audience: "For individuals, families and groups planning a trip.",
    status: "PLACEHOLDER_DRAFT",
  }
];
