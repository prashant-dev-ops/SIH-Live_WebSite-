import { Booking, BookingStatus, INITIAL_MOCK_BOOKINGS } from "@/data/bookings";
import { BookingDraft } from "./booking.types";
import { APP_CONFIG } from "@/lib/constants";

export interface IBookingRepository {
  getAll(): Promise<Booking[]>;
  getById(id: string): Promise<Booking | null>;
  getByStatus(status: BookingStatus): Promise<Booking[]>;
  create(draft: BookingDraft): Promise<Booking>;
  cancelBooking(id: string): Promise<Booking | null>;
}

const STORAGE_KEY = "sevasaathi_bookings_v1";

export class LocalStorageBookingRepository implements IBookingRepository {
  private inMemoryCache: Booking[] = [...INITIAL_MOCK_BOOKINGS];
  private isLoadedFromStorage = false;

  private getStore(): Booking[] {
    if (typeof window === "undefined") {
      return this.inMemoryCache;
    }

    if (!this.isLoadedFromStorage) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.inMemoryCache = JSON.parse(stored);
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.inMemoryCache));
        }
      } catch (e) {
        console.warn("LocalStorage access failed, using in-memory store", e);
      }
      this.isLoadedFromStorage = true;
    }
    return this.inMemoryCache;
  }

  private saveStore(bookings: Booking[]): void {
    this.inMemoryCache = bookings;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      } catch (e) {
        console.warn("Failed to persist bookings to localStorage", e);
      }
    }
  }

  async getAll(): Promise<Booking[]> {
    const list = this.getStore();
    return [...list];
  }

  async getById(id: string): Promise<Booking | null> {
    const list = this.getStore();
    const found = list.find((b) => b.id === id);
    return found ? { ...found } : null;
  }

  async getByStatus(status: BookingStatus): Promise<Booking[]> {
    const list = this.getStore();
    return list.filter((b) => b.status === status);
  }

  async create(draft: BookingDraft): Promise<Booking> {
    const list = this.getStore();
    const platformFee = APP_CONFIG.platformFee;
    const totalAmount = draft.serviceAmount + platformFee;
    const generatedId = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: generatedId,
      workerId: draft.workerId,
      workerName: draft.workerName,
      workerTrade: draft.workerTrade,
      workerImageKey: draft.workerImageKey,
      serviceName: draft.serviceName,
      categorySlug: draft.categorySlug,
      date: draft.date,
      timeSlot: draft.timeSlot,
      serviceAmount: draft.serviceAmount,
      platformFee,
      totalAmount,
      status: "upcoming",
      customerName: draft.customerName,
      customerPhone: draft.customerPhone,
      address: draft.address,
      city: draft.city,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...list];
    this.saveStore(updated);
    return newBooking;
  }

  async cancelBooking(id: string): Promise<Booking | null> {
    const list = this.getStore();
    let updatedBooking: Booking | null = null;
    const updated = list.map((b) => {
      if (b.id === id) {
        updatedBooking = { ...b, status: "cancelled" as BookingStatus };
        return updatedBooking;
      }
      return b;
    });
    this.saveStore(updated);
    return updatedBooking;
  }
}

export const bookingRepository = new LocalStorageBookingRepository();
