import { Review } from "@/data/reviews";

export type { Review };

export interface WorkerReviewSummary {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}
