import { MOCK_WORKERS, Worker } from "@/data/workers";
import { WorkerFilterCriteria } from "./worker.types";

export interface IWorkerRepository {
  getAll(): Promise<Worker[]>;
  getById(id: string): Promise<Worker | null>;
  getByCategory(categorySlug: string): Promise<Worker[]>;
  filter(criteria: WorkerFilterCriteria): Promise<Worker[]>;
}

export class MockWorkerRepository implements IWorkerRepository {
  async getAll(): Promise<Worker[]> {
    return [...MOCK_WORKERS];
  }

  async getById(id: string): Promise<Worker | null> {
    const worker = MOCK_WORKERS.find((w) => w.id === id);
    return worker ? { ...worker } : null;
  }

  async getByCategory(categorySlug: string): Promise<Worker[]> {
    const slug = categorySlug.toLowerCase();
    return MOCK_WORKERS.filter((w) => w.categorySlug.toLowerCase() === slug);
  }

  async filter(criteria: WorkerFilterCriteria): Promise<Worker[]> {
    let result = [...MOCK_WORKERS];

    if (criteria.categorySlug && criteria.categorySlug !== "all") {
      result = result.filter(
        (w) => w.categorySlug.toLowerCase() === criteria.categorySlug?.toLowerCase()
      );
    }

    if (criteria.availableOnly) {
      result = result.filter((w) => w.availableToday);
    }

    if (criteria.minRating && criteria.minRating > 0) {
      result = result.filter((w) => w.rating >= criteria.minRating!);
    }

    if (criteria.maxPrice && criteria.maxPrice > 0) {
      result = result.filter((w) => w.startingPrice <= criteria.maxPrice!);
    }

    if (criteria.minExperience && criteria.minExperience > 0) {
      result = result.filter((w) => w.experienceYears >= criteria.minExperience!);
    }

    if (criteria.searchQuery && criteria.searchQuery.trim()) {
      const q = criteria.searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.trade.toLowerCase().includes(q) ||
          w.cooperativeSociety.toLowerCase().includes(q) ||
          w.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Sort
    if (criteria.sortBy) {
      switch (criteria.sortBy) {
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
    }

    return result;
  }
}

export const workerRepository = new MockWorkerRepository();
