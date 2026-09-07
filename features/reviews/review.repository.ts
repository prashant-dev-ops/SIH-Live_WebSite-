import { MOCK_REVIEWS, Review } from "@/data/reviews";

export interface IReviewRepository {
  getAll(): Promise<Review[]>;
  getByWorkerId(workerId: string): Promise<Review[]>;
  getTopTestimonials(limit?: number): Promise<Review[]>;
}

export class MockReviewRepository implements IReviewRepository {
  async getAll(): Promise<Review[]> {
    return [...MOCK_REVIEWS];
  }

  async getByWorkerId(workerId: string): Promise<Review[]> {
    return MOCK_REVIEWS.filter((r) => r.workerId === workerId);
  }

  async getTopTestimonials(limit = 3): Promise<Review[]> {
    return MOCK_REVIEWS.slice(0, limit);
  }
}

export const reviewRepository = new MockReviewRepository();
