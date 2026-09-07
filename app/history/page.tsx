import React from "react";
import Link from "next/link";
import { ChevronRight, CalendarCheck, ShieldCheck } from "lucide-react";
import { BookingHistoryClient } from "@/features/bookings/components/BookingHistoryClient";

export default function BookingHistoryPage() {
  return (
    <div className="py-8 sm:py-12 bg-warmwhite min-h-[85vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-muted mb-6">
          <Link href="/" className="hover:text-forest transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
          <span className="font-semibold text-charcoal">Booking History</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-cream-border gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest bg-forest-light px-2.5 py-0.5 rounded-md mb-2 border border-forest/15">
              <CalendarCheck className="w-3.5 h-3.5 text-forest" />
              <span>Cooperative Service Records</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
              My Booking History
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              View your scheduled, completed, and past service appointments with verified guild artisans.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 p-3 bg-cream rounded-xl border border-cream-border text-xs text-charcoal-muted">
            <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0" />
            <span>Direct artisan payment guarantee on all visits</span>
          </div>
        </div>

        {/* Interactive Client Component */}
        <BookingHistoryClient />
      </div>
    </div>
  );
}
