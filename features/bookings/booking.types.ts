import { Booking, BookingStatus } from "@/data/bookings";

export type { Booking, BookingStatus };

export interface BookingDraft {
  workerId: string;
  workerName: string;
  workerTrade: string;
  workerImageKey: string;
  workerImage?: string;
  categorySlug: string;
  serviceId: string;
  serviceName: string;
  serviceAmount: number; // Worker's actual service price (e.g. ₹299)
  bookingAmount?: number; // Booking reservation amount (₹50)
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface BookingReceipt extends Booking {
  workerImageUrl: string;
}
