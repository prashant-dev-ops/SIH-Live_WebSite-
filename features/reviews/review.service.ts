import { IReviewRepository, reviewRepository } from "./review.repository";
import { Review, WorkerReviewSummary } from "./review.types";
import { IMAGES } from "@/data/images";

export class ReviewFeatureService {
  constructor(private repo: IReviewRepository = reviewRepository) {}

  async getReviewsForWorker(workerId: string): Promise<WorkerReviewSummary> {
    const list = await this.repo.getByWorkerId(workerId);
    if (list.length === 0) {
      return {
        averageRating: 5.0,
        totalReviews: 0,
        reviews: [],
      };
    }

    const sum = list.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = Number((sum / list.length).toFixed(1));

    return {
      averageRating: avg,
      totalReviews: list.length,
      reviews: list,
    };
  }

  async getFeaturedTestimonials(): Promise<(Review & { avatarUrl: string })[]> {
    const testimonials = await this.repo.getTopTestimonials(3);
    const avatars = [IMAGES.testimonials.t1, IMAGES.testimonials.t2, IMAGES.testimonials.t3];

    return testimonials.map((t, idx) => ({
      ...t,
      avatarUrl: avatars[idx % avatars.length],
    }));
  }
}

export const reviewFeatureService = new ReviewFeatureService();
