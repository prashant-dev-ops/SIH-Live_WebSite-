"use client";

import React from "react";
import { Filter, Star, Clock, ArrowUpDown } from "lucide-react";
import { SortOption } from "@/types/common";

interface ServiceFilterBarProps {
  minRating: number;
  setMinRating: (rating: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  availableOnly: boolean;
  setAvailableOnly: (available: boolean) => void;
  minExperience: number;
  setMinExperience: (years: number) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  totalResults: number;
}

export function ServiceFilterBar({
  minRating,
  setMinRating,
  maxPrice,
  setMaxPrice,
  availableOnly,
  setAvailableOnly,
  minExperience,
  setMinExperience,
  sortBy,
  setSortBy,
  totalResults,
}: ServiceFilterBarProps) {
  const hasActiveFilters =
    minRating > 0 || maxPrice < 2000 || availableOnly || minExperience > 0;

  const resetFilters = () => {
    setMinRating(0);
    setMaxPrice(2000);
    setAvailableOnly(false);
    setMinExperience(0);
    setSortBy("recommended");
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-cream-border shadow-subtle mb-6 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Quick filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <span className="font-semibold text-charcoal flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-forest" />
            <span>Filter:</span>
          </span>

          {/* Availability Toggle */}
          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors flex items-center gap-1.5 ${
              availableOnly
                ? "bg-forest text-white border-forest"
                : "bg-cream text-charcoal border-cream-border hover:bg-cream-warm"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Available Today</span>
          </button>

          {/* Rating filter */}
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border border-cream-border bg-cream text-charcoal text-xs font-medium focus:outline-none focus:border-forest"
          >
            <option value="0">All Ratings</option>
            <option value="4.8">★ 4.8 & Above</option>
            <option value="4.9">★ 4.9 & Above</option>
          </select>

          {/* Experience filter */}
          <select
            value={minExperience}
            onChange={(e) => setMinExperience(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border border-cream-border bg-cream text-charcoal text-xs font-medium focus:outline-none focus:border-forest"
          >
            <option value="0">Any Experience</option>
            <option value="5">5+ Years Exp</option>
            <option value="10">10+ Years Exp</option>
          </select>

          {/* Max Price filter */}
          <div className="flex items-center gap-1.5 bg-cream px-3 py-1.5 rounded-lg border border-cream-border">
            <span className="text-charcoal-muted">Max:</span>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="bg-transparent text-charcoal font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="2000">Any Price</option>
              <option value="300">Under ₹300</option>
              <option value="500">Under ₹500</option>
              <option value="800">Under ₹800</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-saffron hover:underline font-medium py-1 px-1.5"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Right: Sort & Count */}
        <div className="flex items-center justify-between lg:justify-end gap-3 text-xs border-t lg:border-t-0 pt-3 lg:pt-0 border-cream-border/60">
          <span className="text-charcoal-muted">
            <strong className="text-charcoal font-semibold">{totalResults}</strong> verified workers
          </span>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-charcoal-light" />
            <span className="text-charcoal-muted hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-2.5 py-1.5 rounded-lg border border-cream-border bg-warmwhite text-charcoal text-xs font-medium focus:outline-none focus:border-forest cursor-pointer"
            >
              <option value="recommended">Cooperative Recommended</option>
              <option value="rating_desc">Highest Rated</option>
              <option value="price_asc">Lowest Starting Price</option>
              <option value="experience_desc">Most Experienced</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
