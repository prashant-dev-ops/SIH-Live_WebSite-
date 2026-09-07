import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs font-medium",
      md: "px-5 py-2.5 text-sm font-medium",
      lg: "px-6 py-3 text-base font-semibold",
    }[size];

    const variantClasses = {
      primary:
        "bg-forest text-white hover:bg-forest-hover border border-forest active:bg-forest-dark focus:ring-2 focus:ring-forest/20 shadow-subtle",
      secondary:
        "bg-cream text-charcoal hover:bg-cream-warm border border-cream-border active:bg-cream-warm/80 focus:ring-2 focus:ring-charcoal/10",
      outline:
        "border border-cream-border bg-transparent text-charcoal hover:bg-cream hover:border-charcoal/30 active:bg-cream-warm focus:ring-2 focus:ring-charcoal/10",
      ghost:
        "bg-transparent text-charcoal-muted hover:text-charcoal hover:bg-cream/70 active:bg-cream",
      accent:
        "bg-saffron text-white hover:bg-saffron-hover border border-saffron active:bg-saffron-hover/90 focus:ring-2 focus:ring-saffron/20 shadow-subtle",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-subtle cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
          sizeClasses,
          variantClasses,
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
