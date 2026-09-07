"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { WorkerViewModel } from "@/features/workers/worker.types";
import { bookingFeatureService } from "../booking.service";
import { BookingReceipt } from "../booking.types";
import { APP_CONFIG } from "@/lib/constants";
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

  const serviceAmount = selectedService?.price || worker.startingPrice;
  const platformFee = APP_CONFIG.platformFee;
  const totalAmount = serviceAmount + platformFee;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const receipt = await bookingFeatureService.confirmBooking({
        workerId: worker.id,
        workerName: worker.name,
        workerTrade: worker.trade,
        workerImageKey: worker.imageKey,
        categorySlug: worker.categorySlug,
        serviceId: selectedService.serviceId,
        serviceName: selectedService.name,
        serviceAmount,
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
          Your service has been scheduled directly with {confirmedBooking.workerName}.
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
            <div className="w-12 h-12 rounded-full overflow-hidden bg-cream-warm flex-shrink-0">
              <img
                src={worker.imageUrl}
                alt={confirmedBooking.workerName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-charcoal">{confirmedBooking.workerName}</p>
              <p className="text-xs text-charcoal-muted">{confirmedBooking.workerTrade}</p>
              <p className="text-[11px] text-forest font-medium">{worker.cooperativeSociety}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-cream-border/80 text-xs">
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
              <span className="text-charcoal-muted block">Service Location</span>
              <span className="font-semibold text-charcoal">{confirmedBooking.address}</span>
            </div>
            <div>
              <span className="text-charcoal-muted block">Total Payable (Post Service)</span>
              <span className="font-bold text-forest text-sm">₹{confirmedBooking.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200/60 text-xs text-emerald-900 text-left flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <p>
            An SMS confirmation with the artisan&apos;s cooperative badge ID has been queued. No advance online payment is required; pay directly upon task completion.
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
                  Select which job {worker.name} should attend to. Rates are fixed by the guild.
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
                          Approx. {item.durationMinutes} mins · Standard cooperative tariff
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold text-forest">₹{item.price}</span>
                        <span className="block text-[10px] text-charcoal-light">Base rate</span>
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
                  Artisans arrive within the reserved 60-minute appointment window.
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
                  Provide accurate details for direct dispatch and entry security.
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
                  5. Review Booking Summary & Total
                </h2>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Confirm the appointment details. 90% of the service fee is transferred directly to the cooperative worker.
                </p>
              </div>

              {/* Breakdown Table */}
              <div className="p-4 rounded-xl bg-cream border border-cream-border space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Worker Name</span>
                  <span className="font-bold text-charcoal">{worker.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Selected Service</span>
                  <span className="font-bold text-charcoal">{selectedService.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Scheduled Date</span>
                  <span className="font-bold text-charcoal">
                    {availableDates[selectedDateIndex].displayDate} (
                    {availableDates[selectedDateIndex].dayName})
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Time Slot</span>
                  <span className="font-bold text-charcoal">{selectedSlot}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cream-border/70">
                  <span className="text-charcoal-muted">Destination Address</span>
                  <span className="font-bold text-charcoal max-w-[240px] text-right truncate">
                    {streetAddress}, {city}
                  </span>
                </div>

                <div className="pt-2 space-y-1.5">
                  <div className="flex justify-between text-charcoal">
                    <span>Base Service Charge</span>
                    <span className="font-semibold">₹{serviceAmount}</span>
                  </div>
                  <div className="flex justify-between text-charcoal">
                    <span className="flex items-center gap-1">
                      <span>Cooperative Welfare & Insurance Fund</span>
                      <span className="text-[10px] text-forest font-semibold">(Fixed)</span>
                    </span>
                    <span className="font-semibold">₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-forest pt-2 border-t border-cream-border">
                    <span>Total Amount Payable</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-forest-light/60 border border-forest/20 text-xs text-forest flex items-start gap-2">
                <Coins className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  No payment is charged today. You will inspect the service upon completion and pay ₹{totalAmount} via Cash or UPI directly to {worker.name.split(" ")[0]}.
                </p>
              </div>

              <div className="pt-4 flex justify-between">
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
                  className="px-8"
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
            <div className="w-14 h-14 rounded-full overflow-hidden bg-cream-warm border border-cream-border flex-shrink-0">
              <img
                src={worker.imageUrl}
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
              <span className="text-charcoal-muted">Estimated Duration</span>
              <span className="font-medium text-charcoal">
                ~{selectedService?.durationMinutes || 45} mins
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Warranty</span>
              <span className="font-medium text-forest">30 Days Cooperative Assured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
