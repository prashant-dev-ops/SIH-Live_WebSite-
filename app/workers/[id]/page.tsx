import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { workerFeatureService } from "@/features/workers/worker.service";
import { reviewFeatureService } from "@/features/reviews/review.service";
import { WorkerProfileClient } from "@/features/workers/components/WorkerProfileClient";

interface WorkerPageProps {
  params: {
    id: string;
  };
}

export default async function WorkerProfilePage({ params }: WorkerPageProps) {
  const worker = await workerFeatureService.getWorkerById(params.id);

  if (!worker) {
    notFound();
  }

  const { reviews } = await reviewFeatureService.getReviewsForWorker(worker.id);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-muted mb-6">
          <Link href="/" className="hover:text-forest transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
          <Link
            href={`/services/${worker.categorySlug}`}
            className="hover:text-forest transition-colors capitalize"
          >
            {worker.categorySlug}s
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
          <span className="font-semibold text-charcoal">{worker.name}</span>
        </nav>

        <WorkerProfileClient worker={worker} reviews={reviews} />
      </div>
    </div>
  );
}
