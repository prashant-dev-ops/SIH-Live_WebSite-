import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Check } from "lucide-react";
import { serviceFeatureService } from "@/features/services/service.service";
import { workerFeatureService } from "@/features/workers/worker.service";
import { WorkerListingClient } from "@/features/workers/components/WorkerListingClient";

interface ServicePageProps {
  params: {
    category: string;
  };
}

export default async function ServiceListingPage({ params }: ServicePageProps) {
  const categorySlug = params.category;
  const service = await serviceFeatureService.getCategoryBySlug(categorySlug);

  if (!service) {
    notFound();
  }

  const workers = await workerFeatureService.getWorkersByCategory(categorySlug);
  // If fewer workers in category, fetch all workers so the page is populated
  const displayWorkers =
    workers.length > 0
      ? workers
      : await workerFeatureService.getAllWorkers();

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-muted mb-6">
          <Link href="/" className="hover:text-forest transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
          <Link href="/#services" className="hover:text-forest transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
          <span className="font-semibold text-charcoal">{service.name}</span>
        </nav>

        {/* Category Header Banner */}
        <div className="bg-cream rounded-2xl border border-cream-border p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest bg-forest-light px-2.5 py-1 rounded-md border border-forest/15">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                <span>Verified Cooperative Guild</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-charcoal">
                {service.name}s near you
              </h1>
              <p className="text-sm text-charcoal-muted max-w-2xl leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Sub-services pills */}
            <div className="md:col-span-4 bg-white/80 p-4 rounded-xl border border-cream-border/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted block mb-2">
                Standard Itemized Services:
              </span>
              <ul className="space-y-1.5 text-xs text-charcoal">
                {service.subServices.slice(0, 3).map((sub) => (
                  <li key={sub.id} className="flex items-center justify-between">
                    <span className="flex items-center gap-1 truncate mr-2">
                      <Check className="w-3 h-3 text-forest flex-shrink-0" />
                      <span className="truncate">{sub.name}</span>
                    </span>
                    <span className="font-semibold text-forest whitespace-nowrap">
                      ₹{sub.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Filter and 2-Column Worker Grid */}
        <WorkerListingClient
          initialWorkers={displayWorkers}
          categoryName={service.name}
        />
      </div>
    </div>
  );
}
