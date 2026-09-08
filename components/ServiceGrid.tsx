"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/services";
import Testimonial from "./Testimonial";

export default function ServiceGrid() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-2">
        {services.map((service) => {
          const Icon = service.icon;
          const isOpen = openSlug === service.slug;
          return (
            <button
              key={service.slug}
              onClick={() => setOpenSlug(isOpen ? null : service.slug)}
              className={`flex flex-col items-center gap-3 rounded-xl border-2 px-4 py-6 text-center transition-colors ${
                isOpen
                  ? "border-accent bg-accent/10"
                  : "border-ink/15 hover:border-anchor"
              }`}
            >
              <Icon size={32} strokeWidth={1.5} className="text-anchor" />
              <span className="font-display text-sm uppercase tracking-wide leading-snug">
                {service.name}
              </span>
              <ChevronDown
                size={16}
                className={`text-ink/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          );
        })}
      </div>

      {services.map((service) => {
        if (openSlug !== service.slug) return null;
        return (
          <div
            key={service.slug}
            className="mt-6 rounded-xl border-2 border-accent bg-white/40 p-6 sm:p-8"
          >
            <h3 className="font-display text-xl uppercase tracking-wide text-anchor mb-3">
              {service.name}
            </h3>
            <p className="font-display text-lg mb-3">{service.hook}</p>
            <p className="mb-4 text-ink/80">{service.intro}</p>
            {service.offerings.length > 0 && (
              <p className="mb-4 text-ink/70">{service.offerings.join(". ")}.</p>
            )}
            {service.richTestimonials && service.richTestimonials.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                {service.richTestimonials.map((t) => (
                  <Testimonial key={t.attribution} quote={t.quote} attribution={t.attribution} />
                ))}
              </div>
            )}
            {service.closing && (
              <p className="font-display text-ink/90">{service.closing}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
