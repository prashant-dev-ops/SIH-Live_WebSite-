import { MOCK_SERVICES } from "@/data/services";
import { IMAGES } from "@/data/images";
import { ServiceCategory } from "./service.types";

export interface IServiceRepository {
  getAllServices(): Promise<ServiceCategory[]>;
  getServiceBySlug(slug: string): Promise<ServiceCategory | null>;
  getServiceById(id: string): Promise<ServiceCategory | null>;
  searchServices(query: string): Promise<ServiceCategory[]>;
}

export class MockServiceRepository implements IServiceRepository {
  async getAllServices(): Promise<ServiceCategory[]> {
    return [...MOCK_SERVICES];
  }

  async getServiceBySlug(slug: string): Promise<ServiceCategory | null> {
    const service = MOCK_SERVICES.find(
      (s) => s.slug.toLowerCase() === slug.toLowerCase()
    );
    return service ? { ...service } : null;
  }

  async getServiceById(id: string): Promise<ServiceCategory | null> {
    const service = MOCK_SERVICES.find((s) => s.id === id);
    return service ? { ...service } : null;
  }

  async searchServices(query: string): Promise<ServiceCategory[]> {
    const q = query.toLowerCase().trim();
    if (!q) return [...MOCK_SERVICES];
    return MOCK_SERVICES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.subServices.some((sub) => sub.name.toLowerCase().includes(q))
    );
  }
}

// Singleton repository instance for mock data
export const serviceRepository = new MockServiceRepository();
