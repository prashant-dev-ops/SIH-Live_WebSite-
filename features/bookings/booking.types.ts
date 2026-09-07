import { Booking, BookingStatus } from "@/data/bookings";

export type { Booking, BookingStatus };

export interface BookingDraft {
  workerId: string;
  workerName: string;
  workerTrade: string;
  workerImageKey: string;
  categorySlug: string;
  serviceId: string;
  serviceName: string;
  serviceAmount: number;
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
