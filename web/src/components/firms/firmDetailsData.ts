export interface FirmCapability {
  title: string;
  desc: string;
  deliverables: string[];
  icon: string;
}

export interface FirmMetric {
  value: string;
  label: string;
}

export interface DetailedFirmData {
  id: 0 | 1 | 2 | 3 | 4 | 5;
  slug: string;
  name: string;
  badge: string;
  category: string;
  accent: string;
  accentVar: string;
  tagline: string;
  story: string;
  metrics: FirmMetric[];
  capabilitiesTitle: string;
  capabilities: FirmCapability[];
  trustedBy?: string[];
  workflowTitle?: string;
  workflowSteps?: { step: string; title: string; desc: string }[];
  statutory?: { label: string; value: string }[];
  enquiryType: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
}

export const DETAILED_FIRMS: Record<string, DetailedFirmData> = {
  "sonali-enterprises": {
    id: 0,
    slug: "sonali-enterprises",
    name: "Sonali Enterprises",
    badge: "Flagship Operating Company • Est. 1999",
    category: "Industrial Job Contracting & Structural Fabrication",
    accent: "#F21F1A",
    accentVar: "--color-brand-sonali",
    tagline: "The main operational backbone of Salvi Group of Companies.",
    story:
      "Sonali Enterprises is the founding pillar of Salvi Group of Companies. For over two decades, it has served as a trusted Tier-1 partner to automotive giants such as Tata Motors and Brakes India, delivering mission-critical job contracts, heavy structural fabrication, high-tonnage forklift fleet operations, and comprehensive industrial plant housekeeping.",
    metrics: [
      { value: "25+ Yrs", label: "Industrial Heritage" },
      { value: "Tier-1", label: "Tata Motors Certified Partner" },
      { value: "24/7", label: "Multi-Shift Plant Logistics" },
      { value: "100%", label: "5S & Safety Protocol Compliance" },
    ],
    capabilitiesTitle: "Core Industrial Capabilities",
    capabilities: [
      {
        title: "Industrial Job Contract Services",
        desc: "End-to-end shopfloor contract execution for high-volume automotive assembly lines and stamping blocks.",
        deliverables: [
          "Boltable Cup & Jig transfers for Altroz and Nova body lines",
          "Final dispatch of OK-tagged cars from TCF2 assembly to PDI testing yards",
          "Shopfloor tractor parts and assembly transit between K-Block and J-Block",
          "Supervised 24/7 line operations with trained industrial operators",
        ],
        icon: "factory",
      },
      {
        title: "Heavy Structural Fabrication",
        desc: "Precision industrial fabrication and custom material handling fixtures engineered to rigorous plant tolerances.",
        deliverables: [
          "Material handling trolleys, dollies, and component bins",
          "Heavy-duty industrial storage racks and cantilever fixtures",
          "Machine guarding, safety enclosures, perimeter railings, and walkways",
          "Conveyor framework, chute transitions, and sheet metal fabrications",
        ],
        icon: "wrench",
      },
      {
        title: "Specialized Plant Cleaning & Housekeeping",
        desc: "High-grade industrial sanitization and upkeep of sensitive robotics cells, paint booths, and assembly conveyors.",
        deliverables: [
          "Robotic welding enclosure and automated cell maintenance",
          "Paint booth deep cleaning, exhaust scrubbers, and filter changeovers",
          "Assembly conveyor rail degreasing and oil recovery",
          "Strict 5S shopfloor hygiene and waste segregation management",
        ],
        icon: "sparkles",
      },
      {
        title: "Heavy Equipment & Fleet Leasing",
        desc: "High-capacity material handling machinery provided on flexible operational leases with certified operators.",
        deliverables: [
          "16-Ton heavy forklift hiring for press shop die-handling",
          "Industrial tractors equipped with heavy towing hitches",
          "Platform trucks and electric battery-operated tuggers",
          "Preventive maintenance and immediate breakdown backup support",
        ],
        icon: "truck",
      },
    ],
    trustedBy: [
      "Tata Motors Ltd. Pimpri",
      "Tata Motors Passenger Vehicle Ltd. (TMPVL)",
      "Brakes India Ltd., Waki",
      "Godrej & Boyce Mfg. Co. Ltd.",
      "Windals Precision Pvt. Ltd. Banjo Bhosari",
    ],
    statutory: [
      { label: "Shop & Est. Act Reg.", value: "2631000321470060" },
      { label: "GST Identification", value: "27ABJFP7711M1ZP" },
      { label: "Pan Reference", value: "ABJFP7711M" },
      { label: "Operating Hub", value: "The Jewel of Pimpri, Pune" },
    ],
    enquiryType: "hire-manpower",
    ctaHeading: "Partner with Sonali Enterprises",
    ctaText: "Discuss your assembly job contracts, custom fabrication requirements, or heavy forklift leasing needs with our engineering team.",
    ctaButton: "Request Engineering Proposal",
  },

  primeworkforce: {
    id: 1,
    slug: "primeworkforce",
    name: "Primeworkforce Solutions LLP",
    badge: "Manpower & Talent Logistics Arm • LLP: ACZ-5260",
    category: "Industrial Workforce Staffing & Human Resources",
    accent: "#1A73FF",
    accentVar: "--color-brand-prime",
    tagline: "Expert manpower supply, contract labour, and HR governance.",
    story:
      "Primeworkforce Solutions LLP delivers turnkey contract labour, internal plant transportation, and specialized workforce management across Maharashtra's premier industrial belts. We handle all recruitment, payroll, ESI/PF statutory obligations, and on-site supervision, enabling enterprise manufacturers to scale production without administrative bottlenecks.",
    metrics: [
      { value: "100%", label: "Statutory ESI / PF Compliance" },
      { value: "13+", label: "Enterprise Manufacturing Clients" },
      { value: "25 Yrs", label: "Leadership Industry Experience" },
      { value: "Zero", label: "Statutory Default Track Record" },
    ],
    capabilitiesTitle: "Workforce & Talent Solutions",
    capabilities: [
      {
        title: "Skilled, Semi-Skilled & Unskilled Manpower",
        desc: "Deploying certified blue-collar and technical talent tailored to automotive and heavy manufacturing lines.",
        deliverables: [
          "Certified CNC/VMC operators, lathe turners, and machinists",
          "TIG/MIG welders, tool & die fitters, and structural fabricators",
          "Automotive assembly line workers and sub-assembly technicians",
          "Material loading, warehouse staging, and packing specialists",
        ],
        icon: "users",
      },
      {
        title: "Vehicle Movement & Internal Logistics",
        desc: "Licensed commercial drivers and material handlers deployed directly inside sprawling automotive plant campuses.",
        deliverables: [
          "OK-tagged passenger car transit from assembly lines to PDI yards",
          "OMEGA PDI vehicle yard movement and pre-dispatch parking",
          "SBND vehicle transport contract execution",
          "Tractor parts shuttle operations between plant warehouses",
        ],
        icon: "steering",
      },
      {
        title: "Material Handling Fleet Rental",
        desc: "Providing flexible rental of heavy forklifts, tractors, and industrial vehicles with verified drivers.",
        deliverables: [
          "Heavy forklifts (up to 16-ton capacity) on monthly/annual contracts",
          "Industrial tractors configured for parts towing and shopfloor supply",
          "Certified, background-verified operators with valid commercial licenses",
          "Comprehensive on-site fuel, maintenance, and insurance support",
        ],
        icon: "forklift",
      },
      {
        title: "Turnkey Statutory & Compliance Shield",
        desc: "Shielding principal employers with 100% legal compliance and monthly verified remittances.",
        deliverables: [
          "Provident Fund (PUAKD4083007000) timely monthly e-challan filing",
          "ESIC (33001776320000999) biometric cards & coverage for all personnel",
          "Professional Tax (27883221901P) and state labor welfare fund deposits",
          "Airtight documentation ready for immediate principal employer audits",
        ],
        icon: "shield",
      },
    ],
    workflowTitle: "Structured Deployment Lifecycle",
    workflowSteps: [
      {
        step: "01",
        title: "Requirement Audit & SLA Definition",
        desc: "Detailed evaluation of skill grades, headcount needs, shift schedules, and production output targets.",
      },
      {
        step: "02",
        title: "Sourcing, Screening & Police Verification",
        desc: "Thorough background verification, skill competency testing, and medical fitness checks.",
      },
      {
        step: "03",
        title: "Safety, 5S & Plant Induction",
        desc: "Mandatory induction on plant safety rules, personal protective equipment (PPE), and zero-defect culture.",
      },
      {
        step: "04",
        title: "Supervised Deployment & Compliance Governance",
        desc: "On-site field supervisor deployment with transparent digital biometric attendance and monthly audit reports.",
      },
    ],
    statutory: [
      { label: "LLP Reg. Number", value: "ACZ-5260" },
      { label: "Udyam Registration", value: "UDYAM-MH-26-1212463" },
      { label: "Provident Fund Code", value: "PUAKD4083007000" },
      { label: "ESIC Code", value: "33001776320000999" },
    ],
    enquiryType: "hire-manpower",
    ctaHeading: "Scale Your Workforce with Primeworkforce",
    ctaText: "Deploy verified, skilled industrial manpower backed by 100% statutory ESI/PF compliance and on-site supervision.",
    ctaButton: "Request Manpower Deployment",
  },

  "forklift-training": {
    id: 2,
    slug: "forklift-training",
    name: "Sonali Godrej Forklift Driver Training Center",
    badge: "Skill Development Academy • Godrej & Boyce Affiliated",
    category: "Material Handling & Heavy Equipment Operator Certification",
    accent: "#FF9E0D",
    accentVar: "--color-brand-forklift",
    tagline: "Forklift driver training and certified skill development.",
    story:
      "Sonali Godrej Forklift Driver Training Center bridges India's industrial skill gap by training certified, safety-first material handling operators. Conducted in affiliation with Godrej & Boyce Mfg. Co. Ltd., our dedicated training yard in PCMC trains candidates on modern counterbalance, reach trucks, and heavy diesel/electric forklifts, transforming novices into high-precision industrial operators.",
    metrics: [
      { value: "Godrej", label: "Recognized Certification" },
      { value: "100%", label: "Practical Yard Hands-on Hours" },
      { value: "Zero", label: "Accident Safety Curriculum" },
      { value: "Direct", label: "Tier-1 Plant Placement Assistance" },
    ],
    capabilitiesTitle: "Training Curriculum & Operator Modules",
    capabilities: [
      {
        title: "Counterbalance & Reach Truck Operations",
        desc: "Mastery over electric and diesel forklifts across light, medium, and heavy tonnage categories.",
        deliverables: [
          "Counterbalance electric and diesel forklift maneuvering",
          "Reach truck operations in high-bay narrow warehouse aisles",
          "Mast tilt, side-shift control, and fine load positioning",
          "Safe operation on ramps, dock levelers, and container stuffing",
        ],
        icon: "forklift",
      },
      {
        title: "OSHA & Factory Act Safety Standards",
        desc: "Deep theoretical and practical grounding in load physics, rollover avoidance, and shopfloor safety.",
        deliverables: [
          "Center of gravity and stability triangle load calculations",
          "Rated load capacity chart interpretation for varied load centers",
          "Pedestrian awareness, blind-corner horn protocols, and path of travel",
          "PPE compliance, emergency stop procedures, and fire safety",
        ],
        icon: "shield",
      },
      {
        title: "Pre-Shift Inspection & Maintenance",
        desc: "Daily preventative checks to ensure equipment reliability and eliminate shopfloor downtime.",
        deliverables: [
          "Hydraulic fluid, engine oil, and coolant level checks",
          "Traction battery charging protocol, cable inspection, and watering",
          "Mast lift chain inspection, tire pressure, and brake pedal testing",
          "Defect reporting procedures and lockout/tagout protocols",
        ],
        icon: "wrench",
      },
      {
        title: "Industry Certification & Job Placement",
        desc: "Fast-tracking certified forklift operators into high-paying roles in manufacturing and logistics hubs.",
        deliverables: [
          "Godrej-recognized operator competency certificate upon evaluation",
          "Practical driving test assessment and theoretical exam scoring",
          "Direct placement interviews with automotive OEMs and 3PL warehouses",
          "Periodic refresher courses and advanced multi-pallet certifications",
        ],
        icon: "award",
      },
    ],
    trustedBy: [
      "Godrej & Boyce Mfg. Co. Ltd. Pune",
      "Tata Motors Assembly Lines",
      "Automotive Hubs across Chakan & Talegaon",
      "Supply Chain & Logistics Warehouses in PCMC",
    ],
    enquiryType: "training",
    ctaHeading: "Enrol in the Next Forklift Training Batch",
    ctaText: "Whether you are an individual building an industrial career or a company seeking certified forklift operators, connect with our academy.",
    ctaButton: "Enquire About Course & Fees",
  },

  "flins-and-flora": {
    id: 3,
    slug: "flins-and-flora",
    name: "Flins & Flora",
    badge: "Aquaculture & Marine Trading Division",
    category: "Commercial Fisheries, Cold-Chain Logistics & Seafood Trading",
    accent: "#00D9B8",
    accentVar: "--color-brand-flins",
    tagline: "Fish farming, commercial wholesale, export, and import.",
    story:
      "Flins & Flora is the commercial aquaculture and fisheries venture of Salvi Group. Operating scientifically monitored fish culture facilities, we supply fresh, hygienic, and sustainably raised seafood to institutional buyers, hospitality chains, wholesale markets, and international trade channels.",
    metrics: [
      { value: "100%", label: "Sustainable Freshwater Cultivation" },
      { value: "Cold-Chain", label: "Integrity from Harvest to Port" },
      { value: "Daily", label: "Fresh Morning Catch Dispatch" },
      { value: "Global", label: "Export & Import Compliant" },
    ],
    capabilitiesTitle: "Aquaculture & Supply Divisions",
    capabilities: [
      {
        title: "Sustainable Fish Farming & Aquaculture",
        desc: "Scientifically managed breeding ponds and culture facilities adhering to strict environmental standards.",
        deliverables: [
          "Controlled water quality testing (pH, dissolved oxygen, salinity)",
          "Popular commercial species: Rohu, Catla, Tilapia, and Pangasius",
          "Formulated, nutrient-balanced feed management without harmful chemicals",
          "Eco-friendly waste bio-filtration and water conservation",
        ],
        icon: "fish",
      },
      {
        title: "Wholesale & B2B Institutional Supply",
        desc: "Bulk supply agreements for hotels, corporate cafeterias, supermarkets, and central markets.",
        deliverables: [
          "Daily scheduled deliveries across Pune, Mumbai, and Western Maharashtra",
          "Custom sorting, grading, and weight classification per client specs",
          "Hygienic descaling, dressing, and food-grade vacuum packaging",
          "Stable contract pricing for corporate and institutional procurement",
        ],
        icon: "cart",
      },
      {
        title: "Temperature-Controlled Cold-Chain Transit",
        desc: "Preserving peak ocean and farm freshness through unbroken refrigerated logistics.",
        deliverables: [
          "Dedicated insulated and refrigerated delivery fleet",
          "Instant ice-slurry preservation immediately following harvest",
          "Real-time GPS and temperature data logging during transit",
          "Food-safe, sanitized multi-use transport containers",
        ],
        icon: "snowflake",
      },
      {
        title: "International Seafood Import & Export",
        desc: "Global trade linkages delivering premium marine catch across international borders.",
        deliverables: [
          "Adherence to MPEDA and FSSAI export-grade standards",
          "Custom blast-freezing and international export packaging",
          "Import of high-demand exotic seafood varieties for domestic trade",
          "Airtight documentation, phytosanitary certifications, and port clearance",
        ],
        icon: "globe",
      },
    ],
    enquiryType: "fish-enquiry",
    ctaHeading: "Source Fresh Catch from Flins & Flora",
    ctaText: "Discuss bulk wholesale orders, institutional fish supply contracts, or import/export opportunities with our aquaculture team.",
    ctaButton: "Request Seafood Quotation",
  },

  "shivtej-enterprises": {
    id: 4,
    slug: "shivtej-enterprises",
    name: "Shivtej Enterprises",
    badge: "Enterprise Operations & Technical Services",
    category: "Engineering Support, Plant Maintenance & Procurement Synergy",
    accent: "#9B5CFF",
    accentVar: "--color-brand-shivtej",
    tagline: "Dependable operational and engineering support services.",
    story:
      "Shivtej Enterprises is built on the Salvi Group's founding commitment to honest dealing, dependable service, and long-term client relationships. We provide engineering support, industrial consumables procurement, preventive maintenance crews, and specialized on-site technical services to manufacturing facilities.",
    metrics: [
      { value: "24/7", label: "Client Support & Operations" },
      { value: "100%", label: "Transparent Contractor Billing" },
      { value: "Rapid", label: "On-Site Resource Mobilization" },
      { value: "Synergy", label: "Backed by Full Salvi Group Fleet" },
    ],
    capabilitiesTitle: "Engineering & Operational Support",
    capabilities: [
      {
        title: "Preventive Maintenance & Line Support",
        desc: "Experienced technical crews providing ongoing maintenance to avoid expensive manufacturing stoppages.",
        deliverables: [
          "Scheduled machinery lubrication, filter replacements, and checks",
          "Assembly line fixture changeovers and tooling calibration support",
          "Pneumatic, hydraulic line inspection and leak repairs",
          "Rapid-response emergency breakdown assistance",
        ],
        icon: "wrench",
      },
      {
        title: "Industrial Consumables & PPE Procurement",
        desc: "Streamlined sourcing of high-demand plant consumables and certified protective equipment.",
        deliverables: [
          "Certified safety helmets, steel-toe boots, Kevlar gloves, and eyewear",
          "Industrial fasteners, hardware, sealants, and welding rods",
          "Shopfloor spill kits, degreasers, and absorbent rolls",
          "Heavy-duty packaging materials, strapping, and protective films",
        ],
        icon: "box",
      },
      {
        title: "Auxiliary Plant & Yard Services",
        desc: "Dedicated auxiliary teams ensuring safe, orderly material movement outside core production lines.",
        deliverables: [
          "Yard layout optimization, stacking, and storage staging",
          "Industrial scrap sorting, bundling, and loading coordination",
          "Perimeter maintenance, roadway clearance, and stormwater drain care",
          "Dedicated on-site supervisors coordinating multi-vendor tasks",
        ],
        icon: "factory",
      },
      {
        title: "Salvi Group Conglomerate Synergy",
        desc: "Seamlessly accessing the full manpower, fleet, and fabrication strength of the parent group.",
        deliverables: [
          "Integrated billing across manpower, fabrication, and travel",
          "Single-contract accountability with enterprise SLAs",
          "Access to 16T heavy forklifts and commercial vehicle fleets",
          "Priority dispatch from Salvi Group central headquarters in Pimpri",
        ],
        icon: "network",
      },
    ],
    enquiryType: "general",
    ctaHeading: "Partner with Shivtej Enterprises",
    ctaText: "Discover how our dependable operations, engineering maintenance, and transparent service delivery can streamline your plant.",
    ctaButton: "Get in Touch with Our Team",
  },

  "sonali-tours-and-travels": {
    id: 5,
    slug: "sonali-tours-and-travels",
    name: "Sonali Tours and Travels",
    badge: "Commercial Fleet & Corporate Mobility",
    category: "Employee Transportation, Executive Mobility & Group Travel",
    accent: "#FF4D99",
    accentVar: "--color-brand-tours",
    tagline: "Travel and tour services for corporate and group mobility.",
    story:
      "Sonali Tours and Travels is the commercial mobility and travel arm of Salvi Group of Companies. We specialize in corporate staff bus shuttles, executive car rental for visiting dignitaries, ticket booking, and curated group holiday tours across Maharashtra and India.",
    metrics: [
      { value: "24/7", label: "Fleet Dispatch & GPS Monitoring" },
      { value: "100%", label: "Verified Professional Chauffeurs" },
      { value: "Sanitized", label: "Modern Well-Maintained Vehicles" },
      { value: "On-Time", label: "Punctual Schedule Guarantee" },
    ],
    capabilitiesTitle: "Mobility & Fleet Services",
    capabilities: [
      {
        title: "Corporate Employee Commute Shuttles",
        desc: "Daily reliable shift-commute bus and cab networks serving manufacturing plants and corporate tech parks.",
        deliverables: [
          "AC and Non-AC buses, mini-coaches, and tempo travelers",
          "Routes spanning PCMC, Chakan, Talegaon, Hinjawadi, and Ranjangaon",
          "Real-time GPS vehicle tracking and automated route optimization",
          "Strict adherence to shift start and end timings with zero transit delays",
        ],
        icon: "bus",
      },
      {
        title: "Executive Car Rental & Chauffeur Drive",
        desc: "Premium chauffeur-driven vehicles for corporate executives, client delegates, and airport transfers.",
        deliverables: [
          "Fleet of immaculate premium sedans and luxury SUVs",
          "Polite, background-verified chauffeurs with corporate etiquette",
          "Seamless airport transfers with real-time flight tracking",
          "Flexible hourly, daily, and monthly corporate lease arrangements",
        ],
        icon: "car",
      },
      {
        title: "Curated Group Tours & Pilgrimages",
        desc: "Well-planned travel packages offering comfortable, memorable journeys for families and corporate teams.",
        deliverables: [
          "Customized itineraries for Maharashtra destinations (Mahabaleshwar, Konkan, Shirdi)",
          "Ashtavinayak and Jyotirlinga pilgrimage packages with temple assistance",
          "Corporate off-sites, annual retreats, and team-building outbound trips",
          "End-to-end hotel accommodations and hygienic meal planning",
        ],
        icon: "map",
      },
      {
        title: "Comprehensive Ticketing & Travel Booking",
        desc: "Effortless ticketing services ensuring hassle-free travel for corporate and leisure clients.",
        deliverables: [
          "Domestic and international flight bookings with corporate discounts",
          "Confirmed IRCTC train ticket reservations and status tracking",
          "Inter-city bus bookings across top-tier transit operators",
          "Transparent pricing with no hidden surcharges and instant customer support",
        ],
        icon: "ticket",
      },
    ],
    enquiryType: "general",
    ctaHeading: "Plan Your Journey with Sonali Tours and Travels",
    ctaText: "From daily corporate employee bus shuttles to bespoke holiday packages, experience comfortable and punctual travel.",
    ctaButton: "Book Vehicles / Request Quote",
  },
};
