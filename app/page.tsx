import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  Coins,
  CheckCircle,
  Award,
} from "lucide-react";
import { IMAGES } from "@/data/images";
import { serviceFeatureService } from "@/features/services/service.service";
import { workerFeatureService } from "@/features/workers/worker.service";
import { reviewFeatureService } from "@/features/reviews/review.service";
import { ServiceGrid } from "@/features/services/components/ServiceGrid";
import { WorkerCard } from "@/features/workers/components/WorkerCard";
import { TestimonialCard } from "@/features/reviews/components/TestimonialCard";
import { POPULAR_LOCATIONS } from "@/lib/constants";

// Server Component fetching from Feature Services
export default async function HomePage() {
  const [services, featuredWorkers, testimonials] = await Promise.all([
    serviceFeatureService.listAllCategories(),
    workerFeatureService.getFeaturedWorkers(4),
    reviewFeatureService.getFeaturedTestimonials(),
  ]);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 lg:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtext, Search + Location Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-forest-light border border-forest/20 text-xs font-semibold text-forest">
                <ShieldCheck className="w-4 h-4 text-forest" />
                <span>100% Cooperative Guild Certified Tradespeople</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal leading-[1.12]">
                Skilled help, <br />
                <span className="text-forest">right at your doorstep.</span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl leading-relaxed">
                Book verified workers from trusted cooperative societies for your everyday home
                and community needs. Fair rates, direct wages, and guaranteed trade craftsmanship.
              </p>

              {/* Dual Search + Location Bar */}
              <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-cream-border shadow-subtle flex flex-col sm:flex-row items-stretch gap-2">
                <div className="flex items-center gap-2 px-3 py-2 sm:py-1 border-b sm:border-b-0 sm:border-r border-cream-border flex-1">
                  <Search className="w-4 h-4 text-charcoal-light flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g. Electrician, Fan repair, Plumber..."
                    className="w-full text-sm text-charcoal placeholder-charcoal-light focus:outline-none bg-transparent"
                    readOnly
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-2 sm:py-1 sm:w-44">
                  <MapPin className="w-4 h-4 text-saffron flex-shrink-0" />
                  <select
                    defaultValue="blr"
                    className="w-full text-sm font-medium text-charcoal bg-transparent focus:outline-none cursor-pointer"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Link
                  href="/services/electrician"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-forest text-white font-semibold text-sm hover:bg-forest-hover transition-colors shadow-subtle text-center whitespace-nowrap"
                >
                  Find a Service
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-charcoal-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-forest" />
                  <span>90% direct to workers</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-forest" />
                  <span>Verified cooperative IDs</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-forest" />
                  <span>Same-day slots available</span>
                </span>
              </div>
            </div>

            {/* Right Column: Prominent Real Photograph */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative subtle border frame */}
                <div className="relative rounded-2xl overflow-hidden border border-cream-border shadow-card bg-cream">
                  <img
                    src={IMAGES.hero.workerAtWork}
                    alt={IMAGES.hero.alt}
                    className="w-full h-[400px] sm:h-[480px] object-cover"
                    loading="eager"
                  />
                  {/* Real worker badge overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-cream-border/80 shadow-subtle flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-forest">
                        Active Guild Member
                      </p>
                      <p className="text-sm font-bold text-charcoal mt-0.5">
                        Ramesh Kumar · Master Electrician
                      </p>
                      <p className="text-xs text-charcoal-muted">
                        Bangalore Urban Electricians Self-Help Guild
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-forest-light flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-forest" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR SERVICES SECTION */}
      <section id="services" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cream-border/70 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron">
                Registered Trades
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mt-1">
                What service do you need?
              </h2>
            </div>
            <p className="text-sm text-charcoal-muted max-w-md">
              Every category is staffed solely by registered cooperative guild members trained in
              safety, fixed standard rates, and genuine parts.
            </p>
          </div>

          <ServiceGrid services={services} />
        </div>
      </section>

      {/* 3. HOW SEVASAATHI WORKS SECTION */}
      <section id="how-it-works" className="bg-cream py-16 border-y border-cream-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-forest">
              Simple & Transparent
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mt-1">
              Getting help is simple
            </h2>
            <p className="text-sm text-charcoal-muted mt-2">
              Unlike private aggregator apps with hidden surge pricing, SevaSaathi guarantees
              fair wages and upfront cooperative union tariff schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border border-cream-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-forest text-white font-bold text-base flex items-center justify-center mb-4">
                  01
                </div>
                <h3 className="font-bold text-base text-charcoal">Choose a service</h3>
                <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                  Browse 10 essential home and community trade categories with fixed, cooperative-negotiated itemized rates.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-border/50 text-[11px] text-forest font-semibold">
                No surge pricing
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border border-cream-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-forest text-white font-bold text-base flex items-center justify-center mb-4">
                  02
                </div>
                <h3 className="font-bold text-base text-charcoal">Select a verified worker</h3>
                <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                  Compare ratings, years of craft experience, distance, and government cooperative guild society licenses.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-border/50 text-[11px] text-forest font-semibold">
                Real identities & licenses
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border border-cream-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-forest text-white font-bold text-base flex items-center justify-center mb-4">
                  03
                </div>
                <h3 className="font-bold text-base text-charcoal">Pick a convenient time</h3>
                <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                  Reserve a real-time slot that fits your schedule. Same-day emergency and scheduled morning/evening slots.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-border/50 text-[11px] text-forest font-semibold">
                Punctual arrivals
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-xl border border-cream-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-forest text-white font-bold text-base flex items-center justify-center mb-4">
                  04
                </div>
                <h3 className="font-bold text-base text-charcoal">Get the job done</h3>
                <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                  Work is carried out with care. Pay transparently with 90% direct transfer to the worker&apos;s cooperative bank.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-border/50 text-[11px] text-forest font-semibold">
                Cooperative warranty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED COOPERATIVE WORKERS SECTION */}
      <section className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cream-border/70 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest">
                The Hands Behind The Service
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mt-1">
                Meet skilled people you can trust
              </h2>
            </div>
            <Link
              href="/services/electrician"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-hover"
            >
              <span>Explore all verified workers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} layout="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY SEVASAATHI SECTION */}
      <section id="for-workers" className="bg-cream py-16 border-y border-cream-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron">
              Cooperative Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mt-1">
              Better work for everyone
            </h2>
            <p className="text-sm text-charcoal-muted mt-2">
              Built on cooperative federation bylaws that protect both households and workers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-cream-border">
              <div className="w-10 h-10 rounded-lg bg-forest-light text-forest flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-charcoal">Verified Workers</h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                Background-checked by local cooperative committees and registered with verifiable guild society IDs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-cream-border">
              <div className="w-10 h-10 rounded-lg bg-saffron-light text-saffron flex items-center justify-center mb-4">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-charcoal">Fair 90% Direct Wages</h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                No 30–40% predatory aggregator cuts. Skilled workers keep 90% of earnings, building lasting financial security.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-cream-border">
              <div className="w-10 h-10 rounded-lg bg-forest-light text-forest flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-charcoal">Trusted Standard Rates</h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                Itemized pricing standard across neighborhoods. No bargaining stress, no unexpected post-job extras.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-cream-border">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-charcoal">Community First</h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                A tiny ₹25 welfare fund on every booking supports artisan health coverage and emergency trade loans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST / TESTIMONIALS SECTION */}
      <section id="about" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-forest">
              Real Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mt-1">
              Voices from our community
            </h2>
            <p className="text-sm text-charcoal-muted mt-2">
              See what homeowners say about booking through their neighborhood cooperative guild.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
