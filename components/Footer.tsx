import React from "react";
import Link from "next/link";
import { ShieldCheck, Phone, Mail, MapPin, Heart } from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-cream border-t border-cream-border/80 text-charcoal mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: About & Cooperative Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4 text-cream" />
              </div>
              <span className="text-xl font-bold tracking-tight text-forest">
                SevaSaathi
              </span>
            </div>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              A cooperative gig-services marketplace connecting customers with verified workers
              who belong to registered cooperative societies. 90% of service charges go directly
              to skilled guild members.
            </p>
            <div className="pt-2 text-xs text-charcoal-muted">
              <p className="font-semibold text-charcoal">Registered Federation:</p>
              <p className="mt-0.5">{APP_CONFIG.cooperativeFederation}</p>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-charcoal mb-4">
              Cooperative Trades
            </h3>
            <ul className="space-y-2.5 text-sm text-charcoal-muted">
              <li>
                <Link href="/services/electrician" className="hover:text-forest transition-colors">
                  Electricians & Wiremen
                </Link>
              </li>
              <li>
                <Link href="/services/plumber" className="hover:text-forest transition-colors">
                  Plumbing & Sanitation
                </Link>
              </li>
              <li>
                <Link href="/services/carpenter" className="hover:text-forest transition-colors">
                  Carpentry & Woodwork
                </Link>
              </li>
              <li>
                <Link href="/services/painter" className="hover:text-forest transition-colors">
                  Painting & Waterproofing
                </Link>
              </li>
              <li>
                <Link href="/services/cleaning" className="hover:text-forest transition-colors">
                  Deep Home Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/appliance-repair" className="hover:text-forest transition-colors">
                  Appliance Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: For Workers & Guilds */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-charcoal mb-4">
              For Workers & Guilds
            </h3>
            <ul className="space-y-2.5 text-sm text-charcoal-muted">
              <li>
                <a href="#for-workers" className="hover:text-forest transition-colors">
                  Register Your Cooperative Society
                </a>
              </li>
              <li>
                <a href="#for-workers" className="hover:text-forest transition-colors">
                  Worker Dignity Charter
                </a>
              </li>
              <li>
                <a href="#for-workers" className="hover:text-forest transition-colors">
                  Welfare & Health Insurance Fund
                </a>
              </li>
              <li>
                <a href="#for-workers" className="hover:text-forest transition-colors">
                  Tool Financing Program
                </a>
              </li>
              <li>
                <a href="#for-workers" className="hover:text-forest transition-colors">
                  Skill Certification Upgrades
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Community Help */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-charcoal mb-4">
              Customer & Guild Care
            </h3>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Every booking includes dispute resolution arbitrated by your local cooperative society council.
            </p>
            <div className="space-y-2 text-sm text-charcoal">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-forest flex-shrink-0" />
                <span>{APP_CONFIG.supportPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-forest flex-shrink-0" />
                <span>{APP_CONFIG.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-forest flex-shrink-0" />
                <span className="text-xs text-charcoal-muted">Operating in 6 metropolitan cooperative zones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <p>© 2026 SevaSaathi — Built for cooperative communities.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1">
              Crafted with fair work principles <Heart className="w-3 h-3 text-saffron fill-saffron" />
            </span>
            <span className="text-cream-border">|</span>
            <span>Zero algorithmic penalties</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
