"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  RotateCcw,
  Eye,
  XCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { bookingFeatureService } from "../booking.service";
import { BookingReceipt, BookingStatus } from "../booking.types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";

export function BookingHistoryClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");
  const [bookings, setBookings] = useState<BookingReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingForModal, setSelectedBookingForModal] =
    useState<BookingReceipt | null>(null);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingFeatureService.getAllBookings();
      setBookings(data);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id: string) => {
    if (confirm("Are you sure you want to cancel this scheduled cooperative visit?")) {
      await bookingFeatureService.cancelBooking(id);
      await loadBookings();
      if (selectedBookingForModal?.id === id) {
        setSelectedBookingForModal(null);
      }
    }
  };

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Segmented Tabs */}
      <div className="flex border-b border-cream-border">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-3 px-5 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "upcoming"
              ? "border-forest text-forest"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <span>Upcoming</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cream border border-cream-border text-charcoal">
            {bookings.filter((b) => b.status === "upcoming").length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-3 px-5 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "completed"
              ? "border-forest text-forest"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <span>Completed</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cream border border-cream-border text-charcoal">
            {bookings.filter((b) => b.status === "completed").length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("cancelled")}
          className={`pb-3 px-5 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "cancelled"
              ? "border-forest text-forest"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <span>Cancelled</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cream border border-cream-border text-charcoal">
            {bookings.filter((b) => b.status === "cancelled").length}
          </span>
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl border border-cream-border p-12 text-center my-6">
          <div className="w-12 h-12 rounded-full bg-cream mx-auto flex items-center justify-center text-charcoal-muted mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-charcoal">
            No {activeTab} bookings found
          </h3>
          <p className="text-xs text-charcoal-muted mt-1 max-w-sm mx-auto">
            {activeTab === "upcoming"
              ? "You have no upcoming services scheduled. Explore our certified cooperative tradespeople today."
              : `You have no ${activeTab} appointments in your history.`}
          </p>
          {activeTab === "upcoming" && (
            <div className="mt-5">
              <Link href="/#services">
                <Button variant="primary" size="sm">
                  Browse Services
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl border border-cream-border hover:border-forest/40 p-5 sm:p-6 transition-subtle hover:shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              {/* Left: Worker photo & core details */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-cream-warm border border-cream-border flex-shrink-0">
                  <img
                    src={booking.workerImageUrl}
                    alt={booking.workerName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-charcoal-light">
                      {booking.id}
                    </span>

                    {booking.status === "upcoming" && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Scheduled
                      </span>
                    )}
                    {booking.status === "completed" && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-forest-light text-forest inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}
                    {booking.status === "cancelled" && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-800 inline-flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Cancelled
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-charcoal">
                    {booking.serviceName}
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Worker: <strong className="text-charcoal">{booking.workerName}</strong> (
                    {booking.workerTrade})
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-charcoal-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-charcoal-light" />
                      <span>{booking.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-charcoal-light" />
                      <span>{booking.timeSlot}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-charcoal-light" />
                      <span className="truncate max-w-[200px]">{booking.city}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Amount & Action buttons */}
              <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-cream-border/60">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-charcoal-muted block">Amount</span>
                  <span className="text-lg font-bold text-forest">₹{booking.totalAmount}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedBookingForModal(booking)}
                    className="flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-charcoal-muted" />
                    <span>View Details</span>
                  </Button>

                  <Link href={`/booking/${booking.workerId}`}>
                    <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-forest" />
                      <span>Book Again</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBookingForModal && (
        <Modal
          isOpen={!!selectedBookingForModal}
          onClose={() => setSelectedBookingForModal(null)}
          title={`Booking Details: ${selectedBookingForModal.id}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-cream border border-cream-border space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-charcoal-muted">Status</span>
                <span className="font-semibold capitalize text-charcoal">
                  {selectedBookingForModal.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal-muted">Worker Assigned</span>
                <span className="font-bold text-charcoal">
                  {selectedBookingForModal.workerName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal-muted">Trade</span>
                <span className="text-charcoal">{selectedBookingForModal.workerTrade}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal-muted">Service</span>
                <span className="font-bold text-charcoal">
                  {selectedBookingForModal.serviceName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal-muted">Scheduled For</span>
                <span className="font-semibold text-charcoal">
                  {selectedBookingForModal.date} at {selectedBookingForModal.timeSlot}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal-muted">Address</span>
                <span className="font-medium text-charcoal text-right max-w-[200px] truncate">
                  {selectedBookingForModal.address}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-cream-border space-y-1.5">
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Service Charge</span>
                <span>₹{selectedBookingForModal.serviceAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Cooperative Welfare Fee</span>
                <span>₹{selectedBookingForModal.platformFee}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-forest pt-1.5 border-t border-cream-border">
                <span>Total</span>
                <span>₹{selectedBookingForModal.totalAmount}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              {selectedBookingForModal.status === "upcoming" && (
                <button
                  onClick={() => handleCancel(selectedBookingForModal.id)}
                  className="px-3.5 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold transition-colors"
                >
                  Cancel Booking
                </button>
              )}

              <div className="flex-1 flex justify-end gap-2">
                <Link href={`/booking/${selectedBookingForModal.workerId}`}>
                  <Button variant="primary" size="sm">
                    Rebook Service
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBookingForModal(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
