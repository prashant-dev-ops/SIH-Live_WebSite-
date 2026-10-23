"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Search,
  CalendarCheck,
  User,
  Menu,
  X,
  ShieldCheck,
  Check,
} from "lucide-react";
import { POPULAR_LOCATIONS, APP_CONFIG } from "@/lib/constants";
import { Modal } from "./ui/Modal";
import { serviceFeatureService } from "@/features/services/service.service";
import { workerFeatureService } from "@/features/workers/worker.service";
import { ServiceCategory } from "@/features/services/service.types";
import { WorkerViewModel } from "@/features/workers/worker.types";

export function Navbar() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(POPULAR_LOCATIONS[0].name);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [allServices, setAllServices] = useState<ServiceCategory[]>([]);
  const [allWorkers, setAllWorkers] = useState<WorkerViewModel[]>([]);

  useEffect(() => {
    serviceFeatureService.listAllCategories().then(setAllServices);
    workerFeatureService.getAllWorkers().then(setAllWorkers);

    try {
      const savedCity = localStorage.getItem("sevasaathi_city");
      if (savedCity) setSelectedCity(savedCity);
    } catch {
      // ignore
    }
  }, []);

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setIsLocationModalOpen(false);
    try {
      localStorage.setItem("sevasaathi_city", city);
    } catch {
      // ignore
    }
  };

  const filteredServices = searchQuery.trim()
    ? allServices.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredWorkers = searchQuery.trim()
    ? allWorkers.filter(
        (w) =>
          w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.skills.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-cream-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Left: Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center text-white shadow-subtle group-hover:bg-forest-hover transition-colors">
                  <ShieldCheck className="w-5 h-5 text-cream" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-forest leading-none">
                    SevaSaathi
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-saffron mt-0.5">
                    Cooperative Guild
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Navigation links (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal">
              <Link
                href="/#services"
                className="text-charcoal hover:text-forest transition-colors py-1"
              >
                Services
              </Link>
              <Link
                href="/#how-it-works"
                className="text-charcoal hover:text-forest transition-colors py-1"
              >
                How It Works
              </Link>
              <Link
                href="/#for-workers"
                className="text-charcoal hover:text-forest transition-colors py-1"
              >
                For Workers
              </Link>
              <Link
                href="/#about"
                className="text-charcoal hover:text-forest transition-colors py-1"
              >
                About Us
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Location Selector */}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-charcoal-muted hover:text-charcoal bg-cream/70 hover:bg-cream border border-cream-border rounded-lg transition-colors"
                title="Change location"
              >
                <MapPin className="w-3.5 h-3.5 text-saffron" />
                <span className="font-semibold text-charcoal">{selectedCity}</span>
              </button>

              {/* Quick Search */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-charcoal-muted bg-warmwhite hover:bg-cream border border-cream-border rounded-lg transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-charcoal-light" />
                <span className="hidden xl:inline">Search services, electricians...</span>
                <span className="xl:hidden">Search...</span>
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] bg-cream-border/50 text-charcoal-muted rounded">
                  /
                </kbd>
              </button>

              {/* Booking History */}
              <Link
                href="/history"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-charcoal hover:text-forest hover:bg-cream/60 rounded-lg transition-colors border border-transparent hover:border-cream-border"
              >
                <CalendarCheck className="w-4 h-4 text-forest" />
                <span>Booking History</span>
              </Link>

              {/* Profile */}
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-cream hover:bg-cream-warm border border-cream-border text-charcoal transition-colors"
                title="Customer Profile"
                aria-label="Profile"
              >
                <User className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Actions: Search + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-charcoal bg-cream border border-cream-border rounded-lg"
              >
                <MapPin className="w-3.5 h-3.5 text-saffron" />
                <span>{selectedCity}</span>
              </button>
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 text-charcoal hover:bg-cream rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-charcoal hover:bg-cream rounded-lg transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-charcoal" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-cream-border px-4 pt-3 pb-5 space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-medium">
              <Link
                href="/#services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-charcoal hover:bg-cream transition-colors"
              >
                Services
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-charcoal hover:bg-cream transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#for-workers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-charcoal hover:bg-cream transition-colors"
              >
                For Workers
              </Link>
              <Link
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-charcoal hover:bg-cream transition-colors"
              >
                About Us
              </Link>
              <div className="pt-2 border-t border-cream-border flex flex-col gap-2">
                <Link
                  href="/history"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-forest font-semibold bg-forest-light/60"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>My Booking History</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsProfileModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-charcoal hover:bg-cream text-left"
                >
                  <User className="w-4 h-4 text-charcoal-muted" />
                  <span>Customer & Member Profile</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Location Selector Modal */}
      <Modal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        title="Select Your City"
        description="Connect with registered worker cooperative societies serving your locality."
        maxWidth="md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {POPULAR_LOCATIONS.map((loc) => {
            const isSelected = selectedCity === loc.name;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelectCity(loc.name)}
                className={`flex items-start justify-between p-3.5 rounded-lg border text-left transition-subtle ${
                  isSelected
                    ? "border-forest bg-forest-light text-forest"
                    : "border-cream-border bg-white hover:bg-cream hover:border-charcoal/30 text-charcoal"
                }`}
              >
                <div>
                  <div className="font-semibold text-sm flex items-center gap-1.5">
                    <MapPin
                      className={`w-3.5 h-3.5 ${
                        isSelected ? "text-forest" : "text-saffron"
                      }`}
                    />
                    <span>{loc.name}</span>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1">
                    {loc.state} · {loc.activeWorkers}+ verified guild members
                  </p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>
      </Modal>

      {/* Quick Search Modal */}
      <Modal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        title="Search Services & Cooperative Tradespeople"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-charcoal-light" />
            <input
              type="text"
              autoFocus
              placeholder="Search by trade (e.g. Electrician), name, or repair task..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-cream-border text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest bg-warmwhite"
            />
          </div>

          <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
            {searchQuery.trim() === "" ? (
              <div className="py-4 text-center text-xs text-charcoal-muted">
                Type keywords like &quot;Plumber&quot;, &quot;Ceiling Fan&quot;, or worker names to find verified guild members.
              </div>
            ) : (
              <>
                {filteredServices.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-2">
                      Service Categories
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filteredServices.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => {
                            setIsSearchModalOpen(false);
                            router.push(`/services/${srv.slug}`);
                          }}
                          className="flex items-center gap-3 p-2.5 rounded-lg border border-cream-border hover:bg-cream hover:border-forest/40 text-left transition-colors"
                        >
                          <div className="w-8 h-8 rounded bg-forest-light flex items-center justify-center text-forest font-bold text-xs">
                            {srv.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-charcoal">{srv.name}</p>
                            <p className="text-xs text-charcoal-muted">Starts from ₹{srv.startingPrice}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredWorkers.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-2">
                      Verified Workers
                    </h4>
                    <div className="space-y-2">
                      {filteredWorkers.map((w) => (
                        <button
                          key={w.id}
                          onClick={() => {
                            setIsSearchModalOpen(false);
                            router.push(`/workers/${w.id}`);
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-lg border border-cream-border hover:bg-cream hover:border-forest/40 text-left transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-cream-warm flex-shrink-0">
                              <img
                                src={w.imageUrl}
                                alt={w.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-charcoal flex items-center gap-1.5">
                                <span>{w.name}</span>
                                <span className="text-[11px] px-1.5 py-0.5 rounded bg-forest-light text-forest">
                                  ★ {w.rating}
                                </span>
                              </p>
                              <p className="text-xs text-charcoal-muted">
                                {w.trade} · {w.cooperativeSociety}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-forest">View Profile →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredServices.length === 0 && filteredWorkers.length === 0 && (
                  <p className="text-center py-6 text-sm text-charcoal-muted">
                    No results found for &quot;{searchQuery}&quot;. Try another term.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </Modal>

      {/* Customer Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Community Member Profile"
        description="SevaSaathi operates under cooperative principles with zero hidden surcharges."
        maxWidth="md"
      >
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-xl bg-cream border border-cream-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest text-white font-bold text-lg flex items-center justify-center">
              RS
            </div>
            <div>
              <p className="font-bold text-charcoal text-base">Rahul Sharma</p>
              <p className="text-xs text-charcoal-muted">+91 98450 12345 · Bengaluru</p>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Cooperative Beneficiary</span>
              </div>
            </div>
          </div>

          <div className="border-t border-cream-border pt-3 space-y-2">
            <div className="flex justify-between py-1 text-xs">
              <span className="text-charcoal-muted">Active City</span>
              <span className="font-semibold text-charcoal">{selectedCity}</span>
            </div>
            <div className="flex justify-between py-1 text-xs">
              <span className="text-charcoal-muted">Booking Reservations Paid</span>
              <span className="font-semibold text-forest">₹150 (3 bookings at ₹50)</span>
            </div>
            <div className="flex justify-between py-1 text-xs">
              <span className="text-charcoal-muted">Cooperative Federation</span>
              <span className="font-semibold text-charcoal text-right max-w-[200px] truncate">
                {APP_CONFIG.cooperativeFederation}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/history"
              onClick={() => setIsProfileModalOpen(false)}
              className="block w-full py-2.5 text-center text-sm font-semibold rounded-lg bg-forest text-white hover:bg-forest-hover transition-colors"
            >
              View My Bookings
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
