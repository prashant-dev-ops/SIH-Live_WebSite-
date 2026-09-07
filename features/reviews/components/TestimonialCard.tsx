import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Review } from "../review.types";

interface TestimonialCardProps {
  testimonial: Review & { avatarUrl: string };
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl border border-cream-border p-6 shadow-subtle flex flex-col justify-between">
      <div>
        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? "fill-saffron text-saffron"
                  : "text-cream-border"
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm text-charcoal leading-relaxed italic">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-cream-border/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-cream-warm flex-shrink-0">
            <img
              src={testimonial.avatarUrl}
              alt={testimonial.customerName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h4 className="text-sm font-bold text-charcoal">{testimonial.customerName}</h4>
            <p className="text-xs text-charcoal-muted">{testimonial.customerLocation}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-forest font-medium bg-forest-light px-2 py-0.5 rounded">
          <CheckCircle2 className="w-3 h-3" />
          <span>Verified Service</span>
        </div>
      </div>
    </div>
  );
}
