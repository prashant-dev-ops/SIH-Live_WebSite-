import { IServiceRepository, serviceRepository } from "./service.repository";
import { ServiceCategory } from "./service.types";
import { IMAGES, ServiceImageKey } from "@/data/images";

export class ServiceFeatureService {
  constructor(private repo: IServiceRepository = serviceRepository) {}

  async listAllCategories(): Promise<(ServiceCategory & { imageUrl: string })[]> {
    const categories = await this.repo.getAllServices();
    return categories.map((cat) => ({
      ...cat,
      imageUrl: IMAGES.services[cat.imageKey as ServiceImageKey] || IMAGES.hero.workerAtWork,
    }));
  }

  async getCategoryBySlug(slug: string): Promise<(ServiceCategory & { imageUrl: string }) | null> {
    const category = await this.repo.getServiceBySlug(slug);
    if (!category) return null;
    return {
      ...category,
      imageUrl: IMAGES.services[category.imageKey as ServiceImageKey] || IMAGES.hero.workerAtWork,
    };
  }

  async search(query: string): Promise<(ServiceCategory & { imageUrl: string })[]> {
    const categories = await this.repo.searchServices(query);
    return categories.map((cat) => ({
      ...cat,
      imageUrl: IMAGES.services[cat.imageKey as ServiceImageKey] || IMAGES.hero.workerAtWork,
    }));
  }
}

export const serviceFeatureService = new ServiceFeatureService();
