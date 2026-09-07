"use client";

import React, { useState, useMemo } from "react";
import { WorkerViewModel } from "../worker.types";
import { WorkerCard } from "./WorkerCard";
import { ServiceFilterBar } from "@/features/services/components/ServiceFilterBar";
import { SortOption } from "@/types/common";
import { UserCheck } from "lucide-react";

interface WorkerListingClientProps {
  initialWorkers: WorkerViewModel[];
  categoryName: string;
}

export function WorkerListingClient({
  initialWorkers,
  categoryName,
}: WorkerListingClientProps) {
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [minExperience, setMinExperience] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  const filteredAndSortedWorkers = useMemo(() => {
    let result = [...initialWorkers];

    if (availableOnly) {
      result = result.filter((w) => w.availableToday);
    }
    if (minRating > 0) {
      result = result.filter((w) => w.rating >= minRating);
    }
    if (maxPrice < 2000) {
      result = result.filter((w) => w.startingPrice <= maxPrice);
    }
    if (minExperience > 0) {
      result = result.filter((w) => w.experienceYears >= minExperience);
    }

    switch (sortBy) {
      case "rating_desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price_asc":
        result.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "experience_desc":
        result.sort((a, b) => b.experienceYears - a.experienceYears);
        break;
      case "recommended":
      default:
        result.sort((a, b) => b.rating * b.jobsCompleted - a.rating * a.jobsCompleted);
        break;
    }

    return result;
  }, [initialWorkers, availableOnly, minRating, maxPrice, minExperience, sortBy]);

  return (
    <div>
      <ServiceFilterBar
        minRating={minRating}
        setMinRating={setMinRating}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        availableOnly={availableOnly}
        setAvailableOnly={setAvailableOnly}
        minExperience={minExperience}
        setMinExperience={setMinExperience}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={filteredAndSortedWorkers.length}
      />

      {filteredAndSortedWorkers.length === 0 ? (
        <div className="bg-white rounded-xl border border-cream-border p-12 text-center my-8">
          <div className="w-12 h-12 rounded-full bg-cream mx-auto flex items-center justify-center text-charcoal-muted mb-3">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-charcoal">No verified workers match this filter</h3>
          <p className="text-xs text-charcoal-muted mt-1 max-w-sm mx-auto">
            Try adjusting your rating or experience filters to view more guild professionals in {categoryName}.
          </p>
        </div>
      ) : (
        /* Two-column layout on desktop; do not overcrowd cards */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredAndSortedWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}
