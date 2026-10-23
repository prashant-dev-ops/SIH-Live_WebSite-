/**
 * Centralized Application & Booking Configuration
 * All booking amounts and cooperative federation metadata are controlled here.
 */

export const BOOKING_CONFIG = {
  bookingAmount: 50, // Centralized advance booking reservation fee (INR 50)
};

export const BOOKING_AMOUNT = BOOKING_CONFIG.bookingAmount;

export const APP_CONFIG = {
  name: "SevaSaathi",
  tagline: "Trusted Services. Skilled People. Fair Work.",
  description:
    "A cooperative gig-services marketplace connecting customers with verified workers who belong to registered cooperative societies.",
  cooperativeFederation: "Federation of Self-Employed Cooperative Guilds (Reg. No. MH/COOP/2021/489)",
  bookingAmount: 50, // Centralized booking reservation amount to confirm appointment
  supportPhone: "+91 1800 209 7382",
  supportEmail: "support@sevasaathi.coop",
};

export const POPULAR_LOCATIONS = [
  { id: "blr", name: "Bengaluru", state: "Karnataka", activeWorkers: 1240 },
  { id: "pune", name: "Pune", state: "Maharashtra", activeWorkers: 890 },
  { id: "del", name: "Delhi NCR", state: "Delhi", activeWorkers: 1530 },
  { id: "mum", name: "Mumbai", state: "Maharashtra", activeWorkers: 1420 },
  { id: "hyd", name: "Hyderabad", state: "Telangana", activeWorkers: 780 },
  { id: "jpr", name: "Jaipur", state: "Rajasthan", activeWorkers: 520 },
];
