export interface Review {
  id: string;
  workerId: string;
  customerName: string;
  customerLocation: string;
  rating: number;
  text: string;
  date: string;
  serviceRendered: string;
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    workerId: "w-1",
    customerName: "Priya Deshmukh",
    customerLocation: "Indiranagar, Bengaluru",
    rating: 5,
    text: "Ramesh ji arrived promptly with his cooperative ID badge. He diagnosed an elusive tripping issue in our main distribution board that two previous commercial technicians failed to pinpoint. Extremely transparent about material costs and polite.",
    date: "2026-08-28",
    serviceRendered: "Full Home Wiring Inspection",
  },
  {
    id: "rev-2",
    workerId: "w-1",
    customerName: "Vikramaditya Rao",
    customerLocation: "HSR Layout, Bengaluru",
    rating: 5,
    text: "Installed three BLDC ceiling fans and fixed our burned out geyser point. He cleaned up all wire clippings neatly. Knowing that 90% of what I paid went directly into his cooperative account makes SevaSaathi our permanent choice.",
    date: "2026-08-15",
    serviceRendered: "Ceiling Fan Installation & Repair",
  },
  {
    id: "rev-3",
    workerId: "w-2",
    customerName: "Harpreet Singh",
    customerLocation: "Janakpuri, New Delhi",
    rating: 5,
    text: "Suresh Sharma is a true craftsman. Fixed a stubborn concealed pipe leak in the master bathroom without chipping down unnecessary tiles. Honest pricing, very clean work, and zero fuss.",
    date: "2026-08-22",
    serviceRendered: "Water Leakage & Pipe Joint Sealing",
  },
  {
    id: "rev-4",
    workerId: "w-3",
    customerName: "Aditi Joshi",
    customerLocation: "Kothrud, Pune",
    rating: 5,
    text: "Manoj fixed our loose modular kitchen cabinets and installed heavy duty hydraulic hinges. He even planed a swollen teak door without charging an extra fortune. Exceptional skill.",
    date: "2026-08-19",
    serviceRendered: "Cabinet Hinge & Drawer Channel Repair",
  },
  {
    id: "rev-5",
    workerId: "w-4",
    customerName: "Kavita Saxena",
    customerLocation: "Noida Sector 62",
    rating: 5,
    text: "Rajesh did an anti-damp treatment and repainted our guest bedroom. Punctual, covered all furniture with clean plastic sheets, and finished in a single day as promised.",
    date: "2026-08-12",
    serviceRendered: "Single Room Refresh (Walls + Ceiling)",
  },
  {
    id: "rev-6",
    workerId: "w-5",
    customerName: "Arvind Swaminathan",
    customerLocation: "Koramangala, Bengaluru",
    rating: 5,
    text: "Sunita and her assistant left our kitchen sparkling like new. Degreased the chimney filters and tile joints completely. No chemical fumes, just mild citrus freshness. Incredible cooperative initiative!",
    date: "2026-08-30",
    serviceRendered: "Kitchen Deep Degreasing",
  },
  {
    id: "rev-7",
    workerId: "w-6",
    customerName: "Rohit Kadam",
    customerLocation: "Andheri West, Mumbai",
    rating: 5,
    text: "Dinesh drove my elderly parents to Pune and back in heavy monsoon rain. Impeccable defensive driving, gentlemanly behavior, and very respectful.",
    date: "2026-08-10",
    serviceRendered: "Full Day Standby (8 Hours)",
  },
  {
    id: "rev-8",
    workerId: "w-8",
    customerName: "Meera Sengupta",
    customerLocation: "Jayanagar, Bengaluru",
    rating: 5,
    text: "Lakshmi Nair assisted my 82-year-old mother after her knee replacement. Calm, observant, and deeply compassionate. She brought an aura of dignity to home care.",
    date: "2026-08-24",
    serviceRendered: "Post-Hospitalization Day Recovery Support",
  },
  {
    id: "rev-9",
    workerId: "w-9",
    customerName: "Nitin Patil",
    customerLocation: "Viman Nagar, Pune",
    rating: 5,
    text: "Anil diagnosed our dual inverter AC compressor issue within 10 minutes and replaced the start capacitor right in front of us at fair market rates. Outstanding technician.",
    date: "2026-08-27",
    serviceRendered: "AC Deep Foam Jet Service",
  },
  {
    id: "rev-10",
    workerId: "w-11",
    customerName: "Deepak Hegde",
    customerLocation: "BTM Layout, Bengaluru",
    rating: 5,
    text: "Pradeep installed LED cove strip lights and a modern sub-meter for our floor. His work is clean, aligned, and thoroughly grounded. Great representative of the guild.",
    date: "2026-08-18",
    serviceRendered: "Switchboard Repair & Socket Replacement",
  },
];
