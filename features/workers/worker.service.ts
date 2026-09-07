import { IWorkerRepository, workerRepository } from "./worker.repository";
import { WorkerFilterCriteria, WorkerViewModel } from "./worker.types";
import { IMAGES, WorkerImageKey } from "@/data/images";

export class WorkerFeatureService {
  constructor(private repo: IWorkerRepository = workerRepository) {}

  private mapToViewModel(worker: import("@/data/workers").Worker): WorkerViewModel {
    return {
      ...worker,
      imageUrl: IMAGES.workers[worker.imageKey as WorkerImageKey] || IMAGES.hero.workerAtWork,
    };
  }

  async getAllWorkers(): Promise<WorkerViewModel[]> {
    const list = await this.repo.getAll();
    return list.map(this.mapToViewModel);
  }

  async getFeaturedWorkers(limit = 6): Promise<WorkerViewModel[]> {
    const list = await this.repo.getAll();
    const sorted = [...list].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    return sorted.slice(0, limit).map(this.mapToViewModel);
  }

  async getWorkerById(id: string): Promise<WorkerViewModel | null> {
    const worker = await this.repo.getById(id);
    if (!worker) return null;
    return this.mapToViewModel(worker);
  }

  async getWorkersByCategory(categorySlug: string): Promise<WorkerViewModel[]> {
    const list = await this.repo.getByCategory(categorySlug);
    return list.map(this.mapToViewModel);
  }

  async filterWorkers(criteria: WorkerFilterCriteria): Promise<WorkerViewModel[]> {
    const list = await this.repo.filter(criteria);
    return list.map(this.mapToViewModel);
  }
}

export const workerFeatureService = new WorkerFeatureService();
