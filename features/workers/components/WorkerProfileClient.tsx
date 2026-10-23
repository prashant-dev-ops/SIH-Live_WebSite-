"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Briefcase,
  Award,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  FileCheck,
} from "lucide-react";
import { WorkerViewModel } from "../worker.types";
import { Review } from "@/features/reviews/review.types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChatDrawer } from "@/features/chat/components/ChatDrawer";
import { formatDate } from "@/lib/utils";
import { BOOKING_CONFIG } from "@/lib/constants";

interface WorkerProfileClientProps {
  worker: WorkerViewModel;
  reviews: Review[];
}

export function WorkerProfileClient({ worker, reviews }: WorkerProfileClientProps) {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string>(worker.availableSlots[0] || "");
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    worker.servicesPricing[0]?.serviceId || ""
  );
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleBookSelected = () => {
    // Navigate to booking wizard with query param for preselected service and slot
    const query = new URLSearchParams({
      serviceId: selectedServiceId,
      slot: selectedSlot,
    });
    router.push(`/booking/${worker.id}?${query.toString()}`);
  };

  return (
    <>
      <div className="space-y-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-cream-border p-6 sm:p-8 shadow-card">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Worker Large Photo */}
            <div className="relative w-full sm:w-64 h-72 sm:h-72 rounded-xl overflow-hidden bg-cream-warm flex-shrink-0 border border-cream-border">
              <img
                src={worker.imageUrl}
                alt={worker.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="verified">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                  <span>Verified Artisan</span>
                </Badge>
              </div>
            </div>

            {/* Core Info & Actions */}
            <div className="flex-1 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
                      {worker.name}
                    </h1>
                    <p className="text-sm font-semibold text-charcoal-muted mt-0.5">
                      {worker.trade}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="rating" size="md">
                      <Star className="w-4 h-4 fill-saffron text-saffron" />
                      <span>{worker.rating.toFixed(2)}</span>
                      <span className="text-charcoal-muted font-normal">
                        ({worker.reviewCount} verified reviews)
                      </span>
                    </Badge>
                  </div>
                </div>

                {/* Cooperative Affiliation Box */}
                <div className="mt-3 p-3 rounded-lg bg-forest-light/60 border border-forest/20 text-xs text-forest flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-medium">
                    <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0" />
                    <span>{worker.cooperativeSociety}</span>
                  </div>
                  <span className="text-[11px] text-forest/80 font-mono bg-white/70 px-2 py-0.5 rounded border border-forest/10">
                    Reg: {worker.registrationNumber}
                  </span>
                </div>

                {/* Stat Badges */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2.5 rounded-lg bg-cream border border-cream-border">
                    <p className="text-xs text-charcoal-muted">Experience</p>
                    <p className="text-sm font-bold text-charcoal mt-0.5">
                      {worker.experienceYears} Years
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-cream border border-cream-border">
                    <p className="text-xs text-charcoal-muted">Jobs Completed</p>
                    <p className="text-sm font-bold text-charcoal mt-0.5">
                      {worker.jobsCompleted}+
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-cream border border-cream-border">
                    <p className="text-xs text-charcoal-muted">Service Radius</p>
                    <p className="text-sm font-bold text-charcoal mt-0.5">
                      {worker.distanceKm} km
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-cream border border-cream-border">
                    <p className="text-xs text-charcoal-muted">Starting At</p>
                    <p className="text-sm font-bold text-forest mt-0.5">
                      ₹{worker.startingPrice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Book Now + Chat */}
              <div className="pt-4 border-t border-cream-border/70 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBookSelected}
                  className="flex-1 sm:flex-initial"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Book This Artisan</span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsChatOpen(true)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-forest" />
                  <span>Chat with {worker.name.split(" ")[0]}</span>
                </Button>

                <span className="text-xs text-charcoal-muted hidden sm:inline ml-auto">
                  {worker.availableToday ? (
                    <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Next slot available today
                    </span>
                  ) : (
                    "Available on reservation"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout: Left Details, Right Booking & Availability */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: About, Skills, Services & Pricing, Reviews */}
          <div className="lg:col-span-8 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl border border-cream-border p-6 shadow-subtle">
              <h2 className="text-base font-bold text-charcoal flex items-center gap-2 mb-3">
                <FileCheck className="w-4 h-4 text-forest" />
                <span>Professional Background & Guild Certification</span>
              </h2>
              <p className="text-sm text-charcoal-muted leading-relaxed">{worker.bio}</p>
              <div className="mt-4 pt-3 border-t border-cream-border/60 flex items-center gap-2 text-xs text-charcoal-muted">
                <span className="font-semibold text-charcoal">Spoken Languages:</span>
                <span>{worker.languages.join(", ")}</span>
              </div>
            </div>

            {/* Skills Tag List */}
            <div className="bg-white rounded-xl border border-cream-border p-6 shadow-subtle">
              <h2 className="text-base font-bold text-charcoal flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-forest" />
                <span>Verified Trade Skills</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cream text-charcoal border border-cream-border"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Services & Itemized Pricing */}
            <div className="bg-white rounded-xl border border-cream-border p-6 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-charcoal flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-forest" />
                  <span>Itemized Cooperative Tariffs</span>
                </h2>
                <span className="text-xs text-charcoal-muted">Select service to prefill</span>
              </div>

              <div className="space-y-3">
                {worker.servicesPricing.map((item) => {
                  const isSelected = selectedServiceId === item.serviceId;
                  return (
                    <div
                      key={item.serviceId}
                      onClick={() => setSelectedServiceId(item.serviceId)}
                      className={`p-4 rounded-xl border transition-colors cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "border-forest bg-forest-light/30"
                          : "border-cream-border bg-white hover:bg-cream"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="service-select"
                            checked={isSelected}
                            onChange={() => setSelectedServiceId(item.serviceId)}
                            className="text-forest focus:ring-forest"
                          />
                          <h4 className="text-sm font-bold text-charcoal">{item.name}</h4>
                        </div>
                        <p className="text-xs text-charcoal-muted ml-5">
                          Approx. duration: {item.durationMinutes} mins · Standard cooperative tariff
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold text-forest">₹{item.price}</span>
                        <span className="block text-[10px] text-charcoal-light">Fixed rate</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-xl border border-cream-border p-6 shadow-subtle">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold text-charcoal">Verified Customer Reviews</h2>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Reviews from verified households served by this worker.
                  </p>
                </div>
                <Badge variant="rating">
                  <Star className="w-3.5 h-3.5 fill-saffron text-saffron" />
                  <span>{worker.rating.toFixed(2)} / 5</span>
                </Badge>
              </div>

              {reviews.length === 0 ? (
                <p className="text-sm text-charcoal-muted text-center py-6">
                  No public reviews posted yet for this artisan.
                </p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-lg bg-cream/60 border border-cream-border/70 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm text-charcoal">{rev.customerName}</p>
                          <p className="text-[11px] text-charcoal-muted">
                            {rev.customerLocation} · {formatDate(rev.date)}
                          </p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-saffron text-saffron" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-charcoal leading-relaxed">{rev.text}</p>

                      <div className="pt-1.5 flex items-center gap-1.5 text-[10px] text-forest font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Booked: {rev.serviceRendered}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Availability & Booking Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            <div className="bg-white rounded-xl border border-cream-border p-5 shadow-card">
              <h3 className="font-bold text-base text-charcoal mb-1">
                Select Today&apos;s Time Slot
              </h3>
              <p className="text-xs text-charcoal-muted mb-4">
                Interactive real-time slots reserved for verified appointments.
              </p>

              {/* Time slot pills */}
              <div className="space-y-2 mb-6">
                {worker.availableSlots.map((slot, index) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full py-2.5 px-3.5 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-forest text-white border-forest shadow-subtle"
                          : "bg-cream text-charcoal border-cream-border hover:bg-cream-warm"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-saffron"}`} />
                        <span>{slot}</span>
                      </span>
                      <span className="text-[11px] opacity-80">
                        {isSelected ? "Selected" : "Open"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-cream-border space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-charcoal-muted">Selected Service:</span>
                  <span className="font-semibold text-charcoal truncate max-w-[170px]">
                    {worker.servicesPricing.find((s) => s.serviceId === selectedServiceId)?.name ||
                      "Standard Visit"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-charcoal-muted">Service Price:</span>
                  <span className="font-semibold text-charcoal">
                    ₹{worker.servicesPricing.find((s) => s.serviceId === selectedServiceId)?.price || worker.startingPrice}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-charcoal-muted">Booking Amount:</span>
                  <span className="font-bold text-forest">₹{BOOKING_CONFIG.bookingAmount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-charcoal-muted">Selected Slot:</span>
                  <span className="font-semibold text-charcoal">{selectedSlot}</span>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  size="md"
                  onClick={handleBookSelected}
                  className="mt-2"
                >
                  Proceed to Schedule
                </Button>
                <p className="text-[11px] text-charcoal-muted text-center">
                  Pay ₹{BOOKING_CONFIG.bookingAmount} to confirm booking · Balance paid after service
                </p>
              </div>
            </div>

            {/* Cooperative Guarantee Box */}
            <div className="bg-cream rounded-xl border border-cream-border p-4 text-xs text-charcoal-muted space-y-2">
              <div className="flex items-center gap-2 font-bold text-charcoal text-xs">
                <ShieldCheck className="w-4 h-4 text-forest" />
                <span>Cooperative Guarantee</span>
              </div>
              <p className="leading-relaxed">
                All visits are protected under the Cooperative Guild Quality Charter with 30-day workmanship assurance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Frontend Chat Drawer */}
      <ChatDrawer
        worker={worker}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}
