import React from "react";
import { ServiceCard } from "./ServiceCard";
import { ServiceCategory } from "../service.types";

interface ServiceGridProps {
  services: (ServiceCategory & { imageUrl: string })[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
