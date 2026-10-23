import { IBookingRepository, bookingRepository } from "./booking.repository";
import { Booking, BookingDraft, BookingReceipt, BookingStatus } from "./booking.types";
import { IMAGES, WorkerImageKey } from "@/data/images";

export class BookingFeatureService {
  constructor(private repo: IBookingRepository = bookingRepository) {}

  private mapToReceipt(booking: Booking): BookingReceipt {
    return {
      ...booking,
      workerImageUrl:
        booking.workerImage ||
        IMAGES.workers[booking.workerImageKey as WorkerImageKey] ||
        IMAGES.hero.workerAtWork,
    };
  }

  async getBookingAmount(): Promise<number> {
    return this.repo.getBookingAmount();
  }

  async getAllBookings(): Promise<BookingReceipt[]> {
    const list = await this.repo.getAll();
    return list.map((b) => this.mapToReceipt(b));
  }

  async getBookingsByStatus(status: BookingStatus): Promise<BookingReceipt[]> {
    const list = await this.repo.getByStatus(status);
    return list.map((b) => this.mapToReceipt(b));
  }

  async getBookingById(id: string): Promise<BookingReceipt | null> {
    const booking = await this.repo.getById(id);
    if (!booking) return null;
    return this.mapToReceipt(booking);
  }

  async confirmBooking(draft: BookingDraft): Promise<BookingReceipt> {
    const created = await this.repo.create(draft);
    return this.mapToReceipt(created);
  }

  async cancelBooking(id: string): Promise<BookingReceipt | null> {
    const cancelled = await this.repo.cancelBooking(id);
    if (!cancelled) return null;
    return this.mapToReceipt(cancelled);
  }
}

export const bookingFeatureService = new BookingFeatureService();
