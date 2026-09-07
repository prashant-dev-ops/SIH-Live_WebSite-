import { ServiceImageKey } from "./images";

export interface SubServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageKey: ServiceImageKey;
  startingPrice: number;
  activeWorkersCount: number;
  subServices: SubServiceItem[];
}

export const MOCK_SERVICES: ServiceCategory[] = [
  {
    id: "srv-1",
    slug: "electrician",
    name: "Electrician",
    shortDescription: "Wiring, switchboards, fan installations, and fault repairs by certified guild electricians.",
    fullDescription: "Connect with verified electricians registered with the Self-Employed Electrical Guild. All technicians hold certified wireman licenses and follow national safety standards.",
    imageKey: "electrician",
    startingPrice: 199,
    activeWorkersCount: 42,
    subServices: [
      {
        id: "sub-elec-1",
        name: "Ceiling Fan Installation & Repair",
        description: "Installation of new ceiling fan or regulator and capacitor check",
        price: 299,
        durationMinutes: 45,
      },
      {
        id: "sub-elec-2",
        name: "Switchboard Repair & Socket Replacement",
        description: "Diagnosing burnt sockets, loose wiring, or new switch installation",
        price: 199,
        durationMinutes: 30,
      },
      {
        id: "sub-elec-3",
        name: "Full Home Wiring Inspection",
        description: "Comprehensive safety audit of MCBs, earthing, and load balancing",
        price: 499,
        durationMinutes: 90,
      },
      {
        id: "sub-elec-4",
        name: "Inverter & Battery Wiring Setup",
        description: "Terminal check, acid level assessment, and inverter connection",
        price: 399,
        durationMinutes: 60,
      },
    ],
  },
  {
    id: "srv-2",
    slug: "plumber",
    name: "Plumber",
    shortDescription: "Leak repairs, pipe fittings, tap replacements, and tank maintenance.",
    fullDescription: "Skilled plumbers from the City Sanitation Cooperative trained in leak detection, sanitaryware installation, and water supply maintenance.",
    imageKey: "plumber",
    startingPrice: 249,
    activeWorkersCount: 38,
    subServices: [
      {
        id: "sub-plumb-1",
        name: "Tap & Mixer Repair / Replacement",
        description: "Fix dripping taps, cartridge replacement, or install modern bath mixer",
        price: 249,
        durationMinutes: 40,
      },
      {
        id: "sub-plumb-2",
        name: "Water Leakage & Pipe Joint Sealing",
        description: "Detect and seal kitchen or bathroom pipe joints using Teflon and sealants",
        price: 349,
        durationMinutes: 60,
      },
      {
        id: "sub-plumb-3",
        name: "Overhead Water Tank Cleaning",
        description: "Deep scrubbing and disinfection of residential overhead plastic/concrete tank",
        price: 699,
        durationMinutes: 90,
      },
      {
        id: "sub-plumb-4",
        name: "Toilet Flush Cistern & Jet Spray Repair",
        description: "Repair internal flush siphon mechanism or replace leaking hand jet",
        price: 299,
        durationMinutes: 45,
      },
    ],
  },
  {
    id: "srv-3",
    slug: "carpenter",
    name: "Carpenter",
    shortDescription: "Custom woodwork, door locks, modular kitchen repairs, and furniture assembly.",
    fullDescription: "Master craftsmen from the Artisans Cooperative Guild specializing in bespoke woodcraft, hinge adjustments, and hardware installations.",
    imageKey: "carpenter",
    startingPrice: 349,
    activeWorkersCount: 29,
    subServices: [
      {
        id: "sub-carp-1",
        name: "Door Lock & Handle Installation",
        description: "Mortise lock, smart lock, or sliding latch fitting on wooden doors",
        price: 349,
        durationMinutes: 50,
      },
      {
        id: "sub-carp-2",
        name: "Cabinet Hinge & Drawer Channel Repair",
        description: "Hydraulic hinge alignment and smooth ball-bearing channel replacement",
        price: 299,
        durationMinutes: 45,
      },
      {
        id: "sub-carp-3",
        name: "Bed & Wardrobe Assembly / Dismantling",
        description: "Expert assembly of flat-pack or solid teak furniture with structural leveling",
        price: 599,
        durationMinutes: 120,
      },
      {
        id: "sub-carp-4",
        name: "Custom Shelving & Plywood Modification",
        description: "Cutting and edge-banding shelves tailored to interior wall niches",
        price: 499,
        durationMinutes: 90,
      },
    ],
  },
  {
    id: "srv-4",
    slug: "painter",
    name: "Painter",
    shortDescription: "Interior emulsion, exterior weatherproofing, touch-ups, and waterproof priming.",
    fullDescription: "Professional surface finish technicians providing precise masking, putty application, and durable eco-friendly coatings.",
    imageKey: "painter",
    startingPrice: 499,
    activeWorkersCount: 25,
    subServices: [
      {
        id: "sub-paint-1",
        name: "Single Room Refresh (Walls + Ceiling)",
        description: "Putty touch-up, sanding, and two premium emulsion coats for one room",
        price: 1899,
        durationMinutes: 240,
      },
      {
        id: "sub-paint-2",
        name: "Wall Water Seepage Treatment & Primer",
        description: "Scraping efflorescence, anti-fungal chemical wash, and damp-proof primer",
        price: 799,
        durationMinutes: 90,
      },
      {
        id: "sub-paint-3",
        name: "Balcony / Grille Enamel Coating",
        description: "Rust sanding and double-coat synthetic enamel on metal balcony railings",
        price: 499,
        durationMinutes: 120,
      },
    ],
  },
  {
    id: "srv-5",
    slug: "cleaning",
    name: "Cleaning",
    shortDescription: "Deep home cleaning, kitchen degreasing, bathroom sanitation, and sofa shampooing.",
    fullDescription: "Dedicated sanitation workers using skin-safe, biodegradable disinfectants for thorough domestic hygiene.",
    imageKey: "cleaning",
    startingPrice: 399,
    activeWorkersCount: 54,
    subServices: [
      {
        id: "sub-clean-1",
        name: "Bathroom Deep Cleaning",
        description: "Hard water stain removal, grout scrub, tile buffing, and sanitary sanitation",
        price: 399,
        durationMinutes: 60,
      },
      {
        id: "sub-clean-2",
        name: "Kitchen Deep Degreasing",
        description: "Chimney exterior, stove burner, tile backsplash, and cabinet degreasing",
        price: 799,
        durationMinutes: 90,
      },
      {
        id: "sub-clean-3",
        name: "Sofa & Upholstery Wet Shampooing",
        description: "Vacuuming, fabric foaming shampoo, and moisture extraction for 5-seater",
        price: 899,
        durationMinutes: 75,
      },
      {
        id: "sub-clean-4",
        name: "Full 2BHK Deep Sanitization",
        description: "Complete dust, mop, glass wipe, kitchen, and bathroom comprehensive package",
        price: 2499,
        durationMinutes: 240,
      },
    ],
  },
  {
    id: "srv-6",
    slug: "driver",
    name: "Driver",
    shortDescription: "Experienced city drivers, outstation chauffeurs, and hourly standby drivers.",
    fullDescription: "Verified chauffeurs from the Transport Cooperative Guild with clean police records, route knowledge, and defensive driving habits.",
    imageKey: "driver",
    startingPrice: 349,
    activeWorkersCount: 31,
    subServices: [
      {
        id: "sub-driv-1",
        name: "City Drive (4 Hours Pack)",
        description: "In-city errands, family visits, or office commutes in your own vehicle",
        price: 499,
        durationMinutes: 240,
      },
      {
        id: "sub-driv-2",
        name: "Full Day Standby (8 Hours)",
        description: "Dedicated chauffeur service for shopping or multiple appointments",
        price: 899,
        durationMinutes: 480,
      },
      {
        id: "sub-driv-3",
        name: "Airport Pick / Drop Assistance",
        description: "Punctual airport transfers with luggage assistance in your car",
        price: 349,
        durationMinutes: 120,
      },
    ],
  },
  {
    id: "srv-7",
    slug: "gardener",
    name: "Gardener",
    shortDescription: "Plant pruning, lawn mowing, organic soil fertilization, and balcony garden design.",
    fullDescription: "Experienced horticulturists from urban farming cooperatives caring for potted plants, flowering shrubs, and terrace gardens.",
    imageKey: "gardener",
    startingPrice: 299,
    activeWorkersCount: 22,
    subServices: [
      {
        id: "sub-gard-1",
        name: "Balcony Garden Maintenance (Up to 25 Pots)",
        description: "Soil aeration, deadheading, pest spray, and organic manure feeding",
        price: 299,
        durationMinutes: 60,
      },
      {
        id: "sub-gard-2",
        name: "Lawn Mowing & Hedge Trimming",
        description: "Grass trimming, border edging, and hedge shaping for residential yards",
        price: 549,
        durationMinutes: 90,
      },
      {
        id: "sub-gard-3",
        name: "New Plant Potting & Soil Prep",
        description: "Repotting into larger containers with vermicompost and cocopeat mix",
        price: 399,
        durationMinutes: 60,
      },
    ],
  },
  {
    id: "srv-8",
    slug: "caregiver",
    name: "Caregiver",
    shortDescription: "Elderly companionship, post-operative mobility support, and daily routine assistance.",
    fullDescription: "Patient, compassionate caregivers certified by Community Health Alliances for non-medical elder care and daily assistance.",
    imageKey: "caregiver",
    startingPrice: 599,
    activeWorkersCount: 18,
    subServices: [
      {
        id: "sub-care-1",
        name: "Elderly Companionship & Walk Support (4 Hours)",
        description: "Assisted walking, light conversation, medicine reminders, and meal warmup",
        price: 599,
        durationMinutes: 240,
      },
      {
        id: "sub-care-2",
        name: "Full Day Caregiving Support (8 Hours)",
        description: "Comprehensive non-medical assistance, vital checks, and companionship",
        price: 1099,
        durationMinutes: 480,
      },
      {
        id: "sub-care-3",
        name: "Post-Hospitalization Day Recovery Support",
        description: "Gentle mobility guidance, hygiene assistance, and caregiver documentation",
        price: 799,
        durationMinutes: 300,
      },
    ],
  },
  {
    id: "srv-9",
    slug: "appliance-repair",
    name: "Appliance Repair",
    shortDescription: "Diagnostics and repair for refrigerators, washing machines, microwaves, and ACs.",
    fullDescription: "Component-level diagnostics by cooperative technical societies, using genuine replacement spares with upfront pricing.",
    imageKey: "appliance-repair",
    startingPrice: 299,
    activeWorkersCount: 36,
    subServices: [
      {
        id: "sub-app-1",
        name: "AC Deep Foam Jet Service",
        description: "High-pressure indoor coil foam wash, filter clean, and gas pressure check",
        price: 499,
        durationMinutes: 60,
      },
      {
        id: "sub-app-2",
        name: "Washing Machine Diagnostic & Repair",
        description: "Diagnose spinning issues, drainage errors, or replace inlet valves",
        price: 299,
        durationMinutes: 45,
      },
      {
        id: "sub-app-3",
        name: "Refrigerator Cooling & Thermostat Fix",
        description: "Check compressor relay, defrost thermostat, and cooling coil inspection",
        price: 349,
        durationMinutes: 50,
      },
      {
        id: "sub-app-4",
        name: "Microwave Oven Magnetron & Fuse Check",
        description: "Repair heating issues, touch panel unresponsive faults, and door interlocks",
        price: 299,
        durationMinutes: 40,
      },
    ],
  },
  {
    id: "srv-10",
    slug: "pest-control",
    name: "Pest Control",
    shortDescription: "Odorless herbal cockroach gel, anti-termite wood treatment, and rodent traps.",
    fullDescription: "Child- and pet-friendly eco-treatments administered by certified pest control cooperatives with 90-day warranty.",
    imageKey: "pest-control",
    startingPrice: 699,
    activeWorkersCount: 20,
    subServices: [
      {
        id: "sub-pest-1",
        name: "1BHK/2BHK Cockroach Herbal Gel Treatment",
        description: "Odorless Bayer herbal dot treatment in all kitchen cabinets and crevices",
        price: 699,
        durationMinutes: 45,
      },
      {
        id: "sub-pest-2",
        name: "Bed Bug Eradication Double Spray",
        description: "Intense crack-and-crevice chemical wash with follow-up visit included",
        price: 1199,
        durationMinutes: 90,
      },
      {
        id: "sub-pest-3",
        name: "Termite Defense Drill-and-Inject",
        description: "Sub-surface wood injection around doors, wardrobes, and skirting borders",
        price: 1499,
        durationMinutes: 120,
      },
    ],
  },
];
