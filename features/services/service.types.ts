import { SubServiceItem, ServiceCategory } from "@/data/services";

export type { SubServiceItem, ServiceCategory };

export interface ServiceSummary {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  imageKey: string;
  imageUrl: string;
  startingPrice: number;
  activeWorkersCount: number;
}
