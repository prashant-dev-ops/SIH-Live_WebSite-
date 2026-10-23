import React from "react";
import Link from "next/link";
import { Star, ShieldCheck, Clock, MapPin, Briefcase } from "lucide-react";
import { WorkerViewModel } from "../worker.types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface WorkerCardProps {
  worker: WorkerViewModel;
  layout?: "grid" | "horizontal" | "list";
}

export function WorkerCard({ worker, layout = "grid" }: WorkerCardProps) {
  if (layout === "list") {
    return (
      <div className="group bg-white rounded-xl border border-cream-border hover:border-forest/40 p-5 transition-subtle hover:shadow-hover flex flex-col sm:flex-row gap-5">
        {/* Real photo */}
        <div className="relative w-full sm:w-44 h-48 sm:h-auto rounded-lg overflow-hidden flex-shrink-0 bg-cream-warm">
          <img
            src={worker.imageUrl || worker.image}
            alt={worker.name}
            className="w-full h-full object-cover img-zoom transition-transform duration-300"
            loading="lazy"
          />
          {worker.availableToday && (
            <div className="absolute top-2.5 left-2.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-600 text-white shadow-subtle inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Available Today
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-charcoal group-hover:text-forest transition-colors">
                  {worker.name}
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5 font-medium">{worker.trade}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <Badge variant="rating">
                  <Star className="w-3.5 h-3.5 fill-saffron text-saffron" />
                  <span>{worker.rating.toFixed(2)}</span>
                  <span className="text-charcoal-muted font-normal">({worker.reviewCount})</span>
                </Badge>
              </div>
            </div>

            {/* Cooperative verification affiliation */}
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-forest font-medium bg-forest-light/60 px-2.5 py-1 rounded-md border border-forest/15">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-forest" />
              <span className="truncate">{worker.cooperativeSociety}</span>
            </div>

            {/* Key stats row */}
            <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-charcoal-muted">
              <span className="inline-flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-charcoal-light" />
                <span>{worker.experienceYears} yrs experience</span>
              </span>
              <span className="text-cream-border">|</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-charcoal-light" />
                <span>{worker.distanceKm} km away</span>
              </span>
              <span className="text-cream-border">|</span>
              <span>{worker.jobsCompleted}+ jobs done</span>
            </div>

            {/* Skills chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {worker.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] bg-cream text-charcoal-muted border border-cream-border"
                >
                  {skill}
                </span>
              ))}
              {worker.skills.length > 3 && (
                <span className="text-[11px] text-charcoal-light self-center">
                  +{worker.skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Pricing & action footer */}
          <div className="mt-5 pt-3.5 border-t border-cream-border/70 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-charcoal-muted uppercase tracking-wider block">
                Starting from
              </span>
              <span className="text-lg font-bold text-charcoal">₹{worker.startingPrice}</span>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/workers/${worker.id}`}>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </Link>
              <Link href={`/booking/${worker.id}`}>
                <Button variant="primary" size="sm">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Card
  return (
    <div className="group bg-white rounded-xl border border-cream-border hover:border-forest/40 overflow-hidden transition-subtle hover:shadow-hover flex flex-col justify-between">
      <div>
        {/* Dominant Real Photo */}
        <div className="relative h-56 w-full overflow-hidden bg-cream-warm">
          <img
            src={worker.imageUrl || worker.image}
            alt={worker.name}
            className="w-full h-full object-cover img-zoom transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="verified" size="sm">
              <ShieldCheck className="w-3.5 h-3.5 text-forest" />
              <span>Cooperative Verified</span>
            </Badge>
          </div>

          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md border border-cream-border text-xs font-semibold text-charcoal flex items-center gap-1 shadow-subtle">
            <Star className="w-3 h-3 fill-saffron text-saffron" />
            <span>{worker.rating.toFixed(1)}</span>
            <span className="text-[10px] text-charcoal-muted font-normal">({worker.reviewCount})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-bold text-base text-charcoal group-hover:text-forest transition-colors">
            {worker.name}
          </h3>
          <p className="text-xs text-charcoal-muted font-medium mt-0.5">{worker.trade}</p>

          <p className="text-[11px] text-forest/90 font-medium mt-2 line-clamp-1">
            {worker.cooperativeSociety}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs text-charcoal-muted pt-2.5 border-t border-cream-border/60">
            <span>{worker.experienceYears} yrs experience</span>
            <span className="text-charcoal font-semibold">From ₹{worker.startingPrice}</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 pt-0">
        <Link href={`/workers/${worker.id}`} className="block w-full">
          <Button variant="outline" size="sm" fullWidth>
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
