export type BookingStatus = "upcoming" | "completed" | "cancelled";

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  workerTrade: string;
  workerImageKey: string;
  serviceName: string;
  categorySlug: string;
  date: string;
  timeSlot: string;
  serviceAmount: number;
  platformFee: number;
  totalAmount: number;
  status: BookingStatus;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  createdAt: string;
}

export const INITIAL_MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-2026-8912",
    workerId: "w-1",
    workerName: "Ramesh Kumar",
    workerTrade: "Master Electrician & Wireman",
    workerImageKey: "w-1",
    serviceName: "Switchboard Repair & Socket Replacement",
    categorySlug: "electrician",
    date: "2026-09-09",
    timeSlot: "11:00 AM - 12:00 PM",
    serviceAmount: 199,
    platformFee: 25,
    totalAmount: 224,
    status: "upcoming",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98450 12345",
    address: "#42, 4th Cross, 7th Main, Indiranagar",
    city: "Bengaluru",
    createdAt: "2026-09-06T14:30:00Z",
  },
  {
    id: "BK-2026-7734",
    workerId: "w-5",
    workerName: "Sunita Devi",
    workerTrade: "Sanitation & Deep Cleaning Leader",
    workerImageKey: "w-5",
    serviceName: "Kitchen Deep Degreasing",
    categorySlug: "cleaning",
    date: "2026-08-30",
    timeSlot: "02:00 PM - 03:00 PM",
    serviceAmount: 799,
    platformFee: 25,
    totalAmount: 824,
    status: "completed",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98450 12345",
    address: "#42, 4th Cross, 7th Main, Indiranagar",
    city: "Bengaluru",
    createdAt: "2026-08-28T10:15:00Z",
  },
  {
    id: "BK-2026-6109",
    workerId: "w-2",
    workerName: "Suresh Sharma",
    workerTrade: "Senior Plumbing Specialist",
    workerImageKey: "w-2",
    serviceName: "Tap & Mixer Repair / Replacement",
    categorySlug: "plumber",
    date: "2026-08-14",
    timeSlot: "03:00 PM - 04:00 PM",
    serviceAmount: 249,
    platformFee: 25,
    totalAmount: 274,
    status: "cancelled",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98450 12345",
    address: "#42, 4th Cross, 7th Main, Indiranagar",
    city: "Bengaluru",
    createdAt: "2026-08-12T09:00:00Z",
  },
];
