import React from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, Star } from "lucide-react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "verified" | "available" | "rating" | "secondary" | "outline" | "neutral";
  size?: "sm" | "md";
  children?: React.ReactNode;
}

export function Badge({
  variant = "secondary",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm";

  const variantClasses = {
    verified:
      "bg-forest-light text-forest border border-forest/20 font-medium inline-flex items-center gap-1",
    available:
      "bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium inline-flex items-center gap-1",
    rating:
      "bg-saffron-light text-saffron-hover border border-saffron/20 font-semibold inline-flex items-center gap-1",
    secondary:
      "bg-cream text-charcoal-muted border border-cream-border font-medium",
    outline:
      "border border-charcoal/15 text-charcoal-muted bg-transparent font-medium",
    neutral:
      "bg-neutral-100 text-charcoal border border-neutral-200 font-medium",
  }[variant];

  return (
    <span
      className={cn(
        "rounded-md inline-flex items-center tracking-tight",
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {variant === "verified" && !children && (
        <>
          <ShieldCheck className="w-3.5 h-3.5 text-forest" />
          <span>Cooperative Verified</span>
        </>
      )}
      {variant === "verified" && children && (
        <>
          <ShieldCheck className="w-3.5 h-3.5 text-forest" />
          {children}
        </>
      )}
      {variant === "rating" && !children && (
        <>
          <Star className="w-3 h-3 fill-saffron text-saffron" />
        </>
      )}
      {variant !== "verified" && children}
    </span>
  );
}
