import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceCategory } from "../service.types";

interface ServiceCardProps {
  service: ServiceCategory & { imageUrl: string };
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block bg-white rounded-xl border border-cream-border hover:border-forest/40 overflow-hidden transition-subtle hover:shadow-hover"
    >
      {/* Real photo */}
      <div className="relative h-44 w-full overflow-hidden bg-cream">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover img-zoom transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm text-charcoal font-semibold text-xs px-2.5 py-1 rounded-md border border-cream-border shadow-subtle">
          From ₹{service.startingPrice}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-base text-charcoal group-hover:text-forest transition-colors">
            {service.name}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-charcoal-muted group-hover:text-forest group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2 leading-relaxed">
          {service.shortDescription}
        </p>
        <div className="mt-3 pt-2.5 border-t border-cream-border/60 flex items-center justify-between text-[11px] text-charcoal-muted">
          <span>{service.activeWorkersCount} Guild Artisans</span>
          <span className="font-medium text-forest group-hover:underline">Browse verified →</span>
        </div>
      </div>
    </Link>
  );
}
