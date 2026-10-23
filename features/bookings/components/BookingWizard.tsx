"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Coins,
  Check,
  Sparkles,
  Info,
} from "lucide-react";
import { WorkerViewModel } from "@/features/workers/worker.types";
import { bookingFeatureService } from "../booking.service";
import { BookingReceipt } from "../booking.types";
import { BOOKING_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface BookingWizardProps {
  worker: WorkerViewModel;
}

export function BookingWizard({ worker }: BookingWizardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialServiceId =
    searchParams.get("serviceId") || worker.servicesPricing[0]?.serviceId || "";
  const initialSlot = searchParams.get("slot") || worker.availableSlots[0] || "";

  // Centralized booking reservation amount from service/config layer
  const [bookingAmount, setBookingAmount] = useState<number>(BOOKING_CONFIG.bookingAmount);

  useEffect(() => {
    bookingFeatureService.getBookingAmount().then((amt) => {
      if (amt) setBookingAmount(amt);
    });
  }, []);

  // Wizard state: steps 1 to 5
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string>(initialSlot);

  // Address states
  const [customerName, setCustomerName] = useState("Rahul Sharma");
  const [customerPhone, setCustomerPhone] = useState("+91 98450 12345");
  const [streetAddress, setStreetAddress] = useState("#42, 4th Cross, 7th Main, Indiranagar");
  const [landmark, setLandmark] = useState("Near Metro Station");
  const [city, setCity] = useState("Bengaluru");

  // Submission & Confirmed state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingReceipt | null>(null);

  // Generate next 7 days
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        fullDate: d.toISOString().split("T")[0],
        dayName: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" }),
        displayDate: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      });
    }
    return dates;
  }, []);

  const selectedService =
    worker.servicesPricing.find((s) => s.serviceId === selectedServiceId) ||
    worker.servicesPricing[0];

  const servicePrice = selectedService?.price || worker.startingPrice;
  const balanceAfterService = Math.max(0, servicePrice - bookingAmount);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const receipt = await bookingFeatureService.confirmBooking({
        workerId: worker.id,
        workerName: worker.name,
        workerTrade: worker.trade,
        workerImageKey: worker.imageKey,
        workerImage: worker.imageUrl || worker.image,
        categorySlug: worker.categorySlug,
        serviceId: selectedService.serviceId,
        serviceName: selectedService.name,
        serviceAmount: servicePrice,
        bookingAmount,
        date: availableDates[selectedDateIndex].fullDate,
        timeSlot: selectedSlot,
        customerName,
        customerPhone,
        address: `${streetAddress}${landmark ? `, ${landmark}` : ""}`,
        city,
      });

      setConfirmedBooking(receipt);
    } catch (err) {
      console.error("Booking creation error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 6: Confirmation Success View
  if (confirmedBooking) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-cream-border p-8 shadow-card text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-forest-light text-forest mx-auto flex items-center justify-center mb-4 border border-forest/20">
          <Check className="w-8 h-8 text-forest" />
        </div>

        <Badge variant="available" className="mb-2">
          Status: Confirmed
        </Badge>

        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
          Booking Confirmed!
        </h1>
        <p className="text-sm text-charcoal-muted mt-1">
          Your appointment has been reserved directly with {confirmedBooking.workerName}.
        </p>

        {/* Receipt Box */}
        <div className="mt-8 p-6 rounded-xl bg-cream border border-cream-border text-left space-y-3.5 text-sm">
          <div className="flex justify-between items-center border-b border-cream-border/80 pb-3">
            <span className="text-xs text-charcoal-muted">Booking Reference</span>
            <span className="font-mono font-bold text-charcoal text-base">
              {confirmedBooking.id}
            </span>
          </div>

          <div className="flex items-center gap-3 py-1">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream-warm border border-cream-border flex-shrink-0">
              <img
                src={confirmedBooking.workerImageUrl || worker.imageUrl}
                alt={confirmedBooking.workerName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-charcoal text-base">{confirmedBooking.workerName}</p>
              <p className="text-xs text-charcoal-muted font-medium">{confirmedBooking.workerTrade}</p>
              <p className="text-[11px] text-forest font-medium">{worker.cooperativeSociety}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cream-border/80 text-xs">
            <div>
              <span className="text-charcoal-muted block">Selected Service</span>
              <span className="font-semibold text-charcoal">{confirmedBooking.serviceName}</span>
            </div>
            <div>
              <span className="text-charcoal-muted block">Date & Time</span>
              <span className="font-semibold text-charcoal">
                {confirmedBooking.date} · {confirmedBooking.timeSlot}
              </span>
            </div>
            <div>
              <span className="text-charcoal-muted block">Worker Service Price</span>
              <span className="font-semibold text-charcoal">₹{confirmedBooking.serviceAmount}</span>
            </div>
            <div>
              <span className="text-charcoal-muted block">Booking Amount Paid</span>
              <span className="font-bold text-forest">₹{confirmedBooking.bookingAmount}</span>
            </div>
            <div>
              <span className="text-charcoal-muted block">Service Location</span>
              <span className="font-semibold text-charcoal truncate">{confirmedBooking.address}</span>
            </div>
            <div>
              <span className="text-charcoal-muted block">Balance Due After Service</span>
              <span className="font-bold text-charcoal">₹{confirmedBooking.remainingAmount}</span>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200/60 text-xs text-emerald-900 text-left flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <p>
            You have paid <strong>₹{confirmedBooking.bookingAmount}</strong> to confirm your slot. The remaining balance of <strong>₹{confirmedBooking.remainingAmount}</strong> will be paid directly to {confirmedBooking.workerName.split(" ")[0]} via Cash or UPI after service completion.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/history" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              View in Booking History
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top Banner Explaining Booking Policy */}
      <div className="mb-6 p-3.5 rounded-xl bg-forest-light/60 border border-forest/20 flex items-center justify-between gap-3 text-xs text-forest">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 flex-shrink-0 text-forest" />
          <span>
            <strong>Pay ₹{bookingAmount} to confirm your booking.</strong> The remaining service balance is paid directly to the artisan upon work completion.
          </span>
        </div>
        <span className="font-bold text-forest bg-white/80 px-2 py-0.5 rounded border border-forest/15 whitespace-nowrap">
          Booking Amount: ₹{bookingAmount}
        </span>
      </div>

      {/* Step Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-charcoal-muted mb-2 font-medium">
          <span>Step {currentStep} of 5</span>
          <span className="text-charcoal font-semibold">
            {currentStep === 1 && "1. Select Service"}
            {currentStep === 2 && "2. Select Date"}
            {currentStep === 3 && "3. Select Time Slot"}
            {currentStep === 4 && "4. Confirm Address"}
            {currentStep === 5 && "5. Booking Summary"}
          </span>
        </div>

        <div className="w-full bg-cream-border/50 h-2 rounded-full overflow-hidden flex">
          <div
            className="bg-forest h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Step Card Container */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-cream-border p-6 sm:p-8 shadow-card">
          {/* STEP 1: Select Service */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-charcoal">
                  1. Choose the Service Required
                </h2>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Select which job {worker.name} should attend to. Service price is fixed by cooperative guild standard.
                </p>
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
                          ? "border-forest bg-forest-light/40 ring-1 ring-forest"
                          : "border-cream-border bg-white hover:bg-cream"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="wizard-service"
                            checked={isSelected}
                            onChange={() => setSelectedServiceId(item.serviceId)}
                            className="text-forest focus:ring-forest"
                          />
                          <span className="text-sm font-bold text-charcoal">{item.name}</span>
                        </div>
                        <p className="text-xs text-charcoal-muted ml-5">
                          Approx. {item.durationMinutes} mins · Cooperative tariff
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold text-charcoal">₹{item.price}</span>
                        <span className="block text-[10px] text-forest font-semibold">
                          Reserve with ₹{bookingAmount}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2"
                >
                  <span>Continue to Date</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Date */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-charcoal">
                  2. Select Convenient Date
                </h2>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Choose a date in the upcoming 7 days for the on-site service visit.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableDates.map((item, idx) => {
                  const isSelected = selectedDateIndex === idx;
                  return (
                    <button
                      key={item.fullDate}
                      onClick={() => setSelectedDateIndex(idx)}
                      className={`p-3.5 rounded-xl border text-center transition-subtle flex flex-col items-center justify-center ${
                        isSelected
                          ? "border-forest bg-forest text-white shadow-subtle"
                          : "border-cream-border bg-cream/70 hover:bg-cream-warm text-charcoal"
                      }`}
                    >
                      <span className="text-xs font-semibold">{item.dayName}</span>
                      <span className="text-base font-bold mt-0.5">{item.displayDate}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2"
                >
                  <span>Continue to Time Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Select Time Slot */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-charcoal">
                  3. Select Arrival Time Slot
                </h2>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Artisans arrive within the reserved appointment window.
                </p>
              </div>

              <div className="space-y-2.5">
                {worker.availableSlots.map((slot, index) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                        isSelected
                          ? "border-forest bg-forest-light/40 ring-1 ring-forest"
                          : "border-cream-border bg-white hover:bg-cream"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock
                          className={`w-4 h-4 ${isSelected ? "text-forest" : "text-charcoal-muted"}`}
                        />
                        <span className="text-sm font-semibold text-charcoal">{slot}</span>
                      </div>
                      <span className="text-xs text-forest font-medium">Available</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2"
                >
                  <span>Continue to Address</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirm Address */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-charcoal">
                  4. Service Address & Contact Details
                </h2>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Provide accurate details for direct artisan dispatch and entry verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Customer Full Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-sm border border-cream-border rounded-lg px-3.5 py-2.5 bg-warmwhite text-charcoal focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Mobile Number (For WhatsApp Updates)
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-sm border border-cream-border rounded-lg px-3.5 py-2.5 bg-warmwhite text-charcoal focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Flat / House No., Apartment & Street
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full text-sm border border-cream-border rounded-lg px-3.5 py-2.5 bg-warmwhite text-charcoal focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Landmark
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full text-sm border border-cream-border rounded-lg px-3.5 py-2.5 bg-warmwhite text-charcoal focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-sm border border-cream-border rounded-lg px-3.5 py-2.5 bg-warmwhite text-charcoal focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(5)}
                  className="flex items-center gap-2"
                >
                  <span>Review Summary</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: Booking Summary & Confirm */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-charcoal">
                  5. Review Booking Summary & Payment
                </h2>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Confirm your appointment details below.
                </p>
              </div>

              {/* Exact Booking Summary Layout */}
              <div className="p-5 rounded-xl bg-cream border border-cream-border space-y-3.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Worker:</span>
                  <span className="font-bold text-charcoal text-sm">{worker.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Service:</span>
                  <span className="font-bold text-charcoal text-sm">{selectedService.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Service Price:</span>
                  <span className="font-semibold text-charcoal text-sm">₹{servicePrice}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Booking Amount:</span>
                  <span className="font-semibold text-forest text-sm">₹{bookingAmount}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Date:</span>
                  <span className="font-semibold text-charcoal">
                    {availableDates[selectedDateIndex].displayDate} (
                    {availableDates[selectedDateIndex].dayName})
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Time:</span>
                  <span className="font-semibold text-charcoal">{selectedSlot}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Address:</span>
                  <span className="font-semibold text-charcoal max-w-[240px] text-right truncate">
                    {streetAddress}, {city}
                  </span>
                </div>

                {/* Prominent Amount to Pay Now Box */}
                <div className="mt-4 pt-3 border-t-2 border-forest/30 bg-white p-4 rounded-xl border border-cream-border flex items-center justify-between shadow-subtle">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-charcoal-muted font-bold block">
                      Amount to pay now:
                    </span>
                    <span className="text-xs text-charcoal-muted mt-0.5 block">
                      Pay ₹{bookingAmount} to confirm your booking
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-forest tracking-tight block">
                      ₹{bookingAmount}
                    </span>
                    <span className="text-[11px] text-charcoal-muted">
                      Balance ₹{balanceAfterService} after service
                    </span>
                  </div>
                </div>
              </div>

              {/* Informative Note */}
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-xs text-emerald-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-700 mt-0.5" />
                <p>
                  <strong>Pay ₹{bookingAmount} to confirm your booking.</strong> The remaining balance of ₹{balanceAfterService} is payable directly to {worker.name.split(" ")[0]} via Cash or UPI only after you inspect the completed work.
                </p>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  onClick={handleConfirm}
                  className="px-8 font-bold text-base shadow-card"
                >
                  {isSubmitting ? "Confirming..." : "Confirm Booking"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Worker Summary Sidebar */}
        <div className="lg:col-span-4 bg-cream rounded-2xl border border-cream-border p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream-warm border border-cream-border flex-shrink-0">
              <img
                src={worker.imageUrl || worker.image}
                alt={worker.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-sm text-charcoal">{worker.name}</h3>
              <p className="text-xs text-charcoal-muted">{worker.trade}</p>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-saffron">
                <span>★ {worker.rating.toFixed(2)}</span>
                <span className="text-charcoal-muted font-normal">({worker.reviewCount})</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-cream-border text-xs space-y-1">
            <p className="font-semibold text-charcoal">Affiliated Guild:</p>
            <p className="text-charcoal-muted">{worker.cooperativeSociety}</p>
            <p className="text-[10px] text-forest font-mono">Reg: {worker.registrationNumber}</p>
          </div>

          <div className="border-t border-cream-border/70 pt-3 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Worker Service Price:</span>
              <span className="font-semibold text-charcoal">₹{servicePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Booking Amount:</span>
              <span className="font-bold text-forest">₹{bookingAmount}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-cream-border/60">
              <span className="text-charcoal-muted">Remaining Balance:</span>
              <span className="font-medium text-charcoal">₹{balanceAfterService}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
