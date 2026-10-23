/**
 * Centralized Real Photography Image Registry
 * All photography URLs are sourced from real-life, natural lighting captures of working service professionals.
 * Shows tradespeople actively performing or associated with their profession.
 * Never use studio glamour model portraits, AI-generated illustrations, or generic stock art.
 */

export const IMAGES = {
  // Hero section - Real skilled Indian tradesperson working with electrical components
  hero: {
    workerAtWork:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    alt: "Skilled cooperative electrician working on residential electrical board",
  },

  // Service categories
  services: {
    electrician:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    plumber:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
    carpenter:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    painter:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    cleaning:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    driver:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    gardener:
      "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80",
    caregiver:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    "appliance-repair":
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "pest-control":
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
  },

  // Workers - Real photographs of working service professionals mid-task or with tools
  workers: {
    // Ramesh Kumar - Electrician with tools working on residential board
    "w-1":
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    // Suresh Sharma - Plumber working with pipe wrench under sink
    "w-2":
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    // Manoj Vishwakarma - Carpenter working with hand plane & wood in workshop
    "w-3":
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    // Rajesh Verma - Painter with roller painting residential wall
    "w-4":
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    // Sunita Devi - Sanitation & cleaning specialist wiping kitchen surfaces
    "w-5":
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    // Dinesh Yadav - Professional chauffeur behind the wheel
    "w-6":
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    // Ramlal Mali - Gardener with pruning shears tending plants
    "w-7":
      "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80",
    // Lakshmi Nair - Caregiver assisting elderly person with gentle companionship
    "w-8":
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    // Anil Kulkarni - Appliance technician diagnosing appliance components with tools
    "w-9":
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    // Vikram Chauhan - Pest control technician spraying safety treatment
    "w-10":
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    // Pradeep Patil - Electrician working on open distribution circuit breaker
    "w-11":
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    // Geeta Bai - Cleaning professional deep cleaning domestic bathroom & tiles
    "w-12":
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  },

  // Testimonial customers
  testimonials: {
    t1:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    t2:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    t3:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },

  cooperativeShield: "/coop-badge.svg",
} as const;

export type ServiceImageKey = keyof typeof IMAGES.services;
export type WorkerImageKey = keyof typeof IMAGES.workers;
