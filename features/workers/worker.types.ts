import { Worker, WorkerServiceOffering } from "@/data/workers";
import { SortOption } from "@/types/common";

export type { Worker, WorkerServiceOffering };

export interface WorkerFilterCriteria {
  categorySlug?: string;
  minRating?: number;
  maxPrice?: number;
  availableOnly?: boolean;
  minExperience?: number;
  searchQuery?: string;
  sortBy?: SortOption;
}

export interface WorkerViewModel extends Worker {
  imageUrl: string;
}
