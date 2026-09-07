import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { workerFeatureService } from "@/features/workers/worker.service";
import { BookingWizard } from "@/features/bookings/components/BookingWizard";

interface BookingPageProps {
  params: {
    workerId: string;
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const worker = await workerFeatureService.getWorkerById(params.workerId);

  if (!worker) {
    notFound();
  }

  return (
    <div className="py-8 sm:py-12 bg-warmwhite min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-muted mb-6">
          <Link href="/" className="hover:text-forest transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
          <Link href={`/workers/${worker.id}`} className="hover:text-forest transition-colors">
            {worker.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
          <span className="font-semibold text-charcoal">Schedule & Book</span>
        </nav>

        <BookingWizard worker={worker} />
      </div>
    </div>
  );
}
